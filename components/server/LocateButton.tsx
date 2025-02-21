'use client';

import TransitionLink from '@/components/utils/TransitionLink';
import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useTransition } from 'react';

export default function LocateButton() {
  const [isLocating, startLocate] = useTransition();

  // Render
  return (
    <Tooltip title="Locate my ip">
      <IconButton
        color="inherit"
        loading={isLocating}
        loadingIndicator={<CircularProgress size={20} />}

        component={TransitionLink}
        href="/server/me/vercel"
        prefetch
        startTransition={startLocate}

        aria-label="Locate my ip"
      >
        <GpsNotFixedIcon />
      </IconButton>
    </Tooltip>
  );
}
