import { ethers, network } from 'hardhat';
import fs from 'fs';
import path from 'path';

async function main() {
  // Detect network
  const networkName = network.name;
  console.log(`Deploying to network: ${networkName}`);

  // Get deployer
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with account:', deployer.address);

  // Deploy Game Platform Contract
  const GamePlatform = await ethers.getContractFactory('GamePlatform');
  const gamePlatform = await GamePlatform.deploy();
  
  await gamePlatform.deployed();

  console.log('GamePlatform deployed to:', gamePlatform.address);

  // Save deployment details
  const deploymentInfo = {
    network: networkName,
    contractAddress: gamePlatform.address,
    deployedAt: new Date().toISOString(),
    deployer: deployer.address
  };

  const deploymentPath = path.join(__dirname, `../deployments/${networkName}.json`);
  fs.mkdirSync(path.dirname(deploymentPath), { recursive: true });
  fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));

  console.log('Deployment information saved');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
