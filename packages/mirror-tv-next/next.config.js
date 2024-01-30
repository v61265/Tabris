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
  webpack: (config, { isServer }) => {
    config.resolve.alias['~'] = path.join(__dirname, 'src');
    return config;
  },
}

module.exports = nextConfig
