// frontend/src/components/UserCardPopover.js
// 👤 FEATURE 7: User Card Popover
// Hover on username/avatar to see mini profile card

import { useState, useRef, useCallback, useEffect, memo } from 'react';
import ReactDOM from 'react-dom';

const UserCardPopover = ({
    username,
    avatar,
    status,
    statusMessage,
    customStatus,
    roles = [],
    joinedAt,
    level,
    xp,
    children,
    onViewFullProfile,
    onStartDM,
}) => {
    const [show, setShow] = useState(false);
    const [pos, setPos] = useState({ top: 0, left: 0, side: 'right' });
    const triggerRef = useRef(null);
    const timerRef = useRef(null);
    const popoverRef = useRef(null);

    const handleMouseEnter = useCallback(() => {
        timerRef.current = setTimeout(() => {
            if (triggerRef.current) {
                const rect = triggerRef.current.getBoundingClientRect();
                const spaceRight = window.innerWidth - rect.right;
                const side = spaceRight > 320 ? 'right' : 'left';
                setPos({
                    top: Math.min(rect.top, window.innerHeight - 360),
                    left: side === 'right' ? rect.right + 12 : rect.left - 292,
                    side,
                });
                setShow(true);
            }
        }, 400);
    }, []);

    const handleMouseLeave = useCallback((e) => {
        // Check if we're moving to the popover itself
        setTimeout(() => {
            if (!triggerRef.current?.matches(':hover') && !popoverRef.current?.matches(':hover')) {
                clearTimeout(timerRef.current);
                setShow(false);
            }
        }, 100);
    }, []);

    useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);

    const statusColors = {
        online: '#23a559',
        idle: '#f0b232',
        dnd: '#da373c',
        invisible: '#80848e',
        offline: '#80848e',
    };

    const statusLabels = {
        online: 'Çevrimiçi',
        idle: 'Boşta',
        dnd: 'Rahatsız Etmeyin',
        invisible: 'Görünmez',
        offline: 'Çevrimdışı',
    };

    const topRoles = roles.slice(0, 3);
    const memberSince = joinedAt ? new Date(joinedAt).toLocaleDateString('tr-TR', { month: 'short', year: 'numeric' }) : null;

    return (
        <>
            <span
                ref={triggerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ display: 'inline-flex' }}
            >
                {children}
            </span>

            {show && ReactDOM.createPortal(
                <div
                    ref={popoverRef}
                    onMouseEnter={() => clearTimeout(timerRef.current)}
                    onMouseLeave={() => setShow(false)}
                    style={{ ...S.popover, top: pos.top, left: pos.left }}
                >
                    {/* Banner */}
                    <div style={S.banner} />

                    {/* Avatar */}
                    <div style={S.avatarArea}>
                        <div style={S.avatarWrap}>
                            <img src={avatar} alt={username} style={S.avatar}
                                onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${username}&background=5865f2&color=fff&bold=true`; }} />
                            <div style={{ ...S.statusDot, backgroundColor: statusColors[status] || '#80848e' }} />
                        </div>
                    </div>

                    {/* Info */}
                    <div style={S.body}>
                        <div style={S.nameRow}>
                            <span style={S.displayName}>{username}</span>
                            {level && <span style={S.levelBadge}>Lv.{level}</span>}
                        </div>

                        <span style={S.statusLine}>
                            <span style={{ color: statusColors[status] || '#80848e' }}>●</span> {statusLabels[status] || 'Çevrimdışı'}
                        </span>

                        {(statusMessage || customStatus) && (
                            <div style={S.statusMsg}>
                                {customStatus?.emoji && <span>{customStatus.emoji}</span>}
                                {statusMessage || customStatus?.text || ''}
                            </div>
                        )}

                        <div style={S.divider} />

                        {/* Roles */}
                        {topRoles.length > 0 && (
                            <div style={S.section}>
                                <span style={S.sectionLabel}>ROLLER</span>
                                <div style={S.rolesWrap}>
                                    {topRoles.map((role, i) => (
                                        <span key={i} style={{ ...S.roleBadge, borderColor: role.color || '#5865f2' }}>
                                            <span style={{ ...S.roleDot, backgroundColor: role.color || '#5865f2' }} />
                                            {role.name}
                                        </span>
                                    ))}
                                    {roles.length > 3 && <span style={S.moreRoles}>+{roles.length - 3}</span>}
                                </div>
                            </div>
                        )}

                        {/* Member since */}
                        {memberSince && (
                            <div style={S.section}>
                                <span style={S.sectionLabel}>ÜYELİK</span>
                                <span style={S.memberSince}>{memberSince}'dan beri</span>
                            </div>
                        )}

                        {/* Actions */}
                        <div style={S.actions}>
                            {onStartDM && (
                                <button style={S.actionBtn} onClick={() => { setShow(false); onStartDM(username); }}>
                                    Mesaj Gönder
                                </button>
                            )}
                            {onViewFullProfile && (
                                <button style={S.actionBtnSec} onClick={() => { setShow(false); onViewFullProfile(username); }}>
                                    Profili Gör
                                </button>
                            )}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

const S = {
    popover: {
        position: 'fixed', zIndex: 15000, width: 280, borderRadius: 12,
        backgroundColor: '#111214', overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        animation: 'ucPopIn 0.2s ease-out',
    },
    banner: {
        height: 60,
        background: 'linear-gradient(135deg, #5865f2 0%, #eb459e 100%)',
    },
    avatarArea: {
        padding: '0 16px', marginTop: -30,
    },
    avatarWrap: {
        position: 'relative', width: 64, height: 64,
    },
    avatar: {
        width: 64, height: 64, borderRadius: '50%',
        border: '4px solid #111214', objectFit: 'cover',
    },
    statusDot: {
        position: 'absolute', bottom: 2, right: 2,
        width: 16, height: 16, borderRadius: '50%',
        border: '3px solid #111214',
    },
    body: { padding: '12px 16px 16px' },
    nameRow: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 },
    displayName: { color: '#fff', fontSize: 16, fontWeight: 700 },
    levelBadge: {
        fontSize: 10, fontWeight: 700, color: '#f0b232',
        backgroundColor: 'rgba(240,178,50,0.15)', padding: '1px 6px', borderRadius: 4,
    },
    statusLine: { color: '#949ba4', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 },
    statusMsg: {
        color: '#b5bac1', fontSize: 12, marginTop: 4,
        display: 'flex', alignItems: 'center', gap: 4,
        padding: '4px 8px', backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: 6, fontStyle: 'italic',
    },
    divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.06)', margin: '12px 0' },
    section: { marginBottom: 10 },
    sectionLabel: { fontSize: 10, fontWeight: 700, color: '#949ba4', letterSpacing: '0.04em', display: 'block', marginBottom: 6 },
    rolesWrap: { display: 'flex', flexWrap: 'wrap', gap: 4 },
    roleBadge: {
        display: 'flex', alignItems: 'center', gap: 4,
        fontSize: 11, color: '#dcddde', border: '1px solid',
        borderRadius: 4, padding: '2px 6px', backgroundColor: 'rgba(255,255,255,0.03)',
    },
    roleDot: { width: 8, height: 8, borderRadius: '50%', flexShrink: 0 },
    moreRoles: { fontSize: 11, color: '#949ba4' },
    memberSince: { color: '#b5bac1', fontSize: 12 },
    actions: { display: 'flex', gap: 8, marginTop: 12 },
    actionBtn: {
        flex: 1, padding: '8px 0', backgroundColor: '#5865f2', color: '#fff',
        border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600,
        transition: 'background 0.15s',
    },
    actionBtnSec: {
        flex: 1, padding: '8px 0', backgroundColor: 'rgba(255,255,255,0.06)', color: '#dcddde',
        border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600,
        transition: 'background 0.15s',
    },
};

if (typeof document !== 'undefined') {
    const id = 'uc-popover-css';
    if (!document.getElementById(id)) {
        const s = document.createElement('style');
        s.id = id;
        s.textContent = `
            @keyframes ucPopIn { from { opacity:0; transform: scale(0.95); } to { opacity:1; transform: scale(1); } }
        `;
        document.head.appendChild(s);
    }
}

export default memo(UserCardPopover);
