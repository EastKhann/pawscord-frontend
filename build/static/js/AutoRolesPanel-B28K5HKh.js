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
const AutoRolesPanel = /* @__PURE__ */ __name(({ serverId, onClose }) => {
  const apiBaseUrl = getApiBase();
  const [autoRoles, setAutoRoles] = reactExports.useState([]);
  const [roles, setRoles] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [newAutoRole, setNewAutoRole] = reactExports.useState({
    role_id: "",
    trigger_type: "on_join",
    delay: 0,
    required_level: 0,
    required_invites: 0,
    required_messages: 0,
    remove_after: 0,
    enabled: true
  });
  const triggerTypes = [
    { value: "on_join", label: "Sunucuya Katılınca", icon: "👋" },
    { value: "on_verify", label: "Doğrulama Sonrası", icon: "✅" },
    { value: "on_level", label: "Seviyeye Ulaşınca", icon: "⭐" },
    { value: "on_invites", label: "Davet Sayısı", icon: "👥" },
    { value: "on_messages", label: "Mesaj Sayısı", icon: "💬" },
    { value: "on_reaction", label: "Reaksiyon Verince", icon: "😀" },
    { value: "on_boost", label: "Sunucu Boost", icon: "🚀" }
  ];
  reactExports.useEffect(() => {
    fetchAutoRoles();
    fetchRoles();
  }, [serverId]);
  const fetchAutoRoles = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/auto-roles/server/${serverId}/`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setAutoRoles(data);
      }
    } catch (error) {
      console.error("Error fetching auto roles:", error);
    } finally {
      setLoading(false);
    }
  }, "fetchAutoRoles");
  const fetchRoles = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/roles/server/${serverId}/`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setRoles(data);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }, "fetchRoles");
  const createAutoRole = /* @__PURE__ */ __name(async () => {
    if (!newAutoRole.role_id) {
      y.error("❌ Lütfen rol seçin");
      return;
    }
    try {
      const response = await fetch(`${apiBaseUrl}/auto-roles/create/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          server_id: serverId,
          ...newAutoRole
        })
      });
      if (response.ok) {
        y.success("✅ Otomatik rol oluşturuldu");
        fetchAutoRoles();
        setNewAutoRole({
          role_id: "",
          trigger_type: "on_join",
          delay: 0,
          required_level: 0,
          required_invites: 0,
          required_messages: 0,
          remove_after: 0,
          enabled: true
        });
      } else {
        y.error("❌ Otomatik rol oluşturulamadı");
      }
    } catch (error) {
      console.error("Error creating auto role:", error);
      y.error("❌ Bağlantı hatası");
    }
  }, "createAutoRole");
  const toggleAutoRole = /* @__PURE__ */ __name(async (autoRoleId, currentStatus) => {
    try {
      const response = await fetch(`${apiBaseUrl}/auto-roles/${autoRoleId}/toggle/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      if (response.ok) {
        y.success(currentStatus ? "✅ Otomatik rol devre dışı" : "✅ Otomatik rol aktif");
        fetchAutoRoles();
      } else {
        y.error("❌ Durum güncellenemedi");
      }
    } catch (error) {
      console.error("Error toggling auto role:", error);
      y.error("❌ Bağlantı hatası");
    }
  }, "toggleAutoRole");
  const deleteAutoRole = /* @__PURE__ */ __name(async (autoRoleId) => {
    if (!await confirmDialog("Otomatik rolü silmek istediğinize emin misiniz?")) return;
    try {
      const response = await fetch(`${apiBaseUrl}/auto-roles/${autoRoleId}/delete/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      if (response.ok) {
        y.success("✅ Otomatik rol silindi");
        fetchAutoRoles();
      } else {
        y.error("❌ Otomatik rol silinemedi");
      }
    } catch (error) {
      console.error("Error deleting auto role:", error);
      y.error("❌ Bağlantı hatası");
    }
  }, "deleteAutoRole");
  const getRoleName = /* @__PURE__ */ __name((roleId) => {
    const role = roles.find((r) => r.id === roleId);
    return role ? role.name : "Bilinmeyen Rol";
  }, "getRoleName");
  const getTriggerLabel = /* @__PURE__ */ __name((type) => {
    const trigger = triggerTypes.find((t) => t.value === type);
    return trigger ? trigger.label : type;
  }, "getTriggerLabel");
  const getTriggerIcon = /* @__PURE__ */ __name((type) => {
    const trigger = triggerTypes.find((t) => t.value === type);
    return trigger ? trigger.icon : "⚙️";
  }, "getTriggerIcon");
  const formatDelay = /* @__PURE__ */ __name((seconds) => {
    if (seconds === 0) return "Anında";
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours > 0) return `${hours} saat`;
    return `${minutes} dakika`;
  }, "formatDelay");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "autoroles-panel-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "autoroles-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "autoroles-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "⚡ Otomatik Roller" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "autoroles-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "create-autorole-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Yeni Otomatik Rol Ekle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "create-form", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Rol *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  value: newAutoRole.role_id,
                  onChange: /* @__PURE__ */ __name((e) => setNewAutoRole({ ...newAutoRole, role_id: e.target.value }), "onChange"),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Rol Seçin" }),
                    roles.map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: role.id, children: role.name }, role.id))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Tetikleyici" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "select",
                {
                  value: newAutoRole.trigger_type,
                  onChange: /* @__PURE__ */ __name((e) => setNewAutoRole({ ...newAutoRole, trigger_type: e.target.value }), "onChange"),
                  children: triggerTypes.map((trigger) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: trigger.value, children: [
                    trigger.icon,
                    " ",
                    trigger.label
                  ] }, trigger.value))
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Gecikme (Saniye)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  min: "0",
                  placeholder: "0 = Anında",
                  value: newAutoRole.delay,
                  onChange: /* @__PURE__ */ __name((e) => setNewAutoRole({ ...newAutoRole, delay: parseInt(e.target.value) || 0 }), "onChange")
                }
              )
            ] }),
            newAutoRole.trigger_type === "on_level" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Gerekli Seviye" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  min: "1",
                  value: newAutoRole.required_level,
                  onChange: /* @__PURE__ */ __name((e) => setNewAutoRole({ ...newAutoRole, required_level: parseInt(e.target.value) || 0 }), "onChange")
                }
              )
            ] }),
            newAutoRole.trigger_type === "on_invites" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Gerekli Davet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  min: "1",
                  value: newAutoRole.required_invites,
                  onChange: /* @__PURE__ */ __name((e) => setNewAutoRole({ ...newAutoRole, required_invites: parseInt(e.target.value) || 0 }), "onChange")
                }
              )
            ] }),
            newAutoRole.trigger_type === "on_messages" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Gerekli Mesaj" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  min: "1",
                  value: newAutoRole.required_messages,
                  onChange: /* @__PURE__ */ __name((e) => setNewAutoRole({ ...newAutoRole, required_messages: parseInt(e.target.value) || 0 }), "onChange")
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Otomatik Kaldır (Saat)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  min: "0",
                  placeholder: "0 = Hiçbir zaman",
                  value: newAutoRole.remove_after,
                  onChange: /* @__PURE__ */ __name((e) => setNewAutoRole({ ...newAutoRole, remove_after: parseInt(e.target.value) || 0 }), "onChange")
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "create-btn", onClick: createAutoRole, children: "⚡ Otomatik Rol Oluştur" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "autoroles-list-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
          "Aktif Otomatik Roller (",
          autoRoles.length,
          ")"
        ] }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Otomatik roller yükleniyor..." })
        ] }) : autoRoles.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "empty-icon", children: "⚡" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz otomatik rol yok" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "empty-hint", children: "Kullanıcılara otomatik rol atamaları yapabilirsiniz" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "autoroles-list", children: autoRoles.map((autoRole) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `autorole-card ${!autoRole.enabled ? "disabled" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "autorole-card-header", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "role-info", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "trigger-icon", children: getTriggerIcon(autoRole.trigger_type) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: getRoleName(autoRole.role_id) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "trigger-label", children: getTriggerLabel(autoRole.trigger_type) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "autorole-actions", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: `toggle-btn ${autoRole.enabled ? "active" : ""}`,
                  onClick: /* @__PURE__ */ __name(() => toggleAutoRole(autoRole.id, autoRole.enabled), "onClick"),
                  children: autoRole.enabled ? "✓" : "○"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "delete-btn",
                  onClick: /* @__PURE__ */ __name(() => deleteAutoRole(autoRole.id), "onClick"),
                  children: "🗑️"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "autorole-details", children: [
            autoRole.delay > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-item", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "detail-icon", children: "⏱️" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Gecikme: ",
                formatDelay(autoRole.delay)
              ] })
            ] }),
            autoRole.required_level > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-item", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "detail-icon", children: "⭐" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Seviye ",
                autoRole.required_level,
                " gerekli"
              ] })
            ] }),
            autoRole.required_invites > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-item", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "detail-icon", children: "👥" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                autoRole.required_invites,
                " davet gerekli"
              ] })
            ] }),
            autoRole.required_messages > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-item", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "detail-icon", children: "💬" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                autoRole.required_messages,
                " mesaj gerekli"
              ] })
            ] }),
            autoRole.remove_after > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-item", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "detail-icon", children: "🔄" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                autoRole.remove_after,
                " saat sonra kaldırılır"
              ] })
            ] }),
            autoRole.uses_count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-item", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "detail-icon", children: "📊" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                autoRole.uses_count,
                " kere kullanıldı"
              ] })
            ] })
          ] })
        ] }, autoRole.id)) })
      ] })
    ] })
  ] }) });
}, "AutoRolesPanel");
export {
  AutoRolesPanel as default
};
