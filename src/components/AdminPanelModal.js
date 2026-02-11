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
    const renderDashboard = () => (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h2 style={{ color: '#fff', margin: 0, fontSize: '20px' }}>📊 Admin Dashboard</h2>
                    <p style={{ color: '#6b7280', margin: '4px 0 0', fontSize: '12px' }}>
                        Son güncelleme: {new Date().toLocaleTimeString('tr-TR')} | Auto-refresh: 10s
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => { fetchDetailedStats(); fetchLiveActivity(); fetchSecurityAlerts(); }}
                        style={{ ...styles.actionBtn('#5865f2'), padding: '8px 14px' }}>
                        <FaSync size={12} /> Yenile
                    </button>
                    <button onClick={() => setBroadcastModal(true)} style={{ ...styles.actionBtn('#23a559'), padding: '8px 14px' }}>
                        <FaPaperPlane size={12} /> Duyuru
                    </button>
                </div>
            </div>

            {/* Realtime Stats Bar - GERÇEK VERİLER */}
            <div style={{
                background: 'linear-gradient(90deg, #1e3a5f 0%, #2d1b4e 100%)',
                borderRadius: '10px', padding: '14px 20px', marginBottom: '20px',
                display: 'flex', justifyContent: 'space-around', alignItems: 'center'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#23a559' }}>
                        {detailedStats?.users?.online || 0}
                    </div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>🟢 Çevrimiçi</div>
                </div>
                <div style={{ width: '1px', height: '40px', backgroundColor: '#ffffff20' }} />
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#ffc107' }}>
                        {detailedStats?.users?.idle || 0}
                    </div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>🌙 Boşta</div>
                </div>
                <div style={{ width: '1px', height: '40px', backgroundColor: '#ffffff20' }} />
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#5865f2' }}>
                        {detailedStats?.messages?.last_1h || 0}
                    </div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>💬 Son 1 saat mesaj</div>
                </div>
                <div style={{ width: '1px', height: '40px', backgroundColor: '#ffffff20' }} />
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#e74c3c' }}>
                        {securityAlerts?.length || 0}
                    </div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>⚠️ Güvenlik Uyarısı</div>
                </div>
            </div>

            {/* Main Stats Grid - GERÇEK VERİLER */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px', marginBottom: '20px' }}>
                {[
                    { icon: <FaUsers color="#5865f2" />, value: detailedStats?.users?.total || stats?.totalUsers, label: 'Toplam Kullanıcı', color: '#5865f2' },
                    { icon: <FaGlobe color="#23a559" />, value: detailedStats?.users?.active || stats?.onlineUsers, label: 'Aktif (24s)', color: '#23a559' },
                    { icon: <FaServer color="#f0b132" />, value: detailedStats?.servers?.total || stats?.totalServers, label: 'Sunucu', color: '#f0b132' },
                    { icon: <FaComment color="#e74c3c" />, value: (detailedStats?.messages?.total || stats?.totalMessages)?.toLocaleString(), label: 'Mesaj', color: '#e74c3c' },
                    { icon: <FaShieldAlt color="#9b59b6" />, value: detailedStats?.users?.verified || 0, label: 'Doğrulanmış', color: '#9b59b6' },
                    { icon: <FaCrown color="#ffd700" />, value: detailedStats?.premium?.total || stats?.premiumUsers, label: 'Premium', color: '#ffd700' },
                ].map((stat, idx) => (
                    <div key={idx} style={styles.statCard}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ fontSize: '20px' }}>{stat.icon}</div>
                            <div>
                                <div style={{ ...styles.statValue, fontSize: '22px' }}>{stat.value || '---'}</div>
                                <div style={styles.statLabel}>{stat.label}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Kullanıcı Büyüme + Sistem Sağlığı */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                {/* Kullanıcı Büyümesi */}
                <div style={styles.statCard}>
                    <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '14px', fontSize: '14px' }}>📈 Kullanıcı Büyümesi</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                        {[
                            { value: `+${detailedStats?.users?.new_1h || 0}`, label: 'Son 1 Saat', color: '#23a559' },
                            { value: `+${detailedStats?.users?.new_24h || 0}`, label: 'Son 24 Saat', color: '#5865f2' },
                            { value: `+${detailedStats?.users?.new_7d || 0}`, label: 'Son 7 Gün', color: '#f0b132' },
                            { value: `+${detailedStats?.users?.new_30d || 0}`, label: 'Son 30 Gün', color: '#e74c3c' },
                        ].map((item, idx) => (
                            <div key={idx} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '22px', fontWeight: '700', color: item.color }}>{item.value}</div>
                                <div style={{ fontSize: '10px', color: '#6b7280' }}>{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sistem Sağlığı - GERÇEK */}
                <div style={styles.statCard}>
                    <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '14px', fontSize: '14px' }}>⚡ Sistem Sağlığı</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                        {[
                            {
                                value: `${detailedStats?.system?.cpu_percent?.toFixed(1) || 0}%`,
                                label: 'CPU',
                                color: (detailedStats?.system?.cpu_percent || 0) > 80 ? '#e74c3c' : '#23a559'
                            },
                            {
                                value: `${detailedStats?.system?.memory_percent?.toFixed(1) || 0}%`,
                                label: 'RAM',
                                color: (detailedStats?.system?.memory_percent || 0) > 80 ? '#e74c3c' : '#3498db'
                            },
                            {
                                value: `${detailedStats?.system?.disk_percent?.toFixed(1) || 0}%`,
                                label: 'Disk',
                                color: (detailedStats?.system?.disk_percent || 0) > 90 ? '#e74c3c' : '#9b59b6'
                            },
                            {
                                value: detailedStats?.system?.uptime || '---',
                                label: 'Çalışma',
                                color: '#ffd700'
                            },
                        ].map((item, idx) => (
                            <div key={idx} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '18px', fontWeight: '700', color: item.color }}>{item.value}</div>
                                <div style={{ fontSize: '10px', color: '#6b7280' }}>{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mesaj & Premium İstatistikleri */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                {/* Mesaj İstatistikleri */}
                <div style={styles.statCard}>
                    <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '14px', fontSize: '14px' }}>💬 Mesaj İstatistikleri</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                        {[
                            { value: (detailedStats?.messages?.total || 0).toLocaleString(), label: 'Toplam Mesaj', color: '#5865f2' },
                            { value: (detailedStats?.messages?.direct_messages || 0).toLocaleString(), label: 'DM', color: '#23a559' },
                            { value: (detailedStats?.messages?.reactions || 0).toLocaleString(), label: 'Reaksiyon', color: '#f0b132' },
                            { value: detailedStats?.messages?.pinned || 0, label: 'Sabitlenmiş', color: '#e74c3c' },
                        ].map((item, idx) => (
                            <div key={idx} style={{
                                textAlign: 'center', backgroundColor: '#111113', padding: '10px', borderRadius: '8px'
                            }}>
                                <div style={{ fontSize: '18px', fontWeight: '700', color: item.color }}>{item.value}</div>
                                <div style={{ fontSize: '10px', color: '#6b7280' }}>{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Premium Gelir */}
                <div style={styles.statCard}>
                    <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '14px', fontSize: '14px' }}>💎 Premium & Gelir</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                        {[
                            { value: detailedStats?.premium?.monthly || 0, label: 'Aylık', color: '#5865f2' },
                            { value: detailedStats?.premium?.yearly || 0, label: 'Yıllık', color: '#23a559' },
                            { value: detailedStats?.premium?.lifetime || 0, label: 'Ömür Boyu', color: '#ffd700' },
                        ].map((item, idx) => (
                            <div key={idx} style={{
                                textAlign: 'center', backgroundColor: '#111113', padding: '10px', borderRadius: '8px'
                            }}>
                                <div style={{ fontSize: '18px', fontWeight: '700', color: item.color }}>{item.value}</div>
                                <div style={{ fontSize: '10px', color: '#6b7280' }}>{item.label}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: '12px', textAlign: 'center', padding: '10px', backgroundColor: '#1a472a', borderRadius: '8px' }}>
                        <div style={{ fontSize: '22px', fontWeight: '700', color: '#23a559' }}>
                            ${(detailedStats?.premium?.estimated_revenue || 0).toLocaleString()}
                        </div>
                        <div style={{ fontSize: '11px', color: '#6b7280' }}>Tahmini Aylık Gelir</div>
                    </div>
                </div>
            </div>

            {/* Live Activity + Top Sunucular */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '20px' }}>
                {/* Canlı Aktivite */}
                <div style={styles.statCard}>
                    <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '14px', fontSize: '14px' }}>
                        📡 Canlı Aktivite
                        <span style={{ fontSize: '10px', color: '#23a559', marginLeft: '8px' }}>● CANLI</span>
                    </h3>
                    <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
                        {liveActivities.length === 0 ? (
                            <div style={{ textAlign: 'center', color: '#6b7280', padding: '20px' }}>
                                Aktivite bekleniyor...
                            </div>
                        ) : (
                            liveActivities.map((activity, idx) => (
                                <div key={idx} style={{
                                    display: 'flex', alignItems: 'center', gap: '10px',
                                    padding: '8px', borderBottom: '1px solid #2a2a2e'
                                }}>
                                    <div style={{
                                        width: '8px', height: '8px', borderRadius: '50%',
                                        backgroundColor: activity.type === 'user_join' ? '#23a559' :
                                            activity.type === 'message' ? '#5865f2' :
                                                activity.type === 'server_create' ? '#f0b132' :
                                                    activity.type === 'premium' ? '#ffd700' : '#9b59b6'
                                    }} />
                                    <div style={{ flex: 1, color: '#e5e7eb', fontSize: '12px' }}>
                                        <strong style={{ color: '#fff' }}>{activity.user}</strong> {activity.action}
                                        {activity.target && <span style={{ color: '#6b7280' }}> → {activity.target}</span>}
                                    </div>
                                    <div style={{ color: '#6b7280', fontSize: '10px' }}>{activity.time_ago}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Top Sunucular */}
                <div style={styles.statCard}>
                    <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '14px', fontSize: '14px' }}>🏆 Top 5 Sunucu</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {(detailedStats?.servers?.top_servers || []).slice(0, 5).map((server, idx) => (
                            <div key={idx} style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '8px 10px', backgroundColor: '#111113', borderRadius: '6px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ color: idx === 0 ? '#ffd700' : idx === 1 ? '#c0c0c0' : idx === 2 ? '#cd7f32' : '#6b7280' }}>
                                        #{idx + 1}
                                    </span>
                                    <span style={{ color: '#e5e7eb', fontSize: '12px' }}>{server.name}</span>
                                </div>
                                <span style={{ color: '#5865f2', fontWeight: '700', fontSize: '12px' }}>
                                    {server.member_count} üye
                                </span>
                            </div>
                        ))}
                        {(!detailedStats?.servers?.top_servers || detailedStats.servers.top_servers.length === 0) && (
                            <div style={{ textAlign: 'center', color: '#6b7280', padding: '20px' }}>
                                Sunucu verisi yok
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Güvenlik Uyarıları + Dosya İstatistikleri */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* Güvenlik Uyarıları */}
                <div style={{ ...styles.statCard, borderColor: securityAlerts.length > 0 ? '#e74c3c' : '#2a2a2e' }}>
                    <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '14px', fontSize: '14px' }}>
                        🛡️ Güvenlik Uyarıları
                        {securityAlerts.length > 0 && (
                            <span style={{
                                marginLeft: '8px', backgroundColor: '#e74c3c', color: '#fff',
                                padding: '2px 8px', borderRadius: '10px', fontSize: '10px'
                            }}>
                                {securityAlerts.length}
                            </span>
                        )}
                    </h3>
                    <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                        {securityAlerts.length === 0 ? (
                            <div style={{ textAlign: 'center', color: '#23a559', padding: '20px' }}>
                                ✅ Güvenlik uyarısı yok
                            </div>
                        ) : (
                            securityAlerts.map((alert, idx) => (
                                <div key={idx} style={{
                                    display: 'flex', alignItems: 'center', gap: '10px',
                                    padding: '8px', borderBottom: '1px solid #2a2a2e',
                                    backgroundColor: alert.severity === 'high' ? '#e74c3c20' : '#f0b13220'
                                }}>
                                    <FaExclamationTriangle color={alert.severity === 'high' ? '#e74c3c' : '#f0b132'} size={14} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ color: '#e5e7eb', fontSize: '12px' }}>{alert.message}</div>
                                        <div style={{ color: '#6b7280', fontSize: '10px' }}>{alert.time}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Dosya İstatistikleri */}
                <div style={styles.statCard}>
                    <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '14px', fontSize: '14px' }}>📁 Dosya & Depolama</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                        {[
                            { icon: <FaImage color="#e74c3c" />, label: 'Resim', value: detailedStats?.files?.images || 0 },
                            { icon: <FaVideo color="#5865f2" />, label: 'Video', value: detailedStats?.files?.videos || 0 },
                            { icon: <FaMicrophone color="#23a559" />, label: 'Ses', value: detailedStats?.files?.audio || 0 },
                            { icon: <FaFile color="#f0b132" />, label: 'Diğer', value: detailedStats?.files?.other || 0 },
                        ].map((item, idx) => (
                            <div key={idx} style={{
                                display: 'flex', alignItems: 'center', gap: '8px',
                                padding: '8px', backgroundColor: '#111113', borderRadius: '6px'
                            }}>
                                {item.icon}
                                <div>
                                    <div style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>{item.value}</div>
                                    <div style={{ color: '#6b7280', fontSize: '10px' }}>{item.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: '10px', padding: '8px', backgroundColor: '#111113', borderRadius: '6px', textAlign: 'center' }}>
                        <div style={{ fontSize: '16px', fontWeight: '700', color: '#9b59b6' }}>
                            {detailedStats?.files?.total_storage || '0 MB'}
                        </div>
                        <div style={{ fontSize: '10px', color: '#6b7280' }}>Toplam Depolama</div>
                    </div>
                </div>
            </div>
        </div>
    );

    // 👥 Users
    const renderUsers = () => (
        <div>
            <h2 style={{ color: '#fff', marginBottom: '16px', fontSize: '18px' }}>👥 Kullanıcı Yönetimi</h2>

            {/* Search & Filters */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <input
                    type="text"
                    placeholder="Kullanıcı ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ ...styles.searchInput, maxWidth: '300px' }}
                />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={{ ...styles.searchInput, maxWidth: '150px' }}
                >
                    <option value="all">Tümü</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="premium">Premium</option>
                    <option value="banned">Yasaklı</option>
                </select>
                <select
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                    style={{ ...styles.searchInput, maxWidth: '150px' }}
                >
                    <option value="created">Kayıt Tarihi</option>
                    <option value="username">Kullanıcı Adı</option>
                    <option value="message_count">Mesaj Sayısı</option>
                </select>
                <button onClick={fetchUsers} style={styles.actionBtn('#5865f2')}>
                    <FaSearch /> Ara
                </button>
                <button style={styles.actionBtn('#23a559')}>
                    <FaFileExport /> Export
                </button>
            </div>

            {/* Table */}
            <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #2a2a2e' }}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Kullanıcı</th>
                            <th style={styles.th}>Arkadaşlık Kodu</th>
                            <th style={styles.th}>Seviye / XP</th>
                            <th style={styles.th}>Coin</th>
                            <th style={styles.th}>Mesaj</th>
                            <th style={styles.th}>Sunucu</th>
                            <th style={styles.th}>Arkadaş</th>
                            <th style={styles.th}>Durum</th>
                            <th style={styles.th}>Tip</th>
                            <th style={styles.th}>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} style={{ backgroundColor: user.is_admin ? '#1a1a2e20' : 'transparent' }}>
                                <td style={styles.td}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{
                                            width: '32px', height: '32px', borderRadius: '50%',
                                            background: `linear-gradient(135deg, hsl(${user.id * 40}, 70%, 50%), hsl(${user.id * 40 + 30}, 70%, 40%))`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#fff', fontWeight: '600', fontSize: '12px'
                                        }}>
                                            {user.username?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '13px' }}>{user.username}</div>
                                            <div style={{ fontSize: '10px', color: '#6b7280' }}>{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ ...styles.td, fontFamily: 'monospace', fontWeight: '600', color: '#5865f2' }}>
                                    #{user.friend_code || 'N/A'}
                                </td>
                                <td style={styles.td}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <span style={{ ...styles.badge('#23a559'), minWidth: '45px' }}>Lv.{user.level || 1}</span>
                                        <span style={{ fontSize: '11px', color: '#a3a3a3' }}>{(user.xp || 0).toLocaleString()} XP</span>
                                    </div>
                                </td>
                                <td style={{ ...styles.td, color: '#ffd700', fontWeight: '600' }}>
                                    🪙 {(user.coins || 0).toLocaleString()}
                                </td>
                                <td style={styles.td}>
                                    💬 {(user.total_messages || 0).toLocaleString()}
                                </td>
                                <td style={styles.td}>
                                    🏠 {user.servers_joined || 0}
                                </td>
                                <td style={styles.td}>
                                    👥 {user.friends_count || 0}
                                </td>
                                <td style={styles.td}>
                                    <span style={styles.badge(
                                        user.status === 'online' ? '#23a559' :
                                            user.status === 'idle' ? '#f0b132' :
                                                user.status === 'dnd' ? '#e74c3c' : '#6b7280'
                                    )}>
                                        {user.status === 'online' ? '🟢' : user.status === 'idle' ? '🌙' : user.status === 'dnd' ? '⛔' : '⚫'}
                                    </span>
                                </td>
                                <td style={styles.td}>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                        {user.is_staff && <span style={styles.badge('#e74c3c')}>👑</span>}
                                        {user.is_premium && <span style={styles.badge('#ffd700')}>⭐</span>}
                                        {user.is_whitelisted && <span style={styles.badge('#9b59b6')}>💎</span>}
                                        {user.has_spotify && <span style={styles.badge('#1db954')}>🎵</span>}
                                        {!user.is_staff && !user.is_premium && !user.is_whitelisted && <span style={styles.badge('#6b7280')}>Free</span>}
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                        <button style={styles.actionBtn('#5865f2')} onClick={() => setSelectedUser(user)} title="Görüntüle">
                                            <FaEye />
                                        </button>
                                        <button style={styles.actionBtn('#f0b132')} onClick={() => openEditUserModal(user)} title="Düzenle">
                                            <FaEdit />
                                        </button>
                                        <button style={styles.actionBtn('#f59e0b')} onClick={() => setPasswordResetModal(user)} title="Şifre Değiştir">
                                            <FaKey />
                                        </button>
                                        {user.is_active !== false ? (
                                            <button style={styles.actionBtn('#e74c3c')} onClick={() => setActionModal({ type: 'ban', user })} title="Yasakla">
                                                <FaBan />
                                            </button>
                                        ) : (
                                            <button style={styles.actionBtn('#23a559')} onClick={() => handleUserAction('unban', user.id)} title="Yasağı Kaldır">
                                                <FaCheckCircle />
                                            </button>
                                        )}
                                        <button style={styles.actionBtn('#dc2626')} onClick={() => setActionModal({ type: 'delete', user })} title="Sil">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                    style={{ ...styles.actionBtn('#3d3f44'), opacity: currentPage === 1 ? 0.5 : 1 }}
                >
                    ◀ Önceki
                </button>
                <span style={{ color: '#fff', padding: '6px 12px' }}>
                    Sayfa {currentPage} / {totalPages}
                </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                    style={{ ...styles.actionBtn('#3d3f44'), opacity: currentPage === totalPages ? 0.5 : 1 }}
                >
                    Sonraki ▶
                </button>
            </div>
        </div>
    );

    // 🏠 Servers
    const renderServers = () => (
        <div>
            <h2 style={{ color: '#fff', marginBottom: '16px', fontSize: '18px' }}>🏠 Sunucu Yönetimi</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
                {servers.map(server => (
                    <div key={server.id} style={{ ...styles.statCard, position: 'relative' }}>
                        {server.is_verified && (
                            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                <span style={styles.badge('#23a559')}>✓ Onaylı</span>
                            </div>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                            <div style={{
                                width: '48px', height: '48px', borderRadius: '12px',
                                background: `linear-gradient(135deg, hsl(${server.id * 50}, 60%, 45%), hsl(${server.id * 50 + 40}, 60%, 35%))`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#fff', fontWeight: '700', fontSize: '18px'
                            }}>
                                {server.name?.charAt(0)}
                            </div>
                            <div>
                                <div style={{ fontWeight: '600', color: '#fff', fontSize: '14px' }}>{server.name}</div>
                                <div style={{ fontSize: '11px', color: '#6b7280' }}>Sahip: {server.owner}</div>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '14px' }}>
                            <div style={styles.miniCard}>
                                <div style={{ fontSize: '16px', fontWeight: '700', color: '#5865f2' }}>{server.members}</div>
                                <div style={{ fontSize: '9px', color: '#6b7280' }}>Üye</div>
                            </div>
                            <div style={styles.miniCard}>
                                <div style={{ fontSize: '16px', fontWeight: '700', color: '#23a559' }}>{server.channels}</div>
                                <div style={{ fontSize: '9px', color: '#6b7280' }}>Kanal</div>
                            </div>
                            <div style={styles.miniCard}>
                                <div style={{ fontSize: '16px', fontWeight: '700', color: '#9b59b6' }}>{server.voice_channels}</div>
                                <div style={{ fontSize: '9px', color: '#6b7280' }}>Ses</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            <button style={{ ...styles.actionBtn('#5865f2'), flex: 1, padding: '8px' }} onClick={() => handleServerDetails(server)}>
                                <FaEye /> Görüntüle
                            </button>
                            <button style={{ ...styles.actionBtn('#e74c3c'), flex: 1, padding: '8px' }} onClick={() => setDeleteConfirm({ type: 'server', id: server.id, name: server.name })}>
                                <FaTrash /> Sil
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

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

    const renderLogs = () => (
        <div>
            {/* Header & Filters */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <h2 style={{ color: '#fff', margin: 0, fontSize: '18px' }}>📋 Gelişmiş Sistem Logları</h2>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <select
                        value={logType}
                        onChange={(e) => setLogType(e.target.value)}
                        style={{ ...styles.searchInput, width: '120px' }}
                    >
                        <option value="all">🔄 Tümü</option>
                        <option value="audit">📝 Audit</option>
                        <option value="login">🔐 Login</option>
                        <option value="error">❌ Error</option>
                        <option value="security">🛡️ Security</option>
                        <option value="moderation">⚖️ Moderation</option>
                        <option value="api">🌐 API</option>
                    </select>
                    <select
                        value={logSeverity}
                        onChange={(e) => setLogSeverity(e.target.value)}
                        style={{ ...styles.searchInput, width: '100px' }}
                    >
                        <option value="">Severity</option>
                        <option value="info">ℹ️ Info</option>
                        <option value="warning">⚠️ Warning</option>
                        <option value="error">🔴 Error</option>
                        <option value="critical">💀 Critical</option>
                    </select>
                    <input
                        type="text"
                        placeholder="🔍 Ara..."
                        value={logSearch}
                        onChange={(e) => setLogSearch(e.target.value)}
                        style={{ ...styles.searchInput, width: '150px' }}
                    />
                    <button onClick={fetchSystemLogs} style={styles.actionBtn('#5865f2')} disabled={logLoading}>
                        <FaSync className={logLoading ? 'spin' : ''} /> Yenile
                    </button>
                    <div style={{ position: 'relative' }}>
                        <button style={styles.actionBtn('#23a559')} onClick={() => handleExportLogs('csv')}>
                            <FaDownload /> CSV
                        </button>
                    </div>
                    <button style={styles.actionBtn('#f0b132')} onClick={() => handleExportLogs('json')}>
                        <FaCode /> JSON
                    </button>
                </div>
            </div>

            {/* Date Range Filters */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', alignItems: 'center' }}>
                <span style={{ color: '#a0a0a0', fontSize: '12px' }}>📅 Tarih:</span>
                <input
                    type="date"
                    value={logDateFrom}
                    onChange={(e) => setLogDateFrom(e.target.value)}
                    style={{ ...styles.searchInput, width: '140px' }}
                />
                <span style={{ color: '#666' }}>→</span>
                <input
                    type="date"
                    value={logDateTo}
                    onChange={(e) => setLogDateTo(e.target.value)}
                    style={{ ...styles.searchInput, width: '140px' }}
                />
                {(logDateFrom || logDateTo) && (
                    <button
                        onClick={() => { setLogDateFrom(''); setLogDateTo(''); }}
                        style={{ ...styles.actionBtn('#e74c3c'), padding: '4px 8px' }}
                    >
                        ✕ Temizle
                    </button>
                )}
            </div>

            {/* Stats Cards */}
            {logStats && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px', marginBottom: '16px' }}>
                    {[
                        { label: 'Audit', count: logStats.audit_count, color: '#5865f2', icon: '📝' },
                        { label: 'Login', count: logStats.login_count, color: '#23a559', icon: '🔐' },
                        { label: 'Errors', count: logStats.error_count, color: '#e74c3c', icon: '❌' },
                        { label: 'Security', count: logStats.security_count, color: '#f0b132', icon: '🛡️' },
                        { label: 'Moderation', count: logStats.moderation_count, color: '#9b59b6', icon: '⚖️' },
                        { label: 'API', count: logStats.api_count, color: '#3498db', icon: '🌐' },
                    ].map((stat, idx) => (
                        <div key={idx} style={{
                            backgroundColor: '#1a1a1e', borderRadius: '8px', padding: '10px',
                            textAlign: 'center', border: `1px solid ${stat.color}30`
                        }}>
                            <div style={{ fontSize: '20px', marginBottom: '4px' }}>{stat.icon}</div>
                            <div style={{ color: stat.color, fontWeight: '700', fontSize: '18px' }}>
                                {(stat.count || 0).toLocaleString()}
                            </div>
                            <div style={{ color: '#888', fontSize: '11px' }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* Logs Table */}
            <div style={{
                backgroundColor: '#0a0a0c', borderRadius: '10px',
                fontFamily: 'JetBrains Mono, Consolas, monospace', maxHeight: '450px',
                overflowY: 'auto', border: '1px solid #1f2023'
            }}>
                {logLoading ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                        <FaSync className="spin" style={{ fontSize: '24px', marginBottom: '10px' }} />
                        <div>Loading logs...</div>
                    </div>
                ) : systemLogs.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                        📭 No logs found
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ position: 'sticky', top: 0, backgroundColor: '#0a0a0c' }}>
                            <tr>
                                <th style={{ ...styles.th, width: '150px' }}>Zaman</th>
                                <th style={{ ...styles.th, width: '80px' }}>Tip</th>
                                <th style={{ ...styles.th, width: '70px' }}>Severity</th>
                                <th style={{ ...styles.th, width: '120px' }}>Actor</th>
                                <th style={styles.th}>Action / Details</th>
                                <th style={{ ...styles.th, width: '120px' }}>IP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {systemLogs.map((log, idx) => (
                                <tr key={log.id || idx} style={{ borderBottom: '1px solid #1a1a1e' }}>
                                    <td style={{ ...styles.td, color: '#666', fontSize: '11px' }}>
                                        {new Date(log.timestamp).toLocaleString('tr-TR')}
                                    </td>
                                    <td style={styles.td}>
                                        <span style={{
                                            padding: '2px 6px', borderRadius: '4px', fontSize: '10px',
                                            backgroundColor:
                                                log.type === 'error' ? '#f8514920' :
                                                    log.type === 'security' ? '#f0b13220' :
                                                        log.type === 'login' ? '#23a55920' :
                                                            log.type === 'moderation' ? '#9b59b620' :
                                                                log.type === 'api' ? '#3498db20' : '#5865f220',
                                            color:
                                                log.type === 'error' ? '#f85149' :
                                                    log.type === 'security' ? '#f0b132' :
                                                        log.type === 'login' ? '#23a559' :
                                                            log.type === 'moderation' ? '#9b59b6' :
                                                                log.type === 'api' ? '#3498db' : '#5865f2'
                                        }}>
                                            {log.type}
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        <span style={{
                                            padding: '2px 6px', borderRadius: '4px', fontSize: '10px',
                                            backgroundColor:
                                                log.severity === 'error' || log.severity === 'critical' ? '#f8514920' :
                                                    log.severity === 'warning' ? '#d2992220' : '#23a55920',
                                            color:
                                                log.severity === 'error' || log.severity === 'critical' ? '#f85149' :
                                                    log.severity === 'warning' ? '#d29922' : '#3fb950'
                                        }}>
                                            {log.severity}
                                        </span>
                                    </td>
                                    <td style={{ ...styles.td, fontSize: '12px' }}>
                                        <span
                                            style={{ color: '#58a6ff', cursor: 'pointer' }}
                                            onClick={() => log.actor !== 'System' && log.actor !== 'Anonymous' && log.actor !== 'AutoMod' && fetchUserActivity(log.actor)}
                                        >
                                            {log.actor || 'System'}
                                        </span>
                                    </td>
                                    <td style={{ ...styles.td, fontSize: '11px' }}>
                                        <div style={{ color: '#e5e7eb' }}>{log.action}</div>
                                        {log.details && typeof log.details === 'object' && (
                                            <div style={{ color: '#666', fontSize: '10px', marginTop: '2px' }}>
                                                {Object.entries(log.details).slice(0, 3).map(([k, v]) => (
                                                    <span key={k} style={{ marginRight: '8px' }}>
                                                        {k}: {typeof v === 'object' ? JSON.stringify(v).slice(0, 30) : String(v).slice(0, 30)}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </td>
                                    <td style={{ ...styles.td, color: '#888', fontSize: '11px' }}>
                                        {log.ip_address || '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* User Activity Modal */}
            {userActivityModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', zIndex: 9999
                }}>
                    <div style={{
                        backgroundColor: '#1a1a1e', borderRadius: '12px', padding: '20px',
                        maxWidth: '700px', width: '90%', maxHeight: '80vh', overflow: 'auto'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3 style={{ color: '#fff', margin: 0 }}>
                                👤 {userActivityModal.user?.username}'s Activity Timeline
                            </h3>
                            <button onClick={() => setUserActivityModal(null)} style={styles.actionBtn('#e74c3c')}>
                                <FaTimes />
                            </button>
                        </div>

                        {/* User Info */}
                        <div style={{ backgroundColor: '#0a0a0c', borderRadius: '8px', padding: '12px', marginBottom: '16px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                                <div><span style={{ color: '#888' }}>Email:</span> <span style={{ color: '#fff' }}>{userActivityModal.user?.email}</span></div>
                                <div><span style={{ color: '#888' }}>Joined:</span> <span style={{ color: '#fff' }}>{new Date(userActivityModal.user?.date_joined).toLocaleDateString()}</span></div>
                                <div><span style={{ color: '#888' }}>Last Login:</span> <span style={{ color: '#fff' }}>{userActivityModal.user?.last_login ? new Date(userActivityModal.user.last_login).toLocaleString() : 'Never'}</span></div>
                            </div>
                        </div>

                        {/* Activities */}
                        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {userActivityModal.activities?.map((activity, idx) => (
                                <div key={idx} style={{
                                    display: 'flex', gap: '12px', padding: '10px',
                                    borderBottom: '1px solid #2a2a2e'
                                }}>
                                    <div style={{
                                        width: '30px', height: '30px', borderRadius: '50%',
                                        backgroundColor:
                                            activity.type === 'login' ? '#23a55930' :
                                                activity.type === 'message' ? '#5865f230' :
                                                    activity.type === 'moderation' ? '#e74c3c30' : '#f0b13230',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        {activity.type === 'login' ? '🔐' :
                                            activity.type === 'message' ? '💬' :
                                                activity.type === 'moderation' ? '⚖️' :
                                                    activity.type === 'server' ? '🏠' : '📝'}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ color: '#fff', fontSize: '13px' }}>{activity.action}</div>
                                        <div style={{ color: '#888', fontSize: '11px' }}>
                                            {new Date(activity.timestamp).toLocaleString()}
                                        </div>
                                        {activity.details && (
                                            <div style={{ color: '#666', fontSize: '11px', marginTop: '4px' }}>
                                                {JSON.stringify(activity.details).slice(0, 100)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    // 🛡️ Moderation
    const renderModeration = () => (
        <div>
            <h2 style={{ color: '#fff', marginBottom: '16px', fontSize: '18px' }}>🛡️ Moderasyon Merkezi</h2>

            {/* Quick Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
                {[
                    { icon: <FaShieldAlt />, title: 'Mod Araçları', color: '#e74c3c', action: onOpenModTools },
                    { icon: <FaFlag />, title: 'Raporlar', color: '#f0b132', badge: '3', action: onOpenReports },
                    { icon: <FaHistory />, title: 'Denetim Log', color: '#5865f2', action: onOpenAuditLogs },
                    { icon: <FaBan />, title: 'Ban Listesi', color: '#9b59b6', badge: bannedUsers.length.toString() },
                ].map((item, idx) => (
                    <div key={idx} style={{ ...styles.statCard, cursor: 'pointer' }} onClick={() => { item.action?.(); }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ fontSize: '24px', color: item.color }}>{item.icon}</div>
                            <div>
                                <div style={{ color: '#fff', fontWeight: '600', fontSize: '13px' }}>{item.title}</div>
                                {item.badge && <span style={styles.badge(item.color)}>{item.badge}</span>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Banned Users */}
            <div style={styles.statCard}>
                <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '14px', fontSize: '14px' }}>🚫 Yasaklı Kullanıcılar</h3>
                <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Kullanıcı</th>
                                <th style={styles.th}>Sebep</th>
                                <th style={styles.th}>Tarih</th>
                                <th style={styles.th}>Yasaklayan</th>
                                <th style={styles.th}>İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bannedUsers.map(user => (
                                <tr key={user.id}>
                                    <td style={styles.td}>{user.username}</td>
                                    <td style={styles.td}>{user.reason}</td>
                                    <td style={styles.td}>{user.banned_at}</td>
                                    <td style={styles.td}>{user.banned_by}</td>
                                    <td style={styles.td}>
                                        <button style={styles.actionBtn('#23a559')} onClick={() => handleUserAction('unban', user.id)}>
                                            <FaUnlock /> Kaldır
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    // 🗄️ Database
    const renderDatabase = () => (
        <div>
            <h2 style={{ color: '#fff', marginBottom: '16px', fontSize: '18px' }}>🗄️ Veritabanı Yönetimi</h2>

            {/* DB Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
                {dbStats && Object.entries(dbStats).filter(([k]) => k !== 'total_size').map(([key, val], idx) => (
                    <div key={idx} style={styles.statCard}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ color: '#fff', fontWeight: '600', fontSize: '14px', textTransform: 'capitalize' }}>{key.replace('_', ' ')}</div>
                                <div style={{ color: '#6b7280', fontSize: '11px' }}>{val.size}</div>
                            </div>
                            <div style={{ fontSize: '24px', fontWeight: '700', color: '#5865f2' }}>{val.count?.toLocaleString()}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Total & Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
                <div style={{ ...styles.statCard, textAlign: 'center' }}>
                    <FaDatabase size={40} color="#5865f2" />
                    <div style={{ fontSize: '28px', fontWeight: '700', color: '#fff', marginTop: '10px' }}>
                        {dbStats?.total_size || '---'}
                    </div>
                    <div style={{ color: '#6b7280', fontSize: '12px' }}>Toplam Boyut</div>
                </div>
                <div style={styles.statCard}>
                    <h3 style={{ color: '#fff', marginTop: 0, fontSize: '14px' }}>🔧 Veritabanı İşlemleri</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginTop: '14px' }}>
                        <button onClick={handleBackup} style={{ ...styles.actionBtn('#5865f2'), padding: '12px' }}>
                            <FaCloudUploadAlt /> Yedekle
                        </button>
                        <button style={{ ...styles.actionBtn('#23a559'), padding: '12px' }} onClick={() => toast.info('📦 Geri yükleme özelliği yakında!')}>
                            <FaCloudDownloadAlt /> Geri Yükle
                        </button>
                        <button onClick={handleClearCache} style={{ ...styles.actionBtn('#f0b132'), padding: '12px' }}>
                            <FaBroom /> Cache Temizle
                        </button>
                        <button style={{ ...styles.actionBtn('#e74c3c'), padding: '12px' }} onClick={handleDeleteOldLogs}>
                            <MdDelete /> Eski Logları Sil
                        </button>
                    </div>
                    {backupStatus && (
                        <div style={{
                            marginTop: '12px', padding: '10px', borderRadius: '6px',
                            backgroundColor: backupStatus === 'success' ? '#23a55920' : backupStatus === 'error' ? '#e74c3c20' : '#5865f220',
                            color: backupStatus === 'success' ? '#23a559' : backupStatus === 'error' ? '#e74c3c' : '#5865f2'
                        }}>
                            {backupStatus === 'running' && '⏳ Yedekleme devam ediyor...'}
                            {backupStatus === 'success' && '✅ Yedekleme tamamlandı!'}
                            {backupStatus === 'error' && '❌ Yedekleme başarısız!'}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    // 💚 System Health
    const renderSystemHealth = () => (
        <div>
            <h2 style={{ color: '#fff', marginBottom: '16px', fontSize: '18px' }}>💚 Sistem Sağlığı</h2>

            {/* Health Bars */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
                {[
                    { label: 'CPU', value: systemHealth?.cpu || 0, color: '#23a559' },
                    { label: 'Bellek', value: systemHealth?.memory || 0, color: '#5865f2' },
                    { label: 'Disk', value: systemHealth?.disk || 0, color: '#f0b132' },
                ].map((item, idx) => (
                    <div key={idx} style={styles.statCard}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ color: '#fff', fontWeight: '600', fontSize: '13px' }}>{item.label}</span>
                            <span style={{ color: item.value > 80 ? '#e74c3c' : item.color, fontWeight: '700' }}>{item.value}%</span>
                        </div>
                        <div style={{ width: '100%', height: '8px', backgroundColor: '#2a2a2e', borderRadius: '4px' }}>
                            <div style={{
                                width: `${item.value}%`, height: '100%', borderRadius: '4px',
                                backgroundColor: item.value > 80 ? '#e74c3c' : item.color,
                                transition: 'width 0.5s'
                            }} />
                        </div>
                    </div>
                ))}
            </div>

            {/* System Info */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
                {[
                    { label: 'Uptime', value: systemHealth?.uptime, icon: <FaClock color="#5865f2" /> },
                    { label: 'Bağlantı', value: systemHealth?.activeConnections, icon: <FaWifi color="#23a559" /> },
                    { label: 'İstek/dk', value: systemHealth?.requestsPerMinute, icon: <FaChartLine color="#f0b132" /> },
                    { label: 'DB Bağlantı', value: systemHealth?.dbConnections, icon: <FaDatabase color="#9b59b6" /> },
                    { label: 'Cache Hit', value: `${systemHealth?.cacheHitRate}%`, icon: <FaMemory color="#e74c3c" /> },
                ].map((item, idx) => (
                    <div key={idx} style={{ ...styles.statCard, textAlign: 'center' }}>
                        <div style={{ marginBottom: '8px' }}>{item.icon}</div>
                        <div style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>{item.value || '---'}</div>
                        <div style={{ fontSize: '10px', color: '#6b7280' }}>{item.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );

    // 🔒 Security
    const renderSecurity = () => (
        <div>
            <h2 style={{ color: '#fff', marginBottom: '16px', fontSize: '18px' }}>🔒 Güvenlik Merkezi</h2>

            <div style={{
                ...styles.statCard, marginBottom: '16px',
                background: maintenanceMode ? 'linear-gradient(135deg, #f0b13220, #e74c3c20)' : 'linear-gradient(135deg, #23a55920, #5865f220)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <FaCheckCircle size={24} color={maintenanceMode ? '#f0b132' : '#23a559'} />
                        <div>
                            <div style={{ color: maintenanceMode ? '#f0b132' : '#23a559', fontWeight: '600' }}>
                                {maintenanceMode ? '🔧 Bakım Modu Aktif' : '✅ Sistem Güvenli'}
                            </div>
                            <div style={{ color: '#6b7280', fontSize: '12px' }}>Son tarama: 5 dakika önce</div>
                        </div>
                    </div>
                    <button onClick={toggleMaintenance} style={styles.actionBtn(maintenanceMode ? '#23a559' : '#f0b132')}>
                        {maintenanceMode ? <FaUnlock /> : <FaLock />} {maintenanceMode ? 'Kapat' : 'Bakım Modu'}
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {[
                    { label: 'Giriş Denemesi', value: '247', sub: 'Son 24 saat', color: '#5865f2' },
                    { label: 'Başarısız Giriş', value: '12', sub: 'Son 24 saat', color: '#f0b132' },
                    { label: 'Engellenen IP', value: '15', sub: 'Aktif', color: '#e74c3c' },
                ].map((item, idx) => (
                    <div key={idx} style={styles.statCard}>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: item.color }}>{item.value}</div>
                        <div style={{ color: '#fff', fontSize: '13px', fontWeight: '600' }}>{item.label}</div>
                        <div style={{ color: '#6b7280', fontSize: '11px' }}>{item.sub}</div>
                    </div>
                ))}
            </div>
        </div>
    );

    // 📢 Broadcast
    const renderBroadcast = () => (
        <div>
            <h2 style={{ color: '#fff', marginBottom: '16px', fontSize: '18px' }}>📢 Duyuru Merkezi</h2>

            <div style={styles.statCard}>
                <h3 style={{ color: '#fff', marginTop: 0, fontSize: '14px' }}>Yeni Duyuru</h3>
                <textarea
                    value={announceText}
                    onChange={(e) => setAnnounceText(e.target.value)}
                    placeholder="Tüm kullanıcılara göndermek istediğiniz mesajı yazın..."
                    style={{
                        width: '100%', minHeight: '120px', padding: '12px',
                        backgroundColor: '#111113', border: '1px solid #2a2a2e',
                        borderRadius: '8px', color: '#fff', fontSize: '14px',
                        resize: 'vertical', outline: 'none', marginBottom: '12px'
                    }}
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={handleBroadcast} style={{ ...styles.actionBtn('#5865f2'), padding: '10px 20px' }}>
                        <FaPaperPlane /> Gönder
                    </button>
                    <button style={{ ...styles.actionBtn('#6b7280'), padding: '10px 20px' }} onClick={() => toast.info('⏰ Zamanlı duyuru özelliği yakında!')}>
                        <FaClock /> Zamanla
                    </button>
                </div>
            </div>
        </div>
    );

    // 🔧 Tools
    const renderTools = () => (
        <div>
            <h2 style={{ color: '#fff', marginBottom: '16px', fontSize: '18px' }}>🔧 Admin Araçları</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {[
                    { icon: <FaCloudUploadAlt />, title: 'Yedekleme', desc: 'Veritabanı yedekle', color: '#5865f2', action: handleBackup },
                    { icon: <FaBroom />, title: 'Cache Temizle', desc: 'Önbellek temizle', color: '#f0b132', action: handleClearCache },
                    { icon: <FaSync />, title: 'Yeniden Başlat', desc: 'Servisleri yeniden başlat', color: '#e74c3c', action: () => toast.info('🔄 Bu özellik güvenlik nedeniyle sunucu üzerinden yapılmalıdır') },
                    { icon: <FaTerminal />, title: 'Konsol', desc: 'Admin konsolu', color: '#23a559', action: () => toast.info('🖥️ Konsol erişimi SSH üzerinden yapılmalıdır') },
                    { icon: <FaBug />, title: 'Debug Modu', desc: 'Hata ayıklama', color: '#9b59b6', action: () => toast.info('🐛 Debug modu güvenlik nedeniyle devre dışı') },
                    { icon: <FaFileExport />, title: 'Export', desc: 'Veri dışa aktar', color: '#1abc9c', action: handleBackup },
                ].map((item, idx) => (
                    <div key={idx} style={{ ...styles.statCard, cursor: 'pointer' }} onClick={item.action}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ fontSize: '24px', color: item.color }}>{item.icon}</div>
                            <div>
                                <div style={{ color: '#fff', fontWeight: '600', fontSize: '13px' }}>{item.title}</div>
                                <div style={{ color: '#6b7280', fontSize: '11px' }}>{item.desc}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // ⚡ Quick Actions
    const renderQuickActions = () => (
        <div>
            <h2 style={{ color: '#fff', marginBottom: '16px', fontSize: '18px' }}>⚡ Hızlı İşlemler</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
                {[
                    { icon: '📊', title: 'Analytics', desc: 'İstatistikleri görüntüle', color: '#f0b132', action: onOpenAnalytics },
                    { icon: '🪝', title: 'Webhooks', desc: 'Webhook ayarları', color: '#9b59b6', action: onOpenWebhooks },
                    { icon: '🤖', title: 'Oto Yanıtlayıcı', desc: 'Otomatik yanıtlar', color: '#5865f2', action: onOpenAutoResponder },
                    { icon: '🔗', title: 'Vanity URL', desc: 'Özel URL\'ler', color: '#1abc9c', action: onOpenVanityURL },
                ].map((item, idx) => (
                    <div
                        key={idx}
                        onClick={() => { item.action?.(); onClose(); }}
                        style={{ ...styles.statCard, cursor: 'pointer', borderLeft: `4px solid ${item.color}` }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <div style={{ fontSize: '28px' }}>{item.icon}</div>
                            <div>
                                <div style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>{item.title}</div>
                                <div style={{ color: '#6b7280', fontSize: '11px' }}>{item.desc}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return renderDashboard();
            case 'users': return renderUsers();
            case 'servers': return renderServers();
            case 'logs': return renderLogs();
            case 'moderation': return renderModeration();
            case 'database': return renderDatabase();
            case 'system': return renderSystemHealth();
            case 'security': return renderSecurity();
            case 'broadcast': return renderBroadcast();
            case 'tools': return renderTools();
            case 'quickActions': return renderQuickActions();
            default: return renderDashboard();
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

                {/* User Detail Modal */}
                {selectedUser && (
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex',
                        justifyContent: 'center', alignItems: 'center', zIndex: 10
                    }} onClick={() => setSelectedUser(null)}>
                        <div style={{
                            backgroundColor: '#1a1a1e', borderRadius: '12px',
                            padding: '24px', width: '550px', maxHeight: '80vh', overflowY: 'auto',
                            border: '1px solid #2a2a2e'
                        }} onClick={e => e.stopPropagation()}>
                            {/* Header */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                                <div style={{
                                    width: '64px', height: '64px', borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #5865f2, #7c3aed)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#fff', fontWeight: '700', fontSize: '24px'
                                }}>
                                    {selectedUser.username?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 style={{ color: '#fff', margin: 0, fontSize: '20px' }}>{selectedUser.username}</h3>
                                    <div style={{ color: '#6b7280', fontSize: '13px' }}>{selectedUser.email}</div>
                                    <div style={{ color: '#5865f2', fontSize: '14px', fontFamily: 'monospace', marginTop: '4px' }}>
                                        🎫 #{selectedUser.friend_code || 'N/A'}
                                    </div>
                                </div>
                                <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                    {selectedUser.is_staff && <span style={styles.badge('#e74c3c')}>👑 Admin</span>}
                                    {selectedUser.is_premium && <span style={styles.badge('#ffd700')}>⭐ Premium</span>}
                                    {selectedUser.is_whitelisted && <span style={styles.badge('#9b59b6')}>💎 Whitelist</span>}
                                    {selectedUser.has_spotify && <span style={styles.badge('#1db954')}>🎵 Spotify</span>}
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div style={{
                                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px',
                                padding: '16px', backgroundColor: '#2a2a2e', borderRadius: '10px'
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#23a559' }}>{selectedUser.level || 1}</div>
                                    <div style={{ fontSize: '11px', color: '#6b7280' }}>Seviye</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#5865f2' }}>{(selectedUser.xp || 0).toLocaleString()}</div>
                                    <div style={{ fontSize: '11px', color: '#6b7280' }}>XP</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#ffd700' }}>{(selectedUser.coins || 0).toLocaleString()}</div>
                                    <div style={{ fontSize: '11px', color: '#6b7280' }}>Coin</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#f0b132' }}>{(selectedUser.total_messages || 0).toLocaleString()}</div>
                                    <div style={{ fontSize: '11px', color: '#6b7280' }}>Mesaj</div>
                                </div>
                            </div>

                            {/* Detail Grid */}
                            <div style={{
                                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px',
                                fontSize: '13px'
                            }}>
                                <div style={{ padding: '10px', backgroundColor: '#2a2a2e', borderRadius: '8px' }}>
                                    <span style={{ color: '#6b7280' }}>🆔 ID:</span>
                                    <span style={{ color: '#fff', marginLeft: '8px' }}>{selectedUser.id}</span>
                                </div>
                                <div style={{ padding: '10px', backgroundColor: '#2a2a2e', borderRadius: '8px' }}>
                                    <span style={{ color: '#6b7280' }}>📅 Kayıt:</span>
                                    <span style={{ color: '#fff', marginLeft: '8px' }}>{selectedUser.created?.split('T')[0]}</span>
                                </div>
                                <div style={{ padding: '10px', backgroundColor: '#2a2a2e', borderRadius: '8px' }}>
                                    <span style={{ color: '#6b7280' }}>🏠 Sunucu:</span>
                                    <span style={{ color: '#fff', marginLeft: '8px' }}>{selectedUser.servers_joined || 0}</span>
                                </div>
                                <div style={{ padding: '10px', backgroundColor: '#2a2a2e', borderRadius: '8px' }}>
                                    <span style={{ color: '#6b7280' }}>👥 Arkadaş:</span>
                                    <span style={{ color: '#fff', marginLeft: '8px' }}>{selectedUser.friends_count || 0}</span>
                                </div>
                                <div style={{ padding: '10px', backgroundColor: '#2a2a2e', borderRadius: '8px' }}>
                                    <span style={{ color: '#6b7280' }}>🕐 Son Giriş:</span>
                                    <span style={{ color: '#fff', marginLeft: '8px' }}>{selectedUser.last_login?.split('T')[0] || 'N/A'}</span>
                                </div>
                                <div style={{ padding: '10px', backgroundColor: '#2a2a2e', borderRadius: '8px' }}>
                                    <span style={{ color: '#6b7280' }}>👁️ Son Görülme:</span>
                                    <span style={{ color: '#fff', marginLeft: '8px' }}>{selectedUser.last_seen?.split('T')[0] || 'N/A'}</span>
                                </div>
                            </div>

                            {/* Status Message */}
                            {selectedUser.status_message && (
                                <div style={{ padding: '12px', backgroundColor: '#2a2a2e', borderRadius: '8px', marginBottom: '20px' }}>
                                    <div style={{ color: '#6b7280', fontSize: '11px', marginBottom: '4px' }}>📝 Durum Mesajı</div>
                                    <div style={{ color: '#fff', fontSize: '14px' }}>"{selectedUser.status_message}"</div>
                                </div>
                            )}

                            {/* Social Links */}
                            {selectedUser.social_links && Object.keys(selectedUser.social_links).length > 0 && (
                                <div style={{ padding: '12px', backgroundColor: '#2a2a2e', borderRadius: '8px', marginBottom: '20px' }}>
                                    <div style={{ color: '#6b7280', fontSize: '11px', marginBottom: '8px' }}>🔗 Sosyal Bağlantılar</div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {Object.entries(selectedUser.social_links).map(([key, value]) => (
                                            value && <span key={key} style={{ ...styles.badge('#5865f2'), fontSize: '12px' }}>
                                                {key}: {value}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                <button style={styles.actionBtn('#5865f2')} onClick={() => { openEditUserModal(selectedUser); setSelectedUser(null); }}>
                                    <FaEdit /> Düzenle
                                </button>
                                <button style={styles.actionBtn('#f59e0b')} onClick={() => { setPasswordResetModal(selectedUser); setSelectedUser(null); }}>
                                    <FaKey /> Şifre Değiştir
                                </button>
                                <button style={styles.actionBtn('#f0b132')} onClick={() => handleUserAction('warn', selectedUser.id)}>
                                    <FaExclamationTriangle /> Uyar
                                </button>
                                <button style={styles.actionBtn('#8b5cf6')} onClick={() => handleUserAction('reset_2fa', selectedUser.id)}>
                                    <FaLock /> 2FA Sıfırla
                                </button>
                                <button style={styles.actionBtn('#06b6d4')} onClick={() => handleUserAction('verify_email', selectedUser.id)}>
                                    <FaEnvelope /> Email Doğrula
                                </button>
                                <button style={styles.actionBtn('#10b981')} onClick={() => handleUserAction('give_premium', selectedUser.id)}>
                                    <FaStar /> Premium Ver
                                </button>
                                <button style={styles.actionBtn('#ec4899')} onClick={() => handleUserAction('remove_premium', selectedUser.id)}>
                                    <FaStar /> Premium Kaldır
                                </button>
                                <button style={styles.actionBtn('#6366f1')} onClick={() => handleUserAction('force_logout', selectedUser.id)}>
                                    <FaLock /> Oturumu Sonlandır
                                </button>
                                <button style={styles.actionBtn('#f97316')} onClick={() => handleUserAction('reset_avatar', selectedUser.id)}>
                                    <FaImage /> Avatar Sıfırla
                                </button>
                                {selectedUser.is_active !== false ? (
                                    <button style={styles.actionBtn('#e74c3c')} onClick={() => setActionModal({ type: 'ban', user: selectedUser })}>
                                        <FaBan /> Yasakla
                                    </button>
                                ) : (
                                    <button style={styles.actionBtn('#23a559')} onClick={() => handleUserAction('unban', selectedUser.id)}>
                                        <FaCheckCircle /> Yasağı Kaldır
                                    </button>
                                )}
                                <button style={styles.actionBtn('#dc2626')} onClick={() => setActionModal({ type: 'delete', user: selectedUser })}>
                                    <FaTrash /> Kullanıcıyı Sil
                                </button>
                                <button style={{ ...styles.actionBtn('#6b7280'), marginLeft: 'auto' }} onClick={() => setSelectedUser(null)}>
                                    Kapat
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Confirmation */}
                {actionModal && (
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex',
                        justifyContent: 'center', alignItems: 'center', zIndex: 10
                    }} onClick={() => setActionModal(null)}>
                        <div style={{
                            backgroundColor: '#1a1a1e', borderRadius: '12px',
                            padding: '24px', width: '420px', border: '1px solid #2a2a2e'
                        }} onClick={e => e.stopPropagation()}>
                            <h3 style={{ color: actionModal.type === 'delete' ? '#dc2626' : '#f0b132', marginTop: 0 }}>
                                {actionModal.type === 'delete' ? '🗑️ Kullanıcıyı Sil' :
                                    actionModal.type === 'ban' ? '⛔ Kullanıcıyı Yasakla' :
                                        '⚠️ İşlem Onayla'}
                            </h3>
                            <p style={{ color: '#9ca3af', lineHeight: '1.6' }}>
                                <strong style={{ color: '#fff' }}>{actionModal.user?.username}</strong>
                                {actionModal.type === 'delete'
                                    ? ' kullanıcısını kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz! Tüm mesajları, sunucu üyelikleri ve profili silinecektir.'
                                    : actionModal.type === 'ban'
                                        ? ' kullanıcısını yasaklamak istediğinizden emin misiniz? Kullanıcı giriş yapamayacaktır.'
                                        : ' üzerinde bu işlemi yapmak istediğinizden emin misiniz?'
                                }
                            </p>
                            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                                <button
                                    style={styles.actionBtn(actionModal.type === 'delete' ? '#dc2626' : '#e74c3c')}
                                    onClick={() => {
                                        handleUserAction(actionModal.type, actionModal.user?.id);
                                        setSelectedUser(null);
                                    }}
                                >
                                    {actionModal.type === 'delete' ? '🗑️ Kalıcı Olarak Sil' : 'Onayla'}
                                </button>
                                <button style={styles.actionBtn('#6b7280')} onClick={() => setActionModal(null)}>
                                    İptal
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Password Reset Modal */}
                {passwordResetModal && (
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex',
                        justifyContent: 'center', alignItems: 'center', zIndex: 10
                    }} onClick={() => { setPasswordResetModal(null); setNewPassword(''); }}>
                        <div style={{
                            backgroundColor: '#1a1a1e', borderRadius: '12px',
                            padding: '24px', width: '420px', border: '1px solid #2a2a2e'
                        }} onClick={e => e.stopPropagation()}>
                            <h3 style={{ color: '#f59e0b', marginTop: 0 }}>
                                🔑 Şifre Değiştir — {passwordResetModal.username}
                            </h3>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ color: '#9ca3af', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Yeni Şifre</label>
                                <input
                                    type="text"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Yeni şifre girin (min 6 karakter)"
                                    style={{
                                        width: '100%', padding: '10px 14px',
                                        backgroundColor: '#111113', border: '1px solid #2a2a2e',
                                        borderRadius: '8px', color: '#fff', fontSize: '14px',
                                        outline: 'none', boxSizing: 'border-box'
                                    }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    style={{ ...styles.actionBtn('#f59e0b'), opacity: newPassword.length < 6 ? 0.5 : 1 }}
                                    disabled={newPassword.length < 6}
                                    onClick={async () => {
                                        await handleUserAction('reset_password', passwordResetModal.id, { new_password: newPassword });
                                        setPasswordResetModal(null);
                                        setNewPassword('');
                                    }}
                                >
                                    <FaKey /> Şifreyi Değiştir
                                </button>
                                <button style={styles.actionBtn('#6b7280')} onClick={() => { setPasswordResetModal(null); setNewPassword(''); }}>
                                    İptal
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Broadcast Modal */}
                {broadcastModal && (
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex',
                        justifyContent: 'center', alignItems: 'center', zIndex: 10
                    }} onClick={() => setBroadcastModal(false)}>
                        <div style={{
                            backgroundColor: '#1a1a1e', borderRadius: '12px',
                            padding: '24px', width: '500px', border: '1px solid #2a2a2e'
                        }} onClick={e => e.stopPropagation()}>
                            <h3 style={{ color: '#fff', marginTop: 0 }}>📢 Duyuru Gönder</h3>
                            <textarea
                                value={announceText}
                                onChange={(e) => setAnnounceText(e.target.value)}
                                placeholder="Mesajınızı yazın..."
                                style={{
                                    width: '100%', minHeight: '100px', padding: '12px',
                                    backgroundColor: '#111113', border: '1px solid #2a2a2e',
                                    borderRadius: '8px', color: '#fff', fontSize: '14px',
                                    resize: 'vertical', outline: 'none', marginBottom: '12px'
                                }}
                            />
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button style={styles.actionBtn('#5865f2')} onClick={handleBroadcast}>
                                    <FaPaperPlane /> Gönder
                                </button>
                                <button style={styles.actionBtn('#6b7280')} onClick={() => setBroadcastModal(false)}>
                                    İptal
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 🔥 Edit User Modal */}
                {editUserModal && (
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex',
                        justifyContent: 'center', alignItems: 'center', zIndex: 15
                    }} onClick={() => setEditUserModal(null)}>
                        <div style={{
                            backgroundColor: '#1a1a1e', borderRadius: '12px',
                            padding: '24px', width: '600px', maxHeight: '85vh', overflowY: 'auto',
                            border: '1px solid #2a2a2e'
                        }} onClick={e => e.stopPropagation()}>
                            {/* Header */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                                <div style={{
                                    width: '48px', height: '48px', borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #f0b132, #e67e22)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#fff', fontWeight: '700', fontSize: '20px'
                                }}>
                                    <FaEdit />
                                </div>
                                <div>
                                    <h3 style={{ color: '#fff', margin: 0, fontSize: '18px' }}>✏️ Kullanıcı Düzenle</h3>
                                    <div style={{ color: '#6b7280', fontSize: '12px' }}>ID: {editUserModal.id} | {editUserModal.username}</div>
                                </div>
                                <button onClick={() => setEditUserModal(null)} style={{ ...styles.actionBtn('#e74c3c'), marginLeft: 'auto', padding: '8px 12px' }}>
                                    <FaTimes />
                                </button>
                            </div>

                            {/* Form */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                                {/* Username */}
                                <div>
                                    <label style={{ color: '#9ca3af', fontSize: '11px', display: 'block', marginBottom: '4px' }}>👤 Kullanıcı Adı</label>
                                    <input
                                        type="text"
                                        value={editUserForm.username || ''}
                                        onChange={(e) => setEditUserForm(f => ({ ...f, username: e.target.value }))}
                                        style={styles.searchInput}
                                    />
                                </div>
                                {/* Email */}
                                <div>
                                    <label style={{ color: '#9ca3af', fontSize: '11px', display: 'block', marginBottom: '4px' }}>📧 Email</label>
                                    <input
                                        type="email"
                                        value={editUserForm.email || ''}
                                        onChange={(e) => setEditUserForm(f => ({ ...f, email: e.target.value }))}
                                        style={styles.searchInput}
                                    />
                                </div>
                                {/* Coins */}
                                <div>
                                    <label style={{ color: '#9ca3af', fontSize: '11px', display: 'block', marginBottom: '4px' }}>💰 Coin</label>
                                    <input
                                        type="number"
                                        value={editUserForm.coins || 0}
                                        onChange={(e) => setEditUserForm(f => ({ ...f, coins: parseInt(e.target.value) || 0 }))}
                                        style={styles.searchInput}
                                    />
                                </div>
                                {/* Level */}
                                <div>
                                    <label style={{ color: '#9ca3af', fontSize: '11px', display: 'block', marginBottom: '4px' }}>⭐ Seviye</label>
                                    <input
                                        type="number"
                                        value={editUserForm.level || 1}
                                        onChange={(e) => setEditUserForm(f => ({ ...f, level: parseInt(e.target.value) || 1 }))}
                                        style={styles.searchInput}
                                    />
                                </div>
                                {/* XP */}
                                <div>
                                    <label style={{ color: '#9ca3af', fontSize: '11px', display: 'block', marginBottom: '4px' }}>🎮 XP</label>
                                    <input
                                        type="number"
                                        value={editUserForm.xp || 0}
                                        onChange={(e) => setEditUserForm(f => ({ ...f, xp: parseInt(e.target.value) || 0 }))}
                                        style={styles.searchInput}
                                    />
                                </div>
                                {/* Role */}
                                <div>
                                    <label style={{ color: '#9ca3af', fontSize: '11px', display: 'block', marginBottom: '4px' }}>🎭 Rol</label>
                                    <select
                                        value={editUserForm.role || 'member'}
                                        onChange={(e) => setEditUserForm(f => ({ ...f, role: e.target.value }))}
                                        style={styles.searchInput}
                                    >
                                        <option value="member">Üye</option>
                                        <option value="admin">Yönetici</option>
                                    </select>
                                </div>
                                {/* Status Message */}
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <label style={{ color: '#9ca3af', fontSize: '11px', display: 'block', marginBottom: '4px' }}>📝 Durum Mesajı</label>
                                    <input
                                        type="text"
                                        value={editUserForm.status_message || ''}
                                        onChange={(e) => setEditUserForm(f => ({ ...f, status_message: e.target.value }))}
                                        style={styles.searchInput}
                                        placeholder="Durum mesajı..."
                                    />
                                </div>
                            </div>

                            {/* Toggles */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '16px' }}>
                                {[
                                    { key: 'is_active', label: '✅ Aktif', color: '#23a559' },
                                    { key: 'is_staff', label: '👑 Admin', color: '#e74c3c' },
                                    { key: 'is_premium', label: '⭐ Premium', color: '#ffd700' },
                                    { key: 'email_verified', label: '📧 Doğrulanmış', color: '#5865f2' },
                                ].map((toggle) => (
                                    <div
                                        key={toggle.key}
                                        onClick={() => setEditUserForm(f => ({ ...f, [toggle.key]: !f[toggle.key] }))}
                                        style={{
                                            padding: '10px', borderRadius: '8px', cursor: 'pointer', textAlign: 'center',
                                            backgroundColor: editUserForm[toggle.key] ? `${toggle.color}20` : '#2a2a2e',
                                            border: `1px solid ${editUserForm[toggle.key] ? toggle.color : '#3a3a3e'}`,
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <div style={{ fontSize: '12px', fontWeight: '600', color: editUserForm[toggle.key] ? toggle.color : '#6b7280' }}>
                                            {toggle.label}
                                        </div>
                                        <div style={{ fontSize: '10px', color: editUserForm[toggle.key] ? '#fff' : '#6b7280', marginTop: '2px' }}>
                                            {editUserForm[toggle.key] ? 'Açık' : 'Kapalı'}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Buttons */}
                            <div style={{ display: 'flex', gap: '8px', marginTop: '20px', justifyContent: 'flex-end' }}>
                                <button style={{ ...styles.actionBtn('#6b7280'), padding: '10px 20px' }} onClick={() => setEditUserModal(null)}>
                                    İptal
                                </button>
                                <button
                                    style={{ ...styles.actionBtn('#23a559'), padding: '10px 20px', opacity: editUserLoading ? 0.6 : 1 }}
                                    onClick={handleUpdateUser}
                                    disabled={editUserLoading}
                                >
                                    {editUserLoading ? '⏳ Kaydediliyor...' : '💾 Kaydet'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 🔥 Server Detail Modal */}
                {selectedServer && (
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex',
                        justifyContent: 'center', alignItems: 'center', zIndex: 15
                    }} onClick={() => setSelectedServer(null)}>
                        <div style={{
                            backgroundColor: '#1a1a1e', borderRadius: '12px',
                            padding: '24px', width: '600px', maxHeight: '80vh', overflowY: 'auto',
                            border: '1px solid #2a2a2e'
                        }} onClick={e => e.stopPropagation()}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h3 style={{ color: '#fff', margin: 0 }}>🏠 {selectedServer.name}</h3>
                                <button onClick={() => setSelectedServer(null)} style={styles.actionBtn('#e74c3c')}>
                                    <FaTimes />
                                </button>
                            </div>

                            {/* Server Info */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
                                <div style={styles.miniCard}>
                                    <div style={{ fontSize: '20px', fontWeight: '700', color: '#5865f2' }}>{selectedServer.member_count}</div>
                                    <div style={{ fontSize: '10px', color: '#6b7280' }}>Üye</div>
                                </div>
                                <div style={styles.miniCard}>
                                    <div style={{ fontSize: '20px', fontWeight: '700', color: '#23a559' }}>{selectedServer.channel_count}</div>
                                    <div style={{ fontSize: '10px', color: '#6b7280' }}>Kanal</div>
                                </div>
                                <div style={styles.miniCard}>
                                    <div style={{ fontSize: '20px', fontWeight: '700', color: '#f0b132' }}>{selectedServer.owner}</div>
                                    <div style={{ fontSize: '10px', color: '#6b7280' }}>Sahip</div>
                                </div>
                            </div>

                            {/* Members */}
                            <div style={{ marginBottom: '16px' }}>
                                <h4 style={{ color: '#fff', fontSize: '14px', marginBottom: '8px' }}>👥 Üyeler ({selectedServer.members?.length || 0})</h4>
                                <div style={{ maxHeight: '200px', overflowY: 'auto', backgroundColor: '#111113', borderRadius: '8px' }}>
                                    {selectedServer.members?.map((member, idx) => (
                                        <div key={idx} style={{
                                            display: 'flex', justifyContent: 'space-between', padding: '8px 12px',
                                            borderBottom: '1px solid #2a2a2e', fontSize: '12px'
                                        }}>
                                            <span style={{ color: '#fff' }}>{member.username}</span>
                                            <span style={styles.badge(member.role === 'admin' ? '#e74c3c' : '#5865f2')}>{member.role}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Channels */}
                            <div>
                                <h4 style={{ color: '#fff', fontSize: '14px', marginBottom: '8px' }}>📁 Kanallar ({selectedServer.channels?.length || 0})</h4>
                                <div style={{ maxHeight: '200px', overflowY: 'auto', backgroundColor: '#111113', borderRadius: '8px' }}>
                                    {selectedServer.channels?.map((channel, idx) => (
                                        <div key={idx} style={{
                                            display: 'flex', justifyContent: 'space-between', padding: '8px 12px',
                                            borderBottom: '1px solid #2a2a2e', fontSize: '12px'
                                        }}>
                                            <span style={{ color: '#fff' }}>#{channel.name}</span>
                                            <span style={styles.badge('#5865f2')}>{channel.type}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 🔥 Delete Confirmation Modal */}
                {deleteConfirm && (
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex',
                        justifyContent: 'center', alignItems: 'center', zIndex: 20
                    }} onClick={() => setDeleteConfirm(null)}>
                        <div style={{
                            backgroundColor: '#1a1a1e', borderRadius: '12px',
                            padding: '24px', width: '400px', border: '1px solid #e74c3c40'
                        }} onClick={e => e.stopPropagation()}>
                            <h3 style={{ color: '#e74c3c', marginTop: 0 }}>⚠️ Silme Onayı</h3>
                            <p style={{ color: '#9ca3af' }}>
                                <strong style={{ color: '#fff' }}>"{deleteConfirm.name}"</strong> silmek istediğinizden emin misiniz?
                                <br /><span style={{ color: '#e74c3c', fontSize: '12px' }}>Bu işlem geri alınamaz!</span>
                            </p>
                            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                                <button style={{ ...styles.actionBtn('#e74c3c'), padding: '10px 20px' }}
                                    onClick={() => {
                                        if (deleteConfirm.type === 'server') handleServerDelete(deleteConfirm.id, deleteConfirm.name);
                                    }}>
                                    🗑️ Sil
                                </button>
                                <button style={{ ...styles.actionBtn('#6b7280'), padding: '10px 20px' }} onClick={() => setDeleteConfirm(null)}>
                                    İptal
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanelModal;
