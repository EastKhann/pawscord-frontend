var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { a as React, r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a as FaTimes, g as FaTrash, br as FaBookmark, Q as FaStar, z as FaClock } from "./icons-vendor-2VDeY8fW.js";
const SavedMessagesModal = /* @__PURE__ */ __name(({ type = "bookmarks", onClose, fetchWithAuth, apiBaseUrl, onScrollToMessage }) => {
  const [messages, setMessages] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    loadMessages();
  }, [type]);
  const loadMessages = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      let endpoint = "";
      if (type === "bookmarks") endpoint = "/messages/favorites/";
      else if (type === "starred") endpoint = "/messages/favorites/";
      else if (type === "readlater") endpoint = "/messages/readlater/list/";
      const res = await fetchWithAuth(`${apiBaseUrl}${endpoint}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || data.results || []);
      }
    } catch (error) {
      console.error("Load saved messages error:", error);
    } finally {
      setLoading(false);
    }
  }, "loadMessages");
  const handleRemove = /* @__PURE__ */ __name(async (messageId) => {
    try {
      let endpoint = "";
      if (type === "bookmarks") endpoint = "/messages/bookmark/toggle/";
      else if (type === "starred") endpoint = "/messages/star/toggle/";
      else if (type === "readlater") endpoint = "/messages/readlater/toggle/";
      await fetchWithAuth(`${apiBaseUrl}${endpoint}`, {
        method: "POST",
        body: JSON.stringify({ message_id: messageId })
      });
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    } catch (error) {
      console.error("Remove error:", error);
    }
  }, "handleRemove");
  const getTitle = /* @__PURE__ */ __name(() => {
    if (type === "bookmarks") return "📑 Bookmarklar";
    if (type === "starred") return "⭐ Yıldızlı Mesajlar";
    if (type === "readlater") return "🕐 Sonra Oku";
    return "Kaydedilen Mesajlar";
  }, "getTitle");
  const getIcon = /* @__PURE__ */ __name(() => {
    if (type === "bookmarks") return /* @__PURE__ */ jsxRuntimeExports.jsx(FaBookmark, {});
    if (type === "starred") return /* @__PURE__ */ jsxRuntimeExports.jsx(FaStar, {});
    if (type === "readlater") return /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {});
    return null;
  }, "getIcon");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: styles.title, children: [
        getIcon(),
        " ",
        getTitle()
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Yükleniyor..." }) : messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "Henüz kaydedilmiş mesaj yok" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.messageList, children: messages.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.messageItem, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.messageContent, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.messageHeader, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.username, children: msg.username }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.timestamp, children: new Date(msg.timestamp).toLocaleString("tr-TR") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.messageText, children: [
          msg.content?.substring(0, 150),
          msg.content?.length > 150 && "..."
        ] }),
        msg.room_name && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.roomTag, children: [
          "#",
          msg.room_name
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.actions, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => {
              if (onScrollToMessage) {
                onScrollToMessage(msg.id);
                onClose();
              }
            }, "onClick"),
            style: styles.actionButton,
            title: "Mesaja git",
            children: "→"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => handleRemove(msg.id), "onClick"),
            style: { ...styles.actionButton, color: "#f04747" },
            title: "Kaldır",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {})
          }
        )
      ] })
    ] }, msg.id)) }) })
  ] }) });
}, "SavedMessagesModal");
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
    maxWidth: "700px",
    maxHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 8px 16px rgba(0,0,0,0.4)"
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
    fontSize: "1.5em",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    fontSize: "1.5em",
    padding: "5px"
  },
  content: {
    padding: "20px",
    overflowY: "auto",
    flex: 1
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
  messageList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  messageItem: {
    backgroundColor: "#40444b",
    borderRadius: "4px",
    padding: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "10px"
  },
  messageContent: {
    flex: 1
  },
  messageHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "5px"
  },
  username: {
    color: "#5865f2",
    fontWeight: "bold",
    fontSize: "0.9em"
  },
  timestamp: {
    color: "#72767d",
    fontSize: "0.75em"
  },
  messageText: {
    color: "#dcddde",
    fontSize: "0.9em",
    marginBottom: "5px"
  },
  roomTag: {
    display: "inline-block",
    backgroundColor: "#5865f2",
    color: "white",
    padding: "2px 8px",
    borderRadius: "10px",
    fontSize: "0.7em",
    fontWeight: "bold"
  },
  actions: {
    display: "flex",
    gap: "5px"
  },
  actionButton: {
    background: "none",
    border: "1px solid #72767d",
    color: "#b9bbbe",
    cursor: "pointer",
    padding: "5px 10px",
    borderRadius: "4px",
    fontSize: "0.9em"
  }
};
const SavedMessagesModal$1 = React.memo(SavedMessagesModal);
export {
  SavedMessagesModal$1 as default
};
