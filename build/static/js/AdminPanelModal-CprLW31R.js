var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { c as FaSync, aZ as FaPaperPlane, u as FaUsers, ax as FaGlobe, y as FaServer, ba as FaComment, a1 as FaShieldAlt, ah as FaCrown, d as FaExclamationTriangle, aw as FaImage, bb as FaVideo, E as FaMicrophone, bc as FaFile, t as FaSearch, bd as FaFileExport, a0 as FaEye, at as FaEdit, a2 as FaKey, ay as FaBan, w as FaCheckCircle, g as FaTrash, a5 as FaDownload, q as FaCode, a as FaTimes, be as FaFlag, aB as FaHistory, bf as FaUnlock, bg as FaDatabase, bh as FaCloudUploadAlt, bi as FaCloudDownloadAlt, s as FaBroom, bj as MdDelete, z as FaClock, b as FaWifi, O as FaChartLine, bk as FaMemory, h as FaLock, b6 as FaTerminal, U as FaBug, _ as FaEnvelope, Q as FaStar, b9 as FaUserShield, bl as FaBook, bm as MdStorage, bn as MdSecurity, F as FaTools, az as FaCog } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.92)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999999,
    backdropFilter: "blur(8px)"
  },
  modal: {
    width: "96%",
    maxWidth: "1600px",
    height: "94vh",
    backgroundColor: "#0f0f10",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 25px 80px rgba(0, 0, 0, 0.8)",
    overflow: "hidden",
    border: "1px solid #1f2023"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 24px",
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    borderBottom: "1px solid #2d2f34"
  },
  headerLeft: { display: "flex", alignItems: "center", gap: "12px" },
  title: { color: "#fff", fontSize: "18px", fontWeight: "700", margin: 0 },
  closeButton: {
    background: "rgba(255,255,255,0.1)",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "18px"
  },
  body: { display: "flex", flex: 1, overflow: "hidden" },
  sidebar: {
    width: "200px",
    backgroundColor: "#0d0d0f",
    padding: "10px 8px",
    overflowY: "auto",
    borderRight: "1px solid #1f2023"
  },
  sidebarButton: /* @__PURE__ */ __name((active) => ({
    width: "100%",
    padding: "10px 12px",
    background: active ? "linear-gradient(135deg, #5865f2 0%, #7c3aed 100%)" : "transparent",
    border: "none",
    borderRadius: "8px",
    color: active ? "#fff" : "#8b8d91",
    cursor: "pointer",
    fontWeight: active ? "600" : "500",
    fontSize: "12px",
    textAlign: "left",
    transition: "all 0.15s",
    marginBottom: "3px",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  }), "sidebarButton"),
  content: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
    backgroundColor: "#111113"
  },
  statCard: {
    backgroundColor: "#1a1a1e",
    borderRadius: "12px",
    padding: "16px",
    border: "1px solid #2a2a2e"
  },
  statValue: { fontSize: "28px", fontWeight: "700", color: "#fff" },
  statLabel: { fontSize: "11px", color: "#8b8d91", textTransform: "uppercase", letterSpacing: "0.5px" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    padding: "12px",
    textAlign: "left",
    backgroundColor: "#0d0d0f",
    color: "#8b8d91",
    fontWeight: "600",
    fontSize: "11px",
    textTransform: "uppercase",
    borderBottom: "1px solid #2a2a2e"
  },
  td: { padding: "12px", color: "#e5e7eb", fontSize: "13px", borderBottom: "1px solid #1f2023" },
  actionBtn: /* @__PURE__ */ __name((color) => ({
    padding: "6px 10px",
    backgroundColor: color,
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "11px",
    fontWeight: "500",
    marginRight: "4px"
  }), "actionBtn"),
  searchInput: {
    flex: 1,
    padding: "10px 14px",
    backgroundColor: "#1a1a1e",
    border: "1px solid #2a2a2e",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "13px",
    outline: "none"
  },
  badge: /* @__PURE__ */ __name((color) => ({
    display: "inline-block",
    padding: "3px 8px",
    borderRadius: "12px",
    fontSize: "10px",
    fontWeight: "600",
    backgroundColor: `${color}20`,
    color
  }), "badge"),
  miniCard: {
    backgroundColor: "#1a1a1e",
    borderRadius: "8px",
    padding: "12px",
    border: "1px solid #2a2a2e",
    textAlign: "center"
  }
};
const useAdminFetch = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl }) => {
  const [loading, setLoading] = reactExports.useState(false);
  const [stats, setStats] = reactExports.useState(null);
  const [detailedStats, setDetailedStats] = reactExports.useState(null);
  const [liveActivities, setLiveActivities] = reactExports.useState([]);
  const [securityAlerts, setSecurityAlerts] = reactExports.useState([]);
  const [users, setUsers] = reactExports.useState([]);
  const [servers, setServers] = reactExports.useState([]);
  const [logs, setLogs] = reactExports.useState([]);
  const [systemHealth, setSystemHealth] = reactExports.useState(null);
  const [bannedUsers, setBannedUsers] = reactExports.useState([]);
  const [dbStats, setDbStats] = reactExports.useState(null);
  const [realtimeStats, setRealtimeStats] = reactExports.useState({ online: 0, messages: 0, voice: 0 });
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [currentPage, setCurrentPage] = reactExports.useState(1);
  const [totalPages, setTotalPages] = reactExports.useState(1);
  const [sortField, setSortField] = reactExports.useState("created");
  const [sortOrder, setSortOrder] = reactExports.useState("desc");
  const [filterStatus, setFilterStatus] = reactExports.useState("all");
  const [systemLogs, setSystemLogs] = reactExports.useState([]);
  const [logStats, setLogStats] = reactExports.useState(null);
  const [logType, setLogType] = reactExports.useState("all");
  const [logSearch, setLogSearch] = reactExports.useState("");
  const [logSeverity, setLogSeverity] = reactExports.useState("");
  const [logDateFrom, setLogDateFrom] = reactExports.useState("");
  const [logDateTo, setLogDateTo] = reactExports.useState("");
  const [logLoading, setLogLoading] = reactExports.useState(false);
  const fetchDetailedStats = reactExports.useCallback(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/detailed-stats/`);
      if (res.ok) {
        const data = await res.json();
        setDetailedStats(data);
        setRealtimeStats({ online: data.users?.online || 0, messages: data.messages?.last_1h || 0, voice: 0 });
      }
    } catch (err) {
      console.error("Detailed stats fetch error:", err);
    }
  }, [fetchWithAuth, apiBaseUrl]);
  const fetchLiveActivity = reactExports.useCallback(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/live-activity/`);
      if (res.ok) {
        const data = await res.json();
        setLiveActivities(data.activities || []);
      }
    } catch (err) {
      console.error("Live activity fetch error:", err);
    }
  }, [fetchWithAuth, apiBaseUrl]);
  const fetchSecurityAlerts = reactExports.useCallback(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/security-alerts/`);
      if (res.ok) {
        const data = await res.json();
        setSecurityAlerts(data.alerts || []);
      }
    } catch (err) {
      console.error("Security alerts fetch error:", err);
    }
  }, [fetchWithAuth, apiBaseUrl]);
  const fetchStats = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/stats/`);
      if (res.ok) {
        setStats(await res.json());
      } else {
        console.error("Admin stats API error:", res.status);
        toast.error("İstatistikler yüklenemedi");
        setStats({ totalUsers: 0, onlineUsers: 0, totalServers: 0, totalMessages: 0, activeVoiceCalls: 0, premiumUsers: 0, newUsersToday: 0, messagesToday: 0, voiceMinutesToday: 0, reportsToday: 0, storageUsed: "0 GB", bandwidthToday: "0 GB", apiCalls: 0, avgResponseTime: 0, errorRate: "0", weeklyGrowth: "0", monthlyRevenue: 0 });
      }
    } catch (err) {
      console.error("Stats fetch error:", err);
      toast.error("İstatistikler yüklenemedi");
    }
    setLoading(false);
  }, [fetchWithAuth, apiBaseUrl]);
  const fetchUsers = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/users/?search=${searchQuery}&page=${currentPage}&sort=${sortField}&order=${sortOrder}&status=${filterStatus}`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || data.results || []);
        setTotalPages(data.total_pages || Math.ceil((data.count || 1) / 20));
      } else {
        console.error("Admin users API error:", res.status);
        setUsers([]);
      }
    } catch (err) {
      console.error("Users fetch error:", err);
      setUsers([]);
    }
    setLoading(false);
  }, [fetchWithAuth, apiBaseUrl, searchQuery, currentPage, sortField, sortOrder, filterStatus]);
  const fetchServers = reactExports.useCallback(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/servers/`);
      if (res.ok) {
        const data = await res.json();
        setServers(data.servers || data || []);
      } else {
        console.error("Admin servers API error:", res.status);
        setServers([]);
      }
    } catch (err) {
      console.error("Servers fetch error:", err);
      setServers([]);
    }
  }, [fetchWithAuth, apiBaseUrl]);
  const fetchLogs = reactExports.useCallback(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/logs/`);
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || data || []);
      } else {
        console.error("Admin logs API error:", res.status);
        setLogs([]);
      }
    } catch (err) {
      console.error("Logs fetch error:", err);
      setLogs([]);
    }
  }, [fetchWithAuth, apiBaseUrl]);
  const fetchSystemHealth = reactExports.useCallback(async () => {
    const fallback = { cpu: 0, memory: 0, disk: 0, uptime: "Bilinmiyor", activeConnections: 0, requestsPerMinute: 0, dbConnections: 0, cacheHitRate: "0", wsConnections: 0 };
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/health/`);
      if (res.ok) {
        setSystemHealth(await res.json());
      } else {
        console.error("Admin health API error:", res.status);
        setSystemHealth(fallback);
      }
    } catch (err) {
      console.error("Health fetch error:", err);
      setSystemHealth(fallback);
    }
  }, [fetchWithAuth, apiBaseUrl]);
  const fetchBannedUsers = reactExports.useCallback(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/banned-users/`);
      if (res.ok) {
        const data = await res.json();
        setBannedUsers(data.users || data || []);
      } else {
        console.error("Admin banned-users API error:", res.status);
        setBannedUsers([]);
      }
    } catch (err) {
      console.error("Banned users fetch error:", err);
      setBannedUsers([]);
    }
  }, [fetchWithAuth, apiBaseUrl]);
  const fetchDbStats = reactExports.useCallback(async () => {
    const fallback = { users: { count: 0, size: "0 MB" }, messages: { count: 0, size: "0 MB" }, servers: { count: 0, size: "0 MB" }, attachments: { count: 0, size: "0 GB" }, voice_logs: { count: 0, size: "0 MB" }, total_size: "0 GB" };
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/db-stats/`);
      if (res.ok) {
        setDbStats(await res.json());
      } else {
        console.error("Admin db-stats API error:", res.status);
        setDbStats(fallback);
      }
    } catch (err) {
      console.error("DB stats fetch error:", err);
      setDbStats(fallback);
    }
  }, [fetchWithAuth, apiBaseUrl]);
  const fetchSystemLogs = reactExports.useCallback(async () => {
    setLogLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("type", logType);
      params.append("limit", "100");
      if (logSearch) params.append("search", logSearch);
      if (logSeverity) params.append("severity", logSeverity);
      if (logDateFrom) params.append("date_from", logDateFrom);
      if (logDateTo) params.append("date_to", logDateTo);
      const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/system-logs/?${params}`);
      if (res.ok) {
        const data = await res.json();
        setSystemLogs(data.logs || []);
        setLogStats(data.stats);
      }
    } catch (err) {
      console.error("System logs fetch error:", err);
    }
    setLogLoading(false);
  }, [fetchWithAuth, apiBaseUrl, logType, logSearch, logSeverity, logDateFrom, logDateTo]);
  return {
    loading,
    stats,
    detailedStats,
    liveActivities,
    securityAlerts,
    users,
    servers,
    logs,
    systemHealth,
    bannedUsers,
    dbStats,
    realtimeStats,
    systemLogs,
    logStats,
    logLoading,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    filterStatus,
    setFilterStatus,
    logType,
    setLogType,
    logSearch,
    setLogSearch,
    logSeverity,
    setLogSeverity,
    logDateFrom,
    setLogDateFrom,
    logDateTo,
    setLogDateTo,
    fetchDetailedStats,
    fetchLiveActivity,
    fetchSecurityAlerts,
    fetchStats,
    fetchUsers,
    fetchServers,
    fetchLogs,
    fetchSystemHealth,
    fetchBannedUsers,
    fetchDbStats,
    fetchSystemLogs
  };
}, "useAdminFetch");
const useAdminActions = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, refetchUsers, refetchBannedUsers, refetchServers }) => {
  const [selectedUser, setSelectedUser] = reactExports.useState(null);
  const [actionModal, setActionModal] = reactExports.useState(null);
  const [editUserModal, setEditUserModal] = reactExports.useState(null);
  const [editUserForm, setEditUserForm] = reactExports.useState({});
  const [editUserLoading, setEditUserLoading] = reactExports.useState(false);
  const [selectedServer, setSelectedServer] = reactExports.useState(null);
  const [serverDetailLoading, setServerDetailLoading] = reactExports.useState(false);
  const [deleteConfirm, setDeleteConfirm] = reactExports.useState(null);
  const [broadcastModal, setBroadcastModal] = reactExports.useState(false);
  const [announceText, setAnnounceText] = reactExports.useState("");
  const [maintenanceMode, setMaintenanceMode] = reactExports.useState(false);
  const [passwordResetModal, setPasswordResetModal] = reactExports.useState(null);
  const [newPassword, setNewPassword] = reactExports.useState("");
  const [backupStatus, setBackupStatus] = reactExports.useState(null);
  const [userActivityModal, setUserActivityModal] = reactExports.useState(null);
  const handleUserAction = /* @__PURE__ */ __name(async (action, userId, extra = {}) => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/user-action/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, user_id: userId, ...extra })
      });
      if (res.ok) {
        toast.success(`✅ ${action} işlemi başarılı!`);
        refetchUsers();
        if (action === "ban") refetchBannedUsers();
      } else {
        toast.error("❌ İşlem başarısız!");
      }
    } catch (err) {
      toast.error("❌ Hata oluştu!");
    }
    setActionModal(null);
    setSelectedUser(null);
  }, "handleUserAction");
  const handleBroadcast = /* @__PURE__ */ __name(async () => {
    if (!announceText.trim()) return;
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/broadcast/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: announceText })
      });
      if (res.ok) {
        toast.success("📢 Duyuru gönderildi!");
        setAnnounceText("");
        setBroadcastModal(false);
      }
    } catch (err) {
      toast.error("❌ Duyuru gönderilemedi!");
    }
  }, "handleBroadcast");
  const handleBackup = /* @__PURE__ */ __name(async () => {
    setBackupStatus("running");
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/backup/`, { method: "POST" });
      if (res.ok) {
        setBackupStatus("success");
        toast.success("✅ Yedekleme tamamlandı!");
      } else {
        setBackupStatus("error");
      }
    } catch (err) {
      setBackupStatus("error");
    }
  }, "handleBackup");
  const handleClearCache = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/clear-cache/`, { method: "POST" });
      if (res.ok) {
        toast.success("🧹 Cache temizlendi!");
      }
    } catch (err) {
      toast.error("❌ Cache temizlenemedi!");
    }
  }, "handleClearCache");
  const toggleMaintenance = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/maintenance/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !maintenanceMode })
      });
      if (res.ok) {
        setMaintenanceMode(!maintenanceMode);
        toast.success(maintenanceMode ? "✅ Bakım modu kapatıldı!" : "🔧 Bakım modu açıldı!");
      }
    } catch (err) {
      toast.error("❌ Hata!");
    }
  }, "toggleMaintenance");
  const openEditUserModal = /* @__PURE__ */ __name((user) => {
    setEditUserForm({
      username: user.username || "",
      email: user.email || "",
      coins: user.coins || 0,
      level: user.level || 1,
      xp: user.xp || 0,
      role: user.role || "member",
      is_active: user.is_active !== false,
      is_staff: user.is_staff || false,
      is_premium: user.is_premium || false,
      status_message: user.status_message || "",
      email_verified: user.email_verified || false
    });
    setEditUserModal(user);
  }, "openEditUserModal");
  const handleUpdateUser = /* @__PURE__ */ __name(async () => {
    if (!editUserModal) return;
    setEditUserLoading(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/update-user/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: editUserModal.id, ...editUserForm })
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(`✅ ${data.message}`);
        setEditUserModal(null);
        refetchUsers();
      } else {
        const data = await res.json();
        toast.error(`❌ ${data.error || "Güncelleme başarısız!"}`);
      }
    } catch (err) {
      toast.error("❌ Hata oluştu!");
    }
    setEditUserLoading(false);
  }, "handleUpdateUser");
  const handleServerDetails = /* @__PURE__ */ __name(async (server) => {
    setServerDetailLoading(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/server-action/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "details", server_id: server.id })
      });
      if (res.ok) {
        setSelectedServer(await res.json());
      } else {
        toast.error("❌ Sunucu detayları yüklenemedi!");
      }
    } catch (err) {
      toast.error("❌ Hata oluştu!");
    }
    setServerDetailLoading(false);
  }, "handleServerDetails");
  const handleServerDelete = /* @__PURE__ */ __name(async (serverId, serverName) => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/server-action/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", server_id: serverId })
      });
      if (res.ok) {
        toast.success(`✅ "${serverName}" sunucusu silindi!`);
        setDeleteConfirm(null);
        refetchServers();
      } else {
        toast.error("❌ Sunucu silinemedi!");
      }
    } catch (err) {
      toast.error("❌ Hata oluştu!");
    }
  }, "handleServerDelete");
  const handleDeleteOldLogs = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/delete-old-logs/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days: 30 })
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(`✅ ${data.message}`);
      } else {
        toast.error("❌ Loglar silinemedi!");
      }
    } catch (err) {
      toast.error("❌ Hata oluştu!");
    }
  }, "handleDeleteOldLogs");
  const handleExportLogs = /* @__PURE__ */ __name(async (format, logType, logDateFrom, logDateTo) => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/logs/export/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: logType === "all" ? "audit" : logType, format, date_from: logDateFrom || null, date_to: logDateTo || null, limit: 5e3 })
      });
      if (format === "csv") {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `logs_${logType}_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`;
        a.click();
        toast.success("CSV exported successfully!");
      } else {
        const data = await res.json();
        const blob = new Blob([JSON.stringify(data.logs, null, 2)], { type: "application/json" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `logs_${logType}_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
        a.click();
        toast.success("JSON exported successfully!");
      }
    } catch (err) {
      toast.error("Export failed");
    }
  }, "handleExportLogs");
  const fetchUserActivity = /* @__PURE__ */ __name(async (userId) => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/users/${userId}/activity/?limit=50`);
      if (res.ok) {
        setUserActivityModal(await res.json());
      }
    } catch (err) {
      toast.error("Failed to fetch user activity");
    }
  }, "fetchUserActivity");
  return {
    selectedUser,
    setSelectedUser,
    actionModal,
    setActionModal,
    editUserModal,
    setEditUserModal,
    editUserForm,
    setEditUserForm,
    editUserLoading,
    selectedServer,
    setSelectedServer,
    serverDetailLoading,
    deleteConfirm,
    setDeleteConfirm,
    broadcastModal,
    setBroadcastModal,
    announceText,
    setAnnounceText,
    maintenanceMode,
    passwordResetModal,
    setPasswordResetModal,
    newPassword,
    setNewPassword,
    backupStatus,
    userActivityModal,
    setUserActivityModal,
    handleUserAction,
    handleBroadcast,
    handleBackup,
    handleClearCache,
    toggleMaintenance,
    openEditUserModal,
    handleUpdateUser,
    handleServerDetails,
    handleServerDelete,
    handleDeleteOldLogs,
    handleExportLogs,
    fetchUserActivity
  };
}, "useAdminActions");
const useAdminAPI = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose }) => {
  const [activeTab, setActiveTab] = reactExports.useState("dashboard");
  const [selectedTab, setSelectedTab] = reactExports.useState("overview");
  const fetch = useAdminFetch({ fetchWithAuth, apiBaseUrl });
  const actions = useAdminActions({
    fetchWithAuth,
    apiBaseUrl,
    refetchUsers: fetch.fetchUsers,
    refetchBannedUsers: fetch.fetchBannedUsers,
    refetchServers: fetch.fetchServers
  });
  const handleExportLogs = /* @__PURE__ */ __name((format) => actions.handleExportLogs(format, fetch.logType, fetch.logDateFrom, fetch.logDateTo), "handleExportLogs");
  reactExports.useEffect(() => {
    fetch.fetchStats();
    fetch.fetchSystemHealth();
    fetch.fetchDetailedStats();
    fetch.fetchLiveActivity();
    fetch.fetchSecurityAlerts();
  }, [fetch.fetchStats, fetch.fetchSystemHealth, fetch.fetchDetailedStats, fetch.fetchLiveActivity, fetch.fetchSecurityAlerts]);
  reactExports.useEffect(() => {
    if (activeTab === "users") fetch.fetchUsers();
    if (activeTab === "servers") fetch.fetchServers();
    if (activeTab === "logs") {
      fetch.fetchLogs();
      fetch.fetchSystemLogs();
    }
    if (activeTab === "moderation") fetch.fetchBannedUsers();
    if (activeTab === "database") fetch.fetchDbStats();
  }, [activeTab, fetch.fetchUsers, fetch.fetchServers, fetch.fetchLogs, fetch.fetchBannedUsers, fetch.fetchDbStats, fetch.fetchSystemLogs]);
  reactExports.useEffect(() => {
    const interval = setInterval(() => {
      fetch.fetchDetailedStats();
      fetch.fetchLiveActivity();
      fetch.fetchSecurityAlerts();
    }, 1e4);
    return () => clearInterval(interval);
  }, [fetch.fetchDetailedStats, fetch.fetchLiveActivity, fetch.fetchSecurityAlerts]);
  return {
    activeTab,
    setActiveTab,
    selectedTab,
    setSelectedTab,
    ...fetch,
    ...actions,
    handleExportLogs
  };
}, "useAdminAPI");
const DashboardTab = /* @__PURE__ */ __name(({
  detailedStats,
  fetchDetailedStats,
  fetchLiveActivity,
  fetchSecurityAlerts,
  liveActivities,
  securityAlerts,
  servers,
  setBroadcastModal,
  stats,
  users
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { color: "#fff", margin: 0, fontSize: "20px" }, children: "📊 Admin Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "#6b7280", margin: "4px 0 0", fontSize: "12px" }, children: [
          "Son güncelleme: ",
          (/* @__PURE__ */ new Date()).toLocaleTimeString("tr-TR"),
          " | Auto-refresh: 10s"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => {
              fetchDetailedStats();
              fetchLiveActivity();
              fetchSecurityAlerts();
            }, "onClick"),
            style: { ...styles.actionBtn("#5865f2"), padding: "8px 14px" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaSync, { size: 12 }),
              " Yenile"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setBroadcastModal(true), "onClick"), style: { ...styles.actionBtn("#23a559"), padding: "8px 14px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaPaperPlane, { size: 12 }),
          " Duyuru"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      background: "linear-gradient(90deg, #1e3a5f 0%, #2d1b4e 100%)",
      borderRadius: "10px",
      padding: "14px 20px",
      marginBottom: "20px",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "24px", fontWeight: "700", color: "#23a559" }, children: detailedStats?.users?.online || 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "11px", color: "#9ca3af" }, children: "🟢 Çevrimiçi" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: "1px", height: "40px", backgroundColor: "#ffffff20" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "24px", fontWeight: "700", color: "#ffc107" }, children: detailedStats?.users?.idle || 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "11px", color: "#9ca3af" }, children: "🌙 Boşta" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: "1px", height: "40px", backgroundColor: "#ffffff20" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "24px", fontWeight: "700", color: "#5865f2" }, children: detailedStats?.messages?.last_1h || 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "11px", color: "#9ca3af" }, children: "💬 Son 1 saat mesaj" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: "1px", height: "40px", backgroundColor: "#ffffff20" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "24px", fontWeight: "700", color: "#e74c3c" }, children: securityAlerts?.length || 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "11px", color: "#9ca3af" }, children: "⚠️ Güvenlik Uyarısı" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "12px", marginBottom: "20px" }, children: [
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, { color: "#5865f2" }), value: detailedStats?.users?.total || stats?.totalUsers, label: "Toplam Kullanıcı", color: "#5865f2" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaGlobe, { color: "#23a559" }), value: detailedStats?.users?.active || stats?.onlineUsers, label: "Aktif (24s)", color: "#23a559" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaServer, { color: "#f0b132" }), value: detailedStats?.servers?.total || stats?.totalServers, label: "Sunucu", color: "#f0b132" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaComment, { color: "#e74c3c" }), value: (detailedStats?.messages?.total || stats?.totalMessages)?.toLocaleString(), label: "Mesaj", color: "#e74c3c" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, { color: "#9b59b6" }), value: detailedStats?.users?.verified || 0, label: "Doğrulanmış", color: "#9b59b6" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCrown, { color: "#ffd700" }), value: detailedStats?.premium?.total || stats?.premiumUsers, label: "Premium", color: "#ffd700" }
    ].map((stat, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statCard, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "20px" }, children: stat.icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.statValue, fontSize: "22px" }, children: stat.value || "---" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: stat.label })
      ] })
    ] }) }, idx)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { color: "#fff", marginTop: 0, marginBottom: "14px", fontSize: "14px" }, children: "📈 Kullanıcı Büyümesi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }, children: [
          { value: `+${detailedStats?.users?.new_1h || 0}`, label: "Son 1 Saat", color: "#23a559" },
          { value: `+${detailedStats?.users?.new_24h || 0}`, label: "Son 24 Saat", color: "#5865f2" },
          { value: `+${detailedStats?.users?.new_7d || 0}`, label: "Son 7 Gün", color: "#f0b132" },
          { value: `+${detailedStats?.users?.new_30d || 0}`, label: "Son 30 Gün", color: "#e74c3c" }
        ].map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "22px", fontWeight: "700", color: item.color }, children: item.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "10px", color: "#6b7280" }, children: item.label })
        ] }, idx)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { color: "#fff", marginTop: 0, marginBottom: "14px", fontSize: "14px" }, children: "⚡ Sistem Sağlığı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }, children: [
          {
            value: `${detailedStats?.system?.cpu_percent?.toFixed(1) || 0}%`,
            label: "CPU",
            color: (detailedStats?.system?.cpu_percent || 0) > 80 ? "#e74c3c" : "#23a559"
          },
          {
            value: `${detailedStats?.system?.memory_percent?.toFixed(1) || 0}%`,
            label: "RAM",
            color: (detailedStats?.system?.memory_percent || 0) > 80 ? "#e74c3c" : "#3498db"
          },
          {
            value: `${detailedStats?.system?.disk_percent?.toFixed(1) || 0}%`,
            label: "Disk",
            color: (detailedStats?.system?.disk_percent || 0) > 90 ? "#e74c3c" : "#9b59b6"
          },
          {
            value: detailedStats?.system?.uptime || "---",
            label: "Çalışma",
            color: "#ffd700"
          }
        ].map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "18px", fontWeight: "700", color: item.color }, children: item.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "10px", color: "#6b7280" }, children: item.label })
        ] }, idx)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { color: "#fff", marginTop: 0, marginBottom: "14px", fontSize: "14px" }, children: "💬 Mesaj İstatistikleri" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }, children: [
          { value: (detailedStats?.messages?.total || 0).toLocaleString(), label: "Toplam Mesaj", color: "#5865f2" },
          { value: (detailedStats?.messages?.direct_messages || 0).toLocaleString(), label: "DM", color: "#23a559" },
          { value: (detailedStats?.messages?.reactions || 0).toLocaleString(), label: "Reaksiyon", color: "#f0b132" },
          { value: detailedStats?.messages?.pinned || 0, label: "Sabitlenmiş", color: "#e74c3c" }
        ].map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          textAlign: "center",
          backgroundColor: "#111113",
          padding: "10px",
          borderRadius: "8px"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "18px", fontWeight: "700", color: item.color }, children: item.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "10px", color: "#6b7280" }, children: item.label })
        ] }, idx)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { color: "#fff", marginTop: 0, marginBottom: "14px", fontSize: "14px" }, children: "💎 Premium & Gelir" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }, children: [
          { value: detailedStats?.premium?.monthly || 0, label: "Aylık", color: "#5865f2" },
          { value: detailedStats?.premium?.yearly || 0, label: "Yıllık", color: "#23a559" },
          { value: detailedStats?.premium?.lifetime || 0, label: "Ömür Boyu", color: "#ffd700" }
        ].map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          textAlign: "center",
          backgroundColor: "#111113",
          padding: "10px",
          borderRadius: "8px"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "18px", fontWeight: "700", color: item.color }, children: item.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "10px", color: "#6b7280" }, children: item.label })
        ] }, idx)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: "12px", textAlign: "center", padding: "10px", backgroundColor: "#1a472a", borderRadius: "8px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "22px", fontWeight: "700", color: "#23a559" }, children: [
            "$",
            (detailedStats?.premium?.estimated_revenue || 0).toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "11px", color: "#6b7280" }, children: "Tahmini Aylık Gelir" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px", marginBottom: "20px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { color: "#fff", marginTop: 0, marginBottom: "14px", fontSize: "14px" }, children: [
          "📡 Canlı Aktivite",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "10px", color: "#23a559", marginLeft: "8px" }, children: "● CANLI" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { maxHeight: "220px", overflowY: "auto" }, children: liveActivities.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center", color: "#6b7280", padding: "20px" }, children: "Aktivite bekleniyor..." }) : liveActivities.map((activity, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "8px",
          borderBottom: "1px solid #2a2a2e"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: activity.type === "user_join" ? "#23a559" : activity.type === "message" ? "#5865f2" : activity.type === "server_create" ? "#f0b132" : activity.type === "premium" ? "#ffd700" : "#9b59b6"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, color: "#e5e7eb", fontSize: "12px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "#fff" }, children: activity.user }),
            " ",
            activity.action,
            activity.target && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#6b7280" }, children: [
              " → ",
              activity.target
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#6b7280", fontSize: "10px" }, children: activity.time_ago })
        ] }, idx)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { color: "#fff", marginTop: 0, marginBottom: "14px", fontSize: "14px" }, children: "🏆 Top 5 Sunucu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "8px" }, children: [
          (detailedStats?.servers?.top_servers || []).slice(0, 5).map((server, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 10px",
            backgroundColor: "#111113",
            borderRadius: "6px"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: idx === 0 ? "#ffd700" : idx === 1 ? "#c0c0c0" : idx === 2 ? "#cd7f32" : "#6b7280" }, children: [
                "#",
                idx + 1
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#e5e7eb", fontSize: "12px" }, children: server.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#5865f2", fontWeight: "700", fontSize: "12px" }, children: [
              server.member_count,
              " üye"
            ] })
          ] }, idx)),
          (!detailedStats?.servers?.top_servers || detailedStats.servers.top_servers.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center", color: "#6b7280", padding: "20px" }, children: "Sunucu verisi yok" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.statCard, borderColor: securityAlerts.length > 0 ? "#e74c3c" : "#2a2a2e" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { color: "#fff", marginTop: 0, marginBottom: "14px", fontSize: "14px" }, children: [
          "🛡️ Güvenlik Uyarıları",
          securityAlerts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            marginLeft: "8px",
            backgroundColor: "#e74c3c",
            color: "#fff",
            padding: "2px 8px",
            borderRadius: "10px",
            fontSize: "10px"
          }, children: securityAlerts.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { maxHeight: "150px", overflowY: "auto" }, children: securityAlerts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center", color: "#23a559", padding: "20px" }, children: "✅ Güvenlik uyarısı yok" }) : securityAlerts.map((alert, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "8px",
          borderBottom: "1px solid #2a2a2e",
          backgroundColor: alert.severity === "high" ? "#e74c3c20" : "#f0b13220"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, { color: alert.severity === "high" ? "#e74c3c" : "#f0b132", size: 14 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#e5e7eb", fontSize: "12px" }, children: alert.message }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#6b7280", fontSize: "10px" }, children: alert.time })
          ] })
        ] }, idx)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { color: "#fff", marginTop: 0, marginBottom: "14px", fontSize: "14px" }, children: "📁 Dosya & Depolama" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }, children: [
          { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaImage, { color: "#e74c3c" }), label: "Resim", value: detailedStats?.files?.images || 0 },
          { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaVideo, { color: "#5865f2" }), label: "Video", value: detailedStats?.files?.videos || 0 },
          { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaMicrophone, { color: "#23a559" }), label: "Ses", value: detailedStats?.files?.audio || 0 },
          { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaFile, { color: "#f0b132" }), label: "Diğer", value: detailedStats?.files?.other || 0 }
        ].map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px",
          backgroundColor: "#111113",
          borderRadius: "6px"
        }, children: [
          item.icon,
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#fff", fontWeight: "600", fontSize: "14px" }, children: item.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#6b7280", fontSize: "10px" }, children: item.label })
          ] })
        ] }, idx)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: "10px", padding: "8px", backgroundColor: "#111113", borderRadius: "6px", textAlign: "center" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "16px", fontWeight: "700", color: "#9b59b6" }, children: detailedStats?.files?.total_storage || "0 MB" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "10px", color: "#6b7280" }, children: "Toplam Depolama" })
        ] })
      ] })
    ] })
  ] });
}, "DashboardTab");
const UsersTab = /* @__PURE__ */ __name(({
  currentPage,
  fetchUsers,
  filterStatus,
  handleUserAction,
  openEditUserModal,
  searchQuery,
  setActionModal,
  setCurrentPage,
  setFilterStatus,
  setPasswordResetModal,
  setSearchQuery,
  setSelectedUser,
  setSortField,
  sortField,
  totalPages,
  users
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { color: "#fff", marginBottom: "16px", fontSize: "18px" }, children: "👥 Kullanıcı Yönetimi" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Kullanıcı ara...",
          value: searchQuery,
          onChange: /* @__PURE__ */ __name((e) => setSearchQuery(e.target.value), "onChange"),
          style: { ...styles.searchInput, maxWidth: "300px" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: filterStatus,
          onChange: /* @__PURE__ */ __name((e) => setFilterStatus(e.target.value), "onChange"),
          style: { ...styles.searchInput, maxWidth: "150px" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Tümü" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "online", children: "Online" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "offline", children: "Offline" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "premium", children: "Premium" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "banned", children: "Yasaklı" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: sortField,
          onChange: /* @__PURE__ */ __name((e) => setSortField(e.target.value), "onChange"),
          style: { ...styles.searchInput, maxWidth: "150px" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "created", children: "Kayıt Tarihi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "username", children: "Kullanıcı Adı" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "message_count", children: "Mesaj Sayısı" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: fetchUsers, style: styles.actionBtn("#5865f2"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaSearch, {}),
        " Ara"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: styles.actionBtn("#23a559"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaFileExport, {}),
        " Export"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { borderRadius: "10px", overflow: "hidden", border: "1px solid #2a2a2e" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { style: styles.table, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: styles.th, children: "Kullanıcı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: styles.th, children: "Arkadaşlık Kodu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: styles.th, children: "Seviye / XP" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: styles.th, children: "Coin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: styles.th, children: "Mesaj" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: styles.th, children: "Sunucu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: styles.th, children: "Arkadaş" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: styles.th, children: "Durum" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: styles.th, children: "Tip" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: styles.th, children: "İşlemler" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: users.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { style: { backgroundColor: user.is_admin ? "#1a1a2e20" : "transparent" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: styles.td, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, hsl(${user.id * 40}, 70%, 50%), hsl(${user.id * 40 + 30}, 70%, 40%))`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: "600",
            fontSize: "12px"
          }, children: user.username?.charAt(0).toUpperCase() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: "600", fontSize: "13px" }, children: user.username }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "10px", color: "#6b7280" }, children: user.email })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { style: { ...styles.td, fontFamily: "monospace", fontWeight: "600", color: "#5865f2" }, children: [
          "#",
          user.friend_code || "N/A"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: styles.td, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "6px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { ...styles.badge("#23a559"), minWidth: "45px" }, children: [
            "Lv.",
            user.level || 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: "11px", color: "#a3a3a3" }, children: [
            (user.xp || 0).toLocaleString(),
            " XP"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { style: { ...styles.td, color: "#ffd700", fontWeight: "600" }, children: [
          "🪙 ",
          (user.coins || 0).toLocaleString()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { style: styles.td, children: [
          "💬 ",
          (user.total_messages || 0).toLocaleString()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { style: styles.td, children: [
          "🏠 ",
          user.servers_joined || 0
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { style: styles.td, children: [
          "👥 ",
          user.friends_count || 0
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: styles.td, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.badge(
          user.status === "online" ? "#23a559" : user.status === "idle" ? "#f0b132" : user.status === "dnd" ? "#e74c3c" : "#6b7280"
        ), children: user.status === "online" ? "🟢" : user.status === "idle" ? "🌙" : user.status === "dnd" ? "⛔" : "⚫" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: styles.td, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexWrap: "wrap", gap: "4px" }, children: [
          user.is_staff && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.badge("#e74c3c"), children: "👑" }),
          user.is_premium && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.badge("#ffd700"), children: "⭐" }),
          user.is_whitelisted && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.badge("#9b59b6"), children: "💎" }),
          user.has_spotify && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.badge("#1db954"), children: "🎵" }),
          !user.is_staff && !user.is_premium && !user.is_whitelisted && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.badge("#6b7280"), children: "Free" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: styles.td, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "4px", flexWrap: "wrap" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: styles.actionBtn("#5865f2"), onClick: /* @__PURE__ */ __name(() => setSelectedUser(user), "onClick"), title: "Görüntüle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaEye, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: styles.actionBtn("#f0b132"), onClick: /* @__PURE__ */ __name(() => openEditUserModal(user), "onClick"), title: "Düzenle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaEdit, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: styles.actionBtn("#f59e0b"), onClick: /* @__PURE__ */ __name(() => setPasswordResetModal(user), "onClick"), title: "Şifre Değiştir", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaKey, {}) }),
          user.is_active !== false ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: styles.actionBtn("#e74c3c"), onClick: /* @__PURE__ */ __name(() => setActionModal({ type: "ban", user }), "onClick"), title: "Yasakla", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaBan, {}) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: styles.actionBtn("#23a559"), onClick: /* @__PURE__ */ __name(() => handleUserAction("unban", user.id), "onClick"), title: "Yasağı Kaldır", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheckCircle, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: styles.actionBtn("#dc2626"), onClick: /* @__PURE__ */ __name(() => setActionModal({ type: "delete", user }), "onClick"), title: "Sil", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}) })
        ] }) })
      ] }, user.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "center", gap: "8px", marginTop: "16px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          disabled: currentPage === 1,
          onClick: /* @__PURE__ */ __name(() => setCurrentPage((p) => p - 1), "onClick"),
          style: { ...styles.actionBtn("#3d3f44"), opacity: currentPage === 1 ? 0.5 : 1 },
          children: "◀ Önceki"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#fff", padding: "6px 12px" }, children: [
        "Sayfa ",
        currentPage,
        " / ",
        totalPages
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          disabled: currentPage === totalPages,
          onClick: /* @__PURE__ */ __name(() => setCurrentPage((p) => p + 1), "onClick"),
          style: { ...styles.actionBtn("#3d3f44"), opacity: currentPage === totalPages ? 0.5 : 1 },
          children: "Sonraki ▶"
        }
      )
    ] })
  ] });
}, "UsersTab");
const ServersTab = /* @__PURE__ */ __name(({ handleServerDetails, servers, setDeleteConfirm }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { color: "#fff", marginBottom: "16px", fontSize: "18px" }, children: "🏠 Sunucu Yönetimi" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }, children: servers.map((server) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.statCard, position: "relative" }, children: [
      server.is_verified && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", top: "10px", right: "10px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.badge("#23a559"), children: "✓ Onaylı" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: `linear-gradient(135deg, hsl(${server.id * 50}, 60%, 45%), hsl(${server.id * 50 + 40}, 60%, 35%))`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: "700",
          fontSize: "18px"
        }, children: server.name?.charAt(0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: "600", color: "#fff", fontSize: "14px" }, children: server.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "11px", color: "#6b7280" }, children: [
            "Sahip: ",
            server.owner
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "14px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.miniCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "16px", fontWeight: "700", color: "#5865f2" }, children: server.members }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "9px", color: "#6b7280" }, children: "Üye" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.miniCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "16px", fontWeight: "700", color: "#23a559" }, children: server.channels }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "9px", color: "#6b7280" }, children: "Kanal" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.miniCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "16px", fontWeight: "700", color: "#9b59b6" }, children: server.voice_channels }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "9px", color: "#6b7280" }, children: "Ses" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "6px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: { ...styles.actionBtn("#5865f2"), flex: 1, padding: "8px" }, onClick: /* @__PURE__ */ __name(() => handleServerDetails(server), "onClick"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaEye, {}),
          " Görüntüle"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: { ...styles.actionBtn("#e74c3c"), flex: 1, padding: "8px" }, onClick: /* @__PURE__ */ __name(() => setDeleteConfirm({ type: "server", id: server.id, name: server.name }), "onClick"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}),
          " Sil"
        ] })
      ] })
    ] }, server.id)) })
  ] });
}, "ServersTab");
const LogsTab = /* @__PURE__ */ __name(({
  fetchSystemLogs,
  fetchUserActivity,
  handleExportLogs,
  logDateFrom,
  logDateTo,
  logLoading,
  logSearch,
  logSeverity,
  logStats,
  logType,
  logs,
  setLogDateFrom,
  setLogDateTo,
  setLogSearch,
  setLogSeverity,
  setLogType,
  setUserActivityModal,
  systemLogs,
  userActivityModal
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { color: "#fff", margin: 0, fontSize: "18px" }, children: "📋 Gelişmiş Sistem Logları" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px", flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: logType,
            onChange: /* @__PURE__ */ __name((e) => setLogType(e.target.value), "onChange"),
            style: { ...styles.searchInput, width: "120px" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "🔄 Tümü" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "audit", children: "📝 Audit" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "login", children: "🔐 Login" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "error", children: "❌ Error" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "security", children: "🛡️ Security" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "moderation", children: "⚖️ Moderation" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "api", children: "🌐 API" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: logSeverity,
            onChange: /* @__PURE__ */ __name((e) => setLogSeverity(e.target.value), "onChange"),
            style: { ...styles.searchInput, width: "100px" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Severity" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "info", children: "ℹ️ Info" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "warning", children: "⚠️ Warning" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "error", children: "🔴 Error" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "critical", children: "💀 Critical" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "🔍 Ara...",
            value: logSearch,
            onChange: /* @__PURE__ */ __name((e) => setLogSearch(e.target.value), "onChange"),
            style: { ...styles.searchInput, width: "150px" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: fetchSystemLogs, style: styles.actionBtn("#5865f2"), disabled: logLoading, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaSync, { className: logLoading ? "spin" : "" }),
          " Yenile"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "relative" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: styles.actionBtn("#23a559"), onClick: /* @__PURE__ */ __name(() => handleExportLogs("csv"), "onClick"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, {}),
          " CSV"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: styles.actionBtn("#f0b132"), onClick: /* @__PURE__ */ __name(() => handleExportLogs("json"), "onClick"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCode, {}),
          " JSON"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "10px", marginBottom: "16px", alignItems: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#a0a0a0", fontSize: "12px" }, children: "📅 Tarih:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "date",
          value: logDateFrom,
          onChange: /* @__PURE__ */ __name((e) => setLogDateFrom(e.target.value), "onChange"),
          style: { ...styles.searchInput, width: "140px" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#666" }, children: "→" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "date",
          value: logDateTo,
          onChange: /* @__PURE__ */ __name((e) => setLogDateTo(e.target.value), "onChange"),
          style: { ...styles.searchInput, width: "140px" }
        }
      ),
      (logDateFrom || logDateTo) && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => {
            setLogDateFrom("");
            setLogDateTo("");
          }, "onClick"),
          style: { ...styles.actionBtn("#e74c3c"), padding: "4px 8px" },
          children: "✕ Temizle"
        }
      )
    ] }),
    logStats && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "10px", marginBottom: "16px" }, children: [
      { label: "Audit", count: logStats.audit_count, color: "#5865f2", icon: "📝" },
      { label: "Login", count: logStats.login_count, color: "#23a559", icon: "🔐" },
      { label: "Errors", count: logStats.error_count, color: "#e74c3c", icon: "❌" },
      { label: "Security", count: logStats.security_count, color: "#f0b132", icon: "🛡️" },
      { label: "Moderation", count: logStats.moderation_count, color: "#9b59b6", icon: "⚖️" },
      { label: "API", count: logStats.api_count, color: "#3498db", icon: "🌐" }
    ].map((stat, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      backgroundColor: "#1a1a1e",
      borderRadius: "8px",
      padding: "10px",
      textAlign: "center",
      border: `1px solid ${stat.color}30`
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "20px", marginBottom: "4px" }, children: stat.icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: stat.color, fontWeight: "700", fontSize: "18px" }, children: (stat.count || 0).toLocaleString() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#888", fontSize: "11px" }, children: stat.label })
    ] }, idx)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      backgroundColor: "#0a0a0c",
      borderRadius: "10px",
      fontFamily: "JetBrains Mono, Consolas, monospace",
      maxHeight: "450px",
      overflowY: "auto",
      border: "1px solid #1f2023"
    }, children: logLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "40px", textAlign: "center", color: "#666" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaSync, { className: "spin", style: { fontSize: "24px", marginBottom: "10px" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Loading logs..." })
    ] }) : systemLogs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "40px", textAlign: "center", color: "#666" }, children: "📭 No logs found" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { style: { width: "100%", borderCollapse: "collapse" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { style: { position: "sticky", top: 0, backgroundColor: "#0a0a0c" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { ...styles.th, width: "150px" }, children: "Zaman" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { ...styles.th, width: "80px" }, children: "Tip" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { ...styles.th, width: "70px" }, children: "Severity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { ...styles.th, width: "120px" }, children: "Actor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: styles.th, children: "Action / Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { ...styles.th, width: "120px" }, children: "IP" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: systemLogs.map((log, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { style: { borderBottom: "1px solid #1a1a1e" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { ...styles.td, color: "#666", fontSize: "11px" }, children: new Date(log.timestamp).toLocaleString("tr-TR") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: styles.td, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
          padding: "2px 6px",
          borderRadius: "4px",
          fontSize: "10px",
          backgroundColor: log.type === "error" ? "#f8514920" : log.type === "security" ? "#f0b13220" : log.type === "login" ? "#23a55920" : log.type === "moderation" ? "#9b59b620" : log.type === "api" ? "#3498db20" : "#5865f220",
          color: log.type === "error" ? "#f85149" : log.type === "security" ? "#f0b132" : log.type === "login" ? "#23a559" : log.type === "moderation" ? "#9b59b6" : log.type === "api" ? "#3498db" : "#5865f2"
        }, children: log.type }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: styles.td, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
          padding: "2px 6px",
          borderRadius: "4px",
          fontSize: "10px",
          backgroundColor: log.severity === "error" || log.severity === "critical" ? "#f8514920" : log.severity === "warning" ? "#d2992220" : "#23a55920",
          color: log.severity === "error" || log.severity === "critical" ? "#f85149" : log.severity === "warning" ? "#d29922" : "#3fb950"
        }, children: log.severity }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { ...styles.td, fontSize: "12px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: { color: "#58a6ff", cursor: "pointer" },
            onClick: /* @__PURE__ */ __name(() => log.actor !== "System" && log.actor !== "Anonymous" && log.actor !== "AutoMod" && fetchUserActivity(log.actor), "onClick"),
            children: log.actor || "System"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { style: { ...styles.td, fontSize: "11px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#e5e7eb" }, children: log.action }),
          log.details && typeof log.details === "object" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#666", fontSize: "10px", marginTop: "2px" }, children: Object.entries(log.details).slice(0, 3).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { marginRight: "8px" }, children: [
            k,
            ": ",
            typeof v === "object" ? JSON.stringify(v).slice(0, 30) : String(v).slice(0, 30)
          ] }, k)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { ...styles.td, color: "#888", fontSize: "11px" }, children: log.ip_address || "-" })
      ] }, log.id || idx)) })
    ] }) }),
    userActivityModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.8)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      backgroundColor: "#1a1a1e",
      borderRadius: "12px",
      padding: "20px",
      maxWidth: "700px",
      width: "90%",
      maxHeight: "80vh",
      overflow: "auto"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { color: "#fff", margin: 0 }, children: [
          "👤 ",
          userActivityModal.user?.username,
          "'s Activity Timeline"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setUserActivityModal(null), "onClick"), style: styles.actionBtn("#e74c3c"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { backgroundColor: "#0a0a0c", borderRadius: "8px", padding: "12px", marginBottom: "16px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#888" }, children: "Email:" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#fff" }, children: userActivityModal.user?.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#888" }, children: "Joined:" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#fff" }, children: new Date(userActivityModal.user?.date_joined).toLocaleDateString() })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#888" }, children: "Last Login:" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#fff" }, children: userActivityModal.user?.last_login ? new Date(userActivityModal.user.last_login).toLocaleString() : "Never" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { maxHeight: "400px", overflowY: "auto" }, children: userActivityModal.activities?.map((activity, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        display: "flex",
        gap: "12px",
        padding: "10px",
        borderBottom: "1px solid #2a2a2e"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          backgroundColor: activity.type === "login" ? "#23a55930" : activity.type === "message" ? "#5865f230" : activity.type === "moderation" ? "#e74c3c30" : "#f0b13230",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }, children: activity.type === "login" ? "🔐" : activity.type === "message" ? "💬" : activity.type === "moderation" ? "⚖️" : activity.type === "server" ? "🏠" : "📝" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#fff", fontSize: "13px" }, children: activity.action }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#888", fontSize: "11px" }, children: new Date(activity.timestamp).toLocaleString() }),
          activity.details && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#666", fontSize: "11px", marginTop: "4px" }, children: JSON.stringify(activity.details).slice(0, 100) })
        ] })
      ] }, idx)) })
    ] }) })
  ] });
}, "LogsTab");
const ModerationTab = /* @__PURE__ */ __name(({ bannedUsers, handleUserAction, onOpenAuditLogs, onOpenModTools, onOpenReports }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { color: "#fff", marginBottom: "16px", fontSize: "18px" }, children: "🛡️ Moderasyon Merkezi" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "20px" }, children: [
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, {}), title: "Mod Araçları", color: "#e74c3c", action: onOpenModTools },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaFlag, {}), title: "Raporlar", color: "#f0b132", badge: "3", action: onOpenReports },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, {}), title: "Denetim Log", color: "#5865f2", action: onOpenAuditLogs },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaBan, {}), title: "Ban Listesi", color: "#9b59b6", badge: bannedUsers.length.toString() }
    ].map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.statCard, cursor: "pointer" }, onClick: /* @__PURE__ */ __name(() => {
      item.action?.();
    }, "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "24px", color: item.color }, children: item.icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#fff", fontWeight: "600", fontSize: "13px" }, children: item.title }),
        item.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.badge(item.color), children: item.badge })
      ] })
    ] }) }, idx)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { color: "#fff", marginTop: 0, marginBottom: "14px", fontSize: "14px" }, children: "🚫 Yasaklı Kullanıcılar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { borderRadius: "8px", overflow: "hidden" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { style: styles.table, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: styles.th, children: "Kullanıcı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: styles.th, children: "Sebep" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: styles.th, children: "Tarih" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: styles.th, children: "Yasaklayan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: styles.th, children: "İşlem" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: bannedUsers.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: styles.td, children: user.username }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: styles.td, children: user.reason }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: styles.td, children: user.banned_at }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: styles.td, children: user.banned_by }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: styles.td, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: styles.actionBtn("#23a559"), onClick: /* @__PURE__ */ __name(() => handleUserAction("unban", user.id), "onClick"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaUnlock, {}),
            " Kaldır"
          ] }) })
        ] }, user.id)) })
      ] }) })
    ] })
  ] });
}, "ModerationTab");
const DatabaseTab = /* @__PURE__ */ __name(({ backupStatus, dbStats, handleBackup, handleClearCache, handleDeleteOldLogs }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { color: "#fff", marginBottom: "16px", fontSize: "18px" }, children: "🗄️ Veritabanı Yönetimi" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "20px" }, children: dbStats && Object.entries(dbStats).filter(([k]) => k !== "total_size").map(([key, val], idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statCard, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#fff", fontWeight: "600", fontSize: "14px", textTransform: "capitalize" }, children: key.replace("_", " ") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#6b7280", fontSize: "11px" }, children: val.size })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "24px", fontWeight: "700", color: "#5865f2" }, children: val.count?.toLocaleString() })
    ] }) }, idx)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.statCard, textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaDatabase, { size: 40, color: "#5865f2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "28px", fontWeight: "700", color: "#fff", marginTop: "10px" }, children: dbStats?.total_size || "---" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#6b7280", fontSize: "12px" }, children: "Toplam Boyut" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { color: "#fff", marginTop: 0, fontSize: "14px" }, children: "🔧 Veritabanı İşlemleri" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px", marginTop: "14px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleBackup, style: { ...styles.actionBtn("#5865f2"), padding: "12px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCloudUploadAlt, {}),
            " Yedekle"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: { ...styles.actionBtn("#23a559"), padding: "12px" }, onClick: /* @__PURE__ */ __name(() => toast.info("📦 Geri yükleme özelliği yakında!"), "onClick"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCloudDownloadAlt, {}),
            " Geri Yükle"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleClearCache, style: { ...styles.actionBtn("#f0b132"), padding: "12px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaBroom, {}),
            " Cache Temizle"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: { ...styles.actionBtn("#e74c3c"), padding: "12px" }, onClick: handleDeleteOldLogs, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MdDelete, {}),
            " Eski Logları Sil"
          ] })
        ] }),
        backupStatus && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          marginTop: "12px",
          padding: "10px",
          borderRadius: "6px",
          backgroundColor: backupStatus === "success" ? "#23a55920" : backupStatus === "error" ? "#e74c3c20" : "#5865f220",
          color: backupStatus === "success" ? "#23a559" : backupStatus === "error" ? "#e74c3c" : "#5865f2"
        }, children: [
          backupStatus === "running" && "⏳ Yedekleme devam ediyor...",
          backupStatus === "success" && "✅ Yedekleme tamamlandı!",
          backupStatus === "error" && "❌ Yedekleme başarısız!"
        ] })
      ] })
    ] })
  ] });
}, "DatabaseTab");
const SystemHealthTab = /* @__PURE__ */ __name(({ systemHealth }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { color: "#fff", marginBottom: "16px", fontSize: "18px" }, children: "💚 Sistem Sağlığı" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "20px" }, children: [
      { label: "CPU", value: systemHealth?.cpu || 0, color: "#23a559" },
      { label: "Bellek", value: systemHealth?.memory || 0, color: "#5865f2" },
      { label: "Disk", value: systemHealth?.disk || 0, color: "#f0b132" }
    ].map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "8px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#fff", fontWeight: "600", fontSize: "13px" }, children: item.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: item.value > 80 ? "#e74c3c" : item.color, fontWeight: "700" }, children: [
          item.value,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: "100%", height: "8px", backgroundColor: "#2a2a2e", borderRadius: "4px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        width: `${item.value}%`,
        height: "100%",
        borderRadius: "4px",
        backgroundColor: item.value > 80 ? "#e74c3c" : item.color,
        transition: "width 0.5s"
      } }) })
    ] }, idx)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px" }, children: [
      { label: "Uptime", value: systemHealth?.uptime, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, { color: "#5865f2" }) },
      { label: "Bağlantı", value: systemHealth?.activeConnections, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaWifi, { color: "#23a559" }) },
      { label: "İstek/dk", value: systemHealth?.requestsPerMinute, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, { color: "#f0b132" }) },
      { label: "DB Bağlantı", value: systemHealth?.dbConnections, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaDatabase, { color: "#9b59b6" }) },
      { label: "Cache Hit", value: `${systemHealth?.cacheHitRate}%`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaMemory, { color: "#e74c3c" }) }
    ].map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.statCard, textAlign: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginBottom: "8px" }, children: item.icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "18px", fontWeight: "700", color: "#fff" }, children: item.value || "---" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "10px", color: "#6b7280" }, children: item.label })
    ] }, idx)) })
  ] });
}, "SystemHealthTab");
const SecurityTab = /* @__PURE__ */ __name(({ maintenanceMode, toggleMaintenance }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { color: "#fff", marginBottom: "16px", fontSize: "18px" }, children: "🔒 Güvenlik Merkezi" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      ...styles.statCard,
      marginBottom: "16px",
      background: maintenanceMode ? "linear-gradient(135deg, #f0b13220, #e74c3c20)" : "linear-gradient(135deg, #23a55920, #5865f220)"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheckCircle, { size: 24, color: maintenanceMode ? "#f0b132" : "#23a559" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: maintenanceMode ? "#f0b132" : "#23a559", fontWeight: "600" }, children: maintenanceMode ? "🔧 Bakım Modu Aktif" : "✅ Sistem Güvenli" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#6b7280", fontSize: "12px" }, children: "Son tarama: 5 dakika önce" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: toggleMaintenance, style: styles.actionBtn(maintenanceMode ? "#23a559" : "#f0b132"), children: [
        maintenanceMode ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaUnlock, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaLock, {}),
        " ",
        maintenanceMode ? "Kapat" : "Bakım Modu"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }, children: [
      { label: "Giriş Denemesi", value: "247", sub: "Son 24 saat", color: "#5865f2" },
      { label: "Başarısız Giriş", value: "12", sub: "Son 24 saat", color: "#f0b132" },
      { label: "Engellenen IP", value: "15", sub: "Aktif", color: "#e74c3c" }
    ].map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "24px", fontWeight: "700", color: item.color }, children: item.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#fff", fontSize: "13px", fontWeight: "600" }, children: item.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#6b7280", fontSize: "11px" }, children: item.sub })
    ] }, idx)) })
  ] });
}, "SecurityTab");
const BroadcastTab = /* @__PURE__ */ __name(({ announceText, handleBroadcast, setAnnounceText }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { color: "#fff", marginBottom: "16px", fontSize: "18px" }, children: "📢 Duyuru Merkezi" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { color: "#fff", marginTop: 0, fontSize: "14px" }, children: "Yeni Duyuru" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: announceText,
          onChange: /* @__PURE__ */ __name((e) => setAnnounceText(e.target.value), "onChange"),
          placeholder: "Tüm kullanıcılara göndermek istediğiniz mesajı yazın...",
          style: {
            width: "100%",
            minHeight: "120px",
            padding: "12px",
            backgroundColor: "#111113",
            border: "1px solid #2a2a2e",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "14px",
            resize: "vertical",
            outline: "none",
            marginBottom: "12px"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleBroadcast, style: { ...styles.actionBtn("#5865f2"), padding: "10px 20px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaPaperPlane, {}),
          " Gönder"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: { ...styles.actionBtn("#6b7280"), padding: "10px 20px" }, onClick: /* @__PURE__ */ __name(() => toast.info("⏰ Zamanlı duyuru özelliği yakında!"), "onClick"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {}),
          " Zamanla"
        ] })
      ] })
    ] })
  ] });
}, "BroadcastTab");
const ToolsTab = /* @__PURE__ */ __name(({ handleBackup, handleClearCache }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { color: "#fff", marginBottom: "16px", fontSize: "18px" }, children: "🔧 Admin Araçları" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }, children: [
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCloudUploadAlt, {}), title: "Yedekleme", desc: "Veritabanı yedekle", color: "#5865f2", action: handleBackup },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaBroom, {}), title: "Cache Temizle", desc: "Önbellek temizle", color: "#f0b132", action: handleClearCache },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaSync, {}), title: "Yeniden Başlat", desc: "Servisleri yeniden başlat", color: "#e74c3c", action: /* @__PURE__ */ __name(() => toast.info("🔄 Bu özellik güvenlik nedeniyle sunucu üzerinden yapılmalıdır"), "action") },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTerminal, {}), title: "Konsol", desc: "Admin konsolu", color: "#23a559", action: /* @__PURE__ */ __name(() => toast.info("🖥️ Konsol erişimi SSH üzerinden yapılmalıdır"), "action") },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaBug, {}), title: "Debug Modu", desc: "Hata ayıklama", color: "#9b59b6", action: /* @__PURE__ */ __name(() => toast.info("🐛 Debug modu güvenlik nedeniyle devre dışı"), "action") },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaFileExport, {}), title: "Export", desc: "Veri dışa aktar", color: "#1abc9c", action: handleBackup }
    ].map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.statCard, cursor: "pointer" }, onClick: item.action, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "24px", color: item.color }, children: item.icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#fff", fontWeight: "600", fontSize: "13px" }, children: item.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#6b7280", fontSize: "11px" }, children: item.desc })
      ] })
    ] }) }, idx)) })
  ] });
}, "ToolsTab");
const QuickActionsTab = /* @__PURE__ */ __name(({ onClose, onOpenAnalytics, onOpenAutoResponder, onOpenVanityURL, onOpenWebhooks }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { color: "#fff", marginBottom: "16px", fontSize: "18px" }, children: "⚡ Hızlı İşlemler" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "12px" }, children: [
      { icon: "📊", title: "Analytics", desc: "İstatistikleri görüntüle", color: "#f0b132", action: onOpenAnalytics },
      { icon: "🪝", title: "Webhooks", desc: "Webhook ayarları", color: "#9b59b6", action: onOpenWebhooks },
      { icon: "🤖", title: "Oto Yanıtlayıcı", desc: "Otomatik yanıtlar", color: "#5865f2", action: onOpenAutoResponder },
      { icon: "🔗", title: "Vanity URL", desc: "Özel URL'ler", color: "#1abc9c", action: onOpenVanityURL }
    ].map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        onClick: /* @__PURE__ */ __name(() => {
          item.action?.();
          onClose();
        }, "onClick"),
        style: { ...styles.statCard, cursor: "pointer", borderLeft: `4px solid ${item.color}` },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "14px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "28px" }, children: item.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#fff", fontWeight: "600", fontSize: "14px" }, children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#6b7280", fontSize: "11px" }, children: item.desc })
          ] })
        ] })
      },
      idx
    )) })
  ] });
}, "QuickActionsTab");
const UserDetailModal = /* @__PURE__ */ __name(({
  handleUserAction,
  openEditUserModal,
  selectedUser,
  setActionModal,
  setPasswordResetModal,
  setSelectedUser
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10
  }, onClick: /* @__PURE__ */ __name(() => setSelectedUser(null), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    backgroundColor: "#1a1a1e",
    borderRadius: "12px",
    padding: "24px",
    width: "550px",
    maxHeight: "80vh",
    overflowY: "auto",
    border: "1px solid #2a2a2e"
  }, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        width: "64px",
        height: "64px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #5865f2, #7c3aed)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: "700",
        fontSize: "24px"
      }, children: selectedUser.username?.charAt(0).toUpperCase() }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { color: "#fff", margin: 0, fontSize: "20px" }, children: selectedUser.username }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#6b7280", fontSize: "13px" }, children: selectedUser.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: "#5865f2", fontSize: "14px", fontFamily: "monospace", marginTop: "4px" }, children: [
          "🎫 #",
          selectedUser.friend_code || "N/A"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginLeft: "auto", display: "flex", gap: "4px", flexWrap: "wrap" }, children: [
        selectedUser.is_staff && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.badge("#e74c3c"), children: "👑 Admin" }),
        selectedUser.is_premium && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.badge("#ffd700"), children: "⭐ Premium" }),
        selectedUser.is_whitelisted && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.badge("#9b59b6"), children: "💎 Whitelist" }),
        selectedUser.has_spotify && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.badge("#1db954"), children: "🎵 Spotify" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "12px",
      marginBottom: "20px",
      padding: "16px",
      backgroundColor: "#2a2a2e",
      borderRadius: "10px"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "24px", fontWeight: "700", color: "#23a559" }, children: selectedUser.level || 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "11px", color: "#6b7280" }, children: "Seviye" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "24px", fontWeight: "700", color: "#5865f2" }, children: (selectedUser.xp || 0).toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "11px", color: "#6b7280" }, children: "XP" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "24px", fontWeight: "700", color: "#ffd700" }, children: (selectedUser.coins || 0).toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "11px", color: "#6b7280" }, children: "Coin" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "24px", fontWeight: "700", color: "#f0b132" }, children: (selectedUser.total_messages || 0).toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "11px", color: "#6b7280" }, children: "Mesaj" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
      marginBottom: "20px",
      fontSize: "13px"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "10px", backgroundColor: "#2a2a2e", borderRadius: "8px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#6b7280" }, children: "🆔 ID:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#fff", marginLeft: "8px" }, children: selectedUser.id })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "10px", backgroundColor: "#2a2a2e", borderRadius: "8px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#6b7280" }, children: "📅 Kayıt:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#fff", marginLeft: "8px" }, children: selectedUser.created?.split("T")[0] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "10px", backgroundColor: "#2a2a2e", borderRadius: "8px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#6b7280" }, children: "🏠 Sunucu:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#fff", marginLeft: "8px" }, children: selectedUser.servers_joined || 0 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "10px", backgroundColor: "#2a2a2e", borderRadius: "8px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#6b7280" }, children: "👥 Arkadaş:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#fff", marginLeft: "8px" }, children: selectedUser.friends_count || 0 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "10px", backgroundColor: "#2a2a2e", borderRadius: "8px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#6b7280" }, children: "🕐 Son Giriş:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#fff", marginLeft: "8px" }, children: selectedUser.last_login?.split("T")[0] || "N/A" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "10px", backgroundColor: "#2a2a2e", borderRadius: "8px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#6b7280" }, children: "👁️ Son Görülme:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#fff", marginLeft: "8px" }, children: selectedUser.last_seen?.split("T")[0] || "N/A" })
      ] })
    ] }),
    selectedUser.status_message && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "12px", backgroundColor: "#2a2a2e", borderRadius: "8px", marginBottom: "20px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#6b7280", fontSize: "11px", marginBottom: "4px" }, children: "📝 Durum Mesajı" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: "#fff", fontSize: "14px" }, children: [
        '"',
        selectedUser.status_message,
        '"'
      ] })
    ] }),
    selectedUser.social_links && Object.keys(selectedUser.social_links).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "12px", backgroundColor: "#2a2a2e", borderRadius: "8px", marginBottom: "20px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#6b7280", fontSize: "11px", marginBottom: "8px" }, children: "🔗 Sosyal Bağlantılar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: "8px" }, children: Object.entries(selectedUser.social_links).map(([key, value]) => value && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { ...styles.badge("#5865f2"), fontSize: "12px" }, children: [
        key,
        ": ",
        value
      ] }, key)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px", flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: styles.actionBtn("#5865f2"), onClick: /* @__PURE__ */ __name(() => {
        openEditUserModal(selectedUser);
        setSelectedUser(null);
      }, "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaEdit, {}),
        " Düzenle"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: styles.actionBtn("#f59e0b"), onClick: /* @__PURE__ */ __name(() => {
        setPasswordResetModal(selectedUser);
        setSelectedUser(null);
      }, "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaKey, {}),
        " Şifre Değiştir"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: styles.actionBtn("#f0b132"), onClick: /* @__PURE__ */ __name(() => handleUserAction("warn", selectedUser.id), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, {}),
        " Uyar"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: styles.actionBtn("#8b5cf6"), onClick: /* @__PURE__ */ __name(() => handleUserAction("reset_2fa", selectedUser.id), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaLock, {}),
        " 2FA Sıfırla"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: styles.actionBtn("#06b6d4"), onClick: /* @__PURE__ */ __name(() => handleUserAction("verify_email", selectedUser.id), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaEnvelope, {}),
        " Email Doğrula"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: styles.actionBtn("#10b981"), onClick: /* @__PURE__ */ __name(() => handleUserAction("give_premium", selectedUser.id), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaStar, {}),
        " Premium Ver"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: styles.actionBtn("#ec4899"), onClick: /* @__PURE__ */ __name(() => handleUserAction("remove_premium", selectedUser.id), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaStar, {}),
        " Premium Kaldır"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: styles.actionBtn("#6366f1"), onClick: /* @__PURE__ */ __name(() => handleUserAction("force_logout", selectedUser.id), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaLock, {}),
        " Oturumu Sonlandır"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: styles.actionBtn("#f97316"), onClick: /* @__PURE__ */ __name(() => handleUserAction("reset_avatar", selectedUser.id), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaImage, {}),
        " Avatar Sıfırla"
      ] }),
      selectedUser.is_active !== false ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: styles.actionBtn("#e74c3c"), onClick: /* @__PURE__ */ __name(() => setActionModal({ type: "ban", user: selectedUser }), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaBan, {}),
        " Yasakla"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: styles.actionBtn("#23a559"), onClick: /* @__PURE__ */ __name(() => handleUserAction("unban", selectedUser.id), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheckCircle, {}),
        " Yasağı Kaldır"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: styles.actionBtn("#dc2626"), onClick: /* @__PURE__ */ __name(() => setActionModal({ type: "delete", user: selectedUser }), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}),
        " Kullanıcıyı Sil"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: { ...styles.actionBtn("#6b7280"), marginLeft: "auto" }, onClick: /* @__PURE__ */ __name(() => setSelectedUser(null), "onClick"), children: "Kapat" })
    ] })
  ] }) });
}, "UserDetailModal");
const ActionConfirmationModal = /* @__PURE__ */ __name(({ actionModal, handleUserAction, setActionModal, setSelectedUser }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10
  }, onClick: /* @__PURE__ */ __name(() => setActionModal(null), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    backgroundColor: "#1a1a1e",
    borderRadius: "12px",
    padding: "24px",
    width: "420px",
    border: "1px solid #2a2a2e"
  }, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { color: actionModal.type === "delete" ? "#dc2626" : "#f0b132", marginTop: 0 }, children: actionModal.type === "delete" ? "🗑️ Kullanıcıyı Sil" : actionModal.type === "ban" ? "⛔ Kullanıcıyı Yasakla" : "⚠️ İşlem Onayla" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "#9ca3af", lineHeight: "1.6" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "#fff" }, children: actionModal.user?.username }),
      actionModal.type === "delete" ? " kullanıcısını kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz! Tüm mesajları, sunucu üyelikleri ve profili silinecektir." : actionModal.type === "ban" ? " kullanıcısını yasaklamak istediğinizden emin misiniz? Kullanıcı giriş yapamayacaktır." : " üzerinde bu işlemi yapmak istediğinizden emin misiniz?"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px", marginTop: "16px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          style: styles.actionBtn(actionModal.type === "delete" ? "#dc2626" : "#e74c3c"),
          onClick: /* @__PURE__ */ __name(() => {
            handleUserAction(actionModal.type, actionModal.user?.id);
            setSelectedUser(null);
          }, "onClick"),
          children: actionModal.type === "delete" ? "🗑️ Kalıcı Olarak Sil" : "Onayla"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: styles.actionBtn("#6b7280"), onClick: /* @__PURE__ */ __name(() => setActionModal(null), "onClick"), children: "İptal" })
    ] })
  ] }) });
}, "ActionConfirmationModal");
const PasswordResetModal = /* @__PURE__ */ __name(({
  handleUserAction,
  newPassword,
  passwordResetModal,
  setNewPassword,
  setPasswordResetModal
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10
  }, onClick: /* @__PURE__ */ __name(() => {
    setPasswordResetModal(null);
    setNewPassword("");
  }, "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    backgroundColor: "#1a1a1e",
    borderRadius: "12px",
    padding: "24px",
    width: "420px",
    border: "1px solid #2a2a2e"
  }, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { color: "#f59e0b", marginTop: 0 }, children: [
      "🔑 Şifre Değiştir — ",
      passwordResetModal.username
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "16px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { color: "#9ca3af", fontSize: "13px", display: "block", marginBottom: "6px" }, children: "Yeni Şifre" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: newPassword,
          onChange: /* @__PURE__ */ __name((e) => setNewPassword(e.target.value), "onChange"),
          placeholder: "Yeni şifre girin (min 6 karakter)",
          style: {
            width: "100%",
            padding: "10px 14px",
            backgroundColor: "#111113",
            border: "1px solid #2a2a2e",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "14px",
            outline: "none",
            boxSizing: "border-box"
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          style: { ...styles.actionBtn("#f59e0b"), opacity: newPassword.length < 6 ? 0.5 : 1 },
          disabled: newPassword.length < 6,
          onClick: /* @__PURE__ */ __name(async () => {
            await handleUserAction("reset_password", passwordResetModal.id, { new_password: newPassword });
            setPasswordResetModal(null);
            setNewPassword("");
          }, "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaKey, {}),
            " Şifreyi Değiştir"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: styles.actionBtn("#6b7280"), onClick: /* @__PURE__ */ __name(() => {
        setPasswordResetModal(null);
        setNewPassword("");
      }, "onClick"), children: "İptal" })
    ] })
  ] }) });
}, "PasswordResetModal");
const BroadcastModal = /* @__PURE__ */ __name(({ announceText, handleBroadcast, setAnnounceText, setBroadcastModal }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10
  }, onClick: /* @__PURE__ */ __name(() => setBroadcastModal(false), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    backgroundColor: "#1a1a1e",
    borderRadius: "12px",
    padding: "24px",
    width: "500px",
    border: "1px solid #2a2a2e"
  }, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { color: "#fff", marginTop: 0 }, children: "📢 Duyuru Gönder" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        value: announceText,
        onChange: /* @__PURE__ */ __name((e) => setAnnounceText(e.target.value), "onChange"),
        placeholder: "Mesajınızı yazın...",
        style: {
          width: "100%",
          minHeight: "100px",
          padding: "12px",
          backgroundColor: "#111113",
          border: "1px solid #2a2a2e",
          borderRadius: "8px",
          color: "#fff",
          fontSize: "14px",
          resize: "vertical",
          outline: "none",
          marginBottom: "12px"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: styles.actionBtn("#5865f2"), onClick: handleBroadcast, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPaperPlane, {}),
        " Gönder"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: styles.actionBtn("#6b7280"), onClick: /* @__PURE__ */ __name(() => setBroadcastModal(false), "onClick"), children: "İptal" })
    ] })
  ] }) });
}, "BroadcastModal");
const EditUserModal = /* @__PURE__ */ __name(({
  editUserForm,
  editUserLoading,
  editUserModal,
  handleUpdateUser,
  setEditUserForm,
  setEditUserModal
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 15
  }, onClick: /* @__PURE__ */ __name(() => setEditUserModal(null), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    backgroundColor: "#1a1a1e",
    borderRadius: "12px",
    padding: "24px",
    width: "600px",
    maxHeight: "85vh",
    overflowY: "auto",
    border: "1px solid #2a2a2e"
  }, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #f0b132, #e67e22)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: "700",
        fontSize: "20px"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaEdit, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { color: "#fff", margin: 0, fontSize: "18px" }, children: "✏️ Kullanıcı Düzenle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: "#6b7280", fontSize: "12px" }, children: [
          "ID: ",
          editUserModal.id,
          " | ",
          editUserModal.username
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setEditUserModal(null), "onClick"), style: { ...styles.actionBtn("#e74c3c"), marginLeft: "auto", padding: "8px 12px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { color: "#9ca3af", fontSize: "11px", display: "block", marginBottom: "4px" }, children: "👤 Kullanıcı Adı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: editUserForm.username || "",
            onChange: /* @__PURE__ */ __name((e) => setEditUserForm((f) => ({ ...f, username: e.target.value })), "onChange"),
            style: styles.searchInput
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { color: "#9ca3af", fontSize: "11px", display: "block", marginBottom: "4px" }, children: "📧 Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "email",
            value: editUserForm.email || "",
            onChange: /* @__PURE__ */ __name((e) => setEditUserForm((f) => ({ ...f, email: e.target.value })), "onChange"),
            style: styles.searchInput
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { color: "#9ca3af", fontSize: "11px", display: "block", marginBottom: "4px" }, children: "💰 Coin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            value: editUserForm.coins || 0,
            onChange: /* @__PURE__ */ __name((e) => setEditUserForm((f) => ({ ...f, coins: parseInt(e.target.value) || 0 })), "onChange"),
            style: styles.searchInput
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { color: "#9ca3af", fontSize: "11px", display: "block", marginBottom: "4px" }, children: "⭐ Seviye" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            value: editUserForm.level || 1,
            onChange: /* @__PURE__ */ __name((e) => setEditUserForm((f) => ({ ...f, level: parseInt(e.target.value) || 1 })), "onChange"),
            style: styles.searchInput
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { color: "#9ca3af", fontSize: "11px", display: "block", marginBottom: "4px" }, children: "🎮 XP" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            value: editUserForm.xp || 0,
            onChange: /* @__PURE__ */ __name((e) => setEditUserForm((f) => ({ ...f, xp: parseInt(e.target.value) || 0 })), "onChange"),
            style: styles.searchInput
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { color: "#9ca3af", fontSize: "11px", display: "block", marginBottom: "4px" }, children: "🎭 Rol" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: editUserForm.role || "member",
            onChange: /* @__PURE__ */ __name((e) => setEditUserForm((f) => ({ ...f, role: e.target.value })), "onChange"),
            style: styles.searchInput,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "member", children: "Üye" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "admin", children: "Yönetici" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { gridColumn: "1 / -1" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { color: "#9ca3af", fontSize: "11px", display: "block", marginBottom: "4px" }, children: "📝 Durum Mesajı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: editUserForm.status_message || "",
            onChange: /* @__PURE__ */ __name((e) => setEditUserForm((f) => ({ ...f, status_message: e.target.value })), "onChange"),
            style: styles.searchInput,
            placeholder: "Durum mesajı..."
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginTop: "16px" }, children: [
      { key: "is_active", label: "✅ Aktif", color: "#23a559" },
      { key: "is_staff", label: "👑 Admin", color: "#e74c3c" },
      { key: "is_premium", label: "⭐ Premium", color: "#ffd700" },
      { key: "email_verified", label: "📧 Doğrulanmış", color: "#5865f2" }
    ].map((toggle) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        onClick: /* @__PURE__ */ __name(() => setEditUserForm((f) => ({ ...f, [toggle.key]: !f[toggle.key] })), "onClick"),
        style: {
          padding: "10px",
          borderRadius: "8px",
          cursor: "pointer",
          textAlign: "center",
          backgroundColor: editUserForm[toggle.key] ? `${toggle.color}20` : "#2a2a2e",
          border: `1px solid ${editUserForm[toggle.key] ? toggle.color : "#3a3a3e"}`,
          transition: "all 0.2s"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "12px", fontWeight: "600", color: editUserForm[toggle.key] ? toggle.color : "#6b7280" }, children: toggle.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "10px", color: editUserForm[toggle.key] ? "#fff" : "#6b7280", marginTop: "2px" }, children: editUserForm[toggle.key] ? "Açık" : "Kapalı" })
        ]
      },
      toggle.key
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px", marginTop: "20px", justifyContent: "flex-end" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: { ...styles.actionBtn("#6b7280"), padding: "10px 20px" }, onClick: /* @__PURE__ */ __name(() => setEditUserModal(null), "onClick"), children: "İptal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          style: { ...styles.actionBtn("#23a559"), padding: "10px 20px", opacity: editUserLoading ? 0.6 : 1 },
          onClick: handleUpdateUser,
          disabled: editUserLoading,
          children: editUserLoading ? "⏳ Kaydediliyor..." : "💾 Kaydet"
        }
      )
    ] })
  ] }) });
}, "EditUserModal");
const ServerDetailModal = /* @__PURE__ */ __name(({ selectedServer, setSelectedServer }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 15
  }, onClick: /* @__PURE__ */ __name(() => setSelectedServer(null), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    backgroundColor: "#1a1a1e",
    borderRadius: "12px",
    padding: "24px",
    width: "600px",
    maxHeight: "80vh",
    overflowY: "auto",
    border: "1px solid #2a2a2e"
  }, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { color: "#fff", margin: 0 }, children: [
        "🏠 ",
        selectedServer.name
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setSelectedServer(null), "onClick"), style: styles.actionBtn("#e74c3c"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "16px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.miniCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "20px", fontWeight: "700", color: "#5865f2" }, children: selectedServer.member_count }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "10px", color: "#6b7280" }, children: "Üye" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.miniCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "20px", fontWeight: "700", color: "#23a559" }, children: selectedServer.channel_count }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "10px", color: "#6b7280" }, children: "Kanal" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.miniCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "20px", fontWeight: "700", color: "#f0b132" }, children: selectedServer.owner }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "10px", color: "#6b7280" }, children: "Sahip" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "16px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { style: { color: "#fff", fontSize: "14px", marginBottom: "8px" }, children: [
        "👥 Üyeler (",
        selectedServer.members?.length || 0,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { maxHeight: "200px", overflowY: "auto", backgroundColor: "#111113", borderRadius: "8px" }, children: selectedServer.members?.map((member, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        display: "flex",
        justifyContent: "space-between",
        padding: "8px 12px",
        borderBottom: "1px solid #2a2a2e",
        fontSize: "12px"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#fff" }, children: member.username }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.badge(member.role === "admin" ? "#e74c3c" : "#5865f2"), children: member.role })
      ] }, idx)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { style: { color: "#fff", fontSize: "14px", marginBottom: "8px" }, children: [
        "📁 Kanallar (",
        selectedServer.channels?.length || 0,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { maxHeight: "200px", overflowY: "auto", backgroundColor: "#111113", borderRadius: "8px" }, children: selectedServer.channels?.map((channel, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        display: "flex",
        justifyContent: "space-between",
        padding: "8px 12px",
        borderBottom: "1px solid #2a2a2e",
        fontSize: "12px"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#fff" }, children: [
          "#",
          channel.name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.badge("#5865f2"), children: channel.type })
      ] }, idx)) })
    ] })
  ] }) });
}, "ServerDetailModal");
const DeleteConfirmModal = /* @__PURE__ */ __name(({ deleteConfirm, handleServerDelete, setDeleteConfirm }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20
  }, onClick: /* @__PURE__ */ __name(() => setDeleteConfirm(null), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    backgroundColor: "#1a1a1e",
    borderRadius: "12px",
    padding: "24px",
    width: "400px",
    border: "1px solid #e74c3c40"
  }, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { color: "#e74c3c", marginTop: 0 }, children: "⚠️ Silme Onayı" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "#9ca3af" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { style: { color: "#fff" }, children: [
        '"',
        deleteConfirm.name,
        '"'
      ] }),
      " silmek istediğinizden emin misiniz?",
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#e74c3c", fontSize: "12px" }, children: "Bu işlem geri alınamaz!" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px", marginTop: "16px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          style: { ...styles.actionBtn("#e74c3c"), padding: "10px 20px" },
          onClick: /* @__PURE__ */ __name(() => {
            if (deleteConfirm.type === "server") handleServerDelete(deleteConfirm.id, deleteConfirm.name);
          }, "onClick"),
          children: "🗑️ Sil"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: { ...styles.actionBtn("#6b7280"), padding: "10px 20px" }, onClick: /* @__PURE__ */ __name(() => setDeleteConfirm(null), "onClick"), children: "İptal" })
    ] })
  ] }) });
}, "DeleteConfirmModal");
const MENU_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, { size: 14 }) },
  { id: "users", label: "Kullanıcılar", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, { size: 14 }) },
  { id: "servers", label: "Sunucular", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaServer, { size: 14 }) },
  { id: "moderation", label: "Moderasyon", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserShield, { size: 14 }) },
  { id: "logs", label: "Loglar", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaBook, { size: 14 }) },
  { id: "database", label: "Veritabanı", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaDatabase, { size: 14 }) },
  { id: "system", label: "Sistem", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MdStorage, { size: 14 }) },
  { id: "security", label: "Güvenlik", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MdSecurity, { size: 14 }) },
  { id: "broadcast", label: "Duyuru", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaPaperPlane, { size: 14 }) },
  { id: "tools", label: "Araçlar", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTools, { size: 14 }) },
  { id: "quickActions", label: "Hızlı İşlem", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCog, { size: 14 }) }
];
const AdminPanelModal = /* @__PURE__ */ __name(({
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
  const api = useAdminAPI({ fetchWithAuth, apiBaseUrl, onClose });
  const renderContent = /* @__PURE__ */ __name(() => {
    switch (api.activeTab) {
      case "dashboard":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          DashboardTab,
          {
            detailedStats: api.detailedStats,
            fetchDetailedStats: api.fetchDetailedStats,
            fetchLiveActivity: api.fetchLiveActivity,
            fetchSecurityAlerts: api.fetchSecurityAlerts,
            liveActivities: api.liveActivities,
            securityAlerts: api.securityAlerts,
            servers: api.servers,
            setBroadcastModal: api.setBroadcastModal,
            stats: api.stats,
            users: api.users
          }
        );
      case "users":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          UsersTab,
          {
            currentPage: api.currentPage,
            fetchUsers: api.fetchUsers,
            filterStatus: api.filterStatus,
            handleUserAction: api.handleUserAction,
            openEditUserModal: api.openEditUserModal,
            searchQuery: api.searchQuery,
            setActionModal: api.setActionModal,
            setCurrentPage: api.setCurrentPage,
            setFilterStatus: api.setFilterStatus,
            setPasswordResetModal: api.setPasswordResetModal,
            setSearchQuery: api.setSearchQuery,
            setSelectedUser: api.setSelectedUser,
            setSortField: api.setSortField,
            sortField: api.sortField,
            totalPages: api.totalPages,
            users: api.users
          }
        );
      case "servers":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ServersTab, { handleServerDetails: api.handleServerDetails, servers: api.servers, setDeleteConfirm: api.setDeleteConfirm });
      case "logs":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          LogsTab,
          {
            fetchSystemLogs: api.fetchSystemLogs,
            fetchUserActivity: api.fetchUserActivity,
            handleExportLogs: api.handleExportLogs,
            logDateFrom: api.logDateFrom,
            logDateTo: api.logDateTo,
            logLoading: api.logLoading,
            logSearch: api.logSearch,
            logSeverity: api.logSeverity,
            logStats: api.logStats,
            logType: api.logType,
            logs: api.logs,
            setLogDateFrom: api.setLogDateFrom,
            setLogDateTo: api.setLogDateTo,
            setLogSearch: api.setLogSearch,
            setLogSeverity: api.setLogSeverity,
            setLogType: api.setLogType,
            setUserActivityModal: api.setUserActivityModal,
            systemLogs: api.systemLogs,
            userActivityModal: api.userActivityModal
          }
        );
      case "moderation":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          ModerationTab,
          {
            bannedUsers: api.bannedUsers,
            handleUserAction: api.handleUserAction,
            onOpenAuditLogs,
            onOpenModTools,
            onOpenReports
          }
        );
      case "database":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          DatabaseTab,
          {
            backupStatus: api.backupStatus,
            dbStats: api.dbStats,
            handleBackup: api.handleBackup,
            handleClearCache: api.handleClearCache,
            handleDeleteOldLogs: api.handleDeleteOldLogs
          }
        );
      case "system":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(SystemHealthTab, { systemHealth: api.systemHealth });
      case "security":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(SecurityTab, { maintenanceMode: api.maintenanceMode, toggleMaintenance: api.toggleMaintenance });
      case "broadcast":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(BroadcastTab, { announceText: api.announceText, handleBroadcast: api.handleBroadcast, setAnnounceText: api.setAnnounceText });
      case "tools":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ToolsTab, { handleBackup: api.handleBackup, handleClearCache: api.handleClearCache });
      case "quickActions":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          QuickActionsTab,
          {
            onClose,
            onOpenAnalytics,
            onOpenAutoResponder,
            onOpenVanityURL,
            onOpenWebhooks
          }
        );
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          DashboardTab,
          {
            detailedStats: api.detailedStats,
            fetchDetailedStats: api.fetchDetailedStats,
            fetchLiveActivity: api.fetchLiveActivity,
            fetchSecurityAlerts: api.fetchSecurityAlerts,
            liveActivities: api.liveActivities,
            securityAlerts: api.securityAlerts,
            servers: api.servers,
            setBroadcastModal: api.setBroadcastModal,
            stats: api.stats,
            users: api.users
          }
        );
    }
  }, "renderContent");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCrown, { size: 20, color: "#ffd700" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "👑 Admin Panel - PAWSCORD" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.badge("#23a559"), children: "v2.0" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#6b7280", fontSize: "11px" }, children: [
          "🟢 ",
          api.realtimeStats.online,
          " Online"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.body, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.sidebar, children: MENU_ITEMS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => api.setActiveTab(item.id), "onClick"),
          style: styles.sidebarButton(api.activeTab === item.id),
          children: [
            item.icon,
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label })
          ]
        },
        item.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: api.loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaSync, { className: "spin", size: 24, color: "#5865f2" }) }) : renderContent() })
    ] }),
    api.selectedUser && /* @__PURE__ */ jsxRuntimeExports.jsx(
      UserDetailModal,
      {
        handleUserAction: api.handleUserAction,
        openEditUserModal: api.openEditUserModal,
        selectedUser: api.selectedUser,
        setActionModal: api.setActionModal,
        setPasswordResetModal: api.setPasswordResetModal,
        setSelectedUser: api.setSelectedUser
      }
    ),
    api.actionModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ActionConfirmationModal,
      {
        actionModal: api.actionModal,
        handleUserAction: api.handleUserAction,
        setActionModal: api.setActionModal,
        setSelectedUser: api.setSelectedUser
      }
    ),
    api.passwordResetModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      PasswordResetModal,
      {
        handleUserAction: api.handleUserAction,
        newPassword: api.newPassword,
        passwordResetModal: api.passwordResetModal,
        setNewPassword: api.setNewPassword,
        setPasswordResetModal: api.setPasswordResetModal
      }
    ),
    api.broadcastModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      BroadcastModal,
      {
        announceText: api.announceText,
        handleBroadcast: api.handleBroadcast,
        setAnnounceText: api.setAnnounceText,
        setBroadcastModal: api.setBroadcastModal
      }
    ),
    api.editUserModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditUserModal,
      {
        editUserForm: api.editUserForm,
        editUserLoading: api.editUserLoading,
        editUserModal: api.editUserModal,
        handleUpdateUser: api.handleUpdateUser,
        setEditUserForm: api.setEditUserForm,
        setEditUserModal: api.setEditUserModal
      }
    ),
    api.selectedServer && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ServerDetailModal,
      {
        selectedServer: api.selectedServer,
        setSelectedServer: api.setSelectedServer
      }
    ),
    api.deleteConfirm && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteConfirmModal,
      {
        deleteConfirm: api.deleteConfirm,
        handleServerDelete: api.handleServerDelete,
        setDeleteConfirm: api.setDeleteConfirm
      }
    )
  ] }) });
}, "AdminPanelModal");
export {
  AdminPanelModal as default
};
