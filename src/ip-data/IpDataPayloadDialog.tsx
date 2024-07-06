import JsonViewer from '@/src/common/JsonViewer';
import PayloadDialog from '@/src/common/PayloadDialog';
import type { IpDataResult } from '@/src/ip-data/types';

export interface IpDataPayloadDialogProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly data: IpDataResult;
}

export default function IpDataPayloadDialog({ open, onClose, data }: IpDataPayloadDialogProps) {
  return <PayloadDialog title="Ip Data Payload" open={open} onClose={onClose}>
    <JsonViewer data={data} />
  </PayloadDialog>;
}
