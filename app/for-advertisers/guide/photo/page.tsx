import type { Metadata } from 'next';
import Image from 'next/image';
import GuideShell from '@/components/guide/GuideShell';
import ContactBox from '@/components/guide/ContactBox';
import CtaBlock from '@/components/guide/CtaBlock';
import PageNav from '@/components/guide/PageNav';
import styles from '@/styles/sections/guide.module.css';

export const metadata: Metadata = {
  title: '写真の撮り方ガイド｜出稿ガイド｜キミテラス',
  description: '教室サイネージ用 求人写真の撮り方ガイド。OK／NGの実例4枚と、安全・余白・明るさなど7つの撮影ポイントを解説。',
};

const CRUMBS = [
  { label: 'TOP', href: '/' },
  { label: '広告主の方へ', href: '/for-advertisers' },
  { label: '出稿ガイド', href: '/for-advertisers/guide' },
  { label: '写真の撮り方ガイド' },
];

export default function PhotoShootPage() {
  return (
    <GuideShell
      eyebrow="Photo Guide"
      title="教室サイネージ用 求人写真の撮り方ガイド"
      lead="教室のサイネージで流す写真は、企業パンフレットとは少し違う視点が必要です。「来年、自分がここで働いているかもしれない」と生徒に思わせる、普段どおりの一枚を狙ってください。"
      crumbs={CRUMBS}
    >
      {/* OK/NGの実例 */}
      <div className={styles.card}>
        <h2>OK／NGの実例</h2>
        <p>同じ職場でも、撮り方一つで伝わり方が大きく変わります。</p>

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
      </div>

      {/* 7つのポイント */}
      <div className={styles.card}>
        <h2>7つの撮影ポイント</h2>

        <h3>1. 仕事の中身が伝わる写真にする</h3>
        <p>
          一番大事なのは、写真を見ただけで「何をする仕事なのか」がわかること。
          <strong>工作機械を操作する手元</strong>、図面に見入る表情、製品を一つひとつ検査している様子など、作業そのものが写っている一枚を狙ってください。
        </p>
        <p>逆に、全員集合写真や腕組みポーズ、きれいな会議室の打ち合わせ風景はNGです。</p>

        <h3>2. 作りこまない、素の表情と現場の空気を</h3>
        <p>カメラ目線の作り笑いより、作業に集中している横顔のほうがずっと伝わります。油汚れ、汗、着慣れた作業着は歓迎。新品の作業着をわざわざ用意したり、現場をきれいに片付けすぎたりする必要はありません。</p>

        <h3>3. 明るく撮る</h3>
        <p>工場の写真は暗く・重く写りがち。照明や窓からの自然光を活かして、社員の顔・手元・機械がちゃんと明るく見えるようにしてください。<strong>暗い写真は生徒を不安にさせます。</strong></p>

        <h3>4. 文字を入れる余白をあける</h3>
        <p>人や機械を画面の <strong>左か右に寄せ</strong>、反対側に壁やぼかした工場内など、何もない空間を大きくあけて撮ってください。被写体が真ん中だとコピーを置く場所がなくなります。</p>

        <h3>5. 安全ルールは完全に守る ★最重要</h3>
        <p>ここは学校側が最も厳しく見るところです。教室で毎日流れる映像なので、生徒指導の先生が必ずチェックします。</p>
        <ul>
          <li>ヘルメットのあご紐</li>
          <li>安全メガネ</li>
          <li>安全靴</li>
          <li>防塵マスク</li>
          <li>その他、その作業で決められた保護具</li>
        </ul>
        <div className={styles.bad}>
          <strong>一つでも不備があると、学校側で配信できなくなります。</strong> 撮影前に現場の責任者に必ず確認してください。
        </div>

        <h3>6. 背景はすっきりと</h3>
        <p>背景に工具・段ボール・他の社員などがごちゃごちゃ写り込まないように。背景をぼかすか、物の少ない場所を選んでください。</p>

        <h3>7. 縦横比とサイズ</h3>
        <ul>
          <li>写真は <strong>横長で撮影</strong> してください（広告の上部に配置するため）。</li>
          <li>アスペクト比は <strong>16:9 や 4:3</strong> など、一般的なカメラ比でOKです。</li>
          <li>スマホで撮る場合も、必ず <strong>横向き</strong> で。</li>
          <li>解像度は <strong>長辺 1500px 以上</strong> を推奨（可能であれば）。</li>
        </ul>

        <div className={styles.note}>
          ※ なお、<strong>サイネージ広告全体（提出物）の入稿仕様</strong>（画像のみ JPEG／PNG・縦長 9:16・推奨 1080×1920px・動画不可）は、職場写真の仕様とは別です。詳しくは <a href="/for-advertisers/guide/submit" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>入稿前最終チェック</a> をご覧ください。
        </div>
      </div>

      {/* 撮影者へ伝えるメッセージ */}
      <div className={styles.card}>
        <h2>撮影をお願いする方へのアドバイス</h2>
        <p>企業へ撮影をお願いする際は、こうお伝えください。</p>
        <div className={styles.quote}>
          「プロのモデルみたいな "いい写真" を撮ろうとしなくて大丈夫です。生徒が見たいのは、
          『来年、自分がここで働いているかもしれない』と思える普段どおりの一枚です。
          いつもの作業風景を、少しだけ明るく撮ってもらえれば十分です」
        </div>
        <p>こう伝えると、企業側も気負わずに済んで、かえって自然でいい素材が集まりやすくなります。</p>
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
