#!/usr/bin/env node
// SwitchBot 開発者 API v1.1 を使って Webhook URL を登録／確認／削除する管理ツール。
// 環境変数:
//   SWITCHBOT_TOKEN      開発者向けオプション画面のトークン
//   SWITCHBOT_SECRET     クライアントシークレット
//   WEBHOOK_URL          登録したい URL（query string 込み）。確認/削除時は不要
//   ACTION               "setup"(default) | "query" | "delete"
//
// 例:
//   SWITCHBOT_TOKEN=... SWITCHBOT_SECRET=... WEBHOOK_URL=... node scripts/setup-switchbot-webhook.mjs
//   ACTION=query SWITCHBOT_TOKEN=... SWITCHBOT_SECRET=... node scripts/setup-switchbot-webhook.mjs

import { createHmac, randomUUID } from "node:crypto";

const token = process.env.SWITCHBOT_TOKEN;
const secret = process.env.SWITCHBOT_SECRET;
const action = (process.env.ACTION ?? "setup").toLowerCase();
const webhookUrl = process.env.WEBHOOK_URL;

if (!token || !secret) {
  console.error("ERROR: SWITCHBOT_TOKEN and SWITCHBOT_SECRET must be set.");
  process.exit(1);
}
if (action === "setup" && !webhookUrl) {
  console.error("ERROR: ACTION=setup requires WEBHOOK_URL.");
  process.exit(1);
}

function buildAuthHeaders() {
  const t = Date.now().toString();
  const nonce = randomUUID();
  const signString = token + t + nonce;
  const sign = createHmac("sha256", secret).update(signString).digest("base64");
  return {
    Authorization: token,
    sign,
    nonce,
    t,
    "Content-Type": "application/json; charset=utf-8",
  };
}

const endpoints = {
  setup: {
    url: "https://api.switch-bot.com/v1.1/webhook/setupWebhook",
    body: { action: "setupWebhook", url: webhookUrl, deviceList: "ALL" },
  },
  query: {
    url: "https://api.switch-bot.com/v1.1/webhook/queryWebhook",
    body: { action: "queryUrl" },
  },
  delete: {
    url: "https://api.switch-bot.com/v1.1/webhook/deleteWebhook",
    body: { action: "deleteWebhook", url: webhookUrl },
  },
};

const target = endpoints[action];
if (!target) {
  console.error(`ERROR: unknown ACTION="${action}" (expected: setup|query|delete)`);
  process.exit(1);
}

const res = await fetch(target.url, {
  method: "POST",
  headers: buildAuthHeaders(),
  body: JSON.stringify(target.body),
});

const text = await res.text();
let parsed;
try {
  parsed = JSON.parse(text);
} catch {
  parsed = { raw: text };
}

console.log(`HTTP ${res.status} ${res.statusText}`);
console.log(JSON.stringify(parsed, null, 2));

if (parsed?.statusCode !== undefined && parsed.statusCode !== 100) {
  process.exit(2);
}
