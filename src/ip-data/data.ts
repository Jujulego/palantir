import ipaddr from 'ipaddr.js';
import 'server-only';

import { IpDataResult } from '@/src/ip-data/type';
import { ipCacheDuration } from '@/src/utils/ip';

// Actions
export async function searchIpData(ip: string): Promise<IpDataResult> {
  const parsed = ipaddr.parse(ip);

  const url = new URL(`https://eu-api.ipdata.co/${parsed.toNormalizedString()}`);
  url.searchParams.set('api-key', process.env.IP_DATA_API_KEY!);

  const res = await fetch(url, {
    next: {
      revalidate: ipCacheDuration(parsed),
      tags: [parsed.toNormalizedString()],
    }
  });

  return await res.json();
}
