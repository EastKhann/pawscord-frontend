import { useState, useEffect } from 'react';
import { getToken } from '../../utils/tokenStorage';
import PropTypes from 'prop-types';
import {
    FaUserFriends,
    FaTimes,
    FaSearch,
    FaUser,
    FaServer,
    FaCircle,
    FaUserPlus,
    FaComment,
    FaHashtag,
    FaCrown,
    FaShieldAlt,
    FaGlobe,
    FaLock,
    FaUsers,
} from 'react-icons/fa';
const _s = (o) => o;
import { toast } from 'react-toastify';
import './MutualsPanel.css';

import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../../utils/apiEndpoints';
const MutualsPanel = ({ userId, username, onClose, onNavigateToUser, onNavigateToServer }) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('friends');
    const [mutualFriends, setMutualFriends] = useState([]);
    const [mutualServers, setMutualServers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const token = getToken();

    useEffect(() => {
        fetchMutuals();
    }, [userId]);

    const fetchMutuals = async () => {
        setLoading(true);
        try {
            // Backend expects username, not userId
            const response = await fetch(`${API_BASE_URL}/users/${username}/mutuals/`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setMutualFriends(data.friends || []);
                setMutualServers(data.servers || []);
            } else {
                setMutualFriends([]);
                setMutualServers([]);
            }
        } catch (error) {
            setMutualFriends([]);
            setMutualServers([]);
        }
        setLoading(false);
    };

    const getFilteredFriends = () => {
        if (!searchQuery) return mutualFriends;
        return mutualFriends.filter((f) =>
            f.username.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const getFilteredServers = () => {
        if (!searchQuery) return mutualServers;
        return mutualServers.filter((s) =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const getStatusColor = (status) => {
        const colors = {
            online: '#4caf50',
            idle: '#ffc107',
            dnd: '#f44336',
            offline: '#666',
        };
        return colors[status] || '#666';
    };

    const formatMemberCount = (count) => {
        if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
        if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
        return count.toString();
    };

    const handleSendMessage = (friend) => {
        toast.info(t('mutuals.startingChat'));
    };

    const handleAddFriend = (friend) => {
        toast.success(t('mutuals.friendAdded'));
    };

    const filteredFriends = getFilteredFriends();
    const filteredServers = getFilteredServers();

    return (
        <div
            className="mutuals-overlay"
            role="button"
            tabIndex={0}
            onClick={(e) => e.target.className === 'mutuals-overlay' && onClose()}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div className="mutuals-panel">
                <div className="panel-header">
                    <h2>
                        <FaUserFriends /> {t('profile.mutualConnections')}
                    </h2>
                    <span className="target-user">@{username}</span>
                    <button aria-label="Close" className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {/* Tabs */}
                <div className="tabs">
                    <button
                        aria-label="Action button"
                        className={`tab ${activeTab === 'friends' ? 'active' : ''}`}
                        onClick={() => setActiveTab('friends')}
                    >
                        <FaUserFriends />
                        <span>{t('profile.mutualFriends')}</span>
                        <span className="count">{mutualFriends.length}</span>
                    </button>
                    <button
                        aria-label="Action button"
                        className={`tab ${activeTab === 'servers' ? 'active' : ''}`}
                        onClick={() => setActiveTab('servers')}
                    >
                        <FaServer />
                        <span>{t('profile.mutualServers')}</span>
                        <span className="count">{mutualServers.length}</span>
                    </button>
                </div>

                {/* Search */}
                <div className="search-bar">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder={
                            activeTab === 'friends'
                                ? t('profile.searchFriends')
                                : t('profile.searchServers')
                        }
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Content */}
                <div className="content">
                    {loading ? (
                        <div className="loading">{t('common.loading')}</div>
                    ) : activeTab === 'friends' ? (
                        /* Friends List */
                        <div className="friends-list">
                            {filteredFriends.length === 0 ? (
                                <div className="empty-state">
                                    <FaUserFriends />
                                    <p>{t('profile.noMutualFriends')}</p>
                                </div>
                            ) : (
                                filteredFriends.map((friend) => (
                                    <div
                                        key={friend.id}
                                        className="friend-item"
                                        role="button"
                                        tabIndex={0}
                                        onClick={() =>
                                            onNavigateToUser && onNavigateToUser(friend.id)
                                        }
                                        onKeyDown={(e) =>
                                            (e.key === 'Enter' || e.key === ' ') &&
                                            e.currentTarget.click()
                                        }
                                    >
                                        <div className="friend-avatar">
                                            {friend.avatar ? (
                                                <img src={friend.avatar} alt="" />
                                            ) : (
                                                <FaUser />
                                            )}
                                            <span
                                                className="status-dot"
                                                style={_s({
                                                    background: getStatusColor(friend.status),
                                                })}
                                            />
                                        </div>
                                        <div className="friend-info">
                                            <span className="friend-name">{friend.username}</span>
                                            {friend.activity && (
                                                <span className="friend-activity">
                                                    {friend.activity}
                                                </span>
                                            )}
                                        </div>
                                        <div className="friend-actions">
                                            <button
                                                aria-label="Action button"
                                                className="action-btn message"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSendMessage(friend);
                                                }}
                                                title={t('voice.sendMessage', 'Send Message')}
                                            >
                                                <FaComment />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    ) : (
                        /* Servers List */
                        <div className="servers-list">
                            {filteredServers.length === 0 ? (
                                <div className="empty-state">
                                    <FaServer />
                                    <p>{t('profile.noMutualServers')}</p>
                                </div>
                            ) : (
                                filteredServers.map((server) => (
                                    <div
                                        key={server.id}
                                        className="server-item"
                                        role="button"
                                        tabIndex={0}
                                        onClick={() =>
                                            onNavigateToServer && onNavigateToServer(server.id)
                                        }
                                        onKeyDown={(e) =>
                                            (e.key === 'Enter' || e.key === ' ') &&
                                            e.currentTarget.click()
                                        }
                                    >
                                        <div className="server-icon">
                                            {server.icon ? (
                                                <img src={server.icon} alt="" />
                                            ) : (
                                                <span>{server.name.charAt(0)}</span>
                                            )}
                                        </div>
                                        <div className="server-info">
                                            <div className="server-name-row">
                                                <span className="server-name">{server.name}</span>
                                                {server.is_owner && (
                                                    <FaCrown className="owner-badge" />
                                                )}
                                            </div>
                                            <div className="server-meta">
                                                <span className="member-count">
                                                    <FaUsers />{' '}
                                                    {formatMemberCount(server.member_count)}
                                                </span>
                                                {server.role && (
                                                    <span
                                                        className={`role-badge ${server.role.toLowerCase()}`}
                                                    >
                                                        {server.role === 'Owner' && <FaCrown />}
                                                        {server.role === 'Moderator' && (
                                                            <FaShieldAlt />
                                                        )}
                                                        {server.role}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>

                {/* Summary */}
                <div className="summary">
                    <span>
                        <FaUserFriends /> {mutualFriends.length} {t('profile.mutualFriendsCount')}
                    </span>
                    <span>
                        <FaServer /> {mutualServers.length} {t('profile.mutualServersCount')}
                    </span>
                </div>
            </div>
        </div>
    );
};

MutualsPanel.propTypes = {
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    username: PropTypes.string,
    onClose: PropTypes.func,
    onNavigateToUser: PropTypes.func,
    onNavigateToServer: PropTypes.func,
};
export default MutualsPanel;
