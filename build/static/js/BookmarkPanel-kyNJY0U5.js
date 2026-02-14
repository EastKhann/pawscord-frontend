var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { br as FaBookmark, a as FaTimes, t as FaSearch, an as FaPlus, bs as FaFolder, bt as FaTags, g as FaTrash } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999999
  },
  modal: {
    backgroundColor: "#1e1e1e",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "800px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    color: "#fff"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #333"
  },
  closeBtn: {
    cursor: "pointer",
    fontSize: "24px",
    color: "#888",
    transition: "color 0.2s"
  },
  toolbar: {
    display: "flex",
    gap: "10px",
    padding: "15px 20px",
    borderBottom: "1px solid #333"
  },
  searchBox: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#2c2f33",
    padding: "10px 15px",
    borderRadius: "8px"
  },
  searchInput: {
    flex: 1,
    background: "none",
    border: "none",
    color: "#fff",
    outline: "none",
    fontSize: "14px"
  },
  newTagBtn: {
    backgroundColor: "#5865f2",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background-color 0.2s"
  },
  tagsContainer: {
    display: "flex",
    gap: "10px",
    padding: "15px 20px",
    overflowX: "auto",
    borderBottom: "1px solid #333"
  },
  tagChip: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    borderRadius: "16px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    color: "#fff",
    whiteSpace: "nowrap",
    transition: "all 0.2s"
  },
  bookmarksList: {
    flex: 1,
    overflowY: "auto",
    padding: "20px"
  },
  bookmarkItem: {
    display: "flex",
    gap: "15px",
    padding: "15px",
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    marginBottom: "10px",
    transition: "background-color 0.2s"
  },
  bookmarkContent: { flex: 1 },
  bookmarkMeta: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px"
  },
  bookmarkText: {
    color: "#dcddde",
    marginBottom: "10px",
    cursor: "pointer",
    lineHeight: "1.5"
  },
  bookmarkTags: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    alignItems: "center"
  },
  miniTag: {
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    color: "#fff",
    fontWeight: "500"
  },
  tagSelect: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    border: "1px solid #444",
    borderRadius: "4px",
    padding: "4px 8px",
    fontSize: "12px",
    cursor: "pointer"
  },
  deleteBtn: {
    backgroundColor: "transparent",
    border: "none",
    color: "#ed4245",
    cursor: "pointer",
    fontSize: "18px",
    padding: "10px",
    borderRadius: "4px",
    transition: "background-color 0.2s"
  },
  loading: {
    textAlign: "center",
    padding: "40px",
    color: "#888"
  },
  empty: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#888"
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999999
  },
  newTagModal: {
    backgroundColor: "#2c2f33",
    padding: "30px",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "400px",
    color: "#fff"
  },
  input: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#1e1e1e",
    border: "1px solid #444",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px",
    marginTop: "15px",
    outline: "none"
  },
  colorPicker: {
    width: "60px",
    height: "40px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: "#5865f2",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600"
  },
  secondaryBtn: {
    flex: 1,
    backgroundColor: "#4e5058",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600"
  }
};
const useBookmarks = /* @__PURE__ */ __name((fetchWithAuth, apiBaseUrl) => {
  const [bookmarks, setBookmarks] = reactExports.useState([]);
  const [tags, setTags] = reactExports.useState([]);
  const [selectedTag, setSelectedTag] = reactExports.useState(null);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(true);
  const [showNewTagModal, setShowNewTagModal] = reactExports.useState(false);
  const [newTagName, setNewTagName] = reactExports.useState("");
  const [newTagColor, setNewTagColor] = reactExports.useState("#5865f2");
  reactExports.useEffect(() => {
    loadBookmarks();
    loadTags();
  }, []);
  const loadBookmarks = /* @__PURE__ */ __name(async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(`${apiBaseUrl}/bookmarks/list/`);
      if (response.ok) {
        const data = await response.json();
        setBookmarks(data);
      }
    } catch (error) {
      console.error("Bookmark yükleme hatası:", error);
      toast.error("Bookmark'lar yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, "loadBookmarks");
  const loadTags = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/bookmarks/tags/list/`);
      if (response.ok) {
        const data = await response.json();
        setTags(data);
      }
    } catch (error) {
      console.error("Tag yükleme hatası:", error);
    }
  }, "loadTags");
  const createTag = /* @__PURE__ */ __name(async () => {
    if (!newTagName.trim()) {
      toast.error("Tag adı boş olamaz");
      return;
    }
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/bookmarks/tags/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newTagName, color: newTagColor })
      });
      if (response.ok) {
        toast.success("Tag oluşturuldu");
        setNewTagName("");
        setNewTagColor("#5865f2");
        setShowNewTagModal(false);
        loadTags();
      } else {
        toast.error("Tag oluşturulamadı");
      }
    } catch (error) {
      console.error("Tag oluşturma hatası:", error);
      toast.error("Bir hata oluştu");
    }
  }, "createTag");
  const deleteBookmark = /* @__PURE__ */ __name(async (bookmarkId) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/bookmarks/${bookmarkId}/delete/`, { method: "DELETE" });
      if (response.ok) {
        toast.success("Bookmark silindi");
        loadBookmarks();
      } else {
        toast.error("Bookmark silinemedi");
      }
    } catch (error) {
      console.error("Bookmark silme hatası:", error);
      toast.error("Bir hata oluştu");
    }
  }, "deleteBookmark");
  const addTagToBookmark = /* @__PURE__ */ __name(async (bookmarkId, tagId) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/bookmarks/tags/${tagId}/add/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookmark_id: bookmarkId })
      });
      if (response.ok) {
        toast.success("Tag eklendi");
        loadBookmarks();
      } else {
        toast.error("Tag eklenemedi");
      }
    } catch (error) {
      console.error("Tag ekleme hatası:", error);
      toast.error("Bir hata oluştu");
    }
  }, "addTagToBookmark");
  const filteredBookmarks = bookmarks.filter((b) => {
    const matchesTag = !selectedTag || b.tags?.some((t) => t.id === selectedTag);
    const matchesSearch = !searchQuery || b.message?.content?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });
  return {
    bookmarks,
    tags,
    selectedTag,
    setSelectedTag,
    searchQuery,
    setSearchQuery,
    loading,
    showNewTagModal,
    setShowNewTagModal,
    newTagName,
    setNewTagName,
    newTagColor,
    setNewTagColor,
    createTag,
    deleteBookmark,
    addTagToBookmark,
    filteredBookmarks
  };
}, "useBookmarks");
const BookmarkPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, onMessageClick }) => {
  const {
    bookmarks,
    tags,
    selectedTag,
    setSelectedTag,
    searchQuery,
    setSearchQuery,
    loading,
    showNewTagModal,
    setShowNewTagModal,
    newTagName,
    setNewTagName,
    newTagColor,
    setNewTagColor,
    createTag,
    deleteBookmark,
    addTagToBookmark,
    filteredBookmarks
  } = useBookmarks(fetchWithAuth, apiBaseUrl);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaBookmark, { style: { color: "#faa61a" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0 }, children: "Kaydedilenler" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { onClick: onClose, style: styles.closeBtn })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.toolbar, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.searchBox, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaSearch, { style: { color: "#888" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Mesajlarda ara...",
            value: searchQuery,
            onChange: /* @__PURE__ */ __name((e) => setSearchQuery(e.target.value), "onChange"),
            style: styles.searchInput
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setShowNewTagModal(true), "onClick"), style: styles.newTagBtn, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
        " Yeni Tag"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.tagsContainer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => setSelectedTag(null), "onClick"),
          style: { ...styles.tagChip, backgroundColor: !selectedTag ? "#5865f2" : "#2c2f33" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaFolder, {}),
            " Tümü (",
            bookmarks.length,
            ")"
          ]
        }
      ),
      tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => setSelectedTag(tag.id), "onClick"),
          style: { ...styles.tagChip, backgroundColor: selectedTag === tag.id ? tag.color : "#2c2f33", borderLeft: `3px solid ${tag.color}` },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaTags, {}),
            " ",
            tag.name,
            " (",
            tag.bookmark_count || 0,
            ")"
          ]
        },
        tag.id
      ))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.bookmarksList, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Yükleniyor..." }) : filteredBookmarks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.empty, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaBookmark, { style: { fontSize: "48px", color: "#555" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz bookmark yok" })
    ] }) : filteredBookmarks.map((bookmark) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.bookmarkItem, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.bookmarkContent, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.bookmarkMeta, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: bookmark.message?.username }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#888", fontSize: "12px" }, children: new Date(bookmark.created_at).toLocaleString("tr-TR") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.bookmarkText, onClick: /* @__PURE__ */ __name(() => onMessageClick?.(bookmark.message), "onClick"), children: bookmark.message?.content || "Mesaj içeriği yok" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.bookmarkTags, children: [
          bookmark.tags?.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { ...styles.miniTag, backgroundColor: tag.color }, children: tag.name }, tag.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              onChange: /* @__PURE__ */ __name((e) => {
                if (e.target.value) {
                  addTagToBookmark(bookmark.id, e.target.value);
                  e.target.value = "";
                }
              }, "onChange"),
              style: styles.tagSelect,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "+ Tag Ekle" }),
                tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: tag.id, children: tag.name }, tag.id))
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => deleteBookmark(bookmark.id), "onClick"), style: styles.deleteBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}) })
    ] }, bookmark.id)) }),
    showNewTagModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.modalOverlay, onClick: /* @__PURE__ */ __name(() => setShowNewTagModal(false), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.newTagModal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Yeni Tag Oluştur" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Tag adı...",
          value: newTagName,
          onChange: /* @__PURE__ */ __name((e) => setNewTagName(e.target.value), "onChange"),
          style: styles.input,
          autoFocus: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "10px", alignItems: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Renk:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: newTagColor, onChange: /* @__PURE__ */ __name((e) => setNewTagColor(e.target.value), "onChange"), style: styles.colorPicker })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "10px", marginTop: "20px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: createTag, style: styles.primaryBtn, children: "Oluştur" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setShowNewTagModal(false), "onClick"), style: styles.secondaryBtn, children: "İptal" })
      ] })
    ] }) })
  ] }) });
}, "BookmarkPanel");
export {
  BookmarkPanel as default
};
