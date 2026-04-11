'use client';

import { useState, FormEvent } from 'react';
import { FORM_ACTION } from '@/lib/constants';
import styles from '@/styles/sections/contact.module.css';

export default function ApplicationForm() {
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    const company = (form.elements.namedItem('company') as HTMLInputElement).value.trim();
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value.trim();

    const newErrors: Record<string, boolean> = {};
    if (!company) newErrors.company = true;
    if (!name) newErrors.name = true;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = true;
    if (!phone) newErrors.phone = true;

    if (Object.keys(newErrors).length > 0) {
      e.preventDefault();
      setErrors(newErrors);
      return;
    }
    setErrors({});
  }

  return (
    <div className={styles.wrapper} id="application-form">
      <h3 className={styles.formTitle}>広告掲載 お申し込みフォーム</h3>
      <p style={{ textAlign: 'center', color: 'var(--text-sub)', fontSize: 'var(--font-sm)', marginBottom: 28 }}>
        お申し込み後、担当者よりご連絡のうえ契約書をお送りいたします。<br />
        本フォームの送信をもって契約成立とはなりません。
      </p>
      <form onSubmit={handleSubmit} action={FORM_ACTION} method="POST">
        <input type="hidden" name="_subject" value="【キミテラス】広告掲載お申し込み" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value="" />
        <input type="hidden" name="category" value="広告掲載申し込み" />
        <input type="text" name="_honey" style={{ display: 'none' }} />

        <div className={styles.formGroup}>
          <label>会社名 / 団体名<span className={styles.required}>*</span></label>
          <input
            type="text"
            name="company"
            required
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
            placeholder="example@company.com"
            className={errors.email ? styles.error : ''}
            onChange={() => setErrors((prev) => ({ ...prev, email: false }))}
          />
        </div>
        <div className={styles.formGroup}>
          <label>電話番号<span className={styles.required}>*</span></label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="090-1234-5678"
            className={errors.phone ? styles.error : ''}
            onChange={() => setErrors((prev) => ({ ...prev, phone: false }))}
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
        <div className={styles.formSubmit}>
          <button type="submit" className="btn btn-accent">広告掲載を申し込む</button>
        </div>
      </form>
    </div>
  );
}
