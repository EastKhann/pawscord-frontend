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
const DEFAULT_CONFIG = {
  welcome_enabled: false,
  welcome_channel_id: "",
  welcome_message: "Hoş geldin {user}! {server} sunucusuna katıldın!",
  welcome_embed: false,
  welcome_embed_color: "#5865f2",
  welcome_embed_title: "Hoş Geldin!",
  welcome_embed_description: "{user} sunucuya katıldı!",
  welcome_dm: false,
  welcome_dm_message: "Merhaba {user}! {server} sunucusuna hoş geldin!",
  goodbye_enabled: false,
  goodbye_channel_id: "",
  goodbye_message: "{user} sunucudan ayrıldı. Hoşça kal!",
  goodbye_embed: false,
  goodbye_embed_color: "#ed4245",
  auto_role_enabled: false,
  auto_role_ids: []
};
const VARIABLES = [
  { code: "{user}", desc: "Kullanıcı adı" },
  { code: "{user_mention}", desc: "Kullanıcı mention" },
  { code: "{server}", desc: "Sunucu adı" },
  { code: "{member_count}", desc: "Üye sayısı" },
  { code: "{user_id}", desc: "Kullanıcı ID" }
];
const useWelcomeMessages = /* @__PURE__ */ __name((serverId) => {
  const [welcomeConfig, setWelcomeConfig] = reactExports.useState(DEFAULT_CONFIG);
  const [channels, setChannels] = reactExports.useState([]);
  const [roles, setRoles] = reactExports.useState([]);
  const [stats, setStats] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const apiBaseUrl = getApiBase();
  const headers = /* @__PURE__ */ __name(() => ({ "Authorization": `Bearer ${localStorage.getItem("access_token")}` }), "headers");
  const fetchConfig = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/welcome-messages/server/${serverId}/`, { headers: headers() });
      if (res.ok) {
        const data = await res.json();
        if (data.config) setWelcomeConfig(data.config);
      }
    } catch (e) {
      console.error("Error fetching config:", e);
    } finally {
      setLoading(false);
    }
  }, "fetchConfig");
  const fetchChannels = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/servers/${serverId}/channels/`, { headers: headers() });
      if (res.ok) {
        const d = await res.json();
        setChannels(d.channels || []);
      }
    } catch (e) {
      console.error("Error fetching channels:", e);
    }
  }, "fetchChannels");
  const fetchRoles = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/servers/${serverId}/roles/`, { headers: headers() });
      if (res.ok) {
        const d = await res.json();
        setRoles(d.roles || []);
      }
    } catch (e) {
      console.error("Error fetching roles:", e);
    }
  }, "fetchRoles");
  const fetchStats = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/welcome-messages/server/${serverId}/stats/`, { headers: headers() });
      if (res.ok) setStats(await res.json());
    } catch (e) {
      console.error("Error fetching stats:", e);
    }
  }, "fetchStats");
  reactExports.useEffect(() => {
    if (serverId) {
      fetchConfig();
      fetchChannels();
      fetchRoles();
      fetchStats();
    }
  }, [serverId]);
  const saveConfig = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/welcome-messages/server/${serverId}/update/`, { method: "POST", headers: { ...headers(), "Content-Type": "application/json" }, body: JSON.stringify(welcomeConfig) });
      if (res.ok) {
        y.success("✅ Karşılama ayarları kaydedildi");
        fetchStats();
      } else y.error("❌ Kaydetme başarısız");
    } catch (e) {
      console.error("Error saving config:", e);
      y.error("❌ Kaydetme başarısız");
    }
  }, "saveConfig");
  const testWelcomeMessage = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/welcome-messages/server/${serverId}/test/`, { method: "POST", headers: { ...headers(), "Content-Type": "application/json" }, body: JSON.stringify({ type: "welcome" }) });
      if (res.ok) y.success("✅ Test mesajı gönderildi");
      else y.error("❌ Test mesajı gönderilemedi");
    } catch (e) {
      console.error("Error testing message:", e);
      y.error("❌ Test başarısız");
    }
  }, "testWelcomeMessage");
  const updateConfig = /* @__PURE__ */ __name((field, value) => setWelcomeConfig({ ...welcomeConfig, [field]: value }), "updateConfig");
  const insertVariable = /* @__PURE__ */ __name((field, variable) => setWelcomeConfig({ ...welcomeConfig, [field]: welcomeConfig[field] + ` ${variable}` }), "insertVariable");
  return { welcomeConfig, updateConfig, insertVariable, channels, roles, stats, loading, saveConfig, testWelcomeMessage };
}, "useWelcomeMessages");
const MessageSection = /* @__PURE__ */ __name(({ title, icon, config, enabledKey, channelKey, messageKey, embedKey, embedColorKey, embedTitleKey, embedDescKey, dmKey, dmMessageKey, channels, updateConfig, insertVariable, onTest }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "config-section", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-header", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
      icon,
      " ",
      title
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle-switch", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: config[enabledKey], onChange: /* @__PURE__ */ __name((e) => updateConfig(enabledKey, e.target.checked), "onChange") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slider" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "toggle-label", children: config[enabledKey] ? "✓ Aktif" : "✗ Pasif" })
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-grid", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group full-width", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: channelKey.includes("goodbye") ? "Veda Kanalı" : "Karşılama Kanalı" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: config[channelKey], onChange: /* @__PURE__ */ __name((e) => updateConfig(channelKey, e.target.value), "onChange"), disabled: !config[enabledKey], children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "", children: [
          "Kanal se",
          "ç",
          "in"
        ] }),
        channels.map((ch) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: ch.id, children: ch.name }, ch.id))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group full-width", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: channelKey.includes("goodbye") ? "Veda Mesajı" : "Hoş Geldin Mesajı" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: config[messageKey], onChange: /* @__PURE__ */ __name((e) => updateConfig(messageKey, e.target.value), "onChange"), disabled: !config[enabledKey], rows: "3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "variables-bar", children: VARIABLES.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "variable-btn", onClick: /* @__PURE__ */ __name(() => insertVariable(messageKey, v.code), "onClick"), disabled: !config[enabledKey], title: v.desc, children: v.code }, v.code)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "checkbox-label", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: config[embedKey], onChange: /* @__PURE__ */ __name((e) => updateConfig(embedKey, e.target.checked), "onChange"), disabled: !config[enabledKey] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "Embed olarak g",
        "ö",
        "nder"
      ] })
    ] }) }),
    config[embedKey] && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Embed Rengi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: config[embedColorKey], onChange: /* @__PURE__ */ __name((e) => updateConfig(embedColorKey, e.target.value), "onChange"), disabled: !config[enabledKey] })
      ] }),
      embedTitleKey && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group full-width", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "Embed Ba",
          "ş",
          "l",
          "ı",
          "k"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: config[embedTitleKey], onChange: /* @__PURE__ */ __name((e) => updateConfig(embedTitleKey, e.target.value), "onChange"), disabled: !config[enabledKey] })
      ] }),
      embedDescKey && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group full-width", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "Embed A",
          "çı",
          "klama"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: config[embedDescKey], onChange: /* @__PURE__ */ __name((e) => updateConfig(embedDescKey, e.target.value), "onChange"), disabled: !config[enabledKey], rows: "3" })
      ] })
    ] }),
    dmKey && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-group full-width", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "checkbox-label", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: config[dmKey], onChange: /* @__PURE__ */ __name((e) => updateConfig(dmKey, e.target.checked), "onChange"), disabled: !config[enabledKey] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "Kullan",
        "ı",
        "c",
        "ı",
        "ya DM g",
        "ö",
        "nder"
      ] })
    ] }) }),
    dmKey && config[dmKey] && dmMessageKey && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group full-width", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        "DM Mesaj",
        "ı"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: config[dmMessageKey], onChange: /* @__PURE__ */ __name((e) => updateConfig(dmMessageKey, e.target.value), "onChange"), disabled: !config[enabledKey], rows: "3" })
    ] })
  ] }),
  onTest && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "test-btn", onClick: onTest, disabled: !config[enabledKey], children: [
    "🧪",
    " Test Et"
  ] })
] }), "MessageSection");
const STAT_ITEMS = [
  { icon: "👋", key: "total_welcomes", label: "Toplam Karşılama" },
  { icon: "😢", key: "total_goodbyes", label: "Toplam Veda" },
  { icon: "📅", key: "welcomes_today", label: "Bugün Katılan" }
];
const WelcomeMessagesPanel = /* @__PURE__ */ __name(({ serverId, onClose }) => {
  const { welcomeConfig, updateConfig, insertVariable, channels, roles, stats, loading, saveConfig, testWelcomeMessage } = useWelcomeMessages(serverId);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "welcome-messages-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "welcome-messages-panel", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Kar",
        "şı",
        "lama mesajlar",
        "ı",
        " y",
        "ü",
        "kleniyor..."
      ] })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "welcome-messages-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "welcome-messages-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "welcome-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        "👋",
        " Kar",
        "şı",
        "lama & Veda Mesajlar",
        "ı"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "×" })
    ] }),
    stats && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stats-overview", children: STAT_ITEMS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-icon", children: s.icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: stats[s.key] || 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: s.label })
    ] }, s.key)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "config-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MessageSection,
        {
          title: "Hoş Geldin Mesajları",
          icon: "👋",
          config: welcomeConfig,
          enabledKey: "welcome_enabled",
          channelKey: "welcome_channel_id",
          messageKey: "welcome_message",
          embedKey: "welcome_embed",
          embedColorKey: "welcome_embed_color",
          embedTitleKey: "welcome_embed_title",
          embedDescKey: "welcome_embed_description",
          dmKey: "welcome_dm",
          dmMessageKey: "welcome_dm_message",
          channels,
          updateConfig,
          insertVariable,
          onTest: testWelcomeMessage
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MessageSection,
        {
          title: "Veda Mesajları",
          icon: "😢",
          config: welcomeConfig,
          enabledKey: "goodbye_enabled",
          channelKey: "goodbye_channel_id",
          messageKey: "goodbye_message",
          embedKey: "goodbye_embed",
          embedColorKey: "goodbye_embed_color",
          channels,
          updateConfig,
          insertVariable
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "config-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
            "⭐",
            " Otomatik Rol"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle-switch", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: welcomeConfig.auto_role_enabled, onChange: /* @__PURE__ */ __name((e) => updateConfig("auto_role_enabled", e.target.checked), "onChange") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slider" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "toggle-label", children: welcomeConfig.auto_role_enabled ? "✓ Aktif" : "✗ Pasif" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Otomatik verilecek roller" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "roles-selector", children: roles.map((role) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "role-checkbox", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: welcomeConfig.auto_role_ids.includes(role.id),
                onChange: /* @__PURE__ */ __name((e) => {
                  const newRoles = e.target.checked ? [...welcomeConfig.auto_role_ids, role.id] : welcomeConfig.auto_role_ids.filter((id) => id !== role.id);
                  updateConfig("auto_role_ids", newRoles);
                }, "onChange"),
                disabled: !welcomeConfig.auto_role_enabled
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: role.name })
          ] }, role.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "save-btn", onClick: saveConfig, children: [
        "💾",
        " Ayarlar",
        "ı",
        " Kaydet"
      ] })
    ] })
  ] }) });
}, "WelcomeMessagesPanel");
export {
  WelcomeMessagesPanel as default
};
