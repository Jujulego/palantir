import MuiProvider from '@/components/MuiProvider';
import theme from '@/theme';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

// Layout
export interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body>
      <meta name="google-site-verification" content="uT8DmsLqvM0YmnXh2shq6iGTQHk-bdS4LhQamFK0CrY" />
      <InitColorSchemeScript attribute="class" />

      <MuiProvider>
        { children }
      </MuiProvider>

      <Analytics />
      <SpeedInsights />
    </body>
    </html>
  );
}

export const metadata: Metadata = {
  openGraph: {
    siteName: 'Palantir',
  }
};

export const viewport: Viewport = {
  themeColor: [
    {
      media: '(prefers-color-scheme: light)',
      color: (theme.colorSchemes['light'] ?? theme).palette.background.paper,
    },
    {
      media: '(prefers-color-scheme: dark)',
      color: (theme.colorSchemes['dark'] ?? theme).palette.background.paper,
    },
  ]
};
