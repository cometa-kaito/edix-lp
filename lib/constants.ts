import type {
  FaqItem,
  TeamMember,
  PricingPlan,
  SpecItem,
  FlowStep,
  MarketData,
  RoiRow,
  NavLink,
} from './types';

// ===== Navigation =====
export const NAV_LINKS: NavLink[] = [
  { href: '/#features', label: '特徴' },
  { href: '/for-schools', label: '学校の方' },
  { href: '/for-advertisers', label: '広告出稿（特別価格）', highlight: true },
  { href: '/for-investors', label: '投資家の方' },
  { href: '/about', label: '実績' },
];

// ===== Team =====
export const TEAM_MEMBERS: TeamMember[] = [
  { name: '奥村 魁斗', initial: 'O', role: '岐阜高専 5年\n代表取締役' },
  { name: '小原 大樹', initial: 'O', role: '岐南工業 3年' },
  { name: '大村 柳雲', initial: 'O', role: '岐南工業 3年' },
];

// ===== FAQ =====
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: '費用は本当にかかりませんか？',
    answer: '機材（モニター・スタンド）は広告収益モデルにより無償提供いたします。学校側のご負担は電気代と通信費のみです。',
    target: 'school',
  },
  {
    question: '広告の内容は選べますか？',
    answer: '全ての広告は事前審査を行います。学校側に拒否権がありますので、教育環境にふさわしくない広告は掲載されません。',
    target: 'school',
  },
  {
    question: '授業の邪魔になりませんか？',
    answer: '授業中は校内連絡を優先表示し、音声は原則OFFです。試験期間中は広告表示を停止するなど、学習環境を第一に運用します。',
    target: 'school',
  },
  {
    question: 'Google ClassroomやClassiと何が違いますか？',
    answer: 'Google Classroom等は生徒がアプリを開く必要がある「Pull型」ですが、Edixは教室に常設されたモニターで登校するだけで全員の目に届く「Push型」です。既存システムの「補完」として、見落とし防止のインフラとして機能します。',
    target: 'school',
  },
  {
    question: '教育委員会の許可は必要ですか？',
    answer: '自治体によって異なりますが、Edixでは導入前の教育委員会への説明資料と運用ガイドラインの提供を無償でサポートします。掲載は進路情報に限定し、学校の拒否権・試験期間の広告停止など教育環境を最優先にした運用ルールを設けています。',
    target: 'school',
  },
  {
    question: '校内ネットワークへの接続は必要ですか？',
    answer: 'LTE回線に対応しているため、校内LANへの接続は不要です。学校のセキュリティポリシーに影響を与えることなく、情報システム担当者の負担もゼロで導入できます。',
    target: 'school',
  },
  {
    question: 'モニターが故障・破損した場合は？',
    answer: '故障・破損時の交換費用はEdix側が全額負担します。Raspberry Piの採用により交換が容易で、48時間以内に代替機を手配します。',
    target: 'school',
  },
  {
    question: '最低出稿期間はありますか？',
    answer: '1ヶ月からご利用いただけます。実証実験特別価格もございますので、まずはお気軽にお試しください。',
    target: 'biz',
  },
  {
    question: 'PoC特別価格はいつまでですか？',
    answer: '先着順のため予告なく終了する場合がございます。ご興味をお持ちの方はお早めにご相談ください。',
    target: 'biz',
  },
  {
    question: '特別価格の条件は？',
    answer: '先着順でのご案内となり、簡単なフィードバック（アンケート）へのご協力が条件です。特別な審査等はありません。',
    target: 'biz',
  },
  {
    question: 'どんな広告が出せますか？',
    answer: '採用情報、オープンキャンパス案内、企業紹介など。ギャンブル・アダルト・美容医療等はNG基準により掲載不可となります。',
    target: 'biz',
  },
  {
    question: '広告効果はどう測定しますか？',
    answer: '月次レポートで表示回数・表示時間を報告します。教室常設のため在校生全員に確実にリーチしており、属性が100%特定済みのため「無駄打ちゼロ」の媒体です。',
    target: 'biz',
  },
  {
    question: '掲載可能校数は今後増えますか？',
    answer: '現在は岐南工業高校（6学科）での実証実験中です。段階的に県内10校へ拡大を計画しており、PoC参加企業にはネットワーク拡大時に優先的にご案内します。',
    target: 'biz',
  },
  {
    question: '元本保証はありますか？',
    answer: '法的に元本保証はできません。広告売上の60%を分配するレベニューシェア型となります。リスク開示を行った上でご契約いただきます。',
    target: 'investor',
  },
  {
    question: '金融商品取引法上の問題はありませんか？',
    answer: '本スキームは匿名組合契約として、第二種金融商品取引業の適用除外要件（500名未満・1人50万円未満）を満たす形で運用します。弁護士監修のもと適法性を確保しています。',
    target: 'investor',
  },
  {
    question: 'なぜROIの上限が120%なのですか？',
    answer: '短期回収・低リスクの応援型投資として設計しています。最長1年で契約終了するためリスク期間が限定的です。設置数の拡大に伴いネットワーク価値が向上するため、将来的なアップサイドは別途ご相談ください。',
    target: 'investor',
  },
  {
    question: 'いつから始められますか？',
    answer: '最短2週間程度で配信開始が可能です。まずはお問い合わせフォームからご連絡ください。',
    target: 'all',
  },
];

