'use client';

import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import IconButton from '@mui/material/IconButton';
import type { SxProps, Theme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import { useMemo } from 'react';

export interface LocateButtonProps {
  readonly ip: string;
  readonly sx?: SxProps<Theme>;
}

export default function LocateButton({ ip, sx }: LocateButtonProps) {
  const segments = useSelectedLayoutSegments();

  const href = useMemo(() => {
    const parts = segments.length ? [...segments] : ['ip', '', 'ip-info'];
    parts[1] = encodeURIComponent(ip);

    return `/${parts.join('/')}`;
  }, [ip, segments]);

  return (
    <Tooltip title="Locate my ip">
      <IconButton
        color="inherit" aria-label="Locate my ip"
        component={Link} href={href} prefetch
        sx={sx}
      >
        <GpsNotFixedIcon />
      </IconButton>
    </Tooltip>
  );
}
