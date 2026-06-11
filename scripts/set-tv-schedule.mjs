#!/usr/bin/env node
// 設置済み TV モニタの ON/OFF スケジュール（自動点灯/消灯）を確認・更新する管理ツール。
//
// 仕組み: /api/tv/config の schedule_json は upsert で「丸ごと置換」される。
// そのため本ツールは必ず「現在値を GET → 指定された項目だけ差し替え → 完全な schedule を POST」する。
// （off だけ指定しても on/曜日/enabled を消さない）
//
// 環境変数:
//   SWITCHBOT_WEBHOOK_SECRET  /api/tv/config の key（必須）
//   BASE_URL                  既定 https://www.school-signage.net
//
// 使い方:
//   node scripts/set-tv-schedule.mjs                         # 全デバイスの現在スケジュールを表示（変更なし）
//   node scripts/set-tv-schedule.mjs <DEVICE_ID>             # 1台の現在スケジュールを表示（変更なし）
//   node scripts/set-tv-schedule.mjs <DEVICE_ID> --off 16:30 # その1台の OFF 時刻だけ 16:30 に
//   node scripts/set-tv-schedule.mjs --all --off 16:30       # 全デバイスの OFF 時刻を 16:30 に
//   追加オプション: --on 7:30  --enable  --disable  --days weekdays|everyday
//
// daysMask は Calendar.SUNDAY(1)..SATURDAY(7) の bit。weekdays=月〜金。

const secret = process.env.SWITCHBOT_WEBHOOK_SECRET;
const baseUrl = (process.env.BASE_URL ?? "https://www.school-signage.net").replace(/\/+$/, "");

if (!secret) {
  console.error("ERROR: SWITCHBOT_WEBHOOK_SECRET must be set (e.g. node --env-file=.env.local ...).");
  process.exit(1);
}

// ---- 引数パース ----
const argv = process.argv.slice(2);
const opts = { deviceIds: [], all: false, off: null, on: null, enable: null, days: null };
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === "--all") opts.all = true;
  else if (a === "--off") opts.off = argv[++i];
  else if (a === "--on") opts.on = argv[++i];
  else if (a === "--enable") opts.enable = true;
  else if (a === "--disable") opts.enable = false;
  else if (a === "--days") opts.days = argv[++i];
  else if (a.startsWith("--")) { console.error(`unknown option: ${a}`); process.exit(1); }
  else opts.deviceIds.push(a);
}

function parseHM(s, label) {
  const m = /^(\d{1,2}):(\d{2})$/.exec(s ?? "");
  if (!m) { console.error(`ERROR: ${label} は HH:MM 形式で指定してください（例 16:30）。受け取った値: ${s}`); process.exit(1); }
  const h = Number(m[1]), min = Number(m[2]);
  if (h > 23 || min > 59) { console.error(`ERROR: ${label} の時刻が不正です: ${s}`); process.exit(1); }
  return { h, min };
}

const WEEKDAYS_MASK = (1 << 2) | (1 << 3) | (1 << 4) | (1 << 5) | (1 << 6); // Mon..Fri (Calendar 2..6)
const EVERYDAY_MASK = (1 << 1) | (1 << 2) | (1 << 3) | (1 << 4) | (1 << 5) | (1 << 6) | (1 << 7);

function maskToDays(mask) {
  const names = ["", "日", "月", "火", "水", "木", "金", "土"]; // Calendar 1..7
  const out = [];
  for (let d = 1; d <= 7; d++) if (mask & (1 << d)) out.push(names[d]);
  return out.join("");
}

async function listDevices() {
  const res = await fetch(`${baseUrl}/api/tv/config?key=${encodeURIComponent(secret)}`);
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !Array.isArray(json.devices)) {
    console.error(`一覧取得失敗: HTTP ${res.status}`, JSON.stringify(json));
    process.exit(2);
  }
  return json.devices;
}

