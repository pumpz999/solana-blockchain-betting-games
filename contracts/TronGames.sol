pragma solidity ^0.8.19;

contract TronGames {
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

  function coinFlip(bool guess) public payable {
    require(msg.value > 0, "Bet must be greater than 0");
    
    bool result = block.timestamp % 2 == 0;
    bool isWinner = guess == result;

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

  function wheelOfFortune(uint8 userGuess) public payable {
    require(msg.value > 0, "Bet must be greater than 0");
    require(userGuess >= 1 && userGuess <= 8, "Invalid wheel segment");

    uint8 result = uint8(block.timestamp % 8) + 1;
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
}
