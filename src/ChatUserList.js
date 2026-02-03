// frontend/src/ChatUserList.js
import React, { useMemo } from 'react';
import { FaCircle, FaMoon, FaCrown } from 'react-icons/fa';

// 🚫 Oyun olarak gösterilmeyecek uygulamalar (tools, utilities)
const IGNORED_APPS = new Set([
    // FPS & Performance Monitoring
    'fps monitor', 'msi afterburner', 'rivatuner', 'fraps', 'nvidia geforce experience',
    'amd radeon software', 'gpu-z', 'cpu-z', 'hwinfo', 'hwmonitor',

    // Recording & Streaming Tools
    'obs', 'obs studio', 'streamlabs', 'xsplit', 'nvidia shadowplay', 'amd relive',
    'movavi video suite', 'movavi', 'camtasia', 'bandicam', 'action!',

    // Audio Tools
    'soundpad', 'voicemod', 'equalizer apo', 'peace equalizer', 'vb-audio', 'voicemeeter',
    'clownfish', 'morphvox', 'audacity',

    // Overlay & Chat
    'discord overlay', 'teamspeak', 'mumble', 'overwolf', 'razer cortex',

    // Game Launchers
    'steam', 'epic games launcher', 'origin', 'uplay', 'battle.net', 'gog galaxy',
    'ea app', 'xbox app', 'microsoft store',
]);

