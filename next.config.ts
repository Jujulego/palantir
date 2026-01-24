import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import { pipe$ } from 'kyrielle';
import type { NextConfig } from 'next';

// Config
const nextConfig: NextConfig = {
  reactCompiler: true,
  compiler: {
    define: {
      __RRWEB_EXCLUDE_IFRAME__: 'true',
      __RRWEB_EXCLUDE_SHADOW_DOM__: 'true',
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's.gravatar.com',
        pathname: '/avatar/**'
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
        pathname: '/**'
      },
    ]
  },
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    }
  },
};

// Plugins
export default pipe$(
  nextConfig,
  withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true'
  }),
  (config) => withSentryConfig(config, {
    org: 'jujulego',
    project: 'palantir',

    authToken: process.env.SENTRY_AUTH_TOKEN,
    silent: true,
    widenClientFileUpload: true,
    webpack: {
      reactComponentAnnotation: {
        enabled: true
      },
      treeshake: {
        removeDebugLogging: true
      },
    }
  })
);
