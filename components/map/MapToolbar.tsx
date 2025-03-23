'use client';

import { mergeSx } from '@/lib/utils/mui';
import { useTheme } from '@mui/material/styles';
import type { ToolbarProps } from '@mui/material/Toolbar';
import Toolbar from '@mui/material/Toolbar';
import { use, useEffect } from 'react';
import { MapContext } from './map.context';

// Component
export type MapToolbarProps = Omit<ToolbarProps, 'disableGutters'>

export default function MapToolbar({ children, sx, ...rest }: MapToolbarProps) {
  const { camera } = use(MapContext);
  const theme = useTheme();
  
  useEffect(() => {
    camera.padding.top.set(64);

    return () => camera.padding.top.set(0);
  }, [camera.padding.top]);
  
  return (
    <Toolbar
      {...rest}
      disableGutters
      sx={mergeSx({
        flexShrink: 0,
        zIndex: 'appBar',
        pl: 1.5,
        pr: 2.5,
        py: 1,
        pointerEvents: 'none',

        '& > *': {
          pointerEvents: 'auto',
        },

        [theme.breakpoints.down('sm')]: {
          pr: 1.5,
          gap: 2,
        }
      }, sx)}
    >
      { children }
    </Toolbar>
  );
}
