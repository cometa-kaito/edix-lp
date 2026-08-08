import SectionHeader from '@/components/ui/SectionHeader';
import FadeIn from '@/components/ui/FadeIn';
import Phrase from '@/components/ui/Phrase';
import styles from '@/styles/sections/tech.module.css';

const TECH_ITEMS = [
  { title: 'クラウド基盤', desc: 'マネージドなデータベース・ストレージ・認証・配信で安定運用' },
  { title: '校内Wi-Fi接続', desc: '校内LANに接続してコンテンツを配信。スマートテレビのブラウザで動作するため専用機器不要' },
  { title: 'リアルタイム更新', desc: '入力から表示まで即時反映。待ち時間ゼロ' },
  { title: 'オフライン対応', desc: '通信断でもキャッシュデータで表示を継続。画面がブラックアウトすることはありません' },
  { title: '低コスト・即交換設計', desc: 'スマートテレビ採用で交換容易。故障時は「修理」ではなく「即交換」で2週間以内に復旧' },
];

const SAFETY_ITEMS = [
  { title: 'NG広告カテゴリ', desc: 'ギャンブル・アダルト・美容医療等は掲載不可。掲載は学校が合意を得たものに限定' },
  { title: '全件事前審査', desc: '採用・進学広告は個別に審査。掲載は学校が判断' },
  { title: '表示ルール', desc: '学校連絡:広告 = 70:30 / 音声原則OFF' },
  { title: 'ログ体制', desc: 'いつ・どこで・何が表示されたかを記録。1年間保存' },
];

export default function TechSafety() {
  return (
    <section className="section-padding bg-alt" id="tech">
      <div className="container">
        <SectionHeader
          label="技術と安全性"
          title="信頼できる技術基盤と<br>徹底した安全管理"
        />
        <div className={styles.grid}>
          <FadeIn className={styles.card}>
            <h3 className={styles.cardTitle}>技術スタック &amp; 運用メリット</h3>
            <ul>
              {TECH_ITEMS.map((item, i) => (
                <li key={i} className={styles.listItem}>
                  <div><strong>{item.title}</strong><br /><Phrase>{item.desc}</Phrase></div>
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn className={styles.card}>
            <h3 className={styles.cardTitle}>安全性 &amp; 運用ルール</h3>
            <ul>
              {SAFETY_ITEMS.map((item, i) => (
                <li key={i} className={styles.listItem}>
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
