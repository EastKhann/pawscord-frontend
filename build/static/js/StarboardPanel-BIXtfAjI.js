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
const StarboardPanel = /* @__PURE__ */ __name(({ serverId, onClose }) => {
  const apiBaseUrl = getApiBase();
  const [config, setConfig] = reactExports.useState({
    enabled: false,
    channel_id: "",
    emoji: "⭐",
    threshold: 3,
    self_star: false,
    allow_nsfw: false
  });
  const [stars, setStars] = reactExports.useState([]);
  const [channels, setChannels] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    fetchConfig();
    fetchStars();
    fetchChannels();
  }, [serverId]);
  const fetchConfig = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/starboard/server/${serverId}/config/`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` }
      });
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, "fetchConfig");
  const fetchStars = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/starboard/server/${serverId}/messages/`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` }
      });
      if (response.ok) {
        const data = await response.json();
        setStars(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, "fetchStars");
  const fetchChannels = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/channels/server/${serverId}/`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` }
      });
      if (response.ok) {
        const data = await response.json();
        setChannels(data.filter((ch) => ch.type === "text"));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, "fetchChannels");
  const saveConfig = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/starboard/server/${serverId}/config/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(config)
      });
      if (response.ok) {
        y.success("✅ Starboard ayarları kaydedildi");
      } else {
        y.error("❌ Kaydetme hatası");
      }
    } catch (error) {
      y.error("❌ Bağlantı hatası");
    }
  }, "saveConfig");
  const removeMessage = /* @__PURE__ */ __name(async (messageId) => {
    try {
      const response = await fetch(`${apiBaseUrl}/starboard/message/${messageId}/remove/`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` }
      });
      if (response.ok) {
        y.success("✅ Mesaj kaldırıldı");
        fetchStars();
      }
    } catch (error) {
      y.error("❌ Silme hatası");
    }
  }, "removeMessage");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "starboard-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "starboard-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "starboard-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "⭐ Starboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "starboard-content", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Yükleniyor..." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "config-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "⚙️ Ayarlar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle-switch", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: config.enabled, onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, enabled: e.target.checked }), "onChange") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "toggle-slider" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "config-grid", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "📢 Starboard Kanalı" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: config.channel_id, onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, channel_id: e.target.value }), "onChange"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Seçin" }),
              channels.map((ch) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: ch.id, children: [
                "# ",
                ch.name
              ] }, ch.id))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "⭐ Emoji" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: config.emoji, onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, emoji: e.target.value }), "onChange"), placeholder: "⭐" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "🎯 Eşik Değeri" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: "1", max: "50", value: config.threshold, onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, threshold: parseInt(e.target.value) }), "onChange") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: "Mesajın starboard'a eklenebilmesi için gereken minimum yıldız sayısı" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "checkbox-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: config.self_star, onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, self_star: e.target.checked }), "onChange") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Kendi mesajına yıldız verebilir" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "checkbox-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: config.allow_nsfw, onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, allow_nsfw: e.target.checked }), "onChange") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "NSFW kanallardan izin ver" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "save-btn", onClick: saveConfig, children: "💾 Kaydet" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stars-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
          "⭐ Starboard Mesajları (",
          stars.length,
          ")"
        ] }),
        stars.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "empty-icon", children: "⭐" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz starboard mesajı yok" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stars-list", children: stars.map((star) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "star-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "star-header", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "star-author", children: [
              star.author_avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: star.author_avatar, alt: "" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "default-avatar", children: "👤" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: star.author_name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "star-count", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              config.emoji,
              " ",
              star.star_count
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "star-content", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: star.content }),
            star.attachments && star.attachments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "star-attachments", children: star.attachments.map((att, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: att, alt: "" }, idx)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "star-footer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "star-channel", children: [
              "# ",
              star.channel_name
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "star-time", children: new Date(star.created_at).toLocaleString("tr-TR") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "remove-btn", onClick: /* @__PURE__ */ __name(() => removeMessage(star.message_id), "onClick"), children: "🗑️" })
          ] })
        ] }, star.message_id)) })
      ] })
    ] }) })
  ] }) });
}, "StarboardPanel");
export {
  StarboardPanel as default
};
