// frontend/src/components/AchievementsPanel.js
import { useState, useEffect } from 'react';
import toast from '../utils/toast';
import './AchievementsPanel.css';

const AchievementsPanel = ({ apiBaseUrl, username, onClose }) => {
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
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/api/user/achievements/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setAchievements(data.achievements || []);
            } else {
                toast.error('❌ Başarılar yüklenemedi');
            }
        } catch (error) {
            console.error('Fetch achievements error:', error);
            toast.error('❌ Bağlantı hatası');
        } finally {
            setLoading(false);
        }
    };

    const fetchBadges = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/api/user/badges/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setBadges(data.badges || []);
            }
        } catch (error) {
            console.error('Fetch badges error:', error);
        }
    };

    const filteredAchievements = achievements.filter(achievement => {
        const matchesFilter =
            filter === 'all' ||
            (filter === 'unlocked' && achievement.unlocked) ||
            (filter === 'locked' && !achievement.unlocked);

        const matchesCategory =
            category === 'all' ||
            achievement.category === category;

        return matchesFilter && matchesCategory;
    });

    const stats = {
        total: achievements.length,
        unlocked: achievements.filter(a => a.unlocked).length,
        locked: achievements.filter(a => !a.unlocked).length,
        progress: achievements.length > 0
            ? Math.round((achievements.filter(a => a.unlocked).length / achievements.length) * 100)
            : 0
    };

    const getRarityColor = (rarity) => {
        const colors = {
            'common': '#95a5a6',
            'uncommon': '#3498db',
            'rare': '#5865f2',
            'epic': '#e74c3c',
            'legendary': '#f39c12'
        };
        return colors[rarity] || colors.common;
    };

    const getRarityGlow = (rarity) => {
        if (rarity === 'legendary') return '0 0 20px rgba(243, 156, 18, 0.6)';
        if (rarity === 'epic') return '0 0 15px rgba(231, 76, 60, 0.5)';
        if (rarity === 'rare') return '0 0 10px rgba(155, 89, 182, 0.4)';
        return 'none';
    };

    return (
        <div className="achievements-overlay" onClick={onClose}>
            <div className="achievements-panel" onClick={e => e.stopPropagation()}>
                <div className="achievements-header">
                    <h2>🏆 Başarılar & Rozetler</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                {/* Stats Overview */}
                <div className="achievements-stats">
                    <div className="stat-item">
                        <span className="stat-icon">🎯</span>
                        <div className="stat-info">
                            <span className="stat-value">{stats.unlocked}/{stats.total}</span>
                            <span className="stat-label">Başarı</span>
                        </div>
                    </div>
                    <div className="stat-item">
                        <span className="stat-icon">📊</span>
                        <div className="stat-info">
                            <span className="stat-value">{stats.progress}%</span>
                            <span className="stat-label">Tamamlanma</span>
                        </div>
                    </div>
                    <div className="stat-item">
                        <span className="stat-icon">🎖️</span>
                        <div className="stat-info">
                            <span className="stat-value">{badges.length}</span>
                            <span className="stat-label">Rozet</span>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="progress-section">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${stats.progress}%` }}
                        ></div>
                    </div>
                    <span className="progress-text">{stats.progress}% Complete</span>
                </div>

                {/* Filters */}
                <div className="achievements-filters">
                    <div className="filter-group">
                        <button
                            className={filter === 'all' ? 'active' : ''}
                            onClick={() => setFilter('all')}
                        >
                            Tümü ({stats.total})
                        </button>
                        <button
                            className={filter === 'unlocked' ? 'active' : ''}
                            onClick={() => setFilter('unlocked')}
                        >
                            ✓ Açık ({stats.unlocked})
                        </button>
                        <button
                            className={filter === 'locked' ? 'active' : ''}
                            onClick={() => setFilter('locked')}
                        >
                            🔒 Kilitli ({stats.locked})
                        </button>
                    </div>

                    <div className="category-group">
                        <button
                            className={category === 'all' ? 'active' : ''}
                            onClick={() => setCategory('all')}
                        >
                            Tüm Kategoriler
                        </button>
                        <button
                            className={category === 'social' ? 'active' : ''}
                            onClick={() => setCategory('social')}
                        >
                            👥 Sosyal
                        </button>
                        <button
                            className={category === 'activity' ? 'active' : ''}
                            onClick={() => setCategory('activity')}
                        >
                            ⚡ Aktivite
                        </button>
                        <button
                            className={category === 'special' ? 'active' : ''}
                            onClick={() => setCategory('special')}
                        >
                            ⭐ Özel
                        </button>
                    </div>
                </div>

                <div className="achievements-content">
                    {/* Badges Section */}
                    {badges.length > 0 && (
                        <div className="badges-section">
                            <h3>🎖️ Rozetler</h3>
                            <div className="badges-grid">
                                {badges.map(badge => (
                                    <div key={badge.id} className="badge-card" title={badge.description}>
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
                                <p>Yükleniyor...</p>
                            </div>
                        ) : filteredAchievements.length === 0 ? (
                            <div className="empty-state">
                                <p>🎯 Başarı bulunamadı</p>
                            </div>
                        ) : (
                            filteredAchievements.map(achievement => (
                                <div
                                    key={achievement.id}
                                    className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'} ${achievement.rarity}`}
                                    style={{
                                        boxShadow: achievement.unlocked ? getRarityGlow(achievement.rarity) : 'none'
                                    }}
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
                                        <div className="achievement-name">{achievement.name}</div>
                                        <div className="achievement-description">
                                            {achievement.description}
                                        </div>

                                        {achievement.progress !== undefined && !achievement.unlocked && (
                                            <div className="achievement-progress">
                                                <div className="mini-progress-bar">
                                                    <div
                                                        className="mini-progress-fill"
                                                        style={{
                                                            width: `${(achievement.current / achievement.target) * 100}%`,
                                                            backgroundColor: getRarityColor(achievement.rarity)
                                                        }}
                                                    ></div>
                                                </div>
                                                <span className="progress-label">
                                                    {achievement.current}/{achievement.target}
                                                </span>
                                            </div>
                                        )}

                                        {achievement.unlocked && achievement.unlocked_at && (
                                            <div className="unlocked-date">
                                                Açıldı: {new Date(achievement.unlocked_at).toLocaleDateString('tr-TR')}
                                            </div>
                                        )}
                                    </div>

                                    <div
                                        className="rarity-badge"
                                        style={{
                                            backgroundColor: getRarityColor(achievement.rarity),
                                            color: 'white'
                                        }}
                                    >
                                        {achievement.rarity || 'common'}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AchievementsPanel;
