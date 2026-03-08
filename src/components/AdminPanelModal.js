// frontend/src/components/AdminPanelModal.js
// Thin orchestrator - state & API logic in useAdminAPI hook
import { FaTimes, FaCrown, FaChartLine, FaUsers, FaServer, FaUserShield, FaBook, FaDatabase, FaTools, FaCog, FaPaperPlane, FaSync, FaBitcoin, FaFingerprint } from 'react-icons/fa';
import { MdStorage, MdSecurity } from 'react-icons/md';
import styles from './AdminPanelModal/styles';
import './AdminPanelModal.css';
import useAdminAPI from './AdminPanelModal/hooks/useAdminAPI';
import useModalA11y from '../hooks/useModalA11y';

import {
    DashboardTab, UsersTab, ServersTab, LogsTab, ModerationTab,
    DatabaseTab, SystemHealthTab, SecurityTab, BroadcastTab, ToolsTab, QuickActionsTab,
    WhitelistTab, CryptoSignalsTab, VisitorLogsTab,
} from './AdminPanelModal/tabs';

import {
    UserDetailModal, ActionConfirmationModal, PasswordResetModal,
    BroadcastModal, EditUserModal, ServerDetailModal, DeleteConfirmModal,
} from './AdminPanelModal/modals';

const MENU_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaChartLine size={14} /> },
    { id: 'users', label: 'Kullanıcılar', icon: <FaUsers size={14} /> },
    { id: 'servers', label: 'Sunucular', icon: <FaServer size={14} /> },
    { id: 'moderation', label: 'Moderasyon', icon: <FaUserShield size={14} /> },
    { id: 'logs', label: 'Loglar', icon: <FaBook size={14} /> },
    { id: 'database', label: 'Veritabanı', icon: <FaDatabase size={14} /> },
    { id: 'system', label: 'Sistem', icon: <MdStorage size={14} /> },
    { id: 'security', label: 'Güvenlik', icon: <MdSecurity size={14} /> },
    { id: 'broadcast', label: 'Duyuru', icon: <FaPaperPlane size={14} /> },
    { id: 'tools', label: 'Araçlar', icon: <FaTools size={14} /> },
    { id: 'quickActions', label: 'Hızlı İşlem', icon: <FaCog size={14} /> },
    { id: 'whitelist', label: 'Whitelist', icon: <FaCrown size={14} /> },
    { id: 'cryptoSignals', label: 'Kripto Sinyaller', icon: <FaBitcoin size={14} /> },
    { id: 'visitorLogs', label: 'Ziyaretçi Logları', icon: <FaFingerprint size={14} /> }
];

