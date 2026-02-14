var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, a as React, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a as FaTimes, an as FaPlus, d as FaExclamationTriangle, aB as FaHistory, ay as FaBan, t as FaSearch, C as FaUser, g as FaTrash } from "./icons-vendor-2VDeY8fW.js";
import { t as toast, d as confirmDialog } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
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
  headerLeft: { display: "flex", alignItems: "center", gap: "12px" },
  headerIcon: { fontSize: "24px", color: "#f0b132" },
  title: { margin: 0, color: "#fff", fontSize: "24px", fontWeight: "600" },
  headerRight: { display: "flex", gap: "12px" },
  addBtn: {
    backgroundColor: "#43b581",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "8px"
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
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    padding: "20px",
    borderBottom: "1px solid #1e1f22"
  },
  statCard: { backgroundColor: "#1e1f22", borderRadius: "8px", padding: "16px", textAlign: "center" },
  statIcon: { fontSize: "32px", marginBottom: "8px" },
  statValue: { fontSize: "28px", fontWeight: "bold", color: "#fff", marginBottom: "4px" },
  statLabel: { fontSize: "13px", color: "#b9bbbe" },
  searchBar: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px 20px",
    borderBottom: "1px solid #1e1f22",
    backgroundColor: "#1e1f22"
  },
  searchIcon: { color: "#b9bbbe", fontSize: "16px" },
  searchInput: {
    flex: 1,
    backgroundColor: "#2b2d31",
    border: "1px solid #1e1f22",
    borderRadius: "6px",
    padding: "8px 12px",
    color: "#fff",
    fontSize: "14px"
  },
  warningsList: { flex: 1, overflowY: "auto", padding: "20px" },
  loading: { textAlign: "center", color: "#b9bbbe", padding: "40px", fontSize: "14px" },
  empty: { textAlign: "center", color: "#b9bbbe", padding: "60px" },
  emptyIcon: { fontSize: "48px", marginBottom: "16px", opacity: 0.5 },
  userCard: { backgroundColor: "#1e1f22", borderRadius: "8px", padding: "16px", marginBottom: "16px" },
  userHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
    paddingBottom: "12px",
    borderBottom: "1px solid #2b2d31"
  },
  userInfo: { display: "flex", alignItems: "center", gap: "12px" },
  userIcon: { fontSize: "20px", color: "#5865f2" },
  userName: { color: "#fff", fontSize: "18px", fontWeight: "600" },
  badge: {
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: "600",
    color: "#fff",
    textTransform: "uppercase"
  },
  riskBadge: {
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: "700",
    color: "#fff",
    backgroundColor: "#ed4245",
    animation: "pulse 1.5s infinite"
  },
  banBtn: {
    backgroundColor: "#ed4245",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  userWarnings: { display: "flex", flexDirection: "column", gap: "8px" },
  warningItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    backgroundColor: "#2b2d31",
    borderRadius: "6px"
  },
  warningLeft: { display: "flex", alignItems: "center", gap: "12px", flex: 1 },
  severityDot: { width: "12px", height: "12px", borderRadius: "50%", flexShrink: 0 },
  warningContent: { flex: 1 },
  warningReason: { color: "#fff", fontSize: "14px", marginBottom: "4px" },
  warningMeta: { color: "#72767d", fontSize: "12px", display: "flex", gap: "8px", flexWrap: "wrap" },
  removeBtn: { background: "none", border: "none", color: "#ed4245", cursor: "pointer", fontSize: "14px", padding: "8px" },
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
    maxWidth: "500px",
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
  modalTitle: { margin: 0, color: "#fff", fontSize: "20px", fontWeight: "600" },
  modalClose: { background: "none", border: "none", color: "#b9bbbe", cursor: "pointer", fontSize: "20px" },
  modalContent: { flex: 1, overflowY: "auto", padding: "20px" },
  formGroup: { marginBottom: "20px" },
  label: { display: "block", color: "#b9bbbe", fontSize: "14px", fontWeight: "600", marginBottom: "8px" },
  select: {
    width: "100%",
    backgroundColor: "#1e1f22",
    border: "1px solid #2b2d31",
    borderRadius: "6px",
    padding: "10px",
    color: "#fff",
    fontSize: "14px"
  },
  input: {
    width: "100%",
    backgroundColor: "#1e1f22",
    border: "1px solid #2b2d31",
    borderRadius: "6px",
    padding: "10px",
    color: "#fff",
    fontSize: "14px"
  },
  textarea: {
    width: "100%",
    backgroundColor: "#1e1f22",
    border: "1px solid #2b2d31",
    borderRadius: "6px",
    padding: "10px",
    color: "#fff",
    fontSize: "14px",
    resize: "vertical",
    fontFamily: "inherit"
  },
  hint: { color: "#72767d", fontSize: "12px", marginTop: "4px" },
  modalActions: {
    display: "flex",
    gap: "12px",
    padding: "16px 20px",
    borderTop: "1px solid #1e1f22"
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#2b2d31",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 16px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600"
  },
  submitBtn: {
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
    gap: "8px"
  }
};
const useWarnings = /* @__PURE__ */ __name((serverId, fetchWithAuth, apiBaseUrl) => {
  const [warnings, setWarnings] = reactExports.useState([]);
  const [users, setUsers] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [stats, setStats] = reactExports.useState({
    total_warnings: 0,
    active_warnings: 0,
    expired_warnings: 0,
    auto_banned_users: 0
  });
  const loadWarnings = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/moderation/warnings/${serverId}/`);
      if (res.ok) {
        const data = await res.json();
        setWarnings(data.results || data);
      }
    } catch (error) {
      console.error("Failed to load warnings:", error);
    }
    setLoading(false);
  }, [serverId, fetchWithAuth, apiBaseUrl]);
  const loadUsers = reactExports.useCallback(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/members/`);
      if (res.ok) setUsers(await res.json());
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  }, [serverId, fetchWithAuth, apiBaseUrl]);
  const loadStats = reactExports.useCallback(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/moderation/warnings/stats/${serverId}/`);
      if (res.ok) setStats(await res.json());
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  }, [serverId, fetchWithAuth, apiBaseUrl]);
  reactExports.useEffect(() => {
    loadWarnings();
    loadUsers();
    loadStats();
  }, [loadWarnings, loadUsers, loadStats]);
  const banUser = reactExports.useCallback(async (userId, reason) => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/moderation/ban/`, {
        method: "POST",
        body: JSON.stringify({ server: serverId, user: userId, reason })
      });
      if (res.ok) {
        toast.success("✅ User banned successfully");
        loadWarnings();
        loadStats();
      }
    } catch (error) {
      console.error("Failed to ban user:", error);
    }
  }, [serverId, fetchWithAuth, apiBaseUrl, loadWarnings, loadStats]);
  const addWarning = reactExports.useCallback(async (newWarning) => {
    if (!newWarning.user_id || !newWarning.reason) {
      toast.error("❌ Please select a user and provide a reason");
      return false;
    }
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/moderation/warnings/create/`, {
        method: "POST",
        body: JSON.stringify({
          server: serverId,
          user: newWarning.user_id,
          reason: newWarning.reason,
          severity: newWarning.severity,
          expires_at: new Date(Date.now() + newWarning.expires_in_days * 24 * 60 * 60 * 1e3).toISOString(),
          is_auto: false
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.total_warnings >= newWarning.auto_ban_on) {
          if (await confirmDialog(`User has ${data.total_warnings} warnings. Auto-ban now?`)) {
            await banUser(newWarning.user_id, `Auto-ban: ${newWarning.auto_ban_on} warnings reached`);
          }
        }
        loadWarnings();
        loadStats();
        return true;
      } else {
        toast.error("❌ Failed to add warning");
      }
    } catch (error) {
      console.error("Failed to add warning:", error);
    }
    return false;
  }, [serverId, fetchWithAuth, apiBaseUrl, banUser, loadWarnings, loadStats]);
  const removeWarning = reactExports.useCallback(async (warningId) => {
    if (!await confirmDialog("Remove this warning?")) return;
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/moderation/warnings/${warningId}/`, { method: "DELETE" });
      if (res.ok) {
        loadWarnings();
        loadStats();
      } else toast.error("❌ Failed to remove warning");
    } catch (error) {
      console.error("Failed to remove warning:", error);
    }
  }, [fetchWithAuth, apiBaseUrl, loadWarnings, loadStats]);
  return { warnings, users, loading, stats, addWarning, removeWarning, banUser };
}, "useWarnings");
const INITIAL_WARNING = {
  user_id: "",
  reason: "",
  severity: "medium",
  expires_in_days: 30,
  auto_ban_on: 3
};
const AddWarningModal = /* @__PURE__ */ __name(({ users, onAdd, onClose }) => {
  const [newWarning, setNewWarning] = reactExports.useState(INITIAL_WARNING);
  const handleAdd = /* @__PURE__ */ __name(async () => {
    const success = await onAdd(newWarning);
    if (success) onClose();
  }, "handleAdd");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.modalOverlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modalHeader, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.modalTitle, children: "Add Warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.modalClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modalContent, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "User" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: newWarning.user_id,
            onChange: /* @__PURE__ */ __name((e) => setNewWarning({ ...newWarning, user_id: e.target.value }), "onChange"),
            style: styles.select,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select user..." }),
              users.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: user.id, children: user.username }, user.id))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Reason" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: newWarning.reason,
            onChange: /* @__PURE__ */ __name((e) => setNewWarning({ ...newWarning, reason: e.target.value }), "onChange"),
            placeholder: "Why is this warning being issued?",
            style: styles.textarea,
            rows: "3"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Severity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: newWarning.severity,
            onChange: /* @__PURE__ */ __name((e) => setNewWarning({ ...newWarning, severity: e.target.value }), "onChange"),
            style: styles.select,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "low", children: [
                "🟢",
                " Low"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "medium", children: [
                "🟡",
                " Medium"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "high", children: [
                "🔴",
                " High"
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Expires In (Days)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            value: newWarning.expires_in_days,
            onChange: /* @__PURE__ */ __name((e) => setNewWarning({ ...newWarning, expires_in_days: parseInt(e.target.value) }), "onChange"),
            style: styles.input,
            min: "1",
            max: "365"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Auto-ban Threshold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            value: newWarning.auto_ban_on,
            onChange: /* @__PURE__ */ __name((e) => setNewWarning({ ...newWarning, auto_ban_on: parseInt(e.target.value) }), "onChange"),
            style: styles.input,
            min: "2",
            max: "10"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.hint, children: [
          "User will be auto-banned after reaching ",
          newWarning.auto_ban_on,
          " active warnings"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modalActions, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.cancelBtn, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleAdd, style: styles.submitBtn, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
        " Add Warning"
      ] })
    ] })
  ] }) });
}, "AddWarningModal");
const AddWarningModal$1 = React.memo(AddWarningModal);
const getSeverityColor = /* @__PURE__ */ __name((severity) => {
  switch (severity) {
    case "low":
      return "#43b581";
    case "medium":
      return "#f0b132";
    case "high":
      return "#ed4245";
    default:
      return "#72767d";
  }
}, "getSeverityColor");
const UserWarningsPanel = /* @__PURE__ */ __name(({ serverId, fetchWithAuth, apiBaseUrl, onClose }) => {
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [showAddWarning, setShowAddWarning] = reactExports.useState(false);
  const { warnings, users, loading, stats, addWarning, removeWarning, banUser } = useWarnings(serverId, fetchWithAuth, apiBaseUrl);
  const warningsByUser = reactExports.useMemo(() => {
    const filtered = warnings.filter(
      (w) => !searchTerm || w.user_username?.toLowerCase().includes(searchTerm.toLowerCase()) || w.reason?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filtered.reduce((acc, warning) => {
      if (!acc[warning.user]) {
        acc[warning.user] = { user_id: warning.user, username: warning.user_username, warnings: [] };
      }
      acc[warning.user].warnings.push(warning);
      return acc;
    }, {});
  }, [warnings, searchTerm]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.panel, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, { style: styles.headerIcon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "User Warnings" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerRight, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setShowAddWarning(true), "onClick"), style: styles.addBtn, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
          " Add Warning"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statsGrid, children: [
      { icon: FaExclamationTriangle, color: "#f0b132", value: stats.total_warnings, label: "Total Warnings" },
      { icon: FaExclamationTriangle, color: "#43b581", value: stats.active_warnings, label: "Active" },
      { icon: FaHistory, color: "#72767d", value: stats.expired_warnings, label: "Expired" },
      { icon: FaBan, color: "#ed4245", value: stats.auto_banned_users, label: "Auto-Banned" }
    ].map(({ icon: Icon, color, value, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { style: { ...styles.statIcon, color } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: label })
    ] }, label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.searchBar, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaSearch, { style: styles.searchIcon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Search by username or reason...",
          value: searchTerm,
          onChange: /* @__PURE__ */ __name((e) => setSearchTerm(e.target.value), "onChange"),
          style: styles.searchInput
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.warningsList, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading warnings..." }) : Object.keys(warningsByUser).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.empty, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, { style: styles.emptyIcon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No warnings found" })
    ] }) : Object.values(warningsByUser).map(({ user_id, username, warnings: userWarnings }) => {
      const activeWarnings = userWarnings.filter((w) => w.is_active);
      const isAtRisk = activeWarnings.length >= 2;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.userCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.userHeader, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.userInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaUser, { style: styles.userIcon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.userName, children: username }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { ...styles.badge, backgroundColor: isAtRisk ? "#ed4245" : "#f0b132" }, children: [
              activeWarnings.length,
              " Active Warning",
              activeWarnings.length !== 1 ? "s" : ""
            ] }),
            isAtRisk && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.riskBadge, children: [
              "⚠️",
              " AT RISK"
            ] })
          ] }),
          activeWarnings.length >= 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => banUser(user_id, "Auto-ban: 3 warnings"), "onClick"), style: styles.banBtn, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaBan, {}),
            " Ban User"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.userWarnings, children: userWarnings.map((warning) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.warningItem, opacity: warning.is_active ? 1 : 0.5 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.warningLeft, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.severityDot, backgroundColor: getSeverityColor(warning.severity) } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.warningContent, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.warningReason, children: warning.reason }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.warningMeta, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: warning.is_auto ? "🤖 Auto" : "👤 Manual" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(warning.created_at).toLocaleString() }),
                warning.expires_at && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "Expires: ",
                    new Date(warning.expires_at).toLocaleDateString()
                  ] })
                ] }),
                !warning.is_active && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#72767d" }, children: "EXPIRED" })
                ] })
              ] })
            ] })
          ] }),
          warning.is_active && !warning.is_auto && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => removeWarning(warning.id), "onClick"), style: styles.removeBtn, title: "Remove warning", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}) })
        ] }, warning.id)) })
      ] }, user_id);
    }) }),
    showAddWarning && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddWarningModal$1,
      {
        users,
        onAdd: addWarning,
        onClose: /* @__PURE__ */ __name(() => setShowAddWarning(false), "onClose")
      }
    )
  ] }) });
}, "UserWarningsPanel");
export {
  UserWarningsPanel as default
};
