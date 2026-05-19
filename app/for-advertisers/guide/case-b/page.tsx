import type { Metadata } from 'next';
import Image from 'next/image';
import GuideShell from '@/components/guide/GuideShell';
import ContactBox from '@/components/guide/ContactBox';
import CtaBlock from '@/components/guide/CtaBlock';
import PageNav from '@/components/guide/PageNav';
import styles from '@/styles/sections/guide.module.css';

export const metadata: Metadata = {
  title: 'ケースB：テンプレで作る｜出稿ガイド｜キミテラス',
  description: '原稿を一から作る方向け。ヒアリングシート→テンプレート流し込みの3ステップで完成。デザインの仕上げは岐阜文芸社さんと連携。',
};

const CRUMBS = [
  { label: 'TOP', href: '/' },
  { label: '広告主の方へ', href: '/for-advertisers' },
  { label: '出稿ガイド', href: '/for-advertisers/guide' },
  { label: 'ケースB：テンプレで作る' },
];

export default function CaseBPage() {
  return (
    <GuideShell
      eyebrow="Case B"
      title="テンプレで作る"
      lead="原稿はこれから作る。レイアウトや書式は迷いたくないので、用意されたテンプレートに沿って作りたい方向け。"
      crumbs={CRUMBS}
    >
      <div className={styles.card}>
        <h2>4ステップで完成します</h2>
        <ol>
          <li><strong>ヒアリングシートに回答</strong>（4問）</li>
          <li><strong>4ブロック構成のテンプレに沿って原稿を書く</strong>（本文200〜300字）</li>
          <li><strong>写真をご用意いただく</strong>（OK／NG実例で確認）</li>
          <li><strong>入稿前最終チェック</strong></li>
        </ol>

        <div className={styles.good}>
          <strong>デザインの仕上げまで、こちらで責任を持って対応します。</strong><br />
          ご記入いただいた原稿は、私どもがテンプレートに流し込んだあと、地元の老舗である <strong>岐阜文芸社さん</strong> にデザインの仕上げをお願いしています。文字組み・配色・写真とのバランスといった見え方の部分はプロにお任せいただけますので、書きたい中身を素直にお書きいただければ大丈夫です。
        </div>
      </div>

      <div className={styles.card}>
        <h2>ステップ1：ヒアリングシート</h2>
        <p>原稿づくりの前に、自社の魅力と「届けたい生徒像」を言語化します。回答が手元にそろうと、次のテンプレ流し込みが格段に楽になります。</p>

        <h3>Q1. 御社の独自性・特徴は何ですか？</h3>
        <p>取り扱う製品・サービスのユニークさ、技術的な強み、地元との関わり、世界とのつながり、歴史など、他社にはない要素を挙げてください。<br /><span style={{ color: 'var(--text-sub)' }}>→ 原稿の「01 どんな会社？」になります。</span></p>

        <h3>Q2. その仕事に毎日向き合うことで、社員に身につく技術・力は何ですか？</h3>
        <p>地味な作業の繰り返しのなかで育つ「目」「手」「判断力」、何年か続けると独り立ちできるレベル、潰しの効く資格など、仕事の <strong>魅力</strong> を支える要素です。<br /><span style={{ color: 'var(--text-sub)' }}>→ 原稿の「02 どんな仕事をするの？」になります。</span></p>

        <h3>Q3. 学校の成績や面接スキル以外で、御社で活躍できる人の「好き」「得意」は何ですか？</h3>
        <p>例：細かい作業が好き／プラモやゲームに熱中できる／一つのものを長く触っていられる／人と話すより黙々と作業したい。生徒が <strong>「自分のことだ」と思える</strong> 切り口で言語化してください。<br /><span style={{ color: 'var(--text-sub)' }}>→ 原稿の「03 どんな高校生が向いている？」とキャッチコピーの素材になります。</span></p>

        <h3>Q4. 会社DATAとして載せたい客観データは何ですか？</h3>
        <p>設立年・社員数・平均年齢・工業高校卒業生数・離職率・取引先業界など。<strong>数字や事実だけ</strong>で構いません。<br /><span style={{ color: 'var(--text-sub)' }}>→ 原稿の「会社DATA」枠になります。</span></p>

        <div className={styles.note}>
          <strong>このヒアリングシートには、給与・賞与・休日・残業時間といった労働条件の項目が含まれていません。</strong> 本サイネージは採用広告ではなく企業認知広告のため、条件提示はそもそも行いません。
        </div>
      </div>

      <div className={styles.card}>
        <h2>ステップ2：原稿テンプレート（4ブロック構成）</h2>
        <p>下のテンプレに、ヒアリングシートの回答を当てはめてください。</p>

        <div className={styles.template}>
{`【ヘッダー】
会社名：○○○○○○○○○○
業種：○○○○○ ／ 事業エリア：○○○○○

【キャッチコピー】
○○○○○○○○○○○○○○○○
（その学校の生徒に向けた、一行のメッセージ）

【01 どんな会社？】
〔1行コピー〕○○○○○○○○○○○○○○○
○○○○○○○○○○○○○○○○○○○○○
（会社の独自性・特徴を、短い本文で）

【02 どんな仕事をするの？】
〔1行コピー〕○○○○○○○○○○○○○○○
○○○○○○○○○○○○○○○○○○○○○
（仕事の魅力・身につく技術を、短い本文で）

【03 どんな高校生が向いている？】
〔1行コピー〕○○○○○○○○○○○○○○○
○○○○○○○○○○○○○○○○○○○○○
（生徒が自分ごと化できる「好き」「得意」を）

【会社DATA】
設立：○○○○年 ／ 社員数：○○名
平均年齢：○○歳 ／ 工業高校卒業生：○○名`}
        </div>

        <h3>書くときの3つの基準</h3>
        <ol>
          <li><strong>採用・募集・面接・見学などのリクルート系の語を使わない</strong></li>
          <li><strong>万人ではなく、その学校の生徒に向けた一言</strong> で書く</li>
          <li>
            <strong>本文の総文字数は200〜300字</strong>
            <div className={styles.note} style={{ marginTop: 6 }}>
              ヘッダーの会社名や「【01 どんな会社？】」のような見出し・記号、会社DATAの数字部分は、カウントに含めなくて大丈夫です。あくまで <strong>実際に読まれる本文</strong> が200〜300字に収まる目安です。
            </div>
          </li>
        </ol>
      </div>

      <div className={styles.card}>
        <h2>サンプル原稿（参考）</h2>
        <p>岐南工業高校の進路指導の先生にご監修いただいたサンプルです。</p>

        <div className={styles.quote}>
          <strong>大垣未来精工株式会社</strong><br />
          CAREER NAVI　《勤務地》大垣市内

          <h3 style={{ marginTop: '1em', color: '#c46a2e' }}>キャッチコピー</h3>
          モノづくりって、こんなにスマートだ！

          <h3 style={{ marginTop: '1em', color: '#c46a2e' }}>01 どんな会社？</h3>
          <strong>大垣から世界へ！最新マシンを操る精密部品メーカー</strong><br />
          油まみれの工場はもう古い！冷暖房完備の超クリーンな職場で、世界中の自動車を支える最先端のモノづくり。同じ高校の先輩たちも、ゼロからプロになって活躍中！

          <h3 style={{ marginTop: '1em', color: '#c46a2e' }}>02 どんな仕事をするの？</h3>
          <strong>最新マシンで、世界を走る車の部品を削り出す！</strong><br />
          ゲーム感覚で最新のNCマシンをプログラミング。ミクロン単位の超精密パーツをスマートに作る仕事です！

          <h3 style={{ marginTop: '1em', color: '#c46a2e' }}>03 どんな高校生が向いている？</h3>
          <strong>プラモ、ゲーム、スマホいじり。それが最高の才能！</strong><br />
          「実習が一番好き」「ゲームの攻略を考えるのが得意」「メカの構造にワクワクする」。1つでも当てはまれば適性100％！そのこだわりや探究心が、最先端マシンを動かす最大の武器になります。

          <h3 style={{ marginTop: '1em', color: '#c46a2e' }}>会社DATA</h3>
          ３年間離職率 ０％　｜　有給休暇取得率 １００％　｜　ゲーム手当 ５０００円
        </div>

        <div className={styles.note}>
          上のサンプルには「採用」「募集」「見学」「お問い合わせ」などのリクルート系の語が <strong>一切登場しない</strong> 点にご注目ください。これが本サイネージで作る「企業認知広告」の標準形です。
        </div>
      </div>

      {/* ステップ3：写真のご準備 */}
      <div className={styles.card}>
        <h2>ステップ3：写真をご用意ください</h2>
        <p>
          4ブロック構成は <strong>写真とのバランスでこそ成立</strong> します。原稿が良くても、写真が「広告感のある集合写真」や「暗くて何の仕事か分からない一枚」だと、教室では効果が出ません。先に <strong>OK／NGの実例</strong> をご確認ください。
        </p>

        <h3 className={`${styles.photoRowHeading} ${styles.ok}`}>◯ OK例</h3>
        <div className={styles.photoRowOk}>
          <div className={`${styles.photoCard} ${styles.ok}`}>
            <div className={styles.photoCardLabel}>◯ OK例</div>
            <div className={styles.photoCardImg}>
              <Image
                src="/guide/photo-ok.png"
                alt="OK例：仕事の中身が伝わり、現場の空気も分かる写真"
                fill
                sizes="(max-width: 640px) 100vw, 320px"
              />
            </div>
            <div className={styles.photoCardReasons}>
              <ul>
                <li>仕事の中身が伝わる</li>
                <li>現場の空気が分かる</li>
                <li>明るく撮れている</li>
                <li>キャッチコピー用の余白がある</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className={`${styles.photoRowHeading} ${styles.ng}`}>✕ NG例</h3>
        <div className={styles.photoRowNg}>
          <div className={`${styles.photoCard} ${styles.ng}`}>
            <div className={styles.photoCardLabel}>✕ NG例 ①</div>
            <div className={styles.photoCardImg}>
              <Image
                src="/guide/photo-ng-content.png"
                alt="NG例：仕事の中身が分からない写真"
                fill
                sizes="(max-width: 720px) 50vw, 220px"
              />
            </div>
            <div className={styles.photoCardReasons}>
              <ul>
                <li>仕事の中身が分からない</li>
                <li>現場の空気が分からない</li>
                <li>キャッチコピー用の余白がない</li>
              </ul>
            </div>
          </div>

          <div className={`${styles.photoCard} ${styles.ng}`}>
            <div className={styles.photoCardLabel}>✕ NG例 ②</div>
            <div className={styles.photoCardImg}>
              <Image
                src="/guide/photo-ng-safety.png"
                alt="NG例：安全ルールが守られていない写真"
                fill
                sizes="(max-width: 720px) 50vw, 220px"
              />
            </div>
            <div className={styles.photoCardReasons}>
              <ul>
                <li>キャッチコピー用の余白がない</li>
                <li>安全ルールが守られていない</li>
                <li>背景がすっきりしていない</li>
              </ul>
            </div>
          </div>

          <div className={`${styles.photoCard} ${styles.ng}`}>
            <div className={styles.photoCardLabel}>✕ NG例 ③</div>
            <div className={styles.photoCardImg}>
              <Image
                src="/guide/photo-ng-bright.png"
                alt="NG例：暗い写真"
                fill
                sizes="(max-width: 720px) 50vw, 220px"
              />
            </div>
            <div className={styles.photoCardReasons}>
              <ul>
                <li>キャッチコピー用の余白がない</li>
                <li>明るくない</li>
                <li>背景がすっきりしていない</li>
              </ul>
            </div>
          </div>
        </div>

        <h3>必ず押さえてほしい3点</h3>
        <ol>
          <li>
            <strong>安全ルールは絶対遵守</strong>（最重要）<br />
            ヘルメットのあご紐、安全メガネ、安全靴、防塵マスクなど、その作業で決められている保護具が規定どおりに着用されているか、撮影前に現場の責任者に必ずご確認ください。<strong>一つでも不備があると、学校側で配信できなくなります。</strong>
          </li>
          <li>
            <strong>コピー用の余白を空ける</strong><br />
            人や機械を画面の左か右に寄せ、反対側に余白を大きく空けて撮影してください。被写体が真ん中だとキャッチコピーを置く場所がなくなります。
          </li>
          <li>
            <strong>仕事の中身が伝わる、明るい一枚</strong><br />
            工作機械を操作する手元、図面に見入る表情、検査の様子など、作業そのものが写っている一枚を、自然光や照明を活かして明るく撮影してください。
          </li>
        </ol>

        <h3>写真の形式</h3>
        <ul>
          <li>写真は <strong>横長で撮影</strong>（アスペクト比は16:9や4:3など、一般的なカメラ比でOK）</li>
          <li>解像度は長辺1500px以上を推奨（可能であれば）</li>
        </ul>
        <div className={styles.note}>
          ※ サイネージ広告全体（提出物）の入稿仕様（画像のみ・縦長9:16・推奨1080×1920px・動画不可）は別途、<a href="/for-advertisers/guide/submit" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>入稿前最終チェック</a> をご覧ください。
        </div>

        <div className={styles.note}>
          さらに詳しい撮影ポイントは <a href="/for-advertisers/guide/photo" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>写真の撮り方ガイド</a> をご覧ください。
        </div>
      </div>

      {/* テンプレートダウンロード */}
      <div className={styles.card}>
        <h2>テンプレートをダウンロード</h2>
        <p>岐南工業高校の進路指導の先生が作成された、サイネージ画面の見本データです。レイアウト・色・フォントの参考に、ご自由にお使いください。</p>

        <div className={styles.sampleVisual}>
          <Image
            src="/guide/template-sample.png"
            alt="広告テンプレートの見本（PNG）"
            width={320}
            height={568}
            sizes="(max-width: 640px) 70vw, 320px"
            className={styles.sampleImg}
          />
        </div>

        <div className={styles.downloadRow}>
          <a href="/guide/template-sample.pptx" className={styles.pdfDownload} download>
            📊 PowerPoint版（.pptx）
          </a>
          <a href="/guide/template-sample.pdf" className={styles.pdfDownload} download>
            📄 PDF版
          </a>
          <a href="/guide/template-sample.png" className={styles.pdfDownload} download>
            🖼 画像（.png）
          </a>
        </div>

        <div className={styles.note}>
          PowerPoint版は文字を差し替えやすい形式です。Mac で作成されているため、Windows で開くとフォントイメージが変わる場合があります。その際は画像版（.png）も合わせてご参照ください。
        </div>
      </div>

      <CtaBlock />

      <ContactBox />

      <PageNav
        prev={{ label: '出稿ガイドトップ', href: '/for-advertisers/guide' }}
        next={{ label: '入稿前最終チェックへ', href: '/for-advertisers/guide/submit' }}
      />
    </GuideShell>
  );
}
