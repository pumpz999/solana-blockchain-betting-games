export enum NetworkType {
  TESTNET = 'testnet',
  MAINNET = 'mainnet'
}

export interface BlockchainNetwork {
  name: string;
  chainId: number;
  rpcUrl: string;
  networkType: NetworkType;
  explorerUrl: string;
  nativeToken: string;
}

export const BLOCKCHAIN_NETWORKS: Record<string, BlockchainNetwork> = {
  // Solana Networks
  SOLANA_TESTNET: {
    name: 'Solana Devnet',
    chainId: 0,
    rpcUrl: 'https://api.devnet.solana.com',
    networkType: NetworkType.TESTNET,
    explorerUrl: 'https://explorer.solana.com?cluster=devnet',
    nativeToken: 'SOL'
  },
  SOLANA_MAINNET: {
    name: 'Solana Mainnet',
    chainId: 0,
    rpcUrl: 'https://api.mainnet-beta.solana.com',
    networkType: NetworkType.MAINNET,
    explorerUrl: 'https://explorer.solana.com',
    nativeToken: 'SOL'
  },
  
  // Ethereum Networks
  ETHEREUM_TESTNET: {
    name: 'Goerli Testnet',
    chainId: 5,
    rpcUrl: 'https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    networkType: NetworkType.TESTNET,
    explorerUrl: 'https://goerli.etherscan.io',
    nativeToken: 'ETH'
  },
  ETHEREUM_MAINNET: {
    name: 'Ethereum Mainnet',
    chainId: 1,
    rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    networkType: NetworkType.MAINNET,
    explorerUrl: 'https://etherscan.io',
    nativeToken: 'ETH'
  },

  // Polygon Networks
  POLYGON_TESTNET: {
    name: 'Mumbai Testnet',
    chainId: 80001,
    rpcUrl: 'https://rpc-mumbai.maticvigil.com',
    networkType: NetworkType.TESTNET,
    explorerUrl: 'https://mumbai.polygonscan.com',
    nativeToken: 'MATIC'
  },
  POLYGON_MAINNET: {
    name: 'Polygon Mainnet',
    chainId: 137,
    rpcUrl: 'https://polygon-rpc.com',
    networkType: NetworkType.MAINNET,
    explorerUrl: 'https://polygonscan.com',
    nativeToken: 'MATIC'
  }
}
