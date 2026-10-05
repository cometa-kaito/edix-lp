import type { Metadata } from 'next';
import GuideShell from '@/components/guide/GuideShell';
import ContactBox from '@/components/guide/ContactBox';
import CtaBlock from '@/components/guide/CtaBlock';
import PageNav from '@/components/guide/PageNav';
import styles from '@/styles/sections/guide.module.css';

export const metadata: Metadata = {
  title: 'よくある追加ケース｜出稿ガイド｜キミテラス',
  description: '製造業以外の業種、複数職種・複数枠、リピート出稿、表現確認のご相談、添削サポートなど、メインの流れに当てはまらないケースのご案内。',
};

const CRUMBS = [
  { label: 'TOP', href: '/' },
  { label: '広告主の方へ', href: '/for-advertisers' },
  { label: '出稿ガイド', href: '/for-advertisers/guide' },
  { label: 'よくある追加ケース' },
];

export default function OtherCasesPage() {
  return (
    <GuideShell
      eyebrow="Other Cases"
      title="よくある追加ケース"
      lead="メインの流れに当てはまらない、業種・形態・タイミングなどに関するご案内です。"
      crumbs={CRUMBS}
    >
      {/* 製造業以外 */}
      <div className={styles.card} id="industries">
        <h2>製造業以外の業種</h2>
        <p>
          本ガイドのサンプル原稿（大垣自動車部品）は <strong>製造業</strong> を前提にしていますが、
          考え方そのものは他業種でも変わりません。「しんどさ」「身につく力」「向いている人」の言語化が業種ごとに異なるだけです。
        </p>

        <h3>業種別「しんどさ」と「その先に育つもの」の例</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>業種</th>
              <th>しんどさ</th>
              <th>その先に育つもの</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>介護</th>
              <td>体力的にきつい瞬間／夜勤がある</td>
              <td>人を支える観察眼／介護福祉士などの国家資格</td>
            </tr>
            <tr>
              <th>建設・土木</th>
              <td>屋外作業／早朝の現場入り</td>
              <td>街に残る仕事の達成感／重機・施工管理などの資格</td>
            </tr>
            <tr>
              <th>小売・接客</th>
              <td>立ち仕事／土日出勤／クレーム対応</td>
              <td>人を見る目／提案力／店長を任される実務経験</td>
            </tr>
            <tr>
              <th>運輸・物流</th>
              <td>早朝・深夜のシフト／天候の影響</td>
              <td>大型免許・フォークリフトなどの資格／一人で完結する裁量</td>
            </tr>
            <tr>
              <th>飲食</th>
              <td>ピーク時の忙しさ／土日祝の出勤</td>
              <td>段取り力／調理・接客の両輪／独立も視野に入る技術</td>
            </tr>
            <tr>
              <th>IT・事務</th>
              <td>長時間PC作業／納期前の集中</td>
              <td>一人でも食えるスキル／在宅勤務などの柔軟な働き方</td>
            </tr>
          </tbody>
        </table>

        <div className={styles.note}>
          非製造業では、<strong>「働きながら取れる資格」</strong>が高校生に強く響きます。
          介護福祉士・大型免許・宅建・調理師など、自社で取得サポートしている資格があれば必ず明記してください。
        </div>
      </div>

      {/* 複数枠 */}
      <div className={styles.card} id="multi-slot">
        <h2>複数職種・複数枠の出稿</h2>
        <p><strong>1枠＝1メッセージ・1ペルソナ</strong> が原則です。1枠の中に複数の職種を詰め込まないでください。</p>

        <h3>なぜ詰め込んではいけないか</h3>
        <ul>
          <li>30秒で読める文字数は200〜300字。複数職種を入れると一つあたりが薄まる</li>
          <li>「誰に向けた広告か」が伝わらず、結局誰にも刺さらない広告になる</li>
        </ul>

        <h3>推奨：職種ごとに別枠</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>枠</th>
              <th>キャッチコピー</th>
              <th>向いている生徒像</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>機械オペレーター枠</td>
              <td>「工作機械と本気で向き合える人へ」</td>
              <td>黙々と作業に集中したい、技術で評価されたい</td>
            </tr>
            <tr>
              <td>検査枠</td>
              <td>「ミリ単位の違いに気づける人へ」</td>
              <td>細かい違いを見つけるのが好き、几帳面</td>
            </tr>
            <tr>
              <td>事務枠</td>
              <td>「現場と一緒に動ける事務を探しています」</td>
              <td>工場の人と話すのが嫌じゃない、段取りが得意</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* リピート出稿 */}
      <div className={styles.card} id="repeat">
        <h2>リピート出稿・内容更新</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ケース</th>
              <th>進め方</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>同じ内容で継続したい</td>
              <td>下記窓口に「継続希望」とご連絡ください</td>
            </tr>
            <tr>
              <td>内容を一部だけ変えたい（文言・写真）</td>
              <td>変更したい箇所だけ抽出して提出</td>
            </tr>
            <tr>
              <td>大幅に書き直したい</td>
              <td>ケースB/Cで新規作成扱い</td>
            </tr>
            <tr>
              <td>募集職種が変わった</td>
              <td>別枠扱いで新規作成</td>
            </tr>
          </tbody>
        </table>

        <div className={styles.note}>
          リピート出稿の際も、<strong>掲載時期に合わない求人情報が入っていないか</strong> を改めてご確認ください。URLやQRコードを載せている場合は、<strong>飛び先のページ</strong> も同じ基準で確認します。
        </div>
      </div>

      {/* 表現確認 */}
      <div className={styles.card} id="fact-check">
        <h2>表現確認のご相談</h2>
        <p>原稿に入れてしまいがちな表現と、<a href="/for-advertisers/guide" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>広告掲載基準 第2版</a>での扱いをまとめます。</p>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>表現</th>
              <th>扱い・書き換え例</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>採用／募集職種／初任給</td><td>6月30日までは削除。7月1日以降は、求人票と同じ内容なら可</td></tr>
            <tr><td>「採用サイトはこちら」などの誘導</td><td>6月30日までは不可（QRコード・URLの飛び先も同じ）</td></tr>
            <tr><td>会社説明会・職場見学・インターンシップ</td><td>案内は可（選考を伴わないもの）。何の仕事を見る・体験するのかを添える</td></tr>
            <tr><td>「エントリーはこちら」など直接応募の誘導</td><td>不可（応募は学校経由）</td></tr>
            <tr><td>価格・キャンペーン・資料請求</td><td>不可（商品・サービスの宣伝は掲載しない）</td></tr>
            <tr><td>「地域No.1」「業界トップ」</td><td>調査主体・時点・範囲を画面に出す。出せないなら削除</td></tr>
            <tr><td>「やりがいのある仕事です」</td><td>仕事の具体的な中身・身につく技術に置き換える</td></tr>
            <tr><td>「アットホームな職場」</td><td>働く人の言葉や職場の様子、会社DATAに置き換える</td></tr>
          </tbody>
        </table>

        <p>判断に迷う場合は、入稿前に下記の窓口へご相談ください。</p>
      </div>

      {/* 添削サポート */}
      <div className={styles.card} id="review">
        <h2>添削サポートをご希望の方</h2>
        <p>自社で原稿を書いてみたが、本サイネージの方針に合っているか不安——そんな場合、添削のご依頼をお受けしています。</p>

        <h3>添削で見るポイント</h3>
        <ol>
          <li><strong>掲載基準に合っているか</strong> — 職種と仕事の中身が入っているか、掲載時期に合わない求人情報が入っていないか</li>
          <li><strong>4ブロック構成への適合</strong> — どんな会社／どんな仕事／どんな高校生／会社DATA が揃っているか</li>
          <li><strong>方向性</strong> — 飾り言葉が残っていないか、その学校の生徒に向けた一言になっているか</li>
          <li><strong>仕事内容の伝わりやすさ</strong> — 何をする仕事か、原稿だけで伝わるか</li>
          <li><strong>文字数とリズム</strong> — 本文200〜300字、読みやすい行間・改行</li>
        </ol>

        <h3>添削依頼の出し方</h3>
        <p>下記を添えて、下記の窓口までお送りください。通常2〜3営業日以内に、修正案をご返信します。</p>
        <ul>
          <li>原稿テキスト（本文200〜300字目安）</li>
          <li>業種・職種・勤務地</li>
          <li>ヒアリングシート回答（あれば）</li>
          <li>特に不安な箇所（任意）</li>
        </ul>
      </div>

      <CtaBlock />

      <ContactBox />

      <PageNav
        prev={{ label: '出稿ガイドトップ', href: '/for-advertisers/guide' }}
      />
    </GuideShell>
  );
}
