import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { ReactNode } from 'react';

// Components
export interface PayloadDialogProps {
  readonly title: string;
  readonly open: boolean;
  readonly onClose: () => void;
  readonly children?: ReactNode;
}

export default function PayloadDialog({ title, open, onClose, children }: PayloadDialogProps) {
  return <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle>{ title }</DialogTitle>
    <DialogContent>
      { children }
    </DialogContent>
  </Dialog>
}
