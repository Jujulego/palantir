import IpQualityScoreMetadataList from '@/components/server/ip-quality-score/IpQualityScoreMetadataList';
import { needRight } from '@/lib/auth/need-right';
import ipaddr from 'ipaddr.js';
import { headers } from 'next/headers';

// Page
export default async function WithMapServerMeIPQSPage() {
  await needRight('ip:AccessIpQualityScore', {
    forbiddenRedirectTo: '/server/me/vercel',
    loginReturnTo: '/server/me/ip-quality-score'
  });

  const ip = (await headers()).get('x-forwarded-for')!;
  return <IpQualityScoreMetadataList ip={ipaddr.parse(ip)} />;
}
