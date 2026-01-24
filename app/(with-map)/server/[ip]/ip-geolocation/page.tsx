import { decodeIp } from '@/app/(with-map)/server/[ip]/params';
import IpGeolocationMetadataList from '@/components/server/ip-geolocation/IpGeolocationMetadataList';
import { needRight } from '@/lib/auth/need-right';
import ipaddr from 'ipaddr.js';

// Page
export default async function WithMapServerIpGeolocationPage({ params }: PageProps<'/server/[ip]/ip-geolocation'>) {
  const ip = await decodeIp(params);
  await needRight('ip:AccessIpGeolocation', {
    forbiddenRedirectTo: `/server/${ip}/ip-info`,
    loginReturnTo: `/server/${ip}/ip-geolocation`
  });

  return <IpGeolocationMetadataList ip={ipaddr.parse(ip)} />;
}
