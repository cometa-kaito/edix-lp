#!/usr/bin/env node
// TV に「起こす信号」を送る管理ツール。
// /api/tv/config に commands.wake=true を POST すると、対象 TV は次のポーリング（最大60秒）で
//   - no-sleep 設定（screen_off_timeout / sleep_timeout / screensaver）を再適用
//   - サイネージを前面へ戻す
// を実行する。version がインクリメントされるので毎回ちょうど1回だけ発火する。
//
// 環境変数:
//   SWITCHBOT_WEBHOOK_SECRET  /api/tv/config の key（必須）
//   BASE_URL                  既定 https://www.school-signage.net
//   DEVICE_ID                 対象 device_id（引数 or 環境変数。未指定なら一覧を表示して終了）
//
// 例:
//   SWITCHBOT_WEBHOOK_SECRET=... node scripts/wake-tv.mjs <DEVICE_ID>
//   SWITCHBOT_WEBHOOK_SECRET=... node scripts/wake-tv.mjs            # 登録済みデバイス一覧を表示

const secret = process.env.SWITCHBOT_WEBHOOK_SECRET;
const baseUrl = (process.env.BASE_URL ?? "https://www.school-signage.net").replace(/\/+$/, "");
const deviceId = process.argv[2] ?? process.env.DEVICE_ID;

if (!secret) {
  console.error("ERROR: SWITCHBOT_WEBHOOK_SECRET must be set.");
  process.exit(1);
}

// device_id 未指定 → 一覧を表示して終了（対象選びの補助）
if (!deviceId) {
  const res = await fetch(`${baseUrl}/api/tv/config?key=${encodeURIComponent(secret)}`);
  const json = await res.json().catch(() => ({}));
  console.log(`HTTP ${res.status} ${res.statusText}`);
  if (Array.isArray(json.devices)) {
    console.log("登録済みデバイス（device_id / label / last_seen）:");
    for (const d of json.devices) {
      const seen = d.last_seen_ms ? new Date(d.last_seen_ms).toISOString() : "(never)";
      console.log(`  ${d.device_id}  ${d.label ?? "-"}  last_seen=${seen}`);
    }
  } else {
    console.log(JSON.stringify(json, null, 2));
  }
  console.error("\nUsage: node scripts/wake-tv.mjs <DEVICE_ID>");
  process.exit(json.ok === false ? 2 : 0);
}

const url = `${baseUrl}/api/tv/config?device_id=${encodeURIComponent(deviceId)}&key=${encodeURIComponent(secret)}`;
const res = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ commands: { wake: true } }),
});

const text = await res.text();
let parsed;
try { parsed = JSON.parse(text); } catch { parsed = { raw: text }; }

console.log(`HTTP ${res.status} ${res.statusText}`);
console.log(JSON.stringify(parsed, null, 2));

if (!res.ok || parsed?.ok === false) {
  process.exit(2);
}
console.log(`\nOK: device ${deviceId} は次のポーリング（最大60秒）で復帰します。`);
