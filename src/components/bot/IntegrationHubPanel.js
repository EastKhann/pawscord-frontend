import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaPlug, FaTimes, FaLink, FaPlus, FaBell, FaSearch } from 'react-icons/fa';
import './IntegrationHubPanel.css';
import useIntegrationHub, {
    integrationIcons,
    integrationColors,
    getCategoryIcon,
} from '../IntegrationHubPanel/useIntegrationHub';
import ConnectedIntegrations from '../IntegrationHubPanel/ConnectedIntegrations';
import AvailableIntegrations from '../IntegrationHubPanel/AvailableIntegrations';
import WebhooksView from '../IntegrationHubPanel/WebhooksView';
import ConfigurationModal from '../IntegrationHubPanel/ConfigurationModal';

import { useTranslation } from 'react-i18next';
const IntegrationHubPanel = ({ serverId, onClose }) => {
    const { t } = useTranslation();
    const [error, setError] = useState(null);
    const {
        activeTab,
        setActiveTab,
        integrations,
        notConnected,
        loading,
        searchTerm,
        setSearchTerm,
        configModal,
        setConfigModal,
        token,
        handleConnect,
        handleDisconnect,
        handleSync,
        fetchIntegrations,
    } = useIntegrationHub(serverId);

    return (
        <div
            className="integration-hub-overlay"
            role="button"
            tabIndex={0}
            onClick={(e) => e.target.className === 'integration-hub-overlay' && onClose()}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div className="integration-hub-panel">
                <div className="panel-header">
                    <h2>
                        <FaPlug /> Entegrasyon Merkezi
                    </h2>
                    <button aria-label={t('common.close')} className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="tabs-bar">
                    <div className="tabs">
                        <button
                            aria-label={t('integrations.connectedTab', 'Connected integrations')}
                            className={`tab ${activeTab === 'connected' ? 'active' : ''}`}
                            onClick={() => setActiveTab('connected')}
                        >
                            <FaLink /> {t('integrations.connectedCount', 'Connected')} ({integrations.length})
                        </button>
                        <button
                            aria-label={t('integrations.availableTab', 'Available integrations')}
                            className={`tab ${activeTab === 'available' ? 'active' : ''}`}
                            onClick={() => setActiveTab('available')}
                        >
                            <FaPlus /> {t('integrations.available', 'Available')} ({notConnected.length})
                        </button>
                        <button
                            aria-label={t('integrations.webhooksTab', 'Webhooks')}
                            className={`tab ${activeTab === 'webhooks' ? 'active' : ''}`}
                            onClick={() => setActiveTab('webhooks')}
                        >
                            <FaBell /> Webhooks
                        </button>
                    </div>
                </div>

                {activeTab === 'available' && (
                    <div className="search-bar">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder={t('integrations.searchPlaceholder', 'Search integrations...')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            aria-label={t('common.search', 'Search')}
                        />
                    </div>
                )}

                <div className="panel-content">
                    {loading ? (
                        <div className="loading">{t('common.loading')}</div>
                    ) : (
                        <>
                            {activeTab === 'connected' && (
                                <ConnectedIntegrations
                                    integrations={integrations}
                                    icons={integrationIcons}
                                    colors={integrationColors}
                                    onDisconnect={handleDisconnect}
                                    onSync={handleSync}
                                    onConfigure={(int) =>
                                        setConfigModal({ show: true, integration: int })
                                    }
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

IntegrationHubPanel.propTypes = {
    serverId: PropTypes.string,
    onClose: PropTypes.func,
};
export default IntegrationHubPanel;
