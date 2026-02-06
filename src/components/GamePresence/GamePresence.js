// frontend/src/components/GamePresence/GamePresence.js
/**
 * 🎮 PAWSCORD - Game Presence & Rich Presence Component
 * ════════════════════════════════════════════════════════════════════════════════
 * Discord-style oyun aktivitesi gösterimi
 * ════════════════════════════════════════════════════════════════════════════════
 */

import React, { useState, useEffect, useMemo } from 'react';
import { FaGamepad, FaMusic, FaTwitch, FaYoutube, FaSpotify, FaClock, FaUsers, FaExternalLinkAlt, FaEdit } from 'react-icons/fa';
import { API_BASE_URL } from '../../utils/constants';
import './GamePresence.css';

// ════════════════════════════════════════════════════════════════════════════════
// 🎮 ACTIVITY BADGE COMPONENT
// ════════════════════════════════════════════════════════════════════════════════

export const ActivityBadge = ({ activity, size = 'medium' }) => {
    if (!activity) return null;

    const getIcon = () => {
        switch (activity.type) {
            case 'playing': return <FaGamepad />;
            case 'streaming': return <FaTwitch />;
            case 'listening': return <FaSpotify />;
            case 'watching': return <FaYoutube />;
            default: return <FaGamepad />;
        }
    };

    const getTypeColor = () => {
        switch (activity.type) {
            case 'playing': return '#43b581';
            case 'streaming': return '#9146ff';
            case 'listening': return '#1db954';
            case 'watching': return '#ff0000';
            default: return '#7289da';
        }
    };

    return (
        <div className={`activity-badge activity-badge-${size}`} style={{ borderColor: getTypeColor() }}>
            <span className="activity-icon" style={{ color: getTypeColor() }}>
                {getIcon()}
            </span>
            <span className="activity-name">{activity.name}</span>
        </div>
    );
};

// ════════════════════════════════════════════════════════════════════════════════
// 🎮 RICH PRESENCE CARD
// ════════════════════════════════════════════════════════════════════════════════

