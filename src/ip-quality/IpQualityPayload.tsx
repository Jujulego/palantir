import { searchIpQuality } from '@/src/ip-quality/data';
import IpQualityPayloadButton from '@/src/ip-quality/IpQualityPayloadButton';

export interface IpQualityPayloadProps {
  readonly ip: string;
}

export default async function IpQualityPayload({ ip }: IpQualityPayloadProps) {
  const data = await searchIpQuality(ip);

  return <IpQualityPayloadButton data={data} />
}
