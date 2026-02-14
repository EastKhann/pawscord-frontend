var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { k as FaBell, az as FaCog, a as FaTimes, cF as FaMobileAlt, _ as FaEnvelope, V as FaFilter, l as FaBellSlash, a9 as FaCheck } from "./icons-vendor-2VDeY8fW.js";
import { g as getApiBase, d as confirmDialog } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const NotificationsCenter = /* @__PURE__ */ __name(({ userId, onClose }) => {
  const [notifications, setNotifications] = reactExports.useState([]);
  const [unreadCount, setUnreadCount] = reactExports.useState(0);
  const [filter, setFilter] = reactExports.useState("all");
  const [settings, setSettings] = reactExports.useState(null);
  const [showSettings, setShowSettings] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(true);
  const [pushEnabled, setPushEnabled] = reactExports.useState(true);
  const [emailEnabled, setEmailEnabled] = reactExports.useState(true);
  const [mentionsOnly, setMentionsOnly] = reactExports.useState(false);
  const [dndEnabled, setDndEnabled] = reactExports.useState(false);
  const [soundEnabled, setSoundEnabled] = reactExports.useState(true);
  reactExports.useEffect(() => {
    fetchNotifications();
    fetchSettings();
  }, [userId, filter]);
  const fetchWithAuth = /* @__PURE__ */ __name(async (url, options = {}) => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(url, {
      ...options,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        ...options.headers
      }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  }, "fetchWithAuth");
  const fetchNotifications = /* @__PURE__ */ __name(async () => {
    try {
      const data = await fetchWithAuth(`${getApiBase()}/notifications/${userId}/list/?filter=${filter}`);
      setNotifications(data.notifications || []);
      setUnreadCount(data.unread_count || 0);
    } catch (error) {
      console.error("Notifications fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, "fetchNotifications");
  const fetchSettings = /* @__PURE__ */ __name(async () => {
    try {
      const data = await fetchWithAuth(`${getApiBase()}/notifications/${userId}/settings/`);
      setSettings(data);
      setPushEnabled(data.push_enabled);
      setEmailEnabled(data.email_enabled);
      setMentionsOnly(data.mentions_only);
      setDndEnabled(data.dnd_enabled);
      setSoundEnabled(data.sound_enabled);
    } catch (error) {
      console.error("Settings fetch error:", error);
    }
  }, "fetchSettings");
  const markAsRead = /* @__PURE__ */ __name(async (notificationId) => {
    try {
      await fetchWithAuth(`${getApiBase()}/notifications/${userId}/${notificationId}/read/`, {
        method: "POST"
      });
      setNotifications(notifications.map(
        (n) => n.id === notificationId ? { ...n, read: true } : n
      ));
      setUnreadCount(Math.max(0, unreadCount - 1));
    } catch (error) {
      console.error("Mark as read error:", error);
    }
  }, "markAsRead");
  const markAllAsRead = /* @__PURE__ */ __name(async () => {
    try {
      await fetchWithAuth(`${getApiBase()}/notifications/${userId}/read-all/`, {
        method: "POST"
      });
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
      showToast("All notifications marked as read!");
    } catch (error) {
      console.error("Mark all as read error:", error);
    }
  }, "markAllAsRead");
  const deleteNotification = /* @__PURE__ */ __name(async (notificationId) => {
    try {
      await fetchWithAuth(`${getApiBase()}/notifications/${userId}/${notificationId}/delete/`, {
        method: "DELETE"
      });
      setNotifications(notifications.filter((n) => n.id !== notificationId));
      showToast("Notification deleted!");
    } catch (error) {
      console.error("Delete notification error:", error);
    }
  }, "deleteNotification");
  const clearAll = /* @__PURE__ */ __name(async () => {
    if (!await confirmDialog("Are you sure you want to clear all notifications?")) return;
    try {
      await fetchWithAuth(`${getApiBase()}/notifications/${userId}/clear/`, {
        method: "POST"
      });
      setNotifications([]);
      setUnreadCount(0);
      showToast("All notifications cleared!");
    } catch (error) {
      console.error("Clear all error:", error);
    }
  }, "clearAll");
  const updateSettings = /* @__PURE__ */ __name(async () => {
    try {
      await fetchWithAuth(`${getApiBase()}/notifications/${userId}/settings/update/`, {
        method: "PUT",
        body: JSON.stringify({
          push_enabled: pushEnabled,
          email_enabled: emailEnabled,
          mentions_only: mentionsOnly,
          dnd_enabled: dndEnabled,
          sound_enabled: soundEnabled
        })
      });
      showToast("Settings updated!");
      setShowSettings(false);
    } catch (error) {
      console.error("Settings update error:", error);
    }
  }, "updateSettings");
  const testNotification = /* @__PURE__ */ __name(async () => {
    try {
      await fetchWithAuth(`${getApiBase()}/notifications/${userId}/test/`, {
        method: "POST"
      });
      showToast("Test notification sent!");
    } catch (error) {
      console.error("Test notification error:", error);
    }
  }, "testNotification");
  const getNotificationIcon = /* @__PURE__ */ __name((type) => {
    switch (type) {
      case "mention":
        return "💬";
      case "reply":
        return "↩️";
      case "like":
        return "❤️";
      case "follow":
        return "👤";
      case "server_invite":
        return "📧";
      case "role_update":
        return "🏷️";
      case "announcement":
        return "📢";
      default:
        return "🔔";
    }
  }, "getNotificationIcon");
  const formatTimestamp = /* @__PURE__ */ __name((timestamp) => {
    const date = new Date(timestamp);
    const now = /* @__PURE__ */ new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 6e4);
    const hours = Math.floor(diff / 36e5);
    const days = Math.floor(diff / 864e5);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  }, "formatTimestamp");
  const showToast = /* @__PURE__ */ __name((message, type = "success") => {
  }, "showToast");
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "notifications-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "notifications-panel loading", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loading Notifications..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "notifications-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "notifications-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaBell, {}),
          " Notifications"
        ] }),
        unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "unread-badge", children: [
          unreadCount,
          " new"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setShowSettings(!showSettings), "onClick"), className: "btn-settings", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCog, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "btn-close", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-bar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: filter === "all" ? "active" : "", onClick: /* @__PURE__ */ __name(() => setFilter("all"), "onClick"), children: "All" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: filter === "unread" ? "active" : "", onClick: /* @__PURE__ */ __name(() => setFilter("unread"), "onClick"), children: "Unread" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: filter === "mentions" ? "active" : "", onClick: /* @__PURE__ */ __name(() => setFilter("mentions"), "onClick"), children: "Mentions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: filter === "servers" ? "active" : "", onClick: /* @__PURE__ */ __name(() => setFilter("servers"), "onClick"), children: "Servers" })
    ] }),
    showSettings && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Notification Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaMobileAlt, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Push Notifications" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Receive notifications on your device" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: pushEnabled,
              onChange: /* @__PURE__ */ __name((e) => setPushEnabled(e.target.checked), "onChange")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "toggle-slider" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaEnvelope, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Email Notifications" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Receive notifications via email" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: emailEnabled,
              onChange: /* @__PURE__ */ __name((e) => setEmailEnabled(e.target.checked), "onChange")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "toggle-slider" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaBell, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Sound Effects" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Play sound when you receive notifications" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: soundEnabled,
              onChange: /* @__PURE__ */ __name((e) => setSoundEnabled(e.target.checked), "onChange")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "toggle-slider" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaFilter, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Mentions Only" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Only notify when you're mentioned" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: mentionsOnly,
              onChange: /* @__PURE__ */ __name((e) => setMentionsOnly(e.target.checked), "onChange")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "toggle-slider" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaBellSlash, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Do Not Disturb" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Mute all notifications temporarily" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: dndEnabled,
              onChange: /* @__PURE__ */ __name((e) => setDndEnabled(e.target.checked), "onChange")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "toggle-slider" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: testNotification, className: "btn-test", children: "Test Notification" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: updateSettings, className: "btn-save", children: "Save Settings" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-actions", children: [
      unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: markAllAsRead, className: "btn-mark-read", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, {}),
        " Mark All as Read"
      ] }),
      notifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: clearAll, className: "btn-clear", children: "Clear All" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "notifications-content", children: notifications.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaBell, { size: 64 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "No Notifications" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "You're all caught up!" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "notifications-list", children: notifications.map((notification) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `notification-item ${!notification.read ? "unread" : ""}`,
        onClick: /* @__PURE__ */ __name(() => !notification.read && markAsRead(notification.id), "onClick"),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "notification-icon", children: getNotificationIcon(notification.type) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "notification-body", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "notification-header", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: notification.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "notification-time", children: formatTimestamp(notification.created_at) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "notification-message", children: notification.message }),
            notification.server_name && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "notification-server", children: [
              "in ",
              notification.server_name
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: /* @__PURE__ */ __name((e) => {
                e.stopPropagation();
                deleteNotification(notification.id);
              }, "onClick"),
              className: "btn-delete-notification",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {})
            }
          ),
          !notification.read && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "unread-dot" })
        ]
      },
      notification.id
    )) }) })
  ] }) });
}, "NotificationsCenter");
export {
  NotificationsCenter as default
};