const isIgnoredApp = (appName) => {
    if (!appName) return false;
    const lower = appName.toLowerCase().trim();
    for (const ignored of IGNORED_APPS) {
        if (lower.includes(ignored) || ignored.includes(lower)) {
            return true;
        }
    }
    return false;
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
    onNavigate
}) => {
    // 🔥 ROOM/SERVER modunda: serverMembers göster
    // 🔥 DM modunda: friendsList göster

    const displayUsers = useMemo(() => {
        // 🔥 SUNUCUDAYSAN veya SUNUCU SEÇİLDİYSE → Sunucu Üyelerini Göster
        if (activeChat.type === 'room' || activeChat.type === 'server') {
            if (serverMembers.length === 0) {
                return [];
            }

            const processed = serverMembers.map(member => {
                // 🔥 FIX: onlineUsers array kontrolü
                const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(member.username);
                const userInfo = allUsers.find(u => u.username === member.username) || {};

                return {
                    username: member.username,
                    display_name: userInfo.display_name || member.username,
                    avatar: userInfo.avatar || getDeterministicAvatar?.(member.username),
                    status: isOnline ? 'online' : 'offline',
                    is_online: isOnline,
                    role: member.role || 'member',
                    current_activity: userInfo.current_activity || {} // 🔥 YENİ: Rich Presence (Spotify/Steam)
                };
            });

            return processed;
        }

        // 🔥 DİĞER DURUMLARDA → Arkadaşları Göster (DM, Welcome, Friends Tab)
        else {
            // Eğer friendsList boşsa ve allUsers varsa, allUsers'tan arkadaşları oluştur
            let friendsToProcess = friendsList;

            if (friendsList.length === 0 && allUsers.length > 1) {
                // currentUser hariç diğer tüm kullanıcılar arkadaş olarak gösterilsin
                friendsToProcess = allUsers.filter(u => u.username !== currentUser);
            }

            if (friendsToProcess.length === 0) {
                return [];
            }

            const friends = friendsToProcess.map(friend => {
                const friendUsername = friend.username || friend;
                // 🔥 FIX: onlineUsers array kontrolü
                const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(friendUsername);
                const userInfo = allUsers.find(u => u.username === friendUsername) || friend;

                return {
                    username: friendUsername,
                    display_name: userInfo.display_name || friendUsername,
                    avatar: userInfo.avatar || getDeterministicAvatar?.(friendUsername),
                    status: isOnline ? 'online' : (userInfo.status || 'offline'),
                    is_online: isOnline,
                    role: 'friend',
                    current_activity: userInfo.current_activity || friend.current_activity
                };
            });

            return friends;
        }
    }, [activeChat.type, serverMembers, friendsList, onlineUsers, allUsers, getDeterministicAvatar, currentUser]);

    // 🔥 Online ve Offline'a ayır
    const { onlineList, offlineList } = useMemo(() => {
        const online = displayUsers.filter(u => u.is_online);
        const offline = displayUsers.filter(u => !u.is_online);

        // Alfabetik sırala
        online.sort((a, b) => a.username.localeCompare(b.username));
        offline.sort((a, b) => a.username.localeCompare(b.username));

        return { onlineList: online, offlineList: offline };
    }, [displayUsers]);

    const totalCount = displayUsers.length;
    const onlineCount = onlineList.length;

    return (
        <div style={styles.container}>
            {/* HEADER */}
            <div style={styles.header}>
                <span style={styles.headerTitle}>
                    {(activeChat.type === 'room' || activeChat.type === 'server') ? 'Sunucu Üyeleri' : 'Arkadaşlar'}
                </span>
                <span style={styles.headerCount}>
                    {onlineCount} / {totalCount}
                </span>
            </div>

            {/* USER LIST */}
            <div style={styles.userList}>
                {totalCount === 0 ? (
                    <div style={styles.emptyState}>
                        <FaCircle size={24} color="#43b581" style={{ opacity: 0.3 }} />
                        <p style={{ color: '#b9bbbe', fontSize: '13px', marginTop: '8px' }}>
                            {(activeChat.type === 'room' || activeChat.type === 'server')
                                ? 'Bu sunucuda kimse yok'
                                : 'Arkadaş listesi boş. Arkadaş ekle!'}
                        </p>
                    </div>
                ) : (
                    <>
                        {/* ONLINE SECTION */}
                        {onlineList.length > 0 && (
                            <>
                                <div style={styles.sectionHeader}>
                                    <FaCircle size={8} color="#43b581" />
                                    <span style={styles.sectionTitle}>
                                        Çevrimiçi — {onlineList.length}
                                    </span>
                                </div>
                                {onlineList.map(user => (
                                    <UserItem
                                        key={user.username}
                                        user={user}
                                        isCurrentUser={user.username === currentUser}
                                        onClick={(e) => {
                                            // Sol tık yapınca profil aç
                                            if (onUserClick) {
                                                onUserClick(user.username);
                                            }
                                        }}
                                        onContextMenu={(e) => {
                                            // Sağ tık yapınca context menu aç
                                            e.preventDefault();
                                            onUserContextMenu?.(e, user.username);
                                        }}
                                    />
                                ))}
                            </>
                        )}

                        {/* OFFLINE SECTION */}
                        {offlineList.length > 0 && (
                            <>
                                <div style={{ ...styles.sectionHeader, marginTop: onlineList.length > 0 ? '16px' : '0' }}>
                                    <FaMoon size={8} color="#747f8d" />
                                    <span style={styles.sectionTitle}>
                                        Çevrimdışı — {offlineList.length}
                                    </span>
                                </div>
                                {offlineList.map(user => (
                                    <UserItem
                                        key={user.username}
                                        user={user}
                                        isCurrentUser={user.username === currentUser}
                                        onClick={(e) => {
                                            // Sol tık yapınca profil aç
                                            if (onUserClick) {
                                                onUserClick(user.username);
                                            }
                                        }}
                                        onContextMenu={(e) => {
                                            // Sağ tık yapınca context menu aç
                                            e.preventDefault();
                                            onUserContextMenu?.(e, user.username);
                                        }}
                                    />
                                ))}
                            </>
                        )}
                    </>
                )}
            </div>

            {/* HIZLI ERİŞİM BUTONLARI - Sadece whitelist kullanıcılar görebilir */}
            {(() => {
                console.log('🔍 [ChatUserList] currentUserProfile:', currentUserProfile);
                console.log('🔍 [ChatUserList] is_whitelisted:', currentUserProfile?.is_whitelisted);
                return currentUserProfile?.is_whitelisted;
            })() && (
                    <div style={styles.quickAccessSection}>
                        <div style={styles.quickAccessHeader}>
                            HIZLI ERİŞİM
                        </div>

                        {/* English Learn Butonu */}
                        <button
                            onClick={() => window.location.hash = '#/eng-learn'}
                            style={styles.quickAccessButton}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(88, 101, 242, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(88, 101, 242, 0.3)';
                            }}
                        >
                            <span style={{ fontSize: '18px' }}>📚</span>
                            <span>English Learn</span>
                        </button>

                        {/* Crypto Analysis Butonu */}
                        <button
                            onClick={() => window.location.hash = '#/crypto-analysis'}
                            style={{
                                ...styles.quickAccessButton,
                                background: 'linear-gradient(135deg, #F39C12 0%, #E67E22 100%)',
                                boxShadow: '0 2px 8px rgba(243, 156, 18, 0.3)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(243, 156, 18, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(243, 156, 18, 0.3)';
                            }}
                        >
                            <span style={{ fontSize: '18px' }}>📊</span>
                            <span>Crypto Signals</span>
                        </button>

                        {/* PAWSCORD Logo */}
                        <div style={styles.pawscordLogo}>
                            <div style={{ fontSize: '24px', marginBottom: '4px' }}>🐾</div>
                            <div style={{ fontWeight: 'bold', color: '#5865f2', fontSize: '14px' }}>PAWSCORD</div>
                            <div style={{ fontSize: '11px', color: '#b9bbbe', opacity: 0.7, marginTop: '2px' }}>v1.1.133</div>
                        </div>
                    </div>
                )}
        </div>
    );
};

