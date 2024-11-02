import { codecovNextJSWebpackPlugin } from '@codecov/nextjs-webpack-plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

// Config
const nextConfig: NextConfig = {
  webpack(config: NextConfig, options) {
    config.plugins.push(
      codecovNextJSWebpackPlugin({
        enableBundleAnalysis: !!process.env.CODECOV_TOKEN,
        bundleName: 'palantir',
        uploadToken: process.env.CODECOV_TOKEN,
        webpack: options.webpack,
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
];

export default plugins.reduce((cfg, plugin) => plugin(cfg), nextConfig);
