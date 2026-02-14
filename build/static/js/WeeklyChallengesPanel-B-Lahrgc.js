var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { bC as FaGift, bb as FaVideo, aK as FaMusic, cy as FaShare, by as FaHeart, a8 as FaGamepad, u as FaUsers, E as FaMicrophone, ac as FaComments, Q as FaStar, cz as FaGem, aq as FaCoins, aI as FaMedal, h as FaLock, a9 as FaCheck, P as FaTrophy, z as FaClock, R as FaFire } from "./icons-vendor-2VDeY8fW.js";
const styles = {
  container: { backgroundColor: "#36393f", borderRadius: "8px", padding: "20px", color: "#dcddde" },
  loading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    padding: "60px",
    color: "#b9bbbe"
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  headerLeft: { display: "flex", alignItems: "center", gap: "16px" },
  title: { margin: 0, fontSize: "18px", fontWeight: "600", color: "#fff" },
  subtitle: { margin: "4px 0 0", fontSize: "13px", color: "#72767d" },
  timer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 12px",
    backgroundColor: "#2f3136",
    borderRadius: "4px",
    fontSize: "13px",
    color: "#b9bbbe"
  },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "20px" },
  statCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px",
    backgroundColor: "#2f3136",
    borderRadius: "8px"
  },
  statInfo: { display: "flex", flexDirection: "column" },
  statValue: { fontSize: "20px", fontWeight: "700", color: "#fff" },
  statLabel: { fontSize: "11px", color: "#72767d", textTransform: "uppercase" },
  tabs: {
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
    borderBottom: "1px solid #40444b",
    paddingBottom: "12px"
  },
  tab: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "4px",
    color: "#72767d",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  tabActive: { backgroundColor: "#5865f2", color: "#fff" },
  challengesList: { display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" },
  challengeCard: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "16px",
    backgroundColor: "#2f3136",
    borderRadius: "8px",
    transition: "transform 0.2s"
  },
  challengeIcon: {
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#202225",
    borderRadius: "12px",
    fontSize: "20px"
  },
  challengeContent: { flex: 1 },
  challengeHeader: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" },
  challengeTitle: { margin: 0, fontSize: "15px", fontWeight: "600", color: "#fff" },
  difficultyStars: { display: "flex", gap: "2px" },
  challengeDescription: { margin: "0 0 8px", fontSize: "13px", color: "#b9bbbe" },
  progressContainer: { display: "flex", alignItems: "center", gap: "8px" },
  progressBar: {
    flex: 1,
    height: "6px",
    backgroundColor: "#202225",
    borderRadius: "3px",
    overflow: "hidden"
  },
  progressFill: { height: "100%", backgroundColor: "#5865f2", borderRadius: "3px", transition: "width 0.3s" },
  progressText: { fontSize: "12px", color: "#72767d", minWidth: "45px", textAlign: "right" },
  challengeReward: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" },
  pointsBadge: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "4px 8px",
    backgroundColor: "rgba(250, 166, 26, 0.2)",
    borderRadius: "12px",
    fontSize: "12px",
    color: "#faa61a",
    fontWeight: "600"
  },
  rewardBadge: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "4px 8px",
    backgroundColor: "rgba(88, 101, 242, 0.2)",
    borderRadius: "12px",
    fontSize: "11px",
    color: "#dcddde"
  },
  rewardsSection: { marginBottom: "20px" },
  rewardsSectionTitle: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    margin: "0 0 12px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#fff"
  },
  rewardsList: { display: "flex", flexWrap: "wrap", gap: "8px" },
  earnedReward: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 12px",
    backgroundColor: "#2f3136",
    borderRadius: "16px",
    fontSize: "13px",
    color: "#dcddde"
  },
  summaryCard: {
    padding: "20px",
    background: "linear-gradient(135deg, rgba(88, 101, 242, 0.3) 0%, rgba(114, 137, 218, 0.3) 100%)",
    borderRadius: "12px",
    border: "1px solid rgba(88, 101, 242, 0.5)"
  },
  summaryHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "16px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#fff"
  },
  summaryStats: { display: "flex", justifyContent: "space-around", marginBottom: "16px" },
  summaryItem: { display: "flex", flexDirection: "column", alignItems: "center" },
  summaryValue: { fontSize: "24px", fontWeight: "700", color: "#fff" },
  summaryLabel: { fontSize: "11px", color: "#b9bbbe", textTransform: "uppercase" },
  totalProgressBar: {
    height: "8px",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: "4px",
    overflow: "hidden"
  },
  totalProgressFill: { height: "100%", backgroundColor: "#43b581", borderRadius: "4px", transition: "width 0.3s" }
};
const DEMO_CHALLENGES = {
  weekly: [
    { id: 1, title: "Sosyal Kelebek", description: "50 mesaj gönder", icon: "comments", type: "messages", target: 50, current: 32, points: 100, reward: { type: "badge", name: "Konuşkan" }, difficulty: "easy", status: "in_progress" },
    { id: 2, title: "Ses Ustası", description: "2 saat sesli sohbette kal", icon: "microphone", type: "voice_time", target: 120, current: 85, points: 200, reward: { type: "coins", amount: 500 }, difficulty: "medium", status: "in_progress" },
    { id: 3, title: "Topluluk Yıldızı", description: "10 farklı sunucuda aktif ol", icon: "users", type: "servers_active", target: 10, current: 10, points: 300, reward: { type: "badge", name: "Yıldız" }, difficulty: "hard", status: "completed" },
    { id: 4, title: "Oyun Maratonu", description: "5 oyun aktivitesi başlat", icon: "gamepad", type: "games_played", target: 5, current: 2, points: 150, reward: { type: "xp", amount: 1e3 }, difficulty: "medium", status: "in_progress" },
    { id: 5, title: "Kalp Dağıtıcı", description: "25 mesaja tepki ver", icon: "heart", type: "reactions", target: 25, current: 0, points: 75, reward: { type: "emoji", name: "❤️‍🔥" }, difficulty: "easy", status: "not_started" }
  ],
  daily: [
    { id: 101, title: "Günlük Selamlama", description: "İlk mesajını gönder", icon: "comments", target: 1, current: 1, points: 25, status: "completed" },
    { id: 102, title: "Sesli Katılım", description: "Bir sesli kanala katıl", icon: "microphone", target: 1, current: 0, points: 25, status: "not_started" },
    { id: 103, title: "Tepki Ver", description: "5 mesaja emoji tepkisi ver", icon: "heart", target: 5, current: 3, points: 25, status: "in_progress" }
  ],
  special: [
    { id: 201, title: "Yeni Yıl Özel", description: "Yeni yıl kutlamasına katıl", icon: "gift", target: 1, current: 0, points: 500, reward: { type: "special_badge", name: "2026 Yıldızı" }, endsAt: "2026-01-31T23:59:59", status: "locked" }
  ]
};
const DEMO_PROGRESS = {
  totalPoints: 2450,
  weeklyPoints: 625,
  streak: 7,
  completedChallenges: 23,
  rank: 156,
  rewards: [
    { type: "badge", name: "Konuşkan", earnedAt: "2026-01-20" },
    { type: "badge", name: "Yeni Başlayan", earnedAt: "2026-01-15" }
  ]
};
const ICON_MAP = {
  comments: FaComments,
  microphone: FaMicrophone,
  users: FaUsers,
  gamepad: FaGamepad,
  heart: FaHeart,
  share: FaShare,
  music: FaMusic,
  video: FaVideo,
  gift: FaGift
};
const getIcon = /* @__PURE__ */ __name((iconName) => {
  const Icon = ICON_MAP[iconName] || FaStar;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, {});
}, "getIcon");
const getDifficultyColor = /* @__PURE__ */ __name((d) => d === "easy" ? "#43b581" : d === "medium" ? "#faa61a" : d === "hard" ? "#f04747" : "#72767d", "getDifficultyColor");
const getDifficultyStars = /* @__PURE__ */ __name((difficulty) => {
  const count = difficulty === "easy" ? 1 : difficulty === "medium" ? 2 : 3;
  return Array(count).fill(0).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FaStar, { size: 10, color: getDifficultyColor(difficulty) }, i));
}, "getDifficultyStars");
const getRewardIcon = /* @__PURE__ */ __name((reward) => {
  if (!reward) return null;
  const map = { badge: /* @__PURE__ */ jsxRuntimeExports.jsx(FaMedal, { color: "#faa61a" }), coins: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCoins, { color: "#f1c40f" }), xp: /* @__PURE__ */ jsxRuntimeExports.jsx(FaStar, { color: "#5865f2" }), emoji: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: reward.name }), special_badge: /* @__PURE__ */ jsxRuntimeExports.jsx(FaGem, { color: "#e91e63" }) };
  return map[reward.type] || /* @__PURE__ */ jsxRuntimeExports.jsx(FaGift, { color: "#43b581" });
}, "getRewardIcon");
const getRewardText = /* @__PURE__ */ __name((reward) => {
  if (!reward) return "";
  const map = { badge: reward.name, coins: `${reward.amount} Coin`, xp: `${reward.amount} XP`, emoji: "Özel Emoji", special_badge: reward.name };
  return map[reward.type] || "Ödül";
}, "getRewardText");
const useChallenges = /* @__PURE__ */ __name((fetchWithAuth, apiBaseUrl) => {
  const [challenges, setChallenges] = reactExports.useState({ weekly: [], daily: [], special: [] });
  const [userProgress, setUserProgress] = reactExports.useState({ totalPoints: 0, weeklyPoints: 0, streak: 0, completedChallenges: 0, rank: 1, rewards: [] });
  const [loading, setLoading] = reactExports.useState(true);
  const [activeTab, setActiveTab] = reactExports.useState("weekly");
  const [timeRemaining, setTimeRemaining] = reactExports.useState({ days: 0, hours: 0, minutes: 0 });
  const fetchChallenges = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/challenges/`);
      if (response.ok) {
        const data = await response.json();
        setChallenges(data.challenges);
        setUserProgress(data.userProgress);
      } else {
        setChallenges(DEMO_CHALLENGES);
        setUserProgress(DEMO_PROGRESS);
      }
    } catch (err) {
      console.error("Failed to fetch challenges:", err);
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth, apiBaseUrl]);
  reactExports.useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);
  reactExports.useEffect(() => {
    const calc = /* @__PURE__ */ __name(() => {
      const now = /* @__PURE__ */ new Date();
      const endOfWeek = /* @__PURE__ */ new Date();
      endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
      endOfWeek.setHours(23, 59, 59, 999);
      const diff = endOfWeek - now;
      setTimeRemaining({
        days: Math.floor(diff / (1e3 * 60 * 60 * 24)),
        hours: Math.floor(diff % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)),
        minutes: Math.floor(diff % (1e3 * 60 * 60) / (1e3 * 60))
      });
    }, "calc");
    calc();
    const interval = setInterval(calc, 6e4);
    return () => clearInterval(interval);
  }, []);
  return { challenges, userProgress, loading, activeTab, setActiveTab, timeRemaining };
}, "useChallenges");
const ChallengeCard = /* @__PURE__ */ __name(({ challenge, isDaily, styles: styles2 }) => {
  const progress = challenge.current / challenge.target * 100;
  const isCompleted = challenge.status === "completed";
  const isLocked = challenge.status === "locked";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    ...styles2.challengeCard,
    opacity: isCompleted ? 0.7 : 1,
    backgroundColor: isCompleted ? "#202225" : "#2f3136"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles2.challengeIcon, children: isLocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaLock, { size: 20, color: "#72767d" }) : isCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { size: 20, color: "#43b581" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: getDifficultyColor(challenge.difficulty) }, children: getIcon(challenge.icon) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.challengeContent, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.challengeHeader, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: styles2.challengeTitle, children: challenge.title }),
        !isDaily && challenge.difficulty && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles2.difficultyStars, children: getDifficultyStars(challenge.difficulty) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles2.challengeDescription, children: challenge.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.progressContainer, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles2.progressBar, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          ...styles2.progressFill,
          width: `${Math.min(progress, 100)}%`,
          backgroundColor: isCompleted ? "#43b581" : "#5865f2"
        } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles2.progressText, children: [
          challenge.current,
          "/",
          challenge.target
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.challengeReward, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.pointsBadge, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaStar, { size: 10, color: "#faa61a" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: challenge.points })
      ] }),
      challenge.reward && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.rewardBadge, children: [
        getRewardIcon(challenge.reward),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: getRewardText(challenge.reward) })
      ] })
    ] })
  ] });
}, "ChallengeCard");
const WeeklyChallengesPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, currentUser }) => {
  const { challenges, userProgress, loading, activeTab, setActiveTab, timeRemaining } = useChallenges(fetchWithAuth, apiBaseUrl);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.container, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.loading, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrophy, { className: "pulse", size: 32, color: "#faa61a" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Görevler yükleniyor..." })
    ] }) });
  }
  const completedWeekly = challenges.weekly.filter((c) => c.status === "completed").length;
  const weeklyTotal = challenges.weekly.length;
  const completionPct = weeklyTotal > 0 ? Math.round(completedWeekly / weeklyTotal * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrophy, { size: 24, color: "#faa61a" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Haftalık Görevler" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.subtitle, children: "Görevleri tamamla, ödüller kazan!" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.timer, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, { size: 14, color: "#72767d" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          timeRemaining.days,
          "g ",
          timeRemaining.hours,
          "s ",
          timeRemaining.minutes,
          "d kaldı"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statsGrid, children: [
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaFire, { size: 20, color: "#f04747" }), value: userProgress.streak, label: "Günlük Seri" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaStar, { size: 20, color: "#faa61a" }), value: userProgress.weeklyPoints, label: "Haftalık Puan" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrophy, { size: 20, color: "#5865f2" }), value: `#${userProgress.rank}`, label: "Sıralama" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaMedal, { size: 20, color: "#43b581" }), value: userProgress.completedChallenges, label: "Tamamlanan" }
    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
      s.icon,
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.statValue, children: s.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.statLabel, children: s.label })
      ] })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.tabs, children: [
      { key: "weekly", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrophy, { size: 14 }), label: `Haftalık (${challenges.weekly.length})` },
      { key: "daily", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaStar, { size: 14 }), label: `Günlük (${challenges.daily.length})` },
      { key: "special", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaGem, { size: 14 }), label: `Özel (${challenges.special.length})` }
    ].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: /* @__PURE__ */ __name(() => setActiveTab(t.key), "onClick"),
        style: { ...styles.tab, ...activeTab === t.key ? styles.tabActive : {} },
        children: [
          t.icon,
          " ",
          t.label
        ]
      },
      t.key
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.challengesList, children: challenges[activeTab].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(ChallengeCard, { challenge: c, isDaily: activeTab === "daily", styles }, c.id)) }),
    userProgress.rewards.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.rewardsSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.rewardsSectionTitle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaGift, { size: 14 }),
        " Kazanılan Ödüller"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.rewardsList, children: userProgress.rewards.map((reward, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.earnedReward, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaMedal, { size: 16, color: "#faa61a" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: reward.name })
      ] }, index)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.summaryCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.summaryHeader, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaGem, { size: 16, color: "#e91e63" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Bu Hafta" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.summaryStats, children: [
        { value: `${completedWeekly}/${weeklyTotal}`, label: "Görev" },
        { value: userProgress.weeklyPoints, label: "Puan" },
        { value: `${completionPct}%`, label: "İlerleme" }
      ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.summaryItem, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.summaryValue, children: s.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.summaryLabel, children: s.label })
      ] }, s.label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.totalProgressBar, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.totalProgressFill, width: `${completionPct}%` } }) })
    ] })
  ] });
}, "WeeklyChallengesPanel");
export {
  WeeklyChallengesPanel as default
};
