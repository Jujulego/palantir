import ipaddr from 'ipaddr.js';
import { cache } from 'react';
import 'server-only';

import { BigDataCloudResult } from '@/src/big-data-cloud/types';
import { ipCacheDuration } from '@/src/utils/ip';

// Actions
export const searchBigDataCloud = cache(async (ip: string): Promise<BigDataCloudResult> => {
  const parsed = ipaddr.parse(ip);

  const url = new URL('https://api.bigdatacloud.net/data/ip-geolocation-full');
  url.searchParams.set('ip', parsed.toNormalizedString());
  url.searchParams.set('localityLanguage', 'fr');
  url.searchParams.set('key', process.env.BIG_DATA_CLOUD_KEY!);

  const start = performance.now();
  console.log('loading big data cloud');
  const res = await fetch(url, {
    next: {
      revalidate: ipCacheDuration(parsed),
      tags: [parsed.toNormalizedString()],
    }
  });
  console.log(`big data cloud loaded in ${performance.now() - start} ms`);

  return await res.json();
});
