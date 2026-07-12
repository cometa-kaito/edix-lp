// ===== Component Variant Types =====
export type HeroVariant = 'home' | 'schools' | 'advertisers';
export type ResultsVariant = 'full' | 'compact';
export type TeamVariant = 'full' | 'compact';
export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'white';

// ===== Data Types =====
export interface FaqItem {
  question: string;
  answer: string;
  target: 'school' | 'biz' | 'investor' | 'all';
  category?: string;
}

export interface TeamMember {
  name: string;
  initial: string;
  role: string;
}

export interface PricingPlan {
  label: string;
  name: string;
  oldPrice?: string;
  price: string;
  unit: string;
  features: string[];
  conditions?: string[];
  recommended?: boolean;
  ctaText: string;
  ctaHref: string;
  ctaVariant: ButtonVariant;
}

export interface SpecItem {
  num: string;
  unit: string;
  label: string;
}

export interface FlowStep {
  num: number;
  title: string;
  description: string;
}


export interface NavLink {
  href: string;
  label: string;
  highlight?: boolean;
}

export interface PartnerCompany {
  name: string;
  /** /public/partners/ 配下のロゴ画像。未指定時は社名テキストで表示 */
  logoSrc?: string;
  logoWidth?: number;
  logoHeight?: number;
  /** 企業サイトURL。指定時はロゴ/社名がリンク（新規タブ）になる */
  url?: string;
}
