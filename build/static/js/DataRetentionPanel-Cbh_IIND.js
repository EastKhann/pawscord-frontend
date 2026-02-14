var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { z as FaClock, a as FaTimes, aY as FaSave, g as FaTrash } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const DataRetentionPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
  const [policies, setPolicies] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [newPolicy, setNewPolicy] = reactExports.useState({
    content_type: "messages",
    retention_days: 30,
    enabled: true
  });
  const contentTypes = [
    { value: "messages", label: "Messages" },
    { value: "media", label: "Media Files" },
    { value: "voice_recordings", label: "Voice Recordings" },
    { value: "audit_logs", label: "Audit Logs" },
    { value: "deleted_messages", label: "Deleted Messages" }
  ];
  const retentionPresets = [
    { days: 7, label: "7 Days" },
    { days: 30, label: "30 Days" },
    { days: 90, label: "90 Days" },
    { days: 180, label: "6 Months" },
    { days: 365, label: "1 Year" },
    { days: 730, label: "2 Years" },
    { days: -1, label: "Forever" }
  ];
  reactExports.useEffect(() => {
    fetchPolicies();
  }, []);
  const fetchPolicies = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/retention/`);
      const data = await response.json();
      setPolicies(data.policies || []);
    } catch (error) {
      toast.error("Failed to load retention policies");
    } finally {
      setLoading(false);
    }
  }, "fetchPolicies");
  const savePolicy = /* @__PURE__ */ __name(async () => {
    try {
      await fetchWithAuth(`${apiBaseUrl}/retention/policies/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newPolicy, server_id: serverId })
      });
      toast.success("Retention policy created");
      setNewPolicy({ content_type: "messages", retention_days: 30, enabled: true });
      fetchPolicies();
    } catch (error) {
      toast.error("Failed to create policy");
    }
  }, "savePolicy");
  const togglePolicy = /* @__PURE__ */ __name(async (policyId, enabled) => {
    try {
      await fetchWithAuth(`${apiBaseUrl}/retention/policies/${policyId}/toggle/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled })
      });
      toast.success(enabled ? "Policy enabled" : "Policy disabled");
      fetchPolicies();
    } catch (error) {
      toast.error("Failed to toggle policy");
    }
  }, "togglePolicy");
  const deletePolicy = /* @__PURE__ */ __name(async (policyId) => {
    if (!confirm("Delete this retention policy?")) return;
    try {
      await fetchWithAuth(`${apiBaseUrl}/retention/policies/${policyId}/delete/`, {
        method: "DELETE"
      });
      toast.success("Policy deleted");
      fetchPolicies();
    } catch (error) {
      toast.error("Failed to delete policy");
    }
  }, "deletePolicy");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Data Retention Policies" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "Create New Policy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.form, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formRow, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Content Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                value: newPolicy.content_type,
                onChange: /* @__PURE__ */ __name((e) => setNewPolicy({ ...newPolicy, content_type: e.target.value }), "onChange"),
                style: styles.select,
                children: contentTypes.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: type.value, children: type.label }, type.value))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formRow, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Retention Period" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.presetButtons, children: retentionPresets.map((preset) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: /* @__PURE__ */ __name(() => setNewPolicy({ ...newPolicy, retention_days: preset.days }), "onClick"),
                style: {
                  ...styles.presetButton,
                  ...newPolicy.retention_days === preset.days && styles.presetButtonActive
                },
                children: preset.label
              },
              preset.days
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: savePolicy, style: styles.saveButton, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaSave, { style: { marginRight: "8px" } }),
            "Create Policy"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.sectionTitle, children: [
          "Active Policies (",
          policies.length,
          ")"
        ] }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading..." }) : policies.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No retention policies configured" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.policiesList, children: policies.map((policy, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.policyCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.policyInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.policyType, children: contentTypes.find((t) => t.value === policy.content_type)?.label || policy.content_type }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.policyRetention, children: policy.retention_days === -1 ? "Forever" : `${policy.retention_days} days` }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.policyMeta, children: [
              "Last run: ",
              policy.last_run ? new Date(policy.last_run).toLocaleString() : "Never"
            ] }),
            policy.items_deleted > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.policyMeta, children: [
              "Items deleted: ",
              policy.items_deleted.toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.policyActions, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.toggleSwitch, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: policy.enabled,
                  onChange: /* @__PURE__ */ __name((e) => togglePolicy(policy.id, e.target.checked), "onChange")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.toggleSlider })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: /* @__PURE__ */ __name(() => deletePolicy(policy.id), "onClick"),
                style: styles.deleteButton,
                title: "Delete Policy",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {})
              }
            )
          ] })
        ] }, idx)) })
      ] })
    ] })
  ] }) });
}, "DataRetentionPanel");
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
  content: {
    padding: "20px",
    overflowY: "auto",
    flex: 1
  },
  section: {
    marginBottom: "30px"
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "16px"
  },
  form: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "20px"
  },
  formRow: {
    marginBottom: "20px"
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#dcddde",
    marginBottom: "8px"
  },
  select: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#1e1e1e",
    border: "1px solid #2c2f33",
    borderRadius: "4px",
    color: "#ffffff",
    fontSize: "14px"
  },
  presetButtons: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
    gap: "8px"
  },
  presetButton: {
    padding: "8px 12px",
    backgroundColor: "#1e1e1e",
    border: "1px solid #2c2f33",
    borderRadius: "4px",
    color: "#dcddde",
    cursor: "pointer",
    fontSize: "13px"
  },
  presetButtonActive: {
    backgroundColor: "#5865f2",
    borderColor: "#5865f2",
    color: "#ffffff"
  },
  saveButton: {
    padding: "10px 20px",
    backgroundColor: "#43b581",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
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
  policiesList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  policyCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  policyInfo: {
    flex: 1
  },
  policyType: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "4px"
  },
  policyRetention: {
    fontSize: "14px",
    color: "#5865f2",
    marginBottom: "8px"
  },
  policyMeta: {
    fontSize: "12px",
    color: "#99aab5",
    marginTop: "4px"
  },
  policyActions: {
    display: "flex",
    gap: "12px",
    alignItems: "center"
  },
  toggleSwitch: {
    position: "relative",
    display: "inline-block",
    width: "44px",
    height: "24px"
  },
  toggleSlider: {
    position: "absolute",
    cursor: "pointer",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#2c2f33",
    transition: "0.3s",
    borderRadius: "24px"
  },
  deleteButton: {
    background: "none",
    border: "none",
    color: "#f04747",
    cursor: "pointer",
    fontSize: "16px",
    padding: "8px"
  }
};
export {
  DataRetentionPanel as default
};
