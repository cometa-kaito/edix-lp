// ===== Component Variant Types =====
export type HeroVariant = 'home' | 'schools' | 'advertisers' | 'investors';
export type PocBannerVariant = 'full' | 'compact';
export type ResultsVariant = 'full' | 'compact';
export type TeamVariant = 'full' | 'compact';
export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'white';

// ===== Data Types =====
export interface FaqItem {
  question: string;
  answer: string;
  target: 'school' | 'biz' | 'investor' | 'all';
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

export interface MarketData {
  label: string;
  value: string;
  unit: string;
}

export interface RoiRow {
  rate: string;
  mrr: string;
  recovery: string;
  roi: string;
}

export interface NavLink {
  href: string;
  label: string;
  highlight?: boolean;
}
