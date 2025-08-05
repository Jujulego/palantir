import { decodeIp, type WithMapServerIpParams } from '@/app/(with-map)/server/[ip]/params';
import IpInfoMetadataList from '@/components/server/ip-info/IpInfoMetadataList';
import ipaddr from 'ipaddr.js';

// Page
export interface WithMapServerIpInfoPageProps {
  readonly params: Promise<WithMapServerIpParams>;
}

export default async function WithMapServerIpInfoPage({ params }: WithMapServerIpInfoPageProps) {
  const ip = await decodeIp(params);

  return <IpInfoMetadataList ip={ipaddr.parse(ip)} />;
}
