import React, { useState, useEffect } from 'react';
import './QuickWinsPanel.css';

const QuickWinsPanel = ({ serverId, apiBaseUrl, token }) => {
    const [challenges, setChallenges] = useState([]);
    const [userProgress, setUserProgress] = useState({});
    const [rewards, setRewards] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('active');

    // Yeni challenge modal
    const [showChallengeModal, setShowChallengeModal] = useState(false);
    const [newChallenge, setNewChallenge] = useState({
        title: '',
        description: '',
        type: 'message_count',
        target: 10,
        duration_hours: 24,
        reward_points: 100,
        reward_role: ''
    });

    const challengeTypes = {
        message_count: '💬 Mesaj Gönder',
        voice_minutes: '🎤 Sesli Sohbet',
        invite_members: '👥 Üye Davet Et',
        reactions_given: '❤️ Tepki Ver',
        streak_days: '🔥 Streak Yap',
        level_up: '⬆️ Seviye Atla',
        achievements: '🏆 Başarım Kazan',
        activity_score: '⭐ Aktivite Puanı'
    };

    const fetchWithAuth = async (url, options = {}) => {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            ...options.headers,
        };
        const res = await fetch(url, { ...options, headers });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    };

    useEffect(() => {
        loadChallenges();
        loadProgress();
        loadRewards();
        loadLeaderboard();
    }, [serverId, activeTab]);

    const loadChallenges = async () => {
        try {
            setLoading(true);
            const data = await fetchWithAuth(`${apiBaseUrl}/quickwins/${serverId}/challenges/?status=${activeTab}`);
            setChallenges(data.challenges || []);
        } catch (error) {
            console.error('Challenge yükleme hatası:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadProgress = async () => {
        try {
            const data = await fetchWithAuth(`${apiBaseUrl}/quickwins/${serverId}/my-progress/`);
            setUserProgress(data.progress || {});
        } catch (error) {
            console.error('İlerleme yükleme hatası:', error);
        }
    };

    const loadRewards = async () => {
        try {
            const data = await fetchWithAuth(`${apiBaseUrl}/quickwins/${serverId}/rewards/`);
            setRewards(data.rewards || []);
        } catch (error) {
            console.error('Ödül yükleme hatası:', error);
        }
    };

    const loadLeaderboard = async () => {
        try {
            const data = await fetchWithAuth(`${apiBaseUrl}/quickwins/${serverId}/leaderboard/`);
            setLeaderboard(data.leaderboard || []);
        } catch (error) {
            console.error('Lider tablosu yükleme hatası:', error);
        }
    };

    const createChallenge = async () => {
        try {
            const data = await fetchWithAuth(`${apiBaseUrl}/quickwins/${serverId}/challenges/`, {
                method: 'POST',
                body: JSON.stringify(newChallenge)
            });
            setChallenges([data.challenge, ...challenges]);
            setShowChallengeModal(false);
            setNewChallenge({
                title: '',
                description: '',
                type: 'message_count',
                target: 10,
                duration_hours: 24,
                reward_points: 100,
                reward_role: ''
            });
        } catch (error) {
            console.error('Challenge oluşturma hatası:', error);
            alert('Challenge oluşturulamadı');
        }
    };

    const claimReward = async (challengeId) => {
        try {
            const data = await fetchWithAuth(`${apiBaseUrl}/quickwins/challenge/${challengeId}/claim/`, {
                method: 'POST'
            });
            alert(`Tebrikler! ${data.points} puan kazandınız!`);
            loadChallenges();
            loadProgress();
            loadRewards();
        } catch (error) {
            console.error('Ödül alma hatası:', error);
            alert('Ödül alınamadı');
        }
    };

    const deleteChallenge = async (challengeId) => {
        if (!confirm('Bu challenge\'ı silmek istediğinize emin misiniz?')) return;
        try {
            await fetchWithAuth(`${apiBaseUrl}/quickwins/challenge/${challengeId}/`, {
                method: 'DELETE'
            });
            setChallenges(challenges.filter(c => c.id !== challengeId));
        } catch (error) {
            console.error('Silme hatası:', error);
        }
    };

    const getProgressPercentage = (challenge) => {
        const progress = userProgress[challenge.id] || 0;
        return Math.min((progress / challenge.target) * 100, 100);
    };

    const isCompleted = (challenge) => {
        const progress = userProgress[challenge.id] || 0;
        return progress >= challenge.target;
    };

    const getRemainingTime = (challenge) => {
        const endTime = new Date(challenge.ends_at);
        const now = new Date();
        const diff = endTime - now;

        if (diff <= 0) return 'Süre doldu';

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (hours > 24) {
            return `${Math.floor(hours / 24)} gün kaldı`;
        }
        return `${hours}s ${minutes}dk kaldı`;
    };

    return (
        <div className="quickwins-panel">
            <div className="quickwins-header">
                <div className="header-left">
                    <h2>⚡ Quick Wins</h2>
                    <span className="subtitle">Hızlı görevleri tamamla, ödülleri kazan!</span>
                </div>
                <button className="create-challenge-btn" onClick={() => setShowChallengeModal(true)}>
                    ➕ Yeni Challenge
                </button>
            </div>

            <div className="quickwins-stats">
                <div className="stat-card">
                    <div className="stat-icon">🏆</div>
                    <div className="stat-info">
                        <span className="stat-value">{rewards.length}</span>
                        <span className="stat-label">Toplam Ödül</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">⭐</div>
                    <div className="stat-info">
                        <span className="stat-value">{Object.values(userProgress).reduce((a, b) => a + b, 0)}</span>
                        <span className="stat-label">Toplam Puan</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">🎯</div>
                    <div className="stat-info">
                        <span className="stat-value">{challenges.filter(c => isCompleted(c)).length}</span>
                        <span className="stat-label">Tamamlanan</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">📊</div>
                    <div className="stat-info">
                        <span className="stat-value">#{leaderboard.findIndex(u => u.is_me) + 1 || '-'}</span>
                        <span className="stat-label">Sıralama</span>
                    </div>
                </div>
            </div>

            <div className="quickwins-tabs">
                <button
                    className={activeTab === 'active' ? 'active' : ''}
                    onClick={() => setActiveTab('active')}
                >
                    🔥 Aktif
                </button>
                <button
                    className={activeTab === 'completed' ? 'active' : ''}
                    onClick={() => setActiveTab('completed')}
                >
                    ✅ Tamamlanan
                </button>
                <button
                    className={activeTab === 'expired' ? 'active' : ''}
                    onClick={() => setActiveTab('expired')}
                >
                    ⏰ Süresi Dolan
                </button>
                <button
                    className={activeTab === 'leaderboard' ? 'active' : ''}
                    onClick={() => setActiveTab('leaderboard')}
                >
                    🏆 Lider Tablosu
                </button>
            </div>

            <div className="quickwins-content">
                {activeTab !== 'leaderboard' ? (
                    <div className="challenges-grid">
                        {loading ? (
                            <div className="loading">Yükleniyor...</div>
                        ) : challenges.length === 0 ? (
                            <div className="no-challenges">
                                <p>Henüz challenge yok</p>
                                <button onClick={() => setShowChallengeModal(true)}>İlk challenge'ı oluştur</button>
                            </div>
                        ) : (
                            challenges.map(challenge => {
                                const completed = isCompleted(challenge);
                                const percentage = getProgressPercentage(challenge);
                                const progress = userProgress[challenge.id] || 0;

                                return (
                                    <div key={challenge.id} className={`challenge-card ${completed ? 'completed' : ''}`}>
                                        <div className="challenge-header-section">
                                            <div className="challenge-type-badge">
                                                {challengeTypes[challenge.type] || challenge.type}
                                            </div>
                                            {completed && !challenge.claimed && (
                                                <span className="claim-badge">🎁 Ödül Hazır!</span>
                                            )}
                                        </div>

                                        <h3>{challenge.title}</h3>
                                        <p className="challenge-description">{challenge.description}</p>

                                        <div className="challenge-progress">
                                            <div className="progress-bar-bg">
                                                <div
                                                    className="progress-bar-fill"
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                            <div className="progress-text">
                                                <span>{progress} / {challenge.target}</span>
                                                <span>{Math.round(percentage)}%</span>
                                            </div>
                                        </div>

                                        <div className="challenge-footer">
                                            <div className="challenge-info">
                                                <span className="reward-info">💰 {challenge.reward_points} puan</span>
                                                {challenge.reward_role && (
                                                    <span className="role-info">🎭 {challenge.reward_role}</span>
                                                )}
                                            </div>
                                            <span className="time-remaining">{getRemainingTime(challenge)}</span>
                                        </div>

                                        <div className="challenge-actions">
                                            {completed && !challenge.claimed && (
                                                <button className="claim-btn" onClick={() => claimReward(challenge.id)}>
                                                    🎁 Ödülü Al
                                                </button>
                                            )}
                                            {challenge.is_admin && (
                                                <button className="delete-btn" onClick={() => deleteChallenge(challenge.id)}>
                                                    🗑️ Sil
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                ) : (
                    <div className="leaderboard-section">
                        <h3>🏆 Quick Wins Lider Tablosu</h3>
                        <div className="leaderboard-list">
                            {leaderboard.map((user, index) => (
                                <div key={user.id} className={`leaderboard-item ${user.is_me ? 'me' : ''}`}>
                                    <div className="rank">
                                        {index === 0 && '🥇'}
                                        {index === 1 && '🥈'}
                                        {index === 2 && '🥉'}
                                        {index > 2 && `#${index + 1}`}
                                    </div>
                                    <img src={user.avatar} alt={user.username} />
                                    <div className="user-info">
                                        <span className="username">{user.username}</span>
                                        <span className="user-stats">
                                            ⭐ {user.total_points} puan · 🎯 {user.completed_challenges} tamamlanan
                                        </span>
                                    </div>
                                    {user.is_me && <span className="me-badge">Siz</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {showChallengeModal && (
                <div className="modal-overlay" onClick={() => setShowChallengeModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Yeni Challenge Oluştur</h3>

                        <input
                            type="text"
                            placeholder="Challenge Başlığı"
                            value={newChallenge.title}
                            onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
                        />

                        <textarea
                            placeholder="Açıklama"
                            value={newChallenge.description}
                            onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
                            rows="3"
                        />

                        <select
                            value={newChallenge.type}
                            onChange={(e) => setNewChallenge({ ...newChallenge, type: e.target.value })}
                        >
                            {Object.entries(challengeTypes).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        </select>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Hedef</label>
                                <input
                                    type="number"
                                    value={newChallenge.target}
                                    onChange={(e) => setNewChallenge({ ...newChallenge, target: parseInt(e.target.value) })}
                                    min="1"
                                />
                            </div>
                            <div className="form-group">
                                <label>Süre (Saat)</label>
                                <input
                                    type="number"
                                    value={newChallenge.duration_hours}
                                    onChange={(e) => setNewChallenge({ ...newChallenge, duration_hours: parseInt(e.target.value) })}
                                    min="1"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Ödül Puanı</label>
                                <input
                                    type="number"
                                    value={newChallenge.reward_points}
                                    onChange={(e) => setNewChallenge({ ...newChallenge, reward_points: parseInt(e.target.value) })}
                                    min="1"
                                />
                            </div>
                            <div className="form-group">
                                <label>Ödül Rolü (Opsiyonel)</label>
                                <input
                                    type="text"
                                    placeholder="Rol ID"
                                    value={newChallenge.reward_role}
                                    onChange={(e) => setNewChallenge({ ...newChallenge, reward_role: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button onClick={() => setShowChallengeModal(false)}>İptal</button>
                            <button onClick={createChallenge} disabled={!newChallenge.title || !newChallenge.description}>
                                Oluştur
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuickWinsPanel;
