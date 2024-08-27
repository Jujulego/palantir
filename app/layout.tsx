import { UserProvider } from '@auth0/nextjs-auth0/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
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
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />

          <UserProvider>
            { children }
          </UserProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>

      <Analytics />
      <SpeedInsights />
    </body>
    </html>
  );
}
