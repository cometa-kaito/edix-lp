# PoC 運用ハンドブック — 2026-05-30 朝の引き継ぎ

> このドキュメントは前夜（5/29〜5/30 深夜）の自律作業のサマリと、
> 起床後の最優先判断・操作手順をまとめたもの。
> PoC 開始日（2026-06-01）まで本ドキュメントを更新しながら使う。

---

## 1. 現状サマリ（5/30 1:00 時点）

### 完成しているもの

| レイヤー | 状態 |
|---|---|
| **クラウド側** Vercel + Turso + `/api/switchbot-webhook` + `/api/sensor-stats` | ✅ 本番稼働 |
| **DB** Turso (`kimiterrace-sensor`) — `motion_events` / `webhook_failures` テーブル | ✅ スキーマ反映済 |
| **環境変数** `TURSO_DATABASE_URL` / `TURSO_AUTH_TOKEN` / `SWITCHBOT_WEBHOOK_SECRET` | ✅ 本番に設定済 |
| **SwitchBot 物理** Hub 2 + 人感センサ ペアリング済（自宅 Wi-Fi）| ✅ 動作確認済 |
| **SwitchBot Cloud Webhook** 登録（POST 先 URL は本サービス） | ✅ 登録済（ただし発火確認できず → §3 参照） |
| **BLE 直接受信** Python `ble_recorder.py` → ローカル SQLite + クラウド同期 | ✅ 動作確認済 |
| **運用スクリプト** `scripts/` 配下、git コミット済 | ✅ |

### 今夜の重要な技術判断

- **来場検知の構成**: 自作 LiDAR (VL53L8CX × 4 + ESP32 × 4) は信頼性・リードタイム理由で見送り。SwitchBot 人感センサ (PIR) + Hub 2 + Webhook 方式に切替（[ADR-020](../../../キミテラス-v2/docs/adr/020-presence-sensor-switchbot-webhook.md) v2 側にも反映済）
- **データ保存先**: Turso（ホスト型 SQLite）を本流に。PoC 期間 4 か月で総ストレージ 20MB 未満想定、無料枠で完結
- **ローカルファースト化**: 学校 Wi-Fi の不安定さを想定し、BLE → ローカル SQLite を一次蓄積、クラウド同期はベストエフォートに変更
- **学校に PC を置かない**: 盗難・電源切リスク。代わりに Hub 2（小型・低リスク）または Pi Zero 2 W を学校設置候補に

---

## 2. 朝イチで判断すべきこと（最優先）

### 判断 A. 学校 Wi-Fi が安定して使えそうか確認

明日 2026-05-30 に学校で Hub 2 を Wi-Fi に繋いだ際の体感がそのまま PoC 運用の前提になる。

- ✅ 安定 → **シナリオ B（Hub 2 単独でクラウド経由）**
- ⚠️ 不安定 / Webhook 詰まり継続 → **シナリオ C（Pi Zero 2 W 追加発注）**
- ❌ 完全に使えない → **シナリオ D（自宅 BLE Recorder のみで PoC を回す）** ←ハードに非現実的

### 判断 B. SwitchBot Cloud Webhook の発火再開

今夜 21:00 頃に登録した Webhook URL は SwitchBot 側で受理済（`statusCode:100 success`）だが、
**自宅でセンサを振っても POST が来なかった**（Vercel ログ確認、`webhook_failures` 空、`motion_events` にはローカル BLE 由来のみ）。

可能性:
1. SwitchBot 側でアクティベーションに数時間以上かかる（朝に確認）
2. 人感センサのクラウド同期がアプリの新 UI で隠れている（センサ画面の項目は確認済で「クラウドサービス」項目自体が存在しない）
3. Hub 2 の Wi-Fi 接続が不安定で Hub → Cloud → Vercel のどこかが詰まっている

→ **朝 起きてすぐ `check-status.bat` で確認**。motion_events に 5/30 早朝の DETECTED が増えていれば Webhook 復活。

```powershell
.\06_LP\edix-lp\scripts\check-status.bat
```

