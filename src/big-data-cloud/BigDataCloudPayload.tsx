import { searchBigDataCloud } from '@/src/big-data-cloud/data';
import BigDataCloudPayloadButton from '@/src/big-data-cloud/BigDataCloudPayloadButton';

export interface BigDataCloudPayloadProps {
  readonly ip: string;
}

export default async function BigDataCloudPayload({ ip }: BigDataCloudPayloadProps) {
  const data = await searchBigDataCloud(ip);

  return <BigDataCloudPayloadButton data={data} />
}
