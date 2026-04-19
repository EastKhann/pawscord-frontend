// frontend/src/components/AdminPanelModal.js
// Thin orchestrator - state & API logic in useAdminAPI hook
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
    FaTimes,
    FaCrown,
    FaChartLine,
    FaUsers,
    FaServer,
    FaUserShield,
    FaBook,
    FaDatabase,
    FaTools,
    FaCog,
    FaPaperPlane,
    FaSync,
    FaBitcoin,
    FaFingerprint,
} from 'react-icons/fa';
import { MdStorage, MdSecurity } from 'react-icons/md';
import styles from '../AdminPanelModal/styles';
import './AdminPanelModal.css';
import useAdminAPI from '../AdminPanelModal/hooks/useAdminAPI';
import { AdminAPIProvider } from '../AdminPanelModal/AdminAPIContext';
import useModalA11y from '../../hooks/useModalA11y';

import {
    DashboardTab,
    UsersTab,
    ServersTab,
    LogsTab,
    ModerationTab,
    DatabaseTab,
    SystemHealthTab,
    SecurityTab,
    BroadcastTab,
    ToolsTab,
    QuickActionsTab,
    WhitelistTab,
    CryptoSignalsTab,
    VisitorLogsTab,
    FeatureWhitelistTab,
} from '../AdminPanelModal/tabs';

import {
    UserDetailModal,
    ActionConfirmationModal,
    PasswordResetModal,
    BroadcastModal,
    EditUserModal,
    ServerDetailModal,
    DeleteConfirmModal,
} from '../AdminPanelModal/modals';

const S = {
    flex: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' },
    txt: { color: '#6b7280', fontSize: '11px' },
};

const MENU_ITEMS = [
    {
        id: 'dashboard',
        labelKey: 'admin.panel.dashboard',
        label: 'Dashboard',
        icon: <FaChartLine size={14} />,
    },
    { id: 'users', labelKey: 'admin.panel.users', label: 'Users', icon: <FaUsers size={14} /> },
    {
        id: 'servers',
        labelKey: 'admin.panel.servers',
        label: 'Servers',
        icon: <FaServer size={14} />,
    },
    {
        id: 'moderation',
        labelKey: 'admin.panel.moderation',
        label: 'Moderation',
        icon: <FaUserShield size={14} />,
    },
    { id: 'logs', labelKey: 'admin.panel.Logs', label: 'Logs', icon: <FaBook size={14} /> },
    {
        id: 'database',
        labelKey: 'admin.panel.database',
        label: 'Database',
        icon: <FaDatabase size={14} />,
    },
    {
        id: 'system',
        labelKey: 'admin.panel.systemHealth',
        label: 'System',
        icon: <MdStorage size={14} />,
    },
    {
        id: 'security',
        labelKey: 'admin.panel.security',
        label: 'Security',
        icon: <MdSecurity size={14} />,
    },
    {
        id: 'broadcast',
        labelKey: 'admin.panel.broadcast',
        label: 'Broadcast',
        icon: <FaPaperPlane size={14} />,
    },
    { id: 'tools', labelKey: 'admin.panel.tools', label: 'Tools', icon: <FaTools size={14} /> },
    {
        id: 'quickActions',
        labelKey: 'admin.panel.quickActions',
        label: 'Quick Actions',
        icon: <FaCog size={14} />,
    },
    {
        id: 'whitelist',
        labelKey: 'admin.panel.featureWhitelist',
        label: 'Whitelist',
        icon: <FaCrown size={14} />,
    },
    {
        id: 'featureWhitelist',
        labelKey: 'admin.panel.featureWhitelist',
        label: 'Feature Access',
        icon: <FaFingerprint size={14} />,
    },
    {
        id: 'cryptoSignals',
        labelKey: 'admin.panel.cryptoSignals',
        label: 'Crypto Signals',
        icon: <FaBitcoin size={14} />,
    },
    {
        id: 'visitorLogs',
        labelKey: 'admin.panel.visitorLogs',
        label: 'Visitor Logs',
        icon: <FaFingerprint size={14} />,
    },
];

