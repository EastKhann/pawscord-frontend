// frontend/src/components/MutualFriends.js
// 🔥 FEATURE 33: Mutual friends on user profile
// Shows list of friends shared between current user and viewed profile

import React, { memo } from 'react';
import { FaUserFriends, FaCircle } from 'react-icons/fa';

const STATUS_COLORS = {
    online: '#57f287',
    idle: '#fee75c',
    dnd: '#ed4245',
    offline: '#747f8d',
};

const MutualFriends = ({ friends = [], onFriendClick }) => {
    if (friends.length === 0) return null;

    return (
        <div style={S.container}>
            <div style={S.header}>
                <span style={S.title}>ORTAK ARKADAŞLAR — {friends.length}</span>
            </div>
            <div style={S.list}>
                {friends.map((friend) => (
                    <button
                        key={friend.id}
                        type="button"
                        style={S.item}
                        onClick={() => onFriendClick?.(friend)}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                        <div style={S.avatarWrap}>
                            <img
                                src={friend.avatar || `https://ui-avatars.com/api/?name=${friend.username}&background=5865f2&color=fff&size=28`}
                                alt=""
                                style={S.avatar}
                            />
                            <FaCircle style={{
                                ...S.statusDot,
                                color: STATUS_COLORS[friend.status] || STATUS_COLORS.offline,
                            }} />
                        </div>
                        <span style={S.name}>{friend.display_name || friend.username}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

const S = {
    container: { padding: '12px 0' },
    header: { marginBottom: 8 },
    title: {
        fontSize: 12, fontWeight: 700, color: '#f2f3f5',
        textTransform: 'uppercase', letterSpacing: '0.5px',
    },
    list: {
        display: 'flex', flexDirection: 'column', gap: 2,
    },
    item: {
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '6px 8px', borderRadius: 6,
        border: 'none', background: 'transparent',
        cursor: 'pointer', textAlign: 'left',
        transition: 'background 0.1s', width: '100%',
    },
    avatarWrap: {
        position: 'relative', width: 28, height: 28, flexShrink: 0,
    },
    avatar: {
        width: 28, height: 28, borderRadius: '50%', objectFit: 'cover',
    },
    statusDot: {
        position: 'absolute', bottom: -1, right: -1,
        fontSize: 10, border: '2px solid #232428',
        borderRadius: '50%',
    },
    name: {
        fontSize: 14, color: '#dcddde', fontWeight: 400,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
    },
};

export default memo(MutualFriends);
