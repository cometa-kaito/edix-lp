import type { MetadataRoute } from 'next';

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://www.school-signage.net';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  }> = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/for-schools', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/for-advertisers', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/for-advertisers/guide', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/for-advertisers/guide/case-a', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/for-advertisers/guide/case-b', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/for-advertisers/guide/case-c', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/for-advertisers/guide/photo', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/for-advertisers/guide/submit', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/tokutei', priority: 0.3, changeFrequency: 'yearly' },
  ];

  return pages.map((p) => ({
    url: `${BASE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
