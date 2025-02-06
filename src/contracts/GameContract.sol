// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BlockchainGamePlatform {
    enum GameType { COIN_FLIP, DICE_ROLL, NUMBER_GUESS }
    
    struct GameSession {
        address player;
        GameType gameType;
        uint256 betAmount;
        bool isWinner;
        uint256 timestamp;
    }

    mapping(address => GameSession[]) public playerGames;
    mapping(GameType => uint256) public gameVolume;

    uint256 public constant HOUSE_EDGE = 5; // 5% house edge
    uint256 public constant MIN_BET = 0.01 ether;
    uint256 public constant MAX_BET = 10 ether;

    event GamePlayed(
        address indexed player, 
        GameType gameType, 
        uint256 betAmount, 
        bool isWinner
    );

    function playGame(GameType _gameType) external payable {
        require(msg.value >= MIN_BET, "Bet below minimum");
        require(msg.value <= MAX_BET, "Bet above maximum");

        bool isWinner = _determineGameOutcome(_gameType);
        
        GameSession memory session = GameSession({
            player: msg.sender,
            gameType: _gameType,
            betAmount: msg.value,
            isWinner: isWinner,
            timestamp: block.timestamp
        });

        playerGames[msg.sender].push(session);
        gameVolume[_gameType] += msg.value;

        if (isWinner) {
            uint256 winnings = calculateWinnings(msg.value);
            payable(msg.sender).transfer(winnings);
        }

        emit GamePlayed(msg.sender, _gameType, msg.value, isWinner);
    }

    function calculateWinnings(uint256 betAmount) private pure returns (uint256) {
        uint256 adminFee = (betAmount * HOUSE_EDGE) / 100;
        return (betAmount * 2) - adminFee;
    }

    function _determineGameOutcome(GameType _gameType) private view returns (bool) {
        uint256 randomness = uint256(keccak256(abi.encodePacked(
            block.timestamp, 
            block.difficulty, 
            msg.sender
        )));

        case (_gameType) {
            GameType.COIN_FLIP: return randomness % 2 == 0;
            GameType.DICE_ROLL: return randomness % 6 == 0;
            GameType.NUMBER_GUESS: return randomness % 10 == 0;
            default: return false;
        }
    }
}
