var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { bF as FaFileArchive, a as FaTimes, a5 as FaDownload, z as FaClock, aL as FaExclamationCircle, w as FaCheckCircle } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const GDPRExportPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose }) => {
  const [exports$1, setExports] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [requesting, setRequesting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    fetchExports();
  }, []);
  const fetchExports = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/gdpr/exports/`);
      const data = await response.json();
      setExports(data.exports || []);
    } catch (error) {
      toast.error("Failed to load exports");
    } finally {
      setLoading(false);
    }
  }, "fetchExports");
  const requestExport = /* @__PURE__ */ __name(async () => {
    setRequesting(true);
    try {
      await fetchWithAuth(`${apiBaseUrl}/gdpr/request-export/`, {
        method: "POST"
      });
      toast.success("Export requested. You will be notified when it's ready (usually within 24 hours)");
      fetchExports();
    } catch (error) {
      toast.error("Failed to request export");
    } finally {
      setRequesting(false);
    }
  }, "requestExport");
  const downloadExport = /* @__PURE__ */ __name(async (exportId) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/gdpr/exports/${exportId}/download/`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `pawscord_data_export_${exportId}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Export downloaded");
    } catch (error) {
      toast.error("Failed to download export");
    }
  }, "downloadExport");
  const getStatusIcon = /* @__PURE__ */ __name((status) => {
    switch (status) {
      case "completed":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheckCircle, { style: { color: "#43b581" } });
      case "failed":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationCircle, { style: { color: "#f04747" } });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, { style: { color: "#faa61a" } });
    }
  }, "getStatusIcon");
  const getStatusText = /* @__PURE__ */ __name((status) => {
    switch (status) {
      case "pending":
        return "Processing...";
      case "completed":
        return "Ready to Download";
      case "failed":
        return "Failed";
      default:
        return status;
    }
  }, "getStatusText");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaFileArchive, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "GDPR Data Export" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.info, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.infoText, children: "Request a complete archive of your data. This includes messages, media, profile information, and activity logs. Exports are usually ready within 24 hours." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: requestExport, disabled: requesting, style: styles.requestButton, children: requesting ? "Requesting..." : "Request New Export" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading exports..." }) : exports$1.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.empty, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaFileArchive, { style: { fontSize: "48px", color: "#2c2f33", marginBottom: "16px" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "No exports yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.emptySubtext, children: "Request your first data export above" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.exportsList, children: exports$1.map((exp, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.exportCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.exportIcon, children: getStatusIcon(exp.status) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.exportInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.exportStatus, children: getStatusText(exp.status) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.exportMeta, children: [
          "Requested: ",
          new Date(exp.created_at).toLocaleString()
        ] }),
        exp.completed_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.exportMeta, children: [
          "Completed: ",
          new Date(exp.completed_at).toLocaleString()
        ] }),
        exp.file_size && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.exportMeta, children: [
          "Size: ",
          (exp.file_size / 1024 / 1024).toFixed(2),
          " MB"
        ] }),
        exp.expires_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.exportMeta, children: [
          "Expires: ",
          new Date(exp.expires_at).toLocaleDateString()
        ] })
      ] }),
      exp.status === "completed" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => downloadExport(exp.id), "onClick"),
          style: styles.downloadButton,
          title: "Download",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, { style: { marginRight: "6px" } }),
            "Download"
          ]
        }
      )
    ] }, idx)) }) })
  ] }) });
}, "GDPRExportPanel");
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
  info: {
    padding: "20px",
    borderBottom: "1px solid #2c2f33"
  },
  infoText: {
    fontSize: "14px",
    color: "#dcddde",
    lineHeight: "1.6",
    margin: "0 0 16px 0"
  },
  requestButton: {
    padding: "10px 20px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    width: "100%"
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
    padding: "60px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  emptySubtext: {
    fontSize: "13px",
    marginTop: "8px"
  },
  exportsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  exportCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    gap: "16px",
    alignItems: "flex-start"
  },
  exportIcon: {
    fontSize: "24px",
    minWidth: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  exportInfo: {
    flex: 1
  },
  exportStatus: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "6px"
  },
  exportMeta: {
    fontSize: "13px",
    color: "#99aab5",
    marginTop: "4px"
  },
  downloadButton: {
    padding: "8px 16px",
    backgroundColor: "#43b581",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center"
  }
};
export {
  GDPRExportPanel as default
};
