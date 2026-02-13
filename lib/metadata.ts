import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

export const siteMetadata: Record<string, Metadata> = {
  home: {
    title: 'Edix - 校務DX×広告で学校デジタル化を無料で実現',
    description:
      'Edixは教室にデジタルサイネージを設置し、校内連絡のDXと企業広告を両立する持続可能な学校デジタル化プラットフォームです。学校は無料で導入可能。',
    openGraph: {
      title: 'Edix - 校務DX×広告で学校デジタル化を無料で実現',
      description:
        '教室設置型デジタルサイネージが、先生の負担を減らし、生徒に進路情報を届ける。学校は無料で導入可能。',
      type: 'website',
      siteName: 'Edix',
    },
  },
  advertisers: {
    title: '広告出稿のご案内 - Edix PoC特別価格 月額2,500円〜',
    description:
      '高校生に直接リーチできる教室設置型デジタルサイネージ広告。PoC実証実験パートナー特別価格で月額2,500円から。ターゲット精度100%の広告をお試しください。',
    openGraph: {
      title: '広告出稿のご案内 - Edix PoC特別価格 月額2,500円〜',
      description: '高校生に直接リーチできる教室設置型デジタルサイネージ広告。月額2,500円〜。',
    },
  },
  schools: {
    title: '学校関係者の方へ - Edix 無料で導入できるデジタルサイネージ',
    description:
      '校務DXを無料で実現。教室設置型デジタルサイネージEdixは、機材無償提供・業務効率化・安全性を兼ね備えた持続可能な学校デジタル化ソリューションです。',
    openGraph: {
      title: '学校関係者の方へ - Edix 無料で導入できるデジタルサイネージ',
      description: '校務DXを無料で実現。機材無償提供で先生の負担を軽減します。',
    },
  },
  investors: {
    title: '投資家の方へ - Edix 教室DXオーナー制度 ROI 120%',
    description:
      'レベニューシェア型教室DXオーナー制度。10万円/教室の出資で広告売上の60%を分配。教育貢献と収益を両立する社会的投資。',
    openGraph: {
      title: '投資家の方へ - Edix 教室DXオーナー制度 ROI 120%',
      description: 'レベニューシェア型で教育貢献と収益を両立。10万円/教室から。',
    },
  },
  about: {
    title: 'Edixについて - チーム・技術・実績',
    description:
      'Edixを運営する株式会社Rebounderのチーム、技術基盤、実証実験の実績をご紹介します。DigiTechQuest 2026最優秀賞受賞。',
  },
  faq: {
    title: 'よくあるご質問 - Edix',
    description:
      'Edixに関するよくあるご質問。学校関係者・広告主・投資家向けのFAQを掲載しています。',
  },
  contact: {
    title: 'お問い合わせ - Edix',
    description:
      'Edixへのお問い合わせ。学校導入のご相談、広告出稿、投資家向け説明会のお申し込みはこちらから。',
  },
};
