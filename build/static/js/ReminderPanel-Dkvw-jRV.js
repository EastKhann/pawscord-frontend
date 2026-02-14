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
const ReminderPanel = /* @__PURE__ */ __name(({ serverId, onClose }) => {
  const apiBaseUrl = getApiBase();
  const [reminders, setReminders] = reactExports.useState([]);
  const [showCreateModal, setShowCreateModal] = reactExports.useState(false);
  const [newReminder, setNewReminder] = reactExports.useState({
    title: "",
    description: "",
    remind_at: "",
    repeat: "once",
    channel_id: "",
    mention_user_id: ""
  });
  const [channels, setChannels] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    fetchReminders();
    fetchChannels();
  }, [serverId]);
  const fetchReminders = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/reminders/server/${serverId}/`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` }
      });
      if (response.ok) {
        const data = await response.json();
        setReminders(data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, "fetchReminders");
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
  const createReminder = /* @__PURE__ */ __name(async () => {
    if (!newReminder.title || !newReminder.remind_at || !newReminder.channel_id) {
      y.error("❌ Lütfen gerekli alanları doldurun");
      return;
    }
    try {
      const response = await fetch(`${apiBaseUrl}/reminders/create/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ server_id: serverId, ...newReminder })
      });
      if (response.ok) {
        y.success("✅ Hatırlatıcı oluşturuldu");
        setShowCreateModal(false);
        fetchReminders();
        setNewReminder({ title: "", description: "", remind_at: "", repeat: "once", channel_id: "", mention_user_id: "" });
      } else {
        y.error("❌ Oluşturma hatası");
      }
    } catch (error) {
      y.error("❌ Bağlantı hatası");
    }
  }, "createReminder");
  const deleteReminder = /* @__PURE__ */ __name(async (id) => {
    if (!await confirmDialog("Hatırlatıcıyı silmek istediğinize emin misiniz?")) return;
    try {
      const response = await fetch(`${apiBaseUrl}/reminders/${id}/delete/`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` }
      });
      if (response.ok) {
        y.success("✅ Hatırlatıcı silindi");
        fetchReminders();
      }
    } catch (error) {
      y.error("❌ Silme hatası");
    }
  }, "deleteReminder");
  const triggerNow = /* @__PURE__ */ __name(async (id) => {
    try {
      const response = await fetch(`${apiBaseUrl}/reminders/${id}/trigger/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` }
      });
      if (response.ok) {
        y.success("✅ Hatırlatıcı tetiklendi");
      }
    } catch (error) {
      y.error("❌ Tetikleme hatası");
    }
  }, "triggerNow");
  const formatTime = /* @__PURE__ */ __name((time) => {
    return new Date(time).toLocaleString("tr-TR");
  }, "formatTime");
  const getRepeatBadge = /* @__PURE__ */ __name((repeat) => {
    const badges = {
      once: { text: "Bir kez", color: "#6b7280" },
      daily: { text: "Günlük", color: "#3b82f6" },
      weekly: { text: "Haftalık", color: "#8b5cf6" },
      monthly: { text: "Aylık", color: "#ec4899" }
    };
    return badges[repeat] || badges.once;
  }, "getRepeatBadge");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "reminder-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reminder-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reminder-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "⏰ Hatırlatıcılar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reminder-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "create-reminder-btn", onClick: /* @__PURE__ */ __name(() => setShowCreateModal(true), "onClick"), children: "+ Yeni Hatırlatıcı" }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Yükleniyor..." })
      ] }) : reminders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "empty-icon", children: "⏰" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz hatırlatıcı yok" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "reminders-list", children: reminders.map((reminder) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reminder-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reminder-main", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: reminder.title }),
          reminder.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: reminder.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reminder-meta", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "⏰ ",
              formatTime(reminder.remind_at)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "📍 # ",
              channels.find((c) => c.id === reminder.channel_id)?.name
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "repeat-badge", style: { background: getRepeatBadge(reminder.repeat).color }, children: [
              "🔄 ",
              getRepeatBadge(reminder.repeat).text
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reminder-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "trigger-btn", onClick: /* @__PURE__ */ __name(() => triggerNow(reminder.id), "onClick"), children: "▶️ Tetikle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "delete-btn", onClick: /* @__PURE__ */ __name(() => deleteReminder(reminder.id), "onClick"), children: "🗑️" })
        ] })
      ] }, reminder.id)) })
    ] }),
    showCreateModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "create-modal-overlay", onClick: /* @__PURE__ */ __name(() => setShowCreateModal(false), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "create-modal", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Yeni Hatırlatıcı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: /* @__PURE__ */ __name(() => setShowCreateModal(false), "onClick"), children: "×" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-body", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Başlık *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: newReminder.title, onChange: /* @__PURE__ */ __name((e) => setNewReminder({ ...newReminder, title: e.target.value }), "onChange") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Açıklama" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: newReminder.description, onChange: /* @__PURE__ */ __name((e) => setNewReminder({ ...newReminder, description: e.target.value }), "onChange"), rows: "3" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Tarih/Saat *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "datetime-local", value: newReminder.remind_at, onChange: /* @__PURE__ */ __name((e) => setNewReminder({ ...newReminder, remind_at: e.target.value }), "onChange") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Tekrar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: newReminder.repeat, onChange: /* @__PURE__ */ __name((e) => setNewReminder({ ...newReminder, repeat: e.target.value }), "onChange"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "once", children: "Bir kez" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "daily", children: "Günlük" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "weekly", children: "Haftalık" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "monthly", children: "Aylık" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Kanal *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: newReminder.channel_id, onChange: /* @__PURE__ */ __name((e) => setNewReminder({ ...newReminder, channel_id: e.target.value }), "onChange"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Seçin" }),
            channels.map((ch) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: ch.id, children: [
              "# ",
              ch.name
            ] }, ch.id))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-footer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "cancel-btn", onClick: /* @__PURE__ */ __name(() => setShowCreateModal(false), "onClick"), children: "İptal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "submit-btn", onClick: createReminder, children: "⏰ Oluştur" })
      ] })
    ] }) })
  ] }) });
}, "ReminderPanel");
export {
  ReminderPanel as default
};
