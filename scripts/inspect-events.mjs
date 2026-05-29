#!/usr/bin/env node
// Turso 直接接続で motion_events / webhook_failures を覗くツール。
// 環境変数 TURSO_DATABASE_URL / TURSO_AUTH_TOKEN が必要。

import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
if (!url || !authToken) {
  console.error("ERROR: TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set.");
  process.exit(1);
}

const client = createClient({ url, authToken });

console.log("=== motion_events 直近10件 ===");
const events = await client.execute(
  "SELECT id, device_mac, detection_state, datetime(detected_at_ms/1000, 'unixepoch', '+9 hours') AS detected_jst, datetime(received_at_ms/1000, 'unixepoch', '+9 hours') AS received_jst FROM motion_events ORDER BY id DESC LIMIT 10",
);
if (events.rows.length === 0) {
  console.log("(no rows)");
} else {
  for (const r of events.rows) {
    console.log(
      `#${r.id}  mac=${r.device_mac}  state=${r.detection_state}  detected=${r.detected_jst}  received=${r.received_jst}`,
    );
  }
}

console.log("");
console.log("=== webhook_failures 直近10件 ===");
const failures = await client.execute(
  "SELECT id, reason, datetime(received_at_ms/1000, 'unixepoch', '+9 hours') AS received_jst, substr(raw_payload, 1, 200) AS payload_preview FROM webhook_failures ORDER BY id DESC LIMIT 10",
);
if (failures.rows.length === 0) {
  console.log("(no rows)");
} else {
  for (const r of failures.rows) {
    console.log(`#${r.id}  reason=${r.reason}  received=${r.received_jst}`);
    console.log(`  payload: ${r.payload_preview}`);
  }
}

console.log("");
console.log("=== カウンタ ===");
const count = await client.execute(
  "SELECT (SELECT COUNT(*) FROM motion_events) AS events, (SELECT COUNT(*) FROM webhook_failures) AS failures",
);
console.log(count.rows[0]);
