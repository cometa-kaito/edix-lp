'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PORTAL_APPLY_URL } from '@/lib/constants';
import styles from '@/styles/sections/floating-cta.module.css';

// ページの読み手に合わせて行き先を変える。以前はどのページでも /contact 固定で、
// 広告主ページや出稿ガイドでも空き枠（申込）ではなく問い合わせへ誘導していた
function ctaFor(pathname: string) {
  if (pathname.startsWith('/for-advertisers')) {
    return { href: PORTAL_APPLY_URL, label: '空き枠を見て申し込む', external: true };
  }
  if (pathname.startsWith('/for-schools')) {
    return { href: '/contact?category=学校関係者', label: '導入のご相談', external: false };
  }
  return { href: '/contact', label: 'お問い合わせ', external: false };
}

export default function FloatingCta() {
  const [visible, setVisible] = useState(false);
  const cta = ctaFor(usePathname() || '/');

  useEffect(() => {
    // scroll ごとの getBoundingClientRect は layout 読み取り＝ジャンクの原因なので
    // rAF で 1 フレーム 1 回に間引く（passive でスクロールもブロックしない）。
    let rafId = 0;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
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
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className={`${styles.floatingCta} ${visible ? styles.visible : ''}`}>
      {cta.external ? (
        <a href={cta.href} target="_blank" rel="noopener" className="btn btn-accent" tabIndex={visible ? 0 : -1}>
          {cta.label}
        </a>
      ) : (
        <Link href={cta.href} className="btn btn-primary" tabIndex={visible ? 0 : -1}>
          {cta.label}
        </Link>
      )}
    </div>
  );
}
