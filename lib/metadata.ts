import type { Metadata } from 'next';

// 本番ドメイン。env 未設定でも必ず絶対URLが解決できるようフォールバックを持つ。
// （`.env.local` の実キーは `BASE_URL`。旧コードは `NEXT_PUBLIC_BASE_URL` を参照していたため常に空だった）
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.BASE_URL ||
  'https://www.school-signage.net';

const OG_IMAGE = {
  url: '/signage-demo.png',
  width: 1251,
  height: 872,
  alt: 'キミテラス 教室設置型デジタルサイネージの表示イメージ',
};

export const siteMetadata: Record<string, Metadata> = {
  home: {
    title: 'キミテラス - 校務DX×広告で学校デジタル化を無料で実現',
    description:
      '教室設置型デジタルサイネージ「キミテラス」。校内連絡のDXと企業広告を両立し、学校は費用負担ゼロで導入できます。DigiTechQuest 2025最優秀賞受賞・岐南工業高校で実証実験中。',
    alternates: { canonical: '/' },
    openGraph: {
      title: 'キミテラス - 校務DX×広告で学校デジタル化を無料で実現',
      description:
        '教室設置型デジタルサイネージが、先生の負担を減らし、生徒に進路情報を届ける。学校は無料で導入可能。',
      url: BASE_URL,
      type: 'website',
      siteName: 'キミテラス',
      locale: 'ja_JP',
      images: [OG_IMAGE],
    },
  },
  advertisers: {
    title: '広告出稿のご案内 - キミテラス 特別価格 3クラス実質3ヶ月（6〜9月）5万円',
    description:
      '工業高校生に教室で直接届くデジタルサイネージ広告。実証実験特別価格は3クラス実質3ヶ月（6〜9月、夏季休業除く）5万円/社・20社限定。カメラ不使用・全広告事前審査で安心。',
    alternates: { canonical: '/for-advertisers' },
    openGraph: {
      title: '広告出稿のご案内 - キミテラス 特別価格 3クラス実質3ヶ月（6〜9月）5万円',
      description:
        '工業高校生に教室で直接届くデジタルサイネージ広告。3クラス実質3ヶ月（6〜9月、夏季休業除く）5万円/社・20社限定。',
      url: `${BASE_URL}/for-advertisers`,
      type: 'website',
      siteName: 'キミテラス',
      locale: 'ja_JP',
      images: [OG_IMAGE],
    },
  },
  schools: {
    title: '学校関係者の方へ - キミテラス 無料で導入できるデジタルサイネージ',
    description:
      '校務DXを費用負担ゼロで実現。教室設置型デジタルサイネージ「キミテラス」は、機材無償提供・先生の業務効率化・カメラ不使用の安全設計を兼ね備えた、持続可能な学校デジタル化ソリューションです。',
    alternates: { canonical: '/for-schools' },
    openGraph: {
      title: '学校関係者の方へ - キミテラス 無料で導入できるデジタルサイネージ',
      description: '校務DXを費用負担ゼロで実現。機材無償提供で先生の負担を軽減します。',
      url: `${BASE_URL}/for-schools`,
      type: 'website',
      siteName: 'キミテラス',
      locale: 'ja_JP',
      images: [OG_IMAGE],
    },
  },
  about: {
    title: 'キミテラスについて - チーム・技術・実績',
    description:
      'キミテラスを運営する株式会社Rebounderのチーム、技術基盤、実証実験の実績をご紹介します。DigiTechQuest 2025最優秀賞受賞。',
    alternates: { canonical: '/about' },
    openGraph: {
      title: 'キミテラスについて - チーム・技術・実績',
      description:
        '株式会社Rebounderのチーム・技術基盤・実証実験の実績。DigiTechQuest 2025最優秀賞受賞。',
      url: `${BASE_URL}/about`,
      type: 'website',
      siteName: 'キミテラス',
      locale: 'ja_JP',
      images: [OG_IMAGE],
    },
  },
  faq: {
    title: 'よくあるご質問 - キミテラス',
    description:
      'キミテラスに関するよくあるご質問。学校関係者・広告主向けの費用・運用・安全性・効果測定についてのFAQを掲載しています。',
    alternates: { canonical: '/faq' },
    openGraph: {
      title: 'よくあるご質問 - キミテラス',
      description: '学校関係者・広告主向けの費用・運用・安全性・効果測定に関するFAQ。',
      url: `${BASE_URL}/faq`,
      type: 'website',
      siteName: 'キミテラス',
      locale: 'ja_JP',
      images: [OG_IMAGE],
    },
  },
  contact: {
    title: 'お問い合わせ - キミテラス',
    description:
      'キミテラスへのお問い合わせ。学校導入のご相談、広告出稿のお申し込みはこちらから。最短2週間程度で配信開始が可能です。',
    alternates: { canonical: '/contact' },
    openGraph: {
      title: 'お問い合わせ - キミテラス',
      description: '学校導入のご相談・広告出稿のお申し込みはこちらから。',
      url: `${BASE_URL}/contact`,
      type: 'website',
      siteName: 'キミテラス',
      locale: 'ja_JP',
      images: [OG_IMAGE],
    },
  },
  thanks: {
    title: '送信完了 - キミテラス',
    description:
      'お問い合わせ・お申込みを承りました。担当者より追ってご連絡いたします。',
    robots: { index: false, follow: false },
  },
};
