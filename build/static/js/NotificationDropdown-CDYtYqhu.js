var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { k as FaBell, a as FaTimes, S as FaCheckDouble, g as FaTrash, a9 as FaCheck } from "./icons-vendor-2VDeY8fW.js";
import { d as confirmDialog } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const NotificationDropdown = /* @__PURE__ */ __name(({
  fetchWithAuth,
  apiBaseUrl,
  currentUser,
  onClose
}) => {
  const [notifications, setNotifications] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const dropdownRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    loadNotifications();
  }, []);
  reactExports.useEffect(() => {
    const handleClickOutside = /* @__PURE__ */ __name((e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    }, "handleClickOutside");
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);
  const loadNotifications = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/notifications/`);
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.results || data);
      }
    } catch (error) {
      console.error("Notification yükleme hatası:", error);
    } finally {
      setLoading(false);
    }
  }, "loadNotifications");
  const markAsRead = /* @__PURE__ */ __name(async (notificationId) => {
    try {
      await fetchWithAuth(`${apiBaseUrl}/notifications/${notificationId}/read/`, {
        method: "POST"
      });
      setNotifications(
        (prev) => prev.map((n) => n.id === notificationId ? { ...n, is_read: true } : n)
      );
    } catch (error) {
      console.error("Mark as read hatası:", error);
    }
  }, "markAsRead");
  const markAllAsRead = /* @__PURE__ */ __name(async () => {
    try {
      await fetchWithAuth(`${apiBaseUrl}/notifications/mark_all_read/`, {
        method: "POST"
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    } catch (error) {
      console.error("Mark all as read hatası:", error);
    }
  }, "markAllAsRead");
  const deleteNotification = /* @__PURE__ */ __name(async (notificationId) => {
    try {
      await fetchWithAuth(`${apiBaseUrl}/notifications/${notificationId}/`, {
        method: "DELETE"
      });
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    } catch (error) {
      console.error("Notification silme hatası:", error);
    }
  }, "deleteNotification");
  const clearAll = /* @__PURE__ */ __name(async () => {
    if (!await confirmDialog("Tüm bildirimleri silmek istediğinize emin misiniz?")) return;
    try {
      await fetchWithAuth(`${apiBaseUrl}/notifications/clear_all/`, {
        method: "POST"
      });
      setNotifications([]);
    } catch (error) {
      console.error("Clear all hatası:", error);
    }
  }, "clearAll");
  const getNotificationIcon = /* @__PURE__ */ __name((type) => {
    switch (type) {
      case "message":
        return "💬";
      case "mention":
        return "@";
      case "friend_request":
        return "👥";
      case "server_invite":
        return "🏠";
      case "reaction":
        return "👍";
      case "reply":
        return "↩️";
      default:
        return "🔔";
    }
  }, "getNotificationIcon");
  const formatTime = /* @__PURE__ */ __name((timestamp) => {
    const date = new Date(timestamp);
    const now = /* @__PURE__ */ new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 6e4);
    const diffHours = Math.floor(diffMs / 36e5);
    const diffDays = Math.floor(diffMs / 864e5);
    if (diffMins < 1) return "Az önce";
    if (diffMins < 60) return `${diffMins} dakika önce`;
    if (diffHours < 24) return `${diffHours} saat önce`;
    if (diffDays < 7) return `${diffDays} gün önce`;
    return date.toLocaleDateString();
  }, "formatTime");
  const unreadCount = notifications.filter((n) => !n.is_read).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: dropdownRef, style: styles.dropdown, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaBell, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.headerTitle, children: "Bildirimler" }),
        unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.badge, children: unreadCount })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    notifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.actions, children: [
      unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: markAllAsRead, style: styles.actionButton, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheckDouble, {}),
        " Tümünü okundu işaretle"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: clearAll, style: { ...styles.actionButton, color: "#ed4245" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}),
        " Tümünü temizle"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.list, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Yükleniyor..." }) : notifications.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.empty, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.emptyIcon, children: "🔔" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Bildirim yok" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.emptySubtext, children: "Yeni bildirimler burada görünecek" })
    ] }) : notifications.map((notification) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          ...styles.notificationItem,
          backgroundColor: notification.is_read ? "transparent" : "rgba(88, 101, 242, 0.05)"
        },
        onClick: /* @__PURE__ */ __name(() => !notification.is_read && markAsRead(notification.id), "onClick"),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.notificationIcon, children: getNotificationIcon(notification.notification_type) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.notificationContent, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.notificationMessage, children: notification.message }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.notificationTime, children: formatTime(notification.created_at) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.notificationActions, children: [
            !notification.is_read && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: /* @__PURE__ */ __name((e) => {
                  e.stopPropagation();
                  markAsRead(notification.id);
                }, "onClick"),
                style: styles.iconButton,
                title: "Okundu işaretle",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, {})
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: /* @__PURE__ */ __name((e) => {
                  e.stopPropagation();
                  deleteNotification(notification.id);
                }, "onClick"),
                style: styles.iconButton,
                title: "Sil",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {})
              }
            )
          ] })
        ]
      },
      notification.id
    )) })
  ] });
}, "NotificationDropdown");
const styles = {
  dropdown: {
    position: "absolute",
    top: "100%",
    right: 0,
    marginTop: "8px",
    width: "420px",
    maxWidth: "90vw",
    maxHeight: "600px",
    backgroundColor: "#2b2d31",
    borderRadius: "8px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.5)",
    zIndex: 1e4,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  },
  header: {
    padding: "16px",
    borderBottom: "1px solid #1e1f22",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e1f22"
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#fff",
    fontSize: "1em",
    fontWeight: "600"
  },
  headerTitle: {
    fontSize: "1em",
    fontWeight: "600"
  },
  badge: {
    backgroundColor: "#ed4245",
    color: "#fff",
    fontSize: "0.75em",
    fontWeight: "bold",
    padding: "2px 6px",
    borderRadius: "10px",
    minWidth: "18px",
    textAlign: "center"
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    fontSize: "1.2em",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    borderRadius: "4px",
    transition: "all 0.15s"
  },
  actions: {
    padding: "12px",
    display: "flex",
    gap: "8px",
    borderBottom: "1px solid #1e1f22",
    flexWrap: "wrap"
  },
  actionButton: {
    background: "none",
    border: "1px solid #40444b",
    color: "#b9bbbe",
    cursor: "pointer",
    fontSize: "0.85em",
    padding: "6px 12px",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.15s"
  },
  list: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden"
  },
  loading: {
    padding: "40px",
    textAlign: "center",
    color: "#b9bbbe"
  },
  empty: {
    padding: "40px 20px",
    textAlign: "center",
    color: "#b9bbbe"
  },
  emptyIcon: {
    fontSize: "3em",
    marginBottom: "12px",
    opacity: 0.5
  },
  emptySubtext: {
    fontSize: "0.85em",
    color: "#72767d",
    marginTop: "8px"
  },
  notificationItem: {
    padding: "12px 16px",
    display: "flex",
    gap: "12px",
    borderBottom: "1px solid #1e1f22",
    cursor: "pointer",
    transition: "background-color 0.15s"
  },
  notificationIcon: {
    fontSize: "1.5em",
    flexShrink: 0
  },
  notificationContent: {
    flex: 1,
    minWidth: 0
  },
  notificationMessage: {
    color: "#dbdee1",
    fontSize: "0.9em",
    lineHeight: "1.4",
    marginBottom: "4px"
  },
  notificationTime: {
    color: "#72767d",
    fontSize: "0.75em"
  },
  notificationActions: {
    display: "flex",
    gap: "4px",
    flexShrink: 0
  },
  iconButton: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    fontSize: "0.9em",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    borderRadius: "4px",
    transition: "all 0.15s"
  }
};
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    .notification-item:hover {
        background-color: rgba(255, 255, 255, 0.05) !important;
    }
    .icon-button-notification:hover {
        background-color: rgba(255, 255, 255, 0.1);
        color: #fff;
    }
    .close-button-notification:hover {
        background-color: rgba(255, 255, 255, 0.1);
        color: #fff;
    }
    .action-button-notification:hover {
        background-color: rgba(88, 101, 242, 0.1);
        color: #fff;
        border-color: #5865f2;
    }
`;
document.head.appendChild(styleSheet);
export {
  NotificationDropdown as default
};
