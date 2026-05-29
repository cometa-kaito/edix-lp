#!/usr/bin/env node
// migrations/*.sql を順番に Turso に流し込む簡易ランナー。
// 環境変数 TURSO_DATABASE_URL / TURSO_AUTH_TOKEN を要求。

import { createClient } from "@libsql/client";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const migrationsDir = join(here, "..", "migrations");

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error("ERROR: TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set.");
  process.exit(1);
}

const client = createClient({ url, authToken });

const files = readdirSync(migrationsDir)
  .filter((f) => f.endsWith(".sql"))
  .sort();

if (files.length === 0) {
  console.error(`ERROR: no .sql files in ${migrationsDir}`);
  process.exit(1);
}

let totalStmts = 0;
for (const f of files) {
  const sql = readFileSync(join(migrationsDir, f), "utf-8");
  const stmts = sql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.split("\n").every((line) => line.trim().startsWith("--") || line.trim().length === 0));

  for (const stmt of stmts) {
    await client.execute(stmt);
  }
  totalStmts += stmts.length;
  console.log(`OK ${f}  (${stmts.length} statements)`);
}

const tables = await client.execute(
  "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name",
);
console.log("---");
console.log(`Applied ${totalStmts} statement(s) total.`);
console.log("Tables now present:", tables.rows.map((r) => r.name).join(", "));
