'use client';

import DataObjectIcon from '@mui/icons-material/DataObject';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';

// Lazy components
const PayloadDialog = dynamic(() => import('@/components/PayloadDialog'), { ssr: false });

// Component
export interface PayloadListItemProps {
  readonly payload: unknown;
}

export default function PayloadListItem({ payload }: PayloadListItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  // Render
  return <>
    <ListItem disablePadding>
      <ListItemButton onClick={handleOpen}>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <DataObjectIcon color="primary" />
        </ListItemIcon>

        <ListItemText primary="View payload" />
      </ListItemButton>
    </ListItem>

    <PayloadDialog payload={payload} open={isOpen} onClose={handleClose} />
  </>;
}