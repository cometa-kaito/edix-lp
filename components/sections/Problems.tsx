import SectionHeader from '@/components/ui/SectionHeader';
import FadeIn from '@/components/ui/FadeIn';
import styles from '@/styles/sections/problems.module.css';

const SCHOOL_PROBLEMS = [
  { icon: '😣', title: '先生の多忙化', desc: '連絡事項の伝達や資料作成に追われ、授業準備の時間が圧迫。プリント印刷・仕分け・配布に毎日数十分を消費' },
  { icon: '📵', title: '通知を見ない生徒', desc: 'Google ClassroomやClassiで連絡しても、アプリを開かない生徒には届かない。「言った・言わない」のトラブルが頻発' },
  { icon: '⏰', title: '連絡の即時性不足', desc: '緊急連絡や時間割変更がリアルタイムで全員に届く手段がない。掲示板の貼り替えにも手間がかかる' },
];

const BIZ_PROBLEMS = [
  { icon: '🔍', title: '若者へのアプローチ手段不足', desc: 'SNS広告ではリーチしきれない高校生世代への手段が限られている' },
  { icon: '🎯', title: 'ターゲット精度の低さ', desc: '広告が届いてほしいターゲットに確実に届かない' },
  { icon: '💸', title: '採用コスト高騰', desc: '求人媒体の費用が年々増加し、費用対効果が低下' },
];

export default function Problems() {
  return (
    <section className="section-padding bg-alt" id="problems">
      <div className="container">
        <SectionHeader
          label="Why Edix?"
          title="学校と企業、それぞれの課題を<br>ひとつの仕組みで解決"
        />
        <div className={styles.grid}>
          <FadeIn className={`${styles.col} ${styles.school}`}>
            <h3 className={styles.colTitle}>🏫 学校側の課題</h3>
            {SCHOOL_PROBLEMS.map((p, i) => (
              <div key={i} className={styles.item}>
                <div className={styles.itemIcon}>{p.icon}</div>
                <h4 className={styles.itemTitle}>{p.title}</h4>
                <p className={styles.itemDesc}>{p.desc}</p>
              </div>
            ))}
          </FadeIn>
          <FadeIn className={styles.center}>
            <div className={styles.arrow}>←</div>
            <div className={styles.solution}>
              校内常設メディア<br /><strong>「Edix」</strong><br />で両方を解決
            </div>
            <div className={styles.arrow}>→</div>
          </FadeIn>
          <FadeIn className={`${styles.col} ${styles.biz}`}>
            <h3 className={styles.colTitle}>🏢 企業側の課題</h3>
            {BIZ_PROBLEMS.map((p, i) => (
              <div key={i} className={styles.item}>
                <div className={styles.itemIcon}>{p.icon}</div>
                <h4 className={styles.itemTitle}>{p.title}</h4>
                <p className={styles.itemDesc}>{p.desc}</p>
              </div>
            ))}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
