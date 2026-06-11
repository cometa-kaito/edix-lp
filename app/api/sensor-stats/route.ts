import { NextRequest, NextResponse } from 'next/server';
import { getRecentStats, getTotalEventCount, getStatsByClass } from '@/lib/sensor-db';
import { isAuthConfigured, isAuthorizedKey } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  if (!isAuthConfigured()) {
    return NextResponse.json({ ok: false, error: 'misconfigured' }, { status: 500 });
  }

  const url = new URL(req.url);
  const key = url.searchParams.get('key') ?? req.headers.get('x-webhook-key');
  if (!isAuthorizedKey(key)) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  const hoursParam = url.searchParams.get('hours');
  const hours = hoursParam ? Math.max(1, Math.min(720, Number(hoursParam))) : 24;

  try {
    const [total, recent, byClass] = await Promise.all([
      getTotalEventCount(),
      getRecentStats(hours),
      getStatsByClass(hours),
    ]);
    return NextResponse.json({
      ok: true,
      totalEvents: total,
      hours,
      detectedByHour: recent,
      byClass,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
