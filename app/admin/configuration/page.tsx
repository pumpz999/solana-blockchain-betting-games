'use client';

import React, { useState, useEffect } from 'react';

interface PlatformConfiguration {
  blockchain: {
    network: string;
    rpcUrl: string;
  };
  apiKeys: {
    infura: string;
    web3Auth: string;
  };
}

const DEFAULT_CONFIG: PlatformConfiguration = {
  blockchain: {
    network: 'ethereum_testnet',
    rpcUrl: 'https://goerli.infura.io/v3/'
  },
  apiKeys: {
    infura: '',
    web3Auth: ''
  }
};

export default function AdminConfigurationPage() {
  const [config, setConfig] = useState<PlatformConfiguration>(DEFAULT_CONFIG);

  const updateConfig = (section: keyof PlatformConfiguration, key: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const saveConfiguration = () => {
    try {
      // In a real implementation, you'd save to a backend or file
      localStorage.setItem('platformConfig', JSON.stringify(config));
      alert('Configuration saved successfully!');
    } catch (error) {
      console.error('Failed to save configuration', error);
      alert('Failed to save configuration');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Platform Configuration</h1>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Blockchain Configuration</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Network</label>
          <select 
            value={config.blockchain.network}
            onChange={(e) => updateConfig('blockchain', 'network', e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          >
            <option value="ethereum_testnet">Ethereum Testnet (Goerli)</option>
            <option value="polygon_testnet">Polygon Testnet (Mumbai)</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">RPC URL</label>
          <input 
            type="text"
            value={config.blockchain.rpcUrl}
            onChange={(e) => updateConfig('blockchain', 'rpcUrl', e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Enter RPC URL"
          />
        </div>

        <h2 className="text-xl font-semibold mb-4 mt-6">API Keys</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Infura API Key</label>
          <input 
            type="text"
            value={config.apiKeys.infura}
            onChange={(e) => updateConfig('apiKeys', 'infura', e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Enter Infura API Key"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Web3Auth API Key</label>
          <input 
            type="text"
            value={config.apiKeys.web3Auth}
            onChange={(e) => updateConfig('apiKeys', 'web3Auth', e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Enter Web3Auth API Key"
          />
        </div>

        <button 
          onClick={saveConfiguration}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
}
