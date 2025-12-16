/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true, // ✅ THIS FIXES THE 403 ERROR
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
