import { IpGeolocationResult } from '@/src/ip-geolocation/types';
import 'server-only';

// Actions
export async function searchIpGeolocation(ip: string): Promise<IpGeolocationResult> {
  const res = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IP_GEOLOCATION_API_KEY}&ip=${ip}`, {
    next: {
      revalidate: 86400,
    }
  });

  return await res.json();
}
