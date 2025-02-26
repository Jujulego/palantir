import { decodeIp, type WithMapServerIpParams } from '@/app/(with-map)/server/[ip]/params';
import IpQualityScoreMetadataList from '@/components/server/ip-quality-score/IpQualityScoreMetadataList';
import { needRight } from '@/lib/auth/need-right';
import ipaddr from 'ipaddr.js';

// Page
export interface WithMapServerIpIPQSPageProps {
  readonly params: Promise<WithMapServerIpParams>;
}

export default async function WithMapServerIpIPQSPage({ params }: WithMapServerIpIPQSPageProps) {
  const ip = await decodeIp(params);
  await needRight('ip:AccessIpQualityScore', {
    forbiddenRedirectTo: `/server/${ip}/ip-info`,
    loginReturnTo: `/server/${ip}/ip-quality-score`
  });

  return <IpQualityScoreMetadataList ip={ipaddr.parse(ip)} />;
}
