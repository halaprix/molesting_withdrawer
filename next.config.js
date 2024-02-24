/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  images: {
    domains: [
      "raw.githubusercontent.com",
      "assets.coingecko.com",
      "tokens.1inch.io",
      "assets.smold.app"
    ],
  },
};

module.exports = nextConfig;
