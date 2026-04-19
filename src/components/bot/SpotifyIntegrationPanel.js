/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './SpotifyIntegrationPanel.css';
import { FaSpotify, FaPlay, FaPause, FaMusic, FaUnlink, FaCheck, FaTimes } from 'react-icons/fa';
import logger from '../../utils/logger';

function SpotifyIntegrationPanel({ apiBaseUrl, fetchWithAuth }) {
    const [connected, setConnected] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [showActivity, setShowActivity] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        checkSpotifyConnection();
        if (connected) {
            fetchCurrentTrack();
            const interval = setInterval(fetchCurrentTrack, 30000); // Update every 30 seconds
            return () => clearInterval(interval);
        }
    }, [connected]);

    const checkSpotifyConnection = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/auth/spotify/status/`);
            if (response.ok) {
                const data = await response.json();
                setConnected(data.connected);
                setShowActivity(data.display_enabled ?? data.show_activity ?? false);
            }
        } catch (err) {
            logger.error('Error checking Spotify connection:', err);
        }
    };

    const connectSpotify = async () => {
        setLoading(true);
        try {
            const username =
                localStorage.getItem('chat_username') || localStorage.getItem('username');
            if (!username) {
                throw new Error('Username not found');
            }

            const authUrl = `${apiBaseUrl}/auth/spotify/start/?username=${encodeURIComponent(username)}`;
            window.open(authUrl, '_blank', 'width=500,height=700');
        } catch (err) {
            setError('Bağlanılamadı: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const disconnectSpotify = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/auth/spotify/disconnect/`, {
                method: 'POST',
            });
            if (response.ok) {
                setConnected(false);
                setCurrentTrack(null);
                setError('');
            }
        } catch (err) {
            setError('Bağlantı kesilemedi: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchCurrentTrack = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/spotify/current-track/`);
            if (response.ok) {
                const data = await response.json();
                setCurrentTrack(data.track);
            }
        } catch (err) {
            logger.error('Error fetching current track:', err);
        }
    };

    const toggleActivityStatus = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/spotify/toggle-activity/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ enabled: !showActivity }),
            });
            if (response.ok) {
                const data = await response.json();
                setShowActivity(Boolean(data.enabled));
            }
        } catch (err) {
            setError('Aktivite durumu değiştirilemedi: ' + err.message);
        }
    };

    return (
        <div className="spotify-panel">
            <div className="spotify-header">
                <h2>
                    <FaSpotify className="spotify-icon" /> Spotify Entegrasyonu
                </h2>
            </div>

            {error && <div className="spotify-error">{error}</div>}

            {!connected ? (
                <div className="spotify-connect">
                    <div className="spotify-logo-container">
                        <FaSpotify className="spotify-logo" />
                    </div>
                    <h3>Spotify'a Bağlan</h3>
                    <p>Dinlediklerini arkadaşlarınla paylaş!</p>
                    <button
                        aria-label="connect Spotify"
                        className="connect-btn"
                        onClick={connectSpotify}
                        disabled={loading}
                    >
                        <FaSpotify /> Spotify'a Bağlan
                    </button>
                    <div className="spotify-features">
                        <div className="feature-item">
                            <FaCheck className="check-icon" />
                            <span>Şu an çaldığını göster</span>
                        </div>
                        <div className="feature-item">
                            <FaCheck className="check-icon" />
                            <span>Durumunda görüntüle</span>
                        </div>
                        <div className="feature-item">
                            <FaCheck className="check-icon" />
                            <span>Gizlilik kontrolü</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="spotify-connected">
                    <div className="connection-status">
                        <FaCheck className="status-icon" />
                        <span>Spotify'a Bağlandı</span>
                        <button
                            aria-label="disconnect Spotify"
                            className="disconnect-btn"
                            onClick={disconnectSpotify}
                            disabled={loading}
                        >
                            <FaUnlink /> Bağlantıyı Kes
                        </button>
                    </div>

                    <div className="activity-toggle">
                        <label className="toggle-label">
                            <input
                                type="checkbox"
                                checked={showActivity}
                                onChange={toggleActivityStatus}
                                aria-label="checkbox"
                            />
                            <span className="toggle-slider"></span>
                            <span className="toggle-text">Dinleme aktivitesini göster</span>
                        </label>
                    </div>

                    {currentTrack ? (
                        <div className="current-track">
                            <div className="track-header">
                                <FaMusic className="music-icon" />
                                <h3>Şu An Çalıyor</h3>
                            </div>
                            <div className="track-info">
                                {currentTrack.album_art && (
                                    <img
                                        src={currentTrack.album_art}
                                        alt="Album art"
                                        className="album-art"
                                    />
                                )}
                                <div className="track-details">
                                    <div className="track-name">{currentTrack.name}</div>
                                    <div className="track-artist">{currentTrack.artist}</div>
                                    <div className="track-album">{currentTrack.album}</div>
                                </div>
                                <div className="track-status">
                                    {currentTrack.is_playing ? (
                                        <FaPlay className="playing-icon" />
                                    ) : (
                                        <FaPause className="paused-icon" />
                                    )}
                                </div>
                            </div>
                            <div className="track-progress">
                                <div
                                    className="progress-bar"
                                    style={{ width: `${currentTrack.progress_percent || 0}%` }}
                                ></div>
                            </div>
                        </div>
                    ) : (
                        <div className="no-track">
                            <FaMusic className="no-track-icon" />
                            <p>Şu an hiçbir şey çalmıyor</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

SpotifyIntegrationPanel.propTypes = {
    apiBaseUrl: PropTypes.string,
    fetchWithAuth: PropTypes.func,
};
export default SpotifyIntegrationPanel;
