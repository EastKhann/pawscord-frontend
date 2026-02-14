var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { h as FaLock, a as FaTimes } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const ChannelPermissionsPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, channelSlug, onClose }) => {
  const [permissions, setPermissions] = reactExports.useState([]);
  const [roles, setRoles] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [selectedRole, setSelectedRole] = reactExports.useState(null);
  const [permissionMatrix, setPermissionMatrix] = reactExports.useState({});
  const PERMISSIONS = [
    { key: "view_channel", name: "Kanalı Görüntüle", icon: "👁️" },
    { key: "send_messages", name: "Mesaj Gönder", icon: "💬" },
    { key: "attach_files", name: "Dosya Ekle", icon: "📎" },
    { key: "embed_links", name: "Link Gömme", icon: "🔗" },
    { key: "add_reactions", name: "Tepki Ekle", icon: "😀" },
    { key: "use_voice", name: "Sesli Kullan", icon: "🎤" },
    { key: "speak", name: "Konuş", icon: "🗣️" },
    { key: "mute_members", name: "Susturma", icon: "🔇" },
    { key: "manage_messages", name: "Mesaj Yönetimi", icon: "⚙️" },
    { key: "manage_channel", name: "Kanal Yönetimi", icon: "🛠️" }
  ];
  reactExports.useEffect(() => {
    loadPermissions();
    loadRoles();
  }, [channelSlug]);
  const loadPermissions = /* @__PURE__ */ __name(async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(`${apiBaseUrl}/channels/${channelSlug}/permissions/`);
      if (response.ok) {
        const data = await response.json();
        setPermissions(data);
        const matrix = {};
        data.forEach((perm) => {
          if (!matrix[perm.role_id]) {
            matrix[perm.role_id] = {};
          }
          matrix[perm.role_id][perm.permission] = perm.value;
        });
        setPermissionMatrix(matrix);
      }
    } catch (error) {
      console.error("İzin yükleme hatası:", error);
      toast.error("İzinler yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, "loadPermissions");
  const loadRoles = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/servers/roles/list/`);
      if (response.ok) {
        const data = await response.json();
        setRoles(data);
      }
    } catch (error) {
      console.error("Rol yükleme hatası:", error);
    }
  }, "loadRoles");
  const updatePermission = /* @__PURE__ */ __name(async (roleId, permission, value) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/channels/permissions/add/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel_slug: channelSlug,
          role_id: roleId,
          permission,
          value
        })
      });
      if (response.ok) {
        toast.success("İzin güncellendi");
        setPermissionMatrix((prev) => ({
          ...prev,
          [roleId]: {
            ...prev[roleId],
            [permission]: value
          }
        }));
      } else {
        toast.error("İzin güncellenemedi");
      }
    } catch (error) {
      console.error("İzin güncelleme hatası:", error);
      toast.error("Bir hata oluştu");
    }
  }, "updatePermission");
  const getPermissionValue = /* @__PURE__ */ __name((roleId, permission) => {
    return permissionMatrix[roleId]?.[permission];
  }, "getPermissionValue");
  const getPermissionIcon = /* @__PURE__ */ __name((value) => {
    if (value === true) return { icon: "✅", color: "#43b581", text: "İzin Ver" };
    if (value === false) return { icon: "❌", color: "#ed4245", text: "Reddet" };
    return { icon: "➖", color: "#99aab5", text: "Varsayılan" };
  }, "getPermissionIcon");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaLock, { style: { color: "#faa61a" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0 }, children: "Kanal İzinleri" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { onClick: onClose, style: styles.closeBtn })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Yükleniyor..." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.matrix, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.matrixHeader, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.headerCell, children: "İzin" }),
        roles.map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.headerCell, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          ...styles.roleTag,
          backgroundColor: role.color || "#5865f2"
        }, children: role.name }) }, role.id))
      ] }),
      PERMISSIONS.map((perm) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.matrixRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.permissionName, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "18px", marginRight: "8px" }, children: perm.icon }),
          perm.name
        ] }),
        roles.map((role) => {
          const value = getPermissionValue(role.id, perm.key);
          const display = getPermissionIcon(value);
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.permissionCell, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: /* @__PURE__ */ __name(() => {
                const newValue = value === null ? true : value === true ? false : null;
                updatePermission(role.id, perm.key, newValue);
              }, "onClick"),
              style: {
                ...styles.permissionBtn,
                color: display.color
              },
              title: display.text,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "20px" }, children: display.icon })
            }
          ) }, role.id);
        })
      ] }, perm.key))
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.footer, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.legend, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.legendItem, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#43b581", fontSize: "18px" }, children: "✅" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "İzin Ver" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.legendItem, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#ed4245", fontSize: "18px" }, children: "❌" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Reddet" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.legendItem, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#99aab5", fontSize: "18px" }, children: "➖" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Varsayılan" })
      ] })
    ] }) })
  ] }) });
}, "ChannelPermissionsPanel");
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999999
  },
  modal: {
    backgroundColor: "#1e1e1e",
    borderRadius: "8px",
    width: "95%",
    maxWidth: "1200px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    color: "#fff"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #333"
  },
  closeBtn: {
    cursor: "pointer",
    fontSize: "24px",
    color: "#888"
  },
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "20px"
  },
  matrix: {
    display: "flex",
    flexDirection: "column",
    gap: "2px"
  },
  matrixHeader: {
    display: "grid",
    gridTemplateColumns: "200px repeat(auto-fit, minmax(100px, 1fr))",
    gap: "2px",
    marginBottom: "10px",
    position: "sticky",
    top: 0,
    backgroundColor: "#1e1e1e",
    zIndex: 10,
    paddingBottom: "10px"
  },
  headerCell: {
    padding: "12px",
    fontWeight: "600",
    textAlign: "center",
    backgroundColor: "#2c2f33",
    borderRadius: "4px"
  },
  roleTag: {
    padding: "6px 12px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#fff"
  },
  matrixRow: {
    display: "grid",
    gridTemplateColumns: "200px repeat(auto-fit, minmax(100px, 1fr))",
    gap: "2px",
    marginBottom: "2px"
  },
  permissionName: {
    padding: "12px",
    backgroundColor: "#2c2f33",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    fontWeight: "500"
  },
  permissionCell: {
    padding: "12px",
    backgroundColor: "#2c2f33",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  permissionBtn: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "4px",
    transition: "background-color 0.2s"
  },
  footer: {
    padding: "20px",
    borderTop: "1px solid #333"
  },
  legend: {
    display: "flex",
    gap: "30px",
    justifyContent: "center"
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px"
  },
  loading: {
    textAlign: "center",
    padding: "40px",
    color: "#888"
  }
};
export {
  ChannelPermissionsPanel as default
};
