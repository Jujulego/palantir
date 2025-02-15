import { FetchError, jsonFetch } from '@/lib/utils/fetch';
import type { IPv4, IPv6 } from 'ipaddr.js';
import type { IpGeolocationResult } from './ip-geolocation.dto';

/**
 * Query geolocation of given ip address
 * @param ip
 */
export async function queryIpGeolocation(ip: IPv4 | IPv6): Promise<IpGeolocationResult | null> {
  if (['private', 'loopback'].includes(ip.range())) {
    return null;
  }

  // Make request
  console.log(`[ip-geolocation] query ip geolocation of ${ip.toNormalizedString()}`);
  const url = new URL('https://api.ipgeolocation.io/ipgeo');
  url.searchParams.set('apiKey', process.env.IP_GEOLOCATION_API_KEY!);
  url.searchParams.set('ip', ip.toNormalizedString());

  try {
    const res = await jsonFetch<IpGeolocationResult>(url, {
      next: {
        revalidate: 86400,
        tags: [`server-${ip.toNormalizedString()}`]
      }
    });
    console.log(`[ip-geolocation] received ip geolocation of ${ip.toNormalizedString()}`);

    return res;
  } catch (err) {
    if (err instanceof FetchError && err.status === 423) {
      console.log(`[ip-geolocation] received ip geolocation of ${ip.toNormalizedString()} (bogon)`);
      return null;
    }

    throw err;
  }
}
