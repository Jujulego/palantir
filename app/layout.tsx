import MetaThemeColor from '@/components/MetaThemeColor';
import theme from '@/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { ThemeProvider } from '@mui/material/styles';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ReactNode } from 'react';

export interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body>
      <meta name="google-site-verification" content="uT8DmsLqvM0YmnXh2shq6iGTQHk-bdS4LhQamFK0CrY" />
      <InitColorSchemeScript attribute="class" />

      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <MetaThemeColor />

          { children }
        </ThemeProvider>
      </AppRouterCacheProvider>

      <Analytics />
      <SpeedInsights />
    </body>
    </html>
  );
}
