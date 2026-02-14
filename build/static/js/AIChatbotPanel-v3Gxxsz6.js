var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { t as toast } from "./index-DGqPEDt8.js";
import { B as FaRobot, c5 as FaLightbulb, r as FaMagic, b1 as FaFileCode, aZ as FaPaperPlane, aE as FaChartBar } from "./icons-vendor-2VDeY8fW.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const AIChatbotPanel = /* @__PURE__ */ __name(({ username, apiBaseUrl, fetchWithAuth, currentRoomSlug }) => {
  const [activeTab, setActiveTab] = reactExports.useState("chat");
  const [messages, setMessages] = reactExports.useState([]);
  const [input, setInput] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [quota, setQuota] = reactExports.useState({ used: 0, limit: 100 });
  const [smartReplies, setSmartReplies] = reactExports.useState([]);
  const messagesEndRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    fetchQuota();
  }, []);
  reactExports.useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollToBottom = /* @__PURE__ */ __name(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, "scrollToBottom");
  const fetchQuota = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/ai/quota/`);
      const data = await response.json();
      setQuota(data);
    } catch (err) {
      console.error("Failed to fetch AI quota:", err);
    }
  }, "fetchQuota");
  const handleAIChat = /* @__PURE__ */ __name(async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage, timestamp: /* @__PURE__ */ new Date() }]);
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/ai/chat/`, {
        method: "POST",
        body: JSON.stringify({
          message: userMessage,
          context: currentRoomSlug || "general"
        })
      });
      const data = await response.json();
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: data.response,
        timestamp: /* @__PURE__ */ new Date()
      }]);
      fetchQuota();
      toast.success("🤖 AI yanıtladı!");
    } catch (err) {
      console.error("AI chat error:", err);
      toast.error("❌ AI hatası!");
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "Üzgünüm, bir hata oluştu.",
        timestamp: /* @__PURE__ */ new Date(),
        error: true
      }]);
    } finally {
      setLoading(false);
    }
  }, "handleAIChat");
  const handleSmartReply = /* @__PURE__ */ __name(async (messageId) => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/ai/smart-reply/`, {
        method: "POST",
        body: JSON.stringify({
          message_id: messageId,
          count: 3
        })
      });
      const data = await response.json();
      setSmartReplies(data.suggestions || []);
      toast.success("💡 Akıllı cevaplar hazır!");
    } catch (err) {
      console.error("Smart reply error:", err);
      toast.error("❌ Akıllı cevap hatası!");
    } finally {
      setLoading(false);
    }
  }, "handleSmartReply");
  const handleSummarize = /* @__PURE__ */ __name(async (messageIds) => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/ai/summarize/`, {
        method: "POST",
        body: JSON.stringify({
          message_ids: messageIds,
          max_length: 200
        })
      });
      const data = await response.json();
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: `📝 **Özet:**

${data.summary}`,
        timestamp: /* @__PURE__ */ new Date(),
        type: "summary"
      }]);
      toast.success("📝 Mesajlar özetlendi!");
    } catch (err) {
      console.error("Summarize error:", err);
      toast.error("❌ Özetleme hatası!");
    } finally {
      setLoading(false);
    }
  }, "handleSummarize");
  const handleCodeGeneration = /* @__PURE__ */ __name(async (prompt) => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/ai/code/`, {
        method: "POST",
        body: JSON.stringify({
          prompt,
          language: "javascript"
        })
      });
      const data = await response.json();
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: `\`\`\`${data.language}
${data.code}
\`\`\`

${data.explanation || ""}`,
        timestamp: /* @__PURE__ */ new Date(),
        type: "code"
      }]);
      toast.success("💻 Kod oluşturuldu!");
    } catch (err) {
      console.error("Code generation error:", err);
      toast.error("❌ Kod üretme hatası!");
    } finally {
      setLoading(false);
    }
  }, "handleCodeGeneration");
  const renderQuotaBar = /* @__PURE__ */ __name(() => {
    const percentage = quota.used / quota.limit * 100;
    const color = percentage > 90 ? "#ed4245" : percentage > 70 ? "#faa61a" : "#43b581";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ai-quota-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ai-quota-info", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartBar, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "AI Kullanım: ",
          quota.used,
          " / ",
          quota.limit
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ai-quota-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "ai-quota-fill",
          style: { width: `${percentage}%`, backgroundColor: color }
        }
      ) })
    ] });
  }, "renderQuotaBar");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ai-chatbot-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ai-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ai-header-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, { size: 28 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "ai-title", children: "AI Assistant" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "ai-subtitle", children: "Discord'u geçen AI özellikleri" })
        ] })
      ] }),
      renderQuotaBar()
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ai-tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: activeTab === "chat" ? "active" : "",
          onClick: /* @__PURE__ */ __name(() => setActiveTab("chat"), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, {}),
            " Chat"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: activeTab === "smart-reply" ? "active" : "",
          onClick: /* @__PURE__ */ __name(() => setActiveTab("smart-reply"), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaLightbulb, {}),
            " Smart Reply"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: activeTab === "summarize" ? "active" : "",
          onClick: /* @__PURE__ */ __name(() => setActiveTab("summarize"), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaMagic, {}),
            " Özetle"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: activeTab === "code" ? "active" : "",
          onClick: /* @__PURE__ */ __name(() => setActiveTab("code"), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaFileCode, {}),
            " Kod Oluştur"
          ]
        }
      )
    ] }),
    activeTab === "chat" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ai-chat-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ai-messages", children: [
        messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ai-empty-state", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, { size: 48 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "AI Assistant'a Hoş Geldin!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Soru sor, kod yazdır, mesajları özetle veya açıklama iste." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ai-suggestions", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setInput("JavaScript ile bir todo list nasıl yapılır?"), "onClick"), children: "💻 Kod örneği iste" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setInput("React hooks nedir?"), "onClick"), children: "🎓 Kavram açıkla" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setInput("Bugün hava nasıl?"), "onClick"), children: "💬 Sohbet et" })
          ] })
        ] }) : messages.map((msg, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `ai-message ${msg.role} ${msg.error ? "error" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ai-message-avatar", children: msg.role === "user" ? "👤" : "🤖" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ai-message-content", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ai-message-header", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: msg.role === "user" ? username : "AI Assistant" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ai-message-time", children: msg.timestamp.toLocaleTimeString("tr-TR", {
                    hour: "2-digit",
                    minute: "2-digit"
                  }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ai-message-text", children: msg.content.split("```").map(
                  (part, i) => i % 2 === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: part }, i) : /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "ai-code-block", children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: part }) }, i)
                ) })
              ] })
            ]
          },
          index
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messagesEndRef })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAIChat, className: "ai-input-form", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: input,
            onChange: /* @__PURE__ */ __name((e) => setInput(e.target.value), "onChange"),
            placeholder: "AI'ya bir şey sor...",
            disabled: loading,
            className: "ai-input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading || !input.trim(), className: "ai-send-btn", children: loading ? "⏳" : /* @__PURE__ */ jsxRuntimeExports.jsx(FaPaperPlane, {}) })
      ] })
    ] }),
    activeTab === "smart-reply" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ai-feature-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ai-feature-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaLightbulb, { size: 32 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Akıllı Cevap Önerileri" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Mesajlara otomatik yanıt önerileri" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => handleSmartReply("last-message-id"), "onClick"),
          disabled: loading,
          className: "ai-action-btn",
          children: "💡 Son Mesaja Akıllı Cevap Öner"
        }
      ),
      smartReplies.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ai-smart-replies", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { children: "Önerilen Cevaplar:" }),
        smartReplies.map((reply, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ai-smart-reply-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: reply }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setInput(reply), "onClick"), children: "Kullan" })
        ] }, index))
      ] })
    ] }),
    activeTab === "summarize" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ai-feature-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ai-feature-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaMagic, { size: 32 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Mesaj Özetleme" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Uzun konuşmaları tek paragrafta özetle" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => handleSummarize(["msg1", "msg2", "msg3"]), "onClick"),
          disabled: loading,
          className: "ai-action-btn",
          children: "📝 Son 50 Mesajı Özetle"
        }
      )
    ] }),
    activeTab === "code" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ai-feature-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ai-feature-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaFileCode, { size: 32 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Kod Üretimi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "AI ile kod yaz, GitHub Copilot gibi" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: /* @__PURE__ */ __name((e) => {
        e.preventDefault();
        handleCodeGeneration(input);
      }, "onSubmit"), className: "ai-code-form", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: input,
            onChange: /* @__PURE__ */ __name((e) => setInput(e.target.value), "onChange"),
            placeholder: "Ne yapmak istiyorsun? Örn: 'React'te bir sayaç komponenti yap'",
            rows: 4,
            className: "ai-code-textarea"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading || !input.trim(), className: "ai-action-btn", children: "💻 Kod Üret" })
      ] })
    ] })
  ] });
}, "AIChatbotPanel");
export {
  AIChatbotPanel as default
};
