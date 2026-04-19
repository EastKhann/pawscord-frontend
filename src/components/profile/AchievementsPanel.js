import { getToken } from '../../utils/tokenStorage';
// frontend/src/components/AchievementsPanel.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import toast from '../../utils/toast';
import './AchievementsPanel.css';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
const AchievementsPanel = ({ apiBaseUrl, username, onClose }) => {
    const { t } = useTranslation();
    const [achievements, setAchievements] = useState([]);
    const [badges, setBadges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // 'all', 'unlocked', 'locked'
    const [category, setCategory] = useState('all'); // 'all', 'social', 'activity', 'special'

    useEffect(() => {
        fetchAchievements();
        fetchBadges();
    }, [username]);

    const fetchAchievements = async () => {
        try {
            setLoading(true);
            const token = getToken();
            const response = await fetch(`${apiBaseUrl}/api/user/achievements/`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setAchievements(data.achievements || []);
            } else {
                toast.error(t('achievements.loadFailed'));
            }
        } catch (error) {
            logger.error('Fetch achievements error:', error);
            toast.error(t('common.connectionError'));
        } finally {
            setLoading(false);
        }
    };

    const fetchBadges = async () => {
        try {
            const token = getToken();
            const response = await fetch(`${apiBaseUrl}/api/user/badges/`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setBadges(data.badges || []);
            }
        } catch (error) {
            logger.error('Fetch badges error:', error);
        }
    };

    const filteredAchievements = achievements.filter((achievement) => {
        const matchesFilter =
            filter === 'all' ||
            (filter === 'unlocked' && achievement.unlocked) ||
            (filter === 'locked' && !achievement.unlocked);

        const matchesCategory = category === 'all' || achievement.category === category;

        return matchesFilter && matchesCategory;
    });

    const stats = {
        total: achievements.length,
        unlocked: achievements.filter((a) => a.unlocked).length,
        locked: achievements.filter((a) => !a.unlocked).length,
        progress:
            achievements.length > 0
                ? Math.round(
                      (achievements.filter((a) => a.unlocked).length / achievements.length) * 100
                  )
                : 0,
    };

    const getRarityColor = (rarity) => {
        const colors = {
            common: '#95a5a6',
            uncommon: '#3498db',
            rare: '#5865f2',
            epic: '#e74c3c',
            legendary: '#f39c12',
        };
        return colors[rarity] || colors.common;
    };

    const getRarityGlow = (rarity) => {
        if (rarity === 'legendary') return '0 0 20px rgba(243, 156, 18, 0.6)';
        if (rarity === 'epic') return '0 0 15px rgba(231, 76, 60, 0.5)';
        if (rarity === 'rare') return '0 0 10px rgba(155, 89, 182, 0.4)';
        return 'none';
    };

    const progressFillStyle = { width: `${stats.progress}%` };

    return (
        <div
            className="achievements-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="achievements-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="achievements-header">
                    <h2>{t('achievements.title', '🏆 Achievements & Badges')}</h2>
                    <button aria-label="Close" className="close-btn" onClick={onClose}>
                        ✕
                    </button>
                </div>

                {/* Stats Overview */}
                <div className="achievements-stats">
                    <div className="stat-item">
                        <span className="stat-icon">🎯</span>
                        <div className="stat-info">
                            <span className="stat-value">
                                {stats.unlocked}/{stats.total}
                            </span>
                            <span className="stat-label">
                                {t('achievements.statAchievement', 'Achievement')}
                            </span>
                        </div>
                    </div>
                    <div className="stat-item">
                        <span className="stat-icon">📊</span>
                        <div className="stat-info">
                            <span className="stat-value">{stats.progress}%</span>
                            <span className="stat-label">
                                {t('achievements.statCompletion', 'Completion')}
                            </span>
                        </div>
                    </div>
                    <div className="stat-item">
                        <span className="stat-icon">🎖️</span>
                        <div className="stat-info">
                            <span className="stat-value">{badges.length}</span>
                            <span className="stat-label">
                                {t('achievements.statBadge', 'Badge')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="progress-section">
                    <div className="progress-bar">
                        <div className="progress-fill" style={progressFillStyle}></div>
                    </div>
                    <span className="progress-text">
                        {t('achievements.progressComplete', '{{percent}}% Complete', {
                            percent: stats.progress,
                        })}
                    </span>
                </div>

                {/* Filters */}
                <div className="achievements-filters">
                    <div className="filter-group">
                        <button
                            aria-label="Action button"
                            className={filter === 'all' ? 'active' : ''}
                            onClick={() => setFilter('all')}
                        >
                            {t('achievements.filterAll', 'All ({{count}})', { count: stats.total })}
                        </button>
                        <button
                            aria-label="Action button"
                            className={filter === 'unlocked' ? 'active' : ''}
                            onClick={() => setFilter('unlocked')}
                        >
                            {t('achievements.filterUnlocked', '✓ Unlocked ({{count}})', {
                                count: stats.unlocked,
                            })}
                        </button>
                        <button
                            aria-label="Action button"
                            className={filter === 'locked' ? 'active' : ''}
                            onClick={() => setFilter('locked')}
                        >
                            {t('achievements.filterLocked', '🔒 Locked ({{count}})', {
                                count: stats.locked,
                            })}
                        </button>
                    </div>

                    <div className="category-group">
                        <button
                            aria-label="Action button"
                            className={category === 'all' ? 'active' : ''}
                            onClick={() => setCategory('all')}
                        >
                            {t('achievements.categoryAll', 'All Categories')}
                        </button>
                        <button
                            aria-label="Action button"
                            className={category === 'social' ? 'active' : ''}
                            onClick={() => setCategory('social')}
                        >
                            {t('achievements.categorySocial', '👥 Social')}
                        </button>
                        <button
                            aria-label="Action button"
                            className={category === 'activity' ? 'active' : ''}
                            onClick={() => setCategory('activity')}
                        >
                            {t('achievements.categoryActivity', '⚡ Activity')}
                        </button>
                        <button
                            aria-label="Action button"
                            className={category === 'special' ? 'active' : ''}
                            onClick={() => setCategory('special')}
                        >
                            {t('achievements.categorySpecial', '⭐ Special')}
                        </button>
                    </div>
                </div>

                <div className="achievements-content">
                    {/* Badges Section */}
                    {badges.length > 0 && (
                        <div className="badges-section">
                            <h3>{t('achievements.badgesTitle', '🎖️ Badges')}</h3>
                            <div className="badges-grid">
                                {badges.map((badge) => (
                                    <div
                                        key={badge.id}
                                        className="badge-card"
                                        title={badge.description}
                                    >
                                        <div className="badge-icon">{badge.icon}</div>
                                        <div className="badge-name">{badge.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Achievements Grid */}
                    <div className="achievements-grid">
                        {loading ? (
                            <div className="loading-state">
                                <div className="spinner"></div>
                                <p>{t('common.loading')}</p>
                            </div>
                        ) : filteredAchievements.length === 0 ? (
                            <div className="empty-state">
                                <p>
                                    {t('achievements.noAchievements', '🎯 No achievements found')}
                                </p>
                            </div>
                        ) : (
                            filteredAchievements.map((achievement) => {
                                const achievementBoxStyle = {
                                    boxShadow: achievement.unlocked
                                        ? getRarityGlow(achievement.rarity)
                                        : 'none',
                                };
                                const miniFillStyle = {
                                    width: `${(achievement.current / achievement.target) * 100}%`,
                                    backgroundColor: getRarityColor(achievement.rarity),
                                };
                                const rarityBadgeStyle = {
                                    backgroundColor: getRarityColor(achievement.rarity),
                                    color: 'white',
                                };
                                return (
                                    <div
                                        key={achievement.id}
                                        className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'} ${achievement.rarity}`}
                                        style={achievementBoxStyle}
                                    >
                                        <div className="achievement-icon-wrapper">
                                            <div className="achievement-icon">
                                                {achievement.icon || '🏆'}
                                            </div>
                                            {achievement.unlocked && (
                                                <div className="unlocked-badge">✓</div>
                                            )}
                                        </div>

                                        <div className="achievement-info">
                                            <div className="achievement-name">
                                                {achievement.name}
                                            </div>
                                            <div className="achievement-description">
                                                {achievement.description}
                                            </div>

                                            {achievement.progress !== undefined &&
                                                !achievement.unlocked && (
                                                    <div className="achievement-progress">
                                                        <div className="mini-progress-bar">
                                                            <div
                                                                className="mini-progress-fill"
                                                                style={miniFillStyle}
                                                            ></div>
                                                        </div>
                                                        <span className="progress-label">
                                                            {achievement.current}/
                                                            {achievement.target}
                                                        </span>
                                                    </div>
                                                )}

                                            {achievement.unlocked && achievement.unlocked_at && (
                                                <div className="unlocked-date">
                                                    {t('achievements.unlockedAt', 'Unlocked:')}{' '}
                                                    {new Date(
                                                        achievement.unlocked_at
                                                    ).toLocaleDateString()}
                                                </div>
                                            )}
                                        </div>

                                        <div className="rarity-badge" style={rarityBadgeStyle}>
                                            {achievement.rarity || 'common'}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

AchievementsPanel.propTypes = {
    apiBaseUrl: PropTypes.string,
    username: PropTypes.string,
    onClose: PropTypes.func,
};
export default AchievementsPanel;
