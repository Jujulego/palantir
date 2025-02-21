import IpInfoMetadataList from '@/components/server/ip-info/IpInfoMetadataList';
import ipaddr from 'ipaddr.js';
import { headers } from 'next/headers';

// Page
export default async function WithMapServerMeIpInfoPage() {
  const ip = (await headers()).get('x-forwarded-for')!;
  return <IpInfoMetadataList ip={ipaddr.parse(ip)} />;
}
