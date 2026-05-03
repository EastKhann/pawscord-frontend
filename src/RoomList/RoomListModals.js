// frontend/src/RoomList/RoomListModals.js
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import InviteModal from '../components/server/InviteModal';
import SavedMessagesModal from '../components/chat/SavedMessagesModal';
import ScheduledMessageModal from '../components/chat/ScheduledMessageModal';
import WebhookManager from '../components/server/WebhookManager';
import ModeratorTools from '../components/moderation/ModeratorTools';
import QuickActionsMenu from '../components/shared/QuickActionsMenu';
import AuditLogViewer from '../components/admin/AuditLogViewer';
import ReportsViewer from '../components/admin/ReportsViewer';
import VanityURLManager from '../components/server/VanityURLManager';
import AutoResponderManager from '../components/bot/AutoResponderManager';
import ServerContextMenu from '../components/server/ServerContextMenu';
import ChannelSettingsModal from '../components/server/ChannelSettingsModal';
import ConfirmModal from '../components/shared/ConfirmModal';
// DiscoveryModal removed — JoinServerModal in RoomList.js is the replacement
import InviteToServerModal from './InviteToServerModal';
import toast from '../utils/toast';

// -- extracted inline style constants --

const RoomListModals = ({
    // Discovery
    showDiscovery,
    setShowDiscovery,
    publicServers,
    handleJoinServer,
    handleJoinViaCode,
    // Invite
    showInviteModal,
    setShowInviteModal,
    inviteModalServer,
    setInviteModalServer,
    fetchWithAuth,
    apiUrl,
    apiBaseUrl,
    currentUsername,
    // Saved messages
    showSavedMessages,
    setShowSavedMessages,
    // Scheduled messages
    showScheduledMessages,
    setShowScheduledMessages,
    actualCurrentRoom,
    currentConversationId,
    // Webhooks
    showWebhooks,
    setShowWebhooks,
    selectedServerId,
    // Mod tools
    showModTools,
    setShowModTools,
    // Quick actions
    showQuickActions,
    setShowQuickActions,
    setShowAuditLogs,
    setShowReports,
    setShowVanityURL,
    setShowAutoResponder,
    // Audit logs
    showAuditLogs,
    // Reports
    showReports,
    // Vanity URL
    showVanityURL,
    // Auto Responder
    showAutoResponder,
    // Server Context Menu
    serverContextMenu,
    setServerContextMenu,
    handleLeaveServer,
    onOpenServerSettings,
    handleMoveServer,
    handleCopyServerInvite,
    handleChangeServerIcon,
    handleChangeServerPrivacy,
    mutedServers,
    setMutedServers,
    servers,
    deleteServerModal,
    setDeleteServerModal,
    leaveServerModal,
    setLeaveServerModal,
    executeLeaveServer,
    setSelectedServerId,
    onWelcomeClick,
    // DM Context Menu
    dmContextMenu,
    setDmContextMenu,
    getAvatarUrl,
    onlineUsers,
    onDMSelect,
    handleViewProfile,
    handleInviteToServer,
    handlePinConversation,
    handleMuteUser,
    handleHideDM,
    handleClearDM,
    handleBlockUser,
    // Invite to server
    inviteToServerModal,
    setInviteToServerModal,
    handleSendServerInvite,
    // Channel Settings
    showChannelSettings,
    setShowChannelSettings,
    selectedRoom,
    setSelectedRoom,
}) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    // Memoized handlers
    const handleCloseDiscovery = useCallback(() => setShowDiscovery(false), [setShowDiscovery]);
    const handleCloseInvite = useCallback(() => {
        setShowInviteModal(false);
        setInviteModalServer(null);
    }, [setShowInviteModal, setInviteModalServer]);
    const handleCloseSaved = useCallback(() => setShowSavedMessages(null), [setShowSavedMessages]);
    const handleCloseScheduled = useCallback(
        () => setShowScheduledMessages(false),
        [setShowScheduledMessages]
    );
    const handleCloseWebhooks = useCallback(() => setShowWebhooks(false), [setShowWebhooks]);
    const handleCloseModTools = useCallback(() => setShowModTools(false), [setShowModTools]);
    const handleCloseQuickActions = useCallback(
        () => setShowQuickActions(false),
        [setShowQuickActions]
    );
    const handleOpenWebhooks = useCallback(() => {
        setShowQuickActions(false);
        setShowWebhooks(true);
    }, [setShowQuickActions, setShowWebhooks]);
    const handleOpenAuditLogs = useCallback(() => {
        setShowQuickActions(false);
        setShowAuditLogs(true);
    }, [setShowQuickActions, setShowAuditLogs]);
    const handleOpenReports = useCallback(() => {
        setShowQuickActions(false);
        setShowReports(true);
    }, [setShowQuickActions, setShowReports]);
    const handleOpenVanityURL = useCallback(() => {
        setShowQuickActions(false);
        setShowVanityURL(true);
    }, [setShowQuickActions, setShowVanityURL]);
    const handleOpenAutoResponder = useCallback(() => {
        setShowQuickActions(false);
        setShowAutoResponder(true);
    }, [setShowQuickActions, setShowAutoResponder]);
    const handleCloseAuditLogs = useCallback(() => setShowAuditLogs(false), [setShowAuditLogs]);
    const handleCloseReports = useCallback(() => setShowReports(false), [setShowReports]);
    const handleCloseVanityURL = useCallback(() => setShowVanityURL(false), [setShowVanityURL]);
    const handleCloseAutoResponder = useCallback(
        () => setShowAutoResponder(false),
        [setShowAutoResponder]
    );
    const handleCloseServerCtxMenu = useCallback(
        () => setServerContextMenu(null),
        [setServerContextMenu]
    );
    const handleLeaveServerCtx = useCallback(
        () => handleLeaveServer(serverContextMenu?.server?.id),
        [handleLeaveServer, serverContextMenu]
    );
    const handleServerSettings = useCallback(() => {
        onOpenServerSettings(serverContextMenu?.server);
        setServerContextMenu(null);
    }, [onOpenServerSettings, serverContextMenu, setServerContextMenu]);
    const handleMuteServer = useCallback(() => {
        const serverId = serverContextMenu?.server?.id;
        setMutedServers((prev) => {
            const u = [...prev, serverId];
            localStorage.setItem('mutedServers', JSON.stringify(u));
            return u;
        });
        setServerContextMenu(null);
    }, [serverContextMenu, setMutedServers, setServerContextMenu]);
    const handleUnmuteServer = useCallback(() => {
        const serverId = serverContextMenu?.server?.id;
        setMutedServers((prev) => {
            const u = prev.filter((id) => id !== serverId);
            localStorage.setItem('mutedServers', JSON.stringify(u));
            return u;
        });
        setServerContextMenu(null);
    }, [serverContextMenu, setMutedServers, setServerContextMenu]);
    const handleMoveUp = useCallback(
        () => handleMoveServer(serverContextMenu?.server?.id, 'up'),
        [handleMoveServer, serverContextMenu]
    );
    const handleMoveDown = useCallback(
        () => handleMoveServer(serverContextMenu?.server?.id, 'down'),
        [handleMoveServer, serverContextMenu]
    );
    const handleCopyInvite = useCallback(
        () => handleCopyServerInvite(serverContextMenu?.server?.id),
        [handleCopyServerInvite, serverContextMenu]
    );
    const handleChangeIcon = useCallback(() => {
        handleChangeServerIcon(serverContextMenu?.server?.id);
        setServerContextMenu(null);
    }, [handleChangeServerIcon, serverContextMenu, setServerContextMenu]);
    const handleChangePrivacy = useCallback(() => {
        handleChangeServerPrivacy(serverContextMenu?.server?.id);
        setServerContextMenu(null);
    }, [handleChangeServerPrivacy, serverContextMenu, setServerContextMenu]);
    const handleDeleteServer = useCallback(() => {
        setDeleteServerModal({ server: serverContextMenu?.server, isOpen: true });
        setServerContextMenu(null);
    }, [serverContextMenu, setDeleteServerModal, setServerContextMenu]);
    const handleCloseDeleteModal = useCallback(
        () => setDeleteServerModal(null),
        [setDeleteServerModal]
    );
    const handleConfirmDelete = useCallback(async () => {
        const serverId = deleteServerModal.server.id;
        const serverName = deleteServerModal.server.name;
        try {
            const response = await fetchWithAuth(`${apiUrl}/servers/${serverId}/delete/`, {
                method: 'DELETE',
            });
            if (response.ok) {
                toast.success(t('server.deleted', { name: serverName }), 5000);
                setSelectedServerId('home');
                onWelcomeClick();
            } else {
                const error = await response.json();
                toast.error(error.error || t('server.deleteFailed'));
            }
        } catch (error) {
            toast.error(t('server.deleteFailed'));
        }
    }, [deleteServerModal, fetchWithAuth, apiUrl, setSelectedServerId, onWelcomeClick]);
    const handleCloseLeaveModal = useCallback(
        () => setLeaveServerModal(null),
        [setLeaveServerModal]
    );
    const handleConfirmLeave = useCallback(async () => {
        await executeLeaveServer(leaveServerModal.server.id);
    }, [executeLeaveServer, leaveServerModal]);
    const handleCloseInviteToServer = useCallback(
        () => setInviteToServerModal(null),
        [setInviteToServerModal]
    );
    const handleCloseChannelSettings = useCallback(() => {
        setShowChannelSettings(false);
        setSelectedRoom(null);
    }, [setShowChannelSettings, setSelectedRoom]);
    const handleUpdateChannelSettings = useCallback(() => {
        setShowChannelSettings(false);
        setSelectedRoom(null);
    }, [setShowChannelSettings, setSelectedRoom]);

    return (
        <>
            {/* Davet Modal */}
            {showInviteModal && inviteModalServer && (
                <InviteModal
                    onClose={handleCloseInvite}
                    server={inviteModalServer}
                    fetchWithAuth={fetchWithAuth}
                    apiBaseUrl={apiUrl}
                    currentUser={currentUsername}
                />
            )}

            {/* Saved Messages */}
            {showSavedMessages &&
                createPortal(
                    <SavedMessagesModal
                        type={showSavedMessages}
                        onClose={handleCloseSaved}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={apiBaseUrl}
                    />,
                    document.body
                )}

            {/* Scheduled Messages */}
            {showScheduledMessages &&
                createPortal(
                    <ScheduledMessageModal
                        room={actualCurrentRoom}
                        conversation={currentConversationId}
                        onClose={handleCloseScheduled}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={apiBaseUrl}
                    />,
                    document.body
                )}

            {/* Webhooks */}
            {showWebhooks &&
                createPortal(
                    <WebhookManager
                        serverId={selectedServerId}
                        onClose={handleCloseWebhooks}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={apiBaseUrl}
                    />,
                    document.body
                )}

            {/* Mod Tools */}
            {showModTools &&
                createPortal(
                    <ModeratorTools
                        serverId={selectedServerId}
                        onClose={handleCloseModTools}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={apiBaseUrl}
                    />,
                    document.body
                )}

            {/* Quick Actions */}
            {showQuickActions &&
                createPortal(
                    <QuickActionsMenu
                        onClose={handleCloseQuickActions}
                        onOpenWebhooks={handleOpenWebhooks}
                        onOpenAuditLogs={handleOpenAuditLogs}
                        onOpenReports={handleOpenReports}
                        onOpenVanityURL={handleOpenVanityURL}
                        onOpenAutoResponder={handleOpenAutoResponder}
                    />,
                    document.body
                )}

            {/* Audit Logs */}
            {showAuditLogs &&
                createPortal(
                    <AuditLogViewer
                        serverId={selectedServerId}
                        onClose={handleCloseAuditLogs}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={apiBaseUrl}
                    />,
                    document.body
                )}

            {/* Reports */}
            {showReports &&
                createPortal(
                    <ReportsViewer
                        serverId={selectedServerId}
                        onClose={handleCloseReports}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={apiBaseUrl}
                    />,
                    document.body
                )}

            {/* Vanity URL */}
            {showVanityURL &&
                createPortal(
                    <VanityURLManager
                        serverId={selectedServerId}
                        onClose={handleCloseVanityURL}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={apiBaseUrl}
                    />,
                    document.body
                )}

            {/* Auto Responder */}
            {showAutoResponder &&
                createPortal(
                    <AutoResponderManager
                        serverId={selectedServerId}
                        onClose={handleCloseAutoResponder}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={apiBaseUrl}
                    />,
                    document.body
                )}

            {/* Server Context Menu */}
            {serverContextMenu &&
                createPortal(
                    <ServerContextMenu
                        x={serverContextMenu.x}
                        y={serverContextMenu.y}
                        server={serverContextMenu.server}
                        isOwner={serverContextMenu.isOwner}
                        onClose={handleCloseServerCtxMenu}
                        onLeaveServer={handleLeaveServerCtx}
                        onServerSettings={handleServerSettings}
                        onMuteServer={handleMuteServer}
                        onUnmuteServer={handleUnmuteServer}
                        onMoveUp={handleMoveUp}
                        onMoveDown={handleMoveDown}
                        onCopyInvite={handleCopyInvite}
                        onChangeIcon={handleChangeIcon}
                        onChangePrivacy={handleChangePrivacy}
                        onDeleteServer={handleDeleteServer}
                        canMoveUp={
                            servers &&
                            servers.findIndex((s) => s.id === serverContextMenu.server.id) > 0
                        }
                        canMoveDown={
                            servers &&
                            servers.findIndex((s) => s.id === serverContextMenu.server.id) <
                            servers.length - 1
                        }
                        isMuted={mutedServers.includes(serverContextMenu.server.id)}
                    />,
                    document.body
                )}

            {/* DM Context Menu */}
            {dmContextMenu && (
                <DMContextMenuPortal
                    dmContextMenu={dmContextMenu}
                    currentUsername={currentUsername}
                    getAvatarUrl={getAvatarUrl}
                    onlineUsers={onlineUsers}
                    onDMSelect={onDMSelect}
                    setDmContextMenu={setDmContextMenu}
                    handleViewProfile={handleViewProfile}
                    handleInviteToServer={handleInviteToServer}
                    handlePinConversation={handlePinConversation}
                    handleMuteUser={handleMuteUser}
                    handleHideDM={handleHideDM}
                    handleClearDM={handleClearDM}
                    handleBlockUser={handleBlockUser}
                />
            )}

            {/* Delete Server Confirm */}
            {deleteServerModal?.isOpen && (
                <ConfirmModal
                    isOpen={deleteServerModal.isOpen}
                    onClose={handleCloseDeleteModal}
                    onConfirm={handleConfirmDelete}
                    title={t('contextMenu.deleteServer', 'Sunucuyu Sil')}
                    message={t(
                        'contextMenu.deleteServerConfirm',
                        t('roomModals.deleteServerConfirm', 'You are about to PERMANENTLY delete "{{name}}"!', { name }),
                        { name: deleteServerModal.server.name }
                    )}
                    confirmText={t('contextMenu.deleteServer', 'Sunucuyu Sil')}
                    cancelText={t('common.cancel', 'İptal')}
                    type="danger"
                    requireTextConfirmation={true}
                    confirmationText={deleteServerModal.server.name}
                    inputPlaceholder={`Type "${deleteServerModal.server.name}" to confirm...`}
                    dangerDetails={[
                        t(
                            'contextMenu.deleteDetail1',
                            'ALL channels in the server will be deleted'
                        ),
                        t(
                            'contextMenu.deleteDetail2',
                            'ALL messages in the server will be deleted'
                        ),
                        t('contextMenu.deleteDetail3', 'ALL members will be removed'),
                        t('contextMenu.deleteDetail4', 'All roles and settings will be deleted'),
                    ]}
                />
            )}

            {/* Leave Server Confirm */}
            {leaveServerModal?.isOpen && (
                <ConfirmModal
                    isOpen={leaveServerModal.isOpen}
                    onClose={handleCloseLeaveModal}
                    onConfirm={handleConfirmLeave}
                    title={t('contextMenu.leaveServer', 'Sunucudan Ayrıl')}
                    message={t(
                        'contextMenu.leaveServerConfirm',
                        t('roomModals.leaveServerConfirm', 'Are you sure you want to leave "{{name}}"?', { name }),
                        { name: leaveServerModal.server.name }
                    )}
                    confirmText={t('contextMenu.leaveServer', 'Sunucudan Ayrıl')}
                    cancelText={t('common.cancel', 'İptal')}
                    type="warning"
                    dangerDetails={[
                        t(
                            'contextMenu.leaveDetail1',
                            'Your messages in the server will not be deleted'
                        ),
                        t('contextMenu.leaveDetail2', 'You will need an invite to rejoin'),
                        t(
                            'contextMenu.leaveDetail3',
                            'All notifications from this server will stop'
                        ),
                    ]}
                />
            )}

            {/* Invite to Server */}
            <InviteToServerModal
                inviteToServerModal={inviteToServerModal}
                servers={servers}
                onSendInvite={handleSendServerInvite}
                onClose={handleCloseInviteToServer}
            />

            {/* Channel Settings */}
            {showChannelSettings &&
                selectedRoom &&
                (() => {
                    const currentServer = servers?.find((s) => s.id === selectedRoom.server_id);
                    const serverRoles = currentServer?.roles || [];
                    return (
                        <ChannelSettingsModal
                            room={selectedRoom}
                            serverId={selectedRoom.server_id || selectedServerId}
                            serverRoles={serverRoles}
                            onClose={handleCloseChannelSettings}
                            onUpdate={handleUpdateChannelSettings}
                            fetchWithAuth={fetchWithAuth}
                            apiBaseUrl={apiBaseUrl}
                        />
                    );
                })()}
        </>
    );
};

