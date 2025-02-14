'use client';

import IpDataIcon from '@/components/icons/IpDataIcon';
import IpInfoIcon from '@/components/icons/IpInfoIcon';
import IpQualityScoreIcon from '@/components/icons/IpQualityScoreIcon';
import CloudIcon from '@mui/icons-material/Cloud';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlaceIcon from '@mui/icons-material/Place';
import ButtonBase from '@mui/material/ButtonBase';
import Skeleton from '@mui/material/Skeleton';
import { styled, type SxProps, type Theme } from '@mui/material/styles';
import { useSelectedLayoutSegment } from 'next/navigation';
import type { ReactNode } from 'react';

// Component
export interface IpSourceMenuProps {
  readonly sx?: SxProps<Theme>
}

export default function IpSourceMenu({ sx }: IpSourceMenuProps) {
  const source = useSelectedLayoutSegment() ?? '';

  return (
    <TriggerButton sx={sx}>
      { options[source] ?? <Skeleton variant="rounded" height={20} width={80} /> }
      <ExpandMoreIcon fontSize="small" />
    </TriggerButton>
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
