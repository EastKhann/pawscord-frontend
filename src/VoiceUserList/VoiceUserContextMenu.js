// frontend/src/VoiceUserList/VoiceUserContextMenu.js
import React, { useCallback, useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles';

const VoiceUserContextMenu = ({
    contextMenu, currentUsername, isAdmin, isClientInThisChannel,
    remoteVolumes, handleVolumeChange, handleMenuAction,
    showMoveMenu, setShowMoveMenu, voiceChannels, roomName,
    getAvatar, allUsers, friendsList
}) => {
    const menuRef = useRef(null);
    const [menuPos, setMenuPos] = useState({ left: 0, top: 0 });

    // Dinamik pozisyon hesaplama: menu DOM'a mount olduktan sonra gercek boyutunu ol
    useEffect(() => {
        if (!contextMenu || !menuRef.current) return;
        const rect = menuRef.current.getBoundingClientRect();
        const pad = 10;
        let left = contextMenu.x;
        let top = contextMenu.y;
        // Saga tasmamasi icin
        if (left + rect.width > window.innerWidth - pad) {
            left = window.innerWidth - rect.width - pad;
        }
        // Alta tasmamasi icin
        if (top + rect.height > window.innerHeight - pad) {
            top = window.innerHeight - rect.height - pad;
        }
        // Negatif deger olmamasi icin
        left = Math.max(pad, left);
        top = Math.max(pad, top);
        setMenuPos({ left, top });
    }, [contextMenu, showMoveMenu]); // showMoveMenu degisince de yeniden hesapla

    if (!contextMenu) return null;

    const userObj = contextMenu.user;
    let avatarUrl = userObj.avatar || userObj.avatarUrl;
    if (!avatarUrl) {
        const foundUser = allUsers.find(u => u.username === userObj.username);
        avatarUrl = foundUser?.avatar || getAvatar(userObj.username);
    }

    const volumeVal = remoteVolumes[userObj.username] || 100;

    const handleStopPropagation = useCallback((e) => e.stopPropagation(), []);
    const handleAvatarError = useCallback((e) => { e.target.onerror = null; e.target.src = getAvatar(userObj.username); }, [getAvatar, userObj.username]);
    const handleVolumeSliderChange = useCallback((e) => handleVolumeChange(userObj.username, e), [handleVolumeChange, userObj.username]);
    const handleProfileClick = useCallback(() => handleMenuAction('profile'), [handleMenuAction]);
    const handleProfileKeyDown = useCallback((e) => e.key === 'Enter' && handleMenuAction('profile'), [handleMenuAction]);
    const handleDmClick = useCallback(() => handleMenuAction('dm'), [handleMenuAction]);
    const handleDmKeyDown = useCallback((e) => e.key === 'Enter' && handleMenuAction('dm'), [handleMenuAction]);
    const handleAddFriendClick = useCallback(() => handleMenuAction('add_friend'), [handleMenuAction]);
    const handleAddFriendKeyDown = useCallback((e) => e.key === 'Enter' && handleMenuAction('add_friend'), [handleMenuAction]);
    const handleToggleMoveMenu = useCallback(() => setShowMoveMenu(prev => !prev), [setShowMoveMenu]);
    const handleKickClick = useCallback(() => handleMenuAction('kick'), [handleMenuAction]);
    const handleServerMuteClick = useCallback(() => handleMenuAction('server_mute'), [handleMenuAction]);
    const handleServerDeafenClick = useCallback(() => handleMenuAction('server_deafen'), [handleMenuAction]);
    const handleMuteLocalClick = useCallback(() => handleMenuAction('mute_local'), [handleMenuAction]);

    return ReactDOM.createPortal(
        <div
            ref={menuRef}
            style={{
                ...styles.contextMenu,
                left: `${menuPos.left}px`,
                top: `${menuPos.top}px`,
                position: 'fixed',
                zIndex: 2147483647,
                maxHeight: 'calc(100vh - 20px)',
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
            }}
            onClick={handleStopPropagation}
        >
            {/* Header */}
            <div style={{ ...styles.menuHeader, flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={avatarUrl} alt={userObj.username}
                        onError={handleAvatarError}
                        style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #5865f2', flexShrink: 0 }} />
                    <div>
                        <div style={{ fontWeight: '600', fontSize: '14px', color: '#fff' }}>{userObj.username}</div>
                        {userObj.username === currentUsername && (
                            <div style={{ fontSize: '11px', color: '#b9bbbe', marginTop: '1px' }}>Sensin</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Volume Slider */}
            {isClientInThisChannel && userObj.username !== currentUsername && (
                <div style={{ ...styles.volumeSection, flexShrink: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '12px', color: '#b9bbbe', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <path d="M11 5L6 9H2v6h4l5 4V5z" fill="#b9bbbe" />
                                {volumeVal > 0 && <path d="M15.54 8.46a5 5 0 010 7.07" stroke="#b9bbbe" strokeWidth="1.5" strokeLinecap="round" />}
                                {volumeVal > 100 && <path d="M19.07 4.93a10 10 0 010 14.14" stroke="#5865f2" strokeWidth="1.5" strokeLinecap="round" />}
                            </svg>
                            Ses Seviyesi
                        </span>
                        <span style={{
                            fontSize: '12px', fontWeight: '700',
                            color: volumeVal > 100 ? '#5865f2' : '#fff',
                            background: volumeVal > 100 ? 'rgba(88,101,242,0.15)' : 'rgba(255,255,255,0.08)',
                            padding: '2px 8px', borderRadius: '10px', minWidth: '42px', textAlign: 'center'
                        }}>{volumeVal}%</span>
                    </div>
                    <div style={{ position: 'relative', height: '20px', display: 'flex', alignItems: 'center' }}>
                        <input type="range" min="0" max="200" value={volumeVal}
                            onChange={handleVolumeSliderChange}
                            aria-label={`${userObj.username} ses seviyesi`}
                            className="voice-volume-slider"
                            style={{ width: '100%', height: '6px', cursor: 'pointer', WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none', background: 'transparent', outline: 'none', position: 'relative', zIndex: 2 }} />
                        <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)', height: '6px', borderRadius: '3px', overflow: 'hidden', pointerEvents: 'none', zIndex: 1, background: '#1e1f22' }}>
                            <div style={{ height: '100%', width: `${(volumeVal / 200) * 100}%`, background: volumeVal > 100 ? 'linear-gradient(90deg, #5865f2 50%, #7289da 100%)' : '#5865f2', borderRadius: '3px', transition: 'width 0.05s ease' }} />
                        </div>
                        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '2px', height: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '1px', pointerEvents: 'none', zIndex: 1 }} />
                    </div>
                </div>
            )}

            {/* Scrollable Actions Area */}
            <div style={{ overflowY: 'auto', overflowX: 'hidden', flex: 1, minHeight: 0 }}>
                {/* Actions */}
                <div style={styles.menuSection} role="menu">
                    <div className="user-context-menu-item" role="menuitem" tabIndex={0} style={styles.menuItem} onClick={handleProfileClick} onKeyDown={handleProfileKeyDown}>
                        <span style={{ marginRight: '8px', opacity: 0.7 }}>{'👤'}</span> Profili G{'ö'}r{'ü'}nt{'ü'}le
                    </div>
                    <div className="user-context-menu-item" role="menuitem" tabIndex={0} style={styles.menuItem} onClick={handleDmClick} onKeyDown={handleDmKeyDown}>
                        <span style={{ marginRight: '8px', opacity: 0.7 }}>{'💬'}</span> {'Ö'}zelden Mesaj At
                    </div>
                    {userObj.username !== currentUsername &&
                        !friendsList.some(f => f.sender_username === userObj.username || f.receiver_username === userObj.username) && (
                            <div className="user-context-menu-item" role="menuitem" tabIndex={0} style={styles.menuItem} onClick={handleAddFriendClick} onKeyDown={handleAddFriendKeyDown}>
                                <span style={{ marginRight: '8px', opacity: 0.7 }}>{'➕'}</span> Arkada{'ş'} Ekle
                            </div>
                        )}
                </div>

                {/* Admin Tools */}
                {isAdmin && userObj.username !== currentUsername && (
                    <>
                        <div style={styles.menuDivider} />
                        <div style={styles.menuSection}>
                            <div style={{ fontSize: '10px', color: '#72767d', padding: '6px 12px 4px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                Mod Ara{'ç'}lar{'ı'}
                            </div>
                            <div className="user-context-menu-item" style={styles.menuItem} onClick={handleToggleMoveMenu}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                    <span><span style={{ marginRight: '8px', opacity: 0.7 }}>{'🔀'}</span>Ba{'ş'}ka Kanala Ta{'şı'}</span>
                                    <span style={{ fontSize: '12px', transform: showMoveMenu ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', color: '#72767d' }}>{'▸'}</span>
                                </div>
                            </div>

                            {showMoveMenu && voiceChannels?.length > 0 && (
                                <div style={{
                                    padding: '4px 0',
                                    background: 'rgba(88, 101, 242, 0.06)',
                                    borderLeft: '3px solid #5865f2',
                                    margin: '2px 8px 2px 12px',
                                    borderRadius: '0 4px 4px 0',
                                    maxHeight: '160px',
                                    overflowY: 'auto',
                                }}>
                                    {voiceChannels.filter(c => c.slug !== roomName).map(channel => (
                                        <div key={channel.slug}
                                            className="user-context-menu-item"
                                            style={{ ...styles.menuItem, paddingLeft: '12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', margin: '0 2px' }}
                                            onClick={() => handleMenuAction('move', channel.slug)}>
                                            <span style={{ color: '#5865f2', fontSize: '11px' }}>{'🔊'}</span> {channel.name}
                                        </div>
                                    ))}
                                    {voiceChannels.filter(c => c.slug !== roomName).length === 0 && (
                                        <div style={{ ...styles.menuItem, color: '#72767d', cursor: 'default', paddingLeft: '12px', fontSize: '12px' }}>
                                            Ba{'ş'}ka kanal yok
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="user-context-menu-item-danger" style={{ ...styles.menuItem, color: '#ed4245' }} onClick={handleKickClick}>
                                <span style={{ marginRight: '8px' }}>{'❌'}</span> Kanaldan At
                            </div>
                            <div className="user-context-menu-item" style={styles.menuItem} onClick={handleServerMuteClick}>
                                <span style={{ marginRight: '8px', opacity: 0.7 }}>{'🔇'}</span> Sunucu Sustur
                            </div>
                            <div className="user-context-menu-item" style={styles.menuItem} onClick={handleServerDeafenClick}>
                                <span style={{ marginRight: '8px', opacity: 0.7 }}>{'🙉'}</span> Sunucu Sa{'ğı'}rla{'ş'}t{'ı'}r
                            </div>
                        </div>
                    </>
                )}

                {/* Local Mute */}
                {userObj.username !== currentUsername && (
                    <>
                        <div style={styles.menuDivider} />
                        <div style={{ ...styles.menuSection, paddingBottom: '4px' }}>
                            <div className="user-context-menu-item" style={styles.menuItem} onClick={handleMuteLocalClick}>
                                <span style={{ marginRight: '8px', opacity: 0.7 }}>{'🔇'}</span> Benim {'İç'}in Sessize Al
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>,
        document.getElementById('portal-root') || document.body
    );
};

export default React.memo(VoiceUserContextMenu);
