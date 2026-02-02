// frontend/src/components/MusicPlaylistsPanel.js - Playlist & DJ Mode UI
import React, { useState, useEffect } from 'react';
import {
    FaMusic, FaPlus, FaPlay, FaTrash, FaTimes, FaEdit, FaHeart,
    FaGlobeAmericas, FaLock, FaCrown, FaUsers, FaRandom, FaSave,
    FaSpotify, FaYoutube, FaSoundcloud, FaList, FaSearch
} from 'react-icons/fa';
import toast from '../utils/toast';
import './MusicPlaylistsPanel.css';

const MusicPlaylistsPanel = ({ roomId, apiBaseUrl, onClose, currentUser }) => {
    const [view, setView] = useState('playlists'); // 'playlists', 'create', 'djqueue', 'browse'
    const [playlists, setPlaylists] = useState([]);
    const [publicPlaylists, setPublicPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [djQueue, setDjQueue] = useState([]);
    const [djMode, setDjMode] = useState(false);
    const [currentDJ, setCurrentDJ] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Create playlist form
    const [newPlaylist, setNewPlaylist] = useState({
        name: '',
        description: '',
        is_public: false,
        cover_url: ''
    });

    // Add song form
    const [showAddSong, setShowAddSong] = useState(false);
    const [songUrl, setSongUrl] = useState('');

    useEffect(() => {
        fetchPlaylists();
        if (roomId) {
            fetchDJStatus();
        }
    }, [roomId]);

    const fetchPlaylists = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/playlists/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setPlaylists(data.playlists || []);
            }
        } catch (error) {
            console.error('Playlists fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPublicPlaylists = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/playlists/public/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setPublicPlaylists(data.playlists || []);
            }
        } catch (error) {
            console.error('Public playlists fetch error:', error);
        }
    };

    const fetchDJStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/music/${roomId}/dj-status/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setDjMode(data.dj_mode_enabled);
                setCurrentDJ(data.current_dj);
                setDjQueue(data.dj_queue || []);
            }
        } catch (error) {
            console.error('DJ status fetch error:', error);
        }
    };

    const handleCreatePlaylist = async () => {
        if (!newPlaylist.name.trim()) {
            toast.error('⚠️ Playlist adı gerekli');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/playlists/create/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPlaylist)
            });

            if (response.ok) {
                const data = await response.json();
                setPlaylists([...playlists, data.playlist]);
                setNewPlaylist({ name: '', description: '', is_public: false, cover_url: '' });
                setView('playlists');
                toast.success('✅ Playlist oluşturuldu!');
            } else {
                const error = await response.json();
                toast.error(error.error || '❌ Playlist oluşturulamadı');
            }
        } catch (error) {
            console.error('Create playlist error:', error);
            toast.error('❌ Hata oluştu');
        }
    };

    const handleAddSong = async (playlistId) => {
        if (!songUrl.trim()) {
            toast.error('⚠️ Şarkı URL\'si girin');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/playlists/${playlistId}/add-song/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: songUrl })
            });

            if (response.ok) {
                const data = await response.json();
                // Update the playlist in state
                setPlaylists(playlists.map(p =>
                    p.id === playlistId
                        ? { ...p, songs: [...(p.songs || []), data.song] }
                        : p
                ));
                if (selectedPlaylist?.id === playlistId) {
                    setSelectedPlaylist({
                        ...selectedPlaylist,
                        songs: [...(selectedPlaylist.songs || []), data.song]
                    });
                }
                setSongUrl('');
                setShowAddSong(false);
                toast.success('✅ Şarkı eklendi!');
            } else {
                const error = await response.json();
                toast.error(error.error || '❌ Şarkı eklenemedi');
            }
        } catch (error) {
            console.error('Add song error:', error);
            toast.error('❌ Hata oluştu');
        }
    };

    const handleRemoveSong = async (playlistId, songId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/playlists/${playlistId}/remove-song/${songId}/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                setPlaylists(playlists.map(p =>
                    p.id === playlistId
                        ? { ...p, songs: p.songs.filter(s => s.id !== songId) }
                        : p
                ));
                if (selectedPlaylist?.id === playlistId) {
                    setSelectedPlaylist({
                        ...selectedPlaylist,
                        songs: selectedPlaylist.songs.filter(s => s.id !== songId)
                    });
                }
                toast.success('✅ Şarkı silindi');
            }
        } catch (error) {
            console.error('Remove song error:', error);
        }
    };

    const handleDeletePlaylist = async (playlistId) => {
        if (!window.confirm('Bu playlist\'i silmek istediğinizden emin misiniz?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/playlists/${playlistId}/delete/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                setPlaylists(playlists.filter(p => p.id !== playlistId));
                if (selectedPlaylist?.id === playlistId) {
                    setSelectedPlaylist(null);
                }
                toast.success('✅ Playlist silindi');
            }
        } catch (error) {
            console.error('Delete playlist error:', error);
        }
    };

    const handleLoadPlaylist = async (playlistId) => {
        if (!roomId) {
            toast.error('⚠️ Bir ses kanalında olmalısınız');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/music/${roomId}/load-playlist/${playlistId}/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('✅ Playlist yüklendi ve çalıyor!');
            } else {
                const error = await response.json();
                toast.error(error.error || '❌ Playlist yüklenemedi');
            }
        } catch (error) {
            console.error('Load playlist error:', error);
            toast.error('❌ Hata oluştu');
        }
    };

    const handleToggleDJMode = async () => {
        if (!roomId) {
            toast.error('⚠️ Bir ses kanalında olmalısınız');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/music/${roomId}/dj-mode/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setDjMode(data.enabled);
                toast.success(data.enabled ? '🎧 DJ Modu açıldı!' : '🎧 DJ Modu kapandı');
            }
        } catch (error) {
            console.error('Toggle DJ mode error:', error);
        }
    };

    const handleJoinDJQueue = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/music/${roomId}/dj-queue/join/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('✅ DJ sırasına katıldın!');
                fetchDJStatus();
            }
        } catch (error) {
            console.error('Join DJ queue error:', error);
        }
    };

    const handleLeaveDJQueue = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/music/${roomId}/dj-queue/leave/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('👋 DJ sırasından ayrıldın');
                fetchDJStatus();
            }
        } catch (error) {
            console.error('Leave DJ queue error:', error);
        }
    };

    const getSourceIcon = (source) => {
        switch (source) {
            case 'youtube': return <FaYoutube className="source-icon youtube" />;
            case 'spotify': return <FaSpotify className="source-icon spotify" />;
            case 'soundcloud': return <FaSoundcloud className="source-icon soundcloud" />;
            default: return <FaMusic className="source-icon" />;
        }
    };

    const filteredPlaylists = searchQuery
        ? playlists.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : playlists;

    return (
        <div className="playlist-overlay" onClick={onClose}>
            <div className="playlist-panel" onClick={e => e.stopPropagation()}>
                <div className="playlist-header">
                    <h2>🎵 Müzik Playlistleri</h2>
                    <div className="header-tabs">
                        <button
                            className={`tab ${view === 'playlists' ? 'active' : ''}`}
                            onClick={() => setView('playlists')}
                        >
                            <FaList /> Playlistlerim
                        </button>
                        <button
                            className={`tab ${view === 'browse' ? 'active' : ''}`}
                            onClick={() => { setView('browse'); fetchPublicPlaylists(); }}
                        >
                            <FaGlobeAmericas /> Keşfet
                        </button>
                        {roomId && (
                            <button
                                className={`tab ${view === 'djqueue' ? 'active' : ''}`}
                                onClick={() => setView('djqueue')}
                            >
                                <FaCrown /> DJ Modu
                            </button>
                        )}
                        <button
                            className={`tab ${view === 'create' ? 'active' : ''}`}
                            onClick={() => setView('create')}
                        >
                            <FaPlus /> Yeni
                        </button>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="playlist-content">
                    {/* My Playlists View */}
                    {view === 'playlists' && (
                        <div className="playlists-view">
                            <div className="search-bar">
                                <FaSearch />
                                <input
                                    type="text"
                                    placeholder="Playlist ara..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {selectedPlaylist ? (
                                <div className="playlist-detail">
                                    <button
                                        className="back-btn"
                                        onClick={() => setSelectedPlaylist(null)}
                                    >
                                        ← Geri
                                    </button>
                                    <div className="playlist-info">
                                        <div
                                            className="playlist-cover"
                                            style={{ backgroundImage: selectedPlaylist.cover_url ? `url(${selectedPlaylist.cover_url})` : 'none' }}
                                        >
                                            {!selectedPlaylist.cover_url && <FaMusic />}
                                        </div>
                                        <div className="playlist-meta">
                                            <h3>{selectedPlaylist.name}</h3>
                                            <p>{selectedPlaylist.description || 'Açıklama yok'}</p>
                                            <span className="song-count">
                                                {selectedPlaylist.songs?.length || 0} şarkı
                                            </span>
                                            <span className="visibility">
                                                {selectedPlaylist.is_public ? <><FaGlobeAmericas /> Herkese Açık</> : <><FaLock /> Gizli</>}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="playlist-actions">
                                        {roomId && (
                                            <button
                                                className="play-btn"
                                                onClick={() => handleLoadPlaylist(selectedPlaylist.id)}
                                            >
                                                <FaPlay /> Çal
                                            </button>
                                        )}
                                        <button
                                            className="add-song-btn"
                                            onClick={() => setShowAddSong(true)}
                                        >
                                            <FaPlus /> Şarkı Ekle
                                        </button>
                                        <button
                                            className="shuffle-btn"
                                            onClick={() => handleLoadPlaylist(selectedPlaylist.id)}
                                        >
                                            <FaRandom /> Karıştır
                                        </button>
                                    </div>

                                    {showAddSong && (
                                        <div className="add-song-form">
                                            <input
                                                type="text"
                                                placeholder="YouTube, Spotify veya SoundCloud URL'si..."
                                                value={songUrl}
                                                onChange={(e) => setSongUrl(e.target.value)}
                                            />
                                            <div className="form-actions">
                                                <button onClick={() => handleAddSong(selectedPlaylist.id)}>
                                                    Ekle
                                                </button>
                                                <button onClick={() => setShowAddSong(false)}>
                                                    İptal
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="songs-list">
                                        {selectedPlaylist.songs?.length > 0 ? (
                                            selectedPlaylist.songs.map((song, index) => (
                                                <div key={song.id} className="song-item">
                                                    <span className="song-index">{index + 1}</span>
                                                    {song.thumbnail && (
                                                        <img src={song.thumbnail} alt={song.title} className="song-thumb" />
                                                    )}
                                                    <div className="song-info">
                                                        <span className="song-title">{song.title}</span>
                                                        <span className="song-artist">{song.artist || 'Bilinmeyen'}</span>
                                                    </div>
                                                    {getSourceIcon(song.source)}
                                                    <span className="song-duration">{song.duration || '0:00'}</span>
                                                    <button
                                                        className="remove-song-btn"
                                                        onClick={() => handleRemoveSong(selectedPlaylist.id, song.id)}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="no-songs">
                                                <p>Bu playlist'te henüz şarkı yok</p>
                                                <button onClick={() => setShowAddSong(true)}>
                                                    <FaPlus /> İlk şarkıyı ekle
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="playlists-grid">
                                    {loading ? (
                                        <div className="loading">Yükleniyor...</div>
                                    ) : filteredPlaylists.length > 0 ? (
                                        filteredPlaylists.map(playlist => (
                                            <div
                                                key={playlist.id}
                                                className="playlist-card"
                                                onClick={() => setSelectedPlaylist(playlist)}
                                            >
                                                <div
                                                    className="card-cover"
                                                    style={{ backgroundImage: playlist.cover_url ? `url(${playlist.cover_url})` : 'none' }}
                                                >
                                                    {!playlist.cover_url && <FaMusic />}
                                                    <div className="card-overlay">
                                                        <button
                                                            className="play-overlay-btn"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleLoadPlaylist(playlist.id);
                                                            }}
                                                        >
                                                            <FaPlay />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="card-info">
                                                    <h4>{playlist.name}</h4>
                                                    <span>{playlist.songs?.length || 0} şarkı</span>
                                                </div>
                                                <div className="card-actions">
                                                    <button
                                                        className="delete-btn"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeletePlaylist(playlist.id);
                                                        }}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="no-playlists">
                                            <FaMusic className="empty-icon" />
                                            <p>Henüz playlist oluşturmadınız</p>
                                            <button onClick={() => setView('create')}>
                                                <FaPlus /> İlk playlist'i oluştur
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Create Playlist View */}
                    {view === 'create' && (
                        <div className="create-playlist-form">
                            <h3>🎵 Yeni Playlist Oluştur</h3>

                            <div className="form-group">
                                <label>Playlist Adı *</label>
                                <input
                                    type="text"
                                    placeholder="Harika Şarkılar..."
                                    value={newPlaylist.name}
                                    onChange={(e) => setNewPlaylist({ ...newPlaylist, name: e.target.value })}
                                    maxLength={50}
                                />
                            </div>

                            <div className="form-group">
                                <label>Açıklama</label>
                                <textarea
                                    placeholder="Playlist hakkında..."
                                    value={newPlaylist.description}
                                    onChange={(e) => setNewPlaylist({ ...newPlaylist, description: e.target.value })}
                                    rows={3}
                                />
                            </div>

                            <div className="form-group">
                                <label>Kapak Resmi URL (isteğe bağlı)</label>
                                <input
                                    type="text"
                                    placeholder="https://..."
                                    value={newPlaylist.cover_url}
                                    onChange={(e) => setNewPlaylist({ ...newPlaylist, cover_url: e.target.value })}
                                />
                            </div>

                            <div className="form-group checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={newPlaylist.is_public}
                                        onChange={(e) => setNewPlaylist({ ...newPlaylist, is_public: e.target.checked })}
                                    />
                                    <span><FaGlobeAmericas /> Herkese Açık Yap</span>
                                </label>
                            </div>

                            <div className="form-actions">
                                <button className="submit-btn" onClick={handleCreatePlaylist}>
                                    <FaSave /> Playlist Oluştur
                                </button>
                                <button className="cancel-btn" onClick={() => setView('playlists')}>
                                    İptal
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Browse Public Playlists View */}
                    {view === 'browse' && (
                        <div className="browse-view">
                            <h3>🌍 Herkese Açık Playlistler</h3>
                            <div className="playlists-grid">
                                {publicPlaylists.length > 0 ? (
                                    publicPlaylists.map(playlist => (
                                        <div key={playlist.id} className="playlist-card public">
                                            <div
                                                className="card-cover"
                                                style={{ backgroundImage: playlist.cover_url ? `url(${playlist.cover_url})` : 'none' }}
                                            >
                                                {!playlist.cover_url && <FaMusic />}
                                            </div>
                                            <div className="card-info">
                                                <h4>{playlist.name}</h4>
                                                <span className="creator">
                                                    <FaUsers /> {playlist.creator_username}
                                                </span>
                                                <span>{playlist.songs_count || 0} şarkı</span>
                                            </div>
                                            <div className="card-actions">
                                                <button
                                                    className="like-btn"
                                                    onClick={() => toast.info('❤️ Beğenildi!')}
                                                >
                                                    <FaHeart />
                                                </button>
                                                {roomId && (
                                                    <button
                                                        className="play-btn"
                                                        onClick={() => handleLoadPlaylist(playlist.id)}
                                                    >
                                                        <FaPlay />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-playlists">
                                        <p>Henüz herkese açık playlist yok</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* DJ Mode View */}
                    {view === 'djqueue' && roomId && (
                        <div className="dj-mode-view">
                            <div className="dj-header">
                                <h3>🎧 DJ Modu</h3>
                                <button
                                    className={`dj-toggle ${djMode ? 'active' : ''}`}
                                    onClick={handleToggleDJMode}
                                >
                                    {djMode ? 'DJ Modu Açık' : 'DJ Modu Kapalı'}
                                </button>
                            </div>

                            {djMode && (
                                <>
                                    {currentDJ && (
                                        <div className="current-dj">
                                            <FaCrown className="dj-crown" />
                                            <span>Şu anki DJ: <strong>{currentDJ.username}</strong></span>
                                        </div>
                                    )}

                                    <div className="dj-queue-section">
                                        <h4>DJ Sırası</h4>
                                        {djQueue.length > 0 ? (
                                            <div className="dj-queue-list">
                                                {djQueue.map((dj, index) => (
                                                    <div key={dj.id} className={`dj-queue-item ${index === 0 ? 'next' : ''}`}>
                                                        <span className="queue-position">{index + 1}</span>
                                                        <img
                                                            src={dj.avatar || '/default-avatar.png'}
                                                            alt={dj.username}
                                                            className="dj-avatar"
                                                        />
                                                        <span className="dj-name">{dj.username}</span>
                                                        {index === 0 && <span className="next-badge">Sıradaki</span>}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="empty-queue">DJ sırası boş</p>
                                        )}

                                        <div className="dj-actions">
                                            {!djQueue.find(d => d.id === currentUser?.id) ? (
                                                <button
                                                    className="join-dj-btn"
                                                    onClick={handleJoinDJQueue}
                                                >
                                                    <FaCrown /> DJ Sırasına Katıl
                                                </button>
                                            ) : (
                                                <button
                                                    className="leave-dj-btn"
                                                    onClick={handleLeaveDJQueue}
                                                >
                                                    Sıradan Ayrıl
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="dj-info">
                                        <p>💡 DJ Modu açıkken, sıradaki DJ müzik çalabilir. Sıra otomatik döner.</p>
                                    </div>
                                </>
                            )}

                            {!djMode && (
                                <div className="dj-disabled">
                                    <FaCrown className="dj-icon" />
                                    <p>DJ Modu kapalı. Açmak için yukarıdaki butona tıklayın.</p>
                                    <small>DJ Modunda kullanıcılar sırayla müzik çalabilir.</small>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MusicPlaylistsPanel;
