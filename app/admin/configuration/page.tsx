'use client';

import React, { useState, useEffect } from 'react';

interface PlatformConfiguration {
  blockchain: {
    network: string;
    rpcUrl: string;
    chainId: number;
  };
  apiKeys: {
    infura: string;
    web3Auth: string;
    alchemy: string;
  };
  gameSettings: {
    minBet: number;
    maxBet: number;
    houseEdge: number;
  };
}

const DEFAULT_CONFIG: PlatformConfiguration = {
  blockchain: {
    network: 'ethereum_testnet',
    rpcUrl: 'https://goerli.infura.io/v3/',
    chainId: 5
  },
  apiKeys: {
    infura: '',
    web3Auth: '',
    alchemy: ''
  },
  gameSettings: {
    minBet: 0.01,
    maxBet: 10,
    houseEdge: 2
  }
};

export default function AdminConfigurationPage() {
  const [config, setConfig] = useState<PlatformConfiguration>(DEFAULT_CONFIG);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load saved configuration from localStorage
    const savedConfig = localStorage.getItem('platformConfig');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

  const updateConfig = (section: keyof PlatformConfiguration, updates: Partial<any>) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...updates
      }
    }));
  };

  const saveConfiguration = async () => {
    setIsSaving(true);
    try {
      // Simulate API save (replace with actual backend call)
      localStorage.setItem('platformConfig', JSON.stringify(config));
      
      // Optional: Send configuration to backend
      const response = await fetch('/api/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
      });

      if (response.ok) {
        alert('Configuration saved successfully!');
      } else {
        throw new Error('Failed to save configuration');
      }
    } catch (error) {
      console.error('Configuration save failed', error);
      alert('Failed to save configuration');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="text-3xl font-bold mb-6 text-center">Platform Configuration</h1>

      {/* Blockchain Configuration */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Blockchain Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Network</label>
            <select 
              value={config.blockchain.network}
              onChange={(e) => updateConfig('blockchain', { network: e.target.value })}
              className="form-input"
            >
              <option value="ethereum_testnet">Ethereum Testnet (Goerli)</option>
              <option value="polygon_testnet">Polygon Testnet (Mumbai)</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">RPC URL</label>
            <input 
              type="text"
              value={config.blockchain.rpcUrl}
              onChange={(e) => updateConfig('blockchain', { rpcUrl: e.target.value })}
              className="form-input"
              placeholder="Enter RPC URL"
            />
          </div>
        </div>
      </section>

      {/* API Keys Configuration */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">API Keys</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.keys(config.apiKeys).map((key) => (
            <div key={key}>
              <label className="block mb-2 capitalize">{key} API Key</label>
              <input 
                type="text"
                value={config.apiKeys[key as keyof typeof config.apiKeys]}
                onChange={(e) => updateConfig('apiKeys', { [key]: e.target.value })}
                className="form-input"
                placeholder={`Enter ${key} API Key`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Game Settings Configuration */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Game Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2">Minimum Bet</label>
            <input 
              type="number"
              step="0.01"
              value={config.gameSettings.minBet}
              onChange={(e) => updateConfig('gameSettings', { minBet: parseFloat(e.target.value) })}
              className="form-input"
            />
          </div>
          <div>
            <label className="block mb-2">Maximum Bet</label>
            <input 
              type="number"
              step="0.01"
              value={config.gameSettings.maxBet}
              onChange={(e) => updateConfig('gameSettings', { maxBet: parseFloat(e.target.value) })}
              className="form-input"
            />
          </div>
          <div>
            <label className="block mb-2">House Edge (%)</label>
            <input 
              type="number"
              step="0.1"
              value={config.gameSettings.houseEdge}
              onChange={(e) => updateConfig('gameSettings', { houseEdge: parseFloat(e.target.value) })}
              className="form-input"
            />
          </div>
        </div>
      </section>

      <div className="text-center">
        <button 
          onClick={saveConfiguration}
          disabled={isSaving}
          className="btn-primary"
        >
          {isSaving ? 'Saving...' : 'Save Configuration'}
        </button>
      </div>
    </div>
  );
}
