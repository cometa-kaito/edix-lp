'use client';

import { useState } from 'react';
import FadeIn from '@/components/ui/FadeIn';
import ContactForm from '@/components/ui/ContactForm';
import styles from '@/styles/sections/contact.module.css';

interface ContactSectionProps {
  defaultCategory?: string;
}

const CTA_ITEMS = [
  { icon: '🔥', label: '広告出稿のご相談（PoC特別価格）', sub: '企業・採用ご担当者様', category: '企業（広告出稿）' },
  { icon: '🏫', label: '学校見学・PoC日程の調整', sub: '学校関係者様', category: '学校関係者' },
  { icon: '💰', label: '投資家向け個別説明会', sub: '投資家・企業経営者様', category: '投資家' },
];

export default function ContactSection({ defaultCategory }: ContactSectionProps) {
  const [category, setCategory] = useState(defaultCategory || '');

  function handleCtaClick(newCategory: string) {
    setCategory(newCategory);
    const el = document.getElementById('contact-form');
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - window.innerHeight / 2 + el.offsetHeight / 2;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  return (
    <section className={`section-padding ${styles.section}`} id="contact">
      <div className="container">
        <FadeIn>
          <h2 className={styles.heading}>まずはお気軽にご相談ください</h2>
        </FadeIn>
        <FadeIn>
          <p className={styles.desc}>Edixに関するお問い合わせ・ご相談はこちらから</p>
        </FadeIn>

        <FadeIn className={styles.ctaButtons}>
          {CTA_ITEMS.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleCtaClick(item.category)}
              className={styles.ctaBtn}
            >
              <div className={styles.ctaBtnIcon}>{item.icon}</div>
              <div className={styles.ctaBtnLabel}>{item.label}</div>
              <div className={styles.ctaBtnSub}>{item.sub}</div>
            </button>
          ))}
        </FadeIn>

        <FadeIn>
          <ContactForm category={category} onCategoryChange={setCategory} />
        </FadeIn>
      </div>
    </section>
  );
}
