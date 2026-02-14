var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { j as FaLink, a as FaTimes, a5 as FaDownload, bz as FaMousePointer } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const LinkClickTrackingPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, roomSlug }) => {
  const [linkStats, setLinkStats] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    fetchLinkStats();
  }, [roomSlug]);
  const fetchLinkStats = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/links/stats/?room=${roomSlug}`);
      const data = await response.json();
      setLinkStats(data.stats || []);
    } catch (error) {
      toast.error("Failed to load link stats");
    } finally {
      setLoading(false);
    }
  }, "fetchLinkStats");
  const exportStats = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/links/export/?room=${roomSlug}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `link_stats_${(/* @__PURE__ */ new Date()).toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      toast.success("Stats exported successfully");
    } catch (error) {
      toast.error("Failed to export stats");
    }
  }, "exportStats");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaLink, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Link Click Tracking" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.toolbar, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: exportStats, style: styles.exportButton, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, { style: { marginRight: "5px" } }),
      "Export CSV"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading link stats..." }) : linkStats.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No link click data available" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statsTable, children: linkStats.map((stat, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statRow, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.linkInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaMousePointer, { style: { color: "#5865f2", marginRight: "10px" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.linkUrl, children: stat.url }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.linkMeta, children: [
            "Shared by ",
            stat.user?.username,
            " on ",
            new Date(stat.created_at).toLocaleDateString()
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.clickCount, children: [
        stat.click_count,
        " clicks"
      ] })
    ] }, idx)) }) })
  ] }) });
}, "LinkClickTrackingPanel");
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
  toolbar: {
    padding: "15px 20px",
    borderBottom: "1px solid #2c2f33"
  },
  exportButton: {
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
  statsTable: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  statRow: {
    backgroundColor: "#2c2f33",
    borderRadius: "6px",
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  linkInfo: {
    display: "flex",
    alignItems: "center",
    flex: 1
  },
  linkUrl: {
    fontSize: "14px",
    color: "#5865f2",
    fontWeight: "500",
    wordBreak: "break-all",
    marginBottom: "4px"
  },
  linkMeta: {
    fontSize: "12px",
    color: "#99aab5"
  },
  clickCount: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#ffffff",
    minWidth: "100px",
    textAlign: "right"
  }
};
export {
  LinkClickTrackingPanel as default
};
