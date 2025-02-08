'use client';

import { mergeSx } from '@/utils/mui';
import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import type { SxProps, Theme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type MouseEvent, useCallback, useTransition } from 'react';
import useSWRImmutable from 'swr/immutable';
import { clientIp } from './LocateButton.actions';

// Component
export interface LocateButtonProps {
  readonly ip?: string | Promise<string>;
  readonly sx?: SxProps<Theme>;
}

export default function LocateButton(props: LocateButtonProps) {
  const { data: ip, isLoading } = useSWRImmutable(['client-ip'], {
    fallbackData: props.ip,
    fetcher: clientIp,
  });
  const href = `/ip/${encodeURIComponent(ip)}`;

  const [isLocating, startLocate] = useTransition();
  const router = useRouter();

  const handleClick = useCallback((event: MouseEvent) => {
    event.preventDefault();

    startLocate(() => {
      router.push(href);
    });
  }, [href, router]);

  // Render
  return (
    <Paper elevation={2} sx={mergeSx(props.sx, { p: 0.5, borderRadius: 9999 })}>
      { isLoading ? (
        <Skeleton variant="circular" height={40} width={40} />
      ) : (
        <Tooltip title="Locate my ip">
          <IconButton
            color="inherit"
            loading={isLocating}
            loadingIndicator={<CircularProgress size={20} />}
            onClick={handleClick}

            component={Link}
            href={href}
            prefetch

            aria-label="Locate my ip"
          >
            <GpsNotFixedIcon />
          </IconButton>
        </Tooltip>
      ) }
    </Paper>
  );
}
