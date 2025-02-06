export enum GameCategory {
  CASINO = 'Casino',
  CRYPTO_NATIVE = 'Crypto Native',
  SKILL_BASED = 'Skill Based'
}

export enum GameDifficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium', 
  HARD = 'Hard'
}

export interface GameConfig {
  id: string;
  name: string;
  description: string;
  category: GameCategory;
  difficulty: GameDifficulty;
  minBet: number;
  maxBet: number;
  houseEdge: number;
  supportedChains: string[];
}

export interface GameSession {
  id: string;
  gameId: string;
  userId: string;
  betAmount: number;
  timestamp: number;
  result: 'WIN' | 'LOSS' | 'DRAW';
  payout: number;
}

export interface UserGameStats {
  totalGamesPlayed: number;
  totalWinAmount: number;
  totalLossAmount: number;
  winRate: number;
}
