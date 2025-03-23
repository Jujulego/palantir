import { motionValue, type MotionValue } from 'motion/react';
import { createContext } from 'react';

// Types
export interface MapDrawerContextProps {
  readonly mode: 'mobile' | 'desktop';
  readonly dragPosition: MotionValue<number>;
  readonly dragLimit: number;
  readonly openDrawer: () => void;
  readonly closeDrawer: () => void;
  readonly setDrawerHeight: (height: number) => void;
  readonly setHeaderHeight: (height: number) => void;
}

export const MapDrawerContext = createContext<MapDrawerContextProps>({
  mode: 'desktop',
  dragPosition: motionValue(0),
  dragLimit: 0,
  openDrawer: () => null,
  closeDrawer: () => null,
  setDrawerHeight: () => null,
  setHeaderHeight: () => null,
});
