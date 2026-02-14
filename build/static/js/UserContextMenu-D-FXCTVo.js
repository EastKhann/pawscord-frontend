var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, f as ReactDOM, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { C as FaUser, ac as FaComments, K as FaArrowRight, ay as FaBan, au as FaVolumeMute, b9 as FaUserShield } from "./icons-vendor-2VDeY8fW.js";
const UserContextMenu = /* @__PURE__ */ __name(({
  x,
  y,
  user,
  currentUser,
  onClose,
  onAction,
  voiceChannels = [],
  isAdmin = false,
  isInVoiceRoom = false,
  friendsList = [],
  conversationId = null
  // 🔥 YENİ: DM conversation ID
}) => {
  const menuRef = reactExports.useRef(null);
  const [showMoveSubmenu, setShowMoveSubmenu] = reactExports.useState(false);
  const [focusedIndex, setFocusedIndex] = reactExports.useState(0);
  const isFriend = friendsList && friendsList.length > 0 && friendsList.some((f) => {
    const friendUsername = f.username || f.sender_username || f.receiver_username || f.display_name || f.friend?.username;
    const targetUsername = user.username || user.display_name;
    return friendUsername === targetUsername && friendUsername !== currentUser.username;
  });
  const handleAction = reactExports.useCallback((action, extraData = null) => {
    onAction(action, user, extraData);
    onClose();
  }, [onAction, user, onClose]);
  reactExports.useEffect(() => {
    const handleClickOutside = /* @__PURE__ */ __name((e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    }, "handleClickOutside");
    const handleKeyDown = /* @__PURE__ */ __name((e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((prev) => Math.min(prev + 1, getMenuItemCount() - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        triggerFocusedAction();
      }
    }, "handleKeyDown");
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    if (menuRef.current) {
      menuRef.current.focus();
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
  const getMenuItemCount = /* @__PURE__ */ __name(() => {
    let count = 2;
    if (isInVoiceRoom) count += 1;
    if (isAdmin && isInVoiceRoom) count += 3;
    return count;
  }, "getMenuItemCount");
  const triggerFocusedAction = /* @__PURE__ */ __name(() => {
    const actions = ["profile", "message"];
    if (isInVoiceRoom) actions.push("volume");
    if (isAdmin && isInVoiceRoom) {
      actions.push("move", "kick", "server_mute");
    }
    if (actions[focusedIndex]) {
      handleAction(actions[focusedIndex]);
    }
  }, "triggerFocusedAction");
  const adjustedX = Math.min(x, window.innerWidth - 220);
  const adjustedY = Math.min(y, window.innerHeight - 300);
  const portalRoot = document.getElementById("portal-root");
  if (!portalRoot) return null;
  return ReactDOM.createPortal(
    /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2147483646,
            background: "transparent",
            pointerEvents: "auto"
          },
          onClick: onClose
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          ref: menuRef,
          role: "menu",
          "aria-label": `${user} için eylemler`,
          tabIndex: -1,
          style: {
            ...styles.menu,
            left: `${adjustedX}px`,
            top: `${adjustedY}px`,
            zIndex: 2147483647,
            position: "fixed",
            pointerEvents: "auto"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                role: "menuitem",
                tabIndex: 0,
                className: "user-context-menu-item",
                style: {
                  ...styles.menuItem,
                  background: focusedIndex === 0 ? "rgba(88, 101, 242, 0.2)" : "transparent"
                },
                onClick: /* @__PURE__ */ __name(() => handleAction("profile"), "onClick"),
                onMouseEnter: /* @__PURE__ */ __name(() => setFocusedIndex(0), "onMouseEnter"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FaUser, {}),
                  " Profili Görüntüle"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                role: "menuitem",
                tabIndex: 0,
                className: "user-context-menu-item",
                style: {
                  ...styles.menuItem,
                  background: focusedIndex === 1 ? "rgba(88, 101, 242, 0.2)" : "transparent"
                },
                onClick: /* @__PURE__ */ __name(() => handleAction("message"), "onClick"),
                onMouseEnter: /* @__PURE__ */ __name(() => setFocusedIndex(1), "onMouseEnter"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FaComments, {}),
                  " Mesaj Gönder"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                role: "menuitem",
                tabIndex: 0,
                className: "user-context-menu-item",
                style: {
                  ...styles.menuItem,
                  background: focusedIndex === 2 ? "rgba(88, 101, 242, 0.2)" : "transparent"
                },
                onClick: /* @__PURE__ */ __name(() => handleAction("invite_to_server"), "onClick"),
                onMouseEnter: /* @__PURE__ */ __name(() => setFocusedIndex(2), "onMouseEnter"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FaArrowRight, {}),
                  " Sunucuya Davet Et"
                ]
              }
            ),
            isFriend ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                role: "menuitem",
                tabIndex: 0,
                className: "user-context-menu-item-danger",
                style: {
                  ...styles.menuItemDanger,
                  background: focusedIndex === 3 ? "rgba(237, 66, 69, 0.15)" : "transparent"
                },
                onClick: /* @__PURE__ */ __name(() => handleAction("remove_friend"), "onClick"),
                onMouseEnter: /* @__PURE__ */ __name(() => setFocusedIndex(3), "onMouseEnter"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FaBan, {}),
                  " Arkadaşlıktan Çıkar"
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                role: "menuitem",
                tabIndex: 0,
                className: "user-context-menu-item",
                style: {
                  ...styles.menuItem,
                  background: focusedIndex === 3 ? "rgba(88, 101, 242, 0.2)" : "transparent"
                },
                onClick: /* @__PURE__ */ __name(() => handleAction("add_friend"), "onClick"),
                onMouseEnter: /* @__PURE__ */ __name(() => setFocusedIndex(3), "onMouseEnter"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FaUser, {}),
                  " Arkadaş Ekle"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { role: "separator", style: styles.separator }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                role: "menuitem",
                tabIndex: 0,
                className: "user-context-menu-item",
                style: {
                  ...styles.menuItem,
                  background: focusedIndex === 4 ? "rgba(88, 101, 242, 0.2)" : "transparent"
                },
                onClick: /* @__PURE__ */ __name(() => handleAction("mute_user"), "onClick"),
                onMouseEnter: /* @__PURE__ */ __name(() => setFocusedIndex(4), "onMouseEnter"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FaVolumeMute, {}),
                  " Sessize Al"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                role: "menuitem",
                tabIndex: 0,
                className: "user-context-menu-item-danger",
                style: {
                  ...styles.menuItemDanger,
                  background: focusedIndex === 5 ? "rgba(237, 66, 69, 0.15)" : "transparent"
                },
                onClick: /* @__PURE__ */ __name(() => handleAction("block_user"), "onClick"),
                onMouseEnter: /* @__PURE__ */ __name(() => setFocusedIndex(5), "onMouseEnter"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FaBan, {}),
                  " Kullanıcıyı Engelle"
                ]
              }
            ),
            isAdmin && isInVoiceRoom && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { role: "separator", style: styles.separator }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.sectionTitle, "aria-label": "Moderasyon seçenekleri", children: "Moderasyon" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  role: "menuitem",
                  tabIndex: 0,
                  "aria-haspopup": "true",
                  "aria-expanded": showMoveSubmenu,
                  className: "user-context-menu-item",
                  style: {
                    ...styles.menuItem,
                    background: focusedIndex === 4 ? "rgba(88, 101, 242, 0.2)" : "transparent"
                  },
                  onMouseEnter: /* @__PURE__ */ __name(() => {
                    setShowMoveSubmenu(true);
                    setFocusedIndex(4);
                  }, "onMouseEnter"),
                  onMouseLeave: /* @__PURE__ */ __name(() => setShowMoveSubmenu(false), "onMouseLeave"),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FaArrowRight, {}),
                    " Kanala Taşı",
                    showMoveSubmenu && voiceChannels.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { role: "menu", "aria-label": "Hedef kanallar", style: styles.submenu, children: voiceChannels.map((channel) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        role: "menuitem",
                        tabIndex: 0,
                        className: "user-context-submenu-item",
                        style: styles.submenuItem,
                        onClick: /* @__PURE__ */ __name((e) => {
                          e.stopPropagation();
                          handleAction("move", channel.slug);
                        }, "onClick"),
                        children: channel.name
                      },
                      channel.slug
                    )) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  role: "menuitem",
                  tabIndex: 0,
                  className: "user-context-menu-item-danger",
                  style: {
                    ...styles.menuItemDanger,
                    background: focusedIndex === 5 ? "rgba(237, 66, 69, 0.15)" : "transparent"
                  },
                  onClick: /* @__PURE__ */ __name(() => handleAction("kick"), "onClick"),
                  onMouseEnter: /* @__PURE__ */ __name(() => setFocusedIndex(5), "onMouseEnter"),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FaBan, {}),
                    " Kanaldan At"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  role: "menuitem",
                  tabIndex: 0,
                  className: "user-context-menu-item",
                  style: {
                    ...styles.menuItem,
                    background: focusedIndex === 6 ? "rgba(88, 101, 242, 0.2)" : "transparent"
                  },
                  onClick: /* @__PURE__ */ __name(() => handleAction("server_mute"), "onClick"),
                  onMouseEnter: /* @__PURE__ */ __name(() => setFocusedIndex(6), "onMouseEnter"),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserShield, {}),
                    " Mikrofonu Kapat (Server)"
                  ]
                }
              )
            ] })
          ]
        }
      )
    ] }),
    portalRoot
    // 🔥 Portal target
  );
}, "UserContextMenu");
const styles = {
  menu: {
    background: "#2b2d31",
    borderRadius: "4px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.5)",
    minWidth: "200px",
    padding: "6px 0",
    color: "#dbdee1",
    fontSize: "14px",
    border: "1px solid #1e1f22"
    // position ve zIndex inline style'da tanımlı
  },
  menuItem: {
    padding: "8px 12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "background 0.1s",
    position: "relative"
  },
  menuItemDanger: {
    padding: "8px 12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "background 0.1s",
    color: "#ed4245",
    position: "relative"
  },
  separator: {
    height: "1px",
    background: "#1e1f22",
    margin: "6px 0"
  },
  sectionTitle: {
    fontSize: "11px",
    textTransform: "uppercase",
    color: "#72767d",
    padding: "6px 12px 4px",
    fontWeight: "600"
  },
  submenu: {
    position: "absolute",
    left: "100%",
    top: 0,
    background: "#2b2d31",
    borderRadius: "4px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.5)",
    minWidth: "180px",
    padding: "6px 0",
    border: "1px solid #1e1f22",
    marginLeft: "4px"
  },
  submenuItem: {
    padding: "8px 12px",
    cursor: "pointer",
    transition: "background 0.1s"
  }
};
if (!document.getElementById("user-context-menu-styles")) {
  const styleSheet = document.createElement("style");
  styleSheet.id = "user-context-menu-styles";
  styleSheet.textContent = `
        .user-context-menu-item:hover {
            background: rgba(88, 101, 242, 0.3) !important;
        }
        .user-context-menu-item-danger:hover {
            background: rgba(237, 66, 69, 0.2) !important;
        }
        .user-context-submenu-item:hover {
            background: rgba(88, 101, 242, 0.3) !important;
        }
        
        /* ✨ Keyboard Navigation Focus Styles */
        .user-context-menu-item:focus,
        .user-context-menu-item-danger:focus,
        .user-context-submenu-item:focus {
            outline: 2px solid rgba(88, 101, 242, 0.8);
            outline-offset: -2px;
        }
        
        /* ✨ Menu Container Focus */
        [role="menu"]:focus {
            outline: none;
        }
        
        /* ✨ Smooth Transitions */
        .user-context-menu-item,
        .user-context-menu-item-danger,
        .user-context-submenu-item {
            transition: background 0.15s ease, outline 0.15s ease;
        }
    `;
  document.head.appendChild(styleSheet);
}
const UserContextMenu$1 = reactExports.memo(UserContextMenu);
export {
  UserContextMenu$1 as default
};
