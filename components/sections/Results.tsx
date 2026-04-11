import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import FadeIn from '@/components/ui/FadeIn';
import Phrase from '@/components/ui/Phrase';
import { DEMO_URL } from '@/lib/constants';
import styles from '@/styles/sections/results.module.css';

const ROADMAP = [
  { phase: 1, title: 'PoC（実証実験）', desc: '3クラスでの運用検証・改善', active: true },
  { phase: 2, title: '学年全体拡大', desc: '同一校内での全面導入', active: false },
  { phase: 3, title: '他校横展開', desc: '近隣校・県外への展開', active: false },
];

export default function Results() {
  return (
    <section className="section-padding" id="results">
      <div className="container">
        <SectionHeader
          label="Results"
          title="岐阜県立 岐南工業高等学校で<br>実証実験を実施中"
        />

        <div className={styles.content}>
          <FadeIn className={styles.highlight}>
            <h3 className={styles.highlightTitle}>岐南工業高等学校</h3>
            <Phrase as="p" className={styles.highlightDesc}>校長先生へ説明・確認済み。電子工学科3クラスでの試験運用を実施中。</Phrase>
            <FadeIn className="text-center" as="div">
              <div style={{ marginTop: 24 }}>
                <a href={DEMO_URL} target="_blank" rel="noopener" className="btn btn-primary">
                  実際のサイネージ画面を見る →
                </a>
              </div>
            </FadeIn>
          </FadeIn>

          <FadeIn className={styles.awardSection}>
            <div className={styles.awardImages}>
              <div className={styles.awardImage}>
                <Image
                  src="/award.jpg"
                  alt="DigiTechQuest 2025 最優秀賞 受賞時の写真"
                  width={600}
                  height={400}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <div className={styles.awardImage}>
                <Image
                  src="/digitech-event.png"
                  alt="DigiTechQuest 2025 DX体験型実践プロジェクト"
                  width={600}
                  height={400}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>
            <div className={styles.awardInfo}>
              <h3 className={styles.awardTitle}>DigiTechQuest 2025 最優秀賞 受賞</h3>
              <Phrase as="p" className={styles.awardDesc}>高専・工業高校発のDXコンテストにて最優秀賞と研究奨励金10万円を獲得。</Phrase>
              <a href="https://www.digitech.quest/events/2025-gifu" target="_blank" rel="noopener" className={styles.awardLink}>
                DigiTechQuest 2025 について →
              </a>
            </div>
          </FadeIn>

          <FadeIn className="text-center">
            <h3 className={styles.roadmapHeading}>ロードマップ</h3>
          </FadeIn>
          <FadeIn className={styles.roadmap}>
            {ROADMAP.map((step, i) => (
              <span key={i} style={{ display: 'contents' }}>
                {i > 0 && <span className="flow-arrow">→</span>}
                <div className={`${styles.roadmapStep} ${step.active ? styles.roadmapStepActive : ''}`}>
                  <div className={styles.phase}>{step.phase}</div>
                  <h4 className={styles.roadmapStepTitle}>{step.title}</h4>
                  <Phrase as="p" className={styles.roadmapStepDesc}>{step.desc}</Phrase>
                </div>
              </span>
            ))}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
