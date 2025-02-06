import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import GamePlatformABI from '../../../contracts/GamePlatform.json';
import styles from './UserDashboard.module.css';

const PLATFORM_CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';

const UserDashboard: React.FC = () => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [userGameHistory, setUserGameHistory] = useState<any[]>([]);
  const [gameConfig, setGameConfig] = useState({
    minBet: 0,
    maxBet: 0,
    isPaused: false
  });

  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState('0');

  const gameTypes = [
    'Coin Flip', 
    'Dice Roll', 
    'Number Guess', 
    'Rock Paper Scissors', 
    'Wheel of Fortune'
  ];

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
        
        // Fetch platform config
        const config = await platformContract.platformConfig();
        setGameConfig({
          minBet: config.minBet.toNumber(),
          maxBet: config.maxBet.toNumber(),
          isPaused: config.isPaused
        });

        // Fetch user game history
        const userAddress = await signer.getAddress();
        const history = await platformContract.getPlayerGameHistory(userAddress);
        setUserGameHistory(history);
      }
    };

    initContract();
  }, []);

  const playGame = async () => {
    if (!contract || selectedGame === null) return;

    try {
      const tx = await contract.playGame(selectedGame, {
        value: ethers.utils.parseEther(betAmount)
      });
      const receipt = await tx.wait();
      
      // Refresh game history
      const signer = contract.signer;
      const userAddress = await signer.getAddress();
      const history = await contract.getPlayerGameHistory(userAddress);
      setUserGameHistory(history);

      alert('Game played successfully!');
    } catch (error) {
      console.error('Game play failed:', error);
      alert('Failed to play game');
    }
  };

  return (
    <div className={styles.userDashboard}>
      <section className={styles.gamePlay}>
        <h2>Play Games</h2>
        {gameConfig.isPaused ? (
          <div className={styles.pausedNotice}>
            Platform is currently paused
          </div>
        ) : (
          <>
            <div className={styles.gameSelector}>
              {gameTypes.map((game, index) => (
                <button 
                  key={game}
                  className={selectedGame === index ? styles.selected : ''}
                  onClick={() => setSelectedGame(index)}
                >
                  {game}
                </button>
              ))}
            </div>

            {selectedGame !== null && (
              <div className={styles.betSection}>
                <input 
                  type="number" 
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  placeholder="Enter bet amount (ETH)"
                  min={ethers.utils.formatEther(gameConfig.minBet)}
                  max={ethers.utils.formatEther(gameConfig.maxBet)}
                />
                <button onClick={playGame}>
                  Play {gameTypes[selectedGame]}
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <section className={styles.gameHistory}>
        <h2>Game History</h2>
        <table>
          <thead>
            <tr>
              <th>Game Type</th>
              <th>Bet Amount</th>
              <th>Timestamp</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {userGameHistory.map((session, index) => (
              <tr key={index}>
                <td>{gameTypes[session.gameType]}</td>
                <td>{ethers.utils.formatEther(session.betAmount)} ETH</td>
                <td>{new Date(session.timestamp * 1000).toLocaleString()}</td>
                <td>{session.isWinner ? 'Won' : 'Lost'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default UserDashboard;
