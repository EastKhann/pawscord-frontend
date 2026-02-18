// frontend/src/RoomList/ServerPanel.js
import React, { useCallback } from 'react';
import {
    FaChevronDown, FaChevronRight, FaPlus, FaCog,
    FaVolumeUp, FaUserPlus
} from '../utils/iconOptimization';
import VoiceUserList from '../VoiceUserList';
import { styles } from '../SidebarStyles';

const ServerPanel = ({
    servers, selectedServerId, isAdmin, currentUsername, currentVoiceRoom,
    activeVoiceUsers, collapsedCategories, toggleCategory,
    editingItemId, setEditingItemId, editName, setEditName,
    newCategoryName, setNewCategoryName, newRoomName, setNewRoomName,
    newRoomType, setNewRoomType,
    activeServerIdForCategory, setActiveServerIdForCategory,
    activeCategoryIdForRoom, setActiveCategoryIdForRoom,
    handleCreateCategory, handleCreateRoom,
    handleRenameCategory, handleRenameRoom,
    handleOpenActionMenu, handleCreateInvite,
    onOpenServerSettings, joinVoiceChat, onRoomSelect,
    safeUnreadCounts, onDMSelect, conversations,
    friendsList, getDeterministicAvatar, allUsers, isPttActive,
    remoteVolumes, setRemoteVolume, dropTargetChannel, setDropTargetChannel,
    handleAddFriend, handleRemoveFriend, handleMoveUserToChannel, handleKickUserFromChannel,
    onViewUserProfile
}) => {
    if (!servers) return null;

    return (
        <div style={styles.topSection}>
            {servers.filter(s => s.id === selectedServerId).map(server => {
                const isOwner = server.owner_username === currentUsername || isAdmin;
                const canManage = isOwner || server.my_permissions?.is_owner;

                return (
                    <div key={server.id}>
                        {/* SERVER HEADER */}
                        <div style={styles.serverHeader}>
                            <h3 style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{server.name}</h3>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <button style={styles.iconBtn} onClick={(e) => handleCreateInvite(e, server)} title="Davet Linki">
                                    <FaUserPlus />
                                </button>
                                {isOwner && <button style={styles.iconBtn} onClick={(e) => { e.stopPropagation(); setActiveServerIdForCategory(server.id); }} title="Kategori Ekle"><FaPlus /></button>}
                                {canManage && (
                                    <button style={styles.iconBtn} onClick={(e) => { e.stopPropagation(); if (onOpenServerSettings) onOpenServerSettings(server); }} title="Sunucu Ayarları">
                                        <FaCog />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* KATEGORİ EKLEME FORMU */}
                        {activeServerIdForCategory === server.id && (
                            <form onSubmit={(e) => handleCreateCategory(e, server.id)} style={styles.addCategoryForm}>
                                <input autoFocus placeholder="Kategori Adı..." aria-label="Kategori adı" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} style={styles.addRoomInput} />
                                <div style={styles.addRoomControls}>
                                    <button type="submit" style={styles.addRoomButton}>Ekle</button>
                                    <button type="button" onClick={() => setActiveServerIdForCategory(null)} style={{ ...styles.addRoomButton, background: '#da373c' }}>X</button>
                                </div>
                            </form>
                        )}

                        {/* KATEGORİLER */}
                        {server.categories && server.categories.map(cat => (
                            <CategorySection
                                key={cat.id}
                                cat={cat}
                                server={server}
                                isOwner={isOwner}
                                isAdmin={isAdmin}
                                currentUsername={currentUsername}
                                currentVoiceRoom={currentVoiceRoom}
                                activeVoiceUsers={activeVoiceUsers}
                                collapsedCategories={collapsedCategories}
                                toggleCategory={toggleCategory}
                                editingItemId={editingItemId}
                                setEditingItemId={setEditingItemId}
                                editName={editName}
                                setEditName={setEditName}
                                newRoomName={newRoomName}
                                setNewRoomName={setNewRoomName}
                                newRoomType={newRoomType}
                                setNewRoomType={setNewRoomType}
                                activeCategoryIdForRoom={activeCategoryIdForRoom}
                                setActiveCategoryIdForRoom={setActiveCategoryIdForRoom}
                                handleCreateRoom={handleCreateRoom}
                                handleRenameCategory={handleRenameCategory}
                                handleRenameRoom={handleRenameRoom}
                                handleOpenActionMenu={handleOpenActionMenu}
                                joinVoiceChat={joinVoiceChat}
                                onRoomSelect={onRoomSelect}
                                safeUnreadCounts={safeUnreadCounts}
                                onDMSelect={onDMSelect}
                                conversations={conversations}
                                friendsList={friendsList}
                                getDeterministicAvatar={getDeterministicAvatar}
                                allUsers={allUsers}
                                isPttActive={isPttActive}
                                remoteVolumes={remoteVolumes}
                                setRemoteVolume={setRemoteVolume}
                                dropTargetChannel={dropTargetChannel}
                                setDropTargetChannel={setDropTargetChannel}
                                handleAddFriend={handleAddFriend}
                                handleRemoveFriend={handleRemoveFriend}
                                handleMoveUserToChannel={handleMoveUserToChannel}
                                handleKickUserFromChannel={handleKickUserFromChannel}
                                onViewUserProfile={onViewUserProfile}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

// Category section sub-component
const CategorySection = React.memo(({
    cat, server, isOwner, isAdmin, currentUsername, currentVoiceRoom,
    activeVoiceUsers, collapsedCategories, toggleCategory,
    editingItemId, setEditingItemId, editName, setEditName,
    newRoomName, setNewRoomName, newRoomType, setNewRoomType,
    activeCategoryIdForRoom, setActiveCategoryIdForRoom,
    handleCreateRoom, handleRenameCategory, handleRenameRoom,
    handleOpenActionMenu, joinVoiceChat, onRoomSelect,
    safeUnreadCounts, onDMSelect, conversations,
    friendsList, getDeterministicAvatar, allUsers, isPttActive,
    remoteVolumes, setRemoteVolume, dropTargetChannel, setDropTargetChannel,
    handleAddFriend, handleRemoveFriend, handleMoveUserToChannel, handleKickUserFromChannel,
    onViewUserProfile
}) => {
    const isCollapsed = collapsedCategories[cat.id];
    const isEditingThisCat = editingItemId === `cat-${cat.id}`;

    // 🎯 Performance: Memoized handlers
    const handleToggleCategory = useCallback(() => toggleCategory(cat.id), [toggleCategory, cat.id]);
    const handleRenameCategorySubmit = useCallback((e) => handleRenameCategory(e, cat.id), [handleRenameCategory, cat.id]);
    const handleStopPropagation = useCallback((e) => e.stopPropagation(), []);
    const handleCategoryActionMenu = useCallback((e) => handleOpenActionMenu(e, 'category', cat.id, cat.name), [handleOpenActionMenu, cat.id, cat.name]);
    const handleAddRoomClick = useCallback((e) => { e.stopPropagation(); setActiveCategoryIdForRoom(cat.id); }, [setActiveCategoryIdForRoom, cat.id]);
    const handleCreateRoomSubmit = useCallback((e) => handleCreateRoom(e, cat.id), [handleCreateRoom, cat.id]);
    const handleCancelAddRoom = useCallback(() => setActiveCategoryIdForRoom(null), [setActiveCategoryIdForRoom]);
    const handleEditBlur = useCallback(() => setEditingItemId(null), [setEditingItemId]);

    return (
        <div style={{ marginBottom: 5 }}>
            <div style={styles.categoryHeader} onClick={handleToggleCategory}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {isCollapsed ? <FaChevronRight size={9} /> : <FaChevronDown size={9} />}
                    {isEditingThisCat ? (
                        <form onSubmit={handleRenameCategorySubmit} onClick={handleStopPropagation} style={{ marginLeft: 5 }}>
                            <input autoFocus aria-label="Kategori adını düzenle" value={editName} onChange={e => setEditName(e.target.value)} onBlur={handleEditBlur} style={styles.inlineInput} />
                        </form>
                    ) : (
                        <span style={{ marginLeft: 5 }}>{cat.name}</span>
                    )}
                </div>
                {isOwner && (
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: '5px' }}>
                        <button style={styles.iconBtn} onClick={handleCategoryActionMenu}><FaCog size={10} /></button>
                        <button style={styles.iconBtn} onClick={handleAddRoomClick}><FaPlus size={10} /></button>
                    </div>
                )}
            </div>

            {/* Kanal Ekleme Formu */}
            {activeCategoryIdForRoom === cat.id && (
                <form onSubmit={handleCreateRoomSubmit} style={{ padding: '5px 10px' }}>
                    <input autoFocus placeholder="Kanal Adı..." aria-label="Kanal adı" value={newRoomName} onChange={e => setNewRoomName(e.target.value)} style={styles.addRoomInput} />
                    <select value={newRoomType} onChange={e => setNewRoomType(e.target.value)} style={styles.channelTypeSelect}>
                        <option value="text">📝 Metin</option>
                        <option value="voice">🎤 Sesli</option>
                        <option value="kanban">📋 Kanban Board</option>
                    </select>
                    <div style={styles.addRoomControls}>
                        <button type="submit" style={styles.addRoomButton}>Ekle</button>
                        <button type="button" onClick={handleCancelAddRoom} style={{ ...styles.addRoomButton, background: '#da373c' }}>X</button>
                    </div>
                </form>
            )}

            {/* Kanallar */}
            {!isCollapsed && cat.rooms && cat.rooms.map(room => (
                <ChannelItem
                    key={room.id}
                    room={room}
                    cat={cat}
                    server={server}
                    isOwner={isOwner}
                    isAdmin={isAdmin}
                    currentUsername={currentUsername}
                    currentVoiceRoom={currentVoiceRoom}
                    activeVoiceUsers={activeVoiceUsers}
                    editingItemId={editingItemId}
                    setEditingItemId={setEditingItemId}
                    editName={editName}
                    setEditName={setEditName}
                    handleRenameRoom={handleRenameRoom}
                    handleOpenActionMenu={handleOpenActionMenu}
                    joinVoiceChat={joinVoiceChat}
                    onRoomSelect={onRoomSelect}
                    safeUnreadCounts={safeUnreadCounts}
                    onDMSelect={onDMSelect}
                    conversations={conversations}
                    friendsList={friendsList}
                    getDeterministicAvatar={getDeterministicAvatar}
                    allUsers={allUsers}
                    isPttActive={isPttActive}
                    remoteVolumes={remoteVolumes}
                    setRemoteVolume={setRemoteVolume}
                    dropTargetChannel={dropTargetChannel}
                    setDropTargetChannel={setDropTargetChannel}
                    handleAddFriend={handleAddFriend}
                    handleRemoveFriend={handleRemoveFriend}
                    handleMoveUserToChannel={handleMoveUserToChannel}
                    handleKickUserFromChannel={handleKickUserFromChannel}
                    onViewUserProfile={onViewUserProfile}
                />
            ))}
        </div>
    );
});

// Channel item sub-component
const ChannelItem = React.memo(({
    room, cat, server, isOwner, isAdmin, currentUsername, currentVoiceRoom,
    activeVoiceUsers, editingItemId, setEditingItemId, editName, setEditName,
    handleRenameRoom, handleOpenActionMenu, joinVoiceChat, onRoomSelect,
    safeUnreadCounts, onDMSelect, conversations,
    friendsList, getDeterministicAvatar, allUsers, isPttActive,
    remoteVolumes, setRemoteVolume, dropTargetChannel, setDropTargetChannel,
    handleAddFriend, handleRemoveFriend, handleMoveUserToChannel, handleKickUserFromChannel,
    onViewUserProfile
}) => {
    const isActive = currentVoiceRoom === room.slug;
    const unread = safeUnreadCounts[`room-${room.slug}`] || 0;
    const isVoice = room.channel_type === 'voice';
    const isEditingThisRoom = editingItemId === `room-${room.slug}`;
    const userCount = isVoice && activeVoiceUsers[room.slug] ? activeVoiceUsers[room.slug].length : 0;

    // 🎯 Performance: Memoized handlers
    const handleChannelClick = useCallback(() => { if (isVoice) joinVoiceChat(room.slug); else onRoomSelect(room.slug); }, [isVoice, joinVoiceChat, onRoomSelect, room.slug]);
    const handleDragOver = useCallback((e) => { if (!isVoice) return; e.preventDefault(); e.dataTransfer.dropEffect = 'move'; setDropTargetChannel(room.slug); }, [isVoice, setDropTargetChannel, room.slug]);
    const handleDragLeave = useCallback(() => { if (dropTargetChannel === room.slug) setDropTargetChannel(null); }, [dropTargetChannel, room.slug, setDropTargetChannel]);
    const handleDrop = useCallback((e) => {
        e.preventDefault(); setDropTargetChannel(null);
        if (!isVoice || !isAdmin) return;
        try {
            const data = JSON.parse(e.dataTransfer.getData('application/json'));
            if (data.username && data.fromChannel && data.fromChannel !== room.slug) {
                handleMoveUserToChannel(data.username, data.fromChannel, room.slug);
            }
        } catch (err) { console.error('Drop error:', err); }
    }, [isVoice, isAdmin, setDropTargetChannel, handleMoveUserToChannel, room.slug]);
    const handleRenameSubmit = useCallback((e) => handleRenameRoom(e, room.slug), [handleRenameRoom, room.slug]);
    const handleStopPropagation = useCallback((e) => e.stopPropagation(), []);
    const handleEditBlur = useCallback(() => setEditingItemId(null), [setEditingItemId]);
    const handleRoomActionMenu = useCallback((e) => handleOpenActionMenu(e, 'room', room.slug, room.name), [handleOpenActionMenu, room.slug, room.name]);
    const handleUserAction = useCallback((action, username, targetChannel) => {
        if (action === 'profile') onViewUserProfile?.(username);
        else if (action === 'message' || action === 'dm') {
            const conversation = conversations.find(c => c.participants.some(p => p.username === username));
            if (conversation) onDMSelect(conversation.id, username);
        }
        else if (action === 'add_friend') handleAddFriend(username);
        else if (action === 'remove_friend') handleRemoveFriend(username);
        else if (action === 'move' && targetChannel) handleMoveUserToChannel(username, room.slug, targetChannel);
        else if (action === 'kick') handleKickUserFromChannel(username, room.slug);
    }, [onViewUserProfile, conversations, onDMSelect, handleAddFriend, handleRemoveFriend, handleMoveUserToChannel, handleKickUserFromChannel, room.slug]);

    return (
        <div className="channel-wrapper">
            <div
                className={`channel-item ${isVoice ? 'voice-channel' : 'text-channel'} ${isActive ? 'active' : ''} ${dropTargetChannel === room.slug ? 'voice-channel-drop-target' : ''}`}
                style={{
                    ...styles.roomItem,
                    marginLeft: 8,
                    backgroundColor: dropTargetChannel === room.slug ? 'rgba(88, 101, 242, 0.2)'
                        : isActive ? 'rgba(88, 101, 242, 0.15)' : 'transparent',
                    color: isActive ? '#fff' : '#949ba4',
                    borderLeft: dropTargetChannel === room.slug ? '3px solid #5865f2'
                        : isActive ? '3px solid #5865f2' : '3px solid transparent',
                    paddingLeft: isActive ? '5px' : '8px',
                    transition: 'all 0.2s ease', borderRadius: '6px', margin: '2px 8px', position: 'relative',
                    ...(dropTargetChannel === room.slug ? {
                        boxShadow: 'inset 0 0 12px rgba(88, 101, 242, 0.15), 0 0 8px rgba(88, 101, 242, 0.2)',
                        border: '1px dashed rgba(88, 101, 242, 0.5)',
                    } : {})
                }}
                onClick={handleChannelClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div style={styles.channelContent}>
                    {isVoice && <FaVolumeUp style={{ ...styles.voiceIcon, color: isActive ? '#43b581' : '#949ba4', transition: 'color 0.2s ease' }} />}
                    {!isVoice && <FaCog style={{ ...styles.hashtagIcon, fontSize: '0.9em' }} />}

                    {isEditingThisRoom ? (
                        <form onSubmit={handleRenameSubmit} onClick={handleStopPropagation} style={{ flex: 1 }}>
                            <input autoFocus aria-label="Kanal adını düzenle" value={editName} onChange={e => setEditName(e.target.value)} onBlur={handleEditBlur} style={styles.inlineInput} />
                        </form>
                    ) : (
                        <span style={{ ...styles.channelNameText, paddingLeft: '5px', fontWeight: isActive ? '600' : 'normal', flex: 1, display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {room.name}
                            {room.is_private && <span style={{ fontSize: '0.7em', color: '#faa61a', border: '1px solid #faa61a', borderRadius: '3px', padding: '1px 4px' }}>🔒</span>}
                            {room.is_nsfw && <span style={{ fontSize: '0.7em', color: '#f04747', border: '1px solid #f04747', borderRadius: '3px', padding: '1px 4px' }}>18+</span>}
                            {room.is_locked && <span style={{ fontSize: '0.7em', color: '#949ba4', border: '1px solid #949ba4', borderRadius: '3px', padding: '1px 4px' }}>🔐</span>}
                            {room.admin_only_chat && <span style={{ fontSize: '0.7em', color: '#43b581', border: '1px solid #43b581', borderRadius: '3px', padding: '1px 4px' }}>📢</span>}
                        </span>
                    )}

                    {isVoice && (
                        <span style={{ fontSize: '0.75em', color: userCount > 0 ? '#43b581' : '#72767d', fontWeight: '500', marginLeft: 'auto', marginRight: '4px' }}>
                            ({userCount}/{room.user_limit > 0 ? room.user_limit : '∞'})
                        </span>
                    )}
                </div>

                {isOwner && !isEditingThisRoom && (
                    <div style={{ display: 'flex', gap: '3px', marginLeft: '5px' }}>
                        <button style={styles.iconBtn} onClick={handleRoomActionMenu}><FaCog size={12} /></button>
                    </div>
                )}
                {unread > 0 && <span style={styles.unreadBadge}>{unread}</span>}
            </div>

            {/* Voice User List */}
            {isVoice && (
                <div style={{ marginLeft: '28px', marginTop: '2px', marginBottom: '2px', padding: '0', position: 'relative', zIndex: 1 }}>
                    <VoiceUserList
                        voiceUsers={activeVoiceUsers}
                        roomName={room.slug}
                        currentUsername={currentUsername}
                        remoteVolumes={remoteVolumes}
                        setRemoteVolume={setRemoteVolume}
                        isClientInThisChannel={currentVoiceRoom === room.slug}
                        isPttActive={isPttActive}
                        isAdmin={isAdmin}
                        voiceChannels={cat.rooms.filter(r => r.is_voice)}
                        friendsList={friendsList}
                        getDeterministicAvatar={getDeterministicAvatar}
                        allUsers={allUsers}
                        onUserAction={handleUserAction}
                    />
                </div>
            )}
        </div>
    );
});

export default React.memo(ServerPanel);
