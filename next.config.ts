import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Match any API request starting with /api
        destination: 'http://localhost:5000/api/:path*', // Proxy to the backend server
      },
    ];
  },
};

export default nextConfig;
