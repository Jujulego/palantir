'use client';

import { MapDrawerContext } from '@/components/map/drawer/map-drawer.context';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { type ReactNode, type Touch, type TouchEvent, use, useCallback, useEffect, useRef } from 'react';

// Component
export interface MapDrawerHeaderProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export default function MapDrawerHeader({ children, className }: MapDrawerHeaderProps) {
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
    <div
      ref={containerRef}
      className={clsx('relative select-none', { 'touch-none': mode === 'mobile' }, className)}
      onTouchStart={mode === 'mobile' ? handleTouchStart : undefined}
      onTouchMove={mode === 'mobile' ? handleTouchMove : undefined}
    >
      { mode === 'mobile' && <Grab /> }
      { children }
    </div>
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
