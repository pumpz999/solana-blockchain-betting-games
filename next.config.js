/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly define project structure
  experimental: {
    // Prefer App Router
    appDir: true,
    
    // Disable Pages Router if fully migrating
    // pages: false
  },

  // Configure path matching
  async rewrites() {
    return [
      // Custom route mappings
      {
        source: '/admin',
        destination: '/admin/dashboard'
      }
    ];
  },

  // Webpack performance optimization
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
