var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { b9 as FaUserShield, a as FaTimes, an as FaPlus, ap as FaPalette, bu as FaGripVertical, g as FaTrash } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const ServerRolesPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, serverId, onClose }) => {
  const [roles, setRoles] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [showNewRole, setShowNewRole] = reactExports.useState(false);
  const [newRole, setNewRole] = reactExports.useState({ name: "", color: "#5865f2", permissions: [] });
  const [draggedRole, setDraggedRole] = reactExports.useState(null);
  reactExports.useEffect(() => {
    loadRoles();
  }, []);
  const loadRoles = /* @__PURE__ */ __name(async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/roles/list/`);
      if (response.ok) {
        const data = await response.json();
        setRoles(data.sort((a, b) => (b.position || 0) - (a.position || 0)));
      }
    } catch (error) {
      console.error("Rol yükleme hatası:", error);
      toast.error("Roller yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, "loadRoles");
  const createRole = /* @__PURE__ */ __name(async () => {
    if (!newRole.name.trim()) {
      toast.error("Rol adı gerekli");
      return;
    }
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/roles/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRole)
      });
      if (response.ok) {
        toast.success("Rol oluşturuldu");
        setNewRole({ name: "", color: "#5865f2", permissions: [] });
        setShowNewRole(false);
        loadRoles();
      } else {
        toast.error("Rol oluşturulamadı");
      }
    } catch (error) {
      console.error("Rol oluşturma hatası:", error);
      toast.error("Bir hata oluştu");
    }
  }, "createRole");
  const deleteRole = /* @__PURE__ */ __name(async (roleId) => {
    if (!confirm("Bu rolü silmek istediğinize emin misiniz?")) return;
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/roles/${roleId}/delete/`, {
        method: "DELETE"
      });
      if (response.ok) {
        toast.success("Rol silindi");
        loadRoles();
      } else {
        toast.error("Rol silinemedi");
      }
    } catch (error) {
      console.error("Rol silme hatası:", error);
      toast.error("Bir hata oluştu");
    }
  }, "deleteRole");
  const handleDragStart = /* @__PURE__ */ __name((role) => {
    setDraggedRole(role);
  }, "handleDragStart");
  const handleDragOver = /* @__PURE__ */ __name((e, targetRole) => {
    e.preventDefault();
    if (!draggedRole || draggedRole.id === targetRole.id) return;
    const newRoles = [...roles];
    const draggedIndex = newRoles.findIndex((r) => r.id === draggedRole.id);
    const targetIndex = newRoles.findIndex((r) => r.id === targetRole.id);
    newRoles.splice(draggedIndex, 1);
    newRoles.splice(targetIndex, 0, draggedRole);
    setRoles(newRoles);
  }, "handleDragOver");
  const handleDragEnd = /* @__PURE__ */ __name(async () => {
    if (!draggedRole) return;
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/roles/reorder/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roles: roles.map((role, index) => ({ id: role.id, position: roles.length - index }))
        })
      });
      if (response.ok) {
        toast.success("Rol sıralaması güncellendi");
      }
    } catch (error) {
      console.error("Sıralama hatası:", error);
      toast.error("Bir hata oluştu");
    }
    setDraggedRole(null);
  }, "handleDragEnd");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserShield, { style: { color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0 }, children: "Sunucu Rolleri" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { onClick: onClose, style: styles.closeBtn })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.toolbar, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setShowNewRole(!showNewRole), "onClick"), style: styles.newRoleBtn, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
        " Yeni Rol"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "12px", color: "#888", margin: "10px 0 0 0" }, children: "💡 Rolleri sürükleyerek hiyerarşiyi değiştirebilirsiniz" })
    ] }),
    showNewRole && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.newRoleForm, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Rol adı...",
          value: newRole.name,
          onChange: /* @__PURE__ */ __name((e) => setNewRole({ ...newRole, name: e.target.value }), "onChange"),
          style: styles.input
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "10px", alignItems: "center", marginBottom: "15px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPalette, { style: { color: "#888" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "color",
            value: newRole.color,
            onChange: /* @__PURE__ */ __name((e) => setNewRole({ ...newRole, color: e.target.value }), "onChange"),
            style: styles.colorPicker
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#dcddde", fontSize: "14px" }, children: newRole.color })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: createRole, style: styles.saveBtn, children: "Oluştur" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setShowNewRole(false), "onClick"), style: styles.cancelBtn, children: "İptal" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.rolesList, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Yükleniyor..." }) : roles.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.empty, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserShield, { style: { fontSize: "48px", color: "#555" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz rol yok" })
    ] }) : roles.map((role, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        draggable: true,
        onDragStart: /* @__PURE__ */ __name(() => handleDragStart(role), "onDragStart"),
        onDragOver: /* @__PURE__ */ __name((e) => handleDragOver(e, role), "onDragOver"),
        onDragEnd: handleDragEnd,
        style: {
          ...styles.roleItem,
          opacity: draggedRole?.id === role.id ? 0.5 : 1
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.dragHandle, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaGripVertical, { style: { color: "#888" } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                ...styles.roleColor,
                backgroundColor: role.color || "#5865f2"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.roleContent, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.roleName, children: role.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.roleMeta, children: [
              "Pozisyon: ",
              index + 1,
              " • ",
              role.member_count || 0,
              " üye"
            ] })
          ] }),
          !role.is_default && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: /* @__PURE__ */ __name(() => deleteRole(role.id), "onClick"),
              style: styles.deleteBtn,
              title: "Sil",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {})
            }
          )
        ]
      },
      role.id
    )) })
  ] }) });
}, "ServerRolesPanel");
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
    width: "90%",
    maxWidth: "600px",
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
  toolbar: {
    padding: "15px 20px",
    borderBottom: "1px solid #333"
  },
  newRoleBtn: {
    backgroundColor: "#5865f2",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: "500"
  },
  newRoleForm: {
    padding: "20px",
    backgroundColor: "#2c2f33",
    borderBottom: "1px solid #333"
  },
  input: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#1e1e1e",
    border: "1px solid #444",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px",
    marginBottom: "15px"
  },
  colorPicker: {
    width: "60px",
    height: "40px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  saveBtn: {
    flex: 1,
    backgroundColor: "#43b581",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500"
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#4e5058",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500"
  },
  rolesList: {
    flex: 1,
    overflowY: "auto",
    padding: "20px"
  },
  roleItem: {
    display: "flex",
    gap: "15px",
    padding: "12px",
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    marginBottom: "8px",
    alignItems: "center",
    cursor: "move",
    transition: "opacity 0.2s"
  },
  dragHandle: {
    cursor: "grab",
    padding: "5px"
  },
  roleColor: {
    width: "4px",
    height: "40px",
    borderRadius: "2px"
  },
  roleContent: {
    flex: 1
  },
  roleName: {
    fontWeight: "600",
    marginBottom: "4px"
  },
  roleMeta: {
    fontSize: "12px",
    color: "#888"
  },
  deleteBtn: {
    backgroundColor: "transparent",
    border: "none",
    color: "#ed4245",
    cursor: "pointer",
    fontSize: "18px",
    padding: "8px"
  },
  loading: {
    textAlign: "center",
    padding: "40px",
    color: "#888"
  },
  empty: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#888"
  }
};
export {
  ServerRolesPanel as default
};
