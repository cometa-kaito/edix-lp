#!/usr/bin/env python3
r"""
キミテラスPoC 人感センサ ローカルファースト レコーダー

役割:
1. SwitchBot 人感センサの BLE Advertisement をスキャン
2. 状態遷移（DETECTED ↔ NOT_DETECTED）を即座にローカル SQLite へINSERT
3. バックグラウンドで未送信レコードを Vercel API (`/api/switchbot-webhook`) へ POST
   ネット切断時は次の周期で自動リトライ。データ損失なし

環境変数（必須）:
    TARGET_MAC    対象センサーの MAC アドレス（DC:A5:B3:C2:98:D7 形式）
    WEBHOOK_URL   POST 先（key 付き完全 URL）。未設定なら local-only モード

環境変数（任意）:
    LOCAL_DB_PATH ローカル SQLite のパス
                  既定: %USERPROFILE%\Documents\kimiterrace-data\sensor.db
    LOG_DIR       ログファイル出力先
                  既定: %USERPROFILE%\Documents\kimiterrace-data\logs
    SYNC_INTERVAL_SEC  クラウド送信ループの間隔（既定 30）

実行（Windows / PowerShell）:
    py -X utf8 ble_recorder.py
    （必ず -X utf8 を付ける。Python 3.14 + 非ASCIIパス環境で必要）

停止: Ctrl + C
"""

import asyncio
import contextlib
import json
import os
import sqlite3
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

from bleak import BleakScanner
from switchbot import parse_advertisement_data

# ---------- 設定 ----------

TARGET_MAC = os.environ.get("TARGET_MAC", "").upper()
WEBHOOK_URL = os.environ.get("WEBHOOK_URL", "")
LOCAL_DB_PATH = Path(
    os.environ.get(
        "LOCAL_DB_PATH",
        str(Path.home() / "Documents" / "kimiterrace-data" / "sensor.db"),
    )
)
LOG_DIR = Path(
    os.environ.get(
        "LOG_DIR",
        str(Path.home() / "Documents" / "kimiterrace-data" / "logs"),
    )
)
SYNC_INTERVAL_SEC = int(os.environ.get("SYNC_INTERVAL_SEC", "30"))
HTTP_TIMEOUT_SEC = 10
SYNC_BATCH_SIZE = 50

if not TARGET_MAC:
    print("ERROR: TARGET_MAC 環境変数が必要です（例: DC:A5:B3:C2:98:D7）", file=sys.stderr)
    sys.exit(1)


# ---------- ログ ----------

LOG_DIR.mkdir(parents=True, exist_ok=True)
log_file_path = LOG_DIR / f"recorder-{datetime.now().strftime('%Y%m%d')}.log"
log_fh = log_file_path.open("a", encoding="utf-8")


def log(msg: str) -> None:
    ts = datetime.now().strftime("%H:%M:%S")
    line = f"[{ts}] {msg}"
    print(line, flush=True)
    log_fh.write(line + "\n")
    log_fh.flush()


# ---------- ローカル SQLite ----------

LOCAL_DB_PATH.parent.mkdir(parents=True, exist_ok=True)
conn = sqlite3.connect(str(LOCAL_DB_PATH), isolation_level=None, check_same_thread=False)
conn.execute("PRAGMA journal_mode=WAL")
conn.executescript(
    """
    CREATE TABLE IF NOT EXISTS motion_events_local (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      device_mac      TEXT    NOT NULL,
      detection_state TEXT    NOT NULL,
      detected_at_ms  INTEGER NOT NULL,
      raw_payload     TEXT    NOT NULL,
      synced_at_ms    INTEGER
    );

    CREATE INDEX IF NOT EXISTS ix_motion_events_local_unsynced
      ON motion_events_local (synced_at_ms)
      WHERE synced_at_ms IS NULL;

    CREATE INDEX IF NOT EXISTS ix_motion_events_local_detected
      ON motion_events_local (detected_at_ms);

    CREATE TABLE IF NOT EXISTS recorder_state (
      key   TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
    """
)


def state_get(key: str) -> str | None:
    cur = conn.execute("SELECT value FROM recorder_state WHERE key = ?", (key,))
    row = cur.fetchone()
    return row[0] if row else None


def state_set(key: str, value: str) -> None:
    conn.execute(
        "INSERT INTO recorder_state(key, value) VALUES(?, ?) "
        "ON CONFLICT(key) DO UPDATE SET value = excluded.value",
        (key, value),
    )


def insert_event(device_mac: str, state: str, detected_at_ms: int, raw_payload: str) -> int:
    cur = conn.execute(
        "INSERT INTO motion_events_local (device_mac, detection_state, detected_at_ms, raw_payload)"
        " VALUES (?, ?, ?, ?)",
        (device_mac, state, detected_at_ms, raw_payload),
    )
    return cur.lastrowid or 0


# 起動時に最終既知状態を読み込む（重複検知防止）
last_motion_str: str | None = state_get("last_motion")
log(f"起動時の最終状態: last_motion={last_motion_str!r}")


# ---------- BLE コールバック（同期） ----------


