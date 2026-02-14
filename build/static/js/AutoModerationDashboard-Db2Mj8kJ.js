var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a1 as FaShieldAlt, a as FaTimes, d as FaExclamationTriangle, ay as FaBan, z as FaClock, a9 as FaCheck, az as FaCog, an as FaPlus, O as FaChartLine } from "./icons-vendor-2VDeY8fW.js";
import { d as confirmDialog } from "./index-DGqPEDt8.js";
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
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  headerIcon: {
    fontSize: "24px",
    color: "#5865f2"
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
    padding: "8px",
    borderRadius: "4px"
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
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
    fontSize: "32px",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "4px"
  },
  statLabel: {
    fontSize: "14px",
    color: "#b9bbbe"
  },
  section: {
    padding: "20px",
    borderBottom: "1px solid #1e1f22",
    overflowY: "auto"
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px"
  },
  sectionTitle: {
    color: "#fff",
    fontSize: "18px",
    fontWeight: "600",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  addButton: {
    backgroundColor: "#5865f2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: "600"
  },
  loading: {
    textAlign: "center",
    color: "#b9bbbe",
    padding: "40px"
  },
  empty: {
    textAlign: "center",
    color: "#b9bbbe",
    padding: "40px",
    fontSize: "14px"
  },
  rulesList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  ruleCard: {
    backgroundColor: "#1e1f22",
    borderRadius: "8px",
    padding: "16px"
  },
  ruleHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px"
  },
  ruleType: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff"
  },
  ruleActions: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  switch: {
    position: "relative",
    display: "inline-block",
    width: "44px",
    height: "24px"
  },
  slider: {
    position: "absolute",
    cursor: "pointer",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#72767d",
    transition: "0.3s",
    borderRadius: "24px"
  },
  deleteBtn: {
    background: "none",
    border: "none",
    color: "#ed4245",
    cursor: "pointer",
    fontSize: "18px",
    padding: "4px"
  },
  ruleDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  ruleInfo: {
    display: "flex",
    gap: "8px",
    fontSize: "14px"
  },
  ruleLabel: {
    color: "#b9bbbe",
    fontWeight: "500"
  },
  ruleValue: {
    color: "#fff"
  },
  logsList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  logItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    backgroundColor: "#1e1f22",
    borderRadius: "6px",
    padding: "12px"
  },
  logIcon: {
    fontSize: "24px"
  },
  logContent: {
    flex: 1
  },
  logText: {
    color: "#fff",
    fontSize: "14px",
    marginBottom: "4px"
  },
  logMeta: {
    color: "#72767d",
    fontSize: "12px"
  },
  logAction: {
    marginLeft: "auto"
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
    padding: "24px",
    width: "90%",
    maxWidth: "500px"
  },
  modalTitle: {
    color: "#fff",
    fontSize: "20px",
    marginBottom: "20px"
  },
  formGroup: {
    marginBottom: "16px"
  },
  label: {
    display: "block",
    color: "#b9bbbe",
    fontSize: "14px",
    marginBottom: "8px",
    fontWeight: "500"
  },
  select: {
    width: "100%",
    backgroundColor: "#1e1f22",
    border: "1px solid #1e1f22",
    borderRadius: "6px",
    padding: "10px",
    color: "#fff",
    fontSize: "14px"
  },
  input: {
    width: "100%",
    backgroundColor: "#1e1f22",
    border: "1px solid #1e1f22",
    borderRadius: "6px",
    padding: "10px",
    color: "#fff",
    fontSize: "14px"
  },
  modalButtons: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    marginTop: "20px"
  },
  cancelBtn: {
    backgroundColor: "#4e5058",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "14px"
  },
  createBtn: {
    backgroundColor: "#5865f2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600"
  }
};
const useAutoModeration = /* @__PURE__ */ __name(({ serverId, fetchWithAuth, apiBaseUrl }) => {
  const [rules, setRules] = reactExports.useState([]);
  const [logs, setLogs] = reactExports.useState([]);
  const [stats, setStats] = reactExports.useState({
    total_violations: 0,
    auto_deleted: 0,
    warnings_issued: 0,
    users_banned: 0
  });
  const [showCreateRule, setShowCreateRule] = reactExports.useState(false);
  const [newRule, setNewRule] = reactExports.useState({
    rule_type: "toxic",
    action: "warn",
    threshold: 0.8,
    keywords: []
  });
  const [loading, setLoading] = reactExports.useState(true);
  const loadData = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const rulesRes = await fetchWithAuth(`${apiBaseUrl}/moderation/rules/${serverId}/`);
      if (rulesRes.ok) {
        const data = await rulesRes.json();
        setRules(data.rules || []);
      }
      const logsRes = await fetchWithAuth(`${apiBaseUrl}/moderation/logs/${serverId}/`);
      if (logsRes.ok) {
        const data = await logsRes.json();
        const logsData = data.logs || data;
        setLogs(logsData);
        if (logsData.length > 0) {
          setStats({
            total_violations: logsData.length,
            auto_deleted: logsData.filter((l) => l.action === "delete").length,
            warnings_issued: logsData.filter((l) => l.action === "warn").length,
            users_banned: logsData.filter((l) => l.action === "ban").length
          });
        }
      }
    } catch (error) {
      console.error("Failed to load moderation data:", error);
    }
    setLoading(false);
  }, "loadData");
  const createRule = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/moderation/rules/${serverId}/create/`, {
        method: "POST",
        body: JSON.stringify(newRule)
      });
      if (res.ok) {
        const data = await res.json();
        setRules([...rules, data]);
        setShowCreateRule(false);
        setNewRule({ rule_type: "toxic", action: "warn", threshold: 0.8, keywords: [] });
      }
    } catch (error) {
      console.error("Failed to create rule:", error);
    }
  }, "createRule");
  const toggleRule = /* @__PURE__ */ __name(async (ruleId) => {
    try {
      await fetchWithAuth(`${apiBaseUrl}/moderation/rules/${ruleId}/toggle/`, {
        method: "POST"
      });
      setRules(rules.map((r) => r.id === ruleId ? { ...r, is_enabled: !r.is_enabled } : r));
    } catch (error) {
      console.error("Failed to toggle rule:", error);
    }
  }, "toggleRule");
  const deleteRule = /* @__PURE__ */ __name(async (ruleId) => {
    if (!await confirmDialog("Bu kuralı silmek istediğine emin misin?")) return;
    try {
      await fetchWithAuth(`${apiBaseUrl}/moderation/rules/${ruleId}/`, {
        method: "DELETE"
      });
      setRules(rules.filter((r) => r.id !== ruleId));
    } catch (error) {
      console.error("Failed to delete rule:", error);
    }
  }, "deleteRule");
  return {
    rules,
    logs,
    stats,
    loading,
    showCreateRule,
    setShowCreateRule,
    newRule,
    setNewRule,
    loadData,
    createRule,
    toggleRule,
    deleteRule
  };
}, "useAutoModeration");
const getRuleIcon = /* @__PURE__ */ __name((type) => {
  switch (type) {
    case "toxic":
      return "☠️";
    case "spam":
      return "🚫";
    case "keyword":
      return "🔤";
    case "link":
      return "🔗";
    case "caps":
      return "📢";
    default:
      return "⚙️";
  }
}, "getRuleIcon");
const getRuleLabel = /* @__PURE__ */ __name((type) => {
  switch (type) {
    case "toxic":
      return "Toxic Language";
    case "spam":
      return "Spam Detection";
    case "keyword":
      return "Keyword Filter";
    case "link":
      return "Link Filter";
    case "caps":
      return "Excessive Caps";
    default:
      return type;
  }
}, "getRuleLabel");
const getActionLabel = /* @__PURE__ */ __name((action) => {
  switch (action) {
    case "warn":
      return "⚠️ Warn";
    case "delete":
      return "🗑️ Delete";
    case "timeout":
      return "⏱️ Timeout";
    case "kick":
      return "👢 Kick";
    case "ban":
      return "🔨 Ban";
    default:
      return action;
  }
}, "getActionLabel");
const getActionIcon = /* @__PURE__ */ __name((action) => {
  switch (action) {
    case "warn":
      return "⚠️";
    case "delete":
      return "🗑️";
    case "timeout":
      return "⏱️";
    case "ban":
      return "🔨";
    default:
      return "❓";
  }
}, "getActionIcon");
const getActionStyle = /* @__PURE__ */ __name((action) => ({
  padding: "4px 8px",
  borderRadius: "4px",
  fontSize: "12px",
  fontWeight: "600",
  backgroundColor: action === "ban" ? "#ed4245" : action === "timeout" ? "#f0b132" : "#5865f2",
  color: "#fff"
}), "getActionStyle");
const CreateRuleModal = /* @__PURE__ */ __name(({ newRule, setNewRule, onClose, onCreateRule }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.modalOverlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.modalTitle, children: "Create Moderation Rule" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Rule Type" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: newRule.rule_type,
          onChange: /* @__PURE__ */ __name((e) => setNewRule({ ...newRule, rule_type: e.target.value }), "onChange"),
          style: styles.select,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "toxic", children: "Toxic Language" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "spam", children: "Spam Detection" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "keyword", children: "Keyword Filter" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "link", children: "Link Filter" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "caps", children: "Excessive Caps" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Action" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: newRule.action,
          onChange: /* @__PURE__ */ __name((e) => setNewRule({ ...newRule, action: e.target.value }), "onChange"),
          style: styles.select,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "warn", children: "Warn User" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "delete", children: "Delete Message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "timeout", children: "Timeout User (5min)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "kick", children: "Kick User" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ban", children: "Ban User" })
          ]
        }
      )
    ] }),
    newRule.rule_type !== "keyword" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.label, children: [
        "AI Threshold (",
        (newRule.threshold * 100).toFixed(0),
        "%)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "range",
          min: "0.5",
          max: "1",
          step: "0.05",
          value: newRule.threshold,
          onChange: /* @__PURE__ */ __name((e) => setNewRule({ ...newRule, threshold: parseFloat(e.target.value) }), "onChange"),
          style: styles.slider
        }
      )
    ] }),
    newRule.rule_type === "keyword" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Keywords (comma separated)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "word1, word2, word3",
          onChange: /* @__PURE__ */ __name((e) => setNewRule({ ...newRule, keywords: e.target.value.split(",").map((k) => k.trim()) }), "onChange"),
          style: styles.input
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modalButtons, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.cancelBtn, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onCreateRule, style: styles.createBtn, children: "Create Rule" })
    ] })
  ] }) });
}, "CreateRuleModal");
const AutoModerationDashboard = /* @__PURE__ */ __name(({ serverId, fetchWithAuth, apiBaseUrl, onClose }) => {
  const {
    rules,
    logs,
    stats,
    showCreateRule,
    setShowCreateRule,
    newRule,
    setNewRule,
    loading,
    createRule,
    toggleRule,
    deleteRule
  } = useAutoModeration(serverId);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.panel, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, { style: styles.headerIcon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Auto-Moderation" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statsGrid, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, { style: { ...styles.statIcon, color: "#f04747" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: stats.total_violations }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Total Violations" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaBan, { style: { ...styles.statIcon, color: "#ed4245" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: stats.auto_deleted }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Auto-Deleted" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, { style: { ...styles.statIcon, color: "#f0b132" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: stats.warnings_issued }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Warnings" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { style: { ...styles.statIcon, color: "#43b581" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: rules.filter((r) => r.is_enabled).length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Active Rules" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.sectionHeader, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.sectionTitle, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCog, {}),
          " Moderation Rules"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setShowCreateRule(true), "onClick"), style: styles.addButton, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
          " Add Rule"
        ] })
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading..." }) : rules.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No moderation rules yet. Create one to get started!" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.rulesList, children: rules.map((rule) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.ruleCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.ruleHeader, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.ruleType, children: [
            getRuleIcon(rule.rule_type),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: getRuleLabel(rule.rule_type) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.ruleActions, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.switch, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: rule.is_enabled,
                  onChange: /* @__PURE__ */ __name(() => toggleRule(rule.id), "onChange")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.slider })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => deleteRule(rule.id), "onClick"), style: styles.deleteBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.ruleDetails, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.ruleInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.ruleLabel, children: "Action:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.ruleValue, children: getActionLabel(rule.action) })
          ] }),
          rule.threshold && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.ruleInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.ruleLabel, children: "Threshold:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.ruleValue, children: [
              (rule.threshold * 100).toFixed(0),
              "%"
            ] })
          ] }),
          rule.keywords && rule.keywords.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.ruleInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.ruleLabel, children: "Keywords:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.ruleValue, children: rule.keywords.join(", ") })
          ] })
        ] })
      ] }, rule.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.sectionTitle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, {}),
        " Recent Activity"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.logsList, children: logs.slice(0, 10).map((log, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.logItem, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.logIcon, children: getActionIcon(log.action) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.logContent, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.logText, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: log.user || "Unknown" }),
            " - ",
            log.violation_type
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.logMeta, children: [
            log.content?.substring(0, 50),
            "... ",
            "•",
            " ",
            new Date(log.created_at).toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.logAction, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: getActionStyle(log.action), children: log.action }) })
      ] }, idx)) })
    ] }),
    showCreateRule && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateRuleModal,
      {
        newRule,
        setNewRule,
        onClose: /* @__PURE__ */ __name(() => setShowCreateRule(false), "onClose"),
        onCreateRule: createRule
      }
    )
  ] }) });
}, "AutoModerationDashboard");
export {
  AutoModerationDashboard as default
};