```powershell
# Turso 直接確認
$env:TURSO_DATABASE_URL = "libsql://kimiterrace-sensor-cometa-kaito.aws-ap-northeast-1.turso.io"
$env:TURSO_AUTH_TOKEN = "<昨夜のAuth Token>"
node .\06_LP\edix-lp\scripts\inspect-events.mjs
```

`motion_events` に `source` が **`ble-local` でない** レコード（SwitchBot Cloud 由来）が増えていれば Webhook 動き出した、と判定。

---

## 3. シナリオ別の手順

### シナリオ B（Hub 2 + クラウド単独でいける場合）

最もシンプル。これで PoC を回せる。

1. Hub 2 を教室の電源に挿す（学校）
2. 学校 Wi-Fi に Hub 2 を再接続（SwitchBot アプリで再設定）
3. 人感センサを設置位置（教室扉付近など、生徒の通過を捉える場所）に置く
4. `/api/sensor-stats?key=...&hours=1` を定期チェック（朝礼前後・昼休み前後）

### シナリオ C（Pi Zero 2 W 追加）

Wi-Fi 不安定なら、ローカル BLE 受信機を学校に追加。

**発注リスト（Amazon 想定、即日〜翌日着）**:
- Raspberry Pi Zero 2 W 本体: 約 2,000 円
- microSD 16GB（Sandisk 等）: 約 800 円
- USB ケーブル（micro-USB to Type-A）: 約 500 円
- USB 充電器（5V/2A）: 約 800 円
- （任意）小型ケース: 約 800 円

合計 **約 5,000 円**。

**セットアップ手順（届いてから）**:
1. Raspberry Pi OS Lite (32-bit) を microSD に Imager で焼く
2. 初回起動時に SSH 有効化、Wi-Fi 設定
3. `apt install python3-pip` → `pip install bleak pyswitchbot` （Python 3.11+）
4. `scripts/ble_recorder.py` をそのまま Pi にコピーして `python3 ble_recorder.py`
5. `systemd` ユニット化して自動起動
6. 学校 Wi-Fi が繋がるなら同じ URL に POST、繋がらないならローカル蓄積のみ

ハンドオフ用 `systemd` ユニットの雛形:
```ini
[Unit]
Description=Kimiterrace BLE Recorder
After=bluetooth.target network.target

[Service]
Environment=TARGET_MAC=DC:A5:B3:C2:98:D7
Environment=WEBHOOK_URL=https://www.school-signage.net/api/switchbot-webhook?key=<SECRET>
Environment=PYTHONUTF8=1
ExecStart=/usr/bin/python3 /home/pi/ble_recorder.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

### シナリオ D（自宅 BLE Recorder のみ）

PoC を成立させるための妥協シナリオ。**センサも自宅に置く** ことになる。
- 校長先生・石井先生に「学校設置は技術リードタイム不足のため、PoC 後半でリトライしたい」と説明が必要
- 校内サイネージの効果指標として「センサが捉えた検知数」は使えなくなるため、F08 ダッシュボードの根拠データは別途検討

---

## 4. 操作早見表

### 4-1. BLE Recorder を起動する（自宅 PC）

```
ダブルクリック → 06_LP\edix-lp\scripts\start-ble-recorder-loop.bat
```

コマンドプロンプトが開き、ログが流れる。閉じれば停止。

### 4-2. ローカル DB の状態を確認

```
ダブルクリック → 06_LP\edix-lp\scripts\check-status.bat
```

### 4-3. クラウドの集計を確認（ブラウザ）

```
https://www.school-signage.net/api/sensor-stats?key=0khL1mUcvIYYEowrO-Z1CuZQGIyMYHerkb30uFuByl0&hours=24
```

### 4-4. Turso DB を直接 SQL で叩く

Turso ダッシュボード → kimiterrace-sensor → SQL Console

```sql
-- 直近の生イベント
SELECT id, device_mac, detection_state,
       datetime(detected_at_ms/1000, 'unixepoch', '+9 hours') AS jst
