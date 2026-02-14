var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { aw as FaImage, cD as FaTh, cE as FaList, t as FaSearch, by as FaHeart } from "./icons-vendor-2VDeY8fW.js";
function GIFPickerPanel({ apiBaseUrl, fetchWithAuth, onSelectGIF }) {
  const [gifs, setGifs] = reactExports.useState([]);
  const [categories, setCategories] = reactExports.useState([]);
  const [selectedCategory, setSelectedCategory] = reactExports.useState("all");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [viewMode, setViewMode] = reactExports.useState("grid");
  const [favorites, setFavorites] = reactExports.useState(/* @__PURE__ */ new Set());
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    loadGIFs();
    loadCategories();
    loadFavorites();
  }, [selectedCategory, searchQuery]);
  const loadGIFs = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== "all") params.append("category", selectedCategory);
      if (searchQuery) params.append("search", searchQuery);
      const response = await fetchWithAuth(`${apiBaseUrl}/gifs/list_local/?${params}`);
      if (response.ok) {
        const data = await response.json();
        setGifs(data.gifs || []);
      }
    } catch (err) {
      console.error("Error loading GIFs:", err);
    } finally {
      setLoading(false);
    }
  }, "loadGIFs");
  const loadCategories = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/gifs/categories/`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  }, "loadCategories");
  const loadFavorites = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/gifs/favorites/`);
      if (response.ok) {
        const data = await response.json();
        setFavorites(new Set(data.gif_ids || []));
      }
    } catch (err) {
      console.error("Error loading favorites:", err);
    }
  }, "loadFavorites");
  const toggleFavorite = /* @__PURE__ */ __name(async (gifId) => {
    try {
      const isFav = favorites.has(gifId);
      const url = isFav ? `${apiBaseUrl}/gifs/favorites/remove/` : `${apiBaseUrl}/gifs/favorites/add/`;
      const response = await fetchWithAuth(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gif_id: gifId })
      });
      if (response.ok) {
        const newFavs = new Set(favorites);
        if (isFav) {
          newFavs.delete(gifId);
        } else {
          newFavs.add(gifId);
        }
        setFavorites(newFavs);
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  }, "toggleFavorite");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gif-picker-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gif-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaImage, {}),
        " GIF Library"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "view-controls", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `view-btn ${viewMode === "grid" ? "active" : ""}`,
            onClick: /* @__PURE__ */ __name(() => setViewMode("grid"), "onClick"),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTh, {})
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `view-btn ${viewMode === "list" ? "active" : ""}`,
            onClick: /* @__PURE__ */ __name(() => setViewMode("list"), "onClick"),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaList, {})
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gif-search", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaSearch, { className: "search-icon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Search GIFs...",
          value: searchQuery,
          onChange: /* @__PURE__ */ __name((e) => setSearchQuery(e.target.value), "onChange"),
          className: "search-input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gif-categories", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `category-btn ${selectedCategory === "all" ? "active" : ""}`,
          onClick: /* @__PURE__ */ __name(() => setSelectedCategory("all"), "onClick"),
          children: "All"
        }
      ),
      categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `category-btn ${selectedCategory === cat.id ? "active" : ""}`,
          onClick: /* @__PURE__ */ __name(() => setSelectedCategory(cat.id), "onClick"),
          children: cat.name
        },
        cat.id
      ))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `gif-grid ${viewMode}`, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gif-loading", children: "Loading GIFs..." }) : gifs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-gifs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaImage, { className: "empty-icon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No GIFs found" })
    ] }) : gifs.map((gif) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gif-item", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: gif.url,
          alt: gif.name,
          onClick: /* @__PURE__ */ __name(() => onSelectGIF && onSelectGIF(gif), "onClick"),
          className: "gif-image"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gif-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `fav-btn ${favorites.has(gif.id) ? "favorited" : ""}`,
          onClick: /* @__PURE__ */ __name((e) => {
            e.stopPropagation();
            toggleFavorite(gif.id);
          }, "onClick"),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaHeart, {})
        }
      ) })
    ] }, gif.id)) })
  ] });
}
__name(GIFPickerPanel, "GIFPickerPanel");
export {
  GIFPickerPanel as default
};
