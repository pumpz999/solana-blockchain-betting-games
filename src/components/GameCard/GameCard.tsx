import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './GameCard.module.css';
import { GameConfig } from '@/types/GameTypes';

interface GameCardProps {
  game: GameConfig;
  onPlay: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onPlay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className={styles.gameCard}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 10px 30px rgba(0, 255, 255, 0.3)'
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className={styles.cardContent}>
        <motion.div 
          className={styles.gameIcon}
          animate={{ 
            rotate: isHovered ? [0, 10, -10, 0] : 0,
            transition: { duration: 0.5 }
          }}
        >
          {/* Game Icon or Image */}
        </motion.div>
        
        <h3 className={styles.gameTitle}>{game.name}</h3>
        
        <motion.div 
          className={styles.gameDetails}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            y: isHovered ? 0 : 20 
          }}
        >
          <p>{game.description}</p>
          <div className={styles.gameStats}>
            <span>Min Bet: {game.minBet}</span>
            <span>Max Bet: {game.maxBet}</span>
          </div>
        </motion.div>

        {isHovered && (
          <motion.button 
            className={styles.playButton}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPlay}
          >
            Play Now
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default GameCard;
