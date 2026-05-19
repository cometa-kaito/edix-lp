import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, escHtml } from '@/lib/email/resend';

export const runtime = 'nodejs';

interface ContactPayload {
  name?: string;
  email?: string;
  category?: string;
  message?: string;
  // ハニーポット（ボット検出用・人間は触らない）
  _honey?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let payload: ContactPayload;
  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: 'invalid_json' },
      { status: 400 },
    );
  }

  // ハニーポットが埋まっていたらスパムとして黙って 200 を返す（ボットを引っかけるため成功扱い）
  if (payload._honey && payload._honey.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = (payload.name ?? '').trim();
  const email = (payload.email ?? '').trim();
  const category = (payload.category ?? '').trim();
  const message = (payload.message ?? '').trim();

  // サーバ側バリデーション（クライアント側と同条件）
  const errors: Record<string, string> = {};
  if (!name) errors.name = 'お名前を入力してください';
  if (!email || !EMAIL_RE.test(email)) errors.email = '有効なメールアドレスを入力してください';
  if (!category) errors.category = 'ご種別を選択してください';
  // 入力長の上限（DoS対策）
  if (name.length > 200) errors.name = 'お名前が長すぎます';
  if (email.length > 200) errors.email = 'メールアドレスが長すぎます';
  if (message.length > 5000) errors.message = 'お問い合わせ内容が長すぎます（5000字まで）';

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, error: 'validation', fields: errors },
      { status: 400 },
    );
  }

  const subject = `【キミテラス LP】お問い合わせ（${category}）`;

  const textBody = [
    '【キミテラス LP からのお問い合わせ】',
    '',
    `お名前: ${name}`,
    `メールアドレス: ${email}`,
    `ご種別: ${category}`,
    '',
    '── お問い合わせ内容 ──',
    message || '（記載なし）',
    '',
    '─────────────',
    `送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}`,
    'Source: https://www.school-signage.net/contact',
  ].join('\n');

  const htmlBody = `
<div style="font-family: -apple-system, 'Hiragino Sans', sans-serif; max-width: 640px; color: #1E293B;">
  <h2 style="color: #0f4c81; border-bottom: 2px solid #F08A45; padding-bottom: 8px;">
    キミテラス LP からのお問い合わせ
  </h2>
  <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
    <tr>
      <td style="padding: 10px; border: 1px solid #e5e7eb; background: #f4f8fc; width: 30%;">お名前</td>
      <td style="padding: 10px; border: 1px solid #e5e7eb;"><strong>${escHtml(name)}</strong></td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #e5e7eb; background: #f4f8fc;">メール</td>
      <td style="padding: 10px; border: 1px solid #e5e7eb;">
        <a href="mailto:${escHtml(email)}" style="color: #0f4c81;">${escHtml(email)}</a>
      </td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #e5e7eb; background: #f4f8fc;">ご種別</td>
      <td style="padding: 10px; border: 1px solid #e5e7eb;">${escHtml(category)}</td>
    </tr>
  </table>
  <h3 style="margin-top: 20px; font-size: 16px; color: #1E293B;">お問い合わせ内容</h3>
  <p style="padding: 12px; background: #f4f8fc; border-left: 3px solid #F08A45; margin: 8px 0;">
    ${message ? escHtml(message) : '<em>（記載なし）</em>'}
  </p>
  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
  <p style="color: #64748B; font-size: 12px;">
    送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}<br>
    Source: <a href="https://www.school-signage.net/contact" style="color: #0f4c81;">https://www.school-signage.net/contact</a>
  </p>
</div>`.trim();

  try {
    await sendEmail({
      subject,
      text: textBody,
      html: htmlBody,
      replyTo: email,
    });
  } catch (e) {
    console.error('contact send failed', e);
    return NextResponse.json(
      { ok: false, error: 'send_failed' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
