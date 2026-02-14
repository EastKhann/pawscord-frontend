var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { d as confirmDialog } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
import "./ui-vendor-iPoN0WGz.js";
const INITIAL_ROLE = { name: "", color: "#8b5cf6", hoist: false, mentionable: true, permissions: 0 };
const COLOR_PRESETS = [
  { name: "Purple", value: "#8b5cf6" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Green", value: "#10b981" },
  { name: "Red", value: "#ef4444" },
  { name: "Yellow", value: "#f59e0b" },
  { name: "Pink", value: "#ec4899" },
  { name: "Indigo", value: "#6366f1" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Orange", value: "#f97316" },
  { name: "Gray", value: "#6b7280" }
];
const useRolesManager = /* @__PURE__ */ __name((serverId) => {
  const [roles, setRoles] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [showCreateModal, setShowCreateModal] = reactExports.useState(false);
  const [editingRole, setEditingRole] = reactExports.useState(null);
  const [draggedRole, setDraggedRole] = reactExports.useState(null);
  const [newRole, setNewRole] = reactExports.useState(INITIAL_ROLE);
  const authHeaders = /* @__PURE__ */ __name(() => ({ "Authorization": `Bearer ${localStorage.getItem("access_token")}` }), "authHeaders");
  reactExports.useEffect(() => {
    fetchRoles();
  }, [serverId]);
  const fetchRoles = /* @__PURE__ */ __name(async () => {
    try {
      setLoading(true);
      const r = await fetch(`/api/roles/${serverId}/list/`, { headers: authHeaders() });
      if (r.ok) {
        const d = await r.json();
        setRoles(d.roles || []);
      }
    } catch (e) {
      console.error("Error fetching roles:", e);
    } finally {
      setLoading(false);
    }
  }, "fetchRoles");
  const createRole = /* @__PURE__ */ __name(async () => {
    if (!newRole.name.trim()) return;
    try {
      const r = await fetch(`/api/roles/${serverId}/create/`, {
        method: "POST",
        headers: { ...authHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify(newRole)
      });
      if (r.ok) {
        const d = await r.json();
        setRoles([...roles, d.role]);
        setShowCreateModal(false);
        setNewRole(INITIAL_ROLE);
      }
    } catch (e) {
      console.error("Error creating role:", e);
    }
  }, "createRole");
  const updateRole = /* @__PURE__ */ __name(async (roleId, updates) => {
    try {
      const r = await fetch(`/api/roles/${serverId}/${roleId}/update/`, {
        method: "PUT",
        headers: { ...authHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify(updates)
      });
      if (r.ok) {
        const d = await r.json();
        setRoles(roles.map((ro) => ro.id === roleId ? d.role : ro));
        setEditingRole(null);
      }
    } catch (e) {
      console.error("Error updating role:", e);
    }
  }, "updateRole");
  const deleteRole = /* @__PURE__ */ __name(async (roleId) => {
    if (!await confirmDialog("Are you sure you want to delete this role?")) return;
    try {
      const r = await fetch(`/api/roles/${serverId}/${roleId}/delete/`, { method: "DELETE", headers: authHeaders() });
      if (r.ok) setRoles(roles.filter((ro) => ro.id !== roleId));
    } catch (e) {
      console.error("Error deleting role:", e);
    }
  }, "deleteRole");
  const reorderRoles = /* @__PURE__ */ __name(async (newOrder) => {
    try {
      await fetch(`/api/roles/${serverId}/reorder/`, {
        method: "POST",
        headers: { ...authHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({ order: newOrder })
      });
      fetchRoles();
    } catch (e) {
      console.error("Error reordering roles:", e);
    }
  }, "reorderRoles");
  const copyRole = /* @__PURE__ */ __name(async (roleId) => {
    try {
      const r = await fetch(`/api/roles/${serverId}/${roleId}/copy/`, { method: "POST", headers: authHeaders() });
      if (r.ok) {
        const d = await r.json();
        setRoles([...roles, d.role]);
      }
    } catch (e) {
      console.error("Error copying role:", e);
    }
  }, "copyRole");
  const handleDragStart = /* @__PURE__ */ __name((e, role) => {
    setDraggedRole(role);
    e.dataTransfer.effectAllowed = "move";
  }, "handleDragStart");
  const handleDragOver = /* @__PURE__ */ __name((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, "handleDragOver");
  const handleDrop = /* @__PURE__ */ __name((e, targetRole) => {
    e.preventDefault();
    if (!draggedRole || draggedRole.id === targetRole.id) return;
    const newRoles = [...roles];
    const di = newRoles.findIndex((r) => r.id === draggedRole.id);
    const ti = newRoles.findIndex((r) => r.id === targetRole.id);
    newRoles.splice(di, 1);
    newRoles.splice(ti, 0, draggedRole);
    setRoles(newRoles);
    reorderRoles(newRoles.map((r) => r.id));
    setDraggedRole(null);
  }, "handleDrop");
  return {
    roles,
    loading,
    showCreateModal,
    setShowCreateModal,
    editingRole,
    setEditingRole,
    draggedRole,
    newRole,
    setNewRole,
    createRole,
    updateRole,
    deleteRole,
    copyRole,
    handleDragStart,
    handleDragOver,
    handleDrop
  };
}, "useRolesManager");
const RoleFormModal = /* @__PURE__ */ __name(({ role, setRole, onSave, onCancel, title, saveLabel }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "role-modal-overlay", onClick: onCancel, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "role-modal", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: title }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Role Name" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: role.name, onChange: /* @__PURE__ */ __name((e) => setRole({ ...role, name: e.target.value }), "onChange"), placeholder: "Enter role name...", maxLength: 32 })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Role Color" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "color-picker", children: [
      COLOR_PRESETS.map((preset) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `color-preset ${role.color === preset.value ? "active" : ""}`, style: { backgroundColor: preset.value }, onClick: /* @__PURE__ */ __name(() => setRole({ ...role, color: preset.value }), "onClick"), title: preset.name }, preset.value)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: role.color, onChange: /* @__PURE__ */ __name((e) => setRole({ ...role, color: e.target.value }), "onChange"), className: "color-input" })
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "checkbox-label", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: role.hoist, onChange: /* @__PURE__ */ __name((e) => setRole({ ...role, hoist: e.target.checked }), "onChange") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Display role members separately from online members" })
  ] }) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "checkbox-label", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: role.mentionable, onChange: /* @__PURE__ */ __name((e) => setRole({ ...role, mentionable: e.target.checked }), "onChange") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Allow anyone to @mention this role" })
  ] }) }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-actions", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "cancel-btn", onClick: onCancel, children: "Cancel" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: title.includes("Edit") ? "save-btn" : "create-btn", onClick: onSave, children: saveLabel })
  ] })
] }) }), "RoleFormModal");
const RolesManager = /* @__PURE__ */ __name(({ serverId, onClose }) => {
  const s = useRolesManager(serverId);
  if (s.loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "roles-manager-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "roles-manager-modal", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading-spinner", children: "Loading roles..." }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "roles-manager-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "roles-manager-modal", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "roles-manager-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        "🎭",
        " Server Roles"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "✕" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "roles-manager-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "roles-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "create-role-btn", onClick: /* @__PURE__ */ __name(() => s.setShowCreateModal(true), "onClick"), children: [
          "➕",
          " Create Role"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "roles-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            s.roles.length,
            " roles"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "info-tip", children: [
            "💡",
            " Drag to reorder hierarchy"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "roles-list", children: s.roles.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-icon", children: "🎭" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "No Roles Yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Create roles to organize your server members" })
      ] }) : s.roles.map((role) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `role-card ${s.draggedRole?.id === role.id ? "dragging" : ""}`,
          draggable: true,
          onDragStart: /* @__PURE__ */ __name((e) => s.handleDragStart(e, role), "onDragStart"),
          onDragOver: s.handleDragOver,
          onDrop: /* @__PURE__ */ __name((e) => s.handleDrop(e, role), "onDrop"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "role-drag-handle", children: "☰" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "role-color-badge", style: { backgroundColor: role.color } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "role-info", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "role-name", style: { color: role.color }, children: role.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "role-meta", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "role-members", children: [
                  "👥",
                  " ",
                  role.member_count || 0,
                  " members"
                ] }),
                role.hoist && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "role-badge", children: [
                  "📌",
                  " Hoisted"
                ] }),
                role.mentionable && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "role-badge", children: "@ Mentionable" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "role-actions", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "role-action-btn edit", onClick: /* @__PURE__ */ __name(() => s.setEditingRole(role), "onClick"), title: "Edit", children: "✏️" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "role-action-btn copy", onClick: /* @__PURE__ */ __name(() => s.copyRole(role.id), "onClick"), title: "Copy", children: "📋" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "role-action-btn delete", onClick: /* @__PURE__ */ __name(() => s.deleteRole(role.id), "onClick"), title: "Delete", children: "🗑️" })
            ] })
          ]
        },
        role.id
      )) })
    ] }),
    s.showCreateModal && /* @__PURE__ */ jsxRuntimeExports.jsx(RoleFormModal, { role: s.newRole, setRole: s.setNewRole, onSave: s.createRole, onCancel: /* @__PURE__ */ __name(() => s.setShowCreateModal(false), "onCancel"), title: "Create New Role", saveLabel: "Create Role" }),
    s.editingRole && /* @__PURE__ */ jsxRuntimeExports.jsx(RoleFormModal, { role: s.editingRole, setRole: s.setEditingRole, onSave: /* @__PURE__ */ __name(() => s.updateRole(s.editingRole.id, s.editingRole), "onSave"), onCancel: /* @__PURE__ */ __name(() => s.setEditingRole(null), "onCancel"), title: "Edit Role", saveLabel: "Save Changes" })
  ] }) });
}, "RolesManager");
export {
  RolesManager as default
};
