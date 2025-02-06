import React, { useState, useEffect } from 'react';
import { PlatformConfiguration, DEFAULT_CONFIG } from '../../models/CompleteConfigurationModel';
import { ConfigurationService } from '../../services/ConfigurationService';

const AdminConfigurationPage: React.FC = () => {
  const [config, setConfig] = useState<PlatformConfiguration>(DEFAULT_CONFIG);
  const [activeSection, setActiveSection] = useState<string>('blockchain');

  useEffect(() => {
    const currentConfig = ConfigurationService.getConfiguration();
    setConfig(currentConfig);
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

  const saveConfiguration = () => {
    try {
      ConfigurationService.updateConfiguration(config);
      alert('Configuration updated successfully!');
    } catch (error) {
      console.error('Configuration update failed', error);
      alert('Failed to update configuration');
    }
  };

  const renderSection = () => {
    switch(activeSection) {
      case 'blockchain':
        return (
          <div>
            <h2>Blockchain Configuration</h2>
            <div>
              <label>Current Network</label>
              <select 
                value={config.blockchain.currentNetwork}
                onChange={(e) => updateConfig('blockchain', { 
                  currentNetwork: e.target.value 
                })}
              >
                {Object.keys(config.blockchain.networks).map(network => (
                  <option key={network} value={network}>
                    {config.blockchain.networks[network].name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );
      
      case 'apiKeys':
        return (
          <div>
            <h2>API Integrations</h2>
            {Object.keys(config.apiKeys).map(key => (
              <div key={key}>
                <label>{key.charAt(0).toUpperCase() + key.slice(1)} API Key</label>
                <input 
                  type="text"
                  value={config.apiKeys[key as keyof typeof config.apiKeys]}
                  onChange={(e) => updateConfig('apiKeys', { 
                    [key]: e.target.value 
                  })}
                />
              </div>
            ))}
          </div>
        );
      
      case 'gameSettings':
        return (
          <div>
            <h2>Game Configurations</h2>
            <div>
              <label>House Edge (%)</label>
              <input 
                type="number"
                value={config.gameSettings.houseEdge}
                onChange={(e) => updateConfig('gameSettings', { 
                  houseEdge: parseFloat(e.target.value) 
                })}
              />
            </div>
            {Object.entries(config.gameSettings.gameConfigurations).map(([gameName, gameConfig]) => (
              <div key={gameName}>
                <h3>{gameName.replace('_', ' ').toUpperCase()}</h3>
                <label>Enabled</label>
                <input 
                  type="checkbox"
                  checked={gameConfig.enabled}
                  onChange={(e) => {
                    const updatedConfigs = {...config.gameSettings.gameConfigurations};
                    updatedConfigs[gameName].enabled = e.target.checked;
                    updateConfig('gameSettings', { 
                      gameConfigurations: updatedConfigs 
                    });
                  }}
                />
                <label>Min Bet</label>
                <input 
                  type="number"
                  value={gameConfig.minBet}
                  onChange={(e) => {
                    const updatedConfigs = {...config.gameSettings.gameConfigurations};
                    updatedConfigs[gameName].minBet = parseFloat(e.target.value);
                    updateConfig('gameSettings', { 
                      gameConfigurations: updatedConfigs 
                    });
                  }}
                />
              </div>
            ))}
          </div>
        );
      
      case 'security':
        return (
          <div>
            <h2>Security Settings</h2>
            <div>
              <label>Two-Factor Authentication</label>
              <input 
                type="checkbox"
                checked={config.security.twoFactorAuth}
                onChange={(e) => updateConfig('security', { 
                  twoFactorAuth: e.target.checked 
                })}
              />
            </div>
            <div>
              <label>Max Login Attempts</label>
              <input 
                type="number"
                value={config.security.maxLoginAttempts}
                onChange={(e) => updateConfig('security', { 
                  maxLoginAttempts: parseInt(e.target.value) 
                })}
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="admin-configuration">
      <h1>Platform Configuration Management</h1>
      
      <div className="configuration-navigation">
        {['blockchain', 'apiKeys', 'gameSettings', 'security'].map(section => (
          <button 
            key={section}
            onClick={() => setActiveSection(section)}
            className={activeSection === section ? 'active' : ''}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      <div className="configuration-content">
        {renderSection()}
      </div>

      <button onClick={saveConfiguration} className="save-configuration">
        Save Configuration
      </button>
    </div>
  );
};

export default AdminConfigurationPage;
