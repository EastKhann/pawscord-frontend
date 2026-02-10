import React, { useState, useEffect } from 'react';
import {
    FaMusic, FaTimes, FaPlay, FaPause, FaStepForward, FaStepBackward,
    FaRandom, FaRedo, FaVolumeUp, FaVolumeMute, FaPlus, FaTrash,
    FaList, FaHeart, FaCrown, FaUserPlus, FaUserMinus, FaSearch
} from 'react-icons/fa';
import { getApiBase } from '../utils/apiEndpoints';
import './DJModePanel.css';
import toast from '../utils/toast';

const DJModePanel = ({ roomId, serverId, onClose, fetchWithAuth, apiBaseUrl }) => {
    const [queue, setQueue] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [djs, setDjs] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('queue');
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(75);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [isDJMode, setIsDJMode] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadData();
    }, [roomId, serverId]);

    const loadData = async () => {
        setLoading(true);
        try {
            const baseUrl = apiBaseUrl || getApiBase();
            if (fetchWithAuth && serverId) {
                const response = await fetchWithAuth(`${baseUrl}/api/servers/${serverId}/music-queue/`);
                if (response.ok) {
                    const data = await response.json();
                    setCurrentTrack(data.now_playing || null);
                    const queueData = (data.queue || []).map((q, i) => ({
                        id: q.id || i + 1,
                        title: q.title || 'Unknown',
                        artist: q.artist || 'Unknown Artist',
                        duration: q.duration || 0,
                        addedBy: { username: q.requested_by || 'Unknown' }
                    }));
                    setQueue(queueData);
                    setPlaylists(data.playlists || []);
                    setDjs(data.djs || []);
                } else {
                    setCurrentTrack(null);
                    setQueue([]);
                    setPlaylists([]);
                    setDjs([]);
                }
            } else {
                setCurrentTrack(null);
                setQueue([]);
                setPlaylists([]);
                setDjs([]);
            }
        } catch (error) {
            console.error('Error loading DJ data:', error);
            setCurrentTrack(null);
            setQueue([]);
            setPlaylists([]);
            setDjs([]);
        }
        setLoading(false);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handlePlayPause = () => setIsPlaying(!isPlaying);
    const handleShuffle = () => setIsShuffle(!isShuffle);
    const handleRepeat = () => setIsRepeat(!isRepeat);

    const handleRemoveFromQueue = (trackId) => {
        setQueue(queue.filter(t => t.id !== trackId));
    };

    const handleMoveUp = (index) => {
        if (index === 0) return;
        const newQueue = [...queue];
        [newQueue[index], newQueue[index - 1]] = [newQueue[index - 1], newQueue[index]];
        setQueue(newQueue);
    };

    const handleToggleDJ = (djId) => {
        setDjs(djs.map(dj =>
            dj.id === djId ? { ...dj, isActive: !dj.isActive } : dj
        ));
    };

    const handleRemoveDJ = (djId) => {
        setDjs(djs.filter(dj => dj.id !== djId || dj.isOwner));
    };

    const handleLoadPlaylist = (playlistId) => {
        toast.info(`Loading playlist ${playlistId} to queue...`);
    };

    const progressPercent = currentTrack ? (currentTrack.elapsed / currentTrack.duration) * 100 : 0;

    if (loading) {
        return (
            <div className="dj-overlay" onClick={onClose}>
                <div className="dj-panel" onClick={e => e.stopPropagation()}>
                    <div className="loading">Loading DJ Mode...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="dj-overlay" onClick={onClose}>
            <div className="dj-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <div className="header-info">
                        <h2>
                            <FaMusic />
                            DJ Mode
                        </h2>
                        <span className="subtitle">Control the music queue</span>
                    </div>
                    <div className="header-actions">
                        <button
                            className={`dj-toggle ${isDJMode ? 'active' : ''}`}
                            onClick={() => setIsDJMode(!isDJMode)}
                        >
                            <FaCrown /> DJ Mode {isDJMode ? 'ON' : 'OFF'}
                        </button>
                        <button className="close-btn" onClick={onClose}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                {/* Now Playing */}
                {currentTrack && (
                    <div className="now-playing">
                        <div className="track-art">
                            <FaMusic />
                        </div>
                        <div className="track-info">
                            <span className="track-title">{currentTrack.title}</span>
                            <span className="track-artist">{currentTrack.artist}</span>
                            <span className="track-added">Added by {currentTrack.addedBy.username}</span>
                        </div>
                        <div className="player-controls">
                            <div className="control-buttons">
                                <button
                                    className={`control-btn ${isShuffle ? 'active' : ''}`}
                                    onClick={handleShuffle}
                                >
                                    <FaRandom />
                                </button>
                                <button className="control-btn"><FaStepBackward /></button>
                                <button className="control-btn play" onClick={handlePlayPause}>
                                    {isPlaying ? <FaPause /> : <FaPlay />}
                                </button>
                                <button className="control-btn"><FaStepForward /></button>
                                <button
                                    className={`control-btn ${isRepeat ? 'active' : ''}`}
                                    onClick={handleRepeat}
                                >
                                    <FaRedo />
                                </button>
                            </div>
                            <div className="progress-section">
                                <span className="time">{formatTime(currentTrack.elapsed)}</span>
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{ width: `${progressPercent}%` }}
                                    ></div>
                                </div>
                                <span className="time">{formatTime(currentTrack.duration)}</span>
                            </div>
                        </div>
                        <div className="volume-control">
                            <button onClick={() => setVolume(volume === 0 ? 75 : 0)}>
                                {volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={volume}
                                onChange={(e) => setVolume(parseInt(e.target.value))}
                            />
                            <span>{volume}%</span>
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="tabs-bar">
                    <button
                        className={activeTab === 'queue' ? 'active' : ''}
                        onClick={() => setActiveTab('queue')}
                    >
                        <FaList /> Queue ({queue.length})
                    </button>
                    <button
                        className={activeTab === 'playlists' ? 'active' : ''}
                        onClick={() => setActiveTab('playlists')}
                    >
                        <FaHeart /> Playlists
                    </button>
                    <button
                        className={activeTab === 'djs' ? 'active' : ''}
                        onClick={() => setActiveTab('djs')}
                    >
                        <FaCrown /> DJs ({djs.filter(d => d.isActive).length})
                    </button>
                </div>

                <div className="content">
                    {activeTab === 'queue' && (
                        <div className="queue-tab">
                            <div className="queue-header">
                                <div className="search-box">
                                    <FaSearch />
                                    <input
                                        type="text"
                                        placeholder="Add song to queue..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <button className="add-btn">
                                    <FaPlus /> Add
                                </button>
                            </div>
                            <div className="queue-list">
                                {queue.map((track, index) => (
                                    <div key={track.id} className="queue-item">
                                        <span className="queue-position">{index + 1}</span>
                                        <div className="queue-track-art">
                                            <FaMusic />
                                        </div>
                                        <div className="queue-track-info">
                                            <span className="queue-title">{track.title}</span>
                                            <span className="queue-artist">{track.artist}</span>
                                        </div>
                                        <span className="queue-added">by {track.addedBy.username}</span>
                                        <span className="queue-duration">{formatTime(track.duration)}</span>
                                        <div className="queue-actions">
                                            <button onClick={() => handleMoveUp(index)} disabled={index === 0}>
                                                ↑
                                            </button>
                                            <button onClick={() => handleRemoveFromQueue(track.id)}>
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'playlists' && (
                        <div className="playlists-tab">
                            <div className="playlists-header">
                                <h3>Your Playlists</h3>
                                <button className="create-btn">
                                    <FaPlus /> Create Playlist
                                </button>
                            </div>
                            <div className="playlists-list">
                                {playlists.map(playlist => (
                                    <div key={playlist.id} className="playlist-item">
                                        <div className="playlist-art">
                                            <FaMusic />
                                        </div>
                                        <div className="playlist-info">
                                            <span className="playlist-name">{playlist.name}</span>
                                            <span className="playlist-stats">
                                                {playlist.tracks} tracks • {playlist.duration}
                                            </span>
                                        </div>
                                        <span className={`visibility ${playlist.isPublic ? 'public' : 'private'}`}>
                                            {playlist.isPublic ? 'Public' : 'Private'}
                                        </span>
                                        <button
                                            className="load-btn"
                                            onClick={() => handleLoadPlaylist(playlist.id)}
                                        >
                                            Load to Queue
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'djs' && (
                        <div className="djs-tab">
                            <div className="djs-header">
                                <h3>DJ Management</h3>
                                <button className="add-dj-btn">
                                    <FaUserPlus /> Add DJ
                                </button>
                            </div>
                            <div className="djs-list">
                                {djs.map(dj => (
                                    <div key={dj.id} className={`dj-item ${dj.isActive ? 'active' : ''}`}>
                                        <div className="dj-avatar">
                                            {dj.username.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="dj-info">
                                            <span className="dj-name">
                                                {dj.username}
                                                {dj.isOwner && <FaCrown className="owner-badge" />}
                                            </span>
                                            <span className={`dj-status ${dj.isActive ? 'active' : 'inactive'}`}>
                                                {dj.isActive ? 'Active DJ' : 'Inactive'}
                                            </span>
                                        </div>
                                        <div className="dj-actions">
                                            {!dj.isOwner && (
                                                <>
                                                    <button
                                                        className={`toggle-btn ${dj.isActive ? 'active' : ''}`}
                                                        onClick={() => handleToggleDJ(dj.id)}
                                                    >
                                                        {dj.isActive ? 'Disable' : 'Enable'}
                                                    </button>
                                                    <button
                                                        className="remove-btn"
                                                        onClick={() => handleRemoveDJ(dj.id)}
                                                    >
                                                        <FaUserMinus />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="dj-permissions">
                                <h4>DJ Permissions</h4>
                                <div className="permission-item">
                                    <label>Can skip tracks</label>
                                    <input type="checkbox" defaultChecked />
                                </div>
                                <div className="permission-item">
                                    <label>Can remove tracks</label>
                                    <input type="checkbox" defaultChecked />
                                </div>
                                <div className="permission-item">
                                    <label>Can reorder queue</label>
                                    <input type="checkbox" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DJModePanel;
