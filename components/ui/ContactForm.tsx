'use client';

import { useState, FormEvent } from 'react';
import { FORM_ACTION, COMPANY_URL } from '@/lib/constants';
import styles from '@/styles/sections/contact.module.css';

interface ContactFormProps {
  defaultCategory?: string;
}

export default function ContactForm({ defaultCategory }: ContactFormProps) {
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const category = (form.elements.namedItem('category') as HTMLSelectElement).value;

    const newErrors: Record<string, boolean> = {};
    if (!name) newErrors.name = true;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = true;
    if (!category) newErrors.category = true;

    if (Object.keys(newErrors).length > 0) {
      e.preventDefault();
      setErrors(newErrors);
      return;
    }
    setErrors({});
  }

  return (
    <div className={styles.wrapper} id="contact-form">
      <h3 className={styles.formTitle}>お問い合わせフォーム</h3>
      <form onSubmit={handleSubmit} action={FORM_ACTION} method="POST">
        <input type="hidden" name="_subject" value="【Edix LP】お問い合わせ" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value="" />
        <input type="text" name="_honey" style={{ display: 'none' }} />

        <div className={styles.formGroup}>
          <label>お名前<span className={styles.required}>*</span></label>
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
          <label>ご種別<span className={styles.required}>*</span></label>
          <select
            name="category"
            required
            defaultValue={defaultCategory || ''}
            className={errors.category ? styles.error : ''}
            onChange={() => setErrors((prev) => ({ ...prev, category: false }))}
          >
            <option value="" disabled>選択してください</option>
            <option value="企業（広告出稿）">企業（広告出稿）</option>
            <option value="学校関係者">学校関係者</option>
            <option value="投資家">投資家</option>
            <option value="その他">その他</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>お問い合わせ内容</label>
          <textarea name="message" placeholder="ご質問やご相談内容をお書きください" />
        </div>
        <div className={styles.formSubmit}>
          <button type="submit" className="btn btn-primary">送信する</button>
        </div>
      </form>
      <div className={styles.contactInfo}>
        <p><a href={COMPANY_URL} target="_blank" rel="noopener"><strong>株式会社Rebounder</strong></a></p>
        <p>代表: 奥村 魁斗</p>
        <p>Email: <a href="mailto:rebounder@googlegroups.com">rebounder@googlegroups.com</a></p>
        <p>TEL: <a href="tel:08067482231">080-6748-2231</a></p>
      </div>
    </div>
  );
}
