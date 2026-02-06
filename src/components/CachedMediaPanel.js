import React, { useState, useEffect } from 'react';
import {
    FaImages, FaTimes, FaTrash, FaSync, FaSearch, FaFilter,
    FaFileImage, FaFileVideo, FaFileAudio, FaFile, FaDownload,
    FaCloud, FaHdd, FaCheck, FaEye, FaExclamationTriangle,
    FaSortAmountDown, FaSortAmountUp, FaCalendar, FaDatabase
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import './CachedMediaPanel.css';

const CachedMediaPanel = ({ serverId, serverName, onClose, fetchWithAuth, apiBaseUrl }) => {
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all'); // all, images, videos, audio, other
    const [sortBy, setSortBy] = useState('newest');
    const [selectedItems, setSelectedItems] = useState([]);
    const [stats, setStats] = useState({ totalSize: 0, totalCount: 0, types: {} });
    const [previewItem, setPreviewItem] = useState(null);

    useEffect(() => {
        fetchCachedMedia();
    }, [serverId]);

    const fetchCachedMedia = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/media/cached/`);

            if (response.ok) {
                const data = await response.json();
                const mediaList = data.media || [];
                setMedia(mediaList);
                setStats(data.stats || calculateStats(mediaList));
            } else {
                // Set empty state on API error
                setMedia([]);
                setStats({ totalSize: 0, totalCount: 0, types: {} });
            }
        } catch (error) {
            console.error('Error fetching cached media:', error);
            setMedia([]);
            setStats({ totalSize: 0, totalCount: 0, types: {} });
        }
        setLoading(false);
    };

    const calculateStats = (mediaList) => {
        const types = {};
        let totalSize = 0;
        mediaList.forEach(item => {
            types[item.type] = (types[item.type] || 0) + 1;
            totalSize += item.size;
        });
        return { totalSize, totalCount: mediaList.length, types };
    };

    const formatSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
        return (bytes / 1073741824).toFixed(1) + ' GB';
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getFilteredMedia = () => {
        let filtered = [...media];

        if (filter !== 'all') {
            filtered = filtered.filter(m => m.type === filter);
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(m =>
                m.filename.toLowerCase().includes(query) ||
                m.channel.toLowerCase().includes(query)
            );
        }

        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.cached_at) - new Date(a.cached_at);
                case 'oldest':
                    return new Date(a.cached_at) - new Date(b.cached_at);
                case 'largest':
                    return b.size - a.size;
                case 'smallest':
                    return a.size - b.size;
                case 'popular':
                    return b.access_count - a.access_count;
                default:
                    return 0;
            }
        });

        return filtered;
    };

    const getFileIcon = (type) => {
        const icons = {
            image: <FaFileImage />,
            video: <FaFileVideo />,
            audio: <FaFileAudio />,
            other: <FaFile />
        };
        return icons[type] || <FaFile />;
    };

    const handleSelectItem = (id) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        const filteredIds = getFilteredMedia().map(m => m.id);
        if (selectedItems.length === filteredIds.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(filteredIds);
        }
    };

    const handleDeleteSelected = async () => {
        if (selectedItems.length === 0) return;

        try {
            await fetch(`/api/servers/${serverId}/media/cached/bulk-delete/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ids: selectedItems })
            });
        } catch (error) {
            console.error('Bulk delete error:', error);
        }

        const deletedSize = media
            .filter(m => selectedItems.includes(m.id))
            .reduce((sum, m) => sum + m.size, 0);

        setMedia(media.filter(m => !selectedItems.includes(m.id)));
        setSelectedItems([]);
        toast.success(`${selectedItems.length} dosya silindi (${formatSize(deletedSize)} boşaltıldı)`);
    };

    const handleRefreshCache = async () => {
        toast.info('Önbellek yenileniyor...');
        await fetchCachedMedia();
        toast.success('Önbellek yenilendi');
    };

    const handleClearAll = async () => {
        if (!window.confirm('Tüm önbelleği temizlemek istediğinizden emin misiniz?')) return;

        try {
            await fetch(`/api/servers/${serverId}/media/cached/clear/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
        } catch (error) {
            console.error('Clear all cache error:', error);
        }

        setMedia([]);
        setStats({ totalSize: 0, totalCount: 0, types: {} });
        toast.success('Tüm önbellek temizlendi');
    };

    const filteredMedia = getFilteredMedia();

    return (
        <div className="cachedmedia-overlay" onClick={(e) => e.target.className === 'cachedmedia-overlay' && onClose()}>
            <div className="cachedmedia-panel">
                <div className="panel-header">
                    <h2><FaImages /> Önbellekli Medya</h2>
                    <span className="server-name">{serverName}</span>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                {/* Stats Bar */}
                <div className="stats-bar">
                    <div className="stat-card total">
                        <FaDatabase className="stat-icon" />
                        <div className="stat-info">
                            <span className="stat-value">{formatSize(stats.totalSize)}</span>
                            <span className="stat-label">Toplam Boyut</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <FaFile className="stat-icon" />
                        <div className="stat-info">
                            <span className="stat-value">{stats.totalCount}</span>
                            <span className="stat-label">Dosya</span>
                        </div>
                    </div>
                    <div className="stat-card images">
                        <FaFileImage className="stat-icon" />
                        <div className="stat-info">
                            <span className="stat-value">{stats.types?.image || 0}</span>
                            <span className="stat-label">Görsel</span>
                        </div>
                    </div>
                    <div className="stat-card videos">
                        <FaFileVideo className="stat-icon" />
                        <div className="stat-info">
                            <span className="stat-value">{stats.types?.video || 0}</span>
                            <span className="stat-label">Video</span>
                        </div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="toolbar">
                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Dosya veya kanal ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">Tüm Dosyalar</option>
                        <option value="image">Görseller</option>
                        <option value="video">Videolar</option>
                        <option value="audio">Sesler</option>
                        <option value="other">Diğer</option>
                    </select>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="newest">En Yeni</option>
                        <option value="oldest">En Eski</option>
                        <option value="largest">En Büyük</option>
                        <option value="smallest">En Küçük</option>
                        <option value="popular">En Popüler</option>
                    </select>
                </div>

                {/* Actions Bar */}
                <div className="actions-bar">
                    <label className="select-all">
                        <input
                            type="checkbox"
                            checked={selectedItems.length === filteredMedia.length && filteredMedia.length > 0}
                            onChange={handleSelectAll}
                        />
                        <span>Tümünü Seç ({selectedItems.length})</span>
                    </label>
                    <div className="action-buttons">
                        {selectedItems.length > 0 && (
                            <button className="delete-btn" onClick={handleDeleteSelected}>
                                <FaTrash /> Seçilenleri Sil
                            </button>
                        )}
                        <button className="refresh-btn" onClick={handleRefreshCache}>
                            <FaSync /> Yenile
                        </button>
                        <button className="clear-btn" onClick={handleClearAll}>
                            <FaTrash /> Tümünü Temizle
                        </button>
                    </div>
                </div>

                {/* Media Grid */}
                <div className="media-grid">
                    {loading ? (
                        <div className="loading">Yükleniyor...</div>
                    ) : filteredMedia.length === 0 ? (
                        <div className="empty-state">
                            <FaCloud />
                            <p>Önbellekte dosya bulunamadı</p>
                        </div>
                    ) : (
                        filteredMedia.map(item => (
                            <div
                                key={item.id}
                                className={`media-card ${selectedItems.includes(item.id) ? 'selected' : ''}`}
                                onClick={() => handleSelectItem(item.id)}
                            >
                                <div className="media-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(item.id)}
                                        onChange={() => { }}
                                    />
                                </div>
                                <div className={`media-preview ${item.type}`}>
                                    {item.type === 'image' ? (
                                        <img src={item.url} alt={item.filename} onError={(e) => e.target.style.display = 'none'} />
                                    ) : (
                                        getFileIcon(item.type)
                                    )}
                                </div>
                                <div className="media-info">
                                    <span className="filename" title={item.filename}>
                                        {item.filename}
                                    </span>
                                    <span className="meta">
                                        {formatSize(item.size)} • #{item.channel}
                                    </span>
                                    <span className="access">
                                        <FaEye /> {item.access_count} görüntülenme
                                    </span>
                                </div>
                                <div className="media-actions">
                                    <button onClick={(e) => { e.stopPropagation(); setPreviewItem(item); }}>
                                        <FaEye />
                                    </button>
                                    <button onClick={(e) => { e.stopPropagation(); window.open(item.url); }}>
                                        <FaDownload />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Warning */}
                <div className="warning-box">
                    <FaExclamationTriangle />
                    <span>Önbelleği temizlemek, dosyaların tekrar indirilmesine neden olabilir ve geçici olarak yavaşlamaya yol açabilir.</span>
                </div>

                {/* Preview Modal */}
                {previewItem && (
                    <div className="preview-modal" onClick={() => setPreviewItem(null)}>
                        <div className="preview-content" onClick={(e) => e.stopPropagation()}>
                            <button className="close-preview" onClick={() => setPreviewItem(null)}>
                                <FaTimes />
                            </button>
                            {previewItem.type === 'image' ? (
                                <img src={previewItem.url} alt={previewItem.filename} />
                            ) : previewItem.type === 'video' ? (
                                <video src={previewItem.url} controls />
                            ) : previewItem.type === 'audio' ? (
                                <audio src={previewItem.url} controls />
                            ) : (
                                <div className="file-preview">
                                    {getFileIcon(previewItem.type)}
                                    <span>{previewItem.filename}</span>
                                </div>
                            )}
                            <div className="preview-info">
                                <span>{previewItem.filename}</span>
                                <span>{formatSize(previewItem.size)}</span>
                                <span>Önbelleğe alındı: {formatDate(previewItem.cached_at)}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CachedMediaPanel;
