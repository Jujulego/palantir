import RootProvider from '@/components/RootProvider';
import theme from '@/theme';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';

// Constants
const APP_NAME = 'Palantir';
const TITLE = 'Palantir';
const DESCRIPTION = 'One map to locate them all';

// Layout
export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body style={{ overflow: 'hidden' }}>
      <meta name="google-site-verification" content="uT8DmsLqvM0YmnXh2shq6iGTQHk-bdS4LhQamFK0CrY" />
      <InitColorSchemeScript attribute="class" />

      <RootProvider>
        { children }
      </RootProvider>

      <Analytics />
      <SpeedInsights />
    </body>
    </html>
  );
}

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: TITLE,
    template: `${TITLE} - %s`,
  },
  formatDetection: {
    telephone: false,
  },
  description: DESCRIPTION,

  appleWebApp: {
    capable: true,
    statusBarStyle: 'black',
    title: TITLE,
  },

  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: TITLE,
      template: `${TITLE} - %s`,
    },
    description: DESCRIPTION,
  },

  twitter: {
    card: 'summary',
    title: {
      default: TITLE,
      template: `${TITLE} - %s`,
    },
    description: DESCRIPTION,
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
