import { IpQualityResult } from '@/src/ip-quality/types';
import 'server-only';

// Actions
export async function searchIpQuality(ip: string): Promise<IpQualityResult> {
  const url = new URL(`https://ipqualityscore.com/api/json/ip/${process.env.IP_QUALITY_API_KEY}/${ip}`);
  url.searchParams.set('strictness', '1');

  const res = await fetch(url, {
    next: {
      revalidate: 86400,
    }
  });

  return await res.json();
}
