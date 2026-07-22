'use client';

import { useState } from 'react';
import FadeIn from '@/components/ui/FadeIn';
import ContactForm from '@/components/ui/ContactForm';
import styles from '@/styles/sections/contact.module.css';

interface ContactSectionProps {
  defaultCategory?: string;
}

export default function ContactSection({ defaultCategory }: ContactSectionProps) {
  const [category, setCategory] = useState(defaultCategory || '');

  return (
    <section className={`section-padding ${styles.section}`} id="contact">
      <div className="container">
        <FadeIn>
          <h2 className={styles.heading}>まずはお気軽にご相談ください</h2>
        </FadeIn>
        <FadeIn>
          <p className={styles.desc}>キミテラスに関するお問い合わせ・ご相談はこちらから</p>
        </FadeIn>

        <FadeIn>
          <ContactForm category={category} onCategoryChange={setCategory} />
        </FadeIn>
      </div>
    </section>
  );
}
