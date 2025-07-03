'use client';

import theme from '@/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { domAnimation, LazyMotion } from 'motion/react';
import type { ReactNode } from 'react';

export interface RootProviderProps {
  readonly children: ReactNode;
}

export default function RootProvider({ children }: RootProviderProps) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />

        <LazyMotion features={domAnimation} strict>
          { children }
        </LazyMotion>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}