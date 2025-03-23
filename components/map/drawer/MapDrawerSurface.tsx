'use client';

import { MapDrawerContext } from '@/components/map/drawer/map-drawer.context';
import { grey } from '@mui/material/colors';
import { styled, useTheme } from '@mui/material/styles';
import { m, useAnimate, useTransform } from 'motion/react';
import { type ReactNode, use, useCallback, useEffect, useState } from 'react';
import { MapContext } from '../map.context';
import useMediaQuery from '@mui/material/useMediaQuery';

// Constants
const DRAWER_WIDTH = 408;

// Component
export interface MapDrawerContainerProps {
  readonly children: ReactNode;
}

export default function MapDrawerSurface({ children }: MapDrawerContainerProps) {
  const theme = useTheme();

  // Open state
  const [isOpen, setOpen] = useState(false);

  const openDrawer = useCallback(() => setOpen(true), []);
  const closeDrawer = useCallback(() => setOpen(false), []);

  // Mode
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Animation
  const { camera } = use(MapContext);
  const [,animate] = useAnimate();

  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const duration = theme.transitions.duration.enteringScreen / 1000;

      if (isMobile) {
        camera.padding.left.set(0);
        animate(camera.padding.bottom, headerHeight, { duration });
      } else {
        animate(camera.padding.left, DRAWER_WIDTH, { duration });
        camera.padding.bottom.set(0);
      }
    } else {
      const duration = theme.transitions.duration.leavingScreen / 1000;

      if (isMobile) {
        camera.padding.left.set(0);
        animate(camera.padding.bottom, 0, { duration });
      } else {
        animate(camera.padding.left, 0, { duration });
        camera.padding.bottom.set(0);
      }
    }
  }, [animate, isOpen, camera.padding.left, theme.transitions.duration.enteringScreen, theme.transitions.duration.leavingScreen, isMobile, camera.padding.bottom, headerHeight]);

  // Render
  const top = useTransform(camera.padding.bottom, (v) => `calc(100vh - ${v}px)`);
  const left = useTransform(camera.padding.left, (v) => v - DRAWER_WIDTH);

  return (
    <MapDrawerContext
      value={{
        mode: isMobile ? 'mobile' : 'desktop',
        openDrawer,
        closeDrawer,
        setHeaderHeight
      }}
    >
      <Surface
        aria-hidden={!isOpen}
        style={isMobile ? { top, left: 0 } : { top: 0, left }}
      >
        { children }
      </Surface>
    </MapDrawerContext>
  );
}

// Utils
const Surface = m.create(styled('main')(({ theme }) => [
  {
    position: 'absolute',
    zIndex: theme.vars.zIndex.drawer,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    backgroundColor: grey[50],
    borderRight: `1px solid ${theme.vars.palette.divider}`,
    [theme.breakpoints.down('sm')]: {
      top: '100vh',
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      width: DRAWER_WIDTH,
      height: '100%'
    }
  },
  theme.applyStyles('dark', {
    backgroundColor: theme.vars.palette.background.paper,
  })
]));
