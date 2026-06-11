import { headers } from 'next/headers';
import { isAuthConfigured, isAuthorizedKey } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type DeviceSummary = {
  device_id: string;
  label: string;
  school_id: string | null;
  grade_id: string | null;
  department_id: string | null;
  class_id: string | null;
  target_mac: string | null;
  last_seen_ms: number | null;
  detected_1h: number;
  detected_24h: number;
  last_event_ms: number | null;
  last_event_state: string | null;
};

async function fetchData(secret: string, hostBase: string): Promise<{
  devices: DeviceSummary[];
  total: number;
  detectedByHour: Array<{ hourBucket: string; detectedCount: number }>;
  recentEvents: Array<{
    id: number;
    tv_device_id: string | null;
    label: string | null;
    state: string;
    detected_jst: string;
  }>;
}> {
  const { createClient } = await import('@libsql/client');
  const c = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });

  const [devicesRes, statsRes, recentRes] = await Promise.all([
    c.execute(`
      SELECT d.device_id, d.label, d.school_id, d.grade_id, d.department_id, d.class_id,
             d.target_mac, d.last_seen_ms,
             (SELECT COUNT(*) FROM motion_events e
                WHERE e.detection_state='DETECTED'
                  AND (e.tv_device_id = d.device_id OR
                       (e.tv_device_id IS NULL AND e.device_mac = d.target_mac))
                  AND e.detected_at_ms >= strftime('%s','now','-1 hour') * 1000) AS detected_1h,
             (SELECT COUNT(*) FROM motion_events e
                WHERE e.detection_state='DETECTED'
                  AND (e.tv_device_id = d.device_id OR
                       (e.tv_device_id IS NULL AND e.device_mac = d.target_mac))
                  AND e.detected_at_ms >= strftime('%s','now','-1 day') * 1000) AS detected_24h,
             (SELECT MAX(detected_at_ms) FROM motion_events e
                WHERE (e.tv_device_id = d.device_id OR
                       (e.tv_device_id IS NULL AND e.device_mac = d.target_mac))) AS last_event_ms,
             (SELECT detection_state FROM motion_events e
                WHERE (e.tv_device_id = d.device_id OR
                       (e.tv_device_id IS NULL AND e.device_mac = d.target_mac))
                ORDER BY id DESC LIMIT 1) AS last_event_state
      FROM tv_devices d
      ORDER BY d.school_id, d.grade_id, d.class_id
    `),
    c.execute(`
      SELECT strftime('%Y-%m-%d %H:00', detected_at_ms/1000, 'unixepoch', '+9 hours') AS hour_bucket,
             COUNT(*) AS detected_count
      FROM motion_events
      WHERE detection_state='DETECTED'
        AND detected_at_ms >= strftime('%s','now','-24 hours') * 1000
      GROUP BY hour_bucket
      ORDER BY hour_bucket
    `),
    c.execute(`
      SELECT e.id, e.tv_device_id, e.detection_state AS state,
             datetime(e.detected_at_ms/1000, 'unixepoch', '+9 hours') AS detected_jst,
             d.label AS label
      FROM motion_events e
      LEFT JOIN tv_devices d ON d.device_id = e.tv_device_id
        OR (e.tv_device_id IS NULL AND d.target_mac = e.device_mac)
      ORDER BY e.id DESC
      LIMIT 20
    `),
  ]);

  const totalRes = await c.execute(
    `SELECT COUNT(*) AS n FROM motion_events WHERE detection_state='DETECTED'`,
  );

  return {
    devices: devicesRes.rows.map((r) => ({
      device_id: String(r.device_id),
      label: String(r.label),
      school_id: r.school_id ? String(r.school_id) : null,
      grade_id: r.grade_id ? String(r.grade_id) : null,
      department_id: r.department_id ? String(r.department_id) : null,
      class_id: r.class_id ? String(r.class_id) : null,
      target_mac: r.target_mac ? String(r.target_mac) : null,
      last_seen_ms: r.last_seen_ms != null ? Number(r.last_seen_ms) : null,
      detected_1h: Number(r.detected_1h ?? 0),
      detected_24h: Number(r.detected_24h ?? 0),
      last_event_ms: r.last_event_ms != null ? Number(r.last_event_ms) : null,
      last_event_state: r.last_event_state ? String(r.last_event_state) : null,
    })),
    total: Number(totalRes.rows[0]?.n ?? 0),
    detectedByHour: statsRes.rows.map((r) => ({
      hourBucket: String(r.hour_bucket),
      detectedCount: Number(r.detected_count),
    })),
    recentEvents: recentRes.rows.map((r) => ({
      id: Number(r.id),
      tv_device_id: r.tv_device_id ? String(r.tv_device_id) : null,
      label: r.label ? String(r.label) : null,
      state: String(r.state),
      detected_jst: String(r.detected_jst),
    })),
  };
}

