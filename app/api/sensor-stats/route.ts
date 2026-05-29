import { NextRequest, NextResponse } from 'next/server';
import { getRecentStats, getTotalEventCount } from '@/lib/sensor-db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const secret = process.env.SWITCHBOT_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: 'misconfigured' }, { status: 500 });
  }

  const url = new URL(req.url);
  const key = url.searchParams.get('key') ?? req.headers.get('x-webhook-key');
  if (key !== secret) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  const hoursParam = url.searchParams.get('hours');
  const hours = hoursParam ? Math.max(1, Math.min(720, Number(hoursParam))) : 24;

  try {
    const [total, recent] = await Promise.all([getTotalEventCount(), getRecentStats(hours)]);
    return NextResponse.json({
      ok: true,
      totalEvents: total,
      hours,
      detectedByHour: recent,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
