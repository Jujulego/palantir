import { decodeIp, type WithMapServerIpParams } from '@/app/(with-map)/server/[ip]/params';
import BigDataCloudMetadataList from '@/components/server/big-data-cloud/BigDataCloudMetadataList';
import { needRight } from '@/lib/auth/need-right';
import ipaddr from 'ipaddr.js';

// Page
export interface WithMapServerIpBigDataCloudPageProps {
  readonly params: Promise<WithMapServerIpParams>;
}

export default async function WithMapServerIpBigDataCloudPage({ params }: WithMapServerIpBigDataCloudPageProps) {
  const ip = await decodeIp(params);
  await needRight('ip:AccessBigDataCloud', {
    forbiddenRedirectTo: `/server/${ip}/ip-info`,
    loginReturnTo: `/server/${ip}/big-data-cloud`
  });

  return <BigDataCloudMetadataList ip={ipaddr.parse(ip)} />;
}
