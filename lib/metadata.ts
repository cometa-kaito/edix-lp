import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

export const siteMetadata: Record<string, Metadata> = {
  home: {
    title: 'キミテラス - 校務DX×広告で学校デジタル化を無料で実現',
    description:
      'キミテラスは教室にデジタルサイネージを設置し、校内連絡のDXと企業広告を両立する持続可能な学校デジタル化プラットフォームです。学校は無料で導入可能。',
    openGraph: {
      title: 'キミテラス - 校務DX×広告で学校デジタル化を無料で実現',
      description:
        '教室設置型デジタルサイネージが、先生の負担を減らし、生徒に進路情報を届ける。学校は無料で導入可能。',
      type: 'website',
      siteName: 'キミテラス',
    },
  },
  advertisers: {
    title: '広告出稿のご案内 - キミテラス 工業高校の教室に届くデジタルサイネージ広告',
    description:
      '高校生に直接リーチできる教室設置型デジタルサイネージ広告。岐南工業高校・電子工学科の3クラスで運用中。ターゲット精度100%・カメラ不使用・全広告事前審査。料金はお問い合わせください。',
    openGraph: {
      title: '広告出稿のご案内 - キミテラス 工業高校の教室に届くデジタルサイネージ広告',
      description: '高校生に直接リーチできる教室設置型デジタルサイネージ広告。岐南工業高校・電子工学科の3クラスで運用中。',
    },
  },
  schools: {
    title: '学校関係者の方へ - キミテラス 無料で導入できるデジタルサイネージ',
    description:
      '校務DXを無料で実現。教室設置型デジタルサイネージキミテラスは、機材無償提供・業務効率化・安全性を兼ね備えた持続可能な学校デジタル化ソリューションです。',
    openGraph: {
      title: '学校関係者の方へ - キミテラス 無料で導入できるデジタルサイネージ',
      description: '校務DXを無料で実現。機材無償提供で先生の負担を軽減します。',
    },
  },
  about: {
    title: 'キミテラスについて - チーム・技術・実績',
    description:
      'キミテラスを運営する株式会社Rebounderのチーム、技術基盤、導入の実績をご紹介します。DigiTechQuest 2025最優秀賞受賞。',
  },
  faq: {
    title: 'よくあるご質問 - キミテラス',
    description:
      'キミテラスに関するよくあるご質問。学校関係者・広告主・投資家向けのFAQを掲載しています。',
  },
  contact: {
    title: 'お問い合わせ - キミテラス',
    description:
      'キミテラスへのお問い合わせ。学校導入のご相談、広告出稿、投資家向け説明会のお申し込みはこちらから。',
  },
  thanks: {
    title: '送信完了 - キミテラス',
    description:
      'お問い合わせ・お申込みを承りました。担当者より追ってご連絡いたします。',
    robots: { index: false, follow: false },
  },
};
