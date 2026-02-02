import React, { useState, useEffect } from 'react';
import {
    FaServer, FaTimes, FaSave, FaCamera, FaEdit,
    FaPalette, FaImage, FaLink, FaStar, FaCrown,
    FaCheck, FaTrash, FaPlus, FaGlobe
} from 'react-icons/fa';
import { getApiBase } from '../utils/apiEndpoints';
import './ServerProfilePanel.css';

const ServerProfilePanel = ({ serverId, userId, onClose, fetchWithAuth, apiBaseUrl }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [formData, setFormData] = useState({
        nickname: '',
        bio: '',
        pronouns: '',
        custom_status: '',
        banner_url: '',
        accent_color: '#673ab7',
        badges: [],
        links: []
    });
    const [newLink, setNewLink] = useState({ title: '', url: '' });

    const defaultProfile = {
        nickname: '',
        bio: '',
        pronouns: '',
        custom_status: '',
        banner_url: '',
        accent_color: '#673ab7',
        badges: [],
        links: [],
        join_date: '',
        messages_sent: 0,
        reputation: 0
    };

    const availableBadges = [
        { id: 1, name: 'Early Supporter', icon: '⭐' },
        { id: 2, name: 'Event Winner', icon: '🏆' },
        { id: 3, name: 'Active Chatter', icon: '💬' },
        { id: 4, name: 'Helper', icon: '🤝' },
        { id: 5, name: 'Artist', icon: '🎨' },
        { id: 6, name: 'Musician', icon: '🎵' },
        { id: 7, name: 'Gamer', icon: '🎮' },
        { id: 8, name: 'Streamer', icon: '📺' }
    ];

    const accentColors = [
        '#f44336', '#e91e63', '#9c27b0', '#673ab7',
        '#3f51b5', '#2196f3', '#00bcd4', '#009688',
        '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b',
        '#ffc107', '#ff9800', '#ff5722', '#795548'
    ];

    useEffect(() => {
        loadProfile();
    }, [serverId, userId]);

    const loadProfile = async () => {
        setLoading(true);
        try {
            const baseUrl = apiBaseUrl || getApiBase();
            if (fetchWithAuth && serverId) {
                const response = await fetchWithAuth(`${baseUrl}/api/servers/${serverId}/profile/`);
                if (response.ok) {
                    const data = await response.json();
                    const profileData = data || defaultProfile;
                    setProfile(profileData);
                    setFormData({
                        nickname: profileData.nickname || '',
                        bio: profileData.bio || '',
                        pronouns: profileData.pronouns || '',
                        custom_status: profileData.custom_status || '',
                        banner_url: profileData.banner_url || '',
                        accent_color: profileData.accent_color || '#673ab7',
                        badges: profileData.badges || [],
                        links: profileData.links || []
                    });
                } else {
                    setProfile(defaultProfile);
                    setFormData(defaultProfile);
                }
            } else {
                setProfile(defaultProfile);
                setFormData(defaultProfile);
            }
        } catch (error) {
            console.error('Error loading server profile:', error);
            setProfile(defaultProfile);
            setFormData(defaultProfile);
        }
        setLoading(false);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const baseUrl = apiBaseUrl || getApiBase();
            if (fetchWithAuth && serverId) {
                const response = await fetchWithAuth(`${baseUrl}/api/servers/${serverId}/profile/`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    setProfile({ ...profile, ...formData });
                }
            }
        } catch (error) {
            console.error('Error saving profile:', error);
        }
        setSaving(false);
    };

    const handleBadgeToggle = (badge) => {
        const exists = formData.badges.find(b => b.id === badge.id);
        if (exists) {
            setFormData({
                ...formData,
                badges: formData.badges.filter(b => b.id !== badge.id)
            });
        } else if (formData.badges.length < 3) {
            setFormData({
                ...formData,
                badges: [...formData.badges, badge]
            });
        }
    };

    const handleAddLink = () => {
        if (newLink.title && newLink.url && formData.links.length < 5) {
            setFormData({
                ...formData,
                links: [...formData.links, { ...newLink, id: Date.now() }]
            });
            setNewLink({ title: '', url: '' });
        }
    };

    const handleRemoveLink = (linkId) => {
        setFormData({
            ...formData,
            links: formData.links.filter(l => l.id !== linkId)
        });
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="serverprofile-overlay" onClick={onClose}>
                <div className="serverprofile-panel" onClick={e => e.stopPropagation()}>
                    <div className="loading">Loading server profile...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="serverprofile-overlay" onClick={onClose}>
            <div className="serverprofile-panel" onClick={e => e.stopPropagation()}>
                {/* Banner */}
                <div
                    className="profile-banner"
                    style={{
                        backgroundImage: formData.banner_url ? `url(${formData.banner_url})` : 'none',
                        backgroundColor: formData.accent_color
                    }}
                >
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                    <div className="banner-overlay">
                        <button className="change-banner-btn">
                            <FaCamera /> Change Banner
                        </button>
                    </div>
                </div>

                {/* Profile Header */}
                <div className="profile-header">
                    <div className="avatar-section">
                        <div
                            className="avatar"
                            style={{ borderColor: formData.accent_color }}
                        >
                            <span>👤</span>
                            <button className="avatar-edit">
                                <FaCamera />
                            </button>
                        </div>
                        <div className="user-info">
                            <h2>{formData.nickname || 'Set Nickname'}</h2>
                            {formData.pronouns && <span className="pronouns">{formData.pronouns}</span>}
                            {formData.custom_status && (
                                <span className="custom-status">{formData.custom_status}</span>
                            )}
                        </div>
                    </div>
                    <div className="profile-stats">
                        <div className="stat">
                            <span className="stat-value">{profile?.messages_sent || 0}</span>
                            <span className="stat-label">Messages</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">{profile?.reputation || 0}</span>
                            <span className="stat-label">Reputation</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">{formatDate(profile?.join_date)}</span>
                            <span className="stat-label">Joined</span>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="tabs">
                    <button
                        className={activeTab === 'profile' ? 'active' : ''}
                        onClick={() => setActiveTab('profile')}
                    >
                        <FaEdit /> Edit Profile
                    </button>
                    <button
                        className={activeTab === 'badges' ? 'active' : ''}
                        onClick={() => setActiveTab('badges')}
                    >
                        <FaStar /> Badges
                    </button>
                    <button
                        className={activeTab === 'links' ? 'active' : ''}
                        onClick={() => setActiveTab('links')}
                    >
                        <FaLink /> Links
                    </button>
                    <button
                        className={activeTab === 'theme' ? 'active' : ''}
                        onClick={() => setActiveTab('theme')}
                    >
                        <FaPalette /> Theme
                    </button>
                </div>

                {/* Content */}
                <div className="content">
                    {activeTab === 'profile' && (
                        <div className="profile-form">
                            <div className="form-group">
                                <label>Server Nickname</label>
                                <input
                                    type="text"
                                    value={formData.nickname}
                                    onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                                    placeholder="Your nickname in this server"
                                    maxLength={32}
                                />
                                <span className="char-count">{formData.nickname.length}/32</span>
                            </div>
                            <div className="form-group">
                                <label>Pronouns</label>
                                <input
                                    type="text"
                                    value={formData.pronouns}
                                    onChange={(e) => setFormData({ ...formData, pronouns: e.target.value })}
                                    placeholder="e.g. they/them"
                                    maxLength={20}
                                />
                            </div>
                            <div className="form-group">
                                <label>Custom Status</label>
                                <input
                                    type="text"
                                    value={formData.custom_status}
                                    onChange={(e) => setFormData({ ...formData, custom_status: e.target.value })}
                                    placeholder="What are you up to?"
                                    maxLength={50}
                                />
                            </div>
                            <div className="form-group">
                                <label>About Me</label>
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    placeholder="Tell others about yourself..."
                                    maxLength={200}
                                    rows={4}
                                />
                                <span className="char-count">{formData.bio.length}/200</span>
                            </div>
                        </div>
                    )}

                    {activeTab === 'badges' && (
                        <div className="badges-section">
                            <div className="selected-badges">
                                <h4>Selected Badges ({formData.badges.length}/3)</h4>
                                <div className="badges-grid">
                                    {formData.badges.map(badge => (
                                        <div
                                            key={badge.id}
                                            className="badge-item selected"
                                            onClick={() => handleBadgeToggle(badge)}
                                        >
                                            <span className="badge-icon">{badge.icon}</span>
                                            <span className="badge-name">{badge.name}</span>
                                            <FaCheck className="check-icon" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="available-badges">
                                <h4>Available Badges</h4>
                                <div className="badges-grid">
                                    {availableBadges
                                        .filter(b => !formData.badges.find(fb => fb.id === b.id))
                                        .map(badge => (
                                            <div
                                                key={badge.id}
                                                className={`badge-item ${formData.badges.length >= 3 ? 'disabled' : ''}`}
                                                onClick={() => handleBadgeToggle(badge)}
                                            >
                                                <span className="badge-icon">{badge.icon}</span>
                                                <span className="badge-name">{badge.name}</span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'links' && (
                        <div className="links-section">
                            <div className="current-links">
                                <h4>Your Links ({formData.links.length}/5)</h4>
                                {formData.links.length === 0 ? (
                                    <div className="no-links">No links added yet</div>
                                ) : (
                                    <div className="links-list">
                                        {formData.links.map(link => (
                                            <div key={link.id} className="link-item">
                                                <FaGlobe className="link-icon" />
                                                <div className="link-info">
                                                    <span className="link-title">{link.title}</span>
                                                    <span className="link-url">{link.url}</span>
                                                </div>
                                                <button
                                                    className="remove-link"
                                                    onClick={() => handleRemoveLink(link.id)}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {formData.links.length < 5 && (
                                <div className="add-link">
                                    <h4>Add New Link</h4>
                                    <div className="link-form">
                                        <input
                                            type="text"
                                            placeholder="Link Title"
                                            value={newLink.title}
                                            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                                            maxLength={30}
                                        />
                                        <input
                                            type="url"
                                            placeholder="https://example.com"
                                            value={newLink.url}
                                            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                                        />
                                        <button
                                            className="add-link-btn"
                                            onClick={handleAddLink}
                                            disabled={!newLink.title || !newLink.url}
                                        >
                                            <FaPlus /> Add
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'theme' && (
                        <div className="theme-section">
                            <div className="banner-settings">
                                <h4><FaImage /> Banner Image</h4>
                                <div className="banner-input">
                                    <input
                                        type="url"
                                        placeholder="Banner image URL"
                                        value={formData.banner_url}
                                        onChange={(e) => setFormData({ ...formData, banner_url: e.target.value })}
                                    />
                                    <button className="upload-btn">
                                        <FaCamera /> Upload
                                    </button>
                                </div>
                            </div>
                            <div className="color-settings">
                                <h4><FaPalette /> Accent Color</h4>
                                <div className="color-grid">
                                    {accentColors.map(color => (
                                        <button
                                            key={color}
                                            className={`color-btn ${formData.accent_color === color ? 'selected' : ''}`}
                                            style={{ background: color }}
                                            onClick={() => setFormData({ ...formData, accent_color: color })}
                                        >
                                            {formData.accent_color === color && <FaCheck />}
                                        </button>
                                    ))}
                                </div>
                                <div className="custom-color">
                                    <label>Custom Color:</label>
                                    <input
                                        type="color"
                                        value={formData.accent_color}
                                        onChange={(e) => setFormData({ ...formData, accent_color: e.target.value })}
                                    />
                                    <span>{formData.accent_color}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="panel-footer">
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                    <button
                        className="save-btn"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        <FaSave /> {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServerProfilePanel;
