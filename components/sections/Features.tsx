import SectionHeader from '@/components/ui/SectionHeader';
import FadeIn from '@/components/ui/FadeIn';
import Phrase from '@/components/ui/Phrase';
import { EyeIcon, ZapIcon, GraduationCapIcon } from '@/components/ui/Icon';
import { OPERATION_FLOW } from '@/lib/constants';
import styles from '@/styles/sections/features.module.css';

// tone: 青=学校・構造 / 暖色=企業・行動（サイト全体の色の文法に揃える）
// title はカード幅での折り返しを制御するため意図改行入りの JSX
const FEATURES = [
  { Icon: EyeIcon, tone: 'blue', title: <>「見に行く」から<br />「目に入る」へ</>, desc: 'お知らせアプリは、生徒が自分で開かないと気づけません。キミテラスは教室にいるだけで目に入るので、連絡の見落としが減ります。' },
  { Icon: ZapIcon, tone: 'blue', title: <>先生の入力は<br />最短10秒</>, desc: 'スマホの管理画面から最短10秒で入力。プリントの印刷・仕分け・配布にかかっていた時間がなくなります。' },
  { Icon: GraduationCapIcon, tone: 'warm', title: <>進路の情報が<br />毎日、目に入る</>, desc: '企業の採用情報やオープンキャンパスの案内を、教室のモニターで日々届けます。進路を考えるきっかけを増やします。' },
];

export default function Features() {
  return (
    <section className="section-padding" id="features">
      <div className="container">
        <SectionHeader
          label="キミテラスとは"
          title="教室の入口に置く、連絡用のモニターです"
          subtitle="学校からの連絡と、企業の採用情報。教室のモニターに毎日映し出します。"
        />
        <div className={styles.grid}>
          {FEATURES.map((f, i) => {
            const Icon = f.Icon;
            return (
              <FadeIn key={i} className={styles.card}>
                <div className={`${styles.cardIcon} ${f.tone === 'warm' ? styles.cardIconWarm : ''}`}>
                  <Icon size={28} />
                </div>
                <h3 className={styles.cardTitle}>{f.title}</h3>
                <Phrase as="p" className={styles.cardDesc}>{f.desc}</Phrase>
              </FadeIn>
            );
          })}
        </div>
        <FadeIn className="text-center">
          <h3 className={styles.flowHeading}>運用は、この3ステップだけ</h3>
        </FadeIn>
        <FadeIn className={styles.flowSteps}>
          {OPERATION_FLOW.map((step, i) => (
            <span key={i} style={{ display: 'contents' }}>
              {i > 0 && <span className="flow-arrow">→</span>}
              <div className={styles.flowStep}>
                <div className={styles.flowStepNum}>{step.num}</div>
                <div className={styles.flowStepText}>
                  <h4 className={styles.flowStepTitle}>{step.title}</h4>
                  <p className={styles.flowStepDesc}>{step.description}</p>
                </div>
              </div>
            </span>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
