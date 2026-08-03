import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE.domain}/`,
      lastModified: new Date('2026-08-03'),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
