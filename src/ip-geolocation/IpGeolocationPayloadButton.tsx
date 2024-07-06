'use client';

import Button from '@mui/material/Button';
import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react';

import type { IpGeolocationResult } from '@/src/ip-geolocation/types';

const IpGeolocationPayloadDialog = dynamic(() => import('@/src/ip-geolocation/IpGeolocationPayloadDialog'), { ssr: false });

// Component
export interface IpGeolocationPayloadButtonProps {
  readonly data: IpGeolocationResult;
}

export default function IpGeolocationPayloadButton({ data }: IpGeolocationPayloadButtonProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return <>
    <Button size="small" onClick={handleOpen}>View Payload</Button>
    <IpGeolocationPayloadDialog open={open} onClose={handleClose} data={data} />
  </>;
}
