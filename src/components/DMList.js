import React from 'react';
import { styles } from '../SidebarStyles'; // Stilleri buradan çekiyoruz

const DMList = ({ conversations, currentUsername, currentConversationId, unreadCounts, onlineUsers, getDeterministicAvatar, onDMSelect, setIsLeftSidebarVisible, handleDMItemClick, handleDrop, dropTarget, setDropTarget, isDragging, onHideConversation, absoluteHostUrl }) => {

    const isUserOnline = (username) => Array.isArray(onlineUsers) && onlineUsers.includes(username);
    const childDragShieldStyle = isDragging ? { pointerEvents: 'none' } : {};

    // 🔧 FIX: Avatar URL'ini tam hale getir
    const getFullAvatarUrl = (avatar, username) => {
        if (!avatar) return getDeterministicAvatar(username);
        if (avatar.startsWith('http') || avatar.startsWith('blob:') || avatar.startsWith('data:')) {
            return avatar;
        }
        // Relatif URL'i tam URL'e çevir
        const baseUrl = absoluteHostUrl || window.location.origin;
        return `${baseUrl.replace(/\/$/, '')}/${avatar.replace(/^\//, '')}`;
    };

    return (
        <div style={styles.dmListContainer}>
            <h3 style={{ ...styles.groupHeader, paddingLeft: '18px' }}>ÖZEL MESAJLAR</h3>
            {conversations && conversations.map((conv) => {
                const otherUser = conv.participants.find(p => p.username !== currentUsername);
                if (!otherUser) return null;
                const targetUsername = otherUser.username;
                const avatarUrl = getFullAvatarUrl(otherUser.avatar, targetUsername);
                const isActive = currentConversationId === conv.id;
                const unread = unreadCounts[`dm-${conv.id}`] || 0;
                const isOnline = isUserOnline(targetUsername);
                const isDropTarget = dropTarget?.id === conv.id && dropTarget?.type === 'dm';

                return (
                    <div
                        key={`dm-${conv.id}`}
                        style={{ ...styles.dmItem, backgroundColor: isActive ? 'var(--background-modifier-active)' : 'transparent', ...(isDropTarget && styles.dropTargetHighlight) }}
                        onClick={() => { onDMSelect(targetUsername); if (setIsLeftSidebarVisible) setIsLeftSidebarVisible(false); }}
                        onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setDropTarget({ type: 'dm', id: conv.id }); }}
                        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        onDrop={(e) => { handleDrop(e, { type: 'dm', id: conv.id }); }}
                    >
                        <div style={{ ...styles.dmContentWrapper, ...childDragShieldStyle }}>
                            <div style={styles.avatarWrapper}>
                                <img src={avatarUrl} style={styles.avatarSmall} alt="avatar" />
                                <span style={{ ...styles.onlineIndicator, backgroundColor: isOnline ? 'var(--text-positive)' : '#747f8d' }}></span>
                            </div>
                            <span style={{ ...styles.dmNameText, fontWeight: unread > 0 ? 'bold' : 'normal', color: isActive ? 'white' : '#949ba4' }}>{targetUsername}</span>
                        </div>
                        {unread > 0 && <span style={styles.unreadBadge}>{unread}</span>}
                        {/* Gizle butonu buraya eklenebilir */}
                    </div>
                );
            })}
        </div>
    );
};

export default DMList;

