var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { cg as FaTwitter, c0 as FaGoogle, cv as FaSlack, b_ as FaDiscord, bZ as FaYoutube, bX as FaTwitch, bU as FaSpotify, bY as FaGithub, cw as FaPlug, cx as FaCloud, a8 as FaGamepad, aK as FaMusic, q as FaCode, b$ as FaUnlink, a9 as FaCheck, c as FaSync, az as FaCog, j as FaLink, an as FaPlus, k as FaBell, a as FaTimes, t as FaSearch } from "./icons-vendor-2VDeY8fW.js";
import { y } from "./ui-vendor-iPoN0WGz.js";
import { d as confirmDialog } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
const integrationIcons = {
  github: FaGithub,
  spotify: FaSpotify,
  twitch: FaTwitch,
  youtube: FaYoutube,
  discord: FaDiscord,
  slack: FaSlack,
  google: FaGoogle,
  twitter: FaTwitter
};
const integrationColors = {
  github: "#333",
  spotify: "#1db954",
  twitch: "#9146ff",
  youtube: "#ff0000",
  discord: "#5865f2",
  slack: "#4a154b",
  google: "#4285f4",
  twitter: "#1da1f2"
};
const getCategoryIcon = /* @__PURE__ */ __name((category) => {
  switch (category) {
    case "development":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(FaCode, {});
    case "entertainment":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(FaMusic, {});
    case "streaming":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(FaGamepad, {});
    case "productivity":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(FaCloud, {});
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlug, {});
  }
}, "getCategoryIcon");
const useIntegrationHub = /* @__PURE__ */ __name((serverId) => {
  const [activeTab, setActiveTab] = reactExports.useState("connected");
  const [integrations, setIntegrations] = reactExports.useState([]);
  const [availableIntegrations, setAvailableIntegrations] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [configModal, setConfigModal] = reactExports.useState({ show: false, integration: null });
  const token = localStorage.getItem("access_token");
  reactExports.useEffect(() => {
    fetchIntegrations();
  }, [serverId]);
  const fetchIntegrations = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const [connectedRes, availableRes] = await Promise.all([
        fetch(`/api/servers/${serverId}/integrations/`, {
          headers: { "Authorization": `Bearer ${token}` }
        }),
        fetch(`/api/integrations/available/`, {
          headers: { "Authorization": `Bearer ${token}` }
        })
      ]);
      if (connectedRes.ok) {
        const data = await connectedRes.json();
        setIntegrations(data.integrations || []);
      }
      if (availableRes.ok) {
        const data = await availableRes.json();
        setAvailableIntegrations(data.integrations || []);
      } else {
        setAvailableIntegrations([]);
      }
    } catch (error) {
      console.error("Error fetching integrations:", error);
      setAvailableIntegrations([]);
    }
    setLoading(false);
  }, "fetchIntegrations");
  const handleConnect = /* @__PURE__ */ __name(async (integrationId) => {
    try {
      const response = await fetch(`/api/servers/${serverId}/integrations/connect/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ integration_type: integrationId })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.oauth_url) {
          window.open(data.oauth_url, "_blank", "width=500,height=600");
        }
        y.success(`${integrationId} entegrasyon başlatıldı`);
        fetchIntegrations();
      } else {
        y.error("Bağlantı başlatılamadı");
      }
    } catch (error) {
      y.error("Bağlantı hatası");
    }
  }, "handleConnect");
  const handleDisconnect = /* @__PURE__ */ __name(async (integrationId) => {
    if (!await confirmDialog("Bu entegrasyonu kaldırmak istediğinize emin misiniz?")) return;
    try {
      const response = await fetch(`/api/servers/${serverId}/integrations/${integrationId}/disconnect/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        y.success("Entegrasyon kaldırıldı");
        fetchIntegrations();
      }
    } catch (error) {
      y.error("Entegrasyon kaldırılamadı");
    }
  }, "handleDisconnect");
  const handleSync = /* @__PURE__ */ __name(async (integrationId) => {
    try {
      const response = await fetch(`/api/servers/${serverId}/integrations/${integrationId}/sync/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        y.success("Senkronizasyon başlatıldı");
      }
    } catch (error) {
      y.error("Senkronizasyon başarısız");
    }
  }, "handleSync");
  const filteredAvailable = availableIntegrations.filter(
    (int) => int.name.toLowerCase().includes(searchTerm.toLowerCase()) || int.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const connectedIds = integrations.map((i) => i.type);
  const notConnected = filteredAvailable.filter((a) => !connectedIds.includes(a.id));
  return {
    activeTab,
    setActiveTab,
    integrations,
    notConnected,
    loading,
    searchTerm,
    setSearchTerm,
    configModal,
    setConfigModal,
    token,
    handleConnect,
    handleDisconnect,
    handleSync,
    fetchIntegrations
  };
}, "useIntegrationHub");
const ConnectedIntegrations = /* @__PURE__ */ __name(({ integrations, icons, colors, onDisconnect, onSync, onConfigure }) => {
  if (integrations.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaUnlink, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz bağlı entegrasyon yok" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hint", children: '"Mevcut" sekmesinden entegrasyon ekleyin' })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "connected-list", children: integrations.map((integration) => {
    const Icon = icons[integration.type] || FaPlug;
    const color = colors[integration.type] || "#666";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "integration-card connected", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "integration-icon", style: { background: color }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "integration-info", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: integration.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "connection-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "status connected", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, {}),
            " Bağlı"
          ] }),
          integration.account_name && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "account", children: [
            "@",
            integration.account_name
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "last-sync", children: [
          "Son senkronizasyon: ",
          integration.last_sync || "Hiç"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "integration-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "action-btn sync", onClick: /* @__PURE__ */ __name(() => onSync(integration.id), "onClick"), title: "Senkronize Et", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaSync, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "action-btn config", onClick: /* @__PURE__ */ __name(() => onConfigure(integration), "onClick"), title: "Ayarlar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCog, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "action-btn disconnect", onClick: /* @__PURE__ */ __name(() => onDisconnect(integration.id), "onClick"), title: "Bağlantıyı Kes", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUnlink, {}) })
      ] })
    ] }, integration.id);
  }) });
}, "ConnectedIntegrations");
const AvailableIntegrations = /* @__PURE__ */ __name(({ integrations, icons, colors, getCategoryIcon: getCategoryIcon2, onConnect }) => {
  const categories = [...new Set(integrations.map((i) => i.category))];
  if (integrations.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlug, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Tüm entegrasyonlar zaten bağlı" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "available-list", children: categories.map((category) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "category-section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "category-title", children: [
      getCategoryIcon2(category),
      category === "development" && "Geliştirme",
      category === "entertainment" && "Eğlence",
      category === "streaming" && "Yayın",
      category === "productivity" && "Üretkenlik",
      category === "content" && "İçerik",
      category === "social" && "Sosyal"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "integrations-grid", children: integrations.filter((i) => i.category === category).map((integration) => {
      const Icon = icons[integration.id] || FaPlug;
      const color = colors[integration.id] || "#666";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "integration-card available", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "integration-icon", style: { background: color }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "integration-details", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: integration.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: integration.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "features", children: integration.features?.slice(0, 3).map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, {}),
            " ",
            f
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "connect-btn", onClick: /* @__PURE__ */ __name(() => onConnect(integration.id), "onClick"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaLink, {}),
          " Bağla"
        ] })
      ] }, integration.id);
    }) })
  ] }, category)) });
}, "AvailableIntegrations");
const CreateWebhookModal = /* @__PURE__ */ __name(({ serverId, token, onClose, onCreated }) => {
  const [name, setName] = reactExports.useState("");
  const [channelId, setChannelId] = reactExports.useState("");
  const [channels, setChannels] = reactExports.useState([]);
  reactExports.useEffect(() => {
    fetch(`/api/servers/${serverId}/channels/`, {
      headers: { "Authorization": `Bearer ${token}` }
    }).then((res) => res.json()).then((data) => setChannels(data.channels || [])).catch(() => {
    });
  }, []);
  const handleCreate = /* @__PURE__ */ __name(async () => {
    if (!name || !channelId) {
      y.warning("Tüm alanları doldurun");
      return;
    }
    try {
      const response = await fetch(`/api/servers/${serverId}/webhooks/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, channel_id: channelId })
      });
      if (response.ok) {
        y.success("Webhook oluşturuldu");
        onCreated();
      }
    } catch (error) {
      y.error("Webhook oluşturulamadı");
    }
  }, "handleCreate");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-overlay", onClick: /* @__PURE__ */ __name((e) => e.target.className === "modal-overlay" && onClose(), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "webhook-modal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
      " Yeni Webhook Oluştur"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Webhook Adı" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: name,
          onChange: /* @__PURE__ */ __name((e) => setName(e.target.value), "onChange"),
          placeholder: "örn: GitHub Bot"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Kanal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: channelId, onChange: /* @__PURE__ */ __name((e) => setChannelId(e.target.value), "onChange"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Kanal seçin..." }),
        channels.map((ch) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: ch.id, children: [
          "#",
          ch.name
        ] }, ch.id))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-actions", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "cancel-btn", onClick: onClose, children: "İptal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "create-btn", onClick: handleCreate, children: "Oluştur" })
    ] })
  ] }) });
}, "CreateWebhookModal");
const WebhooksView = /* @__PURE__ */ __name(({ serverId, token }) => {
  const [webhooks, setWebhooks] = reactExports.useState([]);
  const [showCreateModal, setShowCreateModal] = reactExports.useState(false);
  reactExports.useEffect(() => {
    fetchWebhooks();
  }, []);
  const fetchWebhooks = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`/api/servers/${serverId}/webhooks/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setWebhooks(data.webhooks || []);
      }
    } catch (error) {
      console.error("Error fetching webhooks:", error);
    }
  }, "fetchWebhooks");
  const handleDeleteWebhook = /* @__PURE__ */ __name(async (webhookId) => {
    if (!await confirmDialog("Bu webhook'u silmek istediğinize emin misiniz?")) return;
    try {
      const response = await fetch(`/api/servers/${serverId}/webhooks/${webhookId}/`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        y.success("Webhook silindi");
        fetchWebhooks();
      }
    } catch (error) {
      y.error("Webhook silinemedi");
    }
  }, "handleDeleteWebhook");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "webhooks-view", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "webhooks-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Webhooks ile dış servislerden otomatik mesajlar alın" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "create-webhook-btn", onClick: /* @__PURE__ */ __name(() => setShowCreateModal(true), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
        " Yeni Webhook"
      ] })
    ] }),
    webhooks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaBell, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz webhook oluşturulmamış" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "webhooks-list", children: webhooks.map((webhook) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "webhook-item", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "webhook-avatar", children: webhook.avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: webhook.avatar, alt: "" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaBell, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "webhook-info", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: webhook.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "webhook-channel", children: [
          "#",
          webhook.channel_name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "webhook-url", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { children: [
            webhook.url.substring(0, 40),
            "..."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => {
            navigator.clipboard.writeText(webhook.url);
            y.success("URL kopyalandı");
          }, "onClick"), children: "Kopyala" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "webhook-actions", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "action-btn delete", onClick: /* @__PURE__ */ __name(() => handleDeleteWebhook(webhook.id), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) }) })
    ] }, webhook.id)) }),
    showCreateModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateWebhookModal,
      {
        serverId,
        token,
        onClose: /* @__PURE__ */ __name(() => setShowCreateModal(false), "onClose"),
        onCreated: /* @__PURE__ */ __name(() => {
          fetchWebhooks();
          setShowCreateModal(false);
        }, "onCreated")
      }
    )
  ] });
}, "WebhooksView");
const ConfigurationModal = /* @__PURE__ */ __name(({ integration, serverId, token, onClose, onSave }) => {
  const [config, setConfig] = reactExports.useState({
    notifications_enabled: true,
    notification_channel: "",
    auto_sync: true,
    sync_interval: 30
  });
  const handleSave = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`/api/servers/${serverId}/integrations/${integration.id}/configure/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(config)
      });
      if (response.ok) {
        y.success("Ayarlar kaydedildi");
        onSave();
        onClose();
      }
    } catch (error) {
      y.error("Ayarlar kaydedilemedi");
    }
  }, "handleSave");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-overlay", onClick: /* @__PURE__ */ __name((e) => e.target.className === "modal-overlay" && onClose(), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "config-modal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaCog, {}),
      " ",
      integration.name,
      " Ayarları"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "config-section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "checkbox-label", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "checkbox",
          checked: config.notifications_enabled,
          onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, notifications_enabled: e.target.checked }), "onChange")
        }
      ),
      "Bildirimleri Etkinleştir"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "config-section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "checkbox-label", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "checkbox",
          checked: config.auto_sync,
          onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, auto_sync: e.target.checked }), "onChange")
        }
      ),
      "Otomatik Senkronizasyon"
    ] }) }),
    config.auto_sync && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Senkronizasyon Aralığı (dakika)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "number",
          value: config.sync_interval,
          onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, sync_interval: parseInt(e.target.value) }), "onChange"),
          min: 5,
          max: 1440
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-actions", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "cancel-btn", onClick: onClose, children: "İptal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "save-btn", onClick: handleSave, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, {}),
        " Kaydet"
      ] })
    ] })
  ] }) });
}, "ConfigurationModal");
const IntegrationHubPanel = /* @__PURE__ */ __name(({ serverId, onClose }) => {
  const {
    activeTab,
    setActiveTab,
    integrations,
    notConnected,
    loading,
    searchTerm,
    setSearchTerm,
    configModal,
    setConfigModal,
    token,
    handleConnect,
    handleDisconnect,
    handleSync,
    fetchIntegrations
  } = useIntegrationHub(serverId);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "integration-hub-overlay", onClick: /* @__PURE__ */ __name((e) => e.target.className === "integration-hub-overlay" && onClose(), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "integration-hub-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlug, {}),
        " Entegrasyon Merkezi"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tabs-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `tab ${activeTab === "connected" ? "active" : ""}`, onClick: /* @__PURE__ */ __name(() => setActiveTab("connected"), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaLink, {}),
        " Bağlı (",
        integrations.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `tab ${activeTab === "available" ? "active" : ""}`, onClick: /* @__PURE__ */ __name(() => setActiveTab("available"), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
        " Mevcut (",
        notConnected.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `tab ${activeTab === "webhooks" ? "active" : ""}`, onClick: /* @__PURE__ */ __name(() => setActiveTab("webhooks"), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaBell, {}),
        " Webhooks"
      ] })
    ] }) }),
    activeTab === "available" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "search-bar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaSearch, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Entegrasyon ara...",
          value: searchTerm,
          onChange: /* @__PURE__ */ __name((e) => setSearchTerm(e.target.value), "onChange")
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-content", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading", children: "Yükleniyor..." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      activeTab === "connected" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        ConnectedIntegrations,
        {
          integrations,
          icons: integrationIcons,
          colors: integrationColors,
          onDisconnect: handleDisconnect,
          onSync: handleSync,
          onConfigure: /* @__PURE__ */ __name((int) => setConfigModal({ show: true, integration: int }), "onConfigure")
        }
      ),
      activeTab === "available" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        AvailableIntegrations,
        {
          integrations: notConnected,
          icons: integrationIcons,
          colors: integrationColors,
          getCategoryIcon,
          onConnect: handleConnect
        }
      ),
      activeTab === "webhooks" && /* @__PURE__ */ jsxRuntimeExports.jsx(WebhooksView, { serverId, token })
    ] }) }),
    configModal.show && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfigurationModal,
      {
        integration: configModal.integration,
        serverId,
        token,
        onClose: /* @__PURE__ */ __name(() => setConfigModal({ show: false, integration: null }), "onClose"),
        onSave: fetchIntegrations
      }
    )
  ] }) });
}, "IntegrationHubPanel");
export {
  IntegrationHubPanel as default
};
