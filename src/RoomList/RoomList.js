// frontend/src/RoomList.js — Orchestrator (refactored from 1961 lines)
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FaCog } from '../utils/iconOptimization';
import { useTranslation } from 'react-i18next';
import toast from '../utils/toast';
import UserFooter from '../components/profile/UserFooter';
import { styles } from '../styles/SidebarStyles';

// Sub-components
import SupportModal from './SupportModal';
import AddServerModal from './AddServerModal';
import ActionMenuModal from './ActionMenuModal';
import useServerActions from './useServerActions';
import useDMActions from './useDMActions';
import ServerRail from './ServerRail';
import HomePanel from './HomePanel';
import ServerPanel from './ServerPanel';
import QuickAccessButtons from './QuickAccessButtons';
import VoiceControlBar from './VoiceControlBar';
import SupportButton from './SupportButton';
import RoomListModals from './RoomListModals';
import JoinServerModal from '../components/server/JoinServerModal';
import { injectRoomListAnimations } from './animations';

// -- extracted inline style constants --
const _st1 = {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
};
const _st2 = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    padding: '10px 14px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
    transition: 'all 0.2s ease',
    marginBottom: '8px',
};
const _st3 = {
    display: 'flex',
    width: '100%',
    height: '100%',
    minHeight: 0,
    overflow: 'hidden',
};

