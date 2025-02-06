import fs from 'fs';
import path from 'path';
import { PlatformConfiguration, DEFAULT_CONFIG } from '../models/CompleteConfigurationModel';

export class ConfigurationService {
  private static CONFIG_PATH = path.resolve(process.cwd(), 'platform-config.json');
  private static ENV_PATH = path.resolve(process.cwd(), '.env');

  static getConfiguration(): PlatformConfiguration {
    try {
      const rawConfig = fs.readFileSync(this.CONFIG_PATH, 'utf8');
      return JSON.parse(rawConfig);
    } catch {
      return DEFAULT_CONFIG;
    }
  }

  static updateConfiguration(newConfig: PlatformConfiguration) {
    // Validate configuration
    this.validateConfiguration(newConfig);

    // Write to JSON configuration file
    fs.writeFileSync(
      this.CONFIG_PATH, 
      JSON.stringify(newConfig, null, 2)
    );

    // Update environment variables
    this.updateEnvironmentFile(newConfig);

    return newConfig;
  }

  private static updateEnvironmentFile(config: PlatformConfiguration) {
    const envVariables = [
      // Blockchain Configuration
      `NEXT_PUBLIC_CURRENT_NETWORK=${config.blockchain.currentNetwork}`,
      
      // API Keys
      ...Object.entries(config.apiKeys).map(([key, value]) => 
        `NEXT_PUBLIC_${key.toUpperCase()}_API_KEY=${value}`
      ),
      
      // Game Settings
      `NEXT_PUBLIC_HOUSE_EDGE=${config.gameSettings.houseEdge}`,
      `NEXT_PUBLIC_ENABLED_GAMES=${config.gameSettings.enabledGames.join(',')}`,
      
      // Security
      `NEXT_PUBLIC_TWO_FACTOR_AUTH=${config.security.twoFactorAuth}`,
      `NEXT_PUBLIC_MAX_LOGIN_ATTEMPTS=${config.security.maxLoginAttempts}`,
      
      // Wallet Settings
      `NEXT_PUBLIC_SUPPORTED_WALLETS=${config.walletSettings.supportedWallets.join(',')}`,
      
      // Monitoring
      `NEXT_PUBLIC_ERROR_TRACKING=${config.monitoring.errorTracking}`,
      `NEXT_PUBLIC_PERFORMANCE_MONITORING=${config.monitoring.performanceMonitoring}`
    ];

    fs.writeFileSync(
      this.ENV_PATH, 
      envVariables.join('\n')
    );
  }

  private static validateConfiguration(config: PlatformConfiguration): boolean {
    const errors: string[] = [];

    // Validate API Keys
    Object.values(config.apiKeys).forEach(key => {
      if (key && key.length < 10) {
        errors.push('Invalid API key format');
      }
    });

    // Validate Game Settings
    if (config.gameSettings.houseEdge < 0 || config.gameSettings.houseEdge > 10) {
      errors.push('House edge must be between 0 and 10');
    }

    // Validate Security Settings
    if (config.security.maxLoginAttempts < 1 || config.security.maxLoginAttempts > 10) {
      errors.push('Max login attempts must be between 1 and 10');
    }

    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }

    return true;
  }
}