// DM Context Menu - extracted to reduce nesting
const DMContextMenuPortal = ({
    dmContextMenu,
    currentUsername,
    getAvatarUrl,
    onlineUsers,
    onDMSelect,
    setDmContextMenu,
    handleViewProfile,
    handleInviteToServer,
    handlePinConversation,
    handleMuteUser,
    handleHideDM,
    handleClearDM,
    handleBlockUser,
}) => {
    const { t } = useTranslation();
    const otherUser = dmContextMenu.conversation.participants.find(
        (p) => p.username !== currentUsername
    );
    if (!otherUser) return null;

    const menuItems = [
        {
            icon: '👤',
            label: t('contextMenu.viewProfile', 'Profili Görüntüle'),
            color: '#dbdee1',
            onClick: () => handleViewProfile(otherUser.username),
        },
        {
            icon: '💬',
            label: t('contextMenu.sendMessage', 'Mesaj Gönder'),
            color: '#dbdee1',
            divider: true,
            onClick: () => {
                onDMSelect(dmContextMenu.conversation.id, otherUser.username);
                setDmContextMenu(null);
            },
        },
        {
            icon: '🎫',
            label: t('contextMenu.inviteToServer', 'Sunucuya Davet Et'),
            color: '#5865f2',
            onClick: () => handleInviteToServer(otherUser.username),
        },
        {
            icon: '📌',
            label: t('contextMenu.pinConversation', 'Sohbeti Sabitle'),
            color: '#dbdee1',
            divider: true,
            onClick: () => handlePinConversation(dmContextMenu.conversation.id),
        },
        {
            icon: '🔇',
            label: t('contextMenu.mute', 'Sustur'),
            color: '#b5bac1',
            onClick: () => handleMuteUser(otherUser.username, dmContextMenu.conversation.id),
        },
        {
            icon: '👁️‍🗨️',
            label: t('contextMenu.hideConversation', 'Sohbeti Gizle'),
            color: '#b5bac1',
            divider: true,
            onClick: () => handleHideDM(dmContextMenu.conversation.id),
        },
        {
            icon: '🗑️',
            label: t('contextMenu.clearConversation', 'Sohbeti Temizle'),
            color: '#f23f42',
            onClick: () => handleClearDM(dmContextMenu.conversation.id),
        },
        {
            icon: '🚫',
            label: t('contextMenu.blockUser', 'Kullanıcıyı Engelle'),
            color: '#f23f42',
            onClick: () => handleBlockUser(otherUser.username),
        },
    ];

    // Clamp position so menu never overflows viewport
    const MENU_WIDTH = 240;
    const MENU_HEIGHT_ESTIMATE = 420;
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1280;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 720;
    const menuLeft = Math.max(8, Math.min(dmContextMenu.x, vw - MENU_WIDTH - 8));
    const menuTop = Math.max(8, Math.min(dmContextMenu.y, vh - MENU_HEIGHT_ESTIMATE - 8));
    const isOnlineNow = onlineUsers.includes(otherUser.username);

    return createPortal(
        <div
            aria-label={t('aria.dmContextMenu', 'Direct message menu')}
            role="menu"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === 'Escape') setDmContextMenu(null);
            }}
            style={{
                position: 'fixed',
                top: menuTop,
                left: menuLeft,
                backgroundColor: '#17191c',
                border: '1px solid #2a2a2e',
                borderRadius: '12px',
                width: `${MENU_WIDTH}px`,
                boxShadow: '0 8px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.4)',
                zIndex: 999999,
                overflow: 'hidden',
                animation: 'contextMenuSlide 150ms ease-out',
                fontFamily: 'inherit',
            }}
        >
            {/* User Header */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px',
                    background: 'linear-gradient(135deg, rgba(88,101,242,0.18) 0%, rgba(124,58,237,0.12) 100%)',
                    borderBottom: '1px solid #2a2a2e',
                }}
            >
                <div style={{ position: 'relative', flexShrink: 0 }}>
                    <img
                        src={getAvatarUrl(otherUser.avatar, otherUser.username)}
                        alt=""
                        width={40}
                        height={40}
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            display: 'block',
                            background: '#0b0e1b',
                        }}
                        onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
                    />
                    <span
                        aria-hidden="true"
                        style={{
                            position: 'absolute',
                            right: -2,
                            bottom: -2,
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: isOnlineNow ? '#23a559' : '#80848e',
                            border: '2px solid #17191c',
                        }}
                    />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                    <div
                        style={{
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#ffffff',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {otherUser.username}
                    </div>
                    <div style={{ fontSize: '12px', color: '#b5bac1', marginTop: '2px' }}>
                        {isOnlineNow
                            ? t('common.online', 'Çevrimiçi')
                            : t('common.offline', 'Çevrimdışı')}
                    </div>
                </div>
            </div>

            {/* Menu Items */}
            <div style={{ padding: '4px' }}>
                {menuItems.map((item, index) => (
                    <React.Fragment key={`item-${index}`}>
                        <div
                            onClick={item.onClick}
                            role="menuitem"
                            tabIndex={0}
                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && item.onClick()}
                            style={{
                                padding: '8px 10px',
                                cursor: 'pointer',
                                color: item.color,
                                fontSize: '14px',
                                fontWeight: 500,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                transition: 'background-color 120ms ease-out',
                                backgroundColor: 'transparent',
                                borderRadius: '6px',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor =
                                    item.color === '#f23f42'
                                        ? 'rgba(242, 63, 66, 0.15)'
                                        : 'rgba(88, 101, 242, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            <span style={{ fontSize: '15px', width: '18px', textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
                        </div>
                        {item.divider && (
                            <div
                                role="separator"
                                style={{
                                    height: '1px',
                                    background: '#2a2a2e',
                                    margin: '4px 6px',
                                }}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>,
        document.body
    );
};

RoomListModals.propTypes = {
    setShowDiscovery: PropTypes.func,
    publicServers: PropTypes.array,
    handleJoinServer: PropTypes.func,
    handleJoinViaCode: PropTypes.func,
    setShowInviteModal: PropTypes.func,
    inviteModalServer: PropTypes.object,
    setInviteModalServer: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    apiUrl: PropTypes.string,
    apiBaseUrl: PropTypes.string,
    currentUsername: PropTypes.string,
    setShowSavedMessages: PropTypes.func,
    setShowScheduledMessages: PropTypes.func,
    actualCurrentRoom: PropTypes.object,
    currentConversationId: PropTypes.func,
    setShowWebhooks: PropTypes.func,
    selectedServerId: PropTypes.bool,
    setShowModTools: PropTypes.func,
    setShowQuickActions: PropTypes.func,
    setShowAuditLogs: PropTypes.func,
    setShowReports: PropTypes.func,
    setShowVanityURL: PropTypes.func,
    setShowAutoResponder: PropTypes.func,
    setServerContextMenu: PropTypes.func,
    handleLeaveServer: PropTypes.func,
    onOpenServerSettings: PropTypes.func,
    handleMoveServer: PropTypes.func,
    handleCopyServerInvite: PropTypes.func,
    handleChangeServerIcon: PropTypes.func,
    handleChangeServerPrivacy: PropTypes.func,
    mutedServers: PropTypes.bool,
    setMutedServers: PropTypes.func,
    servers: PropTypes.array,
    deleteServerModal: PropTypes.func,
    setDeleteServerModal: PropTypes.func,
    leaveServerModal: PropTypes.object,
    setLeaveServerModal: PropTypes.func,
    executeLeaveServer: PropTypes.object,
    setSelectedServerId: PropTypes.func,
    onWelcomeClick: PropTypes.func,
    setDmContextMenu: PropTypes.func,
    getAvatarUrl: PropTypes.func,
    onlineUsers: PropTypes.func,
    onDMSelect: PropTypes.func,
    handleViewProfile: PropTypes.func,
    handleInviteToServer: PropTypes.func,
    handlePinConversation: PropTypes.func,
    handleMuteUser: PropTypes.func,
    handleHideDM: PropTypes.func,
    handleClearDM: PropTypes.func,
    handleBlockUser: PropTypes.func,
    setInviteToServerModal: PropTypes.func,
    handleSendServerInvite: PropTypes.func,
    setShowChannelSettings: PropTypes.func,
    selectedRoom: PropTypes.bool,
    setSelectedRoom: PropTypes.func,
};
export default React.memo(RoomListModals);
