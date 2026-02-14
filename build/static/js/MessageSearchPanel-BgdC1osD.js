var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { t as FaSearch, a as FaTimes, V as FaFilter, C as FaUser, bv as FaCalendar } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const MessageSearchPanel = /* @__PURE__ */ __name(({ serverId, channelId, onClose, onSelectMessage }) => {
  const [query, setQuery] = reactExports.useState("");
  const [results, setResults] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [filters, setFilters] = reactExports.useState({
    author: "",
    dateFrom: "",
    dateTo: "",
    hasAttachment: false,
    hasLink: false
  });
  const [showFilters, setShowFilters] = reactExports.useState(false);
  const searchTimeout = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (query.length >= 3) {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(() => {
        searchMessages();
      }, 500);
    }
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [query, filters]);
  const searchMessages = /* @__PURE__ */ __name(async () => {
    if (!query.trim()) {
      toast.error("❌ Arama terimi girin");
      return;
    }
    setLoading(true);
    try {
      const params = new URLSearchParams({
        q: query,
        ...serverId && { server: serverId },
        ...channelId && { channel: channelId },
        ...filters.author && { author: filters.author },
        ...filters.dateFrom && { date_from: filters.dateFrom },
        ...filters.dateTo && { date_to: filters.dateTo },
        ...filters.hasAttachment && { has_attachment: true },
        ...filters.hasLink && { has_link: true }
      });
      const response = await fetch(`/api/messages/search/?${params}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setResults(data.results);
        if (data.results.length === 0) {
          toast.info("ℹ️ Sonuç bulunamadı");
        }
      } else {
        toast.error("❌ Arama hatası");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("❌ Bağlantı hatası");
    } finally {
      setLoading(false);
    }
  }, "searchMessages");
  const highlightText = /* @__PURE__ */ __name((text, query2) => {
    if (!query2) return text;
    const parts = text.split(new RegExp(`(${query2})`, "gi"));
    return parts.map(
      (part, index) => part.toLowerCase() === query2.toLowerCase() ? /* @__PURE__ */ jsxRuntimeExports.jsx("mark", { children: part }, index) : part
    );
  }, "highlightText");
  const formatDate = /* @__PURE__ */ __name((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("tr-TR", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    });
  }, "formatDate");
  const handleMessageClick = /* @__PURE__ */ __name((message) => {
    if (onSelectMessage) {
      onSelectMessage(message);
    }
    onClose();
  }, "handleMessageClick");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "message-search-panel-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "message-search-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "search-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaSearch, { className: "header-icon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Mesaj Ara" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "search-input-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaSearch, { className: "search-icon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          className: "search-input",
          placeholder: "Mesaj ara...",
          value: query,
          onChange: /* @__PURE__ */ __name((e) => setQuery(e.target.value), "onChange"),
          onKeyPress: /* @__PURE__ */ __name((e) => e.key === "Enter" && searchMessages(), "onKeyPress"),
          autoFocus: true
        }
      ),
      query && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "clear-btn", onClick: /* @__PURE__ */ __name(() => setQuery(""), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `filter-toggle-btn ${showFilters ? "active" : ""}`,
          onClick: /* @__PURE__ */ __name(() => setShowFilters(!showFilters), "onClick"),
          title: "Filtreler",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaFilter, {})
        }
      )
    ] }),
    showFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filters-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "filter-row", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaUser, {}),
          " Kullanıcı"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "@kullanıcıadı",
            value: filters.author,
            onChange: /* @__PURE__ */ __name((e) => setFilters({ ...filters, author: e.target.value }), "onChange")
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCalendar, {}),
            " Başlangıç"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "date",
              value: filters.dateFrom,
              onChange: /* @__PURE__ */ __name((e) => setFilters({ ...filters, dateFrom: e.target.value }), "onChange")
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCalendar, {}),
            " Bitiş"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "date",
              value: filters.dateTo,
              onChange: /* @__PURE__ */ __name((e) => setFilters({ ...filters, dateTo: e.target.value }), "onChange")
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "checkbox-label", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: filters.hasAttachment,
              onChange: /* @__PURE__ */ __name((e) => setFilters({ ...filters, hasAttachment: e.target.checked }), "onChange")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Ekli dosya içeren" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "checkbox-label", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: filters.hasLink,
              onChange: /* @__PURE__ */ __name((e) => setFilters({ ...filters, hasLink: e.target.checked }), "onChange")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Link içeren" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "search-results", children: [
      loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Aranıyor..." })
      ] }),
      !loading && results.length === 0 && query && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaSearch, { size: 48 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Sonuç Bulunamadı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          '"',
          query,
          '" için mesaj bulunamadı'
        ] })
      ] }),
      !loading && results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "results-count", children: [
          results.length,
          " sonuç bulundu"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "results-list", children: results.map((message) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "result-item",
            onClick: /* @__PURE__ */ __name(() => handleMessageClick(message), "onClick"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "result-header", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: message.author.avatar || "/default-avatar.png",
                    alt: message.author.username,
                    className: "author-avatar"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "author-info", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "author-name", children: message.author.username }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "message-date", children: formatDate(message.created_at) })
                ] }),
                message.channel && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "channel-tag", children: [
                  "#",
                  message.channel.name
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "message-content", children: highlightText(message.content, query) }),
              message.attachments && message.attachments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "message-attachments", children: [
                "📎 ",
                message.attachments.length,
                " dosya"
              ] })
            ]
          },
          message.id
        )) })
      ] }),
      !loading && !query && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaSearch, { size: 48 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Mesaj Ara" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Sunucudaki tüm mesajları arayın" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "search-tips", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "En az 3 karakter girin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Filtreleri kullanarak sonuçları daraltın" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Kullanıcıya göre filtreleyin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Tarih aralığı belirleyin" })
        ] })
      ] })
    ] })
  ] }) });
}, "MessageSearchPanel");
export {
  MessageSearchPanel as default
};
