import IpGeolocationMetadataList from '@/components/server/ip-geolocation/IpGeolocationMetadataList';
import { needRight } from '@/lib/auth/need-right';
import ipaddr from 'ipaddr.js';
import { headers } from 'next/headers';

// Page
export default async function WithMapServerMeIpGeolocationPage() {
  await needRight('ip:AccessIpGeolocation', {
    forbiddenRedirectTo: '/server/me/vercel',
    loginReturnTo: '/server/me/ip-geolocation'
  });

  const ip = (await headers()).get('x-forwarded-for')!;
  return <IpGeolocationMetadataList ip={ipaddr.parse(ip)} />;
}
