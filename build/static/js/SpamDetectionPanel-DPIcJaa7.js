var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { j as jsxRuntimeExports, r as reactExports } from "./react-core-BiY6fgAJ.js";
import { a1 as FaShieldAlt, ay as FaBan, d as FaExclamationTriangle, j as FaLink, b3 as FaAt, aB as FaHistory, cA as FaCommentSlash, aC as FaUserSlash, B as FaRobot, a9 as FaCheck, a as FaTimes, aE as FaChartBar, az as FaCog } from "./icons-vendor-2VDeY8fW.js";
import { g as getApiBase, t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const SENSITIVITY_PRESETS = {
  low: { messagesPerMinute: 15, duplicateThreshold: 5, mentionLimit: 10, linkLimit: 5, capsPercentage: 80 },
  medium: { messagesPerMinute: 10, duplicateThreshold: 3, mentionLimit: 5, linkLimit: 3, capsPercentage: 70 },
  high: { messagesPerMinute: 7, duplicateThreshold: 2, mentionLimit: 3, linkLimit: 2, capsPercentage: 60 },
  aggressive: { messagesPerMinute: 5, duplicateThreshold: 2, mentionLimit: 2, linkLimit: 1, capsPercentage: 50 }
};
const PATTERN_LABELS = {
  rapidMessages: "Hızlı Mesaj",
  duplicateContent: "Tekrarlanan İçerik",
  mentionSpam: "Etiket Spam",
  linkSpam: "Link Spam",
  capsLock: "BÜYÜK HARF",
  zalgoText: "Zalgo Metin"
};
const ACTION_LABELS = { warn: "Uyar", mute: "Sustur", kick: "At", ban: "Yasakla" };
const getPatternIcon = /* @__PURE__ */ __name((type) => {
  const icons = {
    rapidMessages: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCommentSlash, {}),
    duplicateContent: /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, {}),
    mentionSpam: /* @__PURE__ */ jsxRuntimeExports.jsx(FaAt, {}),
    linkSpam: /* @__PURE__ */ jsxRuntimeExports.jsx(FaLink, {}),
    capsLock: /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, {}),
    zalgoText: /* @__PURE__ */ jsxRuntimeExports.jsx(FaBan, {})
  };
  return icons[type] || /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, {});
}, "getPatternIcon");
const getActionColor = /* @__PURE__ */ __name((action) => {
  const colors = { warn: "#faa61a", mute: "#5865f2", kick: "#f04747", ban: "#ed4245" };
  return colors[action] || "#72767d";
}, "getActionColor");
const DEFAULT_STATS = {
  totalDetected: 0,
  todayDetected: 0,
  actionsTaken: { warn: 0, mute: 0, kick: 0, ban: 0 },
  topOffenders: [],
  recentDetections: []
};
const useSpamDetection = /* @__PURE__ */ __name(({ serverId, fetchWithAuth, apiBaseUrl }) => {
  const [settings, setSettings] = reactExports.useState({
    enabled: true,
    sensitivity: "medium",
    actions: { warn: true, mute: true, kick: false, ban: false },
    patterns: {
      rapidMessages: true,
      duplicateContent: true,
      mentionSpam: true,
      linkSpam: true,
      capsLock: true,
      zalgoText: true
    },
    thresholds: SENSITIVITY_PRESETS.medium,
    whitelist: [],
    customPatterns: []
  });
  const [stats, setStats] = reactExports.useState(DEFAULT_STATS);
  const [loading, setLoading] = reactExports.useState(true);
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const fetchSettings = reactExports.useCallback(async () => {
    setLoading(true);
    const baseUrl = apiBaseUrl || getApiBase();
    try {
      const response = await fetchWithAuth(`${baseUrl}/api/servers/${serverId}/spam-settings/`);
      if (response.ok) {
        const data = await response.json();
        setSettings((prev) => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.error("Failed to fetch spam settings:", err);
    }
    try {
      const statsResponse = await fetchWithAuth(`${baseUrl}/api/servers/${serverId}/spam-stats/`);
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats((prev) => ({ ...prev, ...statsData }));
      } else {
        setStats(DEFAULT_STATS);
      }
    } catch (err) {
      console.error("Failed to fetch spam stats:", err);
      setStats(DEFAULT_STATS);
    }
    setLoading(false);
  }, [serverId, fetchWithAuth, apiBaseUrl]);
  reactExports.useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);
  const handleSensitivityChange = /* @__PURE__ */ __name((level) => {
    setSettings((prev) => ({ ...prev, sensitivity: level, thresholds: SENSITIVITY_PRESETS[level] }));
  }, "handleSensitivityChange");
  const handlePatternToggle = /* @__PURE__ */ __name((pattern) => {
    setSettings((prev) => ({ ...prev, patterns: { ...prev.patterns, [pattern]: !prev.patterns[pattern] } }));
  }, "handlePatternToggle");
  const handleActionToggle = /* @__PURE__ */ __name((action) => {
    setSettings((prev) => ({ ...prev, actions: { ...prev.actions, [action]: !prev.actions[action] } }));
  }, "handleActionToggle");
  const toggleEnabled = /* @__PURE__ */ __name(() => {
    setSettings((prev) => ({ ...prev, enabled: !prev.enabled }));
  }, "toggleEnabled");
  const saveSettings = /* @__PURE__ */ __name(async () => {
    try {
      const baseUrl = apiBaseUrl || getApiBase();
      const response = await fetchWithAuth(`${baseUrl}/api/servers/${serverId}/spam-settings/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      });
      if (response.ok) toast.success("Spam koruma ayarları kaydedildi! ✅");
      else toast.error("Ayarlar kaydedilemedi");
    } catch (err) {
      console.error("Failed to save settings:", err);
      toast.error("Bir hata oluştu");
    }
  }, "saveSettings");
  return {
    settings,
    stats,
    loading,
    activeTab,
    setActiveTab,
    handleSensitivityChange,
    handlePatternToggle,
    handleActionToggle,
    toggleEnabled,
    saveSettings
  };
}, "useSpamDetection");
const styles = {
  container: { backgroundColor: "#2f3136", borderRadius: "8px", overflow: "hidden" },
  loading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    padding: "60px",
    color: "#b9bbbe"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #202225"
  },
  headerLeft: { display: "flex", alignItems: "center", gap: "16px" },
  headerRight: { display: "flex", alignItems: "center" },
  title: { margin: 0, fontSize: "18px", fontWeight: "600", color: "#fff" },
  subtitle: { margin: "4px 0 0", fontSize: "13px", color: "#72767d" },
  statusBadge: { padding: "6px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "600" },
  tabs: { display: "flex", padding: "0 20px", borderBottom: "1px solid #202225", gap: "8px" },
  tab: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 16px",
    border: "none",
    borderRadius: "4px 4px 0 0",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    transition: "all 0.15s"
  },
  content: { padding: "20px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "24px" },
  statCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px",
    backgroundColor: "#202225",
    borderRadius: "8px"
  },
  statIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    backgroundColor: "#36393f",
    borderRadius: "8px"
  },
  statInfo: { flex: 1 },
  statValue: { fontSize: "20px", fontWeight: "700", color: "#fff" },
  statLabel: { fontSize: "12px", color: "#72767d" },
  section: { marginBottom: "24px" },
  sectionTitle: {
    margin: "0 0 16px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  detectionsList: { display: "flex", flexDirection: "column", gap: "8px" },
  detectionItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    backgroundColor: "#202225",
    borderRadius: "6px"
  },
  detectionIcon: { color: "#faa61a" },
  detectionInfo: { flex: 1 },
  detectionUser: { display: "flex", alignItems: "center", gap: "8px", color: "#fff", fontSize: "14px" },
  detectionType: {
    fontSize: "11px",
    color: "#72767d",
    backgroundColor: "#40444b",
    padding: "2px 6px",
    borderRadius: "3px"
  },
  detectionMessage: { fontSize: "12px", color: "#72767d", marginTop: "4px" },
  actionBadge: {
    padding: "4px 10px",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "uppercase"
  },
  offendersList: { display: "flex", flexDirection: "column", gap: "8px" },
  offenderItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    backgroundColor: "#202225",
    borderRadius: "6px"
  },
  offenderRank: {
    width: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#40444b",
    borderRadius: "50%",
    fontSize: "12px",
    fontWeight: "600",
    color: "#fff"
  },
  offenderInfo: { flex: 1, display: "flex", flexDirection: "column" },
  offenderName: { color: "#fff", fontSize: "14px", fontWeight: "500" },
  offenderCount: { color: "#72767d", fontSize: "12px" },
  settingRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "#202225",
    borderRadius: "8px",
    marginBottom: "16px"
  },
  settingInfo: { display: "flex", alignItems: "center", gap: "12px" },
  settingTitle: { color: "#fff", fontSize: "14px", fontWeight: "500" },
  settingDesc: { color: "#72767d", fontSize: "12px" },
  toggleButton: {
    width: "44px",
    height: "24px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    transition: "background-color 0.2s"
  },
  sensitivityGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" },
  sensitivityButton: {
    padding: "12px",
    border: "2px solid transparent",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#fff",
    fontSize: "13px",
    fontWeight: "500",
    transition: "all 0.15s"
  },
  patternsGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" },
  patternItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    backgroundColor: "#202225",
    borderRadius: "6px"
  },
  patternInfo: { display: "flex", alignItems: "center", gap: "10px", color: "#dcddde", fontSize: "13px" },
  miniToggle: {
    width: "28px",
    height: "18px",
    border: "none",
    borderRadius: "9px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    transition: "background-color 0.2s"
  },
  actionsGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" },
  actionItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    backgroundColor: "#202225",
    borderRadius: "6px"
  },
  actionInfo: { display: "flex", alignItems: "center", gap: "8px", color: "#dcddde", fontSize: "13px" },
  actionDot: { width: "8px", height: "8px", borderRadius: "50%" },
  saveButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: "100%",
    padding: "12px",
    backgroundColor: "#43b581",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.15s"
  },
  logsHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" },
  filterSelect: {
    padding: "8px 12px",
    backgroundColor: "#202225",
    border: "1px solid #40444b",
    borderRadius: "4px",
    color: "#dcddde",
    fontSize: "13px"
  },
  logsList: { display: "flex", flexDirection: "column", gap: "8px" },
  logItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "12px 16px",
    backgroundColor: "#202225",
    borderRadius: "6px"
  },
  logTime: { fontSize: "11px", color: "#72767d", whiteSpace: "nowrap" },
  logContent: { flex: 1, fontSize: "13px", color: "#dcddde" },
  logMessage: { fontSize: "12px", color: "#72767d", marginTop: "4px", fontStyle: "italic" }
};
const OverviewTab = /* @__PURE__ */ __name(({ stats, settings }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statsGrid, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statIcon, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, { size: 20, color: "#43b581" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: stats.totalDetected }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Toplam Tespit" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statIcon, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, { size: 20, color: "#faa61a" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: stats.todayDetected }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Bugün" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statIcon, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserSlash, { size: 20, color: "#f04747" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: stats.actionsTaken?.ban || 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Ban" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statIcon, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, { size: 20, color: "#5865f2" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: Object.values(settings.patterns).filter(Boolean).length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Aktif Kural" })
      ] })
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "Son Tespitler" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.detectionsList, children: stats.recentDetections.map((detection, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.detectionItem, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.detectionIcon, children: getPatternIcon(detection.type) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.detectionInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.detectionUser, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: detection.username }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.detectionType, children: detection.type })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.detectionMessage, children: [
          detection.message.substring(0, 50),
          "..."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.actionBadge, backgroundColor: getActionColor(detection.action) }, children: detection.action })
    ] }, index)) })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "En Çok İhlal Edenler" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.offendersList, children: stats.topOffenders.map((offender, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.offenderItem, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.offenderRank, children: [
        "#",
        index + 1
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.offenderInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.offenderName, children: offender.username }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.offenderCount, children: [
          offender.count,
          " ihlal"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.actionBadge, backgroundColor: getActionColor(offender.lastAction) }, children: offender.lastAction })
    ] }, index)) })
  ] })
] }), "OverviewTab");
const SettingsTab = /* @__PURE__ */ __name(({ settings, isAdmin, onSensitivityChange, onPatternToggle, onActionToggle, onToggleEnabled, onSave }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingRow, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingInfo, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, { size: 18, color: "#43b581" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.settingTitle, children: "Spam Koruması" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.settingDesc, children: "Otomatik spam algılama ve önleme" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        style: { ...styles.toggleButton, backgroundColor: settings.enabled ? "#43b581" : "#72767d" },
        onClick: onToggleEnabled,
        children: settings.enabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {})
      }
    )
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "Hassasiyet Seviyesi" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.sensitivityGrid, children: [
      { key: "low", label: "🐢 Düşük" },
      { key: "medium", label: "⚖️ Orta" },
      { key: "high", label: "🔥 Yüksek" },
      { key: "aggressive", label: "⚡ Agresif" }
    ].map(({ key, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        style: {
          ...styles.sensitivityButton,
          backgroundColor: settings.sensitivity === key ? "#5865f2" : "#40444b",
          borderColor: settings.sensitivity === key ? "#5865f2" : "transparent"
        },
        onClick: /* @__PURE__ */ __name(() => onSensitivityChange(key), "onClick"),
        children: label
      },
      key
    )) })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "Algılama Kalıpları" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.patternsGrid, children: Object.entries(settings.patterns).map(([pattern, enabled]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.patternItem, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.patternInfo, children: [
        getPatternIcon(pattern),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: PATTERN_LABELS[pattern] || pattern })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          style: { ...styles.miniToggle, backgroundColor: enabled ? "#43b581" : "#72767d" },
          onClick: /* @__PURE__ */ __name(() => onPatternToggle(pattern), "onClick"),
          children: enabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { size: 10 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { size: 10 })
        }
      )
    ] }, pattern)) })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "Otomatik Eylemler" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.actionsGrid, children: Object.entries(settings.actions).map(([action, enabled]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.actionItem, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.actionInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.actionDot, backgroundColor: getActionColor(action) } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ACTION_LABELS[action] || action })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          style: { ...styles.miniToggle, backgroundColor: enabled ? "#43b581" : "#72767d" },
          onClick: /* @__PURE__ */ __name(() => onActionToggle(action), "onClick"),
          children: enabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { size: 10 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { size: 10 })
        }
      )
    ] }, action)) })
  ] }),
  isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: styles.saveButton, onClick: onSave, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, {}),
    " Ayarları Kaydet"
  ] })
] }), "SettingsTab");
const LogsTab = /* @__PURE__ */ __name(({ stats }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.logsHeader, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "Spam Kayıtları" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { style: styles.filterSelect, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Tüm Eylemler" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "warn", children: "Uyarılar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "mute", children: "Susturmalar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "kick", children: "Atmalar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ban", children: "Yasaklamalar" })
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.logsList, children: stats.recentDetections.map((log, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.logItem, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.logTime, children: new Date(log.timestamp).toLocaleString("tr-TR") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.logContent, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: log.username }),
      " - ",
      log.type,
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.logMessage, children: [
        '"',
        log.message,
        '"'
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.actionBadge, backgroundColor: getActionColor(log.action) }, children: log.action })
  ] }, index)) })
] }), "LogsTab");
const SpamDetectionPanel = /* @__PURE__ */ __name(({ serverId, fetchWithAuth, apiBaseUrl, isAdmin = false }) => {
  const api = useSpamDetection({ serverId, fetchWithAuth, apiBaseUrl });
  if (api.loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.container, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.loading, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, { className: "pulse", size: 32, color: "#5865f2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Spam koruma sistemi yükleniyor..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, { size: 24, color: "#43b581" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Spam Koruma Sistemi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.subtitle, children: "ML tabanlı akıllı spam algılama" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.headerRight, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        ...styles.statusBadge,
        backgroundColor: api.settings.enabled ? "rgba(67, 181, 129, 0.2)" : "rgba(240, 71, 71, 0.2)",
        color: api.settings.enabled ? "#43b581" : "#f04747"
      }, children: api.settings.enabled ? "✓ Aktif" : "✗ Kapalı" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.tabs, children: ["overview", "settings", "logs"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        style: { ...styles.tab, backgroundColor: api.activeTab === tab ? "#5865f2" : "transparent", color: api.activeTab === tab ? "#fff" : "#b9bbbe" },
        onClick: /* @__PURE__ */ __name(() => api.setActiveTab(tab), "onClick"),
        children: [
          tab === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartBar, {}),
          tab === "settings" && /* @__PURE__ */ jsxRuntimeExports.jsx(FaCog, {}),
          tab === "logs" && /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, {}),
          tab === "overview" ? "Genel Bakış" : tab === "settings" ? "Ayarlar" : "Kayıtlar"
        ]
      },
      tab
    )) }),
    api.activeTab === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewTab, { stats: api.stats, settings: api.settings }),
    api.activeTab === "settings" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      SettingsTab,
      {
        settings: api.settings,
        isAdmin,
        onSensitivityChange: api.handleSensitivityChange,
        onPatternToggle: api.handlePatternToggle,
        onActionToggle: api.handleActionToggle,
        onToggleEnabled: api.toggleEnabled,
        onSave: api.saveSettings
      }
    ),
    api.activeTab === "logs" && /* @__PURE__ */ jsxRuntimeExports.jsx(LogsTab, { stats: api.stats })
  ] });
}, "SpamDetectionPanel");
export {
  SpamDetectionPanel as default
};
