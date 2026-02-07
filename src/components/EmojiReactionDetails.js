// frontend/src/components/EmojiReactionDetails.js
// 🔥 FEATURE 46: Emoji reaction details modal
// Shows who reacted with each emoji

import React, { useState, memo } from 'react';
import { FaTimes, FaCircle } from 'react-icons/fa';

const STATUS_COLORS = {
    online: '#57f287', idle: '#fee75c', dnd: '#ed4245', offline: '#747f8d',
};

const EmojiReactionDetails = ({ reactions = [], onClose, onUserClick }) => {
    const [activeEmoji, setActiveEmoji] = useState(reactions[0]?.emoji || null);

    const activeReaction = reactions.find(r => r.emoji === activeEmoji);

    return (
        <div style={S.overlay} onClick={onClose}>
            <div style={S.modal} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div style={S.header}>
                    <span style={S.title}>Tepkiler</span>
                    <button type="button" style={S.closeBtn} onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {/* Emoji Tabs */}
                <div style={S.tabs}>
                    {reactions.map(reaction => (
                        <button
                            key={reaction.emoji}
                            type="button"
                            style={{
                                ...S.tab,
                                borderBottomColor: activeEmoji === reaction.emoji ? '#5865f2' : 'transparent',
                                color: activeEmoji === reaction.emoji ? '#f2f3f5' : '#b5bac1',
                            }}
                            onClick={() => setActiveEmoji(reaction.emoji)}
                        >
                            <span style={S.tabEmoji}>{reaction.emoji}</span>
                            <span style={S.tabCount}>{reaction.users?.length || 0}</span>
                        </button>
                    ))}
                </div>

                {/* User List */}
                <div style={S.userList}>
                    {activeReaction?.users?.map(user => (
                        <button
                            key={user.id}
                            type="button"
                            style={S.userItem}
                            onClick={() => onUserClick?.(user)}
                            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; }}
                            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                        >
                            <div style={S.avatarWrap}>
                                <img
                                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}&background=5865f2&color=fff&size=32`}
                                    alt=""
                                    style={S.avatar}
                                />
                                <FaCircle style={{
                                    ...S.statusDot,
                                    color: STATUS_COLORS[user.status] || STATUS_COLORS.offline,
                                }} />
                            </div>
                            <div style={S.userInfo}>
                                <span style={{ color: user.roleColor || '#f2f3f5', fontWeight: 500, fontSize: 14 }}>
                                    {user.display_name || user.username}
                                </span>
                                <span style={S.username}>@{user.username}</span>
                            </div>
                        </button>
                    ))}
                    {(!activeReaction?.users || activeReaction.users.length === 0) && (
                        <div style={S.empty}>Henüz kimse tepki vermedi</div>
                    )}
                </div>
            </div>
        </div>
    );
};

const S = {
    overlay: {
        position: 'fixed', inset: 0, zIndex: 10000,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    modal: {
        backgroundColor: '#313338', borderRadius: 8, width: 420,
        maxHeight: '70vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    },
    header: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px',
    },
    title: {
        fontSize: 18, fontWeight: 700, color: '#f2f3f5',
    },
    closeBtn: {
        width: 28, height: 28, borderRadius: 4,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: 'none', background: 'transparent',
        color: '#b5bac1', cursor: 'pointer', fontSize: 16,
    },
    tabs: {
        display: 'flex', gap: 0, padding: '0 20px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        overflowX: 'auto',
    },
    tab: {
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '10px 14px', border: 'none',
        borderBottom: '2px solid transparent',
        background: 'transparent', cursor: 'pointer',
        transition: 'all 0.15s', whiteSpace: 'nowrap',
    },
    tabEmoji: { fontSize: 18 },
    tabCount: { fontSize: 13, fontWeight: 500 },
    userList: {
        flex: 1, overflowY: 'auto', padding: '8px 12px',
        maxHeight: 300,
    },
    userItem: {
        display: 'flex', alignItems: 'center', gap: 10,
        width: '100%', padding: '8px 10px', borderRadius: 6,
        border: 'none', background: 'transparent',
        cursor: 'pointer', textAlign: 'left',
        transition: 'background 0.1s',
    },
    avatarWrap: {
        position: 'relative', width: 32, height: 32, flexShrink: 0,
    },
    avatar: {
        width: 32, height: 32, borderRadius: '50%', objectFit: 'cover',
    },
    statusDot: {
        position: 'absolute', bottom: -1, right: -1,
        fontSize: 10, border: '2px solid #313338', borderRadius: '50%',
    },
    userInfo: {
        display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0,
    },
    username: {
        fontSize: 12, color: '#b5bac1',
    },
    empty: {
        padding: 30, textAlign: 'center', color: '#4e5058', fontSize: 14,
    },
};

export default memo(EmojiReactionDetails);
