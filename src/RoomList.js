// frontend/src/RoomList.js (BİLDİRİM DAİRESİ YENİ STİLİYLE)

import React, { useState, useMemo } from 'react';
import VoiceUserList from './VoiceUserList';

const RoomList = ({
    isAdmin, roomOptions, conversations, currentRoom, currentConversationId,
    onRoomSelect, onDMSelect, isConnected, isInVoiceChat, joinVoiceChat, leaveVoiceChat,
    unreadCounts, voiceUsers, currentUsername, currentVoiceRoom, remoteVolumes,
    setRemoteVolume, sendRoomManagementSignal, onlineUsers, allUsers, onProfileClick,
    getDeterministicAvatar
}) => {
    
    const [newRoomName, setNewRoomName] = useState(''); 
    const [channelType, setChannelType] = useState('text'); 
    const [hoveredRoom, setHoveredRoom] = useState(null); 
    
    const activeVoiceUsers = voiceUsers && typeof voiceUsers === 'object' ? voiceUsers : {};

    const { textRooms, voiceRooms } = useMemo(() => {
        if (!roomOptions) return { textRooms: [], voiceRooms: [] };
        const tr = roomOptions.filter(room => room.channel_type === 'text').map(room => room.slug);
        const vr = roomOptions.filter(room => room.channel_type === 'voice').map(room => room.slug);
        return { textRooms: tr, voiceRooms: vr };
    }, [roomOptions]);

    const isUserOnline = (username) => Array.isArray(onlineUsers) && onlineUsers.includes(username);

    const handleTextRoomChange = (newRoomSlug) => { onRoomSelect(newRoomSlug); };
    
    const handleVoiceToggle = (roomSlug) => {
        if (isInVoiceChat && roomSlug === currentVoiceRoom) leaveVoiceChat();
        else if (isConnected) joinVoiceChat(roomSlug);
    };
    
    const handleAddRoom = (e) => {
        e.preventDefault();
        const slug = newRoomName.toLowerCase().trim().replace(/[^a-z0-9-_]/g, ''); 
        const existingSlugs = roomOptions.map(r => r.slug);
        if (slug && slug !== 'genel' && !existingSlugs.includes(slug)) {
            sendRoomManagementSignal('add_room', slug, channelType); 
            setNewRoomName(''); 
            setChannelType('text'); 
        } else {
            alert(slug ? "Bu oda zaten var, 'genel' kanalı eklenemez veya oda adı geçersiz." : "Oda adı boş olamaz.");
        }
    };
    
    const handleRemoveRoom = (roomSlug) => {
        if (roomSlug === 'genel') { alert("Ana 'genel' kanalı silinemez!"); return; }
        if (window.confirm(`${roomSlug.toUpperCase()} kanalını silmek istediğinizden emin misiniz?`)) {
            sendRoomManagementSignal('remove_room', roomSlug); 
        }
    };
    
    const handleDMItemClick = (conversation) => {
        const otherUser = conversation.participants.find(p => p.username !== currentUsername);
        if (otherUser) onDMSelect(otherUser.username);
    };

    return (
        <div style={styles.sidebar}>
            <div style={styles.topSection}>
                <h3 style={styles.groupSubHeader}>ÖZEL MESAJLAR</h3>
                {conversations && conversations.map((conv) => {
                    const otherUser = conv.participants.find(p => p.username !== currentUsername);
                    if (!otherUser) return null;
                    
                    const targetUsername = otherUser.username;
                    const avatarUrl = otherUser.avatar || getDeterministicAvatar(targetUsername);
                    const isActive = currentConversationId === conv.id;
                    const unread = unreadCounts[`dm-${conv.id}`] || 0; 
                    const isOnline = isUserOnline(targetUsername); 
                    
                    return (
                        <div 
                            key={`dm-${conv.id}`} 
                            style={{...styles.dmItem, backgroundColor: isActive ? '#444754' : 'transparent'}}
                            onClick={() => handleDMItemClick(conv)}
                            onMouseEnter={() => setHoveredRoom(`dm-${conv.id}`)}
                            onMouseLeave={() => setHoveredRoom(null)}
                        >
                            <div style={styles.dmContentWrapper}>
                                <div style={styles.avatarWrapper}>
                                    <img src={avatarUrl} style={styles.avatarSmall} alt={`${targetUsername} avatar`} />
                                    <span style={{...styles.onlineIndicator, backgroundColor: isOnline ? '#43b581' : '#747f8d'}}></span>
                                </div>
                                <span style={{...styles.dmNameText, fontWeight: unread > 0 && !isActive ? 'bold' : 'normal'}}>@ {targetUsername}</span>
                            </div>
                            {unread > 0 && !isActive && (<span style={styles.unreadBadgeDM}>{unread > 9 ? '9+' : unread}</span>)}
                        </div>
                    );
                })}

                <h3 style={styles.groupHeader}>KANALLAR
                    {isAdmin && ( <button style={styles.addButton} onClick={() => setNewRoomName(prev => (prev !== '' ? '' : 'TEMP'))} title="Yeni Kanal Ekle">+</button> )}
                </h3>
                {isAdmin && newRoomName !== '' && ( 
                    <form onSubmit={handleAddRoom} style={styles.addRoomForm}>
                        <input type="text" value={newRoomName === 'TEMP' ? '' : newRoomName} onChange={(e) => setNewRoomName(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''))} placeholder="Kanal adı..." style={styles.addRoomInput} autoFocus required />
                        <div style={styles.addRoomControls}>
                            <select value={channelType} onChange={(e) => setChannelType(e.target.value)} style={styles.channelTypeSelect}>
                                <option value="text"># Metin</option>
                                <option value="voice">🔊 Sesli</option>
                            </select>
                            <button type="submit" style={styles.addRoomButton} disabled={!isConnected || newRoomName.trim() === ''}>Ekle</button>
                        </div>
                    </form> 
                )}
                
                <h3 style={styles.groupSubHeader}># METİN KANALLARI</h3>
                {textRooms.map((room) => { 
                    const isCurrent = room === currentRoom;
                    const unread = unreadCounts[`room-${room}`] || 0; 
                    const isHovered = hoveredRoom === room;
                    const hasUnreadAndNotCurrent = unread > 0 && !isCurrent;
                    
                    const roomItemStyle = { ...styles.roomItem, backgroundColor: isCurrent ? '#444754' : (isHovered ? '#3a3d43' : 'transparent'), fontWeight: hasUnreadAndNotCurrent ? 'bold' : 'normal', paddingRight: isAdmin || hasUnreadAndNotCurrent ? '50px' : '15px' };
                    
                    return (
                        <div key={room} style={roomItemStyle} onClick={() => handleTextRoomChange(room)} onMouseEnter={() => setHoveredRoom(room)} onMouseLeave={() => setHoveredRoom(null)}>
                            <div style={styles.roomContentWrapper}> 
                                <span style={styles.roomNameText}># {room.toUpperCase()}</span>
                            </div>
                            
                            {isAdmin && room !== 'genel' && ( 
                                <button style={{...styles.removeButtonIntegrated, opacity: (isHovered || isCurrent) ? 1 : 0}} onClick={(e) => { e.stopPropagation(); handleRemoveRoom(room); }} title="Kanalı Sil" disabled={!isConnected}>x</button> 
                            )}
                            {hasUnreadAndNotCurrent && (<span style={styles.unreadBadge}>{unread > 99 ? '99+' : unread}</span>)}
                        </div>
                    );
                })}

                <h3 style={{...styles.groupSubHeader, marginTop: '20px'}}>🔊 SESLİ KANALLAR</h3>
                {voiceRooms.map((room) => { 
                    const isCurrentVoice = currentVoiceRoom === room;
                    const usersInRoom = activeVoiceUsers[room] || [];
                    const isHovered = hoveredRoom === room;

                    return (
                        <div key={`voice-${room}`} style={styles.voiceRoomContainer} onMouseEnter={() => setHoveredRoom(room)} onMouseLeave={() => setHoveredRoom(null)}>
                            <div style={styles.voiceRoomHeader}>
                                <button style={{ ...styles.voiceToggleButton, backgroundColor: isCurrentVoice ? '#fa4e4e' : '#5865f2' }} onClick={() => handleVoiceToggle(room)} disabled={!isConnected} title={isCurrentVoice ? 'Sesli kanaldan ayrıl' : 'Sesli kanala katıl'}>
                                    🔊 {room.toUpperCase()} {usersInRoom.length > 0 && ` (${usersInRoom.length})`}
                                </button>
                                {isAdmin && room !== 'genel' && ( 
                                    <button style={{...styles.removeButtonVoice, opacity: (isHovered && !isCurrentVoice) ? 1 : 0}} onClick={() => handleRemoveRoom(room)} title="Kanalı Sil" disabled={!isConnected || isCurrentVoice}>x</button> 
                                )}
                            </div>
                            {usersInRoom.length > 0 && (
                                <div style={styles.voiceUserListWrapper}>
                                    <VoiceUserList voiceUsers={activeVoiceUsers} roomName={room} currentUsername={currentUsername} isClientInThisChannel={isCurrentVoice} remoteVolumes={remoteVolumes} setRemoteVolume={setRemoteVolume} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div style={styles.bottomSection}>
                <div style={styles.userPanel} onClick={onProfileClick} title="Profili Düzenle">
                    <img 
                        src={allUsers.find(u => u.username === currentUsername)?.avatar || getDeterministicAvatar(currentUsername)} 
                        style={styles.avatar} 
                        alt="kullanıcı avatarı" 
                    />
                    <div style={styles.userInfo}>
                        <span style={styles.usernameText}>{currentUsername}</span>
                        <span style={styles.statusText}>
                            {allUsers.find(u => u.username === currentUsername)?.status_message || 'Durum belirtilmemiş'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// <<< YENİ STİL TANIMLAMASI: Ortak, dairesel bildirim stili >>>
const unreadBadgeBase = {
    backgroundColor: '#f84848',
    color: 'white',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: 'bold',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    userSelect: 'none',
};

const styles = {
    sidebar: { width: '250px', minHeight: '100vh', backgroundColor: '#2f3136', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '2px 0 5px rgba(0,0,0,0.2)' },
    topSection: { flexGrow: 1, overflowY: 'auto', paddingTop: '10px' },
    groupHeader: { padding: '5px 15px', fontSize: '1.2em', color: '#fff', marginBottom: '10px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #444' },
    groupSubHeader: { padding: '5px 15px', fontSize: '1em', color: '#99aab5', marginBottom: '10px', fontWeight: 'bold', textTransform: 'uppercase' },
    dmItem: { padding: '8px 15px', margin: '2px 10px', borderRadius: '4px', color: '#ccc', cursor: 'pointer', transition: 'background-color 0.15s', userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 2 },
    dmContentWrapper: { display: 'flex', alignItems: 'center', flexGrow: 1, minWidth: 0, paddingRight: '10px' },
    avatarWrapper: { position: 'relative', marginRight: '10px', flexShrink: 0 },
    avatarSmall: { width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' },
    onlineIndicator: { width: '10px', height: '10px', borderRadius: '50%', border: '2px solid #2f3136', position: 'absolute', bottom: -2, right: -2 },
    dmNameText: { flexGrow: 1, minWidth: 0, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' },
    // <<< DEĞİŞİKLİK: Yeni stil burada kullanılıyor >>>
    unreadBadgeDM: {
        ...unreadBadgeBase,
        // Konumu sağdan 15px olarak ayarla
        right: '18px', 
        // Dikey hizalamayı sağlamak için 'top' ve 'transform' satırları
        // unreadBadgeBase'den zaten geliyor ve doğru. Ekstra bir ayara gerek yok.
    },
    roomItem: { padding: '8px 15px', transition: 'background-color 0.15s, color 0.15s', userSelect: 'none', borderRadius: '4px', margin: '2px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 2, cursor: 'pointer' },
    roomContentWrapper: { display: 'flex', flexGrow: 1, alignItems: 'center', minWidth: 0, position: 'relative', zIndex: 1, justifyContent: 'space-between' },
    roomNameText: { flexShrink: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', position: 'relative', zIndex: 1 },
    // <<< DEĞİŞİKLİK: Yeni stil burada kullanılıyor >>>
    unreadBadge: {
        ...unreadBadgeBase,
        right: '35px',
    },
    voiceUserListWrapper: { padding: '0 15px 5px 15px' },
    voiceRoomContainer: { padding: '0', marginBottom: '5px' },
    voiceRoomHeader: { marginBottom: '0', padding: '0 15px', display: 'flex', alignItems: 'center', position: 'relative' },
    voiceToggleButton: { width: '100%', padding: '5px 15px', border: 'none', borderRadius: '5px', color: 'white', fontWeight: 'bold', textAlign: 'left', cursor: 'pointer', transition: 'background-color 0.2s', marginBottom: '5px', paddingRight: '40px' },
    removeButtonIntegrated: { backgroundColor: '#f04747', color: 'white', border: 'none', borderRadius: '3px', width: '16px', height: '16px', fontSize: '0.7em', cursor: 'pointer', padding: '0', lineHeight: '14px', fontWeight: 'bold', transition: 'opacity 0.2s, background-color 0.2s', opacity: 0, position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 3 },
    removeButtonVoice: { backgroundColor: '#f04747', color: 'white', border: 'none', borderRadius: '4px', width: '20px', height: '20px', fontSize: '0.8em', cursor: 'pointer', marginLeft: '10px', padding: '0', lineHeight: '18px', position: 'absolute', right: '15px', top: '5px', fontWeight: 'bold', transition: 'opacity 0.2s', opacity: 0, zIndex: 2 },
    addButton: { backgroundColor: '#43b581', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', fontSize: '1.2em', cursor: 'pointer', lineHeight: '20px', padding: '0' },
    addRoomForm: { display: 'flex', flexDirection: 'column', padding: '0 15px 10px 15px' },
    addRoomInput: { width: '100%', padding: '8px', border: '1px solid #555', borderRadius: '4px', backgroundColor: '#444', color: 'white', fontSize: '0.9em', outline: 'none', marginBottom: '5px', boxSizing: 'border-box', maxWidth: '100%' },
    addRoomControls: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
    channelTypeSelect: { padding: '5px', border: '1px solid #555', borderRadius: '4px', backgroundColor: '#444', color: 'white', fontSize: '0.9em', flexGrow: 1, marginRight: '10px', outline: 'none', height: '30px', boxSizing: 'border-box', minWidth: '100px' },
    addRoomButton: { padding: '5px 10px', backgroundColor: '#5865f2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', height: '30px' },
    bottomSection: { padding: '10px', backgroundColor: '#292b2f', borderTop: '1px solid #444' },
    userPanel: { display: 'flex', alignItems: 'center', padding: '8px', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.2s' },
    avatar: { width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px', objectFit: 'cover' },
    userInfo: { display: 'flex', flexDirection: 'column', overflow: 'hidden' },
    usernameText: { fontWeight: 'bold', color: 'white' },
    statusText: { fontSize: '0.8em', color: '#b9bbbe', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' },
};

export default RoomList;