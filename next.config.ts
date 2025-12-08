/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ✅ STATIC EXPORT (VERY IMPORTANT)
  images: {
    unoptimized: true, // ✅ due to no Node server
  },
};

module.exports = nextConfig;