FROM motion_events
ORDER BY id DESC LIMIT 20;

-- 時間帯別集計
SELECT strftime('%Y-%m-%d %H:00', detected_at_ms/1000, 'unixepoch', '+9 hours') AS hour,
       COUNT(*) AS n
FROM motion_events
WHERE detection_state = 'DETECTED'
GROUP BY hour
ORDER BY hour DESC LIMIT 48;
```

---

## 5. 既知のリスク・未解決事項

### 5-1. SwitchBot Cloud Webhook の沈黙

- 21:30 頃に登録した Webhook が発火していない（5/30 1:00 時点）
- 原因不明。朝に動き始める可能性もあるが、楽観しない方が安全
- **暫定対応**: ローカル BLE Recorder を一次経路にしているので致命的ではない
- **本来やるべき**: SwitchBot 側のサポート問い合わせ、または別 Webhook 受信先（Pipedream 等）でテスト

### 5-2. 重複イベントの可能性

- もし SwitchBot Webhook が動き出すと、BLE Recorder と二重に POST されて重複レコードができる
- 短期的には許容（device_mac で識別 + raw_payload に `source` フィールドあり）
- 中期的には `/api/switchbot-webhook` 側で「同一 device_mac の最終イベントから 5 秒以内かつ同じ state なら無視」のデダップを足す。実装は ~20 行で済むが今夜は手を付けていない

### 5-3. Python 3.14 + 非ASCIIパス問題

- `py スクリプト.py` が日本語パスでは bleak import 失敗
- 必ず `py -X utf8` 経由で起動。`.bat` 内では `SET PYTHONUTF8=1` も併用
- これは Python 3.15 でデフォルト UTF-8 モードになる予定なので将来解消する

### 5-4. v2 (キミテラス-v2) PR #102

- 機能要件 F13 + ADR-020 を docs として PR open 中（CI 走行中だった）
- 5/30 朝に CI 結果を `gh pr view 102` で確認、green なら自律マージ可、redなら要対応
- 本 PoC（LP 側）の運用には影響しない（v2 はまだ調査・設計フェーズ）

---

## 6. PoC 開始直前チェックリスト（2026-05-31 夜 or 6-01 朝）

PoC 赤線「初日に動いていなかった日のデータは取り戻せない」を死守するために。

- [ ] `start-ble-recorder-loop.bat` が起動中、ログが流れている
- [ ] `check-status.bat` で総レコード数が増えている（センサの前を通ったら増える）
- [ ] `/api/sensor-stats?key=...&hours=1` が 200 を返す
- [ ] Turso ダッシュボードで motion_events の最新行が直近のもの
- [ ] PC（または Pi）のスリープ・休止が無効化されている
- [ ] PC（または Pi）と人感センサの距離 < 10m
- [ ] Hub 2 / センサの電池残量が十分（センサは CR2450 × 2、Hub 2 はコンセント常時）
- [ ] 万一クラッシュした際の自動再起動が効くか（プロセス kill → 10 秒後復帰確認）

---

## 7. 連絡・参照先

- **LP 本番**: https://www.school-signage.net
- **Vercel プロジェクト**: edix-lp（kaito-okumuras-projects）
- **Turso DB**: kimiterrace-sensor (aws-ap-northeast-1)
- **GitHub LP**: https://github.com/cometa-kaito/edix-lp
- **GitHub v2**: https://github.com/cometa-kaito/kimiterrace-v2
- **v2 PR #102**: https://github.com/cometa-kaito/kimiterrace-v2/pull/102

---

## 8. 補足：今夜の作業成果（コミット履歴）

```
ee3c377 → c461a74  Add PoC sensor pipeline scripts (local-first BLE recorder)
8e1f548 → ee3c377  Add SwitchBot motion sensor webhook ingestion
6c3352b → 8e1f548  Update sensor copy: LiDAR → 人感センサー (PIR)
```

v2 リポジトリ:
```
PR #102: docs(requirements): add F13 presence-sensor webhook + ADR-020
```
