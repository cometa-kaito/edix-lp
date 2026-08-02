import type {
  FaqItem,
  TeamMember,
  FlowStep,
  NavLink,
  PartnerCompany,
} from './types';

// ===== Navigation =====
export const NAV_LINKS: NavLink[] = [
  { href: '/#features', label: '特徴' },
  { href: '/for-schools', label: '学校の方' },
  { href: '/for-advertisers', label: '広告出稿', highlight: true },
  { href: '/for-advertisers/guide', label: '出稿ガイド' },
  { href: '/about', label: '実績' },
];

// ===== Team =====
export const TEAM_MEMBERS: TeamMember[] = [
  { name: '奥村 魁斗', initial: 'O', role: '岐阜高専 5年\n代表取締役' },
  { name: '岐南工業高校 3年', initial: 'K', role: 'プロジェクトメンバー' },
  { name: '岐南工業高校 3年', initial: 'K', role: 'プロジェクトメンバー' },
];

// ===== FAQ =====
// カテゴリは表示順を維持。同じカテゴリ・同じtargetの項目は連続させる。
export const FAQ_ITEMS: FaqItem[] = [
  // ===== 学校向け =====
  {
    category: '導入・費用',
    target: 'school',
    question: '費用は本当にかかりませんか？',
    answer: '機材（モニター・スタンド）は広告収益モデルにより無償提供いたします。学校側のご負担は電気代と通信費のみです。',
  },
  {
    category: '運用・教育環境',
    target: 'school',
    question: '広告の内容は選べますか？',
    answer: '全ての広告は事前審査を行います。学校側に拒否権がありますので、教育環境にふさわしくない広告は掲載されません。',
  },
  {
    category: '運用・教育環境',
    target: 'school',
    question: '授業の邪魔になりませんか？',
    answer: '授業中は校内連絡を優先表示し、音声は原則OFFです。学習環境を第一に運用します。',
  },
  {
    category: '運用・教育環境',
    target: 'school',
    question: 'Google ClassroomやClassiと何が違いますか？',
    answer: 'Google Classroom等は生徒がアプリを開く必要がある「Pull型」ですが、キミテラスは教室に常設されたモニターで登校するだけで全員の目に届く「Push型」です。既存システムの「補完」として、見落とし防止のインフラとして機能します。',
  },
  {
    category: '運用・教育環境',
    target: 'school',
    question: 'モニターが故障・破損した場合は？',
    answer: '故障・破損時の交換費用はキミテラス側が全額負担します。スマートテレビでの運用のため、2週間以内に代替機を手配します。',
  },

  // ===== 広告主企業向け =====
  {
    category: '効果・成果について',
    target: 'biz',
    question: '効果が出なかった場合、返金はありますか？',
    answer: '本サービスは効果保証はありません。ただし表示回数と人感検知回数（時間帯別）は必ず数字で出ます。「効かなかった」結果も含めてファクトをご提供します。',
  },
  {
    category: '効果・成果について',
    target: 'biz',
    question: '何が数字で分かりますか？',
    answer: '表示回数と人感検知回数（時間帯別）を月次レポートでご報告します。採用や認知の成果そのものを当社が判定することはせず、事実として出る数字をそのままお渡しします。',
  },
  {
    category: '効果・成果について',
    target: 'biz',
    question: '結果はいつ・どんな形で報告されますか？',
    answer: '月次レポートでお届けします。最終レポートは配信終了から2週間以内にご提示します。',
  },
  {
    category: '効果・成果について',
    target: 'biz',
    question: '他の採用媒体と比べて何が違いますか？',
    answer: 'Indeed等の待ち型媒体と異なり、教室の毎日に届く能動配信。合説と異なり継続的な接触。紙媒体と異なり表示回数・人感検知回数を数字で確認できる点が違いです。',
  },
  {
    category: '個人情報・倫理について',
    target: 'biz',
    question: '個人情報・プライバシーはどう扱われますか？',
    answer: '来場検知には人感センサー（PIR方式）を使用し、検知するのは「動き」のイベントのみで、カメラは一切使用しません。生徒個人を特定するデータは取得しません。学校との合意も取得済みです。',
  },
  {
    category: '個人情報・倫理について',
    target: 'biz',
    question: '校内で広告ビジネスを行うのは倫理的にどうですか？',
    answer: '学校DX（時間割変更・呼出など重要連絡の配信）と同居する設計です。掲載内容は採用情報・企業の認知拡大・職業観育成の3つの目的に絞っており、生徒のキャリア形成に資する情報接点と位置づけています。',
  },
  {
    category: '広告クリエイティブについて',
    target: 'biz',
    question: '広告画像は誰が作るのでしょうか？',
    answer: '既存のチラシ・採用パンフレットを縦長にトリミングしていただく形で結構です。制作サポートが必要な場合は岐阜文芸社と連携しており、お申込時にご希望をお知らせください（無償でお取次ぎ）。',
  },
  {
    category: '広告クリエイティブについて',
    target: 'biz',
    question: '動画広告は使えますか？',
    answer: '画像のみ・縦長（9:16）・30秒固定でお願いしています。教室での視認性と配信の安定性、および1スロット30秒という枠設計を維持するため、今後も動画は対応せず、画像運用を継続する方針です。',
  },
  {
    category: '申込・運用について',
    target: 'biz',
    question: '掲載枠の選定基準は？',
    answer: '申込書到着順を基本としつつ、業種ミックス（製造／建設／インフラ）の偏りが過度にならないよう調整させていただく場合があります。同業他社の独占枠については個別にご相談ください。',
  },
  {
    category: '申込・運用について',
    target: 'biz',
    question: '申込後にキャンセル・変更はできますか？',
    answer: '申込書段階でのキャンセルは可能です。契約締結後のキャンセルは原則として承れませんが、業績不振等のやむを得ない事情がある場合は個別にご相談ください。',
  },
  {
    category: '申込・運用について',
    target: 'biz',
    question: 'いつ・どのくらい流れますか？',
    answer: '平日の朝から夕方まで、校内連絡と一緒に教室のモニターに表示します。1スロットは30秒です。1周にかかる時間と1日の表示回数は、同じ枠に掲載する社数と枠の種類によって変わるため、お申込みの枠ごとに個別にご案内します。',
  },
  {
    category: '申込・運用について',
    target: 'biz',
    question: '支払いはいつ・どんな方法ですか？',
    answer: '契約締結後にご請求書を発行し、稼働開始月末日までに銀行振込にてお支払いください。',
  },
  {
    category: '継続・今後について',
    target: 'biz',
    question: '配信期間終了後はどうなりますか？',
    answer: '継続をご希望の場合はティア制プランへの移行をご案内します。初期からご参加の企業様には継続割引・優先案内をご用意します。',
  },
  {
    category: '継続・今後について',
    target: 'biz',
    question: '配信で取得したデータの所有権は？',
    answer: '貴社固有のデータ（表示回数・人感検知回数）は貴社にレポートとしてご提供。当社では匿名集計した形でサービス改善・事例公開（個社特定しない形）に利用させていただきます。',
  },
  {
    category: '継続・今後について',
    target: 'biz',
    question: '複数校への展開予定はありますか？',
    answer: '岐阜県内の複数校への拡大を計画しています。初期からご参加の企業様には複数校展開時の優先枠をご案内します。',
  },
  {
    category: '継続・今後について',
    target: 'biz',
    question: '本格運用への移行はどう進みますか？',
    answer: '配信終了前に継続のご提案をお持ちします。継続される場合は希望プラン（スタンダード／プレミアム／エンタープライズ）をお選びいただけます。',
  },
  {
    category: '継続・今後について',
    target: 'biz',
    question: '配信期間中に枠の追加・拡張は可能ですか？',
    answer: '配信期間中の枠追加（2社目以降のお申込み）は空きがある限り可能です。配信本数の増加やクリエイティブ複数バージョン運用は本格運用フェーズで対応します。',
  },

  // ===== 共通 =====
  {
    category: 'お問い合わせ',
    target: 'all',
    question: 'いつから始められますか？',
    answer: '最短2週間程度で配信開始が可能です。まずはお問い合わせフォームからご連絡ください。',
  },
];

