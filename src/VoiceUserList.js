// frontend/src/VoiceUserList.js

import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom'; // 🔥 PORTAL için gerekli
import { useGlobalWebSocket } from './GlobalWebSocketContext'; // 🔥 Global state ekle
import SparkMD5 from 'spark-md5'; // 🔥 Avatar için

// 🔥 Avatar helper fonksiyonu
const getDeterministicAvatar = (username) => {
    if (!username) return 'https://ui-avatars.com/api/?name=User&background=5865f2&color=fff&bold=true&size=128';
    const hash = SparkMD5.hash(username);
    const hue = parseInt(hash.substring(0, 8), 16) % 360;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=${hue.toString(16).padStart(2, '0')}${((hue + 60) % 360).toString(16).padStart(2, '0')}${((hue + 120) % 360).toString(16).padStart(2, '0')}&color=fff&bold=true&size=128`;
};

const VoiceUserList = ({
    voiceUsers: propVoiceUsers,
    roomName,
    currentUsername,
    remoteVolumes,
    setRemoteVolume,
    isClientInThisChannel,
    isPttActive,
    onUserAction,
    isAdmin,
    voiceChannels,
    friendsList = [], // 🔥 YENİ: Arkadaş listesi
    getDeterministicAvatar: propGetDeterministicAvatar, // 🔥 Parent'tan gelen avatar helper
    allUsers = [] // 🔥 Tüm kullanıcılar
}) => {

    // 🔥 Avatar helper - prop'tan gelen yoksa local kullan
    const getAvatar = propGetDeterministicAvatar || getDeterministicAvatar;

    // ✅ HOOK #1: State (her zaman çalışmalı)
    const [contextMenu, setContextMenu] = useState(null);
    const [showMoveMenu, setShowMoveMenu] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [draggedUser, setDraggedUser] = useState(null);

    // 🔥 Global WebSocket'ten voice users çek
    const { globalData } = useGlobalWebSocket();

    // ✅ HOOK #2: Effect (her zaman çalışmalı)
    useEffect(() => {
        const handleClick = () => {
            setContextMenu(null);
        };

        if (contextMenu) {
            window.addEventListener('click', handleClick);
            return () => window.removeEventListener('click', handleClick);
        }
    }, [contextMenu]);

    // ✅ DATA HAZIRLIĞI - Hem prop'tan hem global'den voice users al
    const voiceUsers = propVoiceUsers || globalData?.voice_users || {};

    const usersInRoom = (voiceUsers && typeof voiceUsers === 'object' && !Array.isArray(voiceUsers))
        ? (voiceUsers[roomName] || [])
        : [];

    // 🔍 Debug: Log users (only in development)
    useEffect(() => {
        if (import.meta.env.MODE === 'development') {
            console.log(`🔊 [VoiceUserList] ${roomName}:`, {
                propVoiceUsers,
                globalVoiceUsers: globalData?.voice_users,
                finalVoiceUsers: voiceUsers,
                usersInRoom: usersInRoom,
                userCount: usersInRoom.length
            });
        }
    }, [propVoiceUsers, globalData, roomName, usersInRoom]);    // ✅ EVENT HANDLER'LARI
    const handleVolumeChange = useCallback((user, event) => {
        const volume = event.target.value;
        setRemoteVolume(user, parseInt(volume, 10));
    }, [setRemoteVolume]);

    const handleContextMenu = useCallback((e, userObj) => {
        e.preventDefault();
        const user = userObj.username;

        // Kendi kullanıcın değilse menü göster
        if (user !== currentUsername) {
            setContextMenu({
                x: e.clientX,
                y: e.clientY,
                user: userObj
            });
        }
    }, [currentUsername]);

    const closeContextMenu = useCallback(() => {
        setContextMenu(null);
        setShowMoveMenu(false);
    }, []);

    const handleMenuAction = useCallback((action, targetChannel) => {
        if (contextMenu && onUserAction) {
            if (action === 'move' && targetChannel) {
                onUserAction(action, contextMenu.user.username, targetChannel);
            } else {
                onUserAction(action, contextMenu.user.username);
            }
        }
        closeContextMenu();
    }, [contextMenu, onUserAction, closeContextMenu]);

    const handleUserClick = useCallback((userObj) => {
        if (userObj.username !== currentUsername && onUserAction) {
            onUserAction('profile', userObj.username);
        }
    }, [currentUsername, onUserAction]);

    // 🔥 DRAG & DROP - Admin kullanıcı taşıma
    const handleDragStart = useCallback((e, userObj) => {
        if (!isAdmin) return;
        setIsDragging(true);
        setDraggedUser(userObj.username);
        e.dataTransfer.setData('application/json', JSON.stringify({
            username: userObj.username,
            fromChannel: roomName
        }));
        e.dataTransfer.effectAllowed = 'move';
        // Drag görselini ayarla
        const dragGhost = document.createElement('div');
        dragGhost.style.cssText = 'position:fixed;top:-1000px;background:linear-gradient(135deg,#5865f2,#7289da);color:#fff;padding:8px 16px;border-radius:10px;font-size:13px;font-weight:600;box-shadow:0 4px 20px rgba(88,101,242,0.6);display:flex;align-items:center;gap:8px;z-index:99999;';
        dragGhost.innerHTML = '🔀 ' + userObj.username;
        document.body.appendChild(dragGhost);
        e.dataTransfer.setDragImage(dragGhost, 60, 20);
        setTimeout(() => document.body.removeChild(dragGhost), 0);
    }, [isAdmin, roomName]);

    const handleDragEnd = useCallback(() => {
        setIsDragging(false);
        setDraggedUser(null);
    }, []);

    // ✅ KOŞULLU RENDER - EN SONDA (tüm hook'lardan sonra)
    // 🔥 SADECE GEÇERSIZ VERI VARSA NULL DÖN
    if (!voiceUsers || typeof voiceUsers !== 'object' || Array.isArray(voiceUsers)) {
        console.warn(`⚠️ [VoiceUserList] ${roomName}: Invalid voiceUsers structure:`, voiceUsers);
        return null; // 🔥 Boş kanal arka planı yok
    }

    // 🔥 KULLANICILAR YOKSA NULL DÖN (Arka plan gösterme!)
    if (!Array.isArray(usersInRoom) || usersInRoom.length === 0) {
        console.log(`📭 [VoiceUserList] ${roomName}: No users in room`);
        return null; // 🔥 Boş kanal arka planı yok
    }

    console.log(`✅ [VoiceUserList] ${roomName}: Rendering ${usersInRoom.length} user(s)`);

    return (
        <div style={styles.container}>
            {/* Başlık kaldırıldı - direkt kullanıcı listesi */}
            <div style={styles.userList}>
                {usersInRoom.map((userObj) => {
                    const user = userObj.username;
                    const isTalking = userObj.is_talking;
                    const isMicOff = userObj.is_mic_off;
                    const isDeafened = userObj.is_deafened;
                    const isSharing = userObj.is_sharing;

                    // Durum ikonunu belirle
                    let statusIcon;
                    let userStyle = styles.activeUser;

                    if (isDeafened) {
                        statusIcon = '🔕'; // Kulaklık Kapalı
                        userStyle = styles.deafenedUser;
                    } else if (isTalking) {
                        statusIcon = '🗣️'; // Konuşuyor
                        userStyle = styles.talkingUser;
                    } else if (isMicOff) {
                        statusIcon = '🔇'; // Mikrofon Kapalı
                        userStyle = styles.mutedUser;
                    } else {
                        statusIcon = '🎤'; // Mikrofon Açık
                        userStyle = styles.activeUser;
                    }

                    const isSelf = user === currentUsername;

                    // 🔥 AVATAR - Önce user'dan al, yoksa allUsers'dan bul, yoksa generate et
                    let avatarUrl = userObj.avatar || userObj.avatarUrl;
                    if (!avatarUrl) {
                        const foundUser = allUsers.find(u => u.username === user);
                        avatarUrl = foundUser?.avatar || getAvatar(user);
                    }

                    if (isSelf) {
                        return (
                            <div key={user} style={styles.userItemNew}>
                                <div style={styles.avatarContainer}>
                                    <img
                                        src={avatarUrl}
                                        alt={user}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = getAvatar(user);
                                        }}
                                        style={{
                                            ...styles.avatar,
                                            border: isTalking ? '2px solid #4CAF50' : '2px solid transparent',
                                            boxShadow: isTalking ? '0 0 10px rgba(76, 175, 80, 0.6)' : 'none',
                                        }}
                                    />
                                    <div style={{
                                        ...styles.statusBadge,
                                        background: isDeafened ? '#e74c3c' : isMicOff ? '#e67e22' : '#43b581'
                                    }}>
                                        {statusIcon}
                                    </div>
                                </div>
                                <div style={styles.userInfo}>
                                    <span
                                        className={isClientInThisChannel && isPttActive && !isTalking ? 'ptt-active' : ''}
                                        style={{ ...styles.username, ...userStyle, fontWeight: 'bold' }}
                                    >
                                        {user} <span style={{ fontSize: '0.85em', color: '#99aab5' }}>(Sen)</span>
                                    </span>
                                    {isSharing && <div style={styles.sharingIndicator}>🖥️ Ekran Paylaşıyor</div>}
                                </div>
                            </div>
                        );
                    }

                    // 🔥 currentVolume kullanılmıyor artık - slider kaldırıldı

                    return (
                        <div
                            key={user}
                            style={{
                                ...styles.userItemNew,
                                ...(isAdmin ? { cursor: 'grab' } : {}),
                                ...(isDragging && draggedUser === user ? {
                                    opacity: 0.4,
                                    border: '1px dashed rgba(88, 101, 242, 0.5)',
                                    background: 'rgba(88, 101, 242, 0.05)'
                                } : {})
                            }}
                            draggable={isAdmin}
                            onDragStart={(e) => handleDragStart(e, userObj)}
                            onDragEnd={handleDragEnd}
                            onContextMenu={(e) => handleContextMenu(e, userObj)}
                        >
                            <div
                                style={styles.userClickArea}
                                onClick={() => handleUserClick(userObj)}
                            >
                                <div style={styles.avatarContainer}>
                                    <img
                                        src={avatarUrl}
                                        alt={user}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = getAvatar(user);
                                        }}
                                        style={{
                                            ...styles.avatar,
                                            border: isTalking ? '2px solid #4CAF50' : '2px solid transparent',
                                            boxShadow: isTalking ? '0 0 10px rgba(76, 175, 80, 0.6)' : 'none',
                                        }}
                                    />
                                    <div style={{
                                        ...styles.statusBadge,
                                        background: isDeafened ? '#e74c3c' : isMicOff ? '#e67e22' : '#43b581'
                                    }}>
                                        {statusIcon}
                                    </div>
                                </div>
                                <div style={styles.userInfo}>
                                    <span
                                        className={isTalking ? 'voice-user-item is-talking' : ''}
                                        style={{ ...styles.username, ...userStyle }}
                                    >
                                        {user}
                                    </span>
                                    {isSharing && <div style={styles.sharingIndicator}>🖥️ Ekran Paylaşıyor</div>}
                                </div>
                            </div>

                            {/* 🔥 SES SLIDER KALDIRILDI - Gereksiz tekrar */}
                        </div>
                    );
                })}
            </div>

            {/* 🔥 CONTEXT MENU - PORTAL İLE RENDER */}
            {contextMenu && ReactDOM.createPortal(
                <div
                    style={{
                        ...styles.contextMenu,
                        left: `${Math.min(contextMenu.x, window.innerWidth - 250)}px`, // Ekrandan taşmayı önle
                        top: `${Math.min(contextMenu.y, window.innerHeight - 400)}px`, // Ekrandan taşmayı önle
                        position: 'fixed', // 🔥 Fixed position
                        zIndex: 2147483647 // 🔥 MAX z-index
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div style={styles.menuHeader}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {/* 🔥 Avatar - İsim baş harfi yerine gerçek avatar */}
                            <img
                                src={(() => {
                                    const userObj = contextMenu.user;
                                    let avatarUrl = userObj.avatar || userObj.avatarUrl;
                                    if (!avatarUrl) {
                                        const foundUser = allUsers.find(u => u.username === userObj.username);
                                        avatarUrl = foundUser?.avatar || getAvatar(userObj.username);
                                    }
                                    return avatarUrl;
                                })()}
                                alt={contextMenu.user.username}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = getAvatar(contextMenu.user.username);
                                }}
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    border: '2px solid #5865f2'
                                }}
                            />
                            <span style={{ fontWeight: '600' }}>{contextMenu.user.username}</span>
                        </div>
                    </div>

                    {/* Ses Seviyesi Slider */}
                    {isClientInThisChannel && (
                        <div style={styles.volumeSection}>
                            <div style={{ fontSize: '11px', color: '#b9bbbe', marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
                                <span>🔊 Ses Seviyesi</span>
                                <span>{remoteVolumes[contextMenu.user.username] || 100}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="200"
                                value={remoteVolumes[contextMenu.user.username] || 100}
                                onChange={(e) => handleVolumeChange(contextMenu.user.username, e)}
                                style={{
                                    ...styles.volumeSlider,
                                    background: `linear-gradient(to right, #5865f2 0%, #5865f2 ${((remoteVolumes[contextMenu.user.username] || 100) / 200) * 100}%, rgba(255,255,255,0.1) ${((remoteVolumes[contextMenu.user.username] || 100) / 200) * 100}%, rgba(255,255,255,0.1) 100%)`
                                }}
                            />
                        </div>
                    )}

                    {/* Genel Aksiyonlar */}
                    <div style={styles.menuSection}>
                        <div style={styles.menuItem} onClick={() => handleMenuAction('profile')}>
                            👤 Profili Görüntüle
                        </div>
                        <div style={styles.menuItem} onClick={() => handleMenuAction('dm')}>
                            💬 Özelden Mesaj At
                        </div>

                        {/* 🔥 Arkadaş Ekle - Sadece arkadaş olmayan ve kendisi olmayan kişilerde */}
                        {contextMenu.user.username !== currentUsername &&
                            !friendsList.some(f =>
                                f.sender_username === contextMenu.user.username ||
                                f.receiver_username === contextMenu.user.username
                            ) && (
                                <div style={styles.menuItem} onClick={() => handleMenuAction('add_friend')}>
                                    ➕ Arkadaş Ekle
                                </div>
                            )}
                    </div>

                    {/* Admin/Mod Özellikleri */}
                    {isAdmin && (
                        <>
                            <div style={styles.menuDivider}></div>
                            <div style={styles.menuSection}>
                                <div style={{ fontSize: '10px', color: '#b9bbbe', padding: '4px 8px', fontWeight: '600' }}>
                                    ⚡ MOD ARAÇLARI
                                </div>

                                {/* Başka Kanala Taşı - Click-based */}
                                <div
                                    style={styles.menuItem}
                                    onClick={() => setShowMoveMenu(!showMoveMenu)}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                        <span>🔀 Başka Kanala Taşı</span>
                                        <span style={{ fontSize: '10px', transform: showMoveMenu ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>›</span>
                                    </div>
                                </div>

                                {/* Kanal Listesi - Click ile açılır */}
                                {showMoveMenu && voiceChannels && voiceChannels.length > 0 && (
                                    <div style={{
                                        padding: '4px 0',
                                        background: 'rgba(88, 101, 242, 0.05)',
                                        borderTop: '1px solid rgba(88, 101, 242, 0.15)',
                                        borderBottom: '1px solid rgba(88, 101, 242, 0.15)',
                                        margin: '2px 0'
                                    }}>
                                        {voiceChannels
                                            .filter(channel => channel.slug !== roomName)
                                            .map(channel => (
                                                <div
                                                    key={channel.slug}
                                                    style={{
                                                        ...styles.menuItem,
                                                        paddingLeft: '24px',
                                                        fontSize: '0.82em',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px'
                                                    }}
                                                    onClick={() => handleMenuAction('move', channel.slug)}
                                                >
                                                    <span style={{ color: '#5865f2' }}>🔊</span> {channel.name}
                                                </div>
                                            ))
                                        }
                                        {voiceChannels.filter(c => c.slug !== roomName).length === 0 && (
                                            <div style={{ ...styles.menuItem, color: '#72767d', cursor: 'default', paddingLeft: '24px', fontSize: '0.82em' }}>
                                                Başka kanal yok
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div style={styles.menuItem} onClick={() => handleMenuAction('kick')}>
                                    ❌ Kanaldan At
                                </div>
                                <div style={styles.menuItem} onClick={() => handleMenuAction('server_mute')}>
                                    🔇 Sunucu Sustur
                                </div>
                                <div style={styles.menuItem} onClick={() => handleMenuAction('server_deafen')}>
                                    🙉 Sunucu Sağırlaştır
                                </div>
                            </div>
                        </>
                    )}

                    {/* Lokal Sessiz Alma */}
                    {!isAdmin && (
                        <>
                            <div style={styles.menuDivider}></div>
                            <div style={styles.menuItem} onClick={() => handleMenuAction('mute_local')}>
                                🔇 Sessize Al (Sadece Sen Duymazsın)
                            </div>
                        </>
                    )}
                </div>,
                document.getElementById('portal-root') || document.body // 🔥 PORTAL TARGET
            )}
        </div>
    );
};

const styles = {
    container: {
        width: '100%',
        backgroundColor: 'transparent',
        color: '#ccc',
        padding: '4px 0',
        minHeight: '30px', // En az bir kullanıcı yüksekliği
        maxHeight: '400px', // Çok fazla kullanıcı varsa scroll
        overflowY: 'auto' // Scroll aktif
    },
    header: {
        fontSize: '0.7em',
        padding: '4px 8px',
        marginBottom: '4px',
        color: '#99aab5',
        textTransform: 'uppercase',
        fontWeight: '600',
        letterSpacing: '0.5px',
        display: 'flex',
        alignItems: 'center',
    },
    userList: {
        padding: '0 2px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
    },

    // Kompakt Kullanıcı Kartı - 🔥 İNCE TASARIM
    userItemNew: {
        padding: '4px 6px', // 🔥 Daha ince padding
        fontSize: '0.8em', // 🔥 Daha küçük font
        borderRadius: '4px', // 🔥 Daha küçük radius
        background: 'rgba(255, 255, 255, 0.02)',
        transition: 'all 0.15s ease',
        cursor: 'pointer',
        border: '1px solid transparent',
        display: 'flex', // 🔥 Flex layout ana container'da
        flexDirection: 'row', // 🔥 Yatay düzen - avatar solda, isim sağda
        alignItems: 'center', // 🔥 Dikey ortalama
    },

    userClickArea: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px', // 🔥 Daha dar gap
        width: '100%', // 🔥 Tam genişlik
        flexDirection: 'row', // 🔥 Avatar solda, isim sağda
    },

    avatarContainer: {
        position: 'relative',
        flexShrink: 0,
        width: '24px', // 🔥 Daha küçük - ince tasarım
        height: '24px', // 🔥 Daha küçük
        display: 'flex', // 🔥 Flex layout
        alignItems: 'center', // 🔥 Ortala
        justifyContent: 'center', // 🔥 Ortala
    },

    avatar: {
        width: '22px', // 🔥 Daha küçük avatar
        height: '22px', // 🔥 Daha küçük avatar
        borderRadius: '50%',
        objectFit: 'cover',
        transition: 'all 0.2s ease',
        display: 'block',
        backgroundColor: '#2f3136',
        flexShrink: 0, // 🔥 Küçülmeyi önle
        minWidth: '22px', // 🔥 Minimum genişlik
        minHeight: '22px', // 🔥 Minimum yükseklik
    },

    statusBadge: {
        position: 'absolute',
        bottom: '-2px',
        right: '-2px',
        width: '10px', // 🔥 Daha küçük badge
        height: '10px', // 🔥 Daha küçük badge
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '6px', // 🔥 Daha küçük icon
        border: '1px solid #2f3136', // 🔥 Daha ince border
        boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
    },

    userInfo: {
        flex: 1,
        overflow: 'hidden',
        marginLeft: '2px', // 🔥 İsim avatarın hemen sağında
    },

    username: {
        display: 'block',
        fontSize: '0.85em', // 🔥 Daha küçük font
        fontWeight: '500',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },

    sharingIndicator: {
        fontSize: '0.65em', // 🔥 Daha küçük
        color: '#5865f2',
        marginTop: '0',
        fontWeight: '500',
    },

    // Durum Stilleri
    talkingUser: { color: '#4CAF50', fontWeight: 'bold' },
    activeUser: { color: '#CCCCCC' },
    mutedUser: { color: '#e67e22' },
    deafenedUser: { color: '#e74c3c' },

    volumeControl: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '0 2px',
        gap: '4px',
    },
    volumeSlider: {
        flexGrow: 1,
        height: '3px',
        cursor: 'pointer',
        borderRadius: '2px',
        WebkitAppearance: 'none',
        background: 'rgba(255, 255, 255, 0.1)',
        outline: 'none',
    },
    volumeText: {
        fontSize: '0.7em',
        minWidth: '35px',
        textAlign: 'right',
        color: '#99aab5',
        fontWeight: '500',
    },

    // Context Menu Styles
    contextMenu: {
        position: 'fixed',
        backgroundColor: '#18191c',
        border: '1px solid #2b2d31',
        borderRadius: '6px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
        zIndex: 10000,
        minWidth: '220px',
        maxWidth: '280px',
        overflow: 'visible',
    },
    menuHeader: {
        padding: '12px',
        fontWeight: '600',
        color: '#fff',
        backgroundColor: '#2b2d31',
        fontSize: '0.9em',
        borderBottom: '1px solid #1e1f22',
    },
    menuSection: {
        padding: '4px 0',
    },
    menuDivider: {
        height: '1px',
        backgroundColor: '#2b2d31',
        margin: '4px 0',
    },
    volumeSection: {
        padding: '10px 12px',
        backgroundColor: '#1e1f22',
        borderBottom: '1px solid #2b2d31',
    },
    menuItem: {
        padding: '8px 12px',
        cursor: 'pointer',
        color: '#b5bac1',
        fontSize: '0.85em',
        transition: 'background-color 0.15s, color 0.15s',
        position: 'relative',
    },
    subMenu: {
        position: 'absolute',
        backgroundColor: '#18191c',
        border: '1px solid #2b2d31',
        borderRadius: '6px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
        zIndex: 2147483647, // 🔥 MAX z-index (menu ile aynı seviye)
        minWidth: '180px',
        overflow: 'hidden',
        marginLeft: '4px',
    },
};