const AdminPanelModal = ({
    onClose,
    onOpenAnalytics,
    onOpenWebhooks,
    onOpenModTools,
    onOpenAuditLogs,
    onOpenReports,
    onOpenVanityURL,
    onOpenAutoResponder,
    fetchWithAuth,
    apiBaseUrl,
}) => {
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const api = useAdminAPI({ fetchWithAuth, apiBaseUrl, onClose });

    // Extend context with external callbacks so tabs can consume everything via context
    const contextValue = {
        ...api,
        fetchWithAuth,
        apiBaseUrl,
        onClose,
        onOpenAnalytics,
        onOpenWebhooks,
        onOpenModTools,
        onOpenAuditLogs,
        onOpenReports,
        onOpenVanityURL,
        onOpenAutoResponder,
    };

    const renderContent = () => {
        switch (api.activeTab) {
            case 'dashboard':
                return <DashboardTab />;
            case 'users':
                return <UsersTab />;
            case 'servers':
                return <ServersTab />;
            case 'logs':
                return <LogsTab />;
            case 'moderation':
                return <ModerationTab />;
            case 'database':
                return <DatabaseTab />;
            case 'system':
                return <SystemHealthTab />;
            case 'security':
                return <SecurityTab />;
            case 'broadcast':
                return <BroadcastTab />;
            case 'tools':
                return <ToolsTab />;
            case 'quickActions':
                return <QuickActionsTab />;
            case 'whitelist':
                return <WhitelistTab />;
            case 'featureWhitelist':
                return <FeatureWhitelistTab />;
            case 'cryptoSignals':
                return <CryptoSignalsTab />;
            case 'visitorLogs':
                return <VisitorLogsTab />;
            default:
                return <DashboardTab />;
        }
    };

    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Admin Panel' });

    return (
        <AdminAPIProvider value={contextValue}>
            <div style={styles.overlay} className="admin-panel-overlay" {...overlayProps}>
                <div style={styles.modal} className="admin-panel-modal" {...dialogProps}>
                    <div style={styles.header} className="admin-panel-header">
                        <div style={styles.headerLeft}>
                            <FaCrown size={20} color="#ffd700" />
                            <h2 style={styles.title} className="admin-panel-title">
                                👑 {t('admin.adminPanel', 'Yönetici Paneli')}
                            </h2>
                            <span style={styles.badge('#23a559')} className="admin-panel-badge">
                                v2.0
                            </span>
                        </div>
                        <div className="flex-align-10">
                            <span style={S.txt} className="admin-panel-online-info">
                                🟢 {api.realtimeStats.online} {t('common.online', 'Çevrimici')}
                            </span>
                            <button aria-label="Close" onClick={onClose} style={styles.closeButton}>
                                <FaTimes />
                            </button>
                        </div>
                    </div>

                    <div style={styles.body} className="admin-panel-body">
                        <div style={styles.sidebar} className="admin-panel-sidebar">
                            {MENU_ITEMS.map((item) => (
                                <button
                                    aria-label="Switch tab"
                                    key={item.id}
                                    onClick={() => api.setActiveTab(item.id)}
                                    className="admin-panel-sidebar-btn"
                                    style={styles.sidebarButton(api.activeTab === item.id)}
                                >
                                    {item.icon}
                                    <span>{t(item.labelKey, item.label)}</span>
                                </button>
                            ))}
                        </div>

                        <div style={styles.content} className="admin-panel-content">
                            {api.loading ? (
                                <div style={S.flex}>
                                    <FaSync className="spin" size={24} color="#5865f2" />
                                </div>
                            ) : (
                                renderContent()
                            )}
                        </div>
                    </div>

                    {api.selectedUser && (
                        <UserDetailModal
                            handleUserAction={api.handleUserAction}
                            openEditUserModal={api.openEditUserModal}
                            selectedUser={api.selectedUser}
                            setActionModal={api.setActionModal}
                            setPasswordResetModal={api.setPasswordResetModal}
                            setSelectedUser={api.setSelectedUser}
                        />
                    )}
                    {api.actionModal && (
                        <ActionConfirmationModal
                            actionModal={api.actionModal}
                            handleUserAction={api.handleUserAction}
                            setActionModal={api.setActionModal}
                            setSelectedUser={api.setSelectedUser}
                        />
                    )}
                    {api.passwordResetModal && (
                        <PasswordResetModal
                            handleUserAction={api.handleUserAction}
                            newPassword={api.newPassword}
                            passwordResetModal={api.passwordResetModal}
                            setNewPassword={api.setNewPassword}
                            setPasswordResetModal={api.setPasswordResetModal}
                        />
                    )}
                    {api.broadcastModal && (
                        <BroadcastModal
                            announceText={api.announceText}
                            handleBroadcast={api.handleBroadcast}
                            setAnnounceText={api.setAnnounceText}
                            setBroadcastModal={api.setBroadcastModal}
                        />
                    )}
                    {api.editUserModal && (
                        <EditUserModal
                            editUserForm={api.editUserForm}
                            editUserLoading={api.editUserLoading}
                            editUserModal={api.editUserModal}
                            handleUpdateUser={api.handleUpdateUser}
                            setEditUserForm={api.setEditUserForm}
                            setEditUserModal={api.setEditUserModal}
                        />
                    )}
                    {api.selectedServer && (
                        <ServerDetailModal
                            selectedServer={api.selectedServer}
                            setSelectedServer={api.setSelectedServer}
                        />
                    )}
                    {api.deleteConfirm && (
                        <DeleteConfirmModal
                            deleteConfirm={api.deleteConfirm}
                            handleServerDelete={api.handleServerDelete}
                            setDeleteConfirm={api.setDeleteConfirm}
                        />
                    )}
                </div>
            </div>
        </AdminAPIProvider>
    );
};

AdminPanelModal.propTypes = {
    onClose: PropTypes.func,
    onOpenAnalytics: PropTypes.func,
    onOpenWebhooks: PropTypes.func,
    onOpenModTools: PropTypes.func,
    onOpenAuditLogs: PropTypes.func,
    onOpenReports: PropTypes.func,
    onOpenVanityURL: PropTypes.func,
    onOpenAutoResponder: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default AdminPanelModal;
