var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { y } from "./ui-vendor-iPoN0WGz.js";
import { g as getApiBase } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
const TranslationPanel = /* @__PURE__ */ __name(({ serverId, onClose }) => {
  const apiBaseUrl = getApiBase();
  const [config, setConfig] = reactExports.useState({
    enabled: false,
    auto_translate: false,
    default_language: "tr",
    allowed_languages: ["en", "tr", "de", "fr", "es"],
    react_to_translate: true,
    translation_emoji: "🌐"
  });
  const [stats, setStats] = reactExports.useState({
    total_translations: 0,
    top_languages: [],
    translations_today: 0
  });
  const [loading, setLoading] = reactExports.useState(true);
  const languages = [
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" }
  ];
  reactExports.useEffect(() => {
    fetchConfig();
    fetchStats();
  }, [serverId]);
  const fetchConfig = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/translation/server/${serverId}/config/`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` }
      });
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, "fetchConfig");
  const fetchStats = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/translation/server/${serverId}/stats/`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` }
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, "fetchStats");
  const saveConfig = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/translation/server/${serverId}/config/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(config)
      });
      if (response.ok) {
        y.success("✅ Çeviri ayarları kaydedildi");
      } else {
        y.error("❌ Kaydetme hatası");
      }
    } catch (error) {
      y.error("❌ Bağlantı hatası");
    }
  }, "saveConfig");
  const toggleLanguage = /* @__PURE__ */ __name((code) => {
    const newAllowed = config.allowed_languages.includes(code) ? config.allowed_languages.filter((l) => l !== code) : [...config.allowed_languages, code];
    setConfig({ ...config, allowed_languages: newAllowed });
  }, "toggleLanguage");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "translation-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "translation-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "translation-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "🌐 Çeviri Sistemi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "translation-content", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Yükleniyor..." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-icon", children: "🌐" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: stats.total_translations }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Toplam Çeviri" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-icon", children: "📅" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: stats.translations_today }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Bugün" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-icon", children: "🏆" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: stats.top_languages[0] || "N/A" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "En Popüler" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "config-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "⚙️ Ayarlar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle-switch", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: config.enabled, onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, enabled: e.target.checked }), "onChange") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "toggle-slider" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "config-grid", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "🌍 Varsayılan Dil" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: config.default_language, onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, default_language: e.target.value }), "onChange"), children: languages.map((lang) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: lang.code, children: [
              lang.flag,
              " ",
              lang.name
            ] }, lang.code)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "🌐 Çeviri Emoji" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: config.translation_emoji, onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, translation_emoji: e.target.value }), "onChange") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "checkbox-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: config.auto_translate, onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, auto_translate: e.target.checked }), "onChange") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Otomatik çeviri" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "checkbox-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: config.react_to_translate, onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, react_to_translate: e.target.checked }), "onChange") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Emoji ile çevir" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "languages-section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "İzin Verilen Diller" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "languages-grid", children: languages.map((lang) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `language-card ${config.allowed_languages.includes(lang.code) ? "active" : ""}`,
              onClick: /* @__PURE__ */ __name(() => toggleLanguage(lang.code), "onClick"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "language-flag", children: lang.flag }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "language-name", children: lang.name }),
                config.allowed_languages.includes(lang.code) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "check-icon", children: "✅" })
              ]
            },
            lang.code
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "save-btn", onClick: saveConfig, children: "💾 Kaydet" })
      ] }),
      stats.top_languages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "top-languages-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "📊 En Çok Kullanılan Diller" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "top-languages-list", children: stats.top_languages.slice(0, 5).map((lang, idx) => {
          const langData = languages.find((l) => l.code === lang.code);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "top-language-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rank", children: [
              "#",
              idx + 1
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flag", children: langData?.flag }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "name", children: langData?.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "count", children: [
              lang.count,
              " çeviri"
            ] })
          ] }, idx);
        }) })
      ] })
    ] }) })
  ] }) });
}, "TranslationPanel");
export {
  TranslationPanel as default
};
