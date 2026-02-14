import React from 'react';
import { FaPlug, FaTimes, FaLink, FaPlus, FaBell, FaSearch } from 'react-icons/fa';
import './IntegrationHubPanel.css';
import useIntegrationHub, { integrationIcons, integrationColors, getCategoryIcon } from './IntegrationHubPanel/useIntegrationHub';
import ConnectedIntegrations from './IntegrationHubPanel/ConnectedIntegrations';
import AvailableIntegrations from './IntegrationHubPanel/AvailableIntegrations';
import WebhooksView from './IntegrationHubPanel/WebhooksView';
import ConfigurationModal from './IntegrationHubPanel/ConfigurationModal';

const IntegrationHubPanel = ({ serverId, onClose }) => {
    const {
        activeTab, setActiveTab,
        integrations,
        notConnected,
        loading,
        searchTerm, setSearchTerm,
        configModal, setConfigModal,
        token,
        handleConnect,
        handleDisconnect,
        handleSync,
        fetchIntegrations
    } = useIntegrationHub(serverId);

    return (
        <div className="integration-hub-overlay" onClick={(e) => e.target.className === 'integration-hub-overlay' && onClose()}>
            <div className="integration-hub-panel">
                <div className="panel-header">
                    <h2><FaPlug /> Entegrasyon Merkezi</h2>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                <div className="tabs-bar">
                    <div className="tabs">
                        <button className={`tab ${activeTab === 'connected' ? 'active' : ''}`} onClick={() => setActiveTab('connected')}>
                            <FaLink /> Bağlı ({integrations.length})
                        </button>
                        <button className={`tab ${activeTab === 'available' ? 'active' : ''}`} onClick={() => setActiveTab('available')}>
                            <FaPlus /> Mevcut ({notConnected.length})
                        </button>
                        <button className={`tab ${activeTab === 'webhooks' ? 'active' : ''}`} onClick={() => setActiveTab('webhooks')}>
                            <FaBell /> Webhooks
                        </button>
                    </div>
                </div>

                {activeTab === 'available' && (
                    <div className="search-bar">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Entegrasyon ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                )}

                <div className="panel-content">
                    {loading ? (
                        <div className="loading">Yükleniyor...</div>
                    ) : (
                        <>
                            {activeTab === 'connected' && (
                                <ConnectedIntegrations
                                    integrations={integrations}
                                    icons={integrationIcons}
                                    colors={integrationColors}
                                    onDisconnect={handleDisconnect}
                                    onSync={handleSync}
                                    onConfigure={(int) => setConfigModal({ show: true, integration: int })}
                                />
                            )}

                            {activeTab === 'available' && (
                                <AvailableIntegrations
                                    integrations={notConnected}
                                    icons={integrationIcons}
                                    colors={integrationColors}
                                    getCategoryIcon={getCategoryIcon}
                                    onConnect={handleConnect}
                                />
                            )}

                            {activeTab === 'webhooks' && (
                                <WebhooksView serverId={serverId} token={token} />
                            )}
                        </>
                    )}
                </div>

                {configModal.show && (
                    <ConfigurationModal
                        integration={configModal.integration}
                        serverId={serverId}
                        token={token}
                        onClose={() => setConfigModal({ show: false, integration: null })}
                        onSave={fetchIntegrations}
                    />
                )}
            </div>
        </div>
    );
};

export default IntegrationHubPanel;
