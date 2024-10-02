'use client';

import { locateIp } from '@/actions/locateIp';
import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import type { SxProps, Theme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { useCallback, useTransition } from 'react';

export interface LocateButtonProps {
  readonly sx?: SxProps<Theme>;
}

export default function LocateButton({ sx }: LocateButtonProps) {
  const [isLocating, startLocate] = useTransition();

  const handleClick = useCallback(() => {
    startLocate(() => locateIp());
  }, []);

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
        type="button"
        onClick={handleClick}
        sx={sx}
      >
        <GpsNotFixedIcon />
      </IconButton>
    </Tooltip>
  );
}
