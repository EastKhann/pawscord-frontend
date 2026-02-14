var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { an as FaPlus, z as FaClock, u as FaUsers, j as FaLink, a9 as FaCheck, aV as FaCopy, g as FaTrash } from "./icons-vendor-2VDeY8fW.js";
const EXPIRE_OPTIONS = [
  { label: "30 dakika", value: 1800 },
  { label: "1 saat", value: 3600 },
  { label: "6 saat", value: 21600 },
  { label: "12 saat", value: 43200 },
  { label: "1 gün", value: 86400 },
  { label: "7 gün", value: 604800 },
  { label: "Süresiz", value: 0 }
];
const MAX_USES_OPTIONS = [
  { label: "Sınırsız", value: 0 },
  { label: "1 kullanım", value: 1 },
  { label: "5 kullanım", value: 5 },
  { label: "10 kullanım", value: 10 },
  { label: "25 kullanım", value: 25 },
  { label: "50 kullanım", value: 50 },
  { label: "100 kullanım", value: 100 }
];
const InviteLinkManager = /* @__PURE__ */ __name(({ invites = [], serverName, onCreateInvite, onRevokeInvite }) => {
  const [showCreate, setShowCreate] = reactExports.useState(false);
  const [expiresIn, setExpiresIn] = reactExports.useState(86400);
  const [maxUses, setMaxUses] = reactExports.useState(0);
  const [copiedId, setCopiedId] = reactExports.useState(null);
  const handleCreate = reactExports.useCallback(() => {
    onCreateInvite?.({ expiresIn, maxUses });
    setShowCreate(false);
  }, [expiresIn, maxUses, onCreateInvite]);
  const handleCopy = reactExports.useCallback((invite) => {
    const link = `${window.location.origin}/#/invite/${invite.code}`;
    navigator.clipboard.writeText(link);
    setCopiedId(invite.id);
    setTimeout(() => setCopiedId(null), 2e3);
  }, []);
  const formatTimeLeft = /* @__PURE__ */ __name((expiresAt) => {
    if (!expiresAt) return "Süresiz";
    const diff = new Date(expiresAt) - /* @__PURE__ */ new Date();
    if (diff <= 0) return "Süresi dolmuş";
    const hours = Math.floor(diff / 36e5);
    const minutes = Math.floor(diff % 36e5 / 6e4);
    if (hours > 24) return `${Math.floor(hours / 24)} gün`;
    if (hours > 0) return `${hours}sa ${minutes}dk`;
    return `${minutes}dk`;
  }, "formatTimeLeft");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: S.title, children: "Davet Linkleri" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.subtitle, children: serverName })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", style: S.createBtn, onClick: /* @__PURE__ */ __name(() => setShowCreate(!showCreate), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
        " Yeni Davet"
      ] })
    ] }),
    showCreate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.createSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.createRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.createField, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: S.label, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, { style: { fontSize: 10 } }),
            " Süre"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { style: S.select, value: expiresIn, onChange: /* @__PURE__ */ __name((e) => setExpiresIn(Number(e.target.value)), "onChange"), children: EXPIRE_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.value, children: o.label }, o.value)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.createField, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: S.label, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, { style: { fontSize: 10 } }),
            " Maks Kullanım"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { style: S.select, value: maxUses, onChange: /* @__PURE__ */ __name((e) => setMaxUses(Number(e.target.value)), "onChange"), children: MAX_USES_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.value, children: o.label }, o.value)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", style: S.generateBtn, onClick: handleCreate, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaLink, {}),
        " Davet Oluştur"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.list, children: invites.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.empty, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaLink, { style: { fontSize: 24, color: "#4e5058" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Henüz davet yok" })
    ] }) : invites.map((invite) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.inviteItem, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.inviteInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.inviteCode, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaLink, { style: { fontSize: 12, color: "#5865f2" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.codeText, children: invite.code })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.inviteMeta, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, { style: { fontSize: 10 } }),
            " ",
            invite.uses || 0,
            invite.maxUses ? `/${invite.maxUses}` : "",
            " kullanım"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, { style: { fontSize: 10 } }),
            " ",
            formatTimeLeft(invite.expiresAt)
          ] }),
          invite.createdBy && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "@",
            invite.createdBy
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.inviteActions, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            style: S.actionBtn,
            onClick: /* @__PURE__ */ __name(() => handleCopy(invite), "onClick"),
            title: "Kopyala",
            children: copiedId === invite.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { style: { color: "#57f287" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaCopy, {})
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            style: { ...S.actionBtn, color: "#ed4245" },
            onClick: /* @__PURE__ */ __name(() => onRevokeInvite?.(invite.id), "onClick"),
            title: "İptal Et",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {})
          }
        )
      ] })
    ] }, invite.id)) })
  ] });
}, "InviteLinkManager");
const S = {
  container: { padding: 16 },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16
  },
  title: { fontSize: 16, fontWeight: 700, color: "#f2f3f5", margin: 0 },
  subtitle: { fontSize: 12, color: "#b5bac1" },
  createBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 14px",
    borderRadius: 4,
    border: "none",
    backgroundColor: "#5865f2",
    color: "#fff",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer"
  },
  createSection: {
    padding: 14,
    backgroundColor: "#2b2d31",
    borderRadius: 8,
    marginBottom: 16,
    display: "flex",
    flexDirection: "column",
    gap: 12
  },
  createRow: { display: "flex", gap: 12 },
  createField: { flex: 1, display: "flex", flexDirection: "column", gap: 4 },
  label: {
    fontSize: 11,
    fontWeight: 700,
    color: "#b5bac1",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    gap: 4
  },
  select: {
    backgroundColor: "#1e1f22",
    border: "none",
    borderRadius: 4,
    color: "#dcddde",
    fontSize: 13,
    padding: "8px 10px",
    outline: "none"
  },
  generateBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: "8px",
    borderRadius: 4,
    border: "none",
    backgroundColor: "#57f287",
    color: "#000",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer"
  },
  list: { display: "flex", flexDirection: "column", gap: 4 },
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    padding: 30,
    color: "#4e5058",
    fontSize: 14
  },
  inviteItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 12px",
    backgroundColor: "#2b2d31",
    borderRadius: 6,
    transition: "background 0.1s"
  },
  inviteInfo: { flex: 1, minWidth: 0 },
  inviteCode: {
    display: "flex",
    alignItems: "center",
    gap: 6
  },
  codeText: {
    fontSize: 14,
    fontWeight: 600,
    color: "#00a8fc",
    fontFamily: "monospace"
  },
  inviteMeta: {
    display: "flex",
    gap: 10,
    fontSize: 11,
    color: "#4e5058",
    marginTop: 4
  },
  inviteActions: { display: "flex", gap: 4 },
  actionBtn: {
    width: 32,
    height: 32,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    background: "transparent",
    color: "#b5bac1",
    cursor: "pointer",
    fontSize: 14
  }
};
const InviteLinkManager_default = reactExports.memo(InviteLinkManager);
export {
  InviteLinkManager_default as default
};
