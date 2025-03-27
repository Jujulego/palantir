'use client';

import { MapDrawerContext } from '@/components/map/drawer/map-drawer.context';
import { grey } from '@mui/material/colors';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { m, useAnimate, useMotionValue } from 'motion/react';
import { type ReactNode, use, useCallback, useEffect, useState } from 'react';
import { MapContext } from '../map.context';

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
  const [isOpen, setIsOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Values
  const dragPosition = useMotionValue(0);
  const height = useMotionValue('100%');
  const left = useMotionValue(`${-DRAWER_WIDTH}px`);

  useEffect(() => {
    if (isMobile) {
      left.set('0px');
      camera.padding.left.set(0);
    } else {
      if (isOpen) {
        animate(left, '0px', { duration: openDuration });
        animate(camera.padding.left, DRAWER_WIDTH, { duration: openDuration });
      } else {
        animate(left, `${-DRAWER_WIDTH}px`, { duration: closeDuration });
        animate(camera.padding.left, 0, { duration: closeDuration });
      }
    }
  }, [animate, camera.padding.left, closeDuration, isMobile, isOpen, left, openDuration]);

  useEffect(() => {
    if (isMobile) {
      if (isOpen) {
        animate(height, `${headerHeight + dragPosition.get()}px`, { duration: openDuration });
        animate(camera.padding.bottom, headerHeight + dragPosition.get(), { duration: openDuration });

        return dragPosition.on('change', (dp) => {
          height.set(`${headerHeight + dp}px`);
          camera.padding.bottom.set(headerHeight + dp);
        });
      } else {
        animate(height, '0px', { duration: closeDuration });
        animate(camera.padding.bottom, 0, { duration: closeDuration });
      }
    } else {
      dragPosition.set(0);
      height.set('100%');
      camera.padding.bottom.set(0);
    }
  }, [animate, camera.padding.bottom, closeDuration, dragPosition, headerHeight, height, isMobile, isOpen, openDuration]);

  // Handlers
  const openDrawer = useCallback(() => setIsOpen(true), []);
  const closeDrawer = useCallback(() => setIsOpen(false), []);

  // Render
  return (
    <MapDrawerContext
      value={{
        mode: isMobile ? 'mobile' : 'desktop',
        dragPosition,
        openDrawer,
        closeDrawer,
        setHeaderHeight,
      }}
    >
      <Root
        aria-hidden={!isOpen}
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