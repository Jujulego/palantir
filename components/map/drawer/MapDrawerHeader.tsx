'use client';

import { MapDrawerContext } from '@/components/map/drawer/map-drawer.context';
import { mergeSx } from '@/lib/utils/mui';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import { styled, type SxProps, type Theme } from '@mui/material/styles';
import { m, PanInfo } from 'motion/react';
import { type ReactNode, use, useCallback, useEffect, useRef } from 'react';

// Component
export interface MapDrawerHeaderProps {
  readonly children: ReactNode;
  readonly sx?: SxProps<Theme>;
}

export default function MapDrawerHeader({ children, sx }: MapDrawerHeaderProps) {
  const { mode, setState, setHeaderHeight } = use(MapDrawerContext);

  // Drag state
  const handlePan = useCallback((_: unknown, info: PanInfo) => {
    if (info.offset.y > 0) {
      setState('reduced');
    } else if (info.offset.y < 0) {
      setState('opened');
    }
  }, [setState]);

  // Track container height
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Initial size
    const container = containerRef.current;
    setHeaderHeight(container.clientHeight);

    // Track resizes
    const observer = new ResizeObserver(() => {
      setHeaderHeight(container.clientHeight);
    });
    observer.observe(container);
    
    return () => {
      observer.disconnect();
      setHeaderHeight(0);
    };
  }, [setHeaderHeight]);

  // Render
  return (
    <Box
      component={m.div}
      ref={containerRef}
      onPan={mode === 'mobile' ? handlePan : undefined}
      sx={mergeSx(sx, {
        position: 'relative',
        userSelect: 'none',
        touchAction: mode === 'mobile' ? 'none' : undefined,
      })}
    >
      { mode === 'mobile' && <Grab /> }
      { children }
    </Box>
  );
}

// Elements
const Grab = styled('div')(({ theme }) => [
  {
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 21px)',
    height: 8,
    width: 42,
    borderRadius: 4,
    backgroundColor: grey[300],
  },
  theme.applyStyles('dark', {
    backgroundColor: theme.vars.palette.background.paper,
  })
]);
