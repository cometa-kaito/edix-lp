import type { Metadata } from 'next';
import Link from 'next/link';
import { FileTextIcon } from '@/components/ui/Icon';
import { BOOKING_URL, PORTAL_APPLY_URL, POSTING_STANDARDS_V2_PDF_PATH } from '@/lib/constants';
import styles from '@/styles/sections/standards.module.css';

// 条文の正本は ~/Desktop/学校DX事業/02_契約書類/B.広告主向け書類/広告掲載基準_第2版_20261001.docx。
// このページは体裁だけを整えた写し。文言・数字・区分を変えない（改定は docx → PDF → ここの順で直す）。
// 2026-10-16 docx・確定版HTML・PDF の本文と文字単位で一致を確認済み。

export const metadata: Metadata = {
  title: '広告掲載基準 第2版（全文）｜キミテラス',
  description:
    '教室サイネージ「キミテラス」に掲載する広告の全校共通の基準（第2版・2026年10月1日発効）の全文。掲載カテゴリ早見表（可／要学校承認／不可）、高卒求人ルール、表現・表示の基準、審査の手続。PDFもダウンロードできます。',
  alternates: { canonical: '/for-advertisers/guide/standards' },
};

const TOC = [
  { href: '#art-1', no: '第1項', label: '目的' },
  { href: '#art-2', no: '第2項', label: '判断の三層' },
  { href: '#art-3', no: '第3項', label: '広告の内容' },
  { href: '#art-4', no: '第4項', label: '高卒求人ルール' },
  { href: '#art-5', no: '第5項', label: '掲載しないもの' },
  { href: '#art-6', no: '第6項', label: '学校の承認を要するもの' },
  { href: '#art-7', no: '第7項', label: '表現の基準' },
  { href: '#art-8', no: '第8項', label: '表示の基準' },
  { href: '#art-9', no: '第9項', label: '審査の手続' },
  { href: '#art-10', no: '第10項', label: '本基準の改定' },
  { href: '#art-11', no: '第11項', label: '改定履歴' },
  { href: '#appendix', no: '別表', label: '掲載カテゴリ早見表' },
  { href: '#supplement', no: '附則', label: '' },
];

const CAT_OK = [
  '企業の採用・企業認知（業種を問いません。ただし第3項と、第4項の高卒求人ルールに従います）',
  '大学・短期大学・専門学校・高等専門学校の学生募集およびオープンキャンパスの案内（宗教系の学校法人が設置するものは「要学校承認」）',
  '国・自治体・公的機関のお知らせ、行政イベントの告知',
  '産業団体・商工会議所の催し',
  '警察・消防その他の公務員の採用（第3項を適用）',
  '資格・検定の実施団体による受検案内',
  '交通安全・防災・健康などの公共広報',
  '当社からの本サービスの運用に関する告知、導入校からの告知',
];
const CAT_ASK = [
  'アルバイト求人',
  '美容・容姿に関するサービスの事業者の採用・企業認知',
  '民間主催の地域の催し・職業体験の告知',
  '学習塾・予備校・通信教育の事業者の採用・企業認知',
  '金融機関の企業広告',
  '宗教系の学校法人が設置する大学・専門学校の学生募集',
  '自衛隊の採用（第3項を適用）',
];
const CAT_NG = [
  '違法・公序良俗に反するもの',
  '成人向け・出会い系',
  '公営競技・賭博',
  '酒・たばこ',
  '過度な性的表現・暴力表現',
  '金融商品の勧誘',
  '宗教への勧誘',
  '特定の政党・候補者の支持、特定の政治的主張',
  '不安を煽る表現・射幸心を煽る表現・ダークパターン',
  '学校が推奨していると誤認させるもの',
  '広告と分かりにくい体裁',
  '反社会的勢力・連鎖販売取引等の広告主',
];

function PdfButton({ variant = 'primary' }: { variant?: 'primary' | 'onDark' }) {
  return (
    <a
      href={POSTING_STANDARDS_V2_PDF_PATH}
      download="キミテラス_広告掲載基準_第2版_20261001.pdf"
      className={variant === 'primary' ? styles.btnPrimary : styles.btnOnDark}
    >
      <FileTextIcon size={18} />
      PDFをダウンロード
      <span className={styles.btnMeta}>A4・1.3MB</span>
    </a>
  );
}

