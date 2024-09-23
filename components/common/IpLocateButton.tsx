'use client';

import { getClientIp } from '@/actions/getClientIp';
import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import { useCallback, useState } from 'react';

export interface IpLocateButtonProps {
  readonly onLocate: (ip: string) => void;
}

export default function IpLocateButton({ onLocate }: IpLocateButtonProps) {
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
    return <CircularProgress size={24} sx={{ m: 1, flex: '0 0 auto' }} />;
  }

  return (
    <IconButton
      color="inherit" aria-label="Locate"
      onClick={handleClick}
    >
      <GpsNotFixedIcon />
    </IconButton>
  );
}