# SwitchBot 人感センサ Webhook 受信セットアップ手順

PoC期間中、SwitchBot 人感センサ（PIR方式）の検知イベントを
本LP（Next.js / Vercel）の `/api/switchbot-webhook` で受信し、
Turso（ホスト型SQLite）に蓄積するための初期セットアップ手順。

---

## 全体構成

```
人感センサ → SwitchBot Hub 2 → SwitchBotクラウド
                                    │
                                    ↓ POST (検知時)
                          https://www.school-signage.net
                            /api/switchbot-webhook?key=<SECRET>
                                    │
                                    ↓ INSERT
                                Turso (libSQL/SQLite)
```

---

## 0. 必要なもの

- SwitchBot 人感センサ（PIR） × 1
- SwitchBot Hub 2 × 1
- スマホ（SwitchBot アプリのため。iOS/Android どちらでも可）
- Turso アカウント（無料）
- Vercel アカウント（既存・LPデプロイで使用中）

---

## 1. SwitchBot 側のセットアップ

### 1-1. アプリインストール＆ログイン

1. スマホで「SwitchBot」アプリをインストール
2. アカウント作成（既にあるなら使い回しOK）

### 1-2. Hub 2 の登録

1. Hub 2 を電源に接続
2. アプリの「＋」から「Hub 2」を選び、画面の指示に従ってWi-Fi登録
3. 設置場所は教室で問題ないが、初期セットアップは自宅Wi-Fiで行ってOK。
   学校設置時にWi-Fi再設定が必要

### 1-3. 人感センサの登録

1. 人感センサに電池（CR2450 × 2）をセット
2. アプリの「＋」から「人感センサ」を選び、ペアリング
3. **Hub 2 経由でクラウドに繋がる設定** にする
   （アプリ上で「クラウドサービス」を有効化）

### 1-4. デバイスIDのメモ

- アプリでセンサを開く → 「デバイス情報」から MAC アドレス（`DC:0D:30:...`）を控えておく
- Webhook で送られてくるイベントを「どのセンサか」識別するのに使う（将来複数台になった時のため）

### 1-5. 動作テスト

センサの前で手を振る → アプリの履歴に「検知」が記録されればOK。
ここまででセンサ→クラウドの流れは確立。

---

## 2. Turso（ホスト型SQLite）のセットアップ

### 2-1. アカウント作成

1. https://turso.tech にアクセス
2. GitHub アカウントでサインアップ（無料）
3. 無料プランは PoC 規模なら十分（500 DB / 月9GB 読み取り）

### 2-2. CLI インストール（Windows / PowerShell）

```powershell
# Scoop 経由（おすすめ）
scoop install turso

# または: https://docs.turso.tech/cli/installation のWindows手順
```

未インストールなら、Turso のWeb管理画面からブラウザだけで作業することも可能（後述の SQL 実行をWebコンソールで貼り付ける）。

### 2-3. DB 作成

```powershell
turso auth login
turso db create kimiterrace-sensor
```

### 2-4. 接続情報の取得

```powershell
# 接続URL
turso db show kimiterrace-sensor --url
# → libsql://kimiterrace-sensor-<your-org>.turso.io

# 認証トークン
turso db tokens create kimiterrace-sensor
# → eyJhbGciOi... （長い文字列）
```

両方控える。

### 2-5. テーブル作成（マイグレーション）

リポジトリの `migrations/001_init.sql` を流し込む：

```powershell
turso db shell kimiterrace-sensor < migrations/001_init.sql
```

Web コンソールから貼り付けても可。確認：

```powershell
turso db shell kimiterrace-sensor "SELECT name FROM sqlite_master WHERE type='table';"
# → motion_events, webhook_failures が出ればOK
```

---

## 3. Vercel 環境変数の設定

Vercel ダッシュボード → `edix-lp` プロジェクト → Settings → Environment Variables

| 変数名 | 値 | 用途 |
|---|---|---|
| `TURSO_DATABASE_URL` | 2-4 の URL | Turso接続先 |
| `TURSO_AUTH_TOKEN` | 2-4 のトークン | Turso認証 |
| `SWITCHBOT_WEBHOOK_SECRET` | 任意の長い乱数文字列（後述） | Webhookと統計APIの認証 |

`SWITCHBOT_WEBHOOK_SECRET` の生成例（PowerShell）：

