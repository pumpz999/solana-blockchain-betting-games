import React, { createContext, useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';
import { Connection, PublicKey } from '@solana/web3.js';
import TronWeb from '@tronweb3/tronweb';

interface WalletContextType {
  connectWallet: (chain: string) => Promise<void>;
  disconnectWallet: () => void;
  wallet: {
    address: string;
    chain: string;
    balance: string;
  } | null;
}

const WalletContext = createContext<WalletContextType>({
  connectWallet: async () => {},
  disconnectWallet: () => {},
  wallet: null
});

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<{
    address: string;
    chain: string;
    balance: string;
  } | null>(null);

  const NETWORK_CONFIGS = {
    Solana: {
      rpcUrl: 'https://api.devnet.solana.com',
      chainId: 'devnet'
    },
    Binance: {
      rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      chainId: 97
    },
    Avalanche: {
      rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
      chainId: 43113
    },
    Tron: {
      rpcUrl: 'https://nile.trongrid.io',
      chainId: 'nile'
    }
  };

  const connectWallet = async (chain: string) => {
    try {
      let address = '';
      let balance = '';

      switch (chain) {
        case 'Solana':
          const { solana } = window as any;
          if (!solana) throw new Error('Solana wallet not found');
          
          const resp = await solana.connect();
          const connection = new Connection(NETWORK_CONFIGS.Solana.rpcUrl);
          const publicKey = resp.publicKey;
          
          address = publicKey.toString();
          const lamports = await connection.getBalance(publicKey);
          balance = (lamports / 10**9).toFixed(4) + ' SOL';
          break;

        case 'Binance':
          if (!(window as any).ethereum) throw new Error('MetaMask not found');
          
          await (window as any).ethereum.request({ 
            method: 'wallet_addEthereumChain', 
            params: [{
              chainId: '0x61',
              chainName: 'Binance Smart Chain Testnet',
              nativeCurrency: {
                name: 'tBNB',
                symbol: 'tBNB',
                decimals: 18
              },
              rpcUrls: [NETWORK_CONFIGS.Binance.rpcUrl]
            }]
          });

          const provider = new ethers.providers.Web3Provider((window as any).ethereum);
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          
          address = await signer.getAddress();
          const balance = await signer.getBalance();
          balance = ethers.utils.formatEther(balance) + ' BNB';
          break;

        case 'Avalanche':
          if (!(window as any).ethereum) throw new Error('MetaMask not found');
          
          await (window as any).ethereum.request({ 
            method: 'wallet_addEthereumChain', 
            params: [{
              chainId: '0xA869',
              chainName: 'Avalanche Testnet',
              nativeCurrency: {
                name: 'AVAX',
                symbol: 'AVAX',
                decimals: 18
              },
              rpcUrls: [NETWORK_CONFIGS.Avalanche.rpcUrl]
            }]
          });

          const avaxProvider = new ethers.providers.Web3Provider((window as any).ethereum);
          await avaxProvider.send("eth_requestAccounts", []);
          const avaxSigner = avaxProvider.getSigner();
          
          address = await avaxSigner.getAddress();
          const avaxBalance = await avaxSigner.getBalance();
          balance = ethers.utils.formatEther(avaxBalance) + ' AVAX';
          break;

        case 'Tron':
          if (!(window as any).tronLink) throw new Error('TronLink not found');
          
          const tronWeb = new TronWeb({
            fullHost: NETWORK_CONFIGS.Tron.rpcUrl,
            headers: { "TRON-PRO-API-KEY": 'YOUR_TRON_API_KEY' }
          });

          await (window as any).tronLink.request({ method: 'tron_requestAccounts' });
          
          address = (window as any).tronLink.tronWeb.defaultAddress.base58;
          const tronBalance = await tronWeb.trx.getBalance(address);
          balance = (tronBalance / 10**6).toFixed(4) + ' TRX';
          break;

        default:
          throw new Error('Unsupported blockchain');
      }

      setWallet({
        address,
        chain,
        balance
      });
    } catch (error) {
      console.error('Wallet Connection Error:', error);
      alert(`Failed to connect to ${chain} wallet: ${error.message}`);
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
  };

  return (
    <WalletContext.Provider value={{ connectWallet, disconnectWallet, wallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
