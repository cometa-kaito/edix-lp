'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import LiveSignage from '@/components/ui/LiveSignage';
import { ShieldCheckIcon, CheckCircleIcon } from '@/components/ui/Icon';
import { PORTAL_APPLY_URL } from '@/lib/constants';
import styles from '@/styles/sections/hero.module.css';
import type { HeroVariant } from '@/lib/types';

interface HeroProps {
  variant?: HeroVariant;
}

const TRUST_POINTS = [
  { Icon: ShieldCheckIcon, label: 'カメラ・マイク不使用' },
  { Icon: CheckCircleIcon, label: '全広告 事前審査' },
];

function getHeroData(variant: HeroVariant, highlightClass: string) {
  const data: Record<HeroVariant, { badges?: { text: string; gold?: boolean }[]; title: string; sub: string; buttons: { href: string; label: string; variant: string }[] }> = {
    home: {
      badges: [
        { text: 'DigiTechQuest 2025 最優秀賞受賞', gold: true },
        { text: '岐南工業高校で運用中' },
      ],
      title: `校務DX × 広告で、<br>学校のデジタル化を<br><span class="${highlightClass}">無料で実現</span>`,
      sub: '通知アプリでは届かない情報を、教室の全員に届ける。広告モデルで学校の費用負担ゼロ。',
      buttons: [
        { href: '/for-schools', label: '学校関係者の方はこちら', variant: 'primary' },
        { href: '/for-advertisers', label: '広告出稿をご検討の方', variant: 'accent' },
      ],
    },
    schools: {
      badges: [{ text: '学校関係者の方へ' }],
      title: `先生の負担を減らし、<br>安全で持続可能な<br><span class="${highlightClass}">DXを無料で実現</span>`,
      sub: 'Google Classroom等では届かない「全員の目に入る連絡」を実現。機材無償・教育委員会対応支援付き。',
      buttons: [
        { href: '#benefits', label: 'メリットを見る', variant: 'primary' },
        { href: '/contact?category=学校関係者', label: '導入のご相談', variant: 'secondary' },
      ],
    },
    advertisers: {
      badges: [
        { text: '岐南工業高校で運用中', gold: true },
      ],
      title: `若年層への確実なリーチと<br><span class="${highlightClass}">教育貢献によるブランディング</span>`,
      sub: '教室に常設されたサイネージで、高校生全員に確実にリーチ。配信は3クラス×実質3ヶ月（2026年6〜9月、夏季休業除く）。料金はお問い合わせください。',
      buttons: [
        { href: PORTAL_APPLY_URL, label: '空き枠を見て申し込む →', variant: 'accent' },
      ],
    },
  };
  return data[variant];
}

export default function Hero({ variant = 'home' }: HeroProps) {
  const data = getHeroData(variant, styles.highlight);
  // タイトルは即時描画（LCP）。サブ→CTAだけ「灯る」ように短く段階表示する
  const [phase, setPhase] = useState(1);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(2), 250);
    const t2 = setTimeout(() => setPhase(3), 650);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
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
                  style={{ animationDelay: `${0.15 + i * 0.15}s` }}
                >
                  {badge.text}
                </span>
              ))}
            </div>
          )}
          <h1
            className={styles.title}
            dangerouslySetInnerHTML={{ __html: data.title }}
          />
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
          <LiveSignage startIndex={variant === 'advertisers' ? 2 : 0} />
        </FadeIn>
      </div>
    </section>
  );
}
