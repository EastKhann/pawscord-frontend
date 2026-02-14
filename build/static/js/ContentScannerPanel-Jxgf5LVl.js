var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { ay as FaBan, d as FaExclamationTriangle, w as FaCheckCircle, a1 as FaShieldAlt, a0 as FaEye, a as FaTimes, a5 as FaDownload } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const styles = {
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999999 },
  modal: { backgroundColor: "#1e1e1e", borderRadius: "8px", width: "90%", maxWidth: "900px", maxHeight: "90vh", display: "flex", flexDirection: "column", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", borderBottom: "1px solid #2c2f33" },
  headerLeft: { display: "flex", alignItems: "center" },
  title: { margin: 0, fontSize: "20px", color: "#ffffff" },
  closeButton: { background: "none", border: "none", color: "#99aab5", cursor: "pointer", fontSize: "20px", padding: "5px" },
  filters: { display: "flex", gap: "10px", padding: "15px 20px", borderBottom: "1px solid #2c2f33", flexWrap: "wrap" },
  filterButton: { padding: "8px 16px", backgroundColor: "#2c2f33", border: "none", borderRadius: "4px", color: "#ffffff", cursor: "pointer", fontSize: "14px", transition: "background-color 0.2s" },
  filterButtonActive: { backgroundColor: "#5865f2" },
  exportButton: { marginLeft: "auto", padding: "8px 16px", backgroundColor: "#43b581", border: "none", borderRadius: "4px", color: "#ffffff", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center" },
  content: { padding: "20px", overflowY: "auto", flex: 1 },
  loading: { textAlign: "center", color: "#99aab5", padding: "40px" },
  empty: { textAlign: "center", color: "#99aab5", padding: "40px" },
  resultsList: { display: "flex", flexDirection: "column", gap: "15px" },
  resultCard: { backgroundColor: "#2c2f33", borderRadius: "6px", padding: "15px" },
  resultHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" },
  resultStatus: { display: "flex", alignItems: "center", fontSize: "14px" },
  timestamp: { fontSize: "12px", color: "#99aab5" },
  resultBody: { display: "flex", flexDirection: "column", gap: "15px" },
  resultInfo: { display: "flex", flexDirection: "column", gap: "8px" },
  infoRow: { display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#dcddde" },
  progressBar: { flex: 1, height: "8px", backgroundColor: "#1e1e1e", borderRadius: "4px", overflow: "hidden" },
  progressFill: { height: "100%", transition: "width 0.3s" },
  flags: { display: "flex", flexWrap: "wrap", gap: "5px" },
  flag: { padding: "4px 8px", backgroundColor: "#f04747", borderRadius: "4px", fontSize: "12px", color: "#ffffff" },
  actions: { display: "flex", gap: "10px", justifyContent: "flex-end" },
  actionButton: { padding: "8px 16px", border: "none", borderRadius: "4px", color: "#ffffff", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center" },
  approveButton: { backgroundColor: "#43b581" },
  blockButton: { backgroundColor: "#f04747" },
  ignoreButton: { backgroundColor: "#99aab5" }
};
const useContentScanner = /* @__PURE__ */ __name((fetchWithAuth, apiBaseUrl, messageId) => {
  const [scanResults, setScanResults] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [filter, setFilter] = reactExports.useState("all");
  const fetchResults = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const url = messageId ? `${apiBaseUrl}/messages/${messageId}/scan_results/` : `${apiBaseUrl}/content_scanner/results/`;
      const response = await fetchWithAuth(url);
      const data = await response.json();
      setScanResults(data.results || []);
    } catch (error) {
      toast.error("Failed to load scan results");
    } finally {
      setLoading(false);
    }
  }, "fetchResults");
  reactExports.useEffect(() => {
    fetchResults();
  }, [messageId]);
  const exportResults = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/content_scanner/export/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filter })
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `scan_results_${(/* @__PURE__ */ new Date()).toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      toast.success("Results exported successfully");
    } catch (error) {
      toast.error("Failed to export results");
    }
  }, "exportResults");
  const reviewResult = /* @__PURE__ */ __name(async (resultId, action) => {
    try {
      await fetchWithAuth(`${apiBaseUrl}/content_scanner/results/${resultId}/review/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action })
      });
      toast.success(`Content ${action}ed successfully`);
      fetchResults();
    } catch (error) {
      toast.error("Failed to review content");
    }
  }, "reviewResult");
  const filteredResults = scanResults.filter((r) => filter === "all" || r.status === filter);
  return { scanResults, filteredResults, loading, filter, setFilter, exportResults, reviewResult };
}, "useContentScanner");
const STATUS_CONFIG = {
  safe: { icon: FaCheckCircle, color: "#43b581" },
  flagged: { icon: FaExclamationTriangle, color: "#faa61a" },
  blocked: { icon: FaBan, color: "#f04747" }
};
const ScanResultCard = /* @__PURE__ */ __name(({ result, onReview }) => {
  const cfg = STATUS_CONFIG[result.status] || { icon: FaShieldAlt, color: "#99aab5" };
  const StatusIcon = cfg.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.resultCard, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.resultHeader, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.resultStatus, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIcon, { style: { color: cfg.color } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginLeft: "8px", color: cfg.color, fontWeight: "600" }, children: result.status.toUpperCase() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.timestamp, children: new Date(result.scanned_at).toLocaleString() })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.resultBody, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.resultInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.infoRow, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Type:" }),
          " ",
          result.content_type
        ] }),
        result.confidence_score && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.infoRow, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Confidence:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.progressBar, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.progressFill, width: `${result.confidence_score}%`, backgroundColor: result.confidence_score > 80 ? "#f04747" : result.confidence_score > 50 ? "#faa61a" : "#43b581" } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            result.confidence_score,
            "%"
          ] })
        ] }),
        result.flags?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.infoRow, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Flags:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.flags, children: result.flags.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.flag, children: f }, i)) })
        ] }),
        result.reason && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.infoRow, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Reason:" }),
          " ",
          result.reason
        ] })
      ] }),
      result.status === "flagged" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.actions, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => onReview(result.id, "approve"), "onClick"), style: { ...styles.actionButton, ...styles.approveButton }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheckCircle, { style: { marginRight: "5px" } }),
          " Approve"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => onReview(result.id, "block"), "onClick"), style: { ...styles.actionButton, ...styles.blockButton }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaBan, { style: { marginRight: "5px" } }),
          " Block"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => onReview(result.id, "ignore"), "onClick"), style: { ...styles.actionButton, ...styles.ignoreButton }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaEye, { style: { marginRight: "5px" } }),
          " Ignore"
        ] })
      ] })
    ] })
  ] });
}, "ScanResultCard");
const FILTERS = [
  { key: "all", label: "All", icon: "" },
  { key: "safe", label: "Safe", icon: "✅ " },
  { key: "flagged", label: "Flagged", icon: "⚠️ " },
  { key: "blocked", label: "Blocked", icon: "🚫 " }
];
const ContentScannerPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, messageId }) => {
  const { scanResults, filteredResults, loading, filter, setFilter, exportResults, reviewResult } = useContentScanner(fetchWithAuth, apiBaseUrl, messageId);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Content Scanner Results" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.filters, children: [
      FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => setFilter(f.key), "onClick"),
          style: { ...styles.filterButton, ...filter === f.key && styles.filterButtonActive },
          children: [
            f.icon,
            f.label,
            " (",
            f.key === "all" ? scanResults.length : scanResults.filter((r) => r.status === f.key).length,
            ")"
          ]
        },
        f.key
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: exportResults, style: styles.exportButton, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, { style: { marginRight: "5px" } }),
        " Export"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading scan results..." }) : filteredResults.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No scan results found" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.resultsList, children: filteredResults.map((result, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(ScanResultCard, { result, onReview: reviewResult }, index)) }) })
  ] }) });
}, "ContentScannerPanel");
export {
  ContentScannerPanel as default
};
