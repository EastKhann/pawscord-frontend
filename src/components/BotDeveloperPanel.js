// frontend/src/components/BotDeveloperPanel.js
import React, { useState, useEffect } from 'react';
import toast from '../utils/toast';
import './BotDeveloperPanel.css';

const BotDeveloperPanel = ({ apiBaseUrl, onClose }) => {
    const [bots, setBots] = useState([]);
    const [selectedBot, setSelectedBot] = useState(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('list'); // 'list', 'create', 'details'
    const [newBot, setNewBot] = useState({
        name: '',
        description: '',
        avatar_url: ''
    });
    const [analytics, setAnalytics] = useState(null);
    const [webhooks, setWebhooks] = useState([]);
    const [showCredentials, setShowCredentials] = useState(false);

    useEffect(() => {
        fetchMyBots();
    }, []);

    useEffect(() => {
        if (selectedBot && view === 'details') {
            fetchBotAnalytics(selectedBot.id);
            fetchBotWebhooks(selectedBot.id);
        }
    }, [selectedBot, view]);

    const fetchMyBots = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/bots/my/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setBots(Array.isArray(data) ? data : []);
            }
        } catch (error) {
            console.error('Bots fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchBotAnalytics = async (botId) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/bots/${botId}/analytics/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setAnalytics(data);
            }
        } catch (error) {
            console.error('Analytics fetch error:', error);
        }
    };

    const fetchBotWebhooks = async (botId) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/bots/${botId}/webhooks/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setWebhooks(Array.isArray(data) ? data : data.webhooks || []);
            }
        } catch (error) {
            console.error('Webhooks fetch error:', error);
        }
    };

    const handleCreateBot = async () => {
        if (!newBot.name.trim()) {
            toast.error('⚠️ Bot adı gerekli');
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/bots/create/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newBot)
            });

            if (response.ok) {
                const data = await response.json();
                setBots([...bots, data]);
                setSelectedBot(data);
                setShowCredentials(true);
                setView('details');
                toast.success('✅ Bot oluşturuldu!');
                setNewBot({ name: '', description: '', avatar_url: '' });
            } else {
                const error = await response.json();
                toast.error(error.error || '❌ Bot oluşturulamadı');
            }
        } catch (error) {
            console.error('Bot creation error:', error);
            toast.error('❌ Hata oluştu');
        }
    };

    const handleCreateWebhook = async (botId) => {
        const url = prompt('Webhook URL:');
        if (!url) return;

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/bots/${botId}/webhook/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url })
            });

            if (response.ok) {
                const data = await response.json();
                setWebhooks([...webhooks, data.webhook]);
                toast.success('✅ Webhook oluşturuldu!');
            } else {
                toast.error('❌ Webhook oluşturulamadı');
            }
        } catch (error) {
            console.error('Webhook creation error:', error);
        }
    };

    const handleDeleteBot = async (botId) => {
        if (!confirm('Bu botu silmek istediğinize emin misiniz?')) return;

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/bots/${botId}/delete/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                setBots(bots.filter(b => b.id !== botId));
                setSelectedBot(null);
                setView('list');
                toast.success('✅ Bot silindi');
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        toast.success(`✅ ${label} kopyalandı!`);
    };

    const formatNumber = (num) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num?.toString() || '0';
    };

    if (loading) {
        return (
            <div className="bot-panel-overlay" onClick={onClose}>
                <div className="bot-panel" onClick={e => e.stopPropagation()}>
                    <div className="bot-loading">
                        <div className="spinner"></div>
                        <p>Yükleniyor...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bot-panel-overlay" onClick={onClose}>
            <div className="bot-panel" onClick={e => e.stopPropagation()}>
                <div className="bot-header">
                    <h2>🤖 Bot Developer Panel</h2>
                    <div className="header-actions">
                        {view !== 'list' && (
                            <button 
                                className="back-to-list-btn"
                                onClick={() => { setView('list'); setSelectedBot(null); }}
                            >
                                ← Botlarım
                            </button>
                        )}
                        {view === 'list' && (
                            <button 
                                className="create-bot-btn"
                                onClick={() => setView('create')}
                            >
                                ➕ Yeni Bot
                            </button>
                        )}
                        <button className="close-btn" onClick={onClose}>✕</button>
                    </div>
                </div>

                <div className="bot-content">
                    {view === 'list' ? (
                        <div className="bots-list">
                            {bots.length > 0 ? (
                                <div className="bots-grid">
                                    {bots.map(bot => (
                                        <div 
                                            key={bot.id}
                                            className="bot-card"
                                            onClick={() => { setSelectedBot(bot); setView('details'); }}
                                        >
                                            <div className="bot-avatar">
                                                {bot.avatar_url ? (
                                                    <img src={bot.avatar_url} alt={bot.name} />
                                                ) : (
                                                    <div className="default-avatar">🤖</div>
                                                )}
                                                {bot.is_verified && (
                                                    <div className="verified-badge">✓</div>
                                                )}
                                            </div>
                                            <h3>{bot.name}</h3>
                                            {bot.description && (
                                                <p className="bot-description">{bot.description}</p>
                                            )}
                                            <div className="bot-stats">
                                                <span>🏰 {formatNumber(bot.servers_count)} sunucu</span>
                                                <span>👥 {formatNumber(bot.users_count)} kullanıcı</span>
                                            </div>
                                            <div className="bot-status">
                                                <span className={`status-badge ${bot.is_public ? 'public' : 'private'}`}>
                                                    {bot.is_public ? '🌍 Herkese Açık' : '🔒 Özel'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-bots">
                                    <div className="no-bots-icon">🤖</div>
                                    <h3>Henüz bot oluşturmadınız</h3>
                                    <p>Discord benzeri botlar oluşturup sunuculara ekleyebilirsiniz</p>
                                    <button onClick={() => setView('create')}>
                                        🚀 İlk Botunuzu Oluşturun
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : view === 'create' ? (
                        <div className="create-bot-form">
                            <h3>🤖 Yeni Bot Oluştur</h3>

                            <div className="form-group">
                                <label>Bot Adı *</label>
                                <input
                                    type="text"
                                    placeholder="ÖrnekBot"
                                    value={newBot.name}
                                    onChange={(e) => setNewBot({ ...newBot, name: e.target.value })}
                                    maxLength={32}
                                />
                            </div>

                            <div className="form-group">
                                <label>Açıklama</label>
                                <textarea
                                    placeholder="Botunuz ne yapar?"
                                    value={newBot.description}
                                    onChange={(e) => setNewBot({ ...newBot, description: e.target.value })}
                                    rows={4}
                                    maxLength={200}
                                />
                            </div>

                            <div className="form-group">
                                <label>Avatar URL (opsiyonel)</label>
                                <input
                                    type="url"
                                    placeholder="https://example.com/avatar.png"
                                    value={newBot.avatar_url}
                                    onChange={(e) => setNewBot({ ...newBot, avatar_url: e.target.value })}
                                />
                            </div>

                            <div className="form-actions">
                                <button className="submit-btn" onClick={handleCreateBot}>
                                    ✨ Bot Oluştur
                                </button>
                                <button className="cancel-btn" onClick={() => setView('list')}>
                                    İptal
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bot-details">
                            {showCredentials && (
                                <div className="credentials-alert">
                                    <h4>⚠️ Bot Kimlik Bilgileri</h4>
                                    <p>Bu bilgileri güvenli bir yerde saklayın! Bir daha gösterilmeyecek.</p>
                                    <div className="credential-item">
                                        <label>Client ID:</label>
                                        <div className="credential-value">
                                            <code>{selectedBot.client_id}</code>
                                            <button onClick={() => copyToClipboard(selectedBot.client_id, 'Client ID')}>
                                                📋
                                            </button>
                                        </div>
                                    </div>
                                    <div className="credential-item">
                                        <label>Client Secret:</label>
                                        <div className="credential-value">
                                            <code>{selectedBot.client_secret}</code>
                                            <button onClick={() => copyToClipboard(selectedBot.client_secret, 'Client Secret')}>
                                                📋
                                            </button>
                                        </div>
                                    </div>
                                    <div className="credential-item">
                                        <label>Bot Token:</label>
                                        <div className="credential-value">
                                            <code>{selectedBot.api_token}</code>
                                            <button onClick={() => copyToClipboard(selectedBot.api_token, 'Bot Token')}>
                                                📋
                                            </button>
                                        </div>
                                    </div>
                                    <button 
                                        className="dismiss-btn"
                                        onClick={() => setShowCredentials(false)}
                                    >
                                        Anladım
                                    </button>
                                </div>
                            )}

                            <div className="details-header">
                                <div className="bot-info">
                                    <div className="bot-avatar-large">
                                        {selectedBot.avatar_url ? (
                                            <img src={selectedBot.avatar_url} alt={selectedBot.name} />
                                        ) : (
                                            <div className="default-avatar">🤖</div>
                                        )}
                                    </div>
                                    <div>
                                        <h2>{selectedBot.name}</h2>
                                        <p>{selectedBot.description}</p>
                                        <div className="bot-id">
                                            ID: {selectedBot.client_id?.substring(0, 16)}...
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {analytics && (
                                <div className="analytics-section">
                                    <h3>📊 İstatistikler</h3>
                                    <div className="analytics-grid">
                                        <div className="stat-card">
                                            <div className="stat-icon">🏰</div>
                                            <div className="stat-value">{formatNumber(analytics.servers_count)}</div>
                                            <div className="stat-label">Sunucu</div>
                                        </div>
                                        <div className="stat-card">
                                            <div className="stat-icon">👥</div>
                                            <div className="stat-value">{formatNumber(analytics.users_count)}</div>
                                            <div className="stat-label">Kullanıcı</div>
                                        </div>
                                        <div className="stat-card">
                                            <div className="stat-icon">💬</div>
                                            <div className="stat-value">{formatNumber(analytics.messages_sent)}</div>
                                            <div className="stat-label">Mesaj</div>
                                        </div>
                                        <div className="stat-card">
                                            <div className="stat-icon">📡</div>
                                            <div className="stat-value">{formatNumber(analytics.api_calls)}</div>
                                            <div className="stat-label">API Çağrısı</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="webhooks-section">
                                <div className="section-header">
                                    <h3>🔗 Webhooks</h3>
                                    <button 
                                        className="add-webhook-btn"
                                        onClick={() => handleCreateWebhook(selectedBot.id)}
                                    >
                                        ➕ Webhook Ekle
                                    </button>
                                </div>

                                {webhooks.length > 0 ? (
                                    <div className="webhooks-list">
                                        {webhooks.map((webhook, idx) => (
                                            <div key={idx} className="webhook-item">
                                                <div className="webhook-icon">🔗</div>
                                                <div className="webhook-info">
                                                    <div className="webhook-url">{webhook.url}</div>
                                                    <div className="webhook-meta">
                                                        Oluşturulma: {new Date(webhook.created_at).toLocaleDateString('tr-TR')}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="no-webhooks">
                                        <p>Henüz webhook yok</p>
                                    </div>
                                )}
                            </div>

                            <div className="danger-zone">
                                <h3>⚠️ Tehlikeli Bölge</h3>
                                <button 
                                    className="delete-bot-btn"
                                    onClick={() => handleDeleteBot(selectedBot.id)}
                                >
                                    🗑️ Botu Sil
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BotDeveloperPanel;
