'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { COMPANY_URL } from '@/lib/constants';
import styles from '@/styles/sections/contact.module.css';

interface ContactFormProps {
  category: string;
  onCategoryChange: (value: string) => void;
}

export default function ContactForm({ category, onCategoryChange }: ContactFormProps) {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const cat = (form.elements.namedItem('category') as HTMLSelectElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim();
    const honey = (form.elements.namedItem('_honey') as HTMLInputElement).value;

    const newErrors: Record<string, boolean> = {};
    if (!name) newErrors.name = true;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = true;
    if (!cat) newErrors.category = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSendError(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, category: cat, message, _honey: honey }),
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

      router.push('/thanks');
    } catch {
      setSendError('ネットワークエラーが発生しました。時間をおいて再度お試しください。');
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.wrapper} id="contact-form">
      <h3 className={styles.formTitle}>お問い合わせフォーム</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="_honey" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1 }} aria-hidden="true" />

        <div className={styles.formGroup}>
          <label htmlFor="contact-name">お名前<span className={styles.required}>*</span></label>
          <input
            id="contact-name"
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
          <label htmlFor="contact-email">メールアドレス<span className={styles.required}>*</span></label>
          <input
            id="contact-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            spellCheck={false}
            placeholder="example@company.com"
            className={errors.email ? styles.error : ''}
            onChange={() => setErrors((prev) => ({ ...prev, email: false }))}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="contact-category">ご種別<span className={styles.required}>*</span></label>
          <select
            id="contact-category"
            name="category"
            required
            value={category}
            className={errors.category ? styles.error : ''}
            onChange={(e) => {
              onCategoryChange(e.target.value);
              setErrors((prev) => ({ ...prev, category: false }));
            }}
          >
            <option value="" disabled>選択してください</option>
            <option value="企業（広告出稿）">企業（広告出稿）</option>
            <option value="学校関係者">学校関係者</option>
            <option value="その他">その他</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="contact-message">お問い合わせ内容</label>
          <textarea id="contact-message" name="message" placeholder="ご質問やご相談内容をお書きください" />
        </div>

        {sendError && (
          <div role="alert" style={{ color: '#DC2626', fontSize: 14, marginBottom: 16, textAlign: 'center' }}>
            {sendError}
          </div>
        )}

        <div className={styles.formSubmit}>
          <button type="submit" className="btn btn-primary" disabled={submitting} aria-busy={submitting}>
            {submitting ? '送信中…' : '送信する'}
          </button>
        </div>
      </form>
      <div className={styles.contactInfo}>
        <p><a href={COMPANY_URL} target="_blank" rel="noopener"><strong>株式会社Rebounder</strong></a></p>
        <p>代表: 奥村 魁斗</p>
        <p>Email: <a href="mailto:rebounder@googlegroups.com">rebounder@googlegroups.com</a></p>
      </div>
    </div>
  );
}
