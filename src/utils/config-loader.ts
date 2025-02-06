import { ConfigurationService } from '../services/ConfigurationService';

export function loadPlatformConfiguration() {
  const config = ConfigurationService.getConfiguration();

  // Set environment variables dynamically
  Object.entries(config.integrations).forEach(([key, value]) => {
    process.env[`NEXT_PUBLIC_${key.toUpperCase()}`] = value;
  });

  // Set blockchain configuration
  process.env.NEXT_PUBLIC_NETWORK = config.blockchain.network;
  process.env.NEXT_PUBLIC_RPC_URL = config.blockchain.rpcUrl;

  return config;
}
