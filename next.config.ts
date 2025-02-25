import { codecovNextJSWebpackPlugin } from '@codecov/nextjs-webpack-plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';
import { webpack } from 'next/dist/compiled/webpack/webpack';

// Config
const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    }
  },
  webpack(config: NextConfig, options) {
    config.plugins.push(
      codecovNextJSWebpackPlugin({
        enableBundleAnalysis: !!process.env.CODECOV_TOKEN,
        bundleName: 'palantir',
        uploadToken: process.env.CODECOV_TOKEN,
        webpack: options.webpack,
      }),
      new webpack.DefinePlugin({
        __RRWEB_EXCLUDE_IFRAME__: true,
      })
    );

    return config;
  }
};

// Plugins
const plugins = [
  withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true'
  }),
  (config: NextConfig) => withSentryConfig(config, {
    org: 'jujulego',
    project: 'palantir',

    automaticVercelMonitors: true,
    disableLogger: true,
    reactComponentAnnotation: {
      enabled: true,
    },
    silent: !process.env.CI,
    sourcemaps: {
      disable: !process.env.CI,
      deleteSourcemapsAfterUpload: true,
    },
    tunnelRoute: '/monitoring',
    widenClientFileUpload: !!process.env.CI,
  })
];

export default plugins.reduce((cfg, plugin) => plugin(cfg), nextConfig);
