/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
    const styles = profileStyles;

    const isLoading = loading ? Object.values(loading).some(Boolean) : false;

    const [error, setError] = useState(null);

    return (
        <>
            <div className="profile-card">
                <div className="profile-card-header">
                    <div className="profile-card-title">
                        <span className="profile-card-icon">👤</span>
                        {t('profile.profileInfo')}
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
                        alt={t('alt.userAvatar', 'User Avatar')}
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
                                aria-label={t('profile.changeAvatar')}
                                onClick={() => fileInputRef.current?.click()}
                                disabled={loading.avatar}
                            >
                                {loading.avatar ? t('profile.uploading') : `📷 ${t('profile.changeAvatar')}`}
                            </button>

                            <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={handleAvatarUpload}
                            />

                            <p>{t('profile.maxFileSize')}</p>
                        </div>
                    )}
                </div>

                <div style={styles.inputGroup}>
                    <label htmlFor="profile-username" style={styles.label}>
                        {t('profile.username')}
                    </label>

                    <input
                        type="text"
                        id="profile-username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        style={styles.input}
                        disabled={!isOwnProfile}
                        aria-label={t('common.username', 'Username')}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label htmlFor="profile-email" style={styles.label}>
                        {t('common.email')}
                    </label>

                    <div>
                        <input
                            type="email"
                            id="profile-email"
                            value={formData.email}
                            disabled
                            aria-label={t('common.email', 'Email')}
                        />

                        {isOwnProfile && !emailVerified && (
                            <button
                                style={styles.button('secondary')}
                                aria-label={t('profile.resendEmail', 'Resend verification email')}
                                onClick={resendVerificationEmail}
                                disabled={loading.resendEmail}
                            >
                                {loading.resendEmail ? '' : `✉ ${t('profile.verify')}`}
                            </button>
                        )}

                        {emailVerified && <span>✅</span>}
                    </div>
                </div>

                <div style={styles.inputGroup}>
                    <label htmlFor="profile-status" style={styles.label}>
                        {t('profile.statusMessage')}
                    </label>

                    <input
                        type="text"
                        id="profile-status"
                        name="status_message"
                        value={formData.status_message}
                        onChange={handleInputChange}
                        placeholder={t('profile.statusPlaceholder')}
                        style={styles.input}
                        disabled={!isOwnProfile}
                        aria-label={t('profile.statusMessage', 'Status Message')}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label htmlFor="profile-phone" style={styles.label}>
                        📱 {t('profile.phoneNumber')}
                    </label>

                    <div>
                        <input
                            type="tel"
                            id="profile-phone"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder={t('profile.phonePlaceholder', '+90 555 123 4567')}
                            aria-label={t('profile.phoneNumber', 'Phone Number')}
                        />

                        <button
                            style={styles.button('secondary')}
                            aria-label={t('profile.updatePhone', 'Update phone number')}
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
                        aria-label={t('profile.save', 'Save profile')}
                        onClick={handleSaveProfile}
                        disabled={loading.saveProfile}
                    >
                        {loading.saveProfile ? t('profile.saving') : `💾 ${t('profile.save')}`}
                    </button>
                )}
            </div>

            {/*  Only show default avatars for own profile */}

            {isOwnProfile && (
                <div style={styles.card}>
                    <h3 style={styles.sectionTitle}>🎭 {t('profile.defaultAvatars')}</h3>

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
                <h3 style={styles.sectionTitle}>{t('profile.socialConnections')}</h3>

                {/*  OAuth with Connect Butonu */}

                <div>
                    <div>
                        <h4>🎮 {t('profile.connectAccounts')}</h4>

                        <p>{t('profile.connectDesc')}</p>
                    </div>

                    <button
                        aria-label={t('profile.manageConnections', 'Manage connections')}
                        onClick={() => {
                            window.dispatchEvent(new CustomEvent('openConnectionsPanel'));
                        }}
                        onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                        onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                    >
                        {t('profile.manageConnections')}
                    </button>
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>🎮 {t('profile.steamId')}</label>

                    <input
                        type="text"
                        name="steam_id"
                        value={formData.steam_id}
                        onChange={handleInputChange}
                        placeholder={t('profile.steamIdPlaceholder', '76561198012345678')}
                        style={styles.input}
                        aria-label={t('profile.steamId', 'Steam ID')}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>🎵 {t('profile.spotifyUsername', 'Spotify Username')}</label>

                    <input
                        type="text"
                        name="spotify_username"
                        value={formData.spotify_username}
                        onChange={handleInputChange}
                        placeholder={t('profile.spotifyPlaceholder', 'spotify_username')}
                        style={styles.input}
                        aria-label={t('profile.spotifyUsername', 'Spotify Username')}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>📸 {t('profile.instagram', 'Instagram')}</label>

                    <input
                        type="text"
                        name="instagram_username"
                        value={formData.instagram_username}
                        onChange={handleInputChange}
                        placeholder={t('profile.instagramPlaceholder', '@instagram')}
                        style={styles.input}
                        aria-label={t('profile.instagram', 'Instagram')}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}> X (Twitter)</label>

                    <input
                        type="text"
                        name="x_username"
                        value={formData.x_username}
                        onChange={handleInputChange}
                        placeholder={t('profile.xUsernamePlaceholder', '@x_username')}
                        style={styles.input}
                        aria-label={t('profile.xUsername', 'X (Twitter) username')}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>🎮 {t('profile.xboxGamertag', 'Xbox Gamertag')}</label>

                    <input
                        type="text"
                        name="xbox_gamertag"
                        value={formData.xbox_gamertag}
                        onChange={handleInputChange}
                        placeholder={t('profile.xboxPlaceholder', 'XboxGamerTag')}
                        style={styles.input}
                        aria-label={t('profile.xboxGamertag', 'Xbox Gamertag')}
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
