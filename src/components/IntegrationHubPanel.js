import React, { useState, useEffect } from 'react';
import {
    FaPlug, FaTimes, FaGithub, FaSpotify, FaTwitch, FaYoutube,
    FaDiscord, FaSlack, FaGoogle, FaTwitter, FaLink, FaUnlink,
    FaCheck, FaCog, FaSync, FaExternalLinkAlt, FaPlus, FaSearch,
    FaCode, FaMusic, FaGamepad, FaCloud, FaBell, FaLock
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import './IntegrationHubPanel.css';

const IntegrationHubPanel = ({ serverId, onClose }) => {
    const [activeTab, setActiveTab] = useState('connected');
    const [integrations, setIntegrations] = useState([]);
    const [availableIntegrations, setAvailableIntegrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [configModal, setConfigModal] = useState({ show: false, integration: null });
    const token = localStorage.getItem('token');

    const integrationIcons = {
        github: FaGithub,
        spotify: FaSpotify,
        twitch: FaTwitch,
        youtube: FaYoutube,
        discord: FaDiscord,
        slack: FaSlack,
        google: FaGoogle,
        twitter: FaTwitter
    };

    const integrationColors = {
        github: '#333',
        spotify: '#1db954',
        twitch: '#9146ff',
        youtube: '#ff0000',
        discord: '#5865f2',
        slack: '#4a154b',
        google: '#4285f4',
        twitter: '#1da1f2'
    };

    useEffect(() => {
        fetchIntegrations();
    }, [serverId]);

    const fetchIntegrations = async () => {
        setLoading(true);
        try {
            const [connectedRes, availableRes] = await Promise.all([
                fetch(`/api/servers/${serverId}/integrations/`, {
                    headers: { 'Authorization': `Token ${token}` }
                }),
                fetch(`/api/integrations/available/`, {
                    headers: { 'Authorization': `Token ${token}` }
                })
            ]);

            if (connectedRes.ok) {
                const data = await connectedRes.json();
                setIntegrations(data.integrations || []);
            }

            if (availableRes.ok) {
                const data = await availableRes.json();
                setAvailableIntegrations(data.integrations || []);
            } else {
                setAvailableIntegrations([]);
            }
        } catch (error) {
            console.error('Error fetching integrations:', error);
            setAvailableIntegrations([]);
        }
        setLoading(false);
    };

    const handleConnect = async (integrationId) => {
        try {
            const response = await fetch(`/api/servers/${serverId}/integrations/connect/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ integration_type: integrationId })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.oauth_url) {
                    window.open(data.oauth_url, '_blank', 'width=500,height=600');
                }
                toast.success(`${integrationId} entegrasyon başlatıldı`);
                fetchIntegrations();
            } else {
                toast.error('Bağlantı başlatılamadı');
            }
        } catch (error) {
            toast.error('Bağlantı hatası');
        }
    };

    const handleDisconnect = async (integrationId) => {
        if (!window.confirm('Bu entegrasyonu kaldırmak istediğinize emin misiniz?')) return;

        try {
            const response = await fetch(`/api/servers/${serverId}/integrations/${integrationId}/disconnect/`, {
                method: 'POST',
                headers: { 'Authorization': `Token ${token}` }
            });

            if (response.ok) {
                toast.success('Entegrasyon kaldırıldı');
                fetchIntegrations();
            }
        } catch (error) {
            toast.error('Entegrasyon kaldırılamadı');
        }
    };

    const handleSync = async (integrationId) => {
        try {
            const response = await fetch(`/api/servers/${serverId}/integrations/${integrationId}/sync/`, {
                method: 'POST',
                headers: { 'Authorization': `Token ${token}` }
            });

            if (response.ok) {
                toast.success('Senkronizasyon başlatıldı');
            }
        } catch (error) {
            toast.error('Senkronizasyon başarısız');
        }
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'development': return <FaCode />;
            case 'entertainment': return <FaMusic />;
            case 'streaming': return <FaGamepad />;
            case 'productivity': return <FaCloud />;
            default: return <FaPlug />;
        }
    };

    const filteredAvailable = availableIntegrations.filter(int =>
        int.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        int.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const connectedIds = integrations.map(i => i.type);
    const notConnected = filteredAvailable.filter(a => !connectedIds.includes(a.id));

    return (
        <div className="integration-hub-overlay" onClick={(e) => e.target.className === 'integration-hub-overlay' && onClose()}>
            <div className="integration-hub-panel">
                <div className="panel-header">
                    <h2><FaPlug /> Entegrasyon Merkezi</h2>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                <div className="tabs-bar">
                    <div className="tabs">
                        <button
                            className={`tab ${activeTab === 'connected' ? 'active' : ''}`}
                            onClick={() => setActiveTab('connected')}
                        >
                            <FaLink /> Bağlı ({integrations.length})
                        </button>
                        <button
                            className={`tab ${activeTab === 'available' ? 'active' : ''}`}
                            onClick={() => setActiveTab('available')}
                        >
                            <FaPlus /> Mevcut ({notConnected.length})
                        </button>
                        <button
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

const AvailableIntegrations = ({ integrations, icons, colors, getCategoryIcon, onConnect }) => {
    const categories = [...new Set(integrations.map(i => i.category))];

    if (integrations.length === 0) {
        return (
            <div className="empty-state">
                <FaPlug />
                <p>Tüm entegrasyonlar zaten bağlı</p>
            </div>
        );
    }

    return (
        <div className="available-list">
            {categories.map(category => (
                <div key={category} className="category-section">
                    <h3 className="category-title">
                        {getCategoryIcon(category)}
                        {category === 'development' && 'Geliştirme'}
                        {category === 'entertainment' && 'Eğlence'}
                        {category === 'streaming' && 'Yayın'}
                        {category === 'productivity' && 'Üretkenlik'}
                        {category === 'content' && 'İçerik'}
                        {category === 'social' && 'Sosyal'}
                    </h3>
                    <div className="integrations-grid">
                        {integrations.filter(i => i.category === category).map(integration => {
                            const Icon = icons[integration.id] || FaPlug;
                            const color = colors[integration.id] || '#666';

                            return (
                                <div key={integration.id} className="integration-card available">
                                    <div className="integration-icon" style={{ background: color }}>
                                        <Icon />
                                    </div>
                                    <div className="integration-details">
                                        <h4>{integration.name}</h4>
                                        <p>{integration.description}</p>
                                        <ul className="features">
                                            {integration.features?.slice(0, 3).map((f, i) => (
                                                <li key={i}><FaCheck /> {f}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button
                                        className="connect-btn"
                                        onClick={() => onConnect(integration.id)}
                                    >
                                        <FaLink /> Bağla
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

const WebhooksView = ({ serverId, token }) => {
    const [webhooks, setWebhooks] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        fetchWebhooks();
    }, []);

    const fetchWebhooks = async () => {
        try {
            const response = await fetch(`/api/servers/${serverId}/webhooks/`, {
                headers: { 'Authorization': `Token ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setWebhooks(data.webhooks || []);
            }
        } catch (error) {
            console.error('Error fetching webhooks:', error);
        }
    };

    const handleDeleteWebhook = async (webhookId) => {
        if (!window.confirm('Bu webhook\'u silmek istediğinize emin misiniz?')) return;

        try {
            const response = await fetch(`/api/servers/${serverId}/webhooks/${webhookId}/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Token ${token}` }
            });
            if (response.ok) {
                toast.success('Webhook silindi');
                fetchWebhooks();
            }
        } catch (error) {
            toast.error('Webhook silinemedi');
        }
    };

    return (
        <div className="webhooks-view">
            <div className="webhooks-header">
                <p>Webhooks ile dış servislerden otomatik mesajlar alın</p>
                <button className="create-webhook-btn" onClick={() => setShowCreateModal(true)}>
                    <FaPlus /> Yeni Webhook
                </button>
            </div>

            {webhooks.length === 0 ? (
                <div className="empty-state">
                    <FaBell />
                    <p>Henüz webhook oluşturulmamış</p>
                </div>
            ) : (
                <div className="webhooks-list">
                    {webhooks.map(webhook => (
                        <div key={webhook.id} className="webhook-item">
                            <div className="webhook-avatar">
                                {webhook.avatar ? (
                                    <img src={webhook.avatar} alt="" />
                                ) : (
                                    <FaBell />
                                )}
                            </div>
                            <div className="webhook-info">
                                <h4>{webhook.name}</h4>
                                <span className="webhook-channel">#{webhook.channel_name}</span>
                                <div className="webhook-url">
                                    <code>{webhook.url.substring(0, 40)}...</code>
                                    <button onClick={() => {
                                        navigator.clipboard.writeText(webhook.url);
                                        toast.success('URL kopyalandı');
                                    }}>Kopyala</button>
                                </div>
                            </div>
                            <div className="webhook-actions">
                                <button className="action-btn delete" onClick={() => handleDeleteWebhook(webhook.id)}>
                                    <FaTimes />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showCreateModal && (
                <CreateWebhookModal
                    serverId={serverId}
                    token={token}
                    onClose={() => setShowCreateModal(false)}
                    onCreated={() => {
                        fetchWebhooks();
                        setShowCreateModal(false);
                    }}
                />
            )}
        </div>
    );
};

const CreateWebhookModal = ({ serverId, token, onClose, onCreated }) => {
    const [name, setName] = useState('');
    const [channelId, setChannelId] = useState('');
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        fetch(`/api/servers/${serverId}/channels/`, {
            headers: { 'Authorization': `Token ${token}` }
        })
            .then(res => res.json())
            .then(data => setChannels(data.channels || []))
            .catch(() => { });
    }, []);

    const handleCreate = async () => {
        if (!name || !channelId) {
            toast.warning('Tüm alanları doldurun');
            return;
        }

        try {
            const response = await fetch(`/api/servers/${serverId}/webhooks/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, channel_id: channelId })
            });

            if (response.ok) {
                toast.success('Webhook oluşturuldu');
                onCreated();
            }
        } catch (error) {
            toast.error('Webhook oluşturulamadı');
        }
    };

    return (
        <div className="modal-overlay" onClick={(e) => e.target.className === 'modal-overlay' && onClose()}>
            <div className="webhook-modal">
                <h3><FaPlus /> Yeni Webhook Oluştur</h3>

                <div className="form-group">
                    <label>Webhook Adı</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="örn: GitHub Bot"
                    />
                </div>

                <div className="form-group">
                    <label>Kanal</label>
                    <select value={channelId} onChange={(e) => setChannelId(e.target.value)}>
                        <option value="">Kanal seçin...</option>
                        {channels.map(ch => (
                            <option key={ch.id} value={ch.id}>#{ch.name}</option>
                        ))}
                    </select>
                </div>

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>İptal</button>
                    <button className="create-btn" onClick={handleCreate}>Oluştur</button>
                </div>
            </div>
        </div>
    );
};

const ConfigurationModal = ({ integration, serverId, token, onClose, onSave }) => {
    const [config, setConfig] = useState({
        notifications_enabled: true,
        notification_channel: '',
        auto_sync: true,
        sync_interval: 30
    });

    const handleSave = async () => {
        try {
            const response = await fetch(`/api/servers/${serverId}/integrations/${integration.id}/configure/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(config)
            });

            if (response.ok) {
                toast.success('Ayarlar kaydedildi');
                onSave();
                onClose();
            }
        } catch (error) {
            toast.error('Ayarlar kaydedilemedi');
        }
    };

    return (
        <div className="modal-overlay" onClick={(e) => e.target.className === 'modal-overlay' && onClose()}>
            <div className="config-modal">
                <h3><FaCog /> {integration.name} Ayarları</h3>

                <div className="config-section">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={config.notifications_enabled}
                            onChange={(e) => setConfig({ ...config, notifications_enabled: e.target.checked })}
                        />
                        Bildirimleri Etkinleştir
                    </label>
                </div>

                <div className="config-section">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={config.auto_sync}
                            onChange={(e) => setConfig({ ...config, auto_sync: e.target.checked })}
                        />
                        Otomatik Senkronizasyon
                    </label>
                </div>

                {config.auto_sync && (
                    <div className="form-group">
                        <label>Senkronizasyon Aralığı (dakika)</label>
                        <input
                            type="number"
                            value={config.sync_interval}
                            onChange={(e) => setConfig({ ...config, sync_interval: parseInt(e.target.value) })}
                            min={5}
                            max={1440}
                        />
                    </div>
                )}

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>İptal</button>
                    <button className="save-btn" onClick={handleSave}>
                        <FaCheck /> Kaydet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IntegrationHubPanel;
