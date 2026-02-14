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
const CustomEmbedPanel = /* @__PURE__ */ __name(({ serverId, onClose }) => {
  const apiBaseUrl = getApiBase();
  const [embeds, setEmbeds] = reactExports.useState([]);
  const [channels, setChannels] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [showEditor, setShowEditor] = reactExports.useState(false);
  const [currentEmbed, setCurrentEmbed] = reactExports.useState({
    title: "",
    description: "",
    color: "#5865f2",
    thumbnail: "",
    image: "",
    author_name: "",
    author_icon: "",
    footer_text: "",
    footer_icon: "",
    fields: []
  });
  const [selectedChannel, setSelectedChannel] = reactExports.useState("");
  reactExports.useEffect(() => {
    fetchEmbeds();
    fetchChannels();
  }, [serverId]);
  const fetchEmbeds = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/custom-embeds/server/${serverId}/`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` }
      });
      if (response.ok) {
        const data = await response.json();
        setEmbeds(data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, "fetchEmbeds");
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
  const saveEmbed = /* @__PURE__ */ __name(async () => {
    if (!currentEmbed.title && !currentEmbed.description) {
      y.error("❌ En az başlık veya açıklama gerekli");
      return;
    }
    try {
      const response = await fetch(`${apiBaseUrl}/custom-embeds/save/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ server_id: serverId, ...currentEmbed })
      });
      if (response.ok) {
        y.success("✅ Embed kaydedildi");
        setShowEditor(false);
        fetchEmbeds();
        resetEmbed();
      } else {
        y.error("❌ Kaydetme hatası");
      }
    } catch (error) {
      y.error("❌ Bağlantı hatası");
    }
  }, "saveEmbed");
  const sendEmbed = /* @__PURE__ */ __name(async (embedId) => {
    if (!selectedChannel) {
      y.error("❌ Lütfen bir kanal seçin");
      return;
    }
    try {
      const response = await fetch(`${apiBaseUrl}/custom-embeds/${embedId}/send/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ channel_id: selectedChannel })
      });
      if (response.ok) {
        y.success("✅ Embed gönderildi");
      } else {
        y.error("❌ Gönderim hatası");
      }
    } catch (error) {
      y.error("❌ Bağlantı hatası");
    }
  }, "sendEmbed");
  const deleteEmbed = /* @__PURE__ */ __name(async (id) => {
    if (!await confirmDialog("Embed'i silmek istediğinize emin misiniz?")) return;
    try {
      const response = await fetch(`${apiBaseUrl}/custom-embeds/${id}/delete/`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` }
      });
      if (response.ok) {
        y.success("✅ Embed silindi");
        fetchEmbeds();
      }
    } catch (error) {
      y.error("❌ Silme hatası");
    }
  }, "deleteEmbed");
  const addField = /* @__PURE__ */ __name(() => {
    setCurrentEmbed({
      ...currentEmbed,
      fields: [...currentEmbed.fields, { name: "", value: "", inline: false }]
    });
  }, "addField");
  const updateField = /* @__PURE__ */ __name((index, key, value) => {
    const newFields = [...currentEmbed.fields];
    newFields[index][key] = value;
    setCurrentEmbed({ ...currentEmbed, fields: newFields });
  }, "updateField");
  const removeField = /* @__PURE__ */ __name((index) => {
    setCurrentEmbed({
      ...currentEmbed,
      fields: currentEmbed.fields.filter((_, i) => i !== index)
    });
  }, "removeField");
  const resetEmbed = /* @__PURE__ */ __name(() => {
    setCurrentEmbed({
      title: "",
      description: "",
      color: "#5865f2",
      thumbnail: "",
      image: "",
      author_name: "",
      author_icon: "",
      footer_text: "",
      footer_icon: "",
      fields: []
    });
  }, "resetEmbed");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "custom-embed-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "custom-embed-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "custom-embed-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "📝 Özel Embed Oluşturucu" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "custom-embed-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "create-embed-btn", onClick: /* @__PURE__ */ __name(() => setShowEditor(!showEditor), "onClick"), children: showEditor ? "❌ Düzenleyiciyi Kapat" : "+ Yeni Embed Oluştur" }),
      showEditor && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "embed-editor", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "editor-form", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Yazar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "İsim" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: currentEmbed.author_name, onChange: /* @__PURE__ */ __name((e) => setCurrentEmbed({ ...currentEmbed, author_name: e.target.value }), "onChange"), placeholder: "Yazar adı" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "İkon URL" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: currentEmbed.author_icon, onChange: /* @__PURE__ */ __name((e) => setCurrentEmbed({ ...currentEmbed, author_icon: e.target.value }), "onChange"), placeholder: "https://..." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "İçerik" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Başlık" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: currentEmbed.title, onChange: /* @__PURE__ */ __name((e) => setCurrentEmbed({ ...currentEmbed, title: e.target.value }), "onChange"), placeholder: "Embed başlığı" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Açıklama" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: currentEmbed.description, onChange: /* @__PURE__ */ __name((e) => setCurrentEmbed({ ...currentEmbed, description: e.target.value }), "onChange"), rows: "4", placeholder: "Embed açıklaması" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Renk" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: currentEmbed.color, onChange: /* @__PURE__ */ __name((e) => setCurrentEmbed({ ...currentEmbed, color: e.target.value }), "onChange") })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Görseller" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Küçük Resim URL" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: currentEmbed.thumbnail, onChange: /* @__PURE__ */ __name((e) => setCurrentEmbed({ ...currentEmbed, thumbnail: e.target.value }), "onChange"), placeholder: "https://..." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Büyük Resim URL" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: currentEmbed.image, onChange: /* @__PURE__ */ __name((e) => setCurrentEmbed({ ...currentEmbed, image: e.target.value }), "onChange"), placeholder: "https://..." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-header", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Alanlar" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "add-field-btn", onClick: addField, children: "+ Alan Ekle" })
            ] }),
            currentEmbed.fields.map((field, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "field-item", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "field-inputs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: field.name, onChange: /* @__PURE__ */ __name((e) => updateField(idx, "name", e.target.value), "onChange"), placeholder: "Alan adı" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: field.value, onChange: /* @__PURE__ */ __name((e) => updateField(idx, "value", e.target.value), "onChange"), placeholder: "Alan değeri" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "checkbox-label", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: field.inline, onChange: /* @__PURE__ */ __name((e) => updateField(idx, "inline", e.target.checked), "onChange") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Inline" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "remove-field-btn", onClick: /* @__PURE__ */ __name(() => removeField(idx), "onClick"), children: "🗑️" })
            ] }) }, idx))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Footer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Metin" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: currentEmbed.footer_text, onChange: /* @__PURE__ */ __name((e) => setCurrentEmbed({ ...currentEmbed, footer_text: e.target.value }), "onChange"), placeholder: "Footer metni" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "İkon URL" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: currentEmbed.footer_icon, onChange: /* @__PURE__ */ __name((e) => setCurrentEmbed({ ...currentEmbed, footer_icon: e.target.value }), "onChange"), placeholder: "https://..." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "save-embed-btn", onClick: saveEmbed, children: "💾 Kaydet" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "embed-preview", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Önizleme" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "discord-embed", style: { borderLeftColor: currentEmbed.color }, children: [
            currentEmbed.author_name && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "embed-author", children: [
              currentEmbed.author_icon && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: currentEmbed.author_icon, alt: "" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: currentEmbed.author_name })
            ] }),
            currentEmbed.title && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "embed-title", children: currentEmbed.title }),
            currentEmbed.description && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "embed-description", children: currentEmbed.description }),
            currentEmbed.fields.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "embed-fields", children: currentEmbed.fields.map((field, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `embed-field ${field.inline ? "inline" : ""}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "field-name", children: field.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "field-value", children: field.value })
            ] }, idx)) }),
            currentEmbed.image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { className: "embed-image", src: currentEmbed.image, alt: "" }),
            currentEmbed.footer_text && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "embed-footer", children: [
              currentEmbed.footer_icon && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: currentEmbed.footer_icon, alt: "" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: currentEmbed.footer_text })
            ] })
          ] })
        ] })
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Yükleniyor..." })
      ] }) : embeds.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "empty-icon", children: "📝" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz kayıtlı embed yok" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "embeds-list", children: embeds.map((embed) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "embed-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "embed-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: embed.title || "Başlıksız Embed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            embed.description?.substring(0, 100),
            embed.description?.length > 100 ? "..." : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "embed-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: selectedChannel, onChange: /* @__PURE__ */ __name((e) => setSelectedChannel(e.target.value), "onChange"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Kanal seç" }),
            channels.map((ch) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: ch.id, children: [
              "# ",
              ch.name
            ] }, ch.id))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => sendEmbed(embed.id), "onClick"), children: "📤 Gönder" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => deleteEmbed(embed.id), "onClick"), children: "🗑️" })
        ] })
      ] }, embed.id)) })
    ] })
  ] }) });
}, "CustomEmbedPanel");
export {
  CustomEmbedPanel as default
};
