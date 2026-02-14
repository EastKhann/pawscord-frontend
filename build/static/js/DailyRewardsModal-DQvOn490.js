var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { bC as FaGift, a as FaTimes, R as FaFire, w as FaCheckCircle, ah as FaCrown, aq as FaCoins } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const styles = {
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999999 },
  modal: { backgroundColor: "#1e1e1e", borderRadius: "8px", width: "90%", maxWidth: "700px", maxHeight: "85vh", display: "flex", flexDirection: "column", color: "#fff" },
  header: { padding: "20px", borderBottom: "1px solid #444", display: "flex", justifyContent: "space-between", alignItems: "center" },
  headerLeft: { display: "flex", alignItems: "center", gap: "12px" },
  closeBtn: { background: "none", border: "none", color: "#fff", fontSize: "24px", cursor: "pointer", padding: "8px" },
  content: { padding: "20px", overflowY: "auto", flex: 1 },
  loading: { textAlign: "center", padding: "40px", color: "#99aab5" },
  streakCard: { backgroundColor: "#2c2f33", borderRadius: "12px", padding: "24px", display: "flex", alignItems: "center", gap: "20px", marginBottom: "24px", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" },
  streakInfo: { display: "flex", flexDirection: "column", gap: "4px" },
  streakNumber: { fontSize: "48px", fontWeight: "bold", color: "#f04747", lineHeight: 1 },
  streakLabel: { fontSize: "14px", color: "#99aab5", textTransform: "uppercase", letterSpacing: "1px" },
  claimSection: { marginBottom: "32px" },
  sectionTitle: { fontSize: "16px", fontWeight: "600", marginBottom: "16px", color: "#dcddde" },
  currentRewardCard: { background: "linear-gradient(135deg, #5865f2 0%, #7289da 100%)", borderRadius: "12px", padding: "24px", display: "flex", alignItems: "center", gap: "20px", marginBottom: "16px", boxShadow: "0 8px 16px rgba(88,101,242,0.3)" },
  rewardIcon: { fontSize: "48px", display: "flex", alignItems: "center", justifyContent: "center" },
  rewardDetails: { flex: 1 },
  rewardAmount: { fontSize: "28px", fontWeight: "bold", marginBottom: "4px" },
  rewardDescription: { fontSize: "14px", opacity: 0.9 },
  claimBtn: { width: "100%", padding: "16px", backgroundColor: "#43b581", border: "none", borderRadius: "8px", color: "#fff", fontSize: "18px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s", boxShadow: "0 4px 12px rgba(67,181,129,0.3)" },
  alreadyClaimed: { textAlign: "center", padding: "40px 20px", marginBottom: "32px" },
  nextRewardTime: { marginTop: "16px", padding: "12px", backgroundColor: "#2c2f33", borderRadius: "8px", fontSize: "16px", fontWeight: "600" },
  calendarSection: { marginBottom: "24px" },
  calendar: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))", gap: "12px" },
  calendarDay: { backgroundColor: "#2c2f33", borderRadius: "8px", padding: "16px", textAlign: "center", border: "2px solid transparent", transition: "all 0.2s", position: "relative" },
  calendarDayActive: { borderColor: "#43b581", backgroundColor: "#2c3136", boxShadow: "0 0 20px rgba(67,181,129,0.3)" },
  calendarDayClaimed: { opacity: 0.5 },
  dayNumber: { fontSize: "12px", color: "#99aab5", marginBottom: "8px", fontWeight: "600" },
  dayIcon: { fontSize: "32px", marginBottom: "8px", display: "flex", justifyContent: "center" },
  dayReward: { fontSize: "16px", fontWeight: "bold" },
  claimedBadge: { position: "absolute", top: "8px", right: "8px", color: "#43b581", fontSize: "16px" },
  info: { backgroundColor: "#2c2f33", borderRadius: "8px", padding: "16px" },
  infoText: { fontSize: "14px", color: "#dcddde", margin: "8px 0", lineHeight: "1.6" }
};
const calculateTimeUntilNextReward = /* @__PURE__ */ __name((lastClaimed) => {
  const now = /* @__PURE__ */ new Date();
  const claimed = new Date(lastClaimed);
  const tomorrow = new Date(claimed);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const diff = tomorrow - now;
  const hours = Math.floor(diff / (1e3 * 60 * 60));
  const minutes = Math.floor(diff % (1e3 * 60 * 60) / (1e3 * 60));
  return `${hours}h ${minutes}m`;
}, "calculateTimeUntilNextReward");
function useDailyRewards({ fetchWithAuth, apiBaseUrl }) {
  const [rewards, setRewards] = reactExports.useState([]);
  const [streak, setStreak] = reactExports.useState(0);
  const [canClaim, setCanClaim] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(true);
  const [claiming, setClaiming] = reactExports.useState(false);
  const [lastClaimed, setLastClaimed] = reactExports.useState(null);
  reactExports.useEffect(() => {
    loadDailyRewards();
  }, []);
  const loadDailyRewards = /* @__PURE__ */ __name(async () => {
    try {
      const r = await fetchWithAuth(`${apiBaseUrl}/rewards/daily/`);
      const data = await r.json();
      setRewards(data.rewards || []);
      setStreak(data.streak || 0);
      setCanClaim(data.can_claim || false);
      setLastClaimed(data.last_claimed);
    } catch (e) {
      console.error("Failed to load daily rewards:", e);
      toast.error("Failed to load rewards");
    } finally {
      setLoading(false);
    }
  }, "loadDailyRewards");
  const handleClaim = /* @__PURE__ */ __name(async () => {
    if (!canClaim) {
      toast.error("Already claimed today!");
      return;
    }
    setClaiming(true);
    try {
      const r = await fetchWithAuth(`${apiBaseUrl}/rewards/claim/`, { method: "POST", headers: { "Content-Type": "application/json" } });
      const data = await r.json();
      if (data.success) {
        toast.success(`Claimed ${data.reward.amount} ${data.reward.type}! 🎁`);
        loadDailyRewards();
      } else toast.error(data.error || "Failed to claim reward");
    } catch (e) {
      console.error("Claim error:", e);
      toast.error("Failed to claim reward");
    } finally {
      setClaiming(false);
    }
  }, "handleClaim");
  const nextReward = rewards[streak % 7] || null;
  return { rewards, streak, canClaim, loading, claiming, lastClaimed, nextReward, handleClaim };
}
__name(useDailyRewards, "useDailyRewards");
const getRewardIcon = /* @__PURE__ */ __name((type) => {
  switch (type) {
    case "coins":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(FaCoins, { style: { color: "#faa61a" } });
    case "premium":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(FaCrown, { style: { color: "#f04747" } });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(FaGift, { style: { color: "#5865f2" } });
  }
}, "getRewardIcon");
const DailyRewardsModal = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose }) => {
  const { rewards, streak, canClaim, loading, claiming, lastClaimed, nextReward, handleClaim } = useDailyRewards({ fetchWithAuth, apiBaseUrl });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaGift, { style: { fontSize: "24px", color: "#43b581" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0, fontSize: "20px" }, children: "Daily Rewards" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading..." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.streakCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaFire, { style: { fontSize: "48px", color: "#f04747" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.streakInfo, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.streakNumber, children: streak }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.streakLabel, children: "Day Streak" })
        ] })
      ] }),
      canClaim && nextReward && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.claimSection, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "Today's Reward" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.currentRewardCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.rewardIcon, children: getRewardIcon(nextReward.type) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.rewardDetails, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.rewardAmount, children: [
              nextReward.amount,
              " ",
              nextReward.type
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.rewardDescription, children: nextReward.description })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleClaim, disabled: claiming, style: styles.claimBtn, children: claiming ? "Claiming..." : "Claim Reward 🎁" })
      ] }),
      !canClaim && lastClaimed && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.alreadyClaimed, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheckCircle, { style: { color: "#43b581", fontSize: "48px" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Already Claimed!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Come back tomorrow for your next reward" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.nextRewardTime, children: [
          "Next reward in: ",
          calculateTimeUntilNextReward(lastClaimed)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.calendarSection, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "7-Day Reward Cycle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.calendar, children: rewards.map((reward, idx) => {
          const isToday = idx === streak % 7;
          const isClaimed = idx < streak % 7;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.calendarDay, ...isToday && styles.calendarDayActive, ...isClaimed && styles.calendarDayClaimed }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.dayNumber, children: [
              "Day ",
              idx + 1
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.dayIcon, children: getRewardIcon(reward.type) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.dayReward, children: reward.amount }),
            isClaimed && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.claimedBadge, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheckCircle, {}) })
          ] }, idx);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.info, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.infoText, children: "📅 Log in every day to maintain your streak and earn rewards!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.infoText, children: "🔥 Missing a day will reset your streak to 0" })
      ] })
    ] }) })
  ] }) });
}, "DailyRewardsModal");
export {
  DailyRewardsModal as default
};
