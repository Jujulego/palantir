import { searchIpGeolocation } from '@/src/ip-geolocation/data';
import IpGeolocationPayloadButton from '@/src/ip-geolocation/IpGeolocationPayloadButton';

export interface IpGeolocationPayloadProps {
  readonly ip: string;
}

export default async function IpGeolocationPayload({ ip }: IpGeolocationPayloadProps) {
  const data = await searchIpGeolocation(ip);

  return <IpGeolocationPayloadButton data={data} />
}
