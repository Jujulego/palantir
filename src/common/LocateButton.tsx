'use client';

import { getClientIp } from '@/src/common/getClientIp';
import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import { IconButton, SxProps } from '@mui/material';

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

