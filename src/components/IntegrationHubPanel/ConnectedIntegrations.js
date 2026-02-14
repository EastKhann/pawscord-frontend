import React from 'react';
import { FaPlug, FaCheck, FaSync, FaCog, FaUnlink } from 'react-icons/fa';

const ConnectedIntegrations = ({ integrations, icons, colors, onDisconnect, onSync, onConfigure }) => {
    if (integrations.length === 0) {
        return (
            <div className="empty-state">
                <FaUnlink />
                <p>Henüz bağlı entegrasyon yok</p>
                <span className="hint">"Mevcut" sekmesinden entegrasyon ekleyin</span>
            </div>
        );
    }

    return (
        <div className="connected-list">
            {integrations.map(integration => {
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
                                    <FaCheck /> Bağlı
                                </span>
                                {integration.account_name && (
                                    <span className="account">@{integration.account_name}</span>
                                )}
                            </div>
                            <div className="last-sync">
                                Son senkronizasyon: {integration.last_sync || 'Hiç'}
                            </div>
                        </div>
                        <div className="integration-actions">
                            <button className="action-btn sync" onClick={() => onSync(integration.id)} title="Senkronize Et">
                                <FaSync />
                            </button>
                            <button className="action-btn config" onClick={() => onConfigure(integration)} title="Ayarlar">
                                <FaCog />
                            </button>
                            <button className="action-btn disconnect" onClick={() => onDisconnect(integration.id)} title="Bağlantıyı Kes">
                                <FaUnlink />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ConnectedIntegrations;
