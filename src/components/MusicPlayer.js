// frontend/src/components/MusicPlayer.js
import React, { useState, useEffect, useRef } from 'react';
import { 
    FaPlay, FaPause, FaStepForward, FaStepBackward, 
    FaVolumeUp, FaVolumeMute, FaRandom, FaRedo,
    FaListUl, FaYoutube, FaSpotify, FaTimes, FaPlus
} from 'react-icons/fa';
import toast from '../utils/toast';
import './MusicPlayer.css';

const MusicPlayer = ({ channelId }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [queue, setQueue] = useState([]);
    const [volume, setVolume] = useState(70);
    const [isMuted, setIsMuted] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [showQueue, setShowQueue] = useState(false);
    const [showAddTrack, setShowAddTrack] = useState(false);
    const [trackUrl, setTrackUrl] = useState('');
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        // Fetch current playback status
        fetchPlayerStatus();
        
        // Update progress every second
        const interval = setInterval(() => {
            if (isPlaying && audioRef.current) {
                setProgress(audioRef.current.currentTime);
                setDuration(audioRef.current.duration);
            }
        }, 1000);
        
        return () => clearInterval(interval);
    }, [isPlaying]);

    const fetchPlayerStatus = async () => {
        try {
            const response = await fetch(`/api/music/status/${channelId}/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setCurrentTrack(data.current_track);
                setQueue(data.queue || []);
                setIsPlaying(data.is_playing);
                setVolume(data.volume || 70);
            }
        } catch (error) {
            console.error('Failed to fetch player status:', error);
        }
    };

    const handlePlayPause = async () => {
        try {
            const endpoint = isPlaying ? 'pause' : 'play';
            const response = await fetch(`/api/music/${endpoint}/${channelId}/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (response.ok) {
                setIsPlaying(!isPlaying);
                toast.success(isPlaying ? '⏸️ Durakladı' : '▶️ Çalıyor');
            }
        } catch (error) {
            toast.error('❌ İşlem başarısız');
        }
    };

    const handleNext = async () => {
        try {
            const response = await fetch(`/api/music/skip/${channelId}/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setCurrentTrack(data.current_track);
                toast.success('⏭️ Sonraki şarkı');
            }
        } catch (error) {
            toast.error('❌ Atlama başarısız');
        }
    };

    const handlePrevious = async () => {
        try {
            const response = await fetch(`/api/music/previous/${channelId}/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setCurrentTrack(data.current_track);
                toast.success('⏮️ Önceki şarkı');
            }
        } catch (error) {
            toast.error('❌ Geri alma başarısız');
        }
    };

    const handleVolumeChange = async (newVolume) => {
        setVolume(newVolume);
        try {
            await fetch(`/api/music/volume/${channelId}/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ volume: newVolume })
            });
        } catch (error) {
            console.error('Volume change failed:', error);
        }
    };

    const handleAddTrack = async () => {
        if (!trackUrl.trim()) {
            toast.error('❌ URL girin');
            return;
        }

        try {
            const response = await fetch(`/api/music/add/${channelId}/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: trackUrl })
            });

            if (response.ok) {
                const data = await response.json();
                setQueue([...queue, data.track]);
                setTrackUrl('');
                setShowAddTrack(false);
                toast.success('✅ Sıraya eklendi');
            } else {
                toast.error('❌ Eklenemedi');
            }
        } catch (error) {
            toast.error('❌ Bağlantı hatası');
        }
    };

    const removeFromQueue = async (trackId) => {
        try {
            const response = await fetch(`/api/music/remove/${channelId}/${trackId}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                setQueue(queue.filter(t => t.id !== trackId));
                toast.success('✅ Sıradan çıkarıldı');
            }
        } catch (error) {
            toast.error('❌ İşlem başarısız');
        }
    };

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSeek = (e) => {
        const newProgress = (e.target.value / 100) * duration;
        setProgress(newProgress);
        if (audioRef.current) {
            audioRef.current.currentTime = newProgress;
        }
    };

    return (
        <div className="music-player">
            <audio ref={audioRef} src={currentTrack?.audio_url} />
            
            <div className="player-main">
                <div className="track-info">
                    {currentTrack ? (
                        <>
                            <img 
                                src={currentTrack.thumbnail || '/default-music.png'} 
                                alt={currentTrack.title}
                                className="track-thumbnail"
                            />
                            <div className="track-details">
                                <div className="track-title">{currentTrack.title}</div>
                                <div className="track-artist">{currentTrack.artist || 'Bilinmeyen Sanatçı'}</div>
                            </div>
                            <div className="track-source">
                                {currentTrack.source === 'youtube' && <FaYoutube className="source-icon youtube" />}
                                {currentTrack.source === 'spotify' && <FaSpotify className="source-icon spotify" />}
                            </div>
                        </>
                    ) : (
                        <div className="no-track">
                            <span>Şarkı seçilmedi</span>
                        </div>
                    )}
                </div>

                <div className="player-controls">
                    <div className="control-buttons">
                        <button 
                            className={`control-btn ${shuffle ? 'active' : ''}`}
                            onClick={() => setShuffle(!shuffle)}
                            title="Karıştır"
                        >
                            <FaRandom />
                        </button>
                        <button className="control-btn" onClick={handlePrevious} title="Önceki">
                            <FaStepBackward />
                        </button>
                        <button className="control-btn play-btn" onClick={handlePlayPause}>
                            {isPlaying ? <FaPause /> : <FaPlay />}
                        </button>
                        <button className="control-btn" onClick={handleNext} title="Sonraki">
                            <FaStepForward />
                        </button>
                        <button 
                            className={`control-btn ${repeat ? 'active' : ''}`}
                            onClick={() => setRepeat(!repeat)}
                            title="Tekrarla"
                        >
                            <FaRedo />
                        </button>
                    </div>

                    <div className="progress-container">
                        <span className="time-display">{formatTime(progress)}</span>
                        <input
                            type="range"
                            className="progress-bar"
                            min="0"
                            max="100"
                            value={(progress / duration) * 100 || 0}
                            onChange={handleSeek}
                        />
                        <span className="time-display">{formatTime(duration)}</span>
                    </div>
                </div>

                <div className="player-extras">
                    <button 
                        className="extra-btn"
                        onClick={() => setShowQueue(!showQueue)}
                        title="Sıra"
                    >
                        <FaListUl />
                        {queue.length > 0 && <span className="queue-count">{queue.length}</span>}
                    </button>
                    <button 
                        className="extra-btn"
                        onClick={() => setShowAddTrack(!showAddTrack)}
                        title="Şarkı Ekle"
                    >
                        <FaPlus />
                    </button>
                    <div className="volume-control">
                        <button 
                            className="extra-btn"
                            onClick={() => setIsMuted(!isMuted)}
                        >
                            {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
                        </button>
                        <input
                            type="range"
                            className="volume-slider"
                            min="0"
                            max="100"
                            value={isMuted ? 0 : volume}
                            onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
                        />
                        <span className="volume-display">{isMuted ? 0 : volume}%</span>
                    </div>
                </div>
            </div>

            {showQueue && (
                <div className="queue-panel">
                    <div className="queue-header">
                        <h3>Sıra ({queue.length})</h3>
                        <button className="close-btn" onClick={() => setShowQueue(false)}>
                            <FaTimes />
                        </button>
                    </div>
                    <div className="queue-list">
                        {queue.length === 0 ? (
                            <div className="queue-empty">Sıra boş</div>
                        ) : (
                            queue.map((track, index) => (
                                <div key={track.id} className="queue-item">
                                    <span className="queue-index">{index + 1}</span>
                                    <img src={track.thumbnail} alt={track.title} className="queue-thumbnail" />
                                    <div className="queue-track-info">
                                        <div className="queue-track-title">{track.title}</div>
                                        <div className="queue-track-artist">{track.artist || 'Bilinmeyen'}</div>
                                    </div>
                                    <button 
                                        className="remove-btn"
                                        onClick={() => removeFromQueue(track.id)}
                                        title="Sıradan Çıkar"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {showAddTrack && (
                <div className="add-track-modal">
                    <div className="add-track-content">
                        <h3>Şarkı Ekle</h3>
                        <input
                            type="text"
                            className="track-url-input"
                            placeholder="YouTube veya Spotify URL'si girin..."
                            value={trackUrl}
                            onChange={(e) => setTrackUrl(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddTrack()}
                        />
                        <div className="modal-actions">
                            <button className="btn-cancel" onClick={() => setShowAddTrack(false)}>İptal</button>
                            <button className="btn-add" onClick={handleAddTrack}>Ekle</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MusicPlayer;
