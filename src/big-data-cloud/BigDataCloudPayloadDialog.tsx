import type { BigDataCloudResult } from '@/src/big-data-cloud/type';
import JsonViewer from '@/src/common/JsonViewer';
import PayloadDialog from '@/src/common/PayloadDialog';

export interface BigDataCloudPayloadDialogProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly data: BigDataCloudResult;
}

export default function BigDataCloudPayloadDialog({ open, onClose, data }: BigDataCloudPayloadDialogProps) {
  return <PayloadDialog title="Big Data Cloud Payload" open={open} onClose={onClose}>
    <JsonViewer data={data} />
  </PayloadDialog>;
}
