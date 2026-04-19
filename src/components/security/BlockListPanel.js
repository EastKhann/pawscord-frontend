import { useState, useEffect } from 'react';
import { getToken } from '../../utils/tokenStorage';
import PropTypes from 'prop-types';
import './BlockListPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
const BlockListPanel = ({ onClose }) => {
    const { t } = useTranslation();
    const [blockedUsers, setBlockedUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [userToBlock, setUserToBlock] = useState('');
    const [loading, setLoading] = useState(true);
    const apiBaseUrl = getApiBase();
    const token = getToken();

    useEffect(() => {
        fetchBlockedUsers();
    }, []);

    const fetchBlockedUsers = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/blocks/list/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setBlockedUsers(data.blocked_users || []);
        } catch (error) {
            logger.error('Error fetching blocked users:', error);
            toast.error(t('security.blockedUsersLoadFailed'));
        } finally {
            setLoading(false);
        }
    };

    const blockUser = async () => {
        if (!userToBlock.trim()) {
            toast.error(t('security.usernameRequired'));
            return;
        }

        try {
            const response = await fetch(`${apiBaseUrl}/blocks/block/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: userToBlock,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(t('security.userBlocked'));
                setUserToBlock('');
                fetchBlockedUsers();
            } else {
                toast.error(data.error || t('blockList.blockFailed'));
            }
        } catch (error) {
            logger.error('Error blocking user:', error);
            toast.error(t('ui.blockme_hatasi'));
        }
    };

    const unblockUser = async (userId) => {
        try {
            const response = await fetch(`${apiBaseUrl}/blocks/unblock/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(t('security.userUnblocked'));
                fetchBlockedUsers();
            } else {
                toast.error(data.error || t('ui.engel_kaldirilamadi'));
            }
        } catch (error) {
            logger.error('Error unblocking user:', error);
            toast.error(t('ui.engel_kaldirma_hatasi'));
        }
    };

    const filteredUsers = blockedUsers.filter(
        (user) =>
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

        if (diffDays > 0) return `${diffDays} days ago`;
        if (diffHours > 0) return `${diffHours} hours ago`;
        if (diffMinutes > 0) return `${diffMinutes} minutes ago`;
        return 'Just now';
    };

    if (loading) {
        return (
            <div className="blocklist-overlay">
                <div className="blocklist-panel">
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <span>{t('common.loading')}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="blocklist-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="blocklist-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                {/* Header */}
                <div className="blocklist-header">
                    <h2>🚫 Engelli Users</h2>
                    <button aria-label="Close" className="close-btn" onClick={onClose}>
                        ✕
                    </button>
                </div>

                {/* Stats */}
                <div className="blocklist-stats">
                    <div className="stat-card">
                        <span className="stat-icon">🚫</span>
                        <div className="stat-info">
                            <span className="stat-value">{blockedUsers.length}</span>
                            <span className="stat-label">Engellenen Kullanıcı</span>
                        </div>
                    </div>
                </div>

                {/* Add User */}
                <div className="add-user-section">
                    <h3>Kullanıcı Engeli</h3>
                    <div className="add-user-form">
                        <input
                            type="text"
                            placeholder="Kullanıcı adı"
                            value={userToBlock}
                            onChange={(e) => setUserToBlock(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && blockUser()}
                            className="user-input"
                        />
                        <button aria-label="block User" className="block-btn" onClick={blockUser}>
                            🚫 Block
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
                        placeholder={t('ui.engelli_kullanicilarda_search')}
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
                                            <span className="user-tag">
                                                {user.discriminator || '0000'}
                                            </span>
                                        </div>
                                        {user.email && (
                                            <span className="user-email">{user.email}</span>
                                        )}
                                        <span className="blocked-time">
                                            Blocked: {getBlockDuration(user.blocked_at)}
                                        </span>
                                    </div>

                                    <div className="user-actions">
                                        <button
                                            aria-label="Action button"
                                            className="unblock-btn"
                                            onClick={() => unblockUser(user.id)}
                                        >
                                            ✓ Unblock
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
                        paylaşımlarınızla etkileşime geçemez. Ortak sunucularda görünürlük
                        sınırlıdır.
                    </p>
                </div>
            </div>
        </div>
    );
};

BlockListPanel.propTypes = {
    onClose: PropTypes.func,
};
export default BlockListPanel;
