'use client';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import { useMemo } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import 'prismjs/themes/prism-tomorrow.min.css';
import { grey } from '@mui/material/colors';

SyntaxHighlighter.registerLanguage('json', json);

// Component
export interface PayloadDialogProps {
  readonly payload: unknown;
  readonly open: boolean;
  readonly onClose: () => void;
}

export default function PayloadDialog({ payload, open, onClose }: PayloadDialogProps) {
  const formatted = useMemo(() => JSON.stringify(payload, null, 2), [payload]);
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Raw Payload</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
        <SyntaxHighlighter language="json" useInlineStyles={false} showLineNumbers PreTag={Pre}>
          { formatted }
        </SyntaxHighlighter>
      </DialogContent>
    </Dialog>
  );
}

// Utils
const Pre = styled('pre')(({ theme }) => ({
  flex: '1 1 auto',
  overflow: 'auto',
  margin: 0,
  paddingLeft: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: grey['50'],
  ...theme.applyStyles('dark', {
    backgroundColor: theme.vars.palette.background.paper,
  })
}));
