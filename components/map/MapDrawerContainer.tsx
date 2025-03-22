import { MapDrawerContext } from '@/components/map/map-drawer.context';
import { grey } from '@mui/material/colors';
import { styled, useTheme } from '@mui/material/styles';
import { m, type MotionValue, useAnimate, useTransform } from 'motion/react';
import { type ReactNode, useCallback, useEffect, useState } from 'react';

// Constants
const DRAWER_WIDTH = 408;

// Component
export interface MapDrawerContainerProps {
  readonly children: ReactNode;
  readonly leftPadding: MotionValue<number>;
}

export default function MapDrawerContainer({ children, leftPadding }: MapDrawerContainerProps) {
  // Open state
  const [isOpen, setOpen] = useState(false);

  const openDrawer = useCallback(() => setOpen(true), []);
  const closeDrawer = useCallback(() => setOpen(false), []);

  // Animation
  const [,animate] = useAnimate();
  const theme = useTheme();

  useEffect(() => {
    if (isOpen) {
      animate(leftPadding, DRAWER_WIDTH, { duration: theme.transitions.duration.enteringScreen / 1000 });
    } else {
      animate(leftPadding, 0, { duration: theme.transitions.duration.leavingScreen / 1000 });
    }
  }, [animate, isOpen, leftPadding, theme.transitions.duration.enteringScreen, theme.transitions.duration.leavingScreen]);

  // Render
  const left = useTransform(leftPadding, (v) => v - DRAWER_WIDTH);

  return (
    <MapDrawerContext value={{ openDrawer, closeDrawer }}>
      <Container style={{ left }}>
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
    height: '100%',
    width: DRAWER_WIDTH,
    backgroundColor: grey[50],
    borderRight: `1px solid ${theme.vars.palette.divider}`,
  },
  theme.applyStyles('dark', {
    backgroundColor: theme.vars.palette.background.paper,
  })
]));
