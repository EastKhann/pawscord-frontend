// frontend/src/components/PinSummaryPanel.js - Room Pin Summaries Display
import React, { useState, useEffect } from 'react';
import {
    FaThumbtack, FaTimes, FaSearch, FaHashtag, FaUser,
    FaClock, FaImage, FaLink, FaFileAlt, FaEye, FaTrash,
    FaExpandAlt, FaSortAmountDown, FaSortAmountUp, FaFilter
} from 'react-icons/fa';
import toast from '../utils/toast';
import './PinSummaryPanel.css';
import confirmDialog from '../utils/confirmDialog';

const PinSummaryPanel = ({ apiBaseUrl, serverId, onClose }) => {
    const [channels, setChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [pins, setPins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest'
    const [showPreview, setShowPreview] = useState(null);

    useEffect(() => {
        fetchChannels();
    }, []);

    useEffect(() => {
        if (selectedChannel) {
            fetchPins(selectedChannel);
        }
    }, [selectedChannel]);

    const fetchChannels = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/channels/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                const textChannels = (data.channels || data || []).filter(c => c.type === 'text' || !c.type);
                setChannels(textChannels);
                if (textChannels.length > 0 && !selectedChannel) {
                    setSelectedChannel(textChannels[0].id);
                }
            }
        } catch (error) {
            console.error('Fetch channels error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPins = async (channelId) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/channels/${channelId}/pins/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setPins(data.pins || data || []);
            }
        } catch (error) {
            console.error('Fetch pins error:', error);
        } finally {
            setLoading(false);
        }
    };

    const unpinMessage = async (messageId) => {
        if (!await confirmDialog('Bu mesajı sabitlenmişlerden kaldırmak istiyor musunuz?')) return;

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/channels/${selectedChannel}/pins/${messageId}/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('📌 Sabitleme kaldırıldı');
                setPins(prev => prev.filter(p => p.id !== messageId));
            }
        } catch (error) {
            console.error('Unpin error:', error);
        }
    };

    const getChannelName = (channelId) => {
        const channel = channels.find(c => c.id === channelId);
        return channel?.name || 'Kanal';
    };

    const sortedPins = [...pins].sort((a, b) => {
        const dateA = new Date(a.pinned_at || a.created_at);
        const dateB = new Date(b.pinned_at || b.created_at);
        return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });

    const filteredPins = sortedPins.filter(pin =>
        pin.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pin.author?.username?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const stats = {
        totalPins: pins.length,
        withAttachments: pins.filter(p => p.attachments?.length > 0).length,
        withLinks: pins.filter(p => p.content?.includes('http')).length
    };

    return (
        <div className="pin-summary-overlay" onClick={onClose}>
            <div className="pin-summary-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <h2><FaThumbtack /> Sabitlenmiş Mesajlar</h2>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="channel-selector">
                    <label>Kanal Seçin:</label>
                    <div className="channel-list">
                        {channels.map(channel => (
                            <button
                                key={channel.id}
                                className={`channel-btn ${selectedChannel === channel.id ? 'active' : ''}`}
                                onClick={() => setSelectedChannel(channel.id)}
                            >
                                <FaHashtag /> {channel.name}
                                {selectedChannel === channel.id && (
                                    <span className="pin-count">{pins.length}</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="stats-bar">
                    <div className="stat">
                        <FaThumbtack />
                        <span>{stats.totalPins} Pin</span>
                    </div>
                    <div className="stat">
                        <FaImage />
                        <span>{stats.withAttachments} Ek</span>
                    </div>
                    <div className="stat">
                        <FaLink />
                        <span>{stats.withLinks} Link</span>
                    </div>
                </div>

                <div className="toolbar">
                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Pinlerde ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button
                        className="sort-btn"
                        onClick={() => setSortBy(sortBy === 'newest' ? 'oldest' : 'newest')}
                    >
                        {sortBy === 'newest' ? <FaSortAmountDown /> : <FaSortAmountUp />}
                        {sortBy === 'newest' ? 'En Yeni' : 'En Eski'}
                    </button>
                </div>

                <div className="panel-content">
                    {loading ? (
                        <div className="loading">Yükleniyor...</div>
                    ) : filteredPins.length === 0 ? (
                        <div className="empty-state">
                            <FaThumbtack />
                            <p>Sabitlenmiş mesaj bulunmuyor</p>
                        </div>
                    ) : (
                        <div className="pins-list">
                            {filteredPins.map(pin => (
                                <PinCard
                                    key={pin.id}
                                    pin={pin}
                                    onUnpin={() => unpinMessage(pin.id)}
                                    onPreview={() => setShowPreview(pin)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {showPreview && (
                    <PreviewModal
                        pin={showPreview}
                        onClose={() => setShowPreview(null)}
                    />
                )}
            </div>
        </div>
    );
};

// Pin Card
const PinCard = ({ pin, onUnpin, onPreview }) => {
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const truncateContent = (content, maxLength = 150) => {
        if (!content) return '';
        return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
    };

    return (
        <div className="pin-card">
            <div className="pin-header">
                <div className="pin-author">
                    <div className="author-avatar">
                        {pin.author?.avatar ? (
                            <img src={pin.author.avatar} alt={pin.author.username} />
                        ) : (
                            <span>{pin.author?.username?.charAt(0).toUpperCase() || '?'}</span>
                        )}
                    </div>
                    <span className="author-name">{pin.author?.username || 'Bilinmeyen'}</span>
                </div>
                <div className="pin-time">
                    <FaClock />
                    <span>{formatDate(pin.pinned_at || pin.created_at)}</span>
                </div>
            </div>

            <div className="pin-content">
                <p>{truncateContent(pin.content)}</p>

                {pin.attachments && pin.attachments.length > 0 && (
                    <div className="pin-attachments">
                        {pin.attachments.map((att, idx) => (
                            <div key={idx} className="attachment-preview">
                                {att.type?.startsWith('image/') ? (
                                    <img src={att.url} alt="attachment" />
                                ) : (
                                    <div className="file-attachment">
                                        <FaFileAlt />
                                        <span>{att.filename}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="pin-footer">
                {pin.pinned_by && (
                    <span className="pinned-by">
                        <FaThumbtack /> {pin.pinned_by?.username} tarafından sabitlendi
                    </span>
                )}
                <div className="pin-actions">
                    <button className="preview-btn" onClick={onPreview}>
                        <FaExpandAlt /> Genişlet
                    </button>
                    <button className="unpin-btn" onClick={onUnpin}>
                        <FaTrash /> Kaldır
                    </button>
                </div>
            </div>
        </div>
    );
};

// Preview Modal
const PreviewModal = ({ pin, onClose }) => {
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="preview-modal-overlay" onClick={onClose}>
            <div className="preview-modal" onClick={e => e.stopPropagation()}>
                <div className="preview-header">
                    <div className="preview-author">
                        <div className="author-avatar large">
                            {pin.author?.avatar ? (
                                <img src={pin.author.avatar} alt={pin.author.username} />
                            ) : (
                                <span>{pin.author?.username?.charAt(0).toUpperCase() || '?'}</span>
                            )}
                        </div>
                        <div className="author-info">
                            <span className="name">{pin.author?.username}</span>
                            <span className="time">{formatDate(pin.created_at)}</span>
                        </div>
                    </div>
                    <button className="close-preview" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="preview-content">
                    <p>{pin.content}</p>

                    {pin.attachments && pin.attachments.length > 0 && (
                        <div className="preview-attachments">
                            {pin.attachments.map((att, idx) => (
                                <div key={idx} className="attachment-full">
                                    {att.type?.startsWith('image/') ? (
                                        <img src={att.url} alt="attachment" />
                                    ) : (
                                        <a href={att.url} target="_blank" rel="noopener noreferrer" className="file-link">
                                            <FaFileAlt />
                                            <span>{att.filename}</span>
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="preview-meta">
                    <div className="meta-item">
                        <FaThumbtack />
                        <span>Sabitlenme: {formatDate(pin.pinned_at || pin.created_at)}</span>
                    </div>
                    {pin.pinned_by && (
                        <div className="meta-item">
                            <FaUser />
                            <span>Sabitleyen: {pin.pinned_by.username}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PinSummaryPanel;
