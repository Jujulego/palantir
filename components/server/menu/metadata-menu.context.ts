import { createContext, type ReactNode, type TransitionStartFunction } from 'react';

// Context
export const MetadataMenuContext = createContext<MetadataMenuContextProps>({
  setSelectedNode: () => null,
  startLoading: () => null,
});

// Types
export interface MetadataMenuContextProps {
  readonly setSelectedNode: (node: ReactNode) => void;
  readonly startLoading: TransitionStartFunction;
}
