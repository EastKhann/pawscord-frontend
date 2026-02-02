import React, { useState, useEffect, useRef } from 'react';
import {
    FaFilm, FaTimes, FaPlus, FaPlay, FaPause, FaList, FaMusic,
    FaTrash, FaEdit, FaArrowUp, FaArrowDown, FaUsers, FaRandom,
    FaRedo, FaStepForward, FaStepBackward, FaClock, FaYoutube,
    FaSearch, FaHeart, FaEllipsisV, FaVolumeUp, FaVolumeMute,
    FaExpand, FaCompress, FaShare, FaCopy, FaSave
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';
import './CinemaPlaylistPanel.css';

const CinemaPlaylistPanel = ({ serverId, channelId, onClose }) => {
    const [activeTab, setActiveTab] = useState('queue');
    const [playlists, setPlaylists] = useState([]);
    const [currentQueue, setCurrentQueue] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showAddVideoModal, setShowAddVideoModal] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [viewers, setViewers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [volume, setVolume] = useState(80);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [repeatMode, setRepeatMode] = useState('off'); // off, one, all
    const [shuffle, setShuffle] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchData();
    }, [serverId, channelId]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [playlistsRes, queueRes, viewersRes] = await Promise.all([
                fetch(`${getApiBase()}/api/servers/${serverId}/cinema/playlists/`, {
                    headers: { 'Authorization': `Token ${token}` }
                }),
                fetch(`${getApiBase()}/api/channels/${channelId}/cinema/queue/`, {
                    headers: { 'Authorization': `Token ${token}` }
                }),
                fetch(`${getApiBase()}/api/channels/${channelId}/cinema/viewers/`, {
                    headers: { 'Authorization': `Token ${token}` }
                })
            ]);

            if (playlistsRes.ok) {
                const data = await playlistsRes.json();
                setPlaylists(data.playlists || []);
            } else {
                setPlaylists([]);
            }

            if (queueRes.ok) {
                const queueData = await queueRes.json();
                setCurrentQueue(queueData.queue || []);
                setCurrentVideo(queueData.current || null);
            } else {
                setCurrentQueue([]);
                setCurrentVideo(null);
            }

            if (viewersRes.ok) {
                const data = await viewersRes.json();
                setViewers(data.viewers || []);
            } else {
                setViewers([]);
            }
        } catch (error) {
            console.error('Error fetching cinema data:', error);
            setPlaylists([]);
            setCurrentQueue([]);
            setCurrentVideo(null);
            setViewers([]);
        }
        setLoading(false);
    };



    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        // WebSocket'e sinyal gönder
    };

    const handleSkip = () => {
        const currentIndex = currentQueue.findIndex(v => v.id === currentVideo?.id);
        if (currentIndex < currentQueue.length - 1) {
            setCurrentVideo(currentQueue[currentIndex + 1]);
        } else if (repeatMode === 'all') {
            setCurrentVideo(currentQueue[0]);
        }
    };

    const handlePrevious = () => {
        const currentIndex = currentQueue.findIndex(v => v.id === currentVideo?.id);
        if (currentIndex > 0) {
            setCurrentVideo(currentQueue[currentIndex - 1]);
        }
    };

    const handleAddToQueue = async (video) => {
        try {
            const response = await fetch(`${getApiBase()}/api/channels/${channelId}/cinema/queue/add/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: video.url, title: video.title })
            });

            if (response.ok) {
                toast.success('Sıraya eklendi');
                fetchData();
            } else {
                toast.error('Sıraya eklenemedi');
            }
        } catch (error) {
            console.error('Error adding to queue:', error);
            toast.error('Sıraya eklenemedi');
        }
    };

    const handleRemoveFromQueue = async (videoId) => {
        try {
            const response = await fetch(`${getApiBase()}/api/channels/${channelId}/cinema/queue/${videoId}/remove/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Token ${token}` }
            });
            if (response.ok) {
                setCurrentQueue(currentQueue.filter(v => v.id !== videoId));
                toast.info('Sıradan kaldırıldı');
            } else {
                toast.error('Kaldırılamadı');
            }
        } catch (error) {
            console.error('Error removing from queue:', error);
            toast.error('Kaldırılamadı');
        }
    };

    const handleMoveInQueue = async (videoId, direction) => {
        const index = currentQueue.findIndex(v => v.id === videoId);
        if ((direction === 'up' && index > 0) || (direction === 'down' && index < currentQueue.length - 1)) {
            const newQueue = [...currentQueue];
            const swapIndex = direction === 'up' ? index - 1 : index + 1;
            [newQueue[index], newQueue[swapIndex]] = [newQueue[swapIndex], newQueue[index]];
            setCurrentQueue(newQueue);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        try {
            const response = await fetch(`${getApiBase()}/api/cinema/search/?q=${encodeURIComponent(searchQuery)}`, {
                headers: { 'Authorization': `Token ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setSearchResults(data.results || []);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Error searching:', error);
            setSearchResults([]);
        }
    };

    const handleCreatePlaylist = async (playlistData) => {
        try {
            const response = await fetch(`${getApiBase()}/api/servers/${serverId}/cinema/playlists/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(playlistData)
            });

            if (response.ok) {
                toast.success('Oynatma listesi oluşturuldu');
                fetchData();
            } else {
                toast.error('Oluşturulamadı');
            }
        } catch (error) {
            console.error('Error creating playlist:', error);
            toast.error('Oluşturulamadı');
        }
        setShowCreateModal(false);
    };

    const handleDeletePlaylist = async (playlistId) => {
        if (!window.confirm('Bu oynatma listesini silmek istediğinizden emin misiniz?')) return;

        try {
            const response = await fetch(`${getApiBase()}/api/servers/${serverId}/cinema/playlists/${playlistId}/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Token ${token}` }
            });
            if (response.ok) {
                setPlaylists(playlists.filter(p => p.id !== playlistId));
                toast.success('Oynatma listesi silindi');
            } else {
                toast.error('Silinemedi');
            }
        } catch (error) {
            console.error('Error deleting playlist:', error);
            toast.error('Silinemedi');
        }
    };

    const handleLoadPlaylist = async (playlist) => {
        try {
            const response = await fetch(`${getApiBase()}/api/servers/${serverId}/cinema/playlists/${playlist.id}/videos/`, {
                headers: { 'Authorization': `Token ${token}` }
            });

            if (response.ok) {
                const videos = await response.json();
                setCurrentQueue(videos.videos || []);
                if (videos.videos?.length > 0) {
                    setCurrentVideo(videos.videos[0]);
                }
                toast.success(`"${playlist.name}" yüklendi`);
            } else {
                toast.error('Yüklenemedi');
            }
        } catch (error) {
            console.error('Error loading playlist:', error);
            toast.error('Yüklenemedi');
        }
        setActiveTab('queue');
    };

    return (
        <div className="cinema-playlist-overlay" onClick={(e) => e.target.className === 'cinema-playlist-overlay' && onClose()}>
            <div className={`cinema-playlist-panel ${isFullscreen ? 'fullscreen' : ''}`}>
                <div className="panel-header">
                    <h2><FaFilm /> Sinema Modu</h2>
                    <div className="header-actions">
                        <div className="viewers-badge">
                            <FaUsers />
                            <span>{viewers.length} izleyici</span>
                        </div>
                        <button className="fullscreen-btn" onClick={() => setIsFullscreen(!isFullscreen)}>
                            {isFullscreen ? <FaCompress /> : <FaExpand />}
                        </button>
                        <button className="close-btn" onClick={onClose}><FaTimes /></button>
                    </div>
                </div>

                <div className="cinema-content">
                    {/* Video Player Area */}
                    <div className="player-section">
                        <div className="video-player">
                            {currentVideo ? (
                                <>
                                    <div className="video-placeholder">
                                        <FaYoutube />
                                        <span>{currentVideo.title}</span>
                                    </div>
                                    <div className="now-playing-info">
                                        <h3>{currentVideo.title}</h3>
                                        <span>Ekleyen: {currentVideo.added_by}</span>
                                    </div>
                                </>
                            ) : (
                                <div className="no-video">
                                    <FaFilm />
                                    <p>Sırada video yok</p>
                                </div>
                            )}
                        </div>

                        <div className="player-controls">
                            <div className="control-left">
                                <button className="control-btn" onClick={() => setShuffle(!shuffle)} title="Karıştır">
                                    <FaRandom className={shuffle ? 'active' : ''} />
                                </button>
                                <button className="control-btn" onClick={handlePrevious} title="Önceki">
                                    <FaStepBackward />
                                </button>
                            </div>

                            <button className="play-btn" onClick={handlePlayPause}>
                                {isPlaying ? <FaPause /> : <FaPlay />}
                            </button>

                            <div className="control-right">
                                <button className="control-btn" onClick={handleSkip} title="Sonraki">
                                    <FaStepForward />
                                </button>
                                <button
                                    className="control-btn"
                                    onClick={() => setRepeatMode(repeatMode === 'off' ? 'all' : repeatMode === 'all' ? 'one' : 'off')}
                                    title="Tekrar"
                                >
                                    <FaRedo className={repeatMode !== 'off' ? 'active' : ''} />
                                    {repeatMode === 'one' && <span className="repeat-badge">1</span>}
                                </button>
                            </div>

                            <div className="volume-control">
                                <button className="control-btn" onClick={() => setIsMuted(!isMuted)}>
                                    {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
                                </button>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={isMuted ? 0 : volume}
                                    onChange={(e) => {
                                        setVolume(parseInt(e.target.value));
                                        setIsMuted(false);
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="sidebar-section">
                        <div className="tabs">
                            <button
                                className={`tab ${activeTab === 'queue' ? 'active' : ''}`}
                                onClick={() => setActiveTab('queue')}
                            >
                                <FaList /> Sıra ({currentQueue.length})
                            </button>
                            <button
                                className={`tab ${activeTab === 'playlists' ? 'active' : ''}`}
                                onClick={() => setActiveTab('playlists')}
                            >
                                <FaMusic /> Listeler
                            </button>
                            <button
                                className={`tab ${activeTab === 'search' ? 'active' : ''}`}
                                onClick={() => setActiveTab('search')}
                            >
                                <FaSearch /> Ara
                            </button>
                        </div>

                        <div className="sidebar-content">
                            {loading ? (
                                <div className="loading">Yükleniyor...</div>
                            ) : (
                                <>
                                    {activeTab === 'queue' && (
                                        <QueueView
                                            queue={currentQueue}
                                            currentVideo={currentVideo}
                                            onPlay={setCurrentVideo}
                                            onRemove={handleRemoveFromQueue}
                                            onMove={handleMoveInQueue}
                                        />
                                    )}

                                    {activeTab === 'playlists' && (
                                        <PlaylistsView
                                            playlists={playlists}
                                            onLoad={handleLoadPlaylist}
                                            onDelete={handleDeletePlaylist}
                                            onCreate={() => setShowCreateModal(true)}
                                        />
                                    )}

                                    {activeTab === 'search' && (
                                        <SearchView
                                            searchQuery={searchQuery}
                                            setSearchQuery={setSearchQuery}
                                            onSearch={handleSearch}
                                            results={searchResults}
                                            onAdd={handleAddToQueue}
                                        />
                                    )}
                                </>
                            )}
                        </div>

                        {/* Viewers */}
                        <div className="viewers-section">
                            <h4><FaUsers /> Şu Anda İzleyenler</h4>
                            <div className="viewers-list">
                                {viewers.map(viewer => (
                                    <div key={viewer.id} className="viewer" title={viewer.username}>
                                        <img src={viewer.avatar || '/default-avatar.png'} alt="" />
                                        <span className="status-dot"></span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Create Playlist Modal */}
                {showCreateModal && (
                    <CreatePlaylistModal
                        onClose={() => setShowCreateModal(false)}
                        onCreate={handleCreatePlaylist}
                    />
                )}
            </div>
        </div>
    );
};

const QueueView = ({ queue, currentVideo, onPlay, onRemove, onMove }) => {
    if (queue.length === 0) {
        return (
            <div className="empty-queue">
                <FaList />
                <p>Sıra boş</p>
                <span>Video eklemek için arama yapın</span>
            </div>
        );
    }

    return (
        <div className="queue-list">
            {queue.map((video, index) => (
                <div
                    key={video.id}
                    className={`queue-item ${currentVideo?.id === video.id ? 'playing' : ''}`}
                >
                    <div className="queue-position">{index + 1}</div>
                    <div className="queue-thumbnail">
                        {video.thumbnail ? (
                            <img src={video.thumbnail} alt="" />
                        ) : (
                            <FaYoutube />
                        )}
                        {currentVideo?.id === video.id && (
                            <div className="playing-indicator">
                                <span></span><span></span><span></span>
                            </div>
                        )}
                    </div>
                    <div className="queue-info" onClick={() => onPlay(video)}>
                        <h4>{video.title}</h4>
                        <span><FaClock /> {video.duration} • {video.added_by}</span>
                    </div>
                    <div className="queue-actions">
                        <button onClick={() => onMove(video.id, 'up')} title="Yukarı taşı">
                            <FaArrowUp />
                        </button>
                        <button onClick={() => onMove(video.id, 'down')} title="Aşağı taşı">
                            <FaArrowDown />
                        </button>
                        <button onClick={() => onRemove(video.id)} className="remove-btn" title="Kaldır">
                            <FaTrash />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

const PlaylistsView = ({ playlists, onLoad, onDelete, onCreate }) => {
    return (
        <div className="playlists-view">
            <button className="create-playlist-btn" onClick={onCreate}>
                <FaPlus /> Yeni Oynatma Listesi
            </button>

            <div className="playlists-list">
                {playlists.map(playlist => (
                    <div key={playlist.id} className="playlist-card">
                        <div className="playlist-cover">
                            {playlist.cover ? (
                                <img src={playlist.cover} alt="" />
                            ) : (
                                <FaMusic />
                            )}
                        </div>
                        <div className="playlist-info">
                            <h4>{playlist.name}</h4>
                            <span>{playlist.videos} video • {playlist.duration}</span>
                            <span className="creator">@{playlist.creator}</span>
                        </div>
                        <div className="playlist-actions">
                            <button onClick={() => onLoad(playlist)} title="Yükle">
                                <FaPlay />
                            </button>
                            <button onClick={() => onDelete(playlist.id)} className="delete-btn" title="Sil">
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SearchView = ({ searchQuery, setSearchQuery, onSearch, results, onAdd }) => {
    return (
        <div className="search-view">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="YouTube'da ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                />
                <button onClick={onSearch}><FaSearch /></button>
            </div>

            <div className="url-input">
                <input
                    type="text"
                    placeholder="veya URL yapıştır..."
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.target.value) {
                            onAdd({ url: e.target.value, title: 'Video' });
                            e.target.value = '';
                        }
                    }}
                />
            </div>

            <div className="search-results">
                {results.map(result => (
                    <div key={result.id} className="search-result">
                        <div className="result-thumbnail">
                            {result.thumbnail ? (
                                <img src={result.thumbnail} alt="" />
                            ) : (
                                <FaYoutube />
                            )}
                            <span className="duration">{result.duration}</span>
                        </div>
                        <div className="result-info">
                            <h4>{result.title}</h4>
                            <span>{result.channel}</span>
                        </div>
                        <button className="add-btn" onClick={() => onAdd(result)}>
                            <FaPlus />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CreatePlaylistModal = ({ onClose, onCreate }) => {
    const [name, setName] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) {
            toast.error('Oynatma listesi adı gerekli');
            return;
        }
        onCreate({ name, is_public: isPublic, description });
    };

    return (
        <div className="modal-overlay" onClick={(e) => e.target.className === 'modal-overlay' && onClose()}>
            <div className="create-playlist-modal">
                <h3><FaPlus /> Yeni Oynatma Listesi</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>İsim</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Oynatma listesi adı"
                            autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <label>Açıklama</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Opsiyonel açıklama..."
                            rows={3}
                        />
                    </div>
                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={isPublic}
                                onChange={(e) => setIsPublic(e.target.checked)}
                            />
                            Herkese açık
                        </label>
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>İptal</button>
                        <button type="submit" className="create-btn">Oluştur</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CinemaPlaylistPanel;
