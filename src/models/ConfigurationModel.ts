export interface BlockchainConfig {
  network: string;
  rpcUrl: string;
  chainId: number;
  explorerUrl: string;
}

export interface GameConfig {
  minBet: number;
  maxBet: number;
  houseEdge: number;
  enabledGames: string[];
}

export interface SecurityConfig {
  twoFactorEnabled: boolean;
  ipWhitelist: string[];
  maxLoginAttempts: number;
}

export interface PlatformConfiguration {
  blockchain: BlockchainConfig;
  games: GameConfig;
  security: SecurityConfig;
  integrations: {
    web3AuthClientId: string;
    sentryDsn: string;
    infuraProjectId: string;
  };
}

export const DEFAULT_CONFIG: PlatformConfiguration = {
  blockchain: {
    network: 'ethereum_testnet',
    rpcUrl: 'https://goerli.infura.io/v3/',
    chainId: 5,
    explorerUrl: 'https://goerli.etherscan.io'
  },
  games: {
    minBet: 0.01,
    maxBet: 10,
    houseEdge: 2,
    enabledGames: ['coin_flip', 'dice_roll']
  },
  security: {
    twoFactorEnabled: false,
    ipWhitelist: [],
    maxLoginAttempts: 5
  },
  integrations: {
    web3AuthClientId: '',
    sentryDsn: '',
    infuraProjectId: ''
  }
}
