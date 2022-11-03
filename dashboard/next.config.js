/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // NOTE: the appDir presented too many issues to develop quickly
  // experimental: {
  //   appDir: true,
  // },
};

module.exports = nextConfig;
