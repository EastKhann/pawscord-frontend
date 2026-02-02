// frontend/src/components/panels/NormalPriorityPanels.js
// 🔧 NORMAL ÖNCELİKLİ PANELLERİ - 26 Ocak 2026

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import toast from '../../utils/toast';
import { getApiBase } from '../../utils/apiEndpoints';
import './NormalPriorityPanels.css';

const API_URL = getApiBase();

// ========================================
// 🤖 BOT MARKETPLACE PANEL
// ========================================
export const BotMarketplacePanel = ({ serverId, onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [bots, setBots] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('popular');
    const [selectedBot, setSelectedBot] = useState(null);

    useEffect(() => {
        fetchBots();
    }, [selectedCategory, sortBy]);

    const fetchBots = async () => {
        try {
            const params = new URLSearchParams({
                category: selectedCategory,
                sort: sortBy,
                search: searchQuery
            });
            const res = await fetchWithAuth(`${API_URL}/bot-marketplace/?${params}`);
            const data = await res.json();
            setBots(data.bots || []);
            setCategories(data.categories || []);
        } catch (e) {
            console.error('Bot marketplace error:', e);
        } finally {
            setLoading(false);
        }
    };

    const addBotToServer = async (botId) => {
        try {
            await fetchWithAuth(`${API_URL}/bot-marketplace/${botId}/add/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ server_id: serverId })
            });
            toast.success('Bot sunucuya eklendi!');
            fetchBots();
        } catch (e) {
            toast.error(e.message || 'Bot eklenemedi');
        }
    };

    return (
        <div className="np-panel bot-marketplace-panel">
            <div className="panel-header">
                <h2>🤖 Bot Marketplace</h2>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>

            <div className="marketplace-filters">
                <input
                    type="text"
                    placeholder="Bot ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && fetchBots()}
                    className="search-input"
                />
                <div className="filter-row">
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="popular">En Popüler</option>
                        <option value="rating">En Yüksek Puan</option>
                        <option value="newest">En Yeni</option>
                    </select>
                </div>
            </div>

            <div className="panel-content">
                {loading ? (
                    <div className="loading">Yükleniyor...</div>
                ) : bots.length === 0 ? (
                    <div className="empty">
                        <span className="empty-icon">🤖</span>
                        <p>Bot bulunamadı</p>
                    </div>
                ) : (
                    <div className="bots-grid">
                        {bots.map(bot => (
                            <div
                                key={bot.id}
                                className={`bot-card ${bot.premium ? 'premium' : ''}`}
                                onClick={() => setSelectedBot(bot)}
                            >
                                <div className="bot-icon">{bot.icon}</div>
                                <div className="bot-info">
                                    <h3>
                                        {bot.name}
                                        {bot.verified && <span className="verified">✓</span>}
                                        {bot.premium && <span className="premium-badge">💎</span>}
                                    </h3>
                                    <p>{bot.description}</p>
                                    <div className="bot-stats">
                                        <span>📥 {bot.installs.toLocaleString()}</span>
                                        <span>⭐ {bot.rating}</span>
                                    </div>
                                </div>
                                <button
                                    className="add-btn"
                                    onClick={(e) => { e.stopPropagation(); addBotToServer(bot.id); }}
                                >
                                    Ekle
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedBot && (
                <div className="bot-detail-modal" onClick={() => setSelectedBot(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <span className="bot-icon-large">{selectedBot.icon}</span>
                            <div>
                                <h2>{selectedBot.name}</h2>
                                <span className="developer">by {selectedBot.developer}</span>
                            </div>
                            <button onClick={() => setSelectedBot(null)}>✕</button>
                        </div>
                        <p className="bot-description">{selectedBot.description}</p>
                        <div className="features">
                            <h4>Özellikler</h4>
                            <ul>
                                {selectedBot.features?.map((f, i) => (
                                    <li key={i}>✓ {f}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="commands">
                            <h4>Komutlar</h4>
                            <div className="command-list">
                                {selectedBot.commands?.map((cmd, i) => (
                                    <code key={i}>{cmd}</code>
                                ))}
                            </div>
                        </div>
                        <button
                            className="add-btn-large"
                            onClick={() => addBotToServer(selectedBot.id)}
                        >
                            Sunucuya Ekle
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// ========================================
// 🔌 PLUGIN SYSTEM PANEL
// ========================================
export const PluginSystemPanel = ({ serverId, onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [availablePlugins, setAvailablePlugins] = useState([]);
    const [installedPlugins, setInstalledPlugins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('available');
    const [selectedPlugin, setSelectedPlugin] = useState(null);
    const [pluginSettings, setPluginSettings] = useState({});

    useEffect(() => {
        fetchData();
    }, [serverId]);

    const fetchData = async () => {
        try {
            const [availableRes, installedRes] = await Promise.all([
                fetchWithAuth(`${API_URL}/plugins/`),
                fetchWithAuth(`${API_URL}/servers/${serverId}/plugins/`)
            ]);
            const availableData = await availableRes.json();
            const installedData = await installedRes.json();
            setAvailablePlugins(availableData.plugins || []);
            setInstalledPlugins(installedData.plugins || []);
        } catch (e) {
            console.error('Plugin error:', e);
        } finally {
            setLoading(false);
        }
    };

    const installPlugin = async (pluginId) => {
        try {
            await fetchWithAuth(`${API_URL}/servers/${serverId}/plugins/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plugin_id: pluginId, settings: pluginSettings })
            });
            toast.success('Plugin yüklendi!');
            fetchData();
        } catch (e) {
            toast.error('Yükleme başarısız');
        }
    };

    const uninstallPlugin = async (pluginId) => {
        try {
            await fetchWithAuth(`${API_URL}/servers/${serverId}/plugins/`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plugin_id: pluginId })
            });
            toast.success('Plugin kaldırıldı!');
            fetchData();
        } catch (e) {
            toast.error('Kaldırma başarısız');
        }
    };

    const updatePluginSettings = async (pluginId, newSettings) => {
        try {
            await fetchWithAuth(`${API_URL}/servers/${serverId}/plugins/${pluginId}/settings/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ settings: newSettings })
            });
            toast.success('Ayarlar kaydedildi!');
        } catch (e) {
            toast.error('Kaydetme başarısız');
        }
    };

    return (
        <div className="np-panel plugin-panel">
            <div className="panel-header">
                <h2>🔌 Eklentiler</h2>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>

            <div className="tab-bar">
                <button
                    className={activeTab === 'available' ? 'active' : ''}
                    onClick={() => setActiveTab('available')}
                >
                    Mevcut ({availablePlugins.length})
                </button>
                <button
                    className={activeTab === 'installed' ? 'active' : ''}
                    onClick={() => setActiveTab('installed')}
                >
                    Yüklü ({installedPlugins.length})
                </button>
            </div>

            <div className="panel-content">
                {loading ? (
                    <div className="loading">Yükleniyor...</div>
                ) : activeTab === 'available' ? (
                    <div className="plugins-list">
                        {availablePlugins.map(plugin => (
                            <div key={plugin.id} className="plugin-card">
                                <div className="plugin-info">
                                    <h3>
                                        {plugin.name}
                                        {plugin.verified && <span className="verified">✓</span>}
                                    </h3>
                                    <p>{plugin.description}</p>
                                    <div className="plugin-meta">
                                        <span>v{plugin.version}</span>
                                        <span>by {plugin.author}</span>
                                        <span>⭐ {plugin.rating}</span>
                                        <span>📥 {plugin.downloads}</span>
                                    </div>
                                </div>
                                <button
                                    className="install-btn"
                                    onClick={() => installPlugin(plugin.id)}
                                    disabled={installedPlugins.some(p => p.id === plugin.id)}
                                >
                                    {installedPlugins.some(p => p.id === plugin.id) ? 'Yüklü' : 'Yükle'}
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="plugins-list">
                        {installedPlugins.length === 0 ? (
                            <div className="empty">
                                <span>🔌</span>
                                <p>Yüklü eklenti yok</p>
                            </div>
                        ) : (
                            installedPlugins.map(plugin => (
                                <div key={plugin.id} className="plugin-card installed">
                                    <div className="plugin-info">
                                        <h3>{plugin.name}</h3>
                                        <p>{plugin.description}</p>
                                    </div>
                                    <div className="plugin-actions">
                                        <button
                                            className="settings-btn"
                                            onClick={() => setSelectedPlugin(plugin)}
                                        >
                                            ⚙️
                                        </button>
                                        <button
                                            className="uninstall-btn"
                                            onClick={() => uninstallPlugin(plugin.id)}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {selectedPlugin && (
                <div className="plugin-settings-modal" onClick={() => setSelectedPlugin(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h3>⚙️ {selectedPlugin.name} Ayarları</h3>
                        {Object.entries(selectedPlugin.settings_schema || {}).map(([key, schema]) => (
                            <div key={key} className="setting-field">
                                <label>{key}</label>
                                {schema.type === 'boolean' ? (
                                    <input
                                        type="checkbox"
                                        checked={selectedPlugin.settings?.[key] ?? schema.default}
                                        onChange={(e) => {
                                            const newSettings = { ...selectedPlugin.settings, [key]: e.target.checked };
                                            updatePluginSettings(selectedPlugin.id, newSettings);
                                        }}
                                    />
                                ) : (
                                    <input
                                        type={schema.type === 'number' ? 'number' : 'text'}
                                        value={selectedPlugin.settings?.[key] ?? schema.default}
                                        onChange={(e) => {
                                            const newSettings = { ...selectedPlugin.settings, [key]: e.target.value };
                                            updatePluginSettings(selectedPlugin.id, newSettings);
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                        <button onClick={() => setSelectedPlugin(null)}>Kapat</button>
                    </div>
                </div>
            )}
        </div>
    );
};

// ========================================
// 📺 STREAM ANALYTICS PANEL
// ========================================
export const StreamAnalyticsPanel = ({ streamId, onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
        const interval = setInterval(fetchAnalytics, 10000); // Update every 10s
        return () => clearInterval(interval);
    }, [streamId]);

    const fetchAnalytics = async () => {
        try {
            const res = await fetchWithAuth(`${API_URL}/streams/${streamId}/analytics/`);
            const data = await res.json();
            setAnalytics(data);
        } catch (e) {
            console.error('Analytics error:', e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="np-panel stream-analytics-panel">
            <div className="panel-header">
                <h2>📺 Yayın Analizi</h2>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>

            <div className="panel-content">
                {loading ? (
                    <div className="loading">Yükleniyor...</div>
                ) : !analytics ? (
                    <div className="empty">Analiz verisi yok</div>
                ) : (
                    <>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <span className="stat-icon">👥</span>
                                <div className="stat-info">
                                    <span className="stat-value">{analytics.viewers?.current || 0}</span>
                                    <span className="stat-label">Aktif İzleyici</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <span className="stat-icon">📈</span>
                                <div className="stat-info">
                                    <span className="stat-value">{analytics.viewers?.peak || 0}</span>
                                    <span className="stat-label">En Yüksek</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <span className="stat-icon">💬</span>
                                <div className="stat-info">
                                    <span className="stat-value">{analytics.engagement?.chat_messages || 0}</span>
                                    <span className="stat-label">Mesaj</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <span className="stat-icon">😀</span>
                                <div className="stat-info">
                                    <span className="stat-value">{analytics.engagement?.reactions || 0}</span>
                                    <span className="stat-label">Tepki</span>
                                </div>
                            </div>
                        </div>

                        <div className="quality-section">
                            <h3>📊 Kalite İstatistikleri</h3>
                            <div className="quality-stats">
                                <div className="quality-item">
                                    <span>Ortalama Bitrate</span>
                                    <span>{analytics.quality_stats?.avg_bitrate || 0} kbps</span>
                                </div>
                                <div className="quality-item">
                                    <span>Düşme</span>
                                    <span>{analytics.quality_stats?.drops || 0}</span>
                                </div>
                                <div className="quality-item">
                                    <span>Tamponlama</span>
                                    <span>{analytics.quality_stats?.buffer_events || 0}</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

// ========================================
// 🎤 VOICE EFFECTS PANEL
// ========================================
export const VoiceEffectsPanel = ({ onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [effects, setEffects] = useState([]);
    const [activeEffect, setActiveEffect] = useState(null);
    const [intensity, setIntensity] = useState(50);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEffects();
    }, []);

    const fetchEffects = async () => {
        try {
            const res = await fetchWithAuth(`${API_URL}/voice/effects/`);
            const data = await res.json();
            setEffects(data.effects || []);
        } catch (e) {
            console.error('Voice effects error:', e);
        } finally {
            setLoading(false);
        }
    };

    const applyEffect = async (effectId) => {
        try {
            await fetchWithAuth(`${API_URL}/voice/effects/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ effect_id: effectId, intensity })
            });
            setActiveEffect(effectId);
            toast.success('Efekt uygulandı!');
        } catch (e) {
            toast.error('Efekt uygulanamadı');
        }
    };

    const disableEffect = async () => {
        try {
            await fetchWithAuth(`${API_URL}/voice/effects/disable/`, {
                method: 'DELETE'
            });
            setActiveEffect(null);
            toast.success('Efekt kapatıldı');
        } catch (e) {
            console.error('Disable error:', e);
        }
    };

    return (
        <div className="np-panel voice-effects-panel">
            <div className="panel-header">
                <h2>🎤 Ses Efektleri</h2>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>

            <div className="panel-content">
                {activeEffect && (
                    <div className="active-effect-banner">
                        <span>Aktif: {effects.find(e => e.id === activeEffect)?.name}</span>
                        <button onClick={disableEffect}>Kapat</button>
                    </div>
                )}

                <div className="intensity-control">
                    <label>Yoğunluk: {intensity}%</label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={intensity}
                        onChange={(e) => setIntensity(parseInt(e.target.value))}
                    />
                </div>

                {loading ? (
                    <div className="loading">Yükleniyor...</div>
                ) : (
                    <div className="effects-grid">
                        {effects.map(effect => (
                            <button
                                key={effect.id}
                                className={`effect-btn ${activeEffect === effect.id ? 'active' : ''} ${effect.premium ? 'premium' : ''}`}
                                onClick={() => applyEffect(effect.id)}
                                disabled={effect.premium}
                            >
                                <span className="effect-icon">{effect.icon}</span>
                                <span className="effect-name">{effect.name}</span>
                                {effect.premium && <span className="premium-badge">💎</span>}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// ========================================
// 🎨 SERVER TEMPLATE MARKETPLACE
// ========================================
export const TemplateMarketplacePanel = ({ serverId, onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [templates, setTemplates] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    useEffect(() => {
        fetchTemplates();
    }, [selectedCategory]);

    const fetchTemplates = async () => {
        try {
            const res = await fetchWithAuth(`${API_URL}/templates/marketplace/?category=${selectedCategory}`);
            const data = await res.json();
            setTemplates(data.templates || []);
            setCategories(data.categories || []);
        } catch (e) {
            console.error('Templates error:', e);
        } finally {
            setLoading(false);
        }
    };

    const applyTemplate = async (templateId) => {
        if (!confirm('Bu şablon sunucunuza uygulanacak. Devam edilsin mi?')) return;

        try {
            const res = await fetchWithAuth(`${API_URL}/servers/${serverId}/templates/apply/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ template_id: templateId })
            });
            const data = await res.json();
            toast.success(`${data.message}`);
            setSelectedTemplate(null);
        } catch (e) {
            toast.error('Şablon uygulanamadı');
        }
    };

    return (
        <div className="np-panel template-marketplace-panel">
            <div className="panel-header">
                <h2>🎨 Sunucu Şablonları</h2>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>

            <div className="category-tabs">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={selectedCategory === cat ? 'active' : ''}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="panel-content">
                {loading ? (
                    <div className="loading">Yükleniyor...</div>
                ) : (
                    <div className="templates-grid">
                        {templates.map(template => (
                            <div
                                key={template.id}
                                className="template-card"
                                onClick={() => setSelectedTemplate(template)}
                            >
                                <span className="template-icon">{template.icon}</span>
                                <h3>{template.name}</h3>
                                <p>{template.description}</p>
                                <div className="template-stats">
                                    <span>📥 {template.uses.toLocaleString()}</span>
                                    <span>⭐ {template.rating}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedTemplate && (
                <div className="template-detail-modal" onClick={() => setSelectedTemplate(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>{selectedTemplate.icon} {selectedTemplate.name}</h2>
                        <p>{selectedTemplate.description}</p>

                        <div className="template-preview">
                            <h4>📁 Kanallar</h4>
                            <ul>
                                {selectedTemplate.channels?.map((ch, i) => (
                                    <li key={i}>
                                        {ch.type === 'voice' ? '🔊' : '#'} {ch.name}
                                    </li>
                                ))}
                            </ul>

                            <h4>🎭 Roller</h4>
                            <div className="roles-preview">
                                {selectedTemplate.roles?.map((role, i) => (
                                    <span key={i} className="role-tag">{role}</span>
                                ))}
                            </div>
                        </div>

                        <button
                            className="apply-btn"
                            onClick={() => applyTemplate(selectedTemplate.id)}
                        >
                            Şablonu Uygula
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default {
    BotMarketplacePanel,
    PluginSystemPanel,
    StreamAnalyticsPanel,
    VoiceEffectsPanel,
    TemplateMarketplacePanel
};
