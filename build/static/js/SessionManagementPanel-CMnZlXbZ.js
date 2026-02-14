var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { bD as FaLaptop, a as FaTimes, bE as FaMapMarkerAlt, z as FaClock, g as FaTrash, aX as FaTablet, ae as FaMobile } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const SessionManagementPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose }) => {
  const [sessions, setSessions] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    fetchSessions();
  }, []);
  const fetchSessions = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/sessions/list/`);
      const data = await response.json();
      setSessions(data.sessions || []);
    } catch (error) {
      toast.error("Failed to load sessions");
    } finally {
      setLoading(false);
    }
  }, "fetchSessions");
  const revokeSession = /* @__PURE__ */ __name(async (sessionId) => {
    if (!confirm("Are you sure you want to sign out this device?")) return;
    try {
      await fetchWithAuth(`${apiBaseUrl}/sessions/revoke/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId })
      });
      toast.success("Session revoked successfully");
      fetchSessions();
    } catch (error) {
      toast.error("Failed to revoke session");
    }
  }, "revokeSession");
  const revokeAllSessions = /* @__PURE__ */ __name(async () => {
    if (!confirm("This will sign you out from ALL devices except this one. Continue?")) return;
    try {
      await fetchWithAuth(`${apiBaseUrl}/security/sessions/revoke-all/`, {
        method: "POST"
      });
      toast.success("All other sessions revoked");
      fetchSessions();
    } catch (error) {
      toast.error("Failed to revoke sessions");
    }
  }, "revokeAllSessions");
  const getDeviceIcon = /* @__PURE__ */ __name((deviceType) => {
    switch (deviceType) {
      case "mobile":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FaMobile, { style: { fontSize: "24px", color: "#5865f2" } });
      case "tablet":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FaTablet, { style: { fontSize: "24px", color: "#5865f2" } });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FaLaptop, { style: { fontSize: "24px", color: "#5865f2" } });
    }
  }, "getDeviceIcon");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaLaptop, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Active Sessions" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.toolbar, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.sessionCount, children: [
        sessions.length,
        " active ",
        sessions.length === 1 ? "session" : "sessions"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: revokeAllSessions, style: styles.revokeAllButton, children: "Sign Out All Other Devices" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading sessions..." }) : sessions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No active sessions found" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.sessionsList, children: sessions.map((session, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.sessionCard, ...session.is_current && styles.currentSession }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.sessionIcon, children: getDeviceIcon(session.device_type) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.sessionInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.sessionDevice, children: [
          session.device_name || "Unknown Device",
          session.is_current && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.currentBadge, children: "Current Session" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.sessionDetails, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.detailItem, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaMapMarkerAlt, { style: { marginRight: "5px", fontSize: "12px" } }),
            session.location || "Unknown Location"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.detailItem, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, { style: { marginRight: "5px", fontSize: "12px" } }),
            "Last active: ",
            new Date(session.last_activity).toLocaleString()
          ] }),
          session.ip_address && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.detailItem, children: [
            "IP: ",
            session.ip_address
          ] })
        ] })
      ] }),
      !session.is_current && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => revokeSession(session.id), "onClick"),
          style: styles.revokeButton,
          title: "Sign Out",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {})
        }
      )
    ] }, idx)) }) })
  ] }) });
}, "SessionManagementPanel");
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
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    borderBottom: "1px solid #2c2f33"
  },
  sessionCount: {
    fontSize: "14px",
    color: "#dcddde"
  },
  revokeAllButton: {
    padding: "8px 16px",
    backgroundColor: "#f04747",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500"
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
  sessionsList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  sessionCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    gap: "16px",
    alignItems: "flex-start"
  },
  currentSession: {
    border: "2px solid #43b581"
  },
  sessionIcon: {
    minWidth: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  sessionInfo: {
    flex: 1
  },
  sessionDevice: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  currentBadge: {
    fontSize: "11px",
    padding: "4px 8px",
    backgroundColor: "#43b581",
    borderRadius: "4px",
    fontWeight: "600"
  },
  sessionDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },
  detailItem: {
    fontSize: "13px",
    color: "#99aab5",
    display: "flex",
    alignItems: "center"
  },
  revokeButton: {
    background: "none",
    border: "none",
    color: "#f04747",
    cursor: "pointer",
    fontSize: "18px",
    padding: "8px"
  }
};
export {
  SessionManagementPanel as default
};
