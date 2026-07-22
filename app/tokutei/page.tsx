import type { Metadata } from 'next';
import styles from '@/styles/sections/legal.module.css';

export const metadata: Metadata = {
  title: '特定商取引法に基づく表記 - キミテラス',
  description:
    'キミテラスを運営する株式会社Rebounderの特定商取引法に基づく表記。販売事業者・代表責任者・販売価格・支払時期等を記載しています。',
  robots: { index: true, follow: true },
};

export default function TokuteiPage() {
  return (
    <section className={styles.section}>
      <div className="container">
        <article className={styles.wrapper}>
          <h1 className={styles.title}>特定商取引法に基づく表記</h1>
          <p className={styles.lead}>
            「特定商取引に関する法律」第11条に基づき、以下のとおり表示いたします。
          </p>

          <dl className={styles.dlGrid}>
            <dt>販売事業者</dt>
            <dd>株式会社Rebounder</dd>

            <dt>代表責任者</dt>
            <dd>奥村 魁斗</dd>

            <dt>所在地</dt>
            <dd>
              東京都文京区
              <div className={styles.note}>
                ※ 詳細な所在地は、ご請求があれば遅滞なく書面または電子メールにて開示いたします。
              </div>
            </dd>

            <dt>連絡先</dt>
            <dd>
              <a href="mailto:rebounder@googlegroups.com">rebounder@googlegroups.com</a>
              <div className={styles.note}>
                ※ お電話でのご連絡をご希望の場合は、上記メールアドレスまでお申し出ください。折り返しご案内いたします。
              </div>
            </dd>

            <dt>販売商品・役務</dt>
            <dd>教室設置型デジタルサイネージ「キミテラス」の広告掲載枠</dd>

            <dt>販売価格</dt>
            <dd>
              別途お見積もり（個別にご案内）
              <div className={styles.note}>
                広告掲載枠の料金は、配信内容・期間に応じて個別にお見積もりいたします。詳細はお問い合わせください。
              </div>
            </dd>

            <dt>商品代金以外の必要料金</dt>
            <dd>銀行振込手数料はお客様にてご負担をお願いいたします。</dd>

            <dt>支払時期・方法</dt>
            <dd>
              契約締結後に当社より請求書を発行いたします。稼働開始月末日までに、指定銀行口座への振込にてお支払いください。
            </dd>

            <dt>役務の提供時期</dt>
            <dd>契約・素材入稿・審査完了後、指定日より配信を開始いたします。</dd>

            <dt>キャンセル・返金</dt>
            <dd>
              申込書段階でのキャンセルは可能です。契約締結後のキャンセルは原則として承れませんが、業績不振等のやむを得ない事情がある場合は個別にご相談ください。
            </dd>

          </dl>

          <span className={styles.meta}>制定日：2026年5月20日</span>
        </article>
      </div>
    </section>
  );
}
