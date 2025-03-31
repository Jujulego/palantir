'use client';

import { MapDrawerContext } from '@/components/map/drawer/map-drawer.context';
import { mergeSx } from '@/lib/utils/mui';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import { styled, type SxProps, type Theme } from '@mui/material/styles';
import { type ReactNode, type Touch, type TouchEvent, use, useCallback, useEffect, useRef } from 'react';

// Component
export interface MapDrawerHeaderProps {
  readonly children: ReactNode;
  readonly sx?: SxProps<Theme>;
}

export default function MapDrawerHeader({ children, sx }: MapDrawerHeaderProps) {
  const { mode, setState, setHeaderHeight } = use(MapDrawerContext);

  // Drag state
  const initialDragState = useRef({ touchId: 0, touchX: 0, touchY: 0 });

  const handleTouchStart = useCallback((event: TouchEvent) => {
    const touch = event.changedTouches[0];
    initialDragState.current = {
      touchId: touch.identifier,
      touchX: touch.clientX,
      touchY: touch.clientY,
    };
  }, []);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    let touch: Touch | null = null;
    for (let i = 0; i < event.changedTouches.length; i++) {
      if (event.changedTouches.item(i).identifier === initialDragState.current.touchId) {
        touch = event.changedTouches.item(i);
        break;
      }
    }

    if (touch) {
      const dx = touch.clientX - initialDragState.current.touchX;
      const dy = touch.clientY - initialDragState.current.touchY;

      if (Math.abs(dy) > 3 && Math.abs(dy) > Math.abs(dx)) {
        if (dy < 0) {
          setState('opened');
        } else {
          setState('reduced');
        }
      }
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
      ref={containerRef}
      onTouchStart={mode === 'mobile' ? handleTouchStart : undefined}
      onTouchMove={mode === 'mobile' ? handleTouchMove : undefined}
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
