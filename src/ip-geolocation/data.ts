import ipaddr from 'ipaddr.js';
import { cache } from 'react';
import 'server-only';

import { IpGeolocationResult } from '@/src/ip-geolocation/types';
import { ipCacheDuration } from '@/src/utils/ip';

// Actions
export const searchIpGeolocation = cache(async (ip: string): Promise<IpGeolocationResult> => {
  const parsed = ipaddr.parse(ip);

  const url = new URL('https://api.ipgeolocation.io/ipgeo');
  url.searchParams.set('apiKey', process.env.IP_GEOLOCATION_API_KEY!);
  url.searchParams.set('ip', parsed.toNormalizedString());

  const start = performance.now();
  console.log('loading ip geolocation');
  const res = await fetch(url, {
    next: {
      revalidate: ipCacheDuration(parsed),
      tags: [parsed.toNormalizedString()],
    }
  });
  console.log(`ip geolocation loaded in ${performance.now() - start} ms`);

  return await res.json();
});
