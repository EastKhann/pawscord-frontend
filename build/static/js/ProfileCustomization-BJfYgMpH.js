var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { ap as FaPalette, aY as FaSave, bx as FaUpload } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const DEFAULT_CUSTOMIZATION = {
  banner_url: "",
  banner_color: "#5865f2",
  theme_color: "#5865f2",
  accent_color: "#5865f2",
  bio_text: "",
  bio_background_color: "#2b2d31",
  show_badges: true,
  show_activity: true
};
const useProfileCustomization = /* @__PURE__ */ __name((userId, fetchWithAuth, apiBaseUrl) => {
  const [customization, setCustomization] = reactExports.useState(DEFAULT_CUSTOMIZATION);
  const [previewMode, setPreviewMode] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    loadCustomization();
  }, [userId]);
  const loadCustomization = /* @__PURE__ */ __name(async () => {
    try {
      const r = await fetchWithAuth(`${apiBaseUrl}/users/${userId}/customization/`);
      const d = await r.json();
      if (d.customization) setCustomization(d.customization);
    } catch (e) {
      console.error("Failed to load customization:", e);
    } finally {
      setLoading(false);
    }
  }, "loadCustomization");
  const saveCustomization = /* @__PURE__ */ __name(async () => {
    try {
      const r = await fetchWithAuth(`${apiBaseUrl}/users/${userId}/customization/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customization)
      });
      if (r.ok) toast.success("✅ Profil özelleştirmeleri kaydedildi!");
    } catch (e) {
      console.error("Failed to save customization:", e);
    }
  }, "saveCustomization");
  const applyPreset = /* @__PURE__ */ __name((preset) => {
    setCustomization((prev) => ({
      ...prev,
      theme_color: preset.primary,
      accent_color: preset.accent,
      bio_background_color: preset.bg,
      banner_color: preset.primary
    }));
  }, "applyPreset");
  const uploadBanner = /* @__PURE__ */ __name(async (file) => {
    const formData = new FormData();
    formData.append("banner", file);
    try {
      const r = await fetchWithAuth(`${apiBaseUrl}/users/${userId}/upload-banner/`, { method: "POST", body: formData });
      const d = await r.json();
      if (d.banner_url) setCustomization((prev) => ({ ...prev, banner_url: d.banner_url }));
    } catch (e) {
      console.error("Failed to upload banner:", e);
    }
  }, "uploadBanner");
  const updateField = /* @__PURE__ */ __name((field, value) => setCustomization((prev) => ({ ...prev, [field]: value })), "updateField");
  return { customization, previewMode, setPreviewMode, loading, saveCustomization, applyPreset, uploadBanner, updateField };
}, "useProfileCustomization");
const THEME_PRESETS = [
  { name: "Discord Purple", primary: "#5865f2", accent: "#4752c4", bg: "#2b2d31" },
  { name: "Sunset Orange", primary: "#f26522", accent: "#e04e1b", bg: "#2d2420" },
  { name: "Forest Green", primary: "#3ba55d", accent: "#2d7d46", bg: "#1f2b23" },
  { name: "Ocean Blue", primary: "#3498db", accent: "#2980b9", bg: "#1e2838" },
  { name: "Rose Pink", primary: "#e91e63", accent: "#c2185b", bg: "#2d1f26" },
  { name: "Golden Yellow", primary: "#faa61a", accent: "#f57c00", bg: "#2d2819" },
  { name: "Dark Red", primary: "#ed4245", accent: "#c03537", bg: "#2d1e1f" },
  { name: "Cyber Purple", primary: "#9b59b6", accent: "#8e44ad", bg: "#251f2d" }
];
const styles = {
  container: { width: "100%", height: "100%", backgroundColor: "#313338", display: "flex", flexDirection: "column" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #1e1f22", backgroundColor: "#2b2d31" },
  title: { margin: 0, color: "#fff", fontSize: "20px", fontWeight: "600", display: "flex", alignItems: "center", gap: "10px" },
  headerActions: { display: "flex", gap: "12px" },
  previewButton: { backgroundColor: "#383a40", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", fontWeight: "500" },
  previewButtonActive: { backgroundColor: "#5865f2", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", fontWeight: "500" },
  saveButton: { backgroundColor: "#3ba55d", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", fontWeight: "500", display: "flex", alignItems: "center", gap: "8px" },
  editContainer: { flex: 1, overflowY: "auto", padding: "20px" },
  section: { backgroundColor: "#2b2d31", borderRadius: "8px", padding: "20px", marginBottom: "16px" },
  sectionTitle: { color: "#fff", fontSize: "16px", fontWeight: "600", marginBottom: "16px" },
  inputGroup: { marginBottom: "16px" },
  label: { display: "block", color: "#b5bac1", fontSize: "14px", marginBottom: "8px", fontWeight: "500" },
  colorInput: { width: "100%", height: "50px", border: "none", borderRadius: "4px", cursor: "pointer" },
  fileInput: { display: "none" },
  uploadButton: { backgroundColor: "#5865f2", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" },
  presetGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "12px" },
  presetCard: { padding: "20px", borderRadius: "8px", cursor: "pointer", textAlign: "center", transition: "transform 0.2s" },
  presetName: { color: "#fff", fontSize: "13px", fontWeight: "600", textShadow: "0 2px 4px rgba(0,0,0,0.3)" },
  colorGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" },
  bioTextarea: { width: "100%", padding: "12px", backgroundColor: "#1e1f22", border: "1px solid #1e1f22", borderRadius: "4px", color: "#fff", fontSize: "14px", resize: "vertical", minHeight: "100px", fontFamily: "inherit" },
  charCount: { textAlign: "right", color: "#b5bac1", fontSize: "12px", marginTop: "8px" },
  checkbox: { display: "flex", alignItems: "center", gap: "12px", color: "#b5bac1", fontSize: "14px", marginBottom: "12px", cursor: "pointer" },
  preview: { flex: 1, overflowY: "auto", padding: "40px" },
  previewBanner: { width: "100%", height: "200px", borderRadius: "8px 8px 0 0", backgroundSize: "cover", backgroundPosition: "center" },
  previewContent: { backgroundColor: "#2b2d31", borderRadius: "0 0 8px 8px", padding: "60px 20px 20px", position: "relative" },
  previewAvatar: { width: "120px", height: "120px", borderRadius: "50%", backgroundColor: "#5865f2", position: "absolute", top: "-60px", left: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px" },
  previewInfo: { marginTop: "20px" },
  loading: { display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#b5bac1" }
};
const ProfileCustomization = /* @__PURE__ */ __name(({ userId, fetchWithAuth, apiBaseUrl }) => {
  const { customization, previewMode, setPreviewMode, loading, saveCustomization, applyPreset, uploadBanner, updateField } = useProfileCustomization(userId, fetchWithAuth, apiBaseUrl);
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.loading, children: [
    "Y",
    "ü",
    "kleniyor..."
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: styles.title, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPalette, {}),
        " Profil ",
        "Ö",
        "zelle",
        "ş",
        "tirme"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerActions, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setPreviewMode(!previewMode), "onClick"), style: previewMode ? styles.previewButtonActive : styles.previewButton, children: previewMode ? "Düzenleme" : "Önizleme" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: saveCustomization, style: styles.saveButton, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaSave, {}),
          " Kaydet"
        ] })
      ] })
    ] }),
    previewMode ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.preview, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.previewBanner, backgroundColor: customization.banner_color, backgroundImage: customization.banner_url ? `url(${customization.banner_url})` : "none" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.previewContent, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.previewAvatar, border: `4px solid ${customization.theme_color}` }, children: "👤" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.previewInfo, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { color: customization.theme_color }, children: [
            "Kullan",
            "ı",
            "c",
            "ı",
            " Ad",
            "ı"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { backgroundColor: customization.bio_background_color, color: "#fff", padding: "12px", borderRadius: "8px", borderLeft: `3px solid ${customization.accent_color}` }, children: customization.bio_text || "Buraya biyografi metni gelecek..." })
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.editContainer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.sectionTitle, children: [
          "🖼️",
          " Banner"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inputGroup, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Banner Resmi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", onChange: /* @__PURE__ */ __name((e) => e.target.files[0] && uploadBanner(e.target.files[0]), "onChange"), style: styles.fileInput }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => document.querySelector('input[type="file"]').click(), "onClick"), style: styles.uploadButton, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaUpload, {}),
            " Resim Y",
            "ü",
            "kle"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inputGroup, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Banner Rengi (resim yoksa)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: customization.banner_color, onChange: /* @__PURE__ */ __name((e) => updateField("banner_color", e.target.value), "onChange"), style: styles.colorInput })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.sectionTitle, children: [
          "🎨",
          " Haz",
          "ı",
          "r Temalar"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.presetGrid, children: THEME_PRESETS.map((preset, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: /* @__PURE__ */ __name(() => applyPreset(preset), "onClick"), style: { ...styles.presetCard, background: `linear-gradient(135deg, ${preset.primary}, ${preset.accent})` }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.presetName, children: preset.name }) }, idx)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.sectionTitle, children: [
          "🎨",
          " Renkler"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.colorGrid, children: [
          { field: "theme_color", label: "Ana Tema Rengi" },
          { field: "accent_color", label: "Vurgu Rengi" },
          { field: "bio_background_color", label: "Biyografi Arka Plan" }
        ].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inputGroup, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: c.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: customization[c.field], onChange: /* @__PURE__ */ __name((e) => updateField(c.field, e.target.value), "onChange"), style: styles.colorInput })
        ] }, c.field)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.sectionTitle, children: [
          "📝",
          " Biyografi"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: customization.bio_text, onChange: /* @__PURE__ */ __name((e) => updateField("bio_text", e.target.value), "onChange"), placeholder: "Biyografini buraya yaz...", style: styles.bioTextarea, maxLength: 190 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.charCount, children: [
          customization.bio_text.length,
          " / 190 karakter"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.sectionTitle, children: [
          "⚙️",
          " G",
          "ö",
          "r",
          "ü",
          "n",
          "ü",
          "m Ayarlar",
          "ı"
        ] }),
        [
          { field: "show_badges", label: "Rozetleri göster" },
          { field: "show_activity", label: "Aktiviteyi göster" }
        ].map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.checkbox, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: customization[opt.field], onChange: /* @__PURE__ */ __name((e) => updateField(opt.field, e.target.checked), "onChange") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: opt.label })
        ] }, opt.field))
      ] })
    ] })
  ] });
}, "ProfileCustomization");
export {
  ProfileCustomization as default
};
