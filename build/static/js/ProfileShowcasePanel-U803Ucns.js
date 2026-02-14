var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { Q as FaStar, a as FaTimes, a0 as FaEye, an as FaPlus, aa as FaArrowUp, ab as FaArrowDown, X as FaExternalLinkAlt, at as FaEdit, g as FaTrash, aY as FaSave, a8 as FaGamepad, P as FaTrophy, ap as FaPalette, aK as FaMusic, bb as FaVideo, q as FaCode, j as FaLink } from "./icons-vendor-2VDeY8fW.js";
import { y } from "./ui-vendor-iPoN0WGz.js";
import { d as confirmDialog } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
const ProfileShowcasePanel = /* @__PURE__ */ __name(({ userId, onClose, onUpdate, fetchWithAuth, apiBaseUrl }) => {
  const [showcases, setShowcases] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [showAddModal, setShowAddModal] = reactExports.useState(false);
  const [editingItem, setEditingItem] = reactExports.useState(null);
  const [formData, setFormData] = reactExports.useState({
    type: "game",
    title: "",
    description: "",
    image_url: "",
    link_url: ""
  });
  const [dragging, setDragging] = reactExports.useState(null);
  const showcaseTypes = [
    { key: "game", label: "Oyun", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaGamepad, {}), color: "#9c27b0" },
    { key: "achievement", label: "Başarı", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrophy, {}), color: "#ffc107" },
    { key: "art", label: "Sanat", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaPalette, {}), color: "#e91e63" },
    { key: "music", label: "Müzik", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaMusic, {}), color: "#00bcd4" },
    { key: "video", label: "Video", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaVideo, {}), color: "#f44336" },
    { key: "code", label: "Proje", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCode, {}), color: "#4caf50" },
    { key: "link", label: "Link", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaLink, {}), color: "#2196f3" }
  ];
  reactExports.useEffect(() => {
    fetchShowcases();
  }, [userId]);
  const fetchShowcases = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/users/${userId}/showcase/`);
      if (response.ok) {
        const data = await response.json();
        setShowcases(data.items || []);
      } else {
        setShowcases([]);
      }
    } catch (error) {
      console.error("Error fetching showcases:", error);
      setShowcases([]);
    }
    setLoading(false);
  }, "fetchShowcases");
  const handleAdd = /* @__PURE__ */ __name(async () => {
    if (!formData.title.trim()) {
      y.error("Başlık gerekli");
      return;
    }
    const newItem = {
      id: Date.now(),
      ...formData,
      order: showcases.length
    };
    try {
      await fetchWithAuth(`${apiBaseUrl}/users/${userId}/showcase/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newItem)
      });
    } catch (error) {
      console.error("Add showcase error:", error);
    }
    setShowcases([...showcases, newItem]);
    resetForm();
    y.success("Vitrin öğesi eklendi");
  }, "handleAdd");
  const handleEdit = /* @__PURE__ */ __name(async () => {
    if (!formData.title.trim() || !editingItem) return;
    try {
      await fetch(`/api/users/${userId}/showcase/${editingItem.id}/`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
    } catch (error) {
      console.error("Edit showcase error:", error);
    }
    setShowcases(showcases.map(
      (item) => item.id === editingItem.id ? { ...item, ...formData } : item
    ));
    resetForm();
    y.success("Vitrin öğesi güncellendi");
  }, "handleEdit");
  const handleDelete = /* @__PURE__ */ __name(async (id) => {
    if (!await confirmDialog("Bu öğeyi silmek istediğinizden emin misiniz?")) return;
    try {
      await fetch(`/api/users/${userId}/showcase/${id}/`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
    } catch (error) {
      console.error("Delete showcase error:", error);
    }
    setShowcases(showcases.filter((item) => item.id !== id));
    y.success("Vitrin öğesi silindi");
  }, "handleDelete");
  const handleReorder = /* @__PURE__ */ __name(async (id, direction) => {
    const index = showcases.findIndex((s) => s.id === id);
    if (direction === "up" && index === 0 || direction === "down" && index === showcases.length - 1) return;
    const newShowcases = [...showcases];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    [newShowcases[index], newShowcases[swapIndex]] = [newShowcases[swapIndex], newShowcases[index]];
    newShowcases.forEach((item, i) => item.order = i);
    setShowcases(newShowcases);
    try {
      await fetch(`/api/users/${userId}/showcase/reorder/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ order: newShowcases.map((s) => s.id) })
      });
    } catch (error) {
      console.error("Reorder showcase error:", error);
    }
  }, "handleReorder");
  const resetForm = /* @__PURE__ */ __name(() => {
    setFormData({ type: "game", title: "", description: "", image_url: "", link_url: "" });
    setShowAddModal(false);
    setEditingItem(null);
  }, "resetForm");
  const openEditModal = /* @__PURE__ */ __name((item) => {
    setEditingItem(item);
    setFormData({
      type: item.type,
      title: item.title,
      description: item.description || "",
      image_url: item.image_url || "",
      link_url: item.link_url || ""
    });
    setShowAddModal(true);
  }, "openEditModal");
  const getTypeInfo = /* @__PURE__ */ __name((type) => {
    return showcaseTypes.find((t) => t.key === type) || showcaseTypes[0];
  }, "getTypeInfo");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "showcase-overlay", onClick: /* @__PURE__ */ __name((e) => e.target.className === "showcase-overlay" && onClose(), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "showcase-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaStar, {}),
        " Profil Vitrini"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-info", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaEye, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Profilinizde gösterilecek en fazla 6 öğe seçebilirsiniz" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "showcase-list", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading", children: "Yükleniyor..." }) : showcases.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaStar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz vitrin öğesi yok" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setShowAddModal(true), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
        " İlk Öğeyi Ekle"
      ] })
    ] }) : showcases.map((item, index) => {
      const typeInfo = getTypeInfo(item.type);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "showcase-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "item-drag", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: /* @__PURE__ */ __name(() => handleReorder(item.id, "up"), "onClick"),
              disabled: index === 0,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaArrowUp, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: /* @__PURE__ */ __name(() => handleReorder(item.id, "down"), "onClick"),
              disabled: index === showcases.length - 1,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaArrowDown, {})
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item-icon", style: { background: typeInfo.color }, children: typeInfo.icon }),
        item.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item-image", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image_url, alt: item.title }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "item-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "item-type", children: typeInfo.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: item.title }),
          item.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: item.description }),
          item.link_url && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: item.link_url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaExternalLinkAlt, {}),
            " Linke Git"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "item-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => openEditModal(item), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaEdit, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => handleDelete(item.id), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}) })
        ] })
      ] }, item.id);
    }) }),
    showcases.length < 6 && showcases.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "add-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "add-btn", onClick: /* @__PURE__ */ __name(() => setShowAddModal(true), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
        " Yeni Öğe Ekle"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "remaining", children: [
        6 - showcases.length,
        " slot kaldı"
      ] })
    ] }),
    showAddModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-overlay", onClick: /* @__PURE__ */ __name(() => resetForm(), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-content", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: editingItem ? "Öğeyi Düzenle" : "Yeni Vitrin Öğesi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Tür" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "type-selector", children: showcaseTypes.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: `type-btn ${formData.type === type.key ? "selected" : ""}`,
            style: { "--color": type.color },
            onClick: /* @__PURE__ */ __name(() => setFormData({ ...formData, type: type.key }), "onClick"),
            children: [
              type.icon,
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: type.label })
            ]
          },
          type.key
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Başlık *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Örn: Valorant",
            value: formData.title,
            onChange: /* @__PURE__ */ __name((e) => setFormData({ ...formData, title: e.target.value }), "onChange")
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Açıklama" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Örn: Diamond 3 Rank",
            value: formData.description,
            onChange: /* @__PURE__ */ __name((e) => setFormData({ ...formData, description: e.target.value }), "onChange")
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Görsel URL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "https://...",
            value: formData.image_url,
            onChange: /* @__PURE__ */ __name((e) => setFormData({ ...formData, image_url: e.target.value }), "onChange")
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Link URL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "https://...",
            value: formData.link_url,
            onChange: /* @__PURE__ */ __name((e) => setFormData({ ...formData, link_url: e.target.value }), "onChange")
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "cancel-btn", onClick: resetForm, children: "İptal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "save-btn", onClick: editingItem ? handleEdit : handleAdd, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaSave, {}),
          " ",
          editingItem ? "Güncelle" : "Ekle"
        ] })
      ] })
    ] }) })
  ] }) });
}, "ProfileShowcasePanel");
export {
  ProfileShowcasePanel as default
};
