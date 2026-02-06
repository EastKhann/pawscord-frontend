// frontend/src/components/EnhancedProfile/EnhancedProfile.js
/**
 * 👤 PAWSCORD - Enhanced User Profile Component
 * ════════════════════════════════════════════════════════════════════════════════
 * Discord-style gelişmiş kullanıcı profili
 * ════════════════════════════════════════════════════════════════════════════════
 */

import React, { useState, useEffect } from 'react';
import {
    FaTwitter, FaGithub, FaInstagram, FaYoutube, FaTwitch, FaSpotify, FaSteam,
    FaGlobe, FaDiscord, FaEdit, FaSave, FaTimes, FaPlus, FaTrash, FaClock,
    FaMapMarkerAlt, FaUserFriends, FaServer, FaEye, FaStar, FaTrophy, FaGamepad
} from 'react-icons/fa';
import { API_BASE_URL } from '../../utils/constants';
import toast from '../../utils/toast';
import './EnhancedProfile.css';

// ════════════════════════════════════════════════════════════════════════════════
// 🎨 SOCIAL LINK ICONS
// ════════════════════════════════════════════════════════════════════════════════

const SOCIAL_ICONS = {
    twitter: { icon: FaTwitter, color: '#1DA1F2', label: 'Twitter' },
    github: { icon: FaGithub, color: '#333', label: 'GitHub' },
    instagram: { icon: FaInstagram, color: '#E4405F', label: 'Instagram' },
    youtube: { icon: FaYoutube, color: '#FF0000', label: 'YouTube' },
    twitch: { icon: FaTwitch, color: '#9146FF', label: 'Twitch' },
    spotify: { icon: FaSpotify, color: '#1DB954', label: 'Spotify' },
    steam: { icon: FaSteam, color: '#00adee', label: 'Steam' },
    website: { icon: FaGlobe, color: '#666', label: 'Website' },
    discord: { icon: FaDiscord, color: '#5865F2', label: 'Discord' },
};

// ════════════════════════════════════════════════════════════════════════════════
// 📦 MAIN COMPONENT
// ════════════════════════════════════════════════════════════════════════════════

