var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { y } from "./ui-vendor-iPoN0WGz.js";
import { g as getApiBase, d as confirmDialog } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
const accentColors = [
  { name: "Discord Blue", color: "#5865f2" },
  { name: "Blurple", color: "#7289da" },
  { name: "Green", color: "#43b581" },
  { name: "Yellow", color: "#faa61a" },
  { name: "Red", color: "#f04747" },
  { name: "Pink", color: "#ff73fa" },
  { name: "Purple", color: "#9b59b6" },
  { name: "Orange", color: "#e67e22" }
];
const DEFAULT_SETTINGS = {
  // Theme
  theme: "dark",
  accent_color: "#5865f2",
  // Message Display
  message_display_mode: "cozy",
  font_size: 16,
  message_group_spacing: "default",
  // Chat Features
  show_emoji_picker: true,
  show_gif_picker: true,
  animate_emoji: true,
  animate_stickers: true,
  show_embeds: true,
  render_embeds: true,
  inline_embed_media: true,
  inline_attachment_media: true,
  // Accessibility
  use_reduced_motion: false,
  high_contrast_mode: false,
  saturate_colors: 100,
  // Language
  language: "tr",
  timezone: "Europe/Istanbul"
};
const applyTheme = /* @__PURE__ */ __name((themeSettings) => {
  document.documentElement.setAttribute("data-theme", themeSettings.theme);
  document.documentElement.style.setProperty("--accent-color", themeSettings.accent_color);
  document.documentElement.style.setProperty("--font-size", `${themeSettings.font_size}px`);
  document.documentElement.style.setProperty("--saturation", `${themeSettings.saturate_colors}%`);
  if (themeSettings.use_reduced_motion) {
    document.documentElement.classList.add("reduce-motion");
  } else {
    document.documentElement.classList.remove("reduce-motion");
  }
  if (themeSettings.high_contrast_mode) {
    document.documentElement.classList.add("high-contrast");
  } else {
    document.documentElement.classList.remove("high-contrast");
  }
}, "applyTheme");
const useAppearanceSettings = /* @__PURE__ */ __name(() => {
  const [settings, setSettings] = reactExports.useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = reactExports.useState(true);
  const apiBaseUrl = getApiBase();
  reactExports.useEffect(() => {
    fetchAppearanceSettings();
  }, []);
  const fetchAppearanceSettings = /* @__PURE__ */ __name(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/appearance/settings/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
        applyTheme(data);
      }
    } catch (error) {
      console.error("Error fetching appearance settings:", error);
    } finally {
      setLoading(false);
    }
  }, "fetchAppearanceSettings");
  const updateSettings = /* @__PURE__ */ __name(async (newSettings) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/appearance/settings/update/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newSettings)
      });
      if (response.ok) {
        setSettings(newSettings);
        applyTheme(newSettings);
        y.success("✅ Görünüm ayarları kaydedildi");
      } else {
        y.error("❌ Ayarlar kaydedilemedi");
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      y.error("❌ Bağlantı hatası");
    }
  }, "updateSettings");
  const updateSetting = /* @__PURE__ */ __name((key, value) => {
    const newSettings = { ...settings, [key]: value };
    updateSettings(newSettings);
  }, "updateSetting");
  const toggleSetting = /* @__PURE__ */ __name((key) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    updateSettings(newSettings);
  }, "toggleSetting");
  const resetToDefaults = /* @__PURE__ */ __name(async () => {
    if (!await confirmDialog("Tüm görünüm ayarlarını varsıyılana döndürmek istediğinizden emin misiniz?")) {
      return;
    }
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/appearance/settings/reset/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
        applyTheme(data);
        y.success("✅ Ayarlar varsıyılana döndürüldü");
      }
    } catch (error) {
      console.error("Error resetting settings:", error);
      y.error("❌ Ayarlar sıfırlanamadı");
    }
  }, "resetToDefaults");
  return { settings, loading, updateSetting, toggleSetting, resetToDefaults };
}, "useAppearanceSettings");
const SettingToggle = /* @__PURE__ */ __name(({ label, desc, checked, onChange }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-item", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-info", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "setting-label", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "setting-desc", children: desc })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle-switch", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked, onChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slider" })
  ] })
] }), "SettingToggle");
const CHAT_TOGGLES = [
  { key: "show_emoji_picker", label: "Emoji seçiciyi göster", desc: "Mesaj yazarken emoji seçici" },
  { key: "show_gif_picker", label: "GIF seçiciyi göster", desc: "Mesaj yazarken GIF seçici" },
  { key: "animate_emoji", label: "Emoji animasyonları", desc: "Animasyonlu emojileri oynat" },
  { key: "animate_stickers", label: "Sticker animasyonları", desc: "Animasyonlu stickerleri oynat" },
  { key: "show_embeds", label: "Embed göster", desc: "Link önizlemelerini göster" },
  { key: "render_embeds", label: "Embed içeriği render et", desc: "Embed içindeki medyayı göster" },
  { key: "inline_embed_media", label: "Satır içi medya", desc: "Görselleri ve videoları mesaj içinde göster" },
  { key: "inline_attachment_media", label: "Satır içi ekler", desc: "Dosya eklerini mesaj içinde göster" }
];
const ACCESSIBILITY_TOGGLES = [
  { key: "use_reduced_motion", label: "Azaltılmış hareket", desc: "Animasyonları ve geçişleri azalt" },
  { key: "high_contrast_mode", label: "Yüksek kontrast modu", desc: "Daha belirgin renkler kullan" }
];
const AppearanceSettingsPanel = /* @__PURE__ */ __name(({ onClose }) => {
  const { settings, loading, updateSetting, toggleSetting, resetToDefaults } = useAppearanceSettings();
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "appearance-settings-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "appearance-settings-panel", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Görünüm ayarları yükleniyor..." })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "appearance-settings-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "appearance-settings-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "appearance-settings-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "🎨 Görünüm Ayarları" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "appearance-settings-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "🌙 Tema" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "theme-selector", children: [
          { value: "light", icon: "☀️", label: "Açık", cls: "light-theme" },
          { value: "dark", icon: "🌙", label: "Koyu", cls: "dark-theme" },
          { value: "auto", icon: "🔄", label: "Otomatik", cls: "auto-theme" }
        ].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `theme-option ${settings.theme === t.value ? "active" : ""}`,
            onClick: /* @__PURE__ */ __name(() => updateSetting("theme", t.value), "onClick"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `theme-preview ${t.cls}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "preview-header" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "preview-content" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                t.icon,
                " ",
                t.label
              ] })
            ]
          },
          t.value
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "🎨 Vurgu Rengi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "color-picker", children: [
          accentColors.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `color-swatch ${settings.accent_color === c.color ? "active" : ""}`,
              style: { background: c.color },
              onClick: /* @__PURE__ */ __name(() => updateSetting("accent_color", c.color), "onClick"),
              title: c.name,
              children: settings.accent_color === c.color && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "✓" })
            },
            c.color
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "color",
              value: settings.accent_color,
              onChange: /* @__PURE__ */ __name((e) => updateSetting("accent_color", e.target.value), "onChange"),
              className: "custom-color-input",
              title: "Özel renk seç"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "💬 Mesaj Görünümü" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-info", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "setting-label", children: "Mesaj modu" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "setting-desc", children: "Mesajların nasıl görüntüleneceğini seçin" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "display-mode-selector", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: `mode-btn ${settings.message_display_mode === "cozy" ? "active" : ""}`,
                  onClick: /* @__PURE__ */ __name(() => updateSetting("message_display_mode", "cozy"), "onClick"),
                  children: "Rahat"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: `mode-btn ${settings.message_display_mode === "compact" ? "active" : ""}`,
                  onClick: /* @__PURE__ */ __name(() => updateSetting("message_display_mode", "compact"), "onClick"),
                  children: "Kompakt"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-info", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-label", children: [
                "Yazı boyutu: ",
                settings.font_size,
                "px"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "setting-desc", children: "Mesaj yazı tipi boyutu" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "range",
                min: "12",
                max: "20",
                value: settings.font_size,
                onChange: /* @__PURE__ */ __name((e) => updateSetting("font_size", parseInt(e.target.value)), "onChange"),
                className: "font-size-slider"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-info", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "setting-label", children: "Mesaj aralığı" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "setting-desc", children: "Mesajlar arası boşluk" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: settings.message_group_spacing,
                onChange: /* @__PURE__ */ __name((e) => updateSetting("message_group_spacing", e.target.value), "onChange"),
                className: "spacing-select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "compact", children: "Sıkışık" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "default", children: "Varsıyılan" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "spacious", children: "Geniş" })
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "✨ Sohbet Özellikleri" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "settings-group", children: CHAT_TOGGLES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingToggle,
          {
            label: t.label,
            desc: t.desc,
            checked: settings[t.key],
            onChange: /* @__PURE__ */ __name(() => toggleSetting(t.key), "onChange")
          },
          t.key
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "♿ Erişilebilirlik" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-group", children: [
          ACCESSIBILITY_TOGGLES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            SettingToggle,
            {
              label: t.label,
              desc: t.desc,
              checked: settings[t.key],
              onChange: /* @__PURE__ */ __name(() => toggleSetting(t.key), "onChange")
            },
            t.key
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-info", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-label", children: [
                "Renk doygunluğu: ",
                settings.saturate_colors,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "setting-desc", children: "Renklerin canlılığını ayarla" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "range",
                min: "0",
                max: "200",
                value: settings.saturate_colors,
                onChange: /* @__PURE__ */ __name((e) => updateSetting("saturate_colors", parseInt(e.target.value)), "onChange"),
                className: "saturation-slider"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "🌍 Dil ve Bölge" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-info", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "setting-label", children: "Dil" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "setting-desc", children: "Uygulama dili" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: settings.language,
                onChange: /* @__PURE__ */ __name((e) => updateSetting("language", e.target.value), "onChange"),
                className: "language-select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "tr", children: "🇹🇷 Türkçe" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "en", children: "🇺🇸 English" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "de", children: "🇩🇪 Deutsch" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "fr", children: "🇫🇷 Français" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "es", children: "🇪🇸 Español" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-info", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "setting-label", children: "Saat dilimi" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "setting-desc", children: "Mesaj zaman damgaları için" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: settings.timezone,
                onChange: /* @__PURE__ */ __name((e) => updateSetting("timezone", e.target.value), "onChange"),
                className: "timezone-select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Europe/Istanbul", children: "İstanbul (UTC+3)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Europe/London", children: "Londra (UTC+0)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "America/New_York", children: "New York (UTC-5)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "America/Los_Angeles", children: "Los Angeles (UTC-8)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Asia/Tokyo", children: "Tokyo (UTC+9)" })
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "settings-section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "reset-btn", onClick: resetToDefaults, children: "🔄 Varsıyılan Ayarlara Dön" }) })
    ] })
  ] }) });
}, "AppearanceSettingsPanel");
export {
  AppearanceSettingsPanel as default
};
