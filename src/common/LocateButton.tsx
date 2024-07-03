'use client';

import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import IconButton from '@mui/material/IconButton';
import type { SxProps } from '@mui/material/styles';

import { getClientIp } from '@/src/common/getClientIp';

// Component
export interface LocateButtonProps {
  readonly onClick: (ip: string) => void;
  readonly sx?: SxProps;
}

export default function LocateButton({ onClick, sx }: LocateButtonProps) {
  return (
    <IconButton
      color="inherit"
      aria-label="Locate"
      sx={sx}
      onClick={async () => {
        const ip = await getClientIp();

        if (ip) {
          onClick(ip);
        }
      }}
    >
      <GpsNotFixedIcon />
    </IconButton>
  )
}

