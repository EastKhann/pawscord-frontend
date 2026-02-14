var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { ac as FaComments, a as FaTimes, l as FaBellSlash, k as FaBell } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const MessageThreads = /* @__PURE__ */ __name(({ messageId, onClose, fetchWithAuth, apiBaseUrl }) => {
  const [threadMessage, setThreadMessage] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [subscribed, setSubscribed] = reactExports.useState(false);
  const handleToggleSubscription = /* @__PURE__ */ __name(async () => {
    try {
      const endpoint = subscribed ? "unsubscribe" : "subscribe";
      const res = await fetchWithAuth(`${apiBaseUrl}/threads/${endpoint}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thread_id: messageId })
      });
      if (res.ok) {
        setSubscribed(!subscribed);
      }
    } catch (error) {
      console.error("Subscription error:", error);
    }
  }, "handleToggleSubscription");
  const handleSendThread = /* @__PURE__ */ __name(async () => {
    if (!threadMessage.trim()) return;
    setLoading(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/threads/create/`, {
        method: "POST",
        body: JSON.stringify({
          parent_message_id: messageId,
          content: threadMessage
        })
      });
      if (res.ok) {
        toast.success("✅ Thread oluşturuldu!");
        setThreadMessage("");
        onClose();
      }
    } catch (error) {
      console.error("Thread error:", error);
    } finally {
      setLoading(false);
    }
  }, "handleSendThread");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.title, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaComments, {}),
        " Thread Başlat"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        padding: "12px",
        backgroundColor: "#2f3136",
        borderRadius: "6px",
        marginBottom: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#dcddde", fontSize: "14px" }, children: subscribed ? "🔔 Subscribed to notifications" : "🔕 Not subscribed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleToggleSubscription,
            style: {
              padding: "6px 12px",
              backgroundColor: subscribed ? "#f04747" : "#43b581",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              fontWeight: "bold"
            },
            children: subscribed ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaBellSlash, {}),
              " Unsubscribe"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaBell, {}),
              " Subscribe"
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: threadMessage,
          onChange: /* @__PURE__ */ __name((e) => setThreadMessage(e.target.value), "onChange"),
          placeholder: "Thread mesajını yazın...",
          style: styles.textarea
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleSendThread,
          disabled: loading || !threadMessage.trim(),
          style: styles.sendButton,
          children: loading ? "Gönderiliyor..." : "💬 Thread Gönder"
        }
      )
    ] })
  ] }) });
}, "MessageThreads");
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
    maxWidth: "500px"
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
    fontSize: "1.3em",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    fontSize: "1.3em"
  },
  content: {
    padding: "20px"
  },
  textarea: {
    width: "100%",
    minHeight: "100px",
    padding: "10px",
    backgroundColor: "#40444b",
    border: "1px solid #5865f2",
    borderRadius: "4px",
    color: "white",
    fontSize: "1em",
    resize: "vertical",
    marginBottom: "15px"
  },
  sendButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "4px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1em"
  }
};
export {
  MessageThreads as default
};
