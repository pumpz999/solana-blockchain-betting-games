/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly use App Router
  experimental: {
    appDir: true,
  },
  
  // Prevent conflicts
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  // Disable strict mode if causing issues
  reactStrictMode: false,
  
  // Webpack configuration
  webpack: (config) => {
    config.resolve.fallback = { 
      fs: false, 
      net: false, 
      tls: false 
    };
    return config;
  }
};

module.exports = nextConfig;
