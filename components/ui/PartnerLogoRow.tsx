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

// 取引先ロゴを中央に静止表示。1 行に収まらなくなったら段を増やして（最大 MAX_ROWS 段まで）
// 全社を見せ、それでも収まらない極端に狭い幅でだけ自動マーキー（横スクロール）へフォールバックする。
// 判定は実測（各社の実寸から flex-wrap の折返しを再現して必要段数を算出）。ResizeObserver で画面幅変化にも追従。
const MAX_ROWS = 3;

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
      const available = viewport.clientWidth;
      if (available === 0) return; // レイアウト未確定時は判定しない
      const items = Array.from(list.children) as HTMLElement[];
      if (items.length === 0) return;
      const colGap = parseFloat(getComputedStyle(list).columnGap) || 0;
      // flex-wrap の貪欲な折返しを各社の実寸から再現し、必要段数を数える。
      // 折返し／マーキーどちらの状態でも item は自然幅なので、状態に依存せず安定して数えられる。
      let rows = 1;
      let rowWidth = 0;
      let itemsWidth = 0;
      for (const el of items) {
        const w = el.getBoundingClientRect().width;
        itemsWidth += w;
        if (rowWidth === 0) {
          rowWidth = w;
        } else if (rowWidth + colGap + w <= available + 0.5) {
          rowWidth += colGap + w;
        } else {
          rows += 1;
          rowWidth = w;
        }
      }
      // 最大段数を超える極端に狭い幅でだけマーキー化。それ以外は最大 MAX_ROWS 段で全社静止表示
      const overflowing = rows > MAX_ROWS;
      setMarquee((prev) => (prev === overflowing ? prev : overflowing));
      if (overflowing) {
        // 一定速度(約40px/秒)になるよう周期を 1 行分の幅から算出
        const singleRowWidth = itemsWidth + colGap * Math.max(0, items.length - 1);
        setDuration(Math.max(12, Math.round(singleRowWidth / 40)));
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
