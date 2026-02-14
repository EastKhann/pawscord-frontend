var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { j as jsxRuntimeExports, a as React, r as reactExports } from "./react-core-BiY6fgAJ.js";
import { ah as FaCrown, aW as FaCircle, bT as FaMoon } from "./icons-vendor-2VDeY8fW.js";
import { b as useNavigate } from "./router-vendor-DrLUSS4j.js";
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "transparent",
    overflowY: "auto"
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    textAlign: "center"
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 16px 8px 16px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    flexShrink: 0
  },
  headerTitle: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#b9bbbe",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  headerCount: {
    fontSize: "11px",
    color: "#72767d",
    fontWeight: "500"
  },
  userList: {
    padding: "8px",
    overflowY: "auto",
    flex: 1
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 8px 4px 8px",
    marginBottom: "4px"
  },
  sectionTitle: {
    fontSize: "11px",
    fontWeight: "600",
    color: "#b9bbbe",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  userItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "8px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.15s ease",
    marginBottom: "2px"
  },
  avatarContainer: {
    position: "relative",
    flexShrink: 0
  },
  avatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    objectFit: "cover"
  },
  statusDot: {
    position: "absolute",
    bottom: "-2px",
    right: "-2px",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    border: "2px solid rgba(30, 31, 34, 1)"
  },
  userInfo: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "2px"
  },
  usernameRow: {
    display: "flex",
    alignItems: "center",
    gap: "4px"
  },
  username: {
    fontSize: "14px",
    fontWeight: "500",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  customStatus: {
    fontSize: "12px",
    color: "#b9bbbe",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  activityRow: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    marginTop: "2px",
    overflow: "hidden"
  },
  quickAccessSection: {
    padding: "16px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  quickAccessHeader: {
    fontSize: "11px",
    fontWeight: "600",
    color: "#b9bbbe",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "4px"
  },
  quickAccessButton: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #5865F2 0%, #4752C4 100%)",
    border: "none",
    borderRadius: "6px",
    color: "white",
    fontWeight: "bold",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 2px 8px rgba(88, 101, 242, 0.3)"
  },
  pawscordLogo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "8px",
    padding: "12px",
    borderRadius: "8px",
    background: "rgba(255, 255, 255, 0.02)"
  }
};
if (typeof window !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    .user-item:hover {
      background-color: rgba(79, 84, 92, 0.3) !important;
    }
  `;
  document.head.appendChild(styleSheet);
}
const IGNORED_APPS = /* @__PURE__ */ new Set([
  "fps monitor",
  "msi afterburner",
  "rivatuner",
  "fraps",
  "nvidia geforce experience",
  "amd radeon software",
  "gpu-z",
  "cpu-z",
  "hwinfo",
  "hwmonitor",
  "obs",
  "obs studio",
  "streamlabs",
  "xsplit",
  "nvidia shadowplay",
  "amd relive",
  "movavi video suite",
  "movavi",
  "camtasia",
  "bandicam",
  "action!",
  "soundpad",
  "voicemod",
  "equalizer apo",
  "peace equalizer",
  "vb-audio",
  "voicemeeter",
  "clownfish",
  "morphvox",
  "audacity",
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
    if (lower.includes(ignored) || ignored.includes(lower)) {
      return true;
    }
  }
  return false;
}, "isIgnoredApp");
const UserItem = /* @__PURE__ */ __name(({ user, isCurrentUser, onClick, onContextMenu }) => {
  const statusColor = user.is_online ? "#43b581" : "#747f8d";
  const isOwner = user.role === "owner";
  const isModerator = user.role === "moderator" || user.role === "mod";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        ...styles.userItem,
        opacity: user.is_online ? 1 : 0.5,
        backgroundColor: isCurrentUser ? "rgba(88, 101, 242, 0.1)" : "transparent"
      },
      onClick,
      onContextMenu,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.avatarContainer, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: user.avatar, alt: user.username, style: styles.avatar }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.statusDot, backgroundColor: statusColor } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.userInfo, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.usernameRow, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              ...styles.username,
              color: isCurrentUser ? "#5865f2" : user.is_online ? "#ffffff" : "#b9bbbe"
            }, children: user.display_name || user.username }),
            isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx(FaCrown, { size: 12, color: "#faa61a", title: "Sunucu Sahibi" }),
            isModerator && /* @__PURE__ */ jsxRuntimeExports.jsx(FaCrown, { size: 12, color: "#5865f2", title: "Moderatör" })
          ] }),
          user.custom_status && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.customStatus, children: user.custom_status }),
          user.current_activity?.spotify && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.activityRow, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "10px" }, children: "🎵" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              fontSize: "10px",
              color: "#1db954",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flex: 1
            }, children: user.current_activity.spotify.track || user.current_activity.spotify.name })
          ] }),
          user.current_activity?.steam && !isIgnoredApp(user.current_activity.steam.game || user.current_activity.steam.name) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.activityRow, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "10px" }, children: "🎮" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              fontSize: "10px",
              color: "#66c0f4",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flex: 1
            }, children: user.current_activity.steam.game || user.current_activity.steam.name })
          ] })
        ] })
      ]
    }
  );
}, "UserItem");
const ChatUserList = /* @__PURE__ */ __name(({
  chatUsers = [],
  allUsers = [],
  onlineUsers = [],
  currentUser,
  currentUserProfile,
  getDeterministicAvatar,
  onUserClick,
  onUserContextMenu,
  activeChat = {},
  serverMembers = [],
  friendsList = [],
  onNavigate
}) => {
  const navigate = useNavigate();
  const displayUsers = reactExports.useMemo(() => {
    if (activeChat.type === "room" || activeChat.type === "server") {
      if (serverMembers.length === 0) return [];
      return serverMembers.map((member) => {
        const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(member.username);
        const userInfo = allUsers.find((u) => u.username === member.username) || {};
        return {
          username: member.username,
          display_name: userInfo.display_name || member.username,
          avatar: userInfo.avatar || member.avatar || getDeterministicAvatar?.(member.username),
          status: isOnline ? "online" : "offline",
          is_online: isOnline,
          role: member.role || "member",
          current_activity: userInfo.current_activity || member.current_activity || {}
        };
      });
    } else {
      let friendsToProcess = friendsList;
      if (friendsList.length === 0 && allUsers.length > 1) {
        friendsToProcess = allUsers.filter((u) => u.username !== currentUser);
      }
      if (friendsToProcess.length === 0) return [];
      return friendsToProcess.map((friend) => {
        const friendUsername = friend.username || friend;
        const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(friendUsername);
        const userInfo = allUsers.find((u) => u.username === friendUsername) || friend;
        return {
          username: friendUsername,
          display_name: userInfo.display_name || friendUsername,
          avatar: userInfo.avatar || friend.avatar || getDeterministicAvatar?.(friendUsername),
          status: isOnline ? "online" : userInfo.status || "offline",
          is_online: isOnline,
          role: "friend",
          current_activity: userInfo.current_activity || friend.current_activity
        };
      });
    }
  }, [activeChat.type, serverMembers, friendsList, onlineUsers, allUsers, getDeterministicAvatar, currentUser]);
  const { onlineList, offlineList } = reactExports.useMemo(() => {
    const online = displayUsers.filter((u) => u.is_online);
    const offline = displayUsers.filter((u) => !u.is_online);
    online.sort((a, b) => a.username.localeCompare(b.username));
    offline.sort((a, b) => a.username.localeCompare(b.username));
    return { onlineList: online, offlineList: offline };
  }, [displayUsers]);
  const totalCount = displayUsers.length;
  const onlineCount = onlineList.length;
  const isServer = activeChat.type === "room" || activeChat.type === "server";
  const renderUserList = /* @__PURE__ */ __name((users) => users.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    UserItem,
    {
      user,
      isCurrentUser: user.username === currentUser,
      onClick: /* @__PURE__ */ __name(() => onUserClick?.(user.username), "onClick"),
      onContextMenu: /* @__PURE__ */ __name((e) => {
        e.preventDefault();
        onUserContextMenu?.(e, user.username);
      }, "onContextMenu")
    },
    user.username
  )), "renderUserList");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.headerTitle, children: isServer ? "Sunucu Üyeleri" : "Arkadaşlar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.headerCount, children: [
        onlineCount,
        " / ",
        totalCount
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.userList, children: totalCount === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.emptyState, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaCircle, { size: 24, color: "#43b581", style: { opacity: 0.3 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", fontSize: "13px", marginTop: "8px" }, children: isServer ? "Bu sunucuda kimse yok" : "Arkadaş listesi boş. Arkadaş ekle!" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      onlineList.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.sectionHeader, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCircle, { size: 8, color: "#43b581" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.sectionTitle, children: [
            "Çevrimiçi — ",
            onlineList.length
          ] })
        ] }),
        renderUserList(onlineList)
      ] }),
      offlineList.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.sectionHeader, marginTop: onlineList.length > 0 ? "16px" : "0" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaMoon, { size: 8, color: "#747f8d" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.sectionTitle, children: [
            "Çevrimdışı — ",
            offlineList.length
          ] })
        ] }),
        renderUserList(offlineList)
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.quickAccessSection, children: [
      currentUserProfile?.is_whitelisted && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.quickAccessHeader, children: "HIZLI ERİŞİM" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => navigate("/eng-learn"), "onClick"),
            style: styles.quickAccessButton,
            onMouseEnter: /* @__PURE__ */ __name((e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(88, 101, 242, 0.4)";
            }, "onMouseEnter"),
            onMouseLeave: /* @__PURE__ */ __name((e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(88, 101, 242, 0.3)";
            }, "onMouseLeave"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "18px" }, children: "📚" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "English Learn" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => navigate("/crypto-analysis"), "onClick"),
            style: {
              ...styles.quickAccessButton,
              background: "linear-gradient(135deg, #F39C12 0%, #E67E22 100%)",
              boxShadow: "0 2px 8px rgba(243, 156, 18, 0.3)"
            },
            onMouseEnter: /* @__PURE__ */ __name((e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(243, 156, 18, 0.4)";
            }, "onMouseEnter"),
            onMouseLeave: /* @__PURE__ */ __name((e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(243, 156, 18, 0.3)";
            }, "onMouseLeave"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "18px" }, children: "📊" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Crypto Signals" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.pawscordLogo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "24px", marginBottom: "4px" }, children: "🐾" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: "bold", color: "#5865f2", fontSize: "14px" }, children: "PAWSCORD" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "11px", color: "#b9bbbe", opacity: 0.7, marginTop: "2px" }, children: "v1.1.133" })
      ] })
    ] })
  ] });
}, "ChatUserList");
const ChatUserList_default = React.memo(ChatUserList);
export {
  ChatUserList_default as default
};
