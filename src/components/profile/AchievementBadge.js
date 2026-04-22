// frontend/src/components/AchievementBadge.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTrophy, FaMedal, FaStar, FaCrown } from 'react-icons/fa';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

// -- dynamic style helpers (pass 2) --
const S = {
    mar: { marginTop: '15px' },
    abs: {
        position: 'absolute',
        top: '-5px',
        right: '-5px',
        width: '12px',
        height: '12px',
        backgroundColor: '#f23f42',
        borderRadius: '50%',
        border: '2px solid #0e1222',
    },
};

const AchievementBadge = ({ achievement, size = 'medium' }) => {
    const { t } = useTranslation();
    const iconMap = {
        trophy: FaTrophy,
        medal: FaMedal,
        star: FaStar,
        crown: FaCrown,
    };

    const Icon = iconMap[achievement.icon_type] || FaTrophy;

    const sizeStyles = {
        small: { width: '30px', height: '30px', fontSize: '14px' },
        medium: { width: '50px', height: '50px', fontSize: '24px' },
        large: { width: '70px', height: '70px', fontSize: '32px' },
    };

    return (
        <div title={`${achievement.name}: ${achievement.description}`}>
            <Icon />
            {achievement.is_new && <span style={S.abs} />}
        </div>
    );
};

export const AchievementsPanel = ({ username, fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
    const [achievements, setAchievements] = useState([]);
    const [badges, setBadges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAchievements();
    }, [username]);

    const loadAchievements = async () => {
        try {
            const [achievRes, badgeRes] = await Promise.all([
                fetchWithAuth(`${apiBaseUrl}/api/user/achievements/`),
                fetchWithAuth(`${apiBaseUrl}/api/user/badges/`),
            ]);

            if (achievRes.ok) {
                const data = await achievRes.json();
                setAchievements(data.achievements || []);
            }

            if (badgeRes.ok) {
                const data = await badgeRes.json();
                setBadges(data.badges || []);
            }
        } catch (error) {
            logger.error('Achievement load error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-949-09em">{t('common.loading')}</div>;
    }

    if (achievements.length === 0 && badges.length === 0) {
        return <div className="text-949-09em">{t('achievements.none', 'No achievements earned yet')}</div>;
    }

    return (
        <div aria-label={t('achievements.badge', 'Achievement badge')} style={S.mar}>
            {achievements.length > 0 && (
                <div className="mb-15">
                    <h4 className="text-949-085em-mb10">{t('achievements.title', '🏆 Achievements')} ({achievements.length})</h4>
                    <div className="flex-wrap-8">
                        {achievements.slice(0, 10).map((ach) => (
                            <AchievementBadge key={ach.id} achievement={ach} size="medium" />
                        ))}
                    </div>
                </div>
            )}

            {badges.length > 0 && (
                <div>
                    <h4 className="text-949-085em-mb10">🎖️ Rozetler ({badges.length})</h4>
                    <div className="flex-wrap-8">
                        {badges.map((badge) => (
                            <div
                                key={badge.id}
                                style={{
                                    padding: '5px 12px',
                                    backgroundColor: badge.color || '#5865f2',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontSize: '0.8em',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                }}
                                title={badge.description}
                            >
                                {badge.emoji && <span>{badge.emoji}</span>}
                                {badge.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

AchievementBadge.propTypes = {
    achievement: PropTypes.object,
    size: PropTypes.string,
};

AchievementsPanel.propTypes = {
    username: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};

export default AchievementBadge;