```powershell
[Convert]::ToBase64String([Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

設定後、**Vercel 上で再デプロイが必要**（Environment Variables 変更は次回デプロイから反映）。
ダミーコミットを push するか、Vercel ダッシュボードの「Redeploy」ボタンを使う。

---

## 4. SwitchBot Webhook の設定

SwitchBot は2通りの設定方法があります。**API経由**が推奨（アプリのUIにWebhook項目が無いため）。

### 4-1. アクセストークンを取得

1. SwitchBot アプリの「プロフィール」→「設定」→「アプリバージョン」を10回タップ → 開発者モードが有効化
2. 「プロフィール」→「設定」→「開発者向けオプション」が表示される
3. ここで **トークン** と **シークレット** が表示される（控える）

### 4-2. Webhook URL を登録（curl/PowerShell）

```powershell
$token = "<SwitchBotの開発者トークン>"
$secret = "<SwitchBotの開発者シークレット>"
$webhookSecret = "<TURSOと同じくVercelに設定したSWITCHBOT_WEBHOOK_SECRET>"

# サイン生成
$nonce = [Guid]::NewGuid().ToString()
$timestamp = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds().ToString()
$signString = $token + $timestamp + $nonce
$hmac = [System.Security.Cryptography.HMACSHA256]::new([Text.Encoding]::UTF8.GetBytes($secret))
$sign = [Convert]::ToBase64String($hmac.ComputeHash([Text.Encoding]::UTF8.GetBytes($signString)))

# Webhook URL を登録
$body = @{
  action = "setupWebhook"
  url    = "https://www.school-signage.net/api/switchbot-webhook?key=$webhookSecret"
  deviceList = "ALL"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "https://api.switch-bot.com/v1.1/webhook/setupWebhook" `
  -Headers @{
    "Authorization" = $token
    "sign" = $sign
    "nonce" = $nonce
    "t" = $timestamp
    "Content-Type" = "application/json; charset=utf-8"
  } -Body $body
```

レスポンスで `statusCode: 100, message: "success"` が返ればOK。

### 4-3. 登録内容の確認

```powershell
# 上の $token / $secret / sign 生成は同じ
$body = '{"action":"queryUrl"}'
Invoke-RestMethod -Method Post -Uri "https://api.switch-bot.com/v1.1/webhook/queryUrl" `
  -Headers @{ ... } -Body $body
```

登録した URL が返ってくる。

---

## 5. 動作確認

### 5-1. センサの前で手を振る

→ SwitchBot がクラウド経由で Vercel の `/api/switchbot-webhook?key=...` に POST する

### 5-2. 統計エンドポイントで確認

ブラウザ or PowerShell で：

```
https://www.school-signage.net/api/sensor-stats?key=<SWITCHBOT_WEBHOOK_SECRET>&hours=1
```

レスポンス例：

```json
{
  "ok": true,
  "totalEvents": 12,
  "hours": 1,
  "detectedByHour": [
    { "hourBucket": "2026-06-01 14:00", "detectedCount": 12 }
  ]
}
```

`totalEvents` が増えていけば OK。

### 5-3. 失敗ログの確認

何か変なら `webhook_failures` テーブルを覗く：

```powershell
turso db shell kimiterrace-sensor "SELECT * FROM webhook_failures ORDER BY id DESC LIMIT 20;"
```

---

## 6. PoC 稼働開始直前のチェックリスト

- [ ] Hub 2 を学校のWi-Fiに接続し直し済み
- [ ] センサが学校教室に物理設置済み（3年生教室）
- [ ] SwitchBot アプリで現地のセンサが「オンライン」と表示される
- [ ] 現地でセンサの前で手を振り、`/api/sensor-stats` の totalEvents が増えることを確認
- [ ] Vercel の Functions Logs で `/api/switchbot-webhook` が 200 を返していることを確認
- [ ] Turso DBの `motion_events` に detected_at_ms が日本時間で妥当な値で入っていることを確認

---

## 付録：時刻の扱い

- `detected_at_ms` は SwitchBot から送られた `timeOfSample`（UNIX ms）をそのまま保存
- 集計時は `+9 hours` で JST に変換（`lib/sensor-db.ts` の `getRecentStats` 参照）
- センサ側の時刻ズレが大きい場合は `received_at_ms`（Vercel受信時刻）と比較してチェック

## 付録：複数センサ運用への拡張

- 現状の Webhook URL は SwitchBot アカウント全体で1本
- 複数センサにしても全イベントが同じ URL に飛んでくるので、`device_mac` で識別する
- 教室ごとに `device_mac → 設置場所` のマッピングは別途管理表で運用
