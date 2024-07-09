import ipaddr from 'ipaddr.js';
import { cache } from 'react';
import 'server-only';

import { IpDataResult } from '@/src/ip-data/types';
import { ipCacheDuration } from '@/src/utils/ip';

// Actions
export const searchIpData = cache(async (ip: string): Promise<IpDataResult> => {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  const parsed = ipaddr.parse(ip);

  const url = new URL(`https://eu-api.ipdata.co/${parsed.toNormalizedString()}`);
  url.searchParams.set('api-key', process.env.IP_DATA_API_KEY!);

  const start = performance.now();
  console.log('loading ip data');
  const res = await fetch(url, {
    next: {
      revalidate: ipCacheDuration(parsed),
      tags: [parsed.toNormalizedString()],
    }
  });
  console.log(`ip data loaded in ${performance.now() - start} ms`);

  return await res.json();
});
