import type { Metadata, Viewport } from 'next';
import { Noto_Sans_JP, Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingCta from '@/components/layout/FloatingCta';
import ScrollProgress from '@/components/layout/ScrollProgress';
import LoadingScreen from '@/components/layout/LoadingScreen';
import { OrganizationSchema } from '@/components/layout/StructuredData';
import { siteMetadata, BASE_URL } from '@/lib/metadata';
import './globals.css';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-noto',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  ...siteMetadata.home,
  keywords: [
    'デジタルサイネージ',
    '学校DX',
    '校務DX',
    '学校 デジタル化',
    '高校生 広告',
    '採用ブランディング',
    'キミテラス',
    '岐南工業高校',
  ],
  authors: [{ name: '株式会社Rebounder' }],
  robots: { index: true, follow: true },
  twitter: {
    card: 'summary_large_image',
    title: 'キミテラス - 校務DX×広告で学校デジタル化を無料で実現',
    description:
      '教室設置型デジタルサイネージが、先生の負担を減らし、生徒に進路情報を届ける。学校は無料で導入可能。',
    images: ['/signage-demo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} ${inter.variable}`} style={{ fontFamily: 'var(--font-noto), var(--font-inter), sans-serif' }}>
        <LoadingScreen />
        <ScrollProgress />
        <Header />
        {children}
        <Footer />
        <FloatingCta />
        <OrganizationSchema />
      </body>
    </html>
  );
}
