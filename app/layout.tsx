import MuiProvider from '@/components/MuiProvider';
import theme from '@/theme';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { domAnimation, LazyMotion } from 'motion/react';
import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

// Layout
export interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body style={{ overflow: 'hidden' }}>
      <meta name="google-site-verification" content="uT8DmsLqvM0YmnXh2shq6iGTQHk-bdS4LhQamFK0CrY" />
      <InitColorSchemeScript attribute="class" />

      <MuiProvider>
        <LazyMotion features={domAnimation} strict>
          { children }
        </LazyMotion>
      </MuiProvider>

      <Analytics />
      <SpeedInsights />
    </body>
    </html>
  );
}

export const metadata: Metadata = {
  description: 'One map to locate them all',
  openGraph: {
    siteName: 'Palantir',
    description: 'One map to locate them all',
  }
};

export const viewport: Viewport = {
  themeColor: [
    {
      media: '(prefers-color-scheme: light)',
      color: theme.colorSchemes['light']!.palette.primary.dark,
    },
    {
      media: '(prefers-color-scheme: dark)',
      color: theme.colorSchemes['dark']!.palette.background.paper,
    },
  ]
};
