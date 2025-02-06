import { useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

export default function Home() {
  const [selectedChain, setSelectedChain] = useState('');
  const [gameType, setGameType] = useState('');
  const [betAmount, setBetAmount] = useState('');

  const connectWallet = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
  }

  const playGame = async () => {
    // Implement game logic based on selected chain and game type
    switch(selectedChain) {
      case 'binance':
        // Binance game logic
        break;
      case 'avalanche':
        // Avalanche game logic
        break;
      case 'tron':
        // Tron game logic
        break;
      case 'solana':
        // Solana game logic
        break;
    }
  }

  return (
    <div>
      <h1>Multi-Chain Blockchain Games</h1>
      <select onChange={(e) => setSelectedChain(e.target.value)}>
        <option value="">Select Blockchain</option>
        <option value="binance">Binance Smart Chain</option>
        <option value="avalanche">Avalanche</option>
        <option value="tron">Tron</option>
        <option value="solana">Solana</option>
      </select>

      {selectedChain && (
        <select onChange={(e) => setGameType(e.target.value)}>
          <option value="">Select Game</option>
          <option value="coinflip">Coin Flip</option>
          <option value="dice">Dice Roll</option>
          <option value="number">Number Guess</option>
        </select>
      )}

      <input 
        type="number" 
        placeholder="Bet Amount" 
        value={betAmount}
        onChange={(e) => setBetAmount(e.target.value)}
      />

      <button onClick={playGame}>Play Game</button>
    </div>
  )
}
