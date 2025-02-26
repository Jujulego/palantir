import IpDataMetadataList from '@/components/server/ip-data/IpDataMetadataList';
import { needRight } from '@/lib/auth/need-right';
import ipaddr from 'ipaddr.js';
import { headers } from 'next/headers';

// Page
export default async function WithMapServerMeIpDataPage() {
  await needRight('ip:AccessIpData', {
    forbiddenRedirectTo: '/server/me/vercel',
    loginReturnTo: '/server/me/ip-data'
  });

  const ip = (await headers()).get('x-forwarded-for')!;
  return <IpDataMetadataList ip={ipaddr.parse(ip)} />;
}
