import React, { useState } from 'react';
import { BLOCKCHAIN_NETWORKS, NetworkType, BlockchainNetwork } from '../config/networks';

interface AdminNetworkConfigProps {
  onNetworkChange: (network: BlockchainNetwork) => void;
}

const AdminNetworkConfig: React.FC<AdminNetworkConfigProps> = ({ onNetworkChange }) => {
  const [selectedBlockchain, setSelectedBlockchain] = useState<string>('SOLANA_TESTNET');
  const [networkType, setNetworkType] = useState<NetworkType>(NetworkType.TESTNET);

  const availableNetworks = Object.entries(BLOCKCHAIN_NETWORKS)
    .filter(([_, network]) => network.networkType === networkType);

  const handleNetworkChange = () => {
    const selectedNetwork = BLOCKCHAIN_NETWORKS[selectedBlockchain];
    onNetworkChange(selectedNetwork);
  };

  return (
    <div className="admin-network-config">
      <h2>Network Configuration</h2>
      
      <div className="network-type-toggle">
        <button 
          onClick={() => setNetworkType(NetworkType.TESTNET)}
          className={networkType === NetworkType.TESTNET ? 'active' : ''}
        >
          Testnet
        </button>
        <button 
          onClick={() => setNetworkType(NetworkType.MAINNET)}
          className={networkType === NetworkType.MAINNET ? 'active' : ''}
        >
          Mainnet
        </button>
      </div>

      <select 
        value={selectedBlockchain}
        onChange={(e) => setSelectedBlockchain(e.target.value)}
      >
        {availableNetworks.map(([key, network]) => (
          <option key={key} value={key}>
            {network.name}
          </option>
        ))}
      </select>

      <button onClick={handleNetworkChange}>
        Switch Network
      </button>

      <div className="network-details">
        <p>Selected Network: {BLOCKCHAIN_NETWORKS[selectedBlockchain].name}</p>
        <p>RPC URL: {BLOCKCHAIN_NETWORKS[selectedBlockchain].rpcUrl}</p>
        <p>Explorer: {BLOCKCHAIN_NETWORKS[selectedBlockchain].explorerUrl}</p>
      </div>
    </div>
  );
};

export default AdminNetworkConfig;
