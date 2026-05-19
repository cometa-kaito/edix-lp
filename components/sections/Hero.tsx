'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/components/ui/FadeIn';
import TypeWriter from '@/components/ui/TypeWriter';
import { ShieldCheckIcon, CheckCircleIcon, BookOpenIcon } from '@/components/ui/Icon';
import styles from '@/styles/sections/hero.module.css';
import type { HeroVariant } from '@/lib/types';

interface HeroProps {
  variant?: HeroVariant;
}

const TRUST_POINTS = [
  { Icon: ShieldCheckIcon, label: 'カメラ・マイク不使用' },
  { Icon: CheckCircleIcon, label: '全広告 事前審査' },
  { Icon: BookOpenIcon, label: '試験期間は広告停止' },
];

function getHeroData(variant: HeroVariant, highlightClass: string) {
  const data: Record<HeroVariant, { badges?: { text: string; gold?: boolean }[]; title: string; sub: string; buttons: { href: string; label: string; variant: string }[] }> = {
    home: {
      badges: [
        { text: 'DigiTechQuest 2025 最優秀賞受賞', gold: true },
        { text: '岐南工業高校で実証実験中' },
      ],
      title: `校務DX × 広告で、<br>学校のデジタル化を<span class="${highlightClass}">無料で実現</span>`,
      sub: '通知アプリでは届かない情報を、教室の全員に届ける。広告モデルで学校の費用負担ゼロ。',
      buttons: [
        { href: '/for-schools', label: '学校関係者の方はこちら', variant: 'primary' },
        { href: '/for-advertisers', label: '広告出稿をご検討の方', variant: 'accent' },
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
      sub: '教室に常設されたサイネージで、高校生全員に確実にリーチ。実証実験特別価格 3クラス×実質3ヶ月（6〜9月、夏季休業除く）5万円/社。',
      buttons: [
        { href: '#pricing', label: 'PoC特別価格を見る', variant: 'accent' },
        { href: 'https://forms.office.com/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAADlWcT5UMU5KTFQ0RDBDN1hZMk9JVVQ4MTgyWldFSS4u&route=shorturl', label: '広告掲載を申し込む', variant: 'secondary' },
      ],
    },
  };
  return data[variant];
}

export default function Hero({ variant = 'home' }: HeroProps) {
  const data = getHeroData(variant, styles.highlight);
  const useTypewriter = variant === 'home';
  const [phase, setPhase] = useState(useTypewriter ? 0 : 3);

  const handleTitleDone = useCallback(() => {
    setTimeout(() => setPhase(2), 200);
    setTimeout(() => setPhase(3), 600);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
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
          {useTypewriter ? (
            <h1 className={styles.title}>
              <TypeWriter
                text={data.title}
                speed={40}
                delay={1400}
                onComplete={handleTitleDone}
              />
            </h1>
          ) : (
            <h1
              className={styles.title}
              dangerouslySetInnerHTML={{ __html: data.title }}
            />
          )}
          <p className={`${styles.sub} ${phase >= 2 ? styles.visible : styles.hidden}`}>
            {data.sub}
          </p>
          <ul className={`${styles.trustPoints} ${phase >= 2 ? styles.visible : styles.hidden}`} aria-label="安心ポイント">
            {TRUST_POINTS.map(({ Icon, label }, i) => (
              <li key={i} className={styles.trustPoint}>
                <span className={styles.trustIcon}>
                  <Icon size={18} />
                </span>
                {label}
              </li>
            ))}
          </ul>
          <div className={`${styles.buttons} ${phase >= 3 ? styles.visible : styles.hidden}`}>
            {data.buttons.map((btn, i) =>
              btn.href.startsWith('http') ? (
                <a
                  key={i}
                  href={btn.href}
                  target="_blank"
                  rel="noopener"
                  className={`btn btn-${btn.variant}`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  {btn.label}
                </a>
              ) : (
                <Link
                  key={i}
                  href={btn.href}
                  className={`btn btn-${btn.variant}`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  {btn.label}
                </Link>
              )
            )}
          </div>
        </div>
        <FadeIn className={styles.heroImage}>
          <Image
            src="/signage-demo.png"
            alt="キミテラス サイネージ画面"
            width={1251}
            height={872}
            priority
            style={{ width: '100%', height: 'auto' }}
          />
        </FadeIn>
      </div>
    </section>
  );
}
