import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// Component
export interface PayloadDialogProps {
  readonly payload: unknown;
  readonly open: boolean;
  readonly onClose: () => void;
}

export default function PayloadDialog({ payload, open, onClose }: PayloadDialogProps) {
  return <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle>Raw Payload</DialogTitle>
    <DialogContent>
      <pre><code>{ JSON.stringify(payload, null, 2) }</code></pre>
    </DialogContent>
  </Dialog>;
}
