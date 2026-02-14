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
const DEFAULT_COMMAND = {
  name: "",
  description: "",
  response: "",
  trigger_type: "exact",
  enabled: true,
  cooldown: 0,
  permissions: "everyone",
  delete_trigger: false,
  embed: false,
  embed_color: "#5865f2"
};
function useCustomCommands(serverId) {
  const [commands, setCommands] = reactExports.useState([]);
  const [creating, setCreating] = reactExports.useState(false);
  const [editingCommand, setEditingCommand] = reactExports.useState(null);
  const [newCommand, setNewCommand] = reactExports.useState(DEFAULT_COMMAND);
  const [loading, setLoading] = reactExports.useState(true);
  const [stats, setStats] = reactExports.useState(null);
  const apiBaseUrl = getApiBase();
  reactExports.useEffect(() => {
    if (serverId) {
      fetchCommands();
      fetchStats();
    }
  }, [serverId]);
  const getToken = /* @__PURE__ */ __name(() => localStorage.getItem("access_token"), "getToken");
  const authHeaders = /* @__PURE__ */ __name(() => ({ "Authorization": `Bearer ${getToken()}` }), "authHeaders");
  const jsonHeaders = /* @__PURE__ */ __name(() => ({ ...authHeaders(), "Content-Type": "application/json" }), "jsonHeaders");
  const fetchCommands = /* @__PURE__ */ __name(async () => {
    try {
      const r = await fetch(`${apiBaseUrl}/commands/server/${serverId}/`, { headers: authHeaders() });
      if (r.ok) {
        const d = await r.json();
        setCommands(d.commands || []);
      }
    } catch (e) {
      console.error("Error fetching commands:", e);
    } finally {
      setLoading(false);
    }
  }, "fetchCommands");
  const fetchStats = /* @__PURE__ */ __name(async () => {
    try {
      const r = await fetch(`${apiBaseUrl}/commands/server/${serverId}/stats/`, { headers: authHeaders() });
      if (r.ok) setStats(await r.json());
    } catch (e) {
      console.error("Error fetching stats:", e);
    }
  }, "fetchStats");
  const createCommand = /* @__PURE__ */ __name(async () => {
    if (!newCommand.name || !newCommand.response) {
      y.error("❌ Komut adı ve yanıt zorunludur");
      return;
    }
    try {
      const r = await fetch(`${apiBaseUrl}/commands/create/`, { method: "POST", headers: jsonHeaders(), body: JSON.stringify({ server_id: serverId, ...newCommand }) });
      if (r.ok) {
        const d = await r.json();
        setCommands((prev) => [...prev, d.command]);
        setNewCommand(DEFAULT_COMMAND);
        setCreating(false);
        y.success("✅ Komut oluşturuldu");
        fetchStats();
      } else y.error("❌ Komut oluşturulamadı");
    } catch (e) {
      console.error("Error creating command:", e);
      y.error("❌ Bağlantı hatası");
    }
  }, "createCommand");
  const updateCommand = /* @__PURE__ */ __name(async (commandId, updates) => {
    try {
      const r = await fetch(`${apiBaseUrl}/commands/${commandId}/update/`, { method: "POST", headers: jsonHeaders(), body: JSON.stringify(updates) });
      if (r.ok) {
        const d = await r.json();
        setCommands((prev) => prev.map((c) => c.id === commandId ? d.command : c));
        setEditingCommand(null);
        y.success("✅ Komut güncellendi");
      } else y.error("❌ Komut güncellenemedi");
    } catch (e) {
      console.error("Error updating command:", e);
      y.error("❌ Bağlantı hatası");
    }
  }, "updateCommand");
  const deleteCommand = /* @__PURE__ */ __name(async (commandId) => {
    if (!await confirmDialog("Bu komutu silmek istediğinizden emin misiniz?")) return;
    try {
      const r = await fetch(`${apiBaseUrl}/commands/${commandId}/delete/`, { method: "DELETE", headers: authHeaders() });
      if (r.ok) {
        setCommands((prev) => prev.filter((c) => c.id !== commandId));
        y.success("✅ Komut silindi");
        fetchStats();
      } else y.error("❌ Komut silinemedi");
    } catch (e) {
      console.error("Error deleting command:", e);
      y.error("❌ Bağlantı hatası");
    }
  }, "deleteCommand");
  const toggleCommand = /* @__PURE__ */ __name(async (commandId, enabled) => {
    try {
      const r = await fetch(`${apiBaseUrl}/commands/${commandId}/toggle/`, { method: "POST", headers: jsonHeaders(), body: JSON.stringify({ enabled }) });
      if (r.ok) {
        setCommands((prev) => prev.map((c) => c.id === commandId ? { ...c, enabled } : c));
        y.success(`✅ Komut ${enabled ? "etkinleştirildi" : "devre dışı bırakıldı"}`);
      }
    } catch (e) {
      console.error("Error toggling command:", e);
      y.error("❌ İşlem başarısız");
    }
  }, "toggleCommand");
  const exportCommands = /* @__PURE__ */ __name(async () => {
    try {
      const r = await fetch(`${apiBaseUrl}/commands/server/${serverId}/export/`, { headers: authHeaders() });
      if (r.ok) {
        const blob = await r.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `commands_${serverId}.json`;
        a.click();
        y.success("✅ Komutlar dışa aktarıldı");
      }
    } catch (e) {
      console.error("Error exporting commands:", e);
      y.error("❌ Dışa aktarma başarısız");
    }
  }, "exportCommands");
  const importCommands = /* @__PURE__ */ __name(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("server_id", serverId);
    try {
      const r = await fetch(`${apiBaseUrl}/commands/import/`, { method: "POST", headers: authHeaders(), body: formData });
      if (r.ok) {
        fetchCommands();
        y.success("✅ Komutlar içe aktarıldı");
      } else y.error("❌ İçe aktarma başarısız");
    } catch (e) {
      console.error("Error importing commands:", e);
      y.error("❌ Bağlantı hatası");
    }
  }, "importCommands");
  return { commands, creating, setCreating, editingCommand, setEditingCommand, newCommand, setNewCommand, loading, stats, createCommand, updateCommand, deleteCommand, toggleCommand, exportCommands, importCommands };
}
__name(useCustomCommands, "useCustomCommands");
const CommandForm = /* @__PURE__ */ __name(({ newCommand, setNewCommand, createCommand, onCancel }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "command-form", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Yeni Komut Oluştur" }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-grid", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Komut Adı *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "!komut", value: newCommand.name, onChange: /* @__PURE__ */ __name((e) => setNewCommand({ ...newCommand, name: e.target.value }), "onChange") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Açıklama" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Komut açıklaması", value: newCommand.description, onChange: /* @__PURE__ */ __name((e) => setNewCommand({ ...newCommand, description: e.target.value }), "onChange") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group full-width", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Yanıt *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { placeholder: "Komut yanıtı (değişkenler: {user}, {server}, {channel})", value: newCommand.response, onChange: /* @__PURE__ */ __name((e) => setNewCommand({ ...newCommand, response: e.target.value }), "onChange"), rows: 3 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Tetikleme Tipi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: newCommand.trigger_type, onChange: /* @__PURE__ */ __name((e) => setNewCommand({ ...newCommand, trigger_type: e.target.value }), "onChange"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "exact", children: "Tam Eşleşme" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "contains", children: "İçerir" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "starts_with", children: "İle Başlar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "regex", children: "Regex" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "İzinler" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: newCommand.permissions, onChange: /* @__PURE__ */ __name((e) => setNewCommand({ ...newCommand, permissions: e.target.value }), "onChange"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "everyone", children: "Herkes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "mods", children: "Moderatörler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "admins", children: "Adminler" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Cooldown (saniye)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: "0", max: "300", value: newCommand.cooldown, onChange: /* @__PURE__ */ __name((e) => setNewCommand({ ...newCommand, cooldown: parseInt(e.target.value) }), "onChange") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "checkbox-label", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: newCommand.delete_trigger, onChange: /* @__PURE__ */ __name((e) => setNewCommand({ ...newCommand, delete_trigger: e.target.checked }), "onChange") }),
      "Tetikleyici mesajı sil"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "checkbox-label", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: newCommand.embed, onChange: /* @__PURE__ */ __name((e) => setNewCommand({ ...newCommand, embed: e.target.checked }), "onChange") }),
      "Embed olarak gönder"
    ] }) }),
    newCommand.embed && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Embed Rengi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: newCommand.embed_color, onChange: /* @__PURE__ */ __name((e) => setNewCommand({ ...newCommand, embed_color: e.target.value }), "onChange") })
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-actions", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "cancel-btn", onClick: onCancel, children: "İptal" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "submit-btn", onClick: createCommand, children: "Oluştur" })
  ] })
] }), "CommandForm");
const CustomCommandsPanel = /* @__PURE__ */ __name(({ serverId, onClose }) => {
  const { commands, creating, setCreating, newCommand, setNewCommand, loading, stats, createCommand, deleteCommand, toggleCommand, exportCommands, importCommands } = useCustomCommands(serverId);
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "custom-commands-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "custom-commands-panel", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Komutlar yükleniyor..." })
  ] }) }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "custom-commands-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "custom-commands-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "commands-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "⚡ Özel Komutlar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "commands-content", children: [
      stats && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats-overview", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: stats.total_commands || 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Toplam Komut" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: stats.enabled_commands || 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Aktif" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: stats.total_uses || 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Kullanım" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "action-buttons", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "create-btn", onClick: /* @__PURE__ */ __name(() => setCreating(true), "onClick"), children: "➕ Yeni Komut" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "export-btn", onClick: exportCommands, children: "📤 Dışa Aktar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "import-btn", children: [
          "📥 İçe Aktar",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: ".json", onChange: /* @__PURE__ */ __name((e) => e.target.files[0] && importCommands(e.target.files[0]), "onChange"), style: { display: "none" } })
        ] })
      ] }),
      creating && /* @__PURE__ */ jsxRuntimeExports.jsx(CommandForm, { newCommand, setNewCommand, createCommand, onCancel: /* @__PURE__ */ __name(() => setCreating(false), "onCancel") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "commands-list", children: commands.length > 0 ? commands.map((cmd) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `command-card ${!cmd.enabled ? "disabled" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "command-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "command-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: cmd.name }),
            cmd.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: cmd.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle-switch", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: cmd.enabled, onChange: /* @__PURE__ */ __name((e) => toggleCommand(cmd.id, e.target.checked), "onChange") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slider" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "command-response", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Yanıt:" }),
          " ",
          cmd.response
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "command-meta", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "meta-item", children: [
            "🎯 ",
            cmd.trigger_type
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "meta-item", children: [
            "👥 ",
            cmd.permissions
          ] }),
          cmd.cooldown > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "meta-item", children: [
            "⏱️ ",
            cmd.cooldown,
            "s"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "meta-item", children: [
            "📊 ",
            cmd.use_count || 0,
            " kullanım"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "command-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "edit-btn", onClick: /* @__PURE__ */ __name(() => {
          }, "onClick"), children: "✏️" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "delete-btn", onClick: /* @__PURE__ */ __name(() => deleteCommand(cmd.id), "onClick"), children: "🗑️" })
        ] })
      ] }, cmd.id)) : !creating && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-icon", children: "⚡" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Henüz özel komut yok" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Sunucunuz için özel komutlar oluşturun" })
      ] }) })
    ] })
  ] }) });
}, "CustomCommandsPanel");
export {
  CustomCommandsPanel as default
};
