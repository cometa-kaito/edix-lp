import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '広告主向け 出稿ガイド | キミテラス',
  description:
    '工業高校の教室サイネージへ広告を出稿するための作成・入稿ガイド。原稿の書き方、写真の撮り方、入稿チェックリストを案内します。',
};

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
