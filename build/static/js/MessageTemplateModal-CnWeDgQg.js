var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { aJ as FaStickyNote, a as FaTimes, a9 as FaCheck, an as FaPlus, g as FaTrash } from "./icons-vendor-2VDeY8fW.js";
import { d as confirmDialog } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const MessageTemplateModal = /* @__PURE__ */ __name(({ onClose, onSelect, fetchWithAuth, apiBaseUrl, isAdmin }) => {
  const [templates, setTemplates] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [creating, setCreating] = reactExports.useState(false);
  const [newTemplate, setNewTemplate] = reactExports.useState({ name: "", content: "", is_global: false });
  reactExports.useEffect(() => {
    loadTemplates();
  }, []);
  const loadTemplates = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/templates/`);
      if (res.ok) {
        const data = await res.json();
        setTemplates(data || []);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, "loadTemplates");
  const handleCreate = /* @__PURE__ */ __name(async () => {
    if (!newTemplate.name || !newTemplate.content) return;
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/templates/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTemplate)
      });
      if (res.ok) {
        setNewTemplate({ name: "", content: "", is_global: false });
        setCreating(false);
        loadTemplates();
      }
    } catch (e) {
      console.error(e);
    }
  }, "handleCreate");
  const handleDelete = /* @__PURE__ */ __name(async (id, e) => {
    e.stopPropagation();
    if (!await confirmDialog("Bu şablonu silmek istediğine emin misin?")) return;
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/templates/${id}/`, { method: "DELETE" });
      if (res.ok) {
        setTemplates((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (e2) {
      console.error(e2);
    }
  }, "handleDelete");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: overlayStyle, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: modalStyle, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: headerStyle, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { margin: 0, display: "flex", alignItems: "center", gap: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaStickyNote, {}),
        " Hazır Şablonlar"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: closeButtonStyle, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: contentStyle, children: creating ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: formStyle, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          placeholder: "Şablon Adı",
          value: newTemplate.name,
          onChange: /* @__PURE__ */ __name((e) => setNewTemplate({ ...newTemplate, name: e.target.value }), "onChange"),
          style: inputStyle
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          placeholder: "Şablon İçeriği...",
          value: newTemplate.content,
          onChange: /* @__PURE__ */ __name((e) => setNewTemplate({ ...newTemplate, content: e.target.value }), "onChange"),
          style: textareaStyle
        }
      ),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "5px", fontSize: "12px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            checked: newTemplate.is_global,
            onChange: /* @__PURE__ */ __name((e) => setNewTemplate({ ...newTemplate, is_global: e.target.checked }), "onChange")
          }
        ),
        "Herkese Açık (Global)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "10px", marginTop: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleCreate, style: saveButtonStyle, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, {}),
          " Kaydet"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setCreating(false), "onClick"), style: cancelButtonStyle, children: "İptal" })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setCreating(true), "onClick"), style: addButtonStyle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
        " Yeni Şablon Oluştur"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: listStyle, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Yükleniyor..." }) : templates.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { opacity: 0.5 }, children: "Henüz şablon yok." }) : templates.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: itemStyle, onClick: /* @__PURE__ */ __name(() => onSelect(t.content), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: "bold" }, children: t.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "12px", opacity: 0.7, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }, children: t.content })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "10px" }, children: [
          t.is_global && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: badgeStyle, children: "Global" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name((e) => handleDelete(t.id, e), "onClick"), style: deleteButtonStyle, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}) })
        ] })
      ] }, t.id)) })
    ] }) })
  ] }) });
}, "MessageTemplateModal");
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1e3,
  backdropFilter: "blur(5px)"
};
const modalStyle = {
  backgroundColor: "#313338",
  width: "400px",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
  color: "white",
  display: "flex",
  flexDirection: "column",
  maxHeight: "80vh"
};
const headerStyle = {
  padding: "16px",
  backgroundColor: "#2B2D31",
  borderBottom: "1px solid #1F2023",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};
const closeButtonStyle = { background: "none", border: "none", color: "#B5BAC1", cursor: "pointer", fontSize: "16px" };
const contentStyle = { padding: "16px", overflowY: "auto" };
const addButtonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#5865F2",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "5px",
  marginBottom: "15px"
};
const listStyle = { display: "flex", flexDirection: "column", gap: "8px" };
const itemStyle = {
  backgroundColor: "#2B2D31",
  padding: "10px",
  borderRadius: "4px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  transition: "0.2s"
};
const badgeStyle = { fontSize: "10px", backgroundColor: "#FAA61A", color: "black", padding: "2px 6px", borderRadius: "10px", fontWeight: "bold" };
const deleteButtonStyle = { background: "none", border: "none", color: "#DA373C", cursor: "pointer" };
const formStyle = { display: "flex", flexDirection: "column", gap: "10px" };
const inputStyle = { padding: "8px", borderRadius: "4px", border: "none", backgroundColor: "#1E1F22", color: "white" };
const textareaStyle = { padding: "8px", borderRadius: "4px", border: "none", backgroundColor: "#1E1F22", color: "white", minHeight: "100px", resize: "vertical" };
const saveButtonStyle = { flex: 1, padding: "8px", backgroundColor: "#23A559", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" };
const cancelButtonStyle = { flex: 1, padding: "8px", backgroundColor: "#DA373C", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" };
export {
  MessageTemplateModal as default
};
