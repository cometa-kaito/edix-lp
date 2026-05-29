-- キミテラスPoC 人感センサ イベントログ
-- SwitchBot 人感センサ（PIR）からの Webhook を受信して書き込む

CREATE TABLE IF NOT EXISTS motion_events (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  device_mac      TEXT    NOT NULL,
  device_id       TEXT,
  detection_state TEXT    NOT NULL,
  detected_at_ms  INTEGER NOT NULL,
  received_at_ms  INTEGER NOT NULL DEFAULT (CAST((julianday('now') - 2440587.5) * 86400000 AS INTEGER)),
  event_type      TEXT,
  raw_payload     TEXT    NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_motion_events_detected_at
  ON motion_events (detected_at_ms);

CREATE INDEX IF NOT EXISTS idx_motion_events_device_detected
  ON motion_events (device_mac, detected_at_ms);

-- 受信したが解析に失敗した Webhook も別テーブルに残す（取りこぼし防止）
CREATE TABLE IF NOT EXISTS webhook_failures (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  received_at_ms INTEGER NOT NULL DEFAULT (CAST((julianday('now') - 2440587.5) * 86400000 AS INTEGER)),
  reason         TEXT    NOT NULL,
  raw_payload    TEXT    NOT NULL
);
