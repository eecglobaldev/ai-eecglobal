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
  trailingSlash: true,
  // Explicitly expose environment variables to ensure they're available at build time
  env: {
    NEXT_PUBLIC_GEMINI_API_KEY_USA_VISA: process.env.NEXT_PUBLIC_GEMINI_API_KEY_USA_VISA,
    NEXT_PUBLIC_GEMINI_API_KEY_AUSTRALIA_GS: process.env.NEXT_PUBLIC_GEMINI_API_KEY_AUSTRALIA_GS,
    NEXT_PUBLIC_GEMINI_API_KEY_NZ_VISA: process.env.NEXT_PUBLIC_GEMINI_API_KEY_NZ_VISA,
    NEXT_PUBLIC_GEMINI_API_KEY_UK_PRECAS: process.env.NEXT_PUBLIC_GEMINI_API_KEY_UK_PRECAS,
    NEXT_PUBLIC_GEMINI_API_KEY_CAREER_COUNSELOR: process.env.NEXT_PUBLIC_GEMINI_API_KEY_CAREER_COUNSELOR,
    NEXT_PUBLIC_GEMINI_API_KEY_TRAVEL_AGENT: process.env.NEXT_PUBLIC_GEMINI_API_KEY_TRAVEL_AGENT,
    NEXT_PUBLIC_GEMINI_API_KEY_REVIEW: process.env.NEXT_PUBLIC_GEMINI_API_KEY_REVIEW,
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(self), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
