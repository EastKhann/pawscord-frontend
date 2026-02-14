var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import "./index-DGqPEDt8.js";
import "./crypto-vendor-NANfm9jb.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./icons-vendor-2VDeY8fW.js";
import "./ui-vendor-iPoN0WGz.js";
const LanguageContext = reactExports.createContext();
const useLanguage = /* @__PURE__ */ __name(() => {
  const context = reactExports.useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}, "useLanguage");
const LanguageSelector = /* @__PURE__ */ __name(({ compact = false }) => {
  const { currentLanguage, languages, changeLanguage, getLanguageInfo } = useLanguage();
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const currentLang = getLanguageInfo(currentLanguage) || {
    name: "Türkçe",
    flag: "🇹🇷"
  };
  const handleSelect = /* @__PURE__ */ __name((langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  }, "handleSelect");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `language-selector ${compact ? "compact" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        className: "language-toggle",
        onClick: /* @__PURE__ */ __name(() => setIsOpen(!isOpen), "onClick"),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "lang-flag", children: currentLang.flag }),
          !compact && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "lang-name", children: currentLang.native_name || currentLang.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "lang-arrow", children: isOpen ? "▲" : "▼" })
          ] })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "language-dropdown", children: languages.map((lang) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        className: `language-option ${lang.code === currentLanguage ? "active" : ""}`,
        onClick: /* @__PURE__ */ __name(() => handleSelect(lang.code), "onClick"),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "lang-flag", children: lang.flag }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "lang-name", children: lang.native_name }),
          lang.code === currentLanguage && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "lang-check", children: "✓" })
        ]
      },
      lang.code
    )) })
  ] });
}, "LanguageSelector");
const LanguageSettings = /* @__PURE__ */ __name(({ onClose }) => {
  const { currentLanguage, languages, changeLanguage, direction } = useLanguage();
  const [selectedLang, setSelectedLang] = reactExports.useState(currentLanguage);
  const handleSave = /* @__PURE__ */ __name(() => {
    changeLanguage(selectedLang);
    onClose?.();
  }, "handleSave");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "language-settings-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "🌐 Dil Ayarları / Language Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "✕" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "settings-desc", children: "Arayüz dilini seçin / Select interface language" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "languages-grid", children: languages.map((lang) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `language-card ${lang.code === selectedLang ? "selected" : ""}`,
          onClick: /* @__PURE__ */ __name(() => setSelectedLang(lang.code), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "card-flag", children: lang.flag }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-info", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "card-native", children: lang.native_name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "card-name", children: lang.name })
            ] }),
            lang.direction === "rtl" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rtl-badge", children: "RTL" }),
            lang.code === selectedLang && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "selected-check", children: "✓" })
          ]
        },
        lang.code
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-info", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "info-icon", children: "📝" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Metin yönü: ",
            direction === "rtl" ? "Sağdan Sola" : "Soldan Sağa"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "info-icon", children: "🔄" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Değişiklikler anında uygulanır" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-footer", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-cancel", onClick: onClose, children: "İptal / Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-save", onClick: handleSave, children: "Kaydet / Save" })
    ] })
  ] });
}, "LanguageSettings");
const InlineLanguageSwitcher = /* @__PURE__ */ __name(() => {
  const { currentLanguage, languages, changeLanguage } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-language-switcher", children: languages.slice(0, 4).map((lang) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      className: `inline-lang-btn ${lang.code === currentLanguage ? "active" : ""}`,
      onClick: /* @__PURE__ */ __name(() => changeLanguage(lang.code), "onClick"),
      title: lang.native_name,
      children: lang.flag
    },
    lang.code
  )) });
}, "InlineLanguageSwitcher");
const T = /* @__PURE__ */ __name(({ id, params = {}, as: Component = "span", ...props }) => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Component, { ...props, children: t(id, params) });
}, "T");
export {
  InlineLanguageSwitcher,
  LanguageSelector,
  LanguageSettings,
  T,
  LanguageSelector as default
};
