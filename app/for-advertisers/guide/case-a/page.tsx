import type { Metadata } from 'next';
import GuideShell from '@/components/guide/GuideShell';
import ContactBox from '@/components/guide/ContactBox';
import CtaBlock from '@/components/guide/CtaBlock';
import PageNav from '@/components/guide/PageNav';
import styles from '@/styles/sections/guide.module.css';

export const metadata: Metadata = {
  title: 'ケースA：既存原稿あり｜出稿ガイド｜キミテラス',
  description: 'すでに作成済みの広告データをお持ちの企業さま向け。入稿前セルフチェックリストで適合確認できます。',
};

const CRUMBS = [
  { label: 'TOP', href: '/' },
  { label: '広告主の方へ', href: '/for-advertisers' },
  { label: '出稿ガイド', href: '/for-advertisers/guide' },
  { label: 'ケースA：既存原稿あり' },
];

export default function CaseAPage() {
  return (
    <GuideShell
      eyebrow="Case A"
      title="既に広告原稿をお持ちの方"
      lead="自社で作成済みの広告データをお持ちの企業さま向けのページです。お手元のデータがそのまま使えるかを、以下の順で確認します。"
      crumbs={CRUMBS}
    >
      {/* 方向性の前提 */}
      <div className={`${styles.card} ${styles.philosophy}`}>
        <h2>はじめに：方向性は揃えていただく必要があります</h2>
        <p>
          すでに作成済みの広告データをそのままご入稿いただく場合でも、<strong>本サイネージの「企業認知広告」としての方向性に揃えていただく必要があります。</strong>
        </p>
        <p>
          教室サイネージは、生徒たちが毎日過ごす教室で流れます。そのため、いわゆる「広告」「PR」のトーンに寄った原稿は、先生方から「お金の匂いが強い」と判断され、配信できなくなることがあります。岐南工業高校の進路指導の先生からも、こうご指摘いただいています：
        </p>
        <div className={styles.quote}>
          学校の先生は、広告が教室で流れることに違和感を感じる人が多いです。<br />
          <strong>クライアント独自の広告も、方向性だけは同じにしないと「広告感」が出てしまって厳しい</strong>です。
          <span style={{ fontSize: '0.85em', color: 'var(--text-sub)', display: 'block', marginTop: '8px' }}>
            —— 岐南工業高校 進路指導の先生より
          </span>
        </div>
        <p>
          下のチェックリストはその「方向性」を確認するためのものです。すべてにチェックが付けばそのまま入稿いただけます。チェックが落ちる項目があった場合は、部分的な調整、または <a href="/for-advertisers/guide/case-b" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>テンプレートでの作り直し</a> をご検討ください。
        </p>
      </div>

      <div className={styles.card}>
        <h2>入稿前セルフチェックリスト</h2>
        <p>
          本サイネージは <strong>採用広告ではなく企業認知広告</strong> です。高校生求人の特殊なルール（学校経由原則・7月1日解禁）に従い、リクルートを連想させる表現が含まれていないかを中心に確認します。
        </p>

        <ul className={styles.checklist}>
          <li className={styles.group}>A. リクルート系の表現が含まれていないか（最重要）</li>
          <li><strong>「採用」「募集」「応募」「面接」「面談」「説明会」</strong> などの語が一切含まれていない</li>
          <li><strong>「見学」「会社見学」「工場見学」</strong> といった、来社・接触を促す語が含まれていない</li>
          <li><strong>「まずは○○から」「お気軽にお越しください」「お問い合わせは○○まで」</strong> のような、生徒へのアクション誘導が含まれていない</li>
          <li>給与・賞与・休日・福利厚生・残業時間などの <strong>労働条件</strong> が記載されていない（求人票に書く要素はサイネージには載せません）</li>

          <li className={styles.group}>B. 4ブロック構成になっているか（推奨）</li>
          <li>ヘッダーに <strong>会社名・業種・事業エリア</strong> がある</li>
          <li>その学校の生徒に向けた <strong>キャッチコピー</strong> がある</li>
          <li><strong>01 どんな会社？</strong> ／ 02 どんな仕事？ ／ 03 どんな高校生が向いている？ の3ブロックが揃っている</li>
          <li><strong>会社DATA</strong>（設立・社員数・卒業生数など客観的データ）の枠がある</li>

          <li className={styles.group}>C. 内容の方向性</li>
          <li>「やりがい」「アットホーム」「成長できる」など、抽象的で飾った言葉が主役になっていない</li>
          <li>仕事の大変さに触れる場合、<strong>「その先に育つもの」とセット</strong> で書かれている</li>
          <li>万人向けではなく、<strong>特定の生徒</strong>（その学校の生徒）に向けた内容になっている</li>
          <li>「何をする仕事か」が具体的に伝わる（誤解されやすい工程は補足あり）</li>

          <li className={styles.group}>D. ホームページ案内（記載する場合）</li>
          <li>ホームページ内に <strong>高卒求人情報のページが残っていない</strong> ことを確認した</li>
          <li>前年度の求人ページが消し忘れになっていないかチェックした</li>

          <li className={styles.group}>E. 文字量・形式</li>
          <li>原稿の本文の文字数が <strong>200〜300文字</strong> に収まっている（約30秒で読める分量）</li>
          <li>入稿データの形式が指定のものになっている</li>
          <li>商品・サービスの宣伝広告ではなく、求人活動でもなく、<strong>企業認知</strong> を目的とした内容である</li>

          <li className={styles.group}>F. 写真（原則必須）</li>
          <li>作業そのもの（手元・表情・検査の様子など）が写っている</li>
          <li>集合写真・腕組みポーズ・会議室での打ち合わせ風景ではない</li>
          <li>社員の顔・手元・機械が明るく見える</li>
          <li>決められた保護具（ヘルメット・安全メガネ・安全靴・防塵マスク等）が <strong>規定どおり着用</strong> されている</li>
          <li>コピーを入れる余白が画面の左右どちらかに空いている</li>
          <li>背景に工具・段ボール・他の社員などがごちゃごちゃ写り込んでいない</li>
        </ul>
      </div>

      <div className={styles.card}>
        <h2>チェックが付かない項目があった場合</h2>
        <ul>
          <li><strong>Aは入稿の絶対条件</strong> です。リクルート系の語が一つでも残っていると、本サイネージでは配信できません。書き換えをお願いします。</li>
          <li><strong>B（4ブロック構成）</strong> が満たせない場合、ご用意しているテンプレートの利用も検討してください。</li>
          <li><strong>Dのホームページ確認</strong> は、企業の責任で必ず行ってください。求人ページが残った状態での配信は、厚生労働省の指導対象となります。</li>
          <li>写真の修正・撮り直しが必要 → <a href="/for-advertisers/guide/photo" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>写真の撮り方ガイド</a></li>
          <li>書き換えに自信がない → <a href="/for-advertisers/guide/extras#review" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>添削サポート</a></li>
        </ul>
      </div>

      <CtaBlock />

      <ContactBox />

      <PageNav
        prev={{ label: '出稿ガイドトップ', href: '/for-advertisers/guide' }}
        next={{ label: '写真ガイドへ', href: '/for-advertisers/guide/photo' }}
      />
    </GuideShell>
  );
}
