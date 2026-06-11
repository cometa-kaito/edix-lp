import type { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // 運用ダッシュボード・送信完了・APIはインデックス不要
      disallow: ['/api/', '/sensors', '/thanks'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
