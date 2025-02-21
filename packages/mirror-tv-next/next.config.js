// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

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
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '**',
      },
    ],
  },
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, must-revalidate',
          },
        ],
      },
      {
        source: '/tag/:name',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=600, must-revalidate',
          },
        ],
      },
      {
        source: '/show/:name',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=600, must-revalidate',
          },
        ],
      },
      {
        source: '/search/:keyword',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=600, must-revalidate',
          },
        ],
      },
      {
        source: '/category/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, must-revalidate',
          },
        ],
      },
      {
        source: '/category/video',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, must-revalidate',
          },
        ],
      },
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    config.resolve.alias = {
      ...config.resolve.alias,
      '~': path.resolve(__dirname),
    }
    return config
  },
  compiler: {
    styledComponents: { displayName: true, ssr: true },
  },
}

module.exports = nextConfig
