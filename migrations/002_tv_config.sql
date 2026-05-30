-- TVデバイスのリモート設定保存テーブル
-- TVアプリ (com.kimiterrace.tvbridge) が60秒ごとに GET し、最新の設定を取得する。
--
-- Phase 3: 単一の config blob（全TV共通）。多くの教室に展開後は Phase 4 で
-- device_id によるパーTV個別ルーティングへ移行。それまでは id=1 固定の単行運用。

CREATE TABLE IF NOT EXISTS tv_config (
  id              INTEGER PRIMARY KEY CHECK (id = 1),  -- 単一行運用
  version         INTEGER NOT NULL DEFAULT 0,           -- monotonic、変更のたび +1
  signage_url     TEXT,                                 -- WebViewが表示するURL
  target_mac      TEXT,                                 -- BLEスキャン対象センサMAC
  webhook_url     TEXT,                                 -- TV→Vercelの送信先（普通変えない）
  schedule_json   TEXT,                                 -- {enabled, on_hour, ..., days_mask}
  commands_json   TEXT,                                 -- {signage_reload, signage_open, ...}
  updated_at_ms   INTEGER NOT NULL DEFAULT (CAST((julianday('now') - 2440587.5) * 86400000 AS INTEGER)),
  updated_by      TEXT                                  -- 監査用、'admin-dashboard' 等
);

-- 初期行（空設定）
INSERT INTO tv_config (id, version) VALUES (1, 0)
  ON CONFLICT (id) DO NOTHING;
