import { codecovNextJSWebpackPlugin } from '@codecov/nextjs-webpack-plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import { pipe$ } from 'kyrielle';
import type { NextConfig } from 'next';

// Config
const nextConfig: NextConfig = {
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
  webpack: (config, options) => {
    config.plugins.push(
      codecovNextJSWebpackPlugin({
        enableBundleAnalysis: !!process.env.CODECOV_TOKEN,
        bundleName: 'palantir',
        uploadToken: process.env.CODECOV_TOKEN,
        webpack: options.webpack,
      }),
    );

    return config;
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
    disableLogger: true,
    reactComponentAnnotation: {
      enabled: true,
    },
    silent: true,
    widenClientFileUpload: true,
  })
);
