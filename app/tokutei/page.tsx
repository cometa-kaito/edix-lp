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
              <a href="mailto:info@rebounder.jp">info@rebounder.jp</a>
              <div className={styles.note}>
                ※ お電話でのご連絡をご希望の場合は、上記メールアドレスまでお申し出ください。折り返しご案内いたします。
              </div>
            </dd>

            <dt>販売商品・役務</dt>
            <dd>教室設置型デジタルサイネージ「キミテラス」の広告掲載枠</dd>

            <dt>販売価格</dt>
            <dd>
              申込ページ（<a href="https://kimiteras.rebounder.jp/apply" target="_blank" rel="noopener">kimiteras.rebounder.jp/apply</a>）に、学校ごとの料金（税別・税込）を表示しています。
              <div className={styles.note}>
                学科を絞った配信・複数校への掲載など、上記以外の内容は、配信内容・期間に応じて個別にお見積もりいたします。
              </div>
            </dd>

            <dt>商品代金以外の必要料金</dt>
            <dd>お支払いにかかる手数料（銀行振込手数料等）はお客様にてご負担をお願いいたします。</dd>

            <dt>支払時期・方法</dt>
            <dd>
              契約の成立後、当社より請求書を発行いたします。お支払い方法は、指定銀行口座へのお振込みまたはクレジットカードです。
              <div className={styles.note}>
                お支払期日は個別契約で定める日です。定めがない場合は、請求書の発行日が属する月の翌月末日です（広告掲載規約 第11条）。
              </div>
            </dd>

            <dt>お申込み・契約の成立</dt>
            <dd>
              申込ページからお申込みいただいた後、当社からお送りする確認画面で広告掲載規約の全文をご確認のうえ同意いただき、当社が承諾した時点で契約が成立します（広告掲載規約 第3条）。
            </dd>

            <dt>役務の提供時期</dt>
            <dd>
              契約の成立・素材のご入稿・審査の完了後、指定日より配信を開始いたします。
              <div className={styles.note}>
                掲載の可否は、当社の広告掲載基準および掲載先の学校の承認によって決まります。
              </div>
            </dd>

            <dt>キャンセル・返金</dt>
            <dd>
              契約の成立前（規約への同意前）であれば、お申込みを取り消せます。クレジットカードでお申込みの際の仮押さえは、審査を通過しなかった場合には解除され、請求は発生しません。
              <div className={styles.note}>
                契約期間は1年で、期間満了の1か月前までにお申し出がなければ1年ごとに更新されます。契約期間中も、当社所定のメールアドレスへご連絡いただくことで、ご連絡日の翌月末日付で解約できます。お客様のご都合による解約の場合、お支払い済みの料金は返金されず、契約期間の残りの料金もお支払いいただきます。ただし、当社の責めによる場合や、広告が掲載できなかった期間がある場合は、その期間の料金を日割りで返金します（広告掲載規約 第8条・第14条・第24条）。
              </div>
            </dd>

          </dl>

          <span className={styles.meta}>制定日：2026年5月20日／改定日：2026年9月30日</span>
        </article>
      </div>
    </section>
  );
}
