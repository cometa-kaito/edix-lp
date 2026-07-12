import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import GuideShell from '@/components/guide/GuideShell';
import ContactBox from '@/components/guide/ContactBox';
import CtaBlock from '@/components/guide/CtaBlock';
import { FileTextIcon } from '@/components/ui/Icon';
import styles from '@/styles/sections/guide.module.css';

export const metadata: Metadata = {
  title: '教室サイネージ 出稿ガイド｜キミテラス',
  description: '工業高校の教室サイネージへ広告を出稿するための作成・入稿ガイド。原稿の書き方、写真の撮り方、入稿チェックリストを案内します。',
};

const CRUMBS = [
  { label: 'TOP', href: '/' },
  { label: '広告主の方へ', href: '/for-advertisers' },
  { label: '出稿ガイド' },
];

const BRANCHES = [
  {
    label: 'ケースA',
    title: '既に広告原稿をお持ちの方',
    desc: '自社で作成済みの広告データを、そのまま入稿したい場合。チェックリストで適合確認します。',
    href: '/for-advertisers/guide/case-a',
  },
  {
    label: 'ケースB',
    title: 'テンプレで作る',
    desc: '一から作るが、決まった型に沿いたい方。ヒアリング → テンプレ流し込み。',
    href: '/for-advertisers/guide/case-b',
  },
  {
    label: 'ケースC',
    title: '自由形式で作る',
    desc: 'デザインも自社で組みたい方。ヒアリング → 自由執筆。',
    href: '/for-advertisers/guide/case-c',
  },
];

