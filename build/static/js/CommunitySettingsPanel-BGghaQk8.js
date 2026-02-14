var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { aA as FaGavel, b4 as FaBullhorn, ax as FaGlobe, ac as FaComments, cI as FaClipboardList, a as FaTimes, f as FaQuestionCircle, a1 as FaShieldAlt, d as FaExclamationTriangle, u as FaUsers, bo as FaToggleOn, bp as FaToggleOff, az as FaCog, cC as FaUserCheck, aY as FaSave } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const DEFAULT_SETTINGS = {
  is_community: false,
  rules_channel_id: "",
  public_updates_channel_id: "",
  verification_level: "medium",
  explicit_content_filter: "medium",
  default_notifications: "mentions",
  description: "",
  preferred_locale: "tr",
  features: { welcome_screen: true, member_screening: false, discovery: false }
};
const VERIFICATION_LEVELS = [
  { value: "none", label: "Yok", description: "Herkes mesaj gönderebilir" },
  { value: "low", label: "Düşük", description: "E-posta doğrulaması gerekli" },
  { value: "medium", label: "Orta", description: "5 dakika kayıtlı olmalı" },
  { value: "high", label: "Yüksek", description: "10 dakika sunucuda olmalı" },
  { value: "highest", label: "En Yüksek", description: "Telefon doğrulaması gerekli" }
];
const CONTENT_FILTERS = [
  { value: "disabled", label: "Kapalı", description: "İçerik filtresi yok" },
  { value: "medium", label: "Orta", description: "Rolsüz üyeler için filtrele" },
  { value: "high", label: "Yüksek", description: "Tüm mesajları filtrele" }
];
const useCommunitySettings = /* @__PURE__ */ __name((apiBaseUrl, serverId) => {
  const [settings, setSettings] = reactExports.useState(DEFAULT_SETTINGS);
  const [rules, setRules] = reactExports.useState([]);
  const [screeningQuestions, setScreeningQuestions] = reactExports.useState([]);
  const [channels, setChannels] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [activeTab, setActiveTab] = reactExports.useState("general");
  reactExports.useEffect(() => {
    fetchCommunitySettings();
    fetchChannels();
  }, []);
  const authHeaders = /* @__PURE__ */ __name(() => ({ "Authorization": `Bearer ${localStorage.getItem("access_token")}` }), "authHeaders");
  const fetchCommunitySettings = /* @__PURE__ */ __name(async () => {
    try {
      const r = await fetch(`${apiBaseUrl}/servers/${serverId}/community/settings/`, { headers: authHeaders() });
      if (r.ok) {
        const d = await r.json();
        setSettings((prev) => ({ ...prev, ...d }));
        setRules(d.rules || []);
        setScreeningQuestions(d.screening_questions || []);
      }
    } catch (e) {
      console.error("Fetch settings error:", e);
    } finally {
      setLoading(false);
    }
  }, "fetchCommunitySettings");
  const fetchChannels = /* @__PURE__ */ __name(async () => {
    try {
      const r = await fetch(`${apiBaseUrl}/servers/${serverId}/channels/`, { headers: authHeaders() });
      if (r.ok) {
        const d = await r.json();
        setChannels((d.channels || d || []).filter((c) => c.type !== "category"));
      }
    } catch (e) {
      console.error("Fetch channels error:", e);
    }
  }, "fetchChannels");
  const saveSettings = /* @__PURE__ */ __name(async () => {
    setSaving(true);
    try {
      const r = await fetch(`${apiBaseUrl}/servers/${serverId}/community/settings/`, {
        method: "PUT",
        headers: { ...authHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({ ...settings, rules, screening_questions: screeningQuestions })
      });
      if (r.ok) toast.success("✅ Topluluk ayarları kaydedildi");
    } catch (e) {
      console.error("Save error:", e);
      toast.error("Kaydetme başarısız");
    } finally {
      setSaving(false);
    }
  }, "saveSettings");
  const addRule = /* @__PURE__ */ __name(() => setRules((prev) => [...prev, { id: Date.now(), title: "", description: "" }]), "addRule");
  const updateRule = /* @__PURE__ */ __name((id, field, value) => setRules((prev) => prev.map((r) => r.id === id ? { ...r, [field]: value } : r)), "updateRule");
  const removeRule = /* @__PURE__ */ __name((id) => setRules((prev) => prev.filter((r) => r.id !== id)), "removeRule");
  const addQuestion = /* @__PURE__ */ __name(() => setScreeningQuestions((prev) => [...prev, { id: Date.now(), question: "", required: false }]), "addQuestion");
  const updateQuestion = /* @__PURE__ */ __name((id, field, value) => setScreeningQuestions((prev) => prev.map((q) => q.id === id ? { ...q, [field]: value } : q)), "updateQuestion");
  const removeQuestion = /* @__PURE__ */ __name((id) => setScreeningQuestions((prev) => prev.filter((q) => q.id !== id)), "removeQuestion");
  return {
    settings,
    setSettings,
    rules,
    screeningQuestions,
    channels,
    loading,
    saving,
    activeTab,
    setActiveTab,
    saveSettings,
    addRule,
    updateRule,
    removeRule,
    addQuestion,
    updateQuestion,
    removeQuestion
  };
}, "useCommunitySettings");
const GeneralSettings = /* @__PURE__ */ __name(({ settings, setSettings, channels }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-tab", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
      "Sunucu A",
      "çı",
      "klamas",
      "ı"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        value: settings.description,
        onChange: /* @__PURE__ */ __name((e) => setSettings((prev) => ({ ...prev, description: e.target.value })), "onChange"),
        placeholder: "Sunucunuz hakkında kısa bir açıklama...",
        rows: "3",
        maxLength: 300
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "char-count", children: [
      settings.description?.length || 0,
      "/300"
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaGavel, {}),
        " Kurallar Kanal",
        "ı"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: settings.rules_channel_id, onChange: /* @__PURE__ */ __name((e) => setSettings((prev) => ({ ...prev, rules_channel_id: e.target.value })), "onChange"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "", children: [
          "Se",
          "ç",
          "in..."
        ] }),
        channels.map((ch) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: ch.id, children: [
          "#",
          ch.name
        ] }, ch.id))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaBullhorn, {}),
        " G",
        "ü",
        "ncellemeler Kanal",
        "ı"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: settings.public_updates_channel_id, onChange: /* @__PURE__ */ __name((e) => setSettings((prev) => ({ ...prev, public_updates_channel_id: e.target.value })), "onChange"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "", children: [
          "Se",
          "ç",
          "in..."
        ] }),
        channels.map((ch) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: ch.id, children: [
          "#",
          ch.name
        ] }, ch.id))
      ] })
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaGlobe, {}),
        " Tercih Edilen Dil"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: settings.preferred_locale, onChange: /* @__PURE__ */ __name((e) => setSettings((prev) => ({ ...prev, preferred_locale: e.target.value })), "onChange"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "tr", children: [
          "🇹🇷",
          " T",
          "ü",
          "rk",
          "ç",
          "e"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "en", children: [
          "🇬🇧",
          " English"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "de", children: [
          "🇩🇪",
          " Deutsch"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "fr", children: [
          "🇫🇷",
          " Fran",
          "ç",
          "ais"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaComments, {}),
        " Varsay",
        "ı",
        "lan Bildirimler"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: settings.default_notifications, onChange: /* @__PURE__ */ __name((e) => setSettings((prev) => ({ ...prev, default_notifications: e.target.value })), "onChange"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "all", children: [
          "T",
          "ü",
          "m Mesajlar"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "mentions", children: "Sadece Etiketler" })
      ] })
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "feature-toggles", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { children: [
      "Ö",
      "zellikler"
    ] }),
    [
      { key: "welcome_screen", label: "Karşılama Ekranı" },
      { key: "member_screening", label: "Üye Tarama" },
      { key: "discovery", label: "Sunucu Keşfet" }
    ].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "feature-item", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: f.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: settings.features?.[f.key], onChange: /* @__PURE__ */ __name((e) => setSettings((prev) => ({ ...prev, features: { ...prev.features, [f.key]: e.target.checked } })), "onChange") })
    ] }, f.key))
  ] })
] }), "GeneralSettings");
const RulesSettings = /* @__PURE__ */ __name(({ rules, onAdd, onUpdate, onRemove }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-tab", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tab-header", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { children: [
      "Sunucu Kurallar",
      "ı"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "add-btn", onClick: onAdd, children: "+ Kural Ekle" })
  ] }),
  rules.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-rules", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FaClipboardList, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "Hen",
      "ü",
      "z kural eklenmemi",
      "ş"
    ] })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rules-list", children: rules.map((rule, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rule-item", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rule-number", children: idx + 1 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rule-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Kural başlığı...", value: rule.title, onChange: /* @__PURE__ */ __name((e) => onUpdate(rule.id, "title", e.target.value), "onChange") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { placeholder: "Kural açıklaması...", value: rule.description, onChange: /* @__PURE__ */ __name((e) => onUpdate(rule.id, "description", e.target.value), "onChange"), rows: "2" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "remove-btn", onClick: /* @__PURE__ */ __name(() => onRemove(rule.id), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
  ] }, rule.id)) })
] }), "RulesSettings");
const ScreeningSettings = /* @__PURE__ */ __name(({ questions, onAdd, onUpdate, onRemove }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-tab", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tab-header", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { children: [
      "Ü",
      "ye Tarama Sorular",
      "ı"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "add-btn", onClick: onAdd, children: "+ Soru Ekle" })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "tab-description", children: [
    "Yeni ",
    "ü",
    "yeler sunucuya kat",
    "ı",
    "lmadan ",
    "ö",
    "nce bu sorular",
    "ı",
    " yan",
    "ı",
    "tlamal",
    "ı",
    "d",
    "ı",
    "r."
  ] }),
  questions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-rules", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FaQuestionCircle, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "Hen",
      "ü",
      "z soru eklenmemi",
      "ş"
    ] })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "questions-list", children: questions.map((q, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "question-item", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "question-number", children: idx + 1 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "question-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Soruyu yazın...", value: q.question, onChange: /* @__PURE__ */ __name((e) => onUpdate(q.id, "question", e.target.value), "onChange") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "required-toggle", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: q.required, onChange: /* @__PURE__ */ __name((e) => onUpdate(q.id, "required", e.target.checked), "onChange") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Zorunlu" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "remove-btn", onClick: /* @__PURE__ */ __name(() => onRemove(q.id), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
  ] }, q.id)) })
] }), "ScreeningSettings");
const SafetySettings = /* @__PURE__ */ __name(({ settings, setSettings, verificationLevels, contentFilters }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-tab", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, {}),
      " Do",
      "ğ",
      "rulama Seviyesi"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "level-options", children: verificationLevels.map((level) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `level-option ${settings.verification_level === level.value ? "selected" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "verification", value: level.value, checked: settings.verification_level === level.value, onChange: /* @__PURE__ */ __name((e) => setSettings((prev) => ({ ...prev, verification_level: e.target.value })), "onChange") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "level-info", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "level-label", children: level.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "level-desc", children: level.description })
      ] })
    ] }, level.value)) })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, {}),
      " ",
      "İç",
      "erik Filtresi"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "level-options", children: contentFilters.map((filter) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `level-option ${settings.explicit_content_filter === filter.value ? "selected" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "content-filter", value: filter.value, checked: settings.explicit_content_filter === filter.value, onChange: /* @__PURE__ */ __name((e) => setSettings((prev) => ({ ...prev, explicit_content_filter: e.target.value })), "onChange") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "level-info", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "level-label", children: filter.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "level-desc", children: filter.description })
      ] })
    ] }, filter.value)) })
  ] })
] }), "SafetySettings");
const TABS = [
  { key: "general", label: "Genel", Icon: FaCog },
  { key: "rules", label: "Kurallar", Icon: FaGavel },
  { key: "screening", label: "Üye Tarama", Icon: FaUserCheck },
  { key: "safety", label: "Güvenlik", Icon: FaShieldAlt }
];
const CommunitySettingsPanel = /* @__PURE__ */ __name(({ apiBaseUrl, serverId, onClose }) => {
  const state = useCommunitySettings(apiBaseUrl, serverId);
  if (state.loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "community-settings-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "community-settings-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading", children: [
      "Y",
      "ü",
      "kleniyor..."
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "community-settings-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "community-settings-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, {}),
        " Topluluk Ayarlar",
        "ı"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "community-toggle", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "toggle-info", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "toggle-label", children: "Topluluk Sunucusu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "toggle-description", children: [
          "Topluluk ",
          "ö",
          "zelliklerini aktifle",
          "ş",
          "tir (ke",
          "ş",
          "fet, kar",
          "şı",
          "lama ekran",
          "ı",
          " vb.)"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `toggle-btn ${state.settings.is_community ? "active" : ""}`, onClick: /* @__PURE__ */ __name(() => state.setSettings((prev) => ({ ...prev, is_community: !prev.is_community })), "onClick"), children: state.settings.is_community ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaToggleOn, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaToggleOff, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tabs", children: TABS.map(({ key, label, Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `tab ${state.activeTab === key ? "active" : ""}`, onClick: /* @__PURE__ */ __name(() => state.setActiveTab(key), "onClick"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, {}),
      " ",
      label
    ] }, key)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-content", children: [
      state.activeTab === "general" && /* @__PURE__ */ jsxRuntimeExports.jsx(GeneralSettings, { settings: state.settings, setSettings: state.setSettings, channels: state.channels }),
      state.activeTab === "rules" && /* @__PURE__ */ jsxRuntimeExports.jsx(RulesSettings, { rules: state.rules, onAdd: state.addRule, onUpdate: state.updateRule, onRemove: state.removeRule }),
      state.activeTab === "screening" && /* @__PURE__ */ jsxRuntimeExports.jsx(ScreeningSettings, { questions: state.screeningQuestions, onAdd: state.addQuestion, onUpdate: state.updateQuestion, onRemove: state.removeQuestion }),
      state.activeTab === "safety" && /* @__PURE__ */ jsxRuntimeExports.jsx(SafetySettings, { settings: state.settings, setSettings: state.setSettings, verificationLevels: VERIFICATION_LEVELS, contentFilters: CONTENT_FILTERS })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-footer", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "cancel-btn", onClick: onClose, children: [
        "İ",
        "ptal"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "save-btn", onClick: state.saveSettings, disabled: state.saving, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaSave, {}),
        " ",
        state.saving ? "Kaydediliyor..." : "Kaydet"
      ] })
    ] })
  ] }) });
}, "CommunitySettingsPanel");
export {
  CommunitySettingsPanel as default
};
