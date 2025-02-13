import { FetchError, jsonFetch } from '@/utils/fetch';
import type { IPv4, IPv6 } from 'ipaddr.js';
import type { IpDataResult } from './ip-data.dto';

/**
 * Query geolocation of given ip address
 * @param ip
 */
export async function queryIpData(ip: IPv4 | IPv6): Promise<IpDataResult | null> {
  if (['private', 'loopback'].includes(ip.range())) {
    return null;
  }

  // Make request
  console.log(`[ip-data] query ip geolocation of ${ip.toNormalizedString()}`);
  const url = new URL(`https://eu-api.ipdata.co/${ip.toNormalizedString()}`);
  url.searchParams.set('api-key', process.env.IP_DATA_API_KEY!);

  try {
    const res = await jsonFetch<IpDataResult>(url, {
      next: {
        revalidate: 86400,
        tags: [`server-${ip.toNormalizedString()}`]
      }
    });
    console.log(`[ip-data] received ip geolocation of ${ip.toNormalizedString()}`);

    return res;
  } catch (err) {
    if (err instanceof FetchError && err.status === 400) {
      const { message } = JSON.parse(err.content) as { readonly message: string };

      if (message.match(/is a (reserved|private) IP address\.$/)) {
        console.warn(`[ip-data] received ip geolocation of ${ip.toNormalizedString()} (reserved or private)`);
        return null;
      }
    }

    throw err;
  }
}