function statusIcon(lastEventMs: number | null): { icon: string; text: string; color: string } {
  if (!lastEventMs) return { icon: '⚪', text: '未受信', color: '#888' };
  const elapsedH = (Date.now() - lastEventMs) / 3_600_000;
  if (elapsedH < 24) return { icon: '🟢', text: 'healthy', color: '#3a3' };
  if (elapsedH < 168) return { icon: '🟡', text: 'quiet', color: '#aa3' };
  return { icon: '🔴', text: 'dead', color: '#c33' };
}

function fmtElapsed(ms: number | null): string {
  if (!ms) return '—';
  const sec = Math.max(0, Math.floor((Date.now() - ms) / 1000));
  if (sec < 60) return `${sec}秒前`;
  if (sec < 3600) return `${Math.floor(sec / 60)}分前`;
  if (sec < 86400) return `${Math.floor(sec / 3600)}時間前`;
  return `${Math.floor(sec / 86400)}日前`;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const params = await searchParams;
  const providedKey = params.key ?? '';

  if (!isAuthConfigured() || !isAuthorizedKey(providedKey)) {
    return (
      <main style={{ padding: 32, fontFamily: 'sans-serif', background: '#0a0a0a', color: '#eee', minHeight: '100vh' }}>
        <h1>🔒 認証が必要です</h1>
        <p>URL の <code>?key=</code> に正しいシークレットを指定してください。</p>
      </main>
    );
  }

  const data = await fetchData(providedKey, '');

  return (
    <main
      style={{
        padding: 24,
        background: '#0a0a0a',
        color: '#eee',
        fontFamily: 'sans-serif',
        minHeight: '100vh',
      }}
    >
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>📡 センサーダッシュボード</h1>
        <p style={{ margin: 0, color: '#888' }}>30秒ごとに自動更新</p>
      </header>

      {/* 全体サマリ */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
          marginBottom: 24,
        }}
      >
        <Card label="登録TV数" value={String(data.devices.length)} />
        <Card label="総 DETECTED 件数" value={String(data.total)} />
        <Card
          label="直近 1h DETECTED"
          value={String(data.devices.reduce((a, d) => a + d.detected_1h, 0))}
        />
        <Card
          label="直近 24h DETECTED"
          value={String(data.devices.reduce((a, d) => a + d.detected_24h, 0))}
        />
      </section>

      {/* TV ごとのカード */}
      <h2 style={{ marginTop: 24 }}>教室別</h2>
      {data.devices.length === 0 ? (
        <p style={{ color: '#888' }}>
          まだ TV が登録されていません。TV が ConfigPoller でこのサーバを叩くと自動登録されます。
        </p>
      ) : (
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 12,
          }}
        >
          {data.devices.map((d) => {
            const st = statusIcon(d.last_event_ms);
            return (
              <div
                key={d.device_id}
                style={{
                  background: '#1a1a1a',
                  border: `2px solid ${st.color}`,
                  borderRadius: 12,
                  padding: 16,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0 }}>
                    {st.icon} {d.label}
                  </h3>
                  <span style={{ color: st.color, fontSize: 12 }}>{st.text}</span>
                </div>
                <p style={{ color: '#888', margin: '4px 0', fontSize: 12 }}>
                  device_id: <code>{d.device_id.slice(0, 8)}…</code>
                </p>
                <p style={{ color: '#888', margin: '4px 0', fontSize: 12 }}>
                  MAC: <code>{d.target_mac ?? '-'}</code>
                </p>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 8,
                    marginTop: 12,
                  }}
                >
                  <Metric label="直近 1h" value={String(d.detected_1h)} />
                  <Metric label="直近 24h" value={String(d.detected_24h)} />
                </div>
                <p style={{ color: '#aaa', margin: '12px 0 0 0', fontSize: 12 }}>
                  最終検知: {fmtElapsed(d.last_event_ms)} ({d.last_event_state ?? '-'})
                </p>
                <p style={{ color: '#666', margin: '4px 0 0 0', fontSize: 12 }}>
                  最終ポーリング: {fmtElapsed(d.last_seen_ms)}
                </p>
              </div>
            );
          })}
        </section>
      )}

      {/* 時間帯グラフ（簡易） */}
      <h2 style={{ marginTop: 32 }}>直近 24h DETECTED (時間帯別、全教室合計)</h2>
      <SimpleBar bars={data.detectedByHour} />

      {/* 最新イベント */}
      <h2 style={{ marginTop: 32 }}>最新イベント（直近 20 件）</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#1a1a1a', borderRadius: 8 }}>
        <thead>
          <tr style={{ textAlign: 'left' }}>
            <Th>#</Th>
            <Th>教室</Th>
            <Th>状態</Th>
            <Th>検知時刻 (JST)</Th>
          </tr>
        </thead>
        <tbody>
          {data.recentEvents.map((e) => (
            <tr key={e.id} style={{ borderTop: '1px solid #333' }}>
              <Td>{e.id}</Td>
              <Td>{e.label ?? '(未登録)'}</Td>
              <Td>
                <span style={{ color: e.state === 'DETECTED' ? '#3f3' : '#888' }}>{e.state}</span>
              </Td>
              <Td>{e.detected_jst}</Td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer style={{ marginTop: 32, color: '#666', fontSize: 12 }}>
        生成時刻: {new Date().toISOString()}
      </footer>

      {/* 30秒オートリフレッシュ（meta refresh は SSR で素直に使える） */}
      <meta httpEquiv="refresh" content="30" />
    </main>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: '#1a1a1a', borderRadius: 8, padding: 16 }}>
      <p style={{ color: '#888', margin: 0, fontSize: 12 }}>{label}</p>
      <p style={{ margin: '4px 0 0 0', fontSize: 28, fontWeight: 700 }}>{value}</p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{ color: '#888', margin: 0, fontSize: 11 }}>{label}</p>
      <p style={{ margin: '2px 0 0 0', fontSize: 20, fontWeight: 600 }}>{value}</p>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th style={{ padding: 8, color: '#aaa', fontSize: 12, fontWeight: 500 }}>{children}</th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td style={{ padding: 8, fontSize: 14 }}>{children}</td>;
}

