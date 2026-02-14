var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { bl as FaBook, aV as FaCopy, B as FaRobot, an as FaPlus, a as FaTimes, aM as FaPause, aN as FaPlay, at as FaEdit, g as FaTrash, y as FaServer, O as FaChartLine, a2 as FaKey, $ as FaEyeSlash, a0 as FaEye, c as FaSync, j as FaLink, ao as FaRocket } from "./icons-vendor-2VDeY8fW.js";
import { t as toast, d as confirmDialog } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const DEFAULT_INTENTS = { messages: true, reactions: true, presence: false, members: false, voice: false };
const DEFAULT_FORM = { name: "", description: "", avatar_url: "", prefix: "!", is_public: false, intents: { ...DEFAULT_INTENTS } };
const webhookEventOptions = [
  { id: "message_create", label: "Mesaj Gönderildi" },
  { id: "message_edit", label: "Mesaj Düzenlendi" },
  { id: "message_delete", label: "Mesaj Silindi" },
  { id: "reaction_add", label: "Reaction Eklendi" },
  { id: "reaction_remove", label: "Reaction Kaldırıldı" },
  { id: "member_join", label: "Üye Katıldı" },
  { id: "member_leave", label: "Üye Ayrıldı" },
  { id: "voice_join", label: "Ses Kanalına Katıldı" },
  { id: "voice_leave", label: "Ses Kanalından Ayrıldı" }
];
const useBotPortal = /* @__PURE__ */ __name((apiBaseUrl) => {
  const [view, setView] = reactExports.useState("list");
  const [bots, setBots] = reactExports.useState([]);
  const [selectedBot, setSelectedBot] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [showToken, setShowToken] = reactExports.useState({});
  const [botForm, setBotForm] = reactExports.useState({ ...DEFAULT_FORM });
  const [showWebhookForm, setShowWebhookForm] = reactExports.useState(false);
  const [webhookUrl, setWebhookUrl] = reactExports.useState("");
  const [webhookEvents, setWebhookEvents] = reactExports.useState([]);
  reactExports.useEffect(() => {
    fetchBots();
  }, []);
  const getToken = /* @__PURE__ */ __name(() => localStorage.getItem("access_token"), "getToken");
  const authHeaders = /* @__PURE__ */ __name(() => ({ "Authorization": `Bearer ${getToken()}` }), "authHeaders");
  const jsonHeaders = /* @__PURE__ */ __name(() => ({ ...authHeaders(), "Content-Type": "application/json" }), "jsonHeaders");
  const fetchBots = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/bots/my/`, { headers: authHeaders() });
      if (response.ok) {
        const data = await response.json();
        setBots(data.bots || []);
      }
    } catch (error) {
      console.error("Fetch bots error:", error);
    } finally {
      setLoading(false);
    }
  }, "fetchBots");
  const handleCreateBot = /* @__PURE__ */ __name(async () => {
    if (!botForm.name.trim()) {
      toast.error("⚠️ Bot adı gerekli");
      return;
    }
    try {
      const response = await fetch(`${apiBaseUrl}/bots/create/`, { method: "POST", headers: jsonHeaders(), body: JSON.stringify(botForm) });
      if (response.ok) {
        const data = await response.json();
        setBots([...bots, data.bot]);
        setBotForm({ ...DEFAULT_FORM });
        setView("list");
        toast.success("✅ Bot oluşturuldu!");
        setSelectedBot(data.bot);
        setShowToken({ [data.bot.id]: true });
      } else {
        const error = await response.json();
        toast.error(error.error || "❌ Bot oluşturulamadı");
      }
    } catch (error) {
      console.error("Create bot error:", error);
      toast.error("❌ Hata oluştu");
    }
  }, "handleCreateBot");
  const handleUpdateBot = /* @__PURE__ */ __name(async () => {
    if (!selectedBot) return;
    try {
      const response = await fetch(`${apiBaseUrl}/bots/${selectedBot.id}/update/`, { method: "PUT", headers: jsonHeaders(), body: JSON.stringify(botForm) });
      if (response.ok) {
        const data = await response.json();
        setBots(bots.map((b) => b.id === selectedBot.id ? data.bot : b));
        setView("list");
        toast.success("✅ Bot güncellendi!");
      }
    } catch (error) {
      console.error("Update bot error:", error);
    }
  }, "handleUpdateBot");
  const handleDeleteBot = /* @__PURE__ */ __name(async (botId) => {
    if (!await confirmDialog("Bu botu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.")) return;
    try {
      const response = await fetch(`${apiBaseUrl}/bots/${botId}/delete/`, { method: "DELETE", headers: authHeaders() });
      if (response.ok) {
        setBots(bots.filter((b) => b.id !== botId));
        if (selectedBot?.id === botId) setSelectedBot(null);
        toast.success("✅ Bot silindi");
      }
    } catch (error) {
      console.error("Delete bot error:", error);
    }
  }, "handleDeleteBot");
  const handleRegenerateToken = /* @__PURE__ */ __name(async (botId) => {
    if (!await confirmDialog("Token yenilenecek. Eski token geçersiz olacak. Devam?")) return;
    try {
      const response = await fetch(`${apiBaseUrl}/bots/${botId}/regenerate-token/`, { method: "POST", headers: authHeaders() });
      if (response.ok) {
        const data = await response.json();
        setBots(bots.map((b) => b.id === botId ? { ...b, token: data.token } : b));
        setShowToken({ ...showToken, [botId]: true });
        toast.success("✅ Token yenilendi!");
      }
    } catch (error) {
      console.error("Regenerate token error:", error);
    }
  }, "handleRegenerateToken");
  const handleCreateWebhook = /* @__PURE__ */ __name(async (botId) => {
    if (!webhookUrl.trim()) {
      toast.error("⚠️ Webhook URL gerekli");
      return;
    }
    try {
      const response = await fetch(`${apiBaseUrl}/bots/${botId}/webhook/`, { method: "POST", headers: jsonHeaders(), body: JSON.stringify({ url: webhookUrl, events: webhookEvents }) });
      if (response.ok) {
        toast.success("✅ Webhook oluşturuldu!");
        setShowWebhookForm(false);
        setWebhookUrl("");
        setWebhookEvents([]);
      }
    } catch (error) {
      console.error("Create webhook error:", error);
    }
  }, "handleCreateWebhook");
  const handleToggleBotStatus = /* @__PURE__ */ __name(async (botId, currentStatus) => {
    try {
      const endpoint = currentStatus === "online" ? "pause" : "start";
      const response = await fetch(`${apiBaseUrl}/bots/${botId}/${endpoint}/`, { method: "POST", headers: authHeaders() });
      if (response.ok) {
        const newStatus = currentStatus === "online" ? "offline" : "online";
        setBots(bots.map((b) => b.id === botId ? { ...b, status: newStatus } : b));
        toast.success(newStatus === "online" ? "✅ Bot başlatıldı!" : "⏸️ Bot durduruldu");
      }
    } catch (error) {
      console.error("Toggle bot status error:", error);
    }
  }, "handleToggleBotStatus");
  const copyToClipboard = /* @__PURE__ */ __name((text) => {
    navigator.clipboard.writeText(text);
    toast.success("📋 Panoya kopyalandı!");
  }, "copyToClipboard");
  const editBot = /* @__PURE__ */ __name((bot) => {
    setBotForm({ name: bot.name, description: bot.description || "", avatar_url: bot.avatar_url || "", prefix: bot.prefix || "!", is_public: bot.is_public || false, intents: bot.intents || { ...DEFAULT_INTENTS } });
    setSelectedBot(bot);
    setView("edit");
  }, "editBot");
  const resetForm = /* @__PURE__ */ __name(() => {
    setBotForm({ ...DEFAULT_FORM });
    setSelectedBot(null);
  }, "resetForm");
  return {
    view,
    setView,
    bots,
    selectedBot,
    setSelectedBot,
    loading,
    showToken,
    setShowToken,
    botForm,
    setBotForm,
    showWebhookForm,
    setShowWebhookForm,
    webhookUrl,
    setWebhookUrl,
    webhookEvents,
    setWebhookEvents,
    handleCreateBot,
    handleUpdateBot,
    handleDeleteBot,
    handleRegenerateToken,
    handleCreateWebhook,
    handleToggleBotStatus,
    copyToClipboard,
    editBot,
    resetForm
  };
}, "useBotPortal");
const CODE_SAMPLE = `const PAWSCORD = require('pawscord-bot');

const bot = new PAWSCORD.Client({
    token: 'YOUR_BOT_TOKEN'
});

bot.on('message', (message) => {
    if (message.content === '!ping') {
        message.reply('Pong! 🏓');
    }
});

bot.connect();`;
const BotDocsView = /* @__PURE__ */ __name(({ copyToClipboard }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "docs-view", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FaBook, {}),
    " Bot API Dok",
    "ü",
    "mantasyonu"
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "docs-section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { children: [
      "🚀",
      " H",
      "ı",
      "zl",
      "ı",
      " Ba",
      "ş",
      "lang",
      "ıç"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "PAWSCORD Bot API ile kendi botunuzu olu",
      "ş",
      "turabilirsiniz."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "code-block", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "code-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "JavaScript (Node.js)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => copyToClipboard(CODE_SAMPLE), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCopy, {}) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { children: CODE_SAMPLE })
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "docs-section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { children: [
      "📡",
      " API Endpoints"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "endpoint-list", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "endpoint", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "method get", children: "GET" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "/api/bots/@me" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Bot bilgilerini al" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "endpoint", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "method post", children: "POST" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "/api/messages/send" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Mesaj g",
          "ö",
          "nder"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "endpoint", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "method post", children: "POST" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "/api/reactions/add" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Reaction ekle" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "endpoint", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "method get", children: "GET" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "/api/servers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sunucu listesi" })
      ] })
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "docs-section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { children: [
      "🔗",
      " WebSocket Events"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "event-list", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "event", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "MESSAGE_CREATE" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Yeni mesaj g",
          "ö",
          "nderildi",
          "ğ",
          "inde"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "event", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "REACTION_ADD" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Reaction eklendi",
          "ğ",
          "inde"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "event", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "MEMBER_JOIN" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Ü",
          "ye sunucuya kat",
          "ı",
          "ld",
          "ığı",
          "nda"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "event", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "VOICE_STATE_UPDATE" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Ses durumu de",
          "ğ",
          "i",
          "ş",
          "ti",
          "ğ",
          "inde"
        ] })
      ] })
    ] })
  ] })
] }), "BotDocsView");
const BotDeveloperPortal = /* @__PURE__ */ __name(({ apiBaseUrl, onClose, currentUser }) => {
  const {
    view,
    setView,
    bots,
    selectedBot,
    setSelectedBot,
    loading,
    showToken,
    setShowToken,
    botForm,
    setBotForm,
    showWebhookForm,
    setShowWebhookForm,
    webhookUrl,
    setWebhookUrl,
    webhookEvents,
    setWebhookEvents,
    handleCreateBot,
    handleUpdateBot,
    handleDeleteBot,
    handleRegenerateToken,
    handleCreateWebhook,
    handleToggleBotStatus,
    copyToClipboard,
    editBot,
    resetForm
  } = useBotPortal(apiBaseUrl);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bot-portal-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bot-portal-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "portal-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, {}),
        " Bot Geliştirici Portalı"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: `nav-btn ${view === "list" ? "active" : ""}`,
            onClick: /* @__PURE__ */ __name(() => setView("list"), "onClick"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, {}),
              " Botlarım"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: `nav-btn ${view === "create" ? "active" : ""}`,
            onClick: /* @__PURE__ */ __name(() => {
              setView("create");
              resetForm();
            }, "onClick"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
              " Yeni Bot"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: `nav-btn ${view === "docs" ? "active" : ""}`,
            onClick: /* @__PURE__ */ __name(() => setView("docs"), "onClick"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaBook, {}),
              " Dokümantasyon"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "portal-content", children: [
      view === "list" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bots-list-view", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading", children: "Yükleniyor..." }) : bots.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bots-grid", children: bots.map((bot) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bot-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bot-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: bot.avatar_url || "/default-bot.png",
              alt: bot.name,
              className: "bot-avatar"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bot-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: bot.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `bot-status ${bot.status || "offline"}`, children: bot.status === "online" ? "🟢 Online" : "🔴 Offline" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bot-actions", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "action-btn",
                onClick: /* @__PURE__ */ __name(() => handleToggleBotStatus(bot.id, bot.status), "onClick"),
                title: bot.status === "online" ? "Durdur" : "Başlat",
                children: bot.status === "online" ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaPause, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlay, {})
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "action-btn",
                onClick: /* @__PURE__ */ __name(() => editBot(bot), "onClick"),
                title: "Düzenle",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaEdit, {})
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "action-btn delete",
                onClick: /* @__PURE__ */ __name(() => handleDeleteBot(bot.id), "onClick"),
                title: "Sil",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {})
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "bot-description", children: bot.description || "Açıklama yok" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bot-stats", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaServer, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              bot.servers_count || 0,
              " sunucu"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              bot.commands_used || 0,
              " komut"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bot-token-section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "token-header", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaKey, {}),
            " Token",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "toggle-token",
                onClick: /* @__PURE__ */ __name(() => setShowToken({ ...showToken, [bot.id]: !showToken[bot.id] }), "onClick"),
                children: showToken[bot.id] ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaEyeSlash, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaEye, {})
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "token-value", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: showToken[bot.id] ? bot.token : "••••••••••••••••••••••••••••••••" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "copy-btn",
                onClick: /* @__PURE__ */ __name(() => copyToClipboard(bot.token), "onClick"),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCopy, {})
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "regenerate-btn",
              onClick: /* @__PURE__ */ __name(() => handleRegenerateToken(bot.id), "onClick"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FaSync, {}),
                " Token Yenile"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bot-footer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "webhook-btn",
              onClick: /* @__PURE__ */ __name(() => {
                setSelectedBot(bot);
                setShowWebhookForm(true);
              }, "onClick"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FaLink, {}),
                " Webhook Ekle"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "analytics-btn",
              onClick: /* @__PURE__ */ __name(() => {
                setSelectedBot(bot);
                setView("analytics");
              }, "onClick"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, {}),
                " Analitik"
              ]
            }
          )
        ] })
      ] }, bot.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "no-bots", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, { className: "empty-icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz bot oluşturmadınız" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setView("create"), "onClick"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
          " İlk botunu oluştur"
        ] })
      ] }) }),
      (view === "create" || view === "edit") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bot-form-view", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: view === "create" ? "🤖 Yeni Bot Oluştur" : "✏️ Bot Düzenle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Bot Adı *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Harika Bot",
              value: botForm.name,
              onChange: /* @__PURE__ */ __name((e) => setBotForm({ ...botForm, name: e.target.value }), "onChange"),
              maxLength: 32
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Açıklama" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              placeholder: "Bu bot ne yapar?",
              value: botForm.description,
              onChange: /* @__PURE__ */ __name((e) => setBotForm({ ...botForm, description: e.target.value }), "onChange"),
              rows: 3
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Avatar URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "https://...",
              value: botForm.avatar_url,
              onChange: /* @__PURE__ */ __name((e) => setBotForm({ ...botForm, avatar_url: e.target.value }), "onChange")
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Komut Prefix" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "!",
              value: botForm.prefix,
              onChange: /* @__PURE__ */ __name((e) => setBotForm({ ...botForm, prefix: e.target.value }), "onChange"),
              maxLength: 5
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Bot İzinleri (Intents)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "intents-grid", children: Object.entries(botForm.intents).map(([intent, enabled]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "intent-checkbox", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: enabled,
                onChange: /* @__PURE__ */ __name((e) => setBotForm({
                  ...botForm,
                  intents: { ...botForm.intents, [intent]: e.target.checked }
                }), "onChange")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: intent.charAt(0).toUpperCase() + intent.slice(1) })
          ] }, intent)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-group checkbox", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: botForm.is_public,
              onChange: /* @__PURE__ */ __name((e) => setBotForm({ ...botForm, is_public: e.target.checked }), "onChange")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Bot'u herkese açık yap (keşfedilebilir)" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "submit-btn",
              onClick: view === "create" ? handleCreateBot : handleUpdateBot,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FaRocket, {}),
                " ",
                view === "create" ? "Bot Oluştur" : "Kaydet"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "cancel-btn",
              onClick: /* @__PURE__ */ __name(() => setView("list"), "onClick"),
              children: "İptal"
            }
          )
        ] })
      ] }),
      view === "analytics" && selectedBot && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "analytics-view", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "back-btn", onClick: /* @__PURE__ */ __name(() => setView("list"), "onClick"), children: "← Geri" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
          "📊 ",
          selectedBot.name,
          " - Analitik"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "analytics-grid", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "analytics-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "analytics-value", children: selectedBot.servers_count || 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "analytics-label", children: "Toplam Sunucu" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "analytics-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "analytics-value", children: selectedBot.users_count || 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "analytics-label", children: "Toplam Kullanıcı" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "analytics-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "analytics-value", children: selectedBot.commands_used || 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "analytics-label", children: "Komut Kullanımı" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "analytics-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "analytics-value", children: selectedBot.messages_sent || 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "analytics-label", children: "Mesaj Gönderildi" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "analytics-chart-placeholder", style: { padding: "20px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#dbdee1", marginBottom: "16px" }, children: "📈 Haftalık Kullanım" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", alignItems: "flex-end", gap: "8px", height: "120px", padding: "0 10px" }, children: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((day, i) => {
            const val = Math.max(10, Math.floor((selectedBot.commands_used || 50) * (0.3 + Math.sin(i * 1.2) * 0.5 + Math.random() * 0.2) / 7));
            const maxVal = (selectedBot.commands_used || 50) / 4;
            const pct = Math.min(100, val / Math.max(maxVal, 1) * 100);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#949ba4", fontSize: "0.7em" }, children: val }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: "100%", maxWidth: "40px", height: `${Math.max(pct, 8)}%`, backgroundColor: "#5865f2", borderRadius: "4px 4px 0 0", minHeight: "6px", transition: "height 0.3s ease" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#949ba4", fontSize: "0.7em" }, children: day })
            ] }, day);
          }) })
        ] })
      ] }),
      view === "docs" && /* @__PURE__ */ jsxRuntimeExports.jsx(BotDocsView, { copyToClipboard })
    ] }),
    showWebhookForm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "webhook-modal-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "webhook-modal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaLink, {}),
        " Webhook Oluştur"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Webhook URL *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "https://your-server.com/webhook",
            value: webhookUrl,
            onChange: /* @__PURE__ */ __name((e) => setWebhookUrl(e.target.value), "onChange")
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Olaylar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "webhook-events", children: webhookEventOptions.map((event) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "event-checkbox", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: webhookEvents.includes(event.id),
              onChange: /* @__PURE__ */ __name((e) => {
                if (e.target.checked) {
                  setWebhookEvents([...webhookEvents, event.id]);
                } else {
                  setWebhookEvents(webhookEvents.filter((ev) => ev !== event.id));
                }
              }, "onChange")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: event.label })
        ] }, event.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "submit-btn",
            onClick: /* @__PURE__ */ __name(() => handleCreateWebhook(selectedBot.id), "onClick"),
            children: "Webhook Oluştur"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "cancel-btn",
            onClick: /* @__PURE__ */ __name(() => setShowWebhookForm(false), "onClick"),
            children: "İptal"
          }
        )
      ] })
    ] }) })
  ] }) });
}, "BotDeveloperPortal");
export {
  BotDeveloperPortal as default
};
