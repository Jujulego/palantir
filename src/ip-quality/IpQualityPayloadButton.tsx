'use client';

import Button from '@mui/material/Button';
import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react';

import type { IpQualityResult } from '@/src/ip-quality/types';

const IpQualityPayloadDialog = dynamic(() => import('@/src/ip-quality/IpQualityPayloadDialog'), { ssr: false });

// Component
export interface IpQualityPayloadButtonProps {
  readonly data: IpQualityResult;
}

export default function IpQualityPayloadButton({ data }: IpQualityPayloadButtonProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return <>
    <Button size="small" onClick={handleOpen}>View Payload</Button>
    <IpQualityPayloadDialog open={open} onClose={handleClose} data={data} />
  </>;
}
