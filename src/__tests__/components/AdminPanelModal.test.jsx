import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock the hook
const mockApi = {
    activeTab: 'dashboard', setActiveTab: vi.fn(),
    loading: false,
    stats: {}, detailedStats: {}, liveActivities: [], securityAlerts: [],
    users: [], servers: [], logs: [], systemHealth: {},
    bannedUsers: [], dbStats: {}, realtimeStats: { online: 5, messages: 10, voice: 2 },
    systemLogs: [], logStats: null,
    searchQuery: '', setSearchQuery: vi.fn(),
    currentPage: 1, setCurrentPage: vi.fn(), totalPages: 1,
    sortField: 'created', setSortField: vi.fn(),
    sortOrder: 'desc', setSortOrder: vi.fn(),
    filterStatus: 'all', setFilterStatus: vi.fn(),
    logType: 'all', setLogType: vi.fn(),
    logSearch: '', setLogSearch: vi.fn(),
    logSeverity: '', setLogSeverity: vi.fn(),
    logDateFrom: '', setLogDateFrom: vi.fn(),
    logDateTo: '', setLogDateTo: vi.fn(),
    logLoading: false,
    userActivityModal: null, setUserActivityModal: vi.fn(),
    selectedUser: null, setSelectedUser: vi.fn(),
    actionModal: null, setActionModal: vi.fn(),
    editUserModal: null, setEditUserModal: vi.fn(),
    editUserForm: {}, setEditUserForm: vi.fn(),
    editUserLoading: false,
    selectedServer: null, setSelectedServer: vi.fn(),
    deleteConfirm: null, setDeleteConfirm: vi.fn(),
    broadcastModal: false, setBroadcastModal: vi.fn(),
    passwordResetModal: null, setPasswordResetModal: vi.fn(),
    newPassword: '', setNewPassword: vi.fn(),
    backupStatus: null, maintenanceMode: false,
    announceText: '', setAnnounceText: vi.fn(),
    fetchUsers: vi.fn(), fetchServers: vi.fn(), fetchDetailedStats: vi.fn(),
    fetchLiveActivity: vi.fn(), fetchSecurityAlerts: vi.fn(), fetchSystemLogs: vi.fn(),
    handleUserAction: vi.fn(), handleBroadcast: vi.fn(), handleBackup: vi.fn(),
    handleClearCache: vi.fn(), toggleMaintenance: vi.fn(),
    openEditUserModal: vi.fn(), handleUpdateUser: vi.fn(),
    handleServerDetails: vi.fn(), handleServerDelete: vi.fn(),
    handleDeleteOldLogs: vi.fn(), handleExportLogs: vi.fn(),
    fetchUserActivity: vi.fn(),
};

vi.mock('../../components/AdminPanelModal/hooks/useAdminAPI', () => ({
    default: () => mockApi
}));

// Mock tab components
vi.mock('../../components/AdminPanelModal/tabs', () => ({
    DashboardTab: () => <div data-testid="dashboard-tab" />,
    UsersTab: () => <div data-testid="users-tab" />,
    ServersTab: () => <div data-testid="servers-tab" />,
    LogsTab: () => <div data-testid="logs-tab" />,
    ModerationTab: () => <div data-testid="moderation-tab" />,
    DatabaseTab: () => <div data-testid="database-tab" />,
    SystemHealthTab: () => <div data-testid="system-tab" />,
    SecurityTab: () => <div data-testid="security-tab" />,
    BroadcastTab: () => <div data-testid="broadcast-tab" />,
    ToolsTab: () => <div data-testid="tools-tab" />,
    QuickActionsTab: () => <div data-testid="quick-actions-tab" />,
}));

// Mock modal components
vi.mock('../../components/AdminPanelModal/modals', () => ({
    UserDetailModal: () => <div data-testid="user-detail-modal" />,
    ActionConfirmationModal: () => <div data-testid="action-modal" />,
    PasswordResetModal: () => <div data-testid="password-reset-modal" />,
    BroadcastModal: () => <div data-testid="broadcast-modal" />,
    EditUserModal: () => <div data-testid="edit-user-modal" />,
    ServerDetailModal: () => <div data-testid="server-detail-modal" />,
    DeleteConfirmModal: () => <div data-testid="delete-confirm-modal" />,
}));

