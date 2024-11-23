'use client';

import { mergeSx } from '@/utils/mui';
import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import type { SxProps, Theme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { use } from 'react';

export interface LocateButtonProps {
  readonly ip: Promise<string | null>;
  readonly sx?: SxProps<Theme>;
}

export default function LocateButton({ ip: _ip, sx }: LocateButtonProps) {
  const searchParams = useSearchParams();
  const ip = use(_ip);

  if (!ip) {
    return null;
  }

  const locateParams = new URLSearchParams(searchParams);
  locateParams.delete('name');

  return (
    <Paper elevation={2} sx={mergeSx(sx, { p: 0.5, borderRadius: 9999 })}>
      <Tooltip title="Locate my ip">
        <IconButton
          color="inherit" aria-label="Locate my ip"
          component={Link} href={`/ip/${encodeURIComponent(ip)}?${locateParams}`} prefetch
        >
          <GpsNotFixedIcon />
        </IconButton>
      </Tooltip>
    </Paper>
  );
}
