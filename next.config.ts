import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', pathname: '/**' },
      { protocol: 'https', hostname: 'localhost', pathname: '/**' },
      {
        protocol: 'https',
        hostname: 'test-images-1256211448.cos.ap-shanghai.myqcloud.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
