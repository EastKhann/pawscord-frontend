var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a1 as FaShieldAlt, a as FaTimes, ay as FaBan, aC as FaUserSlash, z as FaClock, d as FaExclamationTriangle, V as FaFilter, cB as FaChevronUp, e as FaChevronDown, a5 as FaDownload, aD as FaUndo, av as FaFileAlt, aF as FaHashtag, a0 as FaEye, aA as FaGavel, B as FaRobot, g as FaTrash, au as FaVolumeMute } from "./icons-vendor-2VDeY8fW.js";
import { y } from "./ui-vendor-iPoN0WGz.js";
import { d as confirmDialog } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
const ModerationLogsPanel = /* @__PURE__ */ __name(({ serverId, onClose }) => {
  const [logs, setLogs] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [filters, setFilters] = reactExports.useState({
    action_type: "all",
    moderator: "",
    target_user: "",
    date_from: "",
    date_to: ""
  });
  const [showFilters, setShowFilters] = reactExports.useState(false);
  const [expandedLog, setExpandedLog] = reactExports.useState(null);
  const [stats, setStats] = reactExports.useState(null);
  const [page, setPage] = reactExports.useState(1);
  const [hasMore, setHasMore] = reactExports.useState(true);
  const token = localStorage.getItem("access_token");
  reactExports.useEffect(() => {
    fetchLogs();
    fetchStats();
  }, [serverId, filters, page]);
  const fetchLogs = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v && v !== "all"))
      });
      const response = await fetch(`/api/servers/${serverId}/moderation/logs/?${params}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        if (page === 1) {
          setLogs(data.logs || []);
        } else {
          setLogs((prev) => [...prev, ...data.logs || []]);
        }
        setHasMore(data.has_more ?? true);
      } else {
        setLogs([]);
      }
    } catch (error) {
      console.error("Error fetching moderation logs:", error);
      setLogs([]);
    }
    setLoading(false);
  }, "fetchLogs");
  const fetchStats = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`/api/servers/${serverId}/moderation/stats/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        setStats(await response.json() || emptyStats);
      } else {
        setStats(emptyStats);
      }
    } catch (error) {
      setStats(emptyStats);
    }
  }, "fetchStats");
  const emptyStats = {
    total_actions: 0,
    this_week: 0,
    bans: 0,
    kicks: 0,
    timeouts: 0,
    warns: 0,
    mutes: 0,
    deletes: 0,
    automod_actions: 0,
    top_moderators: []
  };
  const getActionIcon = /* @__PURE__ */ __name((type) => {
    const icons = {
      ban: /* @__PURE__ */ jsxRuntimeExports.jsx(FaBan, { className: "action-ban" }),
      kick: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserSlash, { className: "action-kick" }),
      timeout: /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, { className: "action-timeout" }),
      mute: /* @__PURE__ */ jsxRuntimeExports.jsx(FaVolumeMute, { className: "action-mute" }),
      warn: /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, { className: "action-warn" }),
      delete_messages: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, { className: "action-delete" }),
      automod: /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, { className: "action-automod" })
    };
    return icons[type] || /* @__PURE__ */ jsxRuntimeExports.jsx(FaGavel, {});
  }, "getActionIcon");
  const getActionLabel = /* @__PURE__ */ __name((type) => {
    const labels = {
      ban: "Yasaklama",
      kick: "Sunucudan Atma",
      timeout: "Zaman Aşımı",
      mute: "Susturma",
      warn: "Uyarı",
      delete_messages: "Mesaj Silme",
      automod: "AutoMod"
    };
    return labels[type] || type;
  }, "getActionLabel");
  const handleRevertAction = /* @__PURE__ */ __name(async (logId) => {
    if (!await confirmDialog("Bu moderasyon eylemini geri almak istediğinizden emin misiniz?")) return;
    try {
      const response = await fetch(`/api/servers/${serverId}/moderation/logs/${logId}/revert/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        y.success("Eylem geri alındı");
        fetchLogs();
      }
    } catch (error) {
      setLogs(logs.map((log) => log.id === logId ? { ...log, reverted: true } : log));
      y.success("Eylem geri alındı");
    }
  }, "handleRevertAction");
  const handleExport = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`/api/servers/${serverId}/moderation/logs/export/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `moderation-logs-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`;
        a.click();
        y.success("Loglar indirildi");
      }
    } catch (error) {
      y.error("Dışa aktarma başarısız");
    }
  }, "handleExport");
  const formatDate = /* @__PURE__ */ __name((dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }, "formatDate");
  const filteredLogs = logs;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "moderation-logs-overlay", onClick: /* @__PURE__ */ __name((e) => e.target.className === "moderation-logs-overlay" && onClose(), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "moderation-logs-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, {}),
        " Moderasyon Logları"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    stats && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats-bar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: stats.total_actions }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Toplam" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: stats.this_week }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Bu Hafta" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item ban", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaBan, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: stats.bans })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item kick", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserSlash, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: stats.kicks })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item timeout", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: stats.timeouts })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item warn", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: stats.warns })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filters-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filters-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "filter-toggle", onClick: /* @__PURE__ */ __name(() => setShowFilters(!showFilters), "onClick"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaFilter, {}),
          " Filtreler",
          showFilters ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaChevronUp, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaChevronDown, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "export-btn", onClick: handleExport, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, {}),
          " Dışa Aktar"
        ] })
      ] }),
      showFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filters-content", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Eylem Türü" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: filters.action_type,
              onChange: /* @__PURE__ */ __name((e) => {
                setFilters({ ...filters, action_type: e.target.value });
                setPage(1);
              }, "onChange"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Tümü" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ban", children: "Yasaklama" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "kick", children: "Atma" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "timeout", children: "Zaman Aşımı" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "mute", children: "Susturma" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "warn", children: "Uyarı" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "delete_messages", children: "Mesaj Silme" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "automod", children: "AutoMod" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Moderatör" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Kullanıcı adı",
              value: filters.moderator,
              onChange: /* @__PURE__ */ __name((e) => {
                setFilters({ ...filters, moderator: e.target.value });
                setPage(1);
              }, "onChange")
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Hedef Kullanıcı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Kullanıcı adı",
              value: filters.target_user,
              onChange: /* @__PURE__ */ __name((e) => {
                setFilters({ ...filters, target_user: e.target.value });
                setPage(1);
              }, "onChange")
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Başlangıç" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "date",
              value: filters.date_from,
              onChange: /* @__PURE__ */ __name((e) => {
                setFilters({ ...filters, date_from: e.target.value });
                setPage(1);
              }, "onChange")
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Bitiş" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "date",
              value: filters.date_to,
              onChange: /* @__PURE__ */ __name((e) => {
                setFilters({ ...filters, date_to: e.target.value });
                setPage(1);
              }, "onChange")
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-content", children: loading && page === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading", children: "Yükleniyor..." }) : filteredLogs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Moderasyon logu bulunamadı" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "logs-list", children: [
      filteredLogs.map((log) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `log-item ${log.reverted ? "reverted" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "log-icon", children: getActionIcon(log.action_type) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "log-main", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "log-header", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `action-badge ${log.action_type}`, children: getActionLabel(log.action_type) }),
            log.reverted && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "reverted-badge", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaUndo, {}),
              " Geri Alındı"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "log-time", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {}),
              " ",
              formatDate(log.created_at)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "log-users", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "user-info", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: log.moderator.avatar || "/default-avatar.png", alt: "" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: log.moderator.username })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "arrow", children: "→" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "user-info target", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: log.target_user.avatar || "/default-avatar.png", alt: "" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: log.target_user.username })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "log-reason", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaFileAlt, {}),
            " ",
            log.reason
          ] }),
          log.channel && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "log-channel", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaHashtag, {}),
            " ",
            log.channel.name
          ] }),
          expandedLog === log.id && log.details && Object.keys(log.details).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "log-details", children: [
            log.details.duration && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Süre:" }),
              " ",
              log.details.duration
            ] }),
            log.details.message_count && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Silinen Mesaj:" }),
              " ",
              log.details.message_count
            ] }),
            log.details.warning_count && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Toplam Uyarı:" }),
              " ",
              log.details.warning_count
            ] }),
            log.details.trigger && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Tetikleyici:" }),
              " ",
              log.details.trigger
            ] }),
            log.details.evidence && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "evidence", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Kanıtlar:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: log.details.evidence.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: e }, i)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "log-actions", children: [
          Object.keys(log.details || {}).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "detail-btn",
              onClick: /* @__PURE__ */ __name(() => setExpandedLog(expandedLog === log.id ? null : log.id), "onClick"),
              title: "Detaylar",
              children: expandedLog === log.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaChevronUp, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaEye, {})
            }
          ),
          !log.reverted && ["ban", "mute", "timeout"].includes(log.action_type) && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "revert-btn",
              onClick: /* @__PURE__ */ __name(() => handleRevertAction(log.id), "onClick"),
              title: "Geri Al",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUndo, {})
            }
          )
        ] })
      ] }, log.id)),
      hasMore && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "load-more-btn", onClick: /* @__PURE__ */ __name(() => setPage((p) => p + 1), "onClick"), disabled: loading, children: loading ? "Yükleniyor..." : "Daha Fazla Yükle" })
    ] }) })
  ] }) });
}, "ModerationLogsPanel");
export {
  ModerationLogsPanel as default
};
