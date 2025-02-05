/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: [
      'image.pollinations.ai',
      'pollinations.ai',
      'https://image.pollinations.ai'
    ],
  },
  async headers() {
    return [
      {
        source: '/webcontainer',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  }
};

export default nextConfig;