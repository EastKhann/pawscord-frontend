// frontend/src/UserProfileModal.js
// Decomposed: styles.js + hooks/useProfileModal.js

import ReactDOM from 'react-dom';
import { useCallback, memo } from 'react';
import { FaUserPlus, FaCheck, FaCoins, FaDesktop, FaClock, FaStickyNote } from 'react-icons/fa';
import { AchievementsPanel } from './components/AchievementBadge';
import SessionManagerModal from './components/SessionManagerModal';
import UserNotesModal from './components/UserNotesModal';
import { styles } from './UserProfileModal/styles';
import { useProfileModal, getIconForLink, formatUrl, linkDisplayNames } from './UserProfileModal/hooks/useProfileModal';
import useModalA11y from './hooks/useModalA11y';

const UserProfileModal = ({ user, onClose, onStartDM, onImageClick, getDeterministicAvatar, fetchWithAuth, apiBaseUrl, currentUser, friendsList }) => {
    const {
        requestStatus, showSessionManager, setShowSessionManager,
        showNotes, setShowNotes, activeTab, setActiveTab,
        presenceHistory, isFriend, isSelf,
        handleAddFriend, copyToClipboard, handleSendMoney, validLinks
    } = useProfileModal({ user, fetchWithAuth, apiBaseUrl, currentUser, friendsList });

    if (!user) return null;

    const rawAvatarUrl = user.avatar || getDeterministicAvatar(user.username);
    // 🔥 FIX: rawAvatarUrl string olmalı
    const avatarUrl = (typeof rawAvatarUrl === 'string' && rawAvatarUrl.startsWith('http'))
        ? rawAvatarUrl
        : (typeof rawAvatarUrl === 'string' ? `${apiBaseUrl}${rawAvatarUrl}` : getDeterministicAvatar(user.username));
    // Cache busting for avatar updates
    const avatarSrc = avatarUrl + (user.avatar && typeof user.avatar === 'string' ? `?t=${Date.now()}` : '');

    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: `${user.username} profili` });

    const handleAvatarEnter = useCallback((e) => e.currentTarget.style.transform = 'scale(1.05)', []);
    const handleAvatarLeave = useCallback((e) => e.currentTarget.style.transform = 'scale(1)', []);
    const handleAvatarClick = useCallback(() => onImageClick(avatarUrl), [onImageClick, avatarUrl]);
    const handleClose = useCallback((e) => { e.preventDefault(); e.stopPropagation(); onClose(); }, [onClose]);
    const handleCloseBtnEnter = useCallback((e) => { e.currentTarget.style.background = 'rgba(240, 71, 71, 0.8)'; e.currentTarget.style.transform = 'scale(1.1)'; }, []);
    const handleCloseBtnLeave = useCallback((e) => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)'; e.currentTarget.style.transform = 'scale(1)'; }, []);
    const handleOpenSessionManager = useCallback(() => setShowSessionManager(true), [setShowSessionManager]);
    const handleStartDM = useCallback(() => onStartDM(user?.username), [onStartDM, user?.username]);
    const handleOpenNotes = useCallback(() => setShowNotes(true), [setShowNotes]);
    const handleFriendCodeEnter = useCallback((e) => e.currentTarget.style.background = 'rgba(88, 101, 242, 0.2)', []);
    const handleFriendCodeLeave = useCallback((e) => e.currentTarget.style.background = 'rgba(88, 101, 242, 0.1)', []);
    const handleTabProfile = useCallback(() => setActiveTab('profile'), [setActiveTab]);
    const handleTabActivity = useCallback(() => setActiveTab('activity'), [setActiveTab]);
    const handleTabNotes = useCallback(() => setActiveTab('notes'), [setActiveTab]);
    const handleCloseInlineNotes = useCallback(() => setActiveTab('profile'), [setActiveTab]);
    const handleCloseNotes = useCallback(() => setShowNotes(false), [setShowNotes]);
    const handleCloseSessionManager = useCallback(() => setShowSessionManager(false), [setShowSessionManager]);

    const modalContent = (
        <div style={{ ...styles.overlay, zIndex: 9999 }} {...overlayProps}>
            <div style={{ ...styles.modal, zIndex: 10000, position: 'relative' }} {...dialogProps}>

                {/* 🎨 MODERN PROFILE BANNER */}
                <div style={{
                    position: 'relative',
                    height: '180px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '16px 16px 0 0',
                    overflow: 'visible' // 🔥 FIX: Avatar'ın görünmesi için overflow:visible
                }}>
                    {/* Banner pattern */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1440 320\'%3E%3Cpath fill=\'rgba(255,255,255,0.1)\' d=\'M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z\'%3E%3C/path%3E%3C/svg%3E")',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'bottom',
                        backgroundSize: 'cover',
                        opacity: 0.3,
                        zIndex: 1,
                        borderRadius: '16px 16px 0 0', // 🔥 Pattern için de border radius
                        overflow: 'hidden'
                    }} />

                    {/* Avatar in banner - Fixed positioning */}
                    <div style={{
                        position: 'absolute',
                        bottom: '-50px', // Adjusted for better visibility
                        left: '32px',
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        border: '5px solid #2f3136',
                        overflow: 'hidden',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                        zIndex: 1000,
                        backgroundColor: '#2f3136' // Background color for loading state
                    }}
                        onMouseEnter={handleAvatarEnter}
                        onMouseLeave={handleAvatarLeave}
                        onClick={handleAvatarClick}
                    >
                        <img
                            src={avatarSrc}
                            key={avatarUrl}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            alt={`${user.username} avatar`}
                            onError={(e) => {
                                console.error('❌ [UserProfileModal] Avatar load failed:', e.target.src);
                                e.target.src = getDeterministicAvatar(user.username);
                            }}
                        />
                    </div>

                    {/* Action buttons in banner */}
                    <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        display: 'flex',
                        gap: '8px',
                        zIndex: 1000 // 🔥 FIX: z-index eklendi
                    }}>
                        {/* Close button */}
                        <button
                            onClick={handleClose}
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                background: 'rgba(0, 0, 0, 0.6)',
                                color: '#fff',
                                fontSize: '20px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease',
                                zIndex: 1001
                            }}
                            onMouseEnter={handleCloseBtnEnter}
                            onMouseLeave={handleCloseBtnLeave}
                        >×</button>
                    </div>
                </div>

                {/* User info section - Adjusted padding for avatar */}
                <div style={{
                    padding: '70px 32px 24px 32px', // Reduced top padding since avatar is higher
                    background: '#2f3136'
                }}>
                    <h2 style={{
                        fontSize: '28px',
                        fontWeight: '700',
                        margin: '0 0 12px 0',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        {user.username}
                        {user.is_premium && <span style={{ fontSize: '20px' }}>💎</span>}
                        {user.is_verified && <span style={{ fontSize: '20px' }}>✅</span>}
                    </h2>

                    {/* Action buttons row */}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                        {/* 🔥 Sadece arkadaş olmayan ve kendisi olmayan kişilerde "Ekle" butonu göster */}
                        {!isFriend && !isSelf && (
                            <button
                                onClick={handleAddFriend}
                                style={{
                                    ...styles.actionButton,
                                    backgroundColor: requestStatus === 'success' ? '#43b581' : '#5865f2',
                                    cursor: requestStatus === 'success' || requestStatus === 'loading' ? 'default' : 'pointer',
                                    flex: 1
                                }}
                                disabled={requestStatus !== 'idle'}
                            >
                                {requestStatus === 'loading' ? '...' : (
                                    requestStatus === 'success' ? <FaCheck /> : <FaUserPlus />
                                )}
                                {requestStatus === 'success' ? ' Gönderildi' : ' Arkadaş Ekle'}
                            </button>
                        )}

                        {/* 🔥 Coin gönderme - kendisi değilse */}
                        {!isSelf && (
                            <button onClick={handleSendMoney} style={{ ...styles.actionButton, backgroundColor: '#f0b232', flex: 1 }}>
                                <FaCoins /> Coin Gönder
                            </button>
                        )}

                        {isSelf && (
                            <button
                                onClick={handleOpenSessionManager}
                                style={{ ...styles.actionButton, backgroundColor: '#43b581', flex: 1 }}
                                title="Aktif Oturumları Yönet"
                            >
                                <FaDesktop /> Oturumlar
                            </button>
                        )}

                        {!isSelf && (
                            <button onClick={handleStartDM} style={{ ...styles.messageButton, flex: 1 }}>
                                💬 Mesaj Gönder
                            </button>
                        )}

                        {!isSelf && (
                            <button
                                onClick={handleOpenNotes}
                                style={{ ...styles.actionButton, backgroundColor: '#faa61a', flex: 0, minWidth: '44px' }}
                                title="Kullanıcı Notu"
                            >
                                <FaStickyNote />
                            </button>
                        )}
                    </div>
                </div>

                {/* Content area */}
                <div style={{
                    ...styles.content,
                    padding: '24px 32px',
                    overflowY: 'auto'
                }}>
                    {/* 🔥 ARKADAŞ KODU BÖLÜMÜ */}
                    {user.friend_code && (
                        <div
                            onClick={() => copyToClipboard(user.friend_code, 'Arkadaş Kodu')}
                            style={{
                                ...styles.friendCodeContainer,
                                background: 'rgba(88, 101, 242, 0.1)',
                                border: '1px solid rgba(88, 101, 242, 0.3)',
                                borderRadius: '8px',
                                padding: '12px 16px',
                                marginBottom: '16px',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={handleFriendCodeEnter}
                            onMouseLeave={handleFriendCodeLeave}
                            title="Kodu Kopyalamak İçin Tıkla"
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

                    {/* 🆕 Tabs */}
                    <div style={styles.tabsContainer}>
                        <button
                            onClick={handleTabProfile}
                            style={{ ...styles.tabButton, ...(activeTab === 'profile' && styles.activeTab) }}
                        >
                            Profile
                        </button>
                        <button
                            onClick={handleTabActivity}
                            style={{ ...styles.tabButton, ...(activeTab === 'activity' && styles.activeTab) }}
                        >
                            <FaClock /> Activity
                        </button>
                        {!isSelf && (
                            <button
                                onClick={handleTabNotes}
                                style={{ ...styles.tabButton, ...(activeTab === 'notes' && styles.activeTab) }}
                            >
                                <FaStickyNote /> Notes
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
                                            const displayName = linkDisplayNames[key] || (key.charAt(0).toUpperCase() + key.slice(1));
                                            const icon = getIconForLink(key);
                                            const isCopyButton = (key === 'steam_friend_code' || key === 'steam_trade');

                                            if (isCopyButton) {
                                                return (
                                                    <button
                                                        key={key}
                                                        onClick={() => copyToClipboard(value, displayName)}
                                                        style={styles.linkButton}
                                                        title={`Kopyala: ${value}`}
                                                    >
                                                        <i className={icon}></i>
                                                        <span style={styles.linkText}>{displayName}</span>
                                                        <i className="fa fa-copy" style={{ marginLeft: 'auto', color: 'var(--text-secondary)' }}></i>
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
                                                    <span style={styles.linkText}>{displayName}</span>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* 🆕 Activity Tab - Presence History */}
                    {activeTab === 'activity' && (
                        <div style={styles.section}>
                            <h4 style={styles.sectionTitle}>Activity Timeline</h4>
                            {presenceHistory.length === 0 ? (
                                <p style={styles.noDataText}>No activity data available</p>
                            ) : (
                                <div style={styles.presenceTimeline}>
                                    {presenceHistory.map((entry, idx) => (
                                        <div key={idx} style={styles.presenceEntry}>
                                            <div style={{
                                                ...styles.presenceStatus,
                                                backgroundColor: entry.status === 'online' ? '#43b581' :
                                                    entry.status === 'idle' ? '#faa61a' :
                                                        entry.status === 'dnd' ? '#f04747' : '#747f8d'
                                            }} />
                                            <div style={styles.presenceDetails}>
                                                <span style={styles.presenceStatusText}>
                                                    {entry.status === 'online' ? '🟢 Online' :
                                                        entry.status === 'idle' ? '🟡 Idle' :
                                                            entry.status === 'dnd' ? '🔴 Do Not Disturb' : '⚫ Offline'}
                                                </span>
                                                <span style={styles.presenceTime}>
                                                    {new Date(entry.timestamp).toLocaleString('tr-TR', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
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

            {/* 📝 Notes Tab - Inline */}
            {activeTab === 'notes' && !isSelf && (
                <div style={{ padding: '0 32px 24px' }}>
                    <UserNotesModal
                        targetUser={user.username}
                        apiBaseUrl={apiBaseUrl ? apiBaseUrl.replace(/\/api\/?$/, '') + '/api' : ''}
                        fetchWithAuth={fetchWithAuth}
                        onClose={handleCloseInlineNotes}
                        inline={true}
                    />
                </div>
            )}

            {/* 📝 Notes Modal (from button) */}
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

export default memo(UserProfileModal);

