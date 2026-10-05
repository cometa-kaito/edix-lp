import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import GuideShell from '@/components/guide/GuideShell';
import ContactBox from '@/components/guide/ContactBox';
import CtaBlock from '@/components/guide/CtaBlock';
import { FileTextIcon } from '@/components/ui/Icon';
import { PORTAL_APPLY_URL, POSTING_STANDARDS_PDF_URL } from '@/lib/constants';
import styles from '@/styles/sections/guide.module.css';

export const metadata: Metadata = {
  title: '出稿ガイド（広告掲載基準 第2版）｜キミテラス',
  description:
    '工業高校の教室サイネージに載せられる広告のルールを、3分で読める形にまとめました。広告掲載基準 第2版（2026年10月1日発効）にもとづく、業種の早見表・時期のルール・画面の仕様・審査の流れ。',
};

const CRUMBS = [
  { label: 'TOP', href: '/' },
  { label: '広告主の方へ', href: '/for-advertisers' },
  { label: '出稿ガイド' },
];

const TOC = [
  { href: '#points', label: '3つの要点' },
  { href: '#category', label: '載せられる業種' },
  { href: '#content', label: '広告の中身' },
  { href: '#timing', label: '時期のルール' },
  { href: '#expression', label: '表現の注意' },
  { href: '#spec', label: '画面の仕様' },
  { href: '#review', label: '審査の流れ' },
  { href: '#make', label: '原稿の作り方' },
];

const BRANCHES = [
  {
    label: 'ケースA',
    title: '広告原稿をお持ちの方',
    desc: '作成済みの原稿を、チェックリストで確認してから入稿します。',
    href: '/for-advertisers/guide/case-a',
  },
  {
    label: 'ケースB',
    title: 'テンプレートで作る',
    desc: 'ヒアリングシートにご記入いただき、当社が型に流し込みます。',
    href: '/for-advertisers/guide/case-b',
  },
  {
    label: 'ケースC',
    title: '自由な形式で作る',
    desc: 'デザインも自社で組みたい方向けの書き方です。',
    href: '/for-advertisers/guide/case-c',
  },
];

