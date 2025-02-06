/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Explicitly specify app directory
  experimental: {
    appDir: true
  },
  // Resolve port conflicts
  serverPort: 3000,
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

export default nextConfig;
