import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

// Config
const nextConfig: NextConfig = {
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
const plugins = [
  withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true'
  }),
  (config: NextConfig) => withSentryConfig(config, {
    org: 'jujulego',
    project: 'palantir',

    authToken: process.env.SENTRY_AUTH_TOKEN,
    disableLogger: true,
    reactComponentAnnotation: {
      enabled: true,
    },
    silent: !process.env.CI,
    widenClientFileUpload: true,
  }),
];

export default plugins.reduce((cfg, plugin) => plugin(cfg), nextConfig);
