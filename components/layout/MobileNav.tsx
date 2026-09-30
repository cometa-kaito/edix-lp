'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/constants';
import { isCurrentNav } from './NavLinks';
import styles from '@/styles/sections/header.module.css';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname() || '/';

  // メニューを開いている間は背景をスクロールさせない。Esc で閉じる
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

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

    window.addEventListener('scroll', handleScroll, { passive: true });
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
        aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
      >
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
      </button>
      <div
        className={`${styles.mobileNavOverlay} ${isOpen ? styles.mobileNavOverlayActive : ''}`}
        onClick={close}
        aria-hidden="true"
      />
      <nav
        id="mobile-nav"
        className={`${styles.mobileNav} ${isOpen ? styles.mobileNavActive : ''}`}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        {NAV_LINKS.map((link) => {
          const current = isCurrentNav(link.href, pathname);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={current ? 'page' : undefined}
              className={`${styles.mobileNavLink}${current ? ` ${styles.mobileNavCurrent}` : ''}`}
              onClick={close}
            >
              {link.label}
            </Link>
          );
        })}
        <Link href="/contact" className="btn btn-primary" onClick={close} style={{ marginTop: 12, width: '100%', borderRadius: 10, justifyContent: 'center' }}>
          お問い合わせ
        </Link>
      </nav>
    </>
  );
}
