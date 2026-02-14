var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { B as FaRobot, a as FaTimes, a_ as FaReply, O as FaChartLine, r as FaMagic, n as FaSmile, c5 as FaLightbulb, Q as FaStar, a9 as FaCheck, aV as FaCopy, aF as FaHashtag, c6 as FaCommentAlt, ad as FaUserPlus } from "./icons-vendor-2VDeY8fW.js";
import { g as getApiBase } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const SmartSuggestionsPanel = /* @__PURE__ */ __name(({ serverId, channelId, onClose, onUseSuggestion, fetchWithAuth }) => {
  const [suggestions, setSuggestions] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [activeTab, setActiveTab] = reactExports.useState("replies");
  const [copiedId, setCopiedId] = reactExports.useState(null);
  const loadSuggestions = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${getApiBase()}/channels/${channelId}/suggestions/`);
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
      } else {
        setSuggestions({
          quick_replies: [
            { id: 1, text: "That's a great idea! 🎉", confidence: 95, context: "Positive response" },
            { id: 2, text: "I'll look into that and get back to you.", confidence: 88, context: "Action commitment" },
            { id: 3, text: "Thanks for sharing! Very helpful.", confidence: 85, context: "Appreciation" },
            { id: 4, text: "Could you elaborate on that?", confidence: 82, context: "Clarification" },
            { id: 5, text: "Let me check the documentation first.", confidence: 78, context: "Investigation" }
          ],
          trending_topics: [
            { topic: "Server Events", mentions: 45, trend: "up" },
            { topic: "Gaming Night", mentions: 38, trend: "up" },
            { topic: "Music Playlist", mentions: 27, trend: "stable" },
            { topic: "New Members", mentions: 23, trend: "down" }
          ],
          suggested_emojis: ["👍", "🎉", "❤️", "🔥", "😂", "🙏", "💯", "✨"],
          conversation_insights: {
            sentiment: "positive",
            activity_level: "high",
            response_rate: 87,
            avg_response_time: "2.3 min"
          },
          smart_actions: [
            { id: 1, action: "Create a poll about this topic", icon: "poll", type: "engagement" },
            { id: 2, action: "Share relevant resources", icon: "share", type: "helpful" },
            { id: 3, action: "Invite related experts", icon: "invite", type: "growth" },
            { id: 4, action: "Pin important message", icon: "pin", type: "moderation" }
          ]
        });
      }
    } catch (error) {
      console.error("Error loading suggestions:", error);
      setSuggestions({ quick_replies: [], trending_topics: [], suggested_emojis: [] });
    }
    setLoading(false);
  }, [channelId, fetchWithAuth]);
  reactExports.useEffect(() => {
    loadSuggestions();
  }, [loadSuggestions]);
  const handleCopy = /* @__PURE__ */ __name((text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2e3);
  }, "handleCopy");
  const handleUseSuggestion = /* @__PURE__ */ __name((text) => {
    if (onUseSuggestion) {
      onUseSuggestion(text);
    }
    onClose();
  }, "handleUseSuggestion");
  const getSentimentColor = /* @__PURE__ */ __name((sentiment) => {
    switch (sentiment) {
      case "positive":
        return "#10b981";
      case "neutral":
        return "#6b7280";
      case "negative":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  }, "getSentimentColor");
  const getTrendIcon = /* @__PURE__ */ __name((trend) => {
    if (trend === "up") return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "trend up", children: "↑" });
    if (trend === "down") return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "trend down", children: "↓" });
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "trend stable", children: "→" });
  }, "getTrendIcon");
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "smart-suggestions-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "smart-suggestions-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, { className: "pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Analyzing conversation..." })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "smart-suggestions-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "smart-suggestions-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-info", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, {}),
          " Smart Suggestions"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "powered-by", children: "Powered by AI" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "insights-bar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "insight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "insight-label", children: "Sentiment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "insight-value sentiment",
            style: { color: getSentimentColor(suggestions?.conversation_insights?.sentiment) },
            children: suggestions?.conversation_insights?.sentiment || "neutral"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "insight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "insight-label", children: "Activity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "insight-value", children: suggestions?.conversation_insights?.activity_level || "normal" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "insight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "insight-label", children: "Response Rate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "insight-value", children: [
          suggestions?.conversation_insights?.response_rate || 0,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "insight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "insight-label", children: "Avg. Response" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "insight-value", children: suggestions?.conversation_insights?.avg_response_time || "N/A" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `tab ${activeTab === "replies" ? "active" : ""}`,
          onClick: /* @__PURE__ */ __name(() => setActiveTab("replies"), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaReply, {}),
            " Quick Replies"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `tab ${activeTab === "topics" ? "active" : ""}`,
          onClick: /* @__PURE__ */ __name(() => setActiveTab("topics"), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, {}),
            " Trending"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `tab ${activeTab === "actions" ? "active" : ""}`,
          onClick: /* @__PURE__ */ __name(() => setActiveTab("actions"), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaMagic, {}),
            " Smart Actions"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tab-content", children: [
      activeTab === "replies" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "replies-tab", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "emoji-bar", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "emoji-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaSmile, {}),
            " Quick Reactions:"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "emoji-list", children: (suggestions?.suggested_emojis || []).map((emoji, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "emoji-btn",
              onClick: /* @__PURE__ */ __name(() => handleUseSuggestion(emoji), "onClick"),
              title: "Click to use",
              children: emoji
            },
            index
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "replies-list", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaLightbulb, {}),
            " Suggested Replies"
          ] }),
          (suggestions?.quick_replies || []).map((reply) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reply-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reply-content", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "reply-text", children: reply.text }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reply-meta", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "context", children: reply.context }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "confidence", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FaStar, {}),
                  " ",
                  reply.confidence,
                  "%"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reply-actions", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "action-btn copy",
                  onClick: /* @__PURE__ */ __name(() => handleCopy(reply.text, reply.id), "onClick"),
                  title: "Copy to clipboard",
                  children: copiedId === reply.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaCopy, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "action-btn use",
                  onClick: /* @__PURE__ */ __name(() => handleUseSuggestion(reply.text), "onClick"),
                  title: "Use this reply",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaReply, {})
                }
              )
            ] })
          ] }, reply.id))
        ] })
      ] }),
      activeTab === "topics" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "topics-tab", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaHashtag, {}),
          " Trending Topics in This Channel"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "topics-list", children: [
          (suggestions?.trending_topics || []).map((topic, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "topic-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "topic-rank", children: [
              "#",
              index + 1
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "topic-info", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "topic-name", children: topic.topic }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "topic-mentions", children: [
                topic.mentions,
                " mentions"
              ] })
            ] }),
            getTrendIcon(topic.trend)
          ] }, index)),
          (!suggestions?.trending_topics || suggestions.trending_topics.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state", children: "No trending topics yet" })
        ] })
      ] }),
      activeTab === "actions" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "actions-tab", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaMagic, {}),
          " Recommended Actions"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "actions-list", children: (suggestions?.smart_actions || []).map((action) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `action-item ${action.type}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "action-icon", children: [
            action.icon === "poll" && /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, {}),
            action.icon === "share" && /* @__PURE__ */ jsxRuntimeExports.jsx(FaCommentAlt, {}),
            action.icon === "invite" && /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserPlus, {}),
            action.icon === "pin" && /* @__PURE__ */ jsxRuntimeExports.jsx(FaStar, {})
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "action-text", children: action.action }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `action-type ${action.type}`, children: action.type })
        ] }, action.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ai-tip", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "These suggestions are based on conversation patterns and community engagement metrics." })
        ] })
      ] })
    ] })
  ] }) });
}, "SmartSuggestionsPanel");
export {
  SmartSuggestionsPanel as default
};
