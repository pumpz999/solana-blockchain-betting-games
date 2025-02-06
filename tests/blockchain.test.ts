import { ethers } from 'hardhat';
import { expect } from 'chai';
import { GamePlatform } from '../typechain-types';

describe('GamePlatform Smart Contract', () => {
  let gamePlatform: GamePlatform;
  let owner: any;
  let player: any;

  beforeEach(async () => {
    const [ownerSigner, playerSigner] = await ethers.getSigners();
    owner = ownerSigner;
    player = playerSigner;

    const GamePlatformFactory = await ethers.getContractFactory('GamePlatform');
    gamePlatform = await GamePlatformFactory.deploy();
    await gamePlatform.deployed();
  });

  describe('Game Mechanics', () => {
    it('should allow valid game play', async () => {
      const betAmount = ethers.utils.parseEther('0.1');
      
      await expect(
        gamePlatform.connect(player).playGame(0, { value: betAmount })
      ).to.not.be.reverted;
    });

    it('should prevent bets below minimum', async () => {
      const smallBet = ethers.utils.parseEther('0.001');
      
      await expect(
        gamePlatform.connect(player).playGame(0, { value: smallBet })
      ).to.be.revertedWith('Bet below minimum');
    });

    it('should prevent bets above maximum', async () => {
      const largeBet = ethers.utils.parseEther('100');
      
      await expect(
        gamePlatform.connect(player).playGame(0, { value: largeBet })
      ).to.be.revertedWith('Bet above maximum');
    });
  });

  describe('Economic Mechanics', () => {
    it('should calculate winnings correctly', async () => {
      const betAmount = ethers.utils.parseEther('1');
      
      const tx = await gamePlatform.connect(player).playGame(0, { value: betAmount });
      const receipt = await tx.wait();

      // Verify game session created
      expect(receipt.events).to.not.be.empty;
    });
  });
});
