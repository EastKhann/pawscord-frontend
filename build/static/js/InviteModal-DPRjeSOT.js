var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports, f as ReactDOM } from "./react-core-BiY6fgAJ.js";
import { t as FaSearch, a6 as FaUserFriends, a9 as FaCheck, j as FaLink, c as FaSync, aF as FaHashtag, a as FaTimes } from "./icons-vendor-2VDeY8fW.js";
import { P as PRODUCTION_URL, t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const injectInviteStyles = /* @__PURE__ */ __name(() => {
  if (typeof document === "undefined") return;
  const id = "invite-modal-styles";
  if (document.getElementById(id)) return;
  const tag = document.createElement("style");
  tag.id = id;
  tag.textContent = `
        .invite-friend-item:hover { background: rgba(88, 101, 242, 0.06) !important; }
        @keyframes inviteSpin { to { transform: rotate(360deg); } }
    `;
  document.head.appendChild(tag);
}, "injectInviteStyles");
const st = {
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
    zIndex: 99999,
    backdropFilter: "blur(4px)"
  },
  modal: {
    backgroundColor: "#313338",
    borderRadius: "12px",
    width: "460px",
    maxWidth: "92vw",
    maxHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
    overflow: "hidden",
    animation: "contextMenuIn 0.15s ease-out"
  },
  header: {
    padding: "20px 20px 8px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "4px"
  },
  serverLabel: {
    color: "#b5bac1",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.02em"
  },
  title: {
    margin: 0,
    color: "#f2f3f5",
    fontSize: "18px",
    fontWeight: "700"
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#b5bac1",
    cursor: "pointer",
    fontSize: "18px",
    padding: "4px",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  searchWrap: {
    padding: "8px 20px 4px 20px"
  },
  searchBox: {
    backgroundColor: "#1e1f22",
    borderRadius: "8px",
    padding: "0 12px",
    display: "flex",
    alignItems: "center"
  },
  searchIcon: {
    color: "#6d6f78",
    marginRight: "10px",
    fontSize: "14px",
    flexShrink: 0
  },
  searchInput: {
    backgroundColor: "transparent",
    border: "none",
    color: "#f2f3f5",
    padding: "10px 0",
    flex: 1,
    outline: "none",
    fontSize: "14px"
  },
  friendList: {
    flex: 1,
    overflowY: "auto",
    padding: "8px 12px",
    minHeight: "120px",
    maxHeight: "280px"
  },
  friendItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 10px",
    borderRadius: "8px",
    transition: "background 0.15s",
    cursor: "default"
  },
  friendInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minWidth: 0
  },
  friendAvatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#5865f2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flexShrink: 0
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  avatarLetter: {
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600"
  },
  friendName: {
    color: "#f2f3f5",
    fontSize: "14px",
    fontWeight: "500",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  inviteBtn: {
    padding: "6px 16px",
    backgroundColor: "transparent",
    border: "1px solid #248046",
    color: "#2dc770",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    transition: "all 0.15s",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    flexShrink: 0
  },
  inviteBtnSent: {
    border: "1px solid #4e5058",
    color: "#b5bac1",
    cursor: "default",
    backgroundColor: "transparent"
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px 20px",
    gap: "4px"
  },
  emptyText: {
    color: "#6d6f78",
    fontSize: "14px",
    textAlign: "center"
  },
  spinner: {
    width: "20px",
    height: "20px",
    border: "2px solid #4e5058",
    borderTopColor: "#5865f2",
    borderRadius: "50%",
    animation: "inviteSpin 0.6s linear infinite"
  },
  linkSection: {
    backgroundColor: "#2b2d31",
    padding: "16px 20px",
    borderTop: "1px solid rgba(255,255,255,0.04)"
  },
  linkLabel: {
    color: "#b5bac1",
    fontSize: "11px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.02em",
    marginBottom: "10px"
  },
  linkBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#1e1f22",
    borderRadius: "8px",
    padding: "4px 4px 4px 12px",
    minHeight: "44px"
  },
  linkInputWrap: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    minWidth: 0
  },
  linkInput: {
    flex: 1,
    backgroundColor: "transparent",
    border: "none",
    color: "#00a8fc",
    fontSize: "13px",
    outline: "none",
    textOverflow: "ellipsis",
    minWidth: 0
  },
  linkLoading: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flex: 1,
    padding: "4px 0"
  },
  linkError: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    padding: "4px 0"
  },
  copyBtn: {
    padding: "8px 16px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "4px",
    color: "white",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    transition: "background 0.15s",
    whiteSpace: "nowrap",
    flexShrink: 0
  },
  copyBtnDone: {
    backgroundColor: "#248046"
  },
  retryBtn: {
    padding: "6px 12px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "4px",
    color: "white",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "500"
  },
  linkNote: {
    color: "#6d6f78",
    fontSize: "11px",
    marginTop: "8px"
  },
  regenBtn: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#b5bac1",
    padding: "6px 12px",
    borderRadius: "4px",
    fontSize: "12px",
    marginTop: "6px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.15s"
  }
};
const useInviteLogic = /* @__PURE__ */ __name(({ server, fetchWithAuth, apiBaseUrl, currentUser }) => {
  const [friends, setFriends] = reactExports.useState([]);
  const [loadingFriends, setLoadingFriends] = reactExports.useState(false);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [invitedUsers, setInvitedUsers] = reactExports.useState(/* @__PURE__ */ new Set());
  const [inviteLink, setInviteLink] = reactExports.useState("");
  const [copied, setCopied] = reactExports.useState(false);
  const [loadingLink, setLoadingLink] = reactExports.useState(true);
  const [isRegenerating, setIsRegenerating] = reactExports.useState(false);
  const searchRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    fetchFriends();
    getOrCreatePermanentLink();
    setTimeout(() => searchRef.current?.focus(), 100);
  }, []);
  const getOrCreatePermanentLink = /* @__PURE__ */ __name(async () => {
    if (!server?.id) {
      setLoadingLink(false);
      return;
    }
    setLoadingLink(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/invites/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ server_id: server.id, max_uses: 0, expires_in_hours: 0 })
      });
      if (res.ok) {
        const data = await res.json();
        setInviteLink(data.url || data.invite_link || `${PRODUCTION_URL}/#/invite/${data.code}`);
      } else {
        console.error("[InviteModal] Create failed:", await res.json().catch(() => ({})));
      }
    } catch (e) {
      console.error("[InviteModal] Create error:", e);
    } finally {
      setLoadingLink(false);
    }
  }, "getOrCreatePermanentLink");
  const regenerateLink = /* @__PURE__ */ __name(async () => {
    if (!server?.id) return;
    setIsRegenerating(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/invites/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ server_id: server.id, max_uses: 0, expires_in_hours: 0 })
      });
      if (res.ok) {
        const data = await res.json();
        setInviteLink(data.url || data.invite_link || `${PRODUCTION_URL}/#/invite/${data.code}`);
        toast.success("🔗 Yeni davet linki oluşturuldu!");
      } else {
        toast.error("Link oluşturulamadı");
      }
    } catch (e) {
      toast.error("Link oluşturulurken hata: " + e.message);
    } finally {
      setIsRegenerating(false);
    }
  }, "regenerateLink");
  const fetchFriends = /* @__PURE__ */ __name(async () => {
    setLoadingFriends(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/friends/list/`);
      if (res.ok) {
        const data = await res.json();
        setFriends(Array.isArray(data) ? data : data.friends || []);
      }
    } catch (e) {
      console.error("Arkadaş listesi hatası:", e);
    } finally {
      setLoadingFriends(false);
    }
  }, "fetchFriends");
  const sendInviteToFriend = /* @__PURE__ */ __name(async (friendUsername) => {
    setInvitedUsers((prev) => new Set(prev).add(friendUsername));
    try {
      let link = inviteLink;
      if (!link) {
        const inviteRes = await fetchWithAuth(`${apiBaseUrl}/invites/create/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ server_id: server.id, max_uses: 1, expires_in_hours: 24 })
        });
        if (!inviteRes.ok) throw new Error("Davet oluşturulamadı");
        const inviteData = await inviteRes.json();
        link = inviteData.url || inviteData.invite_link;
      }
      const convRes = await fetchWithAuth(`${apiBaseUrl}/conversations/find_or_create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target_username: friendUsername })
      });
      if (!convRes.ok) throw new Error("DM oluşturulamadı");
      const convData = await convRes.json();
      const msgRes = await fetchWithAuth(`${apiBaseUrl}/messages/send_dm/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation_id: convData.conversation_id,
          content: `Hey! Seni **${server?.name || "sunucu"}** sunucusuna davet ediyorum! 🎉
${link}`
        })
      });
      if (msgRes.ok) {
        toast.success(`✅ ${friendUsername} kullanıcısına davet gönderildi!`);
      } else {
        navigator.clipboard.writeText(link);
        toast.success(`Link kopyalandı! ${friendUsername} ile paylaşabilirsiniz.`);
      }
    } catch (e) {
      setInvitedUsers((prev) => {
        const next = new Set(prev);
        next.delete(friendUsername);
        return next;
      });
      toast.error("Davet gönderilemedi: " + e.message);
    }
  }, "sendInviteToFriend");
  const getFriendName = /* @__PURE__ */ __name((friendship) => {
    if (!currentUser) return friendship.receiver_username;
    return friendship.sender_username === currentUser ? friendship.receiver_username : friendship.sender_username;
  }, "getFriendName");
  const getFriendAvatar = /* @__PURE__ */ __name((friendship) => {
    const name = getFriendName(friendship);
    return friendship.sender_username === name ? friendship.sender_avatar : friendship.receiver_avatar;
  }, "getFriendAvatar");
  const filteredFriends = friends.filter((f) => {
    const name = getFriendName(f);
    return name?.toLowerCase().includes(searchQuery.toLowerCase());
  });
  const copyToClipboard = /* @__PURE__ */ __name(() => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    toast.success("📋 Davet linki kopyalandı!");
    setTimeout(() => setCopied(false), 2e3);
  }, "copyToClipboard");
  return {
    friends,
    loadingFriends,
    searchQuery,
    setSearchQuery,
    invitedUsers,
    inviteLink,
    copied,
    loadingLink,
    isRegenerating,
    searchRef,
    filteredFriends,
    getOrCreatePermanentLink,
    regenerateLink,
    sendInviteToFriend,
    getFriendName,
    getFriendAvatar,
    copyToClipboard
  };
}, "useInviteLogic");
const FriendList = /* @__PURE__ */ __name(({
  searchRef,
  searchQuery,
  setSearchQuery,
  loadingFriends,
  filteredFriends,
  friends,
  getFriendName,
  getFriendAvatar,
  invitedUsers,
  sendInviteToFriend
}) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: st.searchWrap, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: st.searchBox, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FaSearch, { style: st.searchIcon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: searchRef,
        type: "text",
        placeholder: "Arkadaş ara...",
        style: st.searchInput,
        value: searchQuery,
        onChange: /* @__PURE__ */ __name((e) => setSearchQuery(e.target.value), "onChange")
      }
    )
  ] }) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: st.friendList, children: loadingFriends ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: st.emptyState, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: st.spinner }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: st.emptyText, children: "Yükleniyor..." })
  ] }) : filteredFriends.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: st.emptyState, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserFriends, { style: { fontSize: "32px", color: "#4e5058", marginBottom: "8px" } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: st.emptyText, children: searchQuery ? "Sonuç bulunamadı." : friends.length === 0 ? "Henüz arkadaşın yok." : "Eşleşen arkadaş yok." })
  ] }) : filteredFriends.map((f) => {
    const name = getFriendName(f);
    const avatar = getFriendAvatar(f);
    const isInvited = invitedUsers.has(name);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: st.friendItem, className: "invite-friend-item", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: st.friendInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: st.friendAvatar, children: avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: avatar, alt: name, style: st.avatarImg }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: st.avatarLetter, children: name?.charAt(0).toUpperCase() }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: st.friendName, children: name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => !isInvited && sendInviteToFriend(name), "onClick"),
          style: { ...st.inviteBtn, ...isInvited ? st.inviteBtnSent : {} },
          disabled: isInvited,
          children: isInvited ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { style: { marginRight: "4px" } }),
            " Gönderildi"
          ] }) : "Davet Et"
        }
      )
    ] }, f.id);
  }) })
] }), "FriendList");
const LinkSection = /* @__PURE__ */ __name(({
  loadingLink,
  inviteLink,
  copied,
  copyToClipboard,
  getOrCreatePermanentLink,
  regenerateLink,
  isRegenerating
}) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: st.linkSection, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: st.linkLabel, children: "VEYA BİR SUNUCU DAVET LİNKİ GÖNDER" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: st.linkBox, children: loadingLink ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: st.linkLoading, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: st.spinner }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#b5bac1", fontSize: "13px" }, children: "Link hazırlanıyor..." })
  ] }) : inviteLink ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: st.linkInputWrap, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaLink, { style: { color: "#b5bac1", marginRight: "8px", flexShrink: 0 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: inviteLink, readOnly: true, style: st.linkInput, onClick: /* @__PURE__ */ __name((e) => e.target.select(), "onClick") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: copyToClipboard,
        style: { ...st.copyBtn, ...copied ? st.copyBtnDone : {} },
        children: copied ? "Kopyalandı!" : "Kopyala"
      }
    )
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: st.linkError, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#f0b232", fontSize: "13px" }, children: "Link oluşturulamadı" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: getOrCreatePermanentLink, style: st.retryBtn, children: "Tekrar Dene" })
  ] }) }),
  inviteLink && !loadingLink && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      onClick: regenerateLink,
      disabled: isRegenerating,
      style: { ...st.regenBtn, cursor: isRegenerating ? "wait" : "pointer" },
      onMouseEnter: /* @__PURE__ */ __name((e) => {
        e.target.style.background = "rgba(255,255,255,0.06)";
        e.target.style.color = "#fff";
      }, "onMouseEnter"),
      onMouseLeave: /* @__PURE__ */ __name((e) => {
        e.target.style.background = "transparent";
        e.target.style.color = "#b5bac1";
      }, "onMouseLeave"),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaSync, { style: { fontSize: "11px", animation: isRegenerating ? "inviteSpin 1s linear infinite" : "none" } }),
        isRegenerating ? "Oluşturuluyor..." : "Yeni Link Oluştur"
      ]
    }
  ),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: st.linkNote, children: "Bu davet linki süresiz geçerli ve sınırsız kullanımlı." })
] }), "LinkSection");
injectInviteStyles();
const InviteModal = /* @__PURE__ */ __name(({ onClose, server, fetchWithAuth, apiBaseUrl, currentUser }) => {
  const logic = useInviteLogic({ server, fetchWithAuth, apiBaseUrl, currentUser });
  return ReactDOM.createPortal(
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: st.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: st.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: st.header, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: st.headerRow, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaHashtag, { style: { color: "#b5bac1", fontSize: "14px" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: st.serverLabel, children: server?.name || "Sunucu" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: st.title, children: [
            "Arkada",
            "ş",
            "lar",
            "ı",
            "n",
            "ı",
            " Davet Et"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: st.closeBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FriendList, { ...logic }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LinkSection, { ...logic })
    ] }) }),
    document.body
  );
}, "InviteModal");
export {
  InviteModal as default
};
