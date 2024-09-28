'use client';

import { getClientIp } from '@/actions/getClientIp';
import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import type { SxProps, Theme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { useCallback, useState } from 'react';

export interface LocateButtonProps {
  readonly onLocate: (ip: string) => void;
  readonly sx?: SxProps<Theme>;
}

export default function LocateButton({ onLocate, sx }: LocateButtonProps) {
  const [isLocating, setIsLocating] = useState(false);

  const handleClick = useCallback(async () => {
    try {
      setIsLocating(true);
      const ip = await getClientIp();

      if (ip) {
        onLocate(ip);
      }
    } finally {
      setIsLocating(false);
    }
  }, [onLocate]);

  // Render
  if (isLocating) {
    return (
      <Box sx={[...(Array.isArray(sx) ? sx : [sx]), { height: 40, p: 1 }]}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  return (
    <Tooltip title="Locate my ip">
      <IconButton
        color="inherit" aria-label="Locate my ip"
        onClick={handleClick}
        sx={sx}
      >
        <GpsNotFixedIcon />
      </IconButton>
    </Tooltip>
  );
}
