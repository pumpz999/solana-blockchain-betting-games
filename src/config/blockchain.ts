export const BLOCKCHAIN_NETWORKS = {
  ethereum: {
    mainnet: {
      chainId: 1,
      name: 'Ethereum Mainnet',
      rpcUrl: 'https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}',
      blockExplorer: 'https://etherscan.io'
    },
    testnet: {
      chainId: 5,
      name: 'Goerli Testnet',
      rpcUrl: 'https://goerli.infura.io/v3/${INFURA_PROJECT_ID}',
      blockExplorer: 'https://goerli.etherscan.io'
    }
  },
  solana: {
    mainnet: {
      cluster: 'mainnet-beta',
      rpcUrl: 'https://api.mainnet-beta.solana.com',
      blockExplorer: 'https://solscan.io'
    },
    testnet: {
      cluster: 'devnet',
      rpcUrl: 'https://api.devnet.solana.com',
      blockExplorer: 'https://explorer.solana.com'
    }
  }
}

export const SUPPORTED_CHAINS = [
  'ethereum_mainnet',
  'ethereum_testnet',
  'solana_mainnet',
  'solana_testnet'
]
