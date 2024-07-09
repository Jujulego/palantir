import ipaddr from 'ipaddr.js';
import { cache } from 'react';
import 'server-only';

import { IpInfoResult } from '@/src/ip-info/types';
import { ipCacheDuration } from '@/src/utils/ip';

// Actions
export const searchIpInfo = cache(async (ip: string): Promise<IpInfoResult> => {
  const parsed = ipaddr.parse(ip);

  const url = new URL(`https://ipinfo.io/${parsed.toNormalizedString()}/json`);
  url.searchParams.set('token', process.env.IP_INFO_TOKEN!);

  const start = performance.now();
  console.log('loading ip info');
  const res = await fetch(url, {
    next: {
      revalidate: ipCacheDuration(parsed),
      tags: [parsed.toNormalizedString()],
    }
  });
  console.log(`ip info loaded in ${performance.now() - start} ms`);

  return await res.json();
});
