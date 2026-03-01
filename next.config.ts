import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const apiUrl = process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
      : process.env.NEXT_PUBLIC_API_PROD_URL || 'https://api.rantti.com';

    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
      {
        source: '/sanctum/:path*',
        destination: `${apiUrl}/sanctum/:path*`,
      },
    ];
  },
};

export default nextConfig;
