import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import GamePlatformABI from '../../../contracts/GamePlatform.json';
import styles from './AdminDashboard.module.css';

const PLATFORM_CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';

const AdminDashboard: React.FC = () => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [platformConfig, setPlatformConfig] = useState({
    minBet: 0,
    maxBet: 0,
    adminFeePercent: 0,
    isPaused: false
  });

  const [platformStats, setPlatformStats] = useState({
    gameVolumes: [0, 0, 0, 0, 0],
    totalPlatformVolume: 0
  });

  useEffect(() => {
    const initContract = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const platformContract = new ethers.Contract(
          PLATFORM_CONTRACT_ADDRESS, 
          GamePlatformABI, 
          signer
        );
        
        setContract(platformContract);
        
        // Fetch initial platform config
        const config = await platformContract.platformConfig();
        setPlatformConfig({
          minBet: config.minBet.toNumber(),
          maxBet: config.maxBet.toNumber(),
          adminFeePercent: config.adminFeePercent.toNumber(),
          isPaused: config.isPaused
        });

        // Fetch platform stats
        const stats = await platformContract.getPlatformGameStats();
        setPlatformStats({
          gameVolumes: stats.gameVolumes.map((vol: ethers.BigNumber) => vol.toNumber()),
          totalPlatformVolume: stats.totalPlatformVolume.toNumber()
        });
      }
    };

    initContract();
  }, []);

  const updatePlatformConfig = async () => {
    if (!contract) return;

    try {
      const tx = await contract.updatePlatformConfig(
        platformConfig.minBet,
        platformConfig.maxBet,
        platformConfig.adminFeePercent
      );
      await tx.wait();
      alert('Platform configuration updated successfully!');
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update platform configuration');
    }
  };

  const togglePlatformPause = async () => {
    if (!contract) return;

    try {
      const tx = await contract.togglePlatformPause();
      await tx.wait();
      setPlatformConfig(prev => ({
        ...prev,
        isPaused: !prev.isPaused
      }));
    } catch (error) {
      console.error('Pause toggle failed:', error);
    }
  };

  const withdrawAdminFunds = async () => {
    if (!contract) return;

    try {
      const tx = await contract.withdrawAdminFunds();
      await tx.wait();
      alert('Funds withdrawn successfully!');
    } catch (error) {
      console.error('Withdrawal failed:', error);
    }
  };

  return (
    <div className={styles.adminDashboard}>
      <h1>Admin Dashboard</h1>

      <section className={styles.platformConfig}>
        <h2>Platform Configuration</h2>
        <div className={styles.configGroup}>
          <label>Minimum Bet (Wei)</label>
          <input 
            type="number" 
            value={platformConfig.minBet}
            onChange={(e) => setPlatformConfig(prev => ({
              ...prev, 
              minBet: Number(e.target.value)
            }))}
          />
        </div>
        <div className={styles.configGroup}>
          <label>Maximum Bet (Wei)</label>
          <input 
            type="number" 
            value={platformConfig.maxBet}
            onChange={(e) => setPlatformConfig(prev => ({
              ...prev, 
              maxBet: Number(e.target.value)
            }))}
          />
        </div>
        <div className={styles.configGroup}>
          <label>Admin Fee (%)</label>
          <input 
            type="number" 
            value={platformConfig.adminFeePercent}
            onChange={(e) => setPlatformConfig(prev => ({
              ...prev, 
              adminFeePercent: Number(e.target.value)
            }))}
          />
        </div>

        <div className={styles.actionButtons}>
          <button onClick={updatePlatformConfig}>
            Update Configuration
          </button>
          <button 
            onClick={togglePlatformPause}
            className={platformConfig.isPaused ? styles.pauseActive : ''}
          >
            {platformConfig.isPaused ? 'Unpause Platform' : 'Pause Platform'}
          </button>
        </div>
      </section>

      <section className={styles.platformStats}>
        <h2>Platform Statistics</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Coin Flip Volume</h3>
            <p>{platformStats.gameVolumes[0]} Wei</p>
          </div>
          <div className={styles.statCard}>
            <h3>Dice Roll Volume</h3>
            <p>{platformStats.gameVolumes[1]} Wei</p>
          </div>
          <div className={styles.statCard}>
            <h3>Number Guess Volume</h3>
            <p>{platformStats.gameVolumes[2]} Wei</p>
          </div>
          <div className={styles.statCard}>
            <h3>Rock Paper Scissors Volume</h3>
            <p>{platformStats.gameVolumes[3]} Wei</p>
          </div>
          <div className={styles.statCard}>
            <h3>Wheel of Fortune Volume</h3>
            <p>{platformStats.gameVolumes[4]} Wei</p>
          </div>
        </div>
        <div className={styles.totalVolume}>
          <h3>Total Platform Volume</h3>
          <p>{platformStats.totalPlatformVolume} Wei</p>
        </div>
        <button onClick={withdrawAdminFunds}>
          Withdraw Admin Funds
        </button>
      </section>
    </div>
  );
};

export default AdminDashboard;
