import { memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FaCog, FaDownload } from 'react-icons/fa';
import { styles } from '../../styles/SidebarStyles';
import { PRODUCTION_URL } from '../../utils/constants';
import { getFreshActivity } from '../../utils/activityUtils';

const S = {
    flex3: { ...styles.usernameText, flex: '1 1 auto' },
    flex2: { display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 },
    abs: {
        position: 'absolute',
        bottom: '2px',
        right: '8px',
        width: '10px',
        height: '10px',
        backgroundColor: '#23a559',
        borderRadius: '50%',
        border: '2px solid #0b0e1b',
        boxShadow: '0 0 6px rgba(35,165,89,0.5)',
    },
    flex: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#5865f2',
        color: 'white',
        textAlign: 'center',
        borderRadius: '8px',
        marginBottom: '10px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '0.9em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        boxShadow: '0 4px 12px rgba(88, 101, 242, 0.4)',
        animation: 'pulse 2s infinite',
    },
    root: {
        width: '100%',
    },
};

const getFallbackAvatar = (username = 'User') => `/default/${encodeURIComponent(username)}.svg`;

const getActivityMeta = (activity) => {
    if (activity?.spotify) {
        return {
            icon: '🎵',
            color: '#1db954',
            background: 'rgba(29, 185, 84, 0.16)',
            text: activity.spotify.name || activity.spotify.track || 'Spotify',
        };
    }

    if (activity?.steam) {
        return {
            icon: '🎮',
            color: '#66c0f4',
            background: 'rgba(102, 192, 244, 0.16)',
            text: activity.steam.name || activity.steam.game || 'Gaming',
        };
    }

    return null;
};

/**
 * Sidebar footer showing the current user's avatar, username and friend code.
 * Optionally displays an update-available notification banner.
 * @param {Object} props
 * @param {Object} [props.currentUserProfile] - User profile with avatar, friend_code, etc.
 * @param {string} props.currentUsername - The logged-in user's display name
 * @param {(username: string) => string} props.getDeterministicAvatar - Fallback avatar generator
 * @param {() => void} props.onProfileClick - Opens the user settings/profile panel
 * @param {boolean} [props.updateAvailable=false] - Whether an app update is available
 * @param {() => void} [props.onUpdateClick] - Handler fired when the update banner is clicked
 */
const UserFooter = ({
    currentUserProfile,
    currentUsername,
    getDeterministicAvatar = getFallbackAvatar,
    onProfileClick,
    onOpenSettings,
    updateAvailable = false,
    onUpdateClick,
    ownActivity: rawOwnActivity = null, // 🔥 Live Spotify/Steam activity for the current user
}) => {
    const ownActivity = getFreshActivity(rawOwnActivity);
    const activityMeta = getActivityMeta(ownActivity);
    // 🔥 DÜZELTME 1: URL Kontrolü
    let avatarUrl = currentUserProfile?.avatar || getDeterministicAvatar(currentUsername);

    // 🔥 FIX: avatarUrl string olmalı
    if (
        avatarUrl &&
        typeof avatarUrl === 'string' &&
        !avatarUrl.startsWith('http') &&
        !avatarUrl.startsWith('blob') &&
        !avatarUrl.includes('ui-avatars.com')
    ) {
        // Banda slash yoksa add
        const path = avatarUrl.startsWith('/') ? avatarUrl : `/${avatarUrl}`;
        avatarUrl = `${PRODUCTION_URL}${path}`;
    } else if (!avatarUrl || typeof avatarUrl !== 'string') {
        avatarUrl = getDeterministicAvatar(currentUsername);
    }

    const { t } = useTranslation();
    // 🔥 DÜZELTME 2: Friend Code
    const friendCode = currentUserProfile?.friend_code || '0000';

    return (
        <div style={S.root}>
            {/* 🔥 GÜNCELLEME BİLDİRİMİ */}
            {updateAvailable && (
                <div
                    onClick={onUpdateClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && onUpdateClick()}
                    style={S.flex}
                >
                    <FaDownload />
                    <span>{t('ui.updateAvailable')}</span>
                </div>
            )}

            {/* 🔥 SES KONTROLLERI KALDIRILDI - RoomList'te zaten mevcut */}

            {/* User Paneli */}
            <div
                style={styles.userPanel}
                onClick={onProfileClick}
                role="button"
                tabIndex={0}
                aria-label={t('profile.openPanel', 'Open profile panel')}
                data-testid="profile-panel-btn"
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onProfileClick()}
            >
                <div className="pos-relative">
                    <img
                        src={avatarUrl}
                        style={styles.avatar}
                        alt={currentUsername || 'User avatar'}
                        onError={(e) => {
                            e.target.onerror = null;
                            // Eğer image uploadnemezse deterministik (harfli) avatarı kullan
                            e.target.src = getDeterministicAvatar(currentUsername);
                        }}
                    />
                    {/* Online Dot */}
                    <div style={S.abs}></div>
                </div>

                <div style={styles.userInfo}>
                    <div style={S.flex2}>
                        <span style={S.flex3}>{currentUsername || t('common.loading')}</span>
                        {activityMeta && (
                            <span
                                style={{
                                    flexShrink: 0,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '22px',
                                    height: '22px',
                                    borderRadius: '999px',
                                    background: activityMeta.background,
                                    border: `1px solid ${activityMeta.color}33`,
                                    color: activityMeta.color,
                                    fontSize: '10px',
                                    fontWeight: '700',
                                }}
                            >
                                <span aria-hidden="true">{activityMeta.icon}</span>
                            </span>
                        )}
                    </div>
                    <span
                        style={{
                            ...(activityMeta
                                ? {
                                    fontSize: '11px',
                                    color: activityMeta.color,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    lineHeight: '1.3',
                                }
                                : styles.statusText),
                        }}
                    >
                        {activityMeta ? activityMeta.text : `#${friendCode}`}
                    </span>
                </div>

                <button
                    aria-label={t('nav.settings', 'Settings')}
                    style={styles.settingsButton}
                    onClick={(e) => {
                        e.stopPropagation();
                        (onOpenSettings || onProfileClick)();
                    }}
                >
                    <FaCog />
                </button>
            </div>
        </div>
    );
};

const MemoizedUserFooter = memo(UserFooter);
MemoizedUserFooter.displayName = 'UserFooter';

MemoizedUserFooter.propTypes = {
    currentUserProfile: PropTypes.object,
    currentUsername: PropTypes.string,
    getDeterministicAvatar: PropTypes.func,
    onProfileClick: PropTypes.func,
    onOpenSettings: PropTypes.func,
    updateAvailable: PropTypes.bool,
    onUpdateClick: PropTypes.func,
};
export default MemoizedUserFooter;
