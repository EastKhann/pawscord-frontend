var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a1 as FaShieldAlt, bf as FaUnlock, h as FaLock, ay as FaBan, a9 as FaCheck, d as FaExclamationTriangle, a0 as FaEye, z as FaClock, az as FaCog, a as FaTimes, O as FaChartLine, b9 as FaUserShield, aB as FaHistory, u as FaUsers } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const getActivityIcon = /* @__PURE__ */ __name((type) => {
  switch (type) {
    case "join":
      return "👋";
    case "leave":
      return "🚪";
    case "kick":
      return "👢";
    case "ban":
      return "🔨";
    case "suspicious":
      return "⚠️";
    case "raid_detected":
      return "🚨";
    case "verified":
      return "✅";
    default:
      return "📋";
  }
}, "getActivityIcon");
const getActivityColor = /* @__PURE__ */ __name((type) => {
  switch (type) {
    case "join":
      return "#23a559";
    case "leave":
      return "#f0b132";
    case "kick":
    case "ban":
      return "#da373c";
    case "suspicious":
    case "raid_detected":
      return "#f0b132";
    case "verified":
      return "#5865f2";
    default:
      return "#72767d";
  }
}, "getActivityColor");
const formatTime = /* @__PURE__ */ __name((timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
}, "formatTime");
const useRaidProtectionDashboard = /* @__PURE__ */ __name((serverId, apiBaseUrl) => {
  const [view, setView] = reactExports.useState("overview");
  const [protectionStatus, setProtectionStatus] = reactExports.useState({ enabled: false, lockdown_active: false });
  const [recentActivity, setRecentActivity] = reactExports.useState([]);
  const [pendingVerifications, setPendingVerifications] = reactExports.useState([]);
  const [raidLogs, setRaidLogs] = reactExports.useState([]);
  const [settings, setSettings] = reactExports.useState({
    join_rate_limit: 10,
    join_time_window: 60,
    mention_limit: 10,
    message_rate_limit: 15,
    new_account_threshold: 7,
    auto_ban_suspicious: false,
    captcha_on_join: false,
    dm_on_join_warning: true
  });
  const [loading, setLoading] = reactExports.useState(true);
  const [stats, setStats] = reactExports.useState({
    blocked_today: 0,
    verified_today: 0,
    raids_detected: 0,
    suspicious_accounts: 0
  });
  const activityRef = reactExports.useRef(null);
  const fetchProtectionStatus = /* @__PURE__ */ __name(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/moderation/raid-protection/status/?server_id=${serverId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setProtectionStatus(data.status || data);
        if (data.settings) setSettings(data.settings);
        if (data.stats) setStats(data.stats);
      }
    } catch (error) {
      console.error("Fetch protection status error:", error);
    }
  }, "fetchProtectionStatus");
  const fetchRecentActivity = /* @__PURE__ */ __name(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/moderation/raid-protection/activity/?server_id=${serverId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setRecentActivity(data.activities || []);
      }
    } catch (error) {
      console.error("Fetch activity error:", error);
    }
  }, "fetchRecentActivity");
  const fetchPendingVerifications = /* @__PURE__ */ __name(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/moderation/raid-protection/pending/?server_id=${serverId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setPendingVerifications(data.pending || []);
      }
    } catch (error) {
      console.error("Fetch pending error:", error);
    }
  }, "fetchPendingVerifications");
  const fetchRaidLogs = /* @__PURE__ */ __name(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/moderation/raid-protection/logs/?server_id=${serverId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setRaidLogs(data.logs || []);
      }
    } catch (error) {
      console.error("Fetch logs error:", error);
    }
  }, "fetchRaidLogs");
  reactExports.useEffect(() => {
    const loadData = /* @__PURE__ */ __name(async () => {
      setLoading(true);
      await Promise.all([
        fetchProtectionStatus(),
        fetchRecentActivity(),
        fetchPendingVerifications(),
        fetchRaidLogs()
      ]);
      setLoading(false);
    }, "loadData");
    loadData();
    const interval = setInterval(fetchRecentActivity, 5e3);
    return () => clearInterval(interval);
  }, [serverId]);
  const handleToggleProtection = /* @__PURE__ */ __name(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/moderation/raid-protection/toggle/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ server_id: serverId, enabled: !protectionStatus.enabled })
      });
      if (response.ok) {
        setProtectionStatus({ ...protectionStatus, enabled: !protectionStatus.enabled });
        toast.success(protectionStatus.enabled ? "⚠️ Koruma kapatıldı" : "🛡️ Koruma aktif!");
      }
    } catch (error) {
      console.error("Toggle protection error:", error);
    }
  }, "handleToggleProtection");
  const handleLockdown = /* @__PURE__ */ __name(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const endpoint = protectionStatus.lockdown_active ? "unlock" : "lockdown";
      const response = await fetch(`${apiBaseUrl}/moderation/raid-protection/${endpoint}/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ server_id: serverId })
      });
      if (response.ok) {
        setProtectionStatus({ ...protectionStatus, lockdown_active: !protectionStatus.lockdown_active });
        toast.success(protectionStatus.lockdown_active ? "🔓 Sunucu kilidi açıldı" : "🔒 Sunucu kilitlendi!");
      }
    } catch (error) {
      console.error("Lockdown error:", error);
    }
  }, "handleLockdown");
  const handleVerifyUser = /* @__PURE__ */ __name(async (userId, action) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/moderation/raid-protection/verify/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          server_id: serverId,
          user_id: userId,
          action
        })
      });
      if (response.ok) {
        setPendingVerifications(pendingVerifications.filter((u) => u.id !== userId));
        toast.success(action === "approve" ? "✅ Kullanıcı onaylandı" : "❌ Kullanıcı reddedildi");
      }
    } catch (error) {
      console.error("Verify user error:", error);
    }
  }, "handleVerifyUser");
  const handleSaveSettings = /* @__PURE__ */ __name(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/moderation/raid-protection/settings/`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ server_id: serverId, ...settings })
      });
      if (response.ok) {
        toast.success("✅ Ayarlar kaydedildi!");
      }
    } catch (error) {
      console.error("Save settings error:", error);
    }
  }, "handleSaveSettings");
  return {
    view,
    setView,
    protectionStatus,
    recentActivity,
    pendingVerifications,
    raidLogs,
    settings,
    setSettings,
    loading,
    stats,
    activityRef,
    handleToggleProtection,
    handleLockdown,
    handleVerifyUser,
    handleSaveSettings
  };
}, "useRaidProtectionDashboard");
const OverviewView = /* @__PURE__ */ __name(({
  protectionStatus,
  stats,
  recentActivity,
  activityRef,
  handleToggleProtection,
  handleLockdown
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overview-view", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quick-actions", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `action-btn ${protectionStatus.enabled ? "enabled" : ""}`,
          onClick: handleToggleProtection,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, {}),
            protectionStatus.enabled ? "Korumayı Kapat" : "Korumayı Aç"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `action-btn lockdown ${protectionStatus.lockdown_active ? "active" : ""}`,
          onClick: handleLockdown,
          children: [
            protectionStatus.lockdown_active ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaUnlock, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaLock, {}),
            protectionStatus.lockdown_active ? "Kilidi Aç" : "Sunucuyu Kilitle"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon blocked", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaBan, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: stats.blocked_today }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Bugün Engellenen" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon verified", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: stats.verified_today }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Bugün Doğrulanan" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon raids", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: stats.raids_detected }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Tespit Edilen Raid" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon suspicious", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaEye, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: stats.suspicious_accounts }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Şüpheli Hesap" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "activity-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {}),
        " Canlı Aktivite"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "activity-feed", ref: activityRef, children: recentActivity.length > 0 ? recentActivity.map((activity, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "activity-item",
          style: { borderLeftColor: getActivityColor(activity.type) },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "activity-icon", children: getActivityIcon(activity.type) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "activity-info", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "activity-user", children: activity.username }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "activity-action", children: activity.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "activity-time", children: formatTime(activity.timestamp) })
          ]
        },
        idx
      )) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-activity", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz aktivite yok" }) }) })
    ] })
  ] });
}, "OverviewView");
const SettingsView = /* @__PURE__ */ __name(({ settings, setSettings, handleSaveSettings }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-view", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaCog, {}),
      " Koruma Ayarları"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Katılım Limitleri" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Katılım Hız Limiti" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Belirli süre içinde maksimum katılım sayısı" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-control", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              value: settings.join_rate_limit,
              onChange: /* @__PURE__ */ __name((e) => setSettings({ ...settings, join_rate_limit: parseInt(e.target.value) }), "onChange"),
              min: "1",
              max: "100"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "kişi /" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              value: settings.join_time_window,
              onChange: /* @__PURE__ */ __name((e) => setSettings({ ...settings, join_time_window: parseInt(e.target.value) }), "onChange"),
              min: "10",
              max: "300"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "saniye" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Yeni Hesap Eşiği" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Bu günden eski hesaplar şüpheli sayılır" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-control", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              value: settings.new_account_threshold,
              onChange: /* @__PURE__ */ __name((e) => setSettings({ ...settings, new_account_threshold: parseInt(e.target.value) }), "onChange"),
              min: "1",
              max: "30"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "gün" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Mesaj Limitleri" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Mention Limiti" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Bir mesajdaki maksimum mention sayısı" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "setting-control", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            value: settings.mention_limit,
            onChange: /* @__PURE__ */ __name((e) => setSettings({ ...settings, mention_limit: parseInt(e.target.value) }), "onChange"),
            min: "1",
            max: "50"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Mesaj Hız Limiti" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "10 saniyede maksimum mesaj sayısı" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "setting-control", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            value: settings.message_rate_limit,
            onChange: /* @__PURE__ */ __name((e) => setSettings({ ...settings, message_rate_limit: parseInt(e.target.value) }), "onChange"),
            min: "1",
            max: "50"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Otomatik Aksiyonlar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-item toggle", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Şüpheli Hesapları Otomatik Banla" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Raid tespit edildiğinde şüpheli hesapları otomatik banla" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle-switch", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: settings.auto_ban_suspicious,
              onChange: /* @__PURE__ */ __name((e) => setSettings({ ...settings, auto_ban_suspicious: e.target.checked }), "onChange")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slider" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-item toggle", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Katılımda CAPTCHA" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Yeni üyeler katılırken CAPTCHA doğrulaması iste" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle-switch", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: settings.captcha_on_join,
              onChange: /* @__PURE__ */ __name((e) => setSettings({ ...settings, captcha_on_join: e.target.checked }), "onChange")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slider" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-item toggle", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Katılım Uyarı DM" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Şüpheli hesap katıldığında yöneticilere DM gönder" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle-switch", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: settings.dm_on_join_warning,
              onChange: /* @__PURE__ */ __name((e) => setSettings({ ...settings, dm_on_join_warning: e.target.checked }), "onChange")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slider" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "settings-actions", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "save-btn", onClick: handleSaveSettings, children: "Ayarları Kaydet" }) })
  ] });
}, "SettingsView");
const RaidProtectionDashboard = /* @__PURE__ */ __name(({ serverId, onClose, apiBaseUrl }) => {
  const {
    view,
    setView,
    protectionStatus,
    recentActivity,
    pendingVerifications,
    raidLogs,
    settings,
    setSettings,
    stats,
    activityRef,
    handleToggleProtection,
    handleLockdown,
    handleVerifyUser,
    handleSaveSettings
  } = useRaidProtectionDashboard(serverId, apiBaseUrl);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "raid-dashboard-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "raid-dashboard", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dashboard-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, {}),
        " Raid Koruma Paneli"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-status", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `status-badge ${protectionStatus.enabled ? "active" : "inactive"}`, children: protectionStatus.enabled ? "🛡️ Koruma Aktif" : "⚠️ Koruma Kapalı" }),
        protectionStatus.lockdown_active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "status-badge lockdown", children: "🔒 Lockdown" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dashboard-nav", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `nav-btn ${view === "overview" ? "active" : ""}`, onClick: /* @__PURE__ */ __name(() => setView("overview"), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, {}),
        " Genel Bakış"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `nav-btn ${view === "verify" ? "active" : ""}`, onClick: /* @__PURE__ */ __name(() => setView("verify"), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserShield, {}),
        " Doğrulama",
        pendingVerifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge", children: pendingVerifications.length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `nav-btn ${view === "logs" ? "active" : ""}`, onClick: /* @__PURE__ */ __name(() => setView("logs"), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, {}),
        " Loglar"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `nav-btn ${view === "settings" ? "active" : ""}`, onClick: /* @__PURE__ */ __name(() => setView("settings"), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCog, {}),
        " Ayarlar"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dashboard-content", children: [
      view === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        OverviewView,
        {
          protectionStatus,
          stats,
          recentActivity,
          activityRef,
          handleToggleProtection,
          handleLockdown
        }
      ),
      view === "verify" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "verify-view", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserShield, {}),
          " Bekleyen Doğrulamalar"
        ] }),
        pendingVerifications.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "verifications-list", children: pendingVerifications.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "verification-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: user.avatar || "/default-avatar.png", alt: user.username, className: "user-avatar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "user-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: user.username }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "user-meta", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {}),
                " Katılım: ",
                new Date(user.joined_at).toLocaleDateString("tr-TR")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, {}),
                " Hesap: ",
                user.account_age_days,
                " gün"
              ] })
            ] }),
            user.suspicious_reasons && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "suspicious-reasons", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, {}),
              user.suspicious_reasons.map((reason, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "reason-tag", children: reason }, idx))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "verification-actions", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "approve-btn", onClick: /* @__PURE__ */ __name(() => handleVerifyUser(user.id, "approve"), "onClick"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, {}),
              " Onayla"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "reject-btn", onClick: /* @__PURE__ */ __name(() => handleVerifyUser(user.id, "reject"), "onClick"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaBan, {}),
              " Reddet"
            ] })
          ] })
        ] }, user.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "no-verifications", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserShield, { className: "empty-icon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Bekleyen doğrulama yok" })
        ] })
      ] }),
      view === "logs" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "logs-view", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, {}),
          " Raid Logları"
        ] }),
        raidLogs.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "logs-list", children: raidLogs.map((log, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `log-item ${log.severity}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "log-header", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "log-type", children: [
              log.type === "raid_detected" && "🚨 Raid Tespit Edildi",
              log.type === "mass_ban" && "🔨 Toplu Ban",
              log.type === "lockdown" && "🔒 Lockdown",
              log.type === "unlock" && "🔓 Kilit Açıldı",
              log.type === "suspicious_activity" && "⚠️ Şüpheli Aktivite"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "log-time", children: new Date(log.timestamp).toLocaleString("tr-TR") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "log-description", children: log.description }),
          log.affected_users && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "affected-count", children: [
            log.affected_users,
            " kullanıcı etkilendi"
          ] })
        ] }, idx)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "no-logs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, { className: "empty-icon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz log kaydı yok" })
        ] })
      ] }),
      view === "settings" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SettingsView,
        {
          settings,
          setSettings,
          handleSaveSettings
        }
      )
    ] })
  ] }) });
}, "RaidProtectionDashboard");
export {
  RaidProtectionDashboard as default
};
