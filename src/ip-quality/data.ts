import ipaddr from 'ipaddr.js';
import { cache } from 'react';
import 'server-only';

import { IpQualityResult } from '@/src/ip-quality/types';
import { ipCacheDuration } from '@/src/utils/ip';

// Actions
export const searchIpQuality = cache(async (ip: string): Promise<IpQualityResult> => {
  const parsed = ipaddr.parse(ip);

  const url = new URL(`https://ipqualityscore.com/api/json/ip/${process.env.IP_QUALITY_API_KEY}/${parsed.toNormalizedString()}`);
  url.searchParams.set('strictness', '1');

  const start = performance.now();
  console.log('loading ip quality');
  const res = await fetch(url, {
    next: {
      revalidate: ipCacheDuration(parsed),
      tags: [parsed.toNormalizedString()],
    }
  });
  console.log(`ip quality loaded in ${performance.now() - start} ms`);

  return await res.json();
});
