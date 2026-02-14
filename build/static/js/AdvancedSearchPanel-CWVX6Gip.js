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
const AdvancedSearchPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, serverId, roomSlug }) => {
  const [query, setQuery] = reactExports.useState("");
  const [results, setResults] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [filters, setFilters] = reactExports.useState({
    author: "",
    dateFrom: "",
    dateTo: "",
    hasImage: false,
    hasVideo: false,
    hasLink: false,
    hasEmbed: false
  });
  const search = /* @__PURE__ */ __name(async () => {
    if (!query.trim()) {
      toast.error("Please enter a search query");
      return;
    }
    setLoading(true);
    try {
      const params = new URLSearchParams({
        q: query,
        server_id: serverId || "",
        room_slug: roomSlug || "",
        author: filters.author || "",
        date_from: filters.dateFrom || "",
        date_to: filters.dateTo || "",
        has_image: filters.hasImage || "",
        has_video: filters.hasVideo || "",
        has_link: filters.hasLink || "",
        has_embed: filters.hasEmbed || ""
      });
      const response = await fetchWithAuth(`${apiBaseUrl}/search/advanced/?${params}`);
      const data = await response.json();
      setResults(data.results || []);
      toast.success(`Found ${data.results?.length || 0} results`);
    } catch (error) {
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  }, "search");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaSearch, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Advanced Search" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.searchBar, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: query,
          onChange: /* @__PURE__ */ __name((e) => setQuery(e.target.value), "onChange"),
          onKeyDown: /* @__PURE__ */ __name((e) => e.key === "Enter" && search(), "onKeyDown"),
          placeholder: "Search messages...",
          style: styles.searchInput
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: search, style: styles.searchButton, disabled: loading, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaSearch, {}),
        " ",
        loading ? "Searching..." : "Search"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.filtersSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.filterHeader, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaFilter, { style: { marginRight: "8px" } }),
        "Filters"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.filtersGrid, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.filterGroup, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.filterLabel, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaUser, { style: { marginRight: "6px" } }),
            "Author"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: filters.author,
              onChange: /* @__PURE__ */ __name((e) => setFilters({ ...filters, author: e.target.value }), "onChange"),
              placeholder: "Username",
              style: styles.filterInput
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.filterGroup, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.filterLabel, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCalendar, { style: { marginRight: "6px" } }),
            "Date From"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "date",
              value: filters.dateFrom,
              onChange: /* @__PURE__ */ __name((e) => setFilters({ ...filters, dateFrom: e.target.value }), "onChange"),
              style: styles.filterInput
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.filterGroup, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.filterLabel, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCalendar, { style: { marginRight: "6px" } }),
            "Date To"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "date",
              value: filters.dateTo,
              onChange: /* @__PURE__ */ __name((e) => setFilters({ ...filters, dateTo: e.target.value }), "onChange"),
              style: styles.filterInput
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.checkboxGrid, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.checkbox, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: filters.hasImage,
              onChange: /* @__PURE__ */ __name((e) => setFilters({ ...filters, hasImage: e.target.checked }), "onChange")
            }
          ),
          "Has Image"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.checkbox, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: filters.hasVideo,
              onChange: /* @__PURE__ */ __name((e) => setFilters({ ...filters, hasVideo: e.target.checked }), "onChange")
            }
          ),
          "Has Video"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.checkbox, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: filters.hasLink,
              onChange: /* @__PURE__ */ __name((e) => setFilters({ ...filters, hasLink: e.target.checked }), "onChange")
            }
          ),
          "Has Link"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.checkbox, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: filters.hasEmbed,
              onChange: /* @__PURE__ */ __name((e) => setFilters({ ...filters, hasEmbed: e.target.checked }), "onChange")
            }
          ),
          "Has Embed"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Searching..." }) : results.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: query ? "No results found" : "Enter a query and press search" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.resultsList, children: results.map((result, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.resultCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.resultHeader, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.resultAuthor, children: result.author_username }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.resultDate, children: new Date(result.created_at).toLocaleString() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.resultContent, children: result.content }),
      result.room_name && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.resultMeta, children: [
        "#",
        result.room_name
      ] }),
      (result.has_image || result.has_video || result.has_link) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.resultAttachments, children: [
        result.has_image && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.badge, children: "📷 Image" }),
        result.has_video && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.badge, children: "🎥 Video" }),
        result.has_link && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.badge, children: "🔗 Link" })
      ] })
    ] }, idx)) }) })
  ] }) });
}, "AdvancedSearchPanel");
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
    zIndex: 999999
  },
  modal: {
    backgroundColor: "#1e1e1e",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "1000px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #2c2f33"
  },
  headerLeft: {
    display: "flex",
    alignItems: "center"
  },
  title: {
    margin: 0,
    fontSize: "20px",
    color: "#ffffff"
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#99aab5",
    cursor: "pointer",
    fontSize: "20px",
    padding: "5px"
  },
  searchBar: {
    padding: "20px",
    borderBottom: "1px solid #2c2f33",
    display: "flex",
    gap: "12px"
  },
  searchInput: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#2c2f33",
    border: "1px solid #2c2f33",
    borderRadius: "4px",
    color: "#ffffff",
    fontSize: "14px"
  },
  searchButton: {
    padding: "12px 24px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  filtersSection: {
    padding: "20px",
    borderBottom: "1px solid #2c2f33",
    backgroundColor: "#2c2f33"
  },
  filterHeader: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center"
  },
  filtersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "12px",
    marginBottom: "16px"
  },
  filterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },
  filterLabel: {
    fontSize: "13px",
    color: "#dcddde",
    display: "flex",
    alignItems: "center"
  },
  filterInput: {
    padding: "8px",
    backgroundColor: "#1e1e1e",
    border: "1px solid #1e1e1e",
    borderRadius: "4px",
    color: "#ffffff",
    fontSize: "13px"
  },
  checkboxGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "12px"
  },
  checkbox: {
    fontSize: "13px",
    color: "#dcddde",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  },
  content: {
    padding: "20px",
    overflowY: "auto",
    flex: 1
  },
  loading: {
    textAlign: "center",
    color: "#99aab5",
    padding: "40px"
  },
  empty: {
    textAlign: "center",
    color: "#99aab5",
    padding: "40px"
  },
  resultsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  resultCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "16px"
  },
  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px"
  },
  resultAuthor: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#5865f2"
  },
  resultDate: {
    fontSize: "12px",
    color: "#99aab5"
  },
  resultContent: {
    fontSize: "14px",
    color: "#dcddde",
    marginBottom: "8px",
    lineHeight: "1.5"
  },
  resultMeta: {
    fontSize: "12px",
    color: "#99aab5",
    marginBottom: "8px"
  },
  resultAttachments: {
    display: "flex",
    gap: "8px"
  },
  badge: {
    fontSize: "11px",
    padding: "4px 8px",
    backgroundColor: "#5865f2",
    borderRadius: "4px",
    color: "#ffffff"
  }
};
export {
  AdvancedSearchPanel as default
};
