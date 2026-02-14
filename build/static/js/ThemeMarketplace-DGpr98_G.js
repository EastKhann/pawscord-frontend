var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { t as toast } from "./index-DGqPEDt8.js";
import { a as axios } from "./index-BnLT0o6q.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
import "./ui-vendor-iPoN0WGz.js";
const ThemeMarketplace = /* @__PURE__ */ __name(() => {
  const [themes, setThemes] = reactExports.useState([]);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState("popular");
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    fetchThemes();
  }, [filter]);
  const fetchThemes = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/themes/marketplace/?filter=${filter}`);
      setThemes(response.data.themes);
    } catch (error) {
      console.error("Failed to fetch themes:", error);
    } finally {
      setLoading(false);
    }
  }, "fetchThemes");
  const installTheme = /* @__PURE__ */ __name(async (themeId) => {
    try {
      const response = await axios.post(`/api/themes/install/`, { theme_id: themeId });
      if (response.data.success) {
        toast.success("✅ Theme installed successfully!");
        applyTheme(response.data.theme);
      }
    } catch (error) {
      console.error("Failed to install theme:", error);
      toast.error("❌ Installation failed");
    }
  }, "installTheme");
  const applyTheme = /* @__PURE__ */ __name((theme) => {
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    localStorage.setItem("current_theme", JSON.stringify(theme));
  }, "applyTheme");
  const filteredThemes = themes.filter(
    (theme) => theme.name.toLowerCase().includes(searchQuery.toLowerCase()) || theme.author.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "theme-marketplace", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "marketplace-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "🎨 Theme Marketplace" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Discover and install community-created themes" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "marketplace-controls", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Search themes...",
          value: searchQuery,
          onChange: /* @__PURE__ */ __name((e) => setSearchQuery(e.target.value), "onChange"),
          className: "theme-search"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "theme-filters", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: filter === "popular" ? "active" : "",
            onClick: /* @__PURE__ */ __name(() => setFilter("popular"), "onClick"),
            children: "🔥 Popular"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: filter === "new" ? "active" : "",
            onClick: /* @__PURE__ */ __name(() => setFilter("new"), "onClick"),
            children: "✨ New"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: filter === "top-rated" ? "active" : "",
            onClick: /* @__PURE__ */ __name(() => setFilter("top-rated"), "onClick"),
            children: "⭐ Top Rated"
          }
        )
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading", children: "Loading themes..." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "theme-grid", children: filteredThemes.map((theme) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ThemeCard,
      {
        theme,
        onInstall: /* @__PURE__ */ __name(() => installTheme(theme.id), "onInstall")
      },
      theme.id
    )) })
  ] });
}, "ThemeMarketplace");
const ThemeCard = /* @__PURE__ */ __name(({ theme, onInstall }) => {
  const [preview, setPreview] = reactExports.useState(false);
  const previewTheme = /* @__PURE__ */ __name(() => {
    setPreview(true);
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}-preview`, value);
    });
  }, "previewTheme");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "theme-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "theme-preview",
        style: {
          background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`
        },
        children: theme.screenshot && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: theme.screenshot, alt: theme.name })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "theme-info", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: theme.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "theme-author", children: [
        "by ",
        theme.author
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "theme-description", children: theme.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "theme-stats", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "⭐ ",
          theme.rating.toFixed(1)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "📥 ",
          theme.downloads.toLocaleString(),
          " installs"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "theme-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: previewTheme, className: "btn-preview", children: "👁️ Preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onInstall, className: "btn-install", children: "📥 Install" })
      ] })
    ] })
  ] });
}, "ThemeCard");
export {
  ThemeMarketplace as default
};
