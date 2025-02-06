// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract AvalancheGames {
  struct Game {
    address player;
    uint256 betAmount;
    bool isWinner;
  }

  mapping(address => Game) public games;
  address public owner;
  uint256 public constant ADMIN_FEE = 10; // 10% fee

  constructor() {
    owner = msg.sender;
  }

  function numberGuess(uint8 userGuess) public payable {
    require(msg.value > 0, "Bet must be greater than 0");
    require(userGuess >= 1 && userGuess <= 10, "Invalid number guess");

    uint8 result = uint8(block.timestamp % 10) + 1;
    bool isWinner = userGuess == result;

    if (isWinner) {
      uint256 adminFee = (msg.value * ADMIN_FEE) / 100;
      uint256 winnings = (msg.value * 2) - adminFee;
      
      payable(msg.sender).transfer(winnings);
      payable(owner).transfer(adminFee);
    }

    games[msg.sender] = Game({
      player: msg.sender,
      betAmount: msg.value,
      isWinner: isWinner
    });
  }

  function rockPaperScissors(uint8 playerChoice) public payable {
    require(msg.value > 0, "Bet must be greater than 0");
    require(playerChoice >= 1 && playerChoice <= 3, "Invalid choice");

    uint8 computerChoice = uint8(block.timestamp % 3) + 1;
    bool isWinner = determineWinner(playerChoice, computerChoice);

    if (isWinner) {
      uint256 adminFee = (msg.value * ADMIN_FEE) / 100;
      uint256 winnings = (msg.value * 2) - adminFee;
      
      payable(msg.sender).transfer(winnings);
      payable(owner).transfer(adminFee);
    }

    games[msg.sender] = Game({
      player: msg.sender,
      betAmount: msg.value,
      isWinner: isWinner
    });
  }

  function determineWinner(uint8 player, uint8 computer) private pure returns (bool) {
    // 1: Rock, 2: Paper, 3: Scissors
    if (player == computer) return false;
    return (
      (player == 1 && computer == 3) || 
      (player == 2 && computer == 1) || 
      (player == 3 && computer == 2)
    );
  }
}
