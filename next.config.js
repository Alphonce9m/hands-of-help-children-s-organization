/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable production source maps for better error tracking
  productionBrowserSourceMaps: true,
  // Configure image optimization
  images: {
    domains: ['localhost', 'placehold.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Disable image optimization in development
    unoptimized: process.env.NODE_ENV !== 'production',
  },
  // Webpack configuration
  webpack: (config, { isServer, dev }) => {
    // Exclude scripts directory from build
    config.module.rules.push({
      test: /scripts\/.*\.ts$/,
      use: 'ignore-loader'
    });

    // Increase memory for large builds
    if (!dev) {
      config.cache = false;
      config.performance = {
        ...config.performance,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
      };
    }

    return config;
  },
  // Add build optimizations
  compiler: {
    // Enable React refresh in development
    reactRemoveProperties: process.env.NODE_ENV === 'production',
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
  // Enable experimental features if needed
  experimental: {
    // Enable server components
    serverComponents: true,
    // Enable concurrent features
    workerThreads: true,
    // Enable modern JS features
    modern: true,
  },
  // Configure build output
  output: 'standalone',
}

module.exports = nextConfig