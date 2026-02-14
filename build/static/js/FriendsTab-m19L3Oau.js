var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports, a as React } from "./react-core-BiY6fgAJ.js";
import { a6 as FaUserFriends, a as FaTimes, a9 as FaCheck, k as FaBell, aZ as FaPaperPlane } from "./icons-vendor-2VDeY8fW.js";
import { u as useGlobalWebSocket, d as confirmDialog } from "./index-DGqPEDt8.js";
import { L as LazyImage } from "./LazyImage-DdkEZ080.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const useFriendsAPI = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onPendingCountChange }) => {
  const [activeTab, setActiveTab] = reactExports.useState("all");
  const [friends, setFriends] = reactExports.useState([]);
  const [requests, setRequests] = reactExports.useState([]);
  const [outgoing, setOutgoing] = reactExports.useState([]);
  const [addUsername, setAddUsername] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(true);
  const [statusMsg, setStatusMsg] = reactExports.useState(null);
  const { globalData } = useGlobalWebSocket();
  const fetchFriendData = reactExports.useCallback(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/friends/list/`);
      if (response.ok) {
        const data = await response.json();
        setFriends(data.friends || []);
        setRequests(data.incoming_requests || []);
        setOutgoing(data.outgoing_requests || []);
        if (onPendingCountChange) onPendingCountChange((data.incoming_requests || []).length);
      }
    } catch (error) {
      console.error("Arkadaş listesi çekilemedi:", error);
    } finally {
      setLoading(false);
    }
  }, [apiBaseUrl, fetchWithAuth, onPendingCountChange]);
  reactExports.useEffect(() => {
    fetchFriendData();
  }, [fetchFriendData]);
  reactExports.useEffect(() => {
    if (globalData?.type === "friend_list_update") {
      fetchFriendData();
      setStatusMsg({ type: "info", text: '🔔 Arkadaş listeniz güncellendi! "Bekleyenler" sekmesini kontrol edin.' });
      setTimeout(() => setStatusMsg(null), 5e3);
    }
  }, [globalData, fetchFriendData]);
  const handleSendRequest = reactExports.useCallback(async (e) => {
    e.preventDefault();
    if (!addUsername.trim()) return;
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/friends/send/`, {
        method: "POST",
        body: JSON.stringify({ username: addUsername.trim() })
      });
      const data = await response.json();
      if (response.ok) {
        setStatusMsg({ type: "success", text: `✅ İstek gönderildi: ${addUsername}` });
        setAddUsername("");
        fetchFriendData();
      } else {
        setStatusMsg({ type: "error", text: `❌ ${data.error || "Hata."}` });
      }
    } catch (error) {
      setStatusMsg({ type: "error", text: "❌ Sunucu hatası." });
    }
  }, [addUsername, apiBaseUrl, fetchWithAuth, fetchFriendData]);
  const handleRespond = reactExports.useCallback(async (requestId, action) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/friends/respond/${requestId}/`, {
        method: "POST",
        body: JSON.stringify({ action })
      });
      if (response.ok) {
        fetchFriendData();
        setStatusMsg({ type: "success", text: action === "accept" ? "Arkadaşlık kabul edildi!" : "İstek reddedildi." });
      }
    } catch (error) {
      console.error("İşlem başarısız:", error);
    }
  }, [apiBaseUrl, fetchWithAuth, fetchFriendData]);
  const handleRemoveFriend = reactExports.useCallback(async (friendId, friendUsername) => {
    if (!await confirmDialog(`${friendUsername} ile arkadaşlığı sonlandırmak istediğinize emin misiniz?`)) return;
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/friends/remove/${friendId}/`, { method: "DELETE" });
      if (response.ok) {
        fetchFriendData();
        setStatusMsg({ type: "success", text: "❌ Arkadaşlık sonlandırıldı." });
      } else {
        setStatusMsg({ type: "error", text: "❌ Silme başarısız." });
      }
    } catch (error) {
      console.error("Arkadaş silme hatası:", error);
      setStatusMsg({ type: "error", text: "❌ Sunucu hatası." });
    }
  }, [apiBaseUrl, fetchWithAuth, fetchFriendData]);
  return {
    activeTab,
    setActiveTab,
    friends,
    requests,
    outgoing,
    addUsername,
    setAddUsername,
    loading,
    statusMsg,
    setStatusMsg,
    handleSendRequest,
    handleRespond,
    handleRemoveFriend
  };
}, "useFriendsAPI");
const localStyles = {
  container: { display: "flex", flexDirection: "column", height: "100%", backgroundColor: "#313338", color: "#dcddde" },
  topBar: {
    padding: "10px 15px",
    borderBottom: "1px solid #1f2023",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#313338",
    height: "50px",
    boxSizing: "border-box"
  },
  headerLeft: { display: "flex", alignItems: "center", flex: 1, overflow: "hidden" },
  title: {
    fontSize: "1em",
    fontWeight: "bold",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    marginRight: "10px",
    paddingRight: "10px",
    borderRight: "1px solid #4f545c",
    whiteSpace: "nowrap"
  },
  tabButtons: { display: "flex", gap: "10px", overflowX: "auto" },
  tabBtn: { background: "none", border: "none", color: "#b9bbbe", cursor: "pointer", fontSize: "0.9em", padding: "2px 8px", borderRadius: "4px", fontWeight: "500", transition: "all 0.2s", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "5px" },
  activeTabBtn: { color: "#fff", backgroundColor: "rgba(79,84,92,0.32)" },
  addFriendBtn: { backgroundColor: "#23a559", color: "#fff", border: "none", borderRadius: "4px", padding: "2px 10px", fontSize: "0.9em", fontWeight: "bold", cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" },
  activeAddFriendBtn: { backgroundColor: "transparent", color: "#23a559", border: "1px solid transparent" },
  closeHeaderBtn: { background: "none", border: "none", color: "#b9bbbe", fontSize: "1.5em", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: "5px", borderRadius: "50%" },
  contentArea: { flexGrow: 1, padding: "20px", overflowY: "auto" },
  addSection: { maxWidth: "100%", borderBottom: "1px solid #4f545c", paddingBottom: "20px" },
  addForm: {
    display: "flex",
    flexDirection: window.innerWidth <= 768 ? "column" : "row",
    gap: "10px",
    backgroundColor: "#1e1f22",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #1e1f22",
    alignItems: "stretch",
    marginTop: "10px"
  },
  input: { flexGrow: 1, background: "transparent", border: "none", color: "#fff", fontSize: "1em", outline: "none", minHeight: "40px" },
  sendRequestBtn: { backgroundColor: "#5865f2", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap" },
  listContainer: {},
  listHeader: { fontSize: "0.8em", color: "#b9bbbe", textTransform: "uppercase", marginBottom: "15px", borderBottom: "1px solid #4f545c", paddingBottom: "10px" },
  emptyState: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "50px" },
  emptyText: { color: "#72767d", fontStyle: "italic", marginBottom: "20px", textAlign: "center" },
  emptyBtn: { padding: "10px 20px", backgroundColor: "#5865f2", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" },
  listItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", borderTop: "1px solid #4f545c", cursor: "pointer", transition: "background-color 0.2s" },
  userInfo: { display: "flex", alignItems: "center" },
  avatar: { width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" },
  username: { color: "#fff", fontWeight: "600" },
  status: { fontSize: "0.8em", color: "#b9bbbe" },
  actions: { display: "flex", gap: "10px" },
  iconButton: { padding: "8px", borderRadius: "50%", backgroundColor: "#2f3136", border: "none", color: "#b9bbbe", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  acceptBtn: { padding: "8px", borderRadius: "50%", backgroundColor: "#2f3136", border: "none", color: "#43b581", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  rejectBtn: { padding: "8px", borderRadius: "50%", backgroundColor: "#2f3136", border: "none", color: "#f04747", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  badgePulse: {
    backgroundColor: "#f04747",
    color: "#fff",
    borderRadius: "50%",
    padding: "1px 6px",
    fontSize: "0.75em",
    marginLeft: "5px",
    animation: "pulseBadge 1.5s infinite"
  }
};
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes pulseBadge {
    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(240, 71, 71, 0.7); }
    70% { transform: scale(1.1); box-shadow: 0 0 0 6px rgba(240, 71, 71, 0); }
    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(240, 71, 71, 0); }
  }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
`;
document.head.appendChild(styleSheet);
const IGNORED_APPS = /* @__PURE__ */ new Set([
  "fps monitor",
  "msi afterburner",
  "rivatuner",
  "fraps",
  "nvidia geforce experience",
  "amd radeon software",
  "obs",
  "obs studio",
  "streamlabs",
  "xsplit",
  "nvidia shadowplay",
  "movavi video suite",
  "movavi",
  "camtasia",
  "bandicam",
  "soundpad",
  "voicemod",
  "discord overlay",
  "teamspeak",
  "mumble",
  "overwolf",
  "razer cortex",
  "steam",
  "epic games launcher",
  "origin",
  "uplay",
  "battle.net",
  "gog galaxy",
  "ea app",
  "xbox app",
  "microsoft store"
]);
const isIgnoredApp = /* @__PURE__ */ __name((appName) => {
  if (!appName) return false;
  const lower = appName.toLowerCase().trim();
  for (const ignored of IGNORED_APPS) {
    if (lower.includes(ignored) || ignored.includes(lower)) return true;
  }
  return false;
}, "isIgnoredApp");
const STATUS_TEXT = { online: "Çevrimiçi", idle: "Boşta", dnd: "Rahatsız Etmeyin", invisible: "Görünmez", offline: "Çevrimdışı" };
const STATUS_COLOR = { online: "#23a559", idle: "#f0b232", dnd: "#f23f43", invisible: "#80848e", offline: "#80848e" };
const FriendsList = /* @__PURE__ */ __name(({ friends, onlineUsers = [], getDeterministicAvatar, onStartDM, handleRemoveFriend, setActiveTab }) => {
  if (friends.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: localStyles.emptyState, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "3em", marginBottom: "10px" }, children: "🥺" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: localStyles.emptyText, children: "Henüz kimseyle arkadaş değilsin." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setActiveTab("add"), "onClick"), style: localStyles.emptyBtn, children: "Arkadaş Ekle" })
    ] });
  }
  const myUsername = localStorage.getItem("chat_username") || "";
  return friends.map((friend) => {
    const iAmSender = friend.sender_username === myUsername;
    const friendUsername = iAmSender ? friend.receiver_username : friend.sender_username;
    const displayAvatar = iAmSender ? friend.receiver_avatar : friend.sender_avatar;
    const friendActivity = iAmSender ? friend.receiver_activity : friend.sender_activity;
    const isReallyOnline = Array.isArray(onlineUsers) && onlineUsers.includes(friendUsername);
    const friendStatus = isReallyOnline ? "online" : "offline";
    const statusText = STATUS_TEXT[friendStatus] || "Çevrimdışı";
    const statusColor = STATUS_COLOR[friendStatus] || "#80848e";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: localStyles.listItem, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: localStyles.userInfo, onClick: /* @__PURE__ */ __name(() => onStartDM(friendUsername), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LazyImage, { src: displayAvatar || getDeterministicAvatar(friendUsername), style: localStyles.avatar, alt: "avatar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginLeft: "12px", display: "flex", flexDirection: "column", overflow: "hidden" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: localStyles.username, children: friendUsername }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...localStyles.status, color: statusColor }, children: statusText }),
          friendActivity?.spotify && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: "10px", color: "#1db954", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: "2px" }, children: [
            "🎵",
            " ",
            friendActivity.spotify.track
          ] }),
          friendActivity?.steam && !isIgnoredApp(friendActivity.steam.game) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: "10px", color: "#66c0f4", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: "2px" }, children: [
            "🎮",
            " ",
            friendActivity.steam.game
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: localStyles.actions, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: localStyles.iconButton, title: "Mesaj At", onClick: /* @__PURE__ */ __name((e) => {
          e.stopPropagation();
          onStartDM(friendUsername);
        }, "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserFriends, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            style: { ...localStyles.iconButton, backgroundColor: "#ed4245" },
            title: "Arkadaşlıktan Çıkar",
            onClick: /* @__PURE__ */ __name((e) => {
              e.stopPropagation();
              handleRemoveFriend(friend.id, friendUsername);
            }, "onClick"),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {})
          }
        )
      ] })
    ] }, friend.id);
  });
}, "FriendsList");
const PendingRequests = /* @__PURE__ */ __name(({ requests, outgoing, getDeterministicAvatar, handleRespond }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: localStyles.listContainer, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { style: localStyles.listHeader, children: [
    "BEKLEYEN ",
    "İ",
    "STEKLER ",
    "—",
    " ",
    requests.length
  ] }),
  requests.length === 0 && outgoing.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: localStyles.emptyText, children: "Bekleyen istek yok." }),
  requests.map((req) => {
    const senderUsername = req.sender_username || "Unknown";
    const senderAvatar = req.sender_avatar;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...localStyles.listItem, backgroundColor: "rgba(250, 166, 26, 0.1)" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: localStyles.userInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LazyImage, { src: senderAvatar || getDeterministicAvatar(senderUsername), style: localStyles.avatar, alt: "avatar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginLeft: "12px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "white", display: "block" }, children: senderUsername }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "0.8em", color: "#faa61a" }, children: "Sana istek gönderdi!" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: localStyles.actions, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => handleRespond(req.id, "accept"), "onClick"), style: localStyles.acceptBtn, title: "Kabul Et", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => handleRespond(req.id, "reject"), "onClick"), style: localStyles.rejectBtn, title: "Reddet", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
      ] })
    ] }, req.id);
  }),
  outgoing.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { style: { ...localStyles.listHeader, marginTop: "30px" }, children: [
      "G",
      "Ö",
      "NDERD",
      "İ",
      "KLER",
      "İ",
      "M ",
      "—",
      " ",
      outgoing.length
    ] }),
    outgoing.map((req) => {
      const receiverUsername = req.receiver_username || "Unknown";
      const receiverAvatar = req.receiver_avatar;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: localStyles.listItem, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: localStyles.userInfo, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LazyImage, { src: receiverAvatar || getDeterministicAvatar(receiverUsername), style: localStyles.avatar, alt: "avatar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { marginLeft: "12px", color: "#b9bbbe" }, children: [
            receiverUsername,
            " (Bekliyor...)"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => handleRespond(req.id, "reject"), "onClick"), style: localStyles.rejectBtn, title: "{'İ'}ptal Et", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
      ] }, req.id);
    })
  ] })
] }), "PendingRequests");
const FriendsTab = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, getDeterministicAvatar, onStartDM, onClose, onPendingCountChange, onlineUsers = [] }) => {
  const api = useFriendsAPI({ fetchWithAuth, apiBaseUrl, onPendingCountChange });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: localStyles.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: localStyles.topBar, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: localStyles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: localStyles.title, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserFriends, { style: { marginRight: "10px" } }),
          "Arkada",
          "ş",
          "lar"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: localStyles.tabButtons, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              style: { ...localStyles.tabBtn, ...api.activeTab === "all" ? localStyles.activeTabBtn : {} },
              onClick: /* @__PURE__ */ __name(() => {
                api.setActiveTab("all");
                api.setStatusMsg(null);
              }, "onClick"),
              children: [
                "T",
                "ü",
                "m",
                "ü",
                " (",
                api.friends.length,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              style: { ...localStyles.tabBtn, ...api.activeTab === "pending" ? localStyles.activeTabBtn : {} },
              onClick: /* @__PURE__ */ __name(() => {
                api.setActiveTab("pending");
                api.setStatusMsg(null);
              }, "onClick"),
              children: [
                "Bekleyenler",
                api.requests.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: localStyles.badgePulse, children: api.requests.length })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              style: { ...localStyles.addFriendBtn, ...api.activeTab === "add" ? localStyles.activeAddFriendBtn : {} },
              onClick: /* @__PURE__ */ __name(() => {
                api.setActiveTab("add");
                api.setStatusMsg(null);
              }, "onClick"),
              children: [
                "Arkada",
                "ş",
                " Ekle"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: localStyles.closeHeaderBtn, title: "Kapat", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: localStyles.contentArea, children: [
      api.statusMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        marginBottom: "20px",
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: api.statusMsg.type === "success" ? "rgba(67, 181, 129, 0.2)" : api.statusMsg.type === "info" ? "rgba(88, 101, 242, 0.2)" : "rgba(240, 71, 71, 0.2)",
        color: api.statusMsg.type === "success" ? "#43b581" : api.statusMsg.type === "info" ? "#dee0fc" : "#f04747",
        border: `1px solid ${api.statusMsg.type === "success" ? "#43b581" : api.statusMsg.type === "info" ? "#5865f2" : "#f04747"}`,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        animation: "fadeIn 0.3s ease"
      }, children: [
        api.statusMsg.type === "info" && /* @__PURE__ */ jsxRuntimeExports.jsx(FaBell, {}),
        api.statusMsg.text
      ] }),
      api.activeTab === "add" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: localStyles.addSection, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { color: "#fff", marginBottom: "10px" }, children: [
          "ARKADA",
          "Ş",
          " EKLE"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "#b9bbbe", fontSize: "0.9em", marginBottom: "20px" }, children: [
          "Kullan",
          "ı",
          "c",
          "ı",
          " ad",
          "ı",
          "n",
          "ı",
          " girerek arkada",
          "ş",
          " ekleyebilirsin."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: api.handleSendRequest, style: localStyles.addForm, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: api.addUsername,
              onChange: /* @__PURE__ */ __name((e) => api.setAddUsername(e.target.value), "onChange"),
              placeholder: "Kullanıcı Adı veya Arkadaş Kodu (Örn: 8392014)",
              style: localStyles.input,
              autoFocus: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", style: localStyles.sendRequestBtn, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaPaperPlane, { style: { marginRight: "5px" } }),
            " G",
            "ö",
            "nder"
          ] })
        ] })
      ] }),
      api.activeTab === "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: localStyles.listContainer, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { style: localStyles.listHeader, children: [
          "ARKADA",
          "Ş",
          "LAR ",
          "—",
          " ",
          api.friends.length
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FriendsList,
          {
            friends: api.friends,
            onlineUsers,
            getDeterministicAvatar,
            onStartDM,
            handleRemoveFriend: api.handleRemoveFriend,
            setActiveTab: api.setActiveTab
          }
        )
      ] }),
      api.activeTab === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        PendingRequests,
        {
          requests: api.requests,
          outgoing: api.outgoing,
          getDeterministicAvatar,
          handleRespond: api.handleRespond
        }
      )
    ] })
  ] });
}, "FriendsTab");
const FriendsTab_default = React.memo(FriendsTab);
export {
  FriendsTab_default as default
};
