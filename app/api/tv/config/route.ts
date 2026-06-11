import { NextRequest, NextResponse } from 'next/server';
import {
  getTvDevice,
  upsertTvDevice,
  touchTvDevice,
  listTvDevices,
  type TvDeviceUpsert,
} from '@/lib/sensor-db';
import { isAuthorizedKey } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isAuthorized(req: NextRequest): boolean {
  const url = new URL(req.url);
  const key = url.searchParams.get('key') ?? req.headers.get('x-webhook-key');
  return isAuthorizedKey(key);
}

function clientIp(req: NextRequest): string | undefined {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0]?.trim();
  return undefined;
}

/**
 * GET /api/tv/config?device_id=<uuid>&key=<secret>
 *   → 該当 TV の最新設定を返す。device_id 未指定なら一覧（管理用）。
 *
 * レスポンス（device_id 指定時）:
 * {
 *   "version": 5,
 *   "config": {
 *     "target_mac": "...",
 *     "webhook_url": "...",
 *     "signage_url": "...",
 *     "schedule": { "enabled": true, "on_hour": 7, ... },
 *     "device_label": "電子工学科 1年"
 *   },
 *   "commands": { "signage_reload": false, ... }
 * }
 */
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  const url = new URL(req.url);
  const deviceId = url.searchParams.get('device_id');

  // device_id 未指定 → 一覧
  if (!deviceId) {
    const devices = await listTvDevices();
    return NextResponse.json({
      ok: true,
      devices: devices.map((d) => ({
        device_id: d.deviceId,
        label: d.label,
        school_id: d.schoolId,
        grade_id: d.gradeId,
        department_id: d.departmentId,
        class_id: d.classId,
        target_mac: d.targetMac,
        signage_url: d.signageUrl,
        version: d.version,
        registered_at_ms: d.registeredAtMs,
        last_seen_ms: d.lastSeenMs,
        last_known_ip: d.lastKnownIp,
      })),
    });
  }

  // device_id 指定 → 該当 TV の設定
  const device = await getTvDevice(deviceId);
  await touchTvDevice(deviceId, clientIp(req));

  if (!device) {
    // 未登録 → 空のレスポンス（TV 側で graceful skip）
    return NextResponse.json(
      {
        version: 0,
        config: {},
        commands: {},
        unknown: true,
      },
      { status: 200 },
    );
  }

  let schedule: unknown = null;
  if (device.scheduleJson) {
    try { schedule = JSON.parse(device.scheduleJson); } catch {}
  }
  let commands: unknown = {};
  if (device.commandsJson) {
    try { commands = JSON.parse(device.commandsJson); } catch {}
  }

  return NextResponse.json({
    version: device.version,
    config: {
      target_mac: device.targetMac ?? undefined,
      webhook_url: device.webhookUrl ?? undefined,
      signage_url: device.signageUrl ?? undefined,
      schedule: schedule ?? undefined,
      device_label: device.label,
    },
    commands,
  });
}

/**
 * POST /api/tv/config?device_id=<uuid>&key=<secret>
 * Body: TvDeviceUpsert（部分）
 *   → 設定を upsert、version をインクリメント。
 *
 * 例:
 *   POST .../tv/config?device_id=abc&key=...
 *   { "label": "電子工学科 1年",
 *     "schedule_json": "{\"enabled\":true,...}" }
 */
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  const url = new URL(req.url);
  const deviceId = url.searchParams.get('device_id');
  if (!deviceId) {
    return NextResponse.json(
      { ok: false, error: 'device_id_required' },
      { status: 400 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const upsert: TvDeviceUpsert = {
    deviceId,
    label: typeof body.label === 'string' ? body.label : undefined,
    schoolId: typeof body.school_id === 'string' ? body.school_id : undefined,
    gradeId: typeof body.grade_id === 'string' ? body.grade_id : undefined,
    departmentId: typeof body.department_id === 'string' ? body.department_id : undefined,
    classId: typeof body.class_id === 'string' ? body.class_id : undefined,
    targetMac: typeof body.target_mac === 'string' ? body.target_mac : undefined,
    signageUrl: typeof body.signage_url === 'string' ? body.signage_url : undefined,
    webhookUrl: typeof body.webhook_url === 'string' ? body.webhook_url : undefined,
    scheduleJson:
      typeof body.schedule === 'object' && body.schedule != null
        ? JSON.stringify(body.schedule)
        : typeof body.schedule_json === 'string'
          ? body.schedule_json
          : undefined,
    commandsJson:
      typeof body.commands === 'object' && body.commands != null
        ? JSON.stringify(body.commands)
        : typeof body.commands_json === 'string'
          ? body.commands_json
          : undefined,
  };

  const updated = await upsertTvDevice(upsert, clientIp(req));
  return NextResponse.json({
    ok: true,
    device_id: updated.deviceId,
    version: updated.version,
  });
}
