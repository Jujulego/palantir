import { decodeIp, type WithMapServerIpParams } from '@/app/(with-map)/server/[ip]/params';
import IpDataMetadataList from '@/components/server/ip-data/IpDataMetadataList';
import { needRight } from '@/lib/auth/need-right';
import ipaddr from 'ipaddr.js';

// Page
export interface WithMapServerIpDataPageProps {
  readonly params: Promise<WithMapServerIpParams>;
}

export default async function WithMapServerIpDataPage({ params }: WithMapServerIpDataPageProps) {
  const ip = await decodeIp(params);
  await needRight('ip:AccessIpData', {
    forbiddenRedirectTo: `/server/${ip}/ip-info`,
    loginReturnTo: `/server/${ip}/ip-data`
  });

  return <IpDataMetadataList ip={ipaddr.parse(ip)} />;
}
