import { jsonFetch } from '@/utils/fetch';
import type { IPv4, IPv6 } from 'ipaddr.js';
import type { IpQualityScoreResult } from './ip-quality-score.dto';

/**
 * Query geolocation of given ip address
 * @param ip
 */
export async function queryIpQualityScore(ip: IPv4 | IPv6): Promise<IpQualityScoreResult | null> {
  if (['private', 'loopback'].includes(ip.range())) {
    return null;
  }

  // Make request
  console.log(`[ip-quality-score] query ip geolocation of ${ip.toNormalizedString()}`);
  const url = new URL('https://ipqualityscore.com/api/json/ip');
  url.searchParams.set('ip', ip.toNormalizedString());

  const res = await jsonFetch<IpQualityScoreResult>(url, {
    headers: {
      'IPQS-KEY': process.env.IP_QUALITY_API_KEY!
    },
    next: {
      revalidate: 86400,
      tags: [`server-${ip.toNormalizedString()}`]
    }
  });
  console.log(`[ip-quality-score] received ip geolocation of ${ip.toNormalizedString()}`);

  return res;
}
