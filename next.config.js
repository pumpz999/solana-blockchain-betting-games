/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use App Router
  experimental: {},
  
  // Webpack configuration
  webpack: (config) => {
    config.resolve.fallback = { 
      fs: false, 
      net: false, 
      tls: false 
    };
    return config;
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true
  }
};

module.exports = nextConfig;