def on_detection(device, advertisement_data):
    global last_motion_str
    if device.address.upper() != TARGET_MAC:
        return

    parsed = parse_advertisement_data(device, advertisement_data)
    if parsed is None:
        return

    nested = parsed.data.get("data", {}) if parsed.data else {}
    motion = nested.get("motion_detected")
    if motion is None:
        return

    motion_str = "True" if motion else "False"
    if motion_str == last_motion_str:
        return

    now_ms = int(time.time() * 1000)
    state = "DETECTED" if motion else "NOT_DETECTED"
    battery = nested.get("battery")
    payload = {
        "eventType": "changeReport",
        "eventVersion": "1",
        "context": {
            "deviceType": "WoPresence",
            "deviceMac": TARGET_MAC,
            "detectionState": state,
            "timeOfSample": now_ms,
            "battery": battery,
            "source": "ble-local",
        },
    }
    raw_payload = json.dumps(payload, ensure_ascii=False)

    event_id = insert_event(TARGET_MAC, state, now_ms, raw_payload)
    state_set("last_motion", motion_str)
    last_motion_str = motion_str

    log(f"LOCAL #{event_id}  {state}  battery={battery}%  rssi={advertisement_data.rssi}dBm")


# ---------- バックグラウンド sync ----------


def try_post(raw_payload: str) -> tuple[bool, str]:
    if not WEBHOOK_URL:
        return False, "no_webhook"
    req = urllib.request.Request(
        WEBHOOK_URL,
        data=raw_payload.encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=HTTP_TIMEOUT_SEC) as resp:
            if resp.status == 200:
                return True, ""
            return False, f"http_{resp.status}"
    except urllib.error.URLError as e:
        return False, f"url_err:{e.reason}"
    except Exception as e:
        return False, f"err:{type(e).__name__}"


async def sync_loop():
    """30秒ごとに未送信レコードをVercelに送る。失敗してもデータは消えない。"""
    consecutive_failures = 0
    while True:
        await asyncio.sleep(SYNC_INTERVAL_SEC)

        if not WEBHOOK_URL:
            continue

        cur = conn.execute(
            "SELECT id, raw_payload FROM motion_events_local "
            "WHERE synced_at_ms IS NULL ORDER BY id LIMIT ?",
            (SYNC_BATCH_SIZE,),
        )
        rows = cur.fetchall()
        if not rows:
            continue

        synced = 0
        failed = 0
        first_fail_reason = ""

        for event_id, raw_payload in rows:
            ok, reason = try_post(raw_payload)
            if ok:
                conn.execute(
                    "UPDATE motion_events_local SET synced_at_ms = ? WHERE id = ?",
                    (int(time.time() * 1000), event_id),
                )
                synced += 1
            else:
                failed += 1
                if not first_fail_reason:
                    first_fail_reason = reason
                # 同じ失敗が続くならネット切れ可能性高い→このバッチは諦めて次の周期へ
                break

        if synced > 0:
            log(f"SYNC ok={synced} unsent_remaining=? (next round)")
            consecutive_failures = 0
        if failed > 0:
            consecutive_failures += 1
            if consecutive_failures in (1, 5, 20, 60):  # 段階的に通知
                pending = conn.execute(
                    "SELECT COUNT(*) FROM motion_events_local WHERE synced_at_ms IS NULL"
                ).fetchone()[0]
                log(
                    f"SYNC fail reason={first_fail_reason} consecutive={consecutive_failures} pending={pending}"
                )


# ---------- 健全性ヒートビート ----------


async def heartbeat_loop():
    """10分ごとに自分の生存と統計を log に書く。デバッグ用。"""
    while True:
        await asyncio.sleep(600)
        total = conn.execute("SELECT COUNT(*) FROM motion_events_local").fetchone()[0]
        pending = conn.execute(
            "SELECT COUNT(*) FROM motion_events_local WHERE synced_at_ms IS NULL"
        ).fetchone()[0]
        log(f"HEARTBEAT total={total} pending_sync={pending}")


# ---------- メイン ----------


async def main():
    log("=" * 60)
    log(f"BLE Recorder 起動")
    log(f"  target_mac = {TARGET_MAC}")
    log(f"  local_db   = {LOCAL_DB_PATH}")
    log(f"  log_file   = {log_file_path}")
    log(f"  webhook    = {'configured' if WEBHOOK_URL else 'LOCAL-ONLY MODE'}")
    log(f"  sync_intvl = {SYNC_INTERVAL_SEC}s")
    log("=" * 60)

    scanner = BleakScanner(detection_callback=on_detection)
    await scanner.start()
    sync_task = asyncio.create_task(sync_loop())
    hb_task = asyncio.create_task(heartbeat_loop())

    try:
        # 永続稼働。エラー時は Python が自然死し、ランチャ側で再起動する想定。
        while True:
            await asyncio.sleep(3600)
    finally:
        sync_task.cancel()
        hb_task.cancel()
        with contextlib.suppress(asyncio.CancelledError):
            await sync_task
        with contextlib.suppress(asyncio.CancelledError):
            await hb_task
        await scanner.stop()
        conn.close()
        log_fh.close()


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        log("KeyboardInterrupt 停止")
