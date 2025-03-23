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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Open state
  const [isOpen, setOpen] = useState(false);

  const openDrawer = useCallback(() => setOpen(true), []);
  const closeDrawer = useCallback(() => setOpen(false), []);

  // Animation
  const { camera } = use(MapContext);
  const [,animate] = useAnimate();

  const [headerHeight, setHeaderHeight] = useState(0);
  
  const top = useMotionValue('0px');
  const left = useMotionValue(`${-DRAWER_WIDTH}px`);

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
    if (isOpen) {
      const duration = theme.transitions.duration.enteringScreen / 1000;

      if (isMobile) {
        camera.padding.left.set(0);
        animate(camera.padding.bottom, headerHeight, { duration });
      } else {
        camera.padding.bottom.set(0);
        animate(camera.padding.left, DRAWER_WIDTH, { duration });
      }
    } else {
      const duration = theme.transitions.duration.leavingScreen / 1000;

      if (isMobile) {
        camera.padding.left.set(0);
        animate(camera.padding.bottom, 0, { duration });
      } else {
        camera.padding.bottom.set(0);
        animate(camera.padding.left, 0, { duration });
      }
    }
  }, [animate, isOpen, camera.padding.left, theme.transitions.duration.enteringScreen, theme.transitions.duration.leavingScreen, isMobile, camera.padding.bottom, headerHeight]);

  // Render
  return (
    <MapDrawerContext
      value={{
        mode: isMobile ? 'mobile' : 'desktop',
        openDrawer,
        closeDrawer,
        setHeaderHeight
      }}
    >
      <Root
        aria-hidden={!isOpen}
        style={{ top, left, height: isMobile ? headerHeight : '100%' }}
      >
        <Surface>
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
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    top: '100%',
    width: '100%',
  },
  [theme.breakpoints.up('sm')]: {
    width: DRAWER_WIDTH,
  }
}));

const Surface = styled(m.div)(({ theme }) => [
  {
    display: 'flex',
    flexDirection: 'column',
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
