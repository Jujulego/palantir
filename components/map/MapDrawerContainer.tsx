import { grey } from '@mui/material/colors';
import { styled, useTheme } from '@mui/material/styles';
import { m, type MotionValue, useAnimate, useTransform } from 'motion/react';
import { type Ref, useEffect } from 'react';

// Constants
const DRAWER_WIDTH = 408;

// Component
export interface MapDrawerContainerProps {
  readonly ref?: Ref<HTMLDivElement | null>;
  readonly isOpen: boolean;
  readonly leftPadding: MotionValue<number>;
}

export default function MapDrawerContainer({ ref, isOpen, leftPadding }: MapDrawerContainerProps) {
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

  return <Container ref={ref} style={{ left }} />;
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
