/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    backendUrl: process.env.NEXT_PUBLIC_BASE_URL_BACKEND,
  },
}

module.exports = nextConfig