export default function GuideTopPage() {
  return (
    <GuideShell
      eyebrow="For Advertisers"
      title="出稿ガイド"
      lead="教室に流れる広告のルールを、3分で読める形にまとめました。もとになっているのは「キミテラス 広告掲載基準 第2版」です。"
      crumbs={CRUMBS}
    >
      <div className={styles.versionBar}>
        <span className={styles.versionTag}>広告掲載基準 第2版</span>
        <span>2026年10月1日発効</span>
        <a href={POSTING_STANDARDS_PDF_URL} target="_blank" rel="noopener" className={styles.versionLink}>
          <FileTextIcon size={16} />全文（PDF）
        </a>
      </div>

      <nav className={styles.toc} aria-label="このページの目次">
        {TOC.map((t) => (
          <a key={t.href} href={t.href}>{t.label}</a>
        ))}
      </nav>

      {/* ===== 3つの要点 ===== */}
      <section id="points" className={styles.anchor}>
        <h2 className={styles.sectionTitle}>まず、この3つだけ</h2>
        <div className={styles.pointGrid}>
          <div className={styles.point}>
            <span className={styles.pointNum}>1</span>
            <h3>仕事と働く人を紹介する</h3>
            <p>製品やサービスだけの広告は載せられません。<b>職種名と、何をする仕事か</b>を文字で入れてください。</p>
          </div>
          <div className={styles.point}>
            <span className={styles.pointNum}>2</span>
            <h3>求人の情報は7月1日から</h3>
            <p>それまでは会社・仕事・働く人の紹介と、見学やインターンシップの案内まで。<b>応募は学校を通します。</b></p>
          </div>
          <div className={styles.point}>
            <span className={styles.pointNum}>3</span>
            <h3>縦長の静止画1枚・音なし</h3>
            <p>縦 9:16 の画像1枚を、1回30秒ずつ表示します。<b>動画と音声は使えません。</b></p>
          </div>
        </div>
      </section>

      {/* ===== 早見表 ===== */}
      <section id="category" className={`${styles.card} ${styles.anchor}`}>
        <h2>載せられる業種（早見表）</h2>
        <p>
          企業の採用・企業認知の広告は、<b>業種を問わず掲載できます</b>。ゲーム・化粧品・医薬品などの業種の会社も、ほかの業種と同じ扱いです（医薬品等の効能効果は表示できません）。
        </p>
        <div className={styles.verdictGrid}>
          <div className={`${styles.verdict} ${styles.verdictOk}`}>
            <div className={styles.verdictHead}><span aria-hidden="true">○</span>掲載できる</div>
            <ul>
              <li>企業の採用・企業認知（業種を問わない）</li>
              <li>大学・短大・専門学校・高専の学生募集、オープンキャンパス</li>
              <li>国・自治体・公的機関のお知らせ</li>
              <li>産業団体・商工会議所の催し</li>
              <li>警察・消防などの公務員の採用</li>
              <li>資格・検定の受検案内</li>
            </ul>
          </div>
          <div className={`${styles.verdict} ${styles.verdictAsk}`}>
            <div className={styles.verdictHead}><span aria-hidden="true">△</span>学校の承認が要る</div>
            <ul>
              <li>アルバイト求人</li>
              <li>美容・容姿に関するサービスの会社</li>
              <li>民間主催の地域の催し・職業体験</li>
              <li>学習塾・予備校・通信教育の会社</li>
              <li>金融機関の企業広告</li>
              <li>宗教系の学校法人の学生募集</li>
              <li>自衛隊の採用</li>
            </ul>
          </div>
          <div className={`${styles.verdict} ${styles.verdictNg}`}>
            <div className={styles.verdictHead}><span aria-hidden="true">×</span>掲載できない</div>
            <ul>
              <li>成人向け・出会い系、公営競技・賭博</li>
              <li>酒・たばこ</li>
              <li>金融商品の勧誘</li>
              <li>宗教への勧誘、特定の政党・候補者の支持</li>
              <li>不安や射幸心をあおる表現</li>
              <li>反社会的勢力・連鎖販売取引など</li>
            </ul>
          </div>
        </div>
        <p className={styles.small}>
          どの区分でも、<b>商品・サービスの宣伝</b>（価格・キャンペーン・購入や入会の呼びかけ）は掲載しません。△の業種も、承認の対象は採用・企業認知の広告だけです。
        </p>
      </section>

      {/* ===== 広告の中身 ===== */}
      <section id="content" className={`${styles.card} ${styles.anchor}`}>
        <h2>広告の中身：仕事と働く人の紹介</h2>
        <p>
          この広告は、生徒が地域の仕事と働く人を知るためのものです。画面の<b>見出し（いちばん大きい文字）か、主な写真</b>の少なくとも一方は、働く人・仕事の場面・仕事の説明にしてください。
        </p>

        <h3>必ず入れるもの</h3>
        <ul className={styles.checkList}>
          <li><b>職種名と、その仕事で何をするか</b>（「社員」「スタッフ」「技術者」だけでは足りません）</li>
          <li>
            次のうち<b>1つ以上</b>
            <ul>
              <li>働く人の姿や言葉</li>
              <li>仕事の流れ、一日の過ごし方、職場の様子</li>
              <li>製品が、どの工程・どの役割の仕事で生まれているか</li>
              <li>学校で学んでいることとのつながり、入社後の成長の道筋</li>
              <li>その仕事が地域や社会の誰の役に立っているか</li>
              <li>職場見学・インターンシップ・会社説明会の案内（時期は次の章）</li>
            </ul>
          </li>
        </ul>

        <div className={styles.compare}>
          <div className={styles.compareNg}>
            <div className={styles.compareHead}>× 掲載できない例</div>
            <ul>
              <li>製品の写真と製品名・性能だけ</li>
              <li>社名・ロゴ・キャッチコピーと、創業年・社員数だけ</li>
              <li>設備やロボットの写真と「最先端の技術」だけ</li>
              <li>見出しが新製品の告知で、働く人が添え物</li>
              <li>通販サイト・購入ページへの誘導</li>
            </ul>
          </div>
          <div className={styles.compareOk}>
            <div className={styles.compareHead}>○ 掲載できる例</div>
            <ul>
              <li>製品の写真が大きくても、職種・仕事の内容と働く人を添えたもの</li>
              <li>働く人の写真や言葉と、職種・仕事の内容</li>
              <li>製品がどの工程・役割でつくられているかの紹介</li>
              <li>「電気科で学ぶシーケンス制御を、入社3年目の社員がラインの保全で使っている」</li>
              <li>見学・インターンの案内に、何の仕事を見るのかを添えたもの</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== 時期のルール ===== */}
      <section id="timing" className={`${styles.card} ${styles.anchor}`}>
        <h2>時期のルール：求人の情報は7月1日から</h2>
        <p>高校生の求人には解禁日があります。採用・求人の情報は、その年度の<b>7月1日から</b>載せられます。</p>
        <div className={styles.timeline}>
          <div className={styles.timelineCol}>
            <div className={styles.timelineHead}>〜6月30日</div>
            <ul>
              <li className={styles.yes}>事業・技術の紹介（仕事・働く人と一緒に）</li>
              <li className={styles.yes}>働く人・職場の様子</li>
              <li className={styles.yes}>会社説明会・職場見学の案内（選考を伴わないもの）</li>
              <li className={styles.yes}>インターンシップの告知</li>
              <li className={styles.no}>「新卒採用中」「募集職種」「初任給」</li>
              <li className={styles.no}>「採用サイトはこちら」など求人ページへの誘導</li>
            </ul>
          </div>
          <div className={`${styles.timelineCol} ${styles.timelineAfter}`}>
            <div className={styles.timelineHead}>7月1日〜</div>
            <ul>
              <li className={styles.yes}>左の内容すべて</li>
              <li className={styles.yes}>募集職種・採用人数</li>
              <li className={styles.yes}>給与・待遇・勤務地</li>
              <li className={styles.yes}>応募方法・選考日程</li>
            </ul>
          </div>
        </div>
        <ul className={styles.ruleList}>
          <li><b>QRコード・URLの飛び先にも同じルールが適用されます。</b>6月30日までは、求人情報が中心のページへ飛ばせません。</li>
          <li><b>応募は学校（進路指導の先生）を通します。</b>画面や飛び先に、生徒が直接応募できるフォームを置かないでください。</li>
          <li>載せる労働条件は、ハローワークの確認を受けた<b>求人票と同じ内容</b>にしてください。</li>
        </ul>
      </section>

      {/* ===== 表現の注意 ===== */}
      <section id="expression" className={`${styles.card} ${styles.anchor}`}>
        <h2>表現で気をつけること</h2>
        <div className={styles.doGrid}>
          <div>
            <h3>数字と事実</h3>
            <ul>
              <li>根拠のない「地域No.1」「業界トップ」は使わない。使うなら調査主体・時点・範囲を画面に</li>
              <li>仕事や働き方を実態以上に良く見せない</li>
              <li>性別・年齢で役割を決めつけない。長時間労働を美化しない</li>
            </ul>
          </div>
          <div>
            <h3>人物と写真</h3>
            <ul>
              <li>働く人は実在の社員で、本人の同意を得る</li>
              <li>モデル・イラスト・生成画像は「写真はイメージです」と表示</li>
              <li>在校生は起用しない</li>
              <li>作業の場面は保護具・安全措置をとった状態で</li>
            </ul>
          </div>
          <div>
            <h3>学校との関係</h3>
            <ul>
              <li>「○○高校の先生も推奨」など、学校が勧めていると受け取れる表現はしない</li>
              <li>校内のお知らせや時間割に見える体裁にしない</li>
              <li>広告主の名称を画面に出す</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== 画面の仕様 ===== */}
      <section id="spec" className={`${styles.card} ${styles.anchor}`}>
        <h2>画面の仕様</h2>
        <table className={styles.table}>
          <tbody>
            <tr><th style={{ width: '120px' }}>形式</th><td>静止画のみ（動画・音声は不可。機器は無音で再生します）</td></tr>
            <tr><th>比率</th><td>縦 9:16</td></tr>
            <tr><th>解像度</th><td>短辺 960px 以上（推奨 1080×1920px）</td></tr>
            <tr><th>表示時間</th><td>1回30秒</td></tr>
            <tr><th>文字の大きさ</th><td>教室の後ろから読めること。目安は主な文言 48px 以上・注記 28px 以上（短辺1080px のとき）</td></tr>
            <tr><th>QRコード</th><td>1辺 180px 以上が目安。実機で読み取れるか当社が確認します</td></tr>
            <tr><th>点滅</th><td>1秒に3回を超える点滅・明るさの急な変化は不可</td></tr>
          </tbody>
        </table>
        <p className={styles.small}>数値は目安です。画面の大きさや教室の広さが学校ごとに違うため、可否は入稿時に当社が実機で確認します。詳しい入稿方法は<Link href="/for-advertisers/guide/submit">入稿ガイド</Link>へ。</p>
      </section>

      {/* ===== 審査の流れ ===== */}
      <section id="review" className={`${styles.card} ${styles.anchor}`}>
        <h2>審査の流れ</h2>
        <ol className={styles.steps}>
          <li><b>入稿</b><span>広告主さま</span></li>
          <li><b>基準の確認</b><span>当社・3営業日以内</span></li>
          <li><b>学校へ承認依頼</b><span>当社</span></li>
          <li><b>学校の回答</b><span>5営業日以内</span></li>
          <li><b>掲載開始</b></li>
        </ol>
        <ul className={styles.ruleList}>
          <li>掲載の可否は<b>3段階</b>で決まります。① この基準（全校共通）② 学校ごとの上乗せ基準 ③ 学校による広告ごとの承認。同じ広告が、学校によって掲載・不掲載に分かれることがあります。</li>
          <li>基準に合わない点があれば、<b>どの項目かを示してお戻しします。</b>直して再入稿できます。</li>
          <li>学校の判断で掲載されなかった期間の料金は、<b>日割りで発生しません。</b></li>
        </ul>
      </section>

      {/* ===== 原稿の作り方 ===== */}
      <section id="make" className={`${styles.card} ${styles.anchor}`}>
        <h2>原稿の作り方</h2>
        <p>
          迷ったら、この<b>4つのまとまり</b>で作ってください。進路指導の先生に監修いただいた構成で、上の基準を満たしやすくなっています。
        </p>
        <div className={styles.makeRow}>
          <ol className={styles.blockList}>
            <li><span>ヘッダー</span>会社名・業種・勤務地</li>
            <li><span>キャッチコピー</span>この学校の生徒に向けた一行</li>
            <li><span>01 どんな会社？</span>会社の特徴を一行＋短い本文で</li>
            <li><span>02 どんな仕事をするの？</span>職種名と、何をするか・身につく技術</li>
            <li><span>03 どんな高校生が向いている？</span>成績や面接以外の「向いている人」</li>
            <li><span>会社DATA</span>設立年・社員数など、客観的な数字</li>
          </ol>
          <figure className={styles.sampleFigure}>
            <Image
              src="/guide/template-sample.png"
              alt="4つのまとまりで作った原稿の見本（架空の会社）"
              width={240}
              height={427}
              sizes="240px"
              className={styles.sampleImg}
            />
            <figcaption>見本（架空の会社）。待遇の数字（有給休暇取得率・手当）は7月1日以降、求人票と同じ内容で載せられます。</figcaption>
          </figure>
        </div>

        <h3>写真は「仕事の中身が分かる、明るい一枚」</h3>
        <ul>
          <li>作業中の手元や横顔を、明るく撮る</li>
          <li>保護具は規定どおり。一つでも不備があると掲載できません</li>
          <li>被写体を左右どちらかに寄せ、文字を載せる余白を空ける</li>
        </ul>
        <p className={styles.small}>OK例とNG例は<Link href="/for-advertisers/guide/photo">写真の撮り方ガイド</Link>にまとめています。</p>

        <h3>原稿の状態に合わせて進めてください</h3>
        <div className={styles.branchGrid}>
          {BRANCHES.map((b) => (
            <Link key={b.href} href={b.href} className={styles.branchCard}>
              <span className={styles.branchLabel}>{b.label}</span>
              <div className={styles.branchTitle}>{b.title}</div>
              <div className={styles.branchDesc}>{b.desc}</div>
              <div className={styles.branchArrow}>続きを読む →</div>
            </Link>
          ))}
        </div>
        <p className={styles.small}>
          素材をお持ちでない場合は、当社が原稿とレイアウトを作成します（写真は現場での撮影が必要です）。業種が製造業以外の場合や、複数の枠を出したい場合は<Link href="/for-advertisers/guide/extras">こんなときは</Link>をご覧ください。
        </p>
      </section>

      {/* ===== 料金・申込 ===== */}
      <section className={`${styles.card} ${styles.priceCard}`}>
        <h2>料金・空き枠・開始まで</h2>
        <ul className={styles.ruleList}>
          <li>空き枠と料金は<a href={PORTAL_APPLY_URL} target="_blank" rel="noopener">申込ページ</a>で学校ごとにその場で確認できます。学科を絞った配信や複数校は個別にお見積もりします。</li>
          <li>お申込みは随時。入稿・審査が済んでから、最短2週間で掲載を始めます。</li>
          <li>入稿の期限は相談できます。</li>
        </ul>
      </section>

      {/* ===== なぜこのルールか ===== */}
      <details className={styles.why}>
        <summary>なぜ、このルールなのか</summary>
        <p>
          広告は、生徒が毎日過ごす教室に流れます。先生方が「これなら生徒に見せられる」と思える広告であることが、この仕組みの前提です。岐南工業高校の進路指導の先生からは「お金の匂いを徹底的に消すこと」と言われました。
        </p>
        <p>
          そのため、商品を売る広告ではなく、仕事と働く人を紹介する広告だけを載せます。「聞いていた話と違う」で辞めてしまう若手を減らすことが、企業・生徒・先生の三者にとっての得になると考えています。
        </p>
        <span className={styles.signature}>キミテラス事業 / 株式会社Rebounder</span>
      </details>

      <CtaBlock />

      <ContactBox />
    </GuideShell>
  );
}
