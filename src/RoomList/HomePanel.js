// frontend/src/RoomList/HomePanel.js
import React, { useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FaUserFriends, FaRobot, FaChartLine, FaCompass } from '../utils/iconOptimization';
import LazyImage from '../components/shared/LazyImage';
import { styles } from '../styles/SidebarStyles';

const homeStyles = {
    channelsContainer: {
        padding: '0 8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
    },
    channelItem: {
        ...styles.roomItem,
        marginBottom: 0,
    },
    channelIcon: {
        ...styles.hashtagIcon,
        fontSize: '14px',
    },
    discoverSection: {
        padding: '0 8px 8px',
    },
    discoverButton: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '10px 12px',
        borderRadius: '10px',
        border: '1px solid rgba(88, 101, 242, 0.3)',
        background: 'rgba(88, 101, 242, 0.15)',
        color: '#d7dbff',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '600',
    },
    friendsButton: {
        ...styles.addDmButton,
        flexShrink: 0,
    },
    pendingBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '18px',
        height: '18px',
        padding: '0 5px',
        borderRadius: '999px',
        background: 'linear-gradient(135deg, #f23f42, #e03437)',
        color: '#fff',
        fontSize: '10px',
        fontWeight: '700',
        boxShadow: '0 1px 6px rgba(242, 63, 66, 0.4)',
    },
    emptyState: {
        margin: '4px 0 0',
        padding: '12px',
        borderRadius: '10px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.05)',
        color: '#949ba4',
        fontSize: '12px',
        lineHeight: '1.5',
    },
    dmAvatarWrap: {
        position: 'relative',
        marginRight: '10px',
        flexShrink: 0,
    },
    dmMeta: {
        ...styles.userInfo,
        gap: '2px',
    },
    dmName: (hasUnread) => ({
        ...styles.usernameText,
        fontWeight: hasUnread ? '700' : '600',
    }),
    activityText: {
        ...styles.statusText,
        display: 'block',
    },
};

