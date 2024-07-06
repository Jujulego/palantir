'use client';

import Button from '@mui/material/Button';
import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react';

import type { BigDataCloudResult } from '@/src/big-data-cloud/type';

const BigDataCloudPayloadDialog = dynamic(() => import('@/src/big-data-cloud/BigDataCloudPayloadDialog'), { ssr: false });

// Component
export interface BigDataCloudPayloadButtonProps {
  readonly data: BigDataCloudResult;
}

export default function BigDataCloudPayloadButton({ data }: BigDataCloudPayloadButtonProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return <>
    <Button size="small" onClick={handleOpen}>View Payload</Button>
    <BigDataCloudPayloadDialog open={open} onClose={handleClose} data={data} />
  </>;
}
