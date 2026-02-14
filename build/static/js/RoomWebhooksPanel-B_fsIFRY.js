var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { j as FaLink, a as FaTimes, an as FaPlus, aB as FaHistory, g as FaTrash, w as FaCheckCircle, d as FaExclamationTriangle, I as FaRedo } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
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
    zIndex: 999999
  },
  modal: {
    backgroundColor: "#1e1e1e",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "900px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #2c2f33"
  },
  headerLeft: {
    display: "flex",
    alignItems: "center"
  },
  title: {
    margin: 0,
    fontSize: "20px",
    color: "#ffffff"
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#99aab5",
    cursor: "pointer",
    fontSize: "20px",
    padding: "5px"
  },
  content: {
    padding: "20px",
    overflowY: "auto",
    flex: 1
  },
  loading: {
    textAlign: "center",
    color: "#99aab5",
    padding: "40px"
  },
  section: {
    marginBottom: "24px"
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px"
  },
  sectionTitle: {
    margin: 0,
    fontSize: "16px",
    color: "#ffffff",
    fontWeight: "600"
  },
  addButton: {
    padding: "8px 16px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center"
  },
  createForm: {
    backgroundColor: "#2c2f33",
    borderRadius: "6px",
    padding: "20px",
    marginBottom: "16px"
  },
  formGroup: {
    marginBottom: "16px"
  },
  label: {
    display: "block",
    color: "#dcddde",
    fontSize: "14px",
    marginBottom: "8px",
    fontWeight: "500"
  },
  input: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#1e1e1e",
    border: "1px solid #2c2f33",
    borderRadius: "4px",
    color: "#ffffff",
    fontSize: "14px"
  },
  eventsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "8px"
  },
  eventCheckbox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#dcddde",
    fontSize: "14px",
    cursor: "pointer"
  },
  eventLabel: {
    userSelect: "none"
  },
  formActions: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end"
  },
  createButton: {
    padding: "10px 20px",
    backgroundColor: "#43b581",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500"
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#4f545c",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px"
  },
  webhooksList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  empty: {
    textAlign: "center",
    color: "#99aab5",
    padding: "40px"
  },
  webhookCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "6px",
    padding: "16px"
  },
  webhookHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  webhookName: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "4px"
  },
  webhookUrl: {
    fontSize: "13px",
    color: "#5865f2",
    marginBottom: "4px",
    wordBreak: "break-all"
  },
  webhookEvents: {
    fontSize: "12px",
    color: "#99aab5"
  },
  webhookActions: {
    display: "flex",
    gap: "8px"
  },
  iconButton: {
    background: "none",
    border: "none",
    color: "#99aab5",
    cursor: "pointer",
    fontSize: "16px",
    padding: "5px"
  },
  deliveriesList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    maxHeight: "300px",
    overflowY: "auto"
  },
  deliveryCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "6px",
    padding: "12px"
  },
  deliveryHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px"
  },
  deliveryStatus: {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  deliveryStatusText: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff"
  },
  deliveryTime: {
    fontSize: "12px",
    color: "#99aab5"
  },
  deliveryBody: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    fontSize: "13px",
    color: "#dcddde"
  },
  deliveryInfo: {
    display: "flex",
    gap: "8px"
  },
  deliveryError: {
    color: "#f04747",
    marginTop: "4px"
  },
  retryButton: {
    marginTop: "12px",
    padding: "6px 12px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "12px",
    display: "flex",
    alignItems: "center"
  }
};
const eventTypes = [
  "message.created",
  "message.updated",
  "message.deleted",
  "member.joined",
  "member.left",
  "member.updated",
  "channel.created",
  "channel.updated",
  "channel.deleted",
  "role.created",
  "role.updated",
  "role.deleted"
];
const useRoomWebhooks = /* @__PURE__ */ __name((fetchWithAuth, apiBaseUrl, roomSlug) => {
  const [webhooks, setWebhooks] = reactExports.useState([]);
  const [deliveries, setDeliveries] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [showCreateForm, setShowCreateForm] = reactExports.useState(false);
  const [selectedWebhook, setSelectedWebhook] = reactExports.useState(null);
  const [newWebhook, setNewWebhook] = reactExports.useState({ name: "", url: "", events: [] });
  reactExports.useEffect(() => {
    fetchWebhooks();
  }, [roomSlug]);
  const fetchWebhooks = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/rooms/${roomSlug}/webhooks/`);
      const data = await response.json();
      setWebhooks(data.webhooks || []);
    } catch (error) {
      toast.error("Failed to load webhooks");
    } finally {
      setLoading(false);
    }
  }, "fetchWebhooks");
  const fetchDeliveries = /* @__PURE__ */ __name(async (webhookId) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/webhooks/${webhookId}/deliveries/`);
      const data = await response.json();
      setDeliveries(data.deliveries || []);
      setSelectedWebhook(webhookId);
    } catch (error) {
      toast.error("Failed to load delivery logs");
    }
  }, "fetchDeliveries");
  const createWebhook = /* @__PURE__ */ __name(async () => {
    if (!newWebhook.name || !newWebhook.url) {
      toast.error("Name and URL are required");
      return;
    }
    try {
      await fetchWithAuth(`${apiBaseUrl}/webhooks/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newWebhook,
          room_slug: roomSlug
        })
      });
      toast.success("Webhook created successfully");
      setShowCreateForm(false);
      setNewWebhook({ name: "", url: "", events: [] });
      fetchWebhooks();
    } catch (error) {
      toast.error("Failed to create webhook");
    }
  }, "createWebhook");
  const deleteWebhook = /* @__PURE__ */ __name(async (webhookId) => {
    if (!confirm("Are you sure you want to delete this webhook?")) return;
    try {
      await fetchWithAuth(`${apiBaseUrl}/webhooks/${webhookId}/delete/`, {
        method: "DELETE"
      });
      toast.success("Webhook deleted successfully");
      fetchWebhooks();
    } catch (error) {
      toast.error("Failed to delete webhook");
    }
  }, "deleteWebhook");
  const retryDelivery = /* @__PURE__ */ __name(async (deliveryId) => {
    try {
      await fetchWithAuth(`${apiBaseUrl}/webhook/deliveries/retry/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ delivery_id: deliveryId })
      });
      toast.success("Delivery retried successfully");
      if (selectedWebhook) {
        fetchDeliveries(selectedWebhook);
      }
    } catch (error) {
      toast.error("Failed to retry delivery");
    }
  }, "retryDelivery");
  const toggleEvent = /* @__PURE__ */ __name((event) => {
    setNewWebhook((prev) => ({
      ...prev,
      events: prev.events.includes(event) ? prev.events.filter((e) => e !== event) : [...prev.events, event]
    }));
  }, "toggleEvent");
  return {
    webhooks,
    deliveries,
    loading,
    showCreateForm,
    setShowCreateForm,
    selectedWebhook,
    newWebhook,
    setNewWebhook,
    fetchDeliveries,
    createWebhook,
    deleteWebhook,
    retryDelivery,
    toggleEvent
  };
}, "useRoomWebhooks");
const RoomWebhooksPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, roomSlug }) => {
  const {
    webhooks,
    deliveries,
    loading,
    showCreateForm,
    setShowCreateForm,
    selectedWebhook,
    newWebhook,
    setNewWebhook,
    fetchDeliveries,
    createWebhook,
    deleteWebhook,
    retryDelivery,
    toggleEvent
  } = useRoomWebhooks(fetchWithAuth, apiBaseUrl, roomSlug);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaLink, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Channel Webhooks" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading webhooks..." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.sectionHeader, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "Webhooks" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setShowCreateForm(!showCreateForm), "onClick"), style: styles.addButton, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, { style: { marginRight: "5px" } }),
            "Create Webhook"
          ] })
        ] }),
        showCreateForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.createForm, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formGroup, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Webhook Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: newWebhook.name,
                onChange: /* @__PURE__ */ __name((e) => setNewWebhook({ ...newWebhook, name: e.target.value }), "onChange"),
                placeholder: "My Webhook",
                style: styles.input
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formGroup, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Payload URL" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "url",
                value: newWebhook.url,
                onChange: /* @__PURE__ */ __name((e) => setNewWebhook({ ...newWebhook, url: e.target.value }), "onChange"),
                placeholder: "https://example.com/webhook",
                style: styles.input
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formGroup, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Events to Subscribe" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.eventsGrid, children: eventTypes.map((event) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.eventCheckbox, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: newWebhook.events.includes(event),
                  onChange: /* @__PURE__ */ __name(() => toggleEvent(event), "onChange")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.eventLabel, children: event })
            ] }, event)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formActions, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: createWebhook, style: styles.createButton, children: "Create Webhook" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setShowCreateForm(false), "onClick"), style: styles.cancelButton, children: "Cancel" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.webhooksList, children: webhooks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No webhooks configured for this channel" }) : webhooks.map((webhook) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.webhookCard, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.webhookHeader, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.webhookName, children: webhook.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.webhookUrl, children: webhook.url }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.webhookEvents, children: webhook.events?.join(", ") || "All events" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.webhookActions, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => fetchDeliveries(webhook.id), "onClick"), style: styles.iconButton, title: "View Deliveries", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => deleteWebhook(webhook.id), "onClick"), style: { ...styles.iconButton, color: "#f04747" }, title: "Delete Webhook", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}) })
          ] })
        ] }) }, webhook.id)) })
      ] }),
      selectedWebhook && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "Recent Deliveries" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.deliveriesList, children: deliveries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No deliveries yet" }) : deliveries.map((delivery) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.deliveryCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.deliveryHeader, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.deliveryStatus, children: [
              delivery.status === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheckCircle, { style: { color: "#43b581" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, { style: { color: "#f04747" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.deliveryStatusText, children: delivery.status === "success" ? "Success" : "Failed" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.deliveryTime, children: new Date(delivery.delivered_at).toLocaleString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.deliveryBody, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.deliveryInfo, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Event:" }),
              " ",
              delivery.event_type
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.deliveryInfo, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Response Code:" }),
              " ",
              delivery.response_code || "N/A"
            ] }),
            delivery.error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.deliveryError, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Error:" }),
              " ",
              delivery.error
            ] })
          ] }),
          delivery.status === "failed" && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => retryDelivery(delivery.id), "onClick"), style: styles.retryButton, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaRedo, { style: { marginRight: "5px" } }),
            " Retry"
          ] })
        ] }, delivery.id)) })
      ] })
    ] }) })
  ] }) });
}, "RoomWebhooksPanel");
export {
  RoomWebhooksPanel as default
};
