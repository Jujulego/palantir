'use client';

import Button from '@mui/material/Button';
import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react';

import type { IpDataResult } from '@/src/ip-data/type';

const IpDataPayloadDialog = dynamic(() => import('@/src/ip-data/IpDataPayloadDialog'), { ssr: false });

// Component
export interface IpDataPayloadButtonProps {
  readonly data: IpDataResult;
}

export default function IpDataPayloadButton({ data }: IpDataPayloadButtonProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return <>
    <Button size="small" onClick={handleOpen}>View Payload</Button>
    <IpDataPayloadDialog open={open} onClose={handleClose} data={data} />
  </>;
}
