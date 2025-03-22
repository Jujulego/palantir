import { createContext } from 'react';

// Types
export interface MapDrawerContextProps {
  readonly openDrawer: () => void;
  readonly closeDrawer: () => void;
}

export const MapDrawerContext = createContext<MapDrawerContextProps>({
  openDrawer: () => null,
  closeDrawer: () => null,
});