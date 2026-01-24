import { decodeIp } from '@/app/(with-map)/server/[ip]/params';
import IpInfoMetadataList from '@/components/server/ip-info/IpInfoMetadataList';
import ipaddr from 'ipaddr.js';

// Page
export default async function WithMapServerIpInfoPage({ params }: PageProps<'/server/[ip]/ip-info'>) {
  const ip = await decodeIp(params);

  return <IpInfoMetadataList ip={ipaddr.parse(ip)} />;
}
