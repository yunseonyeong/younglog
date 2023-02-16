/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['https://s3.us-west-2.amazonaws.com'],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
