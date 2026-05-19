import type { Metadata } from 'next';
import Image from 'next/image';
import GuideShell from '@/components/guide/GuideShell';
import ContactBox from '@/components/guide/ContactBox';
import CtaBlock from '@/components/guide/CtaBlock';
import PageNav from '@/components/guide/PageNav';
import styles from '@/styles/sections/guide.module.css';

export const metadata: Metadata = {
  title: 'ケースC：自由形式で作る｜出稿ガイド｜キミテラス',
  description: 'デザインも自社で組みたい方向け。自由形式の必須要件と書き上がり後のチェックポイントを案内します。',
};

const CRUMBS = [
  { label: 'TOP', href: '/' },
  { label: '広告主の方へ', href: '/for-advertisers' },
  { label: '出稿ガイド', href: '/for-advertisers/guide' },
  { label: 'ケースC：自由形式で作る' },
];

export default function CaseCPage() {
  return (
    <GuideShell
      eyebrow="Case C"
      title="自由形式で作る"
      lead="原稿はこれから作る。テンプレに縛られず、自社で構成・デザインを組みたい方向け。"
      crumbs={CRUMBS}
    >
      <div className={styles.card}>
        <h2>進め方</h2>
        <ol>
          <li>ヒアリングシートに回答（<a href="/for-advertisers/guide/case-b" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>ケースBの4問</a> を参照）</li>
          <li>自由形式で原稿を書く（本文 200〜300字）</li>
          <li><strong>写真をご用意いただく</strong>（OK／NG実例で確認）</li>
          <li>入稿前最終チェック</li>
        </ol>
        <p>
          自由形式は表現の幅が広い分、リクルート系の表現が混ざりやすく、また「飾り言葉に流れる」「文字数が膨らむ」などのリスクも上がります。下の必須要件を必ず満たしてください。
        </p>
      </div>

      <div className={styles.card}>
        <h2>必須要件</h2>
        <ul>
          <li>
            <strong>4ブロック構成</strong>（ヘッダー／キャッチコピー／01どんな会社？／02どんな仕事？／03どんな高校生？／会社DATA）の <strong>意図が読み取れる</strong>形になっている。<br />
            <span style={{ fontSize: '0.9em', color: 'var(--text-sub)' }}>※ デザインは自由形式でOKですが、内容として上記の要素が含まれている必要があります。</span>
          </li>
          <li>
            <strong>リクルート系の語が一切含まれていない</strong>（採用・募集・応募・面接・面談・説明会・見学・会社見学・工場見学・お問い合わせ・「まずは○○から」など）
          </li>
          <li>
            給与・賞与・休日・残業時間など <strong>労働条件</strong> が含まれていない（条件提示はリクルート扱いです）
          </li>
          <li>
            <strong>本文の総文字数 200〜300字</strong>
            <div className={styles.note} style={{ marginTop: 6 }}>
              ヘッダーの会社名や見出し・記号、会社DATAの数字部分は、カウントに含めなくて大丈夫です。あくまで <strong>実際に読まれる本文</strong> が200〜300字に収まる目安です。
            </div>
          </li>
          <li><strong>「何をする仕事か」が具体的に伝わる</strong> こと（誤解されやすい工程は補足あり）</li>
          <li>誰に向けた広告かが伝わる（万人向けは避ける）</li>
          <li>「やりがい」「アットホーム」「成長できる」などの抽象語を主役にしない</li>
          <li>仕事の大変さに触れる場合は、必ず「その先に育つもの」とセットで書く</li>
        </ul>

        <h3>推奨</h3>
        <ul>
          <li>ヒアリングシートのQ2（身につく技術）とQ3（求める高校生像）を、それぞれ独立したブロックとしてしっかり描く</li>
          <li>会社DATAは客観的な数字・事実のみ（設立年・社員数・卒業生数など）。「アットホームな雰囲気」のような主観は載せない</li>
        </ul>
      </div>

      {/* 写真要件（必須） */}
      <div className={styles.card}>
        <h2>写真をご用意ください（原則必須）</h2>
        <p>
          自由形式であっても、4ブロック構成は <strong>写真とのバランスでこそ成立</strong> します。原稿が良くても、写真が「広告感のある集合写真」や「暗くて何の仕事か分からない一枚」だと、教室では効果が出ません。先に <strong>OK／NGの実例</strong> をご確認ください。
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
          <br />さらに詳しい撮影ポイントは <a href="/for-advertisers/guide/photo" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>写真の撮り方ガイド</a> をご覧ください。
        </div>
      </div>

      <div className={styles.card}>
        <h2>書き上がったらチェック</h2>
        <p><a href="/for-advertisers/guide/case-a" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>ケースAのチェックリスト</a> A・B・C項目で、自分の原稿を点検してください。</p>

        <h3>特にチェックが落ちやすいポイント</h3>
        <ul>
          <li>「お気軽にお越しください」「お問い合わせは○○まで」など、生徒へのアクション誘導が残っている → 削除</li>
          <li>「残業ゼロ」「土日休み」などの労働条件が残っている → 削除（求人票で別途）</li>
          <li>本文が300字を超えている → 一番抽象的なブロックから削る</li>
          <li>「やりがい」が残っている → 具体的な仕事内容・身につく技術に置き換える</li>
        </ul>

        <div className={styles.note}>
          判断に迷うときは、<a href="/for-advertisers/guide/extras#review" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>添削サポート</a> へ。
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
