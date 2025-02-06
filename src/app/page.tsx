'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Link from 'next/link';

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [address, setAddress] = useState('');

  const connectWallet = async () => {
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
        // Request account access
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        
        // Create provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        
        // Get wallet address
        const userAddress = accounts[0];
        setAddress(userAddress);
        setWalletConnected(true);
      } else {
        alert('Please install MetaMask!');
      }
    } catch (error) {
      console.error('Wallet connection failed', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-8">Blockchain Gaming Platform</h1>
        
        {!walletConnected ? (
          <button 
            onClick={connectWallet}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-100 transition"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="space-x-4">
            <p className="mb-4">Connected: {address.slice(0,6)}...{address.slice(-4)}</p>
            <Link 
              href="/admin" 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-100 transition"
            >
              Admin Panel
            </Link>
            <Link 
              href="/games" 
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition"
            >
              Play Games
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
