import SectionHeader from '@/components/ui/SectionHeader';
import FadeIn from '@/components/ui/FadeIn';
import Phrase from '@/components/ui/Phrase';
import { OPERATION_FLOW } from '@/lib/constants';
import styles from '@/styles/sections/features.module.css';

const FEATURES = [
  { icon: '📣', title: '「見に行く」から「目に入る」へ', desc: '既存アプリは生徒が開く必要がある「Pull型」。Edixは教室にいるだけで情報が届く「Push型」メディア。伝え漏れをゼロに。' },
  { icon: '📝', title: '入力30秒でプリント数十分を削減', desc: 'スマホ対応の管理画面から30秒で入力完了。プリント印刷・仕分け・配布の手間をまるごとカット。' },
  { icon: '🎓', title: '生きたキャリア教育教材', desc: '地元企業のインターン情報やオープンキャンパス案内を、毎日教室で自然に届ける。進路情報に特化した「教育メディア」。' },
];

export default function Features() {
  return (
    <section className="section-padding" id="features">
      <div className="container">
        <SectionHeader
          label="What is Edix?"
          title="教室設置型デジタルサイネージ Edix"
          subtitle="学校・広告主・生徒の3者をつなぐ、持続可能な校務DXプラットフォーム"
        />
        <div className={styles.grid}>
          {FEATURES.map((f, i) => (
            <FadeIn key={i} className={styles.card}>
              <div className={styles.cardIcon}>{f.icon}</div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <Phrase as="p" className={styles.cardDesc}>{f.desc}</Phrase>
            </FadeIn>
          ))}
        </div>
        <FadeIn className="text-center">
          <h3 className={styles.flowHeading}>かんたん3ステップで運用</h3>
        </FadeIn>
        <FadeIn className={styles.flowSteps}>
          {OPERATION_FLOW.map((step, i) => (
            <span key={i} style={{ display: 'contents' }}>
              {i > 0 && <span className="flow-arrow">→</span>}
              <div className={styles.flowStep}>
                <div className={styles.flowStepNum}>{step.num}</div>
                <h4 className={styles.flowStepTitle}>{step.title}</h4>
                <p className={styles.flowStepDesc}>{step.description}</p>
              </div>
            </span>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
