/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['www.mirrormedia.mg'],
  },
}

module.exports = nextConfig
