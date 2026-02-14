var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { Q as FaStar, a9 as FaCheck, u as FaUsers, ao as FaRocket, q as FaCode, aK as FaMusic, cH as FaGraduationCap, a8 as FaGamepad } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const ServerTemplates = /* @__PURE__ */ __name(({ onSelectTemplate, onClose }) => {
  const [templates, setTemplates] = reactExports.useState([]);
  const [categories, setCategories] = reactExports.useState([]);
  const [selectedCategory, setSelectedCategory] = reactExports.useState("all");
  const [loading, setLoading] = reactExports.useState(true);
  const [previewTemplate, setPreviewTemplate] = reactExports.useState(null);
  reactExports.useEffect(() => {
    fetchTemplates();
    fetchCategories();
  }, []);
  const fetchTemplates = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/templates/list/", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setTemplates(data.templates || []);
      }
    } catch (error) {
      toast.error("❌ Şablonlar yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, "fetchTemplates");
  const fetchCategories = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch("/api/templates/categories/", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }, "fetchCategories");
  const getTemplateDetails = /* @__PURE__ */ __name(async (templateId) => {
    try {
      const response = await fetch(`/api/templates/${templateId}/`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPreviewTemplate(data.template);
      }
    } catch (error) {
      toast.error("❌ Şablon detayları yüklenemedi");
    }
  }, "getTemplateDetails");
  const useTemplate = /* @__PURE__ */ __name(async (templateId) => {
    try {
      const response = await fetch(`/api/templates/${templateId}/use/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        toast.success("✅ Sunucu oluşturuldu!");
        if (onSelectTemplate) {
          onSelectTemplate(data.server);
        }
        onClose();
      } else {
        toast.error("❌ Sunucu oluşturulamadı");
      }
    } catch (error) {
      toast.error("❌ Bağlantı hatası");
    }
  }, "useTemplate");
  const getCategoryIcon = /* @__PURE__ */ __name((category) => {
    const icons = {
      gaming: /* @__PURE__ */ jsxRuntimeExports.jsx(FaGamepad, {}),
      education: /* @__PURE__ */ jsxRuntimeExports.jsx(FaGraduationCap, {}),
      community: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, {}),
      music: /* @__PURE__ */ jsxRuntimeExports.jsx(FaMusic, {}),
      tech: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCode, {}),
      other: /* @__PURE__ */ jsxRuntimeExports.jsx(FaRocket, {})
    };
    return icons[category] || /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, {});
  }, "getCategoryIcon");
  const filteredTemplates = selectedCategory === "all" ? templates : templates.filter((t) => t.category === selectedCategory);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "templates-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "templates-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "templates-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Sunucu Şablonları" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "category-filters", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `category-btn ${selectedCategory === "all" ? "active" : ""}`,
          onClick: /* @__PURE__ */ __name(() => setSelectedCategory("all"), "onClick"),
          children: "Tümü"
        }
      ),
      categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `category-btn ${selectedCategory === cat.slug ? "active" : ""}`,
          onClick: /* @__PURE__ */ __name(() => setSelectedCategory(cat.slug), "onClick"),
          children: [
            getCategoryIcon(cat.slug),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cat.name })
          ]
        },
        cat.id
      ))
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Yükleniyor..." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "templates-grid", children: filteredTemplates.map((template) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "template-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "template-icon", children: getCategoryIcon(template.category) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "template-info", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: template.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: template.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "template-stats", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stat", children: [
            "📝 ",
            template.channels_count || 0,
            " kanal"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stat", children: [
            "👥 ",
            template.roles_count || 0,
            " rol"
          ] }),
          template.is_featured && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "featured-badge", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaStar, {}),
            " Öne Çıkan"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "template-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "btn-preview",
            onClick: /* @__PURE__ */ __name(() => getTemplateDetails(template.id), "onClick"),
            children: "Önizle"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: "btn-use",
            onClick: /* @__PURE__ */ __name(() => useTemplate(template.id), "onClick"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, {}),
              " Kullan"
            ]
          }
        )
      ] })
    ] }, template.id)) }),
    previewTemplate && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "preview-modal", onClick: /* @__PURE__ */ __name(() => setPreviewTemplate(null), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "preview-content", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "preview-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: previewTemplate.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setPreviewTemplate(null), "onClick"), children: "×" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "preview-body", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: previewTemplate.description }),
        previewTemplate.channels && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "preview-section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { children: [
            "Kanallar (",
            previewTemplate.channels.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "channel-list", children: previewTemplate.channels.map((ch, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "channel-item", children: [
            ch.type === "text" ? "💬" : "🔊",
            " ",
            ch.name
          ] }, i)) })
        ] }),
        previewTemplate.roles && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "preview-section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { children: [
            "Roller (",
            previewTemplate.roles.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "role-list", children: previewTemplate.roles.map((role, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "role-item",
              style: { borderLeftColor: role.color },
              children: role.name
            },
            i
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "preview-actions", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: "btn-use-large",
          onClick: /* @__PURE__ */ __name(() => {
            useTemplate(previewTemplate.id);
            setPreviewTemplate(null);
          }, "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, {}),
            " Bu Şablonu Kullan"
          ]
        }
      ) })
    ] }) })
  ] }) });
}, "ServerTemplates");
export {
  ServerTemplates as default
};
