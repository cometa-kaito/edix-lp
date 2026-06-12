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
