import SectionHeader from '@/components/ui/SectionHeader';
import FadeIn from '@/components/ui/FadeIn';
import Phrase from '@/components/ui/Phrase';
import styles from '@/styles/sections/tech.module.css';

const TECH_ITEMS = [
  { icon: '☁️', title: 'Firebase基盤', desc: 'Firestore / Storage / Auth / Hosting / Functions' },
  { icon: '📡', title: 'LTE独立回線対応', desc: '校内LANに依存しない独立通信。学校のセキュリティポリシーに影響を与えず導入可能' },
  { icon: '⚡', title: 'リアルタイム更新', desc: '入力から表示まで即時反映。待ち時間ゼロ' },
  { icon: '📶', title: 'オフライン対応', desc: '通信断でもキャッシュデータで表示を継続。画面がブラックアウトすることはありません' },
  { icon: '🔧', title: '低コスト・即交換設計', desc: 'Raspberry Pi採用で交換容易。故障時は「修理」ではなく「即交換」で48時間以内に復旧' },
];

const SAFETY_ITEMS = [
  { icon: '🚫', title: 'NG広告カテゴリ', desc: 'ギャンブル・アダルト・美容医療等は掲載不可。掲載は進路情報・地域企業紹介に限定' },
  { icon: '🔎', title: '全件事前審査', desc: '採用・進学広告は個別に審査。学校の拒否権あり' },
  { icon: '⚖️', title: '表示ルール', desc: '学校連絡:広告 = 70:30 / 音声原則OFF / 試験期間は広告停止' },
  { icon: '📋', title: 'ログ体制', desc: 'いつ・どこで・何が表示されたかを記録。1年間保存' },
];

export default function TechSafety() {
  return (
    <section className="section-padding bg-alt" id="tech">
      <div className="container">
        <SectionHeader
          label="Technology &amp; Safety"
          title="信頼できる技術基盤と<br>徹底した安全管理"
        />
        <div className={styles.grid}>
          <FadeIn className={styles.card}>
            <h3 className={styles.cardTitle}>⚡ 技術スタック &amp; 運用メリット</h3>
            <ul>
              {TECH_ITEMS.map((item, i) => (
                <li key={i} className={styles.listItem}>
                  <span className={styles.techIcon}>{item.icon}</span>
                  <div><strong>{item.title}</strong><br /><Phrase>{item.desc}</Phrase></div>
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn className={styles.card}>
            <h3 className={styles.cardTitle}>🛡 安全性 &amp; 運用ルール</h3>
            <ul>
              {SAFETY_ITEMS.map((item, i) => (
                <li key={i} className={styles.listItem}>
                  <span className={styles.techIcon}>{item.icon}</span>
                  <div><strong>{item.title}</strong><br /><Phrase>{item.desc}</Phrase></div>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
