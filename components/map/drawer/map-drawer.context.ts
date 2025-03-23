import { createContext } from 'react';

// Types
export interface MapDrawerContextProps {
  readonly mode: 'mobile' | 'desktop';
  readonly openDrawer: () => void;
  readonly closeDrawer: () => void;
  readonly setHeaderHeight: (height: number) => void;
}

export const MapDrawerContext = createContext<MapDrawerContextProps>({
  mode: 'desktop',
  openDrawer: () => null,
  closeDrawer: () => null,
  setHeaderHeight: () => null,
});
