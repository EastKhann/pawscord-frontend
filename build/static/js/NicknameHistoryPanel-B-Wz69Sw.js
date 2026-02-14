var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { aB as FaHistory, a as FaTimes } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const NicknameHistoryPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, username }) => {
  const [history, setHistory] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    fetchHistory();
  }, [username]);
  const fetchHistory = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/users/${username}/nicknames/history/`);
      const data = await response.json();
      setHistory(data.history || []);
    } catch (error) {
      toast.error("Failed to load nickname history");
    } finally {
      setLoading(false);
    }
  }, "fetchHistory");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: styles.title, children: [
          "Nickname History - ",
          username
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading history..." }) : history.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No nickname changes recorded" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.timeline, children: history.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.timelineItem, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.timelineDot }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.timelineContent, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.nicknameChange, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.oldNickname, children: entry.old_nickname || "No nickname" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.arrow, children: "→" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.newNickname, children: entry.new_nickname || "No nickname" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.changeInfo, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.server, children: entry.server_name && `in ${entry.server_name}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.timestamp, children: new Date(entry.changed_at).toLocaleString() })
        ] })
      ] })
    ] }, idx)) }) })
  ] }) });
}, "NicknameHistoryPanel");
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
    maxWidth: "600px",
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
  timeline: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    position: "relative",
    paddingLeft: "30px"
  },
  timelineItem: {
    position: "relative",
    display: "flex",
    gap: "16px"
  },
  timelineDot: {
    position: "absolute",
    left: "-34px",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#5865f2",
    border: "3px solid #1e1e1e"
  },
  timelineContent: {
    flex: 1,
    backgroundColor: "#2c2f33",
    borderRadius: "6px",
    padding: "16px"
  },
  nicknameChange: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "8px"
  },
  oldNickname: {
    fontSize: "14px",
    color: "#99aab5",
    textDecoration: "line-through"
  },
  arrow: {
    fontSize: "18px",
    color: "#5865f2"
  },
  newNickname: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff"
  },
  changeInfo: {
    display: "flex",
    gap: "12px",
    fontSize: "12px",
    color: "#99aab5"
  },
  server: {
    flex: 1
  },
  timestamp: {
    flex: 1,
    textAlign: "right"
  }
};
export {
  NicknameHistoryPanel as default
};
