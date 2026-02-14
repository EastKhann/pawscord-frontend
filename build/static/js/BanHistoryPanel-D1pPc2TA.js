var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { ay as FaBan, a as FaTimes, t as FaSearch, a5 as FaDownload, aC as FaUserSlash, C as FaUser, d as FaExclamationTriangle, bv as FaCalendar, cB as FaChevronUp, e as FaChevronDown, aD as FaUndo, cC as FaUserCheck, z as FaClock } from "./icons-vendor-2VDeY8fW.js";
import { y } from "./ui-vendor-iPoN0WGz.js";
const BanHistoryPanel = /* @__PURE__ */ __name(({ serverId, serverName, onClose }) => {
  const [bans, setBans] = reactExports.useState([]);
  const [filteredBans, setFilteredBans] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState("all");
  const [sortBy, setSortBy] = reactExports.useState("newest");
  const [expandedBan, setExpandedBan] = reactExports.useState(null);
  const [stats, setStats] = reactExports.useState({ total: 0, active: 0, expired: 0, appealed: 0 });
  const token = localStorage.getItem("access_token");
  reactExports.useEffect(() => {
    fetchBanHistory();
  }, [serverId]);
  reactExports.useEffect(() => {
    applyFilters();
  }, [bans, searchQuery, filter, sortBy]);
  const fetchBanHistory = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/servers/${serverId}/bans/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setBans(data.bans || []);
        setStats(data.stats || calculateStats([]));
      } else {
        setBans([]);
        setStats(calculateStats([]));
      }
    } catch (error) {
      setBans([]);
      setStats(calculateStats([]));
    }
    setLoading(false);
  }, "fetchBanHistory");
  const calculateStats = /* @__PURE__ */ __name((banList) => ({
    total: banList.length,
    active: banList.filter((b) => b.status === "active").length,
    expired: banList.filter((b) => b.status === "expired").length,
    appealed: banList.filter((b) => b.status === "appealed" || b.appeal_status === "approved").length
  }), "calculateStats");
  const applyFilters = /* @__PURE__ */ __name(() => {
    let result = [...bans];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (ban) => ban.user.username.toLowerCase().includes(query) || ban.reason.toLowerCase().includes(query) || ban.moderator.username.toLowerCase().includes(query)
      );
    }
    if (filter !== "all") {
      result = result.filter((ban) => {
        if (filter === "appealed") return ban.appeal_status === "approved" || ban.status === "appealed";
        return ban.status === filter;
      });
    }
    result.sort((a, b) => {
      const dateA = new Date(a.banned_at);
      const dateB = new Date(b.banned_at);
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });
    setFilteredBans(result);
  }, "applyFilters");
  const handleUnban = /* @__PURE__ */ __name(async (ban) => {
    try {
      const response = await fetch(`/api/servers/${serverId}/bans/${ban.id}/revoke/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      y.success(`${ban.user.username} yasaklaması kaldırıldı`);
      fetchBanHistory();
    } catch (error) {
      y.success(`${ban.user.username} yasaklaması kaldırıldı`);
      setBans(bans.map((b) => b.id === ban.id ? { ...b, status: "expired", unbanned_at: (/* @__PURE__ */ new Date()).toISOString() } : b));
    }
  }, "handleUnban");
  const handleExport = /* @__PURE__ */ __name(() => {
    const csv = [
      ["Kullanıcı", "Moderatör", "Sebep", "Durum", "Tarih", "Bitiş", "İtiraz"].join(","),
      ...filteredBans.map((ban) => [
        ban.user.username,
        ban.moderator.username,
        `"${ban.reason}"`,
        ban.status,
        new Date(ban.banned_at).toLocaleDateString("tr-TR"),
        ban.expires_at ? new Date(ban.expires_at).toLocaleDateString("tr-TR") : "Süresiz",
        ban.appeal_status || "Yok"
      ].join(","))
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ban_history_${serverName}.csv`;
    a.click();
    y.success("Ban geçmişi dışa aktarıldı");
  }, "handleExport");
  const formatDate = /* @__PURE__ */ __name((date) => {
    return new Date(date).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }, "formatDate");
  const getStatusBadge = /* @__PURE__ */ __name((status, appeal) => {
    if (appeal === "approved" || status === "appealed") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "status-badge appealed", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserCheck, {}),
        " İtiraz Kabul"
      ] });
    }
    switch (status) {
      case "active":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "status-badge active", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaBan, {}),
          " Aktif Ban"
        ] });
      case "expired":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "status-badge expired", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {}),
          " Süresi Doldu"
        ] });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "status-badge", children: status });
    }
  }, "getStatusBadge");
  const getAppealBadge = /* @__PURE__ */ __name((status) => {
    if (!status) return null;
    const badges = {
      pending: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "appeal-badge pending", children: "İtiraz Bekliyor" }),
      approved: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "appeal-badge approved", children: "İtiraz Kabul" }),
      denied: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "appeal-badge denied", children: "İtiraz Reddedildi" })
    };
    return badges[status];
  }, "getAppealBadge");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "banhistory-overlay", onClick: /* @__PURE__ */ __name((e) => e.target.className === "banhistory-overlay" && onClose(), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "banhistory-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaBan, {}),
        " Ban Geçmişi"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "server-name", children: serverName }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats-bar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item", onClick: /* @__PURE__ */ __name(() => setFilter("all"), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: stats.total }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Toplam" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item active", onClick: /* @__PURE__ */ __name(() => setFilter("active"), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: stats.active }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Aktif" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item expired", onClick: /* @__PURE__ */ __name(() => setFilter("expired"), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: stats.expired }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Süresi Dolmuş" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item appealed", onClick: /* @__PURE__ */ __name(() => setFilter("appealed"), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: stats.appealed }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "İtiraz Kabul" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filters-bar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "search-box", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaSearch, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Kullanıcı, sebep veya moderatör ara...",
            value: searchQuery,
            onChange: /* @__PURE__ */ __name((e) => setSearchQuery(e.target.value), "onChange")
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: filter, onChange: /* @__PURE__ */ __name((e) => setFilter(e.target.value), "onChange"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Tüm Banlar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "active", children: "Aktif" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "expired", children: "Süresi Dolmuş" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "appealed", children: "İtiraz Kabul" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: sortBy, onChange: /* @__PURE__ */ __name((e) => setSortBy(e.target.value), "onChange"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "newest", children: "En Yeni" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "oldest", children: "En Eski" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "export-btn", onClick: handleExport, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, {}),
        " Dışa Aktar"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bans-list", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading", children: "Yükleniyor..." }) : filteredBans.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserSlash, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Ban kaydı bulunamadı" })
    ] }) : filteredBans.map((ban) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `ban-card ${ban.status}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ban-main", onClick: /* @__PURE__ */ __name(() => setExpandedBan(expandedBan === ban.id ? null : ban.id), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ban-user", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "user-avatar", children: ban.user.avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: ban.user.avatar, alt: "" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaUser, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "user-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "username", children: ban.user.username }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "discriminator", children: [
              "#",
              ban.user.discriminator
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ban-reason", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ban.reason })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ban-meta", children: [
          getStatusBadge(ban.status, ban.appeal_status),
          getAppealBadge(ban.appeal_status)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ban-date", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCalendar, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(ban.banned_at) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "expand-btn", children: expandedBan === ban.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaChevronUp, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaChevronDown, {}) })
      ] }),
      expandedBan === ban.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ban-details", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Moderatör:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "value", children: ban.moderator.username })
        ] }),
        ban.expires_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Bitiş Tarihi:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "value", children: formatDate(ban.expires_at) })
        ] }),
        ban.unbanned_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Yasak Kaldırıldı:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "value", children: formatDate(ban.unbanned_at) })
        ] }),
        ban.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-row notes", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Notlar:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "value", children: ban.notes })
        ] }),
        ban.status === "active" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "detail-actions", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "unban-btn", onClick: /* @__PURE__ */ __name(() => handleUnban(ban), "onClick"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaUndo, {}),
          " Yasağı Kaldır"
        ] }) })
      ] })
    ] }, ban.id)) })
  ] }) });
}, "BanHistoryPanel");
export {
  BanHistoryPanel as default
};
