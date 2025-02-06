// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract AdvancedGamePlatform is Ownable, ReentrancyGuard {
    // Expanded Game Types
    enum GameType {
        // Chance-Based Games
        COIN_FLIP,
        DICE_ROLL,
        NUMBER_GUESS,
        WHEEL_OF_FORTUNE,
        ROCK_PAPER_SCISSORS,
        
        // Skill-Based Games
        POKER_HAND,
        BLACKJACK,
        CRASH_GAME,
        PREDICTION_MARKET,
        
        // Unique Blockchain Games
        CRYPTO_TRADING_SIMULATOR,
        NFT_ROULETTE,
        BLOCKCHAIN_TRIVIA,
        MINING_SIMULATOR,
        DEFI_YIELD_GAME,
        
        // Multiplayer Games
        CRYPTO_CHESS,
        BLOCKCHAIN_BATTLE_ROYALE,
        TRADING_CARD_GAME
    }

    // Game Session Structure
    struct GameSession {
        address player;
        GameType gameType;
        uint256 betAmount;
        uint256 timestamp;
        bool isWinner;
        uint256 winnings;
    }

    // Game Configuration
    struct GameConfig {
        uint256 minBet;
        uint256 maxBet;
        uint256 houseEdge;
        bool isEnabled;
    }

    // Platform-wide configurations
    mapping(GameType => GameConfig) public gameConfigurations;
    mapping(address => GameSession[]) public playerGameHistory;
    mapping
