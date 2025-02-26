import { decodeIp, type WithMapServerIpParams } from '@/app/(with-map)/server/[ip]/params';
import IpGeolocationMetadataList from '@/components/server/ip-geolocation/IpGeolocationMetadataList';
import { needRight } from '@/lib/auth/need-right';
import ipaddr from 'ipaddr.js';

// Page
export interface WithMapServerIpGeolocationPageProps {
  readonly params: Promise<WithMapServerIpParams>;
}

export default async function WithMapServerIpGeolocationPage({ params }: WithMapServerIpGeolocationPageProps) {
  const ip = await decodeIp(params);
  await needRight('ip:AccessIpGeolocation', {
    forbiddenRedirectTo: `/server/${ip}/ip-info`,
    loginReturnTo: `/server/${ip}/ip-geolocation`
  });

  return <IpGeolocationMetadataList ip={ipaddr.parse(ip)} />;
}
