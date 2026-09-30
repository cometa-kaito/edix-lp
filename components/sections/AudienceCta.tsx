import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import styles from '@/styles/sections/audience-cta.module.css';

// ページの終わりに「次に読むもの」を置く（/faq・/about は最後に行き先が無く、読み終えた人が止まっていた）
// warm: 直前のセクションが白地のとき暖色地にして区切る（同じ地色が続くと余白が倍に見える）
export default function AudienceCta({ warm = false }: { warm?: boolean }) {
  return (
    <section className={`section-padding${warm ? ' bg-warm' : ''}`}>
      <div className="container">
        <FadeIn className={styles.grid}>
          <Link href="/for-schools" className={styles.card}>
            <span className={styles.eyebrow}>学校関係者の方</span>
            <span className={styles.title}>導入のメリットと費用を見る</span>
            <span className={styles.arrow} aria-hidden="true">→</span>
          </Link>
          <Link href="/for-advertisers" className={`${styles.card} ${styles.cardBiz}`}>
            <span className={styles.eyebrow}>広告出稿をご検討の企業の方</span>
            <span className={styles.title}>掲載の仕組みと申し込み方を見る</span>
            <span className={styles.arrow} aria-hidden="true">→</span>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
