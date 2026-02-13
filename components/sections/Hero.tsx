'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import TypeWriter from '@/components/ui/TypeWriter';
import styles from '@/styles/sections/hero.module.css';
import type { HeroVariant } from '@/lib/types';

interface HeroProps {
  variant?: HeroVariant;
}

function getHeroData(variant: HeroVariant, highlightClass: string) {
  const data: Record<HeroVariant, { badges?: { text: string; gold?: boolean }[]; title: string; sub: string; buttons: { href: string; label: string; variant: string }[] }> = {
    home: {
      badges: [
        { text: 'DigiTechQuest 2026 最優秀賞受賞', gold: true },
        { text: '岐南工業高校で実証実験中' },
      ],
      title: `校務DX × 広告で、<br>学校のデジタル化を<span class="${highlightClass}">無料で実現</span>`,
      sub: '通知アプリでは届かない情報を、教室の全員に届ける。広告モデルで学校の費用負担ゼロ。',
      buttons: [
        { href: '/for-schools', label: '学校関係者の方はこちら', variant: 'primary' },
        { href: '/for-advertisers', label: '広告出稿をご検討の方', variant: 'accent' },
        { href: '/for-investors', label: '投資家の方', variant: 'secondary' },
      ],
    },
    schools: {
      badges: [{ text: '学校関係者の方へ' }],
      title: `先生の負担を減らし、<br>安全で持続可能な<span class="${highlightClass}">DXを無料で実現</span>`,
      sub: 'Google Classroom等では届かない「全員の目に入る連絡」を実現。機材無償・教育委員会対応支援付き。',
      buttons: [
        { href: '#benefits', label: 'メリットを見る', variant: 'primary' },
        { href: '/contact?category=学校関係者', label: '導入のご相談', variant: 'secondary' },
      ],
    },
    advertisers: {
      badges: [
        { text: 'PoC特別価格 実施中', gold: true },
      ],
      title: `若年層への確実なリーチと<br><span class="${highlightClass}">教育貢献によるブランディング</span>`,
      sub: '教室に常設されたサイネージで、高校生全員に確実にリーチ。PoC特別価格で月額2,500円から。',
      buttons: [
        { href: '#pricing', label: 'PoC特別価格を見る', variant: 'accent' },
        { href: '/contact?category=企業（広告出稿）', label: 'お問い合わせ', variant: 'secondary' },
      ],
    },
    investors: {
      badges: [{ text: '投資家の方へ' }],
      title: `教育への貢献という、<br><span class="${highlightClass}">プライスレスな価値</span>`,
      sub: 'レベニューシェア型 教室DXオーナー制度で、社会貢献と収益を両立。',
      buttons: [
        { href: '#scheme', label: '投資スキームを見る', variant: 'primary' },
        { href: '/contact?category=投資家', label: '個別説明会の申し込み', variant: 'secondary' },
      ],
    },
  };
  return data[variant];
}

export default function Hero({ variant = 'home' }: HeroProps) {
  const data = getHeroData(variant, styles.highlight);
  const [phase, setPhase] = useState(0);

  const handleTitleDone = useCallback(() => {
    setTimeout(() => setPhase(2), 200);
    setTimeout(() => setPhase(3), 600);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        {data.badges && (
          <div className={`${styles.heroBadges} ${styles.animateIn}`}>
            {data.badges.map((badge, i) => (
              <span
                key={i}
                className={`${styles.badge} ${badge.gold ? styles.badgeGold : ''}`}
                style={{ animationDelay: `${1.2 + i * 0.15}s` }}
              >
                {badge.text}
              </span>
            ))}
          </div>
        )}
        <h1 className={styles.title}>
          <TypeWriter
            text={data.title}
            speed={40}
            delay={1400}
            onComplete={handleTitleDone}
          />
        </h1>
        <p className={`${styles.sub} ${phase >= 2 ? styles.visible : styles.hidden}`}>
          {data.sub}
        </p>
        <div className={`${styles.buttons} ${phase >= 3 ? styles.visible : styles.hidden}`}>
          {data.buttons.map((btn, i) => (
            <Link
              key={i}
              href={btn.href}
              className={`btn btn-${btn.variant}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {btn.label}
            </Link>
          ))}
        </div>
        <div className={`${styles.scrollHint} ${phase >= 3 ? styles.visible : styles.hidden}`}>
          <span className={styles.scrollArrow}>↓</span>
        </div>
      </div>
    </section>
  );
}
