var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a6 as FaUserFriends, a as FaTimes, y as FaServer, t as FaSearch, C as FaUser, ba as FaComment, ah as FaCrown, u as FaUsers, a1 as FaShieldAlt } from "./icons-vendor-2VDeY8fW.js";
import { y } from "./ui-vendor-iPoN0WGz.js";
const MutualsPanel = /* @__PURE__ */ __name(({ userId, username, onClose, onNavigateToUser, onNavigateToServer }) => {
  const [activeTab, setActiveTab] = reactExports.useState("friends");
  const [mutualFriends, setMutualFriends] = reactExports.useState([]);
  const [mutualServers, setMutualServers] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const token = localStorage.getItem("access_token");
  reactExports.useEffect(() => {
    fetchMutuals();
  }, [userId]);
  const fetchMutuals = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/users/${username}/mutuals/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setMutualFriends(data.friends || []);
        setMutualServers(data.servers || []);
      } else {
        setMutualFriends([]);
        setMutualServers([]);
      }
    } catch (error) {
      setMutualFriends([]);
      setMutualServers([]);
    }
    setLoading(false);
  }, "fetchMutuals");
  const getFilteredFriends = /* @__PURE__ */ __name(() => {
    if (!searchQuery) return mutualFriends;
    return mutualFriends.filter(
      (f) => f.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, "getFilteredFriends");
  const getFilteredServers = /* @__PURE__ */ __name(() => {
    if (!searchQuery) return mutualServers;
    return mutualServers.filter(
      (s) => s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, "getFilteredServers");
  const getStatusColor = /* @__PURE__ */ __name((status) => {
    const colors = {
      online: "#4caf50",
      idle: "#ffc107",
      dnd: "#f44336",
      offline: "#666"
    };
    return colors[status] || "#666";
  }, "getStatusColor");
  const formatMemberCount = /* @__PURE__ */ __name((count) => {
    if (count >= 1e6) return (count / 1e6).toFixed(1) + "M";
    if (count >= 1e3) return (count / 1e3).toFixed(1) + "K";
    return count.toString();
  }, "formatMemberCount");
  const handleSendMessage = /* @__PURE__ */ __name((friend) => {
    y.info(`${friend.username} ile sohbet başlatılıyor...`);
  }, "handleSendMessage");
  const filteredFriends = getFilteredFriends();
  const filteredServers = getFilteredServers();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mutuals-overlay", onClick: /* @__PURE__ */ __name((e) => e.target.className === "mutuals-overlay" && onClose(), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mutuals-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserFriends, {}),
        " Ortak Bağlantılar"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "target-user", children: [
        "@",
        username
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `tab ${activeTab === "friends" ? "active" : ""}`,
          onClick: /* @__PURE__ */ __name(() => setActiveTab("friends"), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserFriends, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Ortak Arkadaşlar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "count", children: mutualFriends.length })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `tab ${activeTab === "servers" ? "active" : ""}`,
          onClick: /* @__PURE__ */ __name(() => setActiveTab("servers"), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaServer, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Ortak Sunucular" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "count", children: mutualServers.length })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "search-bar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaSearch, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: activeTab === "friends" ? "Arkadaş ara..." : "Sunucu ara...",
          value: searchQuery,
          onChange: /* @__PURE__ */ __name((e) => setSearchQuery(e.target.value), "onChange")
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "content", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading", children: "Yükleniyor..." }) : activeTab === "friends" ? (
      /* Friends List */
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "friends-list", children: filteredFriends.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserFriends, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Ortak arkadaş bulunamadı" })
      ] }) : filteredFriends.map((friend) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "friend-item",
          onClick: /* @__PURE__ */ __name(() => onNavigateToUser && onNavigateToUser(friend.id), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "friend-avatar", children: [
              friend.avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: friend.avatar, alt: "" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaUser, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "status-dot",
                  style: { background: getStatusColor(friend.status) }
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "friend-info", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "friend-name", children: friend.username }),
              friend.activity && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "friend-activity", children: friend.activity })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "friend-actions", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "action-btn message",
                onClick: /* @__PURE__ */ __name((e) => {
                  e.stopPropagation();
                  handleSendMessage(friend);
                }, "onClick"),
                title: "Mesaj Gönder",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaComment, {})
              }
            ) })
          ]
        },
        friend.id
      )) })
    ) : (
      /* Servers List */
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "servers-list", children: filteredServers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaServer, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Ortak sunucu bulunamadı" })
      ] }) : filteredServers.map((server) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "server-item",
          onClick: /* @__PURE__ */ __name(() => onNavigateToServer && onNavigateToServer(server.id), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "server-icon", children: server.icon ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: server.icon, alt: "" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: server.name.charAt(0) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "server-info", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "server-name-row", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "server-name", children: server.name }),
                server.is_owner && /* @__PURE__ */ jsxRuntimeExports.jsx(FaCrown, { className: "owner-badge" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "server-meta", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "member-count", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, {}),
                  " ",
                  formatMemberCount(server.member_count)
                ] }),
                server.role && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `role-badge ${server.role.toLowerCase()}`, children: [
                  server.role === "Owner" && /* @__PURE__ */ jsxRuntimeExports.jsx(FaCrown, {}),
                  server.role === "Moderator" && /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, {}),
                  server.role
                ] })
              ] })
            ] })
          ]
        },
        server.id
      )) })
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "summary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserFriends, {}),
        " ",
        mutualFriends.length,
        " ortak arkadaş"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaServer, {}),
        " ",
        mutualServers.length,
        " ortak sunucu"
      ] })
    ] })
  ] }) });
}, "MutualsPanel");
export {
  MutualsPanel as default
};
