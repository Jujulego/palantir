import { IpInfoResult } from '@/src/ip-info/types';
import 'server-only';

// Actions
export async function searchIpInfo(ip: string): Promise<IpInfoResult> {
  const url = new URL(`https://ipinfo.io/${ip}/json`);
  url.searchParams.set('token', process.env.IP_INFO_TOKEN!);

  const res = await fetch(url, {
    next: {
      revalidate: 86400,
    }
  });

  return await res.json();
}
