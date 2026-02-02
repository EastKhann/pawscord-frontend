// 🎮 LEVELING SYSTEM - XP Bar, Level Badge, Leaderboard
// Discord benzeri seviye sistemi UI

import React, { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../config/api.config';
import './LevelingSystem.css';

// XP Progress Bar Component
export const XPProgressBar = ({ xp, xpProgress, xpNeeded, level, percentage, compact = false }) => {
    const displayPercentage = Math.min(percentage, 100);

    if (compact) {
        return (
            <div className="xp-bar-compact">
                <div className="level-badge-mini">Lv.{level}</div>
                <div className="xp-bar-mini">
                    <div
                        className="xp-fill-mini"
                        style={{ width: `${displayPercentage}%` }}
                    />
                </div>
                <span className="xp-text-mini">{displayPercentage}%</span>
            </div>
        );
    }

    return (
        <div className="xp-progress-container">
            <div className="xp-header">
                <div className="level-badge">
                    <span className="level-icon">⭐</span>
                    <span className="level-number">Level {level}</span>
                </div>
                <span className="xp-text">
                    {xpProgress?.toLocaleString()} / {xpNeeded?.toLocaleString()} XP
                </span>
            </div>
            <div className="xp-bar">
                <div
                    className="xp-fill"
                    style={{ width: `${displayPercentage}%` }}
                >
                    <span className="xp-glow" />
                </div>
            </div>
            <div className="xp-footer">
                <span className="total-xp">{xp?.toLocaleString()} Toplam XP</span>
                <span className="next-level">Level {level + 1}'e {xpNeeded - xpProgress} XP kaldı</span>
            </div>
        </div>
    );
};

// Level Badge Component
export const LevelBadge = ({ level, size = 'medium', showAnimation = false }) => {
    const getBadgeColor = (lvl) => {
        if (lvl >= 100) return 'legendary';
        if (lvl >= 75) return 'epic';
        if (lvl >= 50) return 'rare';
        if (lvl >= 25) return 'uncommon';
        return 'common';
    };

    const tier = getBadgeColor(level);

    return (
        <div className={`level-badge-display ${size} ${tier} ${showAnimation ? 'animated' : ''}`}>
            <div className="badge-glow" />
            <div className="badge-content">
                <span className="badge-level">{level}</span>
            </div>
            <div className="badge-ring" />
        </div>
    );
};

// Rank Display Component
export const RankDisplay = ({ rank, total }) => {
    const getRankIcon = (r) => {
        if (r === 1) return '🥇';
        if (r === 2) return '🥈';
        if (r === 3) return '🥉';
        if (r <= 10) return '🏆';
        if (r <= 50) return '⭐';
        return '🎖️';
    };

    return (
        <div className="rank-display">
            <span className="rank-icon">{getRankIcon(rank)}</span>
            <span className="rank-number">#{rank}</span>
            {total && <span className="rank-total">/ {total}</span>}
        </div>
    );
};

// Leaderboard Component
export const Leaderboard = ({ serverId, serverName, onClose }) => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [scope, setScope] = useState(serverId ? 'server' : 'global');

    const API_URL = API_BASE_URL;

    const loadLeaderboard = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const url = scope === 'server' && serverId
                ? `${API_URL}/leveling/leaderboard/?server_id=${serverId}&limit=20`
                : `${API_URL}/leveling/leaderboard/?limit=20`;

            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setLeaderboard(data.leaderboard || []);
            }
        } catch (e) {
            console.error('Failed to load leaderboard:', e);
        }
        setLoading(false);
    }, [API_URL, serverId, scope]);

    useEffect(() => {
        loadLeaderboard();
    }, [loadLeaderboard]);

    return (
        <div className="leaderboard-modal">
            <div className="leaderboard-header">
                <h2>🏆 {scope === 'server' ? serverName : 'Global'} Sıralama</h2>
                {serverId && (
                    <div className="scope-toggle">
                        <button
                            className={scope === 'server' ? 'active' : ''}
                            onClick={() => setScope('server')}
                        >
                            Sunucu
                        </button>
                        <button
                            className={scope === 'global' ? 'active' : ''}
                            onClick={() => setScope('global')}
                        >
                            Global
                        </button>
                    </div>
                )}
                {onClose && <button className="close-btn" onClick={onClose}>×</button>}
            </div>

            <div className="leaderboard-content">
                {loading ? (
                    <div className="leaderboard-loading">
                        <div className="loading-spinner" />
                    </div>
                ) : leaderboard.length === 0 ? (
                    <div className="no-data">Henüz sıralama verisi yok</div>
                ) : (
                    <div className="leaderboard-list">
                        {leaderboard.map((user, idx) => (
                            <div
                                key={user.username}
                                className={`leaderboard-row rank-${user.rank}`}
                            >
                                <div className="rank-column">
                                    {user.rank <= 3 ? (
                                        <span className="top-rank">
                                            {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                                        </span>
                                    ) : (
                                        <span className="rank-num">#{user.rank}</span>
                                    )}
                                </div>
                                <img
                                    src={user.avatar || '/default-avatar.png'}
                                    alt=""
                                    className="user-avatar"
                                />
                                <div className="user-info">
                                    <span className="username">{user.username}</span>
                                    <span className="message-count">
                                        {user.message_count?.toLocaleString()} mesaj
                                    </span>
                                </div>
                                <div className="level-info">
                                    <LevelBadge level={user.level} size="small" />
                                    <span className="xp-count">{user.xp?.toLocaleString()} XP</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// Level Up Notification Component
export const LevelUpNotification = ({ level, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose?.();
        }, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="levelup-notification">
            <div className="levelup-content">
                <div className="levelup-stars">✨</div>
                <div className="levelup-icon">🎉</div>
                <h3>SEVİYE ATLADIN!</h3>
                <div className="new-level">
                    <LevelBadge level={level} size="large" showAnimation />
                </div>
                <p>Tebrikler! Artık Level {level} oldun!</p>
            </div>
            <button className="levelup-close" onClick={onClose}>×</button>
        </div>
    );
};

// XP Gained Toast Component
export const XPGainedToast = ({ amount, reason, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose?.();
        }, 2000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="xp-toast">
            <span className="xp-plus">+{amount} XP</span>
            {reason && <span className="xp-reason">{reason}</span>}
        </div>
    );
};

// User Level Card (for profile)
export const UserLevelCard = ({ username }) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = API_BASE_URL;

    useEffect(() => {
        const loadStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(
                    `${API_URL}/leveling/stats/${username}/`,
                    { headers: { 'Authorization': `Bearer ${token}` } }
                );
                if (response.ok) {
                    setStats(await response.json());
                }
            } catch (e) {
                console.error('Failed to load level stats:', e);
            }
            setLoading(false);
        };

        if (username) loadStats();
    }, [username, API_URL]);

    if (loading) {
        return <div className="level-card loading"><div className="loading-spinner" /></div>;
    }

    if (!stats) {
        return null;
    }

    return (
        <div className="user-level-card">
            <div className="card-left">
                <LevelBadge level={stats.level} size="medium" />
            </div>
            <div className="card-right">
                <div className="card-stats">
                    <div className="stat-item">
                        <span className="stat-label">Rank</span>
                        <span className="stat-value">#{stats.rank}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Mesaj</span>
                        <span className="stat-value">{stats.total_messages?.toLocaleString()}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Ses (dk)</span>
                        <span className="stat-value">{stats.voice_minutes?.toLocaleString()}</span>
                    </div>
                </div>
                <XPProgressBar
                    xp={stats.xp}
                    xpProgress={stats.xp_progress}
                    xpNeeded={stats.xp_needed_for_next}
                    level={stats.level}
                    percentage={stats.percentage}
                    compact
                />
            </div>
        </div>
    );
};

// Custom Hook for Leveling
export const useLeveling = () => {
    const [stats, setStats] = useState(null);
    const [levelUpData, setLevelUpData] = useState(null);
    const [xpToast, setXpToast] = useState(null);

    const API_URL = API_BASE_URL;

    const loadStats = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/leveling/stats/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                setStats(await response.json());
            }
        } catch (e) {
            console.error('Failed to load stats:', e);
        }
    }, [API_URL]);

    const awardXP = useCallback(async (type = 'message', amount = null, reason = '') => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/leveling/award/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type, amount, reason })
            });

            if (response.ok) {
                const data = await response.json();

                // Show XP toast
                setXpToast({ amount: data.xp_gained, reason });

                // Check for level up
                if (data.leveled_up) {
                    setLevelUpData({ level: data.new_level });
                }

                // Refresh stats
                loadStats();

                return data;
            }
        } catch (e) {
            console.error('Failed to award XP:', e);
        }
        return null;
    }, [API_URL, loadStats]);

    useEffect(() => {
        loadStats();
    }, [loadStats]);

    return {
        stats,
        levelUpData,
        xpToast,
        loadStats,
        awardXP,
        clearLevelUp: () => setLevelUpData(null),
        clearXpToast: () => setXpToast(null)
    };
};

export default {
    XPProgressBar,
    LevelBadge,
    RankDisplay,
    Leaderboard,
    LevelUpNotification,
    XPGainedToast,
    UserLevelCard,
    useLeveling
};
