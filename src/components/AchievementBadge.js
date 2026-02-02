// frontend/src/components/AchievementBadge.js
import React, { useState, useEffect } from 'react';
import { FaTrophy, FaMedal, FaStar, FaCrown } from 'react-icons/fa';

const AchievementBadge = ({ achievement, size = 'medium' }) => {
    const iconMap = {
        trophy: FaTrophy,
        medal: FaMedal,
        star: FaStar,
        crown: FaCrown
    };

    const Icon = iconMap[achievement.icon_type] || FaTrophy;

    const sizeStyles = {
        small: { width: '30px', height: '30px', fontSize: '14px' },
        medium: { width: '50px', height: '50px', fontSize: '24px' },
        large: { width: '70px', height: '70px', fontSize: '32px' }
    };

    return (
        <div
            style={{
                ...sizeStyles[size],
                backgroundColor: achievement.color || '#5865f2',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                position: 'relative',
                cursor: 'pointer'
            }}
            title={`${achievement.name}: ${achievement.description}`}
        >
            <Icon />
            {achievement.is_new && (
                <span style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#f04747',
                    borderRadius: '50%',
                    border: '2px solid #2b2d31'
                }} />
            )}
        </div>
    );
};

export const AchievementsPanel = ({ username, fetchWithAuth, apiBaseUrl }) => {
    const [achievements, setAchievements] = useState([]);
    const [badges, setBadges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAchievements();
    }, [username]);

    const loadAchievements = async () => {
        try {
            const [achievRes, badgeRes] = await Promise.all([
                fetchWithAuth(`${apiBaseUrl}/user/achievements/`),
                fetchWithAuth(`${apiBaseUrl}/user/badges/`)
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
            console.error('Achievement load error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div style={{ color: '#949ba4', fontSize: '0.9em' }}>Yükleniyor...</div>;
    }

    if (achievements.length === 0 && badges.length === 0) {
        return <div style={{ color: '#949ba4', fontSize: '0.9em' }}>Henüz başarı kazanılmadı</div>;
    }

    return (
        <div style={{ marginTop: '15px' }}>
            {achievements.length > 0 && (
                <div style={{ marginBottom: '15px' }}>
                    <h4 style={{ color: '#949ba4', fontSize: '0.85em', marginBottom: '10px', textTransform: 'uppercase' }}>
                        🏆 Başarılar ({achievements.length})
                    </h4>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {achievements.slice(0, 10).map(ach => (
                            <AchievementBadge key={ach.id} achievement={ach} size="medium" />
                        ))}
                    </div>
                </div>
            )}

            {badges.length > 0 && (
                <div>
                    <h4 style={{ color: '#949ba4', fontSize: '0.85em', marginBottom: '10px', textTransform: 'uppercase' }}>
                        🎖️ Rozetler ({badges.length})
                    </h4>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {badges.map(badge => (
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
                                    gap: '5px'
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

export default AchievementBadge;


