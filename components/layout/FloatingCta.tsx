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
      const contactSection = document.getElementById('contact') || document.getElementById('contact-form');
      if (contactSection) {
        const contactTop = contactSection.getBoundingClientRect().top;
        setVisible(window.scrollY > 600 && contactTop > window.innerHeight);
      } else {
        setVisible(window.scrollY > 600);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${styles.floatingCta} ${visible ? styles.visible : ''}`}>
      <Link href="/contact" className="btn btn-primary" style={{ width: '100%', fontSize: 15 }}>
        📢 お問い合わせ
      </Link>
    </div>
  );
}
