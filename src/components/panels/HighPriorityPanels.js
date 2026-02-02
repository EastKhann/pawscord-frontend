// frontend/src/components/panels/HighPriorityPanels.js
// 🚀 YÜKSEK ÖNCELİKLİ EKSİK PANELLERİ - 26 Ocak 2026

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../AuthContext';
import toast from '../../utils/toast';
import { getApiBase } from '../../utils/apiEndpoints';
import './HighPriorityPanels.css';

const API_URL = getApiBase();

// ========================================
// 🏆 TOURNAMENT SYSTEM PANEL
// ========================================
export const TournamentPanel = ({ serverId, onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [newTournament, setNewTournament] = useState({
        name: '',
        description: '',
        game: '',
        max_participants: 16,
        start_date: '',
        prizes: []
    });

    useEffect(() => {
        fetchTournaments();
    }, [serverId]);

    const fetchTournaments = async () => {
        try {
            const url = serverId
                ? `${API_URL}/tournaments/${serverId}/`
                : `${API_URL}/tournaments/`;
            const res = await fetchWithAuth(url);
            const data = await res.json();
            setTournaments(data.tournaments || []);
        } catch (e) {
            console.error('Tournament fetch error:', e);
        } finally {
            setLoading(false);
        }
    };

    const createTournament = async () => {
        if (!newTournament.name || !newTournament.game) {
            toast.error('İsim ve oyun zorunlu!');
            return;
        }
        try {
            await fetchWithAuth(`${API_URL}/tournaments/${serverId}/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTournament)
            });
            toast.success('Turnuva oluşturuldu!');
            setShowCreate(false);
            setNewTournament({ name: '', description: '', game: '', max_participants: 16, start_date: '', prizes: [] });
            fetchTournaments();
        } catch (e) {
            toast.error('Hata oluştu');
        }
    };

    const joinTournament = async (tournamentId) => {
        try {
            await fetchWithAuth(`${API_URL}/tournaments/${tournamentId}/participate/`, {
                method: 'POST'
            });
            toast.success('Turnuvaya katıldın!');
            fetchTournaments();
        } catch (e) {
            toast.error(e.message || 'Katılım başarısız');
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            registration: { text: 'Kayıt Açık', color: '#2ecc71' },
            ongoing: { text: 'Devam Ediyor', color: '#f39c12' },
            completed: { text: 'Tamamlandı', color: '#3498db' },
            cancelled: { text: 'İptal', color: '#e74c3c' }
        };
        return badges[status] || badges.registration;
    };

    return (
        <div className="hp-panel tournament-panel">
            <div className="panel-header">
                <h2>🏆 Turnuvalar</h2>
                <div className="header-actions">
                    <button onClick={() => setShowCreate(!showCreate)} className="create-btn">
                        {showCreate ? '✕ İptal' : '+ Yeni Turnuva'}
                    </button>
                    <button onClick={onClose} className="close-btn">✕</button>
                </div>
            </div>

            {showCreate && (
                <div className="create-form">
                    <h3>Yeni Turnuva Oluştur</h3>
                    <input
                        placeholder="Turnuva Adı"
                        value={newTournament.name}
                        onChange={(e) => setNewTournament({ ...newTournament, name: e.target.value })}
                    />
                    <input
                        placeholder="Oyun (örn: Valorant, CS2)"
                        value={newTournament.game}
                        onChange={(e) => setNewTournament({ ...newTournament, game: e.target.value })}
                    />
                    <textarea
                        placeholder="Açıklama..."
                        value={newTournament.description}
                        onChange={(e) => setNewTournament({ ...newTournament, description: e.target.value })}
                    />
                    <div className="form-row">
                        <input
                            type="number"
                            placeholder="Max Katılımcı"
                            value={newTournament.max_participants}
                            onChange={(e) => setNewTournament({ ...newTournament, max_participants: parseInt(e.target.value) })}
                        />
                        <input
                            type="datetime-local"
                            value={newTournament.start_date}
                            onChange={(e) => setNewTournament({ ...newTournament, start_date: e.target.value })}
                        />
                    </div>
                    <button onClick={createTournament} className="submit-btn">Oluştur</button>
                </div>
            )}

            <div className="panel-content">
                {loading ? (
                    <div className="loading">Yükleniyor...</div>
                ) : tournaments.length === 0 ? (
                    <div className="empty">
                        <span className="empty-icon">🏆</span>
                        <p>Henüz turnuva yok</p>
                    </div>
                ) : (
                    <div className="tournaments-list">
                        {tournaments.map(t => (
                            <div key={t.id} className="tournament-card">
                                <div className="tournament-header">
                                    <h3>{t.name}</h3>
                                    <span
                                        className="status-badge"
                                        style={{ backgroundColor: getStatusBadge(t.status).color }}
                                    >
                                        {getStatusBadge(t.status).text}
                                    </span>
                                </div>
                                <div className="tournament-game">🎮 {t.game}</div>
                                <p className="tournament-desc">{t.description}</p>
                                <div className="tournament-stats">
                                    <span>👥 {t.participants?.length || 0}/{t.max_participants}</span>
                                    <span>📅 {t.start_date ? new Date(t.start_date).toLocaleDateString() : 'TBA'}</span>
                                    <span>👤 {t.organizer}</span>
                                </div>
                                {t.status === 'registration' && (
                                    <button
                                        onClick={() => joinTournament(t.id)}
                                        className="join-btn"
                                    >
                                        Katıl
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// ========================================
// 🎬 CLIPS SYSTEM PANEL
// ========================================
export const ClipsPanel = ({ serverId, onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [clips, setClips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showUpload, setShowUpload] = useState(false);
    const [newClip, setNewClip] = useState({ title: '', description: '', video_url: '' });

    useEffect(() => {
        fetchClips();
    }, [serverId]);

    const fetchClips = async () => {
        try {
            const url = serverId ? `${API_URL}/clips/${serverId}/` : `${API_URL}/clips/`;
            const res = await fetchWithAuth(url);
            const data = await res.json();
            setClips(data.clips || []);
        } catch (e) {
            console.error('Clips error:', e);
        } finally {
            setLoading(false);
        }
    };

    const uploadClip = async () => {
        if (!newClip.title || !newClip.video_url) {
            toast.error('Başlık ve video URL zorunlu!');
            return;
        }
        try {
            await fetchWithAuth(`${API_URL}/clips/${serverId}/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newClip)
            });
            toast.success('Klip yüklendi!');
            setShowUpload(false);
            setNewClip({ title: '', description: '', video_url: '' });
            fetchClips();
        } catch (e) {
            toast.error('Yükleme başarısız');
        }
    };

    const likeClip = async (clipId) => {
        try {
            await fetchWithAuth(`${API_URL}/clips/interact/${clipId}/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'like' })
            });
            fetchClips();
        } catch (e) {
            console.error('Like error:', e);
        }
    };

    return (
        <div className="hp-panel clips-panel">
            <div className="panel-header">
                <h2>🎬 Klipler</h2>
                <div className="header-actions">
                    <button onClick={() => setShowUpload(!showUpload)} className="upload-btn">
                        {showUpload ? '✕ İptal' : '📤 Yükle'}
                    </button>
                    <button onClick={onClose} className="close-btn">✕</button>
                </div>
            </div>

            {showUpload && (
                <div className="upload-form">
                    <input
                        placeholder="Klip Başlığı"
                        value={newClip.title}
                        onChange={(e) => setNewClip({ ...newClip, title: e.target.value })}
                    />
                    <input
                        placeholder="Video URL"
                        value={newClip.video_url}
                        onChange={(e) => setNewClip({ ...newClip, video_url: e.target.value })}
                    />
                    <textarea
                        placeholder="Açıklama..."
                        value={newClip.description}
                        onChange={(e) => setNewClip({ ...newClip, description: e.target.value })}
                    />
                    <button onClick={uploadClip} className="submit-btn">Yükle</button>
                </div>
            )}

            <div className="panel-content">
                {loading ? (
                    <div className="loading">Yükleniyor...</div>
                ) : clips.length === 0 ? (
                    <div className="empty">
                        <span className="empty-icon">🎬</span>
                        <p>Henüz klip yok</p>
                    </div>
                ) : (
                    <div className="clips-grid">
                        {clips.map(clip => (
                            <div key={clip.id} className="clip-card">
                                <div className="clip-thumbnail">
                                    {clip.thumbnail_url ? (
                                        <img src={clip.thumbnail_url} alt={clip.title} />
                                    ) : (
                                        <div className="placeholder-thumb">🎬</div>
                                    )}
                                    <span className="duration">{clip.duration}s</span>
                                </div>
                                <div className="clip-info">
                                    <h4>{clip.title}</h4>
                                    <span className="creator">👤 {clip.creator}</span>
                                    <div className="clip-stats">
                                        <span>👁️ {clip.views}</span>
                                        <button onClick={() => likeClip(clip.id)}>
                                            ❤️ {clip.likes}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// ========================================
// 🔗 INTEGRATION HUB PANEL
// ========================================
export const IntegrationHubPanel = ({ serverId, onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [integrations, setIntegrations] = useState([]);
    const [available, setAvailable] = useState({});
    const [loading, setLoading] = useState(true);
    const [showAdd, setShowAdd] = useState(false);

    useEffect(() => {
        fetchIntegrations();
    }, [serverId]);

    const fetchIntegrations = async () => {
        try {
            const res = await fetchWithAuth(`${API_URL}/servers/${serverId}/integrations/`);
            const data = await res.json();
            setIntegrations(data.integrations || []);
            setAvailable(data.available || {});
        } catch (e) {
            console.error('Integrations error:', e);
        } finally {
            setLoading(false);
        }
    };

    const addIntegration = async (type) => {
        try {
            await fetchWithAuth(`${API_URL}/servers/${serverId}/integrations/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type })
            });
            toast.success('Entegrasyon eklendi!');
            setShowAdd(false);
            fetchIntegrations();
        } catch (e) {
            toast.error('Ekleme başarısız');
        }
    };

    const removeIntegration = async (id) => {
        try {
            await fetchWithAuth(`${API_URL}/servers/${serverId}/integrations/`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            toast.success('Entegrasyon kaldırıldı!');
            fetchIntegrations();
        } catch (e) {
            toast.error('Kaldırma başarısız');
        }
    };

    return (
        <div className="hp-panel integration-hub-panel">
            <div className="panel-header">
                <h2>🔗 Entegrasyon Merkezi</h2>
                <div className="header-actions">
                    <button onClick={() => setShowAdd(!showAdd)} className="add-btn">
                        {showAdd ? '✕ İptal' : '+ Ekle'}
                    </button>
                    <button onClick={onClose} className="close-btn">✕</button>
                </div>
            </div>

            {showAdd && (
                <div className="available-integrations">
                    <h3>Kullanılabilir Entegrasyonlar</h3>
                    <div className="integrations-grid">
                        {Object.entries(available).map(([key, data]) => (
                            <button
                                key={key}
                                className="integration-option"
                                style={{ borderColor: data.color }}
                                onClick={() => addIntegration(key)}
                            >
                                <span className="icon">{data.icon}</span>
                                <span className="name">{data.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="panel-content">
                {loading ? (
                    <div className="loading">Yükleniyor...</div>
                ) : integrations.length === 0 ? (
                    <div className="empty">
                        <span className="empty-icon">🔗</span>
                        <p>Henüz entegrasyon yok</p>
                    </div>
                ) : (
                    <div className="active-integrations">
                        {integrations.map(int => (
                            <div key={int.id} className="integration-card">
                                <span className="icon">{int.icon}</span>
                                <div className="info">
                                    <h4>{int.name}</h4>
                                    <span className="status">
                                        {int.enabled ? '✅ Aktif' : '⏸️ Pasif'}
                                    </span>
                                </div>
                                <button
                                    onClick={() => removeIntegration(int.id)}
                                    className="remove-btn"
                                >
                                    🗑️
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// ========================================
// 📖 READ RECEIPTS PANEL
// ========================================
export const ReadReceiptsPanel = ({ roomId, onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [receipts, setReceipts] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReceipts();
    }, [roomId]);

    const fetchReceipts = async () => {
        try {
            const res = await fetchWithAuth(`${API_URL}/messages/receipts/${roomId}/`);
            const data = await res.json();
            setReceipts(data.receipts || {});
        } catch (e) {
            console.error('Receipts error:', e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="hp-panel read-receipts-panel">
            <div className="panel-header">
                <h2>📖 Okundu Bilgisi</h2>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>
            <div className="panel-content">
                {loading ? (
                    <div className="loading">Yükleniyor...</div>
                ) : Object.keys(receipts).length === 0 ? (
                    <div className="empty">
                        <span className="empty-icon">📖</span>
                        <p>Okundu bilgisi yok</p>
                    </div>
                ) : (
                    <div className="receipts-list">
                        {Object.entries(receipts).map(([msgId, readers]) => (
                            <div key={msgId} className="receipt-item">
                                <span className="msg-id">Mesaj #{msgId}</span>
                                <span className="reader-count">
                                    👁️ {Object.keys(readers).length} kişi okudu
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// ========================================
// 📌 PIN CATEGORIES PANEL
// ========================================
export const PinCategoriesPanel = ({ roomId, onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [categories, setCategories] = useState({});
    const [loading, setLoading] = useState(true);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        fetchCategories();
    }, [roomId]);

    const fetchCategories = async () => {
        try {
            const res = await fetchWithAuth(`${API_URL}/rooms/${roomId}/pin-categories/`);
            const data = await res.json();
            setCategories(data.categories || {});
        } catch (e) {
            console.error('Pin categories error:', e);
        } finally {
            setLoading(false);
        }
    };

    const addCategory = async () => {
        if (!newCategory.trim()) return;
        try {
            await fetchWithAuth(`${API_URL}/rooms/${roomId}/pin-categories/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newCategory })
            });
            toast.success('Kategori eklendi!');
            setNewCategory('');
            fetchCategories();
        } catch (e) {
            toast.error('Ekleme başarısız');
        }
    };

    const deleteCategory = async (name) => {
        try {
            await fetchWithAuth(`${API_URL}/rooms/${roomId}/pin-categories/`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category: name })
            });
            toast.success('Kategori silindi!');
            fetchCategories();
        } catch (e) {
            toast.error('Silme başarısız');
        }
    };

    return (
        <div className="hp-panel pin-categories-panel">
            <div className="panel-header">
                <h2>📌 Pin Kategorileri</h2>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>
            <div className="panel-content">
                <div className="add-category">
                    <input
                        placeholder="Yeni kategori adı..."
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <button onClick={addCategory}>Ekle</button>
                </div>
                {loading ? (
                    <div className="loading">Yükleniyor...</div>
                ) : (
                    <div className="categories-list">
                        {Object.entries(categories).map(([name, pins]) => (
                            <div key={name} className="category-item">
                                <div className="category-header">
                                    <span className="name">📁 {name}</span>
                                    <span className="count">{pins.length} pin</span>
                                    <button
                                        onClick={() => deleteCategory(name)}
                                        className="delete-btn"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// ========================================
// 🚫 BAN HISTORY PANEL
// ========================================
export const BanHistoryPanel = ({ serverId, onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetchHistory();
    }, [serverId]);

    const fetchHistory = async () => {
        try {
            let url = `${API_URL}/servers/${serverId}/bans/history/`;
            if (filter) url += `?user=${filter}`;
            const res = await fetchWithAuth(url);
            const data = await res.json();
            setHistory(data.history || []);
        } catch (e) {
            console.error('Ban history error:', e);
        } finally {
            setLoading(false);
        }
    };

    const getActionColor = (action) => {
        const colors = {
            ban: '#e74c3c',
            unban: '#2ecc71',
            tempban: '#f39c12'
        };
        return colors[action] || '#888';
    };

    return (
        <div className="hp-panel ban-history-panel">
            <div className="panel-header">
                <h2>🚫 Ban Geçmişi</h2>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>
            <div className="panel-content">
                <div className="filter-bar">
                    <input
                        placeholder="Kullanıcı ara..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <button onClick={fetchHistory}>Ara</button>
                </div>
                {loading ? (
                    <div className="loading">Yükleniyor...</div>
                ) : history.length === 0 ? (
                    <div className="empty">
                        <span className="empty-icon">🚫</span>
                        <p>Ban geçmişi yok</p>
                    </div>
                ) : (
                    <div className="history-list">
                        {history.map(record => (
                            <div key={record.id} className="history-item">
                                <div className="action-badge" style={{ backgroundColor: getActionColor(record.action) }}>
                                    {record.action.toUpperCase()}
                                </div>
                                <div className="record-info">
                                    <span className="username">👤 {record.username}</span>
                                    <span className="moderator">🛡️ {record.moderator}</span>
                                    <span className="reason">📝 {record.reason}</span>
                                    <span className="timestamp">
                                        ⏰ {new Date(record.timestamp).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// ========================================
// 💎 SERVER SUBSCRIPTION PANEL
// ========================================
export const ServerSubscriptionPanel = ({ serverId, onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [tiers, setTiers] = useState([]);
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [newTier, setNewTier] = useState({ name: '', description: '', price: 5, benefits: [] });

    useEffect(() => {
        fetchData();
    }, [serverId]);

    const fetchData = async () => {
        try {
            const [tiersRes, subRes] = await Promise.all([
                fetchWithAuth(`${API_URL}/servers/${serverId}/subscription/tiers/`),
                fetchWithAuth(`${API_URL}/servers/${serverId}/subscription/`)
            ]);
            const tiersData = await tiersRes.json();
            const subData = await subRes.json();
            setTiers(tiersData.tiers || []);
            setSubscription(subData.subscription);
        } catch (e) {
            console.error('Subscription error:', e);
        } finally {
            setLoading(false);
        }
    };

    const createTier = async () => {
        if (!newTier.name) return;
        try {
            await fetchWithAuth(`${API_URL}/servers/${serverId}/subscription/tiers/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTier)
            });
            toast.success('Katman oluşturuldu!');
            setShowCreate(false);
            setNewTier({ name: '', description: '', price: 5, benefits: [] });
            fetchData();
        } catch (e) {
            toast.error('Oluşturma başarısız');
        }
    };

    const subscribe = async (tierId) => {
        try {
            await fetchWithAuth(`${API_URL}/servers/${serverId}/subscription/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tier_id: tierId })
            });
            toast.success('Abone oldunuz!');
            fetchData();
        } catch (e) {
            toast.error('Abonelik başarısız');
        }
    };

    return (
        <div className="hp-panel subscription-panel">
            <div className="panel-header">
                <h2>💎 Sunucu Aboneliği</h2>
                <div className="header-actions">
                    <button onClick={() => setShowCreate(!showCreate)} className="create-btn">
                        {showCreate ? '✕' : '+ Katman'}
                    </button>
                    <button onClick={onClose} className="close-btn">✕</button>
                </div>
            </div>

            {subscription && (
                <div className="current-subscription">
                    <span>✅ Aktif Abonelik: {subscription.tier_name}</span>
                    <span>Bitiş: {new Date(subscription.expires_at).toLocaleDateString()}</span>
                </div>
            )}

            {showCreate && (
                <div className="create-tier-form">
                    <input
                        placeholder="Katman Adı"
                        value={newTier.name}
                        onChange={(e) => setNewTier({ ...newTier, name: e.target.value })}
                    />
                    <textarea
                        placeholder="Açıklama"
                        value={newTier.description}
                        onChange={(e) => setNewTier({ ...newTier, description: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Aylık Fiyat ($)"
                        value={newTier.price}
                        onChange={(e) => setNewTier({ ...newTier, price: parseFloat(e.target.value) })}
                    />
                    <button onClick={createTier}>Oluştur</button>
                </div>
            )}

            <div className="panel-content">
                {loading ? (
                    <div className="loading">Yükleniyor...</div>
                ) : tiers.length === 0 ? (
                    <div className="empty">
                        <span className="empty-icon">💎</span>
                        <p>Henüz abonelik katmanı yok</p>
                    </div>
                ) : (
                    <div className="tiers-grid">
                        {tiers.map(tier => (
                            <div key={tier.id} className="tier-card">
                                <h3>{tier.name}</h3>
                                <div className="price">${tier.price}/ay</div>
                                <p>{tier.description}</p>
                                <div className="subscribers">
                                    👥 {tier.current_subscribers} abone
                                </div>
                                <button
                                    onClick={() => subscribe(tier.id)}
                                    className="subscribe-btn"
                                    disabled={subscription?.tier_id === tier.id}
                                >
                                    {subscription?.tier_id === tier.id ? 'Aktif' : 'Abone Ol'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default {
    TournamentPanel,
    ClipsPanel,
    IntegrationHubPanel,
    ReadReceiptsPanel,
    PinCategoriesPanel,
    BanHistoryPanel,
    ServerSubscriptionPanel
};
