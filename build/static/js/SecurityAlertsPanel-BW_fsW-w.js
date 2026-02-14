var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { d as FaExclamationTriangle, c as FaSync, a as FaTimes, t as FaSearch, a1 as FaShieldAlt, z as FaClock, ax as FaGlobe, C as FaUser, w as FaCheckCircle, a0 as FaEye, k as FaBell, R as FaFire } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const SecurityAlertsPanel = /* @__PURE__ */ __name(({ serverId, apiBaseUrl, onClose }) => {
  const [alerts, setAlerts] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [filter, setFilter] = reactExports.useState("all");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [selectedAlert, setSelectedAlert] = reactExports.useState(null);
  const [stats, setStats] = reactExports.useState({
    total: 0,
    unresolved: 0,
    critical: 0,
    resolved_today: 0
  });
  const severityLevels = {
    critical: { label: "Kritik", color: "#ef4444", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaFire, {}) },
    high: { label: "Yüksek", color: "#f97316", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, {}) },
    medium: { label: "Orta", color: "#f59e0b", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaBell, {}) },
    low: { label: "Düşük", color: "#3b82f6", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, {}) }
  };
  const alertTypes = {
    brute_force: "Brute Force Saldırısı",
    suspicious_login: "Şüpheli Giriş",
    unusual_activity: "Olağandışı Aktivite",
    permission_abuse: "Yetki Suistimali",
    spam_detected: "Spam Algılandı",
    raid_attempt: "Raid Girişimi",
    api_abuse: "API Suistimali",
    unauthorized_access: "Yetkisiz Erişim Denemesi"
  };
  reactExports.useEffect(() => {
    fetchAlerts();
    fetchStats();
    const interval = setInterval(fetchAlerts, 3e4);
    return () => clearInterval(interval);
  }, [serverId]);
  const fetchAlerts = /* @__PURE__ */ __name(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/security/alerts/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setAlerts(data.alerts || []);
      }
    } catch (error) {
      console.error("Fetch alerts error:", error);
    } finally {
      setLoading(false);
    }
  }, "fetchAlerts");
  const fetchStats = /* @__PURE__ */ __name(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/security/alerts/stats/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Fetch stats error:", error);
    }
  }, "fetchStats");
  const resolveAlert = /* @__PURE__ */ __name(async (alertId, resolution) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/security/alerts/${alertId}/resolve/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ resolution })
      });
      if (response.ok) {
        toast.success("✅ Uyarı çözümlendi");
        setAlerts((prev) => prev.map(
          (a) => a.id === alertId ? { ...a, resolved: true, resolution } : a
        ));
        setSelectedAlert(null);
        fetchStats();
      }
    } catch (error) {
      console.error("Resolve alert error:", error);
    }
  }, "resolveAlert");
  const dismissAlert = /* @__PURE__ */ __name(async (alertId) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/security/alerts/${alertId}/dismiss/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        toast.success("Uyarı yok sayıldı");
        setAlerts((prev) => prev.filter((a) => a.id !== alertId));
      }
    } catch (error) {
      console.error("Dismiss alert error:", error);
    }
  }, "dismissAlert");
  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch = alert.message?.toLowerCase().includes(searchQuery.toLowerCase()) || alert.source_ip?.includes(searchQuery) || alert.user_info?.username?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || filter === "unresolved" && !alert.resolved || filter === "resolved" && alert.resolved || filter === "critical" && alert.severity === "critical";
    return matchesSearch && matchesFilter;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "security-alerts-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "security-alerts-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, {}),
        " Güvenlik Uyarıları"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "refresh-btn", onClick: fetchAlerts, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaSync, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats-bar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: stats.total }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Toplam" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item danger", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: stats.unresolved }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Bekleyen" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item critical", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: stats.critical }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Kritik" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item success", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: stats.resolved_today }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Bugün Çözülen" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "toolbar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "search-box", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaSearch, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Uyarı, IP veya kullanıcı ara...",
            value: searchQuery,
            onChange: /* @__PURE__ */ __name((e) => setSearchQuery(e.target.value), "onChange")
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "filter-buttons", children: ["all", "unresolved", "resolved", "critical"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `filter-btn ${filter === f ? "active" : ""}`,
          onClick: /* @__PURE__ */ __name(() => setFilter(f), "onClick"),
          children: [
            f === "all" && "Tümü",
            f === "unresolved" && "Bekleyen",
            f === "resolved" && "Çözülen",
            f === "critical" && "Kritik"
          ]
        },
        f
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-content", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading", children: "Yükleniyor..." }) : filteredAlerts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Güvenlik uyarısı bulunmuyor" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sisteminiz güvende görünüyor" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "alerts-list", children: filteredAlerts.map((alert) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertCard,
      {
        alert,
        severityLevels,
        alertTypes,
        onView: /* @__PURE__ */ __name(() => setSelectedAlert(alert), "onView"),
        onDismiss: /* @__PURE__ */ __name(() => dismissAlert(alert.id), "onDismiss"),
        onResolve: /* @__PURE__ */ __name((resolution) => resolveAlert(alert.id, resolution), "onResolve")
      },
      alert.id
    )) }) }),
    selectedAlert && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDetailModal,
      {
        alert: selectedAlert,
        severityLevels,
        alertTypes,
        onClose: /* @__PURE__ */ __name(() => setSelectedAlert(null), "onClose"),
        onResolve: /* @__PURE__ */ __name((resolution) => resolveAlert(selectedAlert.id, resolution), "onResolve")
      }
    )
  ] }) });
}, "SecurityAlertsPanel");
const AlertCard = /* @__PURE__ */ __name(({ alert, severityLevels, alertTypes, onView, onDismiss, onResolve }) => {
  const severity = severityLevels[alert.severity] || severityLevels.low;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `alert-card ${alert.severity} ${alert.resolved ? "resolved" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "alert-severity", style: { background: severity.color }, children: severity.icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "alert-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "alert-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "alert-type", children: alertTypes[alert.type] || alert.type }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "alert-time", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {}),
          " ",
          new Date(alert.created_at).toLocaleString("tr-TR")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "alert-message", children: alert.message }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "alert-meta", children: [
        alert.source_ip && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaGlobe, {}),
          " ",
          alert.source_ip
        ] }),
        alert.user_info && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaUser, {}),
          " ",
          alert.user_info.username
        ] }),
        alert.resolved && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "resolved-badge", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheckCircle, {}),
          " Çözümlendi"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "alert-actions", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "view-btn", onClick: onView, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaEye, {}) }),
      !alert.resolved && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "resolve-btn",
            onClick: /* @__PURE__ */ __name(() => onResolve("Hızlı çözüm"), "onClick"),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheckCircle, {})
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "dismiss-btn", onClick: onDismiss, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
      ] })
    ] })
  ] });
}, "AlertCard");
const AlertDetailModal = /* @__PURE__ */ __name(({ alert, severityLevels, alertTypes, onClose, onResolve }) => {
  const [resolution, setResolution] = reactExports.useState("");
  const severity = severityLevels[alert.severity] || severityLevels.low;
  const quickResolutions = [
    "False positive - Normal aktivite",
    "Kullanıcı uyarıldı",
    "IP engellendi",
    "Hesap askıya alındı",
    "İncelendi - Aksiyon gerekmiyor"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "alert-detail-modal", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-header", style: { borderLeftColor: severity.color }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "severity-badge", style: { background: severity.color }, children: [
        severity.icon,
        " ",
        severity.label
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-modal", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: alertTypes[alert.type] || alert.type }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "detail-message", children: alert.message }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Detaylar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-grid", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {}),
              " Zaman"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(alert.created_at).toLocaleString("tr-TR") })
          ] }),
          alert.source_ip && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaGlobe, {}),
              " Kaynak IP"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mono", children: alert.source_ip })
          ] }),
          alert.user_info && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-item", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FaUser, {}),
                " Kullanıcı"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: alert.user_info.username })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-item", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Kullanıcı ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mono", children: alert.user_info.id })
            ] })
          ] }),
          alert.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Konum" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: alert.location })
          ] })
        ] })
      ] }),
      alert.additional_data && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Ek Veriler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "json-data", children: JSON.stringify(alert.additional_data, null, 2) })
      ] }),
      !alert.resolved && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "resolution-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Çözüm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "quick-resolutions", children: quickResolutions.map((res, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `quick-res-btn ${resolution === res ? "active" : ""}`,
            onClick: /* @__PURE__ */ __name(() => setResolution(res), "onClick"),
            children: res
          },
          idx
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: resolution,
            onChange: /* @__PURE__ */ __name((e) => setResolution(e.target.value), "onChange"),
            placeholder: "Veya özel bir çözüm notu yazın...",
            rows: "3"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-actions", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "cancel-btn", onClick: onClose, children: "Kapat" }),
      !alert.resolved && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: "resolve-btn",
          onClick: /* @__PURE__ */ __name(() => onResolve(resolution || "Çözümlendi"), "onClick"),
          disabled: !resolution,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheckCircle, {}),
            " Çözümle"
          ]
        }
      )
    ] })
  ] }) });
}, "AlertDetailModal");
export {
  SecurityAlertsPanel as default
};
