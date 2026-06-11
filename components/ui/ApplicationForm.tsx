'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/sections/contact.module.css';

export default function ApplicationForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const company = (form.elements.namedItem('company') as HTMLInputElement).value.trim();
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const purpose = (form.elements.namedItem('purpose') as HTMLSelectElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim();
    const honey = (form.elements.namedItem('_honey') as HTMLInputElement).value;

    const newErrors: Record<string, boolean> = {};
    if (!company) newErrors.company = true;
    if (!name) newErrors.name = true;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSendError(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company, name, email, purpose, message, _honey: honey }),
      });

      if (!res.ok) {
        const data: { fields?: Record<string, string>; error?: string } = await res
          .json()
          .catch(() => ({}));
        if (data.fields) {
          const serverErrors: Record<string, boolean> = {};
          Object.keys(data.fields).forEach((k) => (serverErrors[k] = true));
          setErrors(serverErrors);
          setSendError('入力内容をご確認ください');
        } else {
          setSendError('送信に失敗しました。時間をおいて再度お試しください。');
        }
        setSubmitting(false);
        return;
      }

      router.push('/thanks?type=application');
    } catch {
      setSendError('ネットワークエラーが発生しました。時間をおいて再度お試しください。');
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.wrapper} id="application-form">
      <h3 className={styles.formTitle}>広告掲載 お申し込みフォーム</h3>
      <p style={{ textAlign: 'center', color: 'var(--text-sub)', fontSize: 'var(--font-sm)', marginBottom: 'var(--space-md)' }}>
        お申し込み後、担当者よりご連絡のうえ契約書をお送りいたします。<br />
        本フォームの送信をもって契約成立とはなりません。
      </p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="_honey" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1 }} aria-hidden="true" />

        <div className={styles.formGroup}>
          <label>会社名 / 団体名<span className={styles.required}>*</span></label>
          <input
            type="text"
            name="company"
            required
            autoComplete="organization"
            placeholder="株式会社○○"
            className={errors.company ? styles.error : ''}
            onChange={() => setErrors((prev) => ({ ...prev, company: false }))}
          />
        </div>
        <div className={styles.formGroup}>
          <label>ご担当者名<span className={styles.required}>*</span></label>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="山田 太郎"
            className={errors.name ? styles.error : ''}
            onChange={() => setErrors((prev) => ({ ...prev, name: false }))}
          />
        </div>
        <div className={styles.formGroup}>
          <label>メールアドレス<span className={styles.required}>*</span></label>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="example@company.com"
            className={errors.email ? styles.error : ''}
            onChange={() => setErrors((prev) => ({ ...prev, email: false }))}
          />
        </div>
        <div className={styles.formGroup}>
          <label>広告の目的（任意）</label>
          <select name="purpose">
            <option value="">選択してください</option>
            <option value="採用・求人">採用・求人</option>
            <option value="オープンキャンパス案内">オープンキャンパス案内</option>
            <option value="企業認知・ブランディング">企業認知・ブランディング</option>
            <option value="インターンシップ募集">インターンシップ募集</option>
            <option value="その他">その他</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>備考（任意）</label>
          <textarea name="message" placeholder="ご質問やご要望があればお書きください" />
        </div>

        {sendError && (
          <div role="alert" style={{ color: '#DC2626', fontSize: 'var(--font-sm)', marginBottom: 'var(--space-sm)', textAlign: 'center' }}>
            {sendError}
          </div>
        )}

        <div className={styles.formSubmit}>
          <button type="submit" className="btn btn-accent" disabled={submitting} aria-busy={submitting}>
            {submitting ? '送信中…' : '広告掲載を申し込む'}
          </button>
        </div>
      </form>
    </div>
  );
}
