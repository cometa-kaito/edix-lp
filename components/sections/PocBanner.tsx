'use client';

import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import CountUp from '@/components/ui/CountUp';
import styles from '@/styles/sections/poc-banner.module.css';
import type { PocBannerVariant } from '@/lib/types';

interface PocBannerProps {
  variant?: PocBannerVariant;
}

export default function PocBanner({ variant = 'full' }: PocBannerProps) {
  return (
    <section className={styles.pocBanner} id="poc-banner">
      <FadeIn className={`container ${styles.inner}`}>
        <div className={styles.icon}>🔥</div>
        <h2 className={styles.heading}>実証実験パートナー企業 募集中</h2>
        {variant === 'full' && (
          <p className={styles.subtext}>
            先着限定・PoC特別価格で、高校生に直接リーチできる広告枠をお試しいただけます
          </p>
        )}
        <div className={styles.price}>
          <span className={styles.oldPrice}>15,000円/月</span>
          <span className={styles.newPrice}>
            <CountUp target={5000} duration={1.5} separator="," />
            <span className={styles.priceUnit}>円/月（税抜）</span>
          </span>
        </div>
        <div className={styles.badges}>
          <span className={styles.pocBadge}>2026年4〜5月限定</span>
          <span className={styles.pocBadge}>通常の67%OFF</span>
          <span className={styles.pocBadge}>1クラス10社限定</span>
        </div>
        <Link href={variant === 'full' ? '/contact?category=企業（広告出稿）' : '/for-advertisers#poc-banner'} className="btn btn-accent">
          特別価格で広告を出す →
        </Link>
        <p className={styles.remain}>
          ⚠️ 残り枠わずか — 実証実験中の今だけの特別価格です
        </p>
      </FadeIn>
    </section>
  );
}
