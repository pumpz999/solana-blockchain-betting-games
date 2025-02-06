import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    ethereum_mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    },
    ethereum_testnet: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: process.env.TESTNET_PRIVATE_KEY ? [process.env.TESTNET_PRIVATE_KEY] : []
    }
  }
};

export default config;
