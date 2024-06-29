import { searchIpGeolocation } from '@/src/ip-geolocation/actions';
import IpGeolocationMarker from '@/src/ip-geolocation/IpGeolocationMarker';

// Component
export interface IpGeolocationProps {
  readonly ip: string;
}

export default async function IpGeolocation({ ip }: IpGeolocationProps) {
  const result = await searchIpGeolocation(ip);

  return (
    <IpGeolocationMarker result={result} />
  );
}
