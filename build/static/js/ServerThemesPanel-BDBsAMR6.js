var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { ap as FaPalette, a as FaTimes, a9 as FaCheck, an as FaPlus } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const ServerThemesPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, serverId, onClose }) => {
  const [themes, setThemes] = reactExports.useState([]);
  const [activeTheme, setActiveTheme] = reactExports.useState(null);
  const [customTheme, setCustomTheme] = reactExports.useState({
    name: "",
    primary_color: "#5865f2",
    secondary_color: "#2c2f33",
    background_color: "#1e1e1e",
    text_color: "#ffffff",
    accent_color: "#43b581"
  });
  const [loading, setLoading] = reactExports.useState(true);
  const presetThemes = [
    {
      name: "Discord Classic",
      primary_color: "#5865f2",
      secondary_color: "#2c2f33",
      background_color: "#1e1e1e",
      text_color: "#ffffff",
      accent_color: "#43b581"
    },
    {
      name: "Dark Purple",
      primary_color: "#7289da",
      secondary_color: "#2c2f33",
      background_color: "#23272a",
      text_color: "#ffffff",
      accent_color: "#99aab5"
    },
    {
      name: "Ocean Blue",
      primary_color: "#4a9eff",
      secondary_color: "#1a3a52",
      background_color: "#0d2137",
      text_color: "#e3f2fd",
      accent_color: "#00bcd4"
    },
    {
      name: "Forest Green",
      primary_color: "#4caf50",
      secondary_color: "#1b5e20",
      background_color: "#0d3b0d",
      text_color: "#e8f5e9",
      accent_color: "#8bc34a"
    },
    {
      name: "Sunset Orange",
      primary_color: "#ff9800",
      secondary_color: "#e65100",
      background_color: "#3e2723",
      text_color: "#fff3e0",
      accent_color: "#ffb74d"
    },
    {
      name: "Midnight Black",
      primary_color: "#424242",
      secondary_color: "#212121",
      background_color: "#000000",
      text_color: "#e0e0e0",
      accent_color: "#757575"
    }
  ];
  reactExports.useEffect(() => {
    loadThemes();
  }, []);
  const loadThemes = /* @__PURE__ */ __name(async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/themes/`);
      if (response.ok) {
        const data = await response.json();
        setThemes(data.themes || []);
        setActiveTheme(data.active_theme);
      }
    } catch (error) {
      console.error("Tema yükleme hatası:", error);
    } finally {
      setLoading(false);
    }
  }, "loadThemes");
  const applyTheme = /* @__PURE__ */ __name(async (theme) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/theme/apply/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(theme)
      });
      if (response.ok) {
        toast.success("Tema uygulandı");
        setActiveTheme(theme);
      } else {
        toast.error("Tema uygulanamadı");
      }
    } catch (error) {
      console.error("Tema uygulama hatası:", error);
      toast.error("Bir hata oluştu");
    }
  }, "applyTheme");
  const saveCustomTheme = /* @__PURE__ */ __name(async () => {
    if (!customTheme.name.trim()) {
      toast.error("Tema adı girin");
      return;
    }
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/theme/save/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customTheme)
      });
      if (response.ok) {
        toast.success("Özel tema kaydedildi");
        loadThemes();
        setCustomTheme({
          name: "",
          primary_color: "#5865f2",
          secondary_color: "#2c2f33",
          background_color: "#1e1e1e",
          text_color: "#ffffff",
          accent_color: "#43b581"
        });
      } else {
        toast.error("Tema kaydedilemedi");
      }
    } catch (error) {
      console.error("Tema kaydetme hatası:", error);
      toast.error("Bir hata oluştu");
    }
  }, "saveCustomTheme");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPalette, { style: { color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0 }, children: "Sunucu Temaları" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { onClick: onClose, style: styles.closeBtn })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "Hazır Temalar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.themeGrid, children: presetThemes.map((theme, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: styles.themeCard,
            onClick: /* @__PURE__ */ __name(() => applyTheme(theme), "onClick"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.themePreview, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.colorStrip, backgroundColor: theme.background_color } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.colorStrip, backgroundColor: theme.secondary_color } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.colorStrip, backgroundColor: theme.primary_color } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.colorStrip, backgroundColor: theme.accent_color } })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.themeName, children: theme.name }),
              activeTheme?.name === theme.name && /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { style: styles.activeCheck })
            ]
          },
          index
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "Özel Tema Oluştur" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.customForm, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Tema Adı",
              value: customTheme.name,
              onChange: /* @__PURE__ */ __name((e) => setCustomTheme({ ...customTheme, name: e.target.value }), "onChange"),
              style: styles.input
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.colorGrid, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.colorField, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Ana Renk" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "color",
                  value: customTheme.primary_color,
                  onChange: /* @__PURE__ */ __name((e) => setCustomTheme({ ...customTheme, primary_color: e.target.value }), "onChange"),
                  style: styles.colorInput
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.colorField, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "İkinci Renk" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "color",
                  value: customTheme.secondary_color,
                  onChange: /* @__PURE__ */ __name((e) => setCustomTheme({ ...customTheme, secondary_color: e.target.value }), "onChange"),
                  style: styles.colorInput
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.colorField, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Arkaplan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "color",
                  value: customTheme.background_color,
                  onChange: /* @__PURE__ */ __name((e) => setCustomTheme({ ...customTheme, background_color: e.target.value }), "onChange"),
                  style: styles.colorInput
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.colorField, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Metin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "color",
                  value: customTheme.text_color,
                  onChange: /* @__PURE__ */ __name((e) => setCustomTheme({ ...customTheme, text_color: e.target.value }), "onChange"),
                  style: styles.colorInput
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.colorField, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Vurgu" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "color",
                  value: customTheme.accent_color,
                  onChange: /* @__PURE__ */ __name((e) => setCustomTheme({ ...customTheme, accent_color: e.target.value }), "onChange"),
                  style: styles.colorInput
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: saveCustomTheme, style: styles.saveBtn, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
            " Temayı Kaydet"
          ] })
        ] })
      ] })
    ] })
  ] }) });
}, "ServerThemesPanel");
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
    maxWidth: "900px",
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
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "20px"
  },
  section: {
    marginBottom: "30px"
  },
  sectionTitle: {
    color: "#dcddde",
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "15px"
  },
  themeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "15px"
  },
  themeCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "15px",
    cursor: "pointer",
    position: "relative",
    transition: "transform 0.2s"
  },
  themePreview: {
    display: "flex",
    height: "60px",
    borderRadius: "4px",
    overflow: "hidden",
    marginBottom: "10px"
  },
  colorStrip: {
    flex: 1
  },
  themeName: {
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "500"
  },
  activeCheck: {
    position: "absolute",
    top: "10px",
    right: "10px",
    color: "#43b581",
    fontSize: "20px"
  },
  customForm: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "20px"
  },
  input: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#1e1e1e",
    border: "1px solid #444",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px",
    marginBottom: "15px"
  },
  colorGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "15px",
    marginBottom: "15px"
  },
  colorField: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  colorInput: {
    width: "100%",
    height: "50px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  saveBtn: {
    width: "100%",
    backgroundColor: "#5865f2",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  }
};
export {
  ServerThemesPanel as default
};
