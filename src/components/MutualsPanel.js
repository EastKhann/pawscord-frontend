import React, { useState, useEffect } from 'react';
import {
    FaUserFriends, FaTimes, FaSearch, FaUser, FaServer,
    FaCircle, FaUserPlus, FaComment, FaHashtag, FaCrown,
    FaShieldAlt, FaGlobe, FaLock, FaUsers
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import './MutualsPanel.css';

const MutualsPanel = ({ userId, username, onClose, onNavigateToUser, onNavigateToServer }) => {
    const [activeTab, setActiveTab] = useState('friends');
    const [mutualFriends, setMutualFriends] = useState([]);
    const [mutualServers, setMutualServers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchMutuals();
    }, [userId]);

    const fetchMutuals = async () => {
        setLoading(true);
        try {
            // Backend expects username, not userId
            const response = await fetch(`/api/users/${username}/mutuals/`, {
                headers: { 'Authorization': `Token ${token}` }
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
        return mutualFriends.filter(f =>
            f.username.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const getFilteredServers = () => {
        if (!searchQuery) return mutualServers;
        return mutualServers.filter(s =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const getStatusColor = (status) => {
        const colors = {
            online: '#4caf50',
            idle: '#ffc107',
            dnd: '#f44336',
            offline: '#666'
        };
        return colors[status] || '#666';
    };

    const formatMemberCount = (count) => {
        if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
        if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
        return count.toString();
    };

    const handleSendMessage = (friend) => {
        toast.info(`${friend.username} ile sohbet başlatılıyor...`);
    };

    const handleAddFriend = (friend) => {
        toast.success(`${friend.username} arkadaş olarak eklendi`);
    };

    const filteredFriends = getFilteredFriends();
    const filteredServers = getFilteredServers();

    return (
        <div className="mutuals-overlay" onClick={(e) => e.target.className === 'mutuals-overlay' && onClose()}>
            <div className="mutuals-panel">
                <div className="panel-header">
                    <h2><FaUserFriends /> Ortak Bağlantılar</h2>
                    <span className="target-user">@{username}</span>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                {/* Tabs */}
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'friends' ? 'active' : ''}`}
                        onClick={() => setActiveTab('friends')}
                    >
                        <FaUserFriends />
                        <span>Ortak Arkadaşlar</span>
                        <span className="count">{mutualFriends.length}</span>
                    </button>
                    <button
                        className={`tab ${activeTab === 'servers' ? 'active' : ''}`}
                        onClick={() => setActiveTab('servers')}
                    >
                        <FaServer />
                        <span>Ortak Sunucular</span>
                        <span className="count">{mutualServers.length}</span>
                    </button>
                </div>

                {/* Search */}
                <div className="search-bar">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder={activeTab === 'friends' ? 'Arkadaş ara...' : 'Sunucu ara...'}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Content */}
                <div className="content">
                    {loading ? (
                        <div className="loading">Yükleniyor...</div>
                    ) : activeTab === 'friends' ? (
                        /* Friends List */
                        <div className="friends-list">
                            {filteredFriends.length === 0 ? (
                                <div className="empty-state">
                                    <FaUserFriends />
                                    <p>Ortak arkadaş bulunamadı</p>
                                </div>
                            ) : (
                                filteredFriends.map(friend => (
                                    <div
                                        key={friend.id}
                                        className="friend-item"
                                        onClick={() => onNavigateToUser && onNavigateToUser(friend.id)}
                                    >
                                        <div className="friend-avatar">
                                            {friend.avatar ? (
                                                <img src={friend.avatar} alt="" />
                                            ) : (
                                                <FaUser />
                                            )}
                                            <span
                                                className="status-dot"
                                                style={{ background: getStatusColor(friend.status) }}
                                            />
                                        </div>
                                        <div className="friend-info">
                                            <span className="friend-name">{friend.username}</span>
                                            {friend.activity && (
                                                <span className="friend-activity">{friend.activity}</span>
                                            )}
                                        </div>
                                        <div className="friend-actions">
                                            <button
                                                className="action-btn message"
                                                onClick={(e) => { e.stopPropagation(); handleSendMessage(friend); }}
                                                title="Mesaj Gönder"
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
                                    <p>Ortak sunucu bulunamadı</p>
                                </div>
                            ) : (
                                filteredServers.map(server => (
                                    <div
                                        key={server.id}
                                        className="server-item"
                                        onClick={() => onNavigateToServer && onNavigateToServer(server.id)}
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
                                                {server.is_owner && <FaCrown className="owner-badge" />}
                                            </div>
                                            <div className="server-meta">
                                                <span className="member-count">
                                                    <FaUsers /> {formatMemberCount(server.member_count)}
                                                </span>
                                                {server.role && (
                                                    <span className={`role-badge ${server.role.toLowerCase()}`}>
                                                        {server.role === 'Owner' && <FaCrown />}
                                                        {server.role === 'Moderator' && <FaShieldAlt />}
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
                        <FaUserFriends /> {mutualFriends.length} ortak arkadaş
                    </span>
                    <span>
                        <FaServer /> {mutualServers.length} ortak sunucu
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MutualsPanel;
