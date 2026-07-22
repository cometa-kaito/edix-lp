import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import FadeIn from '@/components/ui/FadeIn';
import Phrase from '@/components/ui/Phrase';
import styles from '@/styles/sections/schools.module.css';

const MERITS = [
  { title: '働き方改革 & 業務効率化', desc: 'HR時間の短縮、全クラスへの一斉配信、プリント削減で先生の時間を創出します。' },
  { title: 'かんたん運用', desc: 'スマホ対応の管理画面から入力するだけ。専門知識は不要。窓口担当者1名で運用可能です。' },
  { title: '安全性（School Safety）', desc: '全広告を事前審査し、学校に拒否権を付与。学校が合意を得たものに限定し、教育環境を守ります。' },
  { title: '導入・費用負担なし', desc: '機材は広告収益モデルで無償提供。学校負担は電気代＋通信費のみ。故障・破損時の交換もキミテラス側が全額負担。' },
];

const SCHOOL_PROVIDES = [
  '設置場所（教室内の壁面 or スタンドスペース）',
  '電源（通常コンセント）',
  'ネットワーク（Wi-Fi or 有線LAN）',
  '窓口担当者1名',
];

const KIMITERAS_PROVIDES = [
  '43〜55インチ デジタルサイネージ',
  '壁掛け or スタンド（設置方法は選択可）',
  '電気工事',
  '管理画面・運用サポート',
];

export default function SchoolBenefits() {
  return (
    <section className="section-padding bg-alt" id="schools">
      <div className="container">
        <SectionHeader
          label="学校の方へ"
          title="先生の負担を減らし、<br>安全で持続可能なDXを実現"
          labelColor="var(--primary)"
        />
        <div className={styles.meritGrid}>
          {MERITS.map((m, i) => (
            <FadeIn key={i} className={styles.meritCard}>
              <h3 className={styles.meritTitle}>{m.title}</h3>
              <Phrase as="p" className={styles.meritDesc}>{m.desc}</Phrase>
            </FadeIn>
          ))}
        </div>
        <FadeIn className={styles.costHighlight}>
          <h3 className={styles.costTitle}>学校側の費用負担 = 電気代 + 通信費のみ</h3>
          <p className={styles.costDesc}>スマートテレビ（43〜55インチ）・スタンドは無償提供。故障・破損時は2週間以内に交換対応。費用はキミテラス側が全額負担。</p>
        </FadeIn>
        <FadeIn className={styles.infoGrid}>
          <div className={styles.infoBox}>
            <h3 className={styles.infoBoxTitle}>学校側にご用意いただくもの</h3>
            <ul>
              {SCHOOL_PROVIDES.map((item, i) => (
                <li key={i} className={styles.infoItem}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.infoBox}>
            <h3 className={styles.infoBoxTitle}>キミテラスが提供するもの</h3>
            <ul>
              {KIMITERAS_PROVIDES.map((item, i) => (
                <li key={i} className={styles.infoItem}>{item}</li>
              ))}
            </ul>
          </div>
        </FadeIn>
        <FadeIn className="text-center">
          <Link href="/contact?category=学校関係者" className="btn btn-primary">
            導入のご相談・学校見学のお申し込み
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
