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
  // マルチデバイス対応で追加（教室コンテキスト）
  tvDeviceId?: string | null;
  schoolId?: string | null;
  gradeId?: string | null;
  departmentId?: string | null;
  classId?: string | null;
};

export async function insertMotionEvent(event: MotionEventInsert): Promise<void> {
  const client = getClient();
  await client.execute({
    sql: `INSERT INTO motion_events
            (device_mac, device_id, detection_state, detected_at_ms, event_type, raw_payload,
             tv_device_id, school_id, grade_id, department_id, class_id)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      event.deviceMac,
      event.deviceId ?? null,
      event.detectionState,
      event.detectedAtMs,
      event.eventType ?? null,
      event.rawPayload,
      event.tvDeviceId ?? null,
      event.schoolId ?? null,
      event.gradeId ?? null,
      event.departmentId ?? null,
      event.classId ?? null,
    ],
  });
}

// ---------- TV デバイス管理 ----------

export type TvDevice = {
  deviceId: string;
  label: string;
  schoolId: string | null;
  gradeId: string | null;
  departmentId: string | null;
  classId: string | null;
  targetMac: string | null;
  signageUrl: string | null;
  webhookUrl: string | null;
  scheduleJson: string | null;
  commandsJson: string | null;
  version: number;
  registeredAtMs: number;
  lastSeenMs: number | null;
  lastKnownIp: string | null;
  notes: string | null;
};

function rowToTvDevice(r: Record<string, unknown>): TvDevice {
  return {
    deviceId: String(r.device_id),
    label: String(r.label),
    schoolId: r.school_id ? String(r.school_id) : null,
    gradeId: r.grade_id ? String(r.grade_id) : null,
    departmentId: r.department_id ? String(r.department_id) : null,
    classId: r.class_id ? String(r.class_id) : null,
    targetMac: r.target_mac ? String(r.target_mac) : null,
    signageUrl: r.signage_url ? String(r.signage_url) : null,
    webhookUrl: r.webhook_url ? String(r.webhook_url) : null,
    scheduleJson: r.schedule_json ? String(r.schedule_json) : null,
    commandsJson: r.commands_json ? String(r.commands_json) : null,
    version: Number(r.version ?? 0),
    registeredAtMs: Number(r.registered_at_ms),
    lastSeenMs: r.last_seen_ms != null ? Number(r.last_seen_ms) : null,
    lastKnownIp: r.last_known_ip ? String(r.last_known_ip) : null,
    notes: r.notes ? String(r.notes) : null,
  };
}

export async function getTvDevice(deviceId: string): Promise<TvDevice | null> {
  const client = getClient();
  const result = await client.execute({
    sql: 'SELECT * FROM tv_devices WHERE device_id = ?',
    args: [deviceId],
  });
  return result.rows[0] ? rowToTvDevice(result.rows[0] as Record<string, unknown>) : null;
}

export async function listTvDevices(): Promise<TvDevice[]> {
  const client = getClient();
  const result = await client.execute(
    'SELECT * FROM tv_devices ORDER BY school_id, grade_id, class_id',
  );
  return result.rows.map((r) => rowToTvDevice(r as Record<string, unknown>));
}

export type TvDeviceUpsert = {
  deviceId: string;
  label?: string;
  schoolId?: string | null;
  gradeId?: string | null;
  departmentId?: string | null;
  classId?: string | null;
  targetMac?: string | null;
  signageUrl?: string | null;
  webhookUrl?: string | null;
  scheduleJson?: string | null;
  commandsJson?: string | null;
};

/**
 * TV デバイスを upsert。version を +1 し last_seen_ms を更新。
 * 既存行があればフィールドをマージ更新、無ければ新規作成。
 */
export async function upsertTvDevice(input: TvDeviceUpsert, lastKnownIp?: string): Promise<TvDevice> {
  const client = getClient();
  const existing = await getTvDevice(input.deviceId);
  const now = Date.now();

  if (!existing) {
    await client.execute({
      sql: `INSERT INTO tv_devices
              (device_id, label, school_id, grade_id, department_id, class_id,
               target_mac, signage_url, webhook_url, schedule_json, commands_json,
               version, registered_at_ms, last_seen_ms, last_known_ip)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)`,
      args: [
        input.deviceId,
        input.label ?? input.deviceId,
        input.schoolId ?? null,
        input.gradeId ?? null,
        input.departmentId ?? null,
        input.classId ?? null,
        input.targetMac ?? null,
        input.signageUrl ?? null,
        input.webhookUrl ?? null,
        input.scheduleJson ?? null,
        input.commandsJson ?? null,
        now,
        now,
        lastKnownIp ?? null,
      ],
    });
  } else {
    await client.execute({
      sql: `UPDATE tv_devices SET
              label = ?, school_id = ?, grade_id = ?, department_id = ?, class_id = ?,
              target_mac = ?, signage_url = ?, webhook_url = ?, schedule_json = ?, commands_json = ?,
              version = version + 1, last_seen_ms = ?, last_known_ip = COALESCE(?, last_known_ip)
            WHERE device_id = ?`,
      args: [
        input.label ?? existing.label,
        input.schoolId !== undefined ? input.schoolId : existing.schoolId,
        input.gradeId !== undefined ? input.gradeId : existing.gradeId,
        input.departmentId !== undefined ? input.departmentId : existing.departmentId,
        input.classId !== undefined ? input.classId : existing.classId,
        input.targetMac !== undefined ? input.targetMac : existing.targetMac,
        input.signageUrl !== undefined ? input.signageUrl : existing.signageUrl,
        input.webhookUrl !== undefined ? input.webhookUrl : existing.webhookUrl,
        input.scheduleJson !== undefined ? input.scheduleJson : existing.scheduleJson,
        input.commandsJson !== undefined ? input.commandsJson : existing.commandsJson,
        now,
        lastKnownIp ?? null,
        input.deviceId,
      ],
    });
  }

  const updated = await getTvDevice(input.deviceId);
  if (!updated) throw new Error('upsertTvDevice: failed to read back');
  return updated;
}

/**
 * TV のポーリング受信時に last_seen と last_known_ip を更新（version は変更しない）。
 */
export async function touchTvDevice(deviceId: string, lastKnownIp?: string): Promise<void> {
  const client = getClient();
  await client.execute({
    sql: `UPDATE tv_devices SET last_seen_ms = ?, last_known_ip = COALESCE(?, last_known_ip)
          WHERE device_id = ?`,
    args: [Date.now(), lastKnownIp ?? null, deviceId],
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

export type ClassStatsRow = {
  classId: string | null;
  gradeId: string | null;
  label: string | null;
  detected: number;
  total: number;
  lastDetectedMs: number | null;
};

/**
 * 教室（class_id）別の検知数集計。各イベントは class_id カラムで教室タグ付け
 * されているので、合算ではなく教室単位で出せる。label は tv_devices から解決。
 */
export async function getStatsByClass(hours: number): Promise<ClassStatsRow[]> {
  const client = getClient();
  const sinceMs = Date.now() - hours * 60 * 60 * 1000;
  const result = await client.execute({
    sql: `SELECT
            m.class_id AS class_id,
            m.grade_id AS grade_id,
            (SELECT d.label FROM tv_devices d WHERE d.class_id = m.class_id LIMIT 1) AS label,
            SUM(CASE WHEN m.detection_state = 'DETECTED' THEN 1 ELSE 0 END) AS detected,
            COUNT(*) AS total,
            MAX(CASE WHEN m.detection_state = 'DETECTED' THEN m.detected_at_ms END) AS last_detected_ms
          FROM motion_events m
          WHERE m.detected_at_ms >= ?
          GROUP BY m.class_id
          ORDER BY detected DESC`,
    args: [sinceMs],
  });
  return result.rows.map((r) => ({
    classId: r.class_id ? String(r.class_id) : null,
    gradeId: r.grade_id ? String(r.grade_id) : null,
    label: r.label ? String(r.label) : null,
    detected: Number(r.detected ?? 0),
    total: Number(r.total ?? 0),
    lastDetectedMs: r.last_detected_ms != null ? Number(r.last_detected_ms) : null,
  }));
}
