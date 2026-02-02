// frontend/src/components/EmojiTrendingPanel.js - Emoji Trending & Suggestions
import React, { useState, useEffect } from 'react';
import {
    FaSmile, FaTimes, FaFire, FaChartLine, FaClock,
    FaSearch, FaStar, FaPlus, FaTrash, FaThumbsUp,
    FaFilter, FaSort, FaDownload, FaUpload, FaImage
} from 'react-icons/fa';
import toast from '../utils/toast';
import './EmojiTrendingPanel.css';

const EmojiTrendingPanel = ({ apiBaseUrl, serverId, onClose }) => {
    const [trending, setTrending] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [myEmojis, setMyEmojis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('trending');
    const [timeRange, setTimeRange] = useState('week');
    const [searchQuery, setSearchQuery] = useState('');
    const [showUploadModal, setShowUploadModal] = useState(false);

    useEffect(() => {
        if (activeTab === 'trending') {
            fetchTrending();
        } else if (activeTab === 'suggestions') {
            fetchSuggestions();
        } else if (activeTab === 'my-emojis') {
            fetchMyEmojis();
        }
    }, [activeTab, timeRange]);

    const fetchTrending = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/emojis/trending/?range=${timeRange}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setTrending(data.emojis || data || []);
            }
        } catch (error) {
            console.error('Fetch trending error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSuggestions = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/emojis/suggestions/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setSuggestions(data.suggestions || data || []);
            }
        } catch (error) {
            console.error('Fetch suggestions error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMyEmojis = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/emojis/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setMyEmojis(data.emojis || data || []);
            }
        } catch (error) {
            console.error('Fetch emojis error:', error);
        } finally {
            setLoading(false);
        }
    };

    const voteSuggestion = async (suggestionId, vote) => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`${apiBaseUrl}/emojis/suggestions/${suggestionId}/vote/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ vote })
            });
            fetchSuggestions();
        } catch (error) {
            console.error('Vote error:', error);
        }
    };

    const approveSuggestion = async (suggestionId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/emojis/suggestions/${suggestionId}/approve/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                toast.success('✅ Emoji önerisi onaylandı');
                fetchSuggestions();
                fetchMyEmojis();
            }
        } catch (error) {
            console.error('Approve error:', error);
        }
    };

    const deleteEmoji = async (emojiId) => {
        if (!window.confirm('Bu emojiyi silmek istiyor musunuz?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/emojis/${emojiId}/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                toast.success('🗑️ Emoji silindi');
                fetchMyEmojis();
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const filteredItems = (items) => {
        if (!searchQuery) return items;
        return items.filter(item =>
            item.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    return (
        <div className="emoji-trending-overlay" onClick={onClose}>
            <div className="emoji-trending-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <h2><FaSmile /> Emoji Merkezi</h2>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="tabs-bar">
                    <div className="tabs">
                        <button
                            className={`tab ${activeTab === 'trending' ? 'active' : ''}`}
                            onClick={() => setActiveTab('trending')}
                        >
                            <FaFire /> Trend
                        </button>
                        <button
                            className={`tab ${activeTab === 'suggestions' ? 'active' : ''}`}
                            onClick={() => setActiveTab('suggestions')}
                        >
                            <FaStar /> Öneriler
                        </button>
                        <button
                            className={`tab ${activeTab === 'my-emojis' ? 'active' : ''}`}
                            onClick={() => setActiveTab('my-emojis')}
                        >
                            <FaSmile /> Emojilerim
                        </button>
                    </div>

                    {activeTab === 'my-emojis' && (
                        <button className="upload-btn" onClick={() => setShowUploadModal(true)}>
                            <FaUpload /> Yükle
                        </button>
                    )}
                </div>

                <div className="toolbar">
                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Emoji ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {activeTab === 'trending' && (
                        <div className="time-filter">
                            <label><FaClock /></label>
                            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
                                <option value="today">Bugün</option>
                                <option value="week">Bu Hafta</option>
                                <option value="month">Bu Ay</option>
                                <option value="all">Tümü</option>
                            </select>
                        </div>
                    )}
                </div>

                <div className="panel-content">
                    {loading ? (
                        <div className="loading">Yükleniyor...</div>
                    ) : (
                        <>
                            {activeTab === 'trending' && (
                                <TrendingView
                                    emojis={filteredItems(trending)}
                                />
                            )}
                            {activeTab === 'suggestions' && (
                                <SuggestionsView
                                    suggestions={filteredItems(suggestions)}
                                    onVote={voteSuggestion}
                                    onApprove={approveSuggestion}
                                />
                            )}
                            {activeTab === 'my-emojis' && (
                                <MyEmojisView
                                    emojis={filteredItems(myEmojis)}
                                    onDelete={deleteEmoji}
                                />
                            )}
                        </>
                    )}
                </div>

                {showUploadModal && (
                    <UploadEmojiModal
                        apiBaseUrl={apiBaseUrl}
                        serverId={serverId}
                        onClose={() => setShowUploadModal(false)}
                        onSuccess={() => {
                            setShowUploadModal(false);
                            fetchMyEmojis();
                        }}
                    />
                )}
            </div>
        </div>
    );
};

// Trending View
const TrendingView = ({ emojis }) => {
    if (emojis.length === 0) {
        return (
            <div className="empty-state">
                <FaFire />
                <p>Henüz trend emoji yok</p>
            </div>
        );
    }

    return (
        <div className="trending-list">
            {emojis.map((emoji, idx) => (
                <div key={emoji.id} className="trending-item">
                    <span className="rank">#{idx + 1}</span>
                    <div className="emoji-preview">
                        {emoji.image_url ? (
                            <img src={emoji.image_url} alt={emoji.name} />
                        ) : (
                            <span className="emoji-char">{emoji.emoji}</span>
                        )}
                    </div>
                    <div className="emoji-info">
                        <span className="emoji-name">:{emoji.name}:</span>
                        <div className="emoji-stats">
                            <span className="uses">
                                <FaChartLine /> {emoji.use_count || 0} kullanım
                            </span>
                            {emoji.trend_change && (
                                <span className={`trend ${emoji.trend_change > 0 ? 'up' : 'down'}`}>
                                    {emoji.trend_change > 0 ? '↑' : '↓'} {Math.abs(emoji.trend_change)}%
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Suggestions View
const SuggestionsView = ({ suggestions, onVote, onApprove }) => {
    if (suggestions.length === 0) {
        return (
            <div className="empty-state">
                <FaStar />
                <p>Henüz öneri yok</p>
            </div>
        );
    }

    return (
        <div className="suggestions-list">
            {suggestions.map(suggestion => (
                <div key={suggestion.id} className="suggestion-item">
                    <div className="emoji-preview large">
                        {suggestion.image_url ? (
                            <img src={suggestion.image_url} alt={suggestion.name} />
                        ) : (
                            <FaImage />
                        )}
                    </div>
                    <div className="suggestion-info">
                        <span className="suggestion-name">:{suggestion.name}:</span>
                        <span className="suggestion-author">
                            {suggestion.author?.username || 'Bilinmeyen'} tarafından
                        </span>
                    </div>
                    <div className="vote-section">
                        <button
                            className={`vote-btn up ${suggestion.user_vote === 'up' ? 'voted' : ''}`}
                            onClick={() => onVote(suggestion.id, 'up')}
                        >
                            <FaThumbsUp /> {suggestion.upvotes || 0}
                        </button>
                        <button
                            className={`vote-btn down ${suggestion.user_vote === 'down' ? 'voted' : ''}`}
                            onClick={() => onVote(suggestion.id, 'down')}
                        >
                            👎 {suggestion.downvotes || 0}
                        </button>
                    </div>
                    <button
                        className="approve-btn"
                        onClick={() => onApprove(suggestion.id)}
                    >
                        <FaPlus /> Onayla
                    </button>
                </div>
            ))}
        </div>
    );
};

// My Emojis View
const MyEmojisView = ({ emojis, onDelete }) => {
    if (emojis.length === 0) {
        return (
            <div className="empty-state">
                <FaSmile />
                <p>Henüz emoji yok</p>
                <span className="hint">Sağ üstteki "Yükle" butonunu kullanın</span>
            </div>
        );
    }

    return (
        <div className="emojis-grid">
            {emojis.map(emoji => (
                <div key={emoji.id} className="emoji-card">
                    <div className="emoji-preview">
                        {emoji.image_url ? (
                            <img src={emoji.image_url} alt={emoji.name} />
                        ) : (
                            <span className="emoji-char">{emoji.emoji}</span>
                        )}
                        {emoji.animated && <span className="animated-badge">GIF</span>}
                    </div>
                    <span className="emoji-name">:{emoji.name}:</span>
                    <div className="emoji-meta">
                        <span>{emoji.use_count || 0} kullanım</span>
                    </div>
                    <button className="delete-btn" onClick={() => onDelete(emoji.id)}>
                        <FaTrash />
                    </button>
                </div>
            ))}
        </div>
    );
};

// Upload Emoji Modal
const UploadEmojiModal = ({ apiBaseUrl, serverId, onClose, onSuccess }) => {
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file || !name.trim()) {
            toast.error('Ad ve resim gerekli');
            return;
        }

        setUploading(true);
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('name', name);
            formData.append('image', file);

            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/emojis/upload/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });

            if (response.ok) {
                toast.success('😀 Emoji yüklendi!');
                onSuccess();
            } else {
                const error = await response.json();
                toast.error(error.message || 'Yükleme başarısız');
            }
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Yükleme hatası');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="upload-modal" onClick={e => e.stopPropagation()}>
                <h3><FaUpload /> Emoji Yükle</h3>

                <div className="upload-area">
                    <input
                        type="file"
                        accept="image/png,image/gif,image/jpeg"
                        onChange={handleFileChange}
                        id="emoji-upload"
                        hidden
                    />
                    <label htmlFor="emoji-upload" className="upload-label">
                        {preview ? (
                            <img src={preview} alt="preview" className="preview-img" />
                        ) : (
                            <>
                                <FaImage />
                                <span>Resim seçin</span>
                                <span className="hint">PNG, GIF veya JPEG (128x128 önerilir)</span>
                            </>
                        )}
                    </label>
                </div>

                <div className="form-group">
                    <label>Emoji Adı</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                        placeholder="emoji_adi"
                        maxLength={32}
                    />
                    <span className="preview-text">:{name || 'emoji'}:</span>
                </div>

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>İptal</button>
                    <button
                        className="upload-submit-btn"
                        onClick={handleUpload}
                        disabled={uploading || !file || !name.trim()}
                    >
                        {uploading ? 'Yükleniyor...' : 'Yükle'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmojiTrendingPanel;
