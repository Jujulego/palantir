import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {};

const plugins = [
  withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true'
  }),
];

export default plugins.reduce((cfg, plugin) => plugin(cfg), nextConfig);
