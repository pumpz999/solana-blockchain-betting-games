import React, { useState } from 'react';
import { useWallet } from '../../contexts/WalletContext';
import styles from './AdminPanel.module.css';

const ADMIN_WALLET = '0xYOUR_ADMIN_WALLET_ADDRESS'; // Replace with actual admin wallet

const AdminPanel: React.FC = () => {
  const { wallet, connectWallet } = useWallet();
  const [selectedChain, setSelectedChain] = useState<string | null>(null);
  const [gameSettings, setGameSettings] = useState({
    minBet: 0,
    maxBet: 0,
    adminFeePercentage: 10
  });

  const isAdmin = wallet && wallet.address.toLowerCase() === ADMIN_WALLET.toLowerCase();

  const handleChainSelect = (chain: string) => {
    setSelectedChain(chain);
  };

  const updateGameSettings = () => {
    // Implement blockchain-specific game setting updates
    console.log('Updating game settings for', selectedChain, gameSettings);
  };

  const withdrawFunds = async () => {
    if (!isAdmin) {
      alert('Only admin can withdraw funds');
      return;
    }

    try {
      // Implement withdrawal logic for each blockchain
      switch (selectedChain) {
        case 'Binance':
          // Implement BSC withdrawal
          break;
        case 'Solana':
          // Implement Solana withdrawal
          break;
        case 'Avalanche':
          // Implement Avalanche withdrawal
          break;
        case 'Tron':
          // Implement Tron withdrawal
          break;
      }
    } catch (error) {
      console.error('Withdrawal Error:', error);
    }
  };

  if (!isAdmin) {
    return (
      <div className={styles.adminPanel}>
        <h2>Admin Access Required</h2>
        <p>Please connect with the admin wallet to access this panel.</p>
      </div>
    );
  }

  return (
    <div className={styles.adminPanel}>
      <h2>Admin Dashboard</h2>
      
      <div className={styles.chainSelector}>
        {['Solana', 'Binance', 'Avalanche', 'Tron'].map(chain => (
          <button 
            key={chain}
            onClick={() => handleChainSelect(chain)}
            className={selectedChain === chain ? styles.selected : ''}
          >
            {chain}
          </button>
        ))}
      </div>

      {selectedChain && (
        <div className={styles.gameSettings}>
          <h3>{selectedChain} Game Settings</h3>
          <div className={styles.settingGroup}>
            <label>Minimum Bet</label>
            <input 
              type="number" 
              value={gameSettings.minBet}
              onChange={(e) => setGameSettings({
                ...gameSettings, 
                minBet: Number(e.target.value)
              })}
            />
          </div>
          <div className={styles.settingGroup}>
            <label>Maximum Bet</label>
            <input 
              type="number" 
              value={gameSettings.maxBet}
              onChange={(e) => setGameSettings({
                ...gameSettings, 
                maxBet: Number(e.target.value)
              })}
            />
          </div>
          <div className={styles.settingGroup}>
            <label>Admin Fee (%)</label>
            <input 
              type="number" 
              value={gameSettings.adminFeePercentage}
              onChange={(e) => setGameSettings({
                ...gameSettings, 
                adminFeePercentage: Number(e.target.value)
              })}
            />
          </div>

          <div className={styles.actionButtons}>
            <button onClick={updateGameSettings}>
              Update Game Settings
            </button>
            <button onClick={withdrawFunds}>
              Withdraw Funds
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
