import { create } from 'zustand';
import { GameConfig, GameSession, UserGameStats } from '@/types/GameTypes';

interface GameState {
  availableGames: GameConfig[];
  userGameSessions: GameSession[];
  userGameStats: UserGameStats;
  
  addGame: (game: GameConfig) => void;
  removeGame: (gameId: string) => void;
  addGameSession: (session: GameSession) => void;
  updateUserGameStats: (stats: UserGameStats) => void;
}

export const useGameStore = create<GameState>((set) => ({
  availableGames: [],
  userGameSessions: [],
  userGameStats: {
    totalGamesPlayed: 0,
    totalWinAmount: 0,
    totalLossAmount: 0,
    winRate: 0
  },

  addGame: (game) => set((state) => ({
    availableGames: [...state.availableGames, game]
  })),

  removeGame: (gameId) => set((state) => ({
    availableGames: state.availableGames.filter(game => game.id !== gameId)
  })),

  addGameSession: (session) => set((state) => {
    const newSessions = [...state.userGameSessions, session];
    
    // Update game stats
    const stats: UserGameStats = {
      totalGamesPlayed: newSessions.length,
      totalWinAmount: newSessions
        .filter(s => s.result === 'WIN')
        .reduce((sum, s) => sum + s.payout, 0),
      totalLossAmount: newSessions
        .filter(s => s.result === 'LOSS')
        .reduce((sum, s) => sum + s.betAmount, 0),
      winRate: newSessions.filter(s => s.result === 'WIN').length / newSessions.length
    };

    return {
      userGameSessions: newSessions,
      userGameStats: stats
    };
  }),

  updateUserGameStats: (stats) => set({ userGameStats: stats })
}));
