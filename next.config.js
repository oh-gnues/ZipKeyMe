/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa')({
  dest: 'public'
})

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"]
    });
    return config;
  }
}

module.exports = withPlugins([withPWA], nextConfig);
