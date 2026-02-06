// frontend/src/components/BotAPIPanel.js
import React, { useState, useEffect } from 'react';
import { FaRobot, FaKey, FaCopy, FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaChartLine } from 'react-icons/fa';
import toast from '../utils/toast';
import './BotAPIPanel.css';

const BotAPIPanel = ({ serverId, onClose }) => {
    const [bots, setBots] = useState([]);
    const [apiTokens, setApiTokens] = useState([]);
    const [showCreateBot, setShowCreateBot] = useState(false);
    const [showTokens, setShowTokens] = useState({});
    const [loading, setLoading] = useState(true);
    const [newBot, setNewBot] = useState({
        name: '',
        description: '',
        avatar_url: '',
        prefix: '!',
        permissions: []
    });
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetchBots();
        fetchTokens();
        fetchStats();
    }, [serverId]);

    const fetchBots = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/bots/${serverId}/list/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setBots(data.bots || []);
            }
        } catch (error) {
            toast.error('❌ Botlar yüklenemedi');
        } finally {
            setLoading(false);
        }
    };

    const fetchTokens = async () => {
        try {
            const response = await fetch(`/api/bots/${serverId}/tokens/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setApiTokens(data.tokens || []);
            }
        } catch (error) {
            console.error('Failed to fetch tokens:', error);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await fetch(`/api/bots/${serverId}/stats/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setStats(data.stats);
            }
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    };

    const createBot = async () => {
        if (!newBot.name.trim()) {
            toast.error('❌ Bot adı gerekli');
            return;
        }

        try {
            const response = await fetch(`/api/bots/${serverId}/create/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newBot)
            });

            if (response.ok) {
                const data = await response.json();
                setBots([...bots, data.bot]);
                setShowCreateBot(false);
                resetNewBot();
                toast.success('✅ Bot oluşturuldu');
                
                // Show token once
                if (data.token) {
                    toast.success(`🔑 Token: ${data.token}`, { duration: 10000 });
                }
            } else {
                toast.error('❌ Bot oluşturulamadı');
            }
        } catch (error) {
            toast.error('❌ Bağlantı hatası');
        }
    };

    const deleteBot = async (botId) => {
        if (!confirm('Bu botu silmek istediğinizden emin misiniz?')) return;

        try {
            const response = await fetch(`/api/bots/${serverId}/${botId}/delete/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            if (response.ok) {
                setBots(bots.filter(b => b.id !== botId));
                toast.success('✅ Bot silindi');
            }
        } catch (error) {
            toast.error('❌ Silme başarısız');
        }
    };

    const regenerateToken = async (botId) => {
        if (!confirm('Token yenilenecek. Eski token geçersiz olacak. Devam edilsin mi?')) return;

        try {
            const response = await fetch(`/api/bots/${serverId}/${botId}/regenerate-token/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                toast.success('✅ Token yenilendi');
                toast.success(`🔑 Yeni Token: ${data.token}`, { duration: 10000 });
                fetchTokens();
            }
        } catch (error) {
            toast.error('❌ Token yenilenemedi');
        }
    };

    const toggleTokenVisibility = (tokenId) => {
        setShowTokens(prev => ({
            ...prev,
            [tokenId]: !prev[tokenId]
        }));
    };

    const copyToken = (token) => {
        navigator.clipboard.writeText(token);
        toast.success('✅ Token kopyalandı');
    };

    const resetNewBot = () => {
        setNewBot({
            name: '',
            description: '',
            avatar_url: '',
            prefix: '!',
            permissions: []
        });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="bot-api-panel-overlay" onClick={onClose}>
            <div className="bot-api-panel" onClick={(e) => e.stopPropagation()}>
                <div className="panel-header">
                    <div>
                        <h2><FaRobot /> Bot API Paneli</h2>
                        {stats && (
                            <p className="stats-summary">
                                {stats.total_bots} bot • {stats.total_commands} komut • {stats.total_requests} istek
                            </p>
                        )}
                    </div>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="panel-actions">
                    <button className="btn-create" onClick={() => setShowCreateBot(true)}>
                        <FaPlus /> Yeni Bot
                    </button>
                </div>

                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Yükleniyor...</p>
                    </div>
                ) : (
                    <div className="bots-container">
                        {bots.length === 0 ? (
                            <div className="empty-state">
                                <FaRobot size={48} />
                                <h3>Bot Yok</h3>
                                <p>İlk botunu oluştur ve API'yi kullanmaya başla</p>
                                <button className="btn-create-large" onClick={() => setShowCreateBot(true)}>
                                    <FaPlus /> Bot Oluştur
                                </button>
                            </div>
                        ) : (
                            bots.map(bot => (
                                <div key={bot.id} className="bot-card">
                                    <div className="bot-avatar">
                                        {bot.avatar_url ? (
                                            <img src={bot.avatar_url} alt={bot.name} />
                                        ) : (
                                            <div className="default-avatar">
                                                <FaRobot />
                                            </div>
                                        )}
                                        <div className={`status-dot ${bot.is_active ? 'online' : 'offline'}`}></div>
                                    </div>

                                    <div className="bot-info">
                                        <h3>{bot.name}</h3>
                                        <p>{bot.description || 'Açıklama yok'}</p>
                                        <div className="bot-meta">
                                            <span>Prefix: <code>{bot.prefix}</code></span>
                                            <span>Oluşturulma: {formatDate(bot.created_at)}</span>
                                        </div>
                                    </div>

                                    <div className="bot-stats">
                                        <div className="stat-item">
                                            <FaChartLine />
                                            <div>
                                                <span className="stat-value">{bot.commands_count || 0}</span>
                                                <span className="stat-label">Komut</span>
                                            </div>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-value">{bot.requests_today || 0}</span>
                                            <span className="stat-label">Bugün İstek</span>
                                        </div>
                                    </div>

                                    <div className="bot-token">
                                        <label>API Token</label>
                                        <div className="token-display">
                                            <code>
                                                {showTokens[bot.id] 
                                                    ? bot.token 
                                                    : '•'.repeat(40)
                                                }
                                            </code>
                                            <button 
                                                className="token-btn"
                                                onClick={() => toggleTokenVisibility(bot.id)}
                                            >
                                                {showTokens[bot.id] ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                            {showTokens[bot.id] && (
                                                <button 
                                                    className="token-btn"
                                                    onClick={() => copyToken(bot.token)}
                                                >
                                                    <FaCopy />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bot-actions">
                                        <button 
                                            className="action-btn regenerate"
                                            onClick={() => regenerateToken(bot.id)}
                                        >
                                            <FaKey /> Yenile
                                        </button>
                                        <button 
                                            className="action-btn delete"
                                            onClick={() => deleteBot(bot.id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {showCreateBot && (
                    <div className="create-bot-modal" onClick={() => setShowCreateBot(false)}>
                        <div className="create-bot-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3>Yeni Bot Oluştur</h3>
                                <button onClick={() => setShowCreateBot(false)}>×</button>
                            </div>

                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Bot Adı *</label>
                                    <input
                                        type="text"
                                        value={newBot.name}
                                        onChange={(e) => setNewBot({...newBot, name: e.target.value})}
                                        placeholder="MyAwesomeBot"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Açıklama</label>
                                    <textarea
                                        value={newBot.description}
                                        onChange={(e) => setNewBot({...newBot, description: e.target.value})}
                                        placeholder="Bot hakkında kısa açıklama..."
                                        rows={3}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Avatar URL</label>
                                    <input
                                        type="text"
                                        value={newBot.avatar_url}
                                        onChange={(e) => setNewBot({...newBot, avatar_url: e.target.value})}
                                        placeholder="https://example.com/avatar.png"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Komut Prefix</label>
                                    <input
                                        type="text"
                                        value={newBot.prefix}
                                        onChange={(e) => setNewBot({...newBot, prefix: e.target.value})}
                                        placeholder="!"
                                        maxLength={3}
                                    />
                                </div>

                                <div className="info-box">
                                    <FaKey />
                                    <div>
                                        <strong>Önemli:</strong> API token sadece bir kez gösterilecektir. 
                                        Lütfen güvenli bir yere kaydedin.
                                    </div>
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button className="btn-cancel" onClick={() => setShowCreateBot(false)}>
                                    İptal
                                </button>
                                <button className="btn-submit" onClick={createBot}>
                                    Oluştur
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BotAPIPanel;
