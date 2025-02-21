import { decodeIp, type WithMapServerIpParams } from '@/app/(with-map)/server/[ip]/params';
import IpQualityScoreMetadataList from '@/components/server/ip-quality-score/IpQualityScoreMetadataList';
import { isAuthenticated } from '@/lib/auth/is-authenticated';
import ipaddr from 'ipaddr.js';

// Page
export interface WithMapServerIpIPQSPageProps {
  readonly params: Promise<WithMapServerIpParams>;
}

export default async function WithMapServerIpIPQSPage({ params }: WithMapServerIpIPQSPageProps) {
  const ip = await decodeIp(params);
  await isAuthenticated({ returnTo: `/server/${ip}/ip-quality-score` });

  return <IpQualityScoreMetadataList ip={ipaddr.parse(ip)} />;
}
