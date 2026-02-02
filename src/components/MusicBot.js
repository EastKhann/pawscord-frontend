// frontend/src/components/MusicBot.js
import React, { useState, useEffect, useRef } from 'react';
import { FaMusic, FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaRandom, FaRedo, FaList, FaSearch, FaTimes } from 'react-icons/fa';

const MusicBot = ({ onClose, ws, channelId, fetchWithAuth, apiBaseUrl }) => {
    const [queue, setQueue] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [repeat, setRepeat] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);

    const audioRef = useRef(null);

    useEffect(() => {
        if (ws) {
            ws.addEventListener('message', handleWebSocketMessage);
            loadQueue();
            return () => ws.removeEventListener('message', handleWebSocketMessage);
        }
    }, [ws]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    const handleWebSocketMessage = (event) => {
        const data = JSON.parse(event.data);

        switch (data.type) {
            case 'music_queue_update':
                setQueue(data.queue);
                break;
            case 'music_track_change':
                setCurrentTrack(data.track);
                if (audioRef.current) {
                    audioRef.current.src = data.track.url;
                    audioRef.current.play();
                }
                break;
            case 'music_play':
                setIsPlaying(true);
                audioRef.current?.play();
                break;
            case 'music_pause':
                setIsPlaying(false);
                audioRef.current?.pause();
                break;
        }
    };

    const loadQueue = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/music/queue/${channelId}/`);
            if (res.ok) {
                const data = await res.json();
                setQueue(data.queue || []);
                if (data.current_track) {
                    setCurrentTrack(data.current_track);
                }
            }
        } catch (error) {
            console.error('Queue load error:', error);
        }
    };

    const searchMusic = async () => {
        if (!searchQuery.trim()) return;

        setSearching(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/music/search/?q=${encodeURIComponent(searchQuery)}`);
            if (res.ok) {
                const data = await res.json();
                setSearchResults(data.results || []);
            }
        } catch (error) {
            console.error('Search error:', error);
        }
        setSearching(false);
    };

    const addToQueue = async (track) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/music/queue/${channelId}/add/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ track })
            });

            if (res.ok) {
                ws.send(JSON.stringify({
                    type: 'music_add_to_queue',
                    channel_id: channelId,
                    track: track
                }));
                setSearchResults([]);
                setSearchQuery('');
            }
        } catch (error) {
            console.error('Add to queue error:', error);
        }
    };

    const playTrack = (index) => {
        ws.send(JSON.stringify({
            type: 'music_play_track',
            channel_id: channelId,
            index: index
        }));
    };

    const togglePlayPause = () => {
        if (isPlaying) {
            ws.send(JSON.stringify({
                type: 'music_pause',
                channel_id: channelId
            }));
        } else {
            ws.send(JSON.stringify({
                type: 'music_play',
                channel_id: channelId
            }));
        }
    };

    const next = () => {
        ws.send(JSON.stringify({
            type: 'music_next',
            channel_id: channelId
        }));
    };

    const previous = () => {
        ws.send(JSON.stringify({
            type: 'music_previous',
            channel_id: channelId
        }));
    };

    const removeFromQueue = async (index) => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/api/music/queue/${channelId}/remove/${index}/`, {
                method: 'DELETE'
            });

            ws.send(JSON.stringify({
                type: 'music_remove_from_queue',
                channel_id: channelId,
                index: index
            }));
        } catch (error) {
            console.error('Remove from queue error:', error);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.panel}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaMusic size={20} color="#1db954" />
                        <h2 style={styles.title}>Music Bot</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes size={20} />
                    </button>
                </div>

                <div style={styles.content}>
                    {/* Now Playing */}
                    <div style={styles.nowPlaying}>
                        {currentTrack ? (
                            <>
                                <div style={styles.albumArt}>
                                    {currentTrack.thumbnail ? (
                                        <img src={currentTrack.thumbnail} alt={currentTrack.title} style={styles.thumbnail} />
                                    ) : (
                                        <FaMusic size={48} color="#b9bbbe" />
                                    )}
                                </div>
                                <div style={styles.trackInfo}>
                                    <div style={styles.trackTitle}>{currentTrack.title}</div>
                                    <div style={styles.trackArtist}>{currentTrack.artist || 'Bilinmeyen Sanatçı'}</div>
                                </div>
                            </>
                        ) : (
                            <div style={styles.noTrack}>
                                <FaMusic size={48} color="#4e5058" />
                                <p>Şarkı çalmıyor</p>
                            </div>
                        )}
                    </div>

                    {/* Player Controls */}
                    <div style={styles.controls}>
                        <div style={styles.progressBar}>
                            <span style={styles.time}>{formatTime(progress)}</span>
                            <div style={styles.progressTrack}>
                                <div
                                    style={{
                                        ...styles.progressFill,
                                        width: `${duration ? (progress / duration) * 100 : 0}%`
                                    }}
                                />
                            </div>
                            <span style={styles.time}>{formatTime(duration)}</span>
                        </div>

                        <div style={styles.playControls}>
                            <button
                                onClick={() => setShuffle(!shuffle)}
                                style={{
                                    ...styles.controlButton,
                                    color: shuffle ? '#1db954' : '#b9bbbe'
                                }}
                            >
                                <FaRandom size={16} />
                            </button>

                            <button onClick={previous} style={styles.controlButton}>
                                <FaStepBackward size={20} />
                            </button>

                            <button onClick={togglePlayPause} style={styles.playButton}>
                                {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                            </button>

                            <button onClick={next} style={styles.controlButton}>
                                <FaStepForward size={20} />
                            </button>

                            <button
                                onClick={() => setRepeat(!repeat)}
                                style={{
                                    ...styles.controlButton,
                                    color: repeat ? '#1db954' : '#b9bbbe'
                                }}
                            >
                                <FaRedo size={16} />
                            </button>
                        </div>

                        <div style={styles.volumeControl}>
                            <FaVolumeUp size={16} color="#b9bbbe" />
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={volume}
                                onChange={(e) => setVolume(parseInt(e.target.value))}
                                style={styles.volumeSlider}
                            />
                            <span style={styles.volumeText}>{volume}%</span>
                        </div>
                    </div>

                    {/* Search */}
                    <div style={styles.searchSection}>
                        <div style={styles.searchBox}>
                            <FaSearch size={14} color="#b9bbbe" />
                            <input
                                type="text"
                                placeholder="Şarkı ara (YouTube, Spotify, SoundCloud)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && searchMusic()}
                                style={styles.searchInput}
                            />
                            <button onClick={searchMusic} style={styles.searchButton}>
                                Ara
                            </button>
                        </div>

                        {searching && <div style={styles.loading}>Aranıyor...</div>}

                        {searchResults.length > 0 && (
                            <div style={styles.searchResults}>
                                {searchResults.map((result, idx) => (
                                    <div key={idx} style={styles.searchResult}>
                                        <div style={styles.resultThumbnail}>
                                            {result.thumbnail ? (
                                                <img src={result.thumbnail} alt={result.title} style={styles.resultThumb} />
                                            ) : (
                                                <FaMusic size={24} />
                                            )}
                                        </div>
                                        <div style={styles.resultInfo}>
                                            <div style={styles.resultTitle}>{result.title}</div>
                                            <div style={styles.resultArtist}>{result.artist}</div>
                                            <div style={styles.resultDuration}>{result.duration}</div>
                                        </div>
                                        <button
                                            onClick={() => addToQueue(result)}
                                            style={styles.addButton}
                                        >
                                            Ekle
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Queue */}
                    <div style={styles.queueSection}>
                        <div style={styles.queueHeader}>
                            <FaList size={16} />
                            <span>Kuyruk ({queue.length})</span>
                        </div>
                        <div style={styles.queueList}>
                            {queue.length === 0 ? (
                                <div style={styles.emptyQueue}>Kuyruk boş</div>
                            ) : (
                                queue.map((track, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            ...styles.queueItem,
                                            backgroundColor: currentTrack?.id === track.id ? '#5865f220' : 'transparent'
                                        }}
                                    >
                                        <span style={styles.queueIndex}>{idx + 1}</span>
                                        <div style={styles.queueItemInfo}>
                                            <div style={styles.queueItemTitle}>{track.title}</div>
                                            <div style={styles.queueItemArtist}>{track.artist}</div>
                                        </div>
                                        <div style={styles.queueActions}>
                                            <button
                                                onClick={() => playTrack(idx)}
                                                style={styles.queueActionButton}
                                            >
                                                <FaPlay size={12} />
                                            </button>
                                            <button
                                                onClick={() => removeFromQueue(idx)}
                                                style={styles.queueActionButton}
                                            >
                                                <FaTimes size={12} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <audio
                    ref={audioRef}
                    onTimeUpdate={(e) => setProgress(e.target.currentTime)}
                    onDurationChange={(e) => setDuration(e.target.duration)}
                    onEnded={next}
                />
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '20px'
    },
    panel: {
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '800px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px',
        borderBottom: '1px solid #202225'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    title: {
        margin: 0,
        fontSize: '20px',
        color: '#ffffff'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        padding: '8px'
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    nowPlaying: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        padding: '20px',
        backgroundColor: '#36393f',
        borderRadius: '8px'
    },
    albumArt: {
        width: '100px',
        height: '100px',
        borderRadius: '8px',
        backgroundColor: '#202225',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    trackInfo: {
        flex: 1
    },
    trackTitle: {
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '4px'
    },
    trackArtist: {
        color: '#b9bbbe',
        fontSize: '14px'
    },
    noTrack: {
        width: '100%',
        textAlign: 'center',
        padding: '20px',
        color: '#b9bbbe'
    },
    controls: {
        backgroundColor: '#36393f',
        padding: '20px',
        borderRadius: '8px'
    },
    progressBar: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px'
    },
    time: {
        color: '#b9bbbe',
        fontSize: '12px',
        minWidth: '40px'
    },
    progressTrack: {
        flex: 1,
        height: '4px',
        backgroundColor: '#202225',
        borderRadius: '2px',
        overflow: 'hidden'
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#1db954',
        transition: 'width 0.1s linear'
    },
    playControls: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        marginBottom: '20px'
    },
    controlButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        padding: '8px',
        transition: 'all 0.2s'
    },
    playButton: {
        backgroundColor: '#1db954',
        color: '#ffffff',
        border: 'none',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
    },
    volumeControl: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    volumeSlider: {
        flex: 1,
        height: '4px',
        cursor: 'pointer'
    },
    volumeText: {
        color: '#b9bbbe',
        fontSize: '12px',
        minWidth: '40px',
        textAlign: 'right'
    },
    searchSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    searchBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#36393f',
        padding: '12px',
        borderRadius: '8px'
    },
    searchInput: {
        flex: 1,
        background: 'none',
        border: 'none',
        color: '#dcddde',
        fontSize: '14px',
        outline: 'none'
    },
    searchButton: {
        backgroundColor: '#5865f2',
        color: '#ffffff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    loading: {
        textAlign: 'center',
        padding: '20px',
        color: '#b9bbbe'
    },
    searchResults: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        maxHeight: '300px',
        overflowY: 'auto'
    },
    searchResult: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: '#36393f',
        padding: '12px',
        borderRadius: '4px'
    },
    resultThumbnail: {
        width: '48px',
        height: '48px',
        borderRadius: '4px',
        backgroundColor: '#202225',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    resultThumb: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    resultInfo: {
        flex: 1
    },
    resultTitle: {
        color: '#ffffff',
        fontSize: '14px',
        fontWeight: '500',
        marginBottom: '2px'
    },
    resultArtist: {
        color: '#b9bbbe',
        fontSize: '12px',
        marginBottom: '2px'
    },
    resultDuration: {
        color: '#72767d',
        fontSize: '11px'
    },
    addButton: {
        backgroundColor: '#5865f2',
        color: '#ffffff',
        border: 'none',
        padding: '6px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '12px'
    },
    queueSection: {
        backgroundColor: '#36393f',
        borderRadius: '8px',
        padding: '16px'
    },
    queueHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#ffffff',
        marginBottom: '12px',
        fontWeight: 'bold'
    },
    queueList: {
        maxHeight: '300px',
        overflowY: 'auto'
    },
    emptyQueue: {
        textAlign: 'center',
        padding: '20px',
        color: '#b9bbbe'
    },
    queueItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px',
        borderRadius: '4px',
        marginBottom: '4px'
    },
    queueIndex: {
        color: '#72767d',
        fontSize: '14px',
        minWidth: '24px'
    },
    queueItemInfo: {
        flex: 1
    },
    queueItemTitle: {
        color: '#dcddde',
        fontSize: '14px',
        marginBottom: '2px'
    },
    queueItemArtist: {
        color: '#72767d',
        fontSize: '12px'
    },
    queueActions: {
        display: 'flex',
        gap: '4px'
    },
    queueActionButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        padding: '4px'
    }
};

export default MusicBot;



