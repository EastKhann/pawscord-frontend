import React from 'react';
import PropTypes from 'prop-types';
import { FaPlug, FaCheck, FaSync, FaCog, FaUnlink } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const ConnectedIntegrations = ({
    integrations,
    icons,
    colors,
    onDisconnect,
    onSync,
    onConfigure,
}) => {
    const { t } = useTranslation();

    if (integrations.length === 0) {
        return (
            <div aria-label={t('integrations.connected', 'Connected integrations')} className="empty-state">
                <FaUnlink />
                <p>{t('not_yet_bağlı_entegrasyon_yok')}</p>
                <span className="hint">{t('mevcut_sekmesinden_entegrasyon_addyin')}</span>
            </div>
        );
    }

    return (
        <div className="connected-list">
            {integrations.map((integration) => {
                const Icon = icons[integration.type] || FaPlug;
                const color = colors[integration.type] || '#666';

                return (
                    <div key={integration.id} className="integration-card connected">
                        <div className="integration-icon" style={{ background: color }}>
                            <Icon />
                        </div>
                        <div className="integration-info">
                            <h4>{integration.name}</h4>
                            <div className="connection-info">
                                <span className="status connected">
                                    <FaCheck /> {t('integrations.connected', 'Connected')}
                                </span>
                                {integration.account_name && (
                                    <span className="account">@{integration.account_name}</span>
                                )}
                            </div>
                            <div className="last-sync">
                                {t('integrations.lastSync', 'Last sync')}: {integration.last_sync || t('common.never', 'Never')}
                            </div>
                        </div>
                        <div className="integration-actions">
                            <button
                                className="action-btn sync"
                                onClick={() => onSync(integration.id)}
                                title={t('senkronize_et')}
                            >
                                <FaSync />
                            </button>
                            <button
                                className="action-btn config"
                                onClick={() => onConfigure(integration)}
                                title={t('ayarlar')}
                            >
                                <FaCog />
                            </button>
                            <button
                                className="action-btn disconnect"
                                onClick={() => onDisconnect(integration.id)}
                                title={t('disconnect')}
                            >
                                <FaUnlink />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

ConnectedIntegrations.propTypes = {
    integrations: PropTypes.array,
    icons: PropTypes.array,
    colors: PropTypes.array,
    onDisconnect: PropTypes.func,
    onSync: PropTypes.func,
    onConfigure: PropTypes.func,
};
export default ConnectedIntegrations;
