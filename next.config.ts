import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'ai.eecglobal.com' },
      { hostname: 'eecglobal.com' },
      { hostname: 'firebasestorage.googleapis.com' },
      { hostname: 'flagcdn.com' }
    ],
  },
  typedRoutes: true,
};

export default nextConfig;
