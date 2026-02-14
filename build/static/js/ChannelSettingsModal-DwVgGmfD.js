var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { j as jsxRuntimeExports, r as reactExports, f as ReactDOM } from "./react-core-BiY6fgAJ.js";
import { h as FaLock, ax as FaGlobe, d as FaExclamationTriangle, bP as FaBroadcastTower, a6 as FaUserFriends, z as FaClock, g as FaTrash, aY as FaSave, b9 as FaUserShield, an as FaPlus, j as FaLink, B as FaRobot, k as FaBell, a0 as FaEye, aB as FaHistory, O as FaChartLine, a as FaTimes, az as FaCog, a1 as FaShieldAlt } from "./icons-vendor-2VDeY8fW.js";
import { t as toast, d as confirmDialog } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    padding: "20px",
    overflow: "auto"
  },
  modal: {
    background: "#313338",
    width: "960px",
    maxWidth: "100%",
    borderRadius: "8px",
    overflow: "hidden",
    maxHeight: "calc(100vh - 40px)",
    display: "flex",
    flexDirection: "column",
    minHeight: "600px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
    position: "relative",
    alignSelf: "center"
  },
  header: {
    padding: "24px 28px",
    borderBottom: "1px solid #1e1f22",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    flexShrink: 0
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#bbb",
    cursor: "pointer",
    fontSize: "1.4em",
    transition: "color 0.2s",
    padding: "8px"
  },
  tabs: {
    display: "flex",
    borderBottom: "1px solid #1e1f22",
    background: "#2b2d31",
    flexShrink: 0
  },
  tab: {
    flex: 1,
    padding: "14px 20px",
    background: "transparent",
    border: "none",
    color: "#949ba4",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    fontSize: "1em",
    transition: "all 0.2s",
    borderBottom: "2px solid transparent"
  },
  tabActive: {
    flex: 1,
    padding: "14px 20px",
    background: "transparent",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    fontSize: "1em",
    fontWeight: "bold",
    borderBottom: "2px solid #5865f2"
  },
  body: {
    padding: "28px 32px",
    overflowY: "auto",
    flex: 1
  },
  section: {
    marginBottom: "24px",
    color: "#dbdee1",
    fontSize: "1em"
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    background: "#1e1f22",
    border: "1px solid #1e1f22",
    color: "white",
    borderRadius: "6px",
    marginTop: "8px",
    boxSizing: "border-box",
    fontSize: "0.95em",
    transition: "border-color 0.2s"
  },
  rolesList: {
    maxHeight: "250px",
    overflowY: "auto",
    background: "#2b2d31",
    padding: "12px",
    borderRadius: "6px",
    marginTop: "12px"
  },
  roleItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 12px",
    cursor: "pointer",
    borderBottom: "1px solid #333",
    color: "white",
    alignItems: "center",
    fontSize: "0.95em",
    borderRadius: "4px",
    transition: "background-color 0.2s"
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "28px",
    paddingTop: "20px",
    borderTop: "1px solid #1e1f22"
  },
  saveBtn: {
    background: "#23a559",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontWeight: "bold",
    fontSize: "0.95em",
    transition: "background-color 0.2s"
  },
  deleteBtn: {
    background: "transparent",
    color: "#da373c",
    border: "1px solid #da373c",
    padding: "12px 24px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: "0.95em",
    transition: "all 0.2s"
  },
  permissionsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    paddingBottom: "10px",
    borderBottom: "1px solid #1e1f22"
  },
  addPermBtn: {
    background: "#5865f2",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "0.9em",
    fontWeight: "bold"
  },
  permSection: {
    marginBottom: "20px"
  },
  permissionItem: {
    background: "#2b2d31",
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    position: "relative"
  },
  removeBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "#da373c",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.8em"
  },
  addPermModal: {
    background: "#2b2d31",
    padding: "20px",
    borderRadius: "8px",
    marginTop: "20px",
    border: "2px solid #5865f2"
  },
  cancelBtn: {
    background: "transparent",
    color: "#b9bbbe",
    border: "1px solid #4e5058",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.95em",
    transition: "all 0.2s"
  },
  confirmBtn: {
    background: "#5865f2",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.95em",
    fontWeight: "bold",
    transition: "background-color 0.2s"
  },
  label: {
    color: "#b5bac1",
    fontSize: "0.875em",
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: "8px",
    display: "block",
    letterSpacing: "0.5px"
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    cursor: "pointer",
    fontSize: "0.95em",
    padding: "8px 0"
  },
  // 🔗 ENTEGRASYONLAR TAB STİLLERİ
  integrationHeader: {
    marginBottom: "24px",
    paddingBottom: "16px",
    borderBottom: "1px solid #1e1f22"
  },
  integrationCard: {
    background: "#2b2d31",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #3f4147",
    transition: "border-color 0.2s"
  },
  integrationCardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },
  integrationIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "rgba(88, 101, 242, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  integrationTitle: {
    color: "#fff",
    fontSize: "1em",
    fontWeight: "bold",
    margin: 0
  },
  integrationDesc: {
    color: "#72767d",
    fontSize: "0.85em",
    margin: "4px 0 0 0"
  },
  integrationBtn: {
    background: "#5865f2",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.9em",
    fontWeight: "bold",
    transition: "background-color 0.2s"
  },
  // ⚙️ GELİŞMİŞ TAB STİLLERİ
  advancedSection: {
    background: "#2b2d31",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "16px",
    border: "1px solid #3f4147"
  },
  advancedSectionTitle: {
    color: "#fff",
    fontSize: "1em",
    fontWeight: "bold",
    margin: "0 0 16px 0",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  advancedOption: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderTop: "1px solid #3f4147"
  },
  advancedOptionTitle: {
    color: "#dbdee1",
    fontSize: "0.95em",
    fontWeight: "500",
    margin: 0
  },
  advancedOptionDesc: {
    color: "#72767d",
    fontSize: "0.8em",
    margin: "4px 0 0 0"
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px"
  },
  statBox: {
    background: "#1e1f22",
    borderRadius: "8px",
    padding: "16px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },
  statValue: {
    color: "#5865f2",
    fontSize: "1.5em",
    fontWeight: "bold"
  },
  statLabel: {
    color: "#72767d",
    fontSize: "0.8em"
  },
  dangerZone: {
    background: "rgba(237, 66, 69, 0.1)",
    borderRadius: "12px",
    padding: "20px",
    marginTop: "24px",
    border: "1px solid rgba(237, 66, 69, 0.3)"
  },
  dangerZoneTitle: {
    color: "#ed4245",
    fontSize: "1em",
    fontWeight: "bold",
    margin: "0 0 16px 0",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  dangerBtnSmall: {
    background: "#ed4245",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.85em",
    fontWeight: "bold"
  },
  dangerBtnLarge: {
    background: "#ed4245",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.9em",
    fontWeight: "bold",
    transition: "background-color 0.2s"
  }
};
const GeneralTab = /* @__PURE__ */ __name(({
  name,
  setName,
  isPrivate,
  handlePrivateChange,
  isNsfw,
  handleNsfwChange,
  isLocked,
  handleLockedChange,
  isReadOnly,
  handleReadOnlyChange,
  isVoiceChannel,
  userLimit,
  handleUserLimitChange,
  bitrate,
  setBitrate,
  selectedRoles,
  toggleRole,
  serverRoles,
  handleDelete,
  handleSave
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Kanal Adı" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: name,
          onChange: /* @__PURE__ */ __name((e) => setName(e.target.value), "onChange"),
          style: styles.input
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.section, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.checkboxLabel, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "checkbox",
          checked: isPrivate,
          onChange: handlePrivateChange
        }
      ),
      isPrivate ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaLock, { color: "#f04747" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaGlobe, { color: "#43b581" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isPrivate ? "🔒 Özel Kanal (İzinli roller)" : "🌍 Herkese Açık Kanal" })
    ] }) }),
    isPrivate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.rolesList, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "0.9em", color: "#ccc" }, children: "Kimler erişebilir?" }),
      serverRoles.map((role) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.roleItem, onClick: /* @__PURE__ */ __name(() => toggleRole(role.id), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 12, height: 12, borderRadius: "50%", backgroundColor: role.color } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: role.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: selectedRoles.includes(role.id), readOnly: true })
      ] }, role.id))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.checkboxLabel, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: isNsfw, onChange: handleNsfwChange }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, { color: "#f04747", size: 16 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🔞 NSFW (18+ İçerik)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "0.875em", color: "#949ba4", marginTop: "8px", marginLeft: "28px", fontStyle: "italic" }, children: "Yetişkin içerik uyarısı gösterilir." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.checkboxLabel, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            checked: isLocked,
            onChange: handleLockedChange
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaLock, { color: "#f04747", size: 14 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🔒 Kanal Kilitli" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "0.875em", color: "#949ba4", marginTop: "8px", marginLeft: "28px", fontStyle: "italic" }, children: "Kimse mesaj gönderemez (geçici kilitleme)." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.checkboxLabel, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: isReadOnly, onChange: handleReadOnlyChange }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaBroadcastTower, { color: "#faa61a", size: 16 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📢 Duyuru Kanalı (Sadece Admin Yazar)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "0.875em", color: "#949ba4", marginTop: "8px", marginLeft: "28px", fontStyle: "italic" }, children: "Herkes okuyabilir, sadece adminler yazabilir." })
    ] }),
    isVoiceChannel && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: { ...styles.label, display: "flex", alignItems: "center", gap: 10 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserFriends, { size: 14 }),
          " Kullanıcı Limiti"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            min: "0",
            max: "99",
            value: userLimit,
            onChange: handleUserLimitChange,
            style: styles.input,
            placeholder: "0 = Sınırsız"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "0.875em", color: "#949ba4", marginTop: "8px", fontStyle: "italic" }, children: "Max kişi sayısı (0 = limitsiz)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: { ...styles.label, display: "flex", alignItems: "center", gap: 10 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, { size: 14 }),
          " Ses Kalitesi (Bitrate)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: bitrate, onChange: /* @__PURE__ */ __name((e) => setBitrate(parseInt(e.target.value)), "onChange"), style: styles.input, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 8, children: "8 kbps (Düşük)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 32, children: "32 kbps" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 64, children: "64 kbps (Normal)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 96, children: "96 kbps (İyi)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 128, children: "128 kbps (Yüksek)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 256, children: "256 kbps (Çok Yüksek)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 384, children: "384 kbps (Maksimum)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "0.85em", color: "#949ba4", marginTop: "6px", fontStyle: "italic" }, children: "Yüksek bitrate = daha iyi ses" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.footer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleDelete, style: styles.deleteBtn, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}),
        " Kanalı Sil"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSave, style: styles.saveBtn, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaSave, {}),
        " Kaydet"
      ] })
    ] })
  ] });
}, "GeneralTab");
const PermissionsTab = /* @__PURE__ */ __name(({
  permissions,
  showAddPermission,
  setShowAddPermission,
  permissionType,
  setPermissionType,
  selectedRoleForPerm,
  setSelectedRoleForPerm,
  selectedUserForPerm,
  setSelectedUserForPerm,
  searchUser,
  setSearchUser,
  searchResults,
  setSearchResults,
  searchUsers,
  removePermission,
  addPermission
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.permissionsHeader, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { style: { margin: 0, color: "#fff" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserShield, {}),
        " Kanal İzinleri"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setShowAddPermission(true), "onClick"), style: styles.addPermBtn, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
        " İzin Ekle"
      ] })
    ] }),
    permissions.role_permissions?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.permSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { style: { color: "#b9bbbe", fontSize: "0.9em", marginBottom: "10px" }, children: "ROL İZİNLERİ" }),
      permissions.role_permissions.map((perm) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.permissionItem, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 12, height: 12, borderRadius: "50%", backgroundColor: perm.role_color } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontWeight: "bold" }, children: perm.role_name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "0.85em", color: "#949ba4", marginTop: "5px" }, children: [
          perm.can_view && "👁 Görüntüle ",
          perm.can_send_messages && "✏️ Mesaj ",
          perm.can_connect && "🎤 Bağlan ",
          perm.can_speak && "🔊 Konuş "
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => removePermission(perm.id), "onClick"), style: styles.removeBtn, children: "Kaldır" })
      ] }, perm.id))
    ] }),
    permissions.user_permissions?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.permSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { style: { color: "#b9bbbe", fontSize: "0.9em", marginBottom: "10px" }, children: "KULLANICI İZİNLERİ" }),
      permissions.user_permissions.map((perm) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.permissionItem, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: perm.avatar || "/default-avatar.png",
              alt: perm.username,
              style: { width: 24, height: 24, borderRadius: "50%" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: perm.username })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "0.85em", color: "#949ba4", marginTop: "5px" }, children: [
          perm.can_view && "👁 Görüntüle ",
          perm.can_send_messages && "✏️ Mesaj ",
          perm.can_connect && "🎤 Bağlan "
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => removePermission(perm.id), "onClick"), style: styles.removeBtn, children: "Kaldır" })
      ] }, perm.id))
    ] }),
    permissions.role_permissions?.length === 0 && permissions.user_permissions?.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", padding: "40px", color: "#949ba4" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaLock, { size: 40, style: { opacity: 0.3, marginBottom: "10px" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz özel izin tanımlanmamış" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "0.85em" }, children: "Belirli roller veya kullanıcılara özel izinler tanımlayabilirsiniz" })
    ] }),
    showAddPermission && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.addPermModal, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { style: { color: "#fff", marginBottom: "15px" }, children: "İzin Ekle" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "15px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { color: "#b9bbbe", fontSize: "0.9em" }, children: "İzin Türü" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: permissionType,
            onChange: /* @__PURE__ */ __name((e) => setPermissionType(e.target.value), "onChange"),
            style: styles.input,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "role", children: "Rol" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "user", children: "Kullanıcı" })
            ]
          }
        )
      ] }),
      permissionType === "role" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "15px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { color: "#b9bbbe", fontSize: "0.9em" }, children: "Rol Seç" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: selectedRoleForPerm || "",
            onChange: /* @__PURE__ */ __name((e) => setSelectedRoleForPerm(e.target.value), "onChange"),
            style: styles.input,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Rol seçin..." }),
              permissions.available_roles?.map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: role.id, children: role.name }, role.id))
            ]
          }
        )
      ] }),
      permissionType === "user" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "15px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { color: "#b9bbbe", fontSize: "0.9em" }, children: "Kullanıcı Ara" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Kullanıcı adı yazın... (min 2 karakter)",
            value: searchUser,
            onChange: /* @__PURE__ */ __name((e) => {
              setSearchUser(e.target.value);
              searchUsers(e.target.value);
            }, "onChange"),
            style: styles.input
          }
        ),
        searchResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          background: "#1e1f22",
          borderRadius: "6px",
          marginTop: "8px",
          maxHeight: "200px",
          overflowY: "auto",
          border: "1px solid #4e5058"
        }, children: searchResults.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            onClick: /* @__PURE__ */ __name(() => {
              setSelectedUserForPerm(user.id);
              setSearchUser(user.username);
              setSearchResults([]);
            }, "onClick"),
            style: {
              padding: "10px 12px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              borderBottom: "1px solid #2b2d31",
              backgroundColor: selectedUserForPerm === user.id ? "#5865f2" : "transparent",
              transition: "background-color 0.2s"
            },
            onMouseEnter: /* @__PURE__ */ __name((e) => {
              if (selectedUserForPerm !== user.id) {
                e.currentTarget.style.backgroundColor = "#2b2d31";
              }
            }, "onMouseEnter"),
            onMouseLeave: /* @__PURE__ */ __name((e) => {
              if (selectedUserForPerm !== user.id) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }, "onMouseLeave"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: user.avatar || "/default-avatar.png",
                  alt: user.username,
                  style: { width: 24, height: 24, borderRadius: "50%" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#fff", fontSize: "0.95em" }, children: user.username })
            ]
          },
          user.id
        )) }),
        searchUser && searchResults.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "0.8em", color: "#949ba4", marginTop: "5px" }, children: searchUser.length < 2 ? "En az 2 karakter girin" : "Kullanıcı bulunamadı" }),
        selectedUserForPerm && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { fontSize: "0.85em", color: "#43b581", marginTop: "5px" }, children: [
          "✅ Kullanıcı seçildi: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: searchUser })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "10px", justifyContent: "flex-end" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => {
          setShowAddPermission(false);
          setSearchUser("");
          setSearchResults([]);
          setSelectedUserForPerm(null);
          setSelectedRoleForPerm(null);
        }, "onClick"), style: styles.cancelBtn, children: "İptal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: addPermission, style: styles.confirmBtn, children: "Ekle" })
      ] })
    ] })
  ] });
}, "PermissionsTab");
const IntegrationsTab = /* @__PURE__ */ __name(({
  room,
  fetchWithAuth,
  apiBaseUrl,
  notificationPref,
  setNotificationPref
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.integrationHeader, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { style: { margin: 0, color: "#fff" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaLink, {}),
        " Kanal Entegrasyonları"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#72767d", fontSize: "13px", marginTop: "8px" }, children: "Webhooklar, botlar ve dış servisler ile entegrasyon ayarları" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.integrationCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.integrationCardHeader, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.integrationIcon, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, { style: { color: "#5865f2", fontSize: "20px" } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { style: styles.integrationTitle, children: "Webhook" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.integrationDesc, children: "Bu kanala mesaj göndermek için webhook URL'i oluşturun" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          style: styles.integrationBtn,
          onClick: /* @__PURE__ */ __name(async () => {
            try {
              const res = await fetchWithAuth(`${apiBaseUrl}/webhooks/create/`, {
                method: "POST",
                body: JSON.stringify({ room_id: room.id, name: `${room.name} Webhook` })
              });
              if (res.ok) {
                const data = await res.json();
                navigator.clipboard.writeText(data.url);
                toast.success("Webhook oluşturuldu ve kopyalandı!");
              } else {
                toast.error("Webhook oluşturulamadı");
              }
            } catch (e) {
              console.error(e);
              toast.error("Hata oluştu");
            }
          }, "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
            " Webhook Oluştur"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.integrationCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.integrationCardHeader, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.integrationIcon, backgroundColor: "rgba(250, 166, 26, 0.2)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaBell, { style: { color: "#faa61a", fontSize: "20px" } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { style: styles.integrationTitle, children: "Bildirim Ayarları" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.integrationDesc, children: "Bu kanal için bildirim tercihlerini yapılandırın" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          style: { ...styles.input, maxWidth: "200px" },
          value: notificationPref,
          onChange: /* @__PURE__ */ __name(async (e) => {
            const val = e.target.value;
            setNotificationPref(val);
            try {
              await fetchWithAuth(`${apiBaseUrl}/channels/${room.slug}/notification-preference/`, {
                method: "POST",
                body: JSON.stringify({ preference: val })
              });
              toast.success("Bildirim tercihi güncellendi!");
            } catch (err) {
              console.error("Bildirim tercihi güncellenemedi:", err);
              toast.error("Bildirim tercihi güncellenemedi");
            }
          }, "onChange"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Tüm Mesajlar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "mentions", children: "Sadece Mention" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "none", children: "Bildirimsiz" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.integrationCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.integrationCardHeader, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.integrationIcon, backgroundColor: "rgba(67, 181, 129, 0.2)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaEye, { style: { color: "#43b581", fontSize: "20px" } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { style: styles.integrationTitle, children: "Kanal Takibi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.integrationDesc, children: "Bu kanalı başka bir sunucuya yansıtın (mirror)" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          style: { ...styles.integrationBtn, backgroundColor: "#43b581" },
          onClick: /* @__PURE__ */ __name(async () => {
            try {
              const res = await fetchWithAuth(`${apiBaseUrl}/channels/${room.slug}/follow-link/`, {
                method: "POST"
              });
              if (res.ok) {
                const data = await res.json();
                if (data.url) {
                  navigator.clipboard.writeText(data.url);
                  toast.success("Takip linki oluşturuldu ve kopyalandı!");
                } else {
                  toast.success("Kanal takibi aktif edildi!");
                }
              } else {
                toast.error("Takip linki oluşturulamadı");
              }
            } catch (err) {
              console.error("Takip linki hatası:", err);
              toast.error("Hata oluştu");
            }
          }, "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaLink, {}),
            " Takip Linki Oluştur"
          ]
        }
      )
    ] })
  ] });
}, "IntegrationsTab");
const AdvancedTab = /* @__PURE__ */ __name(({
  room,
  serverRoles,
  deleteHistoryDays,
  setDeleteHistoryDays,
  fetchWithAuth,
  apiBaseUrl,
  updateChannelRestriction,
  handleDelete
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.integrationHeader, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { style: { margin: 0, color: "#fff" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, {}),
        " Gelişmiş Ayarlar"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#72767d", fontSize: "13px", marginTop: "8px" }, children: "Kanal geçmişi, arşiv ve tehlikeli işlemler" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.advancedSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h5", { style: styles.advancedSectionTitle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, {}),
        " Mesaj Geçmişi"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.advancedOption, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.advancedOptionTitle, children: "Mesaj Geçmişini Sil" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.advancedOptionDesc, children: "Son X günün mesajlarını toplu olarak sil" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              style: { ...styles.input, width: "100px" },
              value: deleteHistoryDays,
              onChange: /* @__PURE__ */ __name((e) => setDeleteHistoryDays(e.target.value), "onChange"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "1", children: "1 Gün" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "7", children: "7 Gün" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "30", children: "30 Gün" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Tümü" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              style: styles.dangerBtnSmall,
              onClick: /* @__PURE__ */ __name(async () => {
                if (!await confirmDialog(`Son ${deleteHistoryDays === "all" ? "tüm" : deleteHistoryDays + " günlük"} mesajları silmek istediğinize emin misiniz? Bu işlem geri alınamaz!`)) return;
                try {
                  const res = await fetchWithAuth(`${apiBaseUrl}/rooms/${room.slug}/clear-history/`, {
                    method: "POST",
                    body: JSON.stringify({ days: deleteHistoryDays })
                  });
                  if (res.ok) {
                    toast.success("Mesaj geçmişi silindi!");
                  } else {
                    toast.error("Mesaj geçmişi silinemedi");
                  }
                } catch (err) {
                  console.error("Mesaj geçmişi silme hatası:", err);
                  toast.error("Hata oluştu");
                }
              }, "onClick"),
              children: "Sil"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.advancedSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h5", { style: styles.advancedSectionTitle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {}),
        " Slow Mode"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.advancedOption, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.advancedOptionTitle, children: "Mesaj Bekleme Süresi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.advancedOptionDesc, children: "Kullanıcılar arasındaki minimum bekleme süresi" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            style: { ...styles.input, width: "150px" },
            onChange: /* @__PURE__ */ __name(async (e) => {
              await updateChannelRestriction({ slow_mode_seconds: parseInt(e.target.value) });
              toast.success("Slow mode güncellendi!");
            }, "onChange"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "0", children: "Kapalı" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "5", children: "5 Saniye" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "10", children: "10 Saniye" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "30", children: "30 Saniye" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "60", children: "1 Dakika" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "300", children: "5 Dakika" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "900", children: "15 Dakika" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "3600", children: "1 Saat" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.advancedSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h5", { style: styles.advancedSectionTitle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, {}),
        " Kanal İstatistikleri"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statsGrid, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statBox, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.statValue, children: room.message_count || 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.statLabel, children: "Toplam Mesaj" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statBox, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.statValue, children: room.member_count || serverRoles?.length || 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.statLabel, children: "Erişebilen Üye" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statBox, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.statValue, children: room.file_count || 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.statLabel, children: "Paylaşılan Dosya" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.dangerZone, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h5", { style: styles.dangerZoneTitle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, {}),
        " Tehlikeli Bölge"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.advancedOption, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.advancedOptionTitle, children: "Kanalı Sil" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.advancedOptionDesc, children: "Bu işlem geri alınamaz! Tüm mesajlar silinir." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleDelete, style: styles.dangerBtnLarge, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}),
          " Kanalı Sil"
        ] })
      ] })
    ] })
  ] });
}, "AdvancedTab");
const ChannelSettingsModal = /* @__PURE__ */ __name(({ room, serverRoles, onClose, fetchWithAuth, apiBaseUrl }) => {
  const [activeTab, setActiveTab] = reactExports.useState("general");
  const [name, setName] = reactExports.useState(room.name);
  const [selectedRoles, setSelectedRoles] = reactExports.useState(room.allowed_roles || []);
  const [isPrivate, setIsPrivate] = reactExports.useState(room.is_private || false);
  const [isNsfw, setIsNsfw] = reactExports.useState(room.is_nsfw || false);
  const [isLocked, setIsLocked] = reactExports.useState(room.is_locked || false);
  const [isReadOnly, setIsReadOnly] = reactExports.useState(room.admin_only_chat || false);
  const [userLimit, setUserLimit] = reactExports.useState(room.user_limit || 0);
  const [bitrate, setBitrate] = reactExports.useState(room.bitrate || 64);
  const [permissions, setPermissions] = reactExports.useState({ role_permissions: [], user_permissions: [], available_roles: [], available_users: [] });
  const [showAddPermission, setShowAddPermission] = reactExports.useState(false);
  const [permissionType, setPermissionType] = reactExports.useState("role");
  const [selectedRoleForPerm, setSelectedRoleForPerm] = reactExports.useState(null);
  const [selectedUserForPerm, setSelectedUserForPerm] = reactExports.useState(null);
  const [searchUser, setSearchUser] = reactExports.useState("");
  const [searchResults, setSearchResults] = reactExports.useState([]);
  const [notificationPref, setNotificationPref] = reactExports.useState("all");
  const [deleteHistoryDays, setDeleteHistoryDays] = reactExports.useState("7");
  const isVoiceChannel = room.channel_type === "voice";
  const handlePrivateChange = reactExports.useCallback((e) => {
    setIsPrivate(e.target.checked);
    updateChannelRestriction({ is_private: e.target.checked });
  }, []);
  const handleNsfwChange = reactExports.useCallback((e) => {
    setIsNsfw(e.target.checked);
  }, []);
  const handleLockedChange = reactExports.useCallback((e) => {
    setIsLocked(e.target.checked);
    updateChannelRestriction({ is_locked: e.target.checked });
  }, []);
  const handleReadOnlyChange = reactExports.useCallback((e) => {
    setIsReadOnly(e.target.checked);
  }, []);
  const handleUserLimitChange = reactExports.useCallback((e) => {
    const val = parseInt(e.target.value) || 0;
    setUserLimit(val);
    updateChannelRestriction({ user_limit: val });
  }, []);
  reactExports.useEffect(() => {
    if (activeTab === "permissions") {
      loadPermissions();
    }
  }, [activeTab]);
  const loadPermissions = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/channels/${room.slug}/permissions/`);
      const data = await response.json();
      setPermissions(data);
    } catch (error) {
      console.error("❌ İzinler yüklenemedi:", error);
    }
  }, "loadPermissions");
  const handleSave = /* @__PURE__ */ __name(async () => {
    try {
      if (name !== room.name) {
        await fetchWithAuth(`${apiBaseUrl}/rooms/${room.slug}/settings/`, {
          method: "POST",
          body: JSON.stringify({ action: "rename", name })
        });
      }
      if (isPrivate) {
        await fetchWithAuth(`${apiBaseUrl}/rooms/${room.slug}/settings/`, {
          method: "POST",
          body: JSON.stringify({
            action: "update_roles",
            allowed_roles: selectedRoles
          })
        });
      }
      await fetchWithAuth(`${apiBaseUrl}/rooms/${room.slug}/settings/`, {
        method: "POST",
        body: JSON.stringify({
          action: "update_settings",
          is_private: isPrivate,
          is_nsfw: isNsfw,
          is_locked: isLocked,
          admin_only_chat: isReadOnly,
          user_limit: isVoiceChannel ? userLimit : null,
          bitrate: isVoiceChannel ? bitrate : null
        })
      });
      onClose();
    } catch (e) {
      console.error("❌ Ayarlar kaydedilemedi:", e);
      toast.error("❌ Hata oluştu.");
    }
  }, "handleSave");
  const handleDelete = /* @__PURE__ */ __name(async () => {
    if (!await confirmDialog("Bu kanalı kalıcı olarak silmek istiyor musun?")) return;
    try {
      await fetchWithAuth(`${apiBaseUrl}/rooms/${room.slug}/settings/`, {
        method: "POST",
        body: JSON.stringify({ action: "delete" })
      });
      onClose();
    } catch (e) {
      console.error(e);
    }
  }, "handleDelete");
  const toggleRole = /* @__PURE__ */ __name((roleId) => {
    if (selectedRoles.includes(roleId)) {
      setSelectedRoles((prev) => prev.filter((id) => id !== roleId));
    } else {
      setSelectedRoles((prev) => [...prev, roleId]);
    }
  }, "toggleRole");
  const addPermission = /* @__PURE__ */ __name(async () => {
    if (permissionType === "role" && !selectedRoleForPerm) {
      toast.error("❌ Lütfen bir rol seçin!");
      return;
    }
    if (permissionType === "user" && !selectedUserForPerm) {
      toast.error("❌ Lütfen bir kullanıcı seçin!");
      return;
    }
    try {
      const body = {
        room_id: room.id,
        permissions: {
          can_view: true,
          can_send_messages: true,
          can_read_history: true,
          can_connect: true,
          can_speak: true,
          can_video: true
        }
      };
      if (permissionType === "role") {
        body.role_id = selectedRoleForPerm;
      } else {
        body.user_id = selectedUserForPerm;
      }
      await fetchWithAuth(`${apiBaseUrl}/channels/permissions/add/`, {
        method: "POST",
        body: JSON.stringify(body)
      });
      setShowAddPermission(false);
      setSelectedRoleForPerm(null);
      setSelectedUserForPerm(null);
      setSearchUser("");
      setSearchResults([]);
      loadPermissions();
    } catch (error) {
      console.error("❌ İzin eklenemedi:", error);
      toast.error("❌ İzin eklenemedi! Hata: " + (error.message || "Bilinmeyen hata"));
    }
  }, "addPermission");
  const searchUsers = /* @__PURE__ */ __name(async (query) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/users/search/?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(data.users || data || []);
    } catch (error) {
      console.error("❌ Kullanıcı arama hatası:", error);
      setSearchResults([]);
    }
  }, "searchUsers");
  const removePermission = /* @__PURE__ */ __name(async (permId) => {
    if (!await confirmDialog("Bu izni kaldırmak istediğinizden emin misiniz?")) return;
    try {
      await fetchWithAuth(`${apiBaseUrl}/channels/permissions/${permId}/remove/`, {
        method: "DELETE"
      });
      loadPermissions();
    } catch (error) {
      console.error("❌ İzin silinemedi:", error);
    }
  }, "removePermission");
  const updateChannelRestriction = /* @__PURE__ */ __name(async (updates) => {
    try {
      await fetchWithAuth(`${apiBaseUrl}/channels/${room.slug}/restriction/`, {
        method: "PATCH",
        body: JSON.stringify(updates)
      });
    } catch (error) {
      console.error("❌ Kısıtlama güncellenemedi:", error);
      toast.error("❌ Hata oluştu!");
    }
  }, "updateChannelRestriction");
  const modalContent = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.channelIcon, children: isVoiceChannel ? "🔊" : "#" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { margin: 0, fontSize: "1.1em", color: "#fff" }, children: room.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: "0.8em", color: "#72767d" }, children: [
            isVoiceChannel ? "Ses Kanalı" : "Metin Kanalı",
            " Ayarları"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.tabs, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          style: activeTab === "general" ? styles.tabActive : styles.tab,
          onClick: /* @__PURE__ */ __name(() => setActiveTab("general"), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCog, {}),
            " Genel"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          style: activeTab === "permissions" ? styles.tabActive : styles.tab,
          onClick: /* @__PURE__ */ __name(() => setActiveTab("permissions"), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, {}),
            " İzinler"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          style: activeTab === "integrations" ? styles.tabActive : styles.tab,
          onClick: /* @__PURE__ */ __name(() => setActiveTab("integrations"), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaLink, {}),
            " Entegrasyonlar"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          style: activeTab === "advanced" ? styles.tabActive : styles.tab,
          onClick: /* @__PURE__ */ __name(() => setActiveTab("advanced"), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, {}),
            " Gelişmiş"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.body, children: [
      activeTab === "general" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        GeneralTab,
        {
          name,
          setName,
          isPrivate,
          handlePrivateChange,
          isNsfw,
          handleNsfwChange,
          isLocked,
          handleLockedChange,
          isReadOnly,
          handleReadOnlyChange,
          isVoiceChannel,
          userLimit,
          handleUserLimitChange,
          bitrate,
          setBitrate,
          selectedRoles,
          toggleRole,
          serverRoles,
          handleDelete,
          handleSave
        }
      ),
      activeTab === "permissions" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        PermissionsTab,
        {
          permissions,
          showAddPermission,
          setShowAddPermission,
          permissionType,
          setPermissionType,
          selectedRoleForPerm,
          setSelectedRoleForPerm,
          selectedUserForPerm,
          setSelectedUserForPerm,
          searchUser,
          setSearchUser,
          searchResults,
          setSearchResults,
          searchUsers,
          removePermission,
          addPermission
        }
      ),
      activeTab === "integrations" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        IntegrationsTab,
        {
          room,
          fetchWithAuth,
          apiBaseUrl,
          notificationPref,
          setNotificationPref
        }
      ),
      activeTab === "advanced" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        AdvancedTab,
        {
          room,
          serverRoles,
          deleteHistoryDays,
          setDeleteHistoryDays,
          fetchWithAuth,
          apiBaseUrl,
          updateChannelRestriction,
          handleDelete
        }
      )
    ] })
  ] }) });
  return ReactDOM.createPortal(modalContent, document.body);
}, "ChannelSettingsModal");
export {
  ChannelSettingsModal as default
};
