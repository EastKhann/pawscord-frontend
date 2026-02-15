// frontend/src/RoomList/HomePanel.js
import React from 'react';
import { FaUserFriends, FaRobot, FaChartLine } from '../utils/iconOptimization';
import LazyImage from '../components/LazyImage';
import { styles } from '../SidebarStyles';

const HomePanel = ({
    conversations, currentConversationId, currentUsername,
    onRoomSelect, onDMSelect, onFriendsClick, pendingFriendRequests,
    safeUnreadCounts, onlineUsers, allUsers,
    getAvatarUrl, setDmContextMenu
}) => {
    return (
        <div style={styles.topSection}>
            <div style={styles.headerTitle}>Ana Sayfa</div>
            <div style={styles.channelsContainer}>
                <div style={{ ...styles.roomItem, marginBottom: 5 }} onClick={() => onRoomSelect('ai')}>
                    <div style={styles.channelContent}><FaRobot style={{ marginRight: 8 }} /> <span>PawPaw AI</span></div>
                </div>
                <div style={{ ...styles.roomItem, marginBottom: 15 }} onClick={() => onRoomSelect('sinyal-bot')}>
                    <div style={styles.channelContent}><FaChartLine style={{ marginRight: 8 }} /> <span>Sinyal Bot</span></div>
                </div>
            </div>
            <div style={styles.dmListContainer}>
                <div style={styles.groupHeader}>
                    <span>ÖZEL MESAJLAR</span>
                    <button onClick={onFriendsClick} style={{ ...styles.addDmButton, position: 'relative' }}>
                        <FaUserFriends /> Ekle
                        {pendingFriendRequests > 0 && (
                            <div style={{
                                position: 'absolute', top: '-6px', right: '-6px',
                                backgroundColor: '#ed4245', color: 'white', borderRadius: '50%',
                                width: '18px', height: '18px', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                fontSize: '11px', fontWeight: 'bold',
                                border: '2px solid #2b2d31', zIndex: 1
                            }}>
                                {pendingFriendRequests > 9 ? '9+' : pendingFriendRequests}
                            </div>
                        )}
                    </button>
                </div>
                {!conversations || conversations.length === 0 ? (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#72767d', fontSize: '0.9em' }}>
                        Henüz özel mesaj yok.<br />Arkadaş ekle butonuna tıklayarak başla!
                    </div>
                ) : (
                    conversations.map(conv => {
                        const otherUser = conv.participants.find(p => p.username !== currentUsername);
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
    conv, otherUser, unread, isActive, currentUsername,
    onDMSelect, setDmContextMenu, getAvatarUrl, onlineUsers, allUsers
}) => {
    const isOnline = onlineUsers.includes(otherUser.username);
    const statusColor = isOnline ? '#23a559' : '#80848e';

    return (
        <div
            style={{
                ...styles.dmItem,
                backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                position: 'relative'
            }}
            onClick={() => onDMSelect(conv.id, otherUser.username)}
            onContextMenu={(e) => {
                e.preventDefault();
                setDmContextMenu({ x: e.clientX, y: e.clientY, conversation: conv });
            }}
            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); e.currentTarget.style.backgroundColor = 'rgba(88, 101, 242, 0.3)'; }}
            onDragLeave={(e) => { e.preventDefault(); e.currentTarget.style.backgroundColor = isActive ? 'rgba(255,255,255,0.1)' : 'transparent'; }}
            onDrop={(e) => {
                e.preventDefault(); e.stopPropagation();
                e.currentTarget.style.backgroundColor = isActive ? 'rgba(255,255,255,0.1)' : 'transparent';
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
            <div style={{ position: 'relative', width: 32, height: 32 }}>
                <LazyImage src={getAvatarUrl(otherUser.avatar, otherUser.username)} style={{ ...styles.avatarSmall, width: 32, height: 32 }} alt="" />
                <div style={{
                    position: 'absolute', bottom: -2, right: -2, width: 12, height: 12,
                    borderRadius: '50%', backgroundColor: statusColor, border: '2px solid #2b2d31'
                }} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: 8, overflow: 'hidden' }}>
                <span style={{ fontWeight: unread ? 'bold' : 'normal', color: '#dbdee1' }}>{otherUser.username}</span>
                <ActivityDisplay otherUser={otherUser} allUsers={allUsers} />
            </div>
            {unread > 0 && <span style={styles.unreadBadge}>{unread}</span>}
        </div>
    );
};

// Activity display sub-component
const ActivityDisplay = ({ otherUser, allUsers }) => {
    const liveUser = allUsers?.find(u => u.username === otherUser.username) || otherUser;
    const activity = liveUser.current_activity;
    if (!activity) return null;

    const els = [];
    if (activity.steam) {
        els.push(<span key="steam" style={{ fontSize: '10px', color: '#66c0f4', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>🎮 {activity.steam.name}</span>);
    }
    if (activity.spotify) {
        els.push(<span key="spotify" style={{ fontSize: '10px', color: '#1db954', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>🎵 {activity.spotify.name}</span>);
    }
    if (els.length === 0) {
        if (activity.type === 'listening') {
            els.push(<span key="leg-sp" style={{ fontSize: '10px', color: '#1db954', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>🎵 {activity.name}</span>);
        } else if (activity.type === 'playing') {
            els.push(<span key="leg-st" style={{ fontSize: '10px', color: '#66c0f4', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>🎮 {activity.name}</span>);
        }
    }
    return <>{els}</>;
};

export default React.memo(HomePanel);
