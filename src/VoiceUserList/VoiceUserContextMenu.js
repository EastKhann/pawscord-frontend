// frontend/src/VoiceUserList/VoiceUserContextMenu.js
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles';

const VoiceUserContextMenu = ({
    contextMenu, currentUsername, isAdmin, isClientInThisChannel,
    remoteVolumes, handleVolumeChange, handleMenuAction,
    showMoveMenu, setShowMoveMenu, voiceChannels, roomName,
    getAvatar, allUsers, friendsList
}) => {
    if (!contextMenu) return null;

    const userObj = contextMenu.user;
    let avatarUrl = userObj.avatar || userObj.avatarUrl;
    if (!avatarUrl) {
        const foundUser = allUsers.find(u => u.username === userObj.username);
        avatarUrl = foundUser?.avatar || getAvatar(userObj.username);
    }

    const volumeVal = remoteVolumes[userObj.username] || 100;

    return ReactDOM.createPortal(
        <div
            style={{
                ...styles.contextMenu,
                left: `${Math.min(contextMenu.x, window.innerWidth - 260)}px`,
                top: `${Math.min(contextMenu.y, window.innerHeight - 400)}px`,
                position: 'fixed',
                zIndex: 2147483647
            }}
            onClick={(e) => e.stopPropagation()}
        >
            {/* Header */}
            <div style={styles.menuHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={avatarUrl} alt={userObj.username}
                        onError={(e) => { e.target.onerror = null; e.target.src = getAvatar(userObj.username); }}
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
                <div style={styles.volumeSection}>
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
                            onChange={(e) => handleVolumeChange(userObj.username, e)}
                            className="voice-volume-slider"
                            style={{ width: '100%', height: '6px', cursor: 'pointer', WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none', background: 'transparent', outline: 'none', position: 'relative', zIndex: 2 }} />
                        <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)', height: '6px', borderRadius: '3px', overflow: 'hidden', pointerEvents: 'none', zIndex: 1, background: '#1e1f22' }}>
                            <div style={{ height: '100%', width: `${(volumeVal / 200) * 100}%`, background: volumeVal > 100 ? 'linear-gradient(90deg, #5865f2 50%, #7289da 100%)' : '#5865f2', borderRadius: '3px', transition: 'width 0.05s ease' }} />
                        </div>
                        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '2px', height: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '1px', pointerEvents: 'none', zIndex: 1 }} />
                    </div>
                </div>
            )}

            {/* Actions */}
            <div style={styles.menuSection}>
                <div className="user-context-menu-item" style={styles.menuItem} onClick={() => handleMenuAction('profile')}>
                    <span style={{ marginRight: '8px', opacity: 0.7 }}>{'\uD83D\uDC64'}</span> Profili G{'\u00F6'}r{'\u00FC'}nt{'\u00FC'}le
                </div>
                <div className="user-context-menu-item" style={styles.menuItem} onClick={() => handleMenuAction('dm')}>
                    <span style={{ marginRight: '8px', opacity: 0.7 }}>{'\uD83D\uDCAC'}</span> {'\u00D6'}zelden Mesaj At
                </div>
                {userObj.username !== currentUsername &&
                    !friendsList.some(f => f.sender_username === userObj.username || f.receiver_username === userObj.username) && (
                        <div className="user-context-menu-item" style={styles.menuItem} onClick={() => handleMenuAction('add_friend')}>
                            <span style={{ marginRight: '8px', opacity: 0.7 }}>{'\u2795'}</span> Arkada{'\u015F'} Ekle
                        </div>
                    )}
            </div>

            {/* Admin Tools */}
            {isAdmin && userObj.username !== currentUsername && (
                <>
                    <div style={styles.menuDivider} />
                    <div style={styles.menuSection}>
                        <div style={{ fontSize: '10px', color: '#72767d', padding: '6px 12px 4px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Mod Ara{'\u00E7'}lar{'\u0131'}
                        </div>
                        <div className="user-context-menu-item" style={styles.menuItem} onClick={() => setShowMoveMenu(!showMoveMenu)}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                <span><span style={{ marginRight: '8px', opacity: 0.7 }}>{'\uD83D\uDD00'}</span>Ba{'\u015F'}ka Kanala Ta{'\u015F\u0131'}</span>
                                <span style={{ fontSize: '10px', transform: showMoveMenu ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s', color: '#72767d' }}>{'\u203A'}</span>
                            </div>
                        </div>

                        {showMoveMenu && voiceChannels?.length > 0 && (
                            <div style={{ padding: '4px 0', background: 'rgba(88, 101, 242, 0.05)', borderTop: '1px solid rgba(88, 101, 242, 0.15)', borderBottom: '1px solid rgba(88, 101, 242, 0.15)', margin: '2px 0' }}>
                                {voiceChannels.filter(c => c.slug !== roomName).map(channel => (
                                    <div key={channel.slug} style={{ ...styles.menuItem, paddingLeft: '24px', fontSize: '0.82em', display: 'flex', alignItems: 'center', gap: '8px' }}
                                        onClick={() => handleMenuAction('move', channel.slug)}>
                                        <span style={{ color: '#5865f2' }}>{'\uD83D\uDD0A'}</span> {channel.name}
                                    </div>
                                ))}
                                {voiceChannels.filter(c => c.slug !== roomName).length === 0 && (
                                    <div style={{ ...styles.menuItem, color: '#72767d', cursor: 'default', paddingLeft: '24px', fontSize: '0.82em' }}>
                                        Ba{'\u015F'}ka kanal yok
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="user-context-menu-item-danger" style={{ ...styles.menuItem, color: '#ed4245' }} onClick={() => handleMenuAction('kick')}>
                            <span style={{ marginRight: '8px' }}>{'\u274C'}</span> Kanaldan At
                        </div>
                        <div className="user-context-menu-item" style={styles.menuItem} onClick={() => handleMenuAction('server_mute')}>
                            <span style={{ marginRight: '8px', opacity: 0.7 }}>{'\uD83D\uDD07'}</span> Sunucu Sustur
                        </div>
                        <div className="user-context-menu-item" style={styles.menuItem} onClick={() => handleMenuAction('server_deafen')}>
                            <span style={{ marginRight: '8px', opacity: 0.7 }}>{'\uD83D\uDE49'}</span> Sunucu Sa{'\u011F\u0131'}rla{'\u015F'}t{'\u0131'}r
                        </div>
                    </div>
                </>
            )}

            {/* Local Mute */}
            {userObj.username !== currentUsername && (
                <>
                    <div style={styles.menuDivider} />
                    <div className="user-context-menu-item" style={styles.menuItem} onClick={() => handleMenuAction('mute_local')}>
                        <span style={{ marginRight: '8px', opacity: 0.7 }}>{'\uD83D\uDD07'}</span> Benim {'\u0130\u00E7'}in Sessize Al
                    </div>
                </>
            )}
        </div>,
        document.getElementById('portal-root') || document.body
    );
};

export default React.memo(VoiceUserContextMenu);
