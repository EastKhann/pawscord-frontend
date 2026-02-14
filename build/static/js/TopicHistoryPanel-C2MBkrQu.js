var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { aF as FaHashtag, a as FaTimes } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const TopicHistoryPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, roomSlug }) => {
  const [history, setHistory] = reactExports.useState([]);
  const [currentTopic, setCurrentTopic] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    fetchTopicHistory();
  }, [roomSlug]);
  const fetchTopicHistory = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/topics/${roomSlug}/history/`);
      const data = await response.json();
      setHistory(data.history || []);
      setCurrentTopic(data.current_topic || "");
    } catch (error) {
      toast.error("Failed to load topic history");
    } finally {
      setLoading(false);
    }
  }, "fetchTopicHistory");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaHashtag, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Topic History" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      currentTopic && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.currentTopic, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.currentTopicLabel, children: "Current Topic" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.currentTopicText, children: currentTopic })
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading history..." }) : history.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No topic history available" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.historyList, children: history.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.historyItem, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.topicText, children: entry.topic }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.topicMeta, children: [
          "Set by ",
          entry.user?.username || "Unknown",
          " on ",
          new Date(entry.set_at).toLocaleString()
        ] })
      ] }, idx)) })
    ] })
  ] }) });
}, "TopicHistoryPanel");
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
  currentTopic: {
    backgroundColor: "#5865f2",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "20px"
  },
  currentTopicLabel: {
    fontSize: "12px",
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: "4px",
    fontWeight: "600"
  },
  currentTopicText: {
    fontSize: "16px",
    color: "#ffffff",
    fontWeight: "500"
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
  historyList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  historyItem: {
    backgroundColor: "#2c2f33",
    borderRadius: "6px",
    padding: "16px"
  },
  topicText: {
    fontSize: "15px",
    color: "#dcddde",
    marginBottom: "8px",
    fontWeight: "500"
  },
  topicMeta: {
    fontSize: "12px",
    color: "#99aab5"
  }
};
export {
  TopicHistoryPanel as default
};
