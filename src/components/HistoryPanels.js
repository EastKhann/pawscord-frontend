// frontend/src/components/HistoryPanels.js - Nickname, Topic, and Field Change History
import React, { useState, useEffect } from 'react';
import {
    FaHistory, FaUser, FaHashtag, FaEdit, FaTimes, FaSearch,
    FaCalendar, FaArrowRight, FaUndo, FaExclamationCircle,
    FaClock, FaFilter, FaDownload
} from 'react-icons/fa';
import toast from '../utils/toast';
import './HistoryPanels.css';
import confirmDialog from '../utils/confirmDialog';

// Main History Tabs Component
const HistoryPanels = ({ serverId, apiBaseUrl, onClose }) => {
    const [activeTab, setActiveTab] = useState('nicknames'); // 'nicknames', 'topics', 'fields'

    return (
        <div className="history-overlay" onClick={onClose}>
            <div className="history-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <h2><FaHistory /> Değişiklik Geçmişi</h2>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="panel-tabs">
                    <button
                        className={`tab ${activeTab === 'nicknames' ? 'active' : ''}`}
                        onClick={() => setActiveTab('nicknames')}
                    >
                        <FaUser /> Takma Ad Geçmişi
                    </button>
                    <button
                        className={`tab ${activeTab === 'topics' ? 'active' : ''}`}
                        onClick={() => setActiveTab('topics')}
                    >
                        <FaHashtag /> Konu Geçmişi
                    </button>
                    <button
                        className={`tab ${activeTab === 'fields' ? 'active' : ''}`}
                        onClick={() => setActiveTab('fields')}
                    >
                        <FaEdit /> Alan Değişiklikleri
                    </button>
                </div>

                <div className="panel-content">
                    {activeTab === 'nicknames' && (
                        <NicknameHistory serverId={serverId} apiBaseUrl={apiBaseUrl} />
                    )}
                    {activeTab === 'topics' && (
                        <TopicHistory serverId={serverId} apiBaseUrl={apiBaseUrl} />
                    )}
                    {activeTab === 'fields' && (
                        <FieldChangeHistory serverId={serverId} apiBaseUrl={apiBaseUrl} />
                    )}
                </div>
            </div>
        </div>
    );
};

