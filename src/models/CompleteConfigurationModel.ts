export interface PlatformConfiguration {
  // Blockchain Configurations
  blockchain: {
    networks: {
      [key: string]: {
        name: string;
        chainId: number;
        rpcUrl: string;
        explorerUrl: string;
        nativeToken: string;
      }
    };
    currentNetwork: string;
  };

  // API Integrations
  apiKeys: {
    infura: string;
    alchemy: string;
    web3Auth: string;
    sentry: string;
    amplitude: string;
    moralis: string;
    chainlink: string;
  };

  // Game Configurations
  gameSettings: {
    minBet: number;
    maxBet: number;
    houseEdge: number;
    enabledGames: string[];
    gameConfigurations: {
      [gameName: string]: {
        enabled: boolean;
        minBet: number;
        maxBet: number;
      }
    };
  };

  // Security Settings
  security: {
    twoFactorAuth: boolean;
    ipWhitelist: string[];
    maxLoginAttempts: number;
    jwtSecret: string;
  };

  // Wallet Configurations
  walletSettings: {
    supportedWallets: string[];
    defaultConnectionMethod: string;
  };

  // Monitoring and Analytics
  monitoring: {
    errorTracking: boolean;
    performanceMonitoring: boolean;
    analyticsEnabled: boolean;
  };

  // Payment Configurations
  payments: {
    supportedTokens: string[];
    withdrawalFee: number;
    minimumWithdrawal: number;
  };
}

export const DEFAULT_CONFIG: PlatformConfiguration = {
  blockchain: {
    networks: {
      ethereum_testnet: {
        name: 'Goerli Testnet',
        chainId: 5,
        rpcUrl: 'https://goerli.infura.io/v3/',
        explorerUrl: 'https://goerli.etherscan.io',
        nativeToken: 'ETH'
      },
      polygon_testnet: {
        name: 'Mumbai Testnet',
        chainId: 80001,
        rpcUrl: 'https://rpc-mumbai.maticvigil.com',
        explorerUrl: 'https://mumbai.polygonscan.com',
        nativeToken: 'MATIC'
      }
    },
    currentNetwork: 'ethereum_testnet'
  },
  apiKeys: {
    infura: '',
    alchemy: '',
    web3Auth: '',
    sentry: '',
    amplitude: '',
    moralis: '',
    chainlink: ''
  },
  gameSettings: {
    minBet: 0.01,
    maxBet: 10,
    houseEdge: 2,
    enabledGames: ['coin_flip', 'dice_roll'],
    gameConfigurations: {
      coin_flip: {
        enabled: true,
        minBet: 0.01,
        maxBet: 5
      },
      dice_roll: {
        enabled: true,
        minBet: 0.02,
        maxBet: 10
      }
    }
  },
  security: {
    twoFactorAuth: false,
    ipWhitelist: [],
    maxLoginAttempts: 5,
    jwtSecret: ''
  },
  walletSettings: {
    supportedWallets: ['metamask', 'walletconnect', 'coinbase'],
    defaultConnectionMethod: 'metamask'
  },
  monitoring: {
    errorTracking: true,
    performanceMonitoring: true,
    analyticsEnabled: true
  },
  payments: {
    supportedTokens: ['ETH', 'USDC', 'DAI'],
    withdrawalFee: 0.5,
    minimumWithdrawal: 0.1
  }
};
