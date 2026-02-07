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
        return null; // 🔥 Boş kanal arka planı yok
    }

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
                        left: `${Math.min(contextMenu.x, window.innerWidth - 260)}px`,
                        top: `${Math.min(contextMenu.y, window.innerHeight - 400)}px`,
                        position: 'fixed',
                        zIndex: 2147483647
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header with avatar and username */}
                    <div style={styles.menuHeader}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    border: '2px solid #5865f2',
                                    flexShrink: 0
                                }}
                            />
                            <div>
                                <div style={{ fontWeight: '600', fontSize: '14px', color: '#fff' }}>{contextMenu.user.username}</div>
                                {contextMenu.user.username === currentUsername && (
                                    <div style={{ fontSize: '11px', color: '#b9bbbe', marginTop: '1px' }}>Sensin</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 🎚️ Ses Seviyesi Slider — Premium UI */}
                    {isClientInThisChannel && contextMenu.user.username !== currentUsername && (
                        <div style={styles.volumeSection}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <span style={{ fontSize: '12px', color: '#b9bbbe', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M11 5L6 9H2v6h4l5 4V5z" fill="#b9bbbe" />{(remoteVolumes[contextMenu.user.username] || 100) > 0 && <path d="M15.54 8.46a5 5 0 010 7.07" stroke="#b9bbbe" strokeWidth="1.5" strokeLinecap="round" />}{(remoteVolumes[contextMenu.user.username] || 100) > 100 && <path d="M19.07 4.93a10 10 0 010 14.14" stroke="#5865f2" strokeWidth="1.5" strokeLinecap="round" />}</svg>
                                    Ses Seviyesi
                                </span>
                                <span style={{
                                    fontSize: '12px',
                                    fontWeight: '700',
                                    color: (remoteVolumes[contextMenu.user.username] || 100) > 100 ? '#5865f2' : '#fff',
                                    background: (remoteVolumes[contextMenu.user.username] || 100) > 100 ? 'rgba(88,101,242,0.15)' : 'rgba(255,255,255,0.08)',
                                    padding: '2px 8px',
                                    borderRadius: '10px',
                                    minWidth: '42px',
                                    textAlign: 'center'
                                }}>
                                    {remoteVolumes[contextMenu.user.username] || 100}%
                                </span>
                            </div>
                            <div style={{ position: 'relative', height: '20px', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={remoteVolumes[contextMenu.user.username] || 100}
                                    onChange={(e) => handleVolumeChange(contextMenu.user.username, e)}
                                    className="voice-volume-slider"
                                    style={{ width: '100%', height: '6px', cursor: 'pointer', WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none', background: 'transparent', outline: 'none', position: 'relative', zIndex: 2 }}
                                />
                                {/* Custom track background */}
                                <div style={{
                                    position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)',
                                    height: '6px', borderRadius: '3px', overflow: 'hidden', pointerEvents: 'none', zIndex: 1,
                                    background: '#1e1f22'
                                }}>
                                    <div style={{
                                        height: '100%',
                                        width: `${((remoteVolumes[contextMenu.user.username] || 100) / 200) * 100}%`,
                                        background: (remoteVolumes[contextMenu.user.username] || 100) > 100
                                            ? 'linear-gradient(90deg, #5865f2 50%, #7289da 100%)'
                                            : '#5865f2',
                                        borderRadius: '3px',
                                        transition: 'width 0.05s ease'
                                    }} />
                                </div>
                                {/* 100% marker */}
                                <div style={{
                                    position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
                                    width: '2px', height: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '1px',
                                    pointerEvents: 'none', zIndex: 1
                                }} />
                            </div>
                        </div>
                    )}

                    {/* Genel Aksiyonlar */}
                    <div style={styles.menuSection}>
                        <div className="user-context-menu-item" style={styles.menuItem} onClick={() => handleMenuAction('profile')}>
                            <span style={{ marginRight: '8px', opacity: 0.7 }}>👤</span> Profili Görüntüle
                        </div>
                        <div className="user-context-menu-item" style={styles.menuItem} onClick={() => handleMenuAction('dm')}>
                            <span style={{ marginRight: '8px', opacity: 0.7 }}>💬</span> Özelden Mesaj At
                        </div>

                        {contextMenu.user.username !== currentUsername &&
                            !friendsList.some(f =>
                                f.sender_username === contextMenu.user.username ||
                                f.receiver_username === contextMenu.user.username
                            ) && (
                                <div className="user-context-menu-item" style={styles.menuItem} onClick={() => handleMenuAction('add_friend')}>
                                    <span style={{ marginRight: '8px', opacity: 0.7 }}>➕</span> Arkadaş Ekle
                                </div>
                            )}
                    </div>

                    {/* Admin/Mod Özellikleri */}
                    {isAdmin && contextMenu.user.username !== currentUsername && (
                        <>
                            <div style={styles.menuDivider}></div>
                            <div style={styles.menuSection}>
                                <div style={{ fontSize: '10px', color: '#72767d', padding: '6px 12px 4px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Mod Araçları
                                </div>

                                {/* Başka Kanala Taşı */}
                                <div
                                    className="user-context-menu-item"
                                    style={styles.menuItem}
                                    onClick={() => setShowMoveMenu(!showMoveMenu)}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                        <span><span style={{ marginRight: '8px', opacity: 0.7 }}>🔀</span>Başka Kanala Taşı</span>
                                        <span style={{ fontSize: '10px', transform: showMoveMenu ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s', color: '#72767d' }}>›</span>
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

                                <div className="user-context-menu-item-danger" style={{ ...styles.menuItem, color: '#ed4245' }} onClick={() => handleMenuAction('kick')}>
                                    <span style={{ marginRight: '8px' }}>❌</span> Kanaldan At
                                </div>
                                <div className="user-context-menu-item" style={styles.menuItem} onClick={() => handleMenuAction('server_mute')}>
                                    <span style={{ marginRight: '8px', opacity: 0.7 }}>🔇</span> Sunucu Sustur
                                </div>
                                <div className="user-context-menu-item" style={styles.menuItem} onClick={() => handleMenuAction('server_deafen')}>
                                    <span style={{ marginRight: '8px', opacity: 0.7 }}>🙉</span> Sunucu Sağırlaştır
                                </div>
                            </div>
                        </>
                    )}

                    {/* Lokal Sessiz Alma — herkes için görünür (kendi hariç) */}
                    {contextMenu.user.username !== currentUsername && (
                        <>
                            <div style={styles.menuDivider}></div>
                            <div className="user-context-menu-item" style={styles.menuItem} onClick={() => handleMenuAction('mute_local')}>
                                <span style={{ marginRight: '8px', opacity: 0.7 }}>🔇</span> Benim İçin Sessize Al
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
        backgroundColor: '#111214',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '8px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.3)',
        zIndex: 10000,
        minWidth: '240px',
        maxWidth: '280px',
        overflow: 'hidden',
        animation: 'contextMenuIn 0.12s ease-out',
    },
    menuHeader: {
        padding: '14px 12px',
        fontWeight: '600',
        color: '#fff',
        backgroundColor: '#1a1b1e',
        fontSize: '0.9em',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    menuSection: {
        padding: '4px 0',
    },
    menuDivider: {
        height: '1px',
        backgroundColor: 'rgba(255,255,255,0.06)',
        margin: '4px 8px',
    },
    volumeSection: {
        padding: '10px 14px 12px',
        backgroundColor: '#1a1b1e',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    menuItem: {
        padding: '8px 12px',
        cursor: 'pointer',
        color: '#dcddde',
        fontSize: '13px',
        transition: 'background-color 0.1s, color 0.1s',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '4px',
        margin: '0 4px',
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

// Add hover effect via CSS-in-JS
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes contextMenuIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
    }

    div[style*="userItemNew"]:hover {
        background: rgba(88, 101, 242, 0.08) !important;
        border-color: rgba(88, 101, 242, 0.2) !important;
        transform: translateX(1px);
    }
    
    .user-context-menu-item:hover {
        background-color: rgba(88, 101, 242, 0.15) !important;
        color: #fff !important;
    }
    
    .user-context-menu-item-danger:hover {
        background-color: rgba(237, 66, 69, 0.15) !important;
        color: #ed4245 !important;
    }
    
    .user-context-submenu-item:hover {
        background-color: rgba(88, 101, 242, 0.15) !important;
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

    /* 🎚️ Premium Volume Slider */
    .voice-volume-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
        box-shadow: 0 1px 4px rgba(0,0,0,0.4), 0 0 0 1px rgba(88, 101, 242, 0.3);
        border: 2px solid #5865f2;
        transition: transform 0.1s, box-shadow 0.1s;
        position: relative;
        z-index: 3;
    }
    .voice-volume-slider::-webkit-slider-thumb:hover {
        transform: scale(1.15);
        box-shadow: 0 1px 6px rgba(88, 101, 242, 0.5), 0 0 0 2px rgba(88, 101, 242, 0.2);
    }
    .voice-volume-slider::-webkit-slider-thumb:active {
        transform: scale(1.25);
        background: #5865f2;
        border-color: #fff;
    }
    .voice-volume-slider::-moz-range-thumb {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
        border: 2px solid #5865f2;
        box-shadow: 0 1px 4px rgba(0,0,0,0.4);
    }
    .voice-volume-slider::-webkit-slider-runnable-track {
        height: 6px;
        background: transparent;
        border-radius: 3px;
    }
    .voice-volume-slider::-moz-range-track {
        height: 6px;
        background: transparent;
        border-radius: 3px;
    }

    /* Legacy slider thumbs for non-voice sliders */
    input[type="range"]:not(.voice-volume-slider)::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #5865f2;
        cursor: pointer;
        box-shadow: 0 0 3px rgba(88, 101, 242, 0.5);
    }
    
    input[type="range"]:not(.voice-volume-slider)::-moz-range-thumb {
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

