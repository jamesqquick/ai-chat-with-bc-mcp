import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/s.mkswft.com/**',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cdn11.bigcommerce.com',
        pathname: '/s-zlsqoiifzz/images/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn11.bigcommerce.com',
        pathname: '/s-g6lsxzp4eh/images/**',
      },
    ],
  },
};

export default nextConfig;
