// frontend/src/ChatUserList.js (TAM KOD)

import React, { useMemo } from 'react';

const ChatUserList = ({ 
    chatUsers, onUserClick, currentUser, onlineUsers, allUsers, 
    hasFetchedAllUsers, activeChannelName, getDeterministicAvatar
}) => {

    const isUserInChat = (username) => chatUsers && chatUsers.includes(username);
    const chatLabel = activeChannelName ? activeChannelName.toUpperCase() : 'CHAT';

    const { onlineUsersList, offlineUsersList } = useMemo(() => {
        const currentOnlineUsers = Array.isArray(onlineUsers) ? onlineUsers : [];
        const allUniqueUsernames = new Set([
            ...(Array.isArray(allUsers) ? allUsers.map(u => u.username) : []), 
            ...currentOnlineUsers,
            currentUser
        ]);
        
        const online = [];
        const offline = [];

        allUniqueUsernames.forEach(username => {
            if (!username) return;
            if (currentOnlineUsers.includes(username)) {
                if (!online.includes(username)) online.push(username);
            } else {
                if (!offline.includes(username)) offline.push(username);
            }
        });

        online.sort((a, b) => {
            if (a === currentUser) return -1;
            if (b === currentUser) return 1;
            return a.localeCompare(b);
        });
        offline.sort((a, b) => a.localeCompare(b));
        return { onlineUsersList: online, offlineUsersList: offline };
    }, [allUsers, onlineUsers, currentUser]);

    const renderUserSection = (title, userList, isOnlineSection) => {
        const displayCount = isOnlineSection 
            ? userList.filter(u => u !== currentUser).length 
            : userList.length;

        let emptyMessage = "";
        if (!hasFetchedAllUsers && isOnlineSection) {
            emptyMessage = "Kullanıcı listesi yükleniyor...";
        } else if (userList.length === 0) {
            emptyMessage = isOnlineSection ? "Kimse online değil." : "Çevrimdışı kullanıcı yok.";
        } else if (isOnlineSection && userList.length === 1 && userList[0] === currentUser) {
            emptyMessage = "Sizden başka online olan kimse yok.";
        }

        return (
            <div style={styles.sectionContainer}>
                <h3 style={styles.header}>{title} ({displayCount < 0 ? 0 : displayCount})</h3>
                {emptyMessage ? (
                    <p style={styles.noUserText}>{emptyMessage}</p>
                ) : (
                    <ul style={styles.userList}>
                        {userList.map(username => {
                            const userProfile = allUsers.find(u => u.username === username);
                            const avatarUrl = userProfile?.avatar || getDeterministicAvatar(username);
                            const statusMessage = userProfile?.status_message;

                            return (
                                <li 
                                    key={username} 
                                    style={{ ...styles.userItem, cursor: username !== currentUser ? 'pointer' : 'default' }}
                                    onClick={() => username !== currentUser && onUserClick(username)}
                                    title={username !== currentUser ? `${username} ile özel mesaj başlat` : ''}
                                >
                                    <div style={styles.avatarWrapper}>
                                        <img src={avatarUrl} style={styles.avatar} alt={`${username} avatar`} />
                                        <span style={{...styles.onlineIndicator, backgroundColor: isOnlineSection ? '#43b581' : 'transparent'}}></span>
                                    </div>
                                    <div style={styles.userInfo}>
                                        <span style={{opacity: isOnlineSection ? 1 : 0.7}}>
                                            {username} {username === currentUser ? '(Siz)' : ''}
                                        </span>
                                        {statusMessage && (
                                            <span style={styles.statusText}>{statusMessage}</span>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        );
    };

    return (
        <div style={styles.container}>
            {renderUserSection("Online", onlineUsersList, true)}
            {renderUserSection("Offline", offlineUsersList, false)}
        </div>
    );
};

const styles = {
    container: { width: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1, },
    sectionContainer: { marginBottom: '20px' },
    header: { paddingBottom: '10px', borderBottom: '1px solid #444', marginBottom: '10px', color: '#99aab5', fontSize: '1em', fontWeight: 'bold', textTransform: 'uppercase', marginTop: 0 },
    userList: { listStyle: 'none', padding: 0, margin: 0 },
    userItem: { padding: '5px 0', transition: 'background-color 0.2s', display: 'flex', alignItems: 'center', borderRadius: '4px' },
    avatarWrapper: { position: 'relative', marginRight: '10px', flexShrink: 0 },
    avatar: { width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' },
    onlineIndicator: { width: '10px', height: '10px', borderRadius: '50%', border: '2px solid #2f3136', position: 'absolute', bottom: -2, right: -2 },
    userInfo: { display: 'flex', flexDirection: 'column', overflow: 'hidden', color: '#dcddde' },
    statusText: { fontSize: '0.75em', color: '#b9bbbe', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
    noUserText: { color: '#99aab5', fontStyle: 'italic' }
};

export default ChatUserList;