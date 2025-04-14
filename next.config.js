/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.clearbit.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.google.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.gstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.zapier.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.discord.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: '*',
        pathname: '/logo*',
      },
      {
        protocol: 'https',
        hostname: '*',
        pathname: '/favicon*',
      },
      {
        protocol: 'https',
        hostname: '*',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: '*',
        pathname: '/apple-touch-icon*',
      }
    ]
  },
};

module.exports = nextConfig; 