async function getConfig(deviceId) {
  const res = await fetch(`${baseUrl}/api/tv/config?device_id=${encodeURIComponent(deviceId)}&key=${encodeURIComponent(secret)}`);
  const json = await res.json().catch(() => ({}));
  if (!res.ok) { console.error(`GET 失敗 (${deviceId}): HTTP ${res.status}`, JSON.stringify(json)); process.exit(2); }
  return json;
}

function fmtSchedule(s) {
  if (!s) return "(スケジュール未設定 / TV側の既定値で動作)";
  const on = `${String(s.on_hour ?? "?").padStart(2, "0")}:${String(s.on_minute ?? 0).padStart(2, "0")}`;
  const off = `${String(s.off_hour ?? "?").padStart(2, "0")}:${String(s.off_minute ?? 0).padStart(2, "0")}`;
  const days = s.days_mask != null ? maskToDays(s.days_mask) : "?";
  return `enabled=${s.enabled === true ? "ON" : (s.enabled === false ? "OFF" : "?")}  点灯=${on}  消灯=${off}  曜日=[${days}] (mask=${s.days_mask})`;
}

async function showOnly(deviceIds) {
  const devices = await listDevices();
  const targets = deviceIds.length ? devices.filter((d) => deviceIds.includes(d.device_id)) : devices;
  for (const d of targets) {
    const cfg = await getConfig(d.device_id);
    const sched = cfg?.config?.schedule ?? null;
    console.log(`\n● ${d.label ?? "-"}  (${d.device_id})`);
    console.log(`   version=${cfg.version}  last_seen=${d.last_seen_ms ? new Date(d.last_seen_ms).toISOString() : "(never)"}`);
    console.log(`   ${fmtSchedule(sched)}`);
  }
}

async function applyChange(deviceIds) {
  const devices = await listDevices();
  const targets = opts.all ? devices : devices.filter((d) => deviceIds.includes(d.device_id));
  if (!targets.length) { console.error("対象デバイスが見つかりません。"); process.exit(2); }

  for (const d of targets) {
    const cfg = await getConfig(d.device_id);
    const cur = cfg?.config?.schedule ?? {};
    // TV側既定: enabled=false, on 7:30, off 22:00, weekdays
    const merged = {
      enabled: opts.enable != null ? opts.enable : (cur.enabled ?? false),
      on_hour: cur.on_hour ?? 7,
      on_minute: cur.on_minute ?? 30,
      off_hour: cur.off_hour ?? 22,
      off_minute: cur.off_minute ?? 0,
      days_mask: cur.days_mask ?? WEEKDAYS_MASK,
    };
    if (opts.on) { const { h, min } = parseHM(opts.on, "--on"); merged.on_hour = h; merged.on_minute = min; }
    if (opts.off) { const { h, min } = parseHM(opts.off, "--off"); merged.off_hour = h; merged.off_minute = min; }
    if (opts.days === "weekdays") merged.days_mask = WEEKDAYS_MASK;
    else if (opts.days === "everyday") merged.days_mask = EVERYDAY_MASK;

    console.log(`\n● ${d.label ?? "-"}  (${d.device_id})`);
    console.log(`   変更前: ${fmtSchedule(cur && Object.keys(cur).length ? cur : null)}`);
    const res = await fetch(`${baseUrl}/api/tv/config?device_id=${encodeURIComponent(d.device_id)}&key=${encodeURIComponent(secret)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ schedule: merged }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || json.ok === false) { console.error(`   POST 失敗: HTTP ${res.status}`, JSON.stringify(json)); process.exit(2); }
    // 反映確認
    const after = await getConfig(d.device_id);
    console.log(`   変更後: ${fmtSchedule(after?.config?.schedule ?? null)}  (version ${cfg.version} -> ${after.version})`);
  }
  console.log("\nOK: 各 TV は次のポーリング（最大60秒）で新しいスケジュールを取り込みます。");
}

const willChange = opts.off || opts.on || opts.enable != null || opts.days;
if (!willChange) {
  await showOnly(opts.deviceIds);
} else {
  if (!opts.all && opts.deviceIds.length === 0) {
    console.error("変更には対象 <DEVICE_ID> か --all が必要です。");
    process.exit(1);
  }
  await applyChange(opts.deviceIds);
}
