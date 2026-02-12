'use client';

import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import FadeIn from '@/components/ui/FadeIn';
import CountUp from '@/components/ui/CountUp';
import { INVEST_FLOW, ROI_DATA, MARKET_DATA } from '@/lib/constants';
import styles from '@/styles/sections/investors.module.css';

const INVEST_ICONS = ['💰', '📈', '✅'];

export default function InvestorScheme() {
  return (
    <section className="section-padding bg-alt" id="investors">
      <div className="container">
        <SectionHeader
          label="For Investors"
          title="教育への貢献という、<br>プライスレスな価値"
          subtitle="母校や地域の学校DXを応援する「マイクロオーナーシップ」。短期回収・少額から参加可能。"
          labelColor="var(--accent-investor)"
        />

        {/* Investment Flow */}
        <FadeIn className={styles.investFlow} id="scheme">
          {INVEST_FLOW.map((step, i) => (
            <span key={i} style={{ display: 'contents' }}>
              {i > 0 && <span className="flow-arrow">→</span>}
              <div className={styles.investStep}>
                <div className={styles.stepIcon}>{INVEST_ICONS[i]}</div>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            </span>
          ))}
        </FadeIn>

        {/* ROI Table */}
        <FadeIn className="text-center">
          <h3 className={styles.roiHeading}>収益シミュレーション</h3>
        </FadeIn>
        <FadeIn className={styles.roiTable}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>広告稼働率</th>
                <th className={styles.th}>月間収益（MRR）</th>
                <th className={styles.th}>投資回収期間</th>
                <th className={styles.th}>ROI</th>
              </tr>
            </thead>
            <tbody>
              {ROI_DATA.map((row, i) => (
                <tr key={i}>
                  <td className={styles.td}><strong>{row.rate}</strong></td>
                  <td className={styles.td}>{row.mrr}</td>
                  <td className={styles.td}>{row.recovery}</td>
                  <td className={styles.td}>{row.roi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </FadeIn>

        {/* Market Size */}
        <FadeIn className={styles.marketGrid}>
          {MARKET_DATA.map((m, i) => (
            <div key={i} className={styles.marketCard}>
              <div className={styles.marketLabel}>{m.label}</div>
              <div className={styles.marketValue}>
                <CountUp
                  target={Number(m.value)}
                  duration={2.5}
                  decimals={m.value.includes('.') ? 1 : 0}
                  separator=""
                />
                <span className={styles.marketUnit}>{m.unit}</span>
              </div>
            </div>
          ))}
        </FadeIn>

        {/* Social Return */}
        <FadeIn className={styles.socialReturn}>
          <h3 className={styles.socialReturnTitle}>💡 金銭リターン以上の価値</h3>
          <ul className={styles.socialReturnList}>
            <li>出資先の学校・クラスが明確 — 匿名の投資信託とは異なる透明性</li>
            <li>1教室10万円の少額から参加 — 巨大な損失リスクなし</li>
            <li>最長1年で契約終了 — リスク期間を限定</li>
            <li>教育DX支援実績としてCSR・SDGs活動に活用可能</li>
            <li>設置数拡大に伴うネットワーク価値向上 — 将来的なアップサイド</li>
          </ul>
        </FadeIn>

        {/* Legal Note */}
        <FadeIn className={styles.legalNote}>
          <h4 className={styles.legalTitle}>⚠️ 重要事項・法務注記</h4>
          <ul>
            <li className={styles.legalItem}>本スキームは匿名組合契約として、第二種金融商品取引業の適用除外要件（500名未満・1人50万円未満）を満たす形で運用し、弁護士監修のもと適法性を確保しています。</li>
            <li className={styles.legalItem}>元本保証はありません。広告収益の状況により元本毀損のリスクがあります。</li>
            <li className={styles.legalItem}>分配総額12万円（ROI 120%）到達または契約期間1年で契約終了となります。</li>
            <li className={styles.legalItem}>ベータ版サービスのため、予期せぬトラブルや配信停止の可能性があります。</li>
          </ul>
        </FadeIn>

        <FadeIn className="text-center">
          <Link href="/contact?category=投資家" className="btn btn-primary">
            💰 投資家向け個別説明会の申し込み
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
