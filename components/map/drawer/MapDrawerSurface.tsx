'use client';

import { MapDrawerContext } from '@/components/map/drawer/map-drawer.context';
import { grey } from '@mui/material/colors';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { m, useAnimate, useMotionValue, useTransform } from 'motion/react';
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
  const theme = useTheme();
  const [,animate] = useAnimate();

  const openDuration = theme.transitions.duration.enteringScreen / 1000;
  const closeDuration = theme.transitions.duration.enteringScreen / 1000;

  // State
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isOpen, setIsOpen] = useState(false);

  const dragPosition = useMotionValue(0);
  const transform = useTransform(dragPosition, (v) => `translateY(-${v}px)`);

  // Animation
  const [drawerHeight, setDrawerHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const dragLimit = drawerHeight - headerHeight;

  const top = useMotionValue('0px');
  const left = useMotionValue(`${-DRAWER_WIDTH}px`);
  const height = useMotionValue('100%');

  useEffect(() => {
    if (isMobile) {
      top.set(`calc(100% - ${camera.padding.bottom.get()}px)`);
      return camera.padding.bottom.on('change', (v) => top.set(`calc(100% - ${v}px)`));
    } else {
      top.set('0px');
    }
  }, [camera.padding.bottom, isMobile, top]);
  
  useEffect(() => {
    if (isMobile) {
      left.set('0px');
    } else {
      left.set(`${camera.padding.left.get() - DRAWER_WIDTH}px`);
      return camera.padding.left.on('change', (v) => left.set(`${v - DRAWER_WIDTH}px`));
    }
  }, [camera.padding.left, isMobile, left]);

  useEffect(() => {
    if (isMobile) {
      height.set(`${headerHeight}px`);
    } else {
      height.set('100%');
    }
  }, [headerHeight, height, isMobile]);

  useEffect(() => {
    if (isMobile) {
      dragPosition.set(Math.min(dragPosition.get(), dragLimit));
    } else {
      dragPosition.set(0);
    }
  }, [animate, dragLimit, dragPosition, isMobile]);

  const openDrawer = useCallback(() => {
    setIsOpen(true);

    if (isMobile) {
      camera.padding.left.set(0);
      animate(camera.padding.bottom, headerHeight, { duration: openDuration });
    } else {
      camera.padding.bottom.set(0);
      animate(camera.padding.left, DRAWER_WIDTH, { duration: openDuration });
    }
  }, [animate, camera.padding.bottom, camera.padding.left, headerHeight, isMobile, openDuration]);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);

    if (isMobile) {
      camera.padding.left.set(0);
      animate(camera.padding.bottom, 0, { duration: closeDuration });
    } else {
      camera.padding.bottom.set(0);
      animate(camera.padding.left, 0, { duration: closeDuration });
    }
  }, [animate, camera.padding.bottom, camera.padding.left, closeDuration, isMobile]);

  // Render
  return (
    <MapDrawerContext
      value={{
        mode: isMobile ? 'mobile' : 'desktop',
        dragPosition,
        dragLimit,
        openDrawer,
        closeDrawer,
        setDrawerHeight,
        setHeaderHeight,
      }}
    >
      <Root
        aria-hidden={!isOpen}
        style={{ top, left, height }}
      >
        <Surface style={{ transform }}>
          { children }
        </Surface>
      </Root>
    </MapDrawerContext>
  );
}

// Utils
const Root = styled(m.main)(({ theme }) => ({
  position: 'absolute',
  zIndex: theme.vars.zIndex.drawer,
  [theme.breakpoints.down('sm')]: {
    top: '100%',
    width: '100%',
  },
  [theme.breakpoints.up('sm')]: {
    width: DRAWER_WIDTH,
    overflow: 'hidden',
  }
}));

const Surface = styled(m.div)(({ theme }) => [
  {
    width: '100%',
    overflow: 'auto',
    backgroundColor: grey[50],
    [theme.breakpoints.down('sm')]: {
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      boxShadow: theme.vars.shadows[2],
    },
    [theme.breakpoints.up('sm')]: {
      height: '100%',
      borderRight: `1px solid ${theme.vars.palette.divider}`,
    }
  },
  theme.applyStyles('dark', {
    backgroundColor: theme.vars.palette.background.paper,
  })
]);