// ===== Pricing =====
export const PRICING_PLANS: PricingPlan[] = [
  {
    label: '🔥 実証実験パートナー価格',
    name: 'PoC特別価格',
    oldPrice: '5,000円/月',
    price: '2,500',
    unit: '円/月（税抜）',
    features: [
      '通常価格の50% OFF',
      '1枠あたり24分/日の露出',
      '月間8時間の広告表示',
      '月次レポート付き',
      '掲載審査・運用サポート',
    ],
    conditions: ['先着順', '半額適用', 'フィードバック必須'],
    recommended: true,
    ctaText: '特別価格で申し込む →',
    ctaHref: '/contact?category=企業（広告出稿）',
    ctaVariant: 'accent',
  },
  {
    label: '通常プラン',
    name: 'スタンダードプラン',
    price: '5,000',
    unit: '円/月（税抜）',
    features: [
      '1枠あたり24分/日の露出',
      '月間8時間の広告表示',
      '月次レポート付き',
      '掲載審査・運用サポート',
    ],
    recommended: false,
    ctaText: 'このプランで相談する →',
    ctaHref: '/contact?category=企業（広告出稿）',
    ctaVariant: 'secondary',
  },
];

// ===== Advertiser Specs =====
export const AD_SPECS: SpecItem[] = [
  { num: '120', unit: '分/日', label: '広告表示時間' },
  { num: '5', unit: '枠/クラス', label: '広告枠数' },
  { num: '30', unit: '名/クラス', label: '到達人数' },
  { num: '6', unit: '学科', label: '機械・自動車・電気・電子・建築・土木' },
];

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
  { num: 2, title: 'クラウドで即時反映', description: 'Firebaseで全サイネージにリアルタイム配信' },
  { num: 3, title: 'サイネージ表示', description: '教室のモニターに自動で表示・更新' },
];

// ===== Investor Data =====
export const ROI_DATA: RoiRow[] = [
  { rate: '100%', mrr: '25,000円', recovery: '約4.8ヶ月', roi: '120%' },
  { rate: '60%', mrr: '15,000円', recovery: '約8.0ヶ月', roi: '120%' },
  { rate: '40%', mrr: '10,000円', recovery: '約12.0ヶ月', roi: '120%' },
];

export const MARKET_DATA: MarketData[] = [
  { label: 'TAM（総市場規模）', value: '250', unit: '億円' },
  { label: 'SAM（対象市場）', value: '75', unit: '億円' },
  { label: 'SOM（初期獲得市場）', value: '5.1', unit: '億円' },
];

// ===== Investor Flow =====
export const INVEST_FLOW: FlowStep[] = [
  { num: 1, title: '出資', description: '10万円 / 教室' },
  { num: 2, title: '収益分配', description: '広告売上の60%を分配' },
  { num: 3, title: '契約終了', description: '分配総額12万円到達 or 1年' },
];

// ===== External URLs =====
export const DEMO_URL = 'https://school-signage-2026.firebaseapp.com/';
export const FORM_ACTION = 'https://formsubmit.co/rebounder@googlegroups.com';
export const COMPANY_URL = 'https://rebounder.jp';
