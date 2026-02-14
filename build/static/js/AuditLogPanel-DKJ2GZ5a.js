var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { aB as FaHistory, a as FaTimes, t as FaSearch, a5 as FaDownload } from "./icons-vendor-2VDeY8fW.js";
const AuditLogPanel = /* @__PURE__ */ __name(({ serverId, onClose, fetchWithAuth, apiBaseUrl }) => {
  const [logs, setLogs] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [filterType, setFilterType] = reactExports.useState("all");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [dateRange, setDateRange] = reactExports.useState("7days");
  reactExports.useEffect(() => {
    loadAuditLogs();
  }, [serverId, filterType, dateRange]);
  const loadAuditLogs = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        filter: filterType,
        range: dateRange
      });
      const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/audit-logs/?${params}`);
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
      }
    } catch (error) {
      console.error("Audit log fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, "loadAuditLogs");
  const exportLogs = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/audit-logs/export/`);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `audit-log-${serverId}-${Date.now()}.csv`;
      a.click();
    } catch (error) {
      console.error("Export error:", error);
    }
  }, "exportLogs");
  const getActionIcon = /* @__PURE__ */ __name((action) => {
    const icons = {
      "member_join": "👋",
      "member_leave": "👋",
      "member_kick": "👢",
      "member_ban": "🔨",
      "channel_create": "➕",
      "channel_delete": "🗑️",
      "channel_update": "✏️",
      "role_create": "🎭",
      "role_delete": "🗑️",
      "role_update": "✏️",
      "message_delete": "🗑️",
      "message_bulk_delete": "🗑️",
      "server_update": "⚙️",
      "invite_create": "🔗",
      "webhook_create": "🪝",
      "webhook_delete": "🗑️"
    };
    return icons[action] || "📝";
  }, "getActionIcon");
  const getActionColor = /* @__PURE__ */ __name((action) => {
    if (action.includes("delete") || action.includes("kick") || action.includes("ban")) {
      return "#ed4245";
    }
    if (action.includes("create") || action.includes("join")) {
      return "#3ba55d";
    }
    return "#faa61a";
  }, "getActionColor");
  const filteredLogs = logs.filter((log) => {
    const matchesSearch = log.description?.toLowerCase().includes(searchQuery.toLowerCase()) || log.user?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.panel, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, { size: 20, color: "#5865f2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Denetim Günlüğü" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { size: 20 }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.filters, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.searchBox, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaSearch, { size: 14, color: "#b9bbbe" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Ara...",
            value: searchQuery,
            onChange: /* @__PURE__ */ __name((e) => setSearchQuery(e.target.value), "onChange"),
            style: styles.searchInput
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: filterType,
          onChange: /* @__PURE__ */ __name((e) => setFilterType(e.target.value), "onChange"),
          style: styles.select,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Tüm Eylemler" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "members", children: "Üye İşlemleri" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "channels", children: "Kanal İşlemleri" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "roles", children: "Rol İşlemleri" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "messages", children: "Mesaj İşlemleri" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "server", children: "Sunucu İşlemleri" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: dateRange,
          onChange: /* @__PURE__ */ __name((e) => setDateRange(e.target.value), "onChange"),
          style: styles.select,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "1day", children: "Son 24 Saat" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "7days", children: "Son 7 Gün" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "30days", children: "Son 30 Gün" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "90days", children: "Son 90 Gün" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: exportLogs, style: styles.exportButton, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, { size: 14 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Dışa Aktar" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.logsList, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Yükleniyor..." }) : filteredLogs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.empty, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, { size: 48, color: "#4e5058" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz log kaydı yok" })
    ] }) : filteredLogs.map((log, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.logItem, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.logIcon, children: getActionIcon(log.action) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.logContent, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.logDescription, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            color: getActionColor(log.action),
            fontWeight: "bold"
          }, children: log.user }),
          " ",
          log.description
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.logMeta, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(log.timestamp).toLocaleString("tr-TR") }),
          log.target && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            " • Hedef: ",
            log.target
          ] })
        ] })
      ] })
    ] }, index)) })
  ] }) });
}, "AuditLogPanel");
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1e4,
    padding: "20px"
  },
  panel: {
    backgroundColor: "#2f3136",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "900px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)"
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px",
    borderBottom: "1px solid #202225"
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  title: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "bold",
    color: "#ffffff"
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "4px",
    transition: "all 0.2s"
  },
  filters: {
    display: "flex",
    gap: "12px",
    padding: "16px 20px",
    borderBottom: "1px solid #202225",
    flexWrap: "wrap"
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#202225",
    padding: "8px 12px",
    borderRadius: "4px",
    flex: 1,
    minWidth: "200px"
  },
  searchInput: {
    background: "none",
    border: "none",
    color: "#dcddde",
    fontSize: "14px",
    outline: "none",
    width: "100%"
  },
  select: {
    backgroundColor: "#202225",
    border: "none",
    color: "#dcddde",
    padding: "8px 12px",
    borderRadius: "4px",
    fontSize: "14px",
    cursor: "pointer",
    outline: "none"
  },
  exportButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#5865f2",
    color: "#ffffff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  logsList: {
    flex: 1,
    overflowY: "auto",
    padding: "16px 20px"
  },
  loading: {
    textAlign: "center",
    padding: "40px",
    color: "#b9bbbe"
  },
  empty: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#b9bbbe"
  },
  logItem: {
    display: "flex",
    gap: "12px",
    padding: "12px",
    marginBottom: "8px",
    backgroundColor: "#36393f",
    borderRadius: "4px",
    borderLeft: "3px solid #5865f2",
    transition: "all 0.2s"
  },
  logIcon: {
    fontSize: "24px",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  logContent: {
    flex: 1
  },
  logDescription: {
    color: "#dcddde",
    fontSize: "14px",
    marginBottom: "4px"
  },
  logMeta: {
    fontSize: "12px",
    color: "#72767d"
  }
};
export {
  AuditLogPanel as default
};
