/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'placehold.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Exclude scripts directory from build
    config.module.rules.push({
      test: /scripts\/.*\.ts$/,
      use: 'ignore-loader'
    });
    return config;
  }
}

module.exports = nextConfig 