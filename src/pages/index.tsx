import React, { useState } from 'react';
import { BlockchainConnector } from '../utils/blockchain-connector';
import { BLOCKCHAIN_NETWORKS, BlockchainNetwork } from '../config/networks';
import AdminNetworkConfig from '../components/AdminNetworkConfig';

const GameDashboard: React.FC = () => {
  const [currentNetwork, setCurrentNetwork] = useState<BlockchainNetwork>(
    BLOCKCHAIN_NETWORKS.SOLANA_TESTNET
  );
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletDetails, setWalletDetails] = useState<{
    address: string;
    balance: string;
  } | null>(null);

  const handleNetworkChange = (network: BlockchainNetwork) => {
    setCurrentNetwork(network);
  };

  const connectWallet = async () => {
    try {
      const connector = new BlockchainConnector(currentNetwork);
      const details = await connector.connectWallet();
      
      setWalletDetails({
        address: details.address,
        balance: details.balance
      });
      setWalletConnected(true);
    } catch (error) {
      console.error('Wallet connection failed', error);
      alert('Failed to connect wallet');
    }
  };

  return (
    <div className="game-dashboard">
      <h1>Blockchain Gaming Platform</h1>
      
      <div className="network-info">
        <p>Current Network: {currentNetwork.name}</p>
        <p>Network Type: {currentNetwork.networkType}</p>
      </div>

      {!walletConnected ? (
        <button onClick={connectWallet}>
          Connect Wallet to {currentNetwork.name}
        </button>
      ) : (
        <div className="wallet-details">
          <p>Address: {walletDetails?.address}</p>
          <p>Balance: {walletDetails?.balance}</p>
        </div>
      )}

      <AdminNetworkConfig onNetworkChange={handleNetworkChange} />

      <div className="game-selection">
        <h2>Available Games</h2>
        {/* Game selection UI */}
      </div>
    </div>
  );
};

export default GameDashboard;
