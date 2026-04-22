/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import { getToken } from '../../utils/tokenStorage';
import PropTypes from 'prop-types';
import logger from '../../utils/logger';
import './ScreenShare.css';
import { API_BASE_URL } from '../../utils/apiEndpoints';
import { useTranslation } from 'react-i18next';

const ScreenShare = ({ serverId, onClose }) => {
    const { t } = useTranslation();
    const [screens, setScreens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sharing, setSharing] = useState(false);
    const [selectedSource, setSelectedSource] = useState(null);
    const [shareSettings, setShareSettings] = useState({
        quality: '1080p',
        fps: 30,
        audio: true,
        systemAudio: false,
    });

    useEffect(() => {
        fetchAvailableScreens();
        checkShareStatus();
    }, [serverId]);

    const fetchAvailableScreens = async () => {
        try {
            setLoading(true);
            // In a real implementation, this would use Electron's desktopCapturer
            // For now, we'll simulate with mock data
            const mockScreens = [
                { id: 'screen-1', name: 'Entire Screen', type: 'screen', thumbnail: '' },
                { id: 'screen-2', name: 'Display 2', type: 'screen', thumbnail: '' },
                { id: 'window-1', name: 'Chrome - Workspace', type: 'window', thumbnail: '' },
                { id: 'window-2', name: 'VS Code', type: 'window', thumbnail: '' },
                { id: 'window-3', name: 'Spotify', type: 'window', thumbnail: '' },
            ];
            setScreens(mockScreens);
        } catch (error) {
            logger.error('Error fetching screens:', error);
        } finally {
            setLoading(false);
        }
    };

    const checkShareStatus = async () => {
        try {
            const token = getToken();
            const response = await fetch(`${API_BASE_URL}/screen-share/${serverId}/status/`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setSharing(data.is_sharing || false);
            }
        } catch (error) {
            logger.error('Error checking share status:', error);
        }
    };

    const startShare = async () => {
        if (!selectedSource) {
            logger.error('❌ Please select a screen or window');
            return;
        }

        try {
            const token = getToken();
            const response = await fetch(`${API_BASE_URL}/screen-share/${serverId}/start/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    source_id: selectedSource.id,
                    source_type: selectedSource.type,
                    quality: shareSettings.quality,
                    fps: shareSettings.fps,
                    include_audio: shareSettings.audio,
                    include_system_audio: shareSettings.systemAudio,
                }),
            });

            if (response.ok) {
                setSharing(true);
            } else {
                logger.error('❌ Failed to start screen share');
            }
        } catch (error) {
            logger.error('Error starting screen share:', error);
        }
    };

    const stopShare = async () => {
        try {
            const token = getToken();
            const response = await fetch(`${API_BASE_URL}/screen-share/${serverId}/stop/`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                setSharing(false);
                setSelectedSource(null);
            }
        } catch (error) {
            logger.error('Error stopping screen share:', error);
        }
    };

    const updateSettings = (key, value) => {
        setShareSettings((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div
            className="screen-share-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="screen-share-modal"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="screen-share-header">
                    <h2>🖥️ Screen Share</h2>
                    <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="screen-share-content">
                    {sharing ? (
                        // Sharing Active View
                        <div className="sharing-active">
                            <div className="sharing-indicator">
                                <div className="live-badge">🔴 SHARING</div>
                                <p>{t('screenShare2.sharing', 'Your screen is being shared')}</p>
                            </div>

                            <div className="active-source">
                                <div className="source-icon">
                                    {selectedSource?.type === 'screen' ? '🖥️' : '🪟'}
                                </div>
                                <div className="source-name">
                                    {selectedSource?.name || 'Unknown Source'}
                                </div>
                            </div>

                            <div className="share-stats">
                                <div className="stat-item">
                                    <span className="stat-label">Quality:</span>
                                    <span className="stat-value">
                                        {shareSettings.quality} @ {shareSettings.fps}fps
                                    </span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Audio:</span>
                                    <span className="stat-value">
                                        {shareSettings.audio ? '✓ Enabled' : '✕ Disabled'}
                                    </span>
                                </div>
                            </div>

                            <button
                                aria-label={t('screenShare.stop', 'Stop screen share')}
                                className="stop-share-btn"
                                onClick={stopShare}
                            >
                                ⏹️ Stop Sharing
                            </button>
                        </div>
                    ) : (
                        // Setup View
                        <>
                            {/* Source Selection */}
                            <div className="source-selection">
                                <h3>{t('screenShare2.selectSource', 'Select Screen or Window')}</h3>

                                {loading ? (
                                    <div className="loading-spinner">{t('screenShare2.loadingSources', 'Loading sources...')}</div>
                                ) : (
                                    <div className="sources-grid">
                                        {screens.map((source) => (
                                            <div
                                                key={source.id}
                                                className={`source-card ${selectedSource?.id === source.id ? 'selected' : ''}`}
                                                role="button"
                                                tabIndex={0}
                                                onClick={() => setSelectedSource(source)}
                                                onKeyDown={(e) =>
                                                    (e.key === 'Enter' || e.key === ' ') &&
                                                    e.currentTarget.click()
                                                }
                                            >
                                                <div className="source-thumbnail">
                                                    <div className="source-type-icon">
                                                        {source.type === 'screen' ? '🖥️' : '🪟'}
                                                    </div>
                                                </div>
                                                <div className="source-label">{source.name}</div>
                                                {selectedSource?.id === source.id && (
                                                    <div className="selected-badge">✓</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Settings */}
                            {selectedSource && (
                                <div className="share-settings">
                                    <h3>⚙️ Share Settings</h3>

                                    <div className="settings-grid">
                                        <div className="setting-group">
                                            <label>Kalite</label>
                                            <select
                                                value={shareSettings.quality}
                                                onChange={(e) =>
                                                    updateSettings('quality', e.target.value)
                                                }
                                                className="setting-select"
                                            >
                                                <option value="1080p">1080p (Full HD)</option>
                                                <option value="720p">720p (HD)</option>
                                                <option value="480p">480p (SD)</option>
                                            </select>
                                        </div>

                                        <div className="setting-group">
                                            <label>{t('screenShare2.frameRate', 'Frame Rate')}</label>
                                            <select
                                                value={shareSettings.fps}
                                                onChange={(e) =>
                                                    updateSettings('fps', parseInt(e.target.value))
                                                }
                                                className="setting-select"
                                            >
                                                <option value={60}>60 FPS (Smooth)</option>
                                                <option value={30}>30 FPS (Standard)</option>
                                                <option value={15}>15 FPS (Low)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="audio-settings">
                                        <label className="audio-toggle">
                                            <input
                                                type="checkbox"
                                                checked={shareSettings.audio}
                                                onChange={(e) =>
                                                    updateSettings('audio', e.target.checked)
                                                }
                                            />
                                            <span>🎤 Share Microphone Audio</span>
                                        </label>

                                        <label className="audio-toggle">
                                            <input
                                                type="checkbox"
                                                checked={shareSettings.systemAudio}
                                                onChange={(e) =>
                                                    updateSettings('systemAudio', e.target.checked)
                                                }
                                            />
                                            <span>🔊 Share System Audio</span>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {/* Action Button */}
                            <div className="share-actions">
                                <button
                                    aria-label={t('screenShare.start', 'Start screen share')}
                                    className="start-share-btn"
                                    onClick={startShare}
                                    disabled={!selectedSource}
                                >
                                    {selectedSource ? '🖥️ Start Sharing' : '🖥️ Select a Source'}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

ScreenShare.propTypes = {
    serverId: PropTypes.string,
    onClose: PropTypes.func,
};
export default ScreenShare;
