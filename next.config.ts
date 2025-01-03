import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Match any API request starting with /api
        destination: 'https://restaurant-reservation-backend-yhkl.onrender.com/api/:path*', // Proxy to the backend server
      },
    ];
  },
};

export default nextConfig;
