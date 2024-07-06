import JsonViewer from '@/src/common/JsonViewer';
import PayloadDialog from '@/src/common/PayloadDialog';
import type { IpQualityResult } from '@/src/ip-quality/types';

export interface IpQualityPayloadDialogProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly data: IpQualityResult;
}

export default function IpQualityPayloadDialog({ open, onClose, data }: IpQualityPayloadDialogProps) {
  return <PayloadDialog title="Ip Quality Payload" open={open} onClose={onClose}>
    <JsonViewer data={data} />
  </PayloadDialog>;
}
