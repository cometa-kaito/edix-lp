'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NAV_LINKS } from '@/lib/constants';
import styles from '@/styles/sections/header.module.css';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile nav on route change
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('header');
      if (!header) return;
      if (window.scrollY > 20) {
        header.classList.add(styles.scrolled);
      } else {
        header.classList.remove(styles.scrolled);
      }
      if (window.scrollY > 100) {
        header.classList.add(styles.shadow);
      } else {
        header.classList.remove(styles.shadow);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <>
      <button
        className={`${styles.hamburger} ${isOpen ? styles.active : ''}`}
        onClick={toggle}
        aria-label="メニューを開く"
      >
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
      </button>
      <nav className={`${styles.mobileNav} ${isOpen ? styles.mobileNavActive : ''}`}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={styles.mobileNavLink}
            onClick={close}
          >
            {link.label}
          </Link>
        ))}
        <Link href="/contact" className="btn btn-primary" onClick={close} style={{ marginTop: 12, width: '100%', borderRadius: 10, justifyContent: 'center' }}>
          お問い合わせ
        </Link>
      </nav>
    </>
  );
}
