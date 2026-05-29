@echo off
REM キミテラスPoC センサーDB ステータス確認（ワンタイム実行）
REM ダブルクリックで状態を表示。秘密情報不要。
SET PYTHONUTF8=1
cd /d "%~dp0"
py -X utf8 sensor_status.py
pause
