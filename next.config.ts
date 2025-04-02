/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.hyoda.kr', 'hyoda.devmine.co.kr'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.hyoda.kr',
      },
      {
        protocol: 'https',
        hostname: 'hyoda.devmine.co.kr',
      }
    ],
    unoptimized: true,  // 이미지 최적화 비활성화
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
  },
  // CORS 및 보안 헤더 설정
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        // 이미지 관련 캐시 설정
        source: '/:path*.{jpg,jpeg,png,gif,webp}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // 성능 최적화 설정
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  // 실험적 기능 설정
  experimental: {
    scrollRestoration: true,
  },
}

export default nextConfig
