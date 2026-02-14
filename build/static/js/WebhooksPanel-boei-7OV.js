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
function useWebhooks(serverId) {
  const [webhooks, setWebhooks] = reactExports.useState([]);
  const [creating, setCreating] = reactExports.useState(false);
  const [newWebhook, setNewWebhook] = reactExports.useState({ name: "", channel_id: "", avatar_url: "" });
  const [channels, setChannels] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [editingWebhook, setEditingWebhook] = reactExports.useState(null);
  const [logs, setLogs] = reactExports.useState([]);
  const [viewingLogs, setViewingLogs] = reactExports.useState(null);
  const apiBaseUrl = getApiBase();
  reactExports.useEffect(() => {
    if (!serverId) return;
    const token = localStorage.getItem("access_token");
    const headers = { "Authorization": `Bearer ${token}` };
    Promise.all([
      fetch(`${apiBaseUrl}/webhooks/server/${serverId}/`, { headers }).then((r) => r.ok ? r.json() : null),
      fetch(`${apiBaseUrl}/servers/${serverId}/channels/`, { headers }).then((r) => r.ok ? r.json() : null)
    ]).then(([whData, chData]) => {
      if (whData) setWebhooks(whData.webhooks || []);
      if (chData) setChannels(chData.channels || []);
    }).catch((err) => console.error("Error fetching data:", err)).finally(() => setLoading(false));
  }, [serverId, apiBaseUrl]);
  const authHeaders = /* @__PURE__ */ __name(() => {
    const token = localStorage.getItem("access_token");
    return { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" };
  }, "authHeaders");
  const createWebhook = /* @__PURE__ */ __name(async () => {
    if (!newWebhook.name || !newWebhook.channel_id) {
      y.error("❌ Webhook adı ve kanal seçimi zorunludur");
      return;
    }
    try {
      const res = await fetch(`${apiBaseUrl}/webhooks/create/`, { method: "POST", headers: authHeaders(), body: JSON.stringify({ server_id: serverId, ...newWebhook }) });
      if (res.ok) {
        const d = await res.json();
        setWebhooks((p) => [...p, d.webhook]);
        setNewWebhook({ name: "", channel_id: "", avatar_url: "" });
        setCreating(false);
        y.success("✅ Webhook başarıyla oluşturuldu");
      } else y.error("❌ Webhook oluşturulamadı");
    } catch {
      y.error("❌ Bağlantı hatası");
    }
  }, "createWebhook");
  const updateWebhook = /* @__PURE__ */ __name(async (webhookId, updates) => {
    try {
      const res = await fetch(`${apiBaseUrl}/webhooks/${webhookId}/update/`, { method: "POST", headers: authHeaders(), body: JSON.stringify(updates) });
      if (res.ok) {
        const d = await res.json();
        setWebhooks((p) => p.map((w) => w.id === webhookId ? d.webhook : w));
        setEditingWebhook(null);
        y.success("✅ Webhook güncellendi");
      } else y.error("❌ Webhook güncellenemedi");
    } catch {
      y.error("❌ Bağlantı hatası");
    }
  }, "updateWebhook");
  const deleteWebhook = /* @__PURE__ */ __name(async (webhookId) => {
    if (!await confirmDialog("Bu webhook'u silmek istediğinizden emin misiniz?")) return;
    try {
      const res = await fetch(`${apiBaseUrl}/webhooks/${webhookId}/delete/`, { method: "DELETE", headers: authHeaders() });
      if (res.ok) {
        setWebhooks((p) => p.filter((w) => w.id !== webhookId));
        y.success("✅ Webhook silindi");
      } else y.error("❌ Webhook silinemedi");
    } catch {
      y.error("❌ Bağlantı hatası");
    }
  }, "deleteWebhook");
  const testWebhook = /* @__PURE__ */ __name(async (webhookId) => {
    try {
      const res = await fetch(`${apiBaseUrl}/webhooks/${webhookId}/test/`, { method: "POST", headers: authHeaders() });
      res.ok ? y.success("✅ Test mesajı gönderildi") : y.error("❌ Test mesajı gönderilemedi");
    } catch {
      y.error("❌ Bağlantı hatası");
    }
  }, "testWebhook");
  const regenerateToken = /* @__PURE__ */ __name(async (webhookId) => {
    if (!await confirmDialog("Webhook tokenini yenilemek istediğinizden emin misiniz? Eski token geçersiz hale gelecek.")) return;
    try {
      const res = await fetch(`${apiBaseUrl}/webhooks/${webhookId}/regenerate-token/`, { method: "POST", headers: authHeaders() });
      if (res.ok) {
        const d = await res.json();
        setWebhooks((p) => p.map((w) => w.id === webhookId ? { ...w, token: d.token } : w));
        y.success("✅ Token yenilendi");
      } else y.error("❌ Token yenilenemedi");
    } catch {
      y.error("❌ Bağlantı hatası");
    }
  }, "regenerateToken");
  const fetchWebhookLogs = /* @__PURE__ */ __name(async (webhookId) => {
    try {
      const res = await fetch(`${apiBaseUrl}/webhooks/${webhookId}/logs/`, { headers: authHeaders() });
      if (res.ok) {
        const d = await res.json();
        setLogs(d.logs || []);
        setViewingLogs(webhookId);
      }
    } catch {
      y.error("❌ Loglar yüklenemedi");
    }
  }, "fetchWebhookLogs");
  const copyWebhookUrl = /* @__PURE__ */ __name((webhook) => {
    navigator.clipboard.writeText(`${apiBaseUrl}/webhooks/${webhook.id}/${webhook.token}`);
    y.success("✅ Webhook URL kopyalandı");
  }, "copyWebhookUrl");
  return {
    webhooks,
    creating,
    setCreating,
    newWebhook,
    setNewWebhook,
    channels,
    loading,
    editingWebhook,
    setEditingWebhook,
    logs,
    viewingLogs,
    setViewingLogs,
    apiBaseUrl,
    createWebhook,
    updateWebhook,
    deleteWebhook,
    testWebhook,
    regenerateToken,
    fetchWebhookLogs,
    copyWebhookUrl
  };
}
__name(useWebhooks, "useWebhooks");
const WebhooksPanel = /* @__PURE__ */ __name(({ serverId, onClose }) => {
  const w = useWebhooks(serverId);
  if (w.loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "webhooks-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "webhooks-panel", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Webhooklar yükleniyor..." })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "webhooks-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "webhooks-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "webhooks-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        "🔗",
        " Webhook Yönetimi"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "webhooks-content", children: [
      !w.creating && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "create-webhook-btn", onClick: /* @__PURE__ */ __name(() => w.setCreating(true), "onClick"), children: [
        "➕",
        " Yeni Webhook Oluştur"
      ] }),
      w.creating && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "create-webhook-form", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Yeni Webhook" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Webhook Adı *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Örn: GitHub Bot", value: w.newWebhook.name, onChange: /* @__PURE__ */ __name((e) => w.setNewWebhook({ ...w.newWebhook, name: e.target.value }), "onChange") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Kanal *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: w.newWebhook.channel_id, onChange: /* @__PURE__ */ __name((e) => w.setNewWebhook({ ...w.newWebhook, channel_id: e.target.value }), "onChange"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Kanal seçin..." }),
            w.channels.map((ch) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: ch.id, children: [
              "#",
              ch.name
            ] }, ch.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Avatar URL (Opsiyonel)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "https://example.com/avatar.png", value: w.newWebhook.avatar_url, onChange: /* @__PURE__ */ __name((e) => w.setNewWebhook({ ...w.newWebhook, avatar_url: e.target.value }), "onChange") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "cancel-btn", onClick: /* @__PURE__ */ __name(() => w.setCreating(false), "onClick"), children: "İptal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "submit-btn", onClick: w.createWebhook, children: "Oluştur" })
        ] })
      ] }),
      w.webhooks.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "webhooks-list", children: w.webhooks.map((wh) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "webhook-card", children: w.editingWebhook === wh.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "edit-webhook-form", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Webhook Adı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", defaultValue: wh.name, id: `edit-name-${wh.id}` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Kanal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { defaultValue: wh.channel_id, id: `edit-channel-${wh.id}`, children: w.channels.map((ch) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: ch.id, children: [
            "#",
            ch.name
          ] }, ch.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Avatar URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", defaultValue: wh.avatar_url || "", id: `edit-avatar-${wh.id}` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "cancel-btn", onClick: /* @__PURE__ */ __name(() => w.setEditingWebhook(null), "onClick"), children: "İptal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "submit-btn", onClick: /* @__PURE__ */ __name(() => w.updateWebhook(wh.id, { name: document.getElementById(`edit-name-${wh.id}`).value, channel_id: document.getElementById(`edit-channel-${wh.id}`).value, avatar_url: document.getElementById(`edit-avatar-${wh.id}`).value }), "onClick"), children: "Kaydet" })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "webhook-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "webhook-avatar", children: wh.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: wh.avatar_url, alt: wh.name }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "default-avatar", children: "🔗" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "webhook-details", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: wh.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "#",
              w.channels.find((c) => c.id === wh.channel_id)?.name || "Bilinmeyen Kanal"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "webhook-id", children: [
              "ID: ",
              wh.id
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "webhook-url", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Webhook URL:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "url-display", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: `${w.apiBaseUrl}/webhooks/${wh.id}/${wh.token}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "copy-btn", onClick: /* @__PURE__ */ __name(() => w.copyWebhookUrl(wh), "onClick"), title: "URL'yi kopyala", children: "📋" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "webhook-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "action-btn test-btn", onClick: /* @__PURE__ */ __name(() => w.testWebhook(wh.id), "onClick"), title: "Test mesajı gönder", children: [
            "🧪",
            " Test"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "action-btn logs-btn", onClick: /* @__PURE__ */ __name(() => w.fetchWebhookLogs(wh.id), "onClick"), title: "Logları görüntüle", children: [
            "📊",
            " Loglar"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "action-btn edit-btn", onClick: /* @__PURE__ */ __name(() => w.setEditingWebhook(wh.id), "onClick"), title: "Düzenle", children: "✏️" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "action-btn regenerate-btn", onClick: /* @__PURE__ */ __name(() => w.regenerateToken(wh.id), "onClick"), title: "Token yenile", children: "🔄" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "action-btn delete-btn", onClick: /* @__PURE__ */ __name(() => w.deleteWebhook(wh.id), "onClick"), title: "Sil", children: "🗑️" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "webhook-stats", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Toplam Çağrı:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: wh.total_calls || 0 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Başarılı:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value success", children: wh.successful_calls || 0 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Başarısız:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value error", children: wh.failed_calls || 0 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Son Çağrı:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: wh.last_call ? new Date(wh.last_call).toLocaleString("tr-TR") : "Hiç" })
          ] })
        ] })
      ] }) }, wh.id)) }) : !w.creating && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-icon", children: "🔗" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Henüz webhook yok" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Dış uygulamalardan mesaj göndermek için webhook oluşturun" })
      ] }),
      w.viewingLogs && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "logs-modal", onClick: /* @__PURE__ */ __name(() => w.setViewingLogs(null), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "logs-content", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "logs-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
            "📊",
            " Webhook Logları"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: /* @__PURE__ */ __name(() => w.setViewingLogs(null), "onClick"), children: "×" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "logs-list", children: w.logs.length > 0 ? w.logs.map((log, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `log-item ${log.status}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "log-time", children: new Date(log.timestamp).toLocaleString("tr-TR") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "log-status", children: [
            log.status === "success" ? "✅" : "❌",
            " ",
            log.status
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "log-message", children: log.message }),
          log.error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "log-error", children: [
            "Hata: ",
            log.error
          ] })
        ] }, i)) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "empty-state", children: "Henüz log kaydı yok" }) })
      ] }) })
    ] })
  ] }) });
}, "WebhooksPanel");
export {
  WebhooksPanel as default
};
