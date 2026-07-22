'use client';

import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import FadeIn from '@/components/ui/FadeIn';
import CountUp from '@/components/ui/CountUp';
import TiltCard from '@/components/ui/TiltCard';
import Phrase from '@/components/ui/Phrase';
import { CheckIcon } from '@/components/ui/Icon';
import { AD_SPECS, AD_FLOW_STEPS, PRICING_PLANS, PORTAL_APPLY_URL } from '@/lib/constants';
import styles from '@/styles/sections/advertisers.module.css';

const MERITS = [
  { title: 'Z世代の空白地帯にリーチ', desc: 'SNS広告はスキップされ、TVは見られない。教室は高校生に確実に届く唯一のメディア空間です。' },
  { title: '「見られる」を保証', desc: '教室の常設モニターで「見ていない」がありえない。月次レポートで表示回数・表示時間を可視化します。' },
  { title: '採用コスト削減', desc: '日頃から企業名を認知させ、求人票公開時の「指名検索」を増加。高卒1名採用の価値（数百万円）に対し月額数千円。' },
  { title: 'CSR/SDGsブランディング', desc: '教育DX支援として企業ブランディング・SDGs活動に活用。税金で賄えないICT環境を民間がサポートする社会貢献モデル。' },
];

export default function AdvertiserBenefits() {
  return (
    <section className="section-padding" id="advertisers">
      <div className="container">
        <SectionHeader
          label="広告主の方へ"
          title="教室という、他にないメディアが<br>選ばれる4つの理由"
          labelColor="var(--accent-text)"
        />

        {/* Merits */}
        <FadeIn className={styles.merits}>
          {MERITS.map((m, i) => (
            <TiltCard key={i} maxTilt={6} className={styles.meritCard}>
              <h3 className={styles.meritTitle}>{m.title}</h3>
              <Phrase as="p" className={styles.meritDesc}>{m.desc}</Phrase>
            </TiltCard>
          ))}
        </FadeIn>

        {/* Specs — 媒体データ（放送局の数字盤のように、墨色の大数字で見せる） */}
        <FadeIn className={styles.specBoard}>
          <div className={styles.specHead}>
            <span className={styles.specHeadTitle}>媒体データ</span>
            <span className={styles.specHeadNote}>岐阜県立岐南工業高等学校・運用中</span>
          </div>
          <div className={styles.specGrid}>
            {AD_SPECS.map((s, i) => (
              <div key={i} className={styles.specItem}>
                <div className={styles.specNum}>
                  <CountUp target={Number(s.num)} duration={2} />
                  <span className={styles.specUnit}>{s.unit}</span>
                </div>
                <div className={styles.specLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Pricing */}
        <FadeIn className="text-center" id="pricing">
          <h3 className={styles.pricingHeading}>広告掲載プラン</h3>
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
                    <span className={styles.check}><CheckIcon size={16} /></span> {f}
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
                {plan.ctaHref.startsWith('http') ? (
                  <a href={plan.ctaHref} target="_blank" rel="noopener" className={`btn btn-${plan.ctaVariant}`}>
                    {plan.ctaText}
                  </a>
                ) : (
                  <Link href={plan.ctaHref} className={`btn btn-${plan.ctaVariant}`}>
                    {plan.ctaText}
                  </Link>
                )}
              </div>
            </TiltCard>
          ))}
        </FadeIn>
        <FadeIn className={styles.pricingNote}>
          <p>生徒が毎日長時間を過ごす教室という、企業にとって他にない貴重な情報発信の場。属性100%特定済みのため「無駄打ちゼロ」。</p>
          <p>※ 料金の詳細はお問い合わせください</p>
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
          <div style={{ marginTop: 'var(--space-xl)' }}>
            <a href={PORTAL_APPLY_URL} target="_blank" rel="noopener" className="btn btn-accent">
              空き枠を見て申し込む →
            </a>
            <p style={{ marginTop: 'var(--space-xs)', fontSize: 'var(--font-sm)', color: 'var(--text-sub)' }}>
              空き状況・価格・入稿規格をその場でご確認いただけます
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
