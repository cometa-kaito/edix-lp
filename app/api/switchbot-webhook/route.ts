import { NextRequest, NextResponse } from 'next/server';
import { insertMotionEvent, insertWebhookFailure } from '@/lib/sensor-db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type SwitchBotWebhookPayload = {
  eventType?: string;
  eventVersion?: string;
  context?: {
    deviceType?: string;
    deviceMac?: string;
    deviceId?: string;
    detectionState?: string;
    timeOfSample?: number;
    [k: string]: unknown;
  };
};

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.SWITCHBOT_WEBHOOK_SECRET;
  if (!secret) return false;

  const url = new URL(req.url);
  const keyFromQuery = url.searchParams.get('key');
  const keyFromHeader = req.headers.get('x-webhook-key');
  return keyFromQuery === secret || keyFromHeader === secret;
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  const rawText = await req.text();

  let payload: SwitchBotWebhookPayload;
  try {
    payload = JSON.parse(rawText) as SwitchBotWebhookPayload;
  } catch {
    await safeLogFailure('invalid_json', rawText);
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const ctx = payload.context;
  const detectionState = ctx?.detectionState;
  const deviceMac = ctx?.deviceMac;
  const timeOfSample = ctx?.timeOfSample;

  if (!ctx || typeof detectionState !== 'string' || typeof deviceMac !== 'string') {
    await safeLogFailure('missing_motion_fields', rawText);
    return NextResponse.json({ ok: true, ignored: true });
  }

  const detectedAtMs =
    typeof timeOfSample === 'number' && Number.isFinite(timeOfSample)
      ? timeOfSample
      : Date.now();

  try {
    await insertMotionEvent({
      deviceMac,
      deviceId: typeof ctx.deviceId === 'string' ? ctx.deviceId : null,
      detectionState,
      detectedAtMs,
      eventType: typeof payload.eventType === 'string' ? payload.eventType : null,
      rawPayload: rawText,
    });
  } catch (err) {
    await safeLogFailure(
      `insert_failed: ${err instanceof Error ? err.message : String(err)}`,
      rawText,
    );
    return NextResponse.json({ ok: false, error: 'insert_failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

async function safeLogFailure(reason: string, rawPayload: string): Promise<void> {
  try {
    await insertWebhookFailure(reason, rawPayload);
  } catch {
    // 失敗の失敗は飲み込む（PoC優先）
  }
}
