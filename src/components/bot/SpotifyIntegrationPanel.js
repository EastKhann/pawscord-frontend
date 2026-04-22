import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './SpotifyIntegrationPanel.css';
import { FaSpotify, FaPlay, FaPause, FaMusic, FaUnlink, FaCheck, FaTimes } from 'react-icons/fa';
import logger from '../../utils/logger';
import { useTranslation } from 'react-i18next';

function SpotifyIntegrationPanel({ apiBaseUrl, fetchWithAuth }) {
    const { t } = useTranslation();
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
            setError(t('spotify.connectFailed', 'Could not connect:') + ' ' + err.message);
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
            setError(t('spotify.disconnectFailed', 'Could not disconnect:') + ' ' + err.message);
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
            setError(t('spotify.activityFailed', 'Could not change activity status:') + ' ' + err.message);
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
                    <h3>{t('spotify.connectTitle', 'Connect to Spotify')}</h3>
                    <p>{t('spotify.connectDesc', "Share what you're listening to with friends!")}</p>
                    <button
                        aria-label={t('spotify.connect', 'Connect Spotify')}
                        className="connect-btn"
                        onClick={connectSpotify}
                        disabled={loading}
                    >
                        <FaSpotify /> {t('spotify.connect', 'Connect to Spotify')}
                    </button>
                    <div className="spotify-features">
                        <div className="feature-item">
                            <FaCheck className="check-icon" />
                            <span>{t('spotify.showNowPlaying', "Show what you're playing")}</span>
                        </div>
                        <div className="feature-item">
                            <FaCheck className="check-icon" />
                            <span>{t('spotify.showInStatus', 'Show in status')}</span>
                        </div>
                        <div className="feature-item">
                            <FaCheck className="check-icon" />
                            <span>{t('spotify.privacyControl', 'Privacy control')}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="spotify-connected">
                    <div className="connection-status">
                        <FaCheck className="status-icon" />
                        <span>{t('spotify.connected', 'Connected to Spotify')}</span>
                        <button
                            aria-label={t('spotify.disconnect', 'Disconnect Spotify')}
                            className="disconnect-btn"
                            onClick={disconnectSpotify}
                            disabled={loading}
                        >
                            <FaUnlink /> {t('spotify.disconnect', 'Disconnect')}
                        </button>
                    </div>

                    <div className="activity-toggle">
                        <label className="toggle-label">
                            <input
                                type="checkbox"
                                checked={showActivity}
                                onChange={toggleActivityStatus}
                                aria-label={t('spotify.enableFeature', 'Enable feature')}
                            />
                            <span className="toggle-slider"></span>
                            <span className="toggle-text">{t('spotify.showActivity', 'Show listening activity')}</span>
                        </label>
                    </div>

                    {currentTrack ? (
                        <div className="current-track">
                            <div className="track-header">
                                <FaMusic className="music-icon" />
                                <h3>{t('spotify.nowPlaying', 'Now Playing')}</h3>
                            </div>
                            <div className="track-info">
                                {currentTrack.album_art && (
                                    <img
                                        src={currentTrack.album_art}
                                        alt={t('alt.albumArt', 'Album Art')}
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
                            <p>{t('spotify.nothingPlaying', 'Not playing anything right now')}</p>
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
