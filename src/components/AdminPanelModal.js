// frontend/src/components/AdminPanelModal.js
// 🔥 KAPSAMLI ADMİN PANELİ V2.0 - Full Featured
import { useState, useEffect, useCallback, useMemo } from 'react';
import {
    FaTimes, FaCog, FaChartLine, FaUserShield, FaBook, FaRobot,
    FaUsers, FaServer, FaDatabase, FaMemory, FaBan, FaTrash,
    FaEdit, FaEye, FaSearch, FaSync, FaDownload, FaUpload,
    FaExclamationTriangle, FaCheckCircle, FaClock, FaGlobe,
    FaUserPlus, FaComment, FaVolumeUp, FaPlus, FaMinus,
    FaCrown, FaShieldAlt, FaEnvelope, FaKey, FaLock, FaUnlock,
    FaFileExport, FaChartBar, FaChartPie, FaUserCog, FaTools,
    FaCloudUploadAlt, FaCloudDownloadAlt, FaBroom, FaHistory,
    FaWifi, FaMicrophone, FaVideo, FaImage, FaFile, FaDollarSign,
    FaGift, FaStar, FaHeart, FaFlag, FaFilter, FaSortAmountDown,
    FaTerminal, FaCode, FaBug, FaCheckDouble, FaPaperPlane, FaCopy
} from 'react-icons/fa';
import { MdStorage, MdSecurity, MdNotifications, MdDelete, MdRefresh } from 'react-icons/md';
import toast from '../utils/toast';

import styles from './AdminPanelModal/styles';

// Tab components
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
} from './AdminPanelModal/tabs';

