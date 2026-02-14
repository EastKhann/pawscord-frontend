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
const ReactionRolesPanel = /* @__PURE__ */ __name(({ serverId, onClose }) => {
  const [reactionRoles, setReactionRoles] = reactExports.useState([]);
  const [roles, setRoles] = reactExports.useState([]);
  const [channels, setChannels] = reactExports.useState([]);
  const [newReactionRole, setNewReactionRole] = reactExports.useState({
    message_id: "",
    channel_id: "",
    emoji: "",
    role_id: "",
    description: ""
  });
  const [loading, setLoading] = reactExports.useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = reactExports.useState(false);
  const apiBaseUrl = getApiBase();
  reactExports.useEffect(() => {
    if (serverId) {
      fetchReactionRoles();
      fetchRoles();
      fetchChannels();
    }
  }, [serverId]);
  const fetchReactionRoles = /* @__PURE__ */ __name(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/reaction-roles/server/${serverId}/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setReactionRoles(data.reaction_roles || []);
      }
    } catch (error) {
      console.error("Error fetching reaction roles:", error);
    } finally {
      setLoading(false);
    }
  }, "fetchReactionRoles");
  const fetchRoles = /* @__PURE__ */ __name(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/servers/${serverId}/roles/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setRoles(data.roles || []);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }, "fetchRoles");
  const fetchChannels = /* @__PURE__ */ __name(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/servers/${serverId}/channels/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setChannels(data.channels || []);
      }
    } catch (error) {
      console.error("Error fetching channels:", error);
    }
  }, "fetchChannels");
  const createReactionRole = /* @__PURE__ */ __name(async () => {
    if (!newReactionRole.message_id || !newReactionRole.emoji || !newReactionRole.role_id) {
      y.error("❌ Mesaj ID, emoji ve rol zorunludur");
      return;
    }
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/reaction-roles/create/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          server_id: serverId,
          ...newReactionRole
        })
      });
      if (response.ok) {
        const data = await response.json();
        setReactionRoles([...reactionRoles, data.reaction_role]);
        setNewReactionRole({
          message_id: "",
          channel_id: "",
          emoji: "",
          role_id: "",
          description: ""
        });
        y.success("✅ Reaction role oluşturuldu");
      } else {
        const errorData = await response.json();
        y.error(`❌ ${errorData.error || "Oluşturma başarısız"}`);
      }
    } catch (error) {
      console.error("Error creating reaction role:", error);
      y.error("❌ Oluşturma başarısız");
    }
  }, "createReactionRole");
  const deleteReactionRole = /* @__PURE__ */ __name(async (id) => {
    if (!await confirmDialog("Bu reaction role'ü silmek istediğinizden emin misiniz?")) {
      return;
    }
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/reaction-roles/${id}/delete/`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        setReactionRoles(reactionRoles.filter((rr) => rr.id !== id));
        y.success("✅ Reaction role silindi");
      }
    } catch (error) {
      console.error("Error deleting reaction role:", error);
      y.error("❌ Silme başarısız");
    }
  }, "deleteReactionRole");
  const syncReactionRoles = /* @__PURE__ */ __name(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/reaction-roles/server/${serverId}/sync/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        y.success("✅ Reaction roller senkronize edildi");
        fetchReactionRoles();
      }
    } catch (error) {
      console.error("Error syncing reaction roles:", error);
      y.error("❌ Senkronizasyon başarısız");
    }
  }, "syncReactionRoles");
  const commonEmojis = ["❤️", "💙", "💚", "💛", "🧡", "💜", "🖤", "🤍", "🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "⚪", "⚫", "✅", "❌", "⭐", "🎉", "🎮", "🎵", "📚", "🏆"];
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "reaction-roles-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "reaction-roles-panel", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Reaction roller yükleniyor..." })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "reaction-roles-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reaction-roles-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reaction-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "⭐ Reaction Roles" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "create-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "🆕 Yeni Reaction Role" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-grid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group full-width", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Kanal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: newReactionRole.channel_id,
              onChange: /* @__PURE__ */ __name((e) => setNewReactionRole({ ...newReactionRole, channel_id: e.target.value }), "onChange"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Kanal seçin (opsiyonel)" }),
                channels.map((channel) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: channel.id, children: [
                  "#",
                  channel.name
                ] }, channel.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Mesaj ID *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Mesaj ID'sini girin",
              value: newReactionRole.message_id,
              onChange: /* @__PURE__ */ __name((e) => setNewReactionRole({ ...newReactionRole, message_id: e.target.value }), "onChange")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "input-hint", children: "Mesaja sağ tık → Mesaj ID'sini Kopyala" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Rol *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: newReactionRole.role_id,
              onChange: /* @__PURE__ */ __name((e) => setNewReactionRole({ ...newReactionRole, role_id: e.target.value }), "onChange"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Rol seçin" }),
                roles.map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: role.id, children: role.name }, role.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group full-width", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Emoji *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "emoji-input-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "Emoji seç veya gir",
                value: newReactionRole.emoji,
                onChange: /* @__PURE__ */ __name((e) => setNewReactionRole({ ...newReactionRole, emoji: e.target.value }), "onChange"),
                readOnly: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "emoji-picker-btn",
                onClick: /* @__PURE__ */ __name(() => setShowEmojiPicker(!showEmojiPicker), "onClick"),
                children: "😀"
              }
            )
          ] }),
          showEmojiPicker && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "emoji-picker", children: commonEmojis.map((emoji) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "emoji-option",
              onClick: /* @__PURE__ */ __name(() => {
                setNewReactionRole({ ...newReactionRole, emoji });
                setShowEmojiPicker(false);
              }, "onClick"),
              children: emoji
            },
            emoji
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group full-width", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Açıklama" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Bu rol için açıklama (opsiyonel)",
              value: newReactionRole.description,
              onChange: /* @__PURE__ */ __name((e) => setNewReactionRole({ ...newReactionRole, description: e.target.value }), "onChange")
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "create-btn", onClick: createReactionRole, children: "➕ Reaction Role Oluştur" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "actions-bar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-text", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "count-badge", children: reactionRoles.length }),
        " adet reaction role"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "sync-btn", onClick: syncReactionRoles, children: "🔄 Senkronize Et" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "reaction-roles-list", children: reactionRoles.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "empty-icon", children: "⭐" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz reaction role yok" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Kullanıcıların emoji ile rol almasını sağlayın" })
    ] }) : reactionRoles.map((rr) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reaction-role-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rr-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rr-emoji", children: rr.emoji }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rr-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: rr.role_name || `Role #${rr.role_id}` }),
          rr.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rr-description", children: rr.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "delete-btn", onClick: /* @__PURE__ */ __name(() => deleteReactionRole(rr.id), "onClick"), children: "🗑️" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rr-meta", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "meta-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "meta-label", children: "📢 Kanal:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "meta-value", children: rr.channel_name ? `#${rr.channel_name}` : "Belirtilmedi" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "meta-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "meta-label", children: "💬 Mesaj ID:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "meta-value mono", children: rr.message_id })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "meta-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "meta-label", children: "👥 Kullanımlar:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "meta-value", children: [
            rr.usage_count || 0,
            " kez kullanıldı"
          ] })
        ] })
      ] })
    ] }, rr.id)) })
  ] }) });
}, "ReactionRolesPanel");
export {
  ReactionRolesPanel as default
};
