import { memo, useCallback } from 'react';
import { FaCog, FaDownload } from 'react-icons/fa';
import { styles } from '../SidebarStyles';
import { PRODUCTION_URL } from '../utils/constants';
import { getFreshActivity } from '../utils/activityUtils';

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
    getDeterministicAvatar,
    onProfileClick,
    updateAvailable = false,
    onUpdateClick,
    ownActivity: rawOwnActivity = null, // 🔥 Live Spotify/Steam activity for the current user
}) => {
    const ownActivity = getFreshActivity(rawOwnActivity);
    // 🔥 DÜZELTME 1: URL Kontrolü
    let avatarUrl = currentUserProfile?.avatar || getDeterministicAvatar(currentUsername);

    // 🔥 FIX: avatarUrl string olmalı
    if (avatarUrl && typeof avatarUrl === 'string' && !avatarUrl.startsWith('http') && !avatarUrl.startsWith('blob') && !avatarUrl.includes('ui-avatars.com')) {
        // Başında slash yoksa ekle
        const path = avatarUrl.startsWith('/') ? avatarUrl : `/${avatarUrl}`;
        avatarUrl = `${PRODUCTION_URL}${path}`;
    } else if (!avatarUrl || typeof avatarUrl !== 'string') {
        avatarUrl = getDeterministicAvatar(currentUsername);
    }

    // 🔥 DÜZELTME 2: Friend Code
    const friendCode = currentUserProfile?.friend_code || '0000';

    return (
        <div style={styles.bottomSection}>

            {/* 🔥 GÜNCELLEME BİLDİRİMİ */}
            {updateAvailable && (
                <div
                    onClick={onUpdateClick}
                    style={{
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
                        animation: 'pulse 2s infinite'
                    }}
                >
                    <FaDownload />
                    <span>Güncelleme Mevcut!</span>
                </div>
            )}

            {/* 🔥 SES KONTROLLERI KALDIRILDI - RoomList'te zaten mevcut */}

            {/* Kullanıcı Paneli */}
            <div style={styles.userPanel} onClick={onProfileClick}>
                <div style={{ position: 'relative' }}>
                    <img
                        src={avatarUrl}
                        style={styles.avatar}
                        alt="me"
                        onError={(e) => {
                            e.target.onerror = null;
                            // Eğer resim yüklenemezse deterministik (harfli) avatarı kullan
                            e.target.src = getDeterministicAvatar(currentUsername);
                        }}
                    />
                    {/* Online Dot */}
                    <div style={{
                        position: 'absolute',
                        bottom: '2px',
                        right: '8px',
                        width: '10px',
                        height: '10px',
                        backgroundColor: '#23a559',
                        borderRadius: '50%',
                        border: '2px solid #0b0e1b',
                        boxShadow: '0 0 6px rgba(35,165,89,0.5)'
                    }}></div>
                </div>

                <div style={styles.userInfo}>
                    <span style={styles.usernameText}>
                        {currentUsername || 'Yükleniyor...'}
                    </span>
                    {ownActivity?.spotify ? (
                        <span style={{ fontSize: '10px', color: '#1db954', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '120px' }}>
                            🎵 {ownActivity.spotify.name || ownActivity.spotify.track}
                        </span>
                    ) : ownActivity?.steam ? (
                        <span style={{ fontSize: '10px', color: '#66c0f4', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '120px' }}>
                            🎮 {ownActivity.steam.name || ownActivity.steam.game}
                        </span>
                    ) : (
                        <span style={styles.statusText}>#{friendCode}</span>
                    )}
                </div>

                <button
                    style={styles.settingsButton}
                    onClick={(e) => { e.stopPropagation(); onProfileClick(); }}
                >
                    <FaCog />
                </button>
            </div>
        </div>
    );
};

const MemoizedUserFooter = memo(UserFooter);
MemoizedUserFooter.displayName = 'UserFooter';

export default MemoizedUserFooter;