const AdminPanelModal = ({
    onClose, onOpenAnalytics, onOpenWebhooks, onOpenModTools,
    onOpenAuditLogs, onOpenReports, onOpenVanityURL, onOpenAutoResponder,
    fetchWithAuth, apiBaseUrl
}) => {
    const api = useAdminAPI({ fetchWithAuth, apiBaseUrl, onClose });

    const renderContent = () => {
        switch (api.activeTab) {
            case 'dashboard':
                return <DashboardTab detailedStats={api.detailedStats} fetchDetailedStats={api.fetchDetailedStats}
                    fetchLiveActivity={api.fetchLiveActivity} fetchSecurityAlerts={api.fetchSecurityAlerts}
                    liveActivities={api.liveActivities} securityAlerts={api.securityAlerts}
                    servers={api.servers} setBroadcastModal={api.setBroadcastModal} stats={api.stats} users={api.users} />;
            case 'users':
                return <UsersTab currentPage={api.currentPage} fetchUsers={api.fetchUsers} filterStatus={api.filterStatus}
                    handleUserAction={api.handleUserAction} openEditUserModal={api.openEditUserModal}
                    searchQuery={api.searchQuery} setActionModal={api.setActionModal} setCurrentPage={api.setCurrentPage}
                    setFilterStatus={api.setFilterStatus} setPasswordResetModal={api.setPasswordResetModal}
                    setSearchQuery={api.setSearchQuery} setSelectedUser={api.setSelectedUser}
                    setSortField={api.setSortField} sortField={api.sortField} totalPages={api.totalPages} users={api.users} />;
            case 'servers':
                return <ServersTab handleServerDetails={api.handleServerDetails} servers={api.servers} setDeleteConfirm={api.setDeleteConfirm} />;
            case 'logs':
                return <LogsTab fetchSystemLogs={api.fetchSystemLogs} fetchUserActivity={api.fetchUserActivity}
                    handleExportLogs={api.handleExportLogs} logDateFrom={api.logDateFrom} logDateTo={api.logDateTo}
                    logLoading={api.logLoading} logSearch={api.logSearch} logSeverity={api.logSeverity}
                    logStats={api.logStats} logType={api.logType} logs={api.logs}
                    setLogDateFrom={api.setLogDateFrom} setLogDateTo={api.setLogDateTo}
                    setLogSearch={api.setLogSearch} setLogSeverity={api.setLogSeverity}
                    setLogType={api.setLogType} setUserActivityModal={api.setUserActivityModal}
                    systemLogs={api.systemLogs} userActivityModal={api.userActivityModal} />;
            case 'moderation':
                return <ModerationTab bannedUsers={api.bannedUsers} handleUserAction={api.handleUserAction}
                    onOpenAuditLogs={onOpenAuditLogs} onOpenModTools={onOpenModTools} onOpenReports={onOpenReports} />;
            case 'database':
                return <DatabaseTab backupStatus={api.backupStatus} dbStats={api.dbStats}
                    handleBackup={api.handleBackup} handleClearCache={api.handleClearCache} handleDeleteOldLogs={api.handleDeleteOldLogs} />;
            case 'system': return <SystemHealthTab systemHealth={api.systemHealth} />;
            case 'security': return <SecurityTab maintenanceMode={api.maintenanceMode} toggleMaintenance={api.toggleMaintenance} />;
            case 'broadcast':
                return <BroadcastTab announceText={api.announceText} handleBroadcast={api.handleBroadcast} setAnnounceText={api.setAnnounceText} />;
            case 'tools': return <ToolsTab handleBackup={api.handleBackup} handleClearCache={api.handleClearCache} />;
            case 'quickActions':
                return <QuickActionsTab onClose={onClose} onOpenAnalytics={onOpenAnalytics}
                    onOpenAutoResponder={onOpenAutoResponder} onOpenVanityURL={onOpenVanityURL} onOpenWebhooks={onOpenWebhooks} />;
            case 'whitelist':
                return <WhitelistTab fetchWithAuth={fetchWithAuth} apiBaseUrl={apiBaseUrl} />;
            case 'cryptoSignals':
                return <CryptoSignalsTab fetchWithAuth={fetchWithAuth} apiBaseUrl={apiBaseUrl} />;
            case 'visitorLogs':
                return <VisitorLogsTab
                    visitorLogs={api.visitorLogs}
                    fetchVisitorLogs={api.fetchVisitorLogs}
                    visitorIpFilter={api.visitorIpFilter} setVisitorIpFilter={api.setVisitorIpFilter}
                    visitorUsernameFilter={api.visitorUsernameFilter} setVisitorUsernameFilter={api.setVisitorUsernameFilter}
                    visitorPathFilter={api.visitorPathFilter} setVisitorPathFilter={api.setVisitorPathFilter}
                    visitorPage={api.visitorPage} setVisitorPage={api.setVisitorPage}
                    visitorLoading={api.visitorLoading} />;
            default:
                return <DashboardTab detailedStats={api.detailedStats} fetchDetailedStats={api.fetchDetailedStats}
                    fetchLiveActivity={api.fetchLiveActivity} fetchSecurityAlerts={api.fetchSecurityAlerts}
                    liveActivities={api.liveActivities} securityAlerts={api.securityAlerts}
                    servers={api.servers} setBroadcastModal={api.setBroadcastModal} stats={api.stats} users={api.users} />;
        }
    };

    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Yönetici Paneli' });

    return (
        <div style={styles.overlay} className="admin-panel-overlay" {...overlayProps}>
            <div style={styles.modal} className="admin-panel-modal" {...dialogProps}>
                <div style={styles.header} className="admin-panel-header">
                    <div style={styles.headerLeft}>
                        <FaCrown size={20} color="#ffd700" />
                        <h2 style={styles.title} className="admin-panel-title">👑 Admin Panel</h2>
                        <span style={styles.badge('#23a559')} className="admin-panel-badge">v2.0</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: '#6b7280', fontSize: '11px' }} className="admin-panel-online-info">🟢 {api.realtimeStats.online} Online</span>
                        <button onClick={onClose} style={styles.closeButton}><FaTimes /></button>
                    </div>
                </div>

                <div style={styles.body} className="admin-panel-body">
                    <div style={styles.sidebar} className="admin-panel-sidebar">
                        {MENU_ITEMS.map(item => (
                            <button key={item.id} onClick={() => api.setActiveTab(item.id)}
                                className="admin-panel-sidebar-btn"
                                style={styles.sidebarButton(api.activeTab === item.id)}>
                                {item.icon}<span>{item.label}</span>
                            </button>
                        ))}
                    </div>

                    <div style={styles.content} className="admin-panel-content">
                        {api.loading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <FaSync className="spin" size={24} color="#5865f2" />
                            </div>
                        ) : renderContent()}
                    </div>
                </div>

                {api.selectedUser && <UserDetailModal handleUserAction={api.handleUserAction}
                    openEditUserModal={api.openEditUserModal} selectedUser={api.selectedUser}
                    setActionModal={api.setActionModal} setPasswordResetModal={api.setPasswordResetModal}
                    setSelectedUser={api.setSelectedUser} />}

                {api.actionModal && <ActionConfirmationModal actionModal={api.actionModal}
                    handleUserAction={api.handleUserAction} setActionModal={api.setActionModal}
                    setSelectedUser={api.setSelectedUser} />}

                {api.passwordResetModal && <PasswordResetModal handleUserAction={api.handleUserAction}
                    newPassword={api.newPassword} passwordResetModal={api.passwordResetModal}
                    setNewPassword={api.setNewPassword} setPasswordResetModal={api.setPasswordResetModal} />}

                {api.broadcastModal && <BroadcastModal announceText={api.announceText}
                    handleBroadcast={api.handleBroadcast} setAnnounceText={api.setAnnounceText}
                    setBroadcastModal={api.setBroadcastModal} />}

                {api.editUserModal && <EditUserModal editUserForm={api.editUserForm}
                    editUserLoading={api.editUserLoading} editUserModal={api.editUserModal}
                    handleUpdateUser={api.handleUpdateUser} setEditUserForm={api.setEditUserForm}
                    setEditUserModal={api.setEditUserModal} />}

                {api.selectedServer && <ServerDetailModal selectedServer={api.selectedServer}
                    setSelectedServer={api.setSelectedServer} />}

                {api.deleteConfirm && <DeleteConfirmModal deleteConfirm={api.deleteConfirm}
                    handleServerDelete={api.handleServerDelete} setDeleteConfirm={api.setDeleteConfirm} />}
            </div>
        </div>
    );
};

export default AdminPanelModal;