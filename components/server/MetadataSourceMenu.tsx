'use client';

import IpDataIcon from '@/components/icons/IpDataIcon';
import IpInfoIcon from '@/components/icons/IpInfoIcon';
import IpQualityScoreIcon from '@/components/icons/IpQualityScoreIcon';
import CloudIcon from '@mui/icons-material/Cloud';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlaceIcon from '@mui/icons-material/Place';
import ButtonBase from '@mui/material/ButtonBase';
import Fade from '@mui/material/Fade';
import LinearProgress from '@mui/material/LinearProgress';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Skeleton from '@mui/material/Skeleton';
import { styled, type SxProps, type Theme } from '@mui/material/styles';
import Link from 'next/link';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import { type MouseEvent, type ReactNode, useCallback, useId, useRef, useState, useTransition } from 'react';

// Component
export interface MetadataSourceMenuProps {
  readonly ip: string;
  readonly sx?: SxProps<Theme>
}

export default function MetadataSourceMenu({ ip, sx }: MetadataSourceMenuProps) {
  const id = useId();
  const source = useSelectedLayoutSegment() ?? '';
  const anchorRef = useRef<HTMLButtonElement | null>(null);

  // Open state
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  // Navigation
  const router = useRouter();
  const [isLoading, startLoading] = useTransition();

  const handleClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    handleClose();

    startLoading(() => {
      router.push(event.currentTarget.href);
    });
  }, [handleClose, router]);

  // Render
  return (
    <>
      <Fade in={isLoading}>
        <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, width: '100%' }} />
      </Fade>

      <TriggerButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={sx}

        aria-controls={`${id}-menu`}
        aria-expanded={open}
        aria-label="metadata source menu"
        aria-haspopup="true"
      >
        { options[source] ?? <Skeleton variant="rounded" height={20} width={80} /> }
        <ExpandMoreIcon fontSize="small" />
      </TriggerButton>

      <Menu
        id={`${id}-menu`}
        open={open}
        onClose={handleClose}

        anchorEl={anchorRef.current}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}

        MenuListProps={{
          'aria-label': 'metadata source menu'
        }}
      >
        <MenuItem
          component={Link}
          href={`/server/${ip}/ip-info`}
          onClick={handleClick}

          selected={source === 'ip-info'}
          sx={{ gap: 0.75 }}
        >
          <IpInfoOption />
        </MenuItem>
        <MenuItem
          component={Link}
          href={`/server/${ip}/ip-data`}
          onClick={handleClick}

          selected={source === 'ip-data'}
          sx={{ gap: 0.75 }}
        >
          <IpDataOption />
        </MenuItem>
        <MenuItem
          component={Link}
          href={`/server/${ip}/ip-geolocation`}
          onClick={handleClick}

          selected={source === 'ip-geolocation'}
          sx={{ gap: 0.75 }}
        >
          <IpGeolocationOption />
        </MenuItem>
        <MenuItem
          component={Link}
          href={`/server/${ip}/ip-quality-score`}
          onClick={handleClick}

          selected={source === 'ip-quality-score'}
          sx={{ gap: 0.75 }}
        >
          <IpQualityScoreOption />
        </MenuItem>
        <MenuItem
          component={Link}
          href={`/server/${ip}/big-data-cloud`}
          onClick={handleClick}

          selected={source === 'big-data-cloud'}
          sx={{ gap: 0.75 }}
        >
          <BigDataCloudOption />
        </MenuItem>
      </Menu>
    </>
  );
}

// Utils
const options: Partial<Record<string, ReactNode>> = {
  'big-data-cloud': <BigDataCloudOption />,
  'ip-data': <IpDataOption />,
  'ip-info': <IpInfoOption />,
  'ip-geolocation': <IpGeolocationOption />,
  'ip-quality-score': <IpQualityScoreOption />,
};

// Elements
const TriggerButton = styled(ButtonBase)(({ theme }) => ({
  height: 24,

  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),

  paddingLeft: theme.spacing(0.5),
  paddingRight: theme.spacing(0.5),
  borderRadius: 6,

  fontFamily: theme.typography.fontFamily,

  transition: theme.transitions.create('background-color', {
    duration: theme.transitions.duration.shortest,
  }),

  '--IpSourceMenu-icon-width': '18px',

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  }
}));

function BigDataCloudOption() {
  return (
    <>
      <CloudIcon sx={{ color: 'bigDataCloud.main', fontSize: 'var(--IpSourceMenu-icon-width)' }} />
      BigDataCloud
    </>
  );
}

function IpDataOption() {
  return (
    <>
      <IpDataIcon sx={{ fontSize: 'var(--IpSourceMenu-icon-width)' }} />
      ipdata
    </>
  );
}

function IpInfoOption() {
  return (
    <>
      <IpInfoIcon sx={{ fontSize: 'var(--IpSourceMenu-icon-width)' }} />
      IPinfo
    </>
  );
}

function IpGeolocationOption() {
  return (
    <>
      <PlaceIcon sx={{ color: 'ipGeolocation.main', fontSize: 'var(--IpSourceMenu-icon-width)' }} />
      ipgeolocation
    </>
  );
}

function IpQualityScoreOption() {
  return (
    <>
      <IpQualityScoreIcon sx={{ fontSize: 'var(--IpSourceMenu-icon-width)' }} />
      <span><IpQualityScoreEm>IP</IpQualityScoreEm>QS</span>
    </>
  );
}

const IpQualityScoreEm = styled('em')(({ theme }) => ({
  fontStyle: 'normal',
  color: theme.vars.palette.ipQualityScore.main,
}));
