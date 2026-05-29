#!/usr/bin/env python3
"""
SwitchBot 人感センサの BLE Advertisement を観測する診断ツール。
指定 MAC のセンサが出すアドバタイズの生データを延々と表示する。

使い方:
    py scripts/ble_observe.py [MAC]

引数なしなら DEFAULT_MAC を使用。
"""

import asyncio
import sys
import time
from bleak import BleakScanner

DEFAULT_MAC = "DC:A5:B3:C2:98:D7"

target_mac = (sys.argv[1] if len(sys.argv) > 1 else DEFAULT_MAC).upper()

last_payload = None
seen_count = 0


def on_detection(device, advertisement_data):
    global last_payload, seen_count
    if device.address.upper() != target_mac:
        return

    seen_count += 1
    now = time.strftime("%H:%M:%S")
    rssi = advertisement_data.rssi

    # 生データを全て吐き出す
    manuf = advertisement_data.manufacturer_data  # {company_id: bytes}
    svc = advertisement_data.service_data  # {uuid: bytes}
    svc_uuids = advertisement_data.service_uuids

    # 重要な部分を 1 行に圧縮表示（変化したものだけ詳細出力）
    fingerprint = (
        tuple(sorted((cid, bytes(d).hex()) for cid, d in manuf.items())),
        tuple(sorted((u, bytes(d).hex()) for u, d in svc.items())),
    )

    changed = fingerprint != last_payload
    marker = "*** CHANGED ***" if changed else ""
    print(f"[{now}] seen #{seen_count}  rssi={rssi} dBm  {marker}")

    if changed:
        print(f"    manufacturer_data: {[(hex(cid), bytes(d).hex()) for cid, d in manuf.items()]}")
        print(f"    service_data    : {[(u, bytes(d).hex()) for u, d in svc.items()]}")
        print(f"    service_uuids   : {svc_uuids}")
        last_payload = fingerprint


async def main():
    print(f"Scanning for SwitchBot motion sensor MAC={target_mac}")
    print("センサーの前で手を振ったり静止したりを繰り返してください。Ctrl+C で停止。\n")

    duration = int(sys.argv[2]) if len(sys.argv) > 2 else 30
    scanner = BleakScanner(detection_callback=on_detection)
    await scanner.start()
    try:
        await asyncio.sleep(duration)
    finally:
        await scanner.stop()
        print(f"\n停止しました。合計 {seen_count} 件のアドバタイズを受信。")


if __name__ == "__main__":
    asyncio.run(main())
