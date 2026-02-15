// frontend/src/RoomList/RoomListModals.js
import React from 'react';
import { createPortal } from 'react-dom';
import InviteModal from '../components/InviteModal';
import SavedMessagesModal from '../components/SavedMessagesModal';
import ScheduledMessageModal from '../components/ScheduledMessageModal';
import WebhookManager from '../components/WebhookManager';
import ModeratorTools from '../components/ModeratorTools';
import QuickActionsMenu from '../components/QuickActionsMenu';
import AuditLogViewer from '../components/AuditLogViewer';
import ReportsViewer from '../components/ReportsViewer';
import VanityURLManager from '../components/VanityURLManager';
import AutoResponderManager from '../components/AutoResponderManager';
import ServerContextMenu from '../components/ServerContextMenu';
import ChannelSettingsModal from '../components/ChannelSettingsModal';
import ConfirmModal from '../components/ConfirmModal';
import DiscoveryModal from './DiscoveryModal';
import InviteToServerModal from './InviteToServerModal';
import toast from '../utils/toast';

const RoomListModals = ({
    // Discovery
    showDiscovery, setShowDiscovery, publicServers, handleJoinServer, handleJoinViaCode,
    // Invite
    showInviteModal, setShowInviteModal, inviteModalServer, setInviteModalServer,
    fetchWithAuth, apiUrl, apiBaseUrl, currentUsername,
    // Saved messages
    showSavedMessages, setShowSavedMessages,
    // Scheduled messages
    showScheduledMessages, setShowScheduledMessages, actualCurrentRoom, currentConversationId,
    // Webhooks
    showWebhooks, setShowWebhooks, selectedServerId,
    // Mod tools
    showModTools, setShowModTools,
    // Quick actions
    showQuickActions, setShowQuickActions, setShowAuditLogs, setShowReports,
    setShowVanityURL, setShowAutoResponder,
    // Audit logs
    showAuditLogs,
    // Reports
    showReports,
    // Vanity URL
    showVanityURL,
    // Auto Responder
    showAutoResponder,
    // Server Context Menu
    serverContextMenu, setServerContextMenu,
    handleLeaveServer, onOpenServerSettings, handleMoveServer,
    handleCopyServerInvite, handleChangeServerIcon, handleChangeServerPrivacy,
    mutedServers, setMutedServers, servers,
    deleteServerModal, setDeleteServerModal,
    leaveServerModal, setLeaveServerModal, executeLeaveServer,
    setSelectedServerId, onWelcomeClick,
    // DM Context Menu
    dmContextMenu, setDmContextMenu, getAvatarUrl, onlineUsers, onDMSelect,
    handleViewProfile, handleInviteToServer, handlePinConversation,
    handleMuteUser, handleHideDM, handleClearDM, handleBlockUser,
    // Invite to server
    inviteToServerModal, setInviteToServerModal, handleSendServerInvite,
    // Channel Settings
    showChannelSettings, setShowChannelSettings, selectedRoom, setSelectedRoom
}) => {
    return (
        <>
            {/* Keşfet */}
            <DiscoveryModal isOpen={showDiscovery} onClose={() => setShowDiscovery(false)}
                publicServers={publicServers} onJoinServer={handleJoinServer} onJoinViaCode={handleJoinViaCode} />

            {/* Davet Modal */}
            {showInviteModal && inviteModalServer && (
                <InviteModal
                    onClose={() => { setShowInviteModal(false); setInviteModalServer(null); }}
                    server={inviteModalServer} fetchWithAuth={fetchWithAuth}
                    apiBaseUrl={apiUrl} currentUser={currentUsername}
                />
            )}

            {/* Saved Messages */}
            {showSavedMessages && createPortal(
                <SavedMessagesModal type={showSavedMessages} onClose={() => setShowSavedMessages(null)}
                    fetchWithAuth={fetchWithAuth} apiBaseUrl={apiBaseUrl} />, document.body
            )}

            {/* Scheduled Messages */}
            {showScheduledMessages && createPortal(
                <ScheduledMessageModal room={actualCurrentRoom} conversation={currentConversationId}
                    onClose={() => setShowScheduledMessages(false)} fetchWithAuth={fetchWithAuth}
                    apiBaseUrl={apiBaseUrl} />, document.body
            )}

            {/* Webhooks */}
            {showWebhooks && createPortal(
                <WebhookManager serverId={selectedServerId} onClose={() => setShowWebhooks(false)}
                    fetchWithAuth={fetchWithAuth} apiBaseUrl={apiBaseUrl} />, document.body
            )}

            {/* Mod Tools */}
            {showModTools && createPortal(
                <ModeratorTools serverId={selectedServerId} onClose={() => setShowModTools(false)}
                    fetchWithAuth={fetchWithAuth} apiBaseUrl={apiBaseUrl} />, document.body
            )}

            {/* Quick Actions */}
            {showQuickActions && createPortal(
                <QuickActionsMenu onClose={() => setShowQuickActions(false)}
                    onOpenWebhooks={() => { setShowQuickActions(false); setShowWebhooks(true); }}
                    onOpenAuditLogs={() => { setShowQuickActions(false); setShowAuditLogs(true); }}
                    onOpenReports={() => { setShowQuickActions(false); setShowReports(true); }}
                    onOpenVanityURL={() => { setShowQuickActions(false); setShowVanityURL(true); }}
                    onOpenAutoResponder={() => { setShowQuickActions(false); setShowAutoResponder(true); }}
                />, document.body
            )}

            {/* Audit Logs */}
            {showAuditLogs && createPortal(
                <AuditLogViewer serverId={selectedServerId} onClose={() => setShowAuditLogs(false)}
                    fetchWithAuth={fetchWithAuth} apiBaseUrl={apiBaseUrl} />, document.body
            )}

            {/* Reports */}
            {showReports && createPortal(
                <ReportsViewer serverId={selectedServerId} onClose={() => setShowReports(false)}
                    fetchWithAuth={fetchWithAuth} apiBaseUrl={apiBaseUrl} />, document.body
            )}

            {/* Vanity URL */}
            {showVanityURL && createPortal(
                <VanityURLManager serverId={selectedServerId} onClose={() => setShowVanityURL(false)}
                    fetchWithAuth={fetchWithAuth} apiBaseUrl={apiBaseUrl} />, document.body
            )}

            {/* Auto Responder */}
            {showAutoResponder && createPortal(
                <AutoResponderManager serverId={selectedServerId} onClose={() => setShowAutoResponder(false)}
                    fetchWithAuth={fetchWithAuth} apiBaseUrl={apiBaseUrl} />, document.body
            )}

            {/* Server Context Menu */}
            {serverContextMenu && createPortal(
                <ServerContextMenu
                    x={serverContextMenu.x} y={serverContextMenu.y}
                    server={serverContextMenu.server} isOwner={serverContextMenu.isOwner}
                    onClose={() => setServerContextMenu(null)}
                    onLeaveServer={() => handleLeaveServer(serverContextMenu.server.id)}
                    onServerSettings={() => { onOpenServerSettings(serverContextMenu.server); setServerContextMenu(null); }}
                    onMuteServer={() => {
                        const serverId = serverContextMenu.server.id;
                        setMutedServers(prev => { const u = [...prev, serverId]; localStorage.setItem('mutedServers', JSON.stringify(u)); return u; });
                        setServerContextMenu(null);
                    }}
                    onUnmuteServer={() => {
                        const serverId = serverContextMenu.server.id;
                        setMutedServers(prev => { const u = prev.filter(id => id !== serverId); localStorage.setItem('mutedServers', JSON.stringify(u)); return u; });
                        setServerContextMenu(null);
                    }}
                    onMoveUp={() => handleMoveServer(serverContextMenu.server.id, 'up')}
                    onMoveDown={() => handleMoveServer(serverContextMenu.server.id, 'down')}
                    onCopyInvite={() => handleCopyServerInvite(serverContextMenu.server.id)}
                    onChangeIcon={() => { handleChangeServerIcon(serverContextMenu.server.id); setServerContextMenu(null); }}
                    onChangePrivacy={() => { handleChangeServerPrivacy(serverContextMenu.server.id); setServerContextMenu(null); }}
                    onDeleteServer={() => {
                        setDeleteServerModal({ server: serverContextMenu.server, isOpen: true });
                        setServerContextMenu(null);
                    }}
                    canMoveUp={servers && servers.findIndex(s => s.id === serverContextMenu.server.id) > 0}
                    canMoveDown={servers && servers.findIndex(s => s.id === serverContextMenu.server.id) < servers.length - 1}
                    isMuted={mutedServers.includes(serverContextMenu.server.id)}
                />, document.body
            )}

            {/* DM Context Menu */}
            {dmContextMenu && <DMContextMenuPortal
                dmContextMenu={dmContextMenu} currentUsername={currentUsername}
                getAvatarUrl={getAvatarUrl} onlineUsers={onlineUsers} onDMSelect={onDMSelect}
                setDmContextMenu={setDmContextMenu}
                handleViewProfile={handleViewProfile} handleInviteToServer={handleInviteToServer}
                handlePinConversation={handlePinConversation} handleMuteUser={handleMuteUser}
                handleHideDM={handleHideDM} handleClearDM={handleClearDM} handleBlockUser={handleBlockUser}
            />}

            {/* Delete Server Confirm */}
            {deleteServerModal?.isOpen && (
                <ConfirmModal
                    isOpen={deleteServerModal.isOpen}
                    onClose={() => setDeleteServerModal(null)}
                    onConfirm={async () => {
                        const serverId = deleteServerModal.server.id;
                        const serverName = deleteServerModal.server.name;
                        try {
                            const response = await fetchWithAuth(`${apiUrl}/servers/${serverId}/delete/`, { method: 'DELETE' });
                            if (response.ok) {
                                toast.success(`"${serverName}" sunucusu başarıyla silindi!`, 5000);
                                setSelectedServerId('home'); onWelcomeClick();
                            } else {
                                const error = await response.json();
                                toast.error(`Hata: ${error.error || 'Sunucu silinirken bir hata oluştu'}`);
                            }
                        } catch (error) {
                            toast.error('Sunucu silinirken bir hata oluştu. Lütfen tekrar deneyin.');
                        }
                    }}
                    title="⚠️ Sunucuyu Sil"
                    message={`"${deleteServerModal.server.name}" sunucusunu KALİCİ OLARAK silmek üzeresiniz!`}
                    confirmText="Sunucuyu Sil" cancelText="İptal" type="danger"
                    requireTextConfirmation={true} confirmationText={deleteServerModal.server.name}
                    inputPlaceholder={`Onaylamak için "${deleteServerModal.server.name}" yazın...`}
                    dangerDetails={['Sunucudaki TÜM kanallar silinecek', 'Sunucudaki TÜM mesajlar silinecek', 'TÜM üyeler atılacak', 'Tüm roller ve ayarlar silinecek']}
                />
            )}

            {/* Leave Server Confirm */}
            {leaveServerModal?.isOpen && (
                <ConfirmModal
                    isOpen={leaveServerModal.isOpen}
                    onClose={() => setLeaveServerModal(null)}
                    onConfirm={async () => { await executeLeaveServer(leaveServerModal.server.id); }}
                    title="🚪 Sunucudan Ayrıl"
                    message={`"${leaveServerModal.server.name}" sunucusundan ayrılmak istediğinize emin misiniz?`}
                    confirmText="Ayrıl" cancelText="Vazgeç" type="warning"
                    dangerDetails={['Sunucudaki mesajlarınız silinmeyecek', 'Tekrar katılmak için davet almanız gerekecek', 'Sunucuyla ilgili tüm bildirimler duracak']}
                />
            )}

            {/* Invite to Server */}
            <InviteToServerModal inviteToServerModal={inviteToServerModal} servers={servers}
                onSendInvite={handleSendServerInvite} onClose={() => setInviteToServerModal(null)} />

            {/* Channel Settings */}
            {showChannelSettings && selectedRoom && (() => {
                const currentServer = servers?.find(s => s.id === selectedRoom.server_id);
                const serverRoles = currentServer?.roles || [];
                return (
                    <ChannelSettingsModal
                        room={selectedRoom} serverId={selectedRoom.server_id || selectedServerId}
                        serverRoles={serverRoles}
                        onClose={() => { setShowChannelSettings(false); setSelectedRoom(null); }}
                        onUpdate={() => { setShowChannelSettings(false); setSelectedRoom(null); }}
                        fetchWithAuth={fetchWithAuth} apiBaseUrl={apiBaseUrl}
                    />
                );
            })()}
        </>
    );
};

