import type { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/metadata';

// 公開・インデックス対象の静的ルート（/thanks・/sensors・/api/* は除外）
const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/for-schools', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/for-advertisers', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/for-advertisers/guide', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/for-advertisers/guide/case-a', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/for-advertisers/guide/case-b', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/for-advertisers/guide/case-c', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/for-advertisers/guide/extras', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/for-advertisers/guide/photo', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/for-advertisers/guide/submit', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/tokutei', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
