import type { IpInfoResult } from '@/lib/server/ip-info/ip-info.dto';
import { jsonFetch } from '@/lib/utils/fetch';
import type { IPv4, IPv6 } from 'ipaddr.js';

/**
 * Query metadata of given ip address
 * @param ip
 */
export async function queryIpInfo(ip: IPv4 | IPv6): Promise<IpInfoResult | null> {
  if (['private', 'loopback'].includes(ip.range())) {
    return null;
  }

  // Make request
  console.log(`[ip-info] query ip metadata of ${ip.toNormalizedString()}`);
  const url = new URL(`https://ipinfo.io/${ip.toNormalizedString()}/json`);
  const res = await jsonFetch<IpInfoResult>(url, {
    headers: {
      Authorization: `Bearer ${process.env.IP_INFO_TOKEN}`
    },
    next: {
      revalidate: 86400,
      tags: [`server-${ip.toNormalizedString()}`]
    }
  });
  console.log(`[ip-info] received ip metadata of ${ip.toNormalizedString()}`);

  return res;
}