// DM Context Menu - extracted to reduce nesting
const DMContextMenuPortal = ({
    dmContextMenu, currentUsername, getAvatarUrl, onlineUsers, onDMSelect,
    setDmContextMenu, handleViewProfile, handleInviteToServer,
    handlePinConversation, handleMuteUser, handleHideDM, handleClearDM, handleBlockUser
}) => {
    const otherUser = dmContextMenu.conversation.participants.find(p => p.username !== currentUsername);
    if (!otherUser) return null;

    const menuItems = [
        { icon: '👤', label: 'Profili Görüntüle', color: '#dbdee1', onClick: () => handleViewProfile(otherUser.username) },
        {
            icon: '💬', label: 'Mesaj Gönder', color: '#dbdee1', divider: true,
            onClick: () => { onDMSelect(dmContextMenu.conversation.id, otherUser.username); setDmContextMenu(null); }
        },
        { icon: '🎫', label: 'Sunucuya Davet Et', color: '#5865f2', onClick: () => handleInviteToServer(otherUser.username) },
        { icon: '📌', label: 'Konuşmayı Sabitle', color: '#dbdee1', divider: true, onClick: () => handlePinConversation(dmContextMenu.conversation.id) },
        { icon: '🔇', label: 'Sessize Al', color: '#b9bbbe', onClick: () => handleMuteUser(otherUser.username, dmContextMenu.conversation.id) },
        { icon: '👁️‍🗨️', label: 'Konuşmayı Gizle', color: '#b9bbbe', divider: true, onClick: () => handleHideDM(dmContextMenu.conversation.id) },
        { icon: '🗑️', label: 'Konuşmayı Temizle', color: '#f23f42', onClick: () => handleClearDM(dmContextMenu.conversation.id) },
        { icon: '🚫', label: 'Kullanıcıyı Engelle', color: '#ed4245', onClick: () => handleBlockUser(otherUser.username) }
    ];

    return createPortal(
        <div onClick={(e) => e.stopPropagation()} style={{
            position: 'fixed', top: dmContextMenu.y, left: dmContextMenu.x,
            backgroundColor: '#111214', border: '1px solid #2b2d31', borderRadius: '8px',
            minWidth: '220px', boxShadow: '0 8px 24px rgba(0,0,0,0.4), 0 0 1px rgba(0,0,0,0.5)',
            zIndex: 999999, overflow: 'hidden', animation: 'contextMenuSlide 0.1s ease-out'
        }}>
            {/* User Header */}
            <div style={{ padding: '12px', backgroundColor: '#1e1f22', borderBottom: '1px solid #2b2d31', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src={getAvatarUrl(otherUser.avatar, otherUser.username)}
                    style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} alt="" />
                <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ color: '#f2f3f5', fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {otherUser.username}
                    </div>
                    <div style={{ color: '#b9bbbe', fontSize: '12px', marginTop: '2px' }}>
                        {onlineUsers.includes(otherUser.username) ? '🟢 Çevrimiçi' : '⚫ Çevrimdışı'}
                    </div>
                </div>
            </div>

            {/* Menu Items */}
            {menuItems.map((item, index) => (
                <React.Fragment key={index}>
                    <div onClick={item.onClick} style={{
                        padding: '10px 12px', cursor: 'pointer', color: item.color,
                        fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center',
                        gap: '10px', transition: 'all 0.1s ease', backgroundColor: 'transparent'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = item.color === '#f23f42' || item.color === '#ed4245'
                                ? 'rgba(237, 66, 69, 0.15)' : 'rgba(88, 101, 242, 0.1)';
                            e.currentTarget.style.paddingLeft = '16px';
                        }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.paddingLeft = '12px'; }}
                    >
                        <span style={{ fontSize: '16px', width: '20px', textAlign: 'center' }}>{item.icon}</span>
                        <span style={{ flex: 1 }}>{item.label}</span>
                    </div>
                    {item.divider && <div style={{ height: '1px', backgroundColor: '#2b2d31', margin: '4px 8px' }} />}
                </React.Fragment>
            ))}
        </div>,
        document.body
    );
};

export default React.memo(RoomListModals);
