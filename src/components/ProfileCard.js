// 🎨 PROFILE CARD CUSTOMIZATION
// Banner, tema, badge, bağlantı özelleştirme

import React, { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../config/api.config';
import './ProfileCard.css';

// Profile Card Display Component
export const ProfileCard = ({ username, onEdit, compact = false }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = API_BASE_URL;

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const url = username
                    ? `${API_URL}/profile/card/${username}/`
                    : `${API_URL}/profile/card/`;

                const response = await fetch(url, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    setProfile(await response.json());
                }
            } catch (e) {
                console.error('Failed to load profile:', e);
            }
            setLoading(false);
        };

        loadProfile();
    }, [username, API_URL]);

    if (loading) {
        return <div className="profile-card loading"><div className="loading-spinner" /></div>;
    }

    if (!profile) {
        return <div className="profile-card error">Profil yüklenemedi</div>;
    }

    const colors = profile.custom_colors || profile.theme_colors;

    return (
        <div
            className={`profile-card ${compact ? 'compact' : ''}`}
            style={{
                '--primary': colors.primary,
                '--secondary': colors.secondary,
                '--accent': colors.accent,
                '--bg': colors.background
            }}
        >
            {/* Banner */}
            <div
                className="card-banner"
                style={{
                    backgroundImage: profile.banner ? `url(${profile.banner})` : undefined,
                    backgroundColor: profile.banner_color
                }}
            >
                {onEdit && (
                    <button className="edit-btn" onClick={onEdit}>✏️</button>
                )}
            </div>

            {/* Avatar */}
            <div className="card-avatar">
                <img src={profile.avatar || '/default-avatar.png'} alt="" />
                {profile.status_text && (
                    <div className="status-indicator" title={profile.status_text}>
                        {profile.status_text.slice(0, 1)}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="card-content">
                {/* Badges */}
                {profile.badges && profile.badges.length > 0 && (
                    <div className="card-badges">
                        {profile.badges.map((badgeId) => {
                            const badge = BADGE_DATA[badgeId];
                            if (!badge) return null;
                            return (
                                <span
                                    key={badgeId}
                                    className="badge"
                                    style={{ backgroundColor: badge.color }}
                                    title={badge.name}
                                >
                                    {badge.icon}
                                </span>
                            );
                        })}
                    </div>
                )}

                {/* Name */}
                <h2 className="card-name">
                    {profile.display_name || profile.username}
                </h2>
                <p className="card-username">@{profile.username}</p>

                {/* Bio */}
                {profile.bio && (
                    <p className="card-bio">{profile.bio}</p>
                )}

                {/* Stats */}
                <div className="card-stats">
                    <div className="stat">
                        <span className="stat-value">Lv.{profile.level}</span>
                        <span className="stat-label">Seviye</span>
                    </div>
                    <div className="stat">
                        <span className="stat-value">{profile.xp?.toLocaleString()}</span>
                        <span className="stat-label">XP</span>
                    </div>
                    <div className="stat">
                        <span className="stat-value">
                            {new Date(profile.created_at).toLocaleDateString('tr-TR', { month: 'short', year: 'numeric' })}
                        </span>
                        <span className="stat-label">Katılım</span>
                    </div>
                </div>

                {/* Links */}
                {profile.links && profile.links.length > 0 && (
                    <div className="card-links">
                        {profile.links.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link-item"
                                title={link.name}
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>
                )}

                {/* Spotify */}
                {profile.spotify_connected && (
                    <div className="spotify-badge">
                        🎵 Spotify Bağlı
                    </div>
                )}

                {/* Premium Badge */}
                {profile.is_premium && (
                    <div className="premium-badge">
                        💎 Premium
                    </div>
                )}
            </div>
        </div>
    );
};

// Badge data
const BADGE_DATA = {
    'early_supporter': { name: 'Early Supporter', icon: '🌟', color: '#FFD700' },
    'premium': { name: 'Premium', icon: '💎', color: '#a855f7' },
    'verified': { name: 'Verified', icon: '✓', color: '#5865F2' },
    'developer': { name: 'Developer', icon: '🛠️', color: '#3b82f6' },
    'bug_hunter': { name: 'Bug Hunter', icon: '🐛', color: '#22c55e' },
    'top_contributor': { name: 'Top Contributor', icon: '🏆', color: '#f59e0b' },
    'server_owner': { name: 'Server Owner', icon: '👑', color: '#ef4444' },
    'moderator': { name: 'Moderator', icon: '🛡️', color: '#10b981' },
    'artist': { name: 'Artist', icon: '🎨', color: '#ec4899' },
    'streamer': { name: 'Streamer', icon: '📺', color: '#8b5cf6' },
};

// Profile Card Editor Component
export const ProfileCardEditor = ({ onClose, onSave }) => {
    const [profile, setProfile] = useState(null);
    const [themes, setThemes] = useState([]);
    const [badges, setBadges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('appearance');

    const [formData, setFormData] = useState({
        banner: '',
        banner_color: '#5865F2',
        theme: 'default',
        bio: '',
        links: []
    });
    const [selectedBadges, setSelectedBadges] = useState([]);
    const [newLink, setNewLink] = useState({ name: '', url: '' });

    const API_URL = API_BASE_URL;

    const loadData = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');

            const [profileRes, themesRes, badgesRes] = await Promise.all([
                fetch(`${API_URL}/profile/card/`, { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch(`${API_URL}/profile/themes/`, { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch(`${API_URL}/profile/badges/`, { headers: { 'Authorization': `Bearer ${token}` } })
            ]);

            if (profileRes.ok) {
                const data = await profileRes.json();
                setProfile(data);
                setFormData({
                    banner: data.banner || '',
                    banner_color: data.banner_color || '#5865F2',
                    theme: data.theme || 'default',
                    bio: data.bio || '',
                    links: data.links || []
                });
                setSelectedBadges(data.badges || []);
            }

            if (themesRes.ok) {
                const data = await themesRes.json();
                setThemes(data.themes || []);
            }

            if (badgesRes.ok) {
                const data = await badgesRes.json();
                setBadges(data.badges || []);
            }
        } catch (e) {
            console.error('Failed to load data:', e);
        }
        setLoading(false);
    }, [API_URL]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem('token');

            // Save profile card
            const profileRes = await fetch(`${API_URL}/profile/card/update/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Save badges
            await fetch(`${API_URL}/profile/badges/set/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ badges: selectedBadges })
            });

            if (profileRes.ok) {
                onSave?.();
                onClose();
            }
        } catch (e) {
            console.error('Save failed:', e);
        }
        setSaving(false);
    };

    const handleAddLink = async () => {
        if (!newLink.url) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/profile/links/add/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newLink)
            });

            if (response.ok) {
                const data = await response.json();
                setFormData(prev => ({ ...prev, links: data.links }));
                setNewLink({ name: '', url: '' });
            }
        } catch (e) {
            console.error('Add link failed:', e);
        }
    };

    const handleRemoveLink = async (index) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/profile/links/${index}/remove/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setFormData(prev => ({ ...prev, links: data.links }));
            }
        } catch (e) {
            console.error('Remove link failed:', e);
        }
    };

    const toggleBadge = (badgeId) => {
        setSelectedBadges(prev => {
            if (prev.includes(badgeId)) {
                return prev.filter(id => id !== badgeId);
            }
            if (prev.length >= 3) {
                return prev;
            }
            return [...prev, badgeId];
        });
    };

    useEffect(() => {
        loadData();
    }, [loadData]);

    if (loading) {
        return (
            <div className="profile-editor-modal">
                <div className="editor-loading">
                    <div className="loading-spinner" />
                </div>
            </div>
        );
    }

    return (
        <div className="profile-editor-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="profile-editor-modal">
                {/* Header */}
                <div className="editor-header">
                    <h2>🎨 Profil Kartı Düzenle</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                {/* Tabs */}
                <div className="editor-tabs">
                    <button
                        className={activeTab === 'appearance' ? 'active' : ''}
                        onClick={() => setActiveTab('appearance')}
                    >
                        🎨 Görünüm
                    </button>
                    <button
                        className={activeTab === 'badges' ? 'active' : ''}
                        onClick={() => setActiveTab('badges')}
                    >
                        🏅 Rozetler
                    </button>
                    <button
                        className={activeTab === 'links' ? 'active' : ''}
                        onClick={() => setActiveTab('links')}
                    >
                        🔗 Bağlantılar
                    </button>
                </div>

                {/* Content */}
                <div className="editor-content">
                    {/* Appearance Tab */}
                    {activeTab === 'appearance' && (
                        <div className="appearance-tab">
                            {/* Banner */}
                            <div className="form-group">
                                <label>Banner URL</label>
                                <input
                                    type="url"
                                    placeholder="https://..."
                                    value={formData.banner}
                                    onChange={(e) => setFormData(prev => ({ ...prev, banner: e.target.value }))}
                                />
                            </div>

                            {/* Banner Color */}
                            <div className="form-group">
                                <label>Banner Rengi (resim yoksa)</label>
                                <div className="color-picker">
                                    <input
                                        type="color"
                                        value={formData.banner_color}
                                        onChange={(e) => setFormData(prev => ({ ...prev, banner_color: e.target.value }))}
                                    />
                                    <span>{formData.banner_color}</span>
                                </div>
                            </div>

                            {/* Theme */}
                            <div className="form-group">
                                <label>Tema</label>
                                <div className="theme-grid">
                                    {themes.map((theme) => (
                                        <div
                                            key={theme.id}
                                            className={`theme-option ${formData.theme === theme.id ? 'selected' : ''}`}
                                            onClick={() => setFormData(prev => ({ ...prev, theme: theme.id }))}
                                            style={{
                                                background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
                                            }}
                                        >
                                            <span className="theme-name">{theme.id}</span>
                                            <div className="theme-colors">
                                                <span style={{ backgroundColor: theme.accent }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="form-group">
                                <label>Biyografi</label>
                                <textarea
                                    placeholder="Kendiniz hakkında bir şeyler yazın..."
                                    value={formData.bio}
                                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value.slice(0, 500) }))}
                                    rows={4}
                                    maxLength={500}
                                />
                                <span className="char-count">{formData.bio.length}/500</span>
                            </div>
                        </div>
                    )}

                    {/* Badges Tab */}
                    {activeTab === 'badges' && (
                        <div className="badges-tab">
                            <p className="badges-hint">Profilinizde görüntülenecek en fazla 3 rozet seçin</p>
                            <div className="badges-grid">
                                {badges.map((badge) => (
                                    <div
                                        key={badge.id}
                                        className={`badge-option ${!badge.owned ? 'locked' : ''} ${selectedBadges.includes(badge.id) ? 'selected' : ''}`}
                                        onClick={() => badge.owned && toggleBadge(badge.id)}
                                    >
                                        <span
                                            className="badge-icon"
                                            style={{ backgroundColor: badge.color }}
                                        >
                                            {badge.icon}
                                        </span>
                                        <span className="badge-name">{badge.name}</span>
                                        {!badge.owned && <span className="lock-icon">🔒</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Links Tab */}
                    {activeTab === 'links' && (
                        <div className="links-tab">
                            <p className="links-hint">En fazla 5 bağlantı ekleyebilirsiniz</p>

                            {/* Current Links */}
                            <div className="current-links">
                                {formData.links.map((link, idx) => (
                                    <div key={idx} className="link-row">
                                        <span className="link-icon">{link.icon}</span>
                                        <span className="link-name">{link.name}</span>
                                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="link-url">
                                            {link.url.slice(0, 40)}...
                                        </a>
                                        <button
                                            className="remove-link"
                                            onClick={() => handleRemoveLink(idx)}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Add New Link */}
                            {formData.links.length < 5 && (
                                <div className="add-link-form">
                                    <input
                                        type="text"
                                        placeholder="İsim (opsiyonel)"
                                        value={newLink.name}
                                        onChange={(e) => setNewLink(prev => ({ ...prev, name: e.target.value }))}
                                    />
                                    <input
                                        type="url"
                                        placeholder="URL"
                                        value={newLink.url}
                                        onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                                    />
                                    <button onClick={handleAddLink}>Ekle</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Preview */}
                <div className="editor-preview">
                    <h4>Önizleme</h4>
                    <ProfileCard username={profile?.username} compact />
                </div>

                {/* Footer */}
                <div className="editor-footer">
                    <button className="cancel-btn" onClick={onClose}>İptal</button>
                    <button
                        className="save-btn"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        {saving ? 'Kaydediliyor...' : 'Kaydet'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
