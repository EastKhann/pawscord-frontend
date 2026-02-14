var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { t as toast } from "./index-DGqPEDt8.js";
import { a as FaTimes, aW as FaCircle, g as FaTrash, ae as FaMobile, aX as FaTablet, af as FaDesktop } from "./icons-vendor-2VDeY8fW.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const SessionManagerModal = /* @__PURE__ */ __name(({ onClose, fetchWithAuth, apiBaseUrl }) => {
  const [sessions, setSessions] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    loadSessions();
  }, []);
  const loadSessions = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/sessions/list/`);
      if (res.ok) {
        const data = await res.json();
        setSessions(data.sessions || []);
      }
    } catch (error) {
      console.error("Load sessions error:", error);
    } finally {
      setLoading(false);
    }
  }, "loadSessions");
  const handleRevoke = /* @__PURE__ */ __name(async (sessionId) => {
    if (!confirm("Bu oturumu sonlandırmak istediğinizden emin misiniz?")) return;
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/sessions/revoke/`, {
        method: "POST",
        body: JSON.stringify({ session_id: sessionId })
      });
      if (res.ok) {
        setSessions((prev) => prev.filter((s) => s.id !== sessionId));
        toast.success("✅ Oturum sonlandırıldı");
      } else {
        toast.error("❌ Oturum sonlandırılamadı");
      }
    } catch (error) {
      console.error("Revoke session error:", error);
      toast.error("❌ Bir hata oluştu");
    }
  }, "handleRevoke");
  const getDeviceIcon = /* @__PURE__ */ __name((deviceType) => {
    if (deviceType?.includes("mobile") || deviceType?.includes("android") || deviceType?.includes("ios")) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(FaMobile, {});
    }
    if (deviceType?.includes("tablet")) return /* @__PURE__ */ jsxRuntimeExports.jsx(FaTablet, {});
    return /* @__PURE__ */ jsxRuntimeExports.jsx(FaDesktop, {});
  }, "getDeviceIcon");
  const formatDate = /* @__PURE__ */ __name((dateStr) => {
    return new Date(dateStr).toLocaleString("tr-TR");
  }, "formatDate");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "🔐 Aktif Oturumlar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Yükleniyor..." }) : sessions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "Aktif oturum bulunamadı" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.sessionList, children: sessions.map((session) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.sessionItem, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.sessionIcon, children: getDeviceIcon(session.device_type) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.sessionInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.sessionDevice, children: [
          session.device_name || session.device_type || "Bilinmeyen Cihaz",
          session.is_current && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.currentBadge, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCircle, { style: { fontSize: "6px" } }),
            " Bu Cihaz"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.sessionDetails, children: [
          session.ip_address && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "IP: ",
            session.ip_address
          ] }),
          session.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            " • ",
            session.location
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.sessionTime, children: [
          "Son Aktivite: ",
          formatDate(session.last_activity || session.created_at)
        ] })
      ] }),
      !session.is_current && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => handleRevoke(session.id), "onClick"),
          style: styles.revokeButton,
          title: "Oturumu sonlandır",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {})
        }
      )
    ] }, session.id)) }) })
  ] }) });
}, "SessionManagerModal");
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
    zIndex: 1e4
  },
  modal: {
    backgroundColor: "#2b2d31",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "600px",
    maxHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 8px 16px rgba(0,0,0,0.4)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #40444b"
  },
  title: {
    color: "white",
    margin: 0,
    fontSize: "1.5em"
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    fontSize: "1.5em",
    padding: "5px"
  },
  content: {
    padding: "20px",
    overflowY: "auto",
    flex: 1
  },
  loading: {
    textAlign: "center",
    color: "#b9bbbe",
    padding: "40px"
  },
  empty: {
    textAlign: "center",
    color: "#b9bbbe",
    padding: "40px"
  },
  sessionList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  sessionItem: {
    backgroundColor: "#40444b",
    borderRadius: "8px",
    padding: "15px",
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  sessionIcon: {
    fontSize: "2em",
    color: "#5865f2",
    minWidth: "40px",
    textAlign: "center"
  },
  sessionInfo: {
    flex: 1
  },
  sessionDevice: {
    color: "white",
    fontWeight: "bold",
    fontSize: "1em",
    marginBottom: "5px",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  currentBadge: {
    backgroundColor: "#3ba55d",
    color: "white",
    padding: "2px 8px",
    borderRadius: "10px",
    fontSize: "0.7em",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "4px"
  },
  sessionDetails: {
    color: "#b9bbbe",
    fontSize: "0.85em",
    marginBottom: "3px"
  },
  sessionTime: {
    color: "#72767d",
    fontSize: "0.75em"
  },
  revokeButton: {
    backgroundColor: "#f04747",
    border: "none",
    color: "white",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1em"
  }
};
export {
  SessionManagerModal as default
};
