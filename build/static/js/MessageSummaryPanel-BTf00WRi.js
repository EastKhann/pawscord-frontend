var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { B as FaRobot, a as FaTimes, cG as FaCompressArrowsAlt, aF as FaHashtag, z as FaClock, av as FaFileAlt, v as FaSpinner, aV as FaCopy, a5 as FaDownload, bv as FaCalendar, aE as FaChartBar } from "./icons-vendor-2VDeY8fW.js";
import { p as purify } from "./purify.es-BRhsgAzF.js";
const MessageSummaryPanel = /* @__PURE__ */ __name(({ channelId, onClose, fetchWithAuth, apiBaseUrl }) => {
  const [loading, setLoading] = reactExports.useState(false);
  const [summaries, setSummaries] = reactExports.useState([]);
  const [currentSummary, setCurrentSummary] = reactExports.useState(null);
  const [generating, setGenerating] = reactExports.useState(false);
  const [timeRange, setTimeRange] = reactExports.useState("24h");
  const [messageCount, setMessageCount] = reactExports.useState(100);
  const [selectedChannel, setSelectedChannel] = reactExports.useState(channelId);
  const [channels, setChannels] = reactExports.useState([]);
  reactExports.useEffect(() => {
    loadData();
  }, [channelId]);
  const loadData = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const channelsRes = await fetchWithAuth(`${apiBaseUrl}/rooms/list/`);
      if (channelsRes.ok) {
        const channelsData = await channelsRes.json();
        setChannels(channelsData.rooms || channelsData || []);
      }
      const summariesRes = await fetchWithAuth(`${apiBaseUrl}/messages/summaries/`);
      if (summariesRes.ok) {
        const summariesData = await summariesRes.json();
        setSummaries(summariesData.summaries || summariesData || []);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      setChannels([]);
      setSummaries([]);
    }
    setLoading(false);
  }, "loadData");
  const generateSummary = /* @__PURE__ */ __name(async () => {
    setGenerating(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/messages/summarize/`, {
        method: "POST",
        body: JSON.stringify({
          channel_id: selectedChannel,
          time_range: timeRange,
          message_count: messageCount
        })
      });
      if (response.ok) {
        const data = await response.json();
        const newSummary = {
          id: data.id || Date.now(),
          channel: channels.find((c) => c.id === selectedChannel)?.name || "general",
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          time_range: timeRange,
          message_count: data.message_count || messageCount,
          summary: data.summary || "Özet oluşturulamadı.",
          keywords: data.keywords || [],
          participants: data.participants || 0
        };
        setCurrentSummary(newSummary);
        setSummaries([newSummary, ...summaries]);
      } else {
        console.error("Summary generation failed");
      }
    } catch (error) {
      console.error("Error generating summary:", error);
    }
    setGenerating(false);
  }, "generateSummary");
  const formatDate = /* @__PURE__ */ __name((timestamp) => {
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }, "formatDate");
  const copyToClipboard = /* @__PURE__ */ __name((text) => {
    navigator.clipboard.writeText(text);
  }, "copyToClipboard");
  const exportSummary = /* @__PURE__ */ __name((summary) => {
    `# Message Summary - ${summary.channel}

Generated: ${formatDate(summary.created_at)}
Messages Analyzed: ${summary.message_count}
Time Range: ${summary.time_range}

${summary.summary}`;
  }, "exportSummary");
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "summary-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "summary-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading", children: "Loading message summary..." }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "summary-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "summary-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-info", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, {}),
          "AI Message Summary"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "subtitle", children: "Summarize channel conversations with AI" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "summary-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "generator-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCompressArrowsAlt, {}),
          " Generate Summary"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "generator-controls", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "control-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaHashtag, {}),
              " Channel"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                value: selectedChannel,
                onChange: /* @__PURE__ */ __name((e) => setSelectedChannel(Number(e.target.value)), "onChange"),
                children: channels.map((channel) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: channel.id, children: [
                  "#",
                  channel.name
                ] }, channel.id))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "control-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {}),
              " Time Range"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: timeRange,
                onChange: /* @__PURE__ */ __name((e) => setTimeRange(e.target.value), "onChange"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "1h", children: "Last Hour" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "6h", children: "Last 6 Hours" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "24h", children: "Last 24 Hours" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "7d", children: "Last 7 Days" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "30d", children: "Last 30 Days" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "control-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaFileAlt, {}),
              " Max Messages"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: messageCount,
                onChange: /* @__PURE__ */ __name((e) => setMessageCount(Number(e.target.value)), "onChange"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 50, children: "50 messages" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 100, children: "100 messages" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 250, children: "250 messages" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 500, children: "500 messages" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "generate-btn",
              onClick: generateSummary,
              disabled: generating,
              children: generating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FaSpinner, { className: "spinning" }),
                "Generating..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, {}),
                "Generate Summary"
              ] })
            }
          )
        ] })
      ] }),
      (currentSummary || summaries.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "summary-display", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "summary-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaFileAlt, {}),
            currentSummary ? "Generated Summary" : "Latest Summary"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "summary-actions", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                className: "action-btn",
                onClick: /* @__PURE__ */ __name(() => copyToClipboard((currentSummary || summaries[0]).summary), "onClick"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FaCopy, {}),
                  " Copy"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                className: "action-btn",
                onClick: /* @__PURE__ */ __name(() => exportSummary(currentSummary || summaries[0]), "onClick"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, {}),
                  " Export"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "summary-meta", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "meta-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaHashtag, {}),
            " #",
            (currentSummary || summaries[0]).channel
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "meta-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {}),
            " ",
            (currentSummary || summaries[0]).time_range
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "meta-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaFileAlt, {}),
            " ",
            (currentSummary || summaries[0]).message_count,
            " messages"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "meta-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCalendar, {}),
            " ",
            formatDate((currentSummary || summaries[0]).created_at)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "summary-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "summary-text",
            dangerouslySetInnerHTML: {
              __html: purify.sanitize((currentSummary || summaries[0]).summary.replace(/## /g, "<h4>").replace(/\n\n/g, "</h4>\n").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/- /g, "• ").replace(/\n/g, "<br/>"))
            }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "summary-keywords", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "keywords-label", children: "Keywords:" }),
          (currentSummary || summaries[0]).keywords.map((keyword, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "keyword-chip", children: keyword }, i))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "history-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartBar, {}),
          " Summary History"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "history-list", children: summaries.map((summary) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `history-item ${currentSummary?.id === summary.id ? "active" : ""}`,
            onClick: /* @__PURE__ */ __name(() => setCurrentSummary(summary), "onClick"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "history-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaFileAlt, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "history-info", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "history-channel", children: [
                  "#",
                  summary.channel
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "history-meta", children: [
                  summary.message_count,
                  " messages • ",
                  summary.time_range
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "history-date", children: formatDate(summary.created_at) })
            ]
          },
          summary.id
        )) })
      ] })
    ] })
  ] }) });
}, "MessageSummaryPanel");
export {
  MessageSummaryPanel as default
};
