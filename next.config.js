/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
<<<<<<< HEAD
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
=======
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    // Optimized image handling for Vercel
    domains: [
      'images.unsplash.com',
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'localhost'
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Experimental features configuration
  experimental: {
    optimizePackageImports: ['@heroicons/react'],
    esmExternals: 'loose',
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        'node_modules/@esbuild/linux-x64'
      ]
    }
  },
  // Enable TypeScript type checking in development
  typescript: {
    ignoreBuildErrors: false,
  },
  // Enable ESLint in development
  eslint: {
    ignoreDuringBuilds: true,
  },
>>>>>>> main
}

module.exports = nextConfig