var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports, f as ReactDOM } from "./react-core-BiY6fgAJ.js";
import { ah as FaCrown, Q as FaStar, aI as FaMedal, P as FaTrophy, a9 as FaCheck, ad as FaUserPlus, aq as FaCoins, af as FaDesktop, aJ as FaStickyNote, z as FaClock } from "./icons-vendor-2VDeY8fW.js";
import SessionManagerModal from "./SessionManagerModal-DbQklqjF.js";
import UserNotesModal from "./UserNotesModal-CGi7VG1X.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const AchievementBadge = /* @__PURE__ */ __name(({ achievement, size = "medium" }) => {
  const iconMap = {
    trophy: FaTrophy,
    medal: FaMedal,
    star: FaStar,
    crown: FaCrown
  };
  const Icon = iconMap[achievement.icon_type] || FaTrophy;
  const sizeStyles = {
    small: { width: "30px", height: "30px", fontSize: "14px" },
    medium: { width: "50px", height: "50px", fontSize: "24px" },
    large: { width: "70px", height: "70px", fontSize: "32px" }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        ...sizeStyles[size],
        backgroundColor: achievement.color || "#5865f2",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        position: "relative",
        cursor: "pointer"
      },
      title: `${achievement.name}: ${achievement.description}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, {}),
        achievement.is_new && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
          position: "absolute",
          top: "-5px",
          right: "-5px",
          width: "12px",
          height: "12px",
          backgroundColor: "#f04747",
          borderRadius: "50%",
          border: "2px solid #2b2d31"
        } })
      ]
    }
  );
}, "AchievementBadge");
const AchievementsPanel = /* @__PURE__ */ __name(({ username, fetchWithAuth, apiBaseUrl }) => {
  const [achievements, setAchievements] = reactExports.useState([]);
  const [badges, setBadges] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    loadAchievements();
  }, [username]);
  const loadAchievements = /* @__PURE__ */ __name(async () => {
    try {
      const [achievRes, badgeRes] = await Promise.all([
        fetchWithAuth(`${apiBaseUrl}/api/user/achievements/`),
        fetchWithAuth(`${apiBaseUrl}/api/user/badges/`)
      ]);
      if (achievRes.ok) {
        const data = await achievRes.json();
        setAchievements(data.achievements || []);
      }
      if (badgeRes.ok) {
        const data = await badgeRes.json();
        setBadges(data.badges || []);
      }
    } catch (error) {
      console.error("Achievement load error:", error);
    } finally {
      setLoading(false);
    }
  }, "loadAchievements");
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#949ba4", fontSize: "0.9em" }, children: "Yükleniyor..." });
  }
  if (achievements.length === 0 && badges.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#949ba4", fontSize: "0.9em" }, children: "Henüz başarı kazanılmadı" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: "15px" }, children: [
    achievements.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "15px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { style: { color: "#949ba4", fontSize: "0.85em", marginBottom: "10px", textTransform: "uppercase" }, children: [
        "🏆 Başarılar (",
        achievements.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: "8px", flexWrap: "wrap" }, children: achievements.slice(0, 10).map((ach) => /* @__PURE__ */ jsxRuntimeExports.jsx(AchievementBadge, { achievement: ach, size: "medium" }, ach.id)) })
    ] }),
    badges.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { style: { color: "#949ba4", fontSize: "0.85em", marginBottom: "10px", textTransform: "uppercase" }, children: [
        "🎖️ Rozetler (",
        badges.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: "8px", flexWrap: "wrap" }, children: badges.map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            padding: "5px 12px",
            backgroundColor: badge.color || "#5865f2",
            borderRadius: "12px",
            color: "white",
            fontSize: "0.8em",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "5px"
          },
          title: badge.description,
          children: [
            badge.emoji && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: badge.emoji }),
            badge.name
          ]
        },
        badge.id
      )) })
    ] })
  ] });
}, "AchievementsPanel");
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
    zIndex: 1e3,
    backdropFilter: "blur(8px)"
  },
  modal: {
    width: "500px",
    maxWidth: "90vw",
    backgroundColor: "#2f3136",
    borderRadius: "16px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
    maxHeight: "90vh",
    border: "1px solid rgba(255, 255, 255, 0.1)"
  },
  actionButton: {
    padding: "12px 20px",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontSize: "14px",
    transition: "all 0.2s",
    cursor: "pointer"
  },
  messageButton: {
    padding: "12px 20px",
    backgroundColor: "#5865f2",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "0.9em"
  },
  content: {
    padding: "20px",
    maxHeight: "60vh",
    overflowY: "auto"
  },
  friendCodeContainer: {
    backgroundColor: "rgba(88, 101, 242, 0.1)",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px dashed #5865f2",
    marginBottom: "15px",
    transition: "background-color 0.2s"
  },
  friendCodeLabel: {
    fontSize: "0.75em",
    color: "#949ba4",
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: "4px"
  },
  friendCodeValue: {
    fontSize: "1.3em",
    color: "#5865f2",
    fontWeight: "800",
    letterSpacing: "2px"
  },
  section: {
    marginTop: "20px"
  },
  sectionTitle: {
    color: "var(--text-secondary)",
    fontSize: "0.8em",
    fontWeight: "bold",
    textTransform: "uppercase",
    margin: "0 0 8px 0",
    borderBottom: "1px solid var(--border-primary)",
    paddingBottom: "5px"
  },
  statusText: {
    color: "var(--text-primary)",
    margin: 0,
    fontSize: "0.9em"
  },
  linksContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  linkButton: {
    display: "flex",
    alignItems: "center",
    padding: "10px 12px",
    backgroundColor: "var(--background-secondary)",
    borderRadius: "4px",
    color: "var(--text-primary)",
    textDecoration: "none",
    transition: "background-color 0.2s ease",
    border: "none",
    fontFamily: "inherit",
    fontSize: "1em",
    width: "auto",
    cursor: "pointer",
    textAlign: "left",
    alignSelf: "flex-start"
  },
  linkText: {
    marginLeft: "10px",
    fontWeight: "500"
  },
  tabsContainer: {
    display: "flex",
    gap: "10px",
    borderBottom: "2px solid var(--background-tertiary)",
    marginBottom: "20px"
  },
  tabButton: {
    background: "none",
    border: "none",
    padding: "10px 20px",
    color: "var(--text-secondary)",
    cursor: "pointer",
    fontWeight: "500",
    borderBottom: "2px solid transparent",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    gap: "5px"
  },
  activeTab: {
    color: "var(--brand-color)",
    borderBottomColor: "var(--brand-color)"
  },
  presenceTimeline: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "15px"
  },
  presenceEntry: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px",
    backgroundColor: "var(--background-secondary)",
    borderRadius: "6px",
    transition: "background-color 0.2s"
  },
  presenceStatus: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    flexShrink: 0
  },
  presenceDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flex: 1
  },
  presenceStatusText: {
    color: "var(--text-primary)",
    fontWeight: "500",
    fontSize: "0.95em"
  },
  presenceTime: {
    color: "var(--text-secondary)",
    fontSize: "0.85em"
  },
  noDataText: {
    color: "var(--text-secondary)",
    textAlign: "center",
    padding: "20px",
    fontStyle: "italic"
  }
};
const getIconForLink = /* @__PURE__ */ __name((key) => {
  if (key.includes("steam")) return "fab fa-steam";
  if (key.includes("x")) return "fab fa-twitter";
  if (key.includes("instagram")) return "fab fa-instagram";
  return "fa fa-link";
}, "getIconForLink");
const formatUrl = /* @__PURE__ */ __name((url, key) => {
  if (!url || url.trim() === "") return "#";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (key === "x") return `https://x.com/${url.replace("@", "")}`;
  if (key === "instagram") return `https://instagram.com/${url.replace("@", "")}`;
  return `https://${url}`;
}, "formatUrl");
const linkDisplayNames = {
  steam_trade: "Steam Trade URL",
  steam_profile: "Steam Profili",
  steam_friend_code: "Steam Arkadaş Kodu",
  x: "X (Twitter)",
  instagram: "Instagram"
};
const useProfileModal = /* @__PURE__ */ __name(({ user, fetchWithAuth, apiBaseUrl, currentUser, friendsList }) => {
  const [requestStatus, setRequestStatus] = reactExports.useState("idle");
  const [showSessionManager, setShowSessionManager] = reactExports.useState(false);
  const [showNotes, setShowNotes] = reactExports.useState(false);
  const [activeTab, setActiveTab] = reactExports.useState("profile");
  const [presenceHistory, setPresenceHistory] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (activeTab === "activity" && user?.username) {
      const fetchPresenceHistory = /* @__PURE__ */ __name(async () => {
        try {
          const response = await fetchWithAuth(`${apiBaseUrl}/presence/${user.username}/`);
          if (response.ok) {
            const data = await response.json();
            setPresenceHistory(data.presence || []);
          }
        } catch (error) {
          console.error("Failed to fetch presence history:", error);
          setPresenceHistory([]);
        }
      }, "fetchPresenceHistory");
      fetchPresenceHistory();
    }
  }, [activeTab, user?.username, fetchWithAuth, apiBaseUrl]);
  const isFriend = friendsList && Array.isArray(friendsList) && friendsList.some((f) => {
    if (typeof f === "string") return f === user?.username;
    return f.username === user?.username || f.sender_username === user?.username || f.receiver_username === user?.username;
  });
  const isSelf = user?.username === currentUser;
  const handleAddFriend = /* @__PURE__ */ __name(async () => {
    setRequestStatus("loading");
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/friends/send/`, { method: "POST", body: JSON.stringify({ username: user.username }) });
      if (response.ok) {
        setRequestStatus("success");
      } else {
        toast.error("❌ İstek gönderilemedi. Zaten ekli veya bekliyor olabilir.");
        setRequestStatus("idle");
      }
    } catch (error) {
      console.error("Arkadaş ekleme hatası:", error);
      setRequestStatus("idle");
    }
  }, "handleAddFriend");
  const copyToClipboard = /* @__PURE__ */ __name((text, key) => {
    try {
      navigator.clipboard.writeText(text);
      toast.success(`✅ '${key}' panoya kopyalandı`);
    } catch (err) {
      toast.error("❌ Kopyalama hatası.");
    }
  }, "copyToClipboard");
  const handleSendMoney = /* @__PURE__ */ __name(async () => {
    const amount = prompt(`Ne kadar Coin göndermek istiyorsun? (${user.username} kişisine)`);
    if (!amount) return;
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/store/transfer/`, { method: "POST", body: JSON.stringify({ target_username: user.username, amount }) });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.error);
      }
    } catch (e) {
      toast.error("❌ Hata.");
    }
  }, "handleSendMoney");
  const socialLinks = user?.social_links || {};
  const validLinks = Object.entries(socialLinks).filter(([, value]) => value && value.trim() !== "");
  return {
    requestStatus,
    showSessionManager,
    setShowSessionManager,
    showNotes,
    setShowNotes,
    activeTab,
    setActiveTab,
    presenceHistory,
    isFriend,
    isSelf,
    handleAddFriend,
    copyToClipboard,
    handleSendMoney,
    validLinks
  };
}, "useProfileModal");
const UserProfileModal = /* @__PURE__ */ __name(({ user, onClose, onStartDM, onImageClick, getDeterministicAvatar, fetchWithAuth, apiBaseUrl, currentUser, friendsList }) => {
  const {
    requestStatus,
    showSessionManager,
    setShowSessionManager,
    showNotes,
    setShowNotes,
    activeTab,
    setActiveTab,
    presenceHistory,
    isFriend,
    isSelf,
    handleAddFriend,
    copyToClipboard,
    handleSendMoney,
    validLinks
  } = useProfileModal({ user, fetchWithAuth, apiBaseUrl, currentUser, friendsList });
  if (!user) return null;
  const rawAvatarUrl = user.avatar || getDeterministicAvatar(user.username);
  const avatarUrl = typeof rawAvatarUrl === "string" && rawAvatarUrl.startsWith("http") ? rawAvatarUrl : typeof rawAvatarUrl === "string" ? `${apiBaseUrl}${rawAvatarUrl}` : getDeterministicAvatar(user.username);
  const avatarSrc = avatarUrl + (user.avatar && typeof user.avatar === "string" ? `?t=${Date.now()}` : "");
  const modalContent = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.overlay, zIndex: 9999 }, onClick: onClose, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.modal, zIndex: 1e4, position: "relative" }, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        position: "relative",
        height: "180px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "16px 16px 0 0",
        overflow: "visible"
        // 🔥 FIX: Avatar'ın görünmesi için overflow:visible
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='rgba(255,255,255,0.1)' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          opacity: 0.3,
          zIndex: 1,
          borderRadius: "16px 16px 0 0",
          // 🔥 Pattern için de border radius
          overflow: "hidden"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              bottom: "-50px",
              // Adjusted for better visibility
              left: "32px",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              border: "5px solid #2f3136",
              overflow: "hidden",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
              cursor: "pointer",
              transition: "transform 0.3s ease",
              zIndex: 1e3,
              backgroundColor: "#2f3136"
              // Background color for loading state
            },
            onMouseEnter: /* @__PURE__ */ __name((e) => e.currentTarget.style.transform = "scale(1.05)", "onMouseEnter"),
            onMouseLeave: /* @__PURE__ */ __name((e) => e.currentTarget.style.transform = "scale(1)", "onMouseLeave"),
            onClick: /* @__PURE__ */ __name(() => onImageClick(avatarUrl), "onClick"),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: avatarSrc,
                style: { width: "100%", height: "100%", objectFit: "cover" },
                alt: `${user.username} avatar`,
                onError: /* @__PURE__ */ __name((e) => {
                  console.error("❌ [UserProfileModal] Avatar load failed:", e.target.src);
                  e.target.src = getDeterministicAvatar(user.username);
                }, "onError")
              },
              avatarUrl
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          position: "absolute",
          top: "16px",
          right: "16px",
          display: "flex",
          gap: "8px",
          zIndex: 1e3
          // 🔥 FIX: z-index eklendi
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name((e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }, "onClick"),
            style: {
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              background: "rgba(0, 0, 0, 0.6)",
              color: "#fff",
              fontSize: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
              zIndex: 1001
            },
            onMouseEnter: /* @__PURE__ */ __name((e) => {
              e.currentTarget.style.background = "rgba(240, 71, 71, 0.8)";
              e.currentTarget.style.transform = "scale(1.1)";
            }, "onMouseEnter"),
            onMouseLeave: /* @__PURE__ */ __name((e) => {
              e.currentTarget.style.background = "rgba(0, 0, 0, 0.6)";
              e.currentTarget.style.transform = "scale(1)";
            }, "onMouseLeave"),
            children: "×"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        padding: "70px 32px 24px 32px",
        // Reduced top padding since avatar is higher
        background: "#2f3136"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: {
          fontSize: "28px",
          fontWeight: "700",
          margin: "0 0 12px 0",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }, children: [
          user.username,
          user.is_premium && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "20px" }, children: "💎" }),
          user.is_verified && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "20px" }, children: "✅" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "10px", marginBottom: "20px" }, children: [
          !isFriend && !isSelf && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: handleAddFriend,
              style: {
                ...styles.actionButton,
                backgroundColor: requestStatus === "success" ? "#43b581" : "#5865f2",
                cursor: requestStatus === "success" || requestStatus === "loading" ? "default" : "pointer",
                flex: 1
              },
              disabled: requestStatus !== "idle",
              children: [
                requestStatus === "loading" ? "..." : requestStatus === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserPlus, {}),
                requestStatus === "success" ? " Gönderildi" : " Arkadaş Ekle"
              ]
            }
          ),
          !isSelf && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSendMoney, style: { ...styles.actionButton, backgroundColor: "#f0b232", flex: 1 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCoins, {}),
            " Coin Gönder"
          ] }),
          isSelf && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: /* @__PURE__ */ __name(() => setShowSessionManager(true), "onClick"),
              style: { ...styles.actionButton, backgroundColor: "#43b581", flex: 1 },
              title: "Aktif Oturumları Yönet",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FaDesktop, {}),
                " Oturumlar"
              ]
            }
          ),
          !isSelf && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => onStartDM(user.username), "onClick"), style: { ...styles.messageButton, flex: 1 }, children: "💬 Mesaj Gönder" }),
          !isSelf && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: /* @__PURE__ */ __name(() => setShowNotes(true), "onClick"),
              style: { ...styles.actionButton, backgroundColor: "#faa61a", flex: 0, minWidth: "44px" },
              title: "Kullanıcı Notu",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaStickyNote, {})
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        ...styles.content,
        padding: "24px 32px",
        overflowY: "auto"
      }, children: [
        user.friend_code && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            onClick: /* @__PURE__ */ __name(() => copyToClipboard(user.friend_code, "Arkadaş Kodu"), "onClick"),
            style: {
              ...styles.friendCodeContainer,
              background: "rgba(88, 101, 242, 0.1)",
              border: "1px solid rgba(88, 101, 242, 0.3)",
              borderRadius: "8px",
              padding: "12px 16px",
              marginBottom: "16px",
              cursor: "pointer",
              transition: "all 0.2s"
            },
            onMouseEnter: /* @__PURE__ */ __name((e) => e.currentTarget.style.background = "rgba(88, 101, 242, 0.2)", "onMouseEnter"),
            onMouseLeave: /* @__PURE__ */ __name((e) => e.currentTarget.style.background = "rgba(88, 101, 242, 0.1)", "onMouseLeave"),
            title: "Kodu Kopyalamak İçin Tıkla",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.friendCodeLabel, children: "Arkadaş Kodu" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.friendCodeValue, children: user.friend_code })
            ]
          }
        ),
        user.status_message && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: styles.sectionTitle, children: "Durum" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.statusText, children: user.status_message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.tabsContainer, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: /* @__PURE__ */ __name(() => setActiveTab("profile"), "onClick"),
              style: { ...styles.tabButton, ...activeTab === "profile" && styles.activeTab },
              children: "Profile"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: /* @__PURE__ */ __name(() => setActiveTab("activity"), "onClick"),
              style: { ...styles.tabButton, ...activeTab === "activity" && styles.activeTab },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {}),
                " Activity"
              ]
            }
          ),
          !isSelf && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: /* @__PURE__ */ __name(() => setActiveTab("notes"), "onClick"),
              style: { ...styles.tabButton, ...activeTab === "notes" && styles.activeTab },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FaStickyNote, {}),
                " Notes"
              ]
            }
          )
        ] }),
        activeTab === "profile" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AchievementsPanel,
            {
              username: user.username,
              fetchWithAuth,
              apiBaseUrl
            }
          ),
          validLinks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: styles.sectionTitle, children: "Bağlantılar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.linksContainer, children: validLinks.map(([key, value]) => {
              const displayName = linkDisplayNames[key] || key.charAt(0).toUpperCase() + key.slice(1);
              const icon = getIconForLink(key);
              const isCopyButton = key === "steam_friend_code" || key === "steam_trade";
              if (isCopyButton) {
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: /* @__PURE__ */ __name(() => copyToClipboard(value, displayName), "onClick"),
                    style: styles.linkButton,
                    title: `Kopyala: ${value}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: icon }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.linkText, children: displayName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fa fa-copy", style: { marginLeft: "auto", color: "var(--text-secondary)" } })
                    ]
                  },
                  key
                );
              }
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: formatUrl(value, key),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  style: styles.linkButton,
                  title: value,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: icon }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.linkText, children: displayName })
                  ]
                },
                key
              );
            }) })
          ] })
        ] }),
        activeTab === "activity" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: styles.sectionTitle, children: "Activity Timeline" }),
          presenceHistory.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.noDataText, children: "No activity data available" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.presenceTimeline, children: presenceHistory.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.presenceEntry, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              ...styles.presenceStatus,
              backgroundColor: entry.status === "online" ? "#43b581" : entry.status === "idle" ? "#faa61a" : entry.status === "dnd" ? "#f04747" : "#747f8d"
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.presenceDetails, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.presenceStatusText, children: entry.status === "online" ? "🟢 Online" : entry.status === "idle" ? "🟡 Idle" : entry.status === "dnd" ? "🔴 Do Not Disturb" : "⚫ Offline" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.presenceTime, children: new Date(entry.timestamp).toLocaleString("tr-TR", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              }) })
            ] })
          ] }, idx)) })
        ] })
      ] })
    ] }),
    activeTab === "notes" && !isSelf && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "0 32px 24px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      UserNotesModal,
      {
        targetUser: user.username,
        apiBaseUrl: apiBaseUrl ? apiBaseUrl.replace(/\/api\/?$/, "") + "/api" : "",
        fetchWithAuth,
        onClose: /* @__PURE__ */ __name(() => setActiveTab("profile"), "onClose"),
        inline: true
      }
    ) }),
    showNotes && /* @__PURE__ */ jsxRuntimeExports.jsx(
      UserNotesModal,
      {
        targetUser: user.username,
        apiBaseUrl: apiBaseUrl ? apiBaseUrl.replace(/\/api\/?$/, "") + "/api" : "",
        fetchWithAuth,
        onClose: /* @__PURE__ */ __name(() => setShowNotes(false), "onClose")
      }
    ),
    showSessionManager && /* @__PURE__ */ jsxRuntimeExports.jsx(
      SessionManagerModal,
      {
        onClose: /* @__PURE__ */ __name(() => setShowSessionManager(false), "onClose"),
        fetchWithAuth,
        apiBaseUrl
      }
    )
  ] });
  return ReactDOM.createPortal(modalContent, document.body);
}, "UserProfileModal");
export {
  UserProfileModal as default
};
