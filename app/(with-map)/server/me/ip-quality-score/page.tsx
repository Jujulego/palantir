import IpQualityScoreMetadataList from '@/components/server/ip-quality-score/IpQualityScoreMetadataList';
import { isAuthenticated } from '@/lib/auth/is-authenticated';
import ipaddr from 'ipaddr.js';
import { headers } from 'next/headers';

// Page
export default async function WithMapServerMeIPQSPage() {
  await isAuthenticated({ returnTo: '/server/me/ip-quality-score' });

  const ip = (await headers()).get('x-forwarded-for')!;
  return <IpQualityScoreMetadataList ip={ipaddr.parse(ip)} />;
}
