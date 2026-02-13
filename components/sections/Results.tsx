import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import FadeIn from '@/components/ui/FadeIn';
import Phrase from '@/components/ui/Phrase';
import { DEMO_URL } from '@/lib/constants';
import styles from '@/styles/sections/results.module.css';

const DETAILS = [
  { title: '運用性の確認', desc: '教員・生徒の日常利用における操作性を検証' },
  { title: '学習環境への影響', desc: '授業中の集中力や学習環境への影響を評価' },
  { title: '広告運用の妥当性', desc: '広告表示の適切性と効果を分析' },
];

const ROADMAP = [
  { phase: 1, title: 'PoC（実証実験）', desc: '1クラスでの運用検証・改善', active: true },
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
            <h3 className={styles.highlightTitle}>🏫 岐南工業高等学校</h3>
            <Phrase as="p" className={styles.highlightDesc}>校長先生へ説明・確認済み。1クラスでの試験運用を実施中。</Phrase>
            <div className={styles.details}>
              {DETAILS.map((d, i) => (
                <div key={i} className={styles.detail}>
                  <h4 className={styles.detailTitle}>{d.title}</h4>
                  <Phrase as="p" className={styles.detailDesc}>{d.desc}</Phrase>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="text-center" as="div">
            <div style={{ marginBottom: 48 }}>
              <a href={DEMO_URL} target="_blank" rel="noopener" className="btn btn-primary">
                💻 実際のサイネージ画面を見る →
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
