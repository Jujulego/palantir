import ipaddr from 'ipaddr.js';
import 'server-only';

import { BigDataCloudResult } from '@/src/big-data-cloud/types';
import { ipCacheDuration } from '@/src/utils/ip';

// Actions
export async function searchBigDataCloud(ip: string): Promise<BigDataCloudResult> {
  const parsed = ipaddr.parse(ip);

  const url = new URL('https://api.bigdatacloud.net/data/ip-geolocation-full');
  url.searchParams.set('ip', parsed.toNormalizedString());
  url.searchParams.set('localityLanguage', 'fr');
  url.searchParams.set('key', process.env.BIG_DATA_CLOUD_KEY!);

  const res = await fetch(url, {
    next: {
      revalidate: ipCacheDuration(parsed),
      tags: [parsed.toNormalizedString()],
    }
  });

  return await res.json();
}
