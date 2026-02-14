// frontend/src/components/EnhancedProfile/EnhancedProfile.js
import React from 'react';
import {
    FaEdit, FaTimes, FaClock,
    FaMapMarkerAlt, FaUserFriends, FaServer, FaStar, FaGamepad
} from 'react-icons/fa';
import useEnhancedProfile, { SOCIAL_ICONS } from './useEnhancedProfile';
import ProfileEditForm from './ProfileEditForm';
import './EnhancedProfile.css';

const EnhancedProfile = ({ userId, onClose, isOwn = false }) => {
    const {
        profile, extendedProfile, showcases, mutualConnections,
        profileNote, setProfileNote,
        isLoading, isEditing, setIsEditing,
        editData, setEditData,
        activeTab, setActiveTab,
        saveExtendedProfile, saveProfileNote, getSocialLinks
    } = useEnhancedProfile(userId, isOwn);

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

    const socialLinks = getSocialLinks();

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
                    <button className="close-button" onClick={onClose}><FaTimes /></button>
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
                        {profile?.status && <span className={`status-indicator status-${profile.status}`} />}
                    </div>
                    <div className="profile-info">
                        <h2 className="profile-username">
                            {profile?.display_name || profile?.username}
                            {extendedProfile?.pronouns && <span className="pronouns">({extendedProfile.pronouns})</span>}
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
                    <button className={activeTab === 'about' ? 'active' : ''} onClick={() => setActiveTab('about')}>Hakkında</button>
                    <button className={activeTab === 'activity' ? 'active' : ''} onClick={() => setActiveTab('activity')}>Aktivite</button>
                    {!isOwn && (
                        <button className={activeTab === 'notes' ? 'active' : ''} onClick={() => setActiveTab('notes')}>Notlarım</button>
                    )}
                </div>

                {/* Content */}
                <div className="profile-content">
                    {isEditing ? (
                        <ProfileEditForm
                            editData={editData}
                            setEditData={setEditData}
                            extendedProfile={extendedProfile}
                            saveExtendedProfile={saveExtendedProfile}
                            setIsEditing={setIsEditing}
                        />
                    ) : (
                        <>
                            {activeTab === 'about' && (
                                <div className="about-tab">
                                    {extendedProfile?.bio && (
                                        <div className="profile-section">
                                            <h3>Hakkımda</h3>
                                            <p className="bio-text">{extendedProfile.bio}</p>
                                        </div>
                                    )}
                                    {extendedProfile?.location && (
                                        <div className="profile-section location-section">
                                            <FaMapMarkerAlt />
                                            <span>{extendedProfile.location}</span>
                                        </div>
                                    )}

                                    {/* Mutual Connections */}
                                    {mutualConnections && !isOwn && (
                                        <div className="mutual-connections">
                                            {mutualConnections.mutual_friends_count > 0 && (
                                                <div className="mutual-item"><FaUserFriends /><span>{mutualConnections.mutual_friends_count} ortak arkadaş</span></div>
                                            )}
                                            {mutualConnections.mutual_servers_count > 0 && (
                                                <div className="mutual-item"><FaServer /><span>{mutualConnections.mutual_servers_count} ortak sunucu</span></div>
                                            )}
                                        </div>
                                    )}

                                    {/* Social Links */}
                                    {socialLinks.length > 0 && (
                                        <div className="social-links">
                                            {socialLinks.map((link, index) => {
                                                const social = SOCIAL_ICONS[link.type];
                                                const Icon = social.icon;
                                                return (
                                                    <a key={index} href={link.url} target="_blank" rel="noopener noreferrer"
                                                        className="social-link" title={social.label} style={{ '--social-color': social.color }}>
                                                        <Icon />
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* Showcases */}
                                    {showcases.length > 0 && (
                                        <div className="profile-showcases">
                                            <h3><FaStar /> Vitrin</h3>
                                            <div className="showcase-grid">
                                                {showcases.map((item, index) => (
                                                    <div key={index} className={`showcase-item showcase-${item.showcase_type}`}>
                                                        {item.image_url && <img src={item.image_url} alt={item.title} />}
                                                        <div className="showcase-info">
                                                            <span className="showcase-title">{item.title}</span>
                                                            {item.description && <span className="showcase-desc">{item.description}</span>}
                                                        </div>
                                                        {item.link_url && (
                                                            <a href={item.link_url} target="_blank" rel="noopener noreferrer" className="showcase-link">Görüntüle</a>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Member Since */}
                                    <div className="profile-section member-since">
                                        <FaClock />
                                        <span>
                                            {new Date(profile?.date_joined).toLocaleDateString('tr-TR', {
                                                year: 'numeric', month: 'long', day: 'numeric'
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
                                    <p className="notes-info">Bu not sadece sana özeldir. Diğer kullanıcılar göremez.</p>
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
