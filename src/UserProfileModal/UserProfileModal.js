/* eslint-disable no-irregular-whitespace */
/* eslint-disable react-hooks/rules-of-hooks */
// frontend/src/UserProfileModal.js
// Decomposed: styles.js + hooks/useProfileModal.js

import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { useCallback, useState, memo } from 'react';
import { FaUserPlus, FaCheck, FaCoins, FaDesktop, FaClock, FaStickyNote } from 'react-icons/fa';
import { AchievementsPanel } from '../components/profile/AchievementBadge';
import SessionManagerModal from '../components/security/SessionManagerModal';
import UserNotesModal from '../components/profile/UserNotesModal';
import { styles } from './styles';
import { useProfileModal, getIconForLink, formatUrl, linkDisplayNames } from './';
import useModalA11y from '../hooks/useModalA11y';

import { useTranslation } from 'react-i18next';
import logger from '../utils/logger';

// -- dynamic style helpers (pass 2) --
// -- extracted inline style constants --

const UserProfileModal = ({
    user,
    onClose,
    onStartDM,
    onImageClick,
    getDeterministicAvatar,
    fetchWithAuth,
    apiBaseUrl,
    currentUser,
    friendsList,
}) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {
        requestStatus,
        showSessionManager,
        setShowSessionManager,
        showNotes,
        setShowNotes,
        activeTab,
        setActiveTab,
        presenceHistory,
        isFriend,
        isSelf,
        handleAddFriend,
        copyToClipboard,
        handleSendMoney,
        validLinks,
    } = useProfileModal({ user, fetchWithAuth, apiBaseUrl, currentUser, friendsList });

    if (!user) return null;
    if (isLoading) return null;
    if (error) {
        logger.error('UserProfileModal error:', error);
    }

    const rawAvatarUrl = user.avatar || getDeterministicAvatar(user.username);
    // ?? FIX: rawAvatarUrl string olmali
    const avatarUrl =
        typeof rawAvatarUrl === 'string' && rawAvatarUrl.startsWith('http')
            ? rawAvatarUrl
            : typeof rawAvatarUrl === 'string'
              ? `${apiBaseUrl}${rawAvatarUrl}`
              : getDeterministicAvatar(user.username);
    // Cache busting for avatar updates
    const avatarSrc =
        avatarUrl + (user.avatar && typeof user.avatar === 'string' ? `?t=${Date.now()}` : '');

    const { overlayProps, dialogProps } = useModalA11y({
        onClose,
        label: `${user.username} profile`,
    });

    const handleAvatarEnter = useCallback((e) => {
        e.currentTarget.style.transform = 'scale(1.07)';
        e.currentTarget.style.boxShadow = '0 0 0 3px #5865f2, 0 12px 28px rgba(0,0,0,0.5)';
    }, []);
    const handleAvatarLeave = useCallback((e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow =
            '0 0 0 2px rgba(88,101,242,0.5), 0 8px 24px rgba(0,0,0,0.5)';
    }, []);
    const handleAvatarClick = useCallback(() => onImageClick(avatarUrl), [onImageClick, avatarUrl]);
    const handleClose = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
        },
        [onClose]
    );
    const handleCloseBtnEnter = useCallback((e) => {
        e.currentTarget.style.background = 'rgba(242, 63, 66, 0.85)';
        e.currentTarget.style.transform = 'scale(1.1)';
    }, []);
    const handleCloseBtnLeave = useCallback((e) => {
        e.currentTarget.style.background = 'rgba(0,0,0,0.55)';
        e.currentTarget.style.transform = 'scale(1)';
    }, []);
    const handleOpenSessionManager = useCallback(
        () => setShowSessionManager(true),
        [setShowSessionManager]
    );
    const handleStartDM = useCallback(() => onStartDM(user?.username), [onStartDM, user?.username]);
    const handleOpenNotes = useCallback(() => setShowNotes(true), [setShowNotes]);
    const handleFriendCodeEnter = useCallback(
        (e) => (e.currentTarget.style.background = 'rgba(88, 101, 242, 0.18)'),
        []
    );
    const handleFriendCodeLeave = useCallback(
        (e) => (e.currentTarget.style.background = 'rgba(88, 101, 242, 0.08)'),
        []
    );
    const handleTabProfile = useCallback(() => setActiveTab('profile'), [setActiveTab]);
    const handleTabActivity = useCallback(() => setActiveTab('activity'), [setActiveTab]);
    const handleTabNotes = useCallback(() => setActiveTab('notes'), [setActiveTab]);
    const handleCloseInlineNotes = useCallback(() => setActiveTab('profile'), [setActiveTab]);
    const handleCloseNotes = useCallback(() => setShowNotes(false), [setShowNotes]);
    const handleCloseSessionManager = useCallback(
        () => setShowSessionManager(false),
        [setShowSessionManager]
    );

    const modalContent = (
        <div {...overlayProps}>
            {/* Inject entrance animation CSS */}
            <style>{`
                @keyframes profileModalEnter {
                    from { opacity: 0; transform: scale(0.9) translateY(16px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}</style>
            <div {...dialogProps}>
                {/* --- PREMIUM BANNER --- */}
                <div>
                    {/* Radial glow top-right */}
                    <div />
                    {/* Noise/wave overlay */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage:
                                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='rgba(255,255,255,0.07)' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E\")",
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'bottom',
                            backgroundSize: 'cover',
                            zIndex: 1,
                            borderRadius: '20px 20px 0 0',
                        }}
                    />

                    {/* Avatar */}
                    <div>
                        <div
                            onMouseEnter={handleAvatarEnter}
                            onMouseLeave={handleAvatarLeave}
                            onClick={handleAvatarClick}
                            role="button"
                            tabIndex={0}
                            aria-label="Change avatar"
                            onKeyDown={(e) =>
                                (e.key === 'Enter' || e.key === ' ') && handleAvatarClick()
                            }
                        >
                            <img
                                src={avatarSrc}
                                key={avatarUrl}
                                alt={`${user.username} avatar`}
                                onError={(e) => {
                                    e.target.src = getDeterministicAvatar(user.username);
                                }}
                            />
                        </div>
                        {/* Online status dot */}
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '3px',
                                right: '3px',
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                backgroundColor: user.is_online ? '#23a559' : '#80848e',
                                border: '3px solid #0b0e1b',
                                zIndex: 1001,
                                boxShadow: user.is_online ? '0 0 8px rgba(35,165,89,0.6)' : 'none',
                            }}
                        />
                    </div>

                    {/* Close button */}
                    <button
                        onClick={handleClose}
                        onMouseEnter={handleCloseBtnEnter}
                        onMouseLeave={handleCloseBtnLeave}
                        aria-label={t('common.close')}
                    >
                        ?
                    </button>
                </div>

                {/* --- USER INFO --- */}
                <div>
                    {/* Username row */}
                    <div>
                        <h2>{user.username}</h2>
                        {user.is_premium && <span title="Premium">⭐ PREMIUM</span>}
                        {user.is_verified && <span title="Doğrulanmış">✓ DOĞRULANMIŞ</span>}
                        <span
                            style={{
                                marginLeft: 'auto',
                                fontSize: '11px',
                                fontWeight: '600',
                                color: user.is_online ? '#23a559' : '#72767d',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                            }}
                        >
                            <span
                                style={{
                                    width: '7px',
                                    height: '7px',
                                    borderRadius: '50%',
                                    backgroundColor: user.is_online ? '#23a559' : '#72767d',
                                    display: 'inline-block',
                                    boxShadow: user.is_online
                                        ? '0 0 6px rgba(35,165,89,0.7)'
                                        : 'none',
                                }}
                            />
                            {user.is_online ? 'Çevrimiçi' : 'Çevrimdışı'}
                        </span>
                    </div>

                    {/* Action buttons */}
                    <div>
                        {!isFriend && !isSelf && (
                            <button
                                onClick={handleAddFriend}
                                style={{
                                    ...styles.actionButton,
                                    backgroundColor:
                                        requestStatus === 'success'
                                            ? 'rgba(35,165,89,0.15)'
                                            : 'rgba(88,101,242,0.15)',
                                    flex: 1,
                                    minWidth: '100px',
                                    cursor:
                                        requestStatus === 'success' || requestStatus === 'loading'
                                            ? 'default'
                                            : 'pointer',
                                }}
                                disabled={requestStatus !== 'idle'}
                                aria-label={
                                    requestStatus === 'success'
                                        ? t('common.friendRequestSent')
                                        : t('common.addFriend')
                                }
                            >
                                {requestStatus === 'loading' ? (
                                    '?'
                                ) : requestStatus === 'success' ? (
                                    <FaCheck />
                                ) : (
                                    <FaUserPlus />
                                )}
                                {requestStatus === 'success' ? 'Gönderildi' : 'Arkadaş Ekle'}
                            </button>
                        )}
                        {!isSelf && (
                            <button onClick={handleStartDM} aria-label={t('common.sendMessage')}>
                                ?? Mesaj
                            </button>
                        )}
                        {!isSelf && (
                            <button
                                onClick={handleSendMoney}
                                title="Coin Gönder"
                                aria-label={t('common.sendCoins')}
                            >
                                <FaCoins />
                            </button>
                        )}
                        {isSelf && (
                            <button
                                onClick={handleOpenSessionManager}
                                title="Aktif Oturumları Yönet"
                                aria-label={t('common.manageSessions')}
                            >
                                <FaDesktop /> Oturumlar
                            </button>
                        )}
                        {!isSelf && (
                            <button
                                onClick={handleOpenNotes}
                                title="Kullanıcı Notu"
                                aria-label={t('common.userNotes')}
                            >
                                <FaStickyNote />
                            </button>
                        )}
                    </div>
                </div>

                {/* Content area */}
                <div>
                    {/* FRIEND CODE */}
                    {user.friend_code && (
                        <div
                            onClick={() => copyToClipboard(user.friend_code, 'Arkadaş Kodu')}
                            style={styles.friendCodeContainer}
                            onMouseEnter={handleFriendCodeEnter}
                            onMouseLeave={handleFriendCodeLeave}
                            title="Kopyalamak için tıkla"
                            role="button"
                            tabIndex={0}
                            aria-label="Copy friend code"
                            onKeyDown={(e) =>
                                (e.key === 'Enter' || e.key === ' ') &&
                                copyToClipboard(user.friend_code, 'Arkadaş Kodu')
                            }
                        >
                            <span style={styles.friendCodeLabel}>Arkadaş Kodu</span>
                            <span style={styles.friendCodeValue}>{user.friend_code}</span>
                        </div>
                    )}

                    {user.status_message && (
                        <div style={styles.section}>
                            <h4 style={styles.sectionTitle}>Durum</h4>
                            <p style={styles.statusText}>{user.status_message}</p>
                        </div>
                    )}

                    {/* Tabs */}
                    <div style={styles.tabsContainer}>
                        <button
                            onClick={handleTabProfile}
                            aria-label={t('profile.profile')}
                            aria-current={activeTab === 'profile' ? 'page' : undefined}
                        >
                            👤 Profil
                        </button>
                        <button
                            onClick={handleTabActivity}
                            aria-label={t('profile.activity')}
                            aria-current={activeTab === 'activity' ? 'page' : undefined}
                        >
                            <FaClock /> Aktivite
                        </button>
                        {!isSelf && (
                            <button
                                onClick={handleTabNotes}
                                aria-label={t('common.notes')}
                                aria-current={activeTab === 'notes' ? 'page' : undefined}
                            >
                                <FaStickyNote /> Not
                            </button>
                        )}
                    </div>

                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <>
                            <AchievementsPanel
                                username={user.username}
                                fetchWithAuth={fetchWithAuth}
                                apiBaseUrl={apiBaseUrl}
                            />

                            {validLinks.length > 0 && (
                                <div style={styles.section}>
                                    <h4 style={styles.sectionTitle}>Bağlantılar</h4>
                                    <div style={styles.linksContainer}>
                                        {validLinks.map(([key, value]) => {
                                            const displayName =
                                                linkDisplayNames[key] ||
                                                key.charAt(0).toUpperCase() + key.slice(1);
                                            const icon = getIconForLink(key);
                                            const isCopyButton =
                                                key === 'steam_friend_code' ||
                                                key === 'steam_trade';

                                            if (isCopyButton) {
                                                return (
                                                    <button
                                                        key={key}
                                                        onClick={() =>
                                                            copyToClipboard(value, displayName)
                                                        }
                                                        style={styles.linkButton}
                                                        title={`Copy: ${value}`}
                                                        aria-label={`${t('common.copy')} ${displayName}`}
                                                    >
                                                        <i className={icon}></i>
                                                        <span style={styles.linkText}>
                                                            {displayName}
                                                        </span>
                                                        <i className="fa fa-copy"></i>
                                                    </button>
                                                );
                                            }
                                            return (
                                                <a
                                                    key={key}
                                                    href={formatUrl(value, key)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={styles.linkButton}
                                                    title={value}
                                                >
                                                    <i className={icon}></i>
                                                    <span style={styles.linkText}>
                                                        {displayName}
                                                    </span>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* Activity Tab */}
                    {activeTab === 'activity' && (
                        <div style={styles.section}>
                            <h4 style={styles.sectionTitle}>Aktivite Zaman Çizelgesi</h4>
                            {presenceHistory.length === 0 ? (
                                <p style={styles.noDataText}>Aktivite verisi bulunamadı</p>
                            ) : (
                                <div style={styles.presenceTimeline}>
                                    {presenceHistory.map((entry, idx) => (
                                        <div key={`item-${idx}`} style={styles.presenceEntry}>
                                            <div
                                                style={{
                                                    ...styles.presenceStatus,
                                                    backgroundColor:
                                                        entry.status === 'online'
                                                            ? '#23a559'
                                                            : entry.status === 'idle'
                                                              ? '#f0b232'
                                                              : entry.status === 'dnd'
                                                                ? '#f23f42'
                                                                : '#80848e',
                                                }}
                                            />
                                            <div style={styles.presenceDetails}>
                                                <span style={styles.presenceStatusText}>
                                                    {entry.status === 'online'
                                                        ? '?? Online'
                                                        : entry.status === 'idle'
                                                          ? '?? Idle'
                                                          : entry.status === 'dnd'
                                                            ? '?? Do Not Disturb'
                                                            : '? Offline'}
                                                </span>
                                                <span style={styles.presenceTime}>
                                                    {new Date(entry.timestamp).toLocaleString(
                                                        'tr-TR',
                                                        {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        }
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* ?? Notes Tab - Inline */}
            {activeTab === 'notes' && !isSelf && (
                <div>
                    <UserNotesModal
                        targetUser={user.username}
                        apiBaseUrl={apiBaseUrl ? apiBaseUrl.replace(/\/api\/?$/, '') + '/api' : ''}
                        fetchWithAuth={fetchWithAuth}
                        onClose={handleCloseInlineNotes}
                        inline={true}
                    />
                </div>
            )}

            {/* ?? Notes Modal (from button) */}
            {showNotes && (
                <UserNotesModal
                    targetUser={user.username}
                    apiBaseUrl={apiBaseUrl ? apiBaseUrl.replace(/\/api\/?$/, '') + '/api' : ''}
                    fetchWithAuth={fetchWithAuth}
                    onClose={handleCloseNotes}
                />
            )}

            {showSessionManager && (
                <SessionManagerModal
                    onClose={handleCloseSessionManager}
                    fetchWithAuth={fetchWithAuth}
                    apiBaseUrl={apiBaseUrl}
                />
            )}
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
};

UserProfileModal.propTypes = {
    user: PropTypes.object,
    onClose: PropTypes.func,
    onStartDM: PropTypes.func,
    onImageClick: PropTypes.func,
    getDeterministicAvatar: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    currentUser: PropTypes.object,
    friendsList: PropTypes.object,
};
export default memo(UserProfileModal);
