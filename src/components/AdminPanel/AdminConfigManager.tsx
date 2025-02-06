import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import styles from './AdminConfigManager.module.css';

// Comprehensive Admin Configuration Interface
interface AdminConfiguration {
  // Platform Global Settings
  platformName: string;
  platformLogo: string;
  supportedChains: string[];
  
  // Game Configuration
  games: {
    [gameType: string]: {
      name: string;
      minBet: number;
      maxBet: number;
      enabled: boolean;
      houseEdge: number;
      maxMultiplier: number;
    }
  };

  // Financial Settings
  financialSettings: {
    withdrawalFee: number;
    depositFee: number;
    minimumDeposit: number;
    maximumWithdrawal: number;
  };

  // Security Settings
  securitySettings: {
    twoFactorAuthentication: boolean;
    ipWhitelist: string[];
    suspiciousActivityThreshold: number;
  };

  // Blockchain Specific Configurations
  blockchainConfigs: {
    [chain: string]: {
      rpcUrl: string;
      chainId: number;
      explorerUrl: string;
      nativeToken: string;
    }
  };
}

const DEFAULT_CONFIG: AdminConfiguration = {
  platformName: 'Blockchain Gaming Platform',
  platformLogo: '/default-logo.png',
  supportedChains: ['Ethereum', 'Binance', 'Solana', 'Avalanche'],
  
  games: {
    coinFlip: {
      name: 'Coin Flip',
      minBet: 0.01,
      maxBet: 10,
      enabled: true,
      houseEdge: 2,
      maxMultiplier: 2
    },
    diceRoll: {
      name: 'Dice Roll',
      minBet: 0.05,
      maxBet: 5,
      enabled: true,
      houseEdge: 3,
      maxMultiplier: 6
    }
  },

  financialSettings: {
    withdrawalFee: 0.5,
    depositFee: 0.1,
    minimumDeposit: 0.01,
    maximumWithdrawal: 100
  },

  securitySettings: {
    twoFactorAuthentication: false,
    ipWhitelist: [],
    suspiciousActivityThreshold: 5
  },

  blockchainConfigs: {
    Ethereum: {
      rpcUrl: 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID',
      chainId: 1,
      explorerUrl: 'https://etherscan.io',
      nativeToken: 'ETH'
    },
    Binance: {
      rpcUrl: 'https://bsc-dataseed.binance.org/',
      chainId: 56,
      explorerUrl: 'https://bscscan.com',
      nativeToken: 'BNB'
    }
  }
};

