/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { ABSOLUTE_HOST_URL } from '../../utils/constants';

import profileStyles from '../styles';

import logger from '../../utils/logger';

// -- dynamic style helpers (pass 2) --

// -- extracted inline style constants --

const BASE_URL = ABSOLUTE_HOST_URL;

const ProfileTab = ({
    defaultAvatars,

    emailVerified,

    fileInputRef,

    formData,

    handleAvatarUpload,

    handleInputChange,

    handlePhoneUpdate,

    handleSaveProfile,

    isOwnProfile,

    loading,

    phoneNumber,

    resendVerificationEmail,

    selectDefaultAvatar,

    setPhoneNumber,
}) => {
    const styles = profileStyles;

    const isLoading = loading ? Object.values(loading).some(Boolean) : false;

    const [error, setError] = useState(null);

    return (
        <>
            <div className="profile-card">
                <div className="profile-card-header">
                    <div className="profile-card-title">
                        <span className="profile-card-icon">👤</span>
                        Profil Bilgileri
                    </div>
                </div>

                <div style={styles.avatarSection}>
                    <img
                        src={
                            formData.avatar_url && typeof formData.avatar_url === 'string'
                                ? (formData.avatar_url.startsWith('http')
                                      ? formData.avatar_url
                                      : `${BASE_URL}${formData.avatar_url}`) + `?t=${Date.now()}`
                                : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%235865f2" width="100" height="100"/%3E%3Ctext x="50" y="50" font-size="45" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E'
                        }
                        alt="Avatar"
                        style={styles.avatar}
                        key={formData.avatar_url}
                        onError={(e) => {
                            // Prevent infinite loop - only set fallback once

                            if (!e.target.dataset.errorHandled) {
                                e.target.dataset.errorHandled = 'true';

                                logger.error(' [Avatar Load Error]', e.target.src);

                                e.target.src =
                                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%235865f2" width="100" height="100"/%3E%3Ctext x="50" y="50" font-size="45" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E';
                            }
                        }}
                    />

                    {/*  Only show avatar upload button for own profile */}

                    {isOwnProfile && (
                        <div>
                            <button
                                style={styles.button('secondary')}
                                aria-label="action-button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={loading.avatar}
                            >
                                {loading.avatar ? ' Yükleniyor...' : '📷 Avatar Değiştir'}
                            </button>

                            <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={handleAvatarUpload}
                            />

                            <p>Max 5MB • PNG, JPG, GIF</p>
                        </div>
                    )}
                </div>

                <div style={styles.inputGroup}>
                    <label htmlFor="profile-username" style={styles.label}>
                        Username
                    </label>

                    <input
                        type="text"
                        id="profile-username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        style={styles.input}
                        disabled={!isOwnProfile}
                        aria-label="Username"
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label htmlFor="profile-email" style={styles.label}>
                        Email
                    </label>

                    <div>
                        <input
                            type="email"
                            id="profile-email"
                            value={formData.email}
                            disabled
                            aria-label="Email"
                        />

                        {isOwnProfile && !emailVerified && (
                            <button
                                style={styles.button('secondary')}
                                aria-label="resendVerificationEmail"
                                onClick={resendVerificationEmail}
                                disabled={loading.resendEmail}
                            >
                                {loading.resendEmail ? '' : '✉ Verify'}
                            </button>
                        )}

                        {emailVerified && <span>✅</span>}
                    </div>
                </div>

                <div style={styles.inputGroup}>
                    <label htmlFor="profile-status" style={styles.label}>
                        Durum Mesajı
                    </label>

                    <input
                        type="text"
                        id="profile-status"
                        name="status_message"
                        value={formData.status_message}
                        onChange={handleInputChange}
                        placeholder="How are you today?"
                        style={styles.input}
                        disabled={!isOwnProfile}
                        aria-label="Status Message"
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label htmlFor="profile-phone" style={styles.label}>
                        📱 Phone Number
                    </label>

                    <div>
                        <input
                            type="tel"
                            id="profile-phone"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="+90 555 123 4567"
                            aria-label="Phone Number"
                        />

                        <button
                            style={styles.button('secondary')}
                            aria-label="handlePhoneUpdate"
                            onClick={handlePhoneUpdate}
                            disabled={loading.phoneUpdate}
                        >
                            {loading.phoneUpdate ? '' : '💾'}
                        </button>
                    </div>
                </div>

                {/*  Only show save button for own profile */}

                {isOwnProfile && (
                    <button
                        style={styles.button('primary')}
                        aria-label="handleSaveProfile"
                        onClick={handleSaveProfile}
                        disabled={loading.saveProfile}
                    >
                        {loading.saveProfile ? ' Kaydediliyor...' : '💾 Kaydet'}
                    </button>
                )}
            </div>

            {/*  Only show default avatars for own profile */}

            {isOwnProfile && (
                <div style={styles.card}>
                    <h3 style={styles.sectionTitle}>🎭 Default Avatars</h3>

                    <div>
                        {defaultAvatars.map((avatar, idx) => {
                            // 🚀 Use thumbnail for display (fast loading), original for saving (high quality)

                            const displayUrl = avatar.thumbnailUrl || avatar.url;

                            return (
                                <div
                                    key={`item-${idx}`}
                                    title={avatar.name}
                                    style={{
                                        width: '60px',

                                        height: '60px',

                                        borderRadius: '50%',

                                        overflow: 'hidden',

                                        cursor: 'pointer',

                                        border:
                                            formData.avatar_url === avatar.url
                                                ? '3px solid #5865f2'
                                                : '2px solid rgba(255,255,255,0.1)',

                                        transition: 'all 0.3s',

                                        boxShadow:
                                            formData.avatar_url === avatar.url
                                                ? '0 0 15px rgba(88, 101, 242, 0.5)'
                                                : 'none',

                                        backgroundColor: '#111214', // Placeholder background while loading
                                    }}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => selectDefaultAvatar(avatar)}
                                    onKeyDown={(e) =>
                                        (e.key === 'Enter' || e.key === ' ') &&
                                        e.currentTarget.click()
                                    }
                                >
                                    <img
                                        src={displayUrl}
                                        alt={avatar.name}
                                        loading="lazy" // 🚀 Native lazy loading
                                        decoding="async" // 🚀 Non-blocking decode
                                        onError={(e) => {
                                            // 🚀 Final fallback: SVG placeholder (backend already sent best available)

                                            if (!e.target.dataset.errorHandled) {
                                                e.target.dataset.errorHandled = 'true';

                                                e.target.src =
                                                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%235865f2" width="100" height="100"/%3E%3Ctext x="50" y="50" font-size="45" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E';
                                            }
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div style={styles.card}>
                <h3 style={styles.sectionTitle}> Social Connections</h3>

                {/*  OAuth with Connect Butonu */}

                <div>
                    <div>
                        <h4>🎮 Connect Your Accounts</h4>

                        <p>Spotify, Steam, Epic Games, Twitch, Xbox and more</p>
                    </div>

                    <button
                        aria-label="action-button"
                        onClick={() => {
                            // ConnectionsPanel'i openmak for global event gÃnder

                            window.dispatchEvent(new CustomEvent('openConnectionsPanel'));
                        }}
                        onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                        onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                    >
                        Manage Connections
                    </button>
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>🎮 Steam ID</label>

                    <input
                        type="text"
                        name="steam_id"
                        value={formData.steam_id}
                        onChange={handleInputChange}
                        placeholder="76561198012345678"
                        style={styles.input}
                        aria-label="Steam Id"
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>🎵 Spotify Username</label>

                    <input
                        type="text"
                        name="spotify_username"
                        value={formData.spotify_username}
                        onChange={handleInputChange}
                        placeholder="spotify_username"
                        style={styles.input}
                        aria-label="Spotify Username"
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>📸 Instagram</label>

                    <input
                        type="text"
                        name="instagram_username"
                        value={formData.instagram_username}
                        onChange={handleInputChange}
                        placeholder="@instagram"
                        style={styles.input}
                        aria-label="Instagram Username"
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}> X (Twitter)</label>

                    <input
                        type="text"
                        name="x_username"
                        value={formData.x_username}
                        onChange={handleInputChange}
                        placeholder="@x_username"
                        style={styles.input}
                        aria-label="X Username"
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>🎮 Xbox Gamertag</label>

                    <input
                        type="text"
                        name="xbox_gamertag"
                        value={formData.xbox_gamertag}
                        onChange={handleInputChange}
                        placeholder="XboxGamerTag"
                        style={styles.input}
                        aria-label="Xbox Gamertag"
                    />
                </div>
            </div>
        </>
    );
};

ProfileTab.propTypes = {
    defaultAvatars: PropTypes.array,

    emailVerified: PropTypes.string,

    fileInputRef: PropTypes.object,

    formData: PropTypes.array,

    handleAvatarUpload: PropTypes.func,

    handleInputChange: PropTypes.func,

    handlePhoneUpdate: PropTypes.func,

    handleSaveProfile: PropTypes.func,

    isOwnProfile: PropTypes.bool,

    loading: PropTypes.func,

    phoneNumber: PropTypes.string,

    resendVerificationEmail: PropTypes.func,

    selectDefaultAvatar: PropTypes.func,

    setPhoneNumber: PropTypes.func,
};

export default ProfileTab;
