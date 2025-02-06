import Web3 from 'web3';
import { ethers } from 'ethers';
import TronWeb from '@tronweb3/tronweb';
import { Connection, PublicKey } from '@solana/web3.js';

export class BlockchainConnector {
  static async connectBinance() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        return provider.getSigner();
      } catch (error) {
        console.error("Binance Connection Error:", error);
      }
    }
  }

  static async connectAvalanche() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0xA86A',
            chainName: 'Avalanche Testnet',
            nativeCurrency: {
              name: 'AVAX',
              symbol: 'AVAX',
              decimals: 18
            },
            rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc']
          }]
        });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        return provider.getSigner();
      } catch (error) {
        console.error("Avalanche Connection Error:", error);
      }
    }
  }

  static async connectTron() {
    if (window.tronLink) {
      try {
        await window.tronLink.request({ method: 'tron_requestAccounts' });
        const tronWeb = new TronWeb({
          fullHost: 'https://nile.trongrid.io',
          privateKey: window.tronLink.tronWeb.defaultPrivateKey
        });
        return tronWeb;
      } catch (error) {
        console.error("Tron Connection Error:", error);
      }
    }
  }

  static async connectSolana() {
    try {
      const { solana } = window;
      if (!solana) {
        alert('Solana wallet not found!');
        return null;
      }

      const response = await solana.connect();
      const connection = new Connection('https://api.devnet.solana.com');
      return {
        publicKey: response.publicKey,
        connection
      };
    } catch (err) {
      console.error("Solana Connection Error:", err);
    }
  }
}
