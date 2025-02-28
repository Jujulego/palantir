'use client';

import LinkIcon from '@mui/icons-material/Link';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';

// Lazy components
const LinkAccountDialog = dynamic(() => import('@/components/users/LinkAccountDialog'), { ssr: false });

// Component
export interface LinkAccountButtonProps {
  readonly userId: string;
}

export default function LinkAccountButton({ userId }: LinkAccountButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  // Render
  return (
    <>
      <Tooltip title="Link account">
        <IconButton onClick={handleOpen}>
          <LinkIcon />
        </IconButton>
      </Tooltip>

      <LinkAccountDialog userId={userId} open={isOpen} onClose={handleClose} />
    </>
  );
}