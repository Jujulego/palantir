'use client';

import Button from '@mui/material/Button';
import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react';

import type { IpInfoResult } from '@/src/ip-info/types';

const IpInfoPayloadDialog = dynamic(() => import('@/src/ip-info/IpInfoPayloadDialog'), { ssr: false });

// Component
export interface IpInfoPayloadButtonProps {
  readonly data: IpInfoResult;
}

export default function IpInfoPayloadButton({ data }: IpInfoPayloadButtonProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return <>
    <Button size="small" onClick={handleOpen}>View Payload</Button>
    <IpInfoPayloadDialog open={open} onClose={handleClose} data={data} />
  </>;
}
