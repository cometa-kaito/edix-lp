# scripts/

キミテラスPoC 人感センサ パイプラインの運用・診断スクリプト一式。

## ファイル一覧

### Node.js（管理・移行系）

| ファイル | 役割 | 実行コマンド |
|---|---|---|
| `run-migration.mjs` | `migrations/*.sql` を Turso に流し込む | `TURSO_DATABASE_URL=... TURSO_AUTH_TOKEN=... node scripts/run-migration.mjs` |
| `setup-switchbot-webhook.mjs` | SwitchBot 開発者APIで Webhook URL を登録/確認/削除 | `SWITCHBOT_TOKEN=... SWITCHBOT_SECRET=... WEBHOOK_URL=... node scripts/setup-switchbot-webhook.mjs` |
| `inspect-events.mjs` | Turso 上の `motion_events` / `webhook_failures` を直接覗く | `TURSO_DATABASE_URL=... TURSO_AUTH_TOKEN=... node scripts/inspect-events.mjs` |

### Python（BLE 受信・ローカル蓄積）

| ファイル | 役割 |
|---|---|
| `ble_recorder.py` | **本番用 BLE Recorder**。BLE → ローカル SQLite → クラウド送信。状態遷移検知＋失敗時自動リトライ |
| `sensor_status.py` | ローカル SQLite の状態を表示。送信済/未送信比率、最終イベント時刻、24h時間帯別検知数 |
| `ble_observe.py` | BLE 生データ観測ツール（デバッグ用）。デコード前のアドバタイズを生で表示 |

### Windows ランチャー（.bat）

| ファイル | 役割 |
|---|---|
| `start-ble-recorder.bat.template` | 単発起動。実シークレットを書き込んだ `start-ble-recorder.bat` を作って使う |
| `start-ble-recorder-loop.bat.template` | 自動再起動付き起動。同上 |
| `check-status.bat` | `sensor_status.py` を一発実行（シークレット不要） |

`*.bat`（テンプレ無しの実ファイル）は `.gitignore` 済。秘密情報はリポジトリに残らない。

## 初回セットアップ

### 1. Python 依存

```powershell
py -m pip install --user bleak PySwitchbot
```

> **重要**: Python 3.14 + 日本語を含むパスから起動すると `bleak` が import 失敗する。
> 必ず **`py -X utf8 ...`** 経由で実行する。`.bat` 内では `SET PYTHONUTF8=1` を併用。

### 2. Node.js 依存

リポジトリのトップで `npm install` 済なら追加作業なし（`@libsql/client` が入っている）。

### 3. ランチャ作成

```powershell
Copy-Item scripts\start-ble-recorder.bat.template scripts\start-ble-recorder.bat
# テキストエディタで開いて WEBHOOK_URL のシークレット部分を実値に置換
```

### 4. 起動確認

```powershell
.\scripts\start-ble-recorder.bat
```

センサーの前で手を振り、別ウィンドウで:

```powershell
.\scripts\check-status.bat
```

`総レコード数` が増えていれば OK。

## ローカル DB の場所

既定:
```
C:\Users\<username>\Documents\kimiterrace-data\sensor.db
C:\Users\<username>\Documents\kimiterrace-data\logs\recorder-YYYYMMDD.log
```

`LOCAL_DB_PATH` / `LOG_DIR` 環境変数で上書き可能。

## トラブルシュート

### `ModuleNotFoundError: No module named 'bleak'`

`py -X utf8` を使っていないか、日本語パス問題。.bat 経由起動なら問題なし。

### `SYNC fail reason=url_err:...` が続く

ネットワーク切断 or Vercel 側エラー。ローカル DB には貯まり続けているので焦らない。
ネット復帰後、自動的にバックログが消化される。`sensor_status.py` で `未送信` 件数を確認。

### イベントが全く来ない

1. SwitchBot アプリで該当センサがオンラインか確認
2. センサ - PC の距離（Bluetooth 圏 ~10m）
3. `ble_observe.py` で生 BLE アドバタイズが届くか確認

## 学校設置時の運用ポリシー

- PC は**学校に置かない**（盗難・電源切リスク）
- 代わりに小型機（Raspberry Pi Zero 2 W 等）で `ble_recorder.py` をそのまま動かす想定
- それまでは「自宅で開発・検証 → 短期間の学校立ち会いテスト」で運用検証

詳細は [`docs/POC_OPERATIONS.md`](../docs/POC_OPERATIONS.md) 参照。
