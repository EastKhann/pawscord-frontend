var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a as FaTimes, an as FaPlus, g as FaTrash } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const WebhookManager = /* @__PURE__ */ __name(({ onClose, fetchWithAuth, apiBaseUrl, serverId }) => {
  const [webhooks, setWebhooks] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [showCreate, setShowCreate] = reactExports.useState(false);
  const [newWebhook, setNewWebhook] = reactExports.useState({ name: "", url: "", events: [] });
  reactExports.useEffect(() => {
    loadWebhooks();
  }, []);
  const loadWebhooks = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/webhooks/list/`);
      if (res.ok) {
        const data = await res.json();
        setWebhooks(data.webhooks || []);
      }
    } catch (error) {
      console.error("Load webhooks error:", error);
    } finally {
      setLoading(false);
    }
  }, "loadWebhooks");
  const handleCreate = /* @__PURE__ */ __name(async () => {
    if (!newWebhook.name || !newWebhook.url) {
      toast.warning("İsim ve URL gerekli");
      return;
    }
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/webhooks/create/`, {
        method: "POST",
        body: JSON.stringify(newWebhook)
      });
      if (res.ok) {
        toast.success("Webhook oluşturuldu!");
        setShowCreate(false);
        setNewWebhook({ name: "", url: "", events: [] });
        loadWebhooks();
      }
    } catch (error) {
      console.error("Create webhook error:", error);
    }
  }, "handleCreate");
  const handleDelete = /* @__PURE__ */ __name(async (webhookId) => {
    if (!confirm("Bu webhook'u silmek istediğinizden emin misiniz?")) return;
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/webhooks/${webhookId}/delete/`, {
        method: "DELETE"
      });
      if (res.ok) {
        setWebhooks((prev) => prev.filter((w) => w.id !== webhookId));
      }
    } catch (error) {
      console.error("Delete webhook error:", error);
    }
  }, "handleDelete");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "🔗 Webhook Yönetimi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      !showCreate && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setShowCreate(true), "onClick"), style: styles.createButton, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
        " Yeni Webhook"
      ] }),
      showCreate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.createForm, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Webhook İsmi",
            value: newWebhook.name,
            onChange: /* @__PURE__ */ __name((e) => setNewWebhook({ ...newWebhook, name: e.target.value }), "onChange"),
            style: styles.input
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "url",
            placeholder: "Webhook URL",
            value: newWebhook.url,
            onChange: /* @__PURE__ */ __name((e) => setNewWebhook({ ...newWebhook, url: e.target.value }), "onChange"),
            style: styles.input
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "10px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleCreate, style: styles.submitButton, children: "Oluştur" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setShowCreate(false), "onClick"), style: styles.cancelButton, children: "İptal" })
        ] })
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Yükleniyor..." }) : webhooks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "Henüz webhook oluşturulmamış" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.webhookList, children: webhooks.map((webhook) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.webhookItem, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.webhookName, children: webhook.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.webhookUrl, children: webhook.url })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => handleDelete(webhook.id), "onClick"), style: styles.deleteButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}) })
      ] }, webhook.id)) })
    ] })
  ] }) });
}, "WebhookManager");
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1e4
  },
  modal: {
    backgroundColor: "#2b2d31",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "600px",
    maxHeight: "80vh",
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #40444b"
  },
  title: {
    color: "white",
    margin: 0,
    fontSize: "1.5em"
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    fontSize: "1.5em"
  },
  content: {
    padding: "20px",
    overflowY: "auto",
    flex: 1
  },
  createButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "4px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "15px"
  },
  createForm: {
    backgroundColor: "#40444b",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "15px"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#2b2d31",
    border: "1px solid #5865f2",
    borderRadius: "4px",
    color: "white"
  },
  submitButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#3ba55d",
    border: "none",
    borderRadius: "4px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },
  cancelButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#f04747",
    border: "none",
    borderRadius: "4px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },
  loading: {
    textAlign: "center",
    color: "#b9bbbe",
    padding: "40px"
  },
  empty: {
    textAlign: "center",
    color: "#b9bbbe",
    padding: "40px"
  },
  webhookList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  webhookItem: {
    backgroundColor: "#40444b",
    padding: "15px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  webhookName: {
    color: "white",
    fontWeight: "bold",
    marginBottom: "5px"
  },
  webhookUrl: {
    color: "#b9bbbe",
    fontSize: "0.85em"
  },
  deleteButton: {
    backgroundColor: "#f04747",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    color: "white",
    cursor: "pointer"
  }
};
export {
  WebhookManager as default
};
