'use client';

import IpDataIcon from '@/components/icons/IpDataIcon';
import IpInfoIcon from '@/components/icons/IpInfoIcon';
import IpQualityScoreIcon from '@/components/icons/IpQualityScoreIcon';
import { parseSourceIdParam, type SourceId } from '@/data/sources';
import CloudIcon from '@mui/icons-material/Cloud';
import PlaceIcon from '@mui/icons-material/Place';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Fade from '@mui/material/Fade';
import LinearProgress from '@mui/material/LinearProgress';
import type { SxProps, Theme } from '@mui/material/styles';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type ReactElement, type ReactNode, useCallback, useMemo, useTransition } from 'react';

// Component
export default function SourcesNav() {
  const [isLoading, startLoading] = useTransition();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selected = useMemo(() => parseSourceIdParam(searchParams.getAll('source')), [searchParams]);

  const handleSelect = useCallback((sourceId: SourceId) => {
    if (selected.includes(sourceId)) {
      return;
    }
    
    const params = new URLSearchParams(searchParams);
    params.set('source', sourceId);
    
    startLoading(() => {
      router.replace(`${pathname}?${params}`);
    });
  }, [pathname, router, searchParams, selected]);
  
  return <>
    <Fade in={isLoading}>
      <LinearProgress />
    </Fade>

    <Box component="nav" sx={{ display: 'flex', flexWrap: 'wrap', px: 2, pt: 1, gap: 1 }}>
      <LinkChip
        sourceId="ip-info"
        label="IPinfo"
        selected={selected.includes('ip-info')}
        icon={<IpInfoIcon />}
        onSelect={handleSelect}
      />
      <LinkChip
        sourceId="ip-quality-score"
        label={<><em>IP</em>QS</>}
        selected={selected.includes('ip-quality-score')}
        icon={<IpQualityScoreIcon />}
        onSelect={handleSelect}
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
        selected={selected.includes('ip-geolocation')}
        icon={<PlaceIcon />}
        onSelect={handleSelect}
        sx={{ '.MuiChip-icon': { color: '#6C63FD' } }}
      />
      <LinkChip
        sourceId="big-data-cloud"
        label="BigDataCloud"
        selected={selected.includes('big-data-cloud')}
        icon={<CloudIcon />}
        onSelect={handleSelect}
        sx={{ '.MuiChip-icon': { color: '#E36327' } }}
      />
      <LinkChip
        sourceId="ip-data"
        label="ipdata"
        selected={selected.includes('ip-data')}
        icon={<IpDataIcon />}
        onSelect={handleSelect}
      />
    </Box>
  </>;
}

// Utils
interface LinkChipProps {
  readonly sourceId: SourceId;
  readonly label: ReactNode;
  readonly selected: boolean;
  readonly icon?: ReactElement;
  readonly onSelect: (sourceId: SourceId) => void;
  readonly sx?: SxProps<Theme>;
}

function LinkChip({ sourceId, label, selected, icon, onSelect, sx }: LinkChipProps) {
  const handleClick = useCallback(() => onSelect(sourceId), [onSelect, sourceId]);
  
  return <Chip
    label={label} icon={icon}
    clickable size="small"
    variant={selected ? 'filled' : 'outlined'}
    onClick={handleClick}
    sx={sx}
  />;
}
