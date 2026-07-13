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

    const evaluate = () => {
      // list は先頭コピー。padding-right(末尾gap)を除いた実コンテンツ幅で判定
      const contentWidth = list.scrollWidth;
      const available = viewport.clientWidth;
      const overflowing = contentWidth > available + 1;
      setMarquee((prev) => (prev === overflowing ? prev : overflowing));
      if (overflowing) {
        // 一定速度(約40px/秒)になるよう周期をコンテンツ幅から算出
        setDuration(Math.max(12, Math.round(contentWidth / 40)));
      }
    };

    evaluate();
    // レイアウト確定直後にもう一度（フォント/画像リフローの取りこぼし防止）
    const raf = requestAnimationFrame(evaluate);
    const ro = new ResizeObserver(evaluate);
    ro.observe(viewport);
    ro.observe(list);
    // RO が届かない環境向けフォールバック（画面幅変化に確実に追従）
    window.addEventListener('resize', evaluate);
    // ロゴ画像の読み込み完了で幅が確定するケースに追従
    const imgs = Array.from(viewport.querySelectorAll('img'));
    imgs.forEach((img) => img.addEventListener('load', evaluate));
    return () => {
      cancelAnimationFrame(raf);
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
