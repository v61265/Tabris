/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.mirrormedia.mg',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.mnews.tw',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'dev.mnews.tw',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'staging.mnews.tw',
        pathname: '**',
      },
    ],
  },
  output: 'standalone',
  webpack: (config) => {
    config.resolve.alias['~/*']
    return config
  },
}

module.exports = nextConfig
