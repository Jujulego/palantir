import JsonViewer from '@/src/common/JsonViewer';
import PayloadDialog from '@/src/common/PayloadDialog';
import type { IpInfoResult } from '@/src/ip-info/types';

export interface IpInfoPayloadDialogProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly data: IpInfoResult;
}

export default function IpInfoPayloadDialog({ open, onClose, data }: IpInfoPayloadDialogProps) {
  return <PayloadDialog title="Ip Info Payload" open={open} onClose={onClose}>
    <JsonViewer data={data} />
  </PayloadDialog>;
}
