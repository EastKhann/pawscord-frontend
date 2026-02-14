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
const AchievementsPanel = /* @__PURE__ */ __name(({ apiBaseUrl, username, onClose }) => {
  const [achievements, setAchievements] = reactExports.useState([]);
  const [badges, setBadges] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [filter, setFilter] = reactExports.useState("all");
  const [category, setCategory] = reactExports.useState("all");
  reactExports.useEffect(() => {
    fetchAchievements();
    fetchBadges();
  }, [username]);
  const fetchAchievements = /* @__PURE__ */ __name(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/api/user/achievements/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setAchievements(data.achievements || []);
      } else {
        toast.error("❌ Başarılar yüklenemedi");
      }
    } catch (error) {
      console.error("Fetch achievements error:", error);
      toast.error("❌ Bağlantı hatası");
    } finally {
      setLoading(false);
    }
  }, "fetchAchievements");
  const fetchBadges = /* @__PURE__ */ __name(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/api/user/badges/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setBadges(data.badges || []);
      }
    } catch (error) {
      console.error("Fetch badges error:", error);
    }
  }, "fetchBadges");
  const filteredAchievements = achievements.filter((achievement) => {
    const matchesFilter = filter === "all" || filter === "unlocked" && achievement.unlocked || filter === "locked" && !achievement.unlocked;
    const matchesCategory = category === "all" || achievement.category === category;
    return matchesFilter && matchesCategory;
  });
  const stats = {
    total: achievements.length,
    unlocked: achievements.filter((a) => a.unlocked).length,
    locked: achievements.filter((a) => !a.unlocked).length,
    progress: achievements.length > 0 ? Math.round(achievements.filter((a) => a.unlocked).length / achievements.length * 100) : 0
  };
  const getRarityColor = /* @__PURE__ */ __name((rarity) => {
    const colors = {
      "common": "#95a5a6",
      "uncommon": "#3498db",
      "rare": "#9b59b6",
      "epic": "#e74c3c",
      "legendary": "#f39c12"
    };
    return colors[rarity] || colors.common;
  }, "getRarityColor");
  const getRarityGlow = /* @__PURE__ */ __name((rarity) => {
    if (rarity === "legendary") return "0 0 20px rgba(243, 156, 18, 0.6)";
    if (rarity === "epic") return "0 0 15px rgba(231, 76, 60, 0.5)";
    if (rarity === "rare") return "0 0 10px rgba(155, 89, 182, 0.4)";
    return "none";
  }, "getRarityGlow");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "achievements-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "achievements-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "achievements-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "🏆 Başarılar & Rozetler" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "✕" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "achievements-stats", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-icon", children: "🎯" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stat-value", children: [
            stats.unlocked,
            "/",
            stats.total
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Başarı" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-icon", children: "📊" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stat-value", children: [
            stats.progress,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Tamamlanma" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-icon", children: "🎖️" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: badges.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Rozet" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "progress-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "progress-fill",
          style: { width: `${stats.progress}%` }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "progress-text", children: [
        stats.progress,
        "% Complete"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "achievements-filters", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: filter === "all" ? "active" : "",
            onClick: /* @__PURE__ */ __name(() => setFilter("all"), "onClick"),
            children: [
              "Tümü (",
              stats.total,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: filter === "unlocked" ? "active" : "",
            onClick: /* @__PURE__ */ __name(() => setFilter("unlocked"), "onClick"),
            children: [
              "✓ Açık (",
              stats.unlocked,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: filter === "locked" ? "active" : "",
            onClick: /* @__PURE__ */ __name(() => setFilter("locked"), "onClick"),
            children: [
              "🔒 Kilitli (",
              stats.locked,
              ")"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "category-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: category === "all" ? "active" : "",
            onClick: /* @__PURE__ */ __name(() => setCategory("all"), "onClick"),
            children: "Tüm Kategoriler"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: category === "social" ? "active" : "",
            onClick: /* @__PURE__ */ __name(() => setCategory("social"), "onClick"),
            children: "👥 Sosyal"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: category === "activity" ? "active" : "",
            onClick: /* @__PURE__ */ __name(() => setCategory("activity"), "onClick"),
            children: "⚡ Aktivite"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: category === "special" ? "active" : "",
            onClick: /* @__PURE__ */ __name(() => setCategory("special"), "onClick"),
            children: "⭐ Özel"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "achievements-content", children: [
      badges.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "badges-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "🎖️ Rozetler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "badges-grid", children: badges.map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "badge-card", title: badge.description, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "badge-icon", children: badge.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "badge-name", children: badge.name })
        ] }, badge.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "achievements-grid", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Yükleniyor..." })
      ] }) : filteredAchievements.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "🎯 Başarı bulunamadı" }) }) : filteredAchievements.map((achievement) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `achievement-card ${achievement.unlocked ? "unlocked" : "locked"} ${achievement.rarity}`,
          style: {
            boxShadow: achievement.unlocked ? getRarityGlow(achievement.rarity) : "none"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "achievement-icon-wrapper", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "achievement-icon", children: achievement.icon || "🏆" }),
              achievement.unlocked && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "unlocked-badge", children: "✓" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "achievement-info", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "achievement-name", children: achievement.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "achievement-description", children: achievement.description }),
              achievement.progress !== void 0 && !achievement.unlocked && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "achievement-progress", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mini-progress-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "mini-progress-fill",
                    style: {
                      width: `${achievement.current / achievement.target * 100}%`,
                      backgroundColor: getRarityColor(achievement.rarity)
                    }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "progress-label", children: [
                  achievement.current,
                  "/",
                  achievement.target
                ] })
              ] }),
              achievement.unlocked && achievement.unlocked_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "unlocked-date", children: [
                "Açıldı: ",
                new Date(achievement.unlocked_at).toLocaleDateString("tr-TR")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "rarity-badge",
                style: {
                  backgroundColor: getRarityColor(achievement.rarity),
                  color: "white"
                },
                children: achievement.rarity || "common"
              }
            )
          ]
        },
        achievement.id
      )) })
    ] })
  ] }) });
}, "AchievementsPanel");
export {
  AchievementsPanel as default
};
