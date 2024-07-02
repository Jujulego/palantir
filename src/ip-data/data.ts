import { IpDataResult } from '@/src/ip-data/type';
import 'server-only';

// Actions
export async function searchIpData(ip: string): Promise<IpDataResult> {
  const url = new URL(`https://eu-api.ipdata.co/${ip}`);
  url.searchParams.set('api-key', process.env.IP_DATA_API_KEY!);

  const res = await fetch(url, {
    next: {
      revalidate: 86400,
    }
  });

  return await res.json();
}
