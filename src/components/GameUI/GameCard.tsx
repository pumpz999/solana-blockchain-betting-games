import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './GameCard.module.css';

interface GameCardProps {
  title: string;
  description: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const GameCard: React.FC<GameCardProps> = ({ 
  title, 
  description, 
  icon, 
  difficulty 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className={styles.gameCard}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className={styles.cardContent}>
        <img 
          src={icon} 
          alt={title} 
          className={styles.gameIcon} 
        />
        <h3>{title}</h3>
        <p>{description}</p>
        <div className={styles.difficultyIndicator}>
          <span 
            className={`${styles.difficulty} ${styles[difficulty]}`}
          >
            {difficulty.toUpperCase()}
          </span>
        </div>
        {isHovered && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.playButton}
          >
            Play Now
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default GameCard;
