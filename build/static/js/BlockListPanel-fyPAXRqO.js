var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { y } from "./ui-vendor-iPoN0WGz.js";
import { g as getApiBase } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
const BlockListPanel = /* @__PURE__ */ __name(({ onClose }) => {
  const [blockedUsers, setBlockedUsers] = reactExports.useState([]);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [userToBlock, setUserToBlock] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(true);
  const apiBaseUrl = getApiBase();
  const token = localStorage.getItem("access_token");
  reactExports.useEffect(() => {
    fetchBlockedUsers();
  }, []);
  const fetchBlockedUsers = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/blocks/list/`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      setBlockedUsers(data.blocked_users || []);
    } catch (error) {
      console.error("Error fetching blocked users:", error);
      y.error("❌ Engelli kullanıcılar yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, "fetchBlockedUsers");
  const blockUser = /* @__PURE__ */ __name(async () => {
    if (!userToBlock.trim()) {
      y.error("❌ Kullanıcı adı gerekli");
      return;
    }
    try {
      const response = await fetch(`${apiBaseUrl}/blocks/block/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: userToBlock
        })
      });
      const data = await response.json();
      if (response.ok) {
        y.success("✅ Kullanıcı engellendi");
        setUserToBlock("");
        fetchBlockedUsers();
      } else {
        y.error(`❌ ${data.error || "Kullanıcı engellenemedi"}`);
      }
    } catch (error) {
      console.error("Error blocking user:", error);
      y.error("❌ Engelleme hatası");
    }
  }, "blockUser");
  const unblockUser = /* @__PURE__ */ __name(async (userId) => {
    try {
      const response = await fetch(`${apiBaseUrl}/blocks/unblock/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: userId
        })
      });
      const data = await response.json();
      if (response.ok) {
        y.success("✅ Engel kaldırıldı");
        fetchBlockedUsers();
      } else {
        y.error(`❌ ${data.error || "Engel kaldırılamadı"}`);
      }
    } catch (error) {
      console.error("Error unblocking user:", error);
      y.error("❌ Engel kaldırma hatası");
    }
  }, "unblockUser");
  const filteredUsers = blockedUsers.filter(
    (user) => user.username.toLowerCase().includes(searchQuery.toLowerCase()) || user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const getBlockDuration = /* @__PURE__ */ __name((blockedAt) => {
    const now = /* @__PURE__ */ new Date();
    const blocked = new Date(blockedAt);
    const diffMs = now - blocked;
    const diffDays = Math.floor(diffMs / (1e3 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1e3 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1e3 * 60));
    if (diffDays > 0) return `${diffDays} gün önce`;
    if (diffHours > 0) return `${diffHours} saat önce`;
    if (diffMinutes > 0) return `${diffMinutes} dakika önce`;
    return "Az önce";
  }, "getBlockDuration");
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "blocklist-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "blocklist-panel", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Yükleniyor..." })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "blocklist-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "blocklist-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "blocklist-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "🚫 Engelli Kullanıcılar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "✕" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "blocklist-stats", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-icon", children: "🚫" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-info", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: blockedUsers.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Engelli Kullanıcı" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "add-user-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Kullanıcı Engelle" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "add-user-form", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Kullanıcı adı",
            value: userToBlock,
            onChange: /* @__PURE__ */ __name((e) => setUserToBlock(e.target.value), "onChange"),
            onKeyPress: /* @__PURE__ */ __name((e) => e.key === "Enter" && blockUser(), "onKeyPress"),
            className: "user-input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "block-btn", onClick: blockUser, children: "🚫 Engelle" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "info-text", children: "Engellenen kullanıcılar size mesaj gönderemez ve sizi göremez" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "search-section", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "text",
        placeholder: "🔍 Engelli kullanıcılarda ara...",
        value: searchQuery,
        onChange: /* @__PURE__ */ __name((e) => setSearchQuery(e.target.value), "onChange"),
        className: "search-input"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "blocklist-content", children: filteredUsers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "empty-icon", children: "🎉" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Engelli kullanıcı yok" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: searchQuery ? "Arama sonucu bulunamadı" : "Henüz kimseyi engellemediniz" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "blocked-users-list", children: filteredUsers.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "blocked-user-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "user-avatar", children: user.avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: user.avatar, alt: user.username }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "default-avatar", children: user.username.charAt(0).toUpperCase() }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "user-info", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "user-name", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "username", children: user.username }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "user-tag", children: [
            "#",
            user.discriminator || "0000"
          ] })
        ] }),
        user.email && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "user-email", children: user.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "blocked-time", children: [
          "Engellendi: ",
          getBlockDuration(user.blocked_at)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "user-actions", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "unblock-btn",
          onClick: /* @__PURE__ */ __name(() => unblockUser(user.id), "onClick"),
          children: "✓ Engeli Kaldır"
        }
      ) })
    ] }, user.id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-banner", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "info-icon", children: "ℹ️" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Engellenen kullanıcılar size DM gönderemez, profilinizi göremez ve paylaşımlarınızla etkileşime geçemez. Gruplanmış serverlarda görünürlük sınırlıdır." })
    ] })
  ] }) });
}, "BlockListPanel");
export {
  BlockListPanel as default
};