const AdminConfigManager: React.FC = () => {
  const [config, setConfig] = useState<AdminConfiguration>(DEFAULT_CONFIG);
  const [activeSection, setActiveSection] = useState<string>('platform');

  // Blockchain Contract Integration (Placeholder)
  const updateBlockchainConfig = async () => {
    try {
      // Implement blockchain contract update logic
      console.log('Updating blockchain configuration');
    } catch (error) {
      console.error('Configuration update failed', error);
    }
  };

  const renderPlatformSettings = () => (
    <div className={styles.configSection}>
      <h2>Platform Settings</h2>
      <div className={styles.inputGroup}>
        <label>Platform Name</label>
        <input 
          type="text" 
          value={config.platformName}
          onChange={(e) => setConfig(prev => ({
            ...prev, 
            platformName: e.target.value
          }))}
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Platform Logo URL</label>
        <input 
          type="text" 
          value={config.platformLogo}
          onChange={(e) => setConfig(prev => ({
            ...prev, 
            platformLogo: e.target.value
          }))}
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Supported Chains</label>
        <select 
          multiple 
          value={config.supportedChains}
          onChange={(e) => {
            const selected = Array.from(e.target.selectedOptions, option => option.value);
            setConfig(prev => ({
              ...prev, 
              supportedChains: selected
            }));
          }}
        >
          {['Ethereum', 'Binance', 'Solana', 'Avalanche', 'Polygon'].map(chain => (
            <option key={chain} value={chain}>{chain}</option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderGameSettings = () => (
    <div className={styles.configSection}>
      <h2>Game Configurations</h2>
      {Object.entries(config.games).map(([gameKey, game]) => (
        <div key={gameKey} className={styles.gameConfig}>
          <h3>{game.name}</h3>
          <div className={styles.inputGroup}>
            <label>Minimum Bet</label>
            <input 
              type="number" 
              value={game.minBet}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                games: {
                  ...prev.games,
                  [gameKey]: {
                    ...prev.games[gameKey],
                    minBet: Number(e.target.value)
                  }
                }
              }))}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Maximum Bet</label>
            <input 
              type="number" 
              value={game.maxBet}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                games: {
                  ...prev.games,
                  [gameKey]: {
                    ...prev.games[gameKey],
                    maxBet: Number(e.target.value)
                  }
                }
              }))}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Enabled</label>
            <input 
              type="checkbox" 
              checked={game.enabled}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                games: {
                  ...prev.games,
                  [gameKey]: {
                    ...prev.games[gameKey],
                    enabled: e.target.checked
                  }
                }
              }))}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderFinancialSettings = () => (
    <div className={styles.configSection}>
      <h2>Financial Configuration</h2>
      <div className={styles.inputGroup}>
        <label>Withdrawal Fee (%)</label>
        <input 
          type="number" 
          value={config.financialSettings.withdrawalFee}
          onChange={(e) => setConfig(prev => ({
            ...prev,
            financialSettings: {
              ...prev.financialSettings,
              withdrawalFee: Number(e.target.value)
            }
          }))}
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Deposit Fee (%)</label>
        <input 
          type="number" 
          value={config.financialSettings.depositFee}
          onChange={(e) => setConfig(prev => ({
            ...prev,
            financialSettings: {
              ...prev.financialSettings,
              depositFee: Number(e.target.value)
            }
          }))}
        />
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className={styles.configSection}>
      <h2>Security Configuration</h2>
      <div className={styles.inputGroup}>
        <label>Two-Factor Authentication</label>
        <input 
          type="checkbox" 
          checked={config.securitySettings.twoFactorAuthentication}
          onChange={(e) => setConfig(prev => ({
            ...prev,
            securitySettings: {
              ...prev.securitySettings,
              twoFactorAuthentication: e.target.checked
            }
          }))}
        />
      </div>
      <div className={styles.inputGroup}>
        <label>IP Whitelist</label>
        <textarea 
          value={config.securitySettings.ipWhitelist.join('\n')}
          onChange={(e) => setConfig(prev => ({
            ...prev,
            securitySettings: {
              ...prev.securitySettings,
              ipWhitelist: e.target.value.split('\n')
            }
          }))}
        />
      </div>
    </div>
  );

  const renderBlockchainSettings = () => (
    <div className={styles.configSection}>
      <h2>Blockchain Configurations</h2>
      {Object.entries(config.blockchainConfigs).map(([chainKey, chainConfig]) => (
        <div key={chainKey} className={styles.blockchainConfig}>
          <h3>{chainKey}</h3>
          <div className={styles.inputGroup}>
            <label>RPC URL</label>
            <input 
              type="text" 
              value={chainConfig.rpcUrl}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                blockchainConfigs: {
                  ...prev.blockchainConfigs,
                  [chainKey]: {
                    ...prev.blockchainConfigs[chainKey],
                    rpcUrl: e.target.value
                  }
                }
              }))}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Chain ID</label>
            <input 
              type="number" 
              value={chainConfig.chainId}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                blockchainConfigs: {
                  ...prev.blockchainConfigs,
                  [chainKey]: {
                    ...prev.blockchainConfigs[chainKey],
                    chainId: Number(e.target.value)
                  }
                }
              }))}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const saveConfiguration = async () => {
    try {
      // Validate configuration
      // Update blockchain contracts
      await updateBlockchainConfig();
      
      // Store configuration in local storage or blockchain
      localStorage.setItem('platformConfig', JSON.stringify(config));
      
      alert('Configuration saved successfully!');
    } catch (error) {
      console.error('Configuration save failed', error);
      alert('Failed to save configuration');
    }
  };

  return (
    <div className={styles.adminPanel}>
      <div className={styles.sidebar}>
        <button onClick={() => setActiveSection('platform')}>
          Platform Settings
        </button>
        <button onClick={() => setActiveSection('games')}>
          Game Configuration
        </button>
        <button onClick={() => setActiveSection('financial')}>
          Financial Settings
        </button>
        <button onClick={() => setActiveSection('security')}>
          Security Configuration
        </button>
        <button onClick={() => setActiveSection('blockchain')}>
          Blockchain Settings
        </button>
      </div>

      <div className={styles.configContent}>
        {activeSection === 'platform' && renderPlatformSettings()}
        {activeSection === 'games' && renderGameSettings()}
        {activeSection === 'financial' && renderFinancialSettings()}
        {activeSection === 'security' && renderSecuritySettings()}
        {activeSection === 'blockchain' && renderBlockchainSettings()}

        <div className={styles.actionButtons}>
          <button onClick={saveConfiguration}>
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminConfigManager;