const EnhancedProfile = ({ userId, onClose, isOwn = false }) => {
    const [profile, setProfile] = useState(null);
    const [extendedProfile, setExtendedProfile] = useState(null);
    const [showcases, setShowcases] = useState([]);
    const [mutualConnections, setMutualConnections] = useState(null);
    const [profileNote, setProfileNote] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [activeTab, setActiveTab] = useState('about');

    const token = localStorage.getItem('accessToken');

    // ════════════════════════════════════════════════════════════════════════════
    // 📡 DATA FETCHING
    // ════════════════════════════════════════════════════════════════════════════

    useEffect(() => {
        fetchProfileData();
    }, [userId]);

    const fetchProfileData = async () => {
        setIsLoading(true);
        try {
            // Temel profil
            const profileRes = await fetch(`${API_BASE_URL}/profile/${userId}/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (profileRes.ok) {
                const profileData = await profileRes.json();
                setProfile(profileData);
            }

            // Genişletilmiş profil
            const extendedRes = await fetch(`${API_BASE_URL}/profile/extended/?user_id=${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (extendedRes.ok) {
                const extendedData = await extendedRes.json();
                setExtendedProfile(extendedData);
            }

            // Vitrin öğeleri
            const showcaseRes = await fetch(`${API_BASE_URL}/profile/showcases/?user_id=${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (showcaseRes.ok) {
                const showcaseData = await showcaseRes.json();
                setShowcases(showcaseData);
            }

            // Ortak bağlantılar (kendi profilimiz değilse)
            if (!isOwn) {
                const mutualRes = await fetch(`${API_BASE_URL}/profile/mutual-connections/?target_user_id=${userId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (mutualRes.ok) {
                    const mutualData = await mutualRes.json();
                    setMutualConnections(mutualData);
                }

                // Profil notu
                const noteRes = await fetch(`${API_BASE_URL}/profile/note/?target_user_id=${userId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (noteRes.ok) {
                    const noteData = await noteRes.json();
                    setProfileNote(noteData.content || '');
                }

                // Ziyaret kaydet
                fetch(`${API_BASE_URL}/profile/visit/`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ profile_user_id: userId })
                });
            }

        } catch (error) {
            console.error('Profile fetch error:', error);
            toast.error('Profil yüklenemedi');
        } finally {
            setIsLoading(false);
        }
    };

    // ════════════════════════════════════════════════════════════════════════════
    // 💾 SAVE FUNCTIONS
    // ════════════════════════════════════════════════════════════════════════════

    const saveExtendedProfile = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/profile/extended/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editData)
            });

            if (res.ok) {
                const data = await res.json();
                setExtendedProfile(data.profile);
                setIsEditing(false);
                toast.success('Profil güncellendi!');
            } else {
                toast.error('Profil güncellenemedi');
            }
        } catch (error) {
            console.error('Save error:', error);
            toast.error('Bir hata oluştu');
        }
    };

    const saveProfileNote = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/profile/note/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    target_user_id: userId,
                    content: profileNote
                })
            });

            if (res.ok) {
                toast.success('Not kaydedildi!');
            }
        } catch (error) {
            console.error('Note save error:', error);
        }
    };

    // ════════════════════════════════════════════════════════════════════════════
    // 🎨 RENDER HELPERS
    // ════════════════════════════════════════════════════════════════════════════

    const renderSocialLinks = () => {
        if (!extendedProfile) return null;

        const links = [];

        if (extendedProfile.website_url) {
            links.push({ type: 'website', url: extendedProfile.website_url });
        }
        if (extendedProfile.twitter_username) {
            links.push({ type: 'twitter', url: `https://twitter.com/${extendedProfile.twitter_username}` });
        }
        if (extendedProfile.github_username) {
            links.push({ type: 'github', url: `https://github.com/${extendedProfile.github_username}` });
        }
        if (extendedProfile.instagram_username) {
            links.push({ type: 'instagram', url: `https://instagram.com/${extendedProfile.instagram_username}` });
        }
        if (extendedProfile.youtube_channel) {
            links.push({ type: 'youtube', url: extendedProfile.youtube_channel });
        }
        if (extendedProfile.twitch_username) {
            links.push({ type: 'twitch', url: `https://twitch.tv/${extendedProfile.twitch_username}` });
        }
        if (extendedProfile.spotify_url) {
            links.push({ type: 'spotify', url: extendedProfile.spotify_url });
        }
        if (extendedProfile.steam_id) {
            links.push({ type: 'steam', url: `https://steamcommunity.com/id/${extendedProfile.steam_id}` });
        }

        if (links.length === 0) return null;

        return (
            <div className="social-links">
                {links.map((link, index) => {
                    const social = SOCIAL_ICONS[link.type];
                    const Icon = social.icon;
                    return (
                        <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                            title={social.label}
                            style={{ '--social-color': social.color }}
                        >
                            <Icon />
                        </a>
                    );
                })}
            </div>
        );
    };

    const renderShowcases = () => {
        if (showcases.length === 0) return null;

        return (
            <div className="profile-showcases">
                <h3><FaStar /> Vitrin</h3>
                <div className="showcase-grid">
                    {showcases.map((item, index) => (
                        <div key={index} className={`showcase-item showcase-${item.showcase_type}`}>
                            {item.image_url && (
                                <img src={item.image_url} alt={item.title} />
                            )}
                            <div className="showcase-info">
                                <span className="showcase-title">{item.title}</span>
                                {item.description && (
                                    <span className="showcase-desc">{item.description}</span>
                                )}
                            </div>
                            {item.link_url && (
                                <a href={item.link_url} target="_blank" rel="noopener noreferrer" className="showcase-link">
                                    Görüntüle
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderMutualConnections = () => {
        if (!mutualConnections || isOwn) return null;

        return (
            <div className="mutual-connections">
                {mutualConnections.mutual_friends_count > 0 && (
                    <div className="mutual-item">
                        <FaUserFriends />
                        <span>{mutualConnections.mutual_friends_count} ortak arkadaş</span>
                    </div>
                )}
                {mutualConnections.mutual_servers_count > 0 && (
                    <div className="mutual-item">
                        <FaServer />
                        <span>{mutualConnections.mutual_servers_count} ortak sunucu</span>
                    </div>
                )}
            </div>
        );
    };

    const renderEditForm = () => {
        return (
            <div className="profile-edit-form">
                <div className="edit-section">
                    <h4>Hakkımda</h4>
                    <textarea
                        value={editData.bio || extendedProfile?.bio || ''}
                        onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                        placeholder="Kendin hakkında bir şeyler yaz..."
                        maxLength={500}
                    />
                </div>

                <div className="edit-section">
                    <h4>Zamirler</h4>
                    <input
                        type="text"
                        value={editData.pronouns || extendedProfile?.pronouns || ''}
                        onChange={(e) => setEditData({ ...editData, pronouns: e.target.value })}
                        placeholder="ör: he/him, she/her"
                    />
                </div>

                <div className="edit-section">
                    <h4>Konum</h4>
                    <input
                        type="text"
                        value={editData.location || extendedProfile?.location || ''}
                        onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                        placeholder="Şehir, Ülke"
                    />
                </div>

                <div className="edit-section">
                    <h4>Sosyal Bağlantılar</h4>
                    <div className="social-inputs">
                        <div className="social-input">
                            <FaTwitter />
                            <input
                                type="text"
                                value={editData.twitter_username || extendedProfile?.twitter_username || ''}
                                onChange={(e) => setEditData({ ...editData, twitter_username: e.target.value })}
                                placeholder="Twitter kullanıcı adı"
                            />
                        </div>
                        <div className="social-input">
                            <FaGithub />
                            <input
                                type="text"
                                value={editData.github_username || extendedProfile?.github_username || ''}
                                onChange={(e) => setEditData({ ...editData, github_username: e.target.value })}
                                placeholder="GitHub kullanıcı adı"
                            />
                        </div>
                        <div className="social-input">
                            <FaInstagram />
                            <input
                                type="text"
                                value={editData.instagram_username || extendedProfile?.instagram_username || ''}
                                onChange={(e) => setEditData({ ...editData, instagram_username: e.target.value })}
                                placeholder="Instagram kullanıcı adı"
                            />
                        </div>
                        <div className="social-input">
                            <FaYoutube />
                            <input
                                type="url"
                                value={editData.youtube_channel || extendedProfile?.youtube_channel || ''}
                                onChange={(e) => setEditData({ ...editData, youtube_channel: e.target.value })}
                                placeholder="YouTube kanal URL"
                            />
                        </div>
                        <div className="social-input">
                            <FaTwitch />
                            <input
                                type="text"
                                value={editData.twitch_username || extendedProfile?.twitch_username || ''}
                                onChange={(e) => setEditData({ ...editData, twitch_username: e.target.value })}
                                placeholder="Twitch kullanıcı adı"
                            />
                        </div>
                        <div className="social-input">
                            <FaGlobe />
                            <input
                                type="url"
                                value={editData.website_url || extendedProfile?.website_url || ''}
                                onChange={(e) => setEditData({ ...editData, website_url: e.target.value })}
                                placeholder="Web sitesi URL"
                            />
                        </div>
                    </div>
                </div>

                <div className="edit-actions">
                    <button className="btn-cancel" onClick={() => setIsEditing(false)}>
                        <FaTimes /> İptal
                    </button>
                    <button className="btn-save" onClick={saveExtendedProfile}>
                        <FaSave /> Kaydet
                    </button>
                </div>
            </div>
        );
    };

    // ════════════════════════════════════════════════════════════════════════════
    // 🎨 MAIN RENDER
    // ════════════════════════════════════════════════════════════════════════════

    if (isLoading) {
        return (
            <div className="enhanced-profile-modal">
                <div className="profile-loading">
                    <div className="loading-spinner" />
                    <span>Profil yükleniyor...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="enhanced-profile-modal">
            <div className="enhanced-profile-container">
                {/* Banner */}
                <div
                    className="profile-banner"
                    style={{
                        backgroundImage: extendedProfile?.banner_url ? `url(${extendedProfile.banner_url})` : undefined,
                        backgroundColor: extendedProfile?.banner_color || '#5865F2'
                    }}
                >
                    <button className="close-button" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {/* Avatar & Basic Info */}
                <div className="profile-header">
                    <div className="profile-avatar-section">
                        <img
                            src={profile?.avatar || '/default-avatar.png'}
                            alt={profile?.username}
                            className="profile-avatar"
                            style={{ borderColor: extendedProfile?.accent_color || '#5865F2' }}
                        />
                        {profile?.status && (
                            <span className={`status-indicator status-${profile.status}`} />
                        )}
                    </div>

                    <div className="profile-info">
                        <h2 className="profile-username">
                            {profile?.display_name || profile?.username}
                            {extendedProfile?.pronouns && (
                                <span className="pronouns">({extendedProfile.pronouns})</span>
                            )}
                        </h2>
                        <span className="profile-tag">@{profile?.username}</span>
                    </div>

                    {isOwn && !isEditing && (
                        <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
                            <FaEdit /> Profili Düzenle
                        </button>
                    )}
                </div>

                {/* Tabs */}
                <div className="profile-tabs">
                    <button
                        className={activeTab === 'about' ? 'active' : ''}
                        onClick={() => setActiveTab('about')}
                    >
                        Hakkında
                    </button>
                    <button
                        className={activeTab === 'activity' ? 'active' : ''}
                        onClick={() => setActiveTab('activity')}
                    >
                        Aktivite
                    </button>
                    {!isOwn && (
                        <button
                            className={activeTab === 'notes' ? 'active' : ''}
                            onClick={() => setActiveTab('notes')}
                        >
                            Notlarım
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className="profile-content">
                    {isEditing ? (
                        renderEditForm()
                    ) : (
                        <>
                            {activeTab === 'about' && (
                                <div className="about-tab">
                                    {/* Bio */}
                                    {extendedProfile?.bio && (
                                        <div className="profile-section">
                                            <h3>Hakkımda</h3>
                                            <p className="bio-text">{extendedProfile.bio}</p>
                                        </div>
                                    )}

                                    {/* Location & Time */}
                                    {extendedProfile?.location && (
                                        <div className="profile-section location-section">
                                            <FaMapMarkerAlt />
                                            <span>{extendedProfile.location}</span>
                                        </div>
                                    )}

                                    {/* Mutual Connections */}
                                    {renderMutualConnections()}

                                    {/* Social Links */}
                                    {renderSocialLinks()}

                                    {/* Showcases */}
                                    {renderShowcases()}

                                    {/* Member Since */}
                                    <div className="profile-section member-since">
                                        <FaClock />
                                        <span>
                                            {new Date(profile?.date_joined).toLocaleDateString('tr-TR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })} tarihinden beri üye
                                        </span>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'activity' && (
                                <div className="activity-tab">
                                    {profile?.current_activity ? (
                                        <div className="current-activity">
                                            <FaGamepad />
                                            <div className="activity-info">
                                                <span className="activity-type">{profile.current_activity.type}</span>
                                                <span className="activity-name">{profile.current_activity.name}</span>
                                                {profile.current_activity.details && (
                                                    <span className="activity-details">{profile.current_activity.details}</span>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="no-activity">
                                            <span>Şu anda aktif bir aktivite yok</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'notes' && !isOwn && (
                                <div className="notes-tab">
                                    <h3>Bu kullanıcı hakkında notum</h3>
                                    <p className="notes-info">
                                        Bu not sadece sana özeldir. Diğer kullanıcılar göremez.
                                    </p>
                                    <textarea
                                        value={profileNote}
                                        onChange={(e) => setProfileNote(e.target.value)}
                                        onBlur={saveProfileNote}
                                        placeholder="Bu kullanıcı hakkında bir not yaz..."
                                        maxLength={256}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EnhancedProfile;
