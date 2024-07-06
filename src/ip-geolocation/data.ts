import ipaddr from 'ipaddr.js';
import 'server-only';

import { IpGeolocationResult } from '@/src/ip-geolocation/types';
import { ipCacheDuration } from '@/src/utils/ip';

// Actions
export async function searchIpGeolocation(ip: string): Promise<IpGeolocationResult> {
  const parsed = ipaddr.parse(ip);

  const url = new URL('https://api.ipgeolocation.io/ipgeo');
  url.searchParams.set('apiKey', process.env.IP_GEOLOCATION_API_KEY!);
  url.searchParams.set('ip', parsed.toNormalizedString());

  const res = await fetch(url, {
    next: {
      revalidate: ipCacheDuration(parsed),
      tags: [parsed.toNormalizedString()],
    }
  });

  return await res.json();
}
