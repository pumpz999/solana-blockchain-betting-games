'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CyberBackground from '@/components/3DBackground/CyberBackground';
import GameCard from '@/components/GameCard/GameCard';
import { useGameStore } from '@/stores/GameStore';
import { GameCategory, GameConfig } from '@/types/GameTypes';

const INITIAL_GAMES: GameConfig[] = [
  {
    id: 'coin-flip',
    name: 'Cyber Coin Flip',
    description: 'Predict the digital coin in the metaverse',
    category: GameCategory.CASINO,
    difficulty: 'Easy',
    minBet: 0.01,
    maxBet: 10,
    houseEdge: 2,
    supportedChains: ['solana', 'ethereum']
  },
  {
    id: 'crypto-roulette',
    name: 'Crypto Roulette',
    description: 'Spin the blockchain wheel of fortune',
    category: GameCategory.CASINO,
    difficulty: 'Medium',
    minBet: 0.1,
    maxBet: 50,
    houseEdge: 5,
    supportedChains: ['polygon', 'binance']
  }
];

export default function GameDashboard() {
  const { availableGames, addGame } = useGameStore();
  const [selectedCategory, setSelectedCategory] = useState<GameCategory | null>(null);

  React.useEffect(() => {
    // Add initial games to store
    INITIAL_GAMES.forEach(addGame);
  }, []);

  const filteredGames = selectedCategory 
    ? availableGames.filter(game => game.category === selectedCategory)
    : availableGames;

  return (
    <div className="game-dashboard">
      <CyberBackground />
      
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="dashboard-header"
      >
        <h1>Cyber Gaming Platform</h1>
        
        <div className="category-selector">
          {Object.values(GameCategory).map(category => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(
                selectedCategory === category ? null : category
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={selectedCategory === category ? 'active' : ''}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div 
        className="game-grid"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        animate="show"
      >
        {filteredGames.map(game => (
          <GameCard 
            key={game.id} 
            game={game} 
            onPlay={() => {/* Implement game start logic */}}
          />
        ))}
      </motion.div>
    </div>
  );
}