export default function PostingStandardsPage() {
  return (
    <>
      {/* ===== 表題（暖色） ===== */}
      <section className={styles.hero}>
        <div className={styles.inner}>
          <nav className={styles.breadcrumb} aria-label="パンくず">
            <Link href="/">TOP</Link>
            <span aria-hidden="true">/</span>
            <Link href="/for-advertisers">広告主の方へ</Link>
            <span aria-hidden="true">/</span>
            <Link href="/for-advertisers/guide">出稿ガイド</Link>
            <span aria-hidden="true">/</span>
            <span className={styles.current}>広告掲載基準（全文）</span>
          </nav>

          <div className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>広告掲載基準 第2版・全文</p>
              <h1 className={styles.title}>キミテラス<br />広告掲載基準</h1>
              <p className={styles.lead}>
                教室のサイネージに載せる広告の、全校共通のルールです。どの広告を載せられるかは、まず下の<a href="#appendix">掲載カテゴリ早見表</a>でご確認ください。要点だけを読むなら<Link href="/for-advertisers/guide">出稿ガイド</Link>（3分）へ。
              </p>
              <div className={styles.heroActions}>
                <PdfButton />
                <Link href="/for-advertisers/guide" className={styles.btnGhost}>
                  要点を読む（出稿ガイド）→
                </Link>
              </div>
            </div>

            <dl className={styles.stamp} aria-label="版と日付" data-standards>
              <div className={styles.stampMain}>
                <dt>発効</dt>
                <dd><span className={styles.stampDate}>2026.10.1</span></dd>
              </div>
              <div className={styles.stampRows}>
                <div><dt>版</dt><dd>第2版</dd></div>
                <div><dt>制定</dt><dd>2026年6月24日</dd></div>
                <div><dt>改定</dt><dd>2026年10月1日（第2版）</dd></div>
                <div><dt>定める者</dt><dd>株式会社Rebounder</dd></div>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ===== 別表 早見表（淡い青） ===== */}
      <section id="appendix" className={`${styles.band} ${styles.anchor}`}>
        <div className={styles.inner}>
          <div data-standards>
            <p className={styles.kicker}>別表</p>
            <h2 className={styles.bandTitle}>掲載カテゴリ早見表</h2>
            <p className={styles.bandLead}>
              学校との契約時、および広告主へのご案内時に提示する一覧です。どの区分でも、企業・事業者の広告は第3項（製品・サービスだけの紹介は不可。仕事と働く人を紹介すること）を満たす必要があります。
            </p>

            <div className={styles.verdicts}>
              <div className={`${styles.verdict} ${styles.vOk}`}>
                <div className={styles.vHead}>
                  <span className={styles.vMark} aria-hidden="true">○</span>
                  <div>
                    <div className={styles.vLabel}>可</div>
                    <div className={styles.vSub}>（本基準では制限しない）</div>
                  </div>
                </div>
                <ul>{CAT_OK.map((c) => <li key={c}>{c}</li>)}</ul>
              </div>
              <div className={`${styles.verdict} ${styles.vAsk}`}>
                <div className={styles.vHead}>
                  <span className={styles.vMark} aria-hidden="true">△</span>
                  <div><div className={styles.vLabel}>要学校承認</div></div>
                </div>
                <ul>{CAT_ASK.map((c) => <li key={c}>{c}</li>)}</ul>
              </div>
              <div className={`${styles.verdict} ${styles.vNg}`}>
                <div className={styles.vHead}>
                  <span className={styles.vMark} aria-hidden="true">×</span>
                  <div><div className={styles.vLabel}>不可</div></div>
                </div>
                <ul>{CAT_NG.map((c) => <li key={c}>{c}</li>)}</ul>
              </div>
            </div>

            <div className={styles.bandNotes}>
              <p>（注）商品・サービスの宣伝は、どの区分でも掲載しません。製品・サービスだけを紹介する広告や、購入・入会・受講を勧める広告は、学校の承認があっても掲載できません（第3項(1)(4)）。仕事と働く人の紹介を加えれば掲載できます。</p>
              <p>（注）行政の告知と政治的主張は別のものです。自治体・公的機関のお知らせや選挙啓発（投票を呼びかけるもの）は「可」ですが、特定の政党・候補者に関するものは「不可」です。</p>
              <p>（注）「可」は本基準（第1層）の話です。学校の上乗せ基準（第2層）および個別の承認（第3層）により、掲載されないことがあります。</p>
            </div>
          </div>
          <p className={styles.placeNote}>別表は条文では第11項のあとに置かれています。読みやすさのため、このページでは先頭に掲げました。</p>
        </div>
      </section>

      {/* ===== 条文（白） ===== */}
      <section className={styles.docSection}>
        <div className={`${styles.inner} ${styles.docGrid}`}>
          <nav className={styles.rail} aria-label="条文の目次">
            <p className={styles.railTitle}>目次</p>
            <ol>
              {TOC.map((t) => (
                <li key={t.href}>
                  <a href={t.href}>
                    <span className={styles.railNo}>{t.no}</span>
                    {t.label && <span>{t.label}</span>}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className={styles.doc} data-standards>
            <section id="art-1" className={styles.art}>
              <h2><span className={styles.artNo}>第1項</span>目的</h2>
              <p>本基準は、株式会社Rebounder（以下「当社」）が提供する教育機関向けデジタルサイネージ「キミテラス」（以下「本サービス」）における広告掲載の可否および表現・表示の基準を定めるものです。</p>
              <p>本サービスに掲載する広告は、生徒が地域の企業や仕事、そこで働く人を知り、勤労観・職業観を育む機会となることを目指します。教育基本法第2条第2号が教育の目標に掲げる「職業及び生活との関連を重視し、勤労を重んずる態度を養うこと」、および高等学校学習指導要領が求めるキャリア教育の充実の趣旨に沿うものとし、生徒に商品やサービスを売ることを目的としません。</p>
              <p>視聴者が未成年（主に高校生・高専生）であり、配信場所が教育現場であることに鑑み、生徒の健全な育成を妨げず、導入校の教育方針を尊重することを目的とします。導入校が特定の広告主を推奨するものではありません。</p>
              <p>本基準は、「キミテラス広告掲載規約」第1条に定義され、同規約第7条および第8条が参照する広告掲載基準です。</p>
            </section>

            <section id="art-2" className={styles.art}>
              <h2><span className={styles.artNo}>第2項</span>判断の三層</h2>
              <p>掲載の可否は、次の三層をすべて満たしたときに限り「可」となります。</p>
              <table className={styles.table}>
                <thead><tr><th scope="col">層</th><th scope="col">決める人</th><th scope="col">内容</th></tr></thead>
                <tbody>
                  <tr><td data-label="層"><b>第1層</b></td><td data-label="決める人">当社</td><td data-label="内容">本基準（全校共通） （第3項から第8項）</td></tr>
                  <tr><td data-label="層"><b>第2層</b></td><td data-label="決める人">学校</td><td data-label="内容">学校別の上乗せ基準 （校則・教育方針に基づき学校が独自に定めるもの。当社は学校から受領した上乗せ基準を広告主に開示します）</td></tr>
                  <tr><td data-label="層"><b>第3層</b></td><td data-label="決める人">学校</td><td data-label="内容">個別の広告に対する承認 （第9項の手続）</td></tr>
                </tbody>
              </table>
              <p className={styles.note}>（注）第1層を満たしても、第2層・第3層で不掲載になることがあります。掲載枠が学校ごとに分かれている以上、同じ広告が学校Aでは掲載され学校Bでは掲載されないことが起こり得ます（広告掲載規約 第8条6項）。</p>
            </section>

            <section id="art-3" className={styles.art}>
              <h2><span className={styles.artNo}>第3項</span>広告の内容（仕事と働く人の紹介）</h2>
              <p>企業・事業者の広告は、生徒が仕事と働く人を知る機会となるよう、次の(1)から(5)のすべてに適合することを要件とします。(1)から(5)に適合する広告は、本項の要件を満たすものとして扱います。</p>
              <ol className={styles.items}>
                <li><span className={styles.itemNo}>(1)</span><div>製品・商品・サービスのみを紹介する広告は掲載しません。製品や技術を紹介する場合は、それをつくり、支える仕事と働く人を併せて紹介してください。画面の見出し（最も大きい文字）、または主たる写真・図の少なくとも一方は、働く人・仕事の場面・仕事の説明であることとします。</div></li>
                <li><span className={styles.itemNo}>(2)</span><div>何をする仕事かが分かる語句（職種名と、その仕事で何をするか）を、文字で表示してください。「社員」「スタッフ」「技術者」「メンバー」等の総称、社名・ロゴ・従業員数だけの表示は、これに当たりません。</div></li>
                <li><span className={styles.itemNo}>(3)</span><div>(2)に加えて、次のうち少なくとも1つを含めてください。
                  <ul className={styles.dots}>
                    <li>働く人の姿や言葉</li>
                    <li>仕事の流れ、一日の過ごし方、職場の様子</li>
                    <li>製品・技術が、どの工程・どの役割の仕事によって生み出されているか</li>
                    <li>仕事に求められる知識・技能と、学校で学んでいることとのつながり、入社後の成長の道筋</li>
                    <li>その仕事が、地域や社会の誰の・何の役に立っているか</li>
                    <li>職場見学・インターンシップ・会社説明会など、生徒が仕事を直接知る機会の案内（時期は第4項に従います）</li>
                  </ul>
                </div></li>
                <li><span className={styles.itemNo}>(4)</span><div>商品・サービスの販売を目的とする次の表示は掲載しません。価格・割引・キャンペーンの表示、購入・予約・入会・資料請求を呼びかける表示、通信販売・購入申込みのページへの誘導（QRコード・URLの飛び先を含みます）。ただし、職場見学・インターンシップ・会社説明会その他の行事への参加申込み、採用への応募（第4項）、資格・検定の受検申込みの案内は、これに当たりません。</div></li>
                <li><span className={styles.itemNo}>(5)</span><div>働く人を紹介する場合は、次によってください。
                  <ul className={styles.dots}>
                    <li>働く人として示す人物・発言は、実在の従業員のものとし、本人の同意を得ること。モデル・イラスト・生成画像を用いる場合は、その旨（「写真はイメージです」等）を画面上に表示し、実在の社員であるかのように氏名・社名入りの看板や社員証等を合成しないこと</li>
                    <li>在校生を広告に起用しないこと。卒業生の出身校名を表示する場合は、本人の同意を得たうえで、当該学校が広告主を推奨していると誤認させない体裁とすること</li>
                    <li>作業の場面は、法令と社内規程に沿った保護具・安全措置をとった状態であること</li>
                    <li>仕事の内容・働き方を実態以上に良く見せないこと。性別・年齢によって職種や役割を固定的に描く表現、長時間労働や休日の少なさを美化する表現を用いないこと</li>
                  </ul>
                </div></li>
              </ol>

              <div className={styles.pair}>
                <div className={styles.pairNg}>
                  <div className={styles.pairHead}><span aria-hidden="true">×</span>掲載しない例</div>
                  <ul className={styles.dots}>
                    <li>製品の写真と製品名・性能だけで構成したもの</li>
                    <li>社名・ロゴとキャッチコピー、会社の数字（創業年・社員数）だけのもの</li>
                    <li>設備・ロボットの写真と「最先端の技術」だけのもの</li>
                    <li>見出しが新製品の名称・発売の告知で、仕事・働く人が添え物にとどまるもの</li>
                    <li>商品の購入ページ・通販サイトへの誘導</li>
                  </ul>
                </div>
                <div className={styles.pairOk}>
                  <div className={styles.pairHead}><span aria-hidden="true">○</span>掲載できる例</div>
                  <ul className={styles.dots}>
                    <li>製品の写真が大きくても、職種と仕事の内容、働く人の写真・言葉を添えたもの</li>
                    <li>働く人の写真・言葉と、職種・仕事の内容</li>
                    <li>製品がどの工程・役割でつくられているかの紹介</li>
                    <li>「電気科で学ぶシーケンス制御を、入社3年目の社員がこのラインの保全で使っている」のような、学校の学びとのつながり</li>
                    <li>見学・インターンシップの案内に、何の仕事を見る・体験するのかを添えたもの</li>
                  </ul>
                </div>
              </div>

              <p>なお、本項は、次の広告には適用しません。ただし、警察・消防・自衛隊その他の公務員の採用には、企業の採用と同様に本項を適用します。</p>
              <ul className={styles.dots}>
                <li>国・地方公共団体その他の公的機関のお知らせ、行政イベントの告知および公共広報</li>
                <li>大学・短期大学・専門学校・高等専門学校の学生募集（オープンキャンパスの案内を含みます）</li>
                <li>産業団体・商工会議所の催し、資格・検定の実施団体による受検の案内</li>
                <li>当社からの本サービスの運用に関する告知（当社の他の商品・サービスの宣伝を含みません）</li>
                <li>導入校からの告知</li>
              </ul>
              <p className={styles.note}>（注）当社の出稿ガイドが示す標準の構成（「01 どんな会社？」「02 どんな仕事をするの？」「03 どんな高校生が向いている？」）に沿って作成した広告は、本項の要件を満たしやすくなっています。素材をお持ちでない場合は、当社が原稿・レイアウトの作成を承ります（写真は現場での撮影が必要です）。適合するか迷う場合は、入稿前にご相談ください。</p>
            </section>

            <section id="art-4" className={styles.art}>
              <h2><span className={styles.artNo}>第4項</span>高卒求人ルール（時期による制限）</h2>
              <p>企業の採用・求人に関する広告は、第3項に加えて本項に従います（公務員・自衛隊の採用には本項を適用せず、各募集の定めによります）。新規高等学校卒業者の採用選考期日等（高校求人の解禁時期）に従い、高校3年生に向けた採用・求人に関する情報を含む広告は、当該年度の7月1日より前は掲載しません。</p>
              <p>解禁前に掲載できるのは、企業認知（第3項に適合する、事業内容・仕事・働く人・職場の紹介）を目的とする広告に限られます。</p>
              <div className={styles.pair}>
                <div className={styles.pairBefore}>
                  <div className={styles.pairHead}>解禁前（〜6月30日）</div>
                  <ul className={styles.marks}>
                    <li>○ 事業内容・技術の紹介（仕事・働く人と併せて）</li>
                    <li>○ 働く人の紹介、職場の様子</li>
                    <li>○ 会社説明会・職場見学（工場見学を含む）の案内（採用選考を伴わないもの）</li>
                    <li>○ インターンシップの告知</li>
                    <li className={styles.markNg}>× 「新卒採用中」「募集職種」「初任給」</li>
                    <li className={styles.markNg}>× 「採用サイトはこちら」等、求人ページへの直接誘導</li>
                  </ul>
                </div>
                <div className={styles.pairAfter}>
                  <div className={styles.pairHead}>解禁後（7月1日〜）</div>
                  <ul className={styles.marks}>
                    <li>○ 左記すべて</li>
                    <li>○ 募集職種・採用人数</li>
                    <li>○ 給与・待遇・勤務地</li>
                    <li>○ 応募方法・選考日程</li>
                  </ul>
                </div>
              </div>
              <p>この線引きは画面に映る文字と、QRコード・URLの飛び先の両方に適用されます。解禁前は、飛び先ページが求人情報を主たる内容とするものであってはなりません。</p>
              <p>応募は学校を通じて行います。高校生・高専生の採用への応募は、学校（進路指導の担当）を通じて行うことを原則とします。画面およびQRコード・URLの飛び先において、生徒が企業へ直接応募・エントリーする設計（応募フォーム、氏名・連絡先の入力等）としてはなりません（採用への応募に限ります。職場見学・インターンシップへの参加申込みは第7項(6)によります）。高校生向けの求人で掲載する労働条件は、公共職業安定所の確認を受けた求人票の内容と一致させてください。</p>
            </section>

            <section id="art-5" className={styles.art}>
              <h2><span className={styles.artNo}>第5項</span>掲載しないもの（全面不可）</h2>
              <p>次に該当する広告は、いかなる場合も掲載しません。</p>
              <h3>（1）違法・公序良俗</h3>
              <ul className={styles.dots}>
                <li>法令に違反するもの、またはそのおそれがあるもの</li>
                <li>公序良俗に反するもの</li>
                <li>他者の権利を侵害し、または名誉を毀損するもの</li>
              </ul>
              <h3>（2）未成年に不適切な商材</h3>
              <ul className={styles.dots}>
                <li>成人向けコンテンツ（アダルト、出会い系、マッチングアプリ）</li>
                <li>パチンコ、競馬、競艇、競輪その他の公営競技・賭博</li>
                <li>アルコール飲料、たばこ・喫煙具（加熱式・電子たばこを含む）</li>
                <li>過度に性的な表現、過激な暴力表現を含むもの</li>
              </ul>
              <h3>（3）金融（例外は第6項(5)）</h3>
              <ul className={styles.dots}>
                <li>金融商品・金融サービスの勧誘を目的とするもの（消費者金融、カードローン、リボ払い、暗号資産、FX、投資勧誘、保険商品の販売、情報商材）</li>
              </ul>
              <h3>（4）思想・信条</h3>
              <ul className={styles.dots}>
                <li>宗教への勧誘、宗教団体の活動告知（例外は第6項(6)）</li>
                <li>特定の政党・候補者の支持を求めるもの、特定の政治的主張を訴えるもの</li>
              </ul>
              <h3>（5）表現</h3>
              <ul className={styles.dots}>
                <li>「まだ〇〇やってないの？」「太っているとモテない」など、生徒の不安や劣等感を不当に煽るもの</li>
                <li>「絶対に儲かる」「今すぐ申し込まないと損」など、射幸心を過度に刺激するもの</li>
                <li>ダークパターン（意図しない購入・契約・個人情報の提供をさせる設計）を含むもの</li>
                <li>「〇〇高校の先生も推奨」など、学校または教員が公式に推奨していると誤認させるもの（推奨が事実であり、かつ当該学校の書面による許諾がある場合を除く）</li>
                <li>広告であることが分かりにくい体裁（校内のお知らせ・時間割等の校内DX表示を模した体裁）</li>
              </ul>
              <h3>（6）広告主</h3>
              <ul className={styles.dots}>
                <li>反社会的勢力等（広告掲載規約 第21条）に該当する者、またはこれと関係を有する者</li>
                <li>連鎖販売取引（いわゆるマルチ商法）、内職・副業の勧誘を業とする者</li>
                <li>労働関係法令の違反により、行政機関から企業名を公表されている者</li>
              </ul>
            </section>

            <section id="art-6" className={styles.art}>
              <h2><span className={styles.artNo}>第6項</span>学校の承認を要するもの</h2>
              <p>一律には排除しないが、校則や教育方針によって許容度が分かれるため、導入校ごとの事前承認を必須とします（手続は第9項）。</p>
              <p>本項に該当する企業・事業者の広告も、第3項に適合することが前提です（(3)および(6)を除きます。(3)は第3項(4)に従います）。商品・サービスそのものの宣伝、購入・利用・受講の勧誘は、学校の承認があっても掲載しません。</p>
              <table className={`${styles.table} ${styles.tableNum}`}>
                <thead><tr><th scope="col">#</th><th scope="col">対象</th><th scope="col">承認が要る理由</th></tr></thead>
                <tbody>
                  <tr><td data-label="#">(1)</td><td data-label="対象">アルバイト求人（労働基準法の年少者の保護〈深夜業・危険有害業務の制限等〉に適合するもの）</td><td data-label="承認が要る理由">校則でアルバイトを禁止している学校がある</td></tr>
                  <tr><td data-label="#">(2)</td><td data-label="対象">美容・容姿に関するサービス（エステ・脱毛・ダイエット等）の事業者の採用・企業認知</td><td data-label="承認が要る理由">容姿に関する事業は、学校により許容度が異なる</td></tr>
                  <tr><td data-label="#">(3)</td><td data-label="対象">民間が主催する地域の催し・職業体験・ものづくり体験の告知（入場券等の販売を目的とするものを除く）</td><td data-label="承認が要る理由">開催時期・内容による。第3項(1)から(3)は適用しない</td></tr>
                  <tr><td data-label="#">(4)</td><td data-label="対象">学習塾・予備校・通信教育の事業者の採用・企業認知（受講の勧誘を除く）</td><td data-label="承認が要る理由">進学指導の方針に直接触れる</td></tr>
                  <tr><td data-label="#">(5)</td><td data-label="対象">金融機関の企業広告（銀行・信用金庫・信用組合・保険会社・証券会社の、採用または企業認知を目的とするもの）</td><td data-label="承認が要る理由">商品勧誘でなければ地域の主要な就職先。ただし学校の判断を仰ぐ</td></tr>
                  <tr><td data-label="#">(6)</td><td data-label="対象">宗教系の学校法人が設置する大学・専門学校の学生募集</td><td data-label="承認が要る理由">学生募集の情報であって宗教への勧誘を含まないこと。第5項(4)の例外</td></tr>
                  <tr><td data-label="#">(7)</td><td data-label="対象">自衛隊の採用</td><td data-label="承認が要る理由">高卒求人に実在する一方、学校・地域により受け止めが分かれる。警察・消防その他の公務員の採用は本項に含めず、本基準では制限しない</td></tr>
                </tbody>
              </table>
              <p>ゲーム・娯楽、化粧品、医薬品・健康食品などの業種の企業による採用・企業認知の広告は、他の業種と同じく第3項に適合すれば掲載できます。ただし、医薬品等の効能効果を表示することはできません（第7項(3)）。</p>
            </section>

            <section id="art-7" className={styles.art}>
              <h2><span className={styles.artNo}>第7項</span>表現の基準</h2>
              <h3>（1）正確性</h3>
              <ul className={styles.dots}>
                <li>事実に反する表示、根拠のない数値・順位（「地域No.1」「業界トップ」等）を用いないこと。用いる場合は調査主体・時点・範囲を画面上に表示すること。仕事・働き方の紹介にも同様に適用します</li>
                <li>他社との比較を行う場合は、比較の対象と基準を明示すること</li>
              </ul>
              <h3>（2）景品表示法</h3>
              <ul className={styles.dots}>
                <li>優良誤認・有利誤認となる表示を行わないこと</li>
                <li>価格・条件に例外がある場合、例外の存在が読み取れる表示とすること（「※」の内容が読めない大きさは不可）</li>
              </ul>
              <h3>（3）薬機法</h3>
              <ul className={styles.dots}>
                <li>医薬品等について承認範囲を超える効能効果を標榜しないこと</li>
                <li>健康食品について、疾病の治療・予防を目的とする効能を標榜しないこと</li>
              </ul>
              <h3>（4）著作権・肖像権</h3>
              <ul className={styles.dots}>
                <li>使用する文章・画像・映像・音楽・フォントについて、広告主が必要な権利処理を完了していること</li>
                <li>人物が写り込む場合、本人（未成年の場合は保護者を含む）の承諾を得ていること。承諾のない第三者、特に未成年の顔は判別できないようにすること</li>
              </ul>
              <h3>（5）広告主の表示</h3>
              <ul className={styles.dots}>
                <li>広告主の名称を画面上に表示すること。広告主と出稿代理者が異なる場合は、広告主の名称を表示すること</li>
              </ul>
              <h3>（6）個人情報</h3>
              <ul className={styles.dots}>
                <li>QRコード・URLの飛び先で生徒の個人情報を取得する場合は、利用目的と問い合わせ先を入力画面に表示し、取得する項目を目的に必要な最小限とすること</li>
                <li>取得した情報を本人の同意なく第三者に提供しないこと。学校を通さずに電話・訪問・SNS等で生徒に勧誘を行わないこと</li>
              </ul>
            </section>

            <section id="art-8" className={styles.art}>
              <h2><span className={styles.artNo}>第8項</span>表示の基準</h2>
              <p>教室内の壁面ディスプレイで再生されることを前提とした、形式面の基準です。</p>
              <table className={`${styles.table} ${styles.tableSpec}`}>
                <thead><tr><th scope="col">項目</th><th scope="col">基準</th></tr></thead>
                <tbody>
                  <tr><th scope="row">形式</th><td>静止画のみ（動画・音声は受け付けません）</td></tr>
                  <tr><th scope="row">比率</th><td>縦 9:16（許容差 ±1%）</td></tr>
                  <tr><th scope="row">解像度</th><td>短辺 960px 以上（1080px 以上を推奨）</td></tr>
                  <tr><th scope="row">尺</th><td>1枠 30秒（長尺オプションを契約した枠を除く）</td></tr>
                  <tr><th scope="row">判読性</th><td>教室の後方から判読できること。第3項(2)の語句も同様です。当社が実機で確認し、判読できない場合は差し替えを求めます。<br /><span className={styles.cellSub}>目安（短辺1080px換算）：主要な訴求文言 高さ48px 以上／注記 28px 以上／文字と背景の輝度比 4.5:1 以上</span></td></tr>
                  <tr><th scope="row">QRコード</th><td>実機で読み取れること。当社が実機で確認し、読み取れない場合は差し替えを求めます。目安は1辺 180px 以上（短辺1080px換算）。飛び先（QRコード・URLから最初に表示されるページ）は第3項から第5項および第7項(6)に適合すること</td></tr>
                  <tr><th scope="row">点滅・フラッシュ</th><td>1秒間に3回を超える点滅・輝度の急変を含まないこと。画面の広い面積を占める赤色の点滅を含まないこと（光過敏性発作への配慮）</td></tr>
                </tbody>
              </table>
              <p className={styles.note}>（注）数値は目安であり、可否は実機での確認によります。画面サイズ・設置の高さ・教室の広さが学校ごとに異なるため、画素数だけでは判読性を決められません。入稿時に当社が実機で確認します。</p>
              <p>音声は出ません。機器は無音で再生されるため、音声を前提とした内容は成立しません。</p>
            </section>

            <section id="art-9" className={styles.art}>
              <h2><span className={styles.artNo}>第9項</span>審査の手続</h2>
              <ol className={styles.flow}>
                <li><span className={styles.flowNo}>1</span><div className={styles.flowBody}><div>広告主が入稿します</div></div></li>
                <li><span className={styles.flowNo}>2</span><div className={styles.flowBody}><div>当社が第3項から第8項（第1層）への適合を確認します。適合しない場合は、満たしていない項・号を示して差し戻します（広告掲載規約 第7条2項）</div><div className={styles.flowDue}>入稿受領から3営業日以内</div></div></li>
                <li><span className={styles.flowNo}>3</span><div className={styles.flowBody}><div>当社が学校へ承認を依頼します（第2層・第3層）</div></div></li>
                <li><span className={styles.flowNo}>4</span><div className={styles.flowBody}><div>学校が承認または不承認を回答します</div><div className={styles.flowDue}>依頼から5営業日以内（当社と学校が別途合意した場合は、その期間）</div></div></li>
                <li><span className={styles.flowNo}>5</span><div className={styles.flowBody}><div>掲載を開始します</div></div></li>
              </ol>
              <p>当社は、本基準をすべての広告主に同一の基準で適用します。</p>
              <h3>（1）学校が期限内に回答しない場合</h3>
              <p>当社は学校に対して1回催告します。催告の際、回答が無い場合は不掲載として扱う旨を明記します。催告からさらに3営業日以内に回答がないときは、当該学校における掲載を見送ります（不承認として扱う）。</p>
              <h3>（2）不掲載となった場合の料金</h3>
              <p>不掲載となった期間に対応する掲載料金は、日割計算により発生しません（広告掲載規約 第8条3項ただし書および6項ただし書）。</p>
              <h3>（3）掲載開始後の停止</h3>
              <p>掲載開始後に本基準への抵触が判明した場合、当社は掲載を停止し、事後に理由を通知します（広告掲載規約 第8条2項）。</p>
            </section>

            <section id="art-10" className={styles.art}>
              <h2><span className={styles.artNo}>第10項</span>本基準の改定</h2>
              <ol className={styles.items}>
                <li><span className={styles.itemNo}>1.</span><div>当社は、本基準を改定することができます。</div></li>
                <li><span className={styles.itemNo}>2.</span><div>改定する場合、当社は、改定後の本基準および適用開始日を、適用開始日の30日前までに、電子メールまたは当社ウェブサイトへの掲示により広告主へ通知します（広告掲載規約 第7条4項）。ただし、法令の制定もしくは改廃、監督官庁の指導、または広告枠が設置された学校の求めにより緊急に変更する必要がある場合は、この限りではありません。</div></li>
                <li><span className={styles.itemNo}>3.</span><div>改定により既に掲載されている広告が改定後の基準に適合しなくなった場合であっても、適用開始日から30日間は従前の基準によります（前項ただし書による改定の場合は、当社が指定する合理的な期間）。</div></li>
                <li><span className={styles.itemNo}>4.</span><div>当社の広告掲載の可否判断は、判断の時点における最新の本基準により行います。</div></li>
              </ol>
            </section>

            <section id="art-11" className={styles.art}>
              <h2><span className={styles.artNo}>第11項</span>改定履歴</h2>
              <table className={`${styles.table} ${styles.tableHistory}`}>
                <thead><tr><th scope="col">版</th><th scope="col">発効日</th></tr></thead>
                <tbody>
                  <tr><td>第1版</td><td>2026年6月24日</td></tr>
                  <tr><td>第2版</td><td>2026年10月1日</td></tr>
                </tbody>
              </table>
              <p className={styles.toAppendix}><a href="#appendix">別表 掲載カテゴリ早見表 は、このページの先頭にあります ↑</a></p>
            </section>

            <section id="supplement" className={styles.art}>
              <h2><span className={styles.artNo}>附則</span></h2>
              <p>本基準は、2026年10月1日以降に掲載可否の判断を行う広告に適用します。</p>
              <p className={styles.end}>以上</p>
            </section>
          </article>
        </div>
      </section>

      {/* ===== 次の一歩（夕方の色面） ===== */}
      <section className={styles.next}>
        <div className={`${styles.inner} ${styles.nextGrid}`}>
          <div>
            <h2 className={styles.nextTitle}>掲載をご検討の方へ</h2>
            <p className={styles.nextText}>
              空き枠と料金は、<a href={PORTAL_APPLY_URL} target="_blank" rel="noopener">申込ページ</a>で学校ごとにその場で確認できます。基準に合うか迷う原稿は、入稿前にご相談ください。
            </p>
          </div>
          <div className={styles.nextActions}>
            <PdfButton variant="onDark" />
            <a href={BOOKING_URL} target="_blank" rel="noopener" className={styles.btnOnDarkGhost}>
              オンラインで相談する（30分）→
            </a>
            <Link href="/for-advertisers/guide" className={styles.btnOnDarkGhost}>
              出稿ガイドへ戻る →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
