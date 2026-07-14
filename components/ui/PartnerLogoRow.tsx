'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { PartnerCompany } from '@/lib/types';
import styles from '@/styles/partner-logo-row.module.css';

interface PartnerLogoRowProps {
  companies: PartnerCompany[];
}

function LogoItem({ partner }: { partner: PartnerCompany }) {
  const content = partner.logoSrc ? (
    <Image
      src={partner.logoSrc}
      alt={partner.name}
      width={partner.logoWidth ?? 160}
      height={partner.logoHeight ?? 40}
      className={styles.logo}
    />
  ) : (
    <span className={styles.name}>{partner.name}</span>
  );
  return partner.url ? (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.link}
      aria-label={`${partner.name}のサイトを開く（新しいタブ）`}
    >
      {content}
    </a>
  ) : (
    content
  );
}

// 取引先ロゴを中央に静止表示し、表示幅に収まらなくなったら自動でマーキー化する。
// しきい値は「実測したコンテンツ幅 > 表示幅」。ResizeObserver で画面幅変化にも追従。
export default function PartnerLogoRow({ companies }: PartnerLogoRowProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [marquee, setMarquee] = useState(false);
  const [duration, setDuration] = useState(20);

  useEffect(() => {
    const viewport = viewportRef.current;
    const list = listRef.current;
    if (!viewport || !list) return;
    let cancelled = false;

    const evaluate = () => {
      if (cancelled) return;
      // list は先頭コピー。実コンテンツ幅 > 表示幅 なら溢れ＝マーキー
      const contentWidth = list.scrollWidth;
      const available = viewport.clientWidth;
      if (available === 0) return; // レイアウト未確定時は判定しない
      const overflowing = contentWidth > available + 1;
      setMarquee((prev) => (prev === overflowing ? prev : overflowing));
      if (overflowing) {
        // 一定速度(約40px/秒)になるよう周期をコンテンツ幅から算出
        setDuration(Math.max(12, Math.round(contentWidth / 40)));
      }
    };

    evaluate();
    // レイアウト/フォント/画像の確定は非同期。RO が届かない環境でも正しく測り直せるよう多重に再評価
    const raf = requestAnimationFrame(evaluate);
    const timers = [150, 500, 1200].map((ms) => setTimeout(evaluate, ms));
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(evaluate).catch(() => {});
    }
    const ro = new ResizeObserver(evaluate);
    ro.observe(viewport);
    ro.observe(list);
    window.addEventListener('resize', evaluate);
    const imgs = Array.from(viewport.querySelectorAll('img'));
    imgs.forEach((img) => img.addEventListener('load', evaluate));
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      ro.disconnect();
      window.removeEventListener('resize', evaluate);
      imgs.forEach((img) => img.removeEventListener('load', evaluate));
    };
  }, [companies]);

  return (
    <div
      ref={viewportRef}
      className={`${styles.viewport} ${marquee ? styles.isMarquee : styles.isStatic}`}
    >
      <div
        className={styles.track}
        style={marquee ? { animationDuration: `${duration}s` } : undefined}
      >
        <ul ref={listRef} className={styles.list}>
          {companies.map((partner) => (
            <li key={partner.name} className={styles.item}>
              <LogoItem partner={partner} />
            </li>
          ))}
        </ul>
        {marquee && (
          <ul className={`${styles.list} ${styles.dup}`} aria-hidden="true">
            {companies.map((partner) => (
              <li key={`dup-${partner.name}`} className={styles.item}>
                <LogoItem partner={partner} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
