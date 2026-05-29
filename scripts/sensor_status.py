#!/usr/bin/env python3
"""
キミテラスPoC ローカルセンサーDB ステータス確認ツール

ローカル SQLite (sensor.db) の状態を一発で確認するコマンド。
ble_recorder.py が正しく動いているか、未送信レコードが溜まっていないかを表示する。

実行: py -X utf8 sensor_status.py
"""

import os
import sqlite3
import sys
from datetime import datetime, timedelta
from pathlib import Path

DEFAULT_DB = Path.home() / "Documents" / "kimiterrace-data" / "sensor.db"
DB_PATH = Path(os.environ.get("LOCAL_DB_PATH", str(DEFAULT_DB)))

if not DB_PATH.exists():
    print(f"DB ファイルが存在しません: {DB_PATH}")
    print("ble_recorder.py を一度起動して BLE データを受信させてください。")
    sys.exit(1)

conn = sqlite3.connect(str(DB_PATH))

print(f"=== Local DB: {DB_PATH} ===\n")

# 総件数
total = conn.execute("SELECT COUNT(*) FROM motion_events_local").fetchone()[0]
synced = conn.execute(
    "SELECT COUNT(*) FROM motion_events_local WHERE synced_at_ms IS NOT NULL"
).fetchone()[0]
pending = conn.execute(
    "SELECT COUNT(*) FROM motion_events_local WHERE synced_at_ms IS NULL"
).fetchone()[0]

print(f"総レコード数:    {total}")
print(f"  送信済み:      {synced}  ({(synced / total * 100) if total else 0:.1f}%)")
print(f"  未送信:        {pending}  ({(pending / total * 100) if total else 0:.1f}%)")

# 最新レコード
last = conn.execute(
    "SELECT id, detection_state, "
    "datetime(detected_at_ms/1000, 'unixepoch', '+9 hours') AS detected_jst, "
    "CASE WHEN synced_at_ms IS NULL THEN 'pending' ELSE 'synced' END AS sync_status "
    "FROM motion_events_local ORDER BY id DESC LIMIT 1"
).fetchone()
if last:
    print(f"\n最新イベント:    #{last[0]}  {last[1]}  at {last[2]} JST  [{last[3]}]")
    last_dt = datetime.strptime(last[2], "%Y-%m-%d %H:%M:%S")
    now_jst = datetime.now()
    elapsed = now_jst - last_dt
    print(f"  経過時間:      {elapsed}")
    if elapsed > timedelta(hours=1):
        print("  ⚠️  1時間以上イベントなし。レコーダーが止まっている可能性があります。")
else:
    print("\nまだイベントが記録されていません。")

# 直近24h集計
print("\n=== 直近24時間の検知（DETECTED）件数（JST時間帯別） ===")
rows = conn.execute(
    """
    SELECT
      strftime('%Y-%m-%d %H:00', detected_at_ms/1000, 'unixepoch', '+9 hours') AS hour,
      COUNT(*) AS n,
      SUM(CASE WHEN synced_at_ms IS NULL THEN 1 ELSE 0 END) AS pending
    FROM motion_events_local
    WHERE detection_state = 'DETECTED'
      AND detected_at_ms >= strftime('%s', 'now', '-24 hours') * 1000
    GROUP BY hour
    ORDER BY hour
    """
).fetchall()
if rows:
    print(f"{'時間帯':<20}{'検知数':>6}  {'未送信':>6}")
    for hour, n, pend in rows:
        marker = " ⚠" if pend else ""
        print(f"{hour:<20}{n:>6}  {pend:>6}{marker}")
else:
    print("（直近24hに DETECTED イベントなし）")

# レコーダー状態
last_motion = conn.execute(
    "SELECT value FROM recorder_state WHERE key = 'last_motion'"
).fetchone()
if last_motion:
    print(f"\nレコーダー記憶している最終モーション状態: {last_motion[0]}")

conn.close()
