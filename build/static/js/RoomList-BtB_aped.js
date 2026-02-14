var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { a as React, j as jsxRuntimeExports, f as ReactDOM, r as reactExports, e as reactDomExports } from "./react-core-BiY6fgAJ.js";
import { b9 as FaUserShield, j as FaLink, aB as FaHistory, ay as FaBan, bd as FaFileExport, aE as FaChartBar, a as FaTimes, d as FaExclamationTriangle, a9 as FaCheck, g as FaTrash, aV as FaCopy, aw as FaImage, h as FaLock, ax as FaGlobe, k as FaBell, l as FaBellSlash, aa as FaArrowUp, ab as FaArrowDown, az as FaCog, bB as FaSignOutAlt, by as FaHeart, p as FaCoffee, J as FaBitcoin, a7 as FaCompass, y as FaServer, a6 as FaUserFriends, at as FaEdit, an as FaPlus, B as FaRobot, O as FaChartLine, ad as FaUserPlus, bJ as FaChevronRight, e as FaChevronDown, G as FaVolumeUp, o as FaFilm, bK as FaVideoSlash, af as FaDesktop, bL as FaMicrophoneSlash, E as FaMicrophone, bM as TbHeadphonesOff, bN as FaHeadphones, bO as FaPhoneSlash } from "./icons-vendor-2VDeY8fW.js";
import { u as useGlobalWebSocket, t as toast, d as confirmDialog } from "./index-DGqPEDt8.js";
import { S as SparkMD5 } from "./crypto-vendor-NANfm9jb.js";
import { s as styles$6, U as UserFooter } from "./UserFooter-CnbZqgnZ.js";
import InviteModal from "./InviteModal-DPRjeSOT.js";
import SavedMessagesModal from "./SavedMessagesModal-CIhVFKdF.js";
import { S as ScheduledMessageModal } from "./ScheduledMessageModal-DTCh0hbW.js";
import WebhookManager from "./WebhookManager-Bm_F0_iZ.js";
import ModeratorTools from "./ModeratorTools-CH2elA1l.js";
import VanityURLManager from "./VanityURLManager-DYHHPB97.js";
import { A as AutoResponderManager } from "./AutoResponderManager-BT8eR5cy.js";
import ChannelSettingsModal from "./ChannelSettingsModal-DwVgGmfD.js";
import { L as LazyImage } from "./LazyImage-DdkEZ080.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./ui-vendor-iPoN0WGz.js";
const styles$5 = {
  container: {
    width: "100%",
    backgroundColor: "transparent",
    color: "#ccc",
    padding: "4px 0",
    minHeight: "30px",
    maxHeight: "400px",
    overflowY: "auto"
  },
  userList: {
    padding: "0 2px",
    display: "flex",
    flexDirection: "column",
    gap: "2px"
  },
  userItemNew: {
    padding: "4px 6px",
    fontSize: "0.8em",
    borderRadius: "4px",
    background: "rgba(255, 255, 255, 0.02)",
    transition: "all 0.15s ease",
    cursor: "pointer",
    border: "1px solid transparent",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  userClickArea: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    width: "100%",
    flexDirection: "row"
  },
  avatarContainer: {
    position: "relative",
    flexShrink: 0,
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  avatar: {
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    objectFit: "cover",
    transition: "all 0.2s ease",
    display: "block",
    backgroundColor: "#2f3136",
    flexShrink: 0,
    minWidth: "22px",
    minHeight: "22px"
  },
  statusBadge: {
    position: "absolute",
    bottom: "-2px",
    right: "-2px",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "6px",
    border: "1px solid #2f3136",
    boxShadow: "0 1px 2px rgba(0,0,0,0.3)"
  },
  userInfo: {
    flex: 1,
    overflow: "hidden",
    marginLeft: "2px"
  },
  username: {
    display: "block",
    fontSize: "0.85em",
    fontWeight: "500",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  sharingIndicator: {
    fontSize: "0.65em",
    color: "#5865f2",
    marginTop: "0",
    fontWeight: "500"
  },
  talkingUser: { color: "#4CAF50", fontWeight: "bold" },
  activeUser: { color: "#CCCCCC" },
  mutedUser: { color: "#e67e22" },
  deafenedUser: { color: "#e74c3c" },
  contextMenu: {
    position: "fixed",
    backgroundColor: "#111214",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "8px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.3)",
    zIndex: 1e4,
    minWidth: "240px",
    maxWidth: "280px",
    overflow: "hidden",
    animation: "contextMenuIn 0.12s ease-out"
  },
  menuHeader: {
    padding: "14px 12px",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "#1a1b1e",
    fontSize: "0.9em",
    borderBottom: "1px solid rgba(255,255,255,0.06)"
  },
  menuSection: {
    padding: "4px 0"
  },
  menuDivider: {
    height: "1px",
    backgroundColor: "rgba(255,255,255,0.06)",
    margin: "4px 8px"
  },
  volumeSection: {
    padding: "10px 14px 12px",
    backgroundColor: "#1a1b1e",
    borderBottom: "1px solid rgba(255,255,255,0.06)"
  },
  menuItem: {
    padding: "8px 12px",
    cursor: "pointer",
    color: "#dcddde",
    fontSize: "13px",
    transition: "background-color 0.1s, color 0.1s",
    position: "relative",
    display: "flex",
    alignItems: "center",
    borderRadius: "4px",
    margin: "0 4px"
  }
};
const styleSheet$1 = document.createElement("style");
styleSheet$1.textContent = `
    @keyframes contextMenuIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
    }

    div[style*="userItemNew"]:hover {
        background: rgba(88, 101, 242, 0.08) !important;
        border-color: rgba(88, 101, 242, 0.2) !important;
        transform: translateX(1px);
    }
    
    .user-context-menu-item:hover {
        background-color: rgba(88, 101, 242, 0.15) !important;
        color: #fff !important;
    }
    
    .user-context-menu-item-danger:hover {
        background-color: rgba(237, 66, 69, 0.15) !important;
        color: #ed4245 !important;
    }
    
    .user-context-submenu-item:hover {
        background-color: rgba(88, 101, 242, 0.15) !important;
        color: #fff !important;
    }
    
    .voice-user-dragging {
        opacity: 0.4 !important;
        border: 1px dashed rgba(88, 101, 242, 0.5) !important;
    }
    
    .voice-channel-drop-target {
        background: rgba(88, 101, 242, 0.15) !important;
        border-color: rgba(88, 101, 242, 0.6) !important;
        box-shadow: inset 0 0 12px rgba(88, 101, 242, 0.2) !important;
    }
    
    .voice-channel-drop-target::after {
        content: '🔀 Buraya bırak';
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 10px;
        color: #5865f2;
        font-weight: 600;
        background: rgba(88, 101, 242, 0.15);
        padding: 2px 8px;
        border-radius: 4px;
    }

    .voice-volume-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
        box-shadow: 0 1px 4px rgba(0,0,0,0.4), 0 0 0 1px rgba(88, 101, 242, 0.3);
        border: 2px solid #5865f2;
        transition: transform 0.1s, box-shadow 0.1s;
        position: relative;
        z-index: 3;
    }
    .voice-volume-slider::-webkit-slider-thumb:hover {
        transform: scale(1.15);
        box-shadow: 0 1px 6px rgba(88, 101, 242, 0.5), 0 0 0 2px rgba(88, 101, 242, 0.2);
    }
    .voice-volume-slider::-webkit-slider-thumb:active {
        transform: scale(1.25);
        background: #5865f2;
        border-color: #fff;
    }
    .voice-volume-slider::-moz-range-thumb {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
        border: 2px solid #5865f2;
        box-shadow: 0 1px 4px rgba(0,0,0,0.4);
    }
    .voice-volume-slider::-webkit-slider-runnable-track {
        height: 6px;
        background: transparent;
        border-radius: 3px;
    }
    .voice-volume-slider::-moz-range-track {
        height: 6px;
        background: transparent;
        border-radius: 3px;
    }

    input[type="range"]:not(.voice-volume-slider)::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #5865f2;
        cursor: pointer;
        box-shadow: 0 0 3px rgba(88, 101, 242, 0.5);
    }
    
    input[type="range"]:not(.voice-volume-slider)::-moz-range-thumb {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #5865f2;
        cursor: pointer;
        border: none;
        box-shadow: 0 0 3px rgba(88, 101, 242, 0.5);
    }
`;
if (!document.head.querySelector("style[data-voice-user-list]")) {
  styleSheet$1.setAttribute("data-voice-user-list", "true");
  document.head.appendChild(styleSheet$1);
}
const getStatusInfo = /* @__PURE__ */ __name((userObj) => {
  if (userObj.is_deafened) return { icon: "🔕", style: styles$5.deafenedUser };
  if (userObj.is_talking) return { icon: "🗣️", style: styles$5.talkingUser };
  if (userObj.is_mic_off) return { icon: "🔇", style: styles$5.mutedUser };
  return { icon: "🎤", style: styles$5.activeUser };
}, "getStatusInfo");
const VoiceUserItem = /* @__PURE__ */ __name(({
  userObj,
  isSelf,
  getAvatar,
  allUsers,
  isAdmin,
  isDragging,
  draggedUser,
  isClientInThisChannel,
  isPttActive,
  onDragStart,
  onDragEnd,
  onContextMenu,
  onClick
}) => {
  const user = userObj.username;
  const { icon: statusIcon, style: userStyle } = getStatusInfo(userObj);
  let avatarUrl = userObj.avatar || userObj.avatarUrl;
  if (!avatarUrl) {
    const foundUser = allUsers.find((u) => u.username === user);
    avatarUrl = foundUser?.avatar || getAvatar(user);
  }
  const avatarBorder = userObj.is_talking ? "2px solid #4CAF50" : "2px solid transparent";
  const avatarShadow = userObj.is_talking ? "0 0 10px rgba(76, 175, 80, 0.6)" : "none";
  const badgeBg = userObj.is_deafened ? "#e74c3c" : userObj.is_mic_off ? "#e67e22" : "#43b581";
  const AvatarSection = /* @__PURE__ */ __name(() => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$5.avatarContainer, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: avatarUrl,
        alt: user,
        onError: /* @__PURE__ */ __name((e) => {
          e.target.onerror = null;
          e.target.src = getAvatar(user);
        }, "onError"),
        style: { ...styles$5.avatar, border: avatarBorder, boxShadow: avatarShadow }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles$5.statusBadge, background: badgeBg }, children: statusIcon })
  ] }), "AvatarSection");
  if (isSelf) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$5.userItemNew, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$5.userInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: isClientInThisChannel && isPttActive && !userObj.is_talking ? "ptt-active" : "",
            style: { ...styles$5.username, ...userStyle, fontWeight: "bold" },
            children: [
              user,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "0.85em", color: "#99aab5" }, children: "(Sen)" })
            ]
          }
        ),
        userObj.is_sharing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$5.sharingIndicator, children: [
          "🖥️",
          " Ekran Payla",
          "şı",
          "yor"
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: {
        ...styles$5.userItemNew,
        ...isAdmin ? { cursor: "grab" } : {},
        ...isDragging && draggedUser === user ? {
          opacity: 0.4,
          border: "1px dashed rgba(88, 101, 242, 0.5)",
          background: "rgba(88, 101, 242, 0.05)"
        } : {}
      },
      draggable: isAdmin,
      onDragStart: /* @__PURE__ */ __name((e) => onDragStart(e, userObj), "onDragStart"),
      onDragEnd,
      onContextMenu: /* @__PURE__ */ __name((e) => onContextMenu(e, userObj), "onContextMenu"),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$5.userClickArea, onClick: /* @__PURE__ */ __name(() => onClick(userObj), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$5.userInfo, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: userObj.is_talking ? "voice-user-item is-talking" : "",
              style: { ...styles$5.username, ...userStyle },
              children: user
            }
          ),
          userObj.is_sharing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$5.sharingIndicator, children: [
            "🖥️",
            " Ekran Payla",
            "şı",
            "yor"
          ] })
        ] })
      ] })
    }
  );
}, "VoiceUserItem");
const VoiceUserItem$1 = React.memo(VoiceUserItem);
const VoiceUserContextMenu = /* @__PURE__ */ __name(({
  contextMenu,
  currentUsername,
  isAdmin,
  isClientInThisChannel,
  remoteVolumes,
  handleVolumeChange,
  handleMenuAction,
  showMoveMenu,
  setShowMoveMenu,
  voiceChannels,
  roomName,
  getAvatar,
  allUsers,
  friendsList
}) => {
  if (!contextMenu) return null;
  const userObj = contextMenu.user;
  let avatarUrl = userObj.avatar || userObj.avatarUrl;
  if (!avatarUrl) {
    const foundUser = allUsers.find((u) => u.username === userObj.username);
    avatarUrl = foundUser?.avatar || getAvatar(userObj.username);
  }
  const volumeVal = remoteVolumes[userObj.username] || 100;
  return ReactDOM.createPortal(
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          ...styles$5.contextMenu,
          left: `${Math.min(contextMenu.x, window.innerWidth - 260)}px`,
          top: `${Math.min(contextMenu.y, window.innerHeight - 400)}px`,
          position: "fixed",
          zIndex: 2147483647
        },
        onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$5.menuHeader, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: avatarUrl,
                alt: userObj.username,
                onError: /* @__PURE__ */ __name((e) => {
                  e.target.onerror = null;
                  e.target.src = getAvatar(userObj.username);
                }, "onError"),
                style: { width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", border: "2px solid #5865f2", flexShrink: 0 }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: "600", fontSize: "14px", color: "#fff" }, children: userObj.username }),
              userObj.username === currentUsername && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "11px", color: "#b9bbbe", marginTop: "1px" }, children: "Sensin" })
            ] })
          ] }) }),
          isClientInThisChannel && userObj.username !== currentUsername && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$5.volumeSection, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: "12px", color: "#b9bbbe", fontWeight: "500", display: "flex", alignItems: "center", gap: "5px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M11 5L6 9H2v6h4l5 4V5z", fill: "#b9bbbe" }),
                  volumeVal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M15.54 8.46a5 5 0 010 7.07", stroke: "#b9bbbe", strokeWidth: "1.5", strokeLinecap: "round" }),
                  volumeVal > 100 && /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19.07 4.93a10 10 0 010 14.14", stroke: "#5865f2", strokeWidth: "1.5", strokeLinecap: "round" })
                ] }),
                "Ses Seviyesi"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: {
                fontSize: "12px",
                fontWeight: "700",
                color: volumeVal > 100 ? "#5865f2" : "#fff",
                background: volumeVal > 100 ? "rgba(88,101,242,0.15)" : "rgba(255,255,255,0.08)",
                padding: "2px 8px",
                borderRadius: "10px",
                minWidth: "42px",
                textAlign: "center"
              }, children: [
                volumeVal,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", height: "20px", display: "flex", alignItems: "center" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "range",
                  min: "0",
                  max: "200",
                  value: volumeVal,
                  onChange: /* @__PURE__ */ __name((e) => handleVolumeChange(userObj.username, e), "onChange"),
                  className: "voice-volume-slider",
                  style: { width: "100%", height: "6px", cursor: "pointer", WebkitAppearance: "none", MozAppearance: "none", appearance: "none", background: "transparent", outline: "none", position: "relative", zIndex: 2 }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", left: 0, right: 0, top: "50%", transform: "translateY(-50%)", height: "6px", borderRadius: "3px", overflow: "hidden", pointerEvents: "none", zIndex: 1, background: "#1e1f22" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: "100%", width: `${volumeVal / 200 * 100}%`, background: volumeVal > 100 ? "linear-gradient(90deg, #5865f2 50%, #7289da 100%)" : "#5865f2", borderRadius: "3px", transition: "width 0.05s ease" } }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: "2px", height: "12px", background: "rgba(255,255,255,0.2)", borderRadius: "1px", pointerEvents: "none", zIndex: 1 } })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$5.menuSection, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "user-context-menu-item", style: styles$5.menuItem, onClick: /* @__PURE__ */ __name(() => handleMenuAction("profile"), "onClick"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginRight: "8px", opacity: 0.7 }, children: "👤" }),
              " Profili G",
              "ö",
              "r",
              "ü",
              "nt",
              "ü",
              "le"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "user-context-menu-item", style: styles$5.menuItem, onClick: /* @__PURE__ */ __name(() => handleMenuAction("dm"), "onClick"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginRight: "8px", opacity: 0.7 }, children: "💬" }),
              " ",
              "Ö",
              "zelden Mesaj At"
            ] }),
            userObj.username !== currentUsername && !friendsList.some((f) => f.sender_username === userObj.username || f.receiver_username === userObj.username) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "user-context-menu-item", style: styles$5.menuItem, onClick: /* @__PURE__ */ __name(() => handleMenuAction("add_friend"), "onClick"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginRight: "8px", opacity: 0.7 }, children: "➕" }),
              " Arkada",
              "ş",
              " Ekle"
            ] })
          ] }),
          isAdmin && userObj.username !== currentUsername && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$5.menuDivider }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$5.menuSection, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "10px", color: "#72767d", padding: "6px 12px 4px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }, children: [
                "Mod Ara",
                "ç",
                "lar",
                "ı"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "user-context-menu-item", style: styles$5.menuItem, onClick: /* @__PURE__ */ __name(() => setShowMoveMenu(!showMoveMenu), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginRight: "8px", opacity: 0.7 }, children: "🔀" }),
                  "Ba",
                  "ş",
                  "ka Kanala Ta",
                  "şı"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "10px", transform: showMoveMenu ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", color: "#72767d" }, children: "›" })
              ] }) }),
              showMoveMenu && voiceChannels?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "4px 0", background: "rgba(88, 101, 242, 0.05)", borderTop: "1px solid rgba(88, 101, 242, 0.15)", borderBottom: "1px solid rgba(88, 101, 242, 0.15)", margin: "2px 0" }, children: [
                voiceChannels.filter((c) => c.slug !== roomName).map((channel) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: { ...styles$5.menuItem, paddingLeft: "24px", fontSize: "0.82em", display: "flex", alignItems: "center", gap: "8px" },
                    onClick: /* @__PURE__ */ __name(() => handleMenuAction("move", channel.slug), "onClick"),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#5865f2" }, children: "🔊" }),
                      " ",
                      channel.name
                    ]
                  },
                  channel.slug
                )),
                voiceChannels.filter((c) => c.slug !== roomName).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles$5.menuItem, color: "#72767d", cursor: "default", paddingLeft: "24px", fontSize: "0.82em" }, children: [
                  "Ba",
                  "ş",
                  "ka kanal yok"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "user-context-menu-item-danger", style: { ...styles$5.menuItem, color: "#ed4245" }, onClick: /* @__PURE__ */ __name(() => handleMenuAction("kick"), "onClick"), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginRight: "8px" }, children: "❌" }),
                " Kanaldan At"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "user-context-menu-item", style: styles$5.menuItem, onClick: /* @__PURE__ */ __name(() => handleMenuAction("server_mute"), "onClick"), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginRight: "8px", opacity: 0.7 }, children: "🔇" }),
                " Sunucu Sustur"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "user-context-menu-item", style: styles$5.menuItem, onClick: /* @__PURE__ */ __name(() => handleMenuAction("server_deafen"), "onClick"), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginRight: "8px", opacity: 0.7 }, children: "🙉" }),
                " Sunucu Sa",
                "ğı",
                "rla",
                "ş",
                "t",
                "ı",
                "r"
              ] })
            ] })
          ] }),
          userObj.username !== currentUsername && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$5.menuDivider }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "user-context-menu-item", style: styles$5.menuItem, onClick: /* @__PURE__ */ __name(() => handleMenuAction("mute_local"), "onClick"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginRight: "8px", opacity: 0.7 }, children: "🔇" }),
              " Benim ",
              "İç",
              "in Sessize Al"
            ] })
          ] })
        ]
      }
    ),
    document.getElementById("portal-root") || document.body
  );
}, "VoiceUserContextMenu");
const VoiceUserContextMenu$1 = React.memo(VoiceUserContextMenu);
const getDeterministicAvatar = /* @__PURE__ */ __name((username) => {
  if (!username) return "https://ui-avatars.com/api/?name=User&background=5865f2&color=fff&bold=true&size=128";
  const hash = SparkMD5.hash(username);
  const hue = parseInt(hash.substring(0, 8), 16) % 360;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=${hue.toString(16).padStart(2, "0")}${((hue + 60) % 360).toString(16).padStart(2, "0")}${((hue + 120) % 360).toString(16).padStart(2, "0")}&color=fff&bold=true&size=128`;
}, "getDeterministicAvatar");
const VoiceUserList = /* @__PURE__ */ __name(({
  voiceUsers: propVoiceUsers,
  roomName,
  currentUsername,
  remoteVolumes,
  setRemoteVolume,
  isClientInThisChannel,
  isPttActive,
  onUserAction,
  isAdmin,
  voiceChannels,
  friendsList = [],
  getDeterministicAvatar: propGetDeterministicAvatar,
  allUsers = []
}) => {
  const getAvatar = propGetDeterministicAvatar || getDeterministicAvatar;
  const [contextMenu, setContextMenu] = reactExports.useState(null);
  const [showMoveMenu, setShowMoveMenu] = reactExports.useState(false);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const [draggedUser, setDraggedUser] = reactExports.useState(null);
  const { globalData } = useGlobalWebSocket();
  reactExports.useEffect(() => {
    if (contextMenu) {
      const handleClick = /* @__PURE__ */ __name(() => setContextMenu(null), "handleClick");
      window.addEventListener("click", handleClick);
      return () => window.removeEventListener("click", handleClick);
    }
  }, [contextMenu]);
  const voiceUsers = propVoiceUsers || globalData?.voice_users || {};
  const usersInRoom = voiceUsers && typeof voiceUsers === "object" && !Array.isArray(voiceUsers) ? voiceUsers[roomName] || [] : [];
  const handleVolumeChange = reactExports.useCallback((user, event) => {
    setRemoteVolume(user, parseInt(event.target.value, 10));
  }, [setRemoteVolume]);
  const handleContextMenu = reactExports.useCallback((e, userObj) => {
    e.preventDefault();
    if (userObj.username !== currentUsername)
      setContextMenu({ x: e.clientX, y: e.clientY, user: userObj });
  }, [currentUsername]);
  const closeContextMenu = reactExports.useCallback(() => {
    setContextMenu(null);
    setShowMoveMenu(false);
  }, []);
  const handleMenuAction = reactExports.useCallback((action, targetChannel) => {
    if (contextMenu && onUserAction) {
      if (action === "move" && targetChannel) onUserAction(action, contextMenu.user.username, targetChannel);
      else onUserAction(action, contextMenu.user.username);
    }
    closeContextMenu();
  }, [contextMenu, onUserAction, closeContextMenu]);
  const handleUserClick = reactExports.useCallback((userObj) => {
    if (userObj.username !== currentUsername && onUserAction) onUserAction("profile", userObj.username);
  }, [currentUsername, onUserAction]);
  const handleDragStart = reactExports.useCallback((e, userObj) => {
    if (!isAdmin) return;
    setIsDragging(true);
    setDraggedUser(userObj.username);
    e.dataTransfer.setData("application/json", JSON.stringify({ username: userObj.username, fromChannel: roomName }));
    e.dataTransfer.effectAllowed = "move";
    const ghost = document.createElement("div");
    ghost.style.cssText = "position:fixed;top:-1000px;background:linear-gradient(135deg,#5865f2,#7289da);color:#fff;padding:8px 16px;border-radius:10px;font-size:13px;font-weight:600;box-shadow:0 4px 20px rgba(88,101,242,0.6);display:flex;align-items:center;gap:8px;z-index:99999;";
    ghost.textContent = "🔀 " + userObj.username;
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 60, 20);
    setTimeout(() => document.body.removeChild(ghost), 0);
  }, [isAdmin, roomName]);
  const handleDragEnd = reactExports.useCallback(() => {
    setIsDragging(false);
    setDraggedUser(null);
  }, []);
  if (!voiceUsers || typeof voiceUsers !== "object" || Array.isArray(voiceUsers)) return null;
  if (!Array.isArray(usersInRoom) || usersInRoom.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$5.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$5.userList, children: usersInRoom.map((userObj) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      VoiceUserItem$1,
      {
        userObj,
        isSelf: userObj.username === currentUsername,
        getAvatar,
        allUsers,
        isAdmin,
        isDragging,
        draggedUser,
        isClientInThisChannel,
        isPttActive,
        onDragStart: handleDragStart,
        onDragEnd: handleDragEnd,
        onContextMenu: handleContextMenu,
        onClick: handleUserClick
      },
      userObj.username
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      VoiceUserContextMenu$1,
      {
        contextMenu,
        currentUsername,
        isAdmin,
        isClientInThisChannel,
        remoteVolumes,
        handleVolumeChange,
        handleMenuAction,
        showMoveMenu,
        setShowMoveMenu,
        voiceChannels,
        roomName,
        getAvatar,
        allUsers,
        friendsList
      }
    )
  ] });
}, "VoiceUserList");
const VoiceUserList$1 = React.memo(VoiceUserList);
const QuickActionsMenu = /* @__PURE__ */ __name(({
  onClose,
  isAdmin,
  onOpenWebhooks,
  onOpenModerator,
  onExportData,
  onShowAuditLogs,
  onShowReports
}) => {
  const adminActions = [
    { icon: FaUserShield, label: "Moderatör Araçları", onClick: onOpenModerator, color: "#f04747" },
    { icon: FaLink, label: "Webhook Yönetimi", onClick: onOpenWebhooks, color: "#5865f2" },
    { icon: FaHistory, label: "Audit Logları", onClick: onShowAuditLogs, color: "#faa61a" },
    { icon: FaBan, label: "Raporları Görüntüle", onClick: onShowReports, color: "#f04747" },
    { icon: FaFileExport, label: "Veri Dışa Aktar", onClick: onExportData, color: "#43b581" },
    { icon: FaChartBar, label: "Sunucu İstatistikleri", onClick: /* @__PURE__ */ __name(() => window.open("/analytics", "_blank"), "onClick"), color: "#f0b132" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$4.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$4.menu, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles$4.title, children: "⚡ Hızlı İşlemler" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$4.actions, children: adminActions.map((action, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: /* @__PURE__ */ __name(() => {
          action.onClick?.();
          onClose();
        }, "onClick"),
        style: { ...styles$4.actionButton, backgroundColor: action.color },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(action.icon, { style: { fontSize: "1.2em" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: action.label })
        ]
      },
      idx
    )) })
  ] }) });
}, "QuickActionsMenu");
const styles$4 = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1e4
  },
  menu: {
    backgroundColor: "#2b2d31",
    borderRadius: "8px",
    padding: "20px",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.4)"
  },
  title: {
    color: "white",
    margin: "0 0 15px 0",
    fontSize: "1.2em",
    textAlign: "center"
  },
  actions: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px"
  },
  actionButton: {
    padding: "15px 10px",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.9em",
    transition: "transform 0.2s",
    ":hover": {
      transform: "scale(1.05)"
    }
  }
};
const QuickActionsMenu$1 = React.memo(QuickActionsMenu);
const AuditLogViewer = /* @__PURE__ */ __name(({ onClose, fetchWithAuth, apiBaseUrl }) => {
  const [logs, setLogs] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [filter, setFilter] = reactExports.useState("all");
  reactExports.useEffect(() => {
    loadLogs();
  }, [filter]);
  const loadLogs = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/audit/logs/?filter=${filter}`);
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
      }
    } catch (error) {
      console.error("Load audit logs error:", error);
    } finally {
      setLoading(false);
    }
  }, "loadLogs");
  const getActionColor = /* @__PURE__ */ __name((action) => {
    if (action.includes("delete") || action.includes("ban")) return "#f04747";
    if (action.includes("create") || action.includes("add")) return "#43b581";
    if (action.includes("update") || action.includes("edit")) return "#faa61a";
    return "#5865f2";
  }, "getActionColor");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$3.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$3.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$3.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: styles$3.title, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, {}),
        " Audit Logları"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles$3.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$3.filters, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setFilter("all"), "onClick"), style: { ...styles$3.filterButton, backgroundColor: filter === "all" ? "#5865f2" : "#40444b" }, children: "Tümü" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setFilter("moderation"), "onClick"), style: { ...styles$3.filterButton, backgroundColor: filter === "moderation" ? "#5865f2" : "#40444b" }, children: "Moderasyon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setFilter("server"), "onClick"), style: { ...styles$3.filterButton, backgroundColor: filter === "server" ? "#5865f2" : "#40444b" }, children: "Sunucu" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setFilter("user"), "onClick"), style: { ...styles$3.filterButton, backgroundColor: filter === "user" ? "#5865f2" : "#40444b" }, children: "Kullanıcı" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$3.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$3.loading, children: "Yükleniyor..." }) : logs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$3.empty, children: "Log bulunamadı" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$3.logList, children: logs.map((log, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$3.logItem, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles$3.actionBadge, backgroundColor: getActionColor(log.action) }, children: log.action }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$3.logDetails, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$3.logUser, children: log.user }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$3.logDescription, children: log.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$3.logTime, children: new Date(log.timestamp).toLocaleString("tr-TR") })
      ] })
    ] }, idx)) }) })
  ] }) });
}, "AuditLogViewer");
const styles$3 = {
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
    zIndex: 1e4
  },
  modal: {
    backgroundColor: "#2b2d31",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "800px",
    maxHeight: "80vh",
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #40444b"
  },
  title: {
    color: "white",
    margin: 0,
    fontSize: "1.5em",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    fontSize: "1.5em"
  },
  filters: {
    display: "flex",
    gap: "8px",
    padding: "15px",
    borderBottom: "1px solid #40444b"
  },
  filterButton: {
    padding: "8px 15px",
    border: "none",
    borderRadius: "4px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "0.85em"
  },
  content: {
    padding: "20px",
    overflowY: "auto",
    flex: 1
  },
  loading: {
    textAlign: "center",
    color: "#b9bbbe",
    padding: "40px"
  },
  empty: {
    textAlign: "center",
    color: "#b9bbbe",
    padding: "40px"
  },
  logList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  logItem: {
    backgroundColor: "#40444b",
    padding: "12px",
    borderRadius: "8px",
    display: "flex",
    gap: "12px"
  },
  actionBadge: {
    padding: "4px 8px",
    borderRadius: "4px",
    color: "white",
    fontWeight: "bold",
    fontSize: "0.75em",
    height: "fit-content",
    textTransform: "uppercase"
  },
  logDetails: {
    flex: 1
  },
  logUser: {
    color: "#5865f2",
    fontWeight: "bold",
    marginBottom: "4px"
  },
  logDescription: {
    color: "#dcddde",
    fontSize: "0.9em",
    marginBottom: "4px"
  },
  logTime: {
    color: "#72767d",
    fontSize: "0.75em"
  }
};
const ReportsViewer = /* @__PURE__ */ __name(({ onClose, fetchWithAuth, apiBaseUrl }) => {
  const [reports, setReports] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    loadReports();
  }, []);
  const loadReports = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/reports/list/`);
      if (res.ok) {
        const data = await res.json();
        setReports(data.reports || []);
      }
    } catch (error) {
      console.error("Load reports error:", error);
    } finally {
      setLoading(false);
    }
  }, "loadReports");
  const handleReport = /* @__PURE__ */ __name(async (reportId, action) => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/reports/handle/${reportId}/`, {
        method: "POST",
        body: JSON.stringify({ action })
      });
      if (res.ok) {
        setReports((prev) => prev.filter((r) => r.id !== reportId));
        toast.success(`✅ Rapor ${action === "approve" ? "onaylandı" : "reddedildi"}`);
      }
    } catch (error) {
      console.error("Handle report error:", error);
    }
  }, "handleReport");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$2.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$2.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$2.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: styles$2.title, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, {}),
        " Raporlar (",
        reports.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles$2.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$2.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$2.loading, children: "Yükleniyor..." }) : reports.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$2.empty, children: "Bekleyen rapor yok ✅" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$2.reportList, children: reports.map((report) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$2.reportItem, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$2.reportHeader, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles$2.reporter, children: [
          "Raporlayan: ",
          report.reporter
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles$2.timestamp, children: new Date(report.created_at).toLocaleString("tr-TR") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$2.reportContent, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$2.reportedUser, children: [
          "Raporlanan: ",
          report.reported_user
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$2.reason, children: [
          "Sebep: ",
          report.reason
        ] }),
        report.message_preview && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$2.messagePreview, children: [
          '"',
          report.message_preview,
          '"'
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$2.actions, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => handleReport(report.id, "approve"), "onClick"),
            style: styles$2.approveButton,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, {}),
              " Onayla"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => handleReport(report.id, "reject"), "onClick"),
            style: styles$2.rejectButton,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}),
              " Reddet"
            ]
          }
        )
      ] })
    ] }, report.id)) }) })
  ] }) });
}, "ReportsViewer");
const styles$2 = {
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
    zIndex: 1e4
  },
  modal: {
    backgroundColor: "#2b2d31",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "700px",
    maxHeight: "80vh",
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #40444b"
  },
  title: {
    color: "white",
    margin: 0,
    fontSize: "1.5em",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    fontSize: "1.5em"
  },
  content: {
    padding: "20px",
    overflowY: "auto",
    flex: 1
  },
  loading: {
    textAlign: "center",
    color: "#b9bbbe",
    padding: "40px"
  },
  empty: {
    textAlign: "center",
    color: "#43b581",
    padding: "40px",
    fontSize: "1.2em"
  },
  reportList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  reportItem: {
    backgroundColor: "#40444b",
    padding: "15px",
    borderRadius: "8px",
    borderLeft: "4px solid #f04747"
  },
  reportHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px"
  },
  reporter: {
    color: "#5865f2",
    fontWeight: "bold",
    fontSize: "0.9em"
  },
  timestamp: {
    color: "#72767d",
    fontSize: "0.75em"
  },
  reportContent: {
    marginBottom: "15px"
  },
  reportedUser: {
    color: "#f04747",
    fontWeight: "bold",
    marginBottom: "5px"
  },
  reason: {
    color: "#dcddde",
    marginBottom: "8px",
    fontSize: "0.9em"
  },
  messagePreview: {
    backgroundColor: "#2b2d31",
    padding: "10px",
    borderRadius: "4px",
    color: "#b9bbbe",
    fontSize: "0.85em",
    fontStyle: "italic",
    borderLeft: "3px solid #5865f2"
  },
  actions: {
    display: "flex",
    gap: "10px"
  },
  approveButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#43b581",
    border: "none",
    borderRadius: "4px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px"
  },
  rejectButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#f04747",
    border: "none",
    borderRadius: "4px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px"
  }
};
const ReportsViewer$1 = React.memo(ReportsViewer);
const ServerContextMenu = /* @__PURE__ */ __name(({
  x,
  y,
  server,
  isOwner,
  onClose,
  onLeaveServer,
  onServerSettings,
  onMuteServer,
  onUnmuteServer,
  onMoveUp,
  onMoveDown,
  onCopyInvite,
  onDeleteServer,
  onChangeIcon,
  // 🔥 YENİ: Sunucu ikonu değiştirme
  onChangePrivacy,
  // 🔥 YENİ: Gizlilik ayarları
  canMoveUp = true,
  canMoveDown = true,
  isMuted = false
}) => {
  const menuRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const handleClickOutside = /* @__PURE__ */ __name((e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    }, "handleClickOutside");
    const handleEscape = /* @__PURE__ */ __name((e) => {
      if (e.key === "Escape") {
        onClose();
      }
    }, "handleEscape");
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);
  reactExports.useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      let adjustedX = x;
      let adjustedY = y;
      if (rect.right > viewportWidth) {
        adjustedX = viewportWidth - rect.width - 10;
      }
      if (rect.bottom > viewportHeight) {
        adjustedY = viewportHeight - rect.height - 10;
      }
      menuRef.current.style.left = `${adjustedX}px`;
      menuRef.current.style.top = `${adjustedY}px`;
    }
  }, [x, y]);
  const handleAction = /* @__PURE__ */ __name((action) => {
    action();
    onClose();
  }, "handleAction");
  const menuItems = [
    {
      icon: FaCopy,
      label: "Davet Linki Kopyala",
      action: onCopyInvite,
      show: true,
      color: "#5865f2"
    },
    {
      divider: true,
      show: true
    },
    {
      icon: FaImage,
      label: "Sunucu İkonunu Değiştir",
      action: onChangeIcon,
      show: isOwner,
      color: "#faa61a"
    },
    {
      icon: server.is_public ? FaLock : FaGlobe,
      label: server.is_public ? "Özel Yap" : "Herkese Açık Yap",
      action: onChangePrivacy,
      show: isOwner,
      color: server.is_public ? "#ed4245" : "#43b581"
    },
    {
      divider: true,
      show: isOwner
    },
    {
      icon: isMuted ? FaBell : FaBellSlash,
      label: isMuted ? "Bildirimleri Aç" : "Bildirimleri Kapat",
      action: isMuted ? onUnmuteServer : onMuteServer,
      show: true
    },
    {
      divider: true,
      show: true
    },
    {
      icon: FaArrowUp,
      label: "Yukarı Taşı",
      action: onMoveUp,
      show: canMoveUp
    },
    {
      icon: FaArrowDown,
      label: "Aşağı Taşı",
      action: onMoveDown,
      show: canMoveDown
    },
    {
      divider: true,
      show: canMoveUp || canMoveDown
    },
    {
      icon: FaCog,
      label: "Sunucu Ayarları",
      action: onServerSettings,
      show: isOwner
    },
    {
      icon: FaTrash,
      label: "Sunucuyu Sil",
      action: onDeleteServer,
      show: isOwner,
      danger: true
    },
    {
      divider: true,
      show: true
    },
    {
      icon: FaSignOutAlt,
      label: "Sunucudan Ayrıl",
      action: onLeaveServer,
      show: !isOwner,
      danger: true
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: menuRef, className: "server-context-menu", style: styles$1.menu, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.serverHeader, children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: server.name }) }),
    menuItems.filter((item) => item.show).map((item, index) => {
      if (item.divider) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.divider }, `divider-${index}`);
      }
      const Icon = item.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => handleAction(item.action), "onClick"),
          style: {
            ...styles$1.menuItem,
            ...item.danger && styles$1.dangerItem,
            ...item.color && { color: item.color }
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { style: styles$1.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label })
          ]
        },
        index
      );
    })
  ] });
}, "ServerContextMenu");
const styles$1 = {
  menu: {
    position: "fixed",
    backgroundColor: "#111214",
    borderRadius: "4px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.4)",
    minWidth: "220px",
    padding: "6px",
    zIndex: 1e5,
    animation: "contextMenuFadeIn 0.1s ease"
  },
  serverHeader: {
    padding: "8px 12px",
    color: "#fff",
    fontSize: "14px",
    borderBottom: "1px solid #2b2d31",
    marginBottom: "4px"
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    padding: "8px 12px",
    background: "none",
    border: "none",
    color: "#b5bac1",
    fontSize: "14px",
    cursor: "pointer",
    borderRadius: "2px",
    transition: "all 0.15s",
    textAlign: "left"
  },
  dangerItem: {
    color: "#f23f43"
  },
  icon: {
    fontSize: "16px",
    flexShrink: 0
  },
  divider: {
    height: "1px",
    backgroundColor: "#2b2d31",
    margin: "4px 0"
  }
};
if (!document.getElementById("server-context-menu-styles")) {
  const styleSheet2 = document.createElement("style");
  styleSheet2.id = "server-context-menu-styles";
  styleSheet2.textContent = `
        @keyframes contextMenuFadeIn {
            from {
                opacity: 0;
                transform: scale(0.95);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        /* Menu button hover effect */
        .server-context-menu button:hover {
            background-color: #5865f2 !important;
            color: #fff !important;
        }
        
        .server-context-menu button:active {
            transform: scale(0.98);
        }
        
        /* Menu container class */
        .server-context-menu {
            user-select: none;
        }
    `;
  document.head.appendChild(styleSheet2);
}
const ServerContextMenu$1 = React.memo(ServerContextMenu);
const ConfirmModal = /* @__PURE__ */ __name(({
  isOpen,
  onClose,
  onConfirm,
  title = "Emin misiniz?",
  message = "Bu işlemi gerçekleştirmek istediğinizden emin misiniz?",
  confirmText = "Evet",
  cancelText = "Hayır",
  type = "warning",
  // 'warning', 'danger', 'info'
  requireTextConfirmation = false,
  confirmationText = "",
  inputPlaceholder = "Onaylamak için buraya yazın...",
  dangerDetails = null
  // Tehlikeli işlem detayları (array)
}) => {
  const [inputValue, setInputValue] = reactExports.useState("");
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (isOpen) {
      setInputValue("");
      setIsProcessing(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    const handleEsc = /* @__PURE__ */ __name((e) => {
      if (e.key === "Escape" && !isProcessing) {
        onClose();
      }
    }, "handleEsc");
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose, isProcessing]);
  if (!isOpen) return null;
  const handleConfirm = /* @__PURE__ */ __name(async () => {
    if (requireTextConfirmation && inputValue !== confirmationText) {
      return;
    }
    setIsProcessing(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error("Confirm action failed:", error);
    } finally {
      setIsProcessing(false);
    }
  }, "handleConfirm");
  const handleBackdropClick = /* @__PURE__ */ __name((e) => {
    if (e.target === e.currentTarget && !isProcessing) {
      onClose();
    }
  }, "handleBackdropClick");
  const typeConfig = {
    warning: {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, {}),
      color: "#f39c12",
      gradient: "linear-gradient(135deg, #f39c12 0%, #e67e22 100%)"
    },
    danger: {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}),
      color: "#e74c3c",
      gradient: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)"
    },
    info: {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, {}),
      color: "#3498db",
      gradient: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)"
    }
  };
  const config = typeConfig[type] || typeConfig.warning;
  const canConfirm = !requireTextConfirmation || inputValue === confirmationText;
  const modalContent = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: handleBackdropClick, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.header, background: config.gradient }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.headerIcon, children: config.icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          disabled: isProcessing,
          style: styles.closeButton,
          title: "Kapat",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {})
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.body, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.message, children: message }),
      dangerDetails && dangerDetails.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.dangerBox, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.dangerHeader, children: "⚠️ Bu işlem:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { style: styles.dangerList, children: dangerDetails.map((detail, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: styles.dangerItem, children: [
          "• ",
          detail
        ] }, idx)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.dangerFooter, children: "GERİ ALINAMAZ!" })
      ] }),
      requireTextConfirmation && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inputContainer, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.inputLabel, children: [
          "Devam etmek için ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
            '"',
            confirmationText,
            '"'
          ] }),
          " yazın:"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: inputValue,
            onChange: /* @__PURE__ */ __name((e) => setInputValue(e.target.value), "onChange"),
            placeholder: inputPlaceholder,
            style: {
              ...styles.input,
              borderColor: inputValue && inputValue !== confirmationText ? "#e74c3c" : "#4e5058"
            },
            disabled: isProcessing,
            autoFocus: true
          }
        ),
        inputValue && inputValue !== confirmationText && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.inputError, children: "Metin eşleşmiyor" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.footer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          disabled: isProcessing,
          style: styles.cancelButton,
          children: cancelText
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleConfirm,
          disabled: !canConfirm || isProcessing,
          style: {
            ...styles.confirmButton,
            background: canConfirm ? config.gradient : "#4e5058",
            cursor: canConfirm && !isProcessing ? "pointer" : "not-allowed",
            opacity: canConfirm && !isProcessing ? 1 : 0.6
          },
          children: isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.spinner }),
            " İşleniyor..."
          ] }) : confirmText
        }
      )
    ] })
  ] }) });
  return reactDomExports.createPortal(modalContent, document.body);
}, "ConfirmModal");
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    backdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1e4,
    padding: "20px",
    animation: "fadeIn 0.2s ease-out"
  },
  modal: {
    backgroundColor: "#2f3136",
    borderRadius: "12px",
    maxWidth: "500px",
    width: "100%",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
    animation: "slideUp 0.3s ease-out",
    overflow: "hidden"
  },
  header: {
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    position: "relative"
  },
  headerIcon: {
    fontSize: "24px",
    color: "white",
    animation: "pulse 2s ease-in-out infinite"
  },
  title: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "bold",
    color: "white",
    flex: 1
  },
  closeButton: {
    background: "rgba(255, 255, 255, 0.1)",
    border: "none",
    borderRadius: "6px",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    cursor: "pointer",
    transition: "all 0.2s",
    fontSize: "16px"
  },
  body: {
    padding: "24px"
  },
  message: {
    margin: 0,
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#dcddde",
    marginBottom: "16px"
  },
  dangerBox: {
    backgroundColor: "rgba(231, 76, 60, 0.1)",
    border: "2px solid rgba(231, 76, 60, 0.3)",
    borderRadius: "8px",
    padding: "16px",
    marginTop: "16px"
  },
  dangerHeader: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#e74c3c",
    marginBottom: "8px"
  },
  dangerList: {
    margin: "8px 0",
    padding: "0 0 0 12px",
    listStyle: "none",
    color: "#dcddde"
  },
  dangerItem: {
    fontSize: "13px",
    lineHeight: "1.8",
    color: "#dcddde"
  },
  dangerFooter: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#e74c3c",
    marginTop: "12px",
    textAlign: "center",
    padding: "8px",
    backgroundColor: "rgba(231, 76, 60, 0.2)",
    borderRadius: "6px"
  },
  inputContainer: {
    marginTop: "20px"
  },
  inputLabel: {
    display: "block",
    fontSize: "14px",
    color: "#dcddde",
    marginBottom: "8px"
  },
  input: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#202225",
    border: "2px solid #4e5058",
    borderRadius: "6px",
    color: "#dcddde",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box"
  },
  inputError: {
    fontSize: "12px",
    color: "#e74c3c",
    marginTop: "6px"
  },
  footer: {
    padding: "16px 24px",
    backgroundColor: "#2b2d31",
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end"
  },
  cancelButton: {
    padding: "10px 24px",
    backgroundColor: "transparent",
    border: "2px solid #4e5058",
    borderRadius: "6px",
    color: "#dcddde",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  confirmButton: {
    padding: "10px 24px",
    border: "none",
    borderRadius: "6px",
    color: "white",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  spinner: {
    width: "14px",
    height: "14px",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderTopColor: "white",
    borderRadius: "50%",
    animation: "spin 0.6s linear infinite",
    display: "inline-block"
  }
};
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);
const cryptoAddresses = {
  sol: "Bk6ywhae86fp6BHmGtxabS6ncEGsFxhcnZEWJRZLVr9z",
  eth: "0xeaa14d4651a8ea7488289209b9294a1309dde37c",
  usdt: "TGAny6VmDAWdVmTXCPrpsbLKKQQdvyvnWC",
  coffee: "https://buymeacoffee.com/dogudoguweo"
};
const SupportModal = /* @__PURE__ */ __name(({ isOpen, onClose }) => {
  const [copiedAddress, setCopiedAddress] = reactExports.useState(null);
  const copyToClipboard = /* @__PURE__ */ __name((text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAddress(type);
      setTimeout(() => setCopiedAddress(null), 2e3);
    });
  }, "copyToClipboard");
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$6.modalOverlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$6.selectionModalContent, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { color: "white", margin: 0 }, children: [
        "Bizi Destekle ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaHeart, { color: "#eb459e" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { style: { cursor: "pointer", color: "#b9bbbe" }, onClick: onClose })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { backgroundColor: "#1e1f22", padding: 15, borderRadius: 8, marginBottom: 15 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCoffee, { color: "#FFDD00", size: 24 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "left" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "white", fontWeight: "bold" }, children: "Buy Me a Coffee" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "0.8em", color: "#b9bbbe" }, children: "En kolay destek yöntemi" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => window.open(cryptoAddresses.coffee, "_blank"), "onClick"), style: { width: "100%", padding: 10, backgroundColor: "#FFDD00", border: "none", borderRadius: 6, fontWeight: "bold", cursor: "pointer" }, children: "Kahve Ismarla ☕" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { backgroundColor: "#1e1f22", padding: 15, borderRadius: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { style: { margin: "0 0 10px 0", color: "white", textAlign: "left" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaBitcoin, { color: "#f7931a" }),
        " Kripto ile Destek"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 10 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "0.9em", color: "#b9bbbe", marginBottom: 5 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Solana (SOL)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => copyToClipboard(cryptoAddresses.sol, "sol"), "onClick"), style: { cursor: "pointer", color: "#5865f2", display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", padding: 0, fontSize: "inherit" }, children: copiedAddress === "sol" ? "Kopyalandı!" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCopy, {}),
            " Kopyala"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { backgroundColor: "#111214", padding: 8, borderRadius: 4, fontSize: "0.8em", color: "#dcddde", wordBreak: "break-all" }, children: cryptoAddresses.sol })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 10 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "0.9em", color: "#b9bbbe", marginBottom: 5 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Ethereum (ETH)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => copyToClipboard(cryptoAddresses.eth, "eth"), "onClick"), style: { cursor: "pointer", color: "#5865f2", display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", padding: 0, fontSize: "inherit" }, children: copiedAddress === "eth" ? "Kopyalandı!" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCopy, {}),
            " Kopyala"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { backgroundColor: "#111214", padding: 8, borderRadius: 4, fontSize: "0.8em", color: "#dcddde", wordBreak: "break-all" }, children: cryptoAddresses.eth })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "0.9em", color: "#b9bbbe", marginBottom: 5 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "USDT (TRC20)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => copyToClipboard(cryptoAddresses.usdt, "usdt"), "onClick"), style: { cursor: "pointer", color: "#5865f2", display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", padding: 0, fontSize: "inherit" }, children: copiedAddress === "usdt" ? "Kopyalandı!" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCopy, {}),
            " Kopyala"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { backgroundColor: "#111214", padding: 8, borderRadius: 4, fontSize: "0.8em", color: "#dcddde", wordBreak: "break-all" }, children: cryptoAddresses.usdt })
      ] })
    ] })
  ] }) });
}, "SupportModal");
const DiscoveryModal = /* @__PURE__ */ __name(({ isOpen, onClose, publicServers, onJoinServer, fetchWithAuth, apiUrl }) => {
  const [inviteCodeInput, setInviteCodeInput] = reactExports.useState("");
  const handleJoinViaCode = /* @__PURE__ */ __name(async (e) => {
    e.preventDefault();
    if (!inviteCodeInput.trim()) return;
    try {
      const res = await fetchWithAuth(`${apiUrl}/invites/join/`, {
        method: "POST",
        body: JSON.stringify({ code: inviteCodeInput })
      });
      const data = await res.json();
      if (res.ok) {
        setInviteCodeInput("");
        onClose();
        toast.success(`✅ "${data.server_name}" sunucusuna katıldın!`);
      } else {
        console.error("❌ Sunucuya katılma hatası:", data.error || "Sunucuya katılınamadı.");
      }
    } catch (error) {
      console.error("❌ Davet kodu hatası:", error);
    }
  }, "handleJoinViaCode");
  if (!isOpen) return null;
  return reactDomExports.createPortal(
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles$6.modalOverlay, display: "flex", justifyContent: "center", alignItems: "center" }, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles$6.selectionModalContent, width: "600px", maxWidth: "90vw", maxHeight: "80vh", overflowY: "auto" }, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, paddingBottom: 15, borderBottom: "1px solid #1e1f22" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { color: "white", margin: 0, fontSize: "1.5em" }, children: "🌍 Sunucuya Katıl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { style: { cursor: "pointer", color: "#b9bbbe", fontSize: "1.3em" }, onClick: onClose })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { backgroundColor: "#202225", padding: "15px", borderRadius: "8px", marginBottom: "20px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", fontSize: "0.9em", marginTop: 0 }, children: "Elinizde bir davet kodu veya linki varsa aşağıya yapıştırın." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleJoinViaCode, style: { display: "flex", gap: "10px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: inviteCodeInput, onChange: /* @__PURE__ */ __name((e) => setInviteCodeInput(e.target.value), "onChange"), placeholder: "https://www.pawscord.com/invite/...", style: { flex: 1, padding: "10px", borderRadius: "4px", border: "1px solid #1e1f22", backgroundColor: "#313338", color: "white", outline: "none" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", style: { backgroundColor: "#5865f2", color: "white", border: "none", borderRadius: "4px", padding: "0 20px", fontWeight: "bold", cursor: "pointer" }, children: "Katıl" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { style: { textAlign: "left", color: "#dbdee1", borderBottom: "1px solid #4f545c", paddingBottom: "5px", marginBottom: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCompass, { style: { marginRight: 8 } }),
        " Toplulukları Keşfet"
      ] }),
      publicServers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", fontStyle: "italic" }, children: "Şu an katılabileceğin halka açık sunucu yok." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "10px" }, children: publicServers.map((srv) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { backgroundColor: "#2b2d31", padding: "10px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #1f2023" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
          srv.icon ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `https://www.pawscord.com${srv.icon}`, alt: "", style: { width: 40, height: 40, borderRadius: "50%", objectFit: "cover" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 40, height: 40, borderRadius: "50%", backgroundColor: "#5865f2", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "white" }, children: srv.name.substring(0, 2).toUpperCase() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "left" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "white", fontWeight: "bold" }, children: srv.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: "#b9bbbe", fontSize: "0.8em" }, children: [
              srv.member_count,
              " Üye • Kurucu: ",
              srv.owner
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => onJoinServer(srv.id), "onClick"), style: { backgroundColor: "#23a559", color: "white", border: "none", padding: "8px 16px", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }, children: "Katıl" })
      ] }, srv.id)) })
    ] }) }),
    document.body
  );
}, "DiscoveryModal");
const AddServerModal = /* @__PURE__ */ __name(({ isOpen, onClose, onCreateServer, onFriendsClick }) => {
  const [isCreatingServer, setIsCreatingServer] = reactExports.useState(false);
  const [newServerName, setNewServerName] = reactExports.useState("");
  const [isNewServerPublic, setIsNewServerPublic] = reactExports.useState(false);
  const handleCreateServer = /* @__PURE__ */ __name(async (e) => {
    e?.preventDefault();
    if (!newServerName.trim()) return;
    await onCreateServer(newServerName, isNewServerPublic);
    setNewServerName("");
    setIsNewServerPublic(false);
    setIsCreatingServer(false);
  }, "handleCreateServer");
  if (!isOpen && !isCreatingServer) return null;
  if (isCreatingServer) {
    return reactDomExports.createPortal(
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$6.modalOverlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleCreateServer, style: styles$6.addCategoryForm, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { margin: 0, color: "white" }, children: "Sunucu Oluştur" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { style: { cursor: "pointer", color: "#b9bbbe" }, onClick: /* @__PURE__ */ __name(() => {
            setIsCreatingServer(false);
            onClose();
          }, "onClick") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", fontSize: "0.9em" }, children: "Sunucuna bir isim ver." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { autoFocus: true, placeholder: "Sunucu Adı...", value: newServerName, onChange: /* @__PURE__ */ __name((e) => setNewServerName(e.target.value), "onChange"), style: styles$6.addRoomInput }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px", margin: "10px 0" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", id: "publicCheck", checked: isNewServerPublic, onChange: /* @__PURE__ */ __name((e) => setIsNewServerPublic(e.target.checked), "onChange"), style: { width: "16px", height: "16px", accentColor: "#23a559" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "publicCheck", style: { color: "#dbdee1", fontSize: "0.9em", cursor: "pointer" }, children: "Herkese Açık (Keşfet'te Görünür)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", style: styles$6.addRoomButton, children: "Oluştur" })
      ] }) }),
      document.body
    );
  }
  return reactDomExports.createPortal(
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$6.modalOverlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$6.selectionModalContent, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { color: "white", margin: 0 }, children: "Ne Yapmak İstersin?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: { ...styles$6.selectionButton, backgroundColor: "#5865f2" }, onClick: /* @__PURE__ */ __name(() => {
        setIsCreatingServer(true);
      }, "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaServer, {}),
        " Sunucu Oluştur"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: { ...styles$6.selectionButton, backgroundColor: "#23a559" }, onClick: /* @__PURE__ */ __name(() => {
        onClose();
        if (onFriendsClick) onFriendsClick();
      }, "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserFriends, {}),
        " Arkadaş Ekle"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: { marginTop: 10, background: "none", border: "none", color: "#b9bbbe", cursor: "pointer" }, onClick: onClose, children: "İptal" })
    ] }) }),
    document.body
  );
}, "AddServerModal");
const ActionMenuModal = /* @__PURE__ */ __name(({ actionMenu, onClose, onRename, onDelete, onSettings }) => {
  if (!actionMenu) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$6.modalOverlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles$6.selectionModalContent, width: "250px" }, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "white", marginTop: 0, borderBottom: "1px solid #4f545c", paddingBottom: 10 }, children: actionMenu.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
      actionMenu.type === "room" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: onSettings,
          style: { backgroundColor: "#5865f2", color: "white", border: "none", padding: "10px", borderRadius: 4, cursor: "pointer", display: "flex", alignItems: "center", gap: 10 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCog, {}),
            " Kanal Ayarları"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: onRename,
          style: { backgroundColor: "#5865f2", color: "white", border: "none", padding: "10px", borderRadius: 4, cursor: "pointer", display: "flex", alignItems: "center", gap: 10 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaEdit, {}),
            " Yeniden Adlandır"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: onDelete,
          style: { backgroundColor: "#da373c", color: "white", border: "none", padding: "10px", borderRadius: 4, cursor: "pointer", display: "flex", alignItems: "center", gap: 10 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}),
            " Sil"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: { marginTop: 15, background: "none", border: "none", color: "#b9bbbe", cursor: "pointer", width: "100%" }, onClick: onClose, children: "İptal" })
  ] }) });
}, "ActionMenuModal");
const InviteToServerModal = /* @__PURE__ */ __name(({ inviteToServerModal, servers, onSendInvite, onClose }) => {
  if (!inviteToServerModal || !inviteToServerModal.isOpen) return null;
  return reactDomExports.createPortal(
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.85)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999999
        },
        onClick: onClose,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"),
            style: {
              backgroundColor: "#2b2d31",
              borderRadius: "12px",
              width: "400px",
              maxHeight: "80vh",
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                padding: "20px",
                borderBottom: "1px solid #3f4147",
                textAlign: "center"
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { color: "#f2f3f5", margin: 0, fontSize: "18px" }, children: "🎫 Sunucuya Davet Et" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "#b9bbbe", margin: "8px 0 0", fontSize: "14px" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: inviteToServerModal.username }),
                  " kullanıcısını hangi sunucuya davet etmek istiyorsunuz?"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                maxHeight: "300px",
                overflowY: "auto",
                padding: "12px"
              }, children: servers.map((server) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  onClick: /* @__PURE__ */ __name(() => onSendInvite(server.id, inviteToServerModal.username), "onClick"),
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    backgroundColor: "rgba(255,255,255,0.02)",
                    marginBottom: "8px"
                  },
                  onMouseEnter: /* @__PURE__ */ __name((e) => {
                    e.currentTarget.style.backgroundColor = "rgba(88, 101, 242, 0.2)";
                  }, "onMouseEnter"),
                  onMouseLeave: /* @__PURE__ */ __name((e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)";
                  }, "onMouseLeave"),
                  children: [
                    server.icon ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: server.icon,
                        alt: server.name,
                        style: {
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          objectFit: "cover"
                        }
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: "#5865f2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      color: "white",
                      fontSize: "16px"
                    }, children: server.name?.substring(0, 2).toUpperCase() }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#f2f3f5", fontWeight: "600" }, children: server.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: "#b9bbbe", fontSize: "12px" }, children: [
                        server.member_count || server.categories?.length || 0,
                        " üye"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#5865f2", fontSize: "20px" }, children: "→" })
                  ]
                },
                server.id
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                padding: "16px 20px",
                borderTop: "1px solid #3f4147",
                textAlign: "center"
              }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: onClose,
                  style: {
                    backgroundColor: "#4f545c",
                    color: "#f2f3f5",
                    border: "none",
                    padding: "10px 24px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "600"
                  },
                  children: "İptal"
                }
              ) })
            ]
          }
        )
      }
    ),
    document.body
  );
}, "InviteToServerModal");
const useServerActions = /* @__PURE__ */ __name(({ apiUrl, fetchWithAuth, servers, currentUsername, selectedServerId, setSelectedServerId, onWelcomeClick, onMoveServer }) => {
  const [publicServers, setPublicServers] = reactExports.useState([]);
  const [newServerName, setNewServerName] = reactExports.useState("");
  const [newCategoryName, setNewCategoryName] = reactExports.useState("");
  const [newRoomName, setNewRoomName] = reactExports.useState("");
  const [newRoomType, setNewRoomType] = reactExports.useState("text");
  const [isNewServerPublic, setIsNewServerPublic] = reactExports.useState(false);
  const [activeServerIdForCategory, setActiveServerIdForCategory] = reactExports.useState(null);
  const [activeCategoryIdForRoom, setActiveCategoryIdForRoom] = reactExports.useState(null);
  const [editingItemId, setEditingItemId] = reactExports.useState(null);
  const [editName, setEditName] = reactExports.useState("");
  const [leaveServerModal, setLeaveServerModal] = reactExports.useState(null);
  const [deleteServerModal, setDeleteServerModal] = reactExports.useState(null);
  const handleLeaveServer = /* @__PURE__ */ __name(async (serverId) => {
    const server = servers.find((s) => s.id === serverId);
    if (server && server.owner_username === currentUsername) {
      toast.warning('Sunucu sahibi sunucudan ayrılamaz!\n\nSunucuyu silmek için:\n1. Sunucuya sağ tıklayın\n2. "Sunucuyu Sil" seçeneğini tıklayın\n\nVeya önce sahipliği başka birine devredin.', 7e3);
      return;
    }
    setLeaveServerModal({ server, isOpen: true });
  }, "handleLeaveServer");
  const executeLeaveServer = /* @__PURE__ */ __name(async (serverId) => {
    try {
      const res = await fetchWithAuth(`${apiUrl}/servers/${serverId}/leave/`, {
        method: "POST"
      });
      if (res.ok) {
        const data = await res.json();
        setSelectedServerId("home");
        onWelcomeClick();
        toast.success("✅ Sunucudan başarıyla ayrıldınız!");
      } else {
        const error = await res.json();
        const errorMessage = error.error || "Sunucudan ayrılırken hata oluştu";
        console.error("❌ Sunucudan ayrılma hatası:", errorMessage);
        toast.error(`❌ Hata: ${errorMessage}`);
      }
    } catch (error) {
      console.error("❌ Sunucudan ayrılma hatası:", error);
      toast.error("❌ Sunucudan ayrılırken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  }, "executeLeaveServer");
  const handleChangeServerIcon = /* @__PURE__ */ __name(async (serverId) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) {
        toast.warning("Dosya boyutu çok büyük! Maksimum 5MB olmalıdır.");
        return;
      }
      const formData = new FormData();
      formData.append("icon", file);
      try {
        const res = await fetchWithAuth(`${apiUrl}/servers/${serverId}/icon/`, {
          method: "POST",
          body: formData
        });
        if (res.ok) {
          const data = await res.json();
        } else {
          const error = await res.json();
          toast.error(`İkon güncellenirken hata: ${error.error || "Bilinmeyen hata"}`);
        }
      } catch (error) {
        console.error("❌ İkon yükleme hatası:", error);
        toast.error("İkon yüklenirken bir hata oluştu.");
      }
    };
    input.click();
  }, "handleChangeServerIcon");
  const handleChangeServerPrivacy = /* @__PURE__ */ __name(async (serverId) => {
    const server = servers.find((s) => s.id === serverId);
    if (!server) return;
    const newPrivacy = !server.is_public;
    const message = newPrivacy ? "Sunucuyu herkese açık yapmak istediğinize emin misiniz? Herkes bu sunucuyu bulabilir ve katılabilir." : "Sunucuyu özel yapmak istediğinize emin misiniz? Sadece davet edilen kişiler katılabilir.";
    if (!await confirmDialog(message)) {
      return;
    }
    try {
      const res = await fetchWithAuth(`${apiUrl}/servers/${serverId}/privacy/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_public: newPrivacy })
      });
      if (res.ok) {
        const data = await res.json();
      } else {
        const error = await res.json();
        toast.error(`Gizlilik ayarı değiştirilirken hata: ${error.error || "Bilinmeyen hata"}`);
      }
    } catch (error) {
      console.error("❌ Gizlilik ayarı hatası:", error);
      toast.error("Gizlilik ayarı değiştirilirken bir hata oluştu.");
    }
  }, "handleChangeServerPrivacy");
  const handleCopyServerInvite = /* @__PURE__ */ __name(async (serverId) => {
    try {
      const res = await fetchWithAuth(`${apiUrl}/invites/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          server_id: serverId,
          max_uses: 0,
          expires_hours: 0
        })
      });
      if (res.ok) {
        const data = await res.json();
        const productionUrl = "https://www.pawscord.com";
        const isProduction = true;
        const baseUrl = isProduction ? productionUrl : window.location.origin;
        const inviteUrl = `${baseUrl}/#/invite/${data.code}`;
        await navigator.clipboard.writeText(inviteUrl);
        toast.success(`Davet linki kopyalandı!

${inviteUrl}`, 4e3);
      } else {
        const error = await res.json();
        console.error("❌ Davet oluşturma hatası:", error.error || "Davet oluşturulamadı");
        toast.error(`Hata: ${error.error || "Davet oluşturulamadı"}`);
      }
    } catch (error) {
      console.error("❌ Davet kopyalama hatası:", error);
    }
  }, "handleCopyServerInvite");
  const handleCreateServer = /* @__PURE__ */ __name(async (nameOrEvent, isPublic) => {
    if (nameOrEvent?.preventDefault) {
      nameOrEvent.preventDefault();
    }
    const serverName = typeof nameOrEvent === "string" ? nameOrEvent : newServerName;
    const serverPublic = typeof nameOrEvent === "string" ? isPublic : isNewServerPublic;
    if (!serverName?.trim()) return;
    await fetchWithAuth(`${apiUrl}/servers/create/`, {
      method: "POST",
      body: JSON.stringify({ name: serverName, is_public: !!serverPublic })
    });
    setNewServerName("");
    setIsNewServerPublic(false);
  }, "handleCreateServer");
  const handleCreateCategory = /* @__PURE__ */ __name(async (e, serverId) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    await fetchWithAuth(`${apiUrl}/categories/create/`, { method: "POST", body: JSON.stringify({ server_id: serverId, name: newCategoryName }) });
    setNewCategoryName("");
    setActiveServerIdForCategory(null);
  }, "handleCreateCategory");
  const handleCreateRoom = /* @__PURE__ */ __name(async (e, categoryId) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;
    await fetchWithAuth(`${apiUrl}/categories/${categoryId}/create_room/`, { method: "POST", body: JSON.stringify({ name: newRoomName, channel_type: newRoomType }) });
    setNewRoomName("");
    setActiveCategoryIdForRoom(null);
  }, "handleCreateRoom");
  const handleRenameCategory = /* @__PURE__ */ __name(async (e, catId) => {
    e.preventDefault();
    await fetchWithAuth(`${apiUrl}/categories/${catId}/rename/`, {
      method: "POST",
      body: JSON.stringify({ new_name: editName })
    });
    setEditingItemId(null);
  }, "handleRenameCategory");
  const handleDeleteCategory = /* @__PURE__ */ __name(async (e, catId) => {
    e.stopPropagation();
    if (!await confirmDialog("Kategoriyi silmek istediğine emin misin? İçindeki odalar da silinecek!")) return;
    await fetchWithAuth(`${apiUrl}/categories/${catId}/delete/`, { method: "POST" });
  }, "handleDeleteCategory");
  const handleRenameRoom = /* @__PURE__ */ __name(async (e, slug) => {
    e.preventDefault();
    await fetchWithAuth(`${apiUrl}/rooms/${slug}/rename/`, {
      method: "POST",
      body: JSON.stringify({ new_name: editName })
    });
    setEditingItemId(null);
  }, "handleRenameRoom");
  const handleDeleteRoom = /* @__PURE__ */ __name(async (e, slug) => {
    e.stopPropagation();
    if (!await confirmDialog("Kanalı silmek istediğine emin misin?")) return;
    await fetchWithAuth(`${apiUrl}/rooms/${slug}/delete/`, { method: "POST" });
  }, "handleDeleteRoom");
  const handleMoveServer = /* @__PURE__ */ __name((serverId, direction) => {
    if (onMoveServer) {
      onMoveServer(serverId, direction);
    }
  }, "handleMoveServer");
  const handleMoveUserToChannel = /* @__PURE__ */ __name(async (username, fromChannel, toChannel) => {
    try {
      const res = await fetchWithAuth(`${apiUrl}/voice/move_user/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          from_channel: fromChannel,
          to_channel: toChannel
        })
      });
      if (res.ok) {
        const data = await res.json();
      } else {
        const error = await res.json();
        console.error(`❌ ${error.error || "Kullanıcı taşınamadı"}`);
      }
    } catch (error) {
      console.error("❌ Kullanıcı taşıma hatası:", error);
    }
  }, "handleMoveUserToChannel");
  const handleKickUserFromChannel = /* @__PURE__ */ __name(async (username, channel) => {
    try {
      const res = await fetchWithAuth(`${apiUrl}/voice/kick_user/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          channel
        })
      });
      if (res.ok) {
        const data = await res.json();
      } else {
        const error = await res.json();
        console.error(`❌ ${error.error || "Kullanıcı atılamadı"}`);
      }
    } catch (error) {
      console.error("❌ Kullanıcı atma hatası:", error);
    }
  }, "handleKickUserFromChannel");
  const handleOpenDiscovery = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetchWithAuth(`${apiUrl}/servers/public/`);
      const data = await res.json();
      setPublicServers(data);
    } catch (e) {
      console.error("Sunucular çekilemedi", e);
    }
  }, "handleOpenDiscovery");
  const handleJoinServer = /* @__PURE__ */ __name(async (serverId) => {
    try {
      const res = await fetchWithAuth(`${apiUrl}/servers/${serverId}/join/`, { method: "POST" });
      if (res.ok) {
        toast.success("✅ Sunucuya başarıyla katıldın!");
      }
    } catch (e) {
      console.error("❌ Sunucuya katılma hatası:", e);
    }
  }, "handleJoinServer");
  const handleJoinViaCode = /* @__PURE__ */ __name(async (code) => {
    if (!code.trim()) return;
    try {
      const res = await fetchWithAuth(`${apiUrl}/invites/join/`, {
        method: "POST",
        body: JSON.stringify({ code })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(`✅ "${data.server_name}" sunucusuna katıldın!`);
      } else {
        console.error("❌ Sunucuya katılma hatası:", data.error || "Sunucuya katılınamadı.");
      }
    } catch (error) {
      console.error("❌ Davet kodu hatası:", error);
    }
  }, "handleJoinViaCode");
  return {
    // Functions
    handleLeaveServer,
    executeLeaveServer,
    handleChangeServerIcon,
    handleChangeServerPrivacy,
    handleCopyServerInvite,
    handleCreateServer,
    handleCreateCategory,
    handleCreateRoom,
    handleRenameCategory,
    handleDeleteCategory,
    handleRenameRoom,
    handleDeleteRoom,
    handleMoveServer,
    handleMoveUserToChannel,
    handleKickUserFromChannel,
    handleOpenDiscovery,
    handleJoinServer,
    handleJoinViaCode,
    // State
    publicServers,
    setPublicServers,
    newServerName,
    setNewServerName,
    newCategoryName,
    setNewCategoryName,
    newRoomName,
    setNewRoomName,
    newRoomType,
    setNewRoomType,
    isNewServerPublic,
    setIsNewServerPublic,
    activeServerIdForCategory,
    setActiveServerIdForCategory,
    activeCategoryIdForRoom,
    setActiveCategoryIdForRoom,
    editingItemId,
    setEditingItemId,
    editName,
    setEditName,
    leaveServerModal,
    setLeaveServerModal,
    deleteServerModal,
    setDeleteServerModal
  };
}, "useServerActions");
const useDMActions = /* @__PURE__ */ __name(({ apiUrl, fetchWithAuth, servers, onViewUserProfile }) => {
  const [dmContextMenu, setDmContextMenu] = reactExports.useState(null);
  const [inviteToServerModal, setInviteToServerModal] = reactExports.useState(null);
  const handleClearDM = /* @__PURE__ */ __name(async (conversationId) => {
    if (!confirm("Bu konuşmadaki tüm mesajları silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.")) {
      return;
    }
    try {
      const res = await fetchWithAuth(`${apiUrl}/conversations/${conversationId}/clear/`, {
        method: "POST"
      });
      if (res.ok) {
        toast.success("✅ Konuşma temizlendi!");
      } else {
        const data = await res.json();
        toast.error(`❌ Hata: ${data.error || "Konuşma temizlenemedi"}`);
      }
    } catch (error) {
      console.error("❌ DM clear error:", error);
      toast.error("❌ Bağlantı hatası");
    }
    setDmContextMenu(null);
  }, "handleClearDM");
  const handleHideDM = /* @__PURE__ */ __name(async (conversationId) => {
    if (!confirm("Bu konuşmayı gizlemek istediğinizden emin misiniz?")) {
      return;
    }
    try {
      const res = await fetchWithAuth(`${apiUrl}/conversations/${conversationId}/hide/`, {
        method: "POST"
      });
      if (res.ok) {
        toast.success("✅ Konuşma gizlendi!");
      } else {
        const data = await res.json();
        toast.error(`❌ Hata: ${data.error || "Konuşma gizlenemedi"}`);
      }
    } catch (error) {
      console.error("❌ DM hide error:", error);
      toast.error("❌ Bağlantı hatası");
    }
    setDmContextMenu(null);
  }, "handleHideDM");
  const handleViewProfile = /* @__PURE__ */ __name((username) => {
    if (onViewUserProfile) {
      onViewUserProfile(username);
    } else {
      toast.info(`👤 ${username} profili görüntülenemiyor`);
    }
    setDmContextMenu(null);
  }, "handleViewProfile");
  const handleInviteToServer = /* @__PURE__ */ __name((username) => {
    if (!servers || servers.length === 0) {
      toast.error("❌ Davet edebileceğiniz sunucu bulunmuyor");
      setDmContextMenu(null);
      return;
    }
    setInviteToServerModal({ username, isOpen: true });
    setDmContextMenu(null);
  }, "handleInviteToServer");
  const handleSendServerInvite = /* @__PURE__ */ __name(async (serverId, username) => {
    try {
      const res = await fetchWithAuth(`${apiUrl}/servers/${serverId}/invite/`, {
        method: "POST",
        body: JSON.stringify({ target_username: username })
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(`🎫 ${username} kullanıcısına davetiye gönderildi!`);
      } else {
        const data = await res.json();
        toast.error(`❌ ${data.error || "Davet gönderilemedi"}`);
      }
    } catch (error) {
      console.error("❌ Invite error:", error);
      toast.error("❌ Bağlantı hatası");
    }
    setInviteToServerModal(null);
  }, "handleSendServerInvite");
  const handleMuteUser = /* @__PURE__ */ __name(async (username, conversationId) => {
    try {
      const mutedUsers = JSON.parse(localStorage.getItem("mutedDMUsers") || "{}");
      if (mutedUsers[username]) {
        delete mutedUsers[username];
        localStorage.setItem("mutedDMUsers", JSON.stringify(mutedUsers));
        toast.success(`🔊 ${username} artık sessize alınmadı`);
      } else {
        mutedUsers[username] = { timestamp: Date.now(), conversationId };
        localStorage.setItem("mutedDMUsers", JSON.stringify(mutedUsers));
        toast.success(`🔇 ${username} sessize alındı. Bildirimleri almayacaksınız.`);
      }
    } catch (error) {
      console.error("❌ Mute error:", error);
      toast.error("❌ Sessize alma hatası");
    }
    setDmContextMenu(null);
  }, "handleMuteUser");
  const handlePinConversation = /* @__PURE__ */ __name(async (conversationId) => {
    try {
      const pinnedConvs = JSON.parse(localStorage.getItem("pinnedConversations") || "[]");
      if (pinnedConvs.includes(conversationId)) {
        const newPinned = pinnedConvs.filter((id) => id !== conversationId);
        localStorage.setItem("pinnedConversations", JSON.stringify(newPinned));
        toast.success("📌 Konuşma sabitleme kaldırıldı");
      } else {
        if (pinnedConvs.length >= 5) {
          toast.warning("⚠️ En fazla 5 konuşma sabitleyebilirsiniz");
        } else {
          pinnedConvs.push(conversationId);
          localStorage.setItem("pinnedConversations", JSON.stringify(pinnedConvs));
          toast.success("📌 Konuşma sabitlendi!");
        }
      }
    } catch (error) {
      console.error("❌ Pin error:", error);
      toast.error("❌ Sabitleme hatası");
    }
    setDmContextMenu(null);
  }, "handlePinConversation");
  const handleBlockUser = /* @__PURE__ */ __name(async (username) => {
    if (!confirm(`${username} kullanıcısını engellemek istediğinizden emin misiniz?`)) {
      return;
    }
    try {
      const res = await fetchWithAuth(`${apiUrl}/users/${username}/block/`, {
        method: "POST"
      });
      if (res.ok) {
        toast.success(`✅ ${username} engellendi!`);
      } else {
        toast.error("❌ Kullanıcı engellenemedi");
      }
    } catch (error) {
      console.error("❌ Block error:", error);
      toast.error("❌ Bağlantı hatası");
    }
    setDmContextMenu(null);
  }, "handleBlockUser");
  const handleAddFriend = /* @__PURE__ */ __name(async (username) => {
    try {
      const res = await fetchWithAuth(`${apiUrl}/friends/send/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
      });
      if (res.ok) {
        if (window.Notification && Notification.permission === "granted") {
          new Notification("Arkadaşlık İsteği Gönderildi", {
            body: `${username} kullanıcısına arkadaşlık isteği gönderildi!`,
            icon: "/logo192.png"
          });
        }
      } else {
        const error = await res.json();
        console.error(`❌ Arkadaşlık isteği hatası: ${error.error || "Bilinmeyen hata"}`);
      }
    } catch (error) {
      console.error("❌ Arkadaş ekleme hatası:", error);
    }
  }, "handleAddFriend");
  const handleRemoveFriend = /* @__PURE__ */ __name(async (username) => {
    try {
      const res = await fetchWithAuth(`${apiUrl}/friends/remove/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
      });
      if (res.ok) {
        if (window.Notification && Notification.permission === "granted") {
          new Notification("Arkadaş Çıkarıldı", {
            body: `${username} arkadaş listesinden çıkarıldı.`,
            icon: "/logo192.png"
          });
        }
      } else {
        const error = await res.json();
        console.error(`❌ Arkadaş çıkarma hatası: ${error.error || "Bilinmeyen hata"}`);
      }
    } catch (error) {
      console.error("❌ Arkadaş çıkarma hatası:", error);
    }
  }, "handleRemoveFriend");
  return {
    // Functions
    handleClearDM,
    handleHideDM,
    handleViewProfile,
    handleInviteToServer,
    handleSendServerInvite,
    handleMuteUser,
    handlePinConversation,
    handleBlockUser,
    handleAddFriend,
    handleRemoveFriend,
    // State
    dmContextMenu,
    setDmContextMenu,
    inviteToServerModal,
    setInviteToServerModal
  };
}, "useDMActions");
function injectRoomListAnimations() {
  if (typeof document === "undefined") return;
  if (document.head.querySelector("style[data-roomlist-animations]")) return;
  const styleSheet2 = document.createElement("style");
  styleSheet2.textContent = `
        /* Kanal Hover Efektleri */
        .channel-item {
            position: relative;
            overflow: hidden;
        }
        
        .channel-item::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 50%;
            background: linear-gradient(90deg, rgba(88, 101, 242, 0.4), transparent);
            transition: width 0.3s ease;
            border-radius: 0 4px 4px 0;
        }
        
        .channel-item:hover::before {
            width: 4px;
        }
        
        .channel-item:hover {
            background: rgba(255, 255, 255, 0.05) !important;
            color: #fff !important;
            transform: translateX(2px);
        }
        
        .channel-item.active {
            background: rgba(88, 101, 242, 0.15) !important;
            box-shadow: 0 2px 8px rgba(88, 101, 242, 0.2);
        }
        
        /* Voice Channel Özel Animasyonlar */
        .voice-channel.active {
            background: linear-gradient(90deg, rgba(67, 181, 129, 0.15), rgba(88, 101, 242, 0.1)) !important;
        }
        
        .voice-channel:hover {
            background: rgba(67, 181, 129, 0.08) !important;
        }
        
        /* Kullanıcı Listesi Fade-in Animasyonu */
        .channel-wrapper {
            animation: channelFadeIn 0.3s ease;
        }
        
        @keyframes channelFadeIn {
            from {
                opacity: 0;
                transform: translateY(-5px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Kanal İkon Pulse Animasyonu (Aktif Sesli Kanal için) */
        
    /* 💝 Developer Support Heart Animation */
    @keyframes heartPulse {
        0%, 100% { transform: scale(1); }
        25% { transform: scale(1.15); }
        50% { transform: scale(1); }
        75% { transform: scale(1.1); }
    }
    
    .voice-channel.active svg {
            animation: iconPulse 2s infinite;
        }
        
        @keyframes iconPulse {
            0%, 100% {
                transform: scale(1);
                opacity: 1;
            }
            50% {
                transform: scale(1.1);
                opacity: 0.8;
            }
        }
        
        /* Kullanıcı Sayısı Badge Pulse */
        .voice-channel.active > div > div:last-child {
            animation: badgePulse 1.5s infinite;
        }
        
        @keyframes badgePulse {
            0%, 100% {
                box-shadow: 0 0 0 0 rgba(67, 181, 129, 0.4);
            }
            50% {
                box-shadow: 0 0 0 4px rgba(67, 181, 129, 0);
            }
        }

        /* Context Menu Slide Animation */
        @keyframes contextMenuSlide {
            from {
                opacity: 0;
                transform: translateY(-8px) scale(0.96);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    `;
  styleSheet2.setAttribute("data-roomlist-animations", "true");
  document.head.appendChild(styleSheet2);
}
__name(injectRoomListAnimations, "injectRoomListAnimations");
injectRoomListAnimations();
const RoomList = /* @__PURE__ */ __name(({
  onFriendsClick,
  onWelcomeClick,
  isAdmin,
  categories: servers = [],
  conversations = [],
  currentRoom,
  currentConversationId,
  onRoomSelect,
  onDMSelect,
  joinVoiceChat,
  leaveVoiceChat,
  unreadCounts = {},
  // Hata koruması
  voiceUsers,
  currentUsername,
  currentUserProfile,
  currentVoiceRoom,
  remoteVolumes,
  setRemoteVolume,
  onProfileClick,
  onViewUserProfile,
  getDeterministicAvatar: getDeterministicAvatar2,
  isPttActive,
  setIsLeftSidebarVisible,
  apiBaseUrl,
  fetchWithAuth,
  activeChat,
  onOpenServerSettings,
  allUsers,
  onlineUsers,
  // ✨ EKLENDİ: Arkadaş kodu ve online durumu için gerekli
  friendsList = [],
  // 🔥 YENİ: Arkadaş listesi
  pendingFriendRequests = 0,
  // 🔥 YENİ: Bekleyen arkadaşlık istekleri sayısı
  toggleMute,
  toggleDeafened,
  isMuted,
  isDeafened,
  // 🎤 YENİ: Ses Kontrolleri
  isInVoice,
  isConnecting,
  toggleVideo,
  toggleScreenShare,
  isVideoEnabled,
  isScreenSharing,
  // 🎥 YENİ: Video/Ekran
  onServerDragStart,
  onServerDragOver,
  onServerDragEnd,
  onServerDrop,
  onMoveServer,
  // 🔥 YENİ: Drag & Drop
  updateAvailable = false,
  // 🔥 YENİ: Güncelleme durumu
  onUpdateClick,
  // 🔥 YENİ: Güncelleme butonu handler
  onOpenStore,
  // 🔥 YENİ: Mağaza modal'ı aç
  onOpenAnalytics,
  // 🔥 YENİ: Analytics panel aç
  onOpenAdminPanel,
  // 🔥 Admin Panel modal
  // 💰 Payment & Engagement System (2026-01-19)
  onOpenPaymentPanel,
  onOpenStoreModal,
  onOpenDailyRewards,
  onOpenAPIUsage,
  onOpenExportJobs,
  onOpenScheduledAnnouncements,
  // 🎮 New Features (2026-01-28)
  onOpenMiniGames,
  onOpenProjectCollaboration,
  onOpenAvatarStudio,
  onServerSelect
  // 🔥 YENİ: Sunucu seçildiğinde sağ panelde üyeleri göster
}) => {
  const safeUnreadCounts = unreadCounts || {};
  const apiUrl = `${apiBaseUrl}/api`;
  const getAvatarUrl = reactExports.useCallback((avatarPath, fallbackUsername) => {
    if (!avatarPath || typeof avatarPath !== "string") {
      return getDeterministicAvatar2(fallbackUsername);
    }
    if (avatarPath.startsWith("http://") || avatarPath.startsWith("https://") || avatarPath.startsWith("blob:")) {
      return avatarPath;
    }
    if (avatarPath.includes("ui-avatars.com")) return avatarPath;
    let path = avatarPath.startsWith("/") ? avatarPath : `/${avatarPath}`;
    return `${apiBaseUrl}${path}`;
  }, [apiBaseUrl, getDeterministicAvatar2]);
  const actualCurrentRoom = currentRoom || (activeChat?.type === "room" ? activeChat.id : null);
  const voiceRoomDisplayName = reactExports.useMemo(() => {
    if (!currentVoiceRoom) return "";
    for (const server of servers) {
      if (server.categories) {
        for (const cat of server.categories) {
          const foundRoom = cat.rooms?.find((r) => r.slug === currentVoiceRoom);
          if (foundRoom) return String(foundRoom.name);
        }
      }
    }
    return String(currentVoiceRoom);
  }, [currentVoiceRoom, servers]);
  const [inviteCodeInput, setInviteCodeInput] = reactExports.useState("");
  const [selectedServerId, setSelectedServerId] = reactExports.useState("home");
  const [collapsedCategories, setCollapsedCategories] = reactExports.useState({});
  const [draggedServerId, setDraggedServerId] = reactExports.useState(null);
  const [dropTargetIndex, setDropTargetIndex] = reactExports.useState(null);
  const [dropPosition, setDropPosition] = reactExports.useState(null);
  const [hoveredServerId, setHoveredServerId] = reactExports.useState(null);
  const [actionMenu, setActionMenu] = reactExports.useState(null);
  const [serverContextMenu, setServerContextMenu] = reactExports.useState(null);
  const [showDiscovery, setShowDiscovery] = reactExports.useState(false);
  const [showSupportModal, setShowSupportModal] = reactExports.useState(false);
  const [showAddMenu, setShowAddMenu] = reactExports.useState(false);
  const [isCreatingServer, setIsCreatingServer] = reactExports.useState(false);
  const [showInviteModal, setShowInviteModal] = reactExports.useState(false);
  const [inviteModalServer, setInviteModalServer] = reactExports.useState(null);
  const [showSavedMessages, setShowSavedMessages] = reactExports.useState(null);
  const [showScheduledMessages, setShowScheduledMessages] = reactExports.useState(false);
  const [showWebhooks, setShowWebhooks] = reactExports.useState(false);
  const [showModTools, setShowModTools] = reactExports.useState(false);
  const [showQuickActions, setShowQuickActions] = reactExports.useState(false);
  const [showAuditLogs, setShowAuditLogs] = reactExports.useState(false);
  const [showReports, setShowReports] = reactExports.useState(false);
  const [showVanityURL, setShowVanityURL] = reactExports.useState(false);
  const [showAutoResponder, setShowAutoResponder] = reactExports.useState(false);
  const [showChannelSettings, setShowChannelSettings] = reactExports.useState(false);
  const [selectedRoom, setSelectedRoom] = reactExports.useState(null);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = reactExports.useState(false);
  const [mutedServers, setMutedServers] = reactExports.useState(() => {
    const saved = localStorage.getItem("mutedServers");
    return saved ? JSON.parse(saved) : [];
  });
  const activeVoiceUsers = voiceUsers || {};
  const [dropTargetChannel, setDropTargetChannel] = reactExports.useState(null);
  const {
    publicServers,
    newCategoryName,
    setNewCategoryName,
    newRoomName,
    setNewRoomName,
    newRoomType,
    setNewRoomType,
    activeServerIdForCategory,
    setActiveServerIdForCategory,
    activeCategoryIdForRoom,
    setActiveCategoryIdForRoom,
    editingItemId,
    setEditingItemId,
    editName,
    setEditName,
    deleteServerModal,
    setDeleteServerModal,
    leaveServerModal,
    setLeaveServerModal,
    handleLeaveServer,
    executeLeaveServer,
    handleChangeServerIcon,
    handleChangeServerPrivacy,
    handleCopyServerInvite,
    handleCreateServer,
    handleCreateCategory,
    handleCreateRoom,
    handleRenameCategory,
    handleDeleteCategory,
    handleRenameRoom,
    handleDeleteRoom,
    handleMoveServer,
    handleMoveUserToChannel,
    handleKickUserFromChannel,
    handleOpenDiscovery,
    handleJoinServer,
    handleJoinViaCode
  } = useServerActions({
    apiUrl,
    fetchWithAuth,
    servers,
    currentUsername,
    selectedServerId,
    setSelectedServerId,
    onWelcomeClick,
    onMoveServer
  });
  const {
    dmContextMenu,
    setDmContextMenu,
    inviteToServerModal,
    setInviteToServerModal,
    handleClearDM,
    handleHideDM,
    handleViewProfile,
    handleInviteToServer,
    handleSendServerInvite,
    handleMuteUser,
    handlePinConversation,
    handleBlockUser,
    handleAddFriend,
    handleRemoveFriend
  } = useDMActions({
    apiUrl,
    fetchWithAuth,
    servers,
    onViewUserProfile
  });
  reactExports.useEffect(() => {
    if (activeChat && (activeChat.type === "welcome" || activeChat.type === "friends" || activeChat.type === "dm")) {
      setSelectedServerId("home");
    }
  }, [activeChat]);
  reactExports.useEffect(() => {
    const handleClickOutside = /* @__PURE__ */ __name(() => setDmContextMenu(null), "handleClickOutside");
    if (dmContextMenu) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [dmContextMenu]);
  const toggleCategory = /* @__PURE__ */ __name((id) => setCollapsedCategories((p) => ({ ...p, [id]: !p[id] })), "toggleCategory");
  const handleServerClick = /* @__PURE__ */ __name((server) => {
    setSelectedServerId(server.id);
    if (onServerSelect) {
      onServerSelect(server);
    }
  }, "handleServerClick");
  const handleOpenActionMenu = /* @__PURE__ */ __name((e, type, id, name) => {
    e.stopPropagation();
    setActionMenu({ type, id, name });
  }, "handleOpenActionMenu");
  const executeRename = /* @__PURE__ */ __name((e) => {
    e.preventDefault();
    if (actionMenu.type === "category") {
      setEditingItemId(`cat-${actionMenu.id}`);
      setEditName(actionMenu.name);
    } else {
      setEditingItemId(`room-${actionMenu.id}`);
      setEditName(actionMenu.name);
    }
    setActionMenu(null);
  }, "executeRename");
  const executeDelete = /* @__PURE__ */ __name((e) => {
    if (actionMenu.type === "category") handleDeleteCategory(e, actionMenu.id);
    else handleDeleteRoom(e, actionMenu.id);
    setActionMenu(null);
  }, "executeDelete");
  const executeSettings = /* @__PURE__ */ __name((e) => {
    e.preventDefault();
    if (actionMenu.type === "room") {
      let foundRoom = null;
      let foundServerId = null;
      servers?.forEach((server) => {
        server.categories?.forEach((category) => {
          if (category.rooms) {
            const room = category.rooms.find((ch) => ch.slug === actionMenu.id);
            if (room) {
              foundRoom = { ...room, server_id: server.id, category_id: category.id };
              foundServerId = server.id;
            }
          }
        });
      });
      if (foundRoom) {
        setSelectedRoom(foundRoom);
        setSelectedServerId(foundServerId);
        setShowChannelSettings(true);
      } else {
        console.error("❌ Kanal bulunamadı:", actionMenu.id);
        toast.error("Kanal ayarları açılırken bir hata oluştu. Kanal bulunamadı.");
      }
    }
    setActionMenu(null);
  }, "executeSettings");
  const handleServerContextMenu = /* @__PURE__ */ __name((e, server) => {
    e.preventDefault();
    e.stopPropagation();
    const isOwner = server.owner_username === currentUsername;
    setServerContextMenu({
      x: e.clientX,
      y: e.clientY,
      server,
      isOwner
    });
  }, "handleServerContextMenu");
  const handleServerDragStartWrapper = /* @__PURE__ */ __name((e, serverId, index) => {
    setDraggedServerId(serverId);
    if (onServerDragStart) onServerDragStart(e, serverId, index);
  }, "handleServerDragStartWrapper");
  const handleServerDragOverWrapper = /* @__PURE__ */ __name((e, index) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseY = e.clientY;
    const elementMiddle = rect.top + rect.height / 2;
    const position = mouseY < elementMiddle ? "before" : "after";
    setDropTargetIndex(index);
    setDropPosition(position);
    if (onServerDragOver) onServerDragOver(e);
  }, "handleServerDragOverWrapper");
  const handleServerDragEndWrapper = /* @__PURE__ */ __name((e) => {
    setDraggedServerId(null);
    setDropTargetIndex(null);
    setDropPosition(null);
    if (onServerDragEnd) onServerDragEnd(e);
  }, "handleServerDragEndWrapper");
  const handleServerDropWrapper = /* @__PURE__ */ __name((e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseY = e.clientY;
    const elementMiddle = rect.top + rect.height / 2;
    const position = mouseY < elementMiddle ? "before" : "after";
    setDropTargetIndex(null);
    setDropPosition(null);
    setDraggedServerId(null);
    if (onServerDrop) {
      const actualTargetIndex = position === "after" ? index + 1 : index;
      onServerDrop(e, actualTargetIndex);
    }
  }, "handleServerDropWrapper");
  const handleCreateInvite = /* @__PURE__ */ __name((e, server) => {
    e.stopPropagation();
    setInviteModalServer(server);
    setShowInviteModal(true);
  }, "handleCreateInvite");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", width: "100%", height: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ActionMenuModal, { actionMenu, onClose: /* @__PURE__ */ __name(() => setActionMenu(null), "onClose"), onRename: executeRename, onDelete: executeDelete, onSettings: executeSettings }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SupportModal, { isOpen: showSupportModal, onClose: /* @__PURE__ */ __name(() => setShowSupportModal(false), "onClose") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$6.serverRail, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", display: "flex", alignItems: "center", width: "100%", justifyContent: "center", marginBottom: "8px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          position: "absolute",
          left: 0,
          width: "4px",
          height: selectedServerId === "home" ? "40px" : hoveredServerId === "home" ? "20px" : "0px",
          backgroundColor: "#fff",
          borderRadius: "0 4px 4px 0",
          transition: "height 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              ...styles$6.serverIcon,
              backgroundColor: selectedServerId === "home" ? "#5865f2" : "#313338",
              borderRadius: selectedServerId === "home" || hoveredServerId === "home" ? "16px" : "50%",
              width: "48px",
              height: "48px",
              marginBottom: 0,
              transition: "border-radius 0.3s ease, background-color 0.3s ease"
            },
            onClick: /* @__PURE__ */ __name(() => {
              setSelectedServerId("home");
              onWelcomeClick();
            }, "onClick"),
            onMouseEnter: /* @__PURE__ */ __name(() => setHoveredServerId("home"), "onMouseEnter"),
            onMouseLeave: /* @__PURE__ */ __name(() => setHoveredServerId(null), "onMouseLeave"),
            title: "Ana Sayfa",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://media.pawscord.com/assets/logo.png", alt: "Pawscord", style: { width: "32px", height: "32px", objectFit: "contain" }, onError: /* @__PURE__ */ __name((e) => {
              e.target.style.display = "none";
            }, "onError") })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$6.separator }),
      servers && servers.map((server, index) => {
        const initials = server.name.substring(0, 2).toUpperCase();
        const isActive = selectedServerId === server.id;
        const isDragging = draggedServerId === server.id;
        const isDropTarget = dropTargetIndex === index && !isDragging;
        const serverUnread = Object.keys(safeUnreadCounts).filter((k) => k.startsWith(`room-`) && server.categories?.some((cat) => cat.rooms?.some((r) => `room-${r.slug}` === k))).reduce((sum, k) => sum + (safeUnreadCounts[k] || 0), 0);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              position: "relative",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "center"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                position: "absolute",
                left: 0,
                width: "4px",
                height: isActive ? "40px" : hoveredServerId === server.id ? "20px" : serverUnread > 0 ? "8px" : "0px",
                backgroundColor: "#fff",
                borderRadius: "0 4px 4px 0",
                transition: "height 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
              } }),
              isDropTarget && dropPosition === "before" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                position: "absolute",
                top: "-4px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "40px",
                height: "3px",
                backgroundColor: "#43b581",
                borderRadius: "2px",
                zIndex: 1e3,
                boxShadow: "0 0 8px rgba(67, 181, 129, 0.6)"
              } }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  draggable: true,
                  onDragStart: /* @__PURE__ */ __name((e) => handleServerDragStartWrapper(e, server.id, index), "onDragStart"),
                  onDragOver: /* @__PURE__ */ __name((e) => handleServerDragOverWrapper(e, index), "onDragOver"),
                  onDragEnd: handleServerDragEndWrapper,
                  onDrop: /* @__PURE__ */ __name((e) => handleServerDropWrapper(e, index), "onDrop"),
                  style: {
                    ...styles$6.serverIcon,
                    backgroundColor: isActive ? "#5865f2" : hoveredServerId === server.id ? "#5865f2" : "#313338",
                    borderRadius: isActive || hoveredServerId === server.id ? "16px" : "50%",
                    cursor: isDragging ? "grabbing" : "grab",
                    position: "relative",
                    transition: "border-radius 0.3s ease, background-color 0.3s ease, opacity 0.2s ease, transform 0.1s ease",
                    opacity: isDragging ? 0.4 : 1,
                    marginBottom: 0
                  },
                  onClick: /* @__PURE__ */ __name(() => handleServerClick(server), "onClick"),
                  onContextMenu: /* @__PURE__ */ __name((e) => handleServerContextMenu(e, server), "onContextMenu"),
                  onMouseEnter: /* @__PURE__ */ __name(() => setHoveredServerId(server.id), "onMouseEnter"),
                  onMouseLeave: /* @__PURE__ */ __name(() => setHoveredServerId(null), "onMouseLeave"),
                  onMouseDown: /* @__PURE__ */ __name((e) => {
                    e.currentTarget.style.cursor = "grabbing";
                    e.currentTarget.style.transform = "scale(0.95)";
                  }, "onMouseDown"),
                  onMouseUp: /* @__PURE__ */ __name((e) => {
                    e.currentTarget.style.cursor = "grab";
                    e.currentTarget.style.transform = "scale(1)";
                  }, "onMouseUp"),
                  title: server.name,
                  children: [
                    server.icon ? /* @__PURE__ */ jsxRuntimeExports.jsx(LazyImage, { src: server.icon, alt: server.name, style: { width: "100%", height: "100%", borderRadius: "inherit", objectFit: "cover" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontWeight: "bold", fontSize: "14px", color: "white" }, children: initials }),
                    serverUnread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$6.serverBadge, children: serverUnread > 99 ? "99+" : serverUnread })
                  ]
                }
              ),
              isDropTarget && dropPosition === "after" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                position: "absolute",
                bottom: "-4px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "40px",
                height: "3px",
                backgroundColor: "#43b581",
                borderRadius: "2px",
                zIndex: 1e3,
                boxShadow: "0 0 8px rgba(67, 181, 129, 0.6)"
              } })
            ]
          },
          server.id
        );
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            ...styles$6.serverIcon,
            backgroundColor: hoveredServerId === "discover" ? "#23a559" : "#313338",
            color: hoveredServerId === "discover" ? "white" : "#23a559",
            marginTop: "10px",
            borderRadius: hoveredServerId === "discover" ? "16px" : "50%",
            transition: "border-radius 0.3s ease, background-color 0.3s ease, color 0.3s ease"
          },
          onClick: /* @__PURE__ */ __name(() => {
            setShowDiscovery(true);
            handleOpenDiscovery();
          }, "onClick"),
          onMouseEnter: /* @__PURE__ */ __name(() => setHoveredServerId("discover"), "onMouseEnter"),
          onMouseLeave: /* @__PURE__ */ __name(() => setHoveredServerId(null), "onMouseLeave"),
          title: "Sunucu Keşfet",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCompass, { size: 24 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            ...styles$6.serverIcon,
            background: hoveredServerId === "store" ? "linear-gradient(135deg, #F1C40F 0%, #F39C12 100%)" : "#313338",
            color: hoveredServerId === "store" ? "#000" : "#F1C40F",
            fontWeight: "bold",
            cursor: "pointer",
            borderRadius: hoveredServerId === "store" ? "16px" : "50%",
            transition: "border-radius 0.3s ease, background 0.3s ease, color 0.3s ease"
          },
          onClick: onOpenStore,
          onMouseEnter: /* @__PURE__ */ __name(() => setHoveredServerId("store"), "onMouseEnter"),
          onMouseLeave: /* @__PURE__ */ __name(() => setHoveredServerId(null), "onMouseLeave"),
          title: "Premium Mağaza",
          children: "🛒"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            ...styles$6.serverIcon,
            backgroundColor: hoveredServerId === "add" ? "#23a559" : "#313338",
            color: hoveredServerId === "add" ? "white" : "#23a559",
            borderRadius: hoveredServerId === "add" ? "16px" : "50%",
            transition: "border-radius 0.3s ease, background-color 0.3s ease, color 0.3s ease"
          },
          onClick: /* @__PURE__ */ __name(() => setShowAddMenu(true), "onClick"),
          onMouseEnter: /* @__PURE__ */ __name(() => setHoveredServerId("add"), "onMouseEnter"),
          onMouseLeave: /* @__PURE__ */ __name(() => setHoveredServerId(null), "onMouseLeave"),
          title: "Ekle",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, { size: 20 })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$6.sidebar, children: [
      selectedServerId === "home" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$6.topSection, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$6.headerTitle, children: "Ana Sayfa" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$6.channelsContainer, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles$6.roomItem, marginBottom: 5 }, onClick: /* @__PURE__ */ __name(() => onRoomSelect("ai"), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$6.channelContent, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, { style: { marginRight: 8 } }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "PawPaw AI" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles$6.roomItem, marginBottom: 15 }, onClick: /* @__PURE__ */ __name(() => onRoomSelect("sinyal-bot"), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$6.channelContent, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, { style: { marginRight: 8 } }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sinyal Bot" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$6.dmListContainer, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$6.groupHeader, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ÖZEL MESAJLAR" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onFriendsClick, style: { ...styles$6.addDmButton, position: "relative" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserFriends, {}),
              " Ekle",
              pendingFriendRequests > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                position: "absolute",
                top: "-6px",
                right: "-6px",
                backgroundColor: "#ed4245",
                color: "white",
                borderRadius: "50%",
                width: "18px",
                height: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: "bold",
                border: "2px solid #2b2d31",
                zIndex: 1
              }, children: pendingFriendRequests > 9 ? "9+" : pendingFriendRequests })
            ] })
          ] }),
          !conversations || conversations.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            padding: "20px",
            textAlign: "center",
            color: "#72767d",
            fontSize: "0.9em"
          }, children: [
            "Henüz özel mesaj yok.",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Arkadaş ekle butonuna tıklayarak başla!"
          ] }) : conversations.map((conv) => {
            const otherUser = conv.participants.find((p) => p.username !== currentUsername);
            if (!otherUser) return null;
            const unread = safeUnreadCounts[`dm-${conv.id}`] || 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  ...styles$6.dmItem,
                  backgroundColor: currentConversationId === conv.id ? "rgba(255,255,255,0.1)" : "transparent",
                  position: "relative"
                },
                onClick: /* @__PURE__ */ __name(() => onDMSelect(conv.id, otherUser.username), "onClick"),
                onContextMenu: /* @__PURE__ */ __name((e) => {
                  e.preventDefault();
                  setDmContextMenu({
                    x: e.clientX,
                    y: e.clientY,
                    conversation: conv
                  });
                }, "onContextMenu"),
                onDragOver: /* @__PURE__ */ __name((e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.currentTarget.style.backgroundColor = "rgba(88, 101, 242, 0.3)";
                }, "onDragOver"),
                onDragLeave: /* @__PURE__ */ __name((e) => {
                  e.preventDefault();
                  e.currentTarget.style.backgroundColor = currentConversationId === conv.id ? "rgba(255,255,255,0.1)" : "transparent";
                }, "onDragLeave"),
                onDrop: /* @__PURE__ */ __name((e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.currentTarget.style.backgroundColor = currentConversationId === conv.id ? "rgba(255,255,255,0.1)" : "transparent";
                  const files = e.dataTransfer.files;
                  if (files && files.length > 0) {
                    onDMSelect(conv.id, otherUser.username);
                    setTimeout(() => {
                      const fileInput = document.querySelector('input[type="file"]');
                      if (fileInput) {
                        const dt = new DataTransfer();
                        for (let i = 0; i < files.length; i++) {
                          dt.items.add(files[i]);
                        }
                        fileInput.files = dt.files;
                        fileInput.dispatchEvent(new Event("change", { bubbles: true }));
                      }
                    }, 100);
                    toast.success(`📎 ${files.length} dosya ${otherUser.username}'a gönderiliyor...`);
                  }
                }, "onDrop"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", width: 32, height: 32 }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LazyImage, { src: getAvatarUrl(otherUser.avatar, otherUser.username), style: { ...styles$6.avatarSmall, width: 32, height: 32 }, alt: "" }),
                    (() => {
                      const isOnline = onlineUsers.includes(otherUser.username);
                      const statusColor = isOnline ? "#23a559" : "#80848e";
                      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                        position: "absolute",
                        bottom: -2,
                        right: -2,
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: statusColor,
                        border: "2px solid #2b2d31"
                      } });
                    })()
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column", marginLeft: 8, overflow: "hidden" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontWeight: unread ? "bold" : "normal", color: "#dbdee1" }, children: otherUser.username }),
                    (() => {
                      const liveUser = allUsers?.find((u) => u.username === otherUser.username) || otherUser;
                      const activity = liveUser.current_activity;
                      if (!activity) return null;
                      const els = [];
                      if (activity.steam) {
                        els.push(
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: "10px", color: "#66c0f4", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: [
                            "🎮 ",
                            activity.steam.name
                          ] }, "steam")
                        );
                      }
                      if (activity.spotify) {
                        els.push(
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: "10px", color: "#1db954", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: [
                            "🎵 ",
                            activity.spotify.name
                          ] }, "spotify")
                        );
                      }
                      if (els.length === 0) {
                        if (activity.type === "listening") {
                          els.push(/* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: "10px", color: "#1db954", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: [
                            "🎵 ",
                            activity.name
                          ] }, "leg-sp"));
                        } else if (activity.type === "playing") {
                          els.push(/* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: "10px", color: "#66c0f4", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: [
                            "🎮 ",
                            activity.name
                          ] }, "leg-st"));
                        }
                      }
                      return els;
                    })()
                  ] }),
                  unread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles$6.unreadBadge, children: unread })
                ]
              },
              conv.id
            );
          })
        ] })
      ] }),
      selectedServerId !== "home" && servers && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$6.topSection, children: servers.filter((s) => s.id === selectedServerId).map((server) => {
        const isOwner = server.owner_username === currentUsername || isAdmin;
        const canManage = isOwner || server.my_permissions?.is_owner;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$6.serverHeader, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: server.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "5px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: styles$6.iconBtn, onClick: /* @__PURE__ */ __name((e) => handleCreateInvite(e, server), "onClick"), title: "Davet Linki", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserPlus, {}) }),
              isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: styles$6.iconBtn, onClick: /* @__PURE__ */ __name((e) => {
                e.stopPropagation();
                setActiveServerIdForCategory(server.id);
              }, "onClick"), title: "Kategori Ekle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}) }),
              canManage && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  style: styles$6.iconBtn,
                  onClick: /* @__PURE__ */ __name((e) => {
                    e.stopPropagation();
                    if (onOpenServerSettings) onOpenServerSettings(server);
                  }, "onClick"),
                  title: "Sunucu Ayarları",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCog, {})
                }
              )
            ] })
          ] }),
          activeServerIdForCategory === server.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: /* @__PURE__ */ __name((e) => handleCreateCategory(e, server.id), "onSubmit"), style: styles$6.addCategoryForm, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { autoFocus: true, placeholder: "Kategori Adı...", value: newCategoryName, onChange: /* @__PURE__ */ __name((e) => setNewCategoryName(e.target.value), "onChange"), style: styles$6.addRoomInput }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$6.addRoomControls, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", style: styles$6.addRoomButton, children: "Ekle" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: /* @__PURE__ */ __name(() => setActiveServerIdForCategory(null), "onClick"), style: { ...styles$6.addRoomButton, background: "#da373c" }, children: "X" })
            ] })
          ] }),
          server.categories && server.categories.map((cat) => {
            const isCollapsed = collapsedCategories[cat.id];
            const isEditingThisCat = editingItemId === `cat-${cat.id}`;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 5 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$6.categoryHeader, onClick: /* @__PURE__ */ __name(() => toggleCategory(cat.id), "onClick"), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
                  isCollapsed ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaChevronRight, { size: 9 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaChevronDown, { size: 9 }),
                  isEditingThisCat ? /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: /* @__PURE__ */ __name((e) => handleRenameCategory(e, cat.id), "onSubmit"), onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), style: { marginLeft: 5 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { autoFocus: true, value: editName, onChange: /* @__PURE__ */ __name((e) => setEditName(e.target.value), "onChange"), onBlur: /* @__PURE__ */ __name(() => setEditingItemId(null), "onBlur"), style: styles$6.inlineInput }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginLeft: 5 }, children: cat.name })
                ] }),
                isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginLeft: "auto", display: "flex", gap: "5px" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: styles$6.iconBtn, onClick: /* @__PURE__ */ __name((e) => handleOpenActionMenu(e, "category", cat.id, cat.name), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCog, { size: 10 }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: styles$6.iconBtn, onClick: /* @__PURE__ */ __name((e) => {
                    e.stopPropagation();
                    setActiveCategoryIdForRoom(cat.id);
                  }, "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, { size: 10 }) })
                ] })
              ] }),
              activeCategoryIdForRoom === cat.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: /* @__PURE__ */ __name((e) => handleCreateRoom(e, cat.id), "onSubmit"), style: { padding: "5px 10px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { autoFocus: true, placeholder: "Kanal Adı...", value: newRoomName, onChange: /* @__PURE__ */ __name((e) => setNewRoomName(e.target.value), "onChange"), style: styles$6.addRoomInput }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: newRoomType, onChange: /* @__PURE__ */ __name((e) => setNewRoomType(e.target.value), "onChange"), style: styles$6.channelTypeSelect, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "text", children: "📝 Metin" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "voice", children: "🎤 Sesli" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "kanban", children: "📋 Kanban Board" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$6.addRoomControls, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", style: styles$6.addRoomButton, children: "Ekle" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: /* @__PURE__ */ __name(() => setActiveCategoryIdForRoom(null), "onClick"), style: { ...styles$6.addRoomButton, background: "#da373c" }, children: "X" })
                ] })
              ] }),
              !isCollapsed && cat.rooms && cat.rooms.map((room) => {
                const isActive = currentVoiceRoom === room.slug;
                const unread = safeUnreadCounts[`room-${room.slug}`] || 0;
                const isVoice = room.channel_type === "voice";
                const isEditingThisRoom = editingItemId === `room-${room.slug}`;
                const userCount = isVoice && activeVoiceUsers[room.slug] ? activeVoiceUsers[room.slug].length : 0;
                room.is_locked || room.is_private;
                isVoice && room.user_limit && userCount >= room.user_limit;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "channel-wrapper", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: `channel-item ${isVoice ? "voice-channel" : "text-channel"} ${isActive ? "active" : ""} ${dropTargetChannel === room.slug ? "voice-channel-drop-target" : ""}`,
                      style: {
                        ...styles$6.roomItem,
                        marginLeft: 8,
                        backgroundColor: dropTargetChannel === room.slug ? "rgba(88, 101, 242, 0.2)" : isActive ? "rgba(88, 101, 242, 0.15)" : "transparent",
                        color: isActive ? "#fff" : "#949ba4",
                        borderLeft: dropTargetChannel === room.slug ? "3px solid #5865f2" : isActive ? "3px solid #5865f2" : "3px solid transparent",
                        paddingLeft: isActive ? "5px" : "8px",
                        transition: "all 0.2s ease",
                        borderRadius: "6px",
                        margin: "2px 8px",
                        position: "relative",
                        ...dropTargetChannel === room.slug ? {
                          boxShadow: "inset 0 0 12px rgba(88, 101, 242, 0.15), 0 0 8px rgba(88, 101, 242, 0.2)",
                          border: "1px dashed rgba(88, 101, 242, 0.5)"
                        } : {}
                      },
                      onClick: /* @__PURE__ */ __name(() => {
                        if (isVoice) joinVoiceChat(room.slug);
                        else onRoomSelect(room.slug);
                      }, "onClick"),
                      onDragOver: /* @__PURE__ */ __name((e) => {
                        if (!isVoice) return;
                        e.preventDefault();
                        e.dataTransfer.dropEffect = "move";
                        setDropTargetChannel(room.slug);
                      }, "onDragOver"),
                      onDragLeave: /* @__PURE__ */ __name((e) => {
                        if (dropTargetChannel === room.slug) {
                          setDropTargetChannel(null);
                        }
                      }, "onDragLeave"),
                      onDrop: /* @__PURE__ */ __name((e) => {
                        e.preventDefault();
                        setDropTargetChannel(null);
                        if (!isVoice || !isAdmin) return;
                        try {
                          const data = JSON.parse(e.dataTransfer.getData("application/json"));
                          if (data.username && data.fromChannel && data.fromChannel !== room.slug) {
                            handleMoveUserToChannel(data.username, data.fromChannel, room.slug);
                          }
                        } catch (err) {
                          console.error("Drop error:", err);
                        }
                      }, "onDrop"),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$6.channelContent, children: [
                          isVoice && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            FaVolumeUp,
                            {
                              style: {
                                ...styles$6.voiceIcon,
                                color: isActive ? "#43b581" : "#949ba4",
                                transition: "color 0.2s ease"
                              }
                            }
                          ),
                          !isVoice && /* @__PURE__ */ jsxRuntimeExports.jsx(FaCog, { style: { ...styles$6.hashtagIcon, fontSize: "0.9em" } }),
                          isEditingThisRoom ? /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: /* @__PURE__ */ __name((e) => handleRenameRoom(e, room.slug), "onSubmit"), onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), style: { flex: 1 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { autoFocus: true, value: editName, onChange: /* @__PURE__ */ __name((e) => setEditName(e.target.value), "onChange"), onBlur: /* @__PURE__ */ __name(() => setEditingItemId(null), "onBlur"), style: styles$6.inlineInput }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: {
                            ...styles$6.channelNameText,
                            paddingLeft: "5px",
                            fontWeight: isActive ? "600" : "normal",
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: "6px"
                          }, children: [
                            room.name,
                            room.is_private && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "0.7em", color: "#faa61a", border: "1px solid #faa61a", borderRadius: "3px", padding: "1px 4px" }, children: "🔒" }),
                            room.is_nsfw && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "0.7em", color: "#f04747", border: "1px solid #f04747", borderRadius: "3px", padding: "1px 4px" }, children: "18+" }),
                            room.is_locked && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "0.7em", color: "#949ba4", border: "1px solid #949ba4", borderRadius: "3px", padding: "1px 4px" }, children: "🔐" }),
                            room.admin_only_chat && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "0.7em", color: "#43b581", border: "1px solid #43b581", borderRadius: "3px", padding: "1px 4px" }, children: "📢" })
                          ] }),
                          isVoice && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: {
                            fontSize: "0.75em",
                            color: userCount > 0 ? "#43b581" : "#72767d",
                            fontWeight: "500",
                            marginLeft: "auto",
                            marginRight: "4px"
                          }, children: [
                            "(",
                            userCount,
                            "/",
                            room.user_limit > 0 ? room.user_limit : "∞",
                            ")"
                          ] })
                        ] }),
                        isOwner && !isEditingThisRoom && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: "3px", marginLeft: "5px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: styles$6.iconBtn, onClick: /* @__PURE__ */ __name((e) => handleOpenActionMenu(e, "room", room.slug, room.name), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCog, { size: 12 }) }) }),
                        unread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles$6.unreadBadge, children: unread })
                      ]
                    }
                  ),
                  isVoice && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                    marginLeft: "28px",
                    marginTop: "2px",
                    marginBottom: "2px",
                    // backgroundColor: kaldırıldı - şeffaf olacak
                    padding: "0",
                    // Padding kaldırıldı
                    position: "relative",
                    // Context menu için
                    zIndex: 1
                  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    VoiceUserList$1,
                    {
                      voiceUsers: activeVoiceUsers,
                      roomName: room.slug,
                      currentUsername,
                      remoteVolumes,
                      setRemoteVolume,
                      isClientInThisChannel: currentVoiceRoom === room.slug,
                      isPttActive,
                      isAdmin,
                      voiceChannels: cat.rooms.filter((r) => r.is_voice),
                      friendsList,
                      getDeterministicAvatar: getDeterministicAvatar2,
                      allUsers,
                      onUserAction: /* @__PURE__ */ __name((action, username, targetChannel) => {
                        if (action === "profile") {
                          onViewUserProfile?.(username);
                        } else if (action === "message" || action === "dm") {
                          const conversation = conversations.find(
                            (c) => c.participants.some((p) => p.username === username)
                          );
                          if (conversation) {
                            onDMSelect(conversation.id, username);
                          }
                        } else if (action === "add_friend") {
                          handleAddFriend(username);
                        } else if (action === "remove_friend") {
                          handleRemoveFriend(username);
                        } else if (action === "mute_local") ;
                        else if (action === "move" && targetChannel) {
                          handleMoveUserToChannel(username, room.slug, targetChannel);
                        } else if (action === "kick") {
                          handleKickUserFromChannel(username, room.slug);
                        } else ;
                      }, "onUserAction")
                    }
                  ) })
                ] }, room.id);
              })
            ] }, cat.id);
          })
        ] }, server.id);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AddServerModal, { isOpen: showAddMenu, onClose: /* @__PURE__ */ __name(() => setShowAddMenu(false), "onClose"), onCreateServer: handleCreateServer }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$6.bottomSection, children: [
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: onOpenAdminPanel,
            style: {
              width: "100%",
              padding: "12px",
              marginBottom: "10px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              borderRadius: "8px",
              color: "white",
              fontWeight: "600",
              fontSize: "0.95em",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)"
            },
            onMouseEnter: /* @__PURE__ */ __name((e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
            }, "onMouseEnter"),
            onMouseLeave: /* @__PURE__ */ __name((e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
            }, "onMouseLeave"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaCog, { size: 16 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Admin Panel" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          display: "flex",
          gap: "5px",
          marginBottom: "10px",
          padding: "5px",
          backgroundColor: "#1e1f22",
          borderRadius: "8px",
          overflowX: "auto",
          scrollbarWidth: "thin"
        }, children: [
          onOpenPaymentPanel && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onOpenPaymentPanel, style: {
            minWidth: "36px",
            width: "36px",
            height: "36px",
            padding: "0",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            cursor: "pointer",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }, title: "💰 Payment Panel", onMouseEnter: /* @__PURE__ */ __name((e) => e.target.style.transform = "scale(1.1)", "onMouseEnter"), onMouseLeave: /* @__PURE__ */ __name((e) => e.target.style.transform = "scale(1)", "onMouseLeave"), children: "💰" }),
          onOpenStoreModal && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onOpenStoreModal, style: {
            minWidth: "36px",
            width: "36px",
            height: "36px",
            padding: "0",
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            cursor: "pointer",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }, title: "🛒 Store", onMouseEnter: /* @__PURE__ */ __name((e) => e.target.style.transform = "scale(1.1)", "onMouseEnter"), onMouseLeave: /* @__PURE__ */ __name((e) => e.target.style.transform = "scale(1)", "onMouseLeave"), children: "🛒" }),
          onOpenDailyRewards && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onOpenDailyRewards, style: {
            minWidth: "36px",
            width: "36px",
            height: "36px",
            padding: "0",
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            cursor: "pointer",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }, title: "🎁 Daily Rewards", onMouseEnter: /* @__PURE__ */ __name((e) => e.target.style.transform = "scale(1.1)", "onMouseEnter"), onMouseLeave: /* @__PURE__ */ __name((e) => e.target.style.transform = "scale(1)", "onMouseLeave"), children: "🎁" }),
          onOpenAPIUsage && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onOpenAPIUsage, style: {
            minWidth: "36px",
            width: "36px",
            height: "36px",
            padding: "0",
            background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            cursor: "pointer",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }, title: "📊 API Usage", onMouseEnter: /* @__PURE__ */ __name((e) => e.target.style.transform = "scale(1.1)", "onMouseEnter"), onMouseLeave: /* @__PURE__ */ __name((e) => e.target.style.transform = "scale(1)", "onMouseLeave"), children: "📊" }),
          onOpenExportJobs && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onOpenExportJobs, style: {
            minWidth: "36px",
            width: "36px",
            height: "36px",
            padding: "0",
            background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            cursor: "pointer",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }, title: "📥 Export Jobs", onMouseEnter: /* @__PURE__ */ __name((e) => e.target.style.transform = "scale(1.1)", "onMouseEnter"), onMouseLeave: /* @__PURE__ */ __name((e) => e.target.style.transform = "scale(1)", "onMouseLeave"), children: "📥" }),
          onOpenScheduledAnnouncements && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onOpenScheduledAnnouncements, style: {
            minWidth: "36px",
            width: "36px",
            height: "36px",
            padding: "0",
            background: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            cursor: "pointer",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }, title: "📢 Scheduled Announcements", onMouseEnter: /* @__PURE__ */ __name((e) => e.target.style.transform = "scale(1.1)", "onMouseEnter"), onMouseLeave: /* @__PURE__ */ __name((e) => e.target.style.transform = "scale(1)", "onMouseLeave"), children: "📢" }),
          onOpenMiniGames && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onOpenMiniGames, style: {
            minWidth: "36px",
            width: "36px",
            height: "36px",
            padding: "0",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            cursor: "pointer",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }, title: "🎮 Mini Games", onMouseEnter: /* @__PURE__ */ __name((e) => e.target.style.transform = "scale(1.1)", "onMouseEnter"), onMouseLeave: /* @__PURE__ */ __name((e) => e.target.style.transform = "scale(1)", "onMouseLeave"), children: "🎮" }),
          onOpenProjectCollaboration && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onOpenProjectCollaboration, style: {
            minWidth: "36px",
            width: "36px",
            height: "36px",
            padding: "0",
            background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            cursor: "pointer",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }, title: "📂 Projects", onMouseEnter: /* @__PURE__ */ __name((e) => e.target.style.transform = "scale(1.1)", "onMouseEnter"), onMouseLeave: /* @__PURE__ */ __name((e) => e.target.style.transform = "scale(1)", "onMouseLeave"), children: "📂" }),
          onOpenAvatarStudio && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onOpenAvatarStudio, style: {
            minWidth: "36px",
            width: "36px",
            height: "36px",
            padding: "0",
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            cursor: "pointer",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }, title: "🎨 Avatar Studio", onMouseEnter: /* @__PURE__ */ __name((e) => e.target.style.transform = "scale(1.1)", "onMouseEnter"), onMouseLeave: /* @__PURE__ */ __name((e) => e.target.style.transform = "scale(1)", "onMouseLeave"), children: "🎨" })
        ] }),
        (isInVoice || isConnecting) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          padding: "8px",
          backgroundColor: "#232428",
          borderTop: "1px solid #1e1f22",
          borderBottom: "1px solid #1e1f22"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "8px",
            padding: "0 4px"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: getAvatarUrl(currentUserProfile?.avatar, currentUsername),
                  alt: currentUsername,
                  style: {
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: "2px solid #23a559",
                    boxShadow: "0 0 8px rgba(35, 165, 89, 0.5)"
                  },
                  onError: /* @__PURE__ */ __name((e) => {
                    e.target.onerror = null;
                    e.target.src = getDeterministicAvatar2(currentUsername);
                  }, "onError")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                position: "absolute",
                bottom: "-2px",
                right: "-2px",
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                backgroundColor: isMuted ? "#f04747" : "#23a559",
                border: "2px solid #232428",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "8px"
              }, children: isMuted ? "🔇" : "🎤" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, overflow: "hidden" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: isConnecting ? "#eba61e" : "#23a559", fontWeight: "bold", fontSize: "0.8em" }, children: isConnecting ? "Bağlanılıyor..." : "Ses Bağlandı" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "0.7em", color: "#b9bbbe", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: [
                voiceRoomDisplayName,
                " / Genel"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            display: "flex",
            justifyContent: "space-between",
            gap: "5px"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: /* @__PURE__ */ __name((e) => {
                  e.stopPropagation();
                  toggleVideo();
                }, "onClick"),
                style: {
                  flex: 1,
                  background: isVideoEnabled ? "#23a559" : "#2b2d31",
                  border: "none",
                  color: "white",
                  padding: "8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s"
                },
                title: isVideoEnabled ? "Kamerayı Kapat" : "Kamerayı Aç",
                children: isVideoEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaFilm, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaVideoSlash, { size: 16 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: /* @__PURE__ */ __name((e) => {
                  e.stopPropagation();
                  toggleScreenShare();
                }, "onClick"),
                style: {
                  flex: 1,
                  background: isScreenSharing ? "#23a559" : "#2b2d31",
                  border: "none",
                  color: "white",
                  padding: "8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s"
                },
                title: isScreenSharing ? "Paylaşımı Durdur" : "Ekran Paylaş",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaDesktop, { size: 16 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: /* @__PURE__ */ __name((e) => {
                  e.stopPropagation();
                  toggleMute();
                }, "onClick"),
                style: {
                  flex: 1,
                  background: isMuted ? "#da373c" : "#2b2d31",
                  border: "none",
                  color: "white",
                  padding: "8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s"
                },
                title: isMuted ? "Sesi Aç" : "Sessize Al",
                children: isMuted ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaMicrophoneSlash, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaMicrophone, { size: 16 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: /* @__PURE__ */ __name((e) => {
                  e.stopPropagation();
                  toggleDeafened();
                }, "onClick"),
                style: {
                  flex: 1,
                  background: isDeafened ? "#da373c" : "#2b2d31",
                  border: "none",
                  color: "white",
                  padding: "8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s"
                },
                title: isDeafened ? "Duy" : "Sağırlaştır",
                children: isDeafened ? /* @__PURE__ */ jsxRuntimeExports.jsx(TbHeadphonesOff, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaHeadphones, { size: 16 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: /* @__PURE__ */ __name((e) => {
                  e.stopPropagation();
                  window.dispatchEvent(new CustomEvent("openVoiceSettings"));
                }, "onClick"),
                style: {
                  flex: 1,
                  background: "#2b2d31",
                  border: "none",
                  color: "white",
                  padding: "8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s"
                },
                title: "Ses Ayarları",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCog, { size: 16 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: /* @__PURE__ */ __name((e) => {
                  e.stopPropagation();
                  if (typeof leaveVoiceChat === "function") {
                    leaveVoiceChat();
                  } else {
                    console.error("leaveVoiceChat is not a function");
                  }
                }, "onClick"),
                style: {
                  flex: 1,
                  background: "#da373c",
                  border: "none",
                  color: "white",
                  padding: "8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s"
                },
                title: "Sesli Kanaldan Çık",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaPhoneSlash, { size: 16 })
              }
            )
          ] })
        ] }),
        !(isInVoice || isConnecting) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            onClick: /* @__PURE__ */ __name(() => setShowSupportModal(true), "onClick"),
            style: {
              backgroundColor: "#1e1f22",
              padding: isInVoice || isConnecting ? "6px 10px" : "10px 14px",
              margin: "0 8px 8px 8px",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: isInVoice || isConnecting ? "8px" : "12px",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              border: "1px solid transparent",
              background: "linear-gradient(135deg, rgba(235, 69, 158, 0.06) 0%, rgba(88, 101, 242, 0.06) 100%)",
              overflow: "hidden",
              flexShrink: 0,
              minHeight: isInVoice || isConnecting ? "36px" : "44px"
            },
            onMouseEnter: /* @__PURE__ */ __name((e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(235, 69, 158, 0.12) 0%, rgba(88, 101, 242, 0.12) 100%)";
              e.currentTarget.style.borderColor = "#eb459e";
              e.currentTarget.style.transform = "scale(1.01)";
            }, "onMouseEnter"),
            onMouseLeave: /* @__PURE__ */ __name((e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(235, 69, 158, 0.06) 0%, rgba(88, 101, 242, 0.06) 100%)";
              e.currentTarget.style.borderColor = "transparent";
              e.currentTarget.style.transform = "scale(1)";
            }, "onMouseLeave"),
            title: "Geliştiriciye Destek Ol",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaHeart, { style: {
                color: "#eb459e",
                fontSize: isInVoice || isConnecting ? "14px" : "18px",
                flexShrink: 0,
                animation: "heartPulse 2s ease-in-out infinite"
              } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, textAlign: "left", overflow: "hidden" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                color: "white",
                fontWeight: "600",
                fontSize: isInVoice || isConnecting ? "11px" : "13px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }, children: isInVoice || isConnecting ? "Destekle" : "Developer'ı Destekle" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                background: "linear-gradient(135deg, rgba(235, 69, 158, 0.2) 0%, rgba(88, 101, 242, 0.2) 100%)",
                padding: isInVoice || isConnecting ? "2px 6px" : "4px 8px",
                borderRadius: "10px",
                fontSize: isInVoice || isConnecting ? "10px" : "12px",
                color: "#eb459e",
                fontWeight: "bold",
                flexShrink: 0
              }, children: "☕" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          UserFooter,
          {
            currentUserProfile,
            currentUsername,
            getDeterministicAvatar: getDeterministicAvatar2,
            onProfileClick,
            updateAvailable,
            onUpdateClick
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DiscoveryModal, { isOpen: showDiscovery, onClose: /* @__PURE__ */ __name(() => setShowDiscovery(false), "onClose"), publicServers, onJoinServer: handleJoinServer, onJoinViaCode: handleJoinViaCode }),
    showInviteModal && inviteModalServer && /* @__PURE__ */ jsxRuntimeExports.jsx(
      InviteModal,
      {
        onClose: /* @__PURE__ */ __name(() => {
          setShowInviteModal(false);
          setInviteModalServer(null);
        }, "onClose"),
        server: inviteModalServer,
        fetchWithAuth,
        apiBaseUrl: apiUrl,
        currentUser: currentUsername
      }
    ),
    showSavedMessages && reactDomExports.createPortal(
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SavedMessagesModal,
        {
          type: showSavedMessages,
          onClose: /* @__PURE__ */ __name(() => setShowSavedMessages(null), "onClose"),
          fetchWithAuth,
          apiBaseUrl
        }
      ),
      document.body
    ),
    showScheduledMessages && reactDomExports.createPortal(
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ScheduledMessageModal,
        {
          room: actualCurrentRoom,
          conversation: currentConversationId,
          onClose: /* @__PURE__ */ __name(() => setShowScheduledMessages(false), "onClose"),
          fetchWithAuth,
          apiBaseUrl
        }
      ),
      document.body
    ),
    showWebhooks && reactDomExports.createPortal(
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        WebhookManager,
        {
          serverId: selectedServerId,
          onClose: /* @__PURE__ */ __name(() => setShowWebhooks(false), "onClose"),
          fetchWithAuth,
          apiBaseUrl
        }
      ),
      document.body
    ),
    showModTools && reactDomExports.createPortal(
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ModeratorTools,
        {
          serverId: selectedServerId,
          onClose: /* @__PURE__ */ __name(() => setShowModTools(false), "onClose"),
          fetchWithAuth,
          apiBaseUrl
        }
      ),
      document.body
    ),
    showQuickActions && reactDomExports.createPortal(
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        QuickActionsMenu$1,
        {
          onClose: /* @__PURE__ */ __name(() => setShowQuickActions(false), "onClose"),
          onOpenWebhooks: /* @__PURE__ */ __name(() => {
            setShowQuickActions(false);
            setShowWebhooks(true);
          }, "onOpenWebhooks"),
          onOpenAuditLogs: /* @__PURE__ */ __name(() => {
            setShowQuickActions(false);
            setShowAuditLogs(true);
          }, "onOpenAuditLogs"),
          onOpenReports: /* @__PURE__ */ __name(() => {
            setShowQuickActions(false);
            setShowReports(true);
          }, "onOpenReports"),
          onOpenVanityURL: /* @__PURE__ */ __name(() => {
            setShowQuickActions(false);
            setShowVanityURL(true);
          }, "onOpenVanityURL"),
          onOpenAutoResponder: /* @__PURE__ */ __name(() => {
            setShowQuickActions(false);
            setShowAutoResponder(true);
          }, "onOpenAutoResponder")
        }
      ),
      document.body
    ),
    showAuditLogs && reactDomExports.createPortal(
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AuditLogViewer,
        {
          serverId: selectedServerId,
          onClose: /* @__PURE__ */ __name(() => setShowAuditLogs(false), "onClose"),
          fetchWithAuth,
          apiBaseUrl
        }
      ),
      document.body
    ),
    showReports && reactDomExports.createPortal(
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ReportsViewer$1,
        {
          serverId: selectedServerId,
          onClose: /* @__PURE__ */ __name(() => setShowReports(false), "onClose"),
          fetchWithAuth,
          apiBaseUrl
        }
      ),
      document.body
    ),
    showVanityURL && reactDomExports.createPortal(
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        VanityURLManager,
        {
          serverId: selectedServerId,
          onClose: /* @__PURE__ */ __name(() => setShowVanityURL(false), "onClose"),
          fetchWithAuth,
          apiBaseUrl
        }
      ),
      document.body
    ),
    showAutoResponder && reactDomExports.createPortal(
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AutoResponderManager,
        {
          serverId: selectedServerId,
          onClose: /* @__PURE__ */ __name(() => setShowAutoResponder(false), "onClose"),
          fetchWithAuth,
          apiBaseUrl
        }
      ),
      document.body
    ),
    serverContextMenu && reactDomExports.createPortal(
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ServerContextMenu$1,
        {
          x: serverContextMenu.x,
          y: serverContextMenu.y,
          server: serverContextMenu.server,
          isOwner: serverContextMenu.isOwner,
          onClose: /* @__PURE__ */ __name(() => setServerContextMenu(null), "onClose"),
          onLeaveServer: /* @__PURE__ */ __name(() => handleLeaveServer(serverContextMenu.server.id), "onLeaveServer"),
          onServerSettings: /* @__PURE__ */ __name(() => {
            onOpenServerSettings(serverContextMenu.server);
            setServerContextMenu(null);
          }, "onServerSettings"),
          onMuteServer: /* @__PURE__ */ __name(() => {
            const serverId = serverContextMenu.server.id;
            setMutedServers((prev) => {
              const updated = [...prev, serverId];
              localStorage.setItem("mutedServers", JSON.stringify(updated));
              return updated;
            });
            setServerContextMenu(null);
          }, "onMuteServer"),
          onUnmuteServer: /* @__PURE__ */ __name(() => {
            const serverId = serverContextMenu.server.id;
            setMutedServers((prev) => {
              const updated = prev.filter((id) => id !== serverId);
              localStorage.setItem("mutedServers", JSON.stringify(updated));
              return updated;
            });
            setServerContextMenu(null);
          }, "onUnmuteServer"),
          onMoveUp: /* @__PURE__ */ __name(() => handleMoveServer(serverContextMenu.server.id, "up"), "onMoveUp"),
          onMoveDown: /* @__PURE__ */ __name(() => handleMoveServer(serverContextMenu.server.id, "down"), "onMoveDown"),
          onCopyInvite: /* @__PURE__ */ __name(() => handleCopyServerInvite(serverContextMenu.server.id), "onCopyInvite"),
          onChangeIcon: /* @__PURE__ */ __name(() => {
            handleChangeServerIcon(serverContextMenu.server.id);
            setServerContextMenu(null);
          }, "onChangeIcon"),
          onChangePrivacy: /* @__PURE__ */ __name(() => {
            handleChangeServerPrivacy(serverContextMenu.server.id);
            setServerContextMenu(null);
          }, "onChangePrivacy"),
          onDeleteServer: /* @__PURE__ */ __name(async () => {
            serverContextMenu.server.id;
            serverContextMenu.server.name;
            setDeleteServerModal({
              server: serverContextMenu.server,
              isOpen: true
            });
            setServerContextMenu(null);
          }, "onDeleteServer"),
          canMoveUp: servers && servers.findIndex((s) => s.id === serverContextMenu.server.id) > 0,
          canMoveDown: servers && servers.findIndex((s) => s.id === serverContextMenu.server.id) < servers.length - 1,
          isMuted: mutedServers.includes(serverContextMenu.server.id)
        }
      ),
      document.body
    ),
    dmContextMenu && reactDomExports.createPortal(
      (() => {
        const otherUser = dmContextMenu.conversation.participants.find((p) => p.username !== currentUsername);
        if (!otherUser) return null;
        const menuItems = [
          {
            icon: "👤",
            label: "Profili Görüntüle",
            color: "#dbdee1",
            onClick: /* @__PURE__ */ __name(() => handleViewProfile(otherUser.username), "onClick"),
            divider: false
          },
          {
            icon: "💬",
            label: "Mesaj Gönder",
            color: "#dbdee1",
            onClick: /* @__PURE__ */ __name(() => {
              const otherParticipant = dmContextMenu.conversation.participants?.find((p) => p.username !== currentUsername);
              onDMSelect(dmContextMenu.conversation.id, otherParticipant?.username);
              setDmContextMenu(null);
            }, "onClick"),
            divider: true
          },
          {
            icon: "🎫",
            label: "Sunucuya Davet Et",
            color: "#5865f2",
            onClick: /* @__PURE__ */ __name(() => handleInviteToServer(otherUser.username), "onClick"),
            divider: false
          },
          {
            icon: "📌",
            label: "Konuşmayı Sabitle",
            color: "#dbdee1",
            onClick: /* @__PURE__ */ __name(() => handlePinConversation(dmContextMenu.conversation.id), "onClick"),
            divider: true
          },
          {
            icon: "🔇",
            label: "Sessize Al",
            color: "#b9bbbe",
            onClick: /* @__PURE__ */ __name(() => handleMuteUser(otherUser.username, dmContextMenu.conversation.id), "onClick"),
            divider: false
          },
          {
            icon: "👁️‍🗨️",
            label: "Konuşmayı Gizle",
            color: "#b9bbbe",
            onClick: /* @__PURE__ */ __name(() => handleHideDM(dmContextMenu.conversation.id), "onClick"),
            divider: true
          },
          {
            icon: "🗑️",
            label: "Konuşmayı Temizle",
            color: "#f23f42",
            onClick: /* @__PURE__ */ __name(() => handleClearDM(dmContextMenu.conversation.id), "onClick"),
            divider: false
          },
          {
            icon: "🚫",
            label: "Kullanıcıyı Engelle",
            color: "#ed4245",
            onClick: /* @__PURE__ */ __name(() => handleBlockUser(otherUser.username), "onClick"),
            divider: false
          }
        ];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"),
            style: {
              position: "fixed",
              top: dmContextMenu.y,
              left: dmContextMenu.x,
              backgroundColor: "#111214",
              border: "1px solid #2b2d31",
              borderRadius: "8px",
              minWidth: "220px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4), 0 0 1px rgba(0,0,0,0.5)",
              zIndex: 999999,
              overflow: "hidden",
              animation: "contextMenuSlide 0.1s ease-out"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                padding: "12px",
                backgroundColor: "#1e1f22",
                borderBottom: "1px solid #2b2d31",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: getAvatarUrl(otherUser.avatar, otherUser.username),
                    style: {
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      objectFit: "cover"
                    },
                    alt: ""
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, overflow: "hidden" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                    color: "#f2f3f5",
                    fontSize: "14px",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }, children: otherUser.username }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                    color: "#b9bbbe",
                    fontSize: "12px",
                    marginTop: "2px"
                  }, children: onlineUsers.includes(otherUser.username) ? "🟢 Çevrimiçi" : "⚫ Çevrimdışı" })
                ] })
              ] }),
              menuItems.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(React.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    onClick: item.onClick,
                    style: {
                      padding: "10px 12px",
                      cursor: "pointer",
                      color: item.color,
                      fontSize: "14px",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      transition: "all 0.1s ease",
                      backgroundColor: "transparent"
                    },
                    onMouseEnter: /* @__PURE__ */ __name((e) => {
                      e.currentTarget.style.backgroundColor = item.color === "#f23f42" || item.color === "#ed4245" ? "rgba(237, 66, 69, 0.15)" : "rgba(88, 101, 242, 0.1)";
                      e.currentTarget.style.paddingLeft = "16px";
                    }, "onMouseEnter"),
                    onMouseLeave: /* @__PURE__ */ __name((e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.paddingLeft = "12px";
                    }, "onMouseLeave"),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "16px", width: "20px", textAlign: "center" }, children: item.icon }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { flex: 1 }, children: item.label })
                    ]
                  }
                ),
                item.divider && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                  height: "1px",
                  backgroundColor: "#2b2d31",
                  margin: "4px 8px"
                } })
              ] }, index))
            ]
          }
        );
      })(),
      document.body
    ),
    deleteServerModal?.isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmModal,
      {
        isOpen: deleteServerModal.isOpen,
        onClose: /* @__PURE__ */ __name(() => setDeleteServerModal(null), "onClose"),
        onConfirm: /* @__PURE__ */ __name(async () => {
          const serverId = deleteServerModal.server.id;
          const serverName = deleteServerModal.server.name;
          try {
            const response = await fetchWithAuth(`${apiUrl}/servers/${serverId}/delete/`, {
              method: "DELETE"
            });
            if (response.ok) {
              toast.success(`"${serverName}" sunucusu başarıyla silindi!`, 5e3);
              setSelectedServerId("home");
              onWelcomeClick();
            } else {
              const error = await response.json();
              console.error("❌ Sunucu silinirken hata:", error);
              toast.error(`Hata: ${error.error || "Sunucu silinirken bir hata oluştu"}`);
            }
          } catch (error) {
            console.error("❌ Sunucu silme hatası:", error);
            toast.error("Sunucu silinirken bir hata oluştu. Lütfen tekrar deneyin.");
          }
        }, "onConfirm"),
        title: "⚠️ Sunucuyu Sil",
        message: `"${deleteServerModal.server.name}" sunucusunu KALİCİ OLARAK silmek üzeresiniz!`,
        confirmText: "Sunucuyu Sil",
        cancelText: "İptal",
        type: "danger",
        requireTextConfirmation: true,
        confirmationText: deleteServerModal.server.name,
        inputPlaceholder: `Onaylamak için "${deleteServerModal.server.name}" yazın...`,
        dangerDetails: [
          "Sunucudaki TÜM kanallar silinecek",
          "Sunucudaki TÜM mesajlar silinecek",
          "TÜM üyeler atılacak",
          "Tüm roller ve ayarlar silinecek"
        ]
      }
    ),
    leaveServerModal?.isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmModal,
      {
        isOpen: leaveServerModal.isOpen,
        onClose: /* @__PURE__ */ __name(() => setLeaveServerModal(null), "onClose"),
        onConfirm: /* @__PURE__ */ __name(async () => {
          await executeLeaveServer(leaveServerModal.server.id);
        }, "onConfirm"),
        title: "🚪 Sunucudan Ayrıl",
        message: `"${leaveServerModal.server.name}" sunucusundan ayrılmak istediğinize emin misiniz?`,
        confirmText: "Ayrıl",
        cancelText: "Vazgeç",
        type: "warning",
        dangerDetails: [
          "Sunucudaki mesajlarınız silinmeyecek",
          "Tekrar katılmak için davet almanız gerekecek",
          "Sunucuyla ilgili tüm bildirimler duracak"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InviteToServerModal, { inviteToServerModal, servers, onSendInvite: handleSendServerInvite, onClose: /* @__PURE__ */ __name(() => setInviteToServerModal(null), "onClose") }),
    showChannelSettings && selectedRoom && (() => {
      const currentServer = servers?.find((s) => s.id === selectedRoom.server_id);
      const serverRoles = currentServer?.roles || [];
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        ChannelSettingsModal,
        {
          room: selectedRoom,
          serverId: selectedRoom.server_id || selectedServerId,
          serverRoles,
          onClose: /* @__PURE__ */ __name(() => {
            setShowChannelSettings(false);
            setSelectedRoom(null);
          }, "onClose"),
          onUpdate: /* @__PURE__ */ __name((updatedRoom) => {
            setShowChannelSettings(false);
            setSelectedRoom(null);
          }, "onUpdate"),
          fetchWithAuth,
          apiBaseUrl
        }
      );
    })()
  ] });
}, "RoomList");
const RoomList_default = React.memo(RoomList);
export {
  RoomList_default as default
};
