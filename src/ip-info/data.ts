import ipaddr from 'ipaddr.js';
import 'server-only';

import { IpInfoResult } from '@/src/ip-info/types';
import { ipCacheDuration } from '@/src/utils/ip';

// Actions
export async function searchIpInfo(ip: string): Promise<IpInfoResult> {
  const parsed = ipaddr.parse(ip);

  const url = new URL(`https://ipinfo.io/${parsed.toNormalizedString()}/json`);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.IP_INFO_TOKEN}`
    },
    next: {
      revalidate: ipCacheDuration(parsed),
      tags: [parsed.toNormalizedString()],
    }
  });

  return await res.json();
}