// Nickname History Component
const NicknameHistory = ({ serverId, apiBaseUrl }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchNicknameHistory();
    }, [serverId]);

    const fetchNicknameHistory = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/history/nicknames/${serverId}/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setHistory(data.history || []);
            }
        } catch (error) {
            console.error('Fetch nickname history error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRevertNickname = async (userId, nickname) => {
        if (!await confirmDialog(`${nickname} takma adına geri dönmek istiyor musunuz?`)) return;

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/history/nicknames/revert/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ server_id: serverId, user_id: userId, nickname })
            });

            if (response.ok) {
                toast.success('✅ Takma ad geri alındı');
                fetchNicknameHistory();
            }
        } catch (error) {
            console.error('Revert nickname error:', error);
        }
    };

    const filteredHistory = searchQuery
        ? history.filter(h =>
            h.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            h.old_nickname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            h.new_nickname?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : history;

    // Group by user
    const groupedHistory = filteredHistory.reduce((acc, item) => {
        if (!acc[item.user_id]) {
            acc[item.user_id] = {
                user_id: item.user_id,
                username: item.username,
                avatar: item.avatar,
                changes: []
            };
        }
        acc[item.user_id].changes.push(item);
        return acc;
    }, {});

    if (loading) {
        return <div className="loading">Yükleniyor...</div>;
    }

    return (
        <div className="history-tab">
            <div className="search-bar">
                <FaSearch />
                <input
                    type="text"
                    placeholder="Kullanıcı veya takma ad ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {Object.values(groupedHistory).length > 0 ? (
                <div className="history-list">
                    {Object.values(groupedHistory).map(user => (
                        <div key={user.user_id} className="user-history-card">
                            <div
                                className="user-header"
                                onClick={() => setSelectedUser(selectedUser === user.user_id ? null : user.user_id)}
                            >
                                <img
                                    src={user.avatar || '/default-avatar.png'}
                                    alt={user.username}
                                    className="avatar"
                                />
                                <div className="user-info">
                                    <span className="username">{user.username}</span>
                                    <span className="change-count">{user.changes.length} değişiklik</span>
                                </div>
                                <span className={`expand-icon ${selectedUser === user.user_id ? 'expanded' : ''}`}>
                                    ▼
                                </span>
                            </div>

                            {selectedUser === user.user_id && (
                                <div className="changes-list">
                                    {user.changes.map((change, idx) => (
                                        <div key={idx} className="change-item">
                                            <div className="change-content">
                                                <span className="old-value">
                                                    {change.old_nickname || '(takma ad yok)'}
                                                </span>
                                                <FaArrowRight className="arrow" />
                                                <span className="new-value">
                                                    {change.new_nickname || '(takma ad yok)'}
                                                </span>
                                            </div>
                                            <div className="change-meta">
                                                <span className="change-time">
                                                    <FaClock /> {new Date(change.changed_at).toLocaleString('tr-TR')}
                                                </span>
                                                <span className="changed-by">
                                                    by {change.changed_by || 'Sistem'}
                                                </span>
                                            </div>
                                            <button
                                                className="revert-btn"
                                                onClick={() => handleRevertNickname(user.user_id, change.old_nickname)}
                                                title="Geri Al"
                                            >
                                                <FaUndo />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-history">
                    <FaHistory className="empty-icon" />
                    <p>Takma ad değişiklik geçmişi bulunamadı</p>
                </div>
            )}
        </div>
    );
};

// Topic History Component
const TopicHistory = ({ serverId, apiBaseUrl }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedChannel, setSelectedChannel] = useState('all');
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        fetchTopicHistory();
        fetchChannels();
    }, [serverId]);

    const fetchTopicHistory = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/history/topics/${serverId}/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setHistory(data.history || []);
            }
        } catch (error) {
            console.error('Fetch topic history error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchChannels = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/channels/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setChannels(data.channels || []);
            }
        } catch (error) {
            console.error('Fetch channels error:', error);
        }
    };

    const handleRevertTopic = async (channelId, topic) => {
        if (!await confirmDialog('Bu konuya geri dönmek istiyor musunuz?')) return;

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/history/topics/revert/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ channel_id: channelId, topic })
            });

            if (response.ok) {
                toast.success('✅ Konu geri alındı');
                fetchTopicHistory();
            }
        } catch (error) {
            console.error('Revert topic error:', error);
        }
    };

    const filteredHistory = selectedChannel === 'all'
        ? history
        : history.filter(h => h.channel_id === selectedChannel);

    if (loading) {
        return <div className="loading">Yükleniyor...</div>;
    }

    return (
        <div className="history-tab">
            <div className="filter-bar">
                <FaFilter />
                <select
                    value={selectedChannel}
                    onChange={(e) => setSelectedChannel(e.target.value)}
                >
                    <option value="all">Tüm Kanallar</option>
                    {channels.map(ch => (
                        <option key={ch.id} value={ch.id}>#{ch.name}</option>
                    ))}
                </select>
            </div>

            {filteredHistory.length > 0 ? (
                <div className="history-list topic-list">
                    {filteredHistory.map((item, idx) => (
                        <div key={idx} className="topic-item">
                            <div className="topic-header">
                                <span className="channel-name">
                                    <FaHashtag /> {item.channel_name}
                                </span>
                                <span className="change-time">
                                    {new Date(item.changed_at).toLocaleString('tr-TR')}
                                </span>
                            </div>
                            <div className="topic-change">
                                <div className="topic-old">
                                    <label>Önceki:</label>
                                    <p>{item.old_topic || '(konu yok)'}</p>
                                </div>
                                <FaArrowRight className="arrow" />
                                <div className="topic-new">
                                    <label>Yeni:</label>
                                    <p>{item.new_topic || '(konu yok)'}</p>
                                </div>
                            </div>
                            <div className="topic-footer">
                                <span className="changed-by">
                                    Değiştiren: {item.changed_by_username || 'Bilinmiyor'}
                                </span>
                                <button
                                    className="revert-btn"
                                    onClick={() => handleRevertTopic(item.channel_id, item.old_topic)}
                                >
                                    <FaUndo /> Geri Al
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-history">
                    <FaHashtag className="empty-icon" />
                    <p>Konu değişiklik geçmişi bulunamadı</p>
                </div>
            )}
        </div>
    );
};

// Field Change History Component
const FieldChangeHistory = ({ serverId, apiBaseUrl }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState('all');

    const fieldTypes = [
        { id: 'all', label: 'Tümü' },
        { id: 'server_name', label: 'Sunucu Adı' },
        { id: 'server_icon', label: 'Sunucu İkonu' },
        { id: 'server_banner', label: 'Sunucu Banner' },
        { id: 'role', label: 'Rol Değişiklikleri' },
        { id: 'channel', label: 'Kanal Değişiklikleri' },
        { id: 'permission', label: 'İzin Değişiklikleri' }
    ];

    useEffect(() => {
        fetchFieldHistory();
    }, [serverId]);

    const fetchFieldHistory = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/history/fields/${serverId}/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setHistory(data.history || []);
            }
        } catch (error) {
            console.error('Fetch field history error:', error);
        } finally {
            setLoading(false);
        }
    };

    const getFieldIcon = (type) => {
        const icons = {
            server_name: '📝',
            server_icon: '🖼️',
            server_banner: '🎨',
            role: '👤',
            channel: '📁',
            permission: '🔒'
        };
        return icons[type] || '📋';
    };

    const getSeverityClass = (type) => {
        if (type.includes('permission') || type.includes('role')) return 'warning';
        if (type.includes('delete')) return 'danger';
        return 'normal';
    };

    const filteredHistory = filterType === 'all'
        ? history
        : history.filter(h => h.field_type === filterType);

    const handleExport = () => {
        const exportData = {
            server_id: serverId,
            exported_at: new Date().toISOString(),
            history: filteredHistory
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `field_history_${serverId}.json`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('📥 Geçmiş indirildi');
    };

    if (loading) {
        return <div className="loading">Yükleniyor...</div>;
    }

    return (
        <div className="history-tab">
            <div className="toolbar">
                <div className="filter-bar">
                    <FaFilter />
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        {fieldTypes.map(type => (
                            <option key={type.id} value={type.id}>{type.label}</option>
                        ))}
                    </select>
                </div>
                <button className="export-btn" onClick={handleExport}>
                    <FaDownload /> Dışa Aktar
                </button>
            </div>

            {filteredHistory.length > 0 ? (
                <div className="history-list field-list">
                    {filteredHistory.map((item, idx) => (
                        <div key={idx} className={`field-item ${getSeverityClass(item.field_type)}`}>
                            <div className="field-header">
                                <span className="field-icon">
                                    {getFieldIcon(item.field_type)}
                                </span>
                                <span className="field-type">
                                    {fieldTypes.find(f => f.id === item.field_type)?.label || item.field_type}
                                </span>
                                <span className="field-target">
                                    {item.target_name}
                                </span>
                                <span className="change-time">
                                    <FaCalendar /> {new Date(item.changed_at).toLocaleString('tr-TR')}
                                </span>
                            </div>
                            <div className="field-change">
                                <div className="change-details">
                                    <span className="field-name">{item.field_name}:</span>
                                    <span className="old-value">{item.old_value || '(boş)'}</span>
                                    <FaArrowRight className="arrow" />
                                    <span className="new-value">{item.new_value || '(boş)'}</span>
                                </div>
                            </div>
                            <div className="field-footer">
                                <span className="changed-by">
                                    Değiştiren: {item.changed_by_username}
                                </span>
                                {item.reason && (
                                    <span className="change-reason">
                                        <FaExclamationCircle /> {item.reason}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-history">
                    <FaEdit className="empty-icon" />
                    <p>Alan değişiklik geçmişi bulunamadı</p>
                </div>
            )}
        </div>
    );
};

export default HistoryPanels;
