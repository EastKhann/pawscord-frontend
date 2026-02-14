var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { aE as FaChartBar, a as FaTimes, z as FaClock, bv as FaCalendar } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const UserActivityPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, username }) => {
  const [activityLog, setActivityLog] = reactExports.useState([]);
  const [presenceHistory, setPresenceHistory] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [activeTab, setActiveTab] = reactExports.useState("activity");
  reactExports.useEffect(() => {
    fetchActivityLog();
    fetchPresenceHistory();
  }, [username]);
  const fetchActivityLog = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/activity/${username}/`);
      const data = await response.json();
      setActivityLog(data.activity || []);
    } catch (error) {
      toast.error("Failed to load activity log");
    } finally {
      setLoading(false);
    }
  }, "fetchActivityLog");
  const fetchPresenceHistory = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/presence/${username}/`);
      const data = await response.json();
      setPresenceHistory(data.history || []);
    } catch (error) {
      toast.error("Failed to load presence history");
    }
  }, "fetchPresenceHistory");
  const getActivityIcon = /* @__PURE__ */ __name((type) => {
    switch (type) {
      case "message":
        return "💬";
      case "reaction":
        return "❤️";
      case "join":
        return "🚪";
      case "voice":
        return "🎤";
      default:
        return "📊";
    }
  }, "getActivityIcon");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartBar, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: styles.title, children: [
          "Activity - ",
          username
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.tabs, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setActiveTab("activity"), "onClick"), style: { ...styles.tab, ...activeTab === "activity" && styles.tabActive }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, { style: { marginRight: "5px" } }),
        "Activity Log"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setActiveTab("presence"), "onClick"), style: { ...styles.tab, ...activeTab === "presence" && styles.tabActive }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCalendar, { style: { marginRight: "5px" } }),
        "Presence History"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading activity..." }) : activeTab === "activity" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.activityList, children: activityLog.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No activity data available" }) : activityLog.map((activity, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.activityItem, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.activityIcon, children: getActivityIcon(activity.type) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.activityInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.activityText, children: activity.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.activityTime, children: new Date(activity.timestamp).toLocaleString() })
      ] })
    ] }, idx)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.presenceList, children: presenceHistory.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No presence history available" }) : presenceHistory.map((presence, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.presenceItem, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        ...styles.statusIndicator,
        backgroundColor: presence.status === "online" ? "#43b581" : presence.status === "idle" ? "#faa61a" : presence.status === "dnd" ? "#f04747" : "#99aab5"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.presenceInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.presenceStatus, children: presence.status.charAt(0).toUpperCase() + presence.status.slice(1) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.presenceTime, children: new Date(presence.timestamp).toLocaleString() })
      ] }),
      presence.duration && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.presenceDuration, children: [
        Math.round(presence.duration / 60),
        " minutes"
      ] })
    ] }, idx)) }) })
  ] }) });
}, "UserActivityPanel");
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
    maxWidth: "700px",
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
  tabs: {
    display: "flex",
    borderBottom: "1px solid #2c2f33",
    padding: "0 20px"
  },
  tab: {
    padding: "12px 20px",
    backgroundColor: "transparent",
    border: "none",
    color: "#99aab5",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    borderBottom: "2px solid transparent"
  },
  tabActive: {
    color: "#5865f2",
    borderBottom: "2px solid #5865f2"
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
  activityList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  activityItem: {
    backgroundColor: "#2c2f33",
    borderRadius: "6px",
    padding: "16px",
    display: "flex",
    gap: "16px",
    alignItems: "center"
  },
  activityIcon: {
    fontSize: "24px"
  },
  activityInfo: {
    flex: 1
  },
  activityText: {
    fontSize: "14px",
    color: "#dcddde",
    marginBottom: "4px"
  },
  activityTime: {
    fontSize: "12px",
    color: "#99aab5"
  },
  presenceList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  presenceItem: {
    backgroundColor: "#2c2f33",
    borderRadius: "6px",
    padding: "16px",
    display: "flex",
    gap: "12px",
    alignItems: "center"
  },
  statusIndicator: {
    width: "12px",
    height: "12px",
    borderRadius: "50%"
  },
  presenceInfo: {
    flex: 1
  },
  presenceStatus: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "4px"
  },
  presenceTime: {
    fontSize: "12px",
    color: "#99aab5"
  },
  presenceDuration: {
    fontSize: "13px",
    color: "#dcddde"
  }
};
export {
  UserActivityPanel as default
};
