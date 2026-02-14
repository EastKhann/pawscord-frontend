var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { y } from "./ui-vendor-iPoN0WGz.js";
import { d as confirmDialog, g as getApiBase } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
const DEFAULT_CONFIG = {
  enabled: false,
  xp_per_message: 15,
  xp_cooldown: 60,
  level_up_message: "Tebrikler {user}! Seviye {level} oldun! 🎉",
  announce_channel_id: "",
  stack_roles: false,
  reset_on_leave: false
};
const getRankColor = /* @__PURE__ */ __name((rank) => {
  if (rank === 1) return "#fbbf24";
  if (rank === 2) return "#c0c0c0";
  if (rank === 3) return "#cd7f32";
  return "#6366f1";
}, "getRankColor");
const getLevelForXP = /* @__PURE__ */ __name((xp) => {
  const a = 5, b = 50, c = 100 - xp;
  return Math.max(1, Math.floor((-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a)));
}, "getLevelForXP");
const getXPForLevel = /* @__PURE__ */ __name((level) => 5 * level ** 2 + 50 * level + 100, "getXPForLevel");
const useLevelingSystem = /* @__PURE__ */ __name((serverId) => {
  const [config, setConfig] = reactExports.useState(DEFAULT_CONFIG);
  const [levelRoles, setLevelRoles] = reactExports.useState([]);
  const [newRole, setNewRole] = reactExports.useState({ level: 1, role_id: "" });
  const [roles, setRoles] = reactExports.useState([]);
  const [channels, setChannels] = reactExports.useState([]);
  const [leaderboard, setLeaderboard] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const apiBaseUrl = getApiBase();
  const headers = /* @__PURE__ */ __name(() => ({ "Authorization": `Bearer ${localStorage.getItem("access_token")}` }), "headers");
  const jsonHeaders = /* @__PURE__ */ __name(() => ({ ...headers(), "Content-Type": "application/json" }), "jsonHeaders");
  const fetchConfig = /* @__PURE__ */ __name(async () => {
    try {
      const r = await fetch(`${apiBaseUrl}/leveling/server/${serverId}/config/`, { headers: headers() });
      if (r.ok) {
        const d = await r.json();
        if (d.config) setConfig(d.config);
      }
    } catch (e) {
      console.error("Config fetch error:", e);
    } finally {
      setLoading(false);
    }
  }, "fetchConfig");
  const fetchLevelRoles = /* @__PURE__ */ __name(async () => {
    try {
      const r = await fetch(`${apiBaseUrl}/leveling/server/${serverId}/roles/`, { headers: headers() });
      if (r.ok) {
        const d = await r.json();
        setLevelRoles(d.roles || []);
      }
    } catch (e) {
      console.error(e);
    }
  }, "fetchLevelRoles");
  const fetchRoles = /* @__PURE__ */ __name(async () => {
    try {
      const r = await fetch(`${apiBaseUrl}/servers/${serverId}/roles/`, { headers: headers() });
      if (r.ok) {
        const d = await r.json();
        setRoles(d.roles || []);
      }
    } catch (e) {
      console.error(e);
    }
  }, "fetchRoles");
  const fetchChannels = /* @__PURE__ */ __name(async () => {
    try {
      const r = await fetch(`${apiBaseUrl}/servers/${serverId}/channels/`, { headers: headers() });
      if (r.ok) {
        const d = await r.json();
        setChannels(d.channels || []);
      }
    } catch (e) {
      console.error(e);
    }
  }, "fetchChannels");
  const fetchLeaderboard = /* @__PURE__ */ __name(async () => {
    try {
      const r = await fetch(`${apiBaseUrl}/leveling/server/${serverId}/leaderboard/`, { headers: headers() });
      if (r.ok) {
        const d = await r.json();
        setLeaderboard(d.leaderboard || []);
      }
    } catch (e) {
      console.error(e);
    }
  }, "fetchLeaderboard");
  reactExports.useEffect(() => {
    if (serverId) {
      fetchConfig();
      fetchLevelRoles();
      fetchRoles();
      fetchChannels();
      fetchLeaderboard();
    }
  }, [serverId]);
  const saveConfig = /* @__PURE__ */ __name(async () => {
    try {
      const r = await fetch(`${apiBaseUrl}/leveling/server/${serverId}/config/update/`, { method: "POST", headers: jsonHeaders(), body: JSON.stringify(config) });
      if (r.ok) y.success("✅ Ayarlar kaydedildi");
      else y.error("❌ Kaydetme başarısız");
    } catch (e) {
      y.error("❌ Hata oluştu");
    }
  }, "saveConfig");
  const addLevelRole = /* @__PURE__ */ __name(async () => {
    if (!newRole.role_id) {
      y.error("⚠️ Rol seçin");
      return;
    }
    try {
      const r = await fetch(`${apiBaseUrl}/leveling/server/${serverId}/roles/add/`, { method: "POST", headers: jsonHeaders(), body: JSON.stringify(newRole) });
      if (r.ok) {
        fetchLevelRoles();
        setNewRole({ level: 1, role_id: "" });
        y.success("✅ Rol eklendi");
      }
    } catch (e) {
      y.error("❌ Hata");
    }
  }, "addLevelRole");
  const removeLevelRole = /* @__PURE__ */ __name(async (roleId) => {
    try {
      const r = await fetch(`${apiBaseUrl}/leveling/server/${serverId}/roles/${roleId}/delete/`, { method: "DELETE", headers: headers() });
      if (r.ok) {
        fetchLevelRoles();
        y.success("✅ Rol kaldırıldı");
      }
    } catch (e) {
      y.error("❌ Hata");
    }
  }, "removeLevelRole");
  const resetUserXP = /* @__PURE__ */ __name(async (userId) => {
    const confirmed = await confirmDialog("Bu kullanıcının XP'sini sıfırlamak istediğinize emin misiniz?");
    if (!confirmed) return;
    try {
      const r = await fetch(`${apiBaseUrl}/leveling/server/${serverId}/user/${userId}/reset/`, { method: "POST", headers: headers() });
      if (r.ok) {
        fetchLeaderboard();
        y.success("✅ XP sıfırlandı");
      }
    } catch (e) {
      y.error("❌ Hata");
    }
  }, "resetUserXP");
  const updateConfig = /* @__PURE__ */ __name((key, value) => setConfig({ ...config, [key]: value }), "updateConfig");
  return { config, updateConfig, levelRoles, newRole, setNewRole, roles, channels, leaderboard, loading, saveConfig, addLevelRole, removeLevelRole, resetUserXP };
}, "useLevelingSystem");
const LevelRolesSection = /* @__PURE__ */ __name(({ levelRoles, newRole, setNewRole, roles, addLevelRole, removeLevelRole }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "level-roles-section", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
    "🎯",
    " Seviye Rolleri"
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "add-role-form", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: "1", max: "100", value: newRole.level, onChange: /* @__PURE__ */ __name((e) => setNewRole({ ...newRole, level: parseInt(e.target.value) || 1 }), "onChange"), placeholder: "Seviye", className: "level-input" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: newRole.role_id, onChange: /* @__PURE__ */ __name((e) => setNewRole({ ...newRole, role_id: e.target.value }), "onChange"), className: "role-select", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "", children: [
        "Rol se",
        "ç",
        "in"
      ] }),
      roles.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r.id, children: r.name }, r.id))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "add-role-btn", onClick: addLevelRole, children: [
      "➕",
      " Ekle"
    ] })
  ] }),
  levelRoles.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "level-roles-list", children: levelRoles.map((lr) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "level-role-item", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "level-badge", children: [
      "Lv. ",
      lr.level
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "role-name", children: lr.role_name || "Rol" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "remove-role-btn", onClick: /* @__PURE__ */ __name(() => removeLevelRole(lr.id), "onClick"), children: "✖" })
  ] }, lr.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "no-data", children: [
    "Hen",
    "ü",
    "z seviye rol",
    "ü",
    " yok"
  ] })
] }), "LevelRolesSection");
const LeaderboardSection = /* @__PURE__ */ __name(({ leaderboard, resetUserXP }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leaderboard-section", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
    "🏆",
    " S",
    "ı",
    "ralama"
  ] }),
  leaderboard.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "leaderboard-list", children: leaderboard.map((user, idx) => {
    const rank = idx + 1;
    const level = getLevelForXP(user.xp);
    const nextLevelXP = getXPForLevel(level + 1);
    const currentLevelXP = getXPForLevel(level);
    const progress = (user.xp - currentLevelXP) / (nextLevelXP - currentLevelXP) * 100;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leaderboard-item", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rank", style: { color: getRankColor(rank) }, children: [
        "#",
        rank
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { className: "user-avatar", src: user.avatar || `https://ui-avatars.com/api/?name=${user.username}`, alt: user.username }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "user-info", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "username", children: user.username }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "xp-bar-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "xp-bar", style: { width: `${Math.min(progress, 100)}%`, background: `linear-gradient(90deg, #5865f2, #7289da)` } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "xp-text", children: [
          "Seviye ",
          level,
          " ",
          "•",
          " ",
          user.xp,
          " XP"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "reset-xp-btn", onClick: /* @__PURE__ */ __name(() => resetUserXP(user.user_id), "onClick"), children: [
        "🔄",
        " S",
        "ı",
        "f",
        "ı",
        "rla"
      ] })
    ] }, user.user_id);
  }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "no-data", children: [
    "Hen",
    "ü",
    "z veri yok"
  ] })
] }), "LeaderboardSection");
const LevelingSystemPanel = /* @__PURE__ */ __name(({ serverId, onClose }) => {
  const { config, updateConfig, levelRoles, newRole, setNewRole, roles, channels, leaderboard, loading, saveConfig, addLevelRole, removeLevelRole, resetUserXP } = useLevelingSystem(serverId);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "leveling-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "leveling-panel", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Seviye sistemi y",
        "ü",
        "kleniyor..."
      ] })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "leveling-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leveling-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leveling-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        "⭐",
        " Seviye Sistemi"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leveling-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "config-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
            "⚙️",
            " Genel Ayarlar"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle-switch", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: config.enabled, onChange: /* @__PURE__ */ __name((e) => updateConfig("enabled", e.target.checked), "onChange") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slider" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "toggle-label", children: config.enabled ? "Aktif" : "Pasif" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-grid", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
              "Mesaj Ba",
              "şı",
              "na XP"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: "1", max: "100", value: config.xp_per_message, onChange: /* @__PURE__ */ __name((e) => updateConfig("xp_per_message", parseInt(e.target.value)), "onChange"), disabled: !config.enabled })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "XP Cooldown (saniye)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: "0", max: "300", value: config.xp_cooldown, onChange: /* @__PURE__ */ __name((e) => updateConfig("xp_cooldown", parseInt(e.target.value)), "onChange"), disabled: !config.enabled })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group full-width", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
              "Duyuru Kanal",
              "ı"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: config.announce_channel_id, onChange: /* @__PURE__ */ __name((e) => updateConfig("announce_channel_id", e.target.value), "onChange"), disabled: !config.enabled, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "", children: [
                "Se",
                "ç",
                "iniz (opsiyonel)"
              ] }),
              channels.map((ch) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: ch.id, children: [
                "#",
                ch.name
              ] }, ch.id))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group full-width", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
              "Seviye Atlama Mesaj",
              "ı"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: config.level_up_message, onChange: /* @__PURE__ */ __name((e) => updateConfig("level_up_message", e.target.value), "onChange"), disabled: !config.enabled, rows: "2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hint", children: [
              "Kullan",
              "ı",
              "labilir: ",
              "{user}",
              ", ",
              "{level}"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "checkbox-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: config.stack_roles, onChange: /* @__PURE__ */ __name((e) => updateConfig("stack_roles", e.target.checked), "onChange"), disabled: !config.enabled }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Rolleri biriktir (",
              "ö",
              "nceki seviye rollerini kald",
              "ı",
              "rma)"
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "checkbox-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: config.reset_on_leave, onChange: /* @__PURE__ */ __name((e) => updateConfig("reset_on_leave", e.target.checked), "onChange"), disabled: !config.enabled }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Sunucudan ayr",
              "ı",
              "l",
              "ı",
              "nca XP'yi s",
              "ı",
              "f",
              "ı",
              "rla"
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "save-btn", onClick: saveConfig, children: [
          "💾",
          " Ayarlar",
          "ı",
          " Kaydet"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LevelRolesSection, { levelRoles, newRole, setNewRole, roles, addLevelRole, removeLevelRole }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LeaderboardSection, { leaderboard, resetUserXP })
    ] })
  ] }) });
}, "LevelingSystemPanel");
export {
  LevelingSystemPanel as default
};
