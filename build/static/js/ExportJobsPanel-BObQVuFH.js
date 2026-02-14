var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { z as FaClock, aL as FaExclamationCircle, v as FaSpinner, w as FaCheckCircle, a5 as FaDownload, a as FaTimes, bc as FaFile } from "./icons-vendor-2VDeY8fW.js";
import { t as toast, d as confirmDialog } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const EXPORT_TYPES = [
  { id: "messages", name: "Messages", description: "Export all your messages" },
  { id: "server", name: "Server Data", description: "Export server content" },
  { id: "dm", name: "Direct Messages", description: "Export DM history" },
  { id: "media", name: "Media Files", description: "Export uploaded media" },
  { id: "profile", name: "Profile Data", description: "Export your profile info" },
  { id: "analytics", name: "Analytics", description: "Export analytics data" }
];
const formatFileSize = /* @__PURE__ */ __name((bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}, "formatFileSize");
const STATUS_ICONS = {
  completed: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheckCircle, { style: { color: "#43b581" } }),
  processing: /* @__PURE__ */ jsxRuntimeExports.jsx(FaSpinner, { style: { color: "#faa61a" }, className: "fa-spin" }),
  failed: /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationCircle, { style: { color: "#f04747" } })
};
const STATUS_COLORS = { completed: "#43b581", processing: "#faa61a", failed: "#f04747" };
const getStatusIcon = /* @__PURE__ */ __name((status) => STATUS_ICONS[status] || /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, { style: { color: "#99aab5" } }), "getStatusIcon");
const getStatusColor = /* @__PURE__ */ __name((status) => STATUS_COLORS[status] || "#99aab5", "getStatusColor");
function useExportJobs(fetchWithAuth, apiBaseUrl) {
  const [jobs, setJobs] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [exportType, setExportType] = reactExports.useState("messages");
  const [creating, setCreating] = reactExports.useState(false);
  const loadExportJobs = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/exports/jobs/`);
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (err) {
      console.error("Failed to load export jobs:", err);
    } finally {
      setLoading(false);
    }
  }, "loadExportJobs");
  reactExports.useEffect(() => {
    loadExportJobs();
    const interval = setInterval(loadExportJobs, 5e3);
    return () => clearInterval(interval);
  }, []);
  const createExport = /* @__PURE__ */ __name(async () => {
    setCreating(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/exports/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ export_type: exportType })
      });
      const data = await res.json();
      data.success ? (toast.success("Export job created! Processing..."), loadExportJobs()) : toast.error(data.error || "Failed to create export");
    } catch {
      toast.error("Failed to create export");
    } finally {
      setCreating(false);
    }
  }, "createExport");
  const downloadExport = /* @__PURE__ */ __name(async (jobId) => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/exports/${jobId}/download/`);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `export_${jobId}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success("Download started!");
    } catch {
      toast.error("Download failed");
    }
  }, "downloadExport");
  const deleteJob = /* @__PURE__ */ __name(async (jobId) => {
    if (!await confirmDialog("Delete this export job?")) return;
    try {
      await fetchWithAuth(`${apiBaseUrl}/exports/${jobId}/delete/`, { method: "DELETE" });
      toast.success("Export job deleted");
      loadExportJobs();
    } catch {
      toast.error("Failed to delete job");
    }
  }, "deleteJob");
  return { jobs, loading, exportType, setExportType, creating, createExport, downloadExport, deleteJob };
}
__name(useExportJobs, "useExportJobs");
const styles = {
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999999 },
  modal: { backgroundColor: "#1e1e1e", borderRadius: "8px", width: "90%", maxWidth: "900px", maxHeight: "85vh", display: "flex", flexDirection: "column", color: "#fff" },
  header: { padding: "20px", borderBottom: "1px solid #444", display: "flex", justifyContent: "space-between", alignItems: "center" },
  headerLeft: { display: "flex", alignItems: "center", gap: "12px" },
  closeBtn: { background: "none", border: "none", color: "#fff", fontSize: "24px", cursor: "pointer", padding: "8px" },
  content: { padding: "20px", overflowY: "auto", flex: 1 },
  createSection: { backgroundColor: "#2c2f33", borderRadius: "8px", padding: "20px", marginBottom: "24px" },
  sectionTitle: { fontSize: "16px", fontWeight: "600", marginBottom: "16px" },
  exportTypeSelector: { display: "flex", gap: "12px" },
  select: { flex: 1, padding: "10px", backgroundColor: "#202225", border: "1px solid #444", borderRadius: "6px", color: "#fff", fontSize: "14px" },
  createBtn: { padding: "10px 24px", backgroundColor: "#5865f2", border: "none", borderRadius: "6px", color: "#fff", fontSize: "14px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap" },
  jobsSection: { marginBottom: "24px" },
  loading: { textAlign: "center", padding: "40px", color: "#99aab5" },
  empty: { textAlign: "center", padding: "60px 20px", color: "#dcddde" },
  jobsList: { display: "flex", flexDirection: "column", gap: "12px" },
  jobCard: { backgroundColor: "#2c2f33", borderRadius: "8px", padding: "16px", display: "flex", alignItems: "center", gap: "16px" },
  jobIcon: { fontSize: "32px", display: "flex", alignItems: "center", justifyContent: "center" },
  jobDetails: { flex: 1 },
  jobTitle: { fontSize: "16px", fontWeight: "600", marginBottom: "4px" },
  jobMeta: { fontSize: "12px", color: "#99aab5", marginBottom: "8px" },
  progressBar: { position: "relative", height: "20px", backgroundColor: "#202225", borderRadius: "10px", overflow: "hidden", marginTop: "8px" },
  progressFill: { height: "100%", backgroundColor: "#5865f2", transition: "width 0.3s ease" },
  progressText: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "12px", fontWeight: "600", color: "#fff" },
  fileSize: { fontSize: "12px", color: "#99aab5", marginTop: "4px" },
  jobActions: { display: "flex", alignItems: "center", gap: "8px" },
  statusBadge: { padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "600", color: "#fff", textTransform: "uppercase" },
  downloadBtn: { padding: "8px 12px", backgroundColor: "#43b581", border: "none", borderRadius: "6px", color: "#fff", cursor: "pointer", fontSize: "14px" },
  deleteBtn: { padding: "8px 12px", backgroundColor: "#f04747", border: "none", borderRadius: "6px", color: "#fff", cursor: "pointer", fontSize: "14px" },
  info: { backgroundColor: "#2c2f33", borderRadius: "8px", padding: "16px" },
  infoText: { fontSize: "14px", color: "#dcddde", margin: "8px 0", lineHeight: "1.6" }
};
const ExportJobsPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose }) => {
  const e = useExportJobs(fetchWithAuth, apiBaseUrl);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((ev) => ev.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, { style: { fontSize: "24px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0, fontSize: "20px" }, children: "Export Jobs" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.createSection, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "Create New Export" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.exportTypeSelector, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: e.exportType, onChange: /* @__PURE__ */ __name((ev) => e.setExportType(ev.target.value), "onChange"), style: styles.select, children: EXPORT_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: t.id, children: [
            t.name,
            " - ",
            t.description
          ] }, t.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: e.createExport, disabled: e.creating, style: styles.createBtn, children: e.creating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaSpinner, { className: "fa-spin" }),
            " Creating..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, {}),
            " Create Export"
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.jobsSection, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "Your Export Jobs" }),
        e.loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading jobs..." }) : e.jobs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.empty, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaFile, { style: { fontSize: "48px", color: "#99aab5", marginBottom: "16px" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No export jobs yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "14px", color: "#99aab5" }, children: "Create your first export to get started" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.jobsList, children: e.jobs.map((job) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.jobCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.jobIcon, children: getStatusIcon(job.status) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.jobDetails, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.jobTitle, children: EXPORT_TYPES.find((t) => t.id === job.type)?.name || job.type }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.jobMeta, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Created: ",
                new Date(job.created_at).toLocaleString()
              ] }),
              job.completed_at && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { margin: "0 8px" }, children: "•" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Completed: ",
                  new Date(job.completed_at).toLocaleString()
                ] })
              ] })
            ] }),
            job.status === "processing" && job.progress && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.progressBar, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.progressFill, width: `${job.progress}%` } }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.progressText, children: [
                job.progress,
                "%"
              ] })
            ] }),
            job.file_size && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.fileSize, children: [
              "Size: ",
              formatFileSize(job.file_size)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.jobActions, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { ...styles.statusBadge, backgroundColor: getStatusColor(job.status) }, children: job.status }),
            job.status === "completed" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => e.downloadExport(job.id), "onClick"), style: styles.downloadBtn, title: "Download", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => e.deleteJob(job.id), "onClick"), style: styles.deleteBtn, title: "Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
          ] })
        ] }, job.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.info, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: styles.infoText, children: [
          "📦",
          " Exports are processed in the background and may take a few minutes"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: styles.infoText, children: [
          "💾",
          " Completed exports are available for 7 days before auto-deletion"
        ] })
      ] })
    ] })
  ] }) });
}, "ExportJobsPanel");
export {
  ExportJobsPanel as default
};
