import { decodeIp, type WithMapServerIpParams } from '@/app/(with-map)/server/[ip]/params';
import IpDataMetadataList from '@/components/server/ip-data/IpDataMetadataList';
import { isAuthenticated } from '@/lib/auth/is-authenticated';
import ipaddr from 'ipaddr.js';

// Page
export interface WithMapServerIpDataPageProps {
  readonly params: Promise<WithMapServerIpParams>;
}

export default async function WithMapServerIpDataPage({ params }: WithMapServerIpDataPageProps) {
  const ip = await decodeIp(params);
  await isAuthenticated({ returnTo: `/server/${ip}/ip-data` });

  return <IpDataMetadataList ip={ipaddr.parse(ip)} />;
}
