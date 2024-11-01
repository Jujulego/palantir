import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import IconButton from '@mui/material/IconButton';
import type { SxProps, Theme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import ipaddr from 'ipaddr.js';
import { headers } from 'next/headers';
import Link from 'next/link';

export interface LocateButtonProps {
  readonly sx?: SxProps<Theme>;
}

export default async function LocateButton({ sx }: LocateButtonProps) {
  const ip = (await headers()).get('X-Forwarded-For');

  return (
    <Tooltip title="Locate my ip">
      <IconButton
        color="inherit" aria-label="Locate my ip"
        component={Link} href={ip ? `/ip/${ipaddr.parse(ip).toString()}/ip-info` : ''} prefetch
        disabled={!ip}
        sx={sx}
      >
        <GpsNotFixedIcon />
      </IconButton>
    </Tooltip>
  );
}
