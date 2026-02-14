var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { am as FaCalendarAlt, an as FaPlus, z as FaClock, bE as FaMapMarkerAlt, u as FaUsers } from "./icons-vendor-2VDeY8fW.js";
const EventCalendar = /* @__PURE__ */ __name(({ serverId, apiBaseUrl, fetchWithAuth }) => {
  const [events, setEvents] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [showCreateModal, setShowCreateModal] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (serverId) {
      loadEvents();
    }
  }, [serverId]);
  const loadEvents = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/events/?server=${serverId}`);
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error("Failed to load events:", error);
    } finally {
      setLoading(false);
    }
  }, "loadEvents");
  const handleRSVP = /* @__PURE__ */ __name(async (eventId, status) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/events/${eventId}/rsvp/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        loadEvents();
      }
    } catch (error) {
      console.error("RSVP failed:", error);
    }
  }, "handleRSVP");
  const formatDate = /* @__PURE__ */ __name((dateString) => {
    const date = new Date(dateString);
    const now = /* @__PURE__ */ new Date();
    const diffMs = date - now;
    const diffDays = Math.floor(diffMs / (1e3 * 60 * 60 * 24));
    if (diffDays === 0) return "Bugün";
    if (diffDays === 1) return "Yarın";
    if (diffDays > 0 && diffDays < 7) return `${diffDays} gün sonra`;
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }, "formatDate");
  const formatTime = /* @__PURE__ */ __name((dateString) => {
    return new Date(dateString).toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit"
    });
  }, "formatTime");
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Etkinlikler yükleniyor..." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: styles.title, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCalendarAlt, {}),
        " Etkinlikler"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setShowCreateModal(true), "onClick"), style: styles.createButton, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
        " Etkinlik Oluştur"
      ] })
    ] }),
    events.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.empty, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaCalendarAlt, { style: styles.emptyIcon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz etkinlik yok" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.emptySubtext, children: "İlk etkinliği sen oluştur!" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.eventsList, children: events.map((event) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      EventCard,
      {
        event,
        onRSVP: handleRSVP,
        formatDate,
        formatTime
      },
      event.id
    )) })
  ] });
}, "EventCalendar");
const EventCard = /* @__PURE__ */ __name(({ event, onRSVP, formatDate, formatTime }) => {
  const [userRsvp, setUserRsvp] = reactExports.useState(null);
  const handleRsvpClick = /* @__PURE__ */ __name((status) => {
    setUserRsvp(status);
    onRSVP(event.id, status);
  }, "handleRsvpClick");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.eventCard, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.eventHeader, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.eventTitle, children: event.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.eventDate, children: formatDate(event.start_time) })
    ] }),
    event.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.eventDescription, children: event.description }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.eventDetails, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.detail, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, { style: styles.detailIcon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          formatTime(event.start_time),
          " - ",
          formatTime(event.end_time)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.detail, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaMapMarkerAlt, { style: styles.detailIcon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: event.location_type === "voice" ? event.voice_channel_name || "Sesli Kanal" : "Dış Link" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.detail, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, { style: styles.detailIcon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          event.going_count,
          " katılacak,",
          event.interested_count,
          " ilgileniyor"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.rsvpButtons, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => handleRsvpClick("going"), "onClick"),
          style: {
            ...styles.rsvpButton,
            ...userRsvp === "going" ? styles.rsvpButtonActive : {}
          },
          children: "✓ Katılacağım"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => handleRsvpClick("interested"), "onClick"),
          style: {
            ...styles.rsvpButton,
            ...userRsvp === "interested" ? styles.rsvpButtonInterested : {}
          },
          children: "⭐ İlgileniyorum"
        }
      )
    ] })
  ] });
}, "EventCard");
const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#2b2d31",
    borderRadius: "8px",
    minHeight: "400px"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "1px solid #1e1f22",
    paddingBottom: "15px"
  },
  title: {
    color: "#fff",
    fontSize: "20px",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  createButton: {
    backgroundColor: "#5865f2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "background-color 0.2s"
  },
  loading: {
    color: "#b9bbbe",
    textAlign: "center",
    padding: "40px"
  },
  empty: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#b9bbbe"
  },
  emptyIcon: {
    fontSize: "64px",
    opacity: 0.3,
    marginBottom: "20px"
  },
  emptySubtext: {
    fontSize: "14px",
    opacity: 0.7
  },
  eventsList: {
    display: "grid",
    gap: "15px"
  },
  eventCard: {
    backgroundColor: "#1e1f22",
    borderRadius: "8px",
    padding: "16px",
    border: "1px solid transparent",
    transition: "border-color 0.2s"
  },
  eventHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "10px"
  },
  eventTitle: {
    color: "#fff",
    fontSize: "18px",
    margin: 0
  },
  eventDate: {
    color: "#5865f2",
    fontSize: "14px",
    fontWeight: "bold"
  },
  eventDescription: {
    color: "#b9bbbe",
    fontSize: "14px",
    marginBottom: "12px"
  },
  eventDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "16px"
  },
  detail: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#b9bbbe",
    fontSize: "13px"
  },
  detailIcon: {
    color: "#72767d",
    fontSize: "12px"
  },
  rsvpButtons: {
    display: "flex",
    gap: "10px"
  },
  rsvpButton: {
    flex: 1,
    padding: "10px",
    border: "1px solid #4e5058",
    borderRadius: "6px",
    backgroundColor: "transparent",
    color: "#b9bbbe",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s"
  },
  rsvpButtonActive: {
    backgroundColor: "#23a559",
    borderColor: "#23a559",
    color: "#fff"
  },
  rsvpButtonInterested: {
    backgroundColor: "#f0b132",
    borderColor: "#f0b132",
    color: "#1e1f22"
  }
};
export {
  EventCalendar as default
};