export const RichPresenceCard = ({ activity, expanded = false }) => {
    const [elapsedTime, setElapsedTime] = useState('');

    // Geçen süreyi hesapla
    useEffect(() => {
        if (!activity?.timestamps?.start) return;

        const updateElapsed = () => {
            const start = new Date(activity.timestamps.start);
            const now = new Date();
            const diff = Math.floor((now - start) / 1000);

            const hours = Math.floor(diff / 3600);
            const minutes = Math.floor((diff % 3600) / 60);
            const seconds = diff % 60;

            if (hours > 0) {
                setElapsedTime(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
            } else {
                setElapsedTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
            }
        };

        updateElapsed();
        const interval = setInterval(updateElapsed, 1000);

        return () => clearInterval(interval);
    }, [activity]);

    if (!activity) return null;

    const getActivityLabel = () => {
        switch (activity.type) {
            case 'playing': return 'Playing';
            case 'streaming': return 'Streaming';
            case 'listening': return 'Listening to';
            case 'watching': return 'Watching';
            case 'competing': return 'Competing in';
            default: return 'Activity';
        }
    };

    const getTypeClass = () => `rich-presence-${activity.type}`;

    return (
        <div className={`rich-presence-card ${getTypeClass()} ${expanded ? 'expanded' : ''}`}>
            {/* Header */}
            <div className="rp-header">
                <span className="rp-type">{getActivityLabel()}</span>
            </div>

            {/* Content */}
            <div className="rp-content">
                {/* Assets */}
                <div className="rp-assets">
                    {activity.assets?.large_image && (
                        <div className="rp-large-image">
                            <img src={activity.assets.large_image} alt={activity.name} />
                            {activity.assets?.small_image && (
                                <img
                                    src={activity.assets.small_image}
                                    alt=""
                                    className="rp-small-image"
                                    title={activity.assets.small_text}
                                />
                            )}
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="rp-info">
                    <div className="rp-name">{activity.name}</div>
                    {activity.details && <div className="rp-details">{activity.details}</div>}
                    {activity.state && <div className="rp-state">{activity.state}</div>}

                    {/* Party Info */}
                    {activity.party?.size && (
                        <div className="rp-party">
                            <FaUsers />
                            <span>{activity.party.size[0]} of {activity.party.size[1]}</span>
                        </div>
                    )}

                    {/* Elapsed Time */}
                    {activity.timestamps?.start && (
                        <div className="rp-elapsed">
                            <FaClock />
                            <span>{elapsedTime} elapsed</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Buttons */}
            {activity.buttons && activity.buttons.some(b => b) && (
                <div className="rp-buttons">
                    {activity.buttons.filter(b => b).map((btn, idx) => (
                        <a
                            key={idx}
                            href={btn.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rp-button"
                        >
                            {btn.label}
                            <FaExternalLinkAlt />
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

// ════════════════════════════════════════════════════════════════════════════════
// 🎵 SPOTIFY CARD
// ════════════════════════════════════════════════════════════════════════════════

export const SpotifyCard = ({ activity }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!activity?.timestamps) return;

        const updateProgress = () => {
            const start = activity.timestamps.start;
            const end = activity.timestamps.end;
            const now = Date.now();

            const elapsed = now - start;
            const total = end - start;
            const percent = Math.min((elapsed / total) * 100, 100);

            setProgress(percent);
        };

        updateProgress();
        const interval = setInterval(updateProgress, 1000);

        return () => clearInterval(interval);
    }, [activity]);

    if (!activity || activity.type !== 'listening') return null;

    return (
        <div className="spotify-card">
            <div className="spotify-header">
                <FaSpotify className="spotify-icon" />
                <span>Listening to Spotify</span>
            </div>

            <div className="spotify-content">
                {activity.assets?.large_image && (
                    <img
                        src={activity.assets.large_image}
                        alt={activity.details}
                        className="spotify-album-art"
                    />
                )}

                <div className="spotify-info">
                    <div className="spotify-track">{activity.details}</div>
                    <div className="spotify-artist">{activity.state}</div>
                    {activity.assets?.large_text && (
                        <div className="spotify-album">{activity.assets.large_text}</div>
                    )}
                </div>
            </div>

            <div className="spotify-progress">
                <div
                    className="spotify-progress-bar"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

// ════════════════════════════════════════════════════════════════════════════════
// ✨ CUSTOM STATUS INPUT
// ════════════════════════════════════════════════════════════════════════════════

export const CustomStatusInput = ({ onSave, currentStatus }) => {
    const [emoji, setEmoji] = useState(currentStatus?.emoji || '');
    const [text, setText] = useState(currentStatus?.text || '');
    const [expiresIn, setExpiresIn] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const DURATION_OPTIONS = [
        { value: '', label: "Don't clear" },
        { value: '1800', label: '30 minutes' },
        { value: '3600', label: '1 hour' },
        { value: '14400', label: '4 hours' },
        { value: '86400', label: 'Today' },
        { value: '604800', label: 'This week' },
    ];

    const EMOJI_SUGGESTIONS = ['😀', '😎', '🎮', '💻', '📚', '🎵', '☕', '🌙', '❤️', '🔥'];

    const handleSave = async () => {
        if (!text.trim() && !emoji) return;

        setIsSaving(true);
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${API_BASE_URL}/presence/custom-status/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    emoji,
                    text,
                    expires_in: expiresIn ? parseInt(expiresIn) : null,
                }),
            });

            if (response.ok) {
                onSave?.();
            }
        } catch (error) {
            console.error('Custom status save error:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="custom-status-input">
            <div className="csi-header">
                <FaEdit />
                <span>Set a custom status</span>
            </div>

            <div className="csi-content">
                <div className="csi-emoji-row">
                    <input
                        type="text"
                        value={emoji}
                        onChange={e => setEmoji(e.target.value)}
                        placeholder="😀"
                        className="csi-emoji-input"
                        maxLength={2}
                    />
                    <input
                        type="text"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="What's on your mind?"
                        className="csi-text-input"
                        maxLength={128}
                    />
                </div>

                <div className="csi-emoji-suggestions">
                    {EMOJI_SUGGESTIONS.map(e => (
                        <button key={e} onClick={() => setEmoji(e)}>{e}</button>
                    ))}
                </div>

                <div className="csi-expires">
                    <label>Clear after:</label>
                    <select value={expiresIn} onChange={e => setExpiresIn(e.target.value)}>
                        {DURATION_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="csi-actions">
                <button
                    className="csi-save-btn"
                    onClick={handleSave}
                    disabled={isSaving || (!text.trim() && !emoji)}
                >
                    {isSaving ? 'Saving...' : 'Save'}
                </button>
            </div>
        </div>
    );
};

// ════════════════════════════════════════════════════════════════════════════════
// 📊 PLAYTIME STATS
// ════════════════════════════════════════════════════════════════════════════════

export const PlaytimeStats = ({ username }) => {
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const url = username
                    ? `${API_BASE_URL}/presence/playtime/${username}/`
                    : `${API_BASE_URL}/presence/playtime/`;

                const response = await fetch(url, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                if (response.ok) {
                    const data = await response.json();
                    setStats(data);
                }
            } catch (error) {
                console.error('Playtime stats error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, [username]);

    if (isLoading) {
        return <div className="playtime-loading">Loading stats...</div>;
    }

    if (!stats?.games?.length) {
        return (
            <div className="playtime-empty">
                <FaGamepad />
                <p>No games played yet</p>
            </div>
        );
    }

    return (
        <div className="playtime-stats">
            <div className="ps-header">
                <h3>🎮 Game Activity</h3>
                <span className="ps-total">{stats.total_playtime} total</span>
            </div>

            <div className="ps-games">
                {stats.games.map((game, idx) => (
                    <div key={idx} className="ps-game">
                        <div className="ps-game-icon">
                            {game.icon ? (
                                <img src={game.icon} alt={game.game} />
                            ) : (
                                <FaGamepad />
                            )}
                        </div>
                        <div className="ps-game-info">
                            <span className="ps-game-name">{game.game}</span>
                            <span className="ps-game-time">{game.total_hours}</span>
                        </div>
                        <div className="ps-game-sessions">
                            {game.sessions} sessions
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ════════════════════════════════════════════════════════════════════════════════
// 🎮 MAIN COMPONENT - USER ACTIVITY DISPLAY
// ════════════════════════════════════════════════════════════════════════════════

const GamePresence = ({ userId, username, showStats = false }) => {
    const [activities, setActivities] = useState([]);
    const [customStatus, setCustomStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const url = username
                    ? `${API_BASE_URL}/presence/activity/${username}/`
                    : `${API_BASE_URL}/presence/activity/`;

                const response = await fetch(url, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                if (response.ok) {
                    const data = await response.json();
                    setActivities(data.activities || []);
                    setCustomStatus(data.custom_status);
                }
            } catch (error) {
                console.error('Activity fetch error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchActivity();

        // Her 30 saniyede bir güncelle
        const interval = setInterval(fetchActivity, 30000);

        return () => clearInterval(interval);
    }, [username, userId]);

    if (isLoading) {
        return <div className="game-presence-loading">Loading...</div>;
    }

    // Önce Spotify, sonra oyun/streaming
    const sortedActivities = useMemo(() => {
        return [...activities].sort((a, b) => {
            const priority = { streaming: 1, playing: 2, listening: 3, watching: 4 };
            return (priority[a.type] || 5) - (priority[b.type] || 5);
        });
    }, [activities]);

    return (
        <div className="game-presence">
            {/* Custom Status */}
            {customStatus && (
                <div className="gp-custom-status">
                    {customStatus.emoji && <span className="gp-cs-emoji">{customStatus.emoji}</span>}
                    <span className="gp-cs-text">{customStatus.text}</span>
                </div>
            )}

            {/* Activities */}
            {sortedActivities.length > 0 ? (
                <div className="gp-activities">
                    {sortedActivities.map((activity, idx) => (
                        activity.type === 'listening' ? (
                            <SpotifyCard key={idx} activity={activity} />
                        ) : (
                            <RichPresenceCard key={idx} activity={activity} />
                        )
                    ))}
                </div>
            ) : !customStatus && (
                <div className="gp-no-activity">
                    <span>No current activity</span>
                </div>
            )}

            {/* Stats */}
            {showStats && <PlaytimeStats username={username} />}
        </div>
    );
};

export default GamePresence;