const RoomList = ({
    onFriendsClick,
    onWelcomeClick,
    isAdmin,
    categories: servers = [],
    conversations = [],
    currentRoom,
    currentConversationId,
    onRoomSelect,
    onDMSelect,
    onPrefetchChat,
    joinVoiceChat,
    leaveVoiceChat,
    unreadCounts = {},
    voiceUsers,
    currentUsername,
    currentUserProfile,
    currentVoiceRoom,
    remoteVolumes,
    setRemoteVolume,
    onProfileClick,
    onViewUserProfile,
    getDeterministicAvatar,
    isPttActive,
    setIsLeftSidebarVisible,
    apiBaseUrl,
    fetchWithAuth,
    activeChat,
    onOpenServerSettings,
    allUsers,
    onlineUsers,
    friendsList = [],
    pendingFriendRequests = 0,
    toggleMute,
    toggleDeafened,
    isMuted,
    isDeafened,
    isInVoice,
    isConnecting,
    toggleVideo,
    toggleScreenShare,
    isVideoEnabled,
    isScreenSharing,
    onServerDragStart,
    onServerDragOver,
    onServerDragEnd,
    onServerDrop,
    onMoveServer,
    updateAvailable = false,
    onUpdateClick,
    onOpenStore,
    onOpenAnalytics,
    onOpenAdminPanel,
    onOpenPaymentPanel,
    onOpenStoreModal,
    onOpenDailyRewards,
    onOpenAPIUsage,
    onOpenExportJobs,
    onOpenScheduledAnnouncements,
    onOpenMiniGames,
    onOpenProjectCollaboration,
    onOpenAvatarStudio,
    onServerSelect,
    openDiscovery = false,
    onDiscoveryOpened,
    onOpenSettings,
}) => {
    // --- Derived values ---
    const { t } = useTranslation();
    const safeUnreadCounts = unreadCounts || {};
    const apiUrl = `${apiBaseUrl}/api`;
    const activeVoiceUsers = voiceUsers || {};
    const actualCurrentRoom = currentRoom || (activeChat?.type === 'room' ? activeChat.id : null);

    const getAvatarUrl = useCallback(
        (avatarPath, fallbackUsername) => {
            if (!avatarPath || typeof avatarPath !== 'string')
                return getDeterministicAvatar(fallbackUsername);
            if (
                avatarPath.startsWith('http://') ||
                avatarPath.startsWith('https://') ||
                avatarPath.startsWith('blob:')
            )
                return avatarPath;
            if (avatarPath.includes('ui-avatars.com')) return avatarPath;
            let path = avatarPath.startsWith('/') ? avatarPath : `/${avatarPath}`;
            return `${apiBaseUrl}${path}`;
        },
        [apiBaseUrl, getDeterministicAvatar]
    );

    const voiceRoomDisplayName = useMemo(() => {
        if (!currentVoiceRoom) return '';
        for (const server of servers) {
            if (!server || !server.categories) continue;
            for (const cat of server.categories) {
                if (!cat || !cat.rooms) continue;
                const foundRoom = cat.rooms.find((r) => r && r.slug === currentVoiceRoom);
                if (foundRoom) return String(foundRoom.name);
            }
        }
        return String(currentVoiceRoom);
    }, [currentVoiceRoom, servers]);

    // --- State ---
    const [selectedServerId, setSelectedServerId] = useState('home');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [collapsedCategories, setCollapsedCategories] = useState({});
    const [draggedServerId, setDraggedServerId] = useState(null);
    const [dropTargetIndex, setDropTargetIndex] = useState(null);
    const [dropPosition, setDropPosition] = useState(null);
    const [hoveredServerId, setHoveredServerId] = useState(null);
    const [actionMenu, setActionMenu] = useState(null);
    const [serverContextMenu, setServerContextMenu] = useState(null);
    const [dropTargetChannel, setDropTargetChannel] = useState(null);

    // Modal states
    const [showDiscovery, setShowDiscovery] = useState(false);
    const [showSupportModal, setShowSupportModal] = useState(false);
    const [showAddMenu, setShowAddMenu] = useState(false);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteModalServer, setInviteModalServer] = useState(null);
    const [showSavedMessages, setShowSavedMessages] = useState(null);
    const [showScheduledMessages, setShowScheduledMessages] = useState(false);
    const [showWebhooks, setShowWebhooks] = useState(false);
    const [showModTools, setShowModTools] = useState(false);
    const [showQuickActions, setShowQuickActions] = useState(false);
    const [showAuditLogs, setShowAuditLogs] = useState(false);
    const [showReports, setShowReports] = useState(false);
    const [showVanityURL, setShowVanityURL] = useState(false);
    const [showAutoResponder, setShowAutoResponder] = useState(false);
    const [showChannelSettings, setShowChannelSettings] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const [mutedServers, setMutedServers] = useState(() => {
        const saved = localStorage.getItem('mutedServers');
        return saved ? JSON.parse(saved) : [];
    });

    // --- Hooks ---
    const {
        publicServers,
        newServerName,
        setNewServerName,
        newCategoryName,
        setNewCategoryName,
        newRoomName,
        setNewRoomName,
        newRoomType,
        setNewRoomType,
        isNewServerPublic,
        setIsNewServerPublic,
        activeServerIdForCategory,
        setActiveServerIdForCategory,
        activeCategoryIdForRoom,
        setActiveCategoryIdForRoom,
        editingItemId,
        setEditingItemId,
        editName,
        setEditName,
        deleteServerModal,
        setDeleteServerModal,
        leaveServerModal,
        setLeaveServerModal,
        handleLeaveServer,
        executeLeaveServer,
        handleChangeServerIcon,
        handleChangeServerPrivacy,
        handleCopyServerInvite,
        handleCreateServer,
        handleCreateCategory,
        handleCreateRoom,
        handleRenameCategory,
        handleDeleteCategory,
        handleRenameRoom,
        handleDeleteRoom,
        handleMoveServer,
        handleMoveUserToChannel,
        handleKickUserFromChannel,
        handleOpenDiscovery,
        handleJoinServer,
        handleJoinViaCode,
    } = useServerActions({
        apiUrl,
        fetchWithAuth,
        servers,
        currentUsername,
        selectedServerId,
        setSelectedServerId,
        onWelcomeClick,
        onMoveServer,
    });

    const {
        dmContextMenu,
        setDmContextMenu,
        inviteToServerModal,
        setInviteToServerModal,
        handleClearDM,
        handleHideDM,
        handleViewProfile,
        handleInviteToServer,
        handleSendServerInvite,
        handleMuteUser,
        handlePinConversation,
        handleBlockUser,
        handleAddFriend,
        handleRemoveFriend,
    } = useDMActions({ apiUrl, fetchWithAuth, servers, onViewUserProfile });

    // --- Effects ---
    useEffect(() => {
        if (openDiscovery) {
            setShowDiscovery(true);
            handleOpenDiscovery();
            onDiscoveryOpened?.();
        }
    }, [openDiscovery]); // INTENTIONAL: handler refs don't change, only openDiscovery triggers

    useEffect(() => {
        injectRoomListAnimations();
    }, []);

    useEffect(() => {
        if (
            activeChat &&
            (activeChat.type === 'welcome' ||
                activeChat.type === 'friends' ||
                activeChat.type === 'dm')
        ) {
            setSelectedServerId('home');
        }
    }, [activeChat]);

    useEffect(() => {
        const handleClickOutside = () => setDmContextMenu(null);
        if (dmContextMenu) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [dmContextMenu]);

    // --- Handlers ---
    const toggleCategory = (id) => setCollapsedCategories((p) => ({ ...p, [id]: !p[id] }));

    const handleServerClick = (server) => {
        if (!server || !server.id) return;
        setSelectedServerId(server.id);
        if (onServerSelect) onServerSelect(server);
    };

    const handleOpenActionMenu = (e, type, id, name) => {
        e.stopPropagation();
        setActionMenu({ type, id, name });
    };

    const executeRename = (e) => {
        e.preventDefault();
        setEditingItemId(
            actionMenu.type === 'category' ? `cat-${actionMenu.id}` : `room-${actionMenu.id}`
        );
        setEditName(actionMenu.name);
        setActionMenu(null);
    };

    const executeDelete = (e) => {
        if (actionMenu.type === 'category') handleDeleteCategory(e, actionMenu.id);
        else handleDeleteRoom(e, actionMenu.id);
        setActionMenu(null);
    };

    const executeSettings = (e) => {
        e.preventDefault();
        if (actionMenu.type === 'room') {
            let foundRoom = null,
                foundServerId = null;
            servers?.forEach((server) => {
                server.categories?.forEach((category) => {
                    if (category.rooms) {
                        const room = category.rooms.find((ch) => ch.slug === actionMenu.id);
                        if (room) {
                            foundRoom = { ...room, server_id: server.id, category_id: category.id };
                            foundServerId = server.id;
                        }
                    }
                });
            });
            if (foundRoom) {
                setSelectedRoom(foundRoom);
                setSelectedServerId(foundServerId);
                setShowChannelSettings(true);
            } else {
                toast.error(t('server.channelNotFound'));
            }
        }
        setActionMenu(null);
    };

    const handleServerContextMenu = (e, server) => {
        e.preventDefault();
        e.stopPropagation();
        setServerContextMenu({
            x: e.clientX,
            y: e.clientY,
            server,
            isOwner: server.owner_username === currentUsername,
        });
    };

    // Drag & Drop
    const handleServerDragStartWrapper = (e, serverId, index) => {
        setDraggedServerId(serverId);
        if (onServerDragStart) onServerDragStart(e, serverId, index);
    };
    const handleServerDragOverWrapper = (e, index) => {
        e.preventDefault();
        const rect = e.currentTarget.getBoundingClientRect();
        const position = e.clientY < rect.top + rect.height / 2 ? 'before' : 'after';
        setDropTargetIndex(index);
        setDropPosition(position);
        if (onServerDragOver) onServerDragOver(e);
    };
    const handleServerDragEndWrapper = (e) => {
        setDraggedServerId(null);
        setDropTargetIndex(null);
        setDropPosition(null);
        if (onServerDragEnd) onServerDragEnd(e);
    };
    const handleServerDropWrapper = (e, index) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const position = e.clientY < rect.top + rect.height / 2 ? 'before' : 'after';
        setDropTargetIndex(null);
        setDropPosition(null);
        setDraggedServerId(null);
        if (onServerDrop) onServerDrop(e, position === 'after' ? index + 1 : index);
    };

    const handleCreateInvite = (e, server) => {
        e.stopPropagation();
        setInviteModalServer(server);
        setShowInviteModal(true);
    };

    // --- Render ---
    return (
        <div style={_st1}>
            <ActionMenuModal
                actionMenu={actionMenu}
                onClose={() => setActionMenu(null)}
                onRename={executeRename}
                onDelete={executeDelete}
                onSettings={executeSettings}
            />
            <SupportModal isOpen={showSupportModal} onClose={() => setShowSupportModal(false)} />

            <div style={_st3}>
                {/* Column 1: Server Rail */}
                <ServerRail
                    servers={servers}
                    selectedServerId={selectedServerId}
                    hoveredServerId={hoveredServerId}
                    setHoveredServerId={setHoveredServerId}
                    safeUnreadCounts={safeUnreadCounts}
                    draggedServerId={draggedServerId}
                    dropTargetIndex={dropTargetIndex}
                    dropPosition={dropPosition}
                    onHomeClick={() => {
                        setSelectedServerId('home');
                        onWelcomeClick();
                    }}
                    handleServerClick={handleServerClick}
                    handleServerContextMenu={handleServerContextMenu}
                    handleServerDragStartWrapper={handleServerDragStartWrapper}
                    handleServerDragOverWrapper={handleServerDragOverWrapper}
                    handleServerDragEndWrapper={handleServerDragEndWrapper}
                    handleServerDropWrapper={handleServerDropWrapper}
                    onOpenStore={onOpenStore}
                    onDiscoverClick={() => setShowDiscovery(true)}
                    onAddClick={() => setShowAddMenu(true)}
                />

                {/* Column 2: Sidebar */}
                <div style={styles.sidebar}>
                    {selectedServerId === 'home' && (
                        <HomePanel
                            conversations={conversations}
                            currentConversationId={currentConversationId}
                            currentUsername={currentUsername}
                            onRoomSelect={onRoomSelect}
                            onDMSelect={onDMSelect}
                            onPrefetchChat={onPrefetchChat}
                            onFriendsClick={onFriendsClick}
                            pendingFriendRequests={pendingFriendRequests}
                            safeUnreadCounts={safeUnreadCounts}
                            onlineUsers={onlineUsers}
                            allUsers={allUsers}
                            getAvatarUrl={getAvatarUrl}
                            setDmContextMenu={setDmContextMenu}
                            onDiscoverClick={() => setShowDiscovery(true)}
                            servers={servers}
                        />
                    )}

                    {selectedServerId !== 'home' && servers && (
                        <ServerPanel
                            servers={servers}
                            selectedServerId={selectedServerId}
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
                            newCategoryName={newCategoryName}
                            setNewCategoryName={setNewCategoryName}
                            newRoomName={newRoomName}
                            setNewRoomName={setNewRoomName}
                            newRoomType={newRoomType}
                            setNewRoomType={setNewRoomType}
                            activeServerIdForCategory={activeServerIdForCategory}
                            setActiveServerIdForCategory={setActiveServerIdForCategory}
                            activeCategoryIdForRoom={activeCategoryIdForRoom}
                            setActiveCategoryIdForRoom={setActiveCategoryIdForRoom}
                            handleCreateCategory={handleCreateCategory}
                            handleCreateRoom={handleCreateRoom}
                            handleRenameCategory={handleRenameCategory}
                            handleRenameRoom={handleRenameRoom}
                            handleOpenActionMenu={handleOpenActionMenu}
                            handleCreateInvite={handleCreateInvite}
                            onOpenServerSettings={onOpenServerSettings}
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
                    )}

                    <AddServerModal
                        isOpen={showAddMenu}
                        onClose={() => setShowAddMenu(false)}
                        onCreateServer={handleCreateServer}
                        onFriendsClick={onFriendsClick}
                        onDiscoverClick={() => {
                            setShowAddMenu(false);
                            setShowDiscovery(true);
                        }}
                    />

                    <div style={styles.bottomSection}>
                        {/* Admin Panel Button */}
                        {isAdmin && (
                            <button
                                onClick={onOpenAdminPanel}
                                aria-label={t('admin.adminPanel', 'Yönetici Paneli')}
                                style={_st2}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow =
                                        '0 6px 20px rgba(102, 126, 234, 0.6)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow =
                                        '0 4px 15px rgba(102, 126, 234, 0.4)';
                                }}
                            >
                                <FaCog size={16} />
                                <span>{t('admin.adminPanel', 'Yönetici Paneli')}</span>
                            </button>
                        )}

                        <QuickAccessButtons
                            handlers={{
                                onOpenPaymentPanel,
                                onOpenStoreModal,
                                onOpenDailyRewards,
                                onOpenAPIUsage,
                                onOpenExportJobs,
                                onOpenScheduledAnnouncements,
                                onOpenMiniGames,
                                onOpenProjectCollaboration,
                                onOpenAvatarStudio,
                            }}
                        />

                        <VoiceControlBar
                            isInVoice={isInVoice}
                            isConnecting={isConnecting}
                            isMuted={isMuted}
                            isDeafened={isDeafened}
                            isVideoEnabled={isVideoEnabled}
                            isScreenSharing={isScreenSharing}
                            toggleVideo={toggleVideo}
                            toggleScreenShare={toggleScreenShare}
                            toggleMute={toggleMute}
                            toggleDeafened={toggleDeafened}
                            leaveVoiceChat={leaveVoiceChat}
                            voiceRoomDisplayName={voiceRoomDisplayName}
                            getAvatarUrl={getAvatarUrl}
                            currentUserProfile={currentUserProfile}
                            currentUsername={currentUsername}
                            getDeterministicAvatar={getDeterministicAvatar}
                        />

                        {!(isInVoice || isConnecting) && (
                            <SupportButton onClick={() => setShowSupportModal(true)} />
                        )}

                        <UserFooter
                            currentUserProfile={currentUserProfile}
                            currentUsername={currentUsername}
                            getDeterministicAvatar={getDeterministicAvatar}
                            onProfileClick={onProfileClick}
                            onOpenSettings={onOpenSettings}
                            updateAvailable={updateAvailable}
                            onUpdateClick={onUpdateClick}
                            ownActivity={
                                allUsers?.find((u) => u.username === currentUsername)
                                    ?.current_activity || null
                            }
                        />
                    </div>
                </div>
            </div>

            {/* All Modals & Context Menus */}
            <RoomListModals
                showDiscovery={showDiscovery}
                setShowDiscovery={setShowDiscovery}
                publicServers={publicServers}
                handleJoinServer={handleJoinServer}
                handleJoinViaCode={handleJoinViaCode}
                showInviteModal={showInviteModal}
                setShowInviteModal={setShowInviteModal}
                inviteModalServer={inviteModalServer}
                setInviteModalServer={setInviteModalServer}
                fetchWithAuth={fetchWithAuth}
                apiUrl={apiUrl}
                apiBaseUrl={apiBaseUrl}
                currentUsername={currentUsername}
                showSavedMessages={showSavedMessages}
                setShowSavedMessages={setShowSavedMessages}
                showScheduledMessages={showScheduledMessages}
                setShowScheduledMessages={setShowScheduledMessages}
                actualCurrentRoom={actualCurrentRoom}
                currentConversationId={currentConversationId}
                showWebhooks={showWebhooks}
                setShowWebhooks={setShowWebhooks}
                selectedServerId={selectedServerId}
                showModTools={showModTools}
                setShowModTools={setShowModTools}
                showQuickActions={showQuickActions}
                setShowQuickActions={setShowQuickActions}
                setShowAuditLogs={setShowAuditLogs}
                setShowReports={setShowReports}
                setShowVanityURL={setShowVanityURL}
                setShowAutoResponder={setShowAutoResponder}
                showAuditLogs={showAuditLogs}
                showReports={showReports}
                showVanityURL={showVanityURL}
                showAutoResponder={showAutoResponder}
                serverContextMenu={serverContextMenu}
                setServerContextMenu={setServerContextMenu}
                handleLeaveServer={handleLeaveServer}
                onOpenServerSettings={onOpenServerSettings}
                handleMoveServer={handleMoveServer}
                handleCopyServerInvite={handleCopyServerInvite}
                handleChangeServerIcon={handleChangeServerIcon}
                handleChangeServerPrivacy={handleChangeServerPrivacy}
                mutedServers={mutedServers}
                setMutedServers={setMutedServers}
                servers={servers}
                deleteServerModal={deleteServerModal}
                setDeleteServerModal={setDeleteServerModal}
                leaveServerModal={leaveServerModal}
                setLeaveServerModal={setLeaveServerModal}
                executeLeaveServer={executeLeaveServer}
                setSelectedServerId={setSelectedServerId}
                onWelcomeClick={onWelcomeClick}
                dmContextMenu={dmContextMenu}
                setDmContextMenu={setDmContextMenu}
                getAvatarUrl={getAvatarUrl}
                onlineUsers={onlineUsers}
                onDMSelect={onDMSelect}
                handleViewProfile={handleViewProfile}
                handleInviteToServer={handleInviteToServer}
                handlePinConversation={handlePinConversation}
                handleMuteUser={handleMuteUser}
                handleHideDM={handleHideDM}
                handleClearDM={handleClearDM}
                handleBlockUser={handleBlockUser}
                inviteToServerModal={inviteToServerModal}
                setInviteToServerModal={setInviteToServerModal}
                handleSendServerInvite={handleSendServerInvite}
                showChannelSettings={showChannelSettings}
                setShowChannelSettings={setShowChannelSettings}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
            />

            {/* New independent Join Server modal */}
            <JoinServerModal isOpen={showDiscovery} onClose={() => setShowDiscovery(false)} />
        </div>
    );
};

RoomList.propTypes = {
    onFriendsClick: PropTypes.func,
    onWelcomeClick: PropTypes.func,
    isAdmin: PropTypes.bool,
    conversations: PropTypes.object,
    currentRoom: PropTypes.object,
    currentConversationId: PropTypes.func,
    onRoomSelect: PropTypes.func,
    onDMSelect: PropTypes.func,
    onPrefetchChat: PropTypes.func,
    joinVoiceChat: PropTypes.object,
    leaveVoiceChat: PropTypes.object,
    unreadCounts: PropTypes.array,
};
export default React.memo(RoomList);
