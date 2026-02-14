var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { B as FaRobot, a as FaTimes, an as FaPlus, bo as FaToggleOn, bp as FaToggleOff, g as FaTrash } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const MATCH_TYPES = [
  { value: "exact", label: "Exact Match" },
  { value: "contains", label: "Contains" },
  { value: "starts_with", label: "Starts With" },
  { value: "ends_with", label: "Ends With" },
  { value: "regex", label: "Regex" }
];
const DEFAULT_RESPONDER = { trigger: "", response: "", match_type: "contains", case_sensitive: false, enabled: true };
const useAutoResponders = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, serverId }) => {
  const [responders, setResponders] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [showCreate, setShowCreate] = reactExports.useState(false);
  const [newResponder, setNewResponder] = reactExports.useState(DEFAULT_RESPONDER);
  const fetchResponders = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/autoresponders/list/?server_id=${serverId}`);
      const d = await res.json();
      setResponders(d.responders || []);
    } catch (e) {
      toast.error("Failed to load auto-responders");
    } finally {
      setLoading(false);
    }
  }, "fetchResponders");
  reactExports.useEffect(() => {
    fetchResponders();
  }, []);
  const createResponder = /* @__PURE__ */ __name(async () => {
    if (!newResponder.trigger.trim() || !newResponder.response.trim()) {
      toast.error("Please enter trigger and response");
      return;
    }
    try {
      await fetchWithAuth(`${apiBaseUrl}/autoresponders/create/`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...newResponder, server_id: serverId }) });
      toast.success("Auto-responder created");
      setNewResponder(DEFAULT_RESPONDER);
      setShowCreate(false);
      fetchResponders();
    } catch (e) {
      toast.error("Failed to create auto-responder");
    }
  }, "createResponder");
  const toggleResponder = /* @__PURE__ */ __name(async (id, enabled) => {
    try {
      await fetchWithAuth(`${apiBaseUrl}/autoresponders/${id}/toggle/`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ enabled }) });
      toast.success(enabled ? "Enabled" : "Disabled");
      fetchResponders();
    } catch (e) {
      toast.error("Failed to toggle");
    }
  }, "toggleResponder");
  const deleteResponder = /* @__PURE__ */ __name(async (id) => {
    if (!confirm("Delete this auto-responder?")) return;
    try {
      await fetchWithAuth(`${apiBaseUrl}/autoresponders/${id}/delete/`, { method: "DELETE" });
      toast.success("Auto-responder deleted");
      fetchResponders();
    } catch (e) {
      toast.error("Failed to delete");
    }
  }, "deleteResponder");
  return { responders, loading, showCreate, setShowCreate, newResponder, setNewResponder, createResponder, toggleResponder, deleteResponder };
}, "useAutoResponders");
const styles = {
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999999 },
  modal: { backgroundColor: "#1e1e1e", borderRadius: "8px", width: "90%", maxWidth: "800px", maxHeight: "90vh", display: "flex", flexDirection: "column", boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", borderBottom: "1px solid #2c2f33" },
  headerLeft: { display: "flex", alignItems: "center" },
  title: { margin: 0, fontSize: "20px", color: "#ffffff" },
  closeButton: { background: "none", border: "none", color: "#99aab5", cursor: "pointer", fontSize: "20px", padding: "5px" },
  toolbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 20px", borderBottom: "1px solid #2c2f33" },
  count: { fontSize: "14px", color: "#dcddde" },
  createButton: { padding: "8px 16px", backgroundColor: "#5865f2", border: "none", borderRadius: "4px", color: "#ffffff", cursor: "pointer", fontSize: "13px", display: "flex", alignItems: "center" },
  createForm: { padding: "20px", backgroundColor: "#2c2f33", borderBottom: "1px solid #2c2f33" },
  formRow: { marginBottom: "16px" },
  label: { display: "block", fontSize: "14px", fontWeight: "600", color: "#dcddde", marginBottom: "6px" },
  input: { width: "100%", padding: "10px", backgroundColor: "#1e1e1e", border: "1px solid #2c2f33", borderRadius: "4px", color: "#ffffff", fontSize: "14px" },
  textarea: { width: "100%", padding: "10px", backgroundColor: "#1e1e1e", border: "1px solid #2c2f33", borderRadius: "4px", color: "#ffffff", fontSize: "14px", fontFamily: "inherit", resize: "vertical" },
  select: { width: "100%", padding: "10px", backgroundColor: "#1e1e1e", border: "1px solid #2c2f33", borderRadius: "4px", color: "#ffffff", fontSize: "14px" },
  checkbox: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", cursor: "pointer" },
  checkboxLabel: { fontSize: "14px", color: "#dcddde" },
  submitButton: { width: "100%", padding: "12px", backgroundColor: "#43b581", border: "none", borderRadius: "4px", color: "#ffffff", cursor: "pointer", fontSize: "14px", fontWeight: "600" },
  content: { padding: "20px", overflowY: "auto", flex: 1 },
  loading: { textAlign: "center", color: "#99aab5", padding: "40px" },
  empty: { textAlign: "center", color: "#99aab5", padding: "40px" },
  respondersList: { display: "flex", flexDirection: "column", gap: "12px" },
  responderCard: { backgroundColor: "#2c2f33", borderRadius: "8px", padding: "16px", display: "flex", justifyContent: "space-between" },
  responderInfo: { flex: 1 },
  trigger: { fontSize: "14px", color: "#99aab5", marginBottom: "8px" },
  triggerValue: { color: "#5865f2", fontWeight: "600", fontFamily: "monospace" },
  response: { fontSize: "14px", color: "#ffffff", marginBottom: "8px" },
  meta: { fontSize: "12px", color: "#99aab5" },
  actions: { display: "flex", gap: "12px", alignItems: "center" },
  toggleButton: { background: "none", border: "none", cursor: "pointer", padding: "4px" },
  deleteButton: { background: "none", border: "none", color: "#f04747", cursor: "pointer", fontSize: "16px", padding: "8px" }
};
const AutoRespondersPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
  const { responders, loading, showCreate, setShowCreate, newResponder, setNewResponder, createResponder, toggleResponder, deleteResponder } = useAutoResponders({ fetchWithAuth, apiBaseUrl, serverId });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Auto-Responders" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.toolbar, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.count, children: [
        responders.length,
        " auto-responders"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setShowCreate(!showCreate), "onClick"), style: styles.createButton, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, { style: { marginRight: "6px" } }),
        "Create New"
      ] })
    ] }),
    showCreate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.createForm, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Trigger" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: newResponder.trigger, onChange: /* @__PURE__ */ __name((e) => setNewResponder({ ...newResponder, trigger: e.target.value }), "onChange"), placeholder: "hello", style: styles.input })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Response" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: newResponder.response, onChange: /* @__PURE__ */ __name((e) => setNewResponder({ ...newResponder, response: e.target.value }), "onChange"), placeholder: "Hi there! How can I help you?", style: styles.textarea, rows: 3 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Match Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: newResponder.match_type, onChange: /* @__PURE__ */ __name((e) => setNewResponder({ ...newResponder, match_type: e.target.value }), "onChange"), style: styles.select, children: MATCH_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t.value, children: t.label }, t.value)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.checkbox, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: newResponder.case_sensitive, onChange: /* @__PURE__ */ __name((e) => setNewResponder({ ...newResponder, case_sensitive: e.target.checked }), "onChange") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.checkboxLabel, children: "Case sensitive" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: createResponder, style: styles.submitButton, children: "Create Auto-Responder" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading..." }) : responders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No auto-responders configured" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.respondersList, children: responders.map((resp, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.responderCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.responderInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.trigger, children: [
          "Trigger: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.triggerValue, children: resp.trigger })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.response, children: resp.response }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.meta, children: [
          MATCH_TYPES.find((t) => t.value === resp.match_type)?.label,
          resp.case_sensitive && " • Case Sensitive",
          " • Uses: " + (resp.usage_count || 0)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.actions, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => toggleResponder(resp.id, !resp.enabled), "onClick"), style: styles.toggleButton, title: resp.enabled ? "Disable" : "Enable", children: resp.enabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaToggleOn, { style: { color: "#43b581", fontSize: "24px" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaToggleOff, { style: { color: "#99aab5", fontSize: "24px" } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => deleteResponder(resp.id), "onClick"), style: styles.deleteButton, title: "Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}) })
      ] })
    ] }, idx)) }) })
  ] }) });
}, "AutoRespondersPanel");
export {
  AutoRespondersPanel as default
};
