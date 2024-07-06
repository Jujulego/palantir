import ipaddr from 'ipaddr.js';
import 'server-only';

import { IpQualityResult } from '@/src/ip-quality/types';
import { ipCacheDuration } from '@/src/utils/ip';

// Actions
export async function searchIpQuality(ip: string): Promise<IpQualityResult> {
  const parsed = ipaddr.parse(ip);

  const url = new URL(`https://ipqualityscore.com/api/json/ip/${process.env.IP_QUALITY_API_KEY}/${parsed.toNormalizedString()}`);
  url.searchParams.set('strictness', '1');

  const res = await fetch(url, {
    next: {
      revalidate: ipCacheDuration(parsed),
      tags: [parsed.toNormalizedString()],
    }
  });

  return await res.json();
}
