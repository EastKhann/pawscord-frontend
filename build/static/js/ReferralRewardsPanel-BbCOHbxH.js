var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { bC as FaGift, a as FaTimes, u as FaUsers, aq as FaCoins, P as FaTrophy } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const ReferralRewardsPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, username }) => {
  const [rewards, setRewards] = reactExports.useState([]);
  const [stats, setStats] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [referralLink, setReferralLink] = reactExports.useState("");
  reactExports.useEffect(() => {
    fetchRewards();
    fetchStats();
  }, []);
  const fetchRewards = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/referrals/rewards/`);
      const data = await response.json();
      setRewards(data.rewards || []);
      setReferralLink(data.referral_link || "");
    } catch (error) {
      toast.error("Failed to load rewards");
    } finally {
      setLoading(false);
    }
  }, "fetchRewards");
  const fetchStats = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/referrals/stats/`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to load stats");
    }
  }, "fetchStats");
  const claimReward = /* @__PURE__ */ __name(async (rewardId) => {
    try {
      await fetchWithAuth(`${apiBaseUrl}/referrals/rewards/${rewardId}/claim/`, {
        method: "POST"
      });
      toast.success("Reward claimed!");
      fetchRewards();
      fetchStats();
    } catch (error) {
      toast.error("Failed to claim reward");
    }
  }, "claimReward");
  const copyReferralLink = /* @__PURE__ */ __name(() => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied to clipboard!");
  }, "copyReferralLink");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaGift, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Referral Rewards" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    referralLink && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.referralSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.referralLabel, children: "Your Referral Link" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.referralLinkBox, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: referralLink,
            readOnly: true,
            style: styles.referralInput
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: copyReferralLink, style: styles.copyButton, children: "Copy" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.referralHint, children: "Share this link to earn rewards when friends join!" })
    ] }),
    stats && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statsSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statIcon, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, { style: { color: "#5865f2", fontSize: "24px" } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: stats.total_referrals || 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Total Referrals" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statIcon, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCoins, { style: { color: "#faa61a", fontSize: "24px" } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: stats.coins_earned || 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Coins Earned" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statIcon, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrophy, { style: { color: "#43b581", fontSize: "24px" } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: stats.rewards_claimed || 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Rewards Claimed" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "Available Rewards" }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading rewards..." }) : rewards.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No rewards available" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.rewardsList, children: rewards.map((reward, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.rewardCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.rewardIcon, children: [
          reward.type === "coins" && /* @__PURE__ */ jsxRuntimeExports.jsx(FaCoins, { style: { color: "#faa61a", fontSize: "32px" } }),
          reward.type === "badge" && /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrophy, { style: { color: "#5865f2", fontSize: "32px" } }),
          reward.type === "item" && /* @__PURE__ */ jsxRuntimeExports.jsx(FaGift, { style: { color: "#43b581", fontSize: "32px" } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.rewardInfo, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.rewardName, children: reward.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.rewardDescription, children: reward.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.rewardRequirement, children: [
            "Requires ",
            reward.referrals_required,
            " referrals"
          ] }),
          reward.progress !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.progressBar, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                ...styles.progressFill,
                width: `${reward.progress / reward.referrals_required * 100}%`
              }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.rewardActions, children: reward.claimed ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.claimedBadge, children: "✓ Claimed" }) : reward.claimable ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => claimReward(reward.id), "onClick"), style: styles.claimButton, children: "Claim" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.lockedBadge, children: "🔒 Locked" }) })
      ] }, idx)) })
    ] })
  ] }) });
}, "ReferralRewardsPanel");
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
    zIndex: 999999
  },
  modal: {
    backgroundColor: "#1e1e1e",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "900px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #2c2f33"
  },
  headerLeft: {
    display: "flex",
    alignItems: "center"
  },
  title: {
    margin: 0,
    fontSize: "20px",
    color: "#ffffff"
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#99aab5",
    cursor: "pointer",
    fontSize: "20px",
    padding: "5px"
  },
  referralSection: {
    padding: "20px",
    borderBottom: "1px solid #2c2f33",
    backgroundColor: "#2c2f33"
  },
  referralLabel: {
    fontSize: "13px",
    color: "#dcddde",
    marginBottom: "8px"
  },
  referralLinkBox: {
    display: "flex",
    gap: "12px",
    marginBottom: "8px"
  },
  referralInput: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#1e1e1e",
    border: "1px solid #1e1e1e",
    borderRadius: "4px",
    color: "#ffffff",
    fontSize: "13px"
  },
  copyButton: {
    padding: "10px 20px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600"
  },
  referralHint: {
    fontSize: "12px",
    color: "#99aab5",
    fontStyle: "italic"
  },
  statsSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    padding: "20px",
    borderBottom: "1px solid #2c2f33"
  },
  statCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    gap: "16px",
    alignItems: "center"
  },
  statIcon: {
    minWidth: "48px"
  },
  statValue: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: "4px"
  },
  statLabel: {
    fontSize: "12px",
    color: "#99aab5"
  },
  content: {
    padding: "20px",
    overflowY: "auto",
    flex: 1
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "16px"
  },
  loading: {
    textAlign: "center",
    color: "#99aab5",
    padding: "40px"
  },
  empty: {
    textAlign: "center",
    color: "#99aab5",
    padding: "40px"
  },
  rewardsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  rewardCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    gap: "16px",
    alignItems: "center"
  },
  rewardIcon: {
    minWidth: "48px"
  },
  rewardInfo: {
    flex: 1
  },
  rewardName: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "6px"
  },
  rewardDescription: {
    fontSize: "13px",
    color: "#dcddde",
    marginBottom: "6px"
  },
  rewardRequirement: {
    fontSize: "12px",
    color: "#99aab5",
    marginBottom: "8px"
  },
  progressBar: {
    height: "6px",
    backgroundColor: "#1e1e1e",
    borderRadius: "3px",
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#5865f2",
    transition: "width 0.3s"
  },
  rewardActions: {
    minWidth: "100px"
  },
  claimButton: {
    width: "100%",
    padding: "10px 20px",
    backgroundColor: "#43b581",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600"
  },
  claimedBadge: {
    width: "100%",
    padding: "10px 20px",
    backgroundColor: "#2c2f33",
    border: "1px solid #43b581",
    borderRadius: "4px",
    color: "#43b581",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "600"
  },
  lockedBadge: {
    width: "100%",
    padding: "10px 20px",
    backgroundColor: "#2c2f33",
    border: "1px solid #99aab5",
    borderRadius: "4px",
    color: "#99aab5",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "600"
  }
};
export {
  ReferralRewardsPanel as default
};