vi.mock('../../components/AdminPanelModal/styles', () => ({
    default: {
        overlay: {}, modal: {}, header: {}, headerLeft: {},
        title: {}, closeButton: {}, body: {}, sidebar: {},
        sidebarButton: () => ({}), content: {}, badge: () => ({})
    }
}));

import AdminPanelModal from '../../components/AdminPanelModal';

describe('AdminPanelModal Orchestrator', () => {
    const defaultProps = {
        onClose: vi.fn(),
        onOpenAnalytics: vi.fn(),
        onOpenWebhooks: vi.fn(),
        onOpenModTools: vi.fn(),
        onOpenAuditLogs: vi.fn(),
        onOpenReports: vi.fn(),
        onOpenVanityURL: vi.fn(),
        onOpenAutoResponder: vi.fn(),
        fetchWithAuth: vi.fn(),
        apiBaseUrl: 'http://localhost'
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockApi.activeTab = 'dashboard';
        mockApi.selectedUser = null;
        mockApi.actionModal = null;
        mockApi.broadcastModal = false;
        mockApi.editUserModal = null;
        mockApi.selectedServer = null;
        mockApi.deleteConfirm = null;
        mockApi.passwordResetModal = null;
    });

    it('should render dashboard tab by default', () => {
        render(<AdminPanelModal {...defaultProps} />);
        expect(screen.getByTestId('dashboard-tab')).toBeInTheDocument();
    });

    it('should render header with title', () => {
        render(<AdminPanelModal {...defaultProps} />);
        expect(screen.getByText(/Admin Panel/)).toBeInTheDocument();
    });

    it('should display online count from realtimeStats', () => {
        render(<AdminPanelModal {...defaultProps} />);
        expect(screen.getByText(/5 Online/)).toBeInTheDocument();
    });

    it('should render all 11 sidebar menu items', () => {
        render(<AdminPanelModal {...defaultProps} />);
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Kullanıcılar')).toBeInTheDocument();
        expect(screen.getByText('Sunucular')).toBeInTheDocument();
        expect(screen.getByText('Moderasyon')).toBeInTheDocument();
        expect(screen.getByText('Loglar')).toBeInTheDocument();
        expect(screen.getByText('Veritabanı')).toBeInTheDocument();
        expect(screen.getByText('Sistem')).toBeInTheDocument();
        expect(screen.getByText('Güvenlik')).toBeInTheDocument();
        expect(screen.getByText('Duyuru')).toBeInTheDocument();
        expect(screen.getByText('Araçlar')).toBeInTheDocument();
        expect(screen.getByText('Hızlı İşlem')).toBeInTheDocument();
    });

    it('should switch tabs when sidebar button clicked', () => {
        render(<AdminPanelModal {...defaultProps} />);
        fireEvent.click(screen.getByText('Kullanıcılar'));
        expect(mockApi.setActiveTab).toHaveBeenCalledWith('users');
    });

    it('should call onClose when close button clicked', () => {
        render(<AdminPanelModal {...defaultProps} />);
        const buttons = document.querySelectorAll('button');
        const closeBtn = Array.from(buttons).find(b => b.querySelector('svg') && !b.textContent.trim());
        if (closeBtn) {
            fireEvent.click(closeBtn);
            expect(defaultProps.onClose).toHaveBeenCalled();
        }
    });

    it('should not render modals when their state is null/false', () => {
        render(<AdminPanelModal {...defaultProps} />);
        expect(screen.queryByTestId('user-detail-modal')).not.toBeInTheDocument();
        expect(screen.queryByTestId('action-modal')).not.toBeInTheDocument();
        expect(screen.queryByTestId('broadcast-modal')).not.toBeInTheDocument();
        expect(screen.queryByTestId('edit-user-modal')).not.toBeInTheDocument();
        expect(screen.queryByTestId('server-detail-modal')).not.toBeInTheDocument();
        expect(screen.queryByTestId('delete-confirm-modal')).not.toBeInTheDocument();
    });
});
