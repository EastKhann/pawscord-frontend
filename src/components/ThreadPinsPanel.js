// frontend/src/components/ThreadPinsPanel.js - Thread Pinning System
import React, { useState, useEffect } from 'react';
import {
    FaStream, FaTimes, FaThumbtack, FaSearch, FaHashtag,
    FaUser, FaClock, FaComment, FaTrash, FaStar, FaEye,
    FaSort, FaFilter, FaReply
} from 'react-icons/fa';
import toast from '../utils/toast';
import './ThreadPinsPanel.css';

const ThreadPinsPanel = ({ apiBaseUrl, serverId, onClose }) => {
    const [channels, setChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [threads, setThreads] = useState([]);
    const [pinnedThreads, setPinnedThreads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [view, setView] = useState('pinned'); // 'pinned', 'all'
    const [sortBy, setSortBy] = useState('pinDate'); // 'pinDate', 'activity', 'messages'

    useEffect(() => {
        fetchChannels();
    }, []);

    useEffect(() => {
        if (selectedChannel) {
            fetchThreads(selectedChannel);
        }
    }, [selectedChannel]);

    const fetchChannels = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/channels/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                const textChannels = (data.channels || data || []).filter(c => c.type === 'text' || !c.type);
                setChannels(textChannels);
                if (textChannels.length > 0) {
                    setSelectedChannel(textChannels[0].id);
                }
            }
        } catch (error) {
            console.error('Fetch channels error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchThreads = async (channelId) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const [threadsRes, pinnedRes] = await Promise.all([
                fetch(`${apiBaseUrl}/channels/${channelId}/threads/`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }),
                fetch(`${apiBaseUrl}/channels/${channelId}/threads/pinned/`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            ]);

            if (threadsRes.ok) {
                const data = await threadsRes.json();
                setThreads(data.threads || data || []);
            }
            if (pinnedRes.ok) {
                const data = await pinnedRes.json();
                setPinnedThreads(data.threads || data || []);
            }
        } catch (error) {
            console.error('Fetch threads error:', error);
        } finally {
            setLoading(false);
        }
    };

    const pinThread = async (threadId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/threads/${threadId}/pin/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('📌 Thread sabitlendi');
                const thread = threads.find(t => t.id === threadId);
                if (thread) {
                    setPinnedThreads(prev => [...prev, { ...thread, pinned_at: new Date().toISOString() }]);
                    setThreads(prev => prev.map(t =>
                        t.id === threadId ? { ...t, is_pinned: true } : t
                    ));
                }
            }
        } catch (error) {
            console.error('Pin thread error:', error);
        }
    };

    const unpinThread = async (threadId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/threads/${threadId}/unpin/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('📌 Sabitleme kaldırıldı');
                setPinnedThreads(prev => prev.filter(t => t.id !== threadId));
                setThreads(prev => prev.map(t =>
                    t.id === threadId ? { ...t, is_pinned: false } : t
                ));
            }
        } catch (error) {
            console.error('Unpin thread error:', error);
        }
    };

    const sortThreads = (threadList) => {
        return [...threadList].sort((a, b) => {
            switch (sortBy) {
                case 'pinDate':
                    return new Date(b.pinned_at || b.created_at) - new Date(a.pinned_at || a.created_at);
                case 'activity':
                    return new Date(b.last_activity || b.created_at) - new Date(a.last_activity || a.created_at);
                case 'messages':
                    return (b.message_count || 0) - (a.message_count || 0);
                default:
                    return 0;
            }
        });
    };

    const displayThreads = view === 'pinned' ? pinnedThreads : threads;
    const sortedThreads = sortThreads(displayThreads);
    const filteredThreads = sortedThreads.filter(t =>
        t.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.creator?.username?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="thread-pins-overlay" onClick={onClose}>
            <div className="thread-pins-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <h2><FaStream /> Thread Sabitleme</h2>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="channel-selector">
                    <label>Kanal:</label>
                    <div className="channel-tabs">
                        {channels.map(channel => (
                            <button
                                key={channel.id}
                                className={`channel-tab ${selectedChannel === channel.id ? 'active' : ''}`}
                                onClick={() => setSelectedChannel(channel.id)}
                            >
                                <FaHashtag /> {channel.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="toolbar">
                    <div className="view-tabs">
                        <button
                            className={`view-tab ${view === 'pinned' ? 'active' : ''}`}
                            onClick={() => setView('pinned')}
                        >
                            <FaThumbtack /> Sabitlenmiş ({pinnedThreads.length})
                        </button>
                        <button
                            className={`view-tab ${view === 'all' ? 'active' : ''}`}
                            onClick={() => setView('all')}
                        >
                            <FaStream /> Tüm Threadler ({threads.length})
                        </button>
                    </div>

                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Thread ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <select
                        className="sort-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="pinDate">Sabitleme Tarihi</option>
                        <option value="activity">Son Aktivite</option>
                        <option value="messages">Mesaj Sayısı</option>
                    </select>
                </div>

                <div className="panel-content">
                    {loading ? (
                        <div className="loading">Yükleniyor...</div>
                    ) : filteredThreads.length === 0 ? (
                        <div className="empty-state">
                            <FaStream />
                            <p>{view === 'pinned' ? 'Sabitlenmiş thread yok' : 'Thread bulunmuyor'}</p>
                        </div>
                    ) : (
                        <div className="threads-list">
                            {filteredThreads.map(thread => (
                                <ThreadCard
                                    key={thread.id}
                                    thread={thread}
                                    isPinned={pinnedThreads.some(p => p.id === thread.id)}
                                    onPin={() => pinThread(thread.id)}
                                    onUnpin={() => unpinThread(thread.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Thread Card
const ThreadCard = ({ thread, isPinned, onPin, onUnpin }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        const date = new Date(dateStr);
        return date.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatTimeAgo = (dateStr) => {
        if (!dateStr) return '-';
        const date = new Date(dateStr);
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 60) return `${minutes} dk önce`;
        if (hours < 24) return `${hours} saat önce`;
        return `${days} gün önce`;
    };

    return (
        <div className={`thread-card ${isPinned ? 'pinned' : ''}`}>
            <div className="thread-icon">
                {isPinned ? <FaThumbtack className="pin-icon" /> : <FaStream />}
            </div>

            <div className="thread-info">
                <h4 className="thread-name">{thread.name}</h4>
                <div className="thread-meta">
                    <span className="creator">
                        <FaUser /> {thread.creator?.username || 'Bilinmeyen'}
                    </span>
                    <span className="created">
                        <FaClock /> {formatDate(thread.created_at)}
                    </span>
                    {thread.last_activity && (
                        <span className="activity">
                            <FaReply /> {formatTimeAgo(thread.last_activity)}
                        </span>
                    )}
                </div>
            </div>

            <div className="thread-stats">
                <div className="stat">
                    <FaComment />
                    <span>{thread.message_count || 0}</span>
                </div>
                <div className="stat">
                    <FaUser />
                    <span>{thread.participant_count || 0}</span>
                </div>
            </div>

            <div className="thread-actions">
                {isPinned ? (
                    <button className="unpin-btn" onClick={onUnpin}>
                        <FaThumbtack /> Kaldır
                    </button>
                ) : (
                    <button className="pin-btn" onClick={onPin}>
                        <FaThumbtack /> Sabitle
                    </button>
                )}
            </div>
        </div>
    );
};

export default ThreadPinsPanel;
