'use client';

import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import FadeIn from '@/components/ui/FadeIn';
import CountUp from '@/components/ui/CountUp';
import TiltCard from '@/components/ui/TiltCard';
import Phrase from '@/components/ui/Phrase';
import { AD_SPECS, AD_FLOW_STEPS, PRICING_PLANS } from '@/lib/constants';
import styles from '@/styles/sections/advertisers.module.css';

const MERITS = [
  { icon: '🎯', title: 'Z世代の空白地帯にリーチ', desc: 'SNS広告はスキップされ、TVは見られない。教室は高校生に確実に届く唯一のメディア空間です。' },
  { icon: '👁', title: '「見られる」を保証', desc: '教室の常設モニターで「見ていない」がありえない。月次レポートで表示回数・表示時間を可視化します。' },
  { icon: '💼', title: '採用コスト削減', desc: '日頃から企業名を認知させ、求人票公開時の「指名検索」を増加。高卒1名採用の価値（数百万円）に対し月額数千円。' },
  { icon: '🌎', title: 'CSR/SDGsブランディング', desc: '教育DX支援として企業ブランディング・SDGs活動に活用。税金で賄えないICT環境を民間がサポートする社会貢献モデル。' },
];

export default function AdvertiserBenefits() {
  return (
    <section className="section-padding" id="advertisers">
      <div className="container">
        <SectionHeader
          label="For Advertisers"
          title="若年層への確実なリーチと<br>教育貢献によるブランディング"
          labelColor="var(--accent-biz)"
        />

        {/* Merits */}
        <FadeIn className={styles.merits}>
          {MERITS.map((m, i) => (
            <div key={i} className={styles.meritCard}>
              <div className={styles.meritIcon}>{m.icon}</div>
              <h3 className={styles.meritTitle}>{m.title}</h3>
              <Phrase as="p" className={styles.meritDesc}>{m.desc}</Phrase>
            </div>
          ))}
        </FadeIn>

        {/* Specs */}
        <FadeIn className={styles.specGrid}>
          {AD_SPECS.map((s, i) => (
            <div key={i} className={styles.specItem}>
              <div className={styles.specNum}>
                <CountUp target={Number(s.num)} duration={2} />
              </div>
              <div className={styles.specUnit}>{s.unit}</div>
              <div className={styles.specLabel}>{s.label}</div>
            </div>
          ))}
        </FadeIn>

        {/* Pricing */}
        <FadeIn className="text-center" id="pricing">
          <h3 className={styles.pricingHeading}>🔥 PoC実証実験 特別価格プラン</h3>
        </FadeIn>
        <FadeIn className={styles.pricingCards}>
          {PRICING_PLANS.map((plan, i) => (
            <TiltCard key={i} className={`${styles.pricingCard} ${plan.recommended ? styles.recommended : ''}`}>
              <div className={styles.pricingLabel}>{plan.label}</div>
              <div className={styles.pricingName}>{plan.name}</div>
              <div className={styles.pricingPrice}>
                {plan.oldPrice && (
                  <><span className={styles.oldPriceText}>{plan.oldPrice}</span><br /></>
                )}
                <span className={styles.amount}>{plan.price}</span>
                <span className={styles.unit}>{plan.unit}</span>
              </div>
              <ul className={styles.pricingFeatures}>
                {plan.features.map((f, j) => (
                  <li key={j} className={styles.featureItem}>
                    <span className={styles.check}>✔</span> {f}
                  </li>
                ))}
              </ul>
              {plan.conditions && (
                <div className={styles.conditions}>
                  <h4 className={styles.conditionsTitle}>適用条件</h4>
                  <div className={styles.condBadges}>
                    {plan.conditions.map((c, j) => (
                      <span key={j} className={styles.condBadge}>{c}</span>
                    ))}
                  </div>
                </div>
              )}
              <div className="text-center" style={{ marginTop: 'auto' }}>
                <Link href={plan.ctaHref} className={`btn btn-${plan.ctaVariant}`}>
                  {plan.ctaText}
                </Link>
              </div>
            </TiltCard>
          ))}
        </FadeIn>
        <FadeIn className={styles.pricingNote}>
          <p>時給換算 約833円〜。求人サイト（月額2〜10万円）と比べ圧倒的に低コスト。属性100%特定済みのため「無駄打ちゼロ」。</p>
          <p>※ 金額はすべて税抜表示です &ensp; ※ 実証実験価格は予告なく終了する場合があります</p>
        </FadeIn>

        {/* Flow */}
        <FadeIn className={styles.flowSection}>
          <h3 className={styles.flowTitle}>掲載までの流れ（最短2週間）</h3>
          <div className={styles.bizFlow}>
            {AD_FLOW_STEPS.map((step, i) => (
              <span key={i} style={{ display: 'contents' }}>
                {i > 0 && <span className="flow-arrow">→</span>}
                <div className={styles.bizFlowStep}>
                  <div className={styles.bizFlowNum}>{step.num}</div>
                  <h4 className={styles.bizFlowTitle}>{step.title}</h4>
                  <p className={styles.bizFlowDesc}>{step.description}</p>
                </div>
              </span>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="text-center" as="div">
          <div style={{ marginTop: 48 }}>
            <Link href="/contact?category=企業（広告出稿）" className="btn btn-accent">
              🔥 PoC特別価格で広告を始める →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
