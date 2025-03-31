import { motionValue, type MotionValue } from 'motion/react';
import { createContext } from 'react';

// Types
export interface MapDrawerContextProps {
  readonly mode: 'mobile' | 'desktop';
  readonly dragLimit: MotionValue<number>;
  readonly dragPosition: MotionValue<number>;
  readonly openDrawer: () => void;
  readonly closeDrawer: () => void;
  readonly setHeaderHeight: (height: number) => void;
}

export const MapDrawerContext = createContext<MapDrawerContextProps>({
  mode: 'desktop',
  dragLimit: motionValue(0),
  dragPosition: motionValue(0),
  openDrawer: () => null,
  closeDrawer: () => null,
  setHeaderHeight: () => null,
});