export default function GuideTopPage() {
  return (
    <GuideShell
      eyebrow="For Advertisers"
      title="教室サイネージ 出稿ガイド"
      lead="工業高校の教室サイネージへ広告を出稿するための、作成と入稿の手引きです。本サイネージは「採用広告」ではなく「企業認知広告」という独特の方針で運営されています。まずは上から順番にご確認いただき、最後に「あなたの状況を選んでください」のセクションから、ご自身に近いケースへお進みください。"
      crumbs={CRUMBS}
    >
      {/* このガイドにこめた想い */}
      <div className={`${styles.card} ${styles.philosophy}`}>
        <h2>このガイドにこめた想い</h2>
        <p>
          このガイドは、岐南工業高校の進路指導の先生方へのヒアリングを重ねるなかで形にしました。
        </p>
        <p>
          「やりがいに惹かれて入った生徒が、数か月で辞めてしまう」「採用に費用をかけても、続かなければ意味がない」——先生方から何度もうかがった言葉です。人材の流動性が非常に高い今、その負担を一番背負っているのは、求人を出されている <strong>企業のみなさま</strong> です。
        </p>
        <p>
          求人広告の世界では長らく、「広く・きれいに・万人に」が当たり前とされてきました。けれども、その当たり前が入社後の「聞いていた話と違う」を生み、結果として企業も、生徒も、先生も、誰ひとり得をしないループになってしまっています。
        </p>
        <p>
          <strong>キミテラスは、この現状を本気で変えたいと思っています。</strong>
        </p>
        <p>
          万人ではなく、その仕事に本当に合う一人に届く広告を。きれいごとではなく、入ってから後悔させない正直な広告を。そういう広告だけを、生徒が毎日過ごす教室という場で流していきたい。
        </p>
        <p>
          このガイドの一つひとつの基準は、すべてその想いから生まれています。少し書きづらく感じるルールもあるかもしれません。けれども、それは「採用にかけたお金が無駄にならない」「生徒が辞めずに長く働ける職場と出会える」、その2つを同時に実現したい、という願いの裏返しです。
        </p>
        <p>
          誠実な企業認知広告で、企業と工業高校生をきちんと結び直していく——どうか、その挑戦にご一緒いただけたら嬉しく思います。
        </p>
        <span className={styles.signature}>キミテラス事業 / 株式会社 Rebounder</span>
      </div>

      {/* これは採用広告ではなく企業認知広告 */}
      <div className={styles.card}>
        <h2>これは「採用広告」ではなく「企業認知広告」です</h2>
        <p>
          まず最初に、本サイネージで作る広告の <strong>位置づけ</strong> をご理解いただきたく思います。
        </p>
        <p>
          高校生の求人は、職業安定法をはじめとする法令により、<strong>すべて学校を通すこと</strong> が大原則となっています。企業が生徒に直接、応募・見学・面接といったアクションを呼びかけることは、原則できません。さらに、求人活動そのものが <strong>毎年7月1日まで解禁されない</strong> という独特のルールがあります。
        </p>
        <p>
          そのため、本サイネージで掲載するのは、いわゆる「採用広告」ではなく、<strong>会社・仕事・働く人を紹介する「企業認知広告」</strong> です。配信のゴールは、生徒に「この会社、いいな」「ここで働いてみたいな」と思っていただくところまで。実際の応募や見学のアクションは、進路指導の先生を通じて、7月1日以降に行われます。
        </p>

        <h3>三者すべてにメリットのある仕組み</h3>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th style={{ width: '180px' }}>生徒にとって</th>
              <td>地元に「面白そうな会社がある」という気づきが、進路を選ぶ前の早い段階で生まれます。</td>
            </tr>
            <tr>
              <th>企業にとって</th>
              <td>7月の求人解禁時に、生徒や先生の頭の中に「あの会社」として残っている状態を作れます。長い接点が、ミスマッチの少ない採用につながります。</td>
            </tr>
            <tr>
              <th>学校と先生にとって</th>
              <td>生徒との進路相談のなかで「実はこういう会社があるよ」と紹介できる、生きた素材になります。</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 高校生求人の特別なルール */}
      <div className={styles.card}>
        <h2>高校生求人の特別なルール</h2>
        <p>
          一般的な求人広告と比べて、高校生求人には独特の厳しいルールがあります。原稿づくりの前に、必ず以下をご確認ください。
        </p>

        <h3>① 学校経由の原則</h3>
        <p>応募・見学・面談・面接などのアクションは、すべて <strong>学校（進路指導の先生）を通して</strong> 行われます。企業から生徒へ、サイネージ上で直接呼びかけることはできません。</p>

        <h3>② 7月1日の求人解禁</h3>
        <p>毎年 <strong>7月1日</strong> までは、リクルート活動そのものが解禁されません。「採用」「募集」「応募」「面接」「説明会」「会社見学」といった <strong>リクルートを直接連想させる言葉</strong> は、配信期間中（6〜9月）すべてを通じて使用できません。</p>

        <h3>③ 「まずは○○から」型のアクション誘導はNG</h3>
        <p>「まずは工場見学から」「お気軽にお越しください」「お問い合わせは○○まで」など、生徒からのアクションを促す表現は使えません。読み終わったときに生徒が <strong>「いい会社だな、覚えておこう」</strong> と思える、そこまでがゴールです。</p>

        <h3>④ ホームページの案内は可、ただし注意</h3>
        <p>会社ホームページのURL／QRコードを載せること自体は可能です。<strong>ただし、ホームページ内に高卒求人ページが残っている場合、企業もキミテラスも厚生労働省の指導対象となります。</strong> 配信開始前に、貴社サイトに高卒求人情報が露出していないか必ずご確認ください（特に前年度のページが消し忘れになっていないか）。</p>

        <div className={styles.note}>
          条件提示についても、給与・賞与・休日・福利厚生・残業時間など、「求人票に書かれるような条件」はリクルート扱いになるため、本サイネージでは使用しません。会社の魅力・仕事の魅力・求める人物像・客観的な会社データ、で構成してください。
        </div>
      </div>

      {/* 広告感を出さない */}
      <div className={`${styles.card} ${styles.philosophy}`}>
        <h2>「広告感」を出さないということ</h2>
        <p>
          教室サイネージは、学校・先生方の協力なしには成立しません。生徒たちが毎日過ごす教室に映像が流れる以上、
          <strong>先生方が違和感なく「これなら大丈夫」と言える広告であること</strong> が、本サイネージの最重要要件です。
        </p>

        <div className={styles.quote}>
          学校の先生は、広告が教室で流れることに違和感を感じる人が多いです。<br />
          <strong>お金の匂いを徹底的に消すこと</strong> ——これが本モデルで一番大事な要素になります。
          <span style={{ fontSize: '0.85em', color: 'var(--text-sub)', display: 'block', marginTop: '8px' }}>
            —— 岐南工業高校 進路指導の先生より
          </span>
        </div>

        <p>そのために、本サイネージでは以下の3点を徹底します。</p>
        <ol>
          <li><strong>リクルート系の表現を一切載せない</strong>（前項の通り）</li>
          <li><strong>労働条件（給与・休日・残業など）を載せない</strong></li>
          <li><strong>全体のトーン・方向性を、本ガイドの標準形に揃える</strong></li>
        </ol>

        <h3>すでに広告データをお持ちの企業さまへ</h3>
        <p>
          既存の広告原稿（ケースA）をお持ちの場合でも、デザインや表現がいわゆる「広告」「PR」のトーンに寄っていると、教室で流すには <strong>「お金の匂い」が強すぎる</strong> と判断されることがあります。
        </p>
        <p>
          先生方の理解を得るために、<strong>ご用意いただいた原稿の方向性を本ガイドの4ブロック構成に揃えていただくことを、お願いしています。</strong> デザインの仕上げは岐阜文芸社さんと連携して行いますので、文字組み・配色・写真とのバランスといった見え方の部分はご相談いただけます。
        </p>

        <div className={styles.note}>
          この方針が大変なものになりうることは承知しています。けれども、これは <strong>「先生方が違和感なく生徒に紹介できる広告だけが、教室で流れる」</strong> という、本モデルそのものの根幹です。
        </div>
      </div>

      {/* コピーの考え方：魅力訴求 */}
      <div className={styles.card}>
        <h2>コピーの考え方：魅力で振り向かせる</h2>
        <p>
          採用広告のように「残業ほぼなし」「賞与年2回」と <strong>条件を並べる</strong> ことができない以上、勝負どころは <strong>会社・仕事・求める人物像をどう魅力的に描くか</strong> です。
        </p>
        <p>
          特に大事なのが、その学校の生徒に向けた一言です。成績や面接の上手さでは測れない、生徒一人ひとりの「好き」「得意」「コツコツやれること」を、技術や強みに翻訳して見せてあげてください。
        </p>

        <h3>イメージしづらいキャッチコピー</h3>
        <div className={styles.bad}>
          一緒に成長できる仲間を待っています
        </div>
        <p>どんな仕事か、どんな会社か、誰に向けたメッセージなのか、一切伝わりません。</p>

        <h3>振り向かせるキャッチコピー</h3>
        <div className={styles.good}>
          プラモ、ゲーム、スマホいじり、それが将来の才能！
        </div>
        <p>
          「自分のことだ」と思える生徒がはっきりイメージできます。<strong>万人ではなく、一人に向けた一言</strong> が、教室サイネージでは強く効きます。
        </p>

        <h3>大変さに触れる場合のルール</h3>
        <p>仕事の大変さや地道な側面を書くこと自体は問題ありません。ただし、書く場合は <strong>必ず「その先に育つもの」とセット</strong> にしてください。大変さだけが残ると、生徒は不安だけを受け取って広告から離れてしまいます。</p>
        <div className={styles.quote}>
          <strong>「条件」より「魅力」。</strong>「不安」より「将来像」。
        </div>
      </div>

      {/* 4ブロック構成 */}
      <div className={styles.card}>
        <h2>掲載原稿の4ブロック構成</h2>
        <p>本サイネージの原稿は、岐南工業高校の進路指導の先生にご監修いただいた、以下の4ブロック構成で作成します。</p>

        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '40px' }}>No.</th>
              <th style={{ width: '180px' }}>ブロック</th>
              <th>内容</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: 'center' }}>—</td>
              <th>ヘッダー</th>
              <td>会社名 ／ 業種 ／ 事業エリア</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>—</td>
              <th>キャッチコピー</th>
              <td>その学校の生徒に向けた、一行のメッセージ</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>01</td>
              <th>どんな会社？</th>
              <td>会社の独自性・特徴を、1行のコピー＋短い本文で</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>02</td>
              <th>どんな仕事をするの？</th>
              <td>その会社で日々取り組む仕事の魅力・身につく技術を、1行のコピー＋短い本文で</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>03</td>
              <th>どんな高校生が向いている？</th>
              <td>成績・面接スキル以外で「向いている人」を、生徒が自分ごと化できる切り口で</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>—</td>
              <th>会社DATA</th>
              <td>設立年・社員数・平均年齢・工業高校卒業生数など、客観的なデータ</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* サンプル原稿 */}
      <div className={styles.card}>
        <h2>サンプル原稿</h2>
        <p>岐南工業高校の進路指導の先生にご監修いただいたサンプルです。実際のサイネージ画面のイメージは以下のとおりです。</p>

        <div className={styles.sampleVisual}>
          <Image
            src="/guide/template-sample.png"
            alt="サンプル原稿の見本：大垣未来精工株式会社"
            width={360}
            height={640}
            sizes="(max-width: 640px) 80vw, 360px"
            className={styles.sampleImg}
          />
        </div>

        <div className={styles.quote}>
          <strong>大垣未来精工株式会社</strong>　｜　CAREER NAVI　《勤務地》大垣市内

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

      {/* 価格・スケジュール */}
      <div className={`${styles.card} ${styles.priceCard}`}>
        <h2>料金・スケジュール</h2>
        <p>2026年度は、岐南工業高校での3か月配信をご利用いただけます。募集枠には限りがあり、<strong>料金はお問い合わせ</strong>ください。</p>

        <div className={styles.priceGrid}>
          <div className={styles.priceItem}>
            <div className={styles.priceItemLabel}>料金</div>
            <div className={styles.priceItemValue} style={{ fontSize: '0.55em' }}>お問い合わせ</div>
            <div className={styles.priceItemUnit}>3か月総額（税抜）</div>
          </div>
          <div className={styles.priceItem}>
            <div className={styles.priceItemLabel}>配信期間</div>
            <div className={styles.priceItemValue}>3<span style={{ fontSize: '0.6em' }}>か月</span></div>
            <div className={styles.priceItemUnit}>2026/6〜9</div>
          </div>
          <div className={styles.priceItem}>
            <div className={styles.priceItemLabel}>枠数</div>
            <div className={styles.priceItemValue}>20<span style={{ fontSize: '0.6em' }}>社</span></div>
            <div className={styles.priceItemUnit}>募集枠</div>
          </div>
          <div className={styles.priceItem}>
            <div className={styles.priceItemLabel}>配信先</div>
            <div className={styles.priceItemValue}>3<span style={{ fontSize: '0.6em' }}>クラス</span></div>
            <div className={styles.priceItemUnit}>岐南工業 電子工学科</div>
          </div>
        </div>

        <h3>スケジュール</h3>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th style={{ width: '180px' }}>申込期間</th>
              <td>〜 2026年5月18日（月）</td>
            </tr>
            <tr>
              <th>原稿・写真の入稿</th>
              <td>2026年5月25日（月）を目安としています。<br /><strong>入稿期限については柔軟に対応いたしますので、間に合いそうにない場合はお気軽にご相談ください。</strong></td>
            </tr>
            <tr>
              <th>配信開始</th>
              <td>2026年6月1日（月）</td>
            </tr>
            <tr>
              <th>配信終了</th>
              <td>2026年9月30日（水）</td>
            </tr>
          </tbody>
        </table>

        <div className={styles.note}>
          今期の配信終了後の本格運用では、別途ティア制プラン（スタンダード／プレミアム／エンタープライズ）をご用意する予定です。
        </div>
      </div>

      {/* 全体フロー */}
      <div className={styles.card}>
        <h2>全体の流れ</h2>
        <p>出稿は次のような流れになります。原稿の状態によって、途中の進み方が分かれます。</p>

        <div className={styles.branchMap}>
          <div className={`${styles.branchStep} ${styles.entry}`}>① お申込み</div>
          <div className={styles.branchArrowDown}>▼</div>
          <div className={styles.branchStep}>② 出稿目的の確認<br /><span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--text-sub)' }}>求人・企業認知が目的か（商品広告は不可）</span></div>
          <div className={styles.branchArrowDown}>▼</div>
          <div className={styles.branchSplitLabel}>原稿の状態で分かれます</div>
          <div className={styles.branchRow}>
            <div className={styles.branchStep}>ケースA<br /><span style={{ fontSize: '11px', fontWeight: 400 }}>既存原稿あり</span></div>
            <div className={styles.branchStep}>ケースB<br /><span style={{ fontSize: '11px', fontWeight: 400 }}>テンプレで作る</span></div>
            <div className={styles.branchStep}>ケースC<br /><span style={{ fontSize: '11px', fontWeight: 400 }}>自由形式で作る</span></div>
          </div>
          <div className={styles.branchArrowDown}>▼</div>
          <div className={styles.branchStep}>③ 写真のご準備<br /><span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--text-sub)' }}>OK/NGの実例を参考に</span></div>
          <div className={styles.branchArrowDown}>▼</div>
          <div className={styles.branchStep}>④ 入稿前最終チェック</div>
          <div className={styles.branchArrowDown}>▼</div>
          <div className={`${styles.branchStep} ${styles.action}`}>⑤ 入稿・配信開始</div>
        </div>
      </div>

      {/* 分岐 */}
      <div className={styles.card}>
        <h2>あなたの状況を選んでください</h2>
        <p>原稿の状態によって、進める道が分かれます。</p>
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
      </div>

      {/* 写真について */}
      <div className={styles.card}>
        <h2>写真について（原則必須）</h2>
        <p>
          サンプル原稿のとおり、本サイネージは <strong>写真と文章のセット</strong> で成立する作りです。原稿が良くても、写真が「広告感のある集合写真」や「暗くて何の仕事か分からない一枚」だと、教室では効果が出ません。OK／NGの実例で違いをご確認ください。
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
              <Image src="/guide/photo-ng-content.png" alt="NG例：仕事の中身が分からない写真" fill sizes="(max-width: 720px) 50vw, 220px" />
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
              <Image src="/guide/photo-ng-safety.png" alt="NG例：安全ルールが守られていない写真" fill sizes="(max-width: 720px) 50vw, 220px" />
            </div>
            <div className={styles.photoCardReasons}>
              <ul>
                <li>余白がない</li>
                <li>安全ルール不備</li>
                <li>背景が雑然</li>
              </ul>
            </div>
          </div>
          <div className={`${styles.photoCard} ${styles.ng}`}>
            <div className={styles.photoCardLabel}>✕ NG例 ③</div>
            <div className={styles.photoCardImg}>
              <Image src="/guide/photo-ng-bright.png" alt="NG例：暗い写真" fill sizes="(max-width: 720px) 50vw, 220px" />
            </div>
            <div className={styles.photoCardReasons}>
              <ul>
                <li>余白がない</li>
                <li>明るくない</li>
                <li>背景が雑然</li>
              </ul>
            </div>
          </div>
        </div>

        <h3>必ず押さえてほしい3点</h3>
        <ol>
          <li><strong>安全ルールは絶対遵守</strong>（最重要）— 保護具の規定どおり着用。一つでも不備があると配信できません</li>
          <li><strong>コピー用の余白を空ける</strong> — 被写体は画面の左右どちらかに寄せる</li>
          <li><strong>仕事の中身が伝わる、明るい一枚</strong> — 作業中の手元・横顔を、自然光や照明で明るく</li>
        </ol>

        <div className={styles.branchGrid}>
          <Link href="/for-advertisers/guide/photo" className={styles.branchCard}>
            <span className={styles.branchLabel}>詳細ガイド</span>
            <div className={styles.branchTitle}>写真の撮り方ガイド（全7ポイント）</div>
            <div className={styles.branchDesc}>素の表情・明るさ・余白・安全ルール・背景・縦横比など、撮影時の全ポイントを解説。</div>
            <div className={styles.branchArrow}>詳しく見る →</div>
          </Link>
        </div>
      </div>

      {/* 横断ケース */}
      <div className={styles.card}>
        <h2>こんなときは</h2>
        <p>メインの流れに当てはまらないケースは、まとめて <Link href="/for-advertisers/guide/extras" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>こちら</Link> でご案内しています。</p>
        <ul>
          <li>製造業以外の業種（介護・建設・小売など）</li>
          <li>複数職種・複数枠を出したい</li>
          <li>過去出稿の内容を差し替えたい</li>
          <li>原稿の表現にリクルート要素が混ざっていないか不安がある</li>
          <li>自社で書いたが添削してほしい</li>
        </ul>
      </div>

      {/* PDF配布 */}
      <div className={styles.card}>
        <h2>PDF版のダウンロード</h2>
        <p>ガイドのPDF版もご用意しています。社内回覧や印刷してご活用ください。</p>
        <a href="/guide/kimiterrace-guide.pdf" className={styles.pdfDownload} download>
          <FileTextIcon size={18} />PDF版をダウンロード（A4 / 約330KB）
        </a>
      </div>

      <CtaBlock />

      <ContactBox />
    </GuideShell>
  );
}
