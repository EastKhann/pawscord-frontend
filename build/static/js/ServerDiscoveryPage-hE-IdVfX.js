var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
import "./ui-vendor-iPoN0WGz.js";
const ServerDiscoveryPage = /* @__PURE__ */ __name(({ apiBaseUrl, token, onJoinServer }) => {
  const [servers, setServers] = reactExports.useState([]);
  const [featured, setFeatured] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [filters, setFilters] = reactExports.useState({
    category: "all",
    language: "all",
    size: "all",
    search: ""
  });
  const [categories] = reactExports.useState([
    { value: "all", label: "🌍 Tümü" },
    { value: "gaming", label: "🎮 Oyun" },
    { value: "music", label: "🎵 Müzik" },
    { value: "education", label: "📚 Eğitim" },
    { value: "technology", label: "💻 Teknoloji" },
    { value: "art", label: "🎨 Sanat" },
    { value: "anime", label: "🎭 Anime" },
    { value: "memes", label: "😂 Meme" },
    { value: "community", label: "👥 Topluluk" }
  ]);
  reactExports.useEffect(() => {
    loadServers();
    loadFeatured();
  }, [filters]);
  const fetchWithAuth = /* @__PURE__ */ __name(async (url, options = {}) => {
    const headers = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers
    };
    const res = await fetch(url, { ...options, headers });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }, "fetchWithAuth");
  const loadServers = /* @__PURE__ */ __name(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.category !== "all") params.append("category", filters.category);
      if (filters.language !== "all") params.append("language", filters.language);
      if (filters.size !== "all") params.append("size", filters.size);
      if (filters.search) params.append("search", filters.search);
      const data = await fetchWithAuth(`${apiBaseUrl}/discovery/servers/?${params}`);
      setServers(data.servers || []);
    } catch (error) {
      console.error("❌ Servers yüklenemedi:", error);
    } finally {
      setLoading(false);
    }
  }, "loadServers");
  const loadFeatured = /* @__PURE__ */ __name(async () => {
    try {
      const data = await fetchWithAuth(`${apiBaseUrl}/discovery/featured/`);
      setFeatured(data.servers || []);
    } catch (error) {
      console.error("❌ Featured servers yüklenemedi:", error);
    }
  }, "loadFeatured");
  const handleJoinServer = /* @__PURE__ */ __name(async (serverId) => {
    try {
      await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/join/`, {
        method: "POST"
      });
      toast.success("✅ Sunucuya katıldınız!");
      if (onJoinServer) onJoinServer(serverId);
    } catch (error) {
      console.error("❌ Sunucuya katılınamadı:", error);
      toast.error("❌ Sunucuya katılınamadı!");
    }
  }, "handleJoinServer");
  const getMemberCount = /* @__PURE__ */ __name((count) => {
    if (count >= 1e6) return `${(count / 1e6).toFixed(1)}M`;
    if (count >= 1e3) return `${(count / 1e3).toFixed(1)}K`;
    return count;
  }, "getMemberCount");
  const getOnlineCount = /* @__PURE__ */ __name((count) => {
    if (count >= 1e3) return `${(count / 1e3).toFixed(1)}K`;
    return count;
  }, "getOnlineCount");
  if (loading && servers.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "discovery-page", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading", children: "🔄 Sunucular yükleniyor..." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "discovery-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "🔍 Sunucu Keşfet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "İlgi alanlarına uygun yeni topluluklar bul ve katıl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "search-filters", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "search-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "🔍 Sunucu ara...",
          value: filters.search,
          onChange: /* @__PURE__ */ __name((e) => setFilters({ ...filters, search: e.target.value }), "onChange")
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filters-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: filters.category,
            onChange: /* @__PURE__ */ __name((e) => setFilters({ ...filters, category: e.target.value }), "onChange"),
            children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: cat.value, children: cat.label }, cat.value))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: filters.size,
            onChange: /* @__PURE__ */ __name((e) => setFilters({ ...filters, size: e.target.value }), "onChange"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "👥 Tüm Boyutlar" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "small", children: "Küçük (0-100)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "medium", children: "Orta (100-1K)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "large", children: "Büyük (1K-10K)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "huge", children: "Çok Büyük (10K+)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: filters.language,
            onChange: /* @__PURE__ */ __name((e) => setFilters({ ...filters, language: e.target.value }), "onChange"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "🌐 Tüm Diller" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "tr", children: "🇹🇷 Türkçe" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "en", children: "🇺🇸 English" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "de", children: "🇩🇪 Deutsch" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "fr", children: "🇫🇷 Français" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "es", children: "🇪🇸 Español" })
            ]
          }
        )
      ] })
    ] }),
    featured.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "featured-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "⭐ Öne Çıkanlar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "featured-grid", children: featured.map((server) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "featured-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "featured-badge", children: "⭐ Öne Çıkan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: server.icon || "/default-server.png", alt: server.name, className: "server-icon-large" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: server.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "server-description", children: server.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "server-stats", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-icon", children: "👥" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              getMemberCount(server.member_count),
              " üye"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-icon", children: "🟢" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              getOnlineCount(server.online_count),
              " çevrimiçi"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "join-btn", onClick: /* @__PURE__ */ __name(() => handleJoinServer(server.id), "onClick"), children: "🚀 Katıl" })
      ] }, server.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "servers-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "🌍 Tüm Sunucular" }),
      servers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Aramanıza uygun sunucu bulunamadı" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "servers-grid", children: servers.map((server) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "server-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "server-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: server.icon || "/default-server.png", alt: server.name, className: "server-icon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "server-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: server.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "server-meta", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "category-badge", children: server.category }),
              server.verified && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "verified-badge", children: "✓ Doğrulanmış" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "server-description", children: server.description || "Açıklama yok" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "server-stats-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-icon", children: "👥" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: getMemberCount(server.member_count) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item online", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-icon", children: "🟢" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: getOnlineCount(server.online_count) })
          ] })
        ] }),
        server.tags && server.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "server-tags", children: server.tags.slice(0, 3).map((tag, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", children: tag }, index)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "join-btn-small", onClick: /* @__PURE__ */ __name(() => handleJoinServer(server.id), "onClick"), children: "Katıl" })
      ] }, server.id)) })
    ] })
  ] });
}, "ServerDiscoveryPage");
export {
  ServerDiscoveryPage as default
};
