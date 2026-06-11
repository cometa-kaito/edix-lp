'use client';

import FadeIn from '@/components/ui/FadeIn';
import CountUp from '@/components/ui/CountUp';
import { PORTAL_APPLY_URL } from '@/lib/constants';
import styles from '@/styles/sections/poc-banner.module.css';
import type { PocBannerVariant } from '@/lib/types';

interface PocBannerProps {
  variant?: PocBannerVariant;
}

export default function PocBanner({ variant = 'full' }: PocBannerProps) {
  return (
    <section className={styles.pocBanner} id="poc-banner">
      <FadeIn className={`container ${styles.inner}`}>
        <h2 className={styles.heading}>実証実験パートナー企業 募集中</h2>
        {variant === 'full' && (
          <p className={styles.subtext}>
            先着限定・PoC特別価格で、高校生に直接リーチできる広告枠をお試しいただけます
          </p>
        )}
        <div className={styles.price}>
          <span className={styles.newPrice}>
            <CountUp target={50000} duration={1.5} separator="," />
            <span className={styles.priceUnit}>円/社（税抜）</span>
          </span>
        </div>
        <div className={styles.badges}>
          <span className={styles.pocBadge}>3クラス × 実質3ヶ月（6〜9月、夏季休業除く）</span>
          <span className={styles.pocBadge}>20社限定</span>
          <span className={styles.pocBadge}>先着順</span>
        </div>
        <a href={PORTAL_APPLY_URL} target="_blank" rel="noopener" className="btn btn-accent">
          空き枠を見て、特別価格で広告を出す →
        </a>
        <p className={styles.remain}>
          20社限定 — 実証実験中の今だけの特別価格です
        </p>
      </FadeIn>
    </section>
  );
}
