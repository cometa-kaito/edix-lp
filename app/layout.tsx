import type { Metadata, Viewport } from 'next';
import { Noto_Sans_JP, Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingCta from '@/components/layout/FloatingCta';
import ScrollProgress from '@/components/layout/ScrollProgress';
import LoadingScreen from '@/components/layout/LoadingScreen';
import { OrganizationSchema } from '@/components/layout/StructuredData';
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
