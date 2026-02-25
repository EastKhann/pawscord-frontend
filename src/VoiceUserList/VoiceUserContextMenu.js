// frontend/src/VoiceUserList/VoiceUserContextMenu.js
import React, { useCallback, useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles';

/* ─── Küçük yardımcı bileşenler ─────────────────────────────────────── */

const MenuItem = ({ className = 'user-context-menu-item', icon, label, onClick, danger, style: extraStyle }) => (
    <div
        role="menuitem"
        tabIndex={0}
        className={className}
        onClick={onClick}
        onKeyDown={(e) => e.key === 'Enter' && onClick?.(e)}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            margin: '1px 4px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '13px',
            color: danger ? '#ed4245' : '#dcddde',
            transition: 'background 0.1s, color 0.1s',
            userSelect: 'none',
            ...extraStyle,
        }}
    >
        <span style={{ fontSize: '15px', lineHeight: 1, flexShrink: 0, opacity: danger ? 1 : 0.75 }}>{icon}</span>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
    </div>
);

const SectionLabel = ({ children }) => (
    <div style={{
        fontSize: '10px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.6px',
        color: '#72767d',
        padding: '8px 12px 4px',
    }}>
        {children}
    </div>
);

const Divider = () => (
    <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.07)', margin: '4px 0' }} />
);

/* ─── Ana component ─────────────────────────────────────────────────── */

