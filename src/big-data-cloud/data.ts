import { BigDataCloudResult } from '@/src/big-data-cloud/type';
import { ipCacheDuration } from '@/src/utils/cache';
import 'server-only';

// Actions
export async function searchBigDataCloud(ip: string): Promise<BigDataCloudResult> {
  const url = new URL('https://api.bigdatacloud.net/data/ip-geolocation-full');
  url.searchParams.set('ip', ip);
  url.searchParams.set('localityLanguage', 'fr');
  url.searchParams.set('key', process.env.BIG_DATA_CLOUD_KEY!);

  const res = await fetch(url, {
    next: {
      revalidate: ipCacheDuration(ip),
      tags: [ip],
    }
  });

  return await res.json();
}
