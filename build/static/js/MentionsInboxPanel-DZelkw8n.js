var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { a as React, r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { m as FaInbox, c as FaSync, a as FaTimes, aF as FaHashtag, i as FaThumbtack, a_ as FaReply } from "./icons-vendor-2VDeY8fW.js";
import { A as API_BASE_URL } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const MentionsInboxPanel = /* @__PURE__ */ __name(({ isOpen, onClose, onNavigateToMessage, currentUsername }) => {
  const [mentions, setMentions] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [page, setPage] = reactExports.useState(1);
  const [hasNext, setHasNext] = reactExports.useState(false);
  const [total, setTotal] = reactExports.useState(0);
  const [filterRoom, setFilterRoom] = reactExports.useState("");
  const fetchMentions = reactExports.useCallback(async (pageNum = 1, append = false) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      let url = `${API_BASE_URL}/api/mentions/inbox/?page=${pageNum}&page_size=25`;
      if (filterRoom) url += `&room_id=${filterRoom}`;
      const res = await fetch(url, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMentions((prev) => append ? [...prev, ...data.results] : data.results);
        setHasNext(data.has_next);
        setTotal(data.total);
        setPage(pageNum);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, [filterRoom]);
  reactExports.useEffect(() => {
    if (isOpen) fetchMentions(1);
  }, [isOpen, fetchMentions]);
  const handleLoadMore = /* @__PURE__ */ __name(() => {
    if (hasNext) fetchMentions(page + 1, true);
  }, "handleLoadMore");
  const formatTime = /* @__PURE__ */ __name((iso) => {
    const d = new Date(iso);
    const now = /* @__PURE__ */ new Date();
    const diff = now - d;
    if (diff < 6e4) return "Az önce";
    if (diff < 36e5) return `${Math.floor(diff / 6e4)} dk önce`;
    if (diff < 864e5) return `${Math.floor(diff / 36e5)} sa önce`;
    if (diff < 6048e5) return `${Math.floor(diff / 864e5)} gün önce`;
    return d.toLocaleDateString("tr-TR");
  }, "formatTime");
  const highlightMention = /* @__PURE__ */ __name((content) => {
    if (!content || !currentUsername) return content;
    const regex = new RegExp(`(@${currentUsername})`, "gi");
    const parts = content.split(regex);
    return parts.map(
      (part, i) => regex.test(part) ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.mentionHighlight, children: part }, i) : part
    );
  }, "highlightMention");
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.panel, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaInbox, { style: { color: "#5865F2", fontSize: 18 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.title, children: "Bahsedilmeler" }),
        total > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.badge, children: total })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerRight, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => fetchMentions(1), "onClick"), style: styles.refreshBtn, title: "Yenile", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaSync, { style: loading ? { animation: "spin 1s linear infinite" } : {} }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading && mentions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.emptyState, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.spinner }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Yükleniyor..." })
    ] }) : mentions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.emptyState, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 48 }, children: "📭" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.emptyTitle, children: "Bahsedilme yok" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: styles.emptySubtitle, children: [
        "Birisi seni @",
        currentUsername,
        " ile etiketlediğinde burada görünür"
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      mentions.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: styles.mentionItem,
          onClick: /* @__PURE__ */ __name(() => onNavigateToMessage?.(msg), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.mentionHeader, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.mentionUser, children: msg.username }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.mentionTime, children: formatTime(msg.timestamp) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.mentionContent, children: [
              highlightMention(msg.content?.slice(0, 200)),
              msg.content?.length > 200 && "..."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.mentionFooter, children: [
              msg.room_name && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.roomTag, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FaHashtag, { style: { fontSize: 10 } }),
                msg.room_name
              ] }),
              msg.is_pinned && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.pinnedTag, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FaThumbtack, { style: { fontSize: 10 } }),
                " Sabitlenmiş"
              ] }),
              msg.has_thread && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.threadTag, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FaReply, { style: { fontSize: 10 } }),
                " Thread"
              ] })
            ] })
          ]
        },
        msg.id
      )),
      hasNext && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleLoadMore, style: styles.loadMoreBtn, disabled: loading, children: loading ? "Yükleniyor..." : "Daha Fazla Göster" })
    ] }) })
  ] }) });
}, "MentionsInboxPanel");
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "60px",
    zIndex: 1e3
  },
  panel: {
    width: "500px",
    maxWidth: "90vw",
    maxHeight: "80vh",
    backgroundColor: "#2f3136",
    borderRadius: "12px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    borderBottom: "1px solid #202225",
    backgroundColor: "#292b2f"
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  title: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 600,
    color: "#fff"
  },
  badge: {
    backgroundColor: "#ed4245",
    color: "#fff",
    fontSize: "11px",
    fontWeight: 700,
    padding: "2px 6px",
    borderRadius: "10px",
    minWidth: "18px",
    textAlign: "center"
  },
  refreshBtn: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    padding: "6px",
    borderRadius: "4px",
    fontSize: "14px"
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    padding: "6px",
    borderRadius: "4px",
    fontSize: "16px"
  },
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "8px"
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 24px",
    color: "#72767d"
  },
  emptyTitle: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#dcddde",
    margin: "12px 0 4px"
  },
  emptySubtitle: {
    fontSize: "13px",
    textAlign: "center"
  },
  mentionItem: {
    padding: "12px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.15s",
    marginBottom: "4px",
    borderLeft: "3px solid #5865F2",
    backgroundColor: "rgba(88, 101, 242, 0.06)"
  },
  mentionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "6px"
  },
  mentionUser: {
    fontWeight: 600,
    color: "#fff",
    fontSize: "14px"
  },
  mentionTime: {
    color: "#72767d",
    fontSize: "12px"
  },
  mentionContent: {
    color: "#dcddde",
    fontSize: "14px",
    lineHeight: 1.5,
    wordBreak: "break-word"
  },
  mentionHighlight: {
    backgroundColor: "rgba(88, 101, 242, 0.3)",
    color: "#dee0fc",
    padding: "1px 3px",
    borderRadius: "3px",
    fontWeight: 600
  },
  mentionFooter: {
    display: "flex",
    gap: "8px",
    marginTop: "8px"
  },
  roomTag: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    backgroundColor: "rgba(255,255,255,0.06)",
    color: "#b9bbbe",
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "12px"
  },
  pinnedTag: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    backgroundColor: "rgba(250, 166, 26, 0.1)",
    color: "#faa61a",
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "12px"
  },
  threadTag: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    backgroundColor: "rgba(88, 101, 242, 0.1)",
    color: "#5865F2",
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "12px"
  },
  loadMoreBtn: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#5865F2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
    marginTop: "8px"
  },
  spinner: {
    width: 32,
    height: 32,
    border: "3px solid #5865F2",
    borderTopColor: "transparent",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    marginBottom: 12
  }
};
const MentionsInboxPanel_default = React.memo(MentionsInboxPanel);
export {
  MentionsInboxPanel_default as default
};
