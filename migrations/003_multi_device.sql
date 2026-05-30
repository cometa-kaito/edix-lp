-- マルチデバイス対応：TV ごとに教室コンテキストを保持
-- 003_multi_device.sql

-- 既存の単一行 tv_config テーブルは未使用なので破棄
DROP TABLE IF EXISTS tv_config;

-- TV デバイス管理テーブル（教室ごとに 1 行）
CREATE TABLE IF NOT EXISTS tv_devices (
  device_id         TEXT PRIMARY KEY,           -- TV が初回起動時に生成する UUIDv4
  label             TEXT NOT NULL,              -- "電子工学科 1年" 等の表示用
  school_id         TEXT,                       -- signage URL の school クエリ値
  grade_id          TEXT,                       -- signage URL の grade クエリ値
  department_id     TEXT,                       -- signage URL の department クエリ値
  class_id          TEXT,                       -- signage URL の class クエリ値
  target_mac        TEXT,                       -- BLEスキャン対象センサMAC
  signage_url       TEXT,                       -- フル signage URL
  webhook_url       TEXT,                       -- TV→Vercel POST 先
  schedule_json     TEXT,                       -- ScheduleConfig JSON
  commands_json     TEXT,                       -- 一過性コマンド ({signage_reload:true,...})
  version           INTEGER NOT NULL DEFAULT 0, -- monotonic 増分
  registered_at_ms  INTEGER NOT NULL DEFAULT (CAST((julianday('now') - 2440587.5) * 86400000 AS INTEGER)),
  last_seen_ms      INTEGER,                    -- TV から最後にポーリングされた時刻
  last_known_ip     TEXT,                       -- ポーリング元 IP（参考、診断用）
  notes             TEXT
);

CREATE INDEX IF NOT EXISTS idx_tv_devices_classroom
  ON tv_devices (school_id, grade_id, class_id);

CREATE INDEX IF NOT EXISTS idx_tv_devices_last_seen
  ON tv_devices (last_seen_ms);

-- motion_events に教室コンテキスト列を追加（既存行は NULL でOK）
-- 注: 既存の device_id 列は SwitchBot 内部の deviceId 用なので、
-- 我々の TV 識別子は tv_device_id として別に追加する。
ALTER TABLE motion_events ADD COLUMN tv_device_id  TEXT;
ALTER TABLE motion_events ADD COLUMN school_id     TEXT;
ALTER TABLE motion_events ADD COLUMN grade_id      TEXT;
ALTER TABLE motion_events ADD COLUMN department_id TEXT;
ALTER TABLE motion_events ADD COLUMN class_id      TEXT;

CREATE INDEX IF NOT EXISTS idx_motion_events_classroom
  ON motion_events (school_id, grade_id, class_id, detected_at_ms);

CREATE INDEX IF NOT EXISTS idx_motion_events_tv_device_id
  ON motion_events (tv_device_id, detected_at_ms);
