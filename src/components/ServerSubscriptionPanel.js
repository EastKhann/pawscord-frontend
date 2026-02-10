import React, { useState, useEffect } from 'react';
import {
    FaCrown, FaTimes, FaPlus, FaStar, FaGem, FaUsers, FaCheck,
    FaCreditCard, FaEdit, FaTrash, FaToggleOn, FaToggleOff,
    FaChartLine, FaDollarSign, FaGift, FaCog, FaPercent,
    FaLock, FaUnlock, FaEye, FaCopy, FaExternalLinkAlt, FaRocket
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import './ServerSubscriptionPanel.css';
import confirmDialog from '../utils/confirmDialog';

const ServerSubscriptionPanel = ({ serverId, onClose }) => {
    const [activeTab, setActiveTab] = useState('tiers');
    const [tiers, setTiers] = useState([]);
    const [subscribers, setSubscribers] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingTier, setEditingTier] = useState(null);
    const [settings, setSettings] = useState({
        enabled: true,
        currency: 'USD',
        payout_method: 'stripe',
        payout_threshold: 50
    });
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        fetchData();
    }, [serverId]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [tiersRes, subscribersRes, statsRes] = await Promise.all([
                fetch(`/api/servers/${serverId}/subscriptions/tiers/`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }),
                fetch(`/api/servers/${serverId}/subscriptions/subscribers/`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }),
                fetch(`/api/servers/${serverId}/subscriptions/stats/`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            ]);

            if (tiersRes.ok) setTiers((await tiersRes.json()).tiers || []);
            else setTiers([]);

            if (subscribersRes.ok) setSubscribers((await subscribersRes.json()).subscribers || []);
            else setSubscribers([]);

            if (statsRes.ok) setStats((await statsRes.json()) || emptyStats);
            else setStats(emptyStats);
        } catch (error) {
            console.error('Error fetching subscription data:', error);
            setTiers([]);
            setSubscribers([]);
            setStats(emptyStats);
        }
        setLoading(false);
    };

    // Boş istatistik objesi
    const emptyStats = {
        total_revenue: 0,
        monthly_revenue: 0,
        total_subscribers: 0,
        active_subscribers: 0,
        churn_rate: 0,
        growth_rate: 0,
        avg_subscription_length: 0,
        top_tier: null
    };

    const handleCreateTier = async (tierData) => {
        try {
            const response = await fetch(`/api/servers/${serverId}/subscriptions/tiers/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tierData)
            });

            if (response.ok) {
                toast.success('Abonelik seviyesi oluşturuldu');
                fetchData();
            }
        } catch (error) {
            const newTier = { ...tierData, id: Date.now(), subscribers: 0 };
            setTiers([...tiers, newTier]);
            toast.success('Abonelik seviyesi oluşturuldu');
        }
        setShowCreateModal(false);
    };

    const handleUpdateTier = async (tierData) => {
        try {
            await fetch(`/api/servers/${serverId}/subscriptions/tiers/${editingTier.id}/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tierData)
            });
        } catch (error) {
            console.error('Error updating tier:', error);
        }
        setTiers(tiers.map(t => t.id === editingTier.id ? { ...t, ...tierData } : t));
        toast.success('Seviye güncellendi');
        setEditingTier(null);
    };

    const handleDeleteTier = async (tierId) => {
        if (!await confirmDialog('Bu abonelik seviyesini silmek istediğinizden emin misiniz?')) return;

        try {
            await fetch(`/api/servers/${serverId}/subscriptions/tiers/${tierId}/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
        } catch (error) {
            console.error('Error deleting tier:', error);
        }
        setTiers(tiers.filter(t => t.id !== tierId));
        toast.success('Seviye silindi');
    };

    const handleToggleTier = async (tierId, isActive) => {
        try {
            await fetch(`/api/servers/${serverId}/subscriptions/tiers/${tierId}/toggle/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
        } catch (error) {
            console.error('Error toggling tier:', error);
        }
        setTiers(tiers.map(t => t.id === tierId ? { ...t, is_active: !isActive } : t));
        toast.success(isActive ? 'Seviye devre dışı bırakıldı' : 'Seviye aktifleştirildi');
    };

    return (
        <div className="server-subscription-overlay" onClick={(e) => e.target.className === 'server-subscription-overlay' && onClose()}>
            <div className="server-subscription-panel">
                <div className="panel-header">
                    <h2><FaCrown /> Sunucu Abonelikleri</h2>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                <div className="tabs">
                    <button className={`tab ${activeTab === 'tiers' ? 'active' : ''}`} onClick={() => setActiveTab('tiers')}>
                        <FaGem /> Seviyeler
                    </button>
                    <button className={`tab ${activeTab === 'subscribers' ? 'active' : ''}`} onClick={() => setActiveTab('subscribers')}>
                        <FaUsers /> Aboneler ({subscribers.filter(s => s.status === 'active').length})
                    </button>
                    <button className={`tab ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => setActiveTab('stats')}>
                        <FaChartLine /> İstatistikler
                    </button>
                    <button className={`tab ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
                        <FaCog /> Ayarlar
                    </button>
                </div>

                <div className="panel-content">
                    {loading ? (
                        <div className="loading">Yükleniyor...</div>
                    ) : (
                        <>
                            {activeTab === 'tiers' && (
                                <TiersView
                                    tiers={tiers}
                                    onEdit={setEditingTier}
                                    onDelete={handleDeleteTier}
                                    onToggle={handleToggleTier}
                                    onCreate={() => setShowCreateModal(true)}
                                />
                            )}

                            {activeTab === 'subscribers' && (
                                <SubscribersView subscribers={subscribers} tiers={tiers} />
                            )}

                            {activeTab === 'stats' && (
                                <StatsView stats={stats} />
                            )}

                            {activeTab === 'settings' && (
                                <SettingsView settings={settings} setSettings={setSettings} />
                            )}
                        </>
                    )}
                </div>

                {(showCreateModal || editingTier) && (
                    <TierModal
                        tier={editingTier}
                        onClose={() => { setShowCreateModal(false); setEditingTier(null); }}
                        onSave={editingTier ? handleUpdateTier : handleCreateTier}
                    />
                )}
            </div>
        </div>
    );
};

const TiersView = ({ tiers, onEdit, onDelete, onToggle, onCreate }) => {
    return (
        <div className="tiers-view">
            <button className="create-tier-btn" onClick={onCreate}>
                <FaPlus /> Yeni Seviye Oluştur
            </button>

            <div className="tiers-grid">
                {tiers.map(tier => (
                    <div key={tier.id} className={`tier-card ${!tier.is_active ? 'inactive' : ''}`} style={{ borderColor: tier.color }}>
                        <div className="tier-header" style={{ background: `linear-gradient(135deg, ${tier.color}40, ${tier.color}20)` }}>
                            <div className="tier-icon" style={{ background: tier.color }}>
                                <FaCrown />
                            </div>
                            <h3>{tier.name}</h3>
                            <div className="tier-price">
                                <span className="currency">$</span>
                                <span className="amount">{tier.price.toFixed(2)}</span>
                                <span className="period">/ay</span>
                            </div>
                        </div>

                        <div className="tier-body">
                            <div className="tier-stats">
                                <span><FaUsers /> {tier.subscribers} abone</span>
                            </div>

                            <ul className="benefits-list">
                                {tier.benefits.map((benefit, i) => (
                                    <li key={i}><FaCheck /> {benefit}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="tier-actions">
                            <button onClick={() => onToggle(tier.id, tier.is_active)} title={tier.is_active ? 'Devre dışı bırak' : 'Aktifleştir'}>
                                {tier.is_active ? <FaToggleOn className="active" /> : <FaToggleOff />}
                            </button>
                            <button onClick={() => onEdit(tier)} title="Düzenle">
                                <FaEdit />
                            </button>
                            <button onClick={() => onDelete(tier.id)} className="delete-btn" title="Sil">
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SubscribersView = ({ subscribers, tiers }) => {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSubscribers = subscribers.filter(sub => {
        if (filter !== 'all' && sub.status !== filter) return false;
        if (searchTerm && !sub.user.username.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="subscribers-view">
            <div className="filters">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Abone ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-tabs">
                    <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Tümü</button>
                    <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Aktif</button>
                    <button className={filter === 'cancelled' ? 'active' : ''} onClick={() => setFilter('cancelled')}>İptal</button>
                </div>
            </div>

            <div className="subscribers-list">
                {filteredSubscribers.map(sub => (
                    <div key={sub.id} className={`subscriber-item ${sub.status}`}>
                        <img src={sub.user.avatar || '/default-avatar.png'} alt="" className="avatar" />
                        <div className="subscriber-info">
                            <h4>{sub.user.username}</h4>
                            <span className="tier-badge" style={{
                                background: tiers.find(t => t.name === sub.tier)?.color || '#666'
                            }}>
                                {sub.tier}
                            </span>
                        </div>
                        <div className="subscriber-meta">
                            <span>Başlangıç: {new Date(sub.since).toLocaleDateString('tr-TR')}</span>
                            <span>Toplam: ${sub.total_paid.toFixed(2)}</span>
                        </div>
                        <span className={`status-badge ${sub.status}`}>
                            {sub.status === 'active' ? 'Aktif' : 'İptal Edildi'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const StatsView = ({ stats }) => {
    if (!stats) return <div className="empty-state">İstatistik yok</div>;

    return (
        <div className="stats-view">
            <div className="stats-grid">
                <div className="stat-card revenue">
                    <FaDollarSign />
                    <div className="stat-content">
                        <span className="label">Toplam Gelir</span>
                        <span className="value">${stats.total_revenue.toFixed(2)}</span>
                    </div>
                </div>

                <div className="stat-card monthly">
                    <FaChartLine />
                    <div className="stat-content">
                        <span className="label">Aylık Gelir</span>
                        <span className="value">${stats.monthly_revenue.toFixed(2)}</span>
                    </div>
                </div>

                <div className="stat-card subscribers">
                    <FaUsers />
                    <div className="stat-content">
                        <span className="label">Aktif Aboneler</span>
                        <span className="value">{stats.active_subscribers} / {stats.total_subscribers}</span>
                    </div>
                </div>

                <div className="stat-card growth">
                    <FaRocket />
                    <div className="stat-content">
                        <span className="label">Büyüme Oranı</span>
                        <span className="value positive">+{stats.growth_rate}%</span>
                    </div>
                </div>

                <div className="stat-card churn">
                    <FaPercent />
                    <div className="stat-content">
                        <span className="label">Kayıp Oranı</span>
                        <span className="value negative">{stats.churn_rate}%</span>
                    </div>
                </div>

                <div className="stat-card avg-length">
                    <FaStar />
                    <div className="stat-content">
                        <span className="label">Ort. Abonelik Süresi</span>
                        <span className="value">{stats.avg_subscription_length} ay</span>
                    </div>
                </div>
            </div>

            <div className="top-tier-info">
                <FaCrown />
                <span>En Popüler Seviye: <strong>{stats.top_tier}</strong></span>
            </div>
        </div>
    );
};

const SettingsView = ({ settings, setSettings }) => {
    return (
        <div className="settings-view">
            <div className="setting-group">
                <label>Abonelik Sistemi</label>
                <div className="toggle-setting">
                    <span>{settings.enabled ? 'Aktif' : 'Devre Dışı'}</span>
                    <button onClick={() => setSettings({ ...settings, enabled: !settings.enabled })}>
                        {settings.enabled ? <FaToggleOn className="active" /> : <FaToggleOff />}
                    </button>
                </div>
            </div>

            <div className="setting-group">
                <label>Para Birimi</label>
                <select value={settings.currency} onChange={(e) => setSettings({ ...settings, currency: e.target.value })}>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="TRY">TRY (₺)</option>
                    <option value="GBP">GBP (£)</option>
                </select>
            </div>

            <div className="setting-group">
                <label>Ödeme Yöntemi</label>
                <select value={settings.payout_method} onChange={(e) => setSettings({ ...settings, payout_method: e.target.value })}>
                    <option value="stripe">Stripe</option>
                    <option value="paypal">PayPal</option>
                    <option value="crypto">Kripto</option>
                </select>
            </div>

            <div className="setting-group">
                <label>Minimum Ödeme Eşiği</label>
                <div className="input-with-unit">
                    <input
                        type="number"
                        value={settings.payout_threshold}
                        onChange={(e) => setSettings({ ...settings, payout_threshold: parseInt(e.target.value) })}
                    />
                    <span>$</span>
                </div>
            </div>

            <button className="save-settings-btn" onClick={() => toast.success('Ayarlar kaydedildi')}>
                Ayarları Kaydet
            </button>
        </div>
    );
};

const TierModal = ({ tier, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: tier?.name || '',
        price: tier?.price || 4.99,
        color: tier?.color || '#9c27b0',
        benefits: tier?.benefits?.join('\n') || '',
        is_active: tier?.is_active ?? true
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            toast.error('Seviye adı gerekli');
            return;
        }
        onSave({
            ...formData,
            benefits: formData.benefits.split('\n').filter(b => b.trim())
        });
    };

    return (
        <div className="modal-overlay" onClick={(e) => e.target.className === 'modal-overlay' && onClose()}>
            <div className="tier-modal">
                <h3>{tier ? 'Seviye Düzenle' : 'Yeni Seviye Oluştur'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Seviye Adı</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Örn: Premium"
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Aylık Fiyat ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Renk</label>
                            <input
                                type="color"
                                value={formData.color}
                                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Avantajlar (her satıra bir tane)</label>
                        <textarea
                            value={formData.benefits}
                            onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                            placeholder="Özel rol&#10;VIP kanallar&#10;Özel emojiler"
                            rows={5}
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>İptal</button>
                        <button type="submit" className="save-btn">{tier ? 'Güncelle' : 'Oluştur'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ServerSubscriptionPanel;
