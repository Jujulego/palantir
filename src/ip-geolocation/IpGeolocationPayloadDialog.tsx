import JsonViewer from '@/src/common/JsonViewer';
import PayloadDialog from '@/src/common/PayloadDialog';
import type { IpGeolocationResult } from '@/src/ip-geolocation/types';

export interface IpGeolocationPayloadDialogProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly data: IpGeolocationResult;
}

export default function IpGeolocationPayloadDialog({ open, onClose, data }: IpGeolocationPayloadDialogProps) {
  return <PayloadDialog title="Ip Geolocation Payload" open={open} onClose={onClose}>
    <JsonViewer data={data} />
  </PayloadDialog>;
}
