/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['localhost', 'avatars.dicebear.com'],
  },
}

module.exports = nextConfig