// Add hover effect via CSS-in-JS (alternative: use className)
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    div[style*="userItemNew"]:hover {
        background: rgba(88, 101, 242, 0.08) !important;
        border-color: rgba(88, 101, 242, 0.2) !important;
        transform: translateX(1px);
    }
    
    .user-context-menu-item:hover {
        background-color: rgba(88, 101, 242, 0.3) !important;
        color: #fff !important;
    }
    
    .user-context-menu-item-danger:hover {
        background-color: rgba(237, 66, 69, 0.2) !important;
        color: #ed4245 !important;
    }
    
    .user-context-submenu-item:hover {
        background-color: rgba(88, 101, 242, 0.3) !important;
        color: #fff !important;
    }
    
    /* Drag & Drop styling */
    .voice-user-dragging {
        opacity: 0.4 !important;
        border: 1px dashed rgba(88, 101, 242, 0.5) !important;
    }
    
    .voice-channel-drop-target {
        background: rgba(88, 101, 242, 0.15) !important;
        border-color: rgba(88, 101, 242, 0.6) !important;
        box-shadow: inset 0 0 12px rgba(88, 101, 242, 0.2) !important;
    }
    
    .voice-channel-drop-target::after {
        content: '🔀 Buraya bırak';
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 10px;
        color: #5865f2;
        font-weight: 600;
        background: rgba(88, 101, 242, 0.15);
        padding: 2px 8px;
        border-radius: 4px;
    }

    /* Volume slider styling */
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #5865f2;
        cursor: pointer;
        box-shadow: 0 0 3px rgba(88, 101, 242, 0.5);
    }
    
    input[type="range"]::-moz-range-thumb {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #5865f2;
        cursor: pointer;
        border: none;
        box-shadow: 0 0 3px rgba(88, 101, 242, 0.5);
    }
`;
if (!document.head.querySelector('style[data-voice-user-list]')) {
    styleSheet.setAttribute('data-voice-user-list', 'true');
    document.head.appendChild(styleSheet);
}

export default React.memo(VoiceUserList);

