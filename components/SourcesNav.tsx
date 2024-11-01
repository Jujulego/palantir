'use client';

import IpDataIcon from '@/components/icons/IpDataIcon';
import IpInfoIcon from '@/components/icons/IpInfoIcon';
import IpQualityScoreIcon from '@/components/icons/IpQualityScoreIcon';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import type { ReactElement, ReactNode } from 'react';

// Component
export default function SourcesNav() {
  return <Box component="nav" sx={{ display: 'flex', flexWrap: 'wrap', px: 2, pt: 1, gap: 1 }}>
    <LinkChip sourceId="ip-info" label="IPinfo" icon={<IpInfoIcon />}  />
    <LinkChip sourceId="ip-quality-score" label={<><span style={{ color: '#F43A3A' }}>IP</span>QS</>} icon={<IpQualityScoreIcon />} />
    <LinkChip sourceId="ip-geolocation" label="ipgeolocation"  />
    <LinkChip sourceId="ip-data" label="ipdata" icon={<IpDataIcon />}  />
    <LinkChip sourceId="big-data-cloud" label="BigDataCloud" />
  </Box>;
}

// Utils
interface LinkChipProps {
  readonly sourceId: string;
  readonly label: ReactNode;
  readonly icon?: ReactElement;
}

function LinkChip({ sourceId, label, icon }: LinkChipProps) {
  const selected = useSelectedLayoutSegment();

  return <Chip
    component={Link} href={sourceId} prefetch
    label={label} icon={icon}
    clickable size="small"
    variant={selected === sourceId ? 'filled' : 'outlined'}
  />;
}
