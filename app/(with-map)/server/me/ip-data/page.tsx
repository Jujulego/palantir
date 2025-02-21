import IpDataMetadataList from '@/components/server/ip-data/IpDataMetadataList';
import { isAuthenticated } from '@/lib/auth/is-authenticated';
import ipaddr from 'ipaddr.js';
import { headers } from 'next/headers';

// Page
export default async function WithMapServerMeDataPage() {
  await isAuthenticated({ returnTo: '/server/me/ip-data' });

  const ip = (await headers()).get('x-forwarded-for')!;
  return <IpDataMetadataList ip={ipaddr.parse(ip)} />;
}
