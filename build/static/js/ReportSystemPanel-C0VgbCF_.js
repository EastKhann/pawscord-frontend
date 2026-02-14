var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { be as FaFlag, C as FaUser, ba as FaComment, a as FaTimes, a9 as FaCheck, g as FaTrash, ay as FaBan, a0 as FaEye, V as FaFilter } from "./icons-vendor-2VDeY8fW.js";
import { t as toast, d as confirmDialog } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const useReportSystem = /* @__PURE__ */ __name(({ serverId, fetchWithAuth, apiBaseUrl }) => {
  const [reports, setReports] = reactExports.useState([]);
  const [filter, setFilter] = reactExports.useState("pending");
  const [typeFilter, setTypeFilter] = reactExports.useState("all");
  const [selectedReport, setSelectedReport] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [stats, setStats] = reactExports.useState({
    pending: 0,
    resolved: 0,
    dismissed: 0,
    total: 0
  });
  const loadReports = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        server: serverId,
        status: filter !== "all" ? filter : "",
        report_type: typeFilter !== "all" ? typeFilter : ""
      });
      const res = await fetchWithAuth(`${apiBaseUrl}/moderation/reports/?${queryParams}`);
      if (res.ok) {
        const data = await res.json();
        setReports(data.results || data);
      }
    } catch (error) {
      console.error("Failed to load reports:", error);
    }
    setLoading(false);
  }, "loadReports");
  const loadStats = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/moderation/reports/stats/${serverId}/`);
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  }, "loadStats");
  const handleReport = /* @__PURE__ */ __name(async (reportId, action, reason = "") => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/moderation/reports/${reportId}/handle/`, {
        method: "POST",
        body: JSON.stringify({
          action,
          reason,
          moderator_notes: reason
        })
      });
      if (res.ok) {
        loadReports();
        loadStats();
        setSelectedReport(null);
      } else {
        toast.error("❌ Failed to handle report");
      }
    } catch (error) {
      console.error("Failed to handle report:", error);
    }
  }, "handleReport");
  const getReportIcon = /* @__PURE__ */ __name((type) => {
    switch (type) {
      case "message":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FaComment, {});
      case "user":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FaUser, {});
      case "server":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FaFlag, {});
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FaFlag, {});
    }
  }, "getReportIcon");
  const getReportBadgeColor = /* @__PURE__ */ __name((status) => {
    switch (status) {
      case "pending":
        return "#f0b132";
      case "resolved":
        return "#43b581";
      case "dismissed":
        return "#72767d";
      default:
        return "#5865f2";
    }
  }, "getReportBadgeColor");
  const getSeverityColor = /* @__PURE__ */ __name((severity) => {
    switch (severity) {
      case "low":
        return "#43b581";
      case "medium":
        return "#f0b132";
      case "high":
        return "#ed4245";
      case "critical":
        return "#a12929";
      default:
        return "#72767d";
    }
  }, "getSeverityColor");
  return {
    reports,
    filter,
    setFilter,
    typeFilter,
    setTypeFilter,
    selectedReport,
    setSelectedReport,
    loading,
    stats,
    loadReports,
    loadStats,
    handleReport,
    getReportIcon,
    getReportBadgeColor,
    getSeverityColor
  };
}, "useReportSystem");
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
    zIndex: 1e4,
    backdropFilter: "blur(5px)"
  },
  panel: {
    backgroundColor: "#2b2d31",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "1000px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
    overflow: "hidden"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #1e1f22"
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  headerIcon: {
    fontSize: "24px",
    color: "#f0b132"
  },
  title: {
    margin: 0,
    color: "#fff",
    fontSize: "24px",
    fontWeight: "600"
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    fontSize: "24px",
    padding: "8px"
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "16px",
    padding: "20px",
    borderBottom: "1px solid #1e1f22"
  },
  statCard: {
    backgroundColor: "#1e1f22",
    borderRadius: "8px",
    padding: "16px",
    textAlign: "center"
  },
  statIcon: {
    fontSize: "32px",
    marginBottom: "8px"
  },
  statValue: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "4px"
  },
  statLabel: {
    fontSize: "13px",
    color: "#b9bbbe"
  },
  filters: {
    padding: "16px 20px",
    borderBottom: "1px solid #1e1f22",
    backgroundColor: "#1e1f22"
  },
  filterGroup: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  filterIcon: {
    color: "#b9bbbe",
    fontSize: "16px"
  },
  filterSelect: {
    backgroundColor: "#2b2d31",
    border: "1px solid #1e1f22",
    borderRadius: "6px",
    padding: "8px 12px",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer"
  },
  reportsList: {
    flex: 1,
    overflowY: "auto",
    padding: "20px"
  },
  loading: {
    textAlign: "center",
    color: "#b9bbbe",
    padding: "40px",
    fontSize: "14px"
  },
  empty: {
    textAlign: "center",
    color: "#b9bbbe",
    padding: "60px"
  },
  emptyIcon: {
    fontSize: "48px",
    marginBottom: "16px",
    opacity: 0.5
  },
  reportCard: {
    backgroundColor: "#1e1f22",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "12px",
    cursor: "pointer",
    transition: "background-color 0.2s",
    ":hover": {
      backgroundColor: "#2b2d31"
    }
  },
  reportHeader: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "12px"
  },
  reportIcon: {
    fontSize: "20px",
    color: "#f0b132",
    marginTop: "4px"
  },
  reportInfo: {
    flex: 1
  },
  reportTitle: {
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "4px"
  },
  reportMeta: {
    color: "#72767d",
    fontSize: "13px",
    display: "flex",
    gap: "8px"
  },
  reportBadges: {
    display: "flex",
    gap: "8px"
  },
  badge: {
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: "600",
    color: "#fff",
    textTransform: "uppercase"
  },
  reportContent: {
    paddingLeft: "32px"
  },
  reportText: {
    color: "#b9bbbe",
    fontSize: "14px",
    margin: "0 0 12px 0"
  },
  reportedContent: {
    backgroundColor: "#2b2d31",
    padding: "12px",
    borderRadius: "6px",
    borderLeft: "3px solid #ed4245",
    marginBottom: "12px"
  },
  reportedUser: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#b9bbbe",
    fontSize: "13px"
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10001
  },
  modal: {
    backgroundColor: "#2b2d31",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "600px",
    maxHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #1e1f22"
  },
  modalTitle: {
    margin: 0,
    color: "#fff",
    fontSize: "20px",
    fontWeight: "600"
  },
  modalClose: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    fontSize: "20px"
  },
  modalContent: {
    flex: 1,
    overflowY: "auto",
    padding: "20px"
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #1e1f22",
    color: "#fff",
    fontSize: "14px"
  },
  detailSection: {
    marginTop: "20px"
  },
  detailText: {
    color: "#b9bbbe",
    fontSize: "14px",
    marginTop: "8px",
    lineHeight: "1.5"
  },
  messageBox: {
    backgroundColor: "#1e1f22",
    padding: "12px",
    borderRadius: "6px",
    borderLeft: "3px solid #ed4245",
    color: "#fff",
    fontSize: "14px",
    marginTop: "8px"
  },
  modalActions: {
    display: "flex",
    gap: "12px",
    padding: "16px 20px",
    borderTop: "1px solid #1e1f22",
    flexWrap: "wrap"
  },
  actionBtn: {
    flex: 1,
    backgroundColor: "#43b581",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 16px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    minWidth: "120px"
  }
};
const ReportDetailModal = /* @__PURE__ */ __name(({ report, onClose, onHandle, getReportBadgeColor, getSeverityColor }) => {
  if (!report) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.modalOverlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modalHeader, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.modalTitle, children: "Report Details" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.modalClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modalContent, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.detailRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Report Type:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: report.report_type })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.detailRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Status:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { ...styles.badge, backgroundColor: getReportBadgeColor(report.status) }, children: report.status })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.detailRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Severity:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { ...styles.badge, backgroundColor: getSeverityColor(report.severity) }, children: report.severity || "N/A" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.detailRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Reporter:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: report.reporter_username })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.detailRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Reported User:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: report.reported_username || "N/A" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.detailRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Created:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(report.created_at).toLocaleString() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.detailSection, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Reason:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.detailText, children: report.reason })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.detailSection, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Description:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.detailText, children: report.description })
      ] }),
      report.message_content && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.detailSection, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Reported Message:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.messageBox, children: report.message_content })
      ] }),
      report.moderator_notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.detailSection, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Moderator Notes:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.detailText, children: report.moderator_notes })
      ] })
    ] }),
    report.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modalActions, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => {
            const reason = prompt("Resolution notes (optional):");
            onHandle(report.id, "resolve", reason || "");
          }, "onClick"),
          style: styles.actionBtn,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, {}),
            " Resolve"
          ]
        }
      ),
      report.message_id && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(async () => {
            if (await confirmDialog("Delete this message?")) {
              onHandle(report.id, "delete_message");
            }
          }, "onClick"),
          style: { ...styles.actionBtn, backgroundColor: "#ed4245" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}),
            " Delete Message"
          ]
        }
      ),
      report.reported_user && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(async () => {
            if (await confirmDialog("Ban this user?")) {
              const reason = prompt("Ban reason:");
              if (reason) {
                onHandle(report.id, "ban_user", reason);
              }
            }
          }, "onClick"),
          style: { ...styles.actionBtn, backgroundColor: "#a12929" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaBan, {}),
            " Ban User"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => {
            const reason = prompt("Dismiss reason:");
            if (reason) {
              onHandle(report.id, "dismiss", reason);
            }
          }, "onClick"),
          style: { ...styles.actionBtn, backgroundColor: "#72767d" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}),
            " Dismiss"
          ]
        }
      )
    ] })
  ] }) });
}, "ReportDetailModal");
const ReportSystemPanel = /* @__PURE__ */ __name(({ serverId, fetchWithAuth, apiBaseUrl, onClose }) => {
  const {
    reports,
    filter,
    setFilter,
    typeFilter,
    setTypeFilter,
    selectedReport,
    setSelectedReport,
    loading,
    stats,
    loadReports,
    loadStats,
    handleReport,
    getReportIcon,
    getReportBadgeColor,
    getSeverityColor
  } = useReportSystem({ serverId, fetchWithAuth, apiBaseUrl });
  reactExports.useEffect(() => {
    loadReports();
    loadStats();
  }, [serverId, filter, typeFilter]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.panel, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaFlag, { style: styles.headerIcon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Report System" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statsGrid, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaFlag, { style: { ...styles.statIcon, color: "#f0b132" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: stats.pending }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Pending" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { style: { ...styles.statIcon, color: "#43b581" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: stats.resolved }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Resolved" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { style: { ...styles.statIcon, color: "#72767d" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: stats.dismissed }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Dismissed" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaEye, { style: { ...styles.statIcon, color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: stats.total }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Total Reports" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.filters, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.filterGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaFilter, { style: styles.filterIcon }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: filter, onChange: /* @__PURE__ */ __name((e) => setFilter(e.target.value), "onChange"), style: styles.filterSelect, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Reports" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pending", children: "Pending" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "resolved", children: "Resolved" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "dismissed", children: "Dismissed" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: typeFilter, onChange: /* @__PURE__ */ __name((e) => setTypeFilter(e.target.value), "onChange"), style: styles.filterSelect, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Types" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "message", children: "Messages" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "user", children: "Users" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "server", children: "Server" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.reportsList, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading reports..." }) : reports.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.empty, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaFlag, { style: styles.emptyIcon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No reports found" })
    ] }) : reports.map((report) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.reportCard, onClick: /* @__PURE__ */ __name(() => setSelectedReport(report), "onClick"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.reportHeader, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.reportIcon, children: getReportIcon(report.report_type) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.reportInfo, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.reportTitle, children: report.reason || `${report.report_type} Report` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.reportMeta, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "By: ",
              report.reporter_username || "Unknown"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(report.created_at).toLocaleString() })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.reportBadges, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { ...styles.badge, backgroundColor: getReportBadgeColor(report.status) }, children: report.status }),
          report.severity && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { ...styles.badge, backgroundColor: getSeverityColor(report.severity) }, children: report.severity })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.reportContent, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.reportText, children: report.description }),
        report.message_content && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.reportedContent, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Reported Content:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: report.message_content })
        ] }),
        report.reported_username && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.reportedUser, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaUser, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Reported User: ",
            report.reported_username
          ] })
        ] })
      ] })
    ] }, report.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReportDetailModal,
      {
        report: selectedReport,
        onClose: /* @__PURE__ */ __name(() => setSelectedReport(null), "onClose"),
        onHandle: handleReport,
        getReportBadgeColor,
        getSeverityColor
      }
    )
  ] }) });
}, "ReportSystemPanel");
export {
  ReportSystemPanel as default
};
