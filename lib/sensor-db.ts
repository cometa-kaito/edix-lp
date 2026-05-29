import { createClient, type Client } from '@libsql/client';

let cachedClient: Client | null = null;

function getClient(): Client {
  if (cachedClient) return cachedClient;

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    throw new Error('TURSO_DATABASE_URL is not set');
  }

  cachedClient = createClient({ url, authToken });
  return cachedClient;
}

export type MotionEventInsert = {
  deviceMac: string;
  deviceId?: string | null;
  detectionState: string;
  detectedAtMs: number;
  eventType?: string | null;
  rawPayload: string;
};

export async function insertMotionEvent(event: MotionEventInsert): Promise<void> {
  const client = getClient();
  await client.execute({
    sql: `INSERT INTO motion_events
            (device_mac, device_id, detection_state, detected_at_ms, event_type, raw_payload)
          VALUES (?, ?, ?, ?, ?, ?)`,
    args: [
      event.deviceMac,
      event.deviceId ?? null,
      event.detectionState,
      event.detectedAtMs,
      event.eventType ?? null,
      event.rawPayload,
    ],
  });
}

export async function insertWebhookFailure(reason: string, rawPayload: string): Promise<void> {
  const client = getClient();
  await client.execute({
    sql: `INSERT INTO webhook_failures (reason, raw_payload) VALUES (?, ?)`,
    args: [reason, rawPayload],
  });
}

export type SensorStatsRow = {
  hourBucket: string;
  detectedCount: number;
};

export async function getRecentStats(hours: number): Promise<SensorStatsRow[]> {
  const client = getClient();
  const sinceMs = Date.now() - hours * 60 * 60 * 1000;
  const result = await client.execute({
    sql: `SELECT
            strftime('%Y-%m-%d %H:00', detected_at_ms / 1000, 'unixepoch', '+9 hours') AS hour_bucket,
            COUNT(*) AS detected_count
          FROM motion_events
          WHERE detection_state = 'DETECTED' AND detected_at_ms >= ?
          GROUP BY hour_bucket
          ORDER BY hour_bucket DESC`,
    args: [sinceMs],
  });
  return result.rows.map((r) => ({
    hourBucket: String(r.hour_bucket),
    detectedCount: Number(r.detected_count),
  }));
}

export async function getTotalEventCount(): Promise<number> {
  const client = getClient();
  const result = await client.execute('SELECT COUNT(*) AS n FROM motion_events');
  return Number(result.rows[0]?.n ?? 0);
}
