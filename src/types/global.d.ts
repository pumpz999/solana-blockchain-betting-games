import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: {
      request: (request: { method: string }) => Promise<string[]>;
      isMetaMask?: boolean;
    };
  }
}

export {};
