// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true, // ✅ Keeps your 403 fix
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,

  // Force correct Content-Type for sitemap.xml
  async headers() {
    return [
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml; charset=utf-8',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
