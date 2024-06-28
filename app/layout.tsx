import { CssBaseline } from '@mui/material';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

import theme from '@/src/theme';

export const metadata: Metadata = {
  title: "Palantir",
  description: "View location of others",
};

export interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <CssVarsProvider theme={theme}>
            <CssBaseline />
            { children }
          </CssVarsProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
