var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { t as FaSearch, ah as FaCrown, B as FaRobot, an as FaPlus, at as FaEdit, g as FaTrash, a9 as FaCheck, G as FaVolumeUp, au as FaVolumeMute, av as FaFileAlt, aw as FaImage, ax as FaGlobe, h as FaLock, ac as FaComments, a1 as FaShieldAlt, u as FaUsers, d as FaExclamationTriangle, ay as FaBan, az as FaCog, aA as FaGavel, aB as FaHistory, z as FaClock, aC as FaUserSlash, k as FaBell, aD as FaUndo, am as FaCalendarAlt, aE as FaChartBar, aF as FaHashtag, O as FaChartLine, aG as FaChartPie, j as FaLink, aH as FaHandPaper, a as FaTimes } from "./icons-vendor-2VDeY8fW.js";
import { t as toast, d as confirmDialog } from "./index-DGqPEDt8.js";
import { A as AutoResponderManager } from "./AutoResponderManager-BT8eR5cy.js";
import VanityURLManager from "./VanityURLManager-DYHHPB97.js";
import { C as ChromePicker } from "./ui-vendor-iPoN0WGz.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
const ServerMembers = /* @__PURE__ */ __name(({ members, roles, serverId, fetchWithAuth, apiBaseUrl, onRefresh }) => {
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [memberList, setMemberList] = reactExports.useState(members || []);
  const [loading, setLoading] = reactExports.useState(false);
  const [assigningMember, setAssigningMember] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!members || members.length === 0) {
      fetchMembers();
    } else {
      setMemberList(members);
    }
  }, [members, serverId]);
  const fetchMembers = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/members/`);
      if (res.ok) {
        const data = await res.json();
        setMemberList(data.members || []);
      } else {
        console.error("❌ [ServerMembers] Failed to fetch members");
      }
    } catch (error) {
      console.error("❌ [ServerMembers] Error:", error);
    } finally {
      setLoading(false);
    }
  }, "fetchMembers");
  const assignRole = /* @__PURE__ */ __name(async (memberUsername, roleId) => {
    setAssigningMember(memberUsername);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/assign_role/`, {
        method: "POST",
        body: JSON.stringify({
          username: memberUsername,
          role_id: roleId
        })
      });
      if (res.ok) {
        toast.success(`${memberUsername} kullanıcısına rol atandı!`);
        await fetchMembers();
      } else {
        const error = await res.json();
        toast.error(`Rol atanamadı: ${error.error || "Bilinmeyen hata"}`);
      }
    } catch (error) {
      console.error("Rol atama hatası:", error);
      toast.error("Rol atama hatası!");
    } finally {
      setAssigningMember(null);
    }
  }, "assignRole");
  const filteredMembers = memberList.filter((member) => {
    const username = member.username || member.user?.username || "";
    return username.toLowerCase().includes(searchQuery.toLowerCase());
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.searchBar, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaSearch, { style: styles$1.searchIcon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Üye ara...",
          value: searchQuery,
          onChange: /* @__PURE__ */ __name((e) => setSearchQuery(e.target.value), "onChange"),
          style: styles$1.searchInput
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.memberCount, children: [
      filteredMembers.length,
      " Üye ",
      loading && "(Yükleniyor...)"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.memberList, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.loadingText, children: "Üyeler yükleniyor..." }) : filteredMembers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.emptyState, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Hiç üye bulunamadı" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: fetchMembers, style: styles$1.refreshBtn, children: "Yenile" })
    ] }) : filteredMembers.map((member, index) => {
      const username = member.username || member.user?.username || "Bilinmeyen";
      const isOwner = member.is_owner || false;
      const memberRoles = member.roles || [];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.memberItem, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.memberInfo, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.avatar, children: member.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: member.avatar_url, alt: username, style: styles$1.avatarImg }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.avatarPlaceholder, children: username.charAt(0).toUpperCase() }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.memberDetails, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.username, children: [
              username,
              isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx(FaCrown, { style: styles$1.crownIcon, title: "Sunucu Sahibi" })
            ] }),
            memberRoles.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.rolesContainer, children: memberRoles.map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                style: {
                  ...styles$1.roleBadge,
                  backgroundColor: role.color || "#99aab5"
                },
                children: role.name
              },
              role.id
            )) })
          ] })
        ] }),
        !isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.roleActions, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            onChange: /* @__PURE__ */ __name((e) => {
              const roleId = parseInt(e.target.value);
              if (roleId) {
                assignRole(username, roleId);
              }
              e.target.value = "";
            }, "onChange"),
            style: styles$1.roleSelect,
            disabled: assigningMember === username,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Rol Ata" }),
              roles.map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: role.id, children: role.name }, role.id))
            ]
          }
        ) })
      ] }, index);
    }) })
  ] });
}, "ServerMembers");
const styles$1 = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    gap: "16px"
  },
  searchBar: {
    position: "relative",
    display: "flex",
    alignItems: "center"
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    color: "#b9bbbe",
    fontSize: "14px"
  },
  searchInput: {
    width: "100%",
    padding: "10px 10px 10px 36px",
    backgroundColor: "#1e1f22",
    border: "1px solid #40444b",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "14px",
    outline: "none"
  },
  memberCount: {
    color: "#b9bbbe",
    fontSize: "13px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  memberList: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  loadingText: {
    textAlign: "center",
    color: "#b9bbbe",
    padding: "40px",
    fontSize: "14px"
  },
  emptyState: {
    textAlign: "center",
    color: "#b9bbbe",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  refreshBtn: {
    alignSelf: "center",
    padding: "8px 16px",
    backgroundColor: "#5865f2",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px"
  },
  memberItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px",
    backgroundColor: "#2b2d31",
    borderRadius: "8px",
    transition: "background-color 0.2s"
  },
  memberInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flex: 1
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    overflow: "hidden",
    flexShrink: 0
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  avatarPlaceholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5865f2",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold"
  },
  memberDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flex: 1
  },
  username: {
    color: "#fff",
    fontSize: "15px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: "6px"
  },
  crownIcon: {
    color: "#f0b232",
    fontSize: "14px"
  },
  rolesContainer: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap"
  },
  roleBadge: {
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: 600,
    color: "white"
  },
  roleActions: {
    display: "flex",
    gap: "8px"
  },
  roleSelect: {
    padding: "6px 12px",
    backgroundColor: "#1e1f22",
    border: "1px solid #40444b",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "13px",
    cursor: "pointer",
    outline: "none"
  }
};
const styles = {
  overlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3e3 },
  modal: { backgroundColor: "#313338", borderRadius: "12px", width: "900px", maxWidth: "95vw", height: "650px", maxHeight: "90vh", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.6)" },
  // Layout
  layoutContainer: { display: "flex", flex: 1, overflow: "hidden" },
  // ═══ SIDEBAR ═══
  sidebar: {
    width: "220px",
    minWidth: "220px",
    backgroundColor: "#2b2d31",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid rgba(255,255,255,0.06)"
  },
  sidebarHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "20px 16px 16px",
    borderBottom: "1px solid rgba(255,255,255,0.06)"
  },
  sidebarServerIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    backgroundColor: "#5865f2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "700",
    fontSize: "16px",
    flexShrink: 0
  },
  sidebarServerInfo: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  },
  sidebarServerName: {
    color: "#fff",
    fontWeight: "700",
    fontSize: "14px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  sidebarServerSub: {
    color: "#949ba4",
    fontSize: "11px",
    marginTop: "2px"
  },
  sidebarNav: {
    flex: 1,
    overflowY: "auto",
    padding: "8px"
  },
  navSection: {
    display: "flex",
    flexDirection: "column",
    gap: "2px"
  },
  navSectionLabel: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#949ba4",
    letterSpacing: "0.04em",
    padding: "8px 10px 4px",
    userSelect: "none"
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 10px",
    borderRadius: "6px",
    border: "none",
    background: "none",
    color: "#b5bac1",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.15s ease",
    textAlign: "left",
    width: "100%"
  },
  navItemActive: {
    backgroundColor: "rgba(88,101,242,0.15)",
    color: "#fff"
  },
  navIcon: {
    fontSize: "14px",
    opacity: 0.8,
    flexShrink: 0
  },
  navDivider: {
    height: "1px",
    backgroundColor: "rgba(255,255,255,0.06)",
    margin: "8px 10px"
  },
  // ═══ MAIN CONTENT ═══
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  },
  contentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px 16px",
    borderBottom: "1px solid rgba(255,255,255,0.06)"
  },
  contentTitle: {
    margin: 0,
    color: "#fff",
    fontSize: "1.2em",
    fontWeight: "700"
  },
  closeBtn: { background: "none", border: "none", color: "#b9bbbe", cursor: "pointer", padding: "4px", borderRadius: "4px", transition: "color 0.15s" },
  content: { flex: 1, padding: "20px 24px", overflow: "auto" },
  // Sol Menü
  rolesSidebar: { width: "200px", borderRight: "1px solid #1e1f22", display: "flex", flexDirection: "column", gap: "10px" },
  newRoleBtn: { padding: "10px", backgroundColor: "#232428", color: "#fff", border: "1px solid #1e1f22", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" },
  rolesList: { overflowY: "auto", flex: 1 },
  roleItem: { padding: "10px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "4px", marginBottom: "2px", color: "#b9bbbe" },
  // Sağ Editör
  roleEditor: { flex: 1, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "20px", overflowY: "auto" },
  editorTitle: { margin: 0, color: "#fff", borderBottom: "1px solid #40444b", paddingBottom: "10px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "5px", color: "#b9bbbe", fontSize: "0.9em" },
  input: { padding: "10px", backgroundColor: "#1e1f22", border: "none", borderRadius: "4px", color: "#fff", outline: "none" },
  colorPreview: { width: "40px", height: "40px", borderRadius: "4px", border: "1px solid #fff", cursor: "pointer" },
  // 🔥 KAPLAMA (COVER) STİLİ: Tüm ekranı kaplar ama z-index ile picker'ın altında kalır
  cover: { position: "fixed", top: "0px", right: "0px", bottom: "0px", left: "0px", zIndex: 999 },
  permissionsGrid: { display: "flex", flexDirection: "column", gap: "10px", backgroundColor: "#2b2d31", padding: "15px", borderRadius: "8px" },
  // 🛡️ Moderation Cards - YENİ KAPSAMLI STİLLER
  moderationTab: {
    display: "flex",
    flexDirection: "column",
    gap: "24px"
  },
  moderationHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    backgroundColor: "#1e1f22",
    borderRadius: "12px",
    marginBottom: "8px"
  },
  moderationTitleSection: {
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },
  serverStats: {
    display: "flex",
    gap: "24px"
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  statNumber: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#5865f2"
  },
  statLabel: {
    fontSize: "12px",
    color: "#72767d"
  },
  quickStatsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px"
  },
  quickStatCard: {
    backgroundColor: "#2b2d31",
    padding: "16px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  quickStatValue: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff"
  },
  quickStatLabel: {
    fontSize: "12px",
    color: "#72767d"
  },
  moderationCardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "16px"
  },
  modCard: {
    backgroundColor: "#2b2d31",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #1e1f22",
    transition: "transform 0.2s, box-shadow 0.2s"
  },
  modCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "16px"
  },
  modCardIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  modCardBadge: {
    backgroundColor: "rgba(88, 101, 242, 0.2)",
    color: "#5865f2",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: "600"
  },
  modCardTitle: {
    margin: "0 0 8px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600"
  },
  modCardDesc: {
    color: "#b9bbbe",
    fontSize: "13px",
    lineHeight: "1.5",
    marginBottom: "16px"
  },
  modCardFeatures: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "16px"
  },
  modCardFeature: {
    backgroundColor: "#1e1f22",
    padding: "6px 10px",
    borderRadius: "6px",
    fontSize: "11px",
    color: "#b9bbbe"
  },
  modCardBtn: {
    width: "100%",
    backgroundColor: "#5865f2",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "12px 16px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "opacity 0.2s"
  },
  quickActionsSection: {
    backgroundColor: "#1e1f22",
    padding: "20px",
    borderRadius: "12px"
  },
  quickActionsTitle: {
    margin: "0 0 16px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  quickActionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "12px"
  },
  quickActionBtn: {
    backgroundColor: "#2b2d31",
    color: "#b9bbbe",
    border: "1px solid #40444b",
    borderRadius: "8px",
    padding: "12px 16px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s"
  },
  permLabel: { display: "flex", gap: "10px", alignItems: "center", color: "#dbdee1", cursor: "pointer" },
  editorFooter: { marginTop: "auto", display: "flex", justifyContent: "flex-end", gap: "10px", borderTop: "1px solid #40444b", paddingTop: "15px" },
  saveBtn: { padding: "10px 20px", backgroundColor: "#23a559", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center", gap: "5px" },
  deleteBtn: { padding: "10px 20px", backgroundColor: "transparent", color: "#da373c", border: "1px solid #1e1f22", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center", gap: "5px" },
  // 🔥 YENİ: SUNUCU YÖNETİMİ TAB STİLLERİ
  managementTab: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    maxWidth: "600px",
    margin: "0 auto"
  },
  sectionTitle: {
    margin: 0,
    color: "#fff",
    fontSize: "1.1em",
    borderBottom: "2px solid #40444b",
    paddingBottom: "10px"
  },
  settingBox: {
    backgroundColor: "#2b2d31",
    padding: "20px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px"
  },
  settingInfo: {
    flex: 1
  },
  settingLabel: {
    color: "#fff",
    fontSize: "1em",
    fontWeight: "bold",
    marginBottom: "5px"
  },
  settingDesc: {
    color: "#b9bbbe",
    fontSize: "0.9em"
  },
  actionBtn: {
    padding: "10px 20px",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.95em",
    whiteSpace: "nowrap"
  },
  divider: {
    height: "1px",
    backgroundColor: "#40444b",
    margin: "10px 0"
  },
  dangerBox: {
    backgroundColor: "#2b2d31",
    padding: "20px",
    borderRadius: "8px",
    border: "2px solid #da373c",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px"
  },
  dangerBtn: {
    padding: "10px 20px",
    backgroundColor: "#da373c",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.95em"
  },
  deleteConfirmation: {
    marginTop: "15px",
    padding: "15px",
    backgroundColor: "#1e1f22",
    borderRadius: "4px"
  },
  confirmInput: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#313338",
    border: "1px solid #da373c",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "0.95em",
    outline: "none"
  },
  cancelBtn: {
    padding: "10px 20px",
    backgroundColor: "transparent",
    color: "#b9bbbe",
    border: "1px solid #40444b",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold"
  }
};
const WelcomeTemplateEditor = /* @__PURE__ */ __name(({ serverId, fetchWithAuth, apiBaseUrl }) => {
  const [template, setTemplate] = reactExports.useState("");
  const [enabled, setEnabled] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [preview, setPreview] = reactExports.useState("");
  const [welcomeChannelId, setWelcomeChannelId] = reactExports.useState("");
  const [channels, setChannels] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const loadTemplate = /* @__PURE__ */ __name(async () => {
      try {
        const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/welcome/`);
        if (res.ok) {
          const data = await res.json();
          if (data.config) {
            setTemplate(data.config.welcome_message || data.template || "");
            setEnabled(data.config.welcome_enabled ?? data.enabled ?? false);
            setWelcomeChannelId(data.config.welcome_channel_id || "");
          } else {
            setTemplate(data.template || "");
            setEnabled(data.enabled || false);
          }
        }
      } catch (e) {
        console.error("Welcome template load error:", e);
      } finally {
        setLoading(false);
      }
    }, "loadTemplate");
    const loadChannels = /* @__PURE__ */ __name(async () => {
      try {
        const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/channels/`);
        if (res.ok) {
          const data = await res.json();
          setChannels(data.channels || []);
        }
      } catch (e) {
        console.error("Channels load error:", e);
      }
    }, "loadChannels");
    loadTemplate();
    loadChannels();
  }, [serverId, fetchWithAuth, apiBaseUrl]);
  reactExports.useEffect(() => {
    if (!template) {
      setPreview("");
      return;
    }
    let p = template.replace(/\{user\}/g, "Kullanıcı").replace(/\{user_mention\}/g, "@Kullanıcı").replace(/\{server\}/g, "Sunucu").replace(/\{member_count\}/g, "42").replace(/\{user_id\}/g, "1").replace(/\{username\}/g, "Kullanıcı").replace(/\{mention\}/g, "@Kullanıcı").replace(/\{memberCount\}/g, "42").replace(/\{date\}/g, (/* @__PURE__ */ new Date()).toLocaleDateString("tr-TR"));
    setPreview(p);
  }, [template]);
  const handleSave = /* @__PURE__ */ __name(async () => {
    setSaving(true);
    try {
      let res;
      res = await fetchWithAuth(`${apiBaseUrl}/servers/welcome/set/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          server_id: serverId,
          template,
          welcome_message: template,
          enabled,
          welcome_enabled: enabled,
          welcome_channel_id: welcomeChannelId || null
        })
      });
      if (res.ok) {
        toast.success("Hoş geldin mesajı kaydedildi!");
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || "Kaydetme başarısız");
      }
    } catch (e) {
      console.error("Save error:", e);
      toast.error("Kaydederken hata oluştu");
    } finally {
      setSaving(false);
    }
  }, "handleSave");
  const variables = [
    { key: "{user}", label: "Kullanıcı Adı" },
    { key: "{user_mention}", label: "@Etiket" },
    { key: "{server}", label: "Sunucu Adı" },
    { key: "{member_count}", label: "Üye Sayısı" }
  ];
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "20px", color: "#b9bbbe", textAlign: "center" }, children: "Yükleniyor..." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "18px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px", padding: "14px", backgroundColor: "#2b2d31", borderRadius: "8px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          onClick: /* @__PURE__ */ __name(() => setEnabled(!enabled), "onClick"),
          style: {
            width: "44px",
            height: "24px",
            borderRadius: "12px",
            backgroundColor: enabled ? "#23a559" : "#72767d",
            cursor: "pointer",
            position: "relative",
            transition: "background-color 0.2s"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "#fff",
            position: "absolute",
            top: "2px",
            left: enabled ? "22px" : "2px",
            transition: "left 0.2s"
          } })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#dcddde", fontWeight: "600" }, children: enabled ? "✓ Hoş Geldin Mesajları Aktif" : "✗ Hoş Geldin Mesajları Kapalı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#72767d", fontSize: "12px", marginTop: "2px" }, children: "Yeni üyeler katıldığında otomatik mesaj gönderilir" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "10px 14px", backgroundColor: "#2b2d31", borderRadius: "8px", display: "flex", alignItems: "center", gap: "10px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, { style: { color: "#5865f2", fontSize: "16px" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: "#72767d", fontSize: "12px" }, children: [
        "Bot profil fotoğrafı ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "#dcddde" }, children: "Sistem Botu" }),
        " sekmesinden ayarlanır."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { color: "#b9bbbe", fontSize: "12px", fontWeight: "700", display: "block", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.02em" }, children: "Hoş Geldin Kanalı" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: welcomeChannelId,
          onChange: /* @__PURE__ */ __name((e) => setWelcomeChannelId(e.target.value), "onChange"),
          style: {
            width: "100%",
            padding: "10px 14px",
            backgroundColor: "#1e1f22",
            border: "1px solid #40444b",
            borderRadius: "8px",
            color: "#dcddde",
            fontSize: "14px",
            outline: "none",
            cursor: "pointer",
            transition: "border-color 0.2s"
          },
          onFocus: /* @__PURE__ */ __name((e) => {
            e.target.style.borderColor = "#5865f2";
          }, "onFocus"),
          onBlur: /* @__PURE__ */ __name((e) => {
            e.target.style.borderColor = "#40444b";
          }, "onBlur"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Otomatik (Varsayılan kanal)" }),
            channels.map((ch) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: ch.id, children: [
              ch.name,
              " ",
              ch.category ? `(${ch.category})` : ""
            ] }, ch.id))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "11px", color: "#72767d", marginTop: "4px" }, children: "Hoş geldin mesajlarının gönderileceği kanalı seçin" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { color: "#b9bbbe", fontSize: "12px", fontWeight: "700", display: "block", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.02em" }, children: "Mesaj Şablonu" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: template,
          onChange: /* @__PURE__ */ __name((e) => setTemplate(e.target.value), "onChange"),
          placeholder: "Hoş geldin {mention}! {server} sunucusuna katıldın! Sen #{memberCount}. üyesin! 🎉",
          maxLength: 500,
          style: {
            width: "100%",
            minHeight: "120px",
            padding: "12px",
            backgroundColor: "#1e1f22",
            border: "1px solid #40444b",
            borderRadius: "8px",
            color: "#dcddde",
            fontFamily: "inherit",
            resize: "vertical",
            fontSize: "14px",
            lineHeight: "1.5",
            outline: "none",
            transition: "border-color 0.2s"
          },
          onFocus: /* @__PURE__ */ __name((e) => {
            e.target.style.borderColor = "#5865f2";
          }, "onFocus"),
          onBlur: /* @__PURE__ */ __name((e) => {
            e.target.style.borderColor = "#40444b";
          }, "onBlur")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "11px", color: "#72767d", marginTop: "4px", textAlign: "right" }, children: [
        template.length,
        "/500 karakter"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { color: "#b9bbbe", fontSize: "12px", fontWeight: "700", display: "block", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.02em" }, children: "Kullanılabilir Değişkenler" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: "8px", flexWrap: "wrap" }, children: variables.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => setTemplate((prev) => prev + (prev.endsWith(" ") || !prev ? "" : " ") + v.key), "onClick"),
          title: v.label,
          style: {
            padding: "6px 12px",
            backgroundColor: "#1e1f22",
            border: "1px solid #40444b",
            borderRadius: "6px",
            color: "#5865f2",
            cursor: "pointer",
            fontFamily: "monospace",
            fontSize: "13px",
            transition: "all 0.15s"
          },
          onMouseEnter: /* @__PURE__ */ __name((e) => {
            e.target.style.backgroundColor = "#5865f2";
            e.target.style.color = "#fff";
          }, "onMouseEnter"),
          onMouseLeave: /* @__PURE__ */ __name((e) => {
            e.target.style.backgroundColor = "#1e1f22";
            e.target.style.color = "#5865f2";
          }, "onMouseLeave"),
          children: v.key
        },
        v.key
      )) })
    ] }),
    preview && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { color: "#b9bbbe", fontSize: "12px", fontWeight: "700", display: "block", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.02em" }, children: "Önizleme" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        padding: "14px",
        backgroundColor: "#1e1f22",
        borderRadius: "8px",
        border: "1px solid #40444b",
        color: "#dcddde",
        fontSize: "14px",
        lineHeight: "1.5",
        fontStyle: "italic"
      }, children: preview })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: "10px", marginTop: "4px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: handleSave,
        disabled: saving,
        style: {
          padding: "12px 24px",
          backgroundColor: "#5865f2",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: saving ? "not-allowed" : "pointer",
          fontWeight: "600",
          fontSize: "14px",
          opacity: saving ? 0.5 : 1,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          transition: "opacity 0.2s"
        },
        children: saving ? "⏳ Kaydediliyor..." : "💾 Hoş Geldin Mesajını Kaydet"
      }
    ) })
  ] });
}, "WelcomeTemplateEditor");
const SystemBotEditor = /* @__PURE__ */ __name(({ serverId, serverIcon, fetchWithAuth, apiBaseUrl }) => {
  const [botAvatar, setBotAvatar] = reactExports.useState(null);
  const [botAvatarFile, setBotAvatarFile] = reactExports.useState(null);
  const [botAvatarPreview, setBotAvatarPreview] = reactExports.useState(null);
  const [botName, setBotName] = reactExports.useState("🎉 Sistem");
  const [isCustomAvatar, setIsCustomAvatar] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const loadBotSettings = /* @__PURE__ */ __name(async () => {
      try {
        const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/system-bot/`);
        if (res.ok) {
          const data = await res.json();
          setBotAvatar(data.bot_avatar || null);
          setIsCustomAvatar(data.is_custom_avatar || false);
          setBotName(data.bot_name || "🎉 Sistem");
        }
      } catch (e) {
        console.error("System bot settings load error:", e);
      } finally {
        setLoading(false);
      }
    }, "loadBotSettings");
    loadBotSettings();
  }, [serverId, fetchWithAuth, apiBaseUrl]);
  const handleSave = /* @__PURE__ */ __name(async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      if (botAvatarFile) {
        formData.append("system_bot_avatar", botAvatarFile);
      }
      formData.append("bot_name", botName);
      if (!botAvatarFile && !botAvatar && !botAvatarPreview) {
        formData.append("remove_bot_avatar", "true");
      }
      const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/system-bot/`, {
        method: "POST",
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        setBotAvatar(data.bot_avatar || null);
        setIsCustomAvatar(data.is_custom_avatar || false);
        setBotAvatarFile(null);
        setBotAvatarPreview(null);
        toast.success("Sistem botu ayarları kaydedildi!");
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || "Kaydetme başarısız");
      }
    } catch (e) {
      console.error("Save error:", e);
      toast.error("Kaydederken hata oluştu");
    } finally {
      setSaving(false);
    }
  }, "handleSave");
  const handleRemoveAvatar = /* @__PURE__ */ __name(() => {
    setBotAvatar(null);
    setBotAvatarFile(null);
    setBotAvatarPreview(null);
    setIsCustomAvatar(false);
  }, "handleRemoveAvatar");
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "20px", color: "#b9bbbe", textAlign: "center" }, children: "Yükleniyor..." });
  const displayAvatar = botAvatarPreview || botAvatar || serverIcon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "20px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "16px", backgroundColor: "#2b2d31", borderRadius: "10px", border: "1px solid #40444b" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, { style: { color: "#5865f2", fontSize: "18px" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#dcddde", fontWeight: "600", fontSize: "15px" }, children: "Sistem Botu Hakkında" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#72767d", fontSize: "13px", lineHeight: "1.5", margin: 0 }, children: "Sistem botu, hoş geldin mesajları ve otomatik bildirimler gibi tüm sistem mesajlarını gönderir. Burada botun profil fotoğrafını ve adını özelleştirebilirsiniz. Varsayılan olarak sunucu ikonu kullanılır." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { color: "#b9bbbe", fontSize: "12px", fontWeight: "700", display: "block", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.02em" }, children: "Bot Profil Fotoğrafı" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "20px", padding: "16px", backgroundColor: "#2b2d31", borderRadius: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid #5865f2",
              cursor: "pointer",
              position: "relative",
              backgroundColor: "#1e1f22",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "all 0.2s",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
            },
            onClick: /* @__PURE__ */ __name(() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";
              input.onchange = (e) => {
                const file = e.target.files[0];
                if (!file) return;
                if (file.size > 5 * 1024 * 1024) {
                  toast.warning("Dosya boyutu çok büyük! Maksimum 5MB.");
                  return;
                }
                setBotAvatarFile(file);
                setBotAvatarPreview(URL.createObjectURL(file));
              };
              input.click();
            }, "onClick"),
            children: [
              displayAvatar ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: displayAvatar,
                  alt: "Bot Avatar",
                  style: { width: "100%", height: "100%", objectFit: "cover" }
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "32px" }, children: "🤖" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "rgba(0,0,0,0.7)",
                padding: "3px 0",
                fontSize: "10px",
                color: "#fff",
                textAlign: "center"
              }, children: "Değiştir" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#dcddde", fontSize: "15px", fontWeight: "600" }, children: botName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#72767d", fontSize: "12px", marginTop: "6px" }, children: botAvatarPreview ? "📷 Yeni fotoğraf seçildi (kaydettiğinizde uygulanır)" : isCustomAvatar ? "✓ Özel avatar ayarlanmış" : "🖼️ Sunucu ikonu kullanılıyor (varsayılan)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: "8px", marginTop: "8px" }, children: (isCustomAvatar || botAvatarPreview) && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleRemoveAvatar,
              style: {
                padding: "5px 12px",
                backgroundColor: "transparent",
                border: "1px solid #da373c",
                borderRadius: "4px",
                color: "#da373c",
                cursor: "pointer",
                fontSize: "12px",
                transition: "all 0.2s"
              },
              children: "✗ Avatarı Kaldır"
            }
          ) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { color: "#b9bbbe", fontSize: "12px", fontWeight: "700", display: "block", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.02em" }, children: "Bot Adı" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: botName,
          onChange: /* @__PURE__ */ __name((e) => setBotName(e.target.value), "onChange"),
          maxLength: 50,
          placeholder: "🎉 Sistem",
          style: {
            width: "100%",
            padding: "10px 14px",
            backgroundColor: "#1e1f22",
            border: "1px solid #40444b",
            borderRadius: "8px",
            color: "#dcddde",
            fontSize: "14px",
            outline: "none",
            transition: "border-color 0.2s"
          },
          onFocus: /* @__PURE__ */ __name((e) => {
            e.target.style.borderColor = "#5865f2";
          }, "onFocus"),
          onBlur: /* @__PURE__ */ __name((e) => {
            e.target.style.borderColor = "#40444b";
          }, "onBlur")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "11px", color: "#72767d", marginTop: "4px" }, children: "Sistem mesajlarında görünecek bot adı" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { color: "#b9bbbe", fontSize: "12px", fontWeight: "700", display: "block", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.02em" }, children: "Önizleme" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "14px", backgroundColor: "#1e1f22", borderRadius: "8px", border: "1px solid #40444b" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "flex-start", gap: "12px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          overflow: "hidden",
          backgroundColor: "#2b2d31",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }, children: displayAvatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: displayAvatar, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "18px" }, children: "🤖" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "6px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#5865f2", fontWeight: "600", fontSize: "14px" }, children: botName || "🎉 Sistem" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              backgroundColor: "#5865f2",
              color: "#fff",
              fontSize: "10px",
              padding: "1px 5px",
              borderRadius: "3px",
              fontWeight: "600"
            }, children: "BOT" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#72767d", fontSize: "11px" }, children: [
              "Bugün ",
              (/* @__PURE__ */ new Date()).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#dcddde", fontSize: "14px", marginTop: "4px", lineHeight: "1.4" }, children: "Hoş geldin Kullanıcı! 🎉 Sunucuya katıldın!" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { color: "#b9bbbe", fontSize: "12px", fontWeight: "700", display: "block", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.02em" }, children: "Bu Bot Nerede Kullanılır?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "6px" }, children: [
        { icon: "👋", text: "Hoş geldin mesajları" },
        { icon: "👋", text: "Ayrılma mesajları" },
        { icon: "📢", text: "Sistem bildirimleri" }
      ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", backgroundColor: "#2b2d31", borderRadius: "6px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#dcddde", fontSize: "13px" }, children: item.text })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: "10px", marginTop: "4px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: handleSave,
        disabled: saving,
        style: {
          padding: "12px 24px",
          backgroundColor: "#5865f2",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: saving ? "not-allowed" : "pointer",
          fontWeight: "600",
          fontSize: "14px",
          opacity: saving ? 0.5 : 1,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          transition: "opacity 0.2s"
        },
        children: saving ? "⏳ Kaydediliyor..." : "💾 Sistem Botu Ayarlarını Kaydet"
      }
    ) })
  ] });
}, "SystemBotEditor");
const RolesTab = /* @__PURE__ */ __name(({ server, fetchWithAuth, apiBaseUrl, onRolesChange }) => {
  const [roles, setRolesLocal] = reactExports.useState(server.roles || []);
  const setRoles = /* @__PURE__ */ __name((updater) => {
    setRolesLocal((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      if (onRolesChange) onRolesChange(next);
      return next;
    });
  }, "setRoles");
  const [editingRole, setEditingRole] = reactExports.useState(null);
  const [roleName, setRoleName] = reactExports.useState("");
  const [roleColor, setRoleColor] = reactExports.useState("#99aab5");
  const [permissions, setPermissions] = reactExports.useState({
    is_admin: false,
    can_manage_channels: false,
    can_delete_messages: false,
    can_manage_roles: false,
    can_ban_members: false
  });
  const [showColorPicker, setShowColorPicker] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const startEditRole = /* @__PURE__ */ __name((role) => {
    setEditingRole(role);
    setRoleName(role.name);
    setRoleColor(role.color);
    setPermissions({
      is_admin: !!role.is_admin,
      can_manage_channels: !!role.can_manage_channels,
      can_delete_messages: !!role.can_delete_messages,
      can_manage_roles: !!role.can_manage_roles,
      can_ban_members: !!role.can_ban_members
    });
  }, "startEditRole");
  const resetForm = /* @__PURE__ */ __name(() => {
    setEditingRole(null);
    setRoleName("");
    setRoleColor("#99aab5");
    setPermissions({ is_admin: false, can_manage_channels: false, can_delete_messages: false, can_manage_roles: false, can_ban_members: false });
  }, "resetForm");
  const handleSaveRole = /* @__PURE__ */ __name(async (e) => {
    e.preventDefault();
    if (!roleName.trim()) return;
    setLoading(true);
    const payload = {
      role_id: editingRole ? editingRole.id : null,
      name: roleName,
      color: roleColor,
      is_admin: permissions.is_admin,
      can_manage_channels: permissions.can_manage_channels,
      can_delete_messages: permissions.can_delete_messages,
      can_manage_roles: permissions.can_manage_roles,
      can_ban_members: permissions.can_ban_members
    };
    try {
      const url = editingRole ? `${apiBaseUrl}/roles/${editingRole.id}/update/` : `${apiBaseUrl}/servers/${server.id}/roles/create/`;
      const res = await fetchWithAuth(url, {
        method: editingRole ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const savedRole = await res.json();
        setRoles((prev) => editingRole ? prev.map((r) => r.id === savedRole.id ? savedRole : r) : [...prev, savedRole]);
        resetForm();
        setShowColorPicker(false);
      } else {
        toast.error("Rol kaydedilemedi.");
      }
    } catch (error) {
      console.error("Rol hatası:", error);
    } finally {
      setLoading(false);
    }
  }, "handleSaveRole");
  const handleDeleteRole = /* @__PURE__ */ __name(async (roleId) => {
    if (!await confirmDialog("Bu rolü silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/roles/${roleId}/delete/`, { method: "DELETE" });
      if (res.ok) {
        setRoles((prev) => prev.filter((r) => r.id !== roleId));
        if (editingRole?.id === roleId) resetForm();
      }
    } catch (e) {
      console.error(e);
    }
  }, "handleDeleteRole");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", height: "100%", gap: "20px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.rolesSidebar, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: resetForm, style: styles.newRoleBtn, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
        " Yeni Rol Oluştur"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.rolesList, children: roles.map((role) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: { ...styles.roleItem, backgroundColor: editingRole?.id === role.id ? "#40444b" : "transparent", borderLeft: `4px solid ${role.color}` },
          onClick: /* @__PURE__ */ __name(() => startEditRole(role), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: role.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaEdit, { style: { opacity: 0.5, fontSize: "0.8em" } })
          ]
        },
        role.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.roleEditor, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.editorTitle, children: editingRole ? "Rolü Düzenle" : "Yeni Rol" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inputGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Rol Adı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: roleName, onChange: /* @__PURE__ */ __name((e) => setRoleName(e.target.value), "onChange"), style: styles.input, placeholder: "Örn: Moderatör" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inputGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Rol Rengi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.colorPreview, backgroundColor: roleColor }, onClick: /* @__PURE__ */ __name(() => setShowColorPicker(!showColorPicker), "onClick") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "0.9em", color: "#b9bbbe" }, children: roleColor })
        ] }),
        showColorPicker && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.cover, onClick: /* @__PURE__ */ __name(() => setShowColorPicker(false), "onClick") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", zIndex: 1e3, marginTop: "10px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChromePicker, { color: roleColor, onChange: /* @__PURE__ */ __name((c) => setRoleColor(c.hex), "onChange"), disableAlpha: true }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.permissionsGrid, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.permLabel, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: permissions.is_admin || false, onChange: /* @__PURE__ */ __name((e) => setPermissions({ ...permissions, is_admin: e.target.checked }), "onChange") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#f0b232" }, children: "👑 Yönetici (Her yetkiye sahip)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.permLabel, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: permissions.can_manage_channels || false, onChange: /* @__PURE__ */ __name((e) => setPermissions({ ...permissions, can_manage_channels: e.target.checked }), "onChange") }),
          "Kanal Yönet (Aç/Sil/Düzenle)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.permLabel, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: permissions.can_delete_messages || false, onChange: /* @__PURE__ */ __name((e) => setPermissions({ ...permissions, can_delete_messages: e.target.checked }), "onChange") }),
          "Mesajları Sil"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.permLabel, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: permissions.can_manage_roles || false, onChange: /* @__PURE__ */ __name((e) => setPermissions({ ...permissions, can_manage_roles: e.target.checked }), "onChange") }),
          "Rolleri Yönet (Oluştur/Düzenle/Sil)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.permLabel, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: permissions.can_ban_members || false, onChange: /* @__PURE__ */ __name((e) => setPermissions({ ...permissions, can_ban_members: e.target.checked }), "onChange") }),
          "Üyeleri Yasakla/At"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.editorFooter, children: [
        editingRole && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => handleDeleteRole(editingRole.id), "onClick"), style: styles.deleteBtn, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}),
          " Sil"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSaveRole, style: styles.saveBtn, disabled: loading, children: loading ? "..." : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, {}),
          " Kaydet"
        ] }) })
      ] })
    ] })
  ] });
}, "RolesTab");
const ManagementTab = /* @__PURE__ */ __name(({ server, isOwner, fetchWithAuth, apiBaseUrl, onRefreshServers, onClose }) => {
  const [isMuted, setIsMuted] = reactExports.useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = reactExports.useState("");
  const [showDeleteModal, setShowDeleteModal] = reactExports.useState(false);
  const [serverName, setServerName] = reactExports.useState(server.name || "");
  const [isRenamingServer, setIsRenamingServer] = reactExports.useState(false);
  const [serverDescription, setServerDescription] = reactExports.useState(server.description || "");
  const [isSavingDescription, setIsSavingDescription] = reactExports.useState(false);
  const [defaultChannelSlug, setDefaultChannelSlug] = reactExports.useState(server.metadata?.default_channel_slug || "");
  const [isSavingDefaultChannel, setIsSavingDefaultChannel] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const loadMuteStatus = /* @__PURE__ */ __name(async () => {
      try {
        const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/mute-status/`);
        if (res.ok) {
          const data = await res.json();
          setIsMuted(data.is_muted || false);
        }
      } catch (e) {
        console.error("Mute status load error:", e);
      }
    }, "loadMuteStatus");
    loadMuteStatus();
  }, [server.id, fetchWithAuth, apiBaseUrl]);
  const handleToggleMute = /* @__PURE__ */ __name(async () => {
    try {
      const endpoint = isMuted ? "unmute" : "mute";
      const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/${endpoint}/`, { method: "POST" });
      if (res.ok) {
        setIsMuted(!isMuted);
        toast.success(isMuted ? "Sunucu bildirimleri açıldı!" : "Sunucu bildirimleri kapatıldı!");
      } else {
        const data = await res.json();
        toast.error(data.error || "İşlem başarısız.");
      }
    } catch (e) {
      console.error("Mute hatası:", e);
      toast.error("Bir hata oluştu.");
    }
  }, "handleToggleMute");
  const handleDeleteServer = /* @__PURE__ */ __name(async () => {
    if (deleteConfirmation !== server.name) {
      toast.warning("Sunucu adını doğru yazmadınız!");
      return;
    }
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/delete/`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Sunucu başarıyla silindi!");
        onClose();
        if (onRefreshServers) onRefreshServers();
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      } else {
        const data = await res.json();
        toast.error(data.error || "Sunucu silinemedi.");
      }
    } catch (e) {
      console.error("Delete hatası:", e);
      toast.error("Sunucu silinirken bir hata oluştu.");
    }
  }, "handleDeleteServer");
  const handleSaveDescription = /* @__PURE__ */ __name(async () => {
    setIsSavingDescription(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/update/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: serverDescription })
      });
      if (res.ok) {
        toast.success("Sunucu açıklaması güncellendi!");
        if (onRefreshServers) onRefreshServers();
      } else {
        const data = await res.json();
        toast.error(data.error || "Açıklama kaydedilemedi.");
      }
    } catch (e) {
      console.error("Description hatası:", e);
      toast.error("Açıklama kaydedilirken bir hata oluştu.");
    } finally {
      setIsSavingDescription(false);
    }
  }, "handleSaveDescription");
  const handleSaveDefaultChannel = /* @__PURE__ */ __name(async () => {
    setIsSavingDefaultChannel(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/default-channel/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel_slug: defaultChannelSlug })
      });
      if (res.ok) {
        toast.success("Varsayılan kanal güncellendi!");
        if (onRefreshServers) onRefreshServers();
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || "Varsayılan kanal kaydedilemedi.");
      }
    } catch (e) {
      console.error("Default channel hatası:", e);
      toast.error("Varsayılan kanal kaydedilirken bir hata oluştu.");
    } finally {
      setIsSavingDefaultChannel(false);
    }
  }, "handleSaveDefaultChannel");
  const handleRenameServer = /* @__PURE__ */ __name(async () => {
    const trimmed = serverName.trim();
    if (!trimmed || trimmed === server.name) {
      toast.warning("Geçerli bir isim girin.");
      return;
    }
    setIsRenamingServer(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/update/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed })
      });
      if (res.ok) {
        toast.success("Sunucu adı güncellendi!");
        if (onRefreshServers) onRefreshServers();
      } else {
        const data = await res.json();
        toast.error(data.error || "Sunucu adı değiştirilemedi.");
      }
    } catch (e) {
      console.error("Rename hatası:", e);
      toast.error("Sunucu adı değiştirilirken bir hata oluştu.");
    } finally {
      setIsRenamingServer(false);
    }
  }, "handleRenameServer");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.managementTab, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "🔔 Bildirim Ayarları" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingBox, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.settingLabel, children: isMuted ? "🔇 Sunucu Sessize Alındı" : "🔊 Bildirimler Aktif" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.settingDesc, children: isMuted ? "Bu sunucudan hiçbir bildirim almıyorsunuz." : "Bu sunucudan tüm bildirimleri alıyorsunuz." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleToggleMute, style: { ...styles.actionBtn, backgroundColor: isMuted ? "#23a559" : "#5865f2" }, children: [
        isMuted ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaVolumeUp, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaVolumeMute, {}),
        isMuted ? " Bildirimleri Aç" : " Sessize Al"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.divider }),
    isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "🎨 Sunucu Özelleştirme" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingBox, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingInfo, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingLabel, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaEdit, { style: { marginRight: "8px" } }),
            "Sunucu Adı"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.settingDesc, children: "Sunucunuzun görünen adını değiştirin" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px", alignItems: "center" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: serverName,
              onChange: /* @__PURE__ */ __name((e) => setServerName(e.target.value), "onChange"),
              maxLength: 100,
              style: { padding: "10px 14px", backgroundColor: "#1e1f22", border: "1px solid #40444b", borderRadius: "8px", color: "#dcddde", fontSize: "14px", outline: "none", width: "220px", transition: "border-color 0.2s" },
              onFocus: /* @__PURE__ */ __name((e) => {
                e.target.style.borderColor = "#5865f2";
              }, "onFocus"),
              onBlur: /* @__PURE__ */ __name((e) => {
                e.target.style.borderColor = "#40444b";
              }, "onBlur"),
              placeholder: "Sunucu adı..."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleRenameServer,
              disabled: isRenamingServer || serverName.trim() === server.name,
              style: { ...styles.actionBtn, backgroundColor: serverName.trim() !== server.name ? "#5865f2" : "#4e5058", opacity: isRenamingServer || serverName.trim() === server.name ? 0.5 : 1, cursor: isRenamingServer || serverName.trim() === server.name ? "not-allowed" : "pointer" },
              children: isRenamingServer ? "..." : "Kaydet"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.settingBox, flexDirection: "column", alignItems: "stretch" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingInfo, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingLabel, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaFileAlt, { style: { marginRight: "8px" } }),
            "Sunucu Açıklaması"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.settingDesc, children: "Sunucunuz hakkında kısa bir açıklama yazın" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px", marginTop: "10px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: serverDescription,
              onChange: /* @__PURE__ */ __name((e) => setServerDescription(e.target.value), "onChange"),
              maxLength: 300,
              placeholder: "Bu sunucu hakkında bir açıklama yazın...",
              style: { flex: 1, padding: "10px 14px", backgroundColor: "#1e1f22", border: "1px solid #40444b", borderRadius: "8px", color: "#dcddde", fontSize: "14px", outline: "none", resize: "vertical", minHeight: "60px", fontFamily: "inherit", transition: "border-color 0.2s" },
              onFocus: /* @__PURE__ */ __name((e) => {
                e.target.style.borderColor = "#5865f2";
              }, "onFocus"),
              onBlur: /* @__PURE__ */ __name((e) => {
                e.target.style.borderColor = "#40444b";
              }, "onBlur")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleSaveDescription,
              disabled: isSavingDescription || serverDescription === (server.description || ""),
              style: { ...styles.actionBtn, backgroundColor: serverDescription !== (server.description || "") ? "#5865f2" : "#4e5058", opacity: isSavingDescription || serverDescription === (server.description || "") ? 0.5 : 1, cursor: isSavingDescription || serverDescription === (server.description || "") ? "not-allowed" : "pointer", alignSelf: "flex-start" },
              children: isSavingDescription ? "..." : "Kaydet"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "11px", color: "#72767d", marginTop: "4px", textAlign: "right" }, children: [
          serverDescription.length,
          "/300 karakter"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingBox, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingInfo, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingLabel, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaImage, { style: { marginRight: "8px" } }),
            "Sunucu İkonu"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.settingDesc, children: "Sunucunuzun profil resmini değiştirin (Maks 5MB)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => {
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
              const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/icon/`, { method: "POST", body: formData });
              if (res.ok) {
                toast.success("Sunucu ikonu güncellendi!");
                if (onRefreshServers) onRefreshServers();
              } else {
                const error = await res.json();
                toast.error(`Hata: ${error.error || "Bilinmeyen hata"}`);
              }
            } catch (error) {
              console.error("❌ İkon yükleme hatası:", error);
              toast.error("İkon yüklenirken bir hata oluştu.");
            }
          };
          input.click();
        }, "onClick"), style: styles.actionBtn, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaImage, {}),
          " İkon Değiştir"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingBox, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingInfo, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingLabel, children: [
            server.is_public ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaGlobe, { style: { marginRight: "8px" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaLock, { style: { marginRight: "8px" } }),
            server.is_public ? "Herkese Açık Sunucu" : "Özel Sunucu"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.settingDesc, children: server.is_public ? "Herkes bu sunucuyu bulabilir ve katılabilir." : "Sadece davet edilen kişiler katılabilir." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(async () => {
          const newPrivacy = !server.is_public;
          const message = newPrivacy ? "Sunucuyu herkese açık yapmak istediğinize emin misiniz?" : "Sunucuyu özel yapmak istediğinize emin misiniz?";
          if (!await confirmDialog(message)) return;
          try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/privacy/`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ is_public: newPrivacy })
            });
            if (res.ok) {
              toast.success(`Sunucu ${newPrivacy ? "herkese açık" : "özel"} yapıldı!`);
              if (onRefreshServers) onRefreshServers();
            } else {
              const error = await res.json();
              toast.error(`Hata: ${error.error || "Bilinmeyen hata"}`);
            }
          } catch (error) {
            console.error("❌ Gizlilik ayarı hatası:", error);
            toast.error("Gizlilik ayarı değiştirilirken bir hata oluştu.");
          }
        }, "onClick"), style: { ...styles.actionBtn, backgroundColor: server.is_public ? "#ed4245" : "#43b581" }, children: [
          server.is_public ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaLock, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaGlobe, {}),
          server.is_public ? " Özel Yap" : " Herkese Açık Yap"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingBox, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingInfo, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingLabel, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaComments, { style: { marginRight: "8px" } }),
            "Varsayılan Kanal"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.settingDesc, children: "Kullanıcılar sunucuya girdiğinde ilk gösterilecek kanal" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px", alignItems: "center" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: defaultChannelSlug,
              onChange: /* @__PURE__ */ __name((e) => setDefaultChannelSlug(e.target.value), "onChange"),
              style: { padding: "10px 14px", backgroundColor: "#1e1f22", border: "1px solid #40444b", borderRadius: "8px", color: "#dcddde", fontSize: "14px", outline: "none", width: "220px", cursor: "pointer" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Otomatik (İlk metin kanalı)" }),
                server.categories?.map((cat) => cat.rooms?.filter((r) => r.room_type !== "voice" && r.channel_type !== "voice").map((room) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: room.slug, children: room.name }, room.slug)))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleSaveDefaultChannel,
              disabled: isSavingDefaultChannel || defaultChannelSlug === (server.metadata?.default_channel_slug || ""),
              style: { ...styles.actionBtn, backgroundColor: defaultChannelSlug !== (server.metadata?.default_channel_slug || "") ? "#5865f2" : "#4e5058", opacity: isSavingDefaultChannel || defaultChannelSlug === (server.metadata?.default_channel_slug || "") ? 0.5 : 1, cursor: isSavingDefaultChannel || defaultChannelSlug === (server.metadata?.default_channel_slug || "") ? "not-allowed" : "pointer" },
              children: isSavingDefaultChannel ? "..." : "Kaydet"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.divider })
    ] }),
    isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "⚠️ Tehlikeli Bölge" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.dangerBox, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingInfo, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.settingLabel, children: "🗑️ Sunucuyu Sil" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.settingDesc, children: "Bu işlem geri alınamaz! Tüm kanallar, mesajlar ve ayarlar kalıcı olarak silinir." }),
          showDeleteModal && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.deleteConfirmation, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { margin: "10px 0", color: "#dcddde" }, children: [
              "Silmek için sunucu adını yazın: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: server.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: deleteConfirmation, onChange: /* @__PURE__ */ __name((e) => setDeleteConfirmation(e.target.value), "onChange"), placeholder: server.name, style: styles.confirmInput }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "10px", marginTop: "10px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: handleDeleteServer,
                  disabled: deleteConfirmation !== server.name,
                  style: { ...styles.dangerBtn, opacity: deleteConfirmation !== server.name ? 0.5 : 1, cursor: deleteConfirmation !== server.name ? "not-allowed" : "pointer" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}),
                    " Sunucuyu KALİCİ OLARAK Sil"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => {
                setShowDeleteModal(false);
                setDeleteConfirmation("");
              }, "onClick"), style: styles.cancelBtn, children: "İptal" })
            ] })
          ] })
        ] }),
        !showDeleteModal && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setShowDeleteModal(true), "onClick"), style: styles.dangerBtn, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}),
          " Sunucuyu Sil"
        ] })
      ] })
    ] })
  ] });
}, "ManagementTab");
const ModerationTab = /* @__PURE__ */ __name(({ server, serverMembers, fetchWithAuth, apiBaseUrl, onClose }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.moderationTab, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.moderationHeader, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.moderationTitleSection, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, { style: { fontSize: "28px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { margin: 0, color: "#fff", fontSize: "18px" }, children: "Moderasyon Merkezi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "4px 0 0", color: "#b9bbbe", fontSize: "13px" }, children: "Sunucunuzu güvende tutmak için gelişmiş araçlar" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.serverStats, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statItem, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.statNumber, children: serverMembers?.length || 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.statLabel, children: "Üye" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statItem, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.statNumber, children: server.categories?.reduce((acc, cat) => acc + (cat.rooms?.length || 0), 0) || 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.statLabel, children: "Kanal" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.quickStatsGrid, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.quickStatCard, borderLeft: "4px solid #43b581" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, { style: { fontSize: "20px", color: "#43b581" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.quickStatValue, children: "Aktif" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.quickStatLabel, children: "Moderasyon Durumu" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.quickStatCard, borderLeft: "4px solid #faa61a" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, { style: { fontSize: "20px", color: "#faa61a" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.quickStatValue, children: "0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.quickStatLabel, children: "Bekleyen Rapor" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.quickStatCard, borderLeft: "4px solid #ed4245" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaBan, { style: { fontSize: "20px", color: "#ed4245" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.quickStatValue, children: "0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.quickStatLabel, children: "Yasaklı Kullanıcı" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.moderationCardsGrid, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modCardHeader, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.modCardIcon, backgroundColor: "rgba(88, 101, 242, 0.2)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, { style: { color: "#5865f2", fontSize: "20px" } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.modCardBadge, children: "AI Destekli" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: styles.modCardTitle, children: "Otomatik Moderasyon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.modCardDesc, children: "Spam, küfür, toxic içerik ve zararlı linkleri otomatik tespit edip aksiyonlar alır." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modCardFeatures, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.modCardFeature, children: "🚫 Spam Filtresi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.modCardFeature, children: "🔗 Link Koruması" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.modCardFeature, children: "💬 Toxic Algılama" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: styles.modCardBtn, onClick: /* @__PURE__ */ __name(() => {
          onClose();
          window.showAutoModeration?.();
        }, "onClick"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCog, {}),
          " Ayarları Yapılandır"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modCardHeader, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.modCardIcon, backgroundColor: "rgba(237, 66, 69, 0.2)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, { style: { color: "#ed4245", fontSize: "20px" } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.modCardBadge, backgroundColor: "rgba(237, 66, 69, 0.2)", color: "#ed4245" }, children: "Kritik" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: styles.modCardTitle, children: "Raid Koruması" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.modCardDesc, children: "Toplu katılım saldırılarını tespit eder, otomatik lockdown modunu aktifleştirir." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modCardFeatures, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.modCardFeature, children: "🔒 Lockdown Modu" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.modCardFeature, children: "⏱️ Join Limiti" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.modCardFeature, children: "🛡️ Anti-Bot" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: { ...styles.modCardBtn, backgroundColor: "#ed4245" }, onClick: /* @__PURE__ */ __name(() => {
          onClose();
          window.showRaidProtection?.();
        }, "onClick"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, {}),
          " Korumayı Yönet"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.modCardHeader, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.modCardIcon, backgroundColor: "rgba(250, 166, 26, 0.2)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaGavel, { style: { color: "#faa61a", fontSize: "20px" } }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: styles.modCardTitle, children: "Uyarı Sistemi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.modCardDesc, children: "3 aşamalı uyarı sistemi. Otomatik mute ve ban aksiyonları." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modCardFeatures, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.modCardFeature, children: "⚠️ 3-Strike Sistem" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.modCardFeature, children: "🔇 Otomatik Mute" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.modCardFeature, children: "📝 Uyarı Geçmişi" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: { ...styles.modCardBtn, backgroundColor: "#faa61a" }, onClick: /* @__PURE__ */ __name(() => {
          onClose();
          window.showUserWarnings?.();
        }, "onClick"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaGavel, {}),
          " Uyarıları Yönet"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.modCardHeader, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.modCardIcon, backgroundColor: "rgba(67, 181, 129, 0.2)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaFileAlt, { style: { color: "#43b581", fontSize: "20px" } }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: styles.modCardTitle, children: "Rapor Merkezi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.modCardDesc, children: "Kullanıcı raporlarını incele, aksiyonları takip et ve istatistikleri görüntüle." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modCardFeatures, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.modCardFeature, children: "📋 Rapor Listesi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.modCardFeature, children: "✅ Çözüm Takibi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.modCardFeature, children: "📊 İstatistikler" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: { ...styles.modCardBtn, backgroundColor: "#43b581" }, onClick: /* @__PURE__ */ __name(() => {
          onClose();
          window.showReportSystem?.();
        }, "onClick"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaFileAlt, {}),
          " Raporları Görüntüle"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.modCardHeader, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.modCardIcon, backgroundColor: "rgba(114, 137, 218, 0.2)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, { style: { color: "#7289da", fontSize: "20px" } }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: styles.modCardTitle, children: "Audit Log" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.modCardDesc, children: "Tüm admin ve moderatör aksiyonlarını kronolojik olarak görüntüle." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modCardFeatures, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.modCardFeature, children: "📜 Aksiyon Geçmişi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.modCardFeature, children: "🔍 Filtreleme" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.modCardFeature, children: "📥 Dışa Aktar" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: { ...styles.modCardBtn, backgroundColor: "#7289da" }, onClick: /* @__PURE__ */ __name(() => {
          onClose();
          window.showAuditLog?.();
        }, "onClick"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, {}),
          " Logları Görüntüle"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.modCardHeader, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.modCardIcon, backgroundColor: "rgba(153, 170, 181, 0.2)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, { style: { color: "#99aab5", fontSize: "20px" } }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: styles.modCardTitle, children: "Slow Mode & Timeout" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.modCardDesc, children: "Kanal bazlı slow mode ve kullanıcı timeout yönetimi." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modCardFeatures, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.modCardFeature, children: "⏳ Slow Mode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.modCardFeature, children: "🔇 Timeout" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.modCardFeature, children: "⏰ Süre Yönetimi" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: { ...styles.modCardBtn, backgroundColor: "#99aab5" }, onClick: /* @__PURE__ */ __name(() => {
          onClose();
          window.showSlowMode?.();
        }, "onClick"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {}),
          " Ayarları Yapılandır"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.quickActionsSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { style: styles.quickActionsTitle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaGavel, {}),
        " Hızlı Aksiyonlar"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.quickActionsGrid, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            style: styles.quickActionBtn,
            onClick: /* @__PURE__ */ __name(async () => {
              if (!await confirmDialog("Sunucuyu kilitlemek istediğinize emin misiniz? Sadece yöneticiler mesaj yazabilir.")) return;
              try {
                await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/update/`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ metadata: { ...server.metadata, lockdown: true } })
                });
                toast.success("🔒 Sunucu lockdown moduna alındı!");
              } catch (e) {
                toast.error("İşlem başarısız");
              }
            }, "onClick"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaLock, {}),
              " Sunucuyu Kilitle"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: styles.quickActionBtn, onClick: /* @__PURE__ */ __name(() => toast.info("🚧 Bu özellik yakında eklenecek"), "onClick"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}),
          " Tüm Mesajları Temizle"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            style: styles.quickActionBtn,
            onClick: /* @__PURE__ */ __name(async () => {
              if (!await confirmDialog("Yeni üyelikleri durdurmak istediğinize emin misiniz?")) return;
              try {
                await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/update/`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ metadata: { ...server.metadata, join_disabled: true } })
                });
                toast.success("🚫 Yeni üyelikler durduruldu!");
              } catch (e) {
                toast.error("İşlem başarısız");
              }
            }, "onClick"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserSlash, {}),
              " Yeni Üyeliği Durdur"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: styles.quickActionBtn, onClick: /* @__PURE__ */ __name(() => toast.info("🚧 Bu özellik yakında eklenecek"), "onClick"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaBell, {}),
          " Duyuru Gönder"
        ] })
      ] })
    ] })
  ] });
}, "ModerationTab");
const BansTab = /* @__PURE__ */ __name(({ server, fetchWithAuth, apiBaseUrl }) => {
  const [bans, setBans] = reactExports.useState([]);
  const [bansLoading, setBansLoading] = reactExports.useState(false);
  const loadBans = reactExports.useCallback(async () => {
    setBansLoading(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/bans/`);
      if (res.ok) {
        const data = await res.json();
        setBans(data.bans || []);
      }
    } catch (e) {
      console.error("Ban list load error:", e);
    } finally {
      setBansLoading(false);
    }
  }, [fetchWithAuth, apiBaseUrl, server.id]);
  reactExports.useEffect(() => {
    loadBans();
  }, [loadBans]);
  const handleUnban = /* @__PURE__ */ __name(async (username) => {
    if (!await confirmDialog(`${username} kullanıcısının yasağını kaldırmak istediğinize emin misiniz?`)) return;
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/moderation/unban/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, server_id: server.id })
      });
      if (res.ok) {
        toast.success(`${username} yasağı kaldırıldı!`);
        loadBans();
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || "İşlem başarısız");
      }
    } catch (e) {
      toast.error("Yasak kaldırılırken bir hata oluştu");
    }
  }, "handleUnban");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "16px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", backgroundColor: "#1e1f22", borderRadius: "12px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaBan, { style: { fontSize: "24px", color: "#ed4245" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { margin: 0, color: "#fff", fontSize: "16px" }, children: "Yasaklı Kullanıcılar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { margin: "2px 0 0", color: "#b9bbbe", fontSize: "12px" }, children: [
            bans.length,
            " yasaklı kullanıcı"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: loadBans, style: { ...styles.actionBtn, backgroundColor: "#5865f2", padding: "8px 16px", fontSize: "13px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaUndo, {}),
        " Yenile"
      ] })
    ] }),
    bansLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center", color: "#b9bbbe", padding: "40px" }, children: "Yükleniyor..." }) : bans.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", padding: "60px 20px", backgroundColor: "#2b2d31", borderRadius: "12px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { style: { fontSize: "48px", color: "#43b581", marginBottom: "16px" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", margin: "0 0 8px" }, children: "Temiz!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", fontSize: "14px" }, children: "Henüz yasaklanmış kullanıcı yok." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "8px" }, children: bans.map((ban) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 18px",
      backgroundColor: "#2b2d31",
      borderRadius: "8px",
      border: "1px solid #1e1f22",
      transition: "background-color 0.15s"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          backgroundColor: "#ed4245",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: "700",
          fontSize: "14px"
        }, children: ban.username?.[0]?.toUpperCase() || "?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#fff", fontWeight: "600", fontSize: "14px" }, children: ban.username }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: "#72767d", fontSize: "12px", marginTop: "2px" }, children: [
            ban.reason || "Sebep belirtilmemiş",
            " • Yasaklayan: ",
            ban.banned_by || "Sistem"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: "#4e5058", fontSize: "11px", marginTop: "2px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCalendarAlt, { style: { marginRight: "4px", fontSize: "10px" } }),
            ban.created_at ? new Date(ban.created_at).toLocaleDateString("tr-TR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            }) : "Tarih yok",
            ban.expires_at && !ban.is_permanent && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { marginLeft: "8px", color: "#faa61a" }, children: [
              "⏰ Bitiş: ",
              new Date(ban.expires_at).toLocaleDateString("tr-TR")
            ] }),
            ban.is_permanent && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginLeft: "8px", color: "#ed4245" }, children: "♾️ Kalıcı" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => handleUnban(ban.username), "onClick"),
          style: { padding: "8px 14px", backgroundColor: "transparent", border: "1px solid #43b581", borderRadius: "6px", color: "#43b581", cursor: "pointer", fontWeight: "600", fontSize: "12px", display: "flex", alignItems: "center", gap: "6px", transition: "all 0.15s" },
          onMouseEnter: /* @__PURE__ */ __name((e) => {
            e.target.style.backgroundColor = "#43b581";
            e.target.style.color = "#fff";
          }, "onMouseEnter"),
          onMouseLeave: /* @__PURE__ */ __name((e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#43b581";
          }, "onMouseLeave"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaUndo, {}),
            " Yasağı Kaldır"
          ]
        }
      )
    ] }, ban.id)) })
  ] });
}, "BansTab");
const AuditLogTab = /* @__PURE__ */ __name(({ server, fetchWithAuth, apiBaseUrl }) => {
  const [auditLogs, setAuditLogs] = reactExports.useState([]);
  const [auditLoading, setAuditLoading] = reactExports.useState(false);
  const [auditFilter, setAuditFilter] = reactExports.useState("");
  const loadAuditLogs = reactExports.useCallback(async (filter = "") => {
    setAuditLoading(true);
    try {
      const url = filter ? `${apiBaseUrl}/audit-logs/?action_type=${filter}&limit=100` : `${apiBaseUrl}/audit-logs/?limit=100`;
      const res = await fetchWithAuth(url);
      if (res.ok) {
        const data = await res.json();
        setAuditLogs(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      console.error("Audit log load error:", e);
    } finally {
      setAuditLoading(false);
    }
  }, [fetchWithAuth, apiBaseUrl]);
  reactExports.useEffect(() => {
    loadAuditLogs();
  }, [loadAuditLogs]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "16px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", backgroundColor: "#1e1f22", borderRadius: "12px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, { style: { fontSize: "24px", color: "#7289da" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { margin: 0, color: "#fff", fontSize: "16px" }, children: "Aksiyon Geçmişi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "2px 0 0", color: "#b9bbbe", fontSize: "12px" }, children: "Tüm moderatör ve admin aksiyonları" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: auditFilter,
            onChange: /* @__PURE__ */ __name((e) => {
              setAuditFilter(e.target.value);
              loadAuditLogs(e.target.value);
            }, "onChange"),
            style: { padding: "8px 12px", backgroundColor: "#2b2d31", border: "1px solid #40444b", borderRadius: "6px", color: "#dcddde", fontSize: "12px", outline: "none", cursor: "pointer" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Tüm Aksiyonlar" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "BAN", children: "Yasaklama" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "UNBAN", children: "Yasak Kaldırma" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "KICK", children: "Atma" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ROLE_CHANGE", children: "Rol Değişikliği" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "CHANNEL_CREATE", children: "Kanal Oluşturma" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "CHANNEL_DELETE", children: "Kanal Silme" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "MESSAGE_DELETE", children: "Mesaj Silme" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "SERVER_UPDATE", children: "Sunucu Güncelleme" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "EMAIL_VERIFIED", children: "E-posta Doğrulama" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => loadAuditLogs(auditFilter), "onClick"), style: { ...styles.actionBtn, backgroundColor: "#5865f2", padding: "8px 14px", fontSize: "12px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUndo, {}) })
      ] })
    ] }),
    auditLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center", color: "#b9bbbe", padding: "40px" }, children: "Yükleniyor..." }) : auditLogs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", padding: "60px 20px", backgroundColor: "#2b2d31", borderRadius: "12px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, { style: { fontSize: "48px", color: "#4e5058", marginBottom: "16px" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", margin: "0 0 8px" }, children: "Kayıt Yok" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", fontSize: "14px" }, children: "Henüz kayıtlı aksiyon bulunamadı." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "4px" }, children: auditLogs.map((log, idx) => {
      const actionColors = {
        "BAN": "#ed4245",
        "UNBAN": "#43b581",
        "KICK": "#faa61a",
        "MESSAGE_DELETE": "#f47b67",
        "ROLE_CHANGE": "#5865f2",
        "CHANNEL_CREATE": "#43b581",
        "CHANNEL_DELETE": "#ed4245",
        "SERVER_UPDATE": "#7289da",
        "EMAIL_VERIFIED": "#43b581"
      };
      const actionColor = actionColors[log.action_type] || "#b9bbbe";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 16px",
        backgroundColor: "#2b2d31",
        borderRadius: "6px",
        borderLeft: `3px solid ${actionColor}`
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: "8px", height: "8px", borderRadius: "50%", backgroundColor: actionColor, flexShrink: 0 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#fff", fontWeight: "600", fontSize: "13px" }, children: log.actor_username || log.actor || "Sistem" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { backgroundColor: `${actionColor}22`, color: actionColor, padding: "2px 8px", borderRadius: "10px", fontSize: "11px", fontWeight: "600" }, children: log.action_type })
          ] }),
          log.details && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#72767d", fontSize: "12px", marginTop: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: typeof log.details === "object" ? JSON.stringify(log.details).substring(0, 120) : String(log.details).substring(0, 120) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#4e5058", fontSize: "11px", flexShrink: 0, whiteSpace: "nowrap" }, children: log.timestamp ? new Date(log.timestamp).toLocaleString("tr-TR", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "" })
      ] }, log.id || idx);
    }) })
  ] });
}, "AuditLogTab");
const StatsTab = /* @__PURE__ */ __name(({ server, fetchWithAuth, apiBaseUrl, roles }) => {
  const [serverStats, setServerStats] = reactExports.useState(null);
  const [statsLoading, setStatsLoading] = reactExports.useState(false);
  const loadServerStats = reactExports.useCallback(async () => {
    setStatsLoading(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/stats/overview/`);
      if (res.ok) {
        const data = await res.json();
        setServerStats(data);
      }
    } catch (e) {
      console.error("Stats load error:", e);
    } finally {
      setStatsLoading(false);
    }
  }, [fetchWithAuth, apiBaseUrl, server.id]);
  reactExports.useEffect(() => {
    loadServerStats();
  }, [loadServerStats]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "20px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", backgroundColor: "#1e1f22", borderRadius: "12px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartBar, { style: { fontSize: "24px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { margin: 0, color: "#fff", fontSize: "16px" }, children: "Sunucu İstatistikleri" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "2px 0 0", color: "#b9bbbe", fontSize: "12px" }, children: "Sunucunuzun performans özeti" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: loadServerStats, style: { ...styles.actionBtn, backgroundColor: "#5865f2", padding: "8px 16px", fontSize: "13px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaUndo, {}),
        " Yenile"
      ] })
    ] }),
    statsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center", color: "#b9bbbe", padding: "40px" }, children: "Yükleniyor..." }) : !serverStats ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", padding: "60px 20px", backgroundColor: "#2b2d31", borderRadius: "12px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartBar, { style: { fontSize: "48px", color: "#4e5058", marginBottom: "16px" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", margin: "0 0 8px" }, children: "İstatistikler yüklenemedi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", fontSize: "14px" }, children: "Yenile butonuna basarak tekrar deneyin." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { backgroundColor: "#2b2d31", padding: "20px", borderRadius: "12px", borderLeft: "4px solid #5865f2" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, { style: { color: "#5865f2", fontSize: "18px" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#b9bbbe", fontSize: "12px", fontWeight: "600", textTransform: "uppercase" }, children: "Toplam Üye" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "32px", fontWeight: "800", color: "#fff" }, children: serverStats.total_members ?? serverStats.members ?? 0 }),
          serverStats.online_members !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "12px", color: "#43b581", marginTop: "4px" }, children: [
            "🟢 ",
            serverStats.online_members,
            " çevrimiçi"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { backgroundColor: "#2b2d31", padding: "20px", borderRadius: "12px", borderLeft: "4px solid #43b581" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaComments, { style: { color: "#43b581", fontSize: "18px" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#b9bbbe", fontSize: "12px", fontWeight: "600", textTransform: "uppercase" }, children: "Toplam Mesaj" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "32px", fontWeight: "800", color: "#fff" }, children: (serverStats.total_messages ?? 0).toLocaleString("tr-TR") }),
          serverStats.messages_last_7_days !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "12px", color: "#faa61a", marginTop: "4px" }, children: [
            "📈 Son 7 gün: ",
            serverStats.messages_last_7_days
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { backgroundColor: "#2b2d31", padding: "20px", borderRadius: "12px", borderLeft: "4px solid #faa61a" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaHashtag, { style: { color: "#faa61a", fontSize: "18px" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#b9bbbe", fontSize: "12px", fontWeight: "600", textTransform: "uppercase" }, children: "Kanal Sayısı" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "32px", fontWeight: "800", color: "#fff" }, children: serverStats.total_channels ?? serverStats.rooms ?? 0 })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { backgroundColor: "#2b2d31", padding: "18px", borderRadius: "10px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { style: { margin: "0 0 14px", color: "#fff", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, { style: { color: "#5865f2" } }),
            " Sunucu Bilgileri"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "10px" }, children: [
            { label: "Sunucu Adı", value: serverStats.server_name || server.name },
            { label: "Oluşturulma", value: serverStats.created_at ? new Date(serverStats.created_at).toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" }) : server.created_at ? new Date(server.created_at).toLocaleDateString("tr-TR") : "Bilinmiyor" },
            { label: "Gizlilik", value: server.is_public ? "🌐 Herkese Açık" : "🔒 Özel", color: server.is_public ? "#43b581" : "#faa61a" },
            { label: "Rol Sayısı", value: roles?.length ?? 0 }
          ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", padding: "8px 12px", backgroundColor: "#1e1f22", borderRadius: "6px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#b9bbbe", fontSize: "13px" }, children: item.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: item.color || "#fff", fontSize: "13px", fontWeight: "600" }, children: item.value })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { backgroundColor: "#2b2d31", padding: "18px", borderRadius: "10px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { style: { margin: "0 0 14px", color: "#fff", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, { style: { color: "#43b581" } }),
            " Aktivite Özeti"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "10px" }, children: [
            { label: "Kategori Sayısı", value: server.categories?.length || 0 },
            { label: "Çevrimiçi Üye", value: serverStats.online_members ?? "—", color: "#43b581" },
            { label: "Haftalık Mesaj", value: serverStats.messages_last_7_days ?? "—" }
          ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", padding: "8px 12px", backgroundColor: "#1e1f22", borderRadius: "6px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#b9bbbe", fontSize: "13px" }, children: item.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: item.color || "#fff", fontSize: "13px", fontWeight: "600" }, children: item.value })
          ] }, i)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { backgroundColor: "#2b2d31", padding: "18px", borderRadius: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { style: { margin: "0 0 14px", color: "#fff", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartPie, { style: { color: "#faa61a" } }),
          " Sağlık Göstergeleri"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px" }, children: [
          { label: "Üye Aktivitesi", value: serverStats.online_members && serverStats.total_members ? Math.round(serverStats.online_members / serverStats.total_members * 100) : null, color: "#43b581", suffix: "%" },
          { label: "Günlük Ort. Mesaj", value: serverStats.messages_last_7_days ? Math.round(serverStats.messages_last_7_days / 7) : null, color: "#5865f2", suffix: "" },
          { label: "Üye/Kanal Oranı", value: serverStats.total_channels ? Math.round((serverStats.total_members || 0) / serverStats.total_channels) : null, color: "#faa61a", suffix: ":1" }
        ].map((metric, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "14px", backgroundColor: "#1e1f22", borderRadius: "8px", textAlign: "center" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "24px", fontWeight: "800", color: metric.color }, children: [
            metric.value ?? "—",
            metric.value !== null ? metric.suffix : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "11px", color: "#72767d", marginTop: "4px" }, children: metric.label })
        ] }, i)) })
      ] })
    ] })
  ] });
}, "StatsTab");
const ServerSettingsModal = /* @__PURE__ */ __name(({ onClose, server, currentUsername, fetchWithAuth, apiBaseUrl, serverMembers, onRefreshServers }) => {
  const [activeTab, setActiveTab] = reactExports.useState("roles");
  const isOwner = server.my_permissions?.is_owner || server.owner_username === currentUsername;
  const [roles, setRoles] = reactExports.useState([]);
  const loadRoles = reactExports.useCallback(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/roles/`);
      if (res.ok) {
        const data = await res.json();
        setRoles(Array.isArray(data) ? data : data.roles || []);
      }
    } catch (e) {
      console.error("Roles load error:", e);
    }
  }, [fetchWithAuth, apiBaseUrl, server.id]);
  reactExports.useEffect(() => {
    loadRoles();
  }, [loadRoles]);
  reactExports.useEffect(() => {
    const handleEsc = /* @__PURE__ */ __name((e) => {
      if (e.key === "Escape") onClose();
    }, "handleEsc");
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);
  reactExports.useEffect(() => {
    const id = "server-settings-sidebar-css";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = `
                .ss-nav-item:hover:not(.ss-nav-active) { background: rgba(255,255,255,0.06) !important; color: #dbdee1 !important; }
                .ss-nav-active { background: rgba(88,101,242,0.15) !important; color: #fff !important; }
                .ss-sidebar::-webkit-scrollbar { width: 4px; }
                .ss-sidebar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
                .ss-sidebar::-webkit-scrollbar-track { background: transparent; }
                .ss-close-btn:hover { color: #fff !important; }
            `;
      document.head.appendChild(s);
    }
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);
  if (!isOwner) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.layoutContainer, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.sidebar, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.sidebarHeader, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.sidebarServerIcon, children: server.icon ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: server.icon, alt: "", style: { width: "100%", height: "100%", borderRadius: "12px", objectFit: "cover" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "18px" }, children: server.name?.[0]?.toUpperCase() }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.sidebarServerInfo, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.sidebarServerName, children: server.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.sidebarServerSub, children: "Sunucu AyarlarÄ±" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ss-sidebar", style: styles.sidebarNav, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.navSection, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.navSectionLabel, children: "YÃ–NETÄ°M" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `ss-nav-item${activeTab === "management" ? " ss-nav-active" : ""}`, style: { ...styles.navItem, ...activeTab === "management" ? styles.navItemActive : {} }, onClick: /* @__PURE__ */ __name(() => setActiveTab("management"), "onClick"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCog, { style: styles.navIcon }),
            " Genel Ayarlar"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `ss-nav-item${activeTab === "roles" ? " ss-nav-active" : ""}`, style: { ...styles.navItem, ...activeTab === "roles" ? styles.navItemActive : {} }, onClick: /* @__PURE__ */ __name(() => setActiveTab("roles"), "onClick"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, { style: styles.navIcon }),
            " Roller"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `ss-nav-item${activeTab === "members" ? " ss-nav-active" : ""}`, style: { ...styles.navItem, ...activeTab === "members" ? styles.navItemActive : {} }, onClick: /* @__PURE__ */ __name(() => setActiveTab("members"), "onClick"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, { style: styles.navIcon }),
            " Ãœyeler"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.navDivider }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.navSection, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.navSectionLabel, children: "Ã–ZELLÄ°KLER" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `ss-nav-item${activeTab === "autoresponders" ? " ss-nav-active" : ""}`, style: { ...styles.navItem, ...activeTab === "autoresponders" ? styles.navItemActive : {} }, onClick: /* @__PURE__ */ __name(() => setActiveTab("autoresponders"), "onClick"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, { style: styles.navIcon }),
            " Otomatik YanÄ±tlar"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `ss-nav-item${activeTab === "vanity" ? " ss-nav-active" : ""}`, style: { ...styles.navItem, ...activeTab === "vanity" ? styles.navItemActive : {} }, onClick: /* @__PURE__ */ __name(() => setActiveTab("vanity"), "onClick"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaLink, { style: styles.navIcon }),
            " Ã–zel URL"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `ss-nav-item${activeTab === "welcome" ? " ss-nav-active" : ""}`, style: { ...styles.navItem, ...activeTab === "welcome" ? styles.navItemActive : {} }, onClick: /* @__PURE__ */ __name(() => setActiveTab("welcome"), "onClick"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaHandPaper, { style: styles.navIcon }),
            " HoÅŸ Geldin MesajÄ±"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `ss-nav-item${activeTab === "systembot" ? " ss-nav-active" : ""}`, style: { ...styles.navItem, ...activeTab === "systembot" ? styles.navItemActive : {} }, onClick: /* @__PURE__ */ __name(() => setActiveTab("systembot"), "onClick"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, { style: styles.navIcon }),
            " Sistem Botu"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.navDivider }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.navSection, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.navSectionLabel, children: "GÃœVENLÄ°K" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `ss-nav-item${activeTab === "moderation" ? " ss-nav-active" : ""}`, style: { ...styles.navItem, ...activeTab === "moderation" ? styles.navItemActive : {} }, onClick: /* @__PURE__ */ __name(() => setActiveTab("moderation"), "onClick"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaGavel, { style: styles.navIcon }),
            " Moderasyon"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `ss-nav-item${activeTab === "bans" ? " ss-nav-active" : ""}`, style: { ...styles.navItem, ...activeTab === "bans" ? styles.navItemActive : {} }, onClick: /* @__PURE__ */ __name(() => setActiveTab("bans"), "onClick"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaBan, { style: styles.navIcon }),
            " Ban YÃ¶netimi"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `ss-nav-item${activeTab === "auditlog" ? " ss-nav-active" : ""}`, style: { ...styles.navItem, ...activeTab === "auditlog" ? styles.navItemActive : {} }, onClick: /* @__PURE__ */ __name(() => setActiveTab("auditlog"), "onClick"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, { style: styles.navIcon }),
            " Audit Log"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.navDivider }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.navSection, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.navSectionLabel, children: "ANALÄ°TÄ°K" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `ss-nav-item${activeTab === "stats" ? " ss-nav-active" : ""}`, style: { ...styles.navItem, ...activeTab === "stats" ? styles.navItemActive : {} }, onClick: /* @__PURE__ */ __name(() => setActiveTab("stats"), "onClick"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartBar, { style: styles.navIcon }),
            " Ä°statistikler"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.mainContent, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.contentHeader, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: styles.contentTitle, children: [
          activeTab === "roles" && "ðŸ›¡ï¸ Roller",
          activeTab === "members" && "ðŸ‘¥ Ãœyeler",
          activeTab === "management" && "âš™ï¸ Genel Ayarlar",
          activeTab === "autoresponders" && "ðŸ¤– Otomatik YanÄ±tlar",
          activeTab === "vanity" && "ðŸ”— Ã–zel Davet URL",
          activeTab === "welcome" && "ðŸ‘‹ HoÅŸ Geldin MesajÄ±",
          activeTab === "moderation" && "ðŸ›¡ï¸ Moderasyon",
          activeTab === "bans" && "ðŸš« Ban YÃ¶netimi",
          activeTab === "auditlog" && "ðŸ“œ Audit Log",
          activeTab === "stats" && "ðŸ“Š Sunucu Ä°statistikleri",
          activeTab === "systembot" && "ðŸ¤– Sistem Botu AyarlarÄ±"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "ss-close-btn", onClick: onClose, style: styles.closeBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { size: 20 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
        activeTab === "roles" && /* @__PURE__ */ jsxRuntimeExports.jsx(RolesTab, { server, fetchWithAuth, apiBaseUrl, onRolesChange: setRoles }),
        activeTab === "members" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ServerMembers,
          {
            members: serverMembers || [],
            roles,
            serverId: server.id,
            fetchWithAuth,
            apiBaseUrl,
            onRefresh: /* @__PURE__ */ __name(() => {
            }, "onRefresh")
          }
        ),
        activeTab === "management" && /* @__PURE__ */ jsxRuntimeExports.jsx(ManagementTab, { server, isOwner, fetchWithAuth, apiBaseUrl, onRefreshServers, onClose }),
        activeTab === "autoresponders" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "ðŸ¤– Otomatik YanÄ±tlar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", marginBottom: "20px" }, children: "Belirli anahtar kelimeler iÃ§in otomatik yanÄ±tlar oluÅŸturun." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AutoResponderManager, { serverId: server.id, fetchWithAuth, apiBaseUrl, embedded: true })
        ] }),
        activeTab === "vanity" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "ðŸ”— Ã–zel Davet URL'i" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", marginBottom: "20px" }, children: "Sunucunuz iÃ§in hatÄ±rlanmasÄ± kolay Ã¶zel bir URL oluÅŸturun." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(VanityURLManager, { serverId: server.id, fetchWithAuth, apiBaseUrl, embedded: true })
        ] }),
        activeTab === "welcome" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "ðŸ‘‹ HoÅŸ Geldin MesajÄ±" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", marginBottom: "20px" }, children: "Yeni Ã¼yeler iÃ§in Ã¶zel hoÅŸ geldin mesajÄ± oluÅŸturun." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(WelcomeTemplateEditor, { serverId: server.id, fetchWithAuth, apiBaseUrl })
        ] }),
        activeTab === "systembot" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SystemBotEditor, { serverId: server.id, serverIcon: server.icon, fetchWithAuth, apiBaseUrl }) }),
        activeTab === "moderation" && /* @__PURE__ */ jsxRuntimeExports.jsx(ModerationTab, { server, serverMembers, fetchWithAuth, apiBaseUrl, onClose }),
        activeTab === "bans" && /* @__PURE__ */ jsxRuntimeExports.jsx(BansTab, { server, fetchWithAuth, apiBaseUrl }),
        activeTab === "auditlog" && /* @__PURE__ */ jsxRuntimeExports.jsx(AuditLogTab, { server, fetchWithAuth, apiBaseUrl }),
        activeTab === "stats" && /* @__PURE__ */ jsxRuntimeExports.jsx(StatsTab, { server, fetchWithAuth, apiBaseUrl, roles })
      ] })
    ] })
  ] }) }) });
}, "ServerSettingsModal");
export {
  ServerSettingsModal as default
};
