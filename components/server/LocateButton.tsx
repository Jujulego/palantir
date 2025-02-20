'use client';

import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type MouseEvent, useCallback, useTransition } from 'react';

export default function LocateButton() {
  const [isLocating, startLocate] = useTransition();
  const router = useRouter();

  const handleClick = useCallback((event: MouseEvent) => {
    event.preventDefault();

    startLocate(() => {
      router.push('/server/me/vercel');
    });
  }, [router]);

  // Render
  return (
    <Tooltip title="Locate my ip">
      <IconButton
        color="inherit"
        loading={isLocating}
        loadingIndicator={<CircularProgress size={20} />}

        component={Link}
        href="/server/me/vercel"
        prefetch
        onClick={handleClick}

        aria-label="Locate my ip"
      >
        <GpsNotFixedIcon />
      </IconButton>
    </Tooltip>
  );
}
