'use client';

import { grey } from '@mui/material/colors';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Transition } from 'motion';
import { m, useAnimate, useMotionValue, useTransform } from 'motion/react';
import { type ReactNode, use, useEffect, useRef, useState } from 'react';
import { MapContext } from '../map.context';
import { MapDrawerContext, type MapDrawerState } from './map-drawer.context';

// Constants
const DRAWER_WIDTH = 408;

// Component
export interface MapDrawerContainerProps {
  readonly children: ReactNode;
}

export default function MapDrawerSurface({ children }: MapDrawerContainerProps) {
  const { camera } = use(MapContext);
  const [,animate] = useAnimate();

  const theme = useTheme();
  const openDuration = theme.transitions.duration.enteringScreen / 1000;
  const closeDuration = theme.transitions.duration.enteringScreen / 1000;

  // State
  const [state, setState] = useState<MapDrawerState>('closed');
  const [headerHeight, setHeaderHeight] = useState(0);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Values
  const fullHeight = useTransform<number, number>(
    [camera.height, camera.width, camera.padding.top],
    ([height, width, top]) => height - ((width * 9 / 16) + top)
  );
  const height = useMotionValue('100%');
  const left = useMotionValue(`${-DRAWER_WIDTH}px`);

  useEffect(() => {
    if (isMobile) {
      left.set('0px');
      camera.padding.left.set(0);
    } else {
      if (state === 'closed') {
        animate(left, `${-DRAWER_WIDTH}px`, { duration: closeDuration });
        animate(camera.padding.left, 0, { duration: closeDuration });
      } else {
        animate(left, '0px', { duration: openDuration });
        animate(camera.padding.left, DRAWER_WIDTH, { duration: openDuration });
      }
    }
  }, [animate, camera.padding.left, closeDuration, isMobile, left, openDuration, state]);

  const previousMobileState = useRef<MapDrawerState>('closed');

  useEffect(() => {
    if (isMobile) {
      const openOptions: Transition = previousMobileState.current === 'closed'
        ? { duration: openDuration }
        : { duration: openDuration * 5, type: 'spring' };

      if (state === 'closed') {
        animate(height, '0px', { duration: closeDuration });
        animate(camera.padding.bottom, 0, { duration: closeDuration });
      } else if (state === 'reduced') {
        animate(height, `${headerHeight}px`, openOptions);
        animate(camera.padding.bottom, headerHeight, openOptions);
      } else {
        animate(height, `${fullHeight.get()}px`, openOptions);
        animate(camera.padding.bottom, fullHeight.get(), openOptions);
      }
    } else {
      height.set('100%');
      camera.padding.bottom.set(0);
    }

    previousMobileState.current = state;
  }, [animate, camera.padding.bottom, closeDuration, fullHeight, headerHeight, height, isMobile, openDuration, state]);

  // Render
  return (
    <MapDrawerContext
      value={{
        mode: isMobile ? 'mobile' : 'desktop',
        state,
        setHeaderHeight,
        setState,
      }}
    >
      <Root
        aria-hidden={state === 'closed'}
        style={{ left, height }}
      >
        { children }
      </Root>
    </MapDrawerContext>
  );
}

// Utils
const Root = styled(m.main)(({ theme }) => [
  {
    position: 'absolute',
    bottom: 0,
    zIndex: theme.vars.zIndex.drawer,
    overflow: 'hidden',
    backgroundColor: grey[50],
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      boxShadow: theme.vars.shadows[2],
    },
    [theme.breakpoints.up('sm')]: {
      width: DRAWER_WIDTH,
      borderRight: `1px solid ${theme.vars.palette.divider}`,
    }
  },
  theme.applyStyles('dark', {
    backgroundColor: theme.vars.palette.background.paper,
  })
]);