import { IpGeolocationResult } from '@/src/ip-geolocation/types';
import 'server-only';

// Actions
export async function searchIpGeolocation(ip: string): Promise<IpGeolocationResult> {
  const url = new URL('https://api.ipgeolocation.io/ipgeo');
  url.searchParams.set('apiKey', process.env.IP_GEOLOCATION_API_KEY!);
  url.searchParams.set('ip', ip);

  const res = await fetch(url, {
    next: {
      revalidate: 86400,
    }
  });

  return await res.json();
}