const HomePanel = ({
    conversations,
    currentConversationId,
    currentUsername,
    onRoomSelect,
    onDMSelect,
    onPrefetchChat,
    onFriendsClick,
    pendingFriendRequests,
    safeUnreadCounts,
    onlineUsers,
    allUsers,
    getAvatarUrl,
    setDmContextMenu,
    onDiscoverClick,
    servers,
}) => {
    const hasNoServers = !servers || servers.length === 0;
    const { t } = useTranslation();
    // ?? Prefetch top DM conversations when HomePanel mounts
    useEffect(() => {
        if (!onPrefetchChat || !conversations || conversations.length === 0) return;
        // Prefetch first 4 DM conversations, staggered
        conversations.slice(0, 4).forEach((conv, i) => {
            setTimeout(() => onPrefetchChat('dm', conv.id), i * 150);
        });
    }, [conversations?.length]); // INTENTIONAL: prefetch only depends on conversation count change

    return (
        <div style={styles.topSection}>
            <div style={styles.headerTitle}>{t('nav.home', 'Ana Sayfa')}</div>

            {/* Join Server button — only shown when no servers exist */}
            {onDiscoverClick && hasNoServers && (
                <div style={homeStyles.discoverSection}>
                    <button
                        onClick={onDiscoverClick}
                        aria-label={t('server.joinServer', 'Sunucu Keşfet')}
                        style={homeStyles.discoverButton}
                    >
                        <FaCompass size={16} />
                        {t('server.joinServer', 'Sunucu Keşfet')}
                    </button>
                </div>
            )}

            <div style={homeStyles.channelsContainer}>
                <div
                    style={homeStyles.channelItem}
                    role="button"
                    tabIndex={0}
                    onClick={() => onRoomSelect('ai')}
                    onKeyDown={(e) => e.key === 'Enter' && onRoomSelect('ai')}
                    aria-label={t('home.pawpawChannel', 'PawPaw AI channel')}
                >
                    <div style={styles.channelContent}>
                        <FaRobot style={homeStyles.channelIcon} />
                        <span style={styles.channelNameText}>PawPaw AI</span>
                    </div>
                </div>
                <div
                    style={homeStyles.channelItem}
                    role="button"
                    tabIndex={0}
                    onClick={() => onRoomSelect('sinyal-bot')}
                    onKeyDown={(e) => e.key === 'Enter' && onRoomSelect('sinyal-bot')}
                    aria-label={t('home.signalBotChannel', 'Signal Bot channel')}
                >
                    <div style={styles.channelContent}>
                        <FaChartLine style={homeStyles.channelIcon} />
                        <span style={styles.channelNameText}>
                            {t('home.signalBot', 'Sinyal Bot')}
                        </span>
                    </div>
                </div>
            </div>
            <div style={styles.dmListContainer}>
                <div style={styles.groupHeader}>
                    <span>{t('home.directMessages', 'DOĞRUDAN MESAJLAR')}</span>
                    <button
                        aria-label={t('home.addFriend', 'Arkadaş ekle')}
                        onClick={onFriendsClick}
                        style={homeStyles.friendsButton}
                    >
                        <FaUserFriends /> {t('common.add', 'Ekle')}
                        {pendingFriendRequests > 0 && (
                            <span style={homeStyles.pendingBadge}>
                                {pendingFriendRequests > 9 ? '9+' : pendingFriendRequests}
                            </span>
                        )}
                    </button>
                </div>
                {!conversations || conversations.length === 0 ? (
                    <div style={homeStyles.emptyState}>
                        {t('home.noDMs', 'Henüz doğrudan mesaj yok.')}
                        <br />
                        {t('home.noDMsHint', 'Başlamak için Arkadaş Ekle butonuna tıkla!')}
                    </div>
                ) : (
                    conversations.map((conv) => {
                        const otherUser = conv.participants.find(
                            (p) => p.username !== currentUsername
                        );
                        if (!otherUser) return null;
                        const unread = safeUnreadCounts[`dm-${conv.id}`] || 0;
                        return (
                            <DMItem
                                key={conv.id}
                                conv={conv}
                                otherUser={otherUser}
                                unread={unread}
                                isActive={currentConversationId === conv.id}
                                currentUsername={currentUsername}
                                onDMSelect={onDMSelect}
                                onPrefetchChat={onPrefetchChat}
                                setDmContextMenu={setDmContextMenu}
                                getAvatarUrl={getAvatarUrl}
                                onlineUsers={onlineUsers}
                                allUsers={allUsers}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};

// DM Item sub-component
const DMItem = ({
    conv,
    otherUser,
    unread,
    isActive,
    onDMSelect,
    onPrefetchChat,
    setDmContextMenu,
    getAvatarUrl,
    onlineUsers,
    allUsers,
}) => {
    const isOnline = onlineUsers.includes(otherUser.username);
    const statusColor = isOnline ? '#23a559' : '#80848e';
    const hoverTimerRef = useRef(null);

    // ?? Hover prefetch: 200ms debounce
    const handlePointerEnter = useCallback(() => {
        if (!onPrefetchChat) return;
        hoverTimerRef.current = setTimeout(() => onPrefetchChat('dm', conv.id), 200);
    }, [onPrefetchChat, conv.id]);
    const handlePointerLeave = useCallback(() => {
        if (hoverTimerRef.current) {
            clearTimeout(hoverTimerRef.current);
            hoverTimerRef.current = null;
        }
    }, []);

    return (
        <div
            style={{
                ...styles.dmItem,
                backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                position: 'relative',
            }}
            onClick={() => onDMSelect(conv.id, otherUser.username)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onDMSelect(conv.id, otherUser.username)}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onContextMenu={(e) => {
                e.preventDefault();
                setDmContextMenu({ x: e.clientX, y: e.clientY, conversation: conv });
            }}
            onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                e.currentTarget.style.backgroundColor = 'rgba(88, 101, 242, 0.3)';
            }}
            onDragLeave={(e) => {
                e.preventDefault();
                e.currentTarget.style.backgroundColor = isActive
                    ? 'rgba(255,255,255,0.1)'
                    : 'transparent';
            }}
            onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                e.currentTarget.style.backgroundColor = isActive
                    ? 'rgba(255,255,255,0.1)'
                    : 'transparent';
                const files = e.dataTransfer.files;
                if (files && files.length > 0) {
                    onDMSelect(conv.id, otherUser.username);
                    setTimeout(() => {
                        const fileInput = document.querySelector('input[type="file"]');
                        if (fileInput) {
                            const dt = new DataTransfer();
                            for (let i = 0; i < files.length; i++) dt.items.add(files[i]);
                            fileInput.files = dt.files;
                            fileInput.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                    }, 100);
                    // toast imported in parent, use window event for simplicity
                }
            }}
        >
            <div style={homeStyles.dmAvatarWrap}>
                <LazyImage
                    src={getAvatarUrl(otherUser.avatar, otherUser.username)}
                    alt={otherUser.username}
                    size="small"
                    style={styles.avatarSmall}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: -2,
                        right: -2,
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: statusColor,
                        border: '2px solid #0e1222',
                    }}
                />
            </div>
            <div style={homeStyles.dmMeta}>
                <span style={homeStyles.dmName(unread > 0)}>{otherUser.username}</span>
                <ActivityDisplay otherUser={otherUser} allUsers={allUsers} />
            </div>
            {unread > 0 && <span style={styles.unreadBadge}>{unread}</span>}
        </div>
    );
};

// Activity display sub-component
const ActivityDisplay = ({ otherUser, allUsers }) => {
    const { t } = useTranslation();
    const liveUser = allUsers?.find((u) => u.username === otherUser.username) || otherUser;
    const activity = liveUser.current_activity;
    if (!activity) return null;

    if (activity.steam) {
        return (
            <span style={homeStyles.activityText}>
                Steam:{' '}
                {activity.steam.name || activity.steam.game || t('activity.gaming', 'Gaming')}
            </span>
        );
    }
    if (activity.spotify) {
        return (
            <span style={homeStyles.activityText}>
                Spotify:{' '}
                {activity.spotify.name ||
                    activity.spotify.track ||
                    t('activity.listening', 'Listening')}
            </span>
        );
    }
    if (activity.type === 'listening') {
        return (
            <span style={homeStyles.activityText}>
                {t('activity.listening', 'Listening')}: {activity.name}
            </span>
        );
    }
    if (activity.type === 'playing') {
        return (
            <span style={homeStyles.activityText}>
                {t('activity.playing', 'Playing')}: {activity.name}
            </span>
        );
    }

    return null;
};

HomePanel.propTypes = {
    conversations: PropTypes.array,
    currentConversationId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    currentUsername: PropTypes.string,
    onRoomSelect: PropTypes.func,
    onDMSelect: PropTypes.func,
    onPrefetchChat: PropTypes.func,
    onFriendsClick: PropTypes.func,
    pendingFriendRequests: PropTypes.number,
    safeUnreadCounts: PropTypes.object,
    onlineUsers: PropTypes.array,
    allUsers: PropTypes.array,
    getAvatarUrl: PropTypes.func,
    setDmContextMenu: PropTypes.func,
    onDiscoverClick: PropTypes.func,
    servers: PropTypes.array,
};
export default React.memo(HomePanel);
