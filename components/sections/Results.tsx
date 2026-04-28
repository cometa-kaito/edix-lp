import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import FadeIn from '@/components/ui/FadeIn';
import Phrase from '@/components/ui/Phrase';
import styles from '@/styles/sections/results.module.css';

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
              <Phrase as="p" className={styles.awardDesc}>課題解決型DXコンテストにて最優秀賞と研究奨励金10万円を獲得。</Phrase>
              <a href="https://www.digitech.quest/events/2025-gifu" target="_blank" rel="noopener" className={styles.awardLink}>
                DigiTechQuest 2025 について →
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
