/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
// frontend/src/VoiceUserList/VoiceUserContextMenu.js
import React, { useCallback, useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import styles from './styles';

// -- extracted inline style constants --
const _st1 = { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };
const _st2 = {
    fontSize: '10px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    color: '#949ba4',
    padding: '8px 12px 4px',
};
const _st3 = { height: '1px', backgroundColor: 'rgba(255,255,255,0.07)', margin: '4px 0' };
const _st4 = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 12px 10px',
    backgroundColor: '#1a1b1e',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    flexShrink: 0,
};
const _st5 = {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #5865f2',
    flexShrink: 0,
};
const _st6 = { fontWeight: '600', fontSize: '14px', color: '#fff', lineHeight: 1.2 };
const _st7 = { fontSize: '11px', color: '#b5bac1', marginTop: '2px' };
const _st8 = {
    padding: '10px 14px 12px',
    backgroundColor: '#16171a',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    flexShrink: 0,
};
const _st9 = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
};
const _st10 = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: '#8e9297',
};
const _st11 = { position: 'relative', height: '20px', display: 'flex', alignItems: 'center' };
const _st12 = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    height: '4px',
    borderRadius: '2px',
    background: '#2a2b2e',
    overflow: 'visible',
};
const _st13 = {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    margin: 0,
    padding: 0,
    height: '20px',
    cursor: 'pointer',
    WebkitAppearance: 'none',
    appearance: 'none',
    background: 'transparent',
    outline: 'none',
};
const _st14 = { padding: '4px 0' };
const _st15 = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
    padding: '8px 12px',
    margin: '1px 4px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px',
    color: '#dbdee1',
    transition: 'background 0.1s',
    userSelect: 'none',
};
const _st16 = { display: 'flex', alignItems: 'center', gap: '8px' };
const _st17 = { fontSize: '15px', opacity: 0.75 };
const _st18 = {
    margin: '2px 8px 4px 24px',
    borderLeft: '2px solid rgba(88,101,242,0.4)',
    borderRadius: '0 4px 4px 0',
    background: 'rgba(88,101,242,0.05)',
    maxHeight: '150px',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '2px 0',
};
const _st19 = { padding: '8px 12px', fontSize: '12px', color: '#949ba4', cursor: 'default' };
const _st20 = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    margin: '1px 4px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    color: '#b5bac1',
    transition: 'background 0.1s',
    userSelect: 'none',
};
const _st21 = { color: '#5865f2', fontSize: '13px' };
const _st22 = { padding: '4px 0 6px' };

/* ─── Kk yardımcı bileşenler ─────────────────────────────────────── */

const MenuItem = ({
    className = 'user-context-menu-item',
    icon,
    label,
    onClick,
    danger,
    style: extraStyle,
}) => (
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
            color: danger ? '#f23f42' : '#dbdee1',
            transition: 'background 0.1s, color 0.1s',
            userSelect: 'none',
            ...extraStyle,
        }}
    >
        <span
            style={{ fontSize: '15px', lineHeight: 1, flexShrink: 0, opacity: danger ? 1 : 0.75 }}
        >
            {icon}
        </span>
        <span style={_st1}>{label}</span>
    </div>
);

const SectionLabel = ({ children }) => <div style={_st2}>{children}</div>;

const Divider = () => <div style={_st3} />;

/* ─── Ana component ─────────────────────────────────────────────────── */

