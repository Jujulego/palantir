import { createContext } from 'react';

// Context
export interface MapboxFocusProps {
  readonly focus: string;
  readonly setFocus: (focus: string) => void;
}

export const MapboxFocus = createContext<MapboxFocusProps>({
  focus: '',
  setFocus: () => {}
});