function SimpleBar({ bars }: { bars: Array<{ hourBucket: string; detectedCount: number }> }) {
  const max = Math.max(1, ...bars.map((b) => b.detectedCount));
  if (bars.length === 0) {
    return <p style={{ color: '#888' }}>直近 24h に DETECTED イベントなし</p>;
  }
  return (
    <div style={{ background: '#1a1a1a', borderRadius: 8, padding: 12 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 120 }}>
        {bars.map((b) => (
          <div
            key={b.hourBucket}
            title={`${b.hourBucket}: ${b.detectedCount}`}
            style={{
              flex: 1,
              background: '#3a8',
              height: `${(b.detectedCount / max) * 100}%`,
              minHeight: 2,
              borderRadius: 2,
              position: 'relative',
            }}
          >
            <span style={{ position: 'absolute', top: -16, left: 0, right: 0, textAlign: 'center', fontSize: 10 }}>
              {b.detectedCount > 0 ? b.detectedCount : ''}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
        {bars.map((b) => (
          <span
            key={b.hourBucket}
            style={{ flex: 1, fontSize: 9, color: '#666', textAlign: 'center', writingMode: 'vertical-rl' }}
          >
            {b.hourBucket.split(' ')[1]}
          </span>
        ))}
      </div>
    </div>
  );
}
