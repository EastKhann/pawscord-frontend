// frontend/src/RoomList/HomePanel.js
import React, { useCallback, useRef, useEffect } from 'react';
import { FaUserFriends, FaRobot, FaChartLine, FaCompass } from '../utils/iconOptimization';
import LazyImage from '../components/LazyImage';
import { styles } from '../SidebarStyles';

const HomePanel = ({
    conversations, currentConversationId, currentUsername,
    onRoomSelect, onDMSelect, onPrefetchChat, onFriendsClick, pendingFriendRequests,
    safeUnreadCounts, onlineUsers, allUsers,
    getAvatarUrl, setDmContextMenu, onDiscoverClick, servers
}) => {
    const hasNoServers = !servers || servers.length === 0;
    // 🚀 Prefetch top DM conversations when HomePanel mounts
    useEffect(() => {
        if (!onPrefetchChat || !conversations || conversations.length === 0) return;
        // Prefetch first 4 DM conversations, staggered
        conversations.slice(0, 4).forEach((conv, i) => {
            setTimeout(() => onPrefetchChat('dm', conv.id), i * 150);
        });
    }, [conversations?.length]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div style={styles.topSection}>
            <div style={styles.headerTitle}>Ana Sayfa</div>

            {/* Sunucuya Katıl / Keşfet butonu — sadece hiç sunucu yoksa göster */}
            {onDiscoverClick && hasNoServers && (
                <button
                    onClick={onDiscoverClick}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        width: 'calc(100% - 24px)', margin: '8px 12px 4px',
                        padding: '10px 14px', borderRadius: '6px', border: 'none',
                        background: 'linear-gradient(135deg, #23a559 0%, #1a7a40 100%)',
                        color: 'white', fontSize: '13px', fontWeight: '600',
                        cursor: 'pointer', textAlign: 'left',
                    }}
                    aria-label="Sunucuya Katıl"
                >
                    <FaCompass size={16} />
                    Sunucuya Katıl
                </button>
            )}

            <div style={styles.channelsContainer}>
                <div style={{ ...styles.roomItem, marginBottom: 5 }} role="button" tabIndex={0} onClick={() => onRoomSelect('ai')} onKeyDown={e => e.key === 'Enter' && onRoomSelect('ai')} aria-label="PawPaw AI kanalı">
                    <div style={styles.channelContent}><FaRobot style={{ marginRight: 8 }} /> <span>PawPaw AI</span></div>
                </div>
                <div style={{ ...styles.roomItem, marginBottom: 15 }} role="button" tabIndex={0} onClick={() => onRoomSelect('sinyal-bot')} onKeyDown={e => e.key === 'Enter' && onRoomSelect('sinyal-bot')} aria-label="Sinyal Bot kanalı">
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
                                backgroundColor: '#f23f42', color: 'white', borderRadius: '50%',
                                width: '18px', height: '18px', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                fontSize: '11px', fontWeight: 'bold',
                                border: '2px solid #0e1222', zIndex: 1
                            }}>
                                {pendingFriendRequests > 9 ? '9+' : pendingFriendRequests}
                            </div>
                        )}
                    </button>
                </div>
                {!conversations || conversations.length === 0 ? (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#949ba4', fontSize: '0.9em' }}>
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
    conv, otherUser, unread, isActive, currentUsername,
    onDMSelect, onPrefetchChat, setDmContextMenu, getAvatarUrl, onlineUsers, allUsers
}) => {
    const isOnline = onlineUsers.includes(otherUser.username);
    const statusColor = isOnline ? '#23a559' : '#80848e';
    const hoverTimerRef = useRef(null);

    // 🚀 Hover prefetch: 200ms debounce
    const handlePointerEnter = useCallback(() => {
        if (!onPrefetchChat) return;
        hoverTimerRef.current = setTimeout(() => onPrefetchChat('dm', conv.id), 200);
    }, [onPrefetchChat, conv.id]);
    const handlePointerLeave = useCallback(() => {
        if (hoverTimerRef.current) { clearTimeout(hoverTimerRef.current); hoverTimerRef.current = null; }
    }, []);

    return (
        <div
            style={{
                ...styles.dmItem,
                backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                position: 'relative'
            }}
            onClick={() => onDMSelect(conv.id, otherUser.username)}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
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
                    borderRadius: '50%', backgroundColor: statusColor, border: '2px solid #0e1222'
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
