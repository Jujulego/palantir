import IpGeolocationMetadataList from '@/components/server/ip-geolocation/IpGeolocationMetadataList';
import { isAuthenticated } from '@/lib/auth/is-authenticated';
import ipaddr from 'ipaddr.js';
import { headers } from 'next/headers';

// Page
export default async function WithMapServerMeIpGeolocationPage() {
  await isAuthenticated({ returnTo: '/server/me/ip-geolocation' });

  const ip = (await headers()).get('x-forwarded-for')!;
  return <IpGeolocationMetadataList ip={ipaddr.parse(ip)} />;
}
