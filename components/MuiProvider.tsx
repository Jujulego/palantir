'use client';

import theme from '@/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { ReactNode } from 'react';

export interface MuiProviderProps {
  readonly children: ReactNode;
}

export default function MuiProvider({ children }: MuiProviderProps) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />

        { children }
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}