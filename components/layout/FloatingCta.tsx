'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/styles/sections/floating-cta.module.css';

export default function FloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 768) {
        setVisible(false);
        return;
      }
      // コンバージョン面（問い合わせ/申込フォーム）が画面内にある間は隠す（重ね掛け防止）
      const targets = ['contact', 'contact-form', 'apply']
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);
      const conversionInView = targets.some((el) => {
        const r = el.getBoundingClientRect();
        return r.top < window.innerHeight && r.bottom > 0;
      });
      setVisible(window.scrollY > 600 && !conversionInView);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${styles.floatingCta} ${visible ? styles.visible : ''}`}>
      <Link href="/contact" className="btn btn-primary">
        お問い合わせ
      </Link>
    </div>
  );
}
