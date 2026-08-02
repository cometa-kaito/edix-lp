import type { Metadata } from 'next';
import GuideShell from '@/components/guide/GuideShell';
import ContactBox from '@/components/guide/ContactBox';
import CtaBlock from '@/components/guide/CtaBlock';
import PageNav from '@/components/guide/PageNav';
import styles from '@/styles/sections/guide.module.css';

export const metadata: Metadata = {
  title: '入稿前最終チェック・入稿仕様｜出稿ガイド｜キミテラス',
  description: '原稿・写真の最終チェック項目と、ファイル形式・サイズ・審査フローなどの入稿仕様をまとめています。',
};

const CRUMBS = [
  { label: 'TOP', href: '/' },
  { label: '広告主の方へ', href: '/for-advertisers' },
  { label: '出稿ガイド', href: '/for-advertisers/guide' },
  { label: '入稿前最終チェック' },
];

export default function SubmitPage() {
  return (
    <GuideShell
      eyebrow="Final Check"
      title="入稿前最終チェック"
      lead="すべてのケースを通った後、最後にこのページで総点検します。"
      crumbs={CRUMBS}
    >
      <div className={styles.card}>
        <h2>最終チェック項目</h2>
        <p>
          本サイネージは <strong>採用広告ではなく企業認知広告</strong> です。高校生求人の特殊なルール（学校経由原則・7月1日解禁）に従い、リクルートを連想させる表現が含まれていないか、入稿前に必ず確認してください。
        </p>
        <ul className={styles.checklist}>
          <li className={styles.group}>① リクルート系の表現がない（最重要・絶対条件）</li>
          <li>「採用」「募集」「応募」「面接」「面談」「説明会」の語が一切含まれていない</li>
          <li>「見学」「会社見学」「工場見学」の語が含まれていない</li>
          <li>「まずは○○から」「お気軽にお越しください」「お問い合わせは○○まで」のようなアクション誘導がない</li>
          <li>給与・賞与・休日・福利厚生・残業時間などの労働条件が含まれていない</li>

          <li className={styles.group}>② 4ブロック構成になっている（推奨）</li>
          <li>ヘッダーに会社名・業種・事業エリアがある</li>
          <li>その学校の生徒に向けたキャッチコピーがある</li>
          <li>01 どんな会社？／02 どんな仕事をするの？／03 どんな高校生が向いている？の3ブロックがある</li>
          <li>会社DATA（設立・社員数・卒業生数など）の枠がある</li>

          <li className={styles.group}>③ 内容の方向性</li>
          <li>「やりがい」「アットホーム」「成長できる」などの抽象語が主役になっていない</li>
          <li>仕事の大変さに触れる場合、「その先に育つもの」とセットになっている</li>
          <li>万人向けではなく、特定の生徒（その学校の生徒）に向けた内容</li>
          <li>「何をする仕事か」が具体的に伝わる</li>

          <li className={styles.group}>④ ホームページ案内（記載する場合）</li>
          <li><strong>ホームページに高卒求人ページが残っていないこと</strong>を企業側で確認済み</li>
          <li>前年度の求人ページが消し忘れになっていないか確認した</li>

          <li className={styles.group}>⑤ 写真（原則必須）</li>
          <li>作業そのものが写っている</li>
          <li>社員の顔・手元・機械が明るく見える</li>
          <li><strong>保護具が規定どおり着用</strong>されている</li>
          <li>コピーを入れる余白が空いている</li>
          <li>背景がすっきりしている</li>

          <li className={styles.group}>⑥ 形式・出稿条件</li>
          <li>本文の文字数が200〜300字に収まっている</li>
          <li>入稿データの形式が指定どおり</li>
          <li>商品広告ではなく、企業認知が目的</li>
          <li>1枠＝1メッセージ・1ペルソナになっている（複数職種を詰め込んでいない）</li>

          <li className={styles.group}>⑦ 内部確認</li>
          <li>採用担当だけでなく、<strong>現場責任者・人事責任者</strong>にも内容確認済み</li>
          <li>過去出稿との重複・矛盾がない（リピートの場合）</li>
        </ul>
      </div>

      <div className={styles.card}>
        <h2>入稿仕様</h2>
        <p>サイネージ素材の技術仕様です。仕様を満たさない素材は、再入稿をお願いする場合があります。</p>

        <h3>基本仕様</h3>
        <table className={styles.table}>
          <tbody>
            <tr><th style={{ width: '160px' }}>形式</th><td><strong>画像のみ（JPEG／PNG）</strong></td></tr>
            <tr><th>推奨サイズ</th><td><strong>1080 × 1920px</strong></td></tr>
            <tr><th>アスペクト比</th><td><strong>9:16（縦長）</strong></td></tr>
            <tr><th>ファイルサイズ</th><td>5MB以下</td></tr>
            <tr><th>カラーモード</th><td>RGB</td></tr>
            <tr><th>表示時間</th><td>30秒（固定）</td></tr>
            <tr><th>音声</th><td>原則なし</td></tr>
          </tbody>
        </table>

        <h3>動画素材について</h3>
        <div className={styles.note}>
          動画素材は現在も今後も <strong>受付対象外</strong> です。教室での視認性・配信安定性・1スロット30秒の枠設計を維持するため、当面のあいだ <strong>画像のみ（JPEG／PNG）</strong> の運用を継続いたします。動画形式での訴求をご希望の場合は、静止画（縦長 9:16・30秒固定）への変換をお願いいたします。必要に応じて連携先の岐阜文芸社さんへの取次が可能です。
        </div>

        <h3>QRコードを掲載する場合</h3>
        <table className={styles.table}>
          <tbody>
            <tr><th style={{ width: '160px' }}>最小サイズ</th><td>150 × 150ピクセル以上</td></tr>
            <tr><th>推奨サイズ</th><td>200 × 200ピクセル以上</td></tr>
            <tr><th>配置位置</th><td>画面の右下または左下を推奨</td></tr>
            <tr><th>余白</th><td>QRコードの周囲に十分な余白を確保してください</td></tr>
            <tr><th>リンク先</th><td>広告主の公式サイトに限ります</td></tr>
            <tr><th>動作確認</th><td>入稿前に必ず読み取りテストをお願いします</td></tr>
          </tbody>
        </table>

        <h3>入稿方法</h3>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th style={{ width: '160px' }}>入稿期限</th>
              <td>掲載開始日の7営業日前までを目安としています。<strong>柔軟に対応いたしますので、間に合いそうにない場合はお気軽にご相談ください。</strong></td>
            </tr>
            <tr>
              <th>入稿方法</th>
              <td>メール添付、またはファイル転送サービス</td>
            </tr>
            <tr>
              <th>入稿先</th>
              <td>rebounder@googlegroups.com</td>
            </tr>
            <tr>
              <th>ファイル命名規則</th>
              <td>
                広告主名_広告タイトル_秒数.拡張子<br />
                <span style={{ fontSize: '0.85em', color: 'var(--text-sub)' }}>例：大垣未来精工_CareerNavi_30s.jpg</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.card}>
        <h2>審査・掲載フロー</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '60px' }}>STEP</th>
              <th>内容</th>
              <th style={{ width: '120px' }}>所要日数</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ textAlign: 'center' }}>1</td><td>素材入稿・申請書提出</td><td style={{ textAlign: 'center' }}>—</td></tr>
            <tr><td style={{ textAlign: 'center' }}>2</td><td>キミテラスによる一次審査</td><td style={{ textAlign: 'center' }}>2営業日</td></tr>
            <tr><td style={{ textAlign: 'center' }}>3</td><td>設置校への確認</td><td style={{ textAlign: 'center' }}>3営業日</td></tr>
            <tr><td style={{ textAlign: 'center' }}>4</td><td>審査結果のご連絡</td><td style={{ textAlign: 'center' }}>入稿から5営業日以内</td></tr>
            <tr><td style={{ textAlign: 'center' }}>5</td><td>掲載開始</td><td style={{ textAlign: 'center' }}>審査完了後、指定日より</td></tr>
          </tbody>
        </table>
        <div className={styles.note}>
          審査の結果、修正をお願いする場合があります。修正対応後、再審査となります。
        </div>
      </div>

      <div className={styles.card}>
        <h2>その他のご留意点</h2>
        <ul>
          <li>素材の著作権・肖像権等の権利処理は広告主さまの責任でお願いいたします。</li>
          <li>光の点滅（フラッシュ）を含む表現は使用できません。</li>
          <li>設置校の事情により、予告なく掲載が停止される場合があります。</li>
        </ul>
      </div>

      <div className={styles.card}>
        <h2>チェックが付かない項目があった場合</h2>
        <ul>
          <li>原稿の方針 → <a href="/for-advertisers/guide/case-a" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>ケースAのチェックリスト</a>、または <a href="/for-advertisers/guide/extras#review" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>添削サポート</a></li>
          <li>写真 → <a href="/for-advertisers/guide/photo" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>写真の撮り方ガイド</a></li>
          <li>表現・法令の判断に迷う → <a href="/for-advertisers/guide/extras#fact-check" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>表現確認のご相談</a></li>
        </ul>
      </div>

      <CtaBlock />

      <ContactBox />

      <PageNav
        prev={{ label: '写真ガイドへ', href: '/for-advertisers/guide/photo' }}
      />
    </GuideShell>
  );
}
