import { ethers } from 'ethers';
import { Connection, PublicKey } from '@solana/web3.js';
import { BlockchainNetwork, NetworkType } from '../config/networks';

export class BlockchainConnector {
  private currentNetwork: BlockchainNetwork;

  constructor(network: BlockchainNetwork) {
    this.currentNetwork = network;
  }

  async connectWallet(): Promise<{
    address: string;
    balance: string;
    network: BlockchainNetwork
  }> {
    switch (this.currentNetwork.name) {
      case 'Solana Devnet':
      case 'Solana Mainnet':
        return this.connectSolanaWallet();
      
      case 'Goerli Testnet':
      case 'Ethereum Mainnet':
        return this.connectEthereumWallet();
      
      case 'Mumbai Testnet':
      case 'Polygon Mainnet':
        return this.connectPolygonWallet();
      
      default:
        throw new Error('Unsupported blockchain network');
    }
  }

  private async connectSolanaWallet() {
    const { solana } = window as any;
    if (!solana) throw new Error('Solana wallet not found');
    
    const resp = await solana.connect();
    const connection = new Connection(this.currentNetwork.rpcUrl);
    const publicKey = resp.publicKey;
    
    const balance = await connection.getBalance(publicKey);
    return {
      address: publicKey.toString(),
      balance: `${balance / 10**9} SOL`,
      network: this.currentNetwork
    };
  }

  private async connectEthereumWallet() {
    const { ethereum } = window as any;
    if (!ethereum) throw new Error('Ethereum wallet not found');
    
    await ethereum.request({ 
      method: 'wallet_switchEthereumChain', 
      params: [{ chainId: `0x${this.currentNetwork.chainId.toString(16)}` }]
    });

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    
    const address = await signer.getAddress();
    const balance = await signer.getBalance();
    
    return {
      address,
      balance: `${ethers.utils.formatEther(balance)} ${this.currentNetwork.nativeToken}`,
      network: this.currentNetwork
    };
  }

  private async connectPolygonWallet() {
    const { ethereum } = window as any;
    if (!ethereum) throw new Error('Polygon wallet not found');
    
    await ethereum.request({ 
      method: 'wallet_switchEthereumChain', 
      params: [{ chainId: `0x${this.currentNetwork.chainId.toString(16)}` }]
    });

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    
    const address = await signer.getAddress();
    const balance = await signer.getBalance();
    
    return {
      address,
      balance: `${ethers.utils.formatEther(balance)} ${this.currentNetwork.nativeToken}`,
      network: this.currentNetwork
    };
  }

  switchNetwork(network: BlockchainNetwork) {
    this.currentNetwork = network;
  }
}