// 申込導線は自社ポータル（枠在庫・価格・入稿規格をその場で確認して申込）に統一。
export const PORTAL_APPLY_URL = 'https://kimiteras.rebounder.jp/apply';

// 旧 PRICING_PLANS / AD_SPECS はどこからも描画されていない死にコードだったため削除（2026-07-28）。
// 「広告1ループ5分」「120分/日」は誤り（実仕様＝1スロット30秒 × 掲載社数でループ長は可変）、
// 「岐南工業高校・電子工学科 3クラス」は特定校名。復活させる場合は正しい仕様で作り直すこと。
// 枠の仕様は 1スロット30秒のみが固定。ループ長・1日の表示回数は枠ごとに個別案内する。

// ===== Advertiser Flow =====
export const AD_FLOW_STEPS: FlowStep[] = [
  { num: 1, title: '素材入稿', description: '広告画像をお送りください' },
  { num: 2, title: '審査・掲出設計', description: '内容審査と表示設計' },
  { num: 3, title: '掲出開始', description: '教室のサイネージに表示' },
  { num: 4, title: 'レポート共有', description: '月次で効果レポートを提出' },
];

// ===== Operation Flow =====
export const OPERATION_FLOW: FlowStep[] = [
  { num: 1, title: '情報を入力', description: '管理画面から連絡事項や広告を登録' },
  { num: 2, title: 'クラウドで即時反映', description: 'クラウドで全サイネージにリアルタイム配信' },
  { num: 3, title: 'サイネージ表示', description: '教室のモニターに自動で表示・更新' },
];

// ===== Partners（取引先企業） =====
// 掲載は先方の許諾が取れた企業のみ（許諾なしで追加しない）。
// ロゴ画像は /public/partners/ に置いて logoSrc を設定する。
export const PARTNER_COMPANIES: PartnerCompany[] = [
  {
    name: 'トーカイテック株式会社',
    logoSrc: '/partners/tokaitech.png',
    logoWidth: 262,
    logoHeight: 40,
    url: 'https://www.tokai-tech.net/',
  },
  {
    name: '株式会社シーテック',
    logoSrc: '/partners/ctech.png',
    logoWidth: 86,
    logoHeight: 40,
    url: 'https://www.ctechcorp.co.jp/',
  },
  {
    name: '株式会社ギフ加藤製作所',
    logoSrc: '/partners/kgk.png',
    logoWidth: 181,
    logoHeight: 40,
    url: 'https://www.kgk.jp/',
  },
  {
    name: 'USJC',
    logoSrc: '/partners/usjc.png',
    logoWidth: 199,
    logoHeight: 40,
    url: 'https://www.usjpc.com/',
  },
  // 京三エレコスはロゴ掲載不可・社名テキストのみ可（2026-07-18 先方回答）
  {
    name: '京三エレコス株式会社',
    url: 'https://www.kyosan-elcs.co.jp/',
  },
];

// ===== External URLs =====
export const FORM_ACTION = 'https://formsubmit.co/rebounder@googlegroups.com';
export const COMPANY_URL = 'https://rebounder.jp';
