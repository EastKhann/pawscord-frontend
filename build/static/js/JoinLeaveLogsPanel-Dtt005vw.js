var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { bA as FaSignInAlt, a as FaTimes, a5 as FaDownload, bB as FaSignOutAlt } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const JoinLeaveLogsPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
  const [logs, setLogs] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [filter, setFilter] = reactExports.useState("all");
  reactExports.useEffect(() => {
    fetchLogs();
  }, [serverId]);
  const fetchLogs = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/logs/`);
      const data = await response.json();
      setLogs(data.logs || []);
    } catch (error) {
      toast.error("Failed to load join/leave logs");
    } finally {
      setLoading(false);
    }
  }, "fetchLogs");
  const exportLogs = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/logs/export/`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `join_leave_logs_${(/* @__PURE__ */ new Date()).toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      toast.success("Logs exported successfully");
    } catch (error) {
      toast.error("Failed to export logs");
    }
  }, "exportLogs");
  const filteredLogs = logs.filter((log) => {
    if (filter === "all") return true;
    return log.action === filter;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaSignInAlt, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Join/Leave Logs" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.filters, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setFilter("all"), "onClick"), style: { ...styles.filterButton, ...filter === "all" && styles.filterButtonActive }, children: [
        "All (",
        logs.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setFilter("joined"), "onClick"), style: { ...styles.filterButton, ...filter === "joined" && styles.filterButtonActive }, children: [
        "🟢 Joins (",
        logs.filter((l) => l.action === "joined").length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setFilter("left"), "onClick"), style: { ...styles.filterButton, ...filter === "left" && styles.filterButtonActive }, children: [
        "🔴 Leaves (",
        logs.filter((l) => l.action === "left").length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: exportLogs, style: styles.exportButton, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, { style: { marginRight: "5px" } }),
        "Export"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading logs..." }) : filteredLogs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No logs found" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.logsList, children: filteredLogs.map((log, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.logItem, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.logIcon, children: log.action === "joined" ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaSignInAlt, { style: { color: "#43b581" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaSignOutAlt, { style: { color: "#f04747" } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.logInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.logUser, children: log.user?.username || "Unknown User" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.logAction, children: log.action === "joined" ? "Joined the server" : "Left the server" }),
        log.invite_code && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.logMeta, children: [
          "via invite: ",
          log.invite_code
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.logTime, children: new Date(log.timestamp).toLocaleString() })
    ] }, idx)) }) })
  ] }) });
}, "JoinLeaveLogsPanel");
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
    zIndex: 999999
  },
  modal: {
    backgroundColor: "#1e1e1e",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "800px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #2c2f33"
  },
  headerLeft: {
    display: "flex",
    alignItems: "center"
  },
  title: {
    margin: 0,
    fontSize: "20px",
    color: "#ffffff"
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#99aab5",
    cursor: "pointer",
    fontSize: "20px",
    padding: "5px"
  },
  filters: {
    display: "flex",
    gap: "10px",
    padding: "15px 20px",
    borderBottom: "1px solid #2c2f33",
    flexWrap: "wrap"
  },
  filterButton: {
    padding: "8px 16px",
    backgroundColor: "#2c2f33",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px"
  },
  filterButtonActive: {
    backgroundColor: "#5865f2"
  },
  exportButton: {
    marginLeft: "auto",
    padding: "8px 16px",
    backgroundColor: "#43b581",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center"
  },
  content: {
    padding: "20px",
    overflowY: "auto",
    flex: 1
  },
  loading: {
    textAlign: "center",
    color: "#99aab5",
    padding: "40px"
  },
  empty: {
    textAlign: "center",
    color: "#99aab5",
    padding: "40px"
  },
  logsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  logItem: {
    backgroundColor: "#2c2f33",
    borderRadius: "6px",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },
  logIcon: {
    fontSize: "20px"
  },
  logInfo: {
    flex: 1
  },
  logUser: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "4px"
  },
  logAction: {
    fontSize: "14px",
    color: "#dcddde",
    marginBottom: "2px"
  },
  logMeta: {
    fontSize: "12px",
    color: "#99aab5"
  },
  logTime: {
    fontSize: "13px",
    color: "#99aab5"
  }
};
export {
  JoinLeaveLogsPanel as default
};