// 👤 USER ITEM COMPONENT
const UserItem = ({ user, isCurrentUser, onClick, onContextMenu }) => {
    const statusColor = user.is_online ? '#43b581' : '#747f8d';
    const isOwner = user.role === 'owner';
    const isModerator = user.role === 'moderator' || user.role === 'mod';

    return (
        <div
            style={{
                ...styles.userItem,
                opacity: user.is_online ? 1 : 0.5,
                backgroundColor: isCurrentUser ? 'rgba(88, 101, 242, 0.1)' : 'transparent'
            }}
            onClick={onClick}
            onContextMenu={onContextMenu}
        >
            {/* AVATAR */}
            <div style={styles.avatarContainer}>
                <img
                    src={user.avatar}
                    alt={user.username}
                    style={styles.avatar}
                />
                <div style={{ ...styles.statusDot, backgroundColor: statusColor }} />
            </div>

            {/* USERNAME */}
            <div style={styles.userInfo}>
                <div style={styles.usernameRow}>
                    <span style={{
                        ...styles.username,
                        color: isCurrentUser ? '#5865f2' : (user.is_online ? '#ffffff' : '#b9bbbe')
                    }}>
                        {user.display_name || user.username}
                    </span>
                    {isOwner && <FaCrown size={12} color="#faa61a" title="Sunucu Sahibi" />}
                    {isModerator && <FaCrown size={12} color="#5865f2" title="Moderatör" />}
                </div>
                {user.custom_status && (
                    <span style={styles.customStatus}>
                        {user.custom_status}
                    </span>
                )}
                {/* 🎵 Rich Presence: Spotify Activity */}
                {user.current_activity?.spotify && (
                    <div style={styles.activityRow}>
                        <span style={{ fontSize: '10px' }}>🎵</span>
                        <span style={{
                            fontSize: '10px',
                            color: '#1db954',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            flex: 1
                        }}>
                            {user.current_activity.spotify.track || user.current_activity.spotify.name}
                        </span>
                    </div>
                )}
                {/* 🎮 Rich Presence: Steam Activity */}
                {user.current_activity?.steam && !isIgnoredApp(user.current_activity.steam.game || user.current_activity.steam.name) && (
                    <div style={styles.activityRow}>
                        <span style={{ fontSize: '10px' }}>🎮</span>
                        <span style={{
                            fontSize: '10px',
                            color: '#66c0f4',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            flex: 1
                        }}>
                            {user.current_activity.steam.game || user.current_activity.steam.name}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

// 🎨 STYLES
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'transparent',
        overflowY: 'auto'
    },
    emptyState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 16px 8px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        flexShrink: 0
    },
    headerTitle: {
        fontSize: '12px',
        fontWeight: '600',
        color: '#b9bbbe',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    headerCount: {
        fontSize: '11px',
        color: '#72767d',
        fontWeight: '500'
    },
    userList: {
        padding: '8px',
        overflowY: 'auto',
        flex: 1
    },
    sectionHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 8px 4px 8px',
        marginBottom: '4px'
    },
    sectionTitle: {
        fontSize: '11px',
        fontWeight: '600',
        color: '#b9bbbe',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    userItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        marginBottom: '2px'
    },
    avatarContainer: {
        position: 'relative',
        flexShrink: 0
    },
    avatar: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        objectFit: 'cover'
    },
    statusDot: {
        position: 'absolute',
        bottom: '-2px',
        right: '-2px',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        border: '2px solid rgba(30, 31, 34, 1)'
    },
    userInfo: {
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
    },
    usernameRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
    },
    username: {
        fontSize: '14px',
        fontWeight: '500',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    customStatus: {
        fontSize: '12px',
        color: '#b9bbbe',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    activityRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        marginTop: '2px',
        overflow: 'hidden'
    },
    quickAccessSection: {
        padding: '16px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    quickAccessHeader: {
        fontSize: '11px',
        fontWeight: '600',
        color: '#b9bbbe',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: '4px'
    },
    quickAccessButton: {
        width: '100%',
        padding: '12px',
        background: 'linear-gradient(135deg, #5865F2 0%, #4752C4 100%)',
        border: 'none',
        borderRadius: '6px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '14px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: '0 2px 8px rgba(88, 101, 242, 0.3)'
    },
    pawscordLogo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '8px',
        padding: '12px',
        borderRadius: '8px',
        background: 'rgba(255, 255, 255, 0.02)'
    }
};

// Hover effect (CSS-in-JS alternative)
if (typeof window !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .user-item:hover {
            background-color: rgba(79, 84, 92, 0.3) !important;
        }
    `;
    document.head.appendChild(styleSheet);
}

// ⚡ OPTIMIZATION: React.memo ile gereksiz re-render'ları önle
export default React.memo(ChatUserList);