// Modal components
import {
    UserDetailModal,
    ActionConfirmationModal,
    PasswordResetModal,
    BroadcastModal,
    EditUserModal,
    ServerDetailModal,
    DeleteConfirmModal,
} from './AdminPanelModal/modals';

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
    apiBaseUrl
}) => {
    // ===== STATE =====
    const [activeTab, setActiveTab] = useState('dashboard');
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState(null);
    const [detailedStats, setDetailedStats] = useState(null);
    const [liveActivities, setLiveActivities] = useState([]);
    const [securityAlerts, setSecurityAlerts] = useState([]);
    const [users, setUsers] = useState([]);
    const [servers, setServers] = useState([]);
    const [logs, setLogs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [actionModal, setActionModal] = useState(null);
    const [systemHealth, setSystemHealth] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortField, setSortField] = useState('created');
    const [sortOrder, setSortOrder] = useState('desc');
    const [filterStatus, setFilterStatus] = useState('all');
    const [announceText, setAnnounceText] = useState('');
    const [bannedUsers, setBannedUsers] = useState([]);
    const [dbStats, setDbStats] = useState(null);
    const [realtimeStats, setRealtimeStats] = useState({ online: 0, messages: 0, voice: 0 });
    const [editUserModal, setEditUserModal] = useState(null);
    const [editUserForm, setEditUserForm] = useState({});
    const [editUserLoading, setEditUserLoading] = useState(false);
    const [selectedServer, setSelectedServer] = useState(null);
    const [serverDetailLoading, setServerDetailLoading] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [broadcastModal, setBroadcastModal] = useState(false);
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [passwordResetModal, setPasswordResetModal] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [backupStatus, setBackupStatus] = useState(null);
    const [selectedTab, setSelectedTab] = useState('overview');

    // ===== API CALLS =====
    const fetchDetailedStats = useCallback(async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/detailed-stats/`);
            if (res.ok) {
                const data = await res.json();
                setDetailedStats(data);
                // Update realtime stats from real data
                setRealtimeStats({
                    online: data.users?.online || 0,
                    messages: data.messages?.last_1h || 0,
                    voice: 0
                });
            }
        } catch (err) {
            console.error('Detailed stats fetch error:', err);
        }
    }, [fetchWithAuth, apiBaseUrl]);

    const fetchLiveActivity = useCallback(async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/live-activity/`);
            if (res.ok) {
                const data = await res.json();
                setLiveActivities(data.activities || []);
            }
        } catch (err) {
            console.error('Live activity fetch error:', err);
        }
    }, [fetchWithAuth, apiBaseUrl]);

    const fetchSecurityAlerts = useCallback(async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/security-alerts/`);
            if (res.ok) {
                const data = await res.json();
                setSecurityAlerts(data.alerts || []);
            }
        } catch (err) {
            console.error('Security alerts fetch error:', err);
        }
    }, [fetchWithAuth, apiBaseUrl]);

    const fetchStats = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/stats/`);
            if (res.ok) {
                const data = await res.json();
                setStats(data);
            } else {
                // API error - set empty state instead of mock data
                console.error('Admin stats API error:', res.status);
                toast.error('İstatistikler yüklenemedi');
                setStats({
                    totalUsers: 0, onlineUsers: 0, totalServers: 0, totalMessages: 0,
                    activeVoiceCalls: 0, premiumUsers: 0, newUsersToday: 0, messagesToday: 0,
                    voiceMinutesToday: 0, reportsToday: 0, storageUsed: '0 GB', bandwidthToday: '0 GB',
                    apiCalls: 0, avgResponseTime: 0, errorRate: '0', weeklyGrowth: '0', monthlyRevenue: 0
                });
            }
        } catch (err) {
            console.error('Stats fetch error:', err);
            toast.error('İstatistikler yüklenemedi');
        }
        setLoading(false);
    }, [fetchWithAuth, apiBaseUrl]);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(
                `${apiBaseUrl}/api/admin/users/?search=${searchQuery}&page=${currentPage}&sort=${sortField}&order=${sortOrder}&status=${filterStatus}`
            );
            if (res.ok) {
                const data = await res.json();
                setUsers(data.users || data.results || []);
                setTotalPages(data.total_pages || Math.ceil((data.count || 1) / 20));
            } else {
                console.error('Admin users API error:', res.status);
                setUsers([]);
            }
        } catch (err) {
            console.error('Users fetch error:', err);
            setUsers([]);
        }
        setLoading(false);
    }, [fetchWithAuth, apiBaseUrl, searchQuery, currentPage, sortField, sortOrder, filterStatus]);

    const fetchServers = useCallback(async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/servers/`);
            if (res.ok) {
                const data = await res.json();
                setServers(data.servers || data || []);
            } else {
                console.error('Admin servers API error:', res.status);
                setServers([]);
            }
        } catch (err) {
            console.error('Servers fetch error:', err);
            setServers([]);
        }
    }, [fetchWithAuth, apiBaseUrl]);

    const fetchLogs = useCallback(async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/logs/`);
            if (res.ok) {
                const data = await res.json();
                setLogs(data.logs || data || []);
            } else {
                console.error('Admin logs API error:', res.status);
                setLogs([]);
            }
        } catch (err) {
            console.error('Logs fetch error:', err);
            setLogs([]);
        }
    }, [fetchWithAuth, apiBaseUrl]);

    const fetchSystemHealth = useCallback(async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/health/`);
            if (res.ok) {
                const data = await res.json();
                setSystemHealth(data);
            } else {
                console.error('Admin health API error:', res.status);
                setSystemHealth({
                    cpu: 0, memory: 0, disk: 0, uptime: 'Bilinmiyor',
                    activeConnections: 0, requestsPerMinute: 0, dbConnections: 0,
                    cacheHitRate: '0', wsConnections: 0
                });
            }
        } catch (err) {
            console.error('Health fetch error:', err);
            setSystemHealth({
                cpu: 0, memory: 0, disk: 0, uptime: 'Bilinmiyor',
                activeConnections: 0, requestsPerMinute: 0, dbConnections: 0,
                cacheHitRate: '0', wsConnections: 0
            });
        }
    }, [fetchWithAuth, apiBaseUrl]);

    const fetchBannedUsers = useCallback(async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/banned-users/`);
            if (res.ok) {
                const data = await res.json();
                setBannedUsers(data.users || data || []);
            } else {
                console.error('Admin banned-users API error:', res.status);
                setBannedUsers([]);
            }
        } catch (err) {
            console.error('Banned users fetch error:', err);
            setBannedUsers([]);
        }
    }, [fetchWithAuth, apiBaseUrl]);

    const fetchDbStats = useCallback(async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/db-stats/`);
            if (res.ok) {
                const data = await res.json();
                setDbStats(data);
            } else {
                console.error('Admin db-stats API error:', res.status);
                setDbStats({
                    users: { count: 0, size: '0 MB' },
                    messages: { count: 0, size: '0 MB' },
                    servers: { count: 0, size: '0 MB' },
                    attachments: { count: 0, size: '0 GB' },
                    voice_logs: { count: 0, size: '0 MB' },
                    total_size: '0 GB'
                });
            }
        } catch (err) {
            console.error('DB stats fetch error:', err);
            setDbStats({
                users: { count: 0, size: '0 MB' },
                messages: { count: 0, size: '0 MB' },
                servers: { count: 0, size: '0 MB' },
                attachments: { count: 0, size: '0 GB' },
                voice_logs: { count: 0, size: '0 MB' },
                total_size: '0 GB'
            });
        }
    }, [fetchWithAuth, apiBaseUrl]);

    // ===== ACTIONS =====
    const handleUserAction = async (action, userId, extra = {}) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/user-action/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, user_id: userId, ...extra })
            });
            if (res.ok) {
                toast.success(`✅ ${action} işlemi başarılı!`);
                fetchUsers();
                if (action === 'ban') fetchBannedUsers();
            } else {
                toast.error('❌ İşlem başarısız!');
            }
        } catch (err) {
            toast.error('❌ Hata oluştu!');
        }
        setActionModal(null);
        setSelectedUser(null);
    };

    const handleBroadcast = async () => {
        if (!announceText.trim()) return;
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/broadcast/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: announceText })
            });
            if (res.ok) {
                toast.success('📢 Duyuru gönderildi!');
                setAnnounceText('');
                setBroadcastModal(false);
            }
        } catch (err) {
            toast.error('❌ Duyuru gönderilemedi!');
        }
    };

    const handleBackup = async () => {
        setBackupStatus('running');
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/backup/`, { method: 'POST' });
            if (res.ok) {
                setBackupStatus('success');
                toast.success('✅ Yedekleme tamamlandı!');
            } else {
                setBackupStatus('error');
            }
        } catch (err) {
            setBackupStatus('error');
        }
    };

    const handleClearCache = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/clear-cache/`, { method: 'POST' });
            if (res.ok) {
                toast.success('🧹 Cache temizlendi!');
            }
        } catch (err) {
            toast.error('❌ Cache temizlenemedi!');
        }
    };

    const toggleMaintenance = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/maintenance/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ enabled: !maintenanceMode })
            });
            if (res.ok) {
                setMaintenanceMode(!maintenanceMode);
                toast.success(maintenanceMode ? '✅ Bakım modu kapatıldı!' : '🔧 Bakım modu açıldı!');
            }
        } catch (err) {
            toast.error('❌ Hata!');
        }
    };

    // 🔥 Kullanıcı Düzenleme
    const openEditUserModal = (user) => {
        setEditUserForm({
            username: user.username || '',
            email: user.email || '',
            coins: user.coins || 0,
            level: user.level || 1,
            xp: user.xp || 0,
            role: user.role || 'member',
            is_active: user.is_active !== false,
            is_staff: user.is_staff || false,
            is_premium: user.is_premium || false,
            status_message: user.status_message || '',
            email_verified: user.email_verified || false,
        });
        setEditUserModal(user);
    };

    const handleUpdateUser = async () => {
        if (!editUserModal) return;
        setEditUserLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/update-user/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: editUserModal.id, ...editUserForm })
            });
            if (res.ok) {
                const data = await res.json();
                toast.success(`✅ ${data.message}`);
                setEditUserModal(null);
                fetchUsers();
            } else {
                const data = await res.json();
                toast.error(`❌ ${data.error || 'Güncelleme başarısız!'}`);
            }
        } catch (err) {
            toast.error('❌ Hata oluştu!');
        }
        setEditUserLoading(false);
    };

    // 🔥 Sunucu İşlemleri
    const handleServerDetails = async (server) => {
        setServerDetailLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/server-action/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'details', server_id: server.id })
            });
            if (res.ok) {
                const data = await res.json();
                setSelectedServer(data);
            } else {
                toast.error('❌ Sunucu detayları yüklenemedi!');
            }
        } catch (err) {
            toast.error('❌ Hata oluştu!');
        }
        setServerDetailLoading(false);
    };

    const handleServerDelete = async (serverId, serverName) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/server-action/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'delete', server_id: serverId })
            });
            if (res.ok) {
                toast.success(`✅ "${serverName}" sunucusu silindi!`);
                setDeleteConfirm(null);
                fetchServers();
            } else {
                toast.error('❌ Sunucu silinemedi!');
            }
        } catch (err) {
            toast.error('❌ Hata oluştu!');
        }
    };

    // 🔥 Eski Logları Sil
    const handleDeleteOldLogs = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/delete-old-logs/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ days: 30 })
            });
            if (res.ok) {
                const data = await res.json();
                toast.success(`✅ ${data.message}`);
            } else {
                toast.error('❌ Loglar silinemedi!');
            }
        } catch (err) {
            toast.error('❌ Hata oluştu!');
        }
    };

    // ===== EFFECTS =====
    useEffect(() => {
        fetchStats();
        fetchSystemHealth();
        fetchDetailedStats();
        fetchLiveActivity();
        fetchSecurityAlerts();
    }, [fetchStats, fetchSystemHealth, fetchDetailedStats, fetchLiveActivity, fetchSecurityAlerts]);

    useEffect(() => {
        if (activeTab === 'users') fetchUsers();
        if (activeTab === 'servers') fetchServers();
        if (activeTab === 'logs') { fetchLogs(); fetchSystemLogs(); }
        if (activeTab === 'moderation') fetchBannedUsers();
        if (activeTab === 'database') fetchDbStats();
    }, [activeTab, fetchUsers, fetchServers, fetchLogs, fetchBannedUsers, fetchDbStats]);

    // Realtime auto-refresh every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            fetchDetailedStats();
            fetchLiveActivity();
            fetchSecurityAlerts();
        }, 10000);
        return () => clearInterval(interval);
    }, [fetchDetailedStats, fetchLiveActivity, fetchSecurityAlerts]);

    // ===== STYLES =====
    const styles = {
        overlay: {
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.92)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999999,
            backdropFilter: 'blur(8px)'
        },
        modal: {
            width: '96%',
            maxWidth: '1600px',
            height: '94vh',
            backgroundColor: '#0f0f10',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.8)',
            overflow: 'hidden',
            border: '1px solid #1f2023'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 24px',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            borderBottom: '1px solid #2d2f34'
        },
        headerLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
        title: { color: '#fff', fontSize: '18px', fontWeight: '700', margin: 0 },
        closeButton: {
            background: 'rgba(255,255,255,0.1)',
            border: 'none', color: '#fff', cursor: 'pointer',
            padding: '10px', borderRadius: '8px', fontSize: '18px'
        },
        body: { display: 'flex', flex: 1, overflow: 'hidden' },
        sidebar: {
            width: '200px',
            backgroundColor: '#0d0d0f',
            padding: '10px 8px',
            overflowY: 'auto',
            borderRight: '1px solid #1f2023'
        },
        sidebarButton: (active) => ({
            width: '100%',
            padding: '10px 12px',
            background: active ? 'linear-gradient(135deg, #5865f2 0%, #7c3aed 100%)' : 'transparent',
            border: 'none',
            borderRadius: '8px',
            color: active ? '#fff' : '#8b8d91',
            cursor: 'pointer',
            fontWeight: active ? '600' : '500',
            fontSize: '12px',
            textAlign: 'left',
            transition: 'all 0.15s',
            marginBottom: '3px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        }),
        content: {
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            backgroundColor: '#111113'
        },
        statCard: {
            backgroundColor: '#1a1a1e',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid #2a2a2e'
        },
        statValue: { fontSize: '28px', fontWeight: '700', color: '#fff' },
        statLabel: { fontSize: '11px', color: '#8b8d91', textTransform: 'uppercase', letterSpacing: '0.5px' },
        table: { width: '100%', borderCollapse: 'collapse' },
        th: {
            padding: '12px', textAlign: 'left', backgroundColor: '#0d0d0f',
            color: '#8b8d91', fontWeight: '600', fontSize: '11px',
            textTransform: 'uppercase', borderBottom: '1px solid #2a2a2e'
        },
        td: { padding: '12px', color: '#e5e7eb', fontSize: '13px', borderBottom: '1px solid #1f2023' },
        actionBtn: (color) => ({
            padding: '6px 10px', backgroundColor: color, border: 'none',
            borderRadius: '6px', color: '#fff', cursor: 'pointer',
            fontSize: '11px', fontWeight: '500', marginRight: '4px'
        }),
        searchInput: {
            flex: 1, padding: '10px 14px', backgroundColor: '#1a1a1e',
            border: '1px solid #2a2a2e', borderRadius: '8px',
            color: '#fff', fontSize: '13px', outline: 'none'
        },
        badge: (color) => ({
            display: 'inline-block', padding: '3px 8px', borderRadius: '12px',
            fontSize: '10px', fontWeight: '600', backgroundColor: `${color}20`, color: color
        }),
        miniCard: {
            backgroundColor: '#1a1a1e', borderRadius: '8px', padding: '12px',
            border: '1px solid #2a2a2e', textAlign: 'center'
        }
    };

    // ===== MENU ITEMS =====
    const menuItems = [
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
        { id: 'quickActions', label: 'Hızlı İşlem', icon: <FaCog size={14} /> }
    ];

    // ===== RENDER FUNCTIONS =====

    // 📊 Dashboard - GERÇEK VERİLER

    // 👥 Users

    // 🏠 Servers

    // 📋 Logs - ENHANCED SYSTEM LOGS
    const [systemLogs, setSystemLogs] = useState([]);
    const [logStats, setLogStats] = useState(null);
    const [logType, setLogType] = useState('all');
    const [logSearch, setLogSearch] = useState('');
    const [logSeverity, setLogSeverity] = useState('');
    const [logDateFrom, setLogDateFrom] = useState('');
    const [logDateTo, setLogDateTo] = useState('');
    const [logLoading, setLogLoading] = useState(false);
    const [selectedLogUser, setSelectedLogUser] = useState(null);
    const [userActivityModal, setUserActivityModal] = useState(null);

    const fetchSystemLogs = useCallback(async () => {
        setLogLoading(true);
        try {
            const params = new URLSearchParams();
            params.append('type', logType);
            params.append('limit', '100');
            if (logSearch) params.append('search', logSearch);
            if (logSeverity) params.append('severity', logSeverity);
            if (logDateFrom) params.append('date_from', logDateFrom);
            if (logDateTo) params.append('date_to', logDateTo);

            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/system-logs/?${params}`);
            if (res.ok) {
                const data = await res.json();
                setSystemLogs(data.logs || []);
                setLogStats(data.stats);
            }
        } catch (err) {
            console.error('System logs fetch error:', err);
        }
        setLogLoading(false);
    }, [fetchWithAuth, apiBaseUrl, logType, logSearch, logSeverity, logDateFrom, logDateTo]);

    const handleExportLogs = async (format) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/logs/export/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: logType === 'all' ? 'audit' : logType,
                    format,
                    date_from: logDateFrom || null,
                    date_to: logDateTo || null,
                    limit: 5000
                })
            });

            if (format === 'csv') {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `logs_${logType}_${new Date().toISOString().split('T')[0]}.csv`;
                a.click();
                toast.success('CSV exported successfully!');
            } else {
                const data = await res.json();
                const blob = new Blob([JSON.stringify(data.logs, null, 2)], { type: 'application/json' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `logs_${logType}_${new Date().toISOString().split('T')[0]}.json`;
                a.click();
                toast.success('JSON exported successfully!');
            }
        } catch (err) {
            toast.error('Export failed');
        }
    };

    const fetchUserActivity = async (userId) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/users/${userId}/activity/?limit=50`);
            if (res.ok) {
                const data = await res.json();
                setUserActivityModal(data);
            }
        } catch (err) {
            toast.error('Failed to fetch user activity');
        }
    };


    // 🛡️ Moderation

    // 🗄️ Database

    // 💚 System Health

    // 🔒 Security

    // 📢 Broadcast

    // 🔧 Tools

    // ⚡ Quick Actions

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <DashboardTab
                        detailedStats={detailedStats}
                        fetchDetailedStats={fetchDetailedStats}
                        fetchLiveActivity={fetchLiveActivity}
                        fetchSecurityAlerts={fetchSecurityAlerts}
                        liveActivities={liveActivities}
                        securityAlerts={securityAlerts}
                        servers={servers}
                        setBroadcastModal={setBroadcastModal}
                        stats={stats}
                        users={users}
                    />
                );
            case 'users':
                return (
                    <UsersTab
                        currentPage={currentPage}
                        fetchUsers={fetchUsers}
                        filterStatus={filterStatus}
                        handleUserAction={handleUserAction}
                        openEditUserModal={openEditUserModal}
                        searchQuery={searchQuery}
                        setActionModal={setActionModal}
                        setCurrentPage={setCurrentPage}
                        setFilterStatus={setFilterStatus}
                        setPasswordResetModal={setPasswordResetModal}
                        setSearchQuery={setSearchQuery}
                        setSelectedUser={setSelectedUser}
                        setSortField={setSortField}
                        sortField={sortField}
                        totalPages={totalPages}
                        users={users}
                    />
                );
            case 'servers':
                return (
                    <ServersTab
                        handleServerDetails={handleServerDetails}
                        servers={servers}
                        setDeleteConfirm={setDeleteConfirm}
                    />
                );
            case 'logs':
                return (
                    <LogsTab
                        fetchSystemLogs={fetchSystemLogs}
                        fetchUserActivity={fetchUserActivity}
                        handleExportLogs={handleExportLogs}
                        logDateFrom={logDateFrom}
                        logDateTo={logDateTo}
                        logLoading={logLoading}
                        logSearch={logSearch}
                        logSeverity={logSeverity}
                        logStats={logStats}
                        logType={logType}
                        logs={logs}
                        setLogDateFrom={setLogDateFrom}
                        setLogDateTo={setLogDateTo}
                        setLogSearch={setLogSearch}
                        setLogSeverity={setLogSeverity}
                        setLogType={setLogType}
                        setUserActivityModal={setUserActivityModal}
                        systemLogs={systemLogs}
                        userActivityModal={userActivityModal}
                    />
                );
            case 'moderation':
                return (
                    <ModerationTab
                        bannedUsers={bannedUsers}
                        handleUserAction={handleUserAction}
                        onOpenAuditLogs={onOpenAuditLogs}
                        onOpenModTools={onOpenModTools}
                        onOpenReports={onOpenReports}
                    />
                );
            case 'database':
                return (
                    <DatabaseTab
                        backupStatus={backupStatus}
                        dbStats={dbStats}
                        handleBackup={handleBackup}
                        handleClearCache={handleClearCache}
                        handleDeleteOldLogs={handleDeleteOldLogs}
                    />
                );
            case 'system': return <SystemHealthTab systemHealth={systemHealth} />;
            case 'security': return <SecurityTab maintenanceMode={maintenanceMode} toggleMaintenance={toggleMaintenance} />;
            case 'broadcast':
                return (
                    <BroadcastTab
                        announceText={announceText}
                        handleBroadcast={handleBroadcast}
                        setAnnounceText={setAnnounceText}
                    />
                );
            case 'tools': return <ToolsTab handleBackup={handleBackup} handleClearCache={handleClearCache} />;
            case 'quickActions':
                return (
                    <QuickActionsTab
                        onClose={onClose}
                        onOpenAnalytics={onOpenAnalytics}
                        onOpenAutoResponder={onOpenAutoResponder}
                        onOpenVanityURL={onOpenVanityURL}
                        onOpenWebhooks={onOpenWebhooks}
                    />
                );
            default:
                return (
                    <DashboardTab
                        detailedStats={detailedStats}
                        fetchDetailedStats={fetchDetailedStats}
                        fetchLiveActivity={fetchLiveActivity}
                        fetchSecurityAlerts={fetchSecurityAlerts}
                        liveActivities={liveActivities}
                        securityAlerts={securityAlerts}
                        servers={servers}
                        setBroadcastModal={setBroadcastModal}
                        stats={stats}
                        users={users}
                    />
                );
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaCrown size={20} color="#ffd700" />
                        <h2 style={styles.title}>👑 Admin Panel - PAWSCORD</h2>
                        <span style={styles.badge('#23a559')}>v2.0</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: '#6b7280', fontSize: '11px' }}>
                            🟢 {realtimeStats.online} Online
                        </span>
                        <button onClick={onClose} style={styles.closeButton}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div style={styles.body}>
                    {/* Sidebar */}
                    <div style={styles.sidebar}>
                        {menuItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                style={styles.sidebarButton(activeTab === item.id)}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div style={styles.content}>
                        {loading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <FaSync className="spin" size={24} color="#5865f2" />
                            </div>
                        ) : (
                            renderContent()
                        )}
                    </div>
                </div>

                {/* UserDetailModal */}
                {selectedUser && (
                    <UserDetailModal
                        handleUserAction={handleUserAction}
                        openEditUserModal={openEditUserModal}
                        selectedUser={selectedUser}
                        setActionModal={setActionModal}
                        setPasswordResetModal={setPasswordResetModal}
                        setSelectedUser={setSelectedUser}
                    />
                )}

                {/* ActionConfirmationModal */}
                {actionModal && (
                    <ActionConfirmationModal
                        actionModal={actionModal}
                        handleUserAction={handleUserAction}
                        setActionModal={setActionModal}
                        setSelectedUser={setSelectedUser}
                    />
                )}

                {/* PasswordResetModal */}
                {passwordResetModal && (
                    <PasswordResetModal
                        handleUserAction={handleUserAction}
                        newPassword={newPassword}
                        passwordResetModal={passwordResetModal}
                        setNewPassword={setNewPassword}
                        setPasswordResetModal={setPasswordResetModal}
                    />
                )}

                {/* BroadcastModal */}
                {broadcastModal && (
                    <BroadcastModal
                        announceText={announceText}
                        handleBroadcast={handleBroadcast}
                        setAnnounceText={setAnnounceText}
                        setBroadcastModal={setBroadcastModal}
                    />
                )}

                {/* EditUserModal */}
                {editUserModal && (
                    <EditUserModal
                        editUserForm={editUserForm}
                        editUserLoading={editUserLoading}
                        editUserModal={editUserModal}
                        handleUpdateUser={handleUpdateUser}
                        setEditUserForm={setEditUserForm}
                        setEditUserModal={setEditUserModal}
                    />
                )}

                {/* ServerDetailModal */}
                {selectedServer && (
                    <ServerDetailModal selectedServer={selectedServer} setSelectedServer={setSelectedServer} />
                )}

                {/* DeleteConfirmModal */}
                {deleteConfirm && (
                    <DeleteConfirmModal
                        deleteConfirm={deleteConfirm}
                        handleServerDelete={handleServerDelete}
                        setDeleteConfirm={setDeleteConfirm}
                    />
                )}


            </div>
        </div>
    );
};

export default AdminPanelModal;
