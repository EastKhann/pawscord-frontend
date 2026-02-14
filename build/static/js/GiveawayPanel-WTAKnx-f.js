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
const INITIAL_GIVEAWAY = {
  title: "",
  description: "",
  prize: "",
  channel_id: "",
  winners_count: 1,
  duration: 3600,
  required_role_id: "",
  required_messages: 0,
  required_invites: 0,
  allow_multiple_entries: false
};
const DURATION_OPTIONS = [
  { value: 1800, label: "30 dakika" },
  { value: 3600, label: "1 saat" },
  { value: 10800, label: "3 saat" },
  { value: 21600, label: "6 saat" },
  { value: 43200, label: "12 saat" },
  { value: 86400, label: "1 gün" },
  { value: 172800, label: "2 gün" },
  { value: 259200, label: "3 gün" },
  { value: 604800, label: "1 hafta" }
];
const getStatusBadge = /* @__PURE__ */ __name((status) => {
  const badges = {
    active: { text: "Aktif", color: "#10b981" },
    ended: { text: "Sonlandı", color: "#6b7280" },
    cancelled: { text: "İptal", color: "#ef4444" }
  };
  return badges[status] || badges.active;
}, "getStatusBadge");
const formatTimeRemaining = /* @__PURE__ */ __name((endTime) => {
  const diff = Math.floor((new Date(endTime) - /* @__PURE__ */ new Date()) / 1e3);
  if (diff <= 0) return "Sona erdi";
  const days = Math.floor(diff / 86400);
  const hours = Math.floor(diff % 86400 / 3600);
  const minutes = Math.floor(diff % 3600 / 60);
  if (days > 0) return `${days}g ${hours}s kaldı`;
  if (hours > 0) return `${hours}s ${minutes}dk kaldı`;
  return `${minutes} dakika kaldı`;
}, "formatTimeRemaining");
const useGiveaways = /* @__PURE__ */ __name((serverId) => {
  const apiBaseUrl = getApiBase();
  const [giveaways, setGiveaways] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [showCreateModal, setShowCreateModal] = reactExports.useState(false);
  const [channels, setChannels] = reactExports.useState([]);
  const [roles, setRoles] = reactExports.useState([]);
  const [newGiveaway, setNewGiveaway] = reactExports.useState(INITIAL_GIVEAWAY);
  const authHeaders = { "Authorization": `Bearer ${localStorage.getItem("access_token")}` };
  const fetchGiveaways = /* @__PURE__ */ __name(async () => {
    try {
      const r = await fetch(`${apiBaseUrl}/giveaways/server/${serverId}/`, { headers: authHeaders });
      if (r.ok) setGiveaways(await r.json());
    } catch (e) {
      console.error("Error fetching giveaways:", e);
    } finally {
      setLoading(false);
    }
  }, "fetchGiveaways");
  const fetchChannels = /* @__PURE__ */ __name(async () => {
    try {
      const r = await fetch(`${apiBaseUrl}/channels/server/${serverId}/`, { headers: authHeaders });
      if (r.ok) {
        const d = await r.json();
        setChannels(d.filter((ch) => ch.type === "text"));
      }
    } catch (e) {
      console.error("Error fetching channels:", e);
    }
  }, "fetchChannels");
  const fetchRoles = /* @__PURE__ */ __name(async () => {
    try {
      const r = await fetch(`${apiBaseUrl}/roles/server/${serverId}/`, { headers: authHeaders });
      if (r.ok) setRoles(await r.json());
    } catch (e) {
      console.error("Error fetching roles:", e);
    }
  }, "fetchRoles");
  reactExports.useEffect(() => {
    fetchGiveaways();
    fetchChannels();
    fetchRoles();
  }, [serverId]);
  const createGiveaway = /* @__PURE__ */ __name(async () => {
    if (!newGiveaway.title || !newGiveaway.prize || !newGiveaway.channel_id) {
      y.error("❌ Lütfen tüm gerekli alanları doldurun");
      return;
    }
    try {
      const r = await fetch(`${apiBaseUrl}/giveaways/create/`, {
        method: "POST",
        headers: { ...authHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ server_id: serverId, ...newGiveaway })
      });
      if (r.ok) {
        y.success("✅ Çekiliş oluşturuldu!");
        setShowCreateModal(false);
        fetchGiveaways();
        setNewGiveaway(INITIAL_GIVEAWAY);
      } else {
        y.error("❌ Çekiliş oluşturulamadı");
      }
    } catch (e) {
      console.error("Error creating giveaway:", e);
      y.error("❌ Bağlantı hatası");
    }
  }, "createGiveaway");
  const endGiveaway = /* @__PURE__ */ __name(async (id) => {
    if (!await confirmDialog("Çekilişi sonlandırmak istediğinize emin misiniz?")) return;
    try {
      const r = await fetch(`${apiBaseUrl}/giveaways/${id}/end/`, { method: "POST", headers: authHeaders });
      if (r.ok) {
        const d = await r.json();
        y.success(`✅ Çekiliş sonlandı! Kazananlar: ${d.winners.join(", ")}`);
        fetchGiveaways();
      } else y.error("❌ Çekiliş sonlandırılamadı");
    } catch (e) {
      console.error("Error ending giveaway:", e);
      y.error("❌ Bağlantı hatası");
    }
  }, "endGiveaway");
  const rerollGiveaway = /* @__PURE__ */ __name(async (id) => {
    try {
      const r = await fetch(`${apiBaseUrl}/giveaways/${id}/reroll/`, { method: "POST", headers: authHeaders });
      if (r.ok) {
        const d = await r.json();
        y.success(`✅ Yeni kazanan: ${d.new_winner}`);
        fetchGiveaways();
      } else y.error("❌ Reroll yapılamadı");
    } catch (e) {
      console.error("Error rerolling giveaway:", e);
      y.error("❌ Bağlantı hatası");
    }
  }, "rerollGiveaway");
  const deleteGiveaway = /* @__PURE__ */ __name(async (id) => {
    if (!await confirmDialog("Çekilişi silmek istediğinize emin misiniz?")) return;
    try {
      const r = await fetch(`${apiBaseUrl}/giveaways/${id}/delete/`, { method: "DELETE", headers: authHeaders });
      if (r.ok) {
        y.success("✅ Çekiliş silindi");
        fetchGiveaways();
      } else y.error("❌ Çekiliş silinemedi");
    } catch (e) {
      console.error("Error deleting giveaway:", e);
      y.error("❌ Bağlantı hatası");
    }
  }, "deleteGiveaway");
  return {
    giveaways,
    loading,
    showCreateModal,
    setShowCreateModal,
    channels,
    roles,
    newGiveaway,
    setNewGiveaway,
    createGiveaway,
    endGiveaway,
    rerollGiveaway,
    deleteGiveaway
  };
}, "useGiveaways");
const GiveawayCard = /* @__PURE__ */ __name(({ giveaway, onEnd, onReroll, onDelete }) => {
  const badge = getStatusBadge(giveaway.status);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "giveaway-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "giveaway-card-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: giveaway.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "status-badge", style: { background: badge.color }, children: badge.text })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "giveaway-card-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "giveaway-prize", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "prize-icon", children: "🎁" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "prize-text", children: giveaway.prize })
      ] }),
      giveaway.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "giveaway-description", children: giveaway.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "giveaway-info", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "info-label", children: [
            "Kazanan Say",
            "ı",
            "s",
            "ı",
            ":"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "info-value", children: [
            giveaway.winners_count,
            " ki",
            "ş",
            "i"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "info-label", children: [
            "Kat",
            "ı",
            "l",
            "ı",
            "mc",
            "ı",
            "lar:"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "info-value", children: [
            giveaway.entries_count || 0,
            " ki",
            "ş",
            "i"
          ] })
        ] }),
        giveaway.status === "active" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "info-label", children: [
            "Kalan S",
            "ü",
            "re:"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "info-value time-remaining", children: formatTimeRemaining(giveaway.end_time) })
        ] })
      ] }),
      giveaway.required_role_id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "requirement-badge", children: [
        "⭐",
        " Rol gereksinimi var"
      ] }),
      giveaway.required_messages > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "requirement-badge", children: [
        "💬",
        " ",
        giveaway.required_messages,
        " mesaj gerekli"
      ] }),
      giveaway.required_invites > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "requirement-badge", children: [
        "👥",
        " ",
        giveaway.required_invites,
        " davet gerekli"
      ] }),
      giveaway.winners && giveaway.winners.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "winners-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { children: [
          "🎉",
          " Kazananlar:"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "winners-list", children: giveaway.winners.map((winner, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: winner }, index)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "giveaway-card-footer", children: [
      giveaway.status === "active" && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "end-btn", onClick: /* @__PURE__ */ __name(() => onEnd(giveaway.id), "onClick"), children: [
        "🏁",
        " Sonland",
        "ı",
        "r"
      ] }),
      giveaway.status === "ended" && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "reroll-btn", onClick: /* @__PURE__ */ __name(() => onReroll(giveaway.id), "onClick"), children: [
        "🔄",
        " Reroll"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "delete-btn", onClick: /* @__PURE__ */ __name(() => onDelete(giveaway.id), "onClick"), children: [
        "🗑️",
        " Sil"
      ] })
    ] })
  ] });
}, "GiveawayCard");
const CreateGiveawayModal = /* @__PURE__ */ __name(({ newGiveaway, setNewGiveaway, channels, roles, onCreate, onClose }) => {
  const update = /* @__PURE__ */ __name((field, value) => setNewGiveaway({ ...newGiveaway, [field]: value }), "update");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "create-modal-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "create-modal", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
        "Yeni ",
        "Ç",
        "ekili",
        "ş",
        " Olu",
        "ş",
        "tur"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "Ba",
          "ş",
          "l",
          "ı",
          "k *"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Discord Nitro Çekilişi", value: newGiveaway.title, onChange: /* @__PURE__ */ __name((e) => update("title", e.target.value), "onChange") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "A",
          "çı",
          "klama"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { placeholder: "Çekiliş hakkında detaylar...", value: newGiveaway.description, onChange: /* @__PURE__ */ __name((e) => update("description", e.target.value), "onChange"), rows: "3" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "Ö",
          "d",
          "ü",
          "l *"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "1 Aylık Discord Nitro", value: newGiveaway.prize, onChange: /* @__PURE__ */ __name((e) => update("prize", e.target.value), "onChange") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Kanal *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: newGiveaway.channel_id, onChange: /* @__PURE__ */ __name((e) => update("channel_id", e.target.value), "onChange"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "", children: [
              "Kanal Se",
              "ç",
              "in"
            ] }),
            channels.map((ch) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: ch.id, children: [
              "# ",
              ch.name
            ] }, ch.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
            "Kazanan Say",
            "ı",
            "s",
            "ı"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: "1", max: "100", value: newGiveaway.winners_count, onChange: /* @__PURE__ */ __name((e) => update("winners_count", parseInt(e.target.value)), "onChange") })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "S",
          "ü",
          "re"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: newGiveaway.duration, onChange: /* @__PURE__ */ __name((e) => update("duration", parseInt(e.target.value)), "onChange"), children: DURATION_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.value, children: opt.label }, opt.value)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "requirements-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { children: [
          "Kat",
          "ı",
          "l",
          "ı",
          "m Gereksinimleri (Opsiyonel)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Gerekli Rol" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: newGiveaway.required_role_id, onChange: /* @__PURE__ */ __name((e) => update("required_role_id", e.target.value), "onChange"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Rol yok" }),
            roles.map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: role.id, children: role.name }, role.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
              "Minimum Mesaj Say",
              "ı",
              "s",
              "ı"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: "0", value: newGiveaway.required_messages, onChange: /* @__PURE__ */ __name((e) => update("required_messages", parseInt(e.target.value)), "onChange") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
              "Minimum Davet Say",
              "ı",
              "s",
              "ı"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: "0", value: newGiveaway.required_invites, onChange: /* @__PURE__ */ __name((e) => update("required_invites", parseInt(e.target.value)), "onChange") })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "checkbox-label", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: newGiveaway.allow_multiple_entries, onChange: /* @__PURE__ */ __name((e) => update("allow_multiple_entries", e.target.checked), "onChange") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Birden fazla kat",
            "ı",
            "l",
            "ı",
            "ma izin ver"
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-footer", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "cancel-btn", onClick: onClose, children: [
        "İ",
        "ptal"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "submit-btn", onClick: onCreate, children: [
        "🎉",
        " ",
        "Ç",
        "ekili",
        "ş",
        " Olu",
        "ş",
        "tur"
      ] })
    ] })
  ] }) });
}, "CreateGiveawayModal");
const GiveawayPanel = /* @__PURE__ */ __name(({ serverId, onClose }) => {
  const {
    giveaways,
    loading,
    showCreateModal,
    setShowCreateModal,
    channels,
    roles,
    newGiveaway,
    setNewGiveaway,
    createGiveaway,
    endGiveaway,
    rerollGiveaway,
    deleteGiveaway
  } = useGiveaways(serverId);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "giveaway-panel-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "giveaway-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "giveaway-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        "🎉",
        " ",
        "Ç",
        "ekili",
        "ş",
        "ler"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "giveaway-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "giveaway-actions", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "create-giveaway-btn", onClick: /* @__PURE__ */ __name(() => setShowCreateModal(true), "onClick"), children: [
        "+ Yeni ",
        "Ç",
        "ekili",
        "ş",
        " Olu",
        "ş",
        "tur"
      ] }) }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Ç",
          "ekili",
          "ş",
          "ler y",
          "ü",
          "kleniyor..."
        ] })
      ] }) : giveaways.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "empty-icon", children: "🎁" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Hen",
          "ü",
          "z ",
          "ç",
          "ekili",
          "ş",
          " yok"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "empty-hint", children: [
          "Yeni bir ",
          "ç",
          "ekili",
          "ş",
          " olu",
          "ş",
          "turun!"
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "giveaways-list", children: giveaways.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(GiveawayCard, { giveaway: g, onEnd: endGiveaway, onReroll: rerollGiveaway, onDelete: deleteGiveaway }, g.id)) })
    ] }),
    showCreateModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateGiveawayModal,
      {
        newGiveaway,
        setNewGiveaway,
        channels,
        roles,
        onCreate: createGiveaway,
        onClose: /* @__PURE__ */ __name(() => setShowCreateModal(false), "onClose")
      }
    )
  ] }) });
}, "GiveawayPanel");
export {
  GiveawayPanel as default
};
