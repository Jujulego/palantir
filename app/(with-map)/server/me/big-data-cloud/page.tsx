import BigDataCloudMetadataList from '@/components/server/big-data-cloud/BigDataCloudMetadataList';
import { needRight } from '@/lib/auth/need-right';
import ipaddr from 'ipaddr.js';
import { headers } from 'next/headers';

// Page
export default async function WithMapServerMeBigDataCloudPage() {
  await needRight('ip:AccessBigDataCloud', {
    forbiddenRedirectTo: '/server/me/vercel',
    loginReturnTo: '/server/me/big-data-cloud'
  });

  const ip = (await headers()).get('x-forwarded-for')!;
  return <BigDataCloudMetadataList ip={ipaddr.parse(ip)} />;
}
