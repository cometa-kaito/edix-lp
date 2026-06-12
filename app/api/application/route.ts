import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, escHtml } from '@/lib/email/resend';

export const runtime = 'nodejs';

interface ApplicationPayload {
  company?: string;
  name?: string;
  email?: string;
  purpose?: string;
  message?: string;
  _honey?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let payload: ApplicationPayload;
  try {
    payload = (await req.json()) as ApplicationPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: 'invalid_json' },
      { status: 400 },
    );
  }

  if (payload._honey && payload._honey.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const company = (payload.company ?? '').trim();
  const name = (payload.name ?? '').trim();
  const email = (payload.email ?? '').trim();
  const purpose = (payload.purpose ?? '').trim();
  const message = (payload.message ?? '').trim();

  const errors: Record<string, string> = {};
  if (!company) errors.company = '会社名を入力してください';
  if (!name) errors.name = 'ご担当者名を入力してください';
  if (!email || !EMAIL_RE.test(email)) errors.email = '有効なメールアドレスを入力してください';
  if (company.length > 200) errors.company = '会社名が長すぎます';
  if (name.length > 200) errors.name = 'お名前が長すぎます';
  if (email.length > 200) errors.email = 'メールアドレスが長すぎます';
  if (message.length > 5000) errors.message = '備考が長すぎます（5000字まで）';

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, error: 'validation', fields: errors },
      { status: 400 },
    );
  }

  const subject = `【キミテラス】広告掲載お申し込み（${company}）`;

  const textBody = [
    '【キミテラス LP からの広告掲載お申し込み】',
    '',
    `会社名: ${company}`,
    `ご担当者: ${name}`,
    `メールアドレス: ${email}`,
    `広告の目的: ${purpose || '（未選択）'}`,
    '',
    '── 備考 ──',
    message || '（記載なし）',
    '',
    '─────────────',
    `送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}`,
    'Source: https://www.school-signage.net/for-advertisers',
  ].join('\n');

  const htmlBody = `
<div style="font-family: -apple-system, 'Hiragino Sans', sans-serif; max-width: 640px; color: #1E293B;">
  <h2 style="color: #0f4c81; border-bottom: 2px solid #F08A45; padding-bottom: 8px;">
    広告掲載お申し込み
  </h2>
  <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
    <tr>
      <td style="padding: 10px; border: 1px solid #e5e7eb; background: #f4f8fc; width: 30%;">会社名</td>
      <td style="padding: 10px; border: 1px solid #e5e7eb;"><strong>${escHtml(company)}</strong></td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #e5e7eb; background: #f4f8fc;">ご担当者</td>
      <td style="padding: 10px; border: 1px solid #e5e7eb;">${escHtml(name)}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #e5e7eb; background: #f4f8fc;">メール</td>
      <td style="padding: 10px; border: 1px solid #e5e7eb;">
        <a href="mailto:${escHtml(email)}" style="color: #0f4c81;">${escHtml(email)}</a>
      </td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #e5e7eb; background: #f4f8fc;">広告の目的</td>
      <td style="padding: 10px; border: 1px solid #e5e7eb;">${escHtml(purpose || '（未選択）')}</td>
    </tr>
  </table>
  <h3 style="margin-top: 20px; font-size: 16px; color: #1E293B;">備考</h3>
  <p style="padding: 12px; background: #f4f8fc; border-left: 3px solid #F08A45; margin: 8px 0;">
    ${message ? escHtml(message) : '<em>（記載なし）</em>'}
  </p>
  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
  <p style="color: #64748B; font-size: 12px;">
    送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}<br>
    Source: <a href="https://www.school-signage.net/for-advertisers" style="color: #0f4c81;">https://www.school-signage.net/for-advertisers</a><br>
    ※ 本フォームの送信をもって契約成立とはなりません。担当者よりご連絡し契約書をお送りいたします。
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
    console.error('application send failed', e);
    return NextResponse.json(
      { ok: false, error: 'send_failed' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
