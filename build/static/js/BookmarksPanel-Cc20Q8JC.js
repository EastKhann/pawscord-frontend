var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { br as FaBookmark, Q as FaStar, bs as FaFolder, a as FaTimes } from "./icons-vendor-2VDeY8fW.js";
const BookmarksPanel = /* @__PURE__ */ __name(({ apiBaseUrl, fetchWithAuth, username }) => {
  const [bookmarks, setBookmarks] = reactExports.useState([]);
  const [categories, setCategories] = reactExports.useState(["Tümü", "Önemli", "Yapılacak", "İlham"]);
  const [activeCategory, setActiveCategory] = reactExports.useState("Tümü");
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    loadBookmarks();
  }, []);
  const loadBookmarks = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/bookmarks/`);
      if (response.ok) {
        const data = await response.json();
        setBookmarks(data);
      }
    } catch (error) {
      console.error("Failed to load bookmarks:", error);
    } finally {
      setLoading(false);
    }
  }, "loadBookmarks");
  const removeBookmark = /* @__PURE__ */ __name(async (bookmarkId) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/bookmarks/${bookmarkId}/`, {
        method: "DELETE"
      });
      if (response.ok) {
        setBookmarks((prev) => prev.filter((b) => b.id !== bookmarkId));
      }
    } catch (error) {
      console.error("Failed to remove bookmark:", error);
    }
  }, "removeBookmark");
  const filteredBookmarks = activeCategory === "Tümü" ? bookmarks : bookmarks.filter((b) => b.category === activeCategory);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Yükleniyor..." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.header, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: styles.title, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaBookmark, {}),
      " Kaydedilenler"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.categories, children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: /* @__PURE__ */ __name(() => setActiveCategory(cat), "onClick"),
        style: {
          ...styles.categoryButton,
          ...activeCategory === cat ? styles.categoryButtonActive : {}
        },
        children: [
          cat === "Önemli" && /* @__PURE__ */ jsxRuntimeExports.jsx(FaStar, { style: styles.categoryIcon }),
          cat === "Tümü" && /* @__PURE__ */ jsxRuntimeExports.jsx(FaFolder, { style: styles.categoryIcon }),
          cat
        ]
      },
      cat
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.bookmarksList, children: filteredBookmarks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.empty, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaBookmark, { style: styles.emptyIcon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz kaydedilen mesaj yok" })
    ] }) : filteredBookmarks.map((bookmark) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      BookmarkCard,
      {
        bookmark,
        onRemove: removeBookmark
      },
      bookmark.id
    )) })
  ] });
}, "BookmarksPanel");
const BookmarkCard = /* @__PURE__ */ __name(({ bookmark, onRemove }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.bookmarkCard, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.bookmarkHeader, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.bookmarkCategory, children: bookmark.category }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => onRemove(bookmark.id), "onClick"),
          style: styles.removeButton,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {})
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.bookmarkContent, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: styles.bookmarkAuthor, children: bookmark.message_author }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.bookmarkText, children: bookmark.message_content })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.bookmarkFooter, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.bookmarkTime, children: new Date(bookmark.created_at).toLocaleDateString("tr-TR") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.bookmarkChannel, children: [
        "#",
        bookmark.channel_name
      ] })
    ] })
  ] });
}, "BookmarkCard");
const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#2b2d31",
    borderRadius: "8px",
    minHeight: "500px"
  },
  header: {
    marginBottom: "20px",
    borderBottom: "1px solid #1e1f22",
    paddingBottom: "15px"
  },
  title: {
    color: "#fff",
    fontSize: "20px",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  categories: {
    display: "flex",
    gap: "8px",
    marginBottom: "20px",
    flexWrap: "wrap"
  },
  categoryButton: {
    padding: "6px 12px",
    border: "1px solid #4e5058",
    borderRadius: "16px",
    backgroundColor: "transparent",
    color: "#b9bbbe",
    cursor: "pointer",
    fontSize: "13px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.2s"
  },
  categoryButtonActive: {
    backgroundColor: "#5865f2",
    borderColor: "#5865f2",
    color: "#fff"
  },
  categoryIcon: {
    fontSize: "11px"
  },
  loading: {
    color: "#b9bbbe",
    textAlign: "center",
    padding: "40px"
  },
  empty: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#b9bbbe"
  },
  emptyIcon: {
    fontSize: "64px",
    opacity: 0.3,
    marginBottom: "20px"
  },
  bookmarksList: {
    display: "grid",
    gap: "12px"
  },
  bookmarkCard: {
    backgroundColor: "#1e1f22",
    borderRadius: "8px",
    padding: "12px",
    border: "1px solid transparent",
    transition: "border-color 0.2s"
  },
  bookmarkHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px"
  },
  bookmarkCategory: {
    fontSize: "11px",
    color: "#5865f2",
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  removeButton: {
    background: "none",
    border: "none",
    color: "#72767d",
    cursor: "pointer",
    padding: "4px",
    fontSize: "14px",
    transition: "color 0.2s"
  },
  bookmarkContent: {
    marginBottom: "8px"
  },
  bookmarkAuthor: {
    color: "#fff",
    fontSize: "14px",
    marginBottom: "4px",
    display: "block"
  },
  bookmarkText: {
    color: "#b9bbbe",
    fontSize: "13px",
    margin: 0
  },
  bookmarkFooter: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "11px",
    color: "#72767d"
  }
};
export {
  BookmarksPanel as default
};
