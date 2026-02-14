var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a as FaTimes } from "./icons-vendor-2VDeY8fW.js";
const ThreadView = /* @__PURE__ */ __name(({ parentMessage, onClose, apiBaseUrl, token }) => {
  const [replies, setReplies] = reactExports.useState([]);
  const [newReply, setNewReply] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (parentMessage?.id) fetchReplies();
  }, [parentMessage?.id]);
  const fetchReplies = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBaseUrl}/messages/${parentMessage.id}/thread/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      setReplies(data.replies || []);
    } catch (error) {
      console.error("Thread fetch error:", error);
    }
    setLoading(false);
  }, "fetchReplies");
  const handleSendReply = /* @__PURE__ */ __name(async () => {
    if (!newReply.trim()) return;
    try {
      const res = await fetch(`${apiBaseUrl}/messages/${parentMessage.id}/reply/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ content: newReply })
      });
      if (res.ok) {
        setNewReply("");
        fetchReplies();
      }
    } catch (error) {
      console.error("Reply error:", error);
    }
  }, "handleSendReply");
  if (!parentMessage) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    position: "fixed",
    right: 0,
    top: 0,
    bottom: 0,
    width: "420px",
    background: "#36393f",
    boxShadow: "-2px 0 8px rgba(0,0,0,0.4)",
    zIndex: 100,
    display: "flex",
    flexDirection: "column"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      padding: "16px",
      borderBottom: "1px solid #202225",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { margin: 0, color: "#fff" }, children: "💬 Thread" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: {
        background: "transparent",
        border: "none",
        color: "#fff",
        cursor: "pointer",
        fontSize: "18px"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "16px", background: "#2f3136", borderBottom: "1px solid #202225" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", marginBottom: "8px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "#fff" }, children: parentMessage.username || parentMessage.sender?.username }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginLeft: "8px", fontSize: "12px", color: "#72767d" }, children: new Date(parentMessage.timestamp).toLocaleString("tr-TR") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: 0, color: "#dcddde" }, children: parentMessage.content }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { style: { color: "#72767d", fontSize: "12px" }, children: [
        replies.length,
        " yanıt"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, overflowY: "auto", padding: "16px" }, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center", color: "#aaa", padding: "20px" }, children: "Yükleniyor..." }) : replies.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center", color: "#aaa", padding: "20px" }, children: "Henüz yanıt yok" }) : replies.map((reply) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      marginBottom: "16px",
      padding: "12px",
      background: "#40444b",
      borderRadius: "8px"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", marginBottom: "8px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "#fff" }, children: reply.username || reply.sender?.username }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginLeft: "8px", fontSize: "12px", color: "#72767d" }, children: new Date(reply.timestamp).toLocaleString("tr-TR") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: 0, color: "#dcddde" }, children: reply.content })
    ] }, reply.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "16px", borderTop: "1px solid #202225" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Yanıt yaz...",
          value: newReply,
          onChange: /* @__PURE__ */ __name((e) => setNewReply(e.target.value), "onChange"),
          onKeyPress: /* @__PURE__ */ __name((e) => e.key === "Enter" && handleSendReply(), "onKeyPress"),
          style: {
            flex: 1,
            padding: "10px",
            background: "#40444b",
            border: "none",
            borderRadius: "6px",
            color: "#fff"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleSendReply,
          disabled: !newReply.trim(),
          style: {
            padding: "10px 20px",
            background: newReply.trim() ? "#5865f2" : "#4f545c",
            border: "none",
            borderRadius: "6px",
            color: "#fff",
            cursor: newReply.trim() ? "pointer" : "not-allowed",
            fontWeight: 600
          },
          children: "Gönder"
        }
      )
    ] }) })
  ] });
}, "ThreadView");
export {
  ThreadView as default
};
