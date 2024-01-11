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
    ],
  },
}

module.exports = nextConfig
