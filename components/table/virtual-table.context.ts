import { createContext, type ReactNode } from 'react';

export const VirtualTableContext = createContext<VirtualTableContextProps>({
  isVirtual: false,
  columnLayout: [],
});

// Types
export interface VirtualTableContextProps {
  readonly isVirtual: boolean;
  readonly columnLayout: readonly string[];
  readonly headerRow?: ReactNode;
  readonly headerSize?: number;
}