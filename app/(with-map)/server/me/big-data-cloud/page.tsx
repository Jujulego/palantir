import BigDataCloudMetadataList from '@/components/server/big-data-cloud/BigDataCloudMetadataList';
import { isAuthenticated } from '@/lib/auth/is-authenticated';
import ipaddr from 'ipaddr.js';
import { headers } from 'next/headers';

// Page
export default async function WithMapServerMeBigDataCloudPage() {
  await isAuthenticated({ returnTo: '/server/me/big-data-cloud' });

  const ip = (await headers()).get('x-forwarded-for')!;
  return <BigDataCloudMetadataList ip={ipaddr.parse(ip)} />;
}
