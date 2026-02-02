import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FaSpotify, FaSteam, FaPlaystation, FaXbox, FaTwitch, FaDiscord, FaGamepad, FaLink, FaUnlink, FaCheckCircle, FaExclamationCircle, FaSpinner, FaMusic, FaYoutube, FaGithub, FaTwitter, FaTimes } from 'react-icons/fa';
import { SiEpicgames, SiBattledotnet, SiRiotgames, SiOrigin } from 'react-icons/si';
import { useAuth } from '../AuthContext';
import toast from '../utils/toast';
import { getApiBase } from '../utils/apiEndpoints';
import './ConnectionsPanel.css';

const ConnectionsPanel = ({ onClose }) => {
    const { token, user } = useAuth();
    const [connections, setConnections] = useState({});
    const [loading, setLoading] = useState(true);
    const [connecting, setConnecting] = useState(null);
    const popupIntervalRef = useRef(null);
    const popupTimeoutRef = useRef(null);

    // Dinamik API URL
    const API_URL = getApiBase().replace('/api', '');

    // Bağlantı platformları
    const platforms = [
        {
            id: 'spotify',
            name: 'Spotify',
            icon: FaSpotify,
            color: '#1DB954',
            description: 'Dinlediğin müziği profilinde göster',
            oauth: true,
            features: ['Now Playing', 'Rich Presence']
        },
        {
            id: 'steam',
            name: 'Steam',
            icon: FaSteam,
            color: '#171A21',
            description: 'Oynadığın oyunları profilinde göster',
            oauth: true,
            features: ['Game Activity', 'Rich Presence', 'Achievements']
        },
        {
            id: 'xbox',
            name: 'Xbox',
            icon: FaXbox,
            color: '#107C10',
            description: 'Xbox Live hesabını bağla',
            oauth: true,
            features: ['Gamertag', 'Game Activity', 'Achievements']
        },
        {
            id: 'twitch',
            name: 'Twitch',
            icon: FaTwitch,
            color: '#9146FF',
            description: 'Twitch yayın durumunu göster',
            oauth: true,
            features: ['Stream Status', 'Rich Presence']
        },
        {
            id: 'github',
            name: 'GitHub',
            icon: FaGithub,
            color: '#333333',
            description: 'GitHub profilini bağla',
            oauth: true,
            features: ['Repositories', 'Contributions', 'Profile']
        },
        {
            id: 'youtube',
            name: 'YouTube',
            icon: FaYoutube,
            color: '#FF0000',
            description: 'YouTube kanalını bağla',
            oauth: true,
            features: ['Channel', 'Subscribers', 'Videos']
        },
        {
            id: 'discord',
            name: 'Discord',
            icon: FaDiscord,
            color: '#5865F2',
            description: 'Discord hesabını bağla (migration)',
            oauth: true,
            features: ['Profile', 'Friends Import']
        }
        // Yakında eklenecek platformlar:
        // PlayStation, Epic Games, Battle.net, Riot Games, Twitter
    ];

    // Bağlantı durumlarını yükle
    const loadConnections = useCallback(async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 saniye timeout

        try {
            const response = await fetch(`${API_URL}/api/connections/status/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (response.ok) {
                const data = await response.json();
                setConnections(data.connections || {});
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.error('Connections loading timeout (10s)');
                toast.error('Bağlantılar yüklenemedi - zaman aşımı');
            } else {
                console.error('Failed to load connections:', error);
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

        // OAuth URL'ini direkt popup'ta aç (CORS hatası olmasın)
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
            toast.error('Popup blocker tarafından engellendi. Lütfen popup\'lara izin verin.');
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
                toast.success(`${platformId} bağlantısı kontrol ediliyor...`);
            }
        }, 500);

        // Timeout (2 dakika)
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

    // Bağlantıyı kes
    const handleDisconnect = async (platformId) => {
        if (!confirm(`${platformId} bağlantısını kesmek istediğinize emin misiniz?`)) {
            return;
        }

        setConnecting(platformId);

        try {
            const response = await fetch(`${API_URL}/api/connections/${platformId}/disconnect/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                toast.success(`${platformId} bağlantısı kesildi`);
                loadConnections();
            } else {
                toast.error('Bağlantı kesilemedi');
            }
        } catch (error) {
            console.error('Disconnect error:', error);
            toast.error('Bağlantı kesme hatası');
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
                    {platform.features.map(feature => (
                        <span key={feature} className="feature-tag">{feature}</span>
                    ))}
                </div>

                <div className="connection-actions">
                    {isConnected ? (
                        <button
                            className="disconnect-btn"
                            onClick={() => handleDisconnect(platform.id)}
                            disabled={isConnecting}
                        >
                            {isConnecting ? <FaSpinner className="spin" /> : <FaUnlink />}
                            Bağlantıyı Kes
                        </button>
                    ) : (
                        <button
                            className="connect-btn"
                            onClick={() => handleConnect(platform.id)}
                            disabled={isConnecting}
                            style={{ backgroundColor: platform.color }}
                        >
                            {isConnecting ? <FaSpinner className="spin" /> : <FaLink />}
                            Bağlan
                        </button>
                    )}
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="connections-modal-overlay" onClick={onClose}>
                <div className="connections-modal" onClick={e => e.stopPropagation()}>
                    <div className="connections-panel loading">
                        <FaSpinner className="spin large" />
                        <p>Bağlantılar yükleniyor...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="connections-modal-overlay" onClick={onClose}>
            <div className="connections-modal" onClick={e => e.stopPropagation()}>
                <button className="connections-close-btn" onClick={onClose}>
                    <FaTimes />
                </button>
                <div className="connections-panel">
                    <div className="connections-header">
                        <h2>
                            <FaLink /> Bağlantılar
                        </h2>
                        <p>Hesaplarını bağlayarak profilini zenginleştir ve aktivitelerini göster</p>
                    </div>

                    <div className="connections-grid">
                        {/* Oyun Platformları */}
                        <div className="connection-section">
                            <h3 className="section-title">
                                <FaGamepad /> Oyun Platformları
                            </h3>
                            <div className="platforms-grid">
                                {platforms.filter(p => ['steam', 'epic', 'xbox', 'playstation', 'battlenet', 'riot'].includes(p.id)).map(renderPlatform)}
                            </div>
                        </div>

                        {/* Müzik & Streaming */}
                        <div className="connection-section">
                            <h3 className="section-title">
                                <FaMusic /> Müzik & Streaming
                            </h3>
                            <div className="platforms-grid">
                                {platforms.filter(p => ['spotify', 'twitch', 'youtube'].includes(p.id)).map(renderPlatform)}
                            </div>
                        </div>

                        {/* Sosyal */}
                        <div className="connection-section">
                            <h3 className="section-title">
                                <FaLink /> Sosyal Medya
                            </h3>
                            <div className="platforms-grid">
                                {platforms.filter(p => ['discord', 'twitter', 'github'].includes(p.id)).map(renderPlatform)}
                            </div>
                        </div>
                    </div>

                    <div className="connections-footer">
                        <p className="privacy-note">
                            <FaExclamationCircle />
                            Bağlantılar sadece izin verdiğin bilgilere erişir. İstediğin zaman bağlantıyı kesebilirsin.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConnectionsPanel;
