var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
import "./ui-vendor-iPoN0WGz.js";
const ScheduledMessagesPanel = /* @__PURE__ */ __name(({ apiBaseUrl, roomSlug, onClose }) => {
  const [scheduledMessages, setScheduledMessages] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [showCreateForm, setShowCreateForm] = reactExports.useState(false);
  const [newMessage, setNewMessage] = reactExports.useState({
    content: "",
    scheduled_time: "",
    room_slug: roomSlug || ""
  });
  reactExports.useEffect(() => {
    fetchScheduledMessages();
  }, []);
  const fetchScheduledMessages = /* @__PURE__ */ __name(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/scheduled/list/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setScheduledMessages(data.scheduled_messages || []);
      } else {
        toast.error("❌ Zamanlanmış mesajlar yüklenemedi");
      }
    } catch (error) {
      console.error("Fetch scheduled messages error:", error);
      toast.error("❌ Bağlantı hatası");
    } finally {
      setLoading(false);
    }
  }, "fetchScheduledMessages");
  const createScheduledMessage = /* @__PURE__ */ __name(async () => {
    if (!newMessage.content.trim()) {
      toast.error("❌ Mesaj içeriği boş olamaz");
      return;
    }
    if (!newMessage.scheduled_time) {
      toast.error("❌ Tarih ve saat seçiniz");
      return;
    }
    if (!newMessage.room_slug) {
      toast.error("❌ Kanal seçiniz");
      return;
    }
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/scheduled/create/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newMessage)
      });
      if (response.ok) {
        const data = await response.json();
        setScheduledMessages([...scheduledMessages, data.scheduled_message]);
        setShowCreateForm(false);
        setNewMessage({ content: "", scheduled_time: "", room_slug: roomSlug || "" });
        toast.success("✅ Mesaj zamanlandı");
      } else {
        const error = await response.json();
        toast.error(`❌ ${error.error || "İşlem başarısız"}`);
      }
    } catch (error) {
      console.error("Create scheduled message error:", error);
      toast.error("❌ Bağlantı hatası");
    }
  }, "createScheduledMessage");
  const cancelScheduledMessage = /* @__PURE__ */ __name(async (schedId) => {
    if (!confirm("Bu zamanlanmış mesajı iptal etmek istediğinize emin misiniz?")) {
      return;
    }
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/scheduled/cancel/${schedId}/`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        setScheduledMessages(scheduledMessages.filter((msg) => msg.id !== schedId));
        toast.success("✅ Zamanlanmış mesaj iptal edildi");
      } else {
        toast.error("❌ İptal başarısız");
      }
    } catch (error) {
      console.error("Cancel scheduled message error:", error);
      toast.error("❌ Bağlantı hatası");
    }
  }, "cancelScheduledMessage");
  const getTimeRemaining = /* @__PURE__ */ __name((scheduledTime) => {
    const now = /* @__PURE__ */ new Date();
    const scheduled = new Date(scheduledTime);
    const diff = scheduled - now;
    if (diff < 0) {
      return "Gönderildi";
    }
    const hours = Math.floor(diff / (1e3 * 60 * 60));
    const minutes = Math.floor(diff % (1e3 * 60 * 60) / (1e3 * 60));
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days} gün ${hours % 24} saat`;
    } else if (hours > 0) {
      return `${hours} saat ${minutes} dakika`;
    } else {
      return `${minutes} dakika`;
    }
  }, "getTimeRemaining");
  const formatDateTime = /* @__PURE__ */ __name((dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }, "formatDateTime");
  const getStatusColor = /* @__PURE__ */ __name((scheduledTime) => {
    const now = /* @__PURE__ */ new Date();
    const scheduled = new Date(scheduledTime);
    const diff = scheduled - now;
    if (diff < 0) return "status-sent";
    if (diff < 36e5) return "status-imminent";
    if (diff < 864e5) return "status-soon";
    return "status-scheduled";
  }, "getStatusColor");
  const getMinDateTime = /* @__PURE__ */ __name(() => {
    const now = /* @__PURE__ */ new Date();
    now.setMinutes(now.getMinutes() + 1);
    return now.toISOString().slice(0, 16);
  }, "getMinDateTime");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "scheduled-messages-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "scheduled-messages-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "scheduled-messages-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "⏰ Zamanlanmış Mesajlar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "create-btn",
            onClick: /* @__PURE__ */ __name(() => setShowCreateForm(!showCreateForm), "onClick"),
            children: showCreateForm ? "✕ İptal" : "+ Yeni Mesaj"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "✕" })
      ] })
    ] }),
    showCreateForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "create-form", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "📝 Yeni Zamanlanmış Mesaj" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Mesaj İçeriği" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            className: "message-textarea",
            placeholder: "Mesajınızı yazın...",
            value: newMessage.content,
            onChange: /* @__PURE__ */ __name((e) => setNewMessage({ ...newMessage, content: e.target.value }), "onChange"),
            rows: 4
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Kanal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              className: "form-input",
              placeholder: "room-slug",
              value: newMessage.room_slug,
              onChange: /* @__PURE__ */ __name((e) => setNewMessage({ ...newMessage, room_slug: e.target.value }), "onChange")
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Gönderim Zamanı" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "datetime-local",
              className: "form-input",
              value: newMessage.scheduled_time,
              min: getMinDateTime(),
              onChange: /* @__PURE__ */ __name((e) => setNewMessage({ ...newMessage, scheduled_time: e.target.value }), "onChange")
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "cancel-form-btn",
            onClick: /* @__PURE__ */ __name(() => {
              setShowCreateForm(false);
              setNewMessage({ content: "", scheduled_time: "", room_slug: roomSlug || "" });
            }, "onClick"),
            children: "İptal"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "submit-btn",
            onClick: createScheduledMessage,
            children: "⏰ Zamanla"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "scheduled-messages-content", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Yükleniyor..." })
    ] }) : scheduledMessages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-icon", children: "⏰" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Zamanlanmış mesaj yok" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Gelecekte gönderilmek üzere mesaj zamanlamadınız" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "create-first-btn",
          onClick: /* @__PURE__ */ __name(() => setShowCreateForm(true), "onClick"),
          children: "+ İlk Mesajı Zamanla"
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "messages-list", children: scheduledMessages.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `scheduled-message-card ${getStatusColor(msg.scheduled_time)}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "message-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "message-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "room-badge", children: [
            "# ",
            msg.room_slug
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "time-badge", children: formatDateTime(msg.scheduled_time) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "cancel-btn",
            onClick: /* @__PURE__ */ __name(() => cancelScheduledMessage(msg.id), "onClick"),
            title: "İptal Et",
            children: "🗑️"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "message-content", children: msg.content }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "message-footer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "countdown", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "countdown-icon", children: "⏳" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "countdown-text", children: getTimeRemaining(msg.scheduled_time) })
        ] }),
        msg.sent && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sent-badge", children: "✅ Gönderildi" })
      ] })
    ] }, msg.id)) }) })
  ] }) });
}, "ScheduledMessagesPanel");
export {
  ScheduledMessagesPanel as default
};
