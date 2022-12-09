/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://app-pet-api-6jjd.vercel.app/:path*'
      }
    ]
  }
}

module.exports = nextConfig
