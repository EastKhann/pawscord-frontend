var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { av as FaFileAlt, a as FaTimes, an as FaPlus, aV as FaCopy, g as FaTrash } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const MessageTemplatesPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onSelectTemplate, onClose }) => {
  const [templates, setTemplates] = reactExports.useState([]);
  const [newTemplate, setNewTemplate] = reactExports.useState({ name: "", content: "" });
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    loadTemplates();
  }, []);
  const loadTemplates = /* @__PURE__ */ __name(async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(`${apiBaseUrl}/templates/`);
      if (response.ok) {
        const data = await response.json();
        setTemplates(data);
      }
    } catch (error) {
      console.error("Şablon yükleme hatası:", error);
    } finally {
      setLoading(false);
    }
  }, "loadTemplates");
  const createTemplate = /* @__PURE__ */ __name(async () => {
    if (!newTemplate.name.trim() || !newTemplate.content.trim()) {
      toast.error("İsim ve içerik gerekli");
      return;
    }
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/templates/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTemplate)
      });
      if (response.ok) {
        toast.success("Şablon oluşturuldu");
        setNewTemplate({ name: "", content: "" });
        loadTemplates();
      } else {
        toast.error("Şablon oluşturulamadı");
      }
    } catch (error) {
      console.error("Şablon oluşturma hatası:", error);
      toast.error("Bir hata oluştu");
    }
  }, "createTemplate");
  const deleteTemplate = /* @__PURE__ */ __name(async (templateId) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/templates/${templateId}/`, {
        method: "DELETE"
      });
      if (response.ok) {
        toast.success("Şablon silindi");
        loadTemplates();
      } else {
        toast.error("Şablon silinemedi");
      }
    } catch (error) {
      console.error("Şablon silme hatası:", error);
      toast.error("Bir hata oluştu");
    }
  }, "deleteTemplate");
  const useTemplate = /* @__PURE__ */ __name((template) => {
    if (onSelectTemplate) {
      onSelectTemplate(template.content);
      toast.success(`"${template.name}" şablonu kullanıldı`);
      onClose();
    }
  }, "useTemplate");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaFileAlt, { style: { color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0 }, children: "Mesaj Şablonları" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { onClick: onClose, style: styles.closeBtn })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.createSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: newTemplate.name,
          onChange: /* @__PURE__ */ __name((e) => setNewTemplate({ ...newTemplate, name: e.target.value }), "onChange"),
          placeholder: "Şablon adı (örn: Toplantı Daveti)",
          style: styles.input
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: newTemplate.content,
          onChange: /* @__PURE__ */ __name((e) => setNewTemplate({ ...newTemplate, content: e.target.value }), "onChange"),
          placeholder: "Şablon içeriği...",
          style: styles.textarea,
          rows: 3
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: createTemplate, style: styles.createBtn, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
        " Şablon Oluştur"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Yükleniyor..." }) : templates.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.empty, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaFileAlt, { style: { fontSize: "48px", color: "#555", marginBottom: "10px" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz şablon yok" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "12px", color: "#888" }, children: "Sık kullandığınız mesajları şablon olarak kaydedin" })
    ] }) : templates.map((template) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.templateCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.templateIcon, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaFileAlt, { style: { color: "#5865f2" } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.templateContent, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.templateName, children: template.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.templatePreview, children: [
          template.content.substring(0, 100),
          template.content.length > 100 && "..."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.templateMeta, children: [
          template.use_count || 0,
          " kez kullanıldı"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.templateActions, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => useTemplate(template), "onClick"),
            style: styles.useBtn,
            title: "Şablonu kullan",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaCopy, {}),
              " Kullan"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => deleteTemplate(template.id), "onClick"),
            style: styles.deleteBtn,
            title: "Şablonu sil",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {})
          }
        )
      ] })
    ] }, template.id)) })
  ] }) });
}, "MessageTemplatesPanel");
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
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
    color: "#fff"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #333"
  },
  closeBtn: {
    cursor: "pointer",
    fontSize: "24px",
    color: "#888"
  },
  createSection: {
    padding: "20px",
    borderBottom: "1px solid #333"
  },
  input: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#2c2f33",
    border: "1px solid #444",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px",
    marginBottom: "10px"
  },
  textarea: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2c2f33",
    border: "1px solid #444",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px",
    resize: "vertical",
    marginBottom: "10px"
  },
  createBtn: {
    width: "100%",
    backgroundColor: "#5865f2",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  },
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "20px"
  },
  templateCard: {
    display: "flex",
    gap: "15px",
    padding: "15px",
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    marginBottom: "10px"
  },
  templateIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#5865f21a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    flexShrink: 0
  },
  templateContent: {
    flex: 1
  },
  templateName: {
    fontWeight: "600",
    fontSize: "16px",
    marginBottom: "6px",
    color: "#dcddde"
  },
  templatePreview: {
    fontSize: "13px",
    color: "#888",
    lineHeight: "1.4",
    marginBottom: "6px"
  },
  templateMeta: {
    fontSize: "12px",
    color: "#666"
  },
  templateActions: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  useBtn: {
    backgroundColor: "#43b581",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    whiteSpace: "nowrap"
  },
  deleteBtn: {
    backgroundColor: "#f04747",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px"
  },
  loading: {
    textAlign: "center",
    padding: "40px",
    color: "#888"
  },
  empty: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#888"
  }
};
export {
  MessageTemplatesPanel as default
};
