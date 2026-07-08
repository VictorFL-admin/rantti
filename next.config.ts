import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    taint: true,
  },
  async rewrites() {
    // En producción, netlify.toml maneja los redirects a nivel CDN (IPs distribuidas)
    // En dev, Next.js proxia a localhost
    if (process.env.NODE_ENV !== 'development') return [];

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
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
