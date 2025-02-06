import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

export class WalletConnector {
  private web3auth: Web3Auth;

  constructor() {
    this.web3auth = new Web3Auth({
      clientId: process.env.WEB3AUTH_CLIENT_ID || '',
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x1", // Ethereum Mainnet
        rpcTarget: "https://mainnet.infura.io/v3/YOUR_PROJECT_ID"
      },
      web3AuthNetwork: "mainnet"
    });

    const openloginAdapter = new OpenloginAdapter();
    this.web3auth.configureAdapter(openloginAdapter);
  }

  async connectWallet() {
    await this.web3auth.initModal();
    const provider = await this.web3auth.connect();
    return provider;
  }

  async disconnectWallet() {
    await this.web3auth.logout();
  }
}
