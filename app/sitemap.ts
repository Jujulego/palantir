import { baseUrl } from '@/lib/utils/url';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl(),
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl()}/server/me`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    }
  ];
}
