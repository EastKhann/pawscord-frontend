var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { br as FaBookmark, an as FaPlus, t as FaSearch, V as FaFilter, al as FaTag, a as FaTimes, g as FaTrash } from "./icons-vendor-2VDeY8fW.js";
function ReadLaterPanel({ apiBaseUrl, fetchWithAuth }) {
  const [bookmarks, setBookmarks] = reactExports.useState([]);
  const [tags, setTags] = reactExports.useState([]);
  const [selectedTags, setSelectedTags] = reactExports.useState([]);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [showTagModal, setShowTagModal] = reactExports.useState(false);
  const [newTagName, setNewTagName] = reactExports.useState("");
  const [newTagColor, setNewTagColor] = reactExports.useState("#5865f2");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const tagColors = [
    "#5865f2",
    "#43b581",
    "#f04747",
    "#faa61a",
    "#9b59b6",
    "#3498db",
    "#e91e63",
    "#00bcd4",
    "#ff9800",
    "#4caf50"
  ];
  reactExports.useEffect(() => {
    loadBookmarks();
    loadTags();
  }, []);
  const loadBookmarks = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/messages/readlater/list/`);
      if (response.ok) {
        const data = await response.json();
        setBookmarks(data.bookmarks || []);
      }
    } catch (err) {
      setError("Failed to load bookmarks: " + err.message);
    } finally {
      setLoading(false);
    }
  }, "loadBookmarks");
  const loadTags = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/bookmarks/tags/list/`);
      if (response.ok) {
        const data = await response.json();
        setTags(data.tags || []);
      }
    } catch (err) {
      console.error("Error loading tags:", err);
    }
  }, "loadTags");
  const createTag = /* @__PURE__ */ __name(async () => {
    if (!newTagName.trim()) {
      setError("Tag name cannot be empty");
      return;
    }
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/bookmarks/tags/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newTagName,
          color: newTagColor
        })
      });
      if (response.ok) {
        const data = await response.json();
        setTags([...tags, data.tag]);
        setNewTagName("");
        setNewTagColor("#5865f2");
        setShowTagModal(false);
        setError("");
      } else {
        const data = await response.json();
        setError(data.error || "Failed to create tag");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    }
  }, "createTag");
  const removeBookmark = /* @__PURE__ */ __name(async (messageId) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/messages/readlater/toggle/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message_id: messageId })
      });
      if (response.ok) {
        setBookmarks(bookmarks.filter((b) => b.message_id !== messageId));
        setError("");
      }
    } catch (err) {
      setError("Failed to remove bookmark: " + err.message);
    }
  }, "removeBookmark");
  const addTagToBookmark = /* @__PURE__ */ __name(async (messageId, tagId) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/bookmarks/tags/${tagId}/add/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message_id: messageId })
      });
      if (response.ok) {
        loadBookmarks();
        setError("");
      }
    } catch (err) {
      setError("Failed to add tag: " + err.message);
    }
  }, "addTagToBookmark");
  const removeTagFromBookmark = /* @__PURE__ */ __name(async (messageId, tagId) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/bookmarks/tags/${tagId}/remove/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message_id: messageId })
      });
      if (response.ok) {
        loadBookmarks();
        setError("");
      }
    } catch (err) {
      setError("Failed to remove tag: " + err.message);
    }
  }, "removeTagFromBookmark");
  const toggleTagFilter = /* @__PURE__ */ __name((tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((t) => t !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  }, "toggleTagFilter");
  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const matchesSearch = searchQuery === "" || bookmark.content.toLowerCase().includes(searchQuery.toLowerCase()) || bookmark.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || bookmark.tags?.some((tag) => selectedTags.includes(tag.id));
    return matchesSearch && matchesTags;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "readlater-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "readlater-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaBookmark, {}),
        " Read Later"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "create-tag-btn", onClick: /* @__PURE__ */ __name(() => setShowTagModal(true), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
        " New Tag"
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rl-error", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "readlater-controls", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "search-box", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaSearch, { className: "search-icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Search bookmarks...",
            value: searchQuery,
            onChange: /* @__PURE__ */ __name((e) => setSearchQuery(e.target.value), "onChange"),
            className: "search-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tag-filters", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaFilter, { className: "filter-icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tag-filter-list", children: tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: `tag-filter ${selectedTags.includes(tag.id) ? "active" : ""}`,
            style: { borderColor: tag.color },
            onClick: /* @__PURE__ */ __name(() => toggleTagFilter(tag.id), "onClick"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaTag, { style: { color: tag.color } }),
              tag.name
            ]
          },
          tag.id
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bookmarks-list", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rl-loading", children: "Loading bookmarks..." }) : filteredBookmarks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaBookmark, { className: "empty-icon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No bookmarks found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Save messages with the bookmark button to read them later" })
    ] }) : filteredBookmarks.map((bookmark, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bookmark-item", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bookmark-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bookmark-author", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: bookmark.author_avatar || "/default-avatar.png",
              alt: bookmark.author,
              className: "author-avatar"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "author-name", children: bookmark.author })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bookmark-date", children: new Date(bookmark.saved_at).toLocaleDateString() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bookmark-content", children: bookmark.content }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bookmark-footer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bookmark-tags", children: [
          bookmark.tags?.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "bookmark-tag",
              style: { borderColor: tag.color, color: tag.color },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FaTag, {}),
                tag.name,
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FaTimes,
                  {
                    className: "remove-tag-icon",
                    onClick: /* @__PURE__ */ __name(() => removeTagFromBookmark(bookmark.message_id, tag.id), "onClick")
                  }
                )
              ]
            },
            tag.id
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              className: "add-tag-select",
              onChange: /* @__PURE__ */ __name((e) => {
                if (e.target.value) {
                  addTagToBookmark(bookmark.message_id, parseInt(e.target.value));
                  e.target.value = "";
                }
              }, "onChange"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "+ Add Tag" }),
                tags.filter((tag) => !bookmark.tags?.find((t) => t.id === tag.id)).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: tag.id, children: tag.name }, tag.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: "remove-bookmark-btn",
            onClick: /* @__PURE__ */ __name(() => removeBookmark(bookmark.message_id), "onClick"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}),
              " Remove"
            ]
          }
        )
      ] })
    ] }, idx)) }),
    showTagModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-overlay", onClick: /* @__PURE__ */ __name(() => setShowTagModal(false), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-content", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaTag, {}),
          " Create New Tag"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "modal-close", onClick: /* @__PURE__ */ __name(() => setShowTagModal(false), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-body", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Tag Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              className: "tag-input",
              placeholder: "Enter tag name...",
              value: newTagName,
              onChange: /* @__PURE__ */ __name((e) => setNewTagName(e.target.value), "onChange"),
              onKeyPress: /* @__PURE__ */ __name((e) => e.key === "Enter" && createTag(), "onKeyPress")
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Tag Color" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "color-picker", children: tagColors.map((color) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: `color-option ${newTagColor === color ? "selected" : ""}`,
              style: { backgroundColor: color },
              onClick: /* @__PURE__ */ __name(() => setNewTagColor(color), "onClick")
            },
            color
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "create-tag-submit", onClick: createTag, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
          " Create Tag"
        ] })
      ] })
    ] }) })
  ] });
}
__name(ReadLaterPanel, "ReadLaterPanel");
export {
  ReadLaterPanel as default
};
