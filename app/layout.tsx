import theme from '@/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { ThemeProvider } from '@mui/material/styles';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Palantir",
  description: "View location of others",
};

export interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body>
      <InitColorSchemeScript attribute="class" />
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />

          { children }
        </ThemeProvider>
      </AppRouterCacheProvider>

      <Analytics />
      <SpeedInsights />
    </body>
    </html>
  );
}
