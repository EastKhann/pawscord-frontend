var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { _ as FaEnvelope, a as FaTimes, a0 as FaEye, aY as FaSave } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const WelcomeTemplatesPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, serverId, onClose }) => {
  const [template, setTemplate] = reactExports.useState({
    enabled: false,
    message: "",
    channel_id: "",
    dm_enabled: false,
    dm_message: ""
  });
  const [channels, setChannels] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const placeholders = [
    { key: "{user}", desc: "Kullanıcı adı" },
    { key: "{mention}", desc: "Kullanıcıyı etiketle" },
    { key: "{server}", desc: "Sunucu adı" },
    { key: "{membercount}", desc: "Üye sayısı" },
    { key: "{date}", desc: "Tarih" }
  ];
  reactExports.useEffect(() => {
    loadTemplate();
    loadChannels();
  }, []);
  const loadTemplate = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/welcome/`);
      if (response.ok) {
        const data = await response.json();
        if (data) setTemplate(data);
      }
    } catch (error) {
      console.error("Şablon yükleme hatası:", error);
    } finally {
      setLoading(false);
    }
  }, "loadTemplate");
  const loadChannels = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/channels/`);
      if (response.ok) {
        const data = await response.json();
        setChannels(data);
      }
    } catch (error) {
      console.error("Kanal yükleme hatası:", error);
    }
  }, "loadChannels");
  const saveTemplate = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/servers/welcome/set/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          server_id: serverId,
          ...template
        })
      });
      if (response.ok) {
        toast.success("Hoşgeldin şablonu kaydedildi");
      } else {
        toast.error("Şablon kaydedilemedi");
      }
    } catch (error) {
      console.error("Şablon kaydetme hatası:", error);
      toast.error("Bir hata oluştu");
    }
  }, "saveTemplate");
  const insertPlaceholder = /* @__PURE__ */ __name((placeholder) => {
    setTemplate({
      ...template,
      message: template.message + placeholder
    });
  }, "insertPlaceholder");
  const previewMessage = /* @__PURE__ */ __name(() => {
    let preview = template.message.replace("{user}", "KullanıcıAdı").replace("{mention}", "@KullanıcıAdı").replace("{server}", "Sunucu Adı").replace("{membercount}", "1,234").replace("{date}", (/* @__PURE__ */ new Date()).toLocaleDateString("tr-TR"));
    toast.info(preview);
  }, "previewMessage");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaEnvelope, { style: { color: "#43b581" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0 }, children: "Hoşgeldin Mesajları" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { onClick: onClose, style: styles.closeBtn })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.toggle, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.toggleLabel, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            checked: template.enabled,
            onChange: /* @__PURE__ */ __name((e) => setTemplate({ ...template, enabled: e.target.checked }), "onChange")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Hoşgeldin mesajlarını etkinleştir" })
      ] }) }),
      template.enabled && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.field, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Hoşgeldin Kanalı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: template.channel_id,
              onChange: /* @__PURE__ */ __name((e) => setTemplate({ ...template, channel_id: e.target.value }), "onChange"),
              style: styles.select,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Kanal Seçin" }),
                channels.map((ch) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: ch.id, children: [
                  "#",
                  ch.name
                ] }, ch.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.field, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Mesaj Şablonu" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.placeholders, children: placeholders.map((ph) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: /* @__PURE__ */ __name(() => insertPlaceholder(ph.key), "onClick"),
              style: styles.placeholderBtn,
              title: ph.desc,
              children: ph.key
            },
            ph.key
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: template.message,
              onChange: /* @__PURE__ */ __name((e) => setTemplate({ ...template, message: e.target.value }), "onChange"),
              placeholder: "Hoş geldin {user}! {server} sunucusuna katıldın. Şu anda {membercount} üyeyiz! 🎉",
              style: styles.textarea,
              rows: 5
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: previewMessage, style: styles.previewBtn, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaEye, {}),
            " Önizleme"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.toggle, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.toggleLabel, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: template.dm_enabled,
              onChange: /* @__PURE__ */ __name((e) => setTemplate({ ...template, dm_enabled: e.target.checked }), "onChange")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "DM ile hoşgeldin mesajı gönder" })
        ] }) }),
        template.dm_enabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.field, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "DM Mesajı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: template.dm_message,
              onChange: /* @__PURE__ */ __name((e) => setTemplate({ ...template, dm_message: e.target.value }), "onChange"),
              placeholder: "Merhaba {user}! {server} sunucusuna hoş geldin!",
              style: styles.textarea,
              rows: 3
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.footer, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: saveTemplate, style: styles.saveBtn, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaSave, {}),
      " Kaydet"
    ] }) })
  ] }) });
}, "WelcomeTemplatesPanel");
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999999
  },
  modal: {
    backgroundColor: "#1e1e1e",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "700px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    color: "#fff"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #333"
  },
  closeBtn: {
    cursor: "pointer",
    fontSize: "24px",
    color: "#888"
  },
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "20px"
  },
  toggle: {
    marginBottom: "20px"
  },
  toggleLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    fontSize: "16px"
  },
  field: {
    marginBottom: "20px"
  },
  label: {
    display: "block",
    marginBottom: "8px",
    color: "#dcddde",
    fontSize: "14px",
    fontWeight: "600"
  },
  select: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#2c2f33",
    border: "1px solid #444",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px"
  },
  placeholders: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "10px"
  },
  placeholderBtn: {
    backgroundColor: "#5865f2",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    fontFamily: "monospace"
  },
  textarea: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2c2f33",
    border: "1px solid #444",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px",
    resize: "vertical",
    marginBottom: "10px"
  },
  previewBtn: {
    backgroundColor: "#2c2f33",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  footer: {
    padding: "20px",
    borderTop: "1px solid #333"
  },
  saveBtn: {
    width: "100%",
    backgroundColor: "#43b581",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  }
};
export {
  WelcomeTemplatesPanel as default
};
