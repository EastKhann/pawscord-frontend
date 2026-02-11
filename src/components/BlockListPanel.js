import { useState, useEffect } from 'react';
import './BlockListPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';

const BlockListPanel = ({ onClose }) => {
    const [blockedUsers, setBlockedUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [userToBlock, setUserToBlock] = useState('');
    const [loading, setLoading] = useState(true);
    const apiBaseUrl = getApiBase();
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        fetchBlockedUsers();
    }, []);

    const fetchBlockedUsers = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/blocks/list/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setBlockedUsers(data.blocked_users || []);
        } catch (error) {
            console.error('Error fetching blocked users:', error);
            toast.error('❌ Engelli kullanıcılar yüklenemedi');
        } finally {
            setLoading(false);
        }
    };

    const blockUser = async () => {
        if (!userToBlock.trim()) {
            toast.error('❌ Kullanıcı adı gerekli');
            return;
        }

        try {
            const response = await fetch(`${apiBaseUrl}/blocks/block/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: userToBlock
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('✅ Kullanıcı engellendi');
                setUserToBlock('');
                fetchBlockedUsers();
            } else {
                toast.error(`❌ ${data.error || 'Kullanıcı engellenemedi'}`);
            }
        } catch (error) {
            console.error('Error blocking user:', error);
            toast.error('❌ Engelleme hatası');
        }
    };

    const unblockUser = async (userId) => {
        try {
            const response = await fetch(`${apiBaseUrl}/blocks/unblock/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: userId
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('✅ Engel kaldırıldı');
                fetchBlockedUsers();
            } else {
                toast.error(`❌ ${data.error || 'Engel kaldırılamadı'}`);
            }
        } catch (error) {
            console.error('Error unblocking user:', error);
            toast.error('❌ Engel kaldırma hatası');
        }
    };

    const filteredUsers = blockedUsers.filter(user => 
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getBlockDuration = (blockedAt) => {
        const now = new Date();
        const blocked = new Date(blockedAt);
        const diffMs = now - blocked;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffMs / (1000 * 60));

        if (diffDays > 0) return `${diffDays} gün önce`;
        if (diffHours > 0) return `${diffHours} saat önce`;
        if (diffMinutes > 0) return `${diffMinutes} dakika önce`;
        return 'Az önce';
    };

    if (loading) {
        return (
            <div className="blocklist-overlay">
                <div className="blocklist-panel">
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <span>Yükleniyor...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="blocklist-overlay" onClick={onClose}>
            <div className="blocklist-panel" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="blocklist-header">
                    <h2>🚫 Engelli Kullanıcılar</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                {/* Stats */}
                <div className="blocklist-stats">
                    <div className="stat-card">
                        <span className="stat-icon">🚫</span>
                        <div className="stat-info">
                            <span className="stat-value">{blockedUsers.length}</span>
                            <span className="stat-label">Engelli Kullanıcı</span>
                        </div>
                    </div>
                </div>

                {/* Add User */}
                <div className="add-user-section">
                    <h3>Kullanıcı Engelle</h3>
                    <div className="add-user-form">
                        <input
                            type="text"
                            placeholder="Kullanıcı adı"
                            value={userToBlock}
                            onChange={(e) => setUserToBlock(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && blockUser()}
                            className="user-input"
                        />
                        <button className="block-btn" onClick={blockUser}>
                            🚫 Engelle
                        </button>
                    </div>
                    <p className="info-text">
                        Engellenen kullanıcılar size mesaj gönderemez ve sizi göremez
                    </p>
                </div>

                {/* Search */}
                <div className="search-section">
                    <input
                        type="text"
                        placeholder="🔍 Engelli kullanıcılarda ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>

                {/* Blocked Users List */}
                <div className="blocklist-content">
                    {filteredUsers.length === 0 ? (
                        <div className="empty-state">
                            <span className="empty-icon">🎉</span>
                            <h3>Engelli kullanıcı yok</h3>
                            <p>
                                {searchQuery 
                                    ? 'Arama sonucu bulunamadı' 
                                    : 'Henüz kimseyi engellemediniz'}
                            </p>
                        </div>
                    ) : (
                        <div className="blocked-users-list">
                            {filteredUsers.map((user) => (
                                <div key={user.id} className="blocked-user-card">
                                    <div className="user-avatar">
                                        {user.avatar ? (
                                            <img src={user.avatar} alt={user.username} />
                                        ) : (
                                            <div className="default-avatar">
                                                {user.username.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>

                                    <div className="user-info">
                                        <div className="user-name">
                                            <span className="username">{user.username}</span>
                                            <span className="user-tag">#{user.discriminator || '0000'}</span>
                                        </div>
                                        {user.email && (
                                            <span className="user-email">{user.email}</span>
                                        )}
                                        <span className="blocked-time">
                                            Engellendi: {getBlockDuration(user.blocked_at)}
                                        </span>
                                    </div>

                                    <div className="user-actions">
                                        <button
                                            className="unblock-btn"
                                            onClick={() => unblockUser(user.id)}
                                        >
                                            ✓ Engeli Kaldır
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info Banner */}
                <div className="info-banner">
                    <span className="info-icon">ℹ️</span>
                    <p>
                        Engellenen kullanıcılar size DM gönderemez, profilinizi göremez ve 
                        paylaşımlarınızla etkileşime geçemez. Gruplanmış serverlarda 
                        görünürlük sınırlıdır.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BlockListPanel;

