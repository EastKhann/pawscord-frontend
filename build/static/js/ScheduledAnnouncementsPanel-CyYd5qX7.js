var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { z as FaClock, b4 as FaBullhorn, an as FaPlus, a as FaTimes, bv as FaCalendar, g as FaTrash } from "./icons-vendor-2VDeY8fW.js";
import { t as toast, d as confirmDialog } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const useScheduledAnnouncements = /* @__PURE__ */ __name((fetchWithAuth, apiBaseUrl) => {
  const [announcements, setAnnouncements] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [showCreateForm, setShowCreateForm] = reactExports.useState(false);
  const [title, setTitle] = reactExports.useState("");
  const [message, setMessage] = reactExports.useState("");
  const [scheduledDate, setScheduledDate] = reactExports.useState("");
  const [scheduledTime, setScheduledTime] = reactExports.useState("");
  const [channelId, setChannelId] = reactExports.useState("");
  const [recurring, setRecurring] = reactExports.useState(false);
  const [recurringType, setRecurringType] = reactExports.useState("daily");
  const loadScheduledAnnouncements = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/announcements/scheduled/`);
      const data = await response.json();
      setAnnouncements(data.announcements || []);
    } catch (error) {
      console.error("Failed to load scheduled announcements:", error);
      toast.error("Failed to load announcements");
    } finally {
      setLoading(false);
    }
  }, "loadScheduledAnnouncements");
  reactExports.useEffect(() => {
    loadScheduledAnnouncements();
  }, []);
  const resetForm = /* @__PURE__ */ __name(() => {
    setTitle("");
    setMessage("");
    setScheduledDate("");
    setScheduledTime("");
    setChannelId("");
    setRecurring(false);
    setRecurringType("daily");
  }, "resetForm");
  const handleScheduleAnnouncement = /* @__PURE__ */ __name(async (e) => {
    e.preventDefault();
    if (!title || !message || !scheduledDate || !scheduledTime) {
      toast.error("Please fill in all required fields");
      return;
    }
    const scheduledAt = `${scheduledDate}T${scheduledTime}:00`;
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/announcements/schedule/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          message,
          scheduled_at: scheduledAt,
          channel_id: channelId || null,
          recurring,
          recurring_type: recurring ? recurringType : null
        })
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Announcement scheduled successfully!");
        loadScheduledAnnouncements();
        resetForm();
        setShowCreateForm(false);
      } else {
        toast.error(data.error || "Failed to schedule announcement");
      }
    } catch (error) {
      console.error("Schedule error:", error);
      toast.error("Failed to schedule announcement");
    }
  }, "handleScheduleAnnouncement");
  const deleteAnnouncement = /* @__PURE__ */ __name(async (announcementId) => {
    if (!await confirmDialog("Delete this scheduled announcement?")) return;
    try {
      await fetchWithAuth(`${apiBaseUrl}/announcements/${announcementId}/delete/`, { method: "DELETE" });
      toast.success("Announcement deleted");
      loadScheduledAnnouncements();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete announcement");
    }
  }, "deleteAnnouncement");
  const getStatusColor = /* @__PURE__ */ __name((scheduledAt) => {
    const now = /* @__PURE__ */ new Date();
    const scheduled = new Date(scheduledAt);
    const diffHours = (scheduled - now) / (1e3 * 60 * 60);
    if (diffHours < 0) return "#f04747";
    if (diffHours < 24) return "#faa61a";
    return "#43b581";
  }, "getStatusColor");
  return {
    announcements,
    loading,
    showCreateForm,
    setShowCreateForm,
    title,
    setTitle,
    message,
    setMessage,
    scheduledDate,
    setScheduledDate,
    scheduledTime,
    setScheduledTime,
    channelId,
    setChannelId,
    recurring,
    setRecurring,
    recurringType,
    setRecurringType,
    handleScheduleAnnouncement,
    deleteAnnouncement,
    resetForm,
    getStatusColor
  };
}, "useScheduledAnnouncements");
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
    maxHeight: "85vh",
    display: "flex",
    flexDirection: "column",
    color: "#fff"
  },
  header: {
    padding: "20px",
    borderBottom: "1px solid #444",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  addBtn: {
    padding: "8px 16px",
    backgroundColor: "#43b581",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "24px",
    cursor: "pointer",
    padding: "8px"
  },
  content: {
    padding: "20px",
    overflowY: "auto",
    flex: 1
  },
  loading: {
    textAlign: "center",
    padding: "40px",
    color: "#99aab5"
  },
  empty: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#dcddde"
  },
  createForm: {
    maxWidth: "600px",
    margin: "0 auto"
  },
  formTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "24px"
  },
  formGroup: {
    marginBottom: "20px"
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px"
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#dcddde"
  },
  input: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#2c2f33",
    border: "1px solid #444",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "14px",
    boxSizing: "border-box"
  },
  select: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#2c2f33",
    border: "1px solid #444",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "14px"
  },
  checkboxGroup: {
    marginBottom: "20px"
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontSize: "14px"
  },
  checkbox: {
    width: "18px",
    height: "18px",
    cursor: "pointer"
  },
  formActions: {
    display: "flex",
    gap: "12px",
    marginTop: "24px"
  },
  submitBtn: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  },
  cancelBtn: {
    padding: "12px 24px",
    backgroundColor: "#4e5058",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer"
  },
  announcementsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  announcementCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "20px",
    display: "flex",
    gap: "16px",
    position: "relative",
    overflow: "hidden"
  },
  statusIndicator: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "4px"
  },
  announcementContent: {
    flex: 1,
    paddingLeft: "12px"
  },
  announcementTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "8px"
  },
  announcementMessage: {
    fontSize: "14px",
    color: "#dcddde",
    marginBottom: "12px",
    lineHeight: "1.6"
  },
  announcementMeta: {
    fontSize: "12px",
    color: "#99aab5",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap"
  },
  announcementActions: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px"
  },
  deleteIconBtn: {
    padding: "8px",
    backgroundColor: "#f04747",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px"
  }
};
const AnnouncementForm = /* @__PURE__ */ __name(({
  title,
  setTitle,
  message,
  setMessage,
  scheduledDate,
  setScheduledDate,
  scheduledTime,
  setScheduledTime,
  channelId,
  setChannelId,
  recurring,
  setRecurring,
  recurringType,
  setRecurringType,
  handleScheduleAnnouncement,
  setShowCreateForm,
  resetForm
}) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.createForm, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.formTitle, children: "Schedule New Announcement" }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleScheduleAnnouncement, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Title *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: title,
          onChange: /* @__PURE__ */ __name((e) => setTitle(e.target.value), "onChange"),
          placeholder: "Announcement title...",
          style: styles.input,
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Message *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: message,
          onChange: /* @__PURE__ */ __name((e) => setMessage(e.target.value), "onChange"),
          placeholder: "Announcement message...",
          style: { ...styles.input, minHeight: "120px" },
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formRow, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Date *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "date",
            value: scheduledDate,
            onChange: /* @__PURE__ */ __name((e) => setScheduledDate(e.target.value), "onChange"),
            style: styles.input,
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Time *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "time",
            value: scheduledTime,
            onChange: /* @__PURE__ */ __name((e) => setScheduledTime(e.target.value), "onChange"),
            style: styles.input,
            required: true
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Channel ID (Optional)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: channelId,
          onChange: /* @__PURE__ */ __name((e) => setChannelId(e.target.value), "onChange"),
          placeholder: "Leave empty for all channels",
          style: styles.input
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.checkboxGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.checkboxLabel, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "checkbox",
          checked: recurring,
          onChange: /* @__PURE__ */ __name((e) => setRecurring(e.target.checked), "onChange"),
          style: styles.checkbox
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Recurring Announcement" })
    ] }) }),
    recurring && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Repeat" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: recurringType, onChange: /* @__PURE__ */ __name((e) => setRecurringType(e.target.value), "onChange"), style: styles.select, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "daily", children: "Daily" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "weekly", children: "Weekly" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "monthly", children: "Monthly" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formActions, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", style: styles.submitBtn, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {}),
        " Schedule Announcement"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: /* @__PURE__ */ __name(() => {
        setShowCreateForm(false);
        resetForm();
      }, "onClick"), style: styles.cancelBtn, children: "Cancel" })
    ] })
  ] })
] }), "AnnouncementForm");
const ScheduledAnnouncementsPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
  const a = useScheduledAnnouncements(fetchWithAuth, apiBaseUrl);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaBullhorn, { style: { fontSize: "24px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0, fontSize: "20px" }, children: "Scheduled Announcements" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerRight, children: [
        !a.showCreateForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => a.setShowCreateForm(true), "onClick"), style: styles.addBtn, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
          " Schedule New"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: a.showCreateForm ? /* @__PURE__ */ jsxRuntimeExports.jsx(AnnouncementForm, { ...a }) : a.loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading..." }) : a.announcements.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.empty, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaBullhorn, { style: { fontSize: "48px", color: "#99aab5", marginBottom: "16px" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No scheduled announcements" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "14px", color: "#99aab5" }, children: "Schedule your first announcement to get started" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.announcementsList, children: a.announcements.map((ann) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.announcementCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.statusIndicator, backgroundColor: a.getStatusColor(ann.scheduled_at) } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.announcementContent, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.announcementTitle, children: ann.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.announcementMessage, children: ann.message }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.announcementMeta, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCalendar, {}),
            " ",
            new Date(ann.scheduled_at).toLocaleString()
          ] }),
          ann.recurring && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { margin: "0 8px" }, children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "🔁",
              " ",
              ann.recurring_type
            ] })
          ] }),
          ann.channel_id && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { margin: "0 8px" }, children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "📺",
              " Channel: ",
              ann.channel_id
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.announcementActions, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => a.deleteAnnouncement(ann.id), "onClick"), style: styles.deleteIconBtn, title: "Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}) }) })
    ] }, ann.id)) }) })
  ] }) });
}, "ScheduledAnnouncementsPanel");
export {
  ScheduledAnnouncementsPanel as default
};
