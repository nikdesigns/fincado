const nextConfig = {
  output: 'export',
  trailingSlash: true, // ✅ THIS FIXES THE 403 ERROR
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.fincado.com',
          },
        ],
        destination: 'https://fincado.com/:path*',
        permanent: true,
      },
    ];
  },
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

module.exports = nextConfig;
