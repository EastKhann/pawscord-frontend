// frontend/src/components/InviteTrackerPanel.js
import React, { useState, useEffect } from 'react';
import toast from '../utils/toast';
import './InviteTrackerPanel.css';

const InviteTrackerPanel = ({ apiBaseUrl, serverId, onClose }) => {
    const [invites, setInvites] = useState([]);
    const [selectedInvite, setSelectedInvite] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newInvite, setNewInvite] = useState({
        max_uses: 0, // 0 = unlimited
        max_age: 86400, // seconds (24h default)
        temporary: false
    });

    useEffect(() => {
        fetchInvites();
    }, [serverId]);

    const fetchInvites = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/invites/debug/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setInvites(data.invites || []);
            } else {
                toast.error('❌ Davetiyeler yüklenemedi');
            }
        } catch (error) {
            console.error('Fetch invites error:', error);
            toast.error('❌ Bağlantı hatası');
        } finally {
            setLoading(false);
        }
    };

    const fetchInviteStats = async (inviteCode) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/invites/stats/${inviteCode}/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setStats(data);
                setSelectedInvite(inviteCode);
            } else {
                toast.error('❌ İstatistikler yüklenemedi');
            }
        } catch (error) {
            console.error('Fetch stats error:', error);
        }
    };

    const createInvite = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/invites/create/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    server_id: serverId,
                    ...newInvite
                })
            });

            if (response.ok) {
                const data = await response.json();
                setInvites([data.invite, ...invites]);
                setShowCreateForm(false);
                setNewInvite({ max_uses: 0, max_age: 86400, temporary: false });
                toast.success('✅ Davetiye oluşturuldu');
            } else {
                const error = await response.json();
                toast.error(`❌ ${error.error || 'İşlem başarısız'}`);
            }
        } catch (error) {
            console.error('Create invite error:', error);
            toast.error('❌ Bağlantı hatası');
        }
    };

    const deleteInvite = async (inviteCode) => {
        if (!confirm('Bu davetiyeyi silmek istediğinize emin misiniz?')) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/invites/${inviteCode}/delete/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                setInvites(invites.filter(inv => inv.code !== inviteCode));
                if (selectedInvite === inviteCode) {
                    setSelectedInvite(null);
                    setStats(null);
                }
                toast.success('✅ Davetiye silindi');
            } else {
                toast.error('❌ Silme başarısız');
            }
        } catch (error) {
            console.error('Delete invite error:', error);
            toast.error('❌ Bağlantı hatası');
        }
    };

    const exportCSV = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/invites/export_csv/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `invites_${new Date().toISOString()}.csv`;
                a.click();
                toast.success('✅ CSV indirildi');
            } else {
                toast.error('❌ Export başarısız');
            }
        } catch (error) {
            console.error('Export CSV error:', error);
            toast.error('❌ Bağlantı hatası');
        }
    };

    const copyInviteLink = (code) => {
        const link = `${window.location.origin}/invite/${code}`;
        navigator.clipboard.writeText(link);
        toast.success('✅ Link kopyalandı');
    };

    const formatDuration = (seconds) => {
        if (seconds === 0) return 'Sınırsız';
        const hours = Math.floor(seconds / 3600);
        const days = Math.floor(hours / 24);
        
        if (days > 0) return `${days} gün`;
        if (hours > 0) return `${hours} saat`;
        return `${Math.floor(seconds / 60)} dakika`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('tr-TR', {
            day: '2-digit',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (invite) => {
        if (invite.expired) return { label: 'Süresi Doldu', className: 'status-expired' };
        if (invite.max_uses > 0 && invite.uses >= invite.max_uses) return { label: 'Tükendi', className: 'status-used' };
        return { label: 'Aktif', className: 'status-active' };
    };

    return (
        <div className="invite-tracker-overlay" onClick={onClose}>
            <div className="invite-tracker-panel" onClick={e => e.stopPropagation()}>
                <div className="invite-tracker-header">
                    <h2>📨 Invite Tracker</h2>
                    <div className="header-actions">
                        <button className="export-btn" onClick={exportCSV}>
                            📥 Export CSV
                        </button>
                        <button 
                            className="create-btn"
                            onClick={() => setShowCreateForm(!showCreateForm)}
                        >
                            {showCreateForm ? '✕ İptal' : '+ Yeni Davetiye'}
                        </button>
                        <button className="close-btn" onClick={onClose}>✕</button>
                    </div>
                </div>

                {showCreateForm && (
                    <div className="create-invite-form">
                        <h3>📝 Yeni Davetiye Oluştur</h3>
                        
                        <div className="form-group">
                            <label>Maksimum Kullanım</label>
                            <select
                                value={newInvite.max_uses}
                                onChange={(e) => setNewInvite({ ...newInvite, max_uses: parseInt(e.target.value) })}
                            >
                                <option value={0}>Sınırsız</option>
                                <option value={1}>1 kullanım</option>
                                <option value={5}>5 kullanım</option>
                                <option value={10}>10 kullanım</option>
                                <option value={25}>25 kullanım</option>
                                <option value={50}>50 kullanım</option>
                                <option value={100}>100 kullanım</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Geçerlilik Süresi</label>
                            <select
                                value={newInvite.max_age}
                                onChange={(e) => setNewInvite({ ...newInvite, max_age: parseInt(e.target.value) })}
                            >
                                <option value={1800}>30 dakika</option>
                                <option value={3600}>1 saat</option>
                                <option value={21600}>6 saat</option>
                                <option value={43200}>12 saat</option>
                                <option value={86400}>1 gün</option>
                                <option value={604800}>7 gün</option>
                                <option value={0}>Hiç bitmesin</option>
                            </select>
                        </div>

                        <div className="form-group checkbox">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={newInvite.temporary}
                                    onChange={(e) => setNewInvite({ ...newInvite, temporary: e.target.checked })}
                                />
                                Geçici üyelik (sunucudan ayrılınca tekrar davet gerekir)
                            </label>
                        </div>

                        <button className="submit-btn" onClick={createInvite}>
                            📨 Davetiye Oluştur
                        </button>
                    </div>
                )}

                <div className="invite-tracker-content">
                    <div className="invites-section">
                        <h3>📋 Davetiye Listesi</h3>
                        
                        {loading ? (
                            <div className="loading-state">
                                <div className="spinner"></div>
                                <p>Yükleniyor...</p>
                            </div>
                        ) : invites.length === 0 ? (
                            <div className="empty-state">
                                <p>📭 Davetiye bulunamadı</p>
                                <button 
                                    className="create-first-btn"
                                    onClick={() => setShowCreateForm(true)}
                                >
                                    + İlk Davetiye Oluştur
                                </button>
                            </div>
                        ) : (
                            <div className="invites-list">
                                {invites.map(invite => {
                                    const status = getStatusBadge(invite);
                                    
                                    return (
                                        <div 
                                            key={invite.code} 
                                            className={`invite-card ${selectedInvite === invite.code ? 'selected' : ''}`}
                                            onClick={() => fetchInviteStats(invite.code)}
                                        >
                                            <div className="invite-header">
                                                <div className="invite-code">
                                                    <span className="code-label">Kod:</span>
                                                    <code>{invite.code}</code>
                                                    <button 
                                                        className="copy-btn"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            copyInviteLink(invite.code);
                                                        }}
                                                    >
                                                        📋
                                                    </button>
                                                </div>
                                                <span className={`status-badge ${status.className}`}>
                                                    {status.label}
                                                </span>
                                            </div>

                                            <div className="invite-stats">
                                                <div className="stat">
                                                    <span className="stat-icon">👥</span>
                                                    <span className="stat-text">
                                                        {invite.uses} / {invite.max_uses || '∞'} kullanım
                                                    </span>
                                                </div>
                                                <div className="stat">
                                                    <span className="stat-icon">⏰</span>
                                                    <span className="stat-text">
                                                        {formatDuration(invite.max_age)}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="invite-meta">
                                                <span className="creator">👤 {invite.inviter_username}</span>
                                                <span className="date">📅 {formatDate(invite.created_at)}</span>
                                            </div>

                                            <button 
                                                className="delete-invite-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteInvite(invite.code);
                                                }}
                                            >
                                                🗑️ Sil
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {stats && (
                        <div className="stats-section">
                            <h3>📊 Detaylı İstatistikler</h3>
                            
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <div className="stat-icon">👥</div>
                                    <div className="stat-value">{stats.total_uses || 0}</div>
                                    <div className="stat-label">Toplam Kullanım</div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-icon">✅</div>
                                    <div className="stat-value">{stats.successful_joins || 0}</div>
                                    <div className="stat-label">Başarılı Katılım</div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-icon">🔄</div>
                                    <div className="stat-value">{stats.click_rate || 0}%</div>
                                    <div className="stat-label">Tıklama Oranı</div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-icon">⏱️</div>
                                    <div className="stat-value">{stats.avg_time || '0m'}</div>
                                    <div className="stat-label">Ort. Kalma Süresi</div>
                                </div>
                            </div>

                            {stats.recent_joins && stats.recent_joins.length > 0 && (
                                <div className="recent-joins">
                                    <h4>Son Katılanlar</h4>
                                    <div className="joins-list">
                                        {stats.recent_joins.map((join, idx) => (
                                            <div key={idx} className="join-item">
                                                <div className="join-user">
                                                    <span className="user-icon">👤</span>
                                                    <span className="username">{join.username}</span>
                                                </div>
                                                <span className="join-date">{formatDate(join.joined_at)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InviteTrackerPanel;