const VoiceUserContextMenu = ({
    contextMenu,
    currentUsername,
    isAdmin,
    isClientInThisChannel,
    remoteVolumes,
    handleVolumeChange,
    handleMenuAction,
    showMoveMenu,
    setShowMoveMenu,
    voiceChannels,
    roomName,
    getAvatar,
    allUsers,
    friendsList,
}) => {
    const { t } = useTranslation();
    const menuRef = useRef(null);
    const [menuPos, setMenuPos] = useState({ left: -9999, top: -9999 });

    // Pozisyon: ilk render'da gizle, mount sonra ölç & yerleştir
    useEffect(() => {
        if (!contextMenu || !menuRef.current) return;
        const pad = 10;
        const rect = menuRef.current.getBoundingClientRect();
        let left = contextMenu.x;
        let top = contextMenu.y;
        if (left + rect.width > window.innerWidth - pad)
            left = window.innerWidth - rect.width - pad;
        if (top + rect.height > window.innerHeight - pad)
            top = window.innerHeight - rect.height - pad;
        left = Math.max(pad, left);
        top = Math.max(pad, top);
        setMenuPos({ left, top });
    }, [contextMenu]); // showMoveMenu değişimde yeniden pozisyon HAREKETİNE gerek yok

    // Hooks → her zaman koşulsuz çağrılmalı
    const userObj = contextMenu?.user;
    const volumeVal =
        userObj && remoteVolumes[userObj.username] != null ? remoteVolumes[userObj.username] : 100;
    const isSelf = userObj?.username === currentUsername;
    const alreadyFriend = friendsList?.some(
        (f) => f.sender_username === userObj?.username || f.receiver_username === userObj?.username
    );

    const stopProp = useCallback((e) => e.stopPropagation(), []);
    const onAvatarError = useCallback(
        (e) => {
            e.target.onerror = null;
            e.target.src = getAvatar(userObj?.username);
        },
        [getAvatar, userObj?.username]
    );
    const onVolumeChange = useCallback(
        (e) => handleVolumeChange(userObj?.username, e),
        [handleVolumeChange, userObj?.username]
    );
    const onProfile = useCallback(() => handleMenuAction('profile'), [handleMenuAction]);
    const onDm = useCallback(() => handleMenuAction('dm'), [handleMenuAction]);
    const onAddFriend = useCallback(() => handleMenuAction('add_friend'), [handleMenuAction]);
    const onToggleMove = useCallback(() => setShowMoveMenu((p) => !p), [setShowMoveMenu]);
    const onKick = useCallback(() => handleMenuAction('kick'), [handleMenuAction]);
    const onServerMute = useCallback(() => handleMenuAction('server_mute'), [handleMenuAction]);
    const onServerDeafen = useCallback(() => handleMenuAction('server_deafen'), [handleMenuAction]);
    const onMuteLocal = useCallback(() => handleMenuAction('mute_local'), [handleMenuAction]);

    if (!contextMenu || !userObj) return null;

    let avatarUrl = userObj.avatar || userObj.avatarUrl;
    if (!avatarUrl) {
        const found = allUsers?.find((u) => u.username === userObj.username);
        avatarUrl = found?.avatar || getAvatar(userObj.username);
    }

    const otherChannels = voiceChannels?.filter((c) => c.slug !== roomName) ?? [];

    return ReactDOM.createPortal(
        <div
            ref={menuRef}
            role="menu"
            tabIndex={-1}
            onClick={stopProp}
            onKeyDown={(e) => e.stopPropagation()}
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
            {/* ── Title (avatar + kullanıcı adı) ── */}
            <div style={_st4}>
                <img src={avatarUrl} alt={userObj.username} onError={onAvatarError} style={_st5} />
                <div>
                    <div style={_st6}>{userObj.username}</div>
                    {isSelf && <div style={_st7}>Sensin</div>}
                </div>
            </div>

            {/* ── Volume Level Slider (ayını kanalda, başkası) ── */}
            {isClientInThisChannel && !isSelf && (
                <div style={_st8}>
                    <div style={_st9}>
                        <span style={_st10}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
                                {volumeVal > 0 && (
                                    <path
                                        d="M15.54 8.46a5 5 0 010 7.07"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                )}
                                {volumeVal > 100 && (
                                    <path
                                        d="M19.07 4.93a10 10 0 010 14.14"
                                        stroke="#5865f2"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                )}
                            </svg>
                            Volume Level
                        </span>
                        <span
                            style={{
                                fontSize: '12px',
                                fontWeight: '700',
                                color: volumeVal > 100 ? '#5865f2' : '#fff',
                                background:
                                    volumeVal > 100
                                        ? 'rgba(88,101,242,0.18)'
                                        : 'rgba(255,255,255,0.1)',
                                padding: '2px 8px',
                                borderRadius: '10px',
                                minWidth: '44px',
                                textAlign: 'center',
                            }}
                        >
                            {volumeVal}%
                        </span>
                    </div>
                    {/* Track + thumb */}
                    <div style={_st11}>
                        <div style={_st12}>
                            <div
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    width: `${Math.min((volumeVal / 200) * 100, 100)}%`,
                                    background:
                                        volumeVal > 100
                                            ? 'linear-gradient(90deg, #5865f2, #5865f2)'
                                            : '#5865f2',
                                    borderRadius: '2px',
                                    transition: 'width 0.04s',
                                }}
                            />
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="200"
                            value={volumeVal}
                            onChange={onVolumeChange}
                            aria-label={`${userObj.username} audio level`}
                            className="voice-volume-slider"
                            style={_st13}
                        />
                    </div>
                </div>
            )}

            {/* ── General Eylemler ── */}
            <div style={_st14}>
                <MenuItem
                    icon="👤"
                    label={t('voice.viewProfile', 'View Profile')}
                    onClick={onProfile}
                />
                <MenuItem icon="💬" label={t('voice.sendMessage', 'Send Message')} onClick={onDm} />
                {!isSelf && !alreadyFriend && (
                    <MenuItem
                        icon="➕"
                        label={t('friends.addFriend', 'Add Friend')}
                        onClick={onAddFriend}
                    />
                )}
            </div>

            {/* ── Mod Searchçları (sadece admin, başkası) ── */}
            {isAdmin && !isSelf && (
                <>
                    <Divider />
                    <div style={_st14}>
                        <SectionLabel>{t('voice.modTools', 'Mod Tools')}</SectionLabel>

                        {/* Başka Channela Taşı – accordion */}
                        <div
                            className="user-context-menu-item"
                            role="menuitem"
                            tabIndex={0}
                            onClick={onToggleMove}
                            onKeyDown={(e) => e.key === 'Enter' && onToggleMove()}
                            style={_st15}
                        >
                            <span style={_st16}>
                                <span style={_st17}>🔀</span>
                                {t('voice.moveToChannel', 'Move to Another Channel')}
                            </span>
                            <span
                                style={{
                                    fontSize: '10px',
                                    color: '#949ba4',
                                    transform: showMoveMenu ? 'rotate(90deg)' : 'none',
                                    transition: 'transform 0.18s ease',
                                    display: 'inline-block',
                                }}
                            >
                                ▶
                            </span>
                        </div>

                        {/* Channel list – accordion içeriği */}
                        {showMoveMenu && (
                            <div style={_st18}>
                                {otherChannels.length === 0 ? (
                                    <div style={_st19}>
                                        {t('voice.noOtherChannels', 'No other channels')}
                                    </div>
                                ) : (
                                    otherChannels.map((channel) => (
                                        <div
                                            key={channel.slug}
                                            className="user-context-menu-item"
                                            role="menuitem"
                                            tabIndex={0}
                                            onClick={() => handleMenuAction('move', channel.slug)}
                                            onKeyDown={(e) =>
                                                (e.key === 'Enter' || e.key === ' ') &&
                                                handleMenuAction('move', channel.slug)
                                            }
                                            style={_st20}
                                        >
                                            <span style={_st21}>🔊</span>
                                            {channel.name}
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        <MenuItem
                            icon="🔇"
                            label={t('voice.serverMute', 'Server Mute')}
                            onClick={onServerMute}
                        />
                        <MenuItem
                            icon="🙉"
                            label={t('voice.serverDeafen', 'Server Deafen')}
                            onClick={onServerDeafen}
                        />
                        <MenuItem
                            icon="❌"
                            label={t('voice.kickFromChannel', 'Kick from Channel')}
                            onClick={onKick}
                            danger
                            className="user-context-menu-item-danger"
                        />
                    </div>
                </>
            )}

            {/* ── Yerel Mute ── */}
            {!isSelf && (
                <>
                    <Divider />
                    <div style={_st22}>
                        <MenuItem
                            icon="🔕"
                            label={t('voice.muteForMe', 'Mute for Me')}
                            onClick={onMuteLocal}
                        />
                    </div>
                </>
            )}
        </div>,
        document.getElementById('portal-root') || document.body
    );
};

VoiceUserContextMenu.propTypes = {
    className: PropTypes.string,
    icon: PropTypes.node,
    label: PropTypes.string,
    onClick: PropTypes.func,
    danger: PropTypes.object,
};
export default React.memo(VoiceUserContextMenu);
