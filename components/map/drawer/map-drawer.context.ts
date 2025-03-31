import { createContext, type Dispatch, type SetStateAction } from 'react';

// Types
export type MapDrawerMode = 'mobile' | 'desktop';
export type MapDrawerState = 'closed' | 'reduced' | 'opened';

export interface MapDrawerContextProps {
  readonly mode: MapDrawerMode;
  readonly state: MapDrawerState;
  readonly setHeaderHeight: (height: number) => void;
  readonly setState: Dispatch<SetStateAction<MapDrawerState>>;
}

export const MapDrawerContext = createContext<MapDrawerContextProps>({
  mode: 'desktop',
  state: 'closed',
  setHeaderHeight: () => null,
  setState: () => null,
});
