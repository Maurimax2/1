import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so the site can be served directly from GitHub Pages (maurimax.store)
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Mirror the tsconfig "@/*" path alias for the bundler.
  webpack(config) {
    config.resolve.alias = { ...config.resolve.alias, '@': root };
    return config;
  },
  turbopack: {
    resolveAlias: { '@/*': './*' },
  },
};

export default nextConfig;
