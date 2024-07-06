import { IpInfoResult } from '@/src/ip-info/types';
import { ipCacheDuration } from '@/src/utils/cache';
import 'server-only';

// Actions
export async function searchIpInfo(ip: string): Promise<IpInfoResult> {
  const url = new URL(`https://ipinfo.io/${ip}/json`);
  url.searchParams.set('token', process.env.IP_INFO_TOKEN!);

  const res = await fetch(url, {
    next: {
      revalidate: ipCacheDuration(ip),
      tags: [ip],
    }
  });

  return await res.json();
}
