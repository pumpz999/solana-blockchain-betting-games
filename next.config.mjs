/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly use App Router
  experimental: {
    appDir: true,
  },
  // Disable strict mode if causing issues
  reactStrictMode: false,
  // Webpack configuration
  webpack: (config) => {
    // Resolve common module loading issues
    config.resolve.fallback = { 
      fs: false, 
      net: false, 
      tls: false 
    };
    return config;
  },
  // Disable TypeScript type checking during build
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
