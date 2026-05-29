import type { Metadata } from 'next';
import styles from '@/styles/sections/legal.module.css';

export const metadata: Metadata = {
  title: 'プライバシーポリシー - キミテラス',
  description:
    'キミテラスを運営する株式会社Rebounderの個人情報保護方針。お問い合わせフォームで取得する情報の取り扱い、サイネージ運用におけるカメラ・マイク不使用の方針等を記載しています。',
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <section className={styles.section}>
      <div className="container">
        <article className={styles.wrapper}>
          <h1 className={styles.title}>プライバシーポリシー</h1>
          <p className={styles.lead}>
            株式会社Rebounder（以下「当社」）は、運営するサービス「キミテラス」（以下「本サービス」）における個人情報の取り扱いについて、以下のとおり定めます。
          </p>

          <h2>1. 取得する情報</h2>
          <ul>
            <li>お問い合わせフォーム送信時に入力いただいた情報（氏名・メールアドレス・所属・お問い合わせ内容）</li>
            <li>広告掲載お申込みフォーム送信時に入力いただいた情報（企業名・ご担当者氏名・連絡先・申込内容等）</li>
            <li>本サービスのアクセス解析に使用するCookie情報（個人を特定しない統計データ）</li>
          </ul>

          <h2>2. 利用目的</h2>
          <ul>
            <li>お問い合わせ・お申込みへのご対応</li>
            <li>資料・契約書類の送付</li>
            <li>本サービスに関する重要なお知らせの送付</li>
            <li>サービス改善のための統計分析</li>
          </ul>

          <h2>3. 第三者提供</h2>
          <p>
            当社は、法令に基づく場合を除き、ご本人の同意なく取得した個人情報を第三者に提供することはありません。
          </p>

          <h2>4. サイネージ運用における重要事項</h2>
          <p>
            教室に設置するデジタルサイネージは、<strong>カメラ・マイクを一切使用しません</strong>。生徒個人を特定する映像・音声データの取得は行いません。来場検知には人感センサー（PIR方式）を使用し、検知するのは「動き」のイベント情報のみで、個人を識別する情報は含まれません。
          </p>

          <h2>5. 個人情報の管理</h2>
          <p>
            当社は、取得した個人情報の漏えい・滅失・毀損を防止するため、合理的な安全管理措置を講じます。委託先がある場合は、当社と同等の安全管理を行うよう適切に監督します。
          </p>

          <h2>6. 開示・訂正・削除のご請求</h2>
          <p>
            ご本人からの個人情報の開示・訂正・利用停止・削除のご請求は、下記のお問い合わせ先までご連絡ください。本人確認のうえ、合理的な期間内に対応いたします。
          </p>

          <h2>7. お問い合わせ先</h2>
          <p>
            株式会社Rebounder
            <br />
            メール：<a href="mailto:rebounder@googlegroups.com">rebounder@googlegroups.com</a>
          </p>

          <h2>8. 改定</h2>
          <p>
            本ポリシーは、法令の改正・サービスの変更等に応じて改定する場合があります。改定後の内容は本ページに掲載した時点から有効となります。
          </p>

          <span className={styles.meta}>制定日：2026年5月20日</span>
        </article>
      </div>
    </section>
  );
}
