import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import styles from '@/styles/sections/guide-promo.module.css';

export default function GuidePromo() {
  return (
    <section className={`section-padding ${styles.wrapper}`} id="guide-promo">
      <div className="container">
        <FadeIn className={styles.inner}>
          <div className={styles.badge}>For Advertisers</div>
          <h2 className={styles.heading}>
            ご出稿の前に、<br className={styles.brMobile} />
            まずは出稿ガイドをご覧ください
          </h2>
          <p className={styles.lead}>
            キミテラスの広告は、岐南工業高校の進路指導の先生にご監修いただいた、高校生求人ルールに準拠した <strong>「企業認知広告」</strong> です。<br />
            「採用広告」とは作り方が大きく異なります。原稿の書き方、写真の撮り方、入稿の仕様まで、出稿前に必ずご確認ください。
          </p>

          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <div className={styles.featureNum}>01</div>
              <div className={styles.featureBody}>
                <div className={styles.featureTitle}>高校生求人の特別ルール</div>
                <div className={styles.featureDesc}>学校経由原則・7月1日解禁。リクルート系の表現は使えません。</div>
              </div>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureNum}>02</div>
              <div className={styles.featureBody}>
                <div className={styles.featureTitle}>4ブロック構成のテンプレ</div>
                <div className={styles.featureDesc}>どんな会社／どんな仕事／どんな高校生／会社DATA。先生監修の標準形をご用意。</div>
              </div>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureNum}>03</div>
              <div className={styles.featureBody}>
                <div className={styles.featureTitle}>OK／NGの写真実例</div>
                <div className={styles.featureDesc}>実際の作例4枚で、何が良く何がダメかを具体的にご確認いただけます。</div>
              </div>
            </div>
          </div>

          <div className={styles.ctaRow}>
            <Link href="/for-advertisers/guide" className={styles.primaryBtn}>
              出稿ガイドを読む →
            </Link>
            <a href="/guide/kimiterrace-guide.pdf" className={styles.secondaryBtn} download>
              📄 PDF版をダウンロード
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
