var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { a as React, r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { t as FaSearch, a as FaTimes, aF as FaHashtag, b3 as FaAt } from "./icons-vendor-2VDeY8fW.js";
const QuickSwitcher = /* @__PURE__ */ __name(({
  onClose,
  onNavigate,
  channels = [],
  users = [],
  conversations = []
}) => {
  const [query, setQuery] = reactExports.useState("");
  const [selectedIndex, setSelectedIndex] = reactExports.useState(0);
  const inputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const fuzzyMatch = /* @__PURE__ */ __name((text, query2) => {
    if (!text || !query2) return false;
    text = text.toLowerCase();
    query2 = query2.toLowerCase();
    if (text.includes(query2)) return true;
    let queryIndex = 0;
    for (let i = 0; i < text.length && queryIndex < query2.length; i++) {
      if (text[i] === query2[queryIndex]) {
        queryIndex++;
      }
    }
    return queryIndex === query2.length;
  }, "fuzzyMatch");
  const results = reactExports.useMemo(() => {
    if (!query.trim()) {
      return [
        ...channels.slice(0, 5).map((c) => ({ type: "channel", ...c })),
        ...users.slice(0, 5).map((u) => ({ type: "user", ...u })),
        ...conversations.slice(0, 5).map((c) => ({ type: "dm", ...c }))
      ].slice(0, 10);
    }
    const allItems = [
      ...channels.map((c) => ({ type: "channel", ...c, searchText: c.name })),
      ...users.map((u) => ({ type: "user", ...u, searchText: u.username })),
      ...conversations.map((c) => ({ type: "dm", ...c, searchText: c.target_user }))
    ];
    return allItems.filter((item) => fuzzyMatch(item.searchText, query)).slice(0, 10);
  }, [query, channels, users, conversations]);
  const handleKeyDown = /* @__PURE__ */ __name((e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    } else if (e.key === "Escape") {
      onClose();
    }
  }, "handleKeyDown");
  const handleSelect = /* @__PURE__ */ __name((item) => {
    onNavigate(item);
    onClose();
  }, "handleSelect");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "quick-switcher-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quick-switcher-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quick-switcher-search", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaSearch, { className: "search-icon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: inputRef,
          type: "text",
          placeholder: "Kanal veya kullanıcı ara... (Ctrl+K)",
          value: query,
          onChange: /* @__PURE__ */ __name((e) => {
            setQuery(e.target.value);
            setSelectedIndex(0);
          }, "onChange"),
          onKeyDown: handleKeyDown,
          className: "search-input"
        }
      ),
      query && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "clear-btn", onClick: /* @__PURE__ */ __name(() => setQuery(""), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "quick-switcher-results", children: results.length > 0 ? results.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `quick-result-item ${index === selectedIndex ? "selected" : ""}`,
        onClick: /* @__PURE__ */ __name(() => handleSelect(item), "onClick"),
        onMouseEnter: /* @__PURE__ */ __name(() => setSelectedIndex(index), "onMouseEnter"),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "result-icon", children: [
            item.type === "channel" && /* @__PURE__ */ jsxRuntimeExports.jsx(FaHashtag, {}),
            item.type === "user" && /* @__PURE__ */ jsxRuntimeExports.jsx(FaAt, {}),
            item.type === "dm" && /* @__PURE__ */ jsxRuntimeExports.jsx(FaAt, {})
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "result-content", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "result-name", children: [
              item.type === "channel" && item.name,
              item.type === "user" && item.username,
              item.type === "dm" && item.target_user
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "result-type", children: [
              item.type === "channel" && "Kanal",
              item.type === "user" && "Kullanıcı",
              item.type === "dm" && "Direkt Mesaj"
            ] })
          ] })
        ]
      },
      `${item.type}-${item.id || item.username}`
    )) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "no-results", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaSearch, { size: 32 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Sonuç bulunamadı" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "quick-switcher-footer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shortcut-hints", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { children: "↑↓" }),
        " Gezin"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { children: "Enter" }),
        " Seç"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { children: "Esc" }),
        " Kapat"
      ] })
    ] }) })
  ] }) });
}, "QuickSwitcher");
const QuickSwitcher_default = React.memo(QuickSwitcher);
export {
  QuickSwitcher_default as default
};
