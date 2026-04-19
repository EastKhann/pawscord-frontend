/* eslint-disable no-irregular-whitespace */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import {
    FaSpotify,
    FaSteam,
    FaPlaystation,
    FaXbox,
    FaTwitch,
    FaGamepad,
    FaLink,
    FaUnlink,
    FaCheckCircle,
    FaExclamationCircle,
    FaSpinner,
    FaMusic,
    FaYoutube,
    FaGithub,
    FaTwitter,
    FaTimes,
} from 'react-icons/fa';
import { SiEpicgames, SiBattledotnet, SiRiotgames, SiOrigin } from 'react-icons/si';
import { useAuth } from '../../AuthContext';
import toast from '../../utils/toast';
import { getApiBase } from '../../utils/apiEndpoints';
import './ConnectionsPanel.css';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
import confirmDialog from '../../utils/confirmDialog';

const ConnectionsPanel = ({ onClose }) => {
    const { t } = useTranslation();
    const { token, user } = useAuth();
    const [connections, setConnections] = useState({});
    const [loading, setLoading] = useState(true);
    const [connecting, setConnecting] = useState(null);
    const popupIntervalRef = useRef(null);
    const popupTimeoutRef = useRef(null);

    // Dinamik API URL — getApiBase() already returns base without /api suffix
    const API_URL = getApiBase();

    // Bağlantı platformları
    const platforms = [
        {
            id: 'spotify',
            name: 'Spotify',
            icon: FaSpotify,
            color: '#1DB954',
            description: t('ui.dinledigin_muzigi_profileinde_goster'),
            oauth: true,
            features: ['Now Playing', 'Rich Presence'],
        },
        {
            id: 'steam',
            name: 'Steam',
            icon: FaSteam,
            color: '#171A21',
            description: t('ui.oynadigin_oyunlari_profileinde_goster'),
            oauth: true,
            features: ['Game Activity', 'Rich Presence', 'Achievements'],
        },
        {
            id: 'xbox',
            name: 'Xbox',
            icon: FaXbox,
            color: '#107C10',
            description: t('ui.xbox_live_hesabini_bagla'),
            oauth: true,
            features: ['Gamertag', 'Game Activity', 'Achievements'],
        },
        {
            id: 'twitch',
            name: 'Twitch',
            icon: FaTwitch,
            color: '#9146FF',
            description: t('ui.twitch_yayin_durumunu_goster'),
            oauth: true,
            features: ['Stream Status', 'Rich Presence'],
        },
        {
            id: 'github',
            name: 'GitHub',
            icon: FaGithub,
            color: '#333333',
            description: t('ui.github_profileini_bagla'),
            oauth: true,
            features: ['Repositories', 'Contributions', 'Profile'],
        },
        {
            id: 'youtube',
            name: 'YouTube',
            icon: FaYoutube,
            color: '#FF0000',
            description: t('ui.youtube_kanalini_bagla'),
            oauth: true,
            features: ['Channel', 'Subscribers', 'Videos'],
        },
        // Yakında addnecek platformlar:
        // PlayStation, Epic Games, Battle.net, Riot Games, Twitter
    ];

    // Bağlantı durumlarını upload
    const loadConnections = useCallback(async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 saniye timeout

        try {
            const response = await fetch(`${API_URL}/api/connections/status/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                signal: controller.signal,
            });
            clearTimeout(timeoutId);

            if (response.ok) {
                const data = await response.json();
                setConnections(data.connections || {});
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                logger.error('Connections loading timeout (10s)');
                toast.error(t('connections.loadTimeout'));
            } else {
                logger.error('Failed to load connections:', error);
            }
        } finally {
            setLoading(false);
        }
    }, [token, API_URL]);

    useEffect(() => {
        loadConnections();
        // Cleanup interval/timeout on unmount
        return () => {
            if (popupIntervalRef.current) clearInterval(popupIntervalRef.current);
            if (popupTimeoutRef.current) clearTimeout(popupTimeoutRef.current);
        };
    }, [loadConnections]);

    // OAuth bağlantısı başlat
    const handleConnect = (platformId) => {
        // Clear any existing intervals before starting new one
        if (popupIntervalRef.current) clearInterval(popupIntervalRef.current);
        if (popupTimeoutRef.current) clearTimeout(popupTimeoutRef.current);

        setConnecting(platformId);

        // OAuth URL'ini direkt popup'ta open (CORS hatası olmasın)
        const width = 500;
        const height = 700;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        const popup = window.open(
            `${API_URL}/api/auth/${platformId}/start/?username=${user?.username || 'anonymous'}`,
            `${platformId}_oauth`,
            `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no`
        );

        if (!popup) {
            toast.error(t('connections.popupBlocked'));
            setConnecting(null);
            return;
        }

        // Popup kapanınca bağlantıları yenile
        popupIntervalRef.current = setInterval(() => {
            if (popup.closed) {
                clearInterval(popupIntervalRef.current);
                popupIntervalRef.current = null;
                setConnecting(null);
                loadConnections();
                toast.success(t('connections.checking', { platform: platformId }));
            }
        }, 500);

        // Timeout (2 minute)
        popupTimeoutRef.current = setTimeout(() => {
            if (popupIntervalRef.current) {
                clearInterval(popupIntervalRef.current);
                popupIntervalRef.current = null;
            }
            if (!popup.closed) {
                popup.close();
            }
            setConnecting(null);
        }, 120000);
    };

    // Bağlantıyı cut
    const handleDisconnect = async (platformId) => {
        if (!(await confirmDialog(t('connections.disconnectConfirm', { platform: platformId })))) {
            return;
        }

        setConnecting(platformId);

        try {
            const response = await fetch(`${API_URL}/api/connections/${platformId}/disconnect/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                toast.success(t('connections.disconnected', { platform: platformId }));
                loadConnections();
            } else {
                toast.error(t('connections.removeFailed'));
            }
        } catch (error) {
            logger.error('Disconnect error:', error);
            toast.error(t('ui.baglanti_kesme_hatasi'));
        } finally {
            setConnecting(null);
        }
    };

    const renderPlatform = (platform) => {
        const connection = connections[platform.id];
        const isConnected = connection?.connected;
        const isConnecting = connecting === platform.id;
        const Icon = platform.icon;

        return (
            <div
                key={platform.id}
                className={`connection-card ${isConnected ? 'connected' : ''}`}
                style={{ '--platform-color': platform.color }}
            >
                <div className="connection-header">
                    <div className="platform-icon" style={{ backgroundColor: platform.color }}>
                        <Icon />
                    </div>
                    <div className="platform-info">
                        <h3>{platform.name}</h3>
                        <p>{platform.description}</p>
                    </div>
                </div>

                {isConnected && connection.username && (
                    <div className="connection-details">
                        <span className="connected-as">
                            <FaCheckCircle className="status-icon success" />
                            Bağlı: <strong>{connection.username}</strong>
                        </span>
                        {connection.data && (
                            <div className="connection-data">
                                {connection.data.game && (
                                    <span className="activity">
                                        <FaGamepad /> {connection.data.game}
                                    </span>
                                )}
                                {connection.data.track && (
                                    <span className="activity">
                                        <FaMusic /> {connection.data.track}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                )}

                <div className="connection-features">
                    {platform.features.map((feature) => (
                        <span key={feature} className="feature-tag">
                            {feature}
                        </span>
                    ))}
                </div>

                <div className="connection-actions">
                    {isConnected ? (
                        <button
                            aria-label="Action button"
                            className="disconnect-btn"
                            onClick={() => handleDisconnect(platform.id)}
                            disabled={isConnecting}
                        >
                            {isConnecting ? <FaSpinner className="spin" /> : <FaUnlink />}
                            Disconnect
                        </button>
                    ) : (
                        <button
                            aria-label="Action button"
                            className="connect-btn"
                            onClick={() => handleConnect(platform.id)}
                            disabled={isConnecting}
                            style={{ backgroundColor: platform.color }}
                        >
                            {isConnecting ? <FaSpinner className="spin" /> : <FaLink />}
                            Connect
                        </button>
                    )}
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div
                className="connections-modal-overlay"
                role="button"
                tabIndex={0}
                onClick={onClose}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                <div
                    className="connections-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Connections"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="connections-panel loading">
                        <FaSpinner className="spin large" />
                        <p>{t('connections.loading', 'Bağlantılar yükleniyor...')}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="connections-modal-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
            <div
                className="connections-modal"
                role="dialog"
                aria-modal="true"
                aria-label="Connections"
                onClick={(e) => e.stopPropagation()}
            >
                <button aria-label="Close" className="connections-close-btn" onClick={onClose}>
                    <FaTimes />
                </button>
                <div className="connections-panel">
                    <div className="connections-header">
                        <h2>
                            <FaLink /> {t('connections.title', 'Connections')}
                        </h2>
                        <p>
                            {t(
                                'connections.description',
                                'Enrich your profile by connecting your accounts and show your activities'
                            )}
                        </p>
                    </div>

                    <div className="connections-grid">
                        {/* Oyun Platformları */}
                        <div className="connection-section">
                            <h3 className="section-title">
                                <FaGamepad /> {t('connections.gamingPlatforms', 'Gaming Platforms')}
                            </h3>
                            <div className="platforms-grid">
                                {platforms
                                    .filter((p) =>
                                        [
                                            'steam',
                                            'epic',
                                            'xbox',
                                            'playstation',
                                            'battlenet',
                                            'riot',
                                        ].includes(p.id)
                                    )
                                    .map(renderPlatform)}
                            </div>
                        </div>

                        {/* Music & Streaming */}
                        <div className="connection-section">
                            <h3 className="section-title">
                                <FaMusic /> {t('connections.musicStreaming', 'Music & Streaming')}
                            </h3>
                            <div className="platforms-grid">
                                {platforms
                                    .filter((p) => ['spotify', 'twitch', 'youtube'].includes(p.id))
                                    .map(renderPlatform)}
                            </div>
                        </div>

                        {/* Sosyal */}
                        <div className="connection-section">
                            <h3 className="section-title">
                                <FaLink /> {t('connections.socialMedia', 'Social Media')}
                            </h3>
                            <div className="platforms-grid">
                                {platforms
                                    .filter((p) => ['twitter', 'github'].includes(p.id))
                                    .map(renderPlatform)}
                            </div>
                        </div>
                    </div>

                    <div className="connections-footer">
                        <p className="privacy-note">
                            <FaExclamationCircle />
                            {t(
                                'connections.privacyNote',
                                'Connections only access the information you allow. You can disconnect anytime.'
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

ConnectionsPanel.propTypes = {
    onClose: PropTypes.func,
};
export default ConnectionsPanel;