const VoiceUserContextMenu = ({
    contextMenu, currentUsername, isAdmin, isClientInThisChannel,
    remoteVolumes, handleVolumeChange, handleMenuAction,
    showMoveMenu, setShowMoveMenu, voiceChannels, roomName,
    getAvatar, allUsers, friendsList
}) => {
    const menuRef = useRef(null);
    const [menuPos, setMenuPos] = useState({ left: -9999, top: -9999 });

    // Pozisyon: ilk render'da gizle, mount sonra ölç & yerleştir
    useEffect(() => {
        if (!contextMenu || !menuRef.current) return;
        const pad = 10;
        const rect = menuRef.current.getBoundingClientRect();
        let left = contextMenu.x;
        let top = contextMenu.y;
        if (left + rect.width > window.innerWidth - pad) left = window.innerWidth - rect.width - pad;
        if (top + rect.height > window.innerHeight - pad) top = window.innerHeight - rect.height - pad;
        left = Math.max(pad, left);
        top = Math.max(pad, top);
        setMenuPos({ left, top });
    }, [contextMenu]); // showMoveMenu değişimde yeniden pozisyon HAREKETİNE gerek yok

    // Hooks → her zaman koşulsuz çağrılmalı
    const userObj = contextMenu?.user;
    const volumeVal = (userObj && remoteVolumes[userObj.username] != null) ? remoteVolumes[userObj.username] : 100;
    const isSelf = userObj?.username === currentUsername;
    const alreadyFriend = friendsList?.some(
        f => f.sender_username === userObj?.username || f.receiver_username === userObj?.username
    );

    const stopProp = useCallback((e) => e.stopPropagation(), []);
    const onAvatarError = useCallback((e) => { e.target.onerror = null; e.target.src = getAvatar(userObj?.username); }, [getAvatar, userObj?.username]);
    const onVolumeChange = useCallback((e) => handleVolumeChange(userObj?.username, e), [handleVolumeChange, userObj?.username]);
    const onProfile = useCallback(() => handleMenuAction('profile'), [handleMenuAction]);
    const onDm = useCallback(() => handleMenuAction('dm'), [handleMenuAction]);
    const onAddFriend = useCallback(() => handleMenuAction('add_friend'), [handleMenuAction]);
    const onToggleMove = useCallback(() => setShowMoveMenu(p => !p), [setShowMoveMenu]);
    const onKick = useCallback(() => handleMenuAction('kick'), [handleMenuAction]);
    const onServerMute = useCallback(() => handleMenuAction('server_mute'), [handleMenuAction]);
    const onServerDeafen = useCallback(() => handleMenuAction('server_deafen'), [handleMenuAction]);
    const onMuteLocal = useCallback(() => handleMenuAction('mute_local'), [handleMenuAction]);

    if (!contextMenu || !userObj) return null;

    let avatarUrl = userObj.avatar || userObj.avatarUrl;
    if (!avatarUrl) {
        const found = allUsers?.find(u => u.username === userObj.username);
        avatarUrl = found?.avatar || getAvatar(userObj.username);
    }

    const otherChannels = voiceChannels?.filter(c => c.slug !== roomName) ?? [];

    return ReactDOM.createPortal(
        <div
            ref={menuRef}
            role="menu"
            onClick={stopProp}
            style={{
                position: 'fixed',
                left: menuPos.left,
                top: menuPos.top,
                zIndex: 2147483647,
                backgroundColor: '#111214',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px',
                boxShadow: '0 12px 32px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.4)',
                minWidth: '240px',
                maxWidth: '280px',
                maxHeight: 'calc(100vh - 20px)',
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                animation: 'contextMenuIn 0.12s ease-out',
            }}
        >
            {/* ── Başlık (avatar + kullanıcı adı) ── */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 12px 10px',
                backgroundColor: '#1a1b1e',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                flexShrink: 0,
            }}>
                <img
                    src={avatarUrl}
                    alt={userObj.username}
                    onError={onAvatarError}
                    style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #5865f2', flexShrink: 0 }}
                />
                <div>
                    <div style={{ fontWeight: '600', fontSize: '14px', color: '#fff', lineHeight: 1.2 }}>{userObj.username}</div>
                    {isSelf && <div style={{ fontSize: '11px', color: '#b9bbbe', marginTop: '2px' }}>Sensin</div>}
                </div>
            </div>

            {/* ── Ses Seviyesi Slider (aynı kanalda, başkası) ── */}
            {isClientInThisChannel && !isSelf && (
                <div style={{
                    padding: '10px 14px 12px',
                    backgroundColor: '#16171a',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                    flexShrink: 0,
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#8e9297' }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
                                {volumeVal > 0 && <path d="M15.54 8.46a5 5 0 010 7.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />}
                                {volumeVal > 100 && <path d="M19.07 4.93a10 10 0 010 14.14" stroke="#5865f2" strokeWidth="1.5" strokeLinecap="round" />}
                            </svg>
                            Ses Seviyesi
                        </span>
                        <span style={{
                            fontSize: '12px', fontWeight: '700',
                            color: volumeVal > 100 ? '#5865f2' : '#fff',
                            background: volumeVal > 100 ? 'rgba(88,101,242,0.18)' : 'rgba(255,255,255,0.1)',
                            padding: '2px 8px', borderRadius: '10px', minWidth: '44px', textAlign: 'center',
                        }}>
                            {volumeVal}%
                        </span>
                    </div>
                    {/* Track + thumb */}
                    <div style={{ position: 'relative', height: '20px', display: 'flex', alignItems: 'center' }}>
                        <div style={{
                            position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)',
                            height: '4px', borderRadius: '2px', background: '#2a2b2e', overflow: 'visible',
                        }}>
                            <div style={{
                                position: 'absolute', left: 0, top: 0, bottom: 0,
                                width: `${Math.min((volumeVal / 200) * 100, 100)}%`,
                                background: volumeVal > 100
                                    ? 'linear-gradient(90deg, #5865f2, #7289da)'
                                    : '#5865f2',
                                borderRadius: '2px',
                                transition: 'width 0.04s',
                            }} />
                        </div>
                        <input
                            type="range" min="0" max="200" value={volumeVal}
                            onChange={onVolumeChange}
                            aria-label={`${userObj.username} ses seviyesi`}
                            className="voice-volume-slider"
                            style={{
                                position: 'relative', zIndex: 2,
                                width: '100%', margin: 0, padding: 0,
                                height: '20px', cursor: 'pointer',
                                WebkitAppearance: 'none', appearance: 'none',
                                background: 'transparent', outline: 'none',
                            }}
                        />
                    </div>
                </div>
            )}

            {/* ── Genel Eylemler ── */}
            <div style={{ padding: '4px 0' }}>
                <MenuItem icon="👤" label="Profili Görüntüle" onClick={onProfile} />
                <MenuItem icon="💬" label="Özelden Mesaj At" onClick={onDm} />
                {!isSelf && !alreadyFriend && (
                    <MenuItem icon="➕" label="Arkadaş Ekle" onClick={onAddFriend} />
                )}
            </div>

            {/* ── Mod Araçları (sadece admin, başkası) ── */}
            {isAdmin && !isSelf && (
                <>
                    <Divider />
                    <div style={{ padding: '4px 0' }}>
                        <SectionLabel>Mod Araçları</SectionLabel>

                        {/* Başka Kanala Taşı – accordion */}
                        <div
                            className="user-context-menu-item"
                            role="menuitem"
                            tabIndex={0}
                            onClick={onToggleMove}
                            onKeyDown={(e) => e.key === 'Enter' && onToggleMove()}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                gap: '8px', padding: '8px 12px', margin: '1px 4px',
                                borderRadius: '4px', cursor: 'pointer', fontSize: '13px',
                                color: '#dcddde', transition: 'background 0.1s', userSelect: 'none',
                            }}
                        >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '15px', opacity: 0.75 }}>🔀</span>
                                Başka Kanala Taşı
                            </span>
                            <span style={{
                                fontSize: '10px', color: '#72767d',
                                transform: showMoveMenu ? 'rotate(90deg)' : 'none',
                                transition: 'transform 0.18s ease',
                                display: 'inline-block',
                            }}>▶</span>
                        </div>

                        {/* Kanal listesi – accordion içeriği */}
                        {showMoveMenu && (
                            <div style={{
                                margin: '2px 8px 4px 24px',
                                borderLeft: '2px solid rgba(88,101,242,0.4)',
                                borderRadius: '0 4px 4px 0',
                                background: 'rgba(88,101,242,0.05)',
                                maxHeight: '150px',
                                overflowY: 'auto',
                                overflowX: 'hidden',
                                padding: '2px 0',
                            }}>
                                {otherChannels.length === 0 ? (
                                    <div style={{ padding: '8px 12px', fontSize: '12px', color: '#72767d', cursor: 'default' }}>
                                        Başka kanal yok
                                    </div>
                                ) : otherChannels.map(channel => (
                                    <div
                                        key={channel.slug}
                                        className="user-context-menu-item"
                                        role="menuitem"
                                        tabIndex={0}
                                        onClick={() => handleMenuAction('move', channel.slug)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '6px',
                                            padding: '6px 12px', margin: '1px 4px',
                                            borderRadius: '4px', cursor: 'pointer',
                                            fontSize: '12px', color: '#b9bbbe',
                                            transition: 'background 0.1s', userSelect: 'none',
                                        }}
                                    >
                                        <span style={{ color: '#5865f2', fontSize: '13px' }}>🔊</span>
                                        {channel.name}
                                    </div>
                                ))}
                            </div>
                        )}

                        <MenuItem icon="🔇" label="Sunucu Sustur" onClick={onServerMute} />
                        <MenuItem icon="🙉" label="Sunucu Sağırlaştır" onClick={onServerDeafen} />
                        <MenuItem icon="❌" label="Kanaldan At" onClick={onKick} danger className="user-context-menu-item-danger" />
                    </div>
                </>
            )}

            {/* ── Yerel Sessize Al ── */}
            {!isSelf && (
                <>
                    <Divider />
                    <div style={{ padding: '4px 0 6px' }}>
                        <MenuItem icon="🔕" label="Benim İçin Sessize Al" onClick={onMuteLocal} />
                    </div>
                </>
            )}
        </div>,
        document.getElementById('portal-root') || document.body
    );
};

export default React.memo(VoiceUserContextMenu);
