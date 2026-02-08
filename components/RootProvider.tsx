import MotionProvider from '@/components/motion/MotionProvider';
import MuiProvider from '@/components/mui/MuiProvider';
import type { ReactNode } from 'react';

export interface RootProviderProps {
  readonly children: ReactNode;
}

export default function RootProvider({ children }: RootProviderProps) {
  return (
    <MuiProvider>
      <MotionProvider>
        { children }
      </MotionProvider>
    </MuiProvider>
  );
}
