/* eslint-disable jsx-a11y/media-has-caption */
import { getToken } from '../../utils/tokenStorage';
// frontend/src/components/MusicPlayer.js
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
    FaPlay,
    FaPause,
    FaStepForward,
    FaStepBackward,
    FaVolumeUp,
    FaVolumeMute,
    FaRandom,
    FaRedo,
    FaListUl,
    FaYoutube,
    FaSpotify,
    FaTimes,
    FaPlus,
} from 'react-icons/fa';
import toast from '../../utils/toast';
import { API_BASE_URL } from '../../utils/apiEndpoints';
import './MusicPlayer.css';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
const MusicPlayer = ({ channelId }) => {
    const { t } = useTranslation();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
            const response = await fetch(`${API_BASE_URL}/music/${channelId}/status/`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setCurrentTrack(data.current_track);
                setQueue(data.queue || []);
                setIsPlaying(data.is_playing);
                setVolume(data.volume || 70);
            }
        } catch (error) {
            logger.error('Failed to fetch player status:', error);
        }
    };

    const handlePlayPause = async () => {
        try {
            const endpoint = isPlaying ? 'pause' : 'play';
            const response = await fetch(`${API_BASE_URL}/music/${channelId}/${endpoint}/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            if (response.ok) {
                setIsPlaying(!isPlaying);
                toast.success(isPlaying ? t('ui.durakladi') : '▶️ Playing');
            }
        } catch (error) {
            toast.error(t('musicPlayer.operationFailed'));
        }
    };

    const handleNext = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/music/${channelId}/skip/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setCurrentTrack(data.current_track);
                toast.success(t('ui.sonraki_sarki'));
            }
        } catch (error) {
            toast.error(t('ui.skip_failed'));
        }
    };

    const handlePrevious = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/music/${channelId}/previous/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setCurrentTrack(data.current_track);
                toast.success(t('ui.onceki_sarki'));
            }
        } catch (error) {
            toast.error(t('ui.revert_failed'));
        }
    };

    const handleVolumeChange = async (newVolume) => {
        setVolume(newVolume);
        try {
            await fetch(`${API_BASE_URL}/music/${channelId}/volume/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ volume: newVolume }),
            });
        } catch (error) {
            logger.error('Volume change failed:', error);
        }
    };

    const handleAddTrack = async () => {
        if (!trackUrl.trim()) {
            toast.error(t('musicPlayer.urlRequired'));
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/music/${channelId}/add/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: trackUrl }),
            });

            if (response.ok) {
                const data = await response.json();
                setQueue([...queue, data.track]);
                setTrackUrl('');
                setShowAddTrack(false);
                toast.success(t('musicPlayer.queueAdded'));
            } else {
                toast.error(t('musicPlayer.addFailed'));
            }
        } catch (error) {
            toast.error(t('musicPlayer.connectionError'));
        }
    };

    const removeFromQueue = async (trackId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/music/${channelId}/remove/${trackId}/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            if (response.ok) {
                setQueue(queue.filter((t) => t.id !== trackId));
                toast.success(t('ui.rankdan_cikarildi'));
            }
        } catch (error) {
            toast.error(t('musicPlayer.operationFailed'));
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
                                <div className="track-artist">
                                    {currentTrack.artist || t('ui.bilinmeyen_sanatci')}
                                </div>
                            </div>
                            <div className="track-source">
                                {currentTrack.source === 'youtube' && (
                                    <FaYoutube className="source-icon youtube" />
                                )}
                                {currentTrack.source === 'spotify' && (
                                    <FaSpotify className="source-icon spotify" />
                                )}
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
                            aria-label="Action button"
                            className={`control-btn ${shuffle ? 'active' : ''}`}
                            onClick={() => setShuffle(!shuffle)}
                            title={t('ui.karistir')}
                        >
                            <FaRandom />
                        </button>
                        <button
                            className="control-btn"
                            onClick={handlePrevious}
                            title={t('ui.onceki')}
                            aria-label="Previous"
                        >
                            <FaStepBackward />
                        </button>
                        <button
                            aria-label="handle Play Pause"
                            className="control-btn play-btn"
                            onClick={handlePlayPause}
                        >
                            {isPlaying ? <FaPause /> : <FaPlay />}
                        </button>
                        <button
                            className="control-btn"
                            onClick={handleNext}
                            title="Sonraki"
                            aria-label="Sonraki"
                        >
                            <FaStepForward />
                        </button>
                        <button
                            aria-label="Action button"
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
                            aria-label="range"
                        />
                        <span className="time-display">{formatTime(duration)}</span>
                    </div>
                </div>

                <div className="player-extras">
                    <button
                        aria-label="Action button"
                        className="extra-btn"
                        onClick={() => setShowQueue(!showQueue)}
                        title="Sıralama"
                    >
                        <FaListUl />
                        {queue.length > 0 && <span className="queue-count">{queue.length}</span>}
                    </button>
                    <button
                        aria-label="Action button"
                        className="extra-btn"
                        onClick={() => setShowAddTrack(!showAddTrack)}
                        title={t('ui.sarki_add')}
                    >
                        <FaPlus />
                    </button>
                    <div className="volume-control">
                        <button
                            aria-label="Action button"
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
                        <h3>Rank ({queue.length})</h3>
                        <button
                            aria-label="Toggle visibility"
                            className="close-btn"
                            onClick={() => setShowQueue(false)}
                        >
                            <FaTimes />
                        </button>
                    </div>
                    <div className="queue-list">
                        {queue.length === 0 ? (
                            <div className="queue-empty">Rank boş</div>
                        ) : (
                            queue.map((track, index) => (
                                <div key={track.id} className="queue-item">
                                    <span className="queue-index">{index + 1}</span>
                                    <img
                                        src={track.thumbnail}
                                        alt={track.title}
                                        className="queue-thumbnail"
                                    />
                                    <div className="queue-track-info">
                                        <div className="queue-track-title">{track.title}</div>
                                        <div className="queue-track-artist">
                                            {track.artist || t('music.unknownArtist')}
                                        </div>
                                    </div>
                                    <button
                                        aria-label="Action button"
                                        className="remove-btn"
                                        onClick={() => removeFromQueue(track.id)}
                                        title={t('music.removeFromQueue')}
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
                            placeholder="YouTube or Spotify URL'si girin..."
                            value={trackUrl}
                            onChange={(e) => setTrackUrl(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddTrack()}
                        />
                        <div className="modal-actions">
                            <button
                                aria-label="Toggle visibility"
                                className="btn-cancel"
                                onClick={() => setShowAddTrack(false)}
                            >
                                {t('common.cancel')}
                            </button>
                            <button
                                aria-label="handle Add Track"
                                className="btn-add"
                                onClick={handleAddTrack}
                            >
                                Ekle
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

MusicPlayer.propTypes = {
    channelId: PropTypes.string,
};
export default MusicPlayer;
