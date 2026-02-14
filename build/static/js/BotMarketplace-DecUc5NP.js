var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { j as jsxRuntimeExports, r as reactExports } from "./react-core-BiY6fgAJ.js";
import { s as API_BASE_URL, t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
import "./ui-vendor-iPoN0WGz.js";
const BotCard = /* @__PURE__ */ __name(({ bot, onClick }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bot-card", onClick: /* @__PURE__ */ __name(() => onClick(bot), "onClick"), children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bot-avatar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: bot.avatar || "/default-bot.png", alt: bot.name }),
    bot.is_verified && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "verified-badge", children: "✓" })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bot-info", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "bot-name", children: [
      bot.name,
      bot.is_featured && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "featured-tag", children: [
        "⭐",
        " ",
        "Ö",
        "ne ",
        "Çı",
        "kan"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "bot-description", children: bot.short_description }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bot-meta", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bot-installs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { children: "📥" }),
        " ",
        bot.install_count?.toLocaleString() || 0
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bot-rating", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { children: "⭐" }),
        " ",
        bot.avg_rating || 0
      ] }),
      bot.category && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bot-category", children: bot.category })
    ] }),
    bot.tags && bot.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bot-tags", children: bot.tags.slice(0, 3).map((tag, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tag", children: tag }, idx)) })
  ] })
] }), "BotCard");
const BotDetailModal = /* @__PURE__ */ __name(({ bot, onClose, onInstall }) => {
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const [showServerSelect, setShowServerSelect] = reactExports.useState(false);
  const [servers, setServers] = reactExports.useState([]);
  const [selectedServer, setSelectedServer] = reactExports.useState(null);
  const [installing, setInstalling] = reactExports.useState(false);
  const API_URL = API_BASE_URL;
  const loadServers = reactExports.useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${API_URL}/bots/my-servers/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setServers(data.servers || []);
      }
    } catch (e) {
      console.error("Failed to load servers:", e);
    }
  }, [API_URL]);
  const handleInstall = /* @__PURE__ */ __name(async () => {
    if (!selectedServer) return;
    setInstalling(true);
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${API_URL}/bots/${bot.id}/install/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ server_id: selectedServer.id })
      });
      if (response.ok) {
        onInstall?.(bot, selectedServer);
        setShowServerSelect(false);
        toast.success(`${bot.name} başarıyla ${selectedServer.name} sunucusuna eklendi!`);
      } else {
        const error = await response.json();
        toast.error(error.error || "Yükleme başarısız");
      }
    } catch (e) {
      console.error("Install failed:", e);
    }
    setInstalling(false);
  }, "handleInstall");
  reactExports.useEffect(() => {
    loadServers();
  }, [loadServers]);
  if (!bot) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bot-modal-overlay", onClick: /* @__PURE__ */ __name((e) => e.target === e.currentTarget && onClose(), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bot-modal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bot-modal-header", style: { backgroundImage: bot.banner ? `url(${bot.banner})` : void 0 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "modal-close", onClick: onClose, children: "×" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bot-header-content", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: bot.avatar || "/default-bot.png", alt: bot.name, className: "bot-large-avatar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bot-header-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
            bot.name,
            bot.is_verified && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "verified", children: [
              "✓",
              " Doğrulanmış"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: bot.short_description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bot-stats", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "📥",
              " ",
              bot.install_count?.toLocaleString(),
              " sunucu"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "⭐",
              " ",
              bot.avg_rating,
              " (",
              bot.review_count,
              " yorum)"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "add-bot-btn",
            onClick: /* @__PURE__ */ __name(() => setShowServerSelect(true), "onClick"),
            children: "Sunucuya Ekle"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bot-modal-tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: activeTab === "overview" ? "active" : "", onClick: /* @__PURE__ */ __name(() => setActiveTab("overview"), "onClick"), children: "Genel Bakış" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: activeTab === "commands" ? "active" : "", onClick: /* @__PURE__ */ __name(() => setActiveTab("commands"), "onClick"), children: "Komutlar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: activeTab === "reviews" ? "active" : "", onClick: /* @__PURE__ */ __name(() => setActiveTab("reviews"), "onClick"), children: "Yorumlar" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bot-modal-content", children: [
      activeTab === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overview-tab", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "description-section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Açıklama" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "description-content", children: bot.description })
        ] }),
        bot.features && bot.features.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "features-section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
            "Ö",
            "zellikler"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "features-list", children: bot.features.map((feature, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "feature-item", children: [
            "✅",
            " ",
            feature
          ] }, idx)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "links-section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Bağlantılar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "links-list", children: [
            bot.website && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: bot.website, target: "_blank", rel: "noopener noreferrer", children: [
              "🌐",
              " Web Sitesi"
            ] }),
            bot.support_server && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `/invite/${bot.support_server}`, children: [
              "💬",
              " Destek Sunucusu"
            ] }),
            bot.privacy_policy && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: bot.privacy_policy, target: "_blank", rel: "noopener noreferrer", children: [
              "🔒",
              " Gizlilik Politikası"
            ] })
          ] })
        ] }),
        bot.developer && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "developer-section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Geliştirici" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "developer-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: bot.developer.avatar || "/default-avatar.png", alt: "" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: bot.developer.username })
          ] })
        ] })
      ] }),
      activeTab === "commands" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "commands-tab", children: bot.commands && bot.commands.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "commands-list", children: bot.commands.map((cmd, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "command-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { className: "command-name", children: [
          bot.prefix,
          cmd.name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "command-desc", children: cmd.description }),
        cmd.usage && /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "command-usage", children: cmd.usage })
      ] }, idx)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "no-data", children: "Komut listesi mevcut değil" }) }),
      activeTab === "reviews" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "reviews-tab", children: bot.reviews && bot.reviews.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "reviews-list", children: bot.reviews.map((review) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "review-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "review-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: review.avatar || "/default-avatar.png", alt: "" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "reviewer-name", children: review.user }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "review-rating", children: "⭐".repeat(review.rating) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "review-content", children: review.content }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "review-date", children: new Date(review.created_at).toLocaleDateString("tr-TR") })
      ] }, review.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "no-data", children: "Henüz yorum yok" }) })
    ] }),
    showServerSelect && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "server-select-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "server-select-modal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Sunucu Seç" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        bot.name,
        " botunu hangi sunucuya eklemek istiyorsunuz?"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "server-list", children: servers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "no-servers", children: "Admin olduğunuz sunucu bulunamadı" }) : servers.map((server) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `server-item ${selectedServer?.id === server.id ? "selected" : ""}`,
          onClick: /* @__PURE__ */ __name(() => setSelectedServer(server), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: server.icon || "/default-server.png", alt: "" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: server.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "member-count", children: [
              server.member_count,
              " ",
              "ü",
              "ye"
            ] })
          ]
        },
        server.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "server-select-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "cancel-btn", onClick: /* @__PURE__ */ __name(() => setShowServerSelect(false), "onClick"), children: [
          "İ",
          "ptal"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "install-btn",
            disabled: !selectedServer || installing,
            onClick: handleInstall,
            children: installing ? "Yükleniyor..." : "Ekle"
          }
        )
      ] })
    ] }) })
  ] }) });
}, "BotDetailModal");
const useBotMarketplace = /* @__PURE__ */ __name(() => {
  const [bots, setBots] = reactExports.useState([]);
  const [featuredBots, setFeaturedBots] = reactExports.useState([]);
  const [trendingBots, setTrendingBots] = reactExports.useState([]);
  const [categories, setCategories] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [selectedCategory, setSelectedCategory] = reactExports.useState(null);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [sortBy, setSortBy] = reactExports.useState("popular");
  const [selectedBot, setSelectedBot] = reactExports.useState(null);
  const [page, setPage] = reactExports.useState(1);
  const [totalPages, setTotalPages] = reactExports.useState(1);
  const API_URL = API_BASE_URL;
  const loadBots = reactExports.useCallback(async () => {
    try {
      const params = new URLSearchParams({
        page,
        sort: sortBy,
        limit: 20
      });
      if (selectedCategory) params.append("category", selectedCategory);
      if (searchQuery) params.append("search", searchQuery);
      const response = await fetch(`${API_URL}/bots/?${params}`);
      if (response.ok) {
        const data = await response.json();
        setBots(data.bots || []);
        setTotalPages(data.pages || 1);
      }
    } catch (e) {
      console.error("Failed to load bots:", e);
    }
  }, [API_URL, page, sortBy, selectedCategory, searchQuery]);
  const loadInitialData = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const [categoriesRes, featuredRes, trendingRes] = await Promise.all([
        fetch(`${API_URL}/bots/categories/`),
        fetch(`${API_URL}/bots/featured/`),
        fetch(`${API_URL}/bots/trending/`)
      ]);
      if (categoriesRes.ok) {
        const data = await categoriesRes.json();
        setCategories(data.categories || []);
      }
      if (featuredRes.ok) {
        const data = await featuredRes.json();
        setFeaturedBots(data.bots || []);
      }
      if (trendingRes.ok) {
        const data = await trendingRes.json();
        setTrendingBots(data.bots || []);
      }
    } catch (e) {
      console.error("Failed to load initial data:", e);
    }
    setLoading(false);
  }, [API_URL]);
  const loadBotDetail = /* @__PURE__ */ __name(async (bot) => {
    try {
      const response = await fetch(`${API_URL}/bots/${bot.id}/`);
      if (response.ok) {
        const data = await response.json();
        setSelectedBot(data);
      }
    } catch (e) {
      console.error("Failed to load bot detail:", e);
    }
  }, "loadBotDetail");
  reactExports.useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);
  reactExports.useEffect(() => {
    loadBots();
  }, [loadBots]);
  return {
    bots,
    featuredBots,
    trendingBots,
    categories,
    loading,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    selectedBot,
    setSelectedBot,
    page,
    setPage,
    totalPages,
    loadBotDetail
  };
}, "useBotMarketplace");
const BotMarketplace = /* @__PURE__ */ __name(({ onClose }) => {
  const {
    bots,
    featuredBots,
    trendingBots,
    categories,
    loading,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    selectedBot,
    setSelectedBot,
    page,
    setPage,
    totalPages,
    loadBotDetail
  } = useBotMarketplace();
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bot-marketplace", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "marketplace-loading", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading-spinner" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Bot Marketplace y",
        "ü",
        "kleniyor..."
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bot-marketplace", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "marketplace-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-content", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { children: [
          "🤖",
          " Bot Marketplace"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Sunucunuzu g",
          "üç",
          "lendirecek binlerce bot ke",
          "ş",
          "fedin"
        ] })
      ] }),
      onClose && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "marketplace-filters", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "search-box", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Bot ara...", value: searchQuery, onChange: /* @__PURE__ */ __name((e) => setSearchQuery(e.target.value), "onChange") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "search-icon", children: "🔍" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: selectedCategory || "", onChange: /* @__PURE__ */ __name((e) => setSelectedCategory(e.target.value || null), "onChange"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "", children: [
            "T",
            "ü",
            "m Kategoriler"
          ] }),
          categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: cat.slug, children: [
            cat.icon,
            " ",
            cat.name,
            " (",
            cat.bot_count,
            ")"
          ] }, cat.id))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: sortBy, onChange: /* @__PURE__ */ __name((e) => setSortBy(e.target.value), "onChange"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "popular", children: [
            "Pop",
            "ü",
            "ler"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "new", children: "Yeni" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "rated", children: [
            "En ",
            "İ",
            "yi Puan"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "marketplace-content", children: [
      featuredBots.length > 0 && !searchQuery && !selectedCategory && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "featured-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
          "⭐",
          " ",
          "Ö",
          "ne ",
          "Çı",
          "kan Botlar"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "featured-grid", children: featuredBots.map((bot) => /* @__PURE__ */ jsxRuntimeExports.jsx(BotCard, { bot, onClick: loadBotDetail }, bot.id)) })
      ] }),
      trendingBots.length > 0 && !searchQuery && !selectedCategory && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "trending-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
          "📈",
          " Y",
          "ü",
          "kselen Botlar"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "trending-grid", children: trendingBots.map((bot) => /* @__PURE__ */ jsxRuntimeExports.jsx(BotCard, { bot, onClick: loadBotDetail }, bot.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "all-bots-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: selectedCategory ? categories.find((c) => c.slug === selectedCategory)?.name || "Botlar" : searchQuery ? `"${searchQuery}" için sonuçlar` : "Tüm Botlar" }),
        bots.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-results", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Bot bulunamad",
          "ı"
        ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bots-grid", children: bots.map((bot) => /* @__PURE__ */ jsxRuntimeExports.jsx(BotCard, { bot, onClick: loadBotDetail }, bot.id)) }),
          totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pagination", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: page <= 1, onClick: /* @__PURE__ */ __name(() => setPage((p) => p - 1), "onClick"), children: [
              "←",
              " ",
              "Ö",
              "nceki"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Sayfa ",
              page,
              " / ",
              totalPages
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: page >= totalPages, onClick: /* @__PURE__ */ __name(() => setPage((p) => p + 1), "onClick"), children: [
              "Sonraki ",
              "→"
            ] })
          ] })
        ] })
      ] })
    ] }),
    selectedBot && /* @__PURE__ */ jsxRuntimeExports.jsx(BotDetailModal, { bot: selectedBot, onClose: /* @__PURE__ */ __name(() => setSelectedBot(null), "onClose") })
  ] });
}, "BotMarketplace");
export {
  BotMarketplace as default
};
