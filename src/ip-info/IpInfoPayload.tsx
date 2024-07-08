import { searchIpInfo } from '@/src/ip-info/data';
import IpInfoPayloadButton from '@/src/ip-info/IpInfoPayloadButton';

export interface IpInfoPayloadProps {
  readonly ip: string;
}

export default async function IpInfoPayload({ ip }: IpInfoPayloadProps) {
  const data = await searchIpInfo(ip);

  return <IpInfoPayloadButton data={data} />
}
