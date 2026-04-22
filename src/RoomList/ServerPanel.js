/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// frontend/src/RoomList/ServerPanel.js
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { FaChevronDown, FaPlus, FaCog, FaVolumeUp, FaUserPlus } from '../utils/iconOptimization';
import VoiceUserList from '../VoiceUserList';
import { styles } from '../styles/SidebarStyles';
import logger from '../utils/logger';

// -- dynamic style helpers (pass 2) --

// -- extracted inline style constants --

const ServerPanel = ({
    servers,
    selectedServerId,
    isAdmin,
    currentUsername,
    currentVoiceRoom,
    activeVoiceUsers,
    collapsedCategories,
    toggleCategory,
    editingItemId,
    setEditingItemId,
    editName,
    setEditName,
    newCategoryName,
    setNewCategoryName,
    newRoomName,
    setNewRoomName,
    newRoomType,
    setNewRoomType,
    activeServerIdForCategory,
    setActiveServerIdForCategory,
    activeCategoryIdForRoom,
    setActiveCategoryIdForRoom,
    handleCreateCategory,
    handleCreateRoom,
    handleRenameCategory,
    handleRenameRoom,
    handleOpenActionMenu,
    handleCreateInvite,
    onOpenServerSettings,
    joinVoiceChat,
    onRoomSelect,
    onPrefetchChat,
    safeUnreadCounts,
    onDMSelect,
    conversations,
    friendsList,
    getDeterministicAvatar,
    allUsers,
    isPttActive,
    remoteVolumes,
    setRemoteVolume,
    dropTargetChannel,
    setDropTargetChannel,
    handleAddFriend,
    handleRemoveFriend,
    handleMoveUserToChannel,
    handleKickUserFromChannel,
    onViewUserProfile,
}) => {
    const { t } = useTranslation();
    // 🚀 Prefetch all text channels when user clicks a server
    useEffect(() => {
        if (!onPrefetchChat || !selectedServerId || !servers) return;
        const server = servers.find((s) => s.id === selectedServerId);
        if (!server?.categories || !Array.isArray(server.categories)) return;
        const textChannels = [];
        for (const cat of server.categories) {
            if (!cat || !cat.rooms) continue;
            for (const room of cat.rooms) {
                if (room && room.room_type !== 'voice' && room.slug) textChannels.push(room.slug);
            }
        }
        // Stagger prefetch requests to avoid flooding (max 6, 150ms apart)
        textChannels.slice(0, 6).forEach((slug, i) => {
            setTimeout(() => onPrefetchChat('room', slug), i * 150);
        });
    }, [selectedServerId]); // INTENTIONAL: prefetch only depends on server change, not callback refs

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    if (!servers) return null;

    return (
        <div style={styles.topSection}>
            {servers
                .filter((s) => s.id === selectedServerId)
                .map((server) => {
                    const isOwner = server.owner_username === currentUsername || isAdmin;
                    const canManage = isOwner || server.my_permissions?.is_owner;

                    return (
                        <div key={server.id}>
                            {/* SERVER HEADER */}
                            <div style={styles.serverHeader}>
                                <h3
                                    style={{
                                        margin: 0,
                                        fontSize: '15px',
                                        fontWeight: 700,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        flex: 1,
                                        minWidth: 0,
                                    }}
                                >
                                    {server.name}
                                </h3>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        flexShrink: 0,
                                    }}
                                >
                                    <button
                                        aria-label={t('server.inviteLink', 'Invite Link')}
                                        style={styles.iconBtn}
                                        onClick={(e) => handleCreateInvite(e, server)}
                                        title="Davet Linki"
                                    >
                                        <FaUserPlus />
                                    </button>
                                    {isOwner && (
                                        <button
                                            aria-label={t('server.createCategory', 'Create Category')}
                                            style={styles.iconBtn}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveServerIdForCategory(server.id);
                                            }}
                                            title="Kategori Ekle"
                                        >
                                            <FaPlus />
                                        </button>
                                    )}
                                    {canManage && (
                                        <button
                                            aria-label={t('server.settings', 'Server Settings')}
                                            style={styles.iconBtn}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (onOpenServerSettings)
                                                    onOpenServerSettings(server);
                                            }}
                                            title={t('server.settings', 'Server Settings')}
                                        >
                                            <FaCog />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* CATEGORY ADD FORM */}
                            {activeServerIdForCategory === server.id && (
                                <form
                                    onSubmit={(e) => handleCreateCategory(e, server.id)}
                                    style={styles.addCategoryForm}
                                >
                                    {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
                                    <input
                                        autoFocus
                                        placeholder={t('server.categoryNamePlaceholder', 'Category Name...')}
                                        aria-label={t('server.categoryName', 'Category Name')}
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        style={styles.addRoomInput}
                                    />
                                    <div style={styles.addRoomControls}>
                                        <button
                                            aria-label={t('common.add')}
                                            type="submit"
                                            style={styles.addRoomButton}
                                        >
                                            Ekle
                                        </button>
                                        <button
                                            aria-label={t('common.cancel')}
                                            type="button"
                                            onClick={() => setActiveServerIdForCategory(null)}
                                        >
                                            X
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* CATEGORIES */}
                            {server.categories &&
                                server.categories
                                    .filter(Boolean)
                                    .map((cat) => (
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
                                            onPrefetchChat={onPrefetchChat}
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
const CategorySection = React.memo(
    ({
        cat,
        server,
        isOwner,
        isAdmin,
        currentUsername,
        currentVoiceRoom,
        activeVoiceUsers,
        collapsedCategories,
        toggleCategory,
        editingItemId,
        setEditingItemId,
        editName,
        setEditName,
        newRoomName,
        setNewRoomName,
        newRoomType,
        setNewRoomType,
        activeCategoryIdForRoom,
        setActiveCategoryIdForRoom,
        handleCreateRoom,
        handleRenameCategory,
        handleRenameRoom,
        handleOpenActionMenu,
        joinVoiceChat,
        onRoomSelect,
        onPrefetchChat,
        safeUnreadCounts,
        onDMSelect,
        conversations,
        friendsList,
        getDeterministicAvatar,
        allUsers,
        isPttActive,
        remoteVolumes,
        setRemoteVolume,
        dropTargetChannel,
        setDropTargetChannel,
        handleAddFriend,
        handleRemoveFriend,
        handleMoveUserToChannel,
        handleKickUserFromChannel,
        onViewUserProfile,
    }) => {
        const isCollapsed = collapsedCategories[cat.id];
        const isEditingThisCat = editingItemId === `cat-${cat.id}`;

        // 🎯 Performance: Memoized handlers
        const handleToggleCategory = useCallback(
            () => toggleCategory(cat.id),
            [toggleCategory, cat.id]
        );
        const handleRenameCategorySubmit = useCallback(
            (e) => handleRenameCategory(e, cat.id),
            [handleRenameCategory, cat.id]
        );
        const handleStopPropagation = useCallback((e) => e.stopPropagation(), []);
        const handleCategoryActionMenu = useCallback(
            (e) => handleOpenActionMenu(e, 'category', cat.id, cat.name),
            [handleOpenActionMenu, cat.id, cat.name]
        );
        const handleAddRoomClick = useCallback(
            (e) => {
                e.stopPropagation();
                setActiveCategoryIdForRoom(cat.id);
            },
            [setActiveCategoryIdForRoom, cat.id]
        );
        const handleCreateRoomSubmit = useCallback(
            (e) => handleCreateRoom(e, cat.id),
            [handleCreateRoom, cat.id]
        );
        const handleCancelAddRoom = useCallback(
            () => setActiveCategoryIdForRoom(null),
            [setActiveCategoryIdForRoom]
        );
        const handleEditBlur = useCallback(() => setEditingItemId(null), [setEditingItemId]);

        return (
            <div>
                {/* Faz 3.2: Smooth chevron + Faz 4.3: aria-expanded */}
                <div
                    style={{ ...styles.categoryHeader, justifyContent: 'space-between' }}
                    onClick={handleToggleCategory}
                    role="button"
                    tabIndex={0}
                    aria-expanded={!isCollapsed}
                    onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && handleToggleCategory()
                    }
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            flex: 1,
                            minWidth: 0,
                        }}
                    >
                        {/* Animated chevron — rotates instead of swapping icons */}
                        <span
                            style={{
                                display: 'inline-flex',
                                transition: 'transform 0.2s ease',
                                transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
                            }}
                        >
                            <FaChevronDown size={9} />
                        </span>
                        {isEditingThisCat ? (
                            <>
                                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                                <form
                                    onSubmit={handleRenameCategorySubmit}
                                    onClick={handleStopPropagation}
                                >
                                    {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
                                    <input
                                        autoFocus
                                        aria-label={t('server.editCategoryName', 'Edit category name')}
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        onBlur={handleEditBlur}
                                        style={styles.inlineInput}
                                    />
                                </form>
                            </>
                        ) : (
                            <span
                                style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {cat.name}
                            </span>
                        )}
                    </div>
                    {isOwner && (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                flexShrink: 0,
                            }}
                        >
                            <button
                                style={styles.iconBtn}
                                onClick={handleCategoryActionMenu}
                                aria-label={t('server.categorySettings', 'Category settings')}
                            >
                                <FaCog size={10} />
                            </button>
                            <button
                                style={styles.iconBtn}
                                onClick={handleAddRoomClick}
                                aria-label={t('server.createChannel', 'Create Channel')}
                            >
                                <FaPlus size={10} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Add Channelme Formu */}
                {activeCategoryIdForRoom === cat.id && (
                    <form onSubmit={handleCreateRoomSubmit}>
                        {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
                        <input
                            autoFocus
                            placeholder={t('channel.namePlaceholder', 'Channel Name...')}
                            aria-label={t('server.channelName', 'Channel Name')}
                            value={newRoomName}
                            onChange={(e) => setNewRoomName(e.target.value)}
                            style={styles.addRoomInput}
                        />
                        <select
                            value={newRoomType}
                            onChange={(e) => setNewRoomType(e.target.value)}
                            style={styles.channelTypeSelect}
                        >
                            <option value="text">📝 Metin</option>
                            <option value="voice">🎤 Sesli</option>
                            <option value="kanban">📋 Kanban Board</option>
                        </select>
                        <div style={styles.addRoomControls}>
                            <button aria-label={t('common.add')} type="submit" style={styles.addRoomButton}>
                                Ekle
                            </button>
                            <button
                                aria-label={t('common.cancel')}
                                type="button"
                                onClick={handleCancelAddRoom}
                            >
                                X
                            </button>
                        </div>
                    </form>
                )}

                {/* Faz 3.2: CSS animated channel list — always rendered, max-height transition */}
                <div
                    style={{
                        maxHeight: isCollapsed ? 0 : '2000px',
                        overflow: 'hidden',
                        opacity: isCollapsed ? 0 : 1,
                        transition: 'max-height 0.25s ease-out, opacity 0.18s ease',
                    }}
                    role="group"
                    aria-label={`${cat.name} channels`}
                    onKeyDown={(e) => {
                        if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
                        e.preventDefault();
                        const items = Array.from(e.currentTarget.querySelectorAll('[role="treeitem"]'));
                        const idx = items.indexOf(document.activeElement);
                        if (e.key === 'ArrowDown') items[(idx + 1) % items.length]?.focus();
                        else items[(idx - 1 + items.length) % items.length]?.focus();
                    }}
                >
                    {cat.rooms &&
                        cat.rooms
                            .filter(Boolean)
                            .map((room) => (
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
                                    onPrefetchChat={onPrefetchChat}
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
            </div>
        );
    }
);

// Channel item sub-component
const ChannelItem = React.memo(
    ({
        room,
        cat,
        server,
        isOwner,
        isAdmin,
        currentUsername,
        currentVoiceRoom,
        activeVoiceUsers,
        editingItemId,
        setEditingItemId,
        editName,
        setEditName,
        handleRenameRoom,
        handleOpenActionMenu,
        joinVoiceChat,
        onRoomSelect,
        onPrefetchChat,
        safeUnreadCounts,
        onDMSelect,
        conversations,
        friendsList,
        getDeterministicAvatar,
        allUsers,
        isPttActive,
        remoteVolumes,
        setRemoteVolume,
        dropTargetChannel,
        setDropTargetChannel,
        handleAddFriend,
        handleRemoveFriend,
        handleMoveUserToChannel,
        handleKickUserFromChannel,
        onViewUserProfile,
    }) => {
        const isActive = currentVoiceRoom === room.slug;
        const unread = safeUnreadCounts[`room-${room.slug}`] || 0;
        const isVoice = room.channel_type === 'voice';
        const isEditingThisRoom = editingItemId === `room-${room.slug}`;
        // 🔥 FIX: When current user is in this voice room but WebSocket hasn't synced yet,
        // optimistically include self in the voice user list so the count and UI reflect reality.
        const rawUsersInRoom =
            isVoice && Array.isArray(activeVoiceUsers[room.slug])
                ? activeVoiceUsers[room.slug]
                : [];
        const isSelfMissing =
            isVoice &&
            isActive &&
            currentUsername &&
            !rawUsersInRoom.some((u) => u && u.username === currentUsername);
        const effectiveVoiceUsers = isSelfMissing
            ? {
                ...activeVoiceUsers,
                [room.slug]: [...rawUsersInRoom, { username: currentUsername, isLocal: true }],
            }
            : activeVoiceUsers;
        const userCount = isVoice ? effectiveVoiceUsers[room.slug]?.length || 0 : 0;
        const hoverTimerRef = useRef(null);

        // 🚀 Hover prefetch: 200ms debounce, text channels only
        const handlePointerEnter = useCallback(() => {
            if (isVoice || !onPrefetchChat) return;
            hoverTimerRef.current = setTimeout(() => onPrefetchChat('room', room.slug), 200);
        }, [isVoice, onPrefetchChat, room.slug]);
        const handlePointerLeave = useCallback(() => {
            if (hoverTimerRef.current) {
                clearTimeout(hoverTimerRef.current);
                hoverTimerRef.current = null;
            }
        }, []);

        // 🎯 Performance: Memoized handlers
        const handleChannelClick = useCallback(() => {
            if (isVoice) joinVoiceChat(room.slug);
            else onRoomSelect(room.slug);
        }, [isVoice, joinVoiceChat, onRoomSelect, room.slug]);
        const handleDragOver = useCallback(
            (e) => {
                if (!isVoice) return;
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                setDropTargetChannel(room.slug);
            },
            [isVoice, setDropTargetChannel, room.slug]
        );
        const handleDragLeave = useCallback(() => {
            if (dropTargetChannel === room.slug) setDropTargetChannel(null);
        }, [dropTargetChannel, room.slug, setDropTargetChannel]);
        const handleDrop = useCallback(
            (e) => {
                e.preventDefault();
                setDropTargetChannel(null);
                if (!isVoice || !isAdmin) return;
                try {
                    const data = JSON.parse(e.dataTransfer.getData('application/json'));
                    if (data.username && data.fromChannel && data.fromChannel !== room.slug) {
                        handleMoveUserToChannel(data.username, data.fromChannel, room.slug);
                    }
                } catch (err) {
                    logger.error('Drop error:', err);
                }
            },
            [isVoice, isAdmin, setDropTargetChannel, handleMoveUserToChannel, room.slug]
        );
        const handleRenameSubmit = useCallback(
            (e) => handleRenameRoom(e, room.slug),
            [handleRenameRoom, room.slug]
        );
        const handleStopPropagation = useCallback((e) => e.stopPropagation(), []);
        const handleEditBlur = useCallback(() => setEditingItemId(null), [setEditingItemId]);
        const handleRoomActionMenu = useCallback(
            (e) => handleOpenActionMenu(e, 'room', room.slug, room.name),
            [handleOpenActionMenu, room.slug, room.name]
        );
        const handleUserAction = useCallback(
            (action, username, targetChannel) => {
                if (action === 'profile') onViewUserProfile?.(username);
                else if (action === 'message' || action === 'dm') {
                    const conversation = conversations.find((c) =>
                        c.participants.some((p) => p.username === username)
                    );
                    if (conversation) onDMSelect(conversation.id, username);
                } else if (action === 'add_friend') handleAddFriend(username);
                else if (action === 'remove_friend') handleRemoveFriend(username);
                else if (action === 'move' && targetChannel)
                    handleMoveUserToChannel(username, room.slug, targetChannel);
                else if (action === 'kick') handleKickUserFromChannel(username, room.slug);
            },
            [
                onViewUserProfile,
                conversations,
                onDMSelect,
                handleAddFriend,
                handleRemoveFriend,
                handleMoveUserToChannel,
                handleKickUserFromChannel,
                room.slug,
            ]
        );

        return (
            <div className="channel-wrapper">
                <div
                    className={`channel-item ${isVoice ? 'voice-channel' : 'text-channel'} ${isActive ? 'active' : ''} ${dropTargetChannel === room.slug ? 'voice-channel-drop-target' : ''}`}
                    style={{
                        ...styles.roomItem,
                        marginLeft: 8,
                        backgroundColor:
                            dropTargetChannel === room.slug
                                ? 'rgba(88, 101, 242, 0.2)'
                                : isActive
                                    ? 'rgba(88, 101, 242, 0.15)'
                                    : 'transparent',
                        color: isActive ? '#fff' : '#949ba4',
                        borderLeft:
                            dropTargetChannel === room.slug
                                ? '3px solid #5865f2'
                                : isActive
                                    ? '3px solid #5865f2'
                                    : '3px solid transparent',
                        paddingLeft: isActive ? '5px' : '8px',
                        transition: 'all 0.2s ease',
                        borderRadius: '6px',
                        margin: '2px 8px',
                        position: 'relative',
                        ...(dropTargetChannel === room.slug
                            ? {
                                boxShadow:
                                    'inset 0 0 12px rgba(88, 101, 242, 0.15), 0 0 8px rgba(88, 101, 242, 0.2)',
                                border: '1px dashed rgba(88, 101, 242, 0.5)',
                            }
                            : {}),
                    }}
                    onClick={handleChannelClick}
                    onPointerEnter={handlePointerEnter}
                    onPointerLeave={handlePointerLeave}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    role="treeitem"
                    tabIndex={0}
                    aria-label={`${isVoice ? 'Voice channel' : 'Text channel'}: ${room.name}`}
                    aria-selected={isActive}
                    aria-current={isActive ? 'page' : undefined}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleChannelClick()}
                >
                    <div style={styles.channelContent}>
                        {isVoice && (
                            <FaVolumeUp
                                style={{
                                    ...styles.voiceIcon,
                                    color: isActive ? '#23a559' : '#949ba4',
                                    transition: 'color 0.2s ease',
                                }}
                            />
                        )}
                        {!isVoice && <FaCog />}
                        {isEditingThisRoom ? (
                            <>
                                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                                <form onSubmit={handleRenameSubmit} onClick={handleStopPropagation}>
                                    {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
                                    <input
                                        autoFocus
                                        aria-label={t('server.editChannelName', 'Edit channel name')}
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        onBlur={handleEditBlur}
                                        style={styles.inlineInput}
                                    />
                                </form>
                            </>
                        ) : (
                            <span
                                style={{
                                    ...styles.channelNameText,
                                    paddingLeft: '5px',
                                    fontWeight: isActive ? '600' : 'normal',
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                }}
                            >
                                {room.name}
                                {room.is_private && <span>🔒</span>}
                                {room.is_nsfw && <span>18+</span>}
                                {room.is_locked && <span>🔐</span>}
                                {room.admin_only_chat && <span>📢</span>}
                            </span>
                        )}

                        {isVoice && (
                            <span
                                style={{
                                    fontSize: '0.75em',
                                    color: userCount > 0 ? '#23a559' : '#949ba4',
                                    fontWeight: '500',
                                    marginLeft: 'auto',
                                    marginRight: '4px',
                                }}
                            >
                                ({userCount}/{room.user_limit > 0 ? room.user_limit : '∞'})
                            </span>
                        )}
                    </div>

                    {isOwner && !isEditingThisRoom && (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                flexShrink: 0,
                            }}
                        >
                            <button
                                aria-label={t('server.roomActionMenu', 'Room actions')}
                                style={styles.iconBtn}
                                onClick={handleRoomActionMenu}
                            >
                                <FaCog size={12} />
                            </button>
                        </div>
                    )}
                    {unread > 0 && <span style={styles.unreadBadge}>{unread}</span>}
                </div>

                {/* Voice User List */}
                {isVoice && (
                    <div>
                        <VoiceUserList
                            voiceUsers={effectiveVoiceUsers}
                            roomName={room.slug}
                            currentUsername={currentUsername}
                            remoteVolumes={remoteVolumes}
                            setRemoteVolume={setRemoteVolume}
                            isClientInThisChannel={currentVoiceRoom === room.slug}
                            isPttActive={isPttActive}
                            isAdmin={isAdmin}
                            voiceChannels={cat.rooms.filter((r) => r.is_voice)}
                            friendsList={friendsList}
                            getDeterministicAvatar={getDeterministicAvatar}
                            allUsers={allUsers}
                            onUserAction={handleUserAction}
                        />
                    </div>
                )}
            </div>
        );
    }
);

ServerPanel.propTypes = {
    servers: PropTypes.array,
    selectedServerId: PropTypes.bool,
    isAdmin: PropTypes.bool,
    currentUsername: PropTypes.string,
    currentVoiceRoom: PropTypes.object,
    activeVoiceUsers: PropTypes.bool,
    collapsedCategories: PropTypes.bool,
    toggleCategory: PropTypes.func,
    editingItemId: PropTypes.bool,
    setEditingItemId: PropTypes.func,
    editName: PropTypes.string,
    setEditName: PropTypes.func,
    newCategoryName: PropTypes.string,
    setNewCategoryName: PropTypes.func,
    newRoomName: PropTypes.string,
    setNewRoomName: PropTypes.func,
    newRoomType: PropTypes.object,
    setNewRoomType: PropTypes.func,
    activeServerIdForCategory: PropTypes.bool,
    setActiveServerIdForCategory: PropTypes.func,
    activeCategoryIdForRoom: PropTypes.bool,
    setActiveCategoryIdForRoom: PropTypes.func,
    handleCreateCategory: PropTypes.func,
    handleCreateRoom: PropTypes.func,
    handleRenameCategory: PropTypes.func,
    handleRenameRoom: PropTypes.func,
    handleOpenActionMenu: PropTypes.func,
    handleCreateInvite: PropTypes.func,
    onOpenServerSettings: PropTypes.func,
    joinVoiceChat: PropTypes.object,
    onRoomSelect: PropTypes.func,
    onPrefetchChat: PropTypes.func,
    safeUnreadCounts: PropTypes.array,
    onDMSelect: PropTypes.func,
    conversations: PropTypes.object,
    friendsList: PropTypes.object,
    getDeterministicAvatar: PropTypes.func,
    allUsers: PropTypes.array,
    isPttActive: PropTypes.bool,
    remoteVolumes: PropTypes.array,
    setRemoteVolume: PropTypes.func,
    dropTargetChannel: PropTypes.func,
    setDropTargetChannel: PropTypes.func,
    handleAddFriend: PropTypes.func,
    handleRemoveFriend: PropTypes.func,
    handleMoveUserToChannel: PropTypes.func,
    handleKickUserFromChannel: PropTypes.func,
    onViewUserProfile: PropTypes.func,
};
export default React.memo(ServerPanel);
