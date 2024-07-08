import { searchIpData } from '@/src/ip-data/data';
import IpDataPayloadButton from '@/src/ip-data/IpDataPayloadButton';

export interface IpDataPayloadProps {
  readonly ip: string;
}

export default async function IpDataPayload({ ip }: IpDataPayloadProps) {
  const data = await searchIpData(ip);

  return <IpDataPayloadButton data={data} />
}
