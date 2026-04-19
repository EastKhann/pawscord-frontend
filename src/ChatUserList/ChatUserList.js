// frontend/src/ChatUserList.js
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaCircle, FaMoon } from 'react-icons/fa';
import { styles } from './chatUserListStyles';
import UserItem from './UserItem';

// -- dynamic style helpers (pass 2) --
// -- extracted inline style constants --

const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.1.229';
const _st1006 = {
    ...styles.quickAccessButton,
    background: 'linear-gradient(135deg, #f39c12 0%, #d68910 100%)',
    boxShadow: '0 4px 0 #b7770d, 0 8px 20px rgba(243,156,18,0.35)',
};

const ChatUserList = ({
    chatUsers = [],
    allUsers = [],
    onlineUsers = [],
    currentUser,
    currentUserProfile,
    getDeterministicAvatar,
    onUserClick,
    onUserContextMenu,
    activeChat = {},
    serverMembers = [],
    friendsList = [],
    onNavigate,
    isLoading = false,
    error = null,
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const displayUsers = useMemo(() => {
        if (
            activeChat.type === 'room' ||
            activeChat.type === 'server' ||
            activeChat.type === 'voice'
        ) {
            if (serverMembers.length === 0) return [];
            return serverMembers.map((member) => {
                const isOnline =
                    Array.isArray(onlineUsers) && onlineUsers.includes(member.username);
                const userInfo = allUsers.find((u) => u.username === member.username) || {};
                return {
                    username: member.username,
                    display_name: userInfo.display_name || member.username,
                    avatar:
                        userInfo.avatar ||
                        member.avatar ||
                        getDeterministicAvatar?.(member.username),
                    status: isOnline ? 'online' : 'offline',
                    is_online: isOnline,
                    role: member.role || 'member',
                    current_activity: userInfo.current_activity || member.current_activity || {},
                };
            });
        } else {
            let friendsToProcess = friendsList;
            if (friendsList.length === 0 && allUsers.length > 1) {
                friendsToProcess = allUsers.filter((u) => u.username !== currentUser);
            }
            if (friendsToProcess.length === 0) return [];
            return friendsToProcess.map((friend) => {
                const friendUsername = friend.username || friend;
                const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(friendUsername);
                const userInfo = allUsers.find((u) => u.username === friendUsername) || friend;
                return {
                    username: friendUsername,
                    display_name: userInfo.display_name || friendUsername,
                    avatar:
                        userInfo.avatar ||
                        friend.avatar ||
                        getDeterministicAvatar?.(friendUsername),
                    status: isOnline ? 'online' : userInfo.status || 'offline',
                    is_online: isOnline,
                    role: 'friend',
                    current_activity: userInfo.current_activity || friend.current_activity,
                };
            });
        }
    }, [
        activeChat.type,
        serverMembers,
        friendsList,
        onlineUsers,
        allUsers,
        getDeterministicAvatar,
        currentUser,
    ]);

    const { onlineList, offlineList } = useMemo(() => {
        const online = displayUsers.filter((u) => u.is_online);
        const offline = displayUsers.filter((u) => !u.is_online);
        online.sort((a, b) => a.username.localeCompare(b.username));
        offline.sort((a, b) => a.username.localeCompare(b.username));
        return { onlineList: online, offlineList: offline };
    }, [displayUsers]);

    const totalCount = displayUsers.length;
    const onlineCount = onlineList.length;
    const isServer =
        activeChat.type === 'room' || activeChat.type === 'server' || activeChat.type === 'voice';

    const renderUserList = (users) =>
        users.map((user) => (
            <UserItem
                key={user.username}
                user={user}
                isCurrentUser={user.username === currentUser}
                onClick={() => onUserClick?.(user.username)}
                onContextMenu={(e) => {
                    e.preventDefault();
                    onUserContextMenu?.(e, user.username);
                }}
            />
        ));

    if (isLoading)
        return (
            <div style={styles.container}>
                <div>{t('common.loading', 'Yükleniyor...')}</div>
            </div>
        );
    if (error)
        return (
            <div style={styles.container}>
                <div role="alert">{error}</div>
            </div>
        );

    return (
        <div style={styles.container}>
            {/* HEADER */}
            <div style={styles.header}>
                <span style={styles.headerTitle}>
                    {isServer ? t('chat.serverMembers') : t('chat.friends')}
                </span>
                <span style={styles.headerCount}>
                    {onlineCount} / {totalCount}
                </span>
            </div>

            {/* USER LIST */}
            <div
                style={styles.userList}
                role="list"
                aria-label={isServer ? t('chat.serverMembers') : t('chat.friendList')}
            >
                {totalCount === 0 ? (
                    <div style={styles.emptyState}>
                        <FaCircle size={24} color="#23a559" />
                        <p>{isServer ? t('chat.emptyServer') : t('chat.emptyFriends')}</p>
                    </div>
                ) : (
                    <>
                        {onlineList.length > 0 && (
                            <>
                                <div style={styles.sectionHeader}>
                                    <FaCircle size={8} color="#23a559" />
                                    <span style={styles.sectionTitle}>
                                        {t('chat.online', 'Çevrimiçi')} — {onlineList.length}
                                    </span>
                                </div>
                                {renderUserList(onlineList)}
                            </>
                        )}

                        {offlineList.length > 0 && (
                            <>
                                <div
                                    style={{
                                        ...styles.sectionHeader,
                                        marginTop: onlineList.length > 0 ? '16px' : '0',
                                    }}
                                >
                                    <FaMoon size={8} color="#80848e" />
                                    <span style={styles.sectionTitle}>
                                        {t('chat.offline', 'Çevrimdışı')} — {offlineList.length}
                                    </span>
                                </div>
                                {renderUserList(offlineList)}
                            </>
                        )}
                    </>
                )}
            </div>

            {/* QUICK ACCESS & LOGO */}
            <div style={styles.quickAccessSection}>
                {currentUserProfile?.is_whitelistd && (
                    <>
                        <div style={styles.quickAccessHeader}>
                            {t('chat.quickAccess', 'HİZLI ERİŞİM')}
                        </div>
                        <button
                            onClick={() => navigate('/eng-learn')}
                            style={styles.quickAccessButton}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow =
                                    '0 4px 12px rgba(88, 101, 242, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow =
                                    '0 2px 8px rgba(88, 101, 242, 0.3)';
                            }}
                        >
                            <span>📚</span>
                            <span>📚 {t('chat.learnEnglish', 'İngilizce Öğren')}</span>
                        </button>
                        <button
                            onClick={() => navigate('/crypto-analysis')}
                            style={_st1006}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow =
                                    '0 4px 12px rgba(243, 156, 18, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow =
                                    '0 2px 8px rgba(243, 156, 18, 0.3)';
                            }}
                        >
                            <span>📊</span>
                            <span>📊 {t('crypto.title', 'Kripto Sinyalleri')}</span>
                        </button>
                    </>
                )}
                <div style={styles.pawscordLogo}>
                    <div>🐾</div>
                    <div>PAWSCORD</div>
                    <div>v{APP_VERSION}</div>
                </div>
            </div>
        </div>
    );
};

ChatUserList.propTypes = {
    chatUsers: PropTypes.array,
    allUsers: PropTypes.array,
    onlineUsers: PropTypes.array,
    currentUser: PropTypes.string,
    currentUserProfile: PropTypes.object,
    getDeterministicAvatar: PropTypes.func,
    onUserClick: PropTypes.func,
    onUserContextMenu: PropTypes.func,
    activeChat: PropTypes.object,
};
export default React.memo(ChatUserList);
