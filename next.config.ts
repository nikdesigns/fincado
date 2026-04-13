import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true, // Fixes the 403 ERROR
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
