import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

// Component
export interface LinkAccountDialogProps {
  readonly userId: string;
  readonly open: boolean;
  readonly onClose: () => void;
}

export default function LinkAccountDialog({ open, onClose }: LinkAccountDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Account linking</DialogTitle>
    </Dialog>
  );
}