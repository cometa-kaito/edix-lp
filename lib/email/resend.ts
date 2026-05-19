import { Resend } from 'resend';

// Resend クライアント（lazy 初期化）
let _client: Resend | null = null;

function getClient(): Resend {
  if (_client) return _client;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not set');
  }
  _client = new Resend(apiKey);
  return _client;
}

// 送信元（ドメイン未検証時は onboarding@resend.dev を使用）
const DEFAULT_FROM = 'キミテラス <onboarding@resend.dev>';

// 送信先（環境変数で上書き可能・初期値は本番宛先）
const DEFAULT_TO = 'rebounder@googlegroups.com';

export interface SendOptions {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail(opts: SendOptions): Promise<void> {
  const from = process.env.RESEND_FROM || DEFAULT_FROM;
  const to = process.env.RESEND_TO || DEFAULT_TO;

  const client = getClient();
  const result = await client.emails.send({
    from,
    to,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
    replyTo: opts.replyTo,
  });

  if (result.error) {
    const err: unknown = result.error;
    let msg: string;
    if (typeof err === 'string') {
      msg = err;
    } else if (err && typeof err === 'object' && 'message' in err && typeof (err as { message: unknown }).message === 'string') {
      msg = (err as { message: string }).message;
    } else {
      msg = JSON.stringify(err);
    }
    throw new Error(`Resend send failed: ${msg}`);
  }
}

// HTML エスケープ
export function escHtml(s: string | undefined | null): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\n/g, '<br>');
}
