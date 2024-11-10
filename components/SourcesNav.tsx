'use client';

import IpDataIcon from '@/components/icons/IpDataIcon';
import IpInfoIcon from '@/components/icons/IpInfoIcon';
import IpQualityScoreIcon from '@/components/icons/IpQualityScoreIcon';
import CloudIcon from '@mui/icons-material/Cloud';
import PlaceIcon from '@mui/icons-material/Place';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import type { SxProps, Theme } from '@mui/material/styles';
import Link from 'next/link';
import { useSearchParams, useSelectedLayoutSegment } from 'next/navigation';
import type { ReactElement, ReactNode } from 'react';

// Component
export default function SourcesNav() {
  return <Box component="nav" sx={{ display: 'flex', flexWrap: 'wrap', px: 2, pt: 1, gap: 1 }}>
    <LinkChip
      sourceId="ip-info"
      label="IPinfo"
      icon={<IpInfoIcon />}
    />
    <LinkChip
      sourceId="ip-quality-score"
      label={<><em>IP</em>QS</>}
      icon={<IpQualityScoreIcon />}
      sx={{
        em: {
          color: '#F43A3A',
          fontStyle: 'normal',
        }
      }}
    />
    <LinkChip
      sourceId="ip-geolocation"
      label="ipgeolocation"
      icon={<PlaceIcon />}
      sx={{ '.MuiChip-icon': { color: '#6C63FD' } }}
    />
    <LinkChip
      sourceId="big-data-cloud"
      label="BigDataCloud"
      icon={<CloudIcon />}
      sx={{ '.MuiChip-icon': { color: '#E36327' } }}
    />
    <LinkChip
      sourceId="ip-data"
      label="ipdata"
      icon={<IpDataIcon />}
    />
  </Box>;
}

// Utils
interface LinkChipProps {
  readonly sourceId: string;
  readonly label: ReactNode;
  readonly icon?: ReactElement;
  readonly sx?: SxProps<Theme>;
}

function LinkChip({ sourceId, label, icon, sx }: LinkChipProps) {
  const selected = useSelectedLayoutSegment();
  const searchParams = useSearchParams();

  return <Chip
    component={Link} href={`${sourceId}?${searchParams}`} prefetch
    label={label} icon={icon}
    clickable size="small"
    variant={selected === sourceId ? 'filled' : 'outlined'}
    sx={sx}
  />;
}
