require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.19",
  networks: {
    solana: {
      url: "https://api.devnet.solana.com",
      chainId: 'devnet'
    }
  }
};
