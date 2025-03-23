'use client';

import { MapDrawerContext } from '@/components/map/map-drawer.context';
import { grey } from '@mui/material/colors';
import { styled, useTheme } from '@mui/material/styles';
import { m, useAnimate, useTransform } from 'motion/react';
import { type ReactNode, use, useCallback, useEffect, useState } from 'react';
import { MapContext } from './map.context';

// Constants
const DRAWER_WIDTH = 408;

// Component
export interface MapDrawerContainerProps {
  readonly children: ReactNode;
}

export default function MapDrawer({ children }: MapDrawerContainerProps) {
  // Open state
  const [isOpen, setOpen] = useState(false);

  const openDrawer = useCallback(() => setOpen(true), []);
  const closeDrawer = useCallback(() => setOpen(false), []);

  // Animation
  const [,animate] = useAnimate();
  const theme = useTheme();
  const { camera } = use(MapContext);

  useEffect(() => {
    if (isOpen) {
      animate(camera.padding.left, DRAWER_WIDTH, { duration: theme.transitions.duration.enteringScreen / 1000 });
    } else {
      animate(camera.padding.left, 0, { duration: theme.transitions.duration.leavingScreen / 1000 });
    }
  }, [animate, isOpen, camera.padding.left, theme.transitions.duration.enteringScreen, theme.transitions.duration.leavingScreen]);

  // Render
  const left = useTransform(camera.padding.left, (v) => v - DRAWER_WIDTH);

  return (
    <MapDrawerContext value={{ openDrawer, closeDrawer }}>
      <Container style={{ left }} aria-hidden={!isOpen}>
        { children }
      </Container>
    </MapDrawerContext>
  );
}

// Utils
const Container = m.create(styled('main')(({ theme }) => [
  {
    position: 'absolute',
    top: 0,
    zIndex: theme.vars.zIndex.drawer,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: DRAWER_WIDTH,
    overflow: 'auto',
    backgroundColor: grey[50],
    borderRight: `1px solid ${theme.vars.palette.divider}`,
  },
  theme.applyStyles('dark', {
    backgroundColor: theme.vars.palette.background.paper,
  })
]));
