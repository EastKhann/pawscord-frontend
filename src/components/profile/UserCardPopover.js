// frontend/src/components/UserCardPopover.js
// 👤 FEATURE 7: User Card Popover
// Hover on username/avatar to see mini profile card

import { useState, useRef, useCallback, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ReactDOM from 'react-dom';
import { getFreshActivity } from '../../utils/activityUtils';

const UserCardPopover = ({
    // Support both: user object (Message.js style) and individual props
    user,
    username: usernameProp,
    avatar: avatarProp,
    status: statusProp,
    statusMessage,
    customStatus: customStatusProp,
    roles: rolesProp = [],
    joinedAt,
    level: levelProp,
    xp,
    // Activity (Spotify / Steam)
    currentActivity,
    // Callbacks — support both naming conventions
    onViewFullProfile,
    onProfile,
    onStartDM,
    onMessage,
    children,
}) => {
    // Resolve from user object or individual props
    const username = user?.username ?? usernameProp;
    const avatar = user?.avatar ?? avatarProp;
    const status = user?.status ?? statusProp;
    const customStatus = user?.custom_status ?? customStatusProp;
    const roles = user?.roles ?? rolesProp;
    const level = user?.level ?? levelProp;
    const handleViewProfile = onViewFullProfile || onProfile;
    const handleStartDM = onStartDM || onMessage;
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
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

    // Keyboard: open on Enter/Space, close on Escape
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!show && triggerRef.current) {
                const rect = triggerRef.current.getBoundingClientRect();
                const spaceRight = window.innerWidth - rect.right;
                const side = spaceRight > 320 ? 'right' : 'left';
                setPos({
                    top: Math.min(rect.top, window.innerHeight - 360),
                    left: side === 'right' ? rect.right + 12 : rect.left - 292,
                    side,
                });
                setShow(true);
            } else {
                setShow(false);
            }
        } else if (e.key === 'Escape' && show) {
            setShow(false);
            triggerRef.current?.focus();
        }
    }, [show]);

    // Close on Escape when popover is focused
    useEffect(() => {
        if (!show) return;
        const handleEsc = (e) => {
            const { t } = useTranslation();
            if (e.key === 'Escape') {
                setShow(false);
                triggerRef.current?.focus();
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [show]);

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
        online: 'Online',
        idle: 'Idle',
        dnd: 'Do Not Disturb',
        invisible: 'Invisible',
        offline: 'Offline',
    };

    const topRoles = roles.slice(0, 3);
    const memberSince = joinedAt ? new Date(joinedAt).toLocaleDateString('tr-TR', { month: 'short', year: 'numeric' }) : null;
    const activity = getFreshActivity(currentActivity || user?.current_activity);

    const popoverPosStyle = { ...S.popover, top: pos.top, left: pos.left };
    const statusDotBgStyle = { ...S.statusDot, backgroundColor: statusColors[status] || '#80848e' };
    const statusTextColorStyle = { color: statusColors[status] || '#80848e' };

    return (
        <>
            <span
                ref={triggerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                role="button"
                aria-haspopup="dialog"
                aria-expanded={show}
                aria-label={`View ${username}'s profile`}
                className="inline-flex-none"
            >
                {children}
            </span>

            {show && ReactDOM.createPortal(
                <div
                    ref={popoverRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${username}'s profile card`}
                    onMouseEnter={() => clearTimeout(timerRef.current)}
                    onMouseLeave={() => setShow(false)}
                    style={popoverPosStyle}>
                    {/* Banner */}
                    <div style={S.banner} />

                    {/* Avatar */}
                    <div style={S.avatarArea}>
                        <div style={S.avatarWrap}>
                            <img src={avatar} alt={username} style={S.avatar}
                                onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${username}&background=5865f2&color=fff&bold=true`; }} />
                            <div style={statusDotBgStyle} />
                        </div>
                    </div>

                    {/* Info */}
                    <div style={S.body}>
                        <div style={S.nameRow}>
                            <span style={S.displayName}>{username}</span>
                            {level && <span style={S.levelBadge}>Lv.{level}</span>}
                        </div>

                        <span style={S.statusLine}>
                            <span style={statusTextColorStyle}>●</span> {statusLabels[status] || 'Offline'}
                        </span>

                        {(statusMessage || customStatus) && (
                            <div style={S.statusMsg}>
                                {customStatus?.emoji && <span>{customStatus.emoji}</span>}
                                {statusMessage || customStatus?.text || customStatus || ''}
                            </div>
                        )}

                        {/* Activity: Spotify */}
                        {activity?.spotify && (
                            <>
                                <div style={S.divider} />
                                <div style={S.section}>
                                    <span style={S.sectionLabel}>{t('userCard.listeningTo', '🎵 LISTENING TO')}</span>
                                    <div style={S.activityCard}>
                                        {(activity.spotify.album_art) && (
                                            <img
                                                src={activity.spotify.album_art}
                                                alt={t('alt.albumArt', 'Album Art')}
                                                style={S.albumArt}
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        )}
                                        <div style={S.activityInfo}>
                                            <span style={S.activityTrack}>
                                                {activity.spotify.name || activity.spotify.track || 'Bilinmiyor'}
                                            </span>
                                            <span style={S.activityArtist}>
                                                {activity.spotify.details || activity.spotify.artist || ''}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Activity: Steam / Gaming */}
                        {activity?.steam && (
                            <>
                                <div style={S.divider} />
                                <div style={S.section}>
                                    <span style={S.sectionLabel}>🎮 OYUN OYNUYOR</span>
                                    <div style={S.activityGame}>
                                        <span style={S.activityTrack}>
                                            {activity.steam.name || activity.steam.game || 'Bilinmiyor'}
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}

                        <div style={S.divider} />

                        {/* Roles */}
                        {topRoles.length > 0 && (
                            <div style={S.section}>
                                <span style={S.sectionLabel}>ROLLER</span>
                                <div style={S.rolesWrap}>
                                    {topRoles.map((role, i) => {
                                        const roleBadgeStyle = { ...S.roleBadge, borderColor: role.color || '#5865f2' };
                                        const roleDotStyle = { ...S.roleDot, backgroundColor: role.color || '#5865f2' };
                                        return (
                                            <span key={`item-${i}`} style={roleBadgeStyle}>
                                                <span style={roleDotStyle} />
                                                {role.name}
                                            </span>
                                        );
                                    })}>
                                    {roles.length > 3 && <span style={S.moreRoles}>+{roles.length - 3}</span>}
                                </div>
                            </div>
                        )}

                        {/* Member since */}
                        {memberSince && (
                            <div style={S.section}>
                                <span style={S.sectionLabel}>{t('userCard.memberSince', 'MEMBER SINCE')}</span>
                                <span style={S.memberSince}>{memberSince}'dan beri</span>
                            </div>
                        )}

                        {/* Actions */}
                        <div style={S.actions}>
                            {handleStartDM && (
                                <button
                                    aria-label={t('userCard.sendMessage', 'Send message')} style={S.actionBtn} onClick={() => { setShow(false); handleStartDM(username); }}>
                                    Send Message
                                </button>
                            )}
                            {handleViewProfile && (
                                <button
                                    aria-label={t('userCard.viewProfile', 'View profile')} style={S.actionBtnSec} onClick={() => { setShow(false); handleViewProfile(username); }}>
                                    {t('userCard.viewProfile', 'View Profile')}
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
        border: '4px solid #0e1222', objectFit: 'cover',
    },
    statusDot: {
        position: 'absolute', bottom: 2, right: 2,
        width: 16, height: 16, borderRadius: '50%',
        border: '3px solid #0e1222',
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
        fontSize: 11, color: '#dbdee1', border: '1px solid',
        borderRadius: 4, padding: '2px 6px', backgroundColor: 'rgba(255,255,255,0.03)',
    },
    roleDot: { width: 8, height: 8, borderRadius: '50%', flexShrink: 0 },
    moreRoles: { fontSize: 11, color: '#949ba4' },
    memberSince: { color: '#b5bac1', fontSize: 12 },
    actions: { display: 'flex', gap: 8, marginTop: 12 },
    // Activity styles
    activityCard: { display: 'flex', alignItems: 'center', gap: 10, marginTop: 6, padding: '8px', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 8 },
    albumArt: { width: 48, height: 48, borderRadius: 4, flexShrink: 0, objectFit: 'cover' },
    activityInfo: { minWidth: 0, flex: 1 },
    activityTrack: { color: '#fff', fontSize: 12, fontWeight: 600, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
    activityArtist: { color: '#949ba4', fontSize: 11, display: 'block', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
    activityGame: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 6, padding: '8px', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 8 },
    actionBtn: {
        flex: 1, padding: '8px 0', backgroundColor: '#5865f2', color: '#fff',
        border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600,
        transition: 'background 0.15s',
    },
    actionBtnSec: {
        flex: 1, padding: '8px 0', backgroundColor: 'rgba(255,255,255,0.06)', color: '#dbdee1',
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

UserCardPopover.propTypes = {
    statusMessage: PropTypes.string,
    joinedAt: PropTypes.object,
    xp: PropTypes.number,
    onProfile: PropTypes.func,
    onStartDM: PropTypes.func,
    onMessage: PropTypes.func,
    children: PropTypes.array,
};
export default memo(UserCardPopover);
