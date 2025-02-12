import { jsonFetch } from '@/utils/fetch';
import type { IPv4, IPv6 } from 'ipaddr.js';
import type { IpGeolocationFullResult } from './ip-geolocation.dto';

/**
 * Query geolocation of given ip address
 * @param ip
 */
export async function queryIpGeolocationFull(ip: IPv4 | IPv6): Promise<IpGeolocationFullResult | null> {
  // Do not request for "bogon" ips
  if (['private', 'loopback'].includes(ip.range())) {
    return null;
  }

  // Make request
  console.log(`[big-data-cloud] query ip geolocation of ${ip.toNormalizedString()}`);
  const url = new URL('https://api-bdc.net/data/ip-geolocation-full');
  url.searchParams.set('ip', ip.toNormalizedString());
  url.searchParams.set('key', process.env.BIG_DATA_CLOUD_KEY!);

  const res = await jsonFetch<IpGeolocationFullResult>(url, {
    next: {
      revalidate: 86400,
      tags: [`server-${ip.toNormalizedString()}`]
    }
  });
  console.log(`[big-data-cloud] received ip geolocation of ${ip.toNormalizedString()}`);

  return res;
}
