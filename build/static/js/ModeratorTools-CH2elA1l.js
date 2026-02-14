var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { a as React, r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { t as toast } from "./index-DGqPEDt8.js";
import { b9 as FaUserShield, a as FaTimes, ay as FaBan } from "./icons-vendor-2VDeY8fW.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const ModeratorTools = /* @__PURE__ */ __name(({ onClose, fetchWithAuth, apiBaseUrl, roomSlug, serverId }) => {
  const [selectedUser, setSelectedUser] = reactExports.useState("");
  const [banReason, setBanReason] = reactExports.useState("");
  const [banDuration, setBanDuration] = reactExports.useState("permanent");
  const [moderatorNote, setModeratorNote] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const handleBanUser = /* @__PURE__ */ __name(async () => {
    if (!selectedUser) {
      toast.error("❌ Lütfen bir kullanıcı seçin");
      return;
    }
    setLoading(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/moderation/ban/`, {
        method: "POST",
        body: JSON.stringify({
          username: selectedUser,
          reason: banReason,
          duration: banDuration,
          room_slug: roomSlug
        })
      });
      if (res.ok) {
        toast.success("✅ Kullanıcı yasaklandı");
        setSelectedUser("");
        setBanReason("");
      } else {
        toast.error("❌ Yasaklama başarısız");
      }
    } catch (error) {
      console.error("Ban error:", error);
    } finally {
      setLoading(false);
    }
  }, "handleBanUser");
  const handleAddNote = /* @__PURE__ */ __name(async () => {
    if (!selectedUser || !moderatorNote) {
      toast.error("❌ Kullanıcı ve not gerekli");
      return;
    }
    setLoading(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/moderation/notes/add/`, {
        method: "POST",
        body: JSON.stringify({
          username: selectedUser,
          note: moderatorNote
        })
      });
      if (res.ok) {
        toast.success("✅ Not eklendi");
        setModeratorNote("");
      }
    } catch (error) {
      console.error("Add note error:", error);
    } finally {
      setLoading(false);
    }
  }, "handleAddNote");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: styles.title, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserShield, {}),
        " Moderatör Araçları"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.sectionTitle, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaBan, {}),
          " Kullanıcı Yasakla"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Kullanıcı adı",
            value: selectedUser,
            onChange: /* @__PURE__ */ __name((e) => setSelectedUser(e.target.value), "onChange"),
            style: styles.input
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            placeholder: "Yasaklama sebebi",
            value: banReason,
            onChange: /* @__PURE__ */ __name((e) => setBanReason(e.target.value), "onChange"),
            style: { ...styles.input, minHeight: "80px", resize: "vertical" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: banDuration,
            onChange: /* @__PURE__ */ __name((e) => setBanDuration(e.target.value), "onChange"),
            style: styles.select,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "1h", children: "1 Saat" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "1d", children: "1 Gün" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "7d", children: "7 Gün" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "30d", children: "30 Gün" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "permanent", children: "Kalıcı" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleBanUser,
            disabled: loading,
            style: styles.banButton,
            children: loading ? "Yasaklanıyor..." : "🔨 Yasakla"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "📝 Moderatör Notu Ekle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Kullanıcı adı",
            value: selectedUser,
            onChange: /* @__PURE__ */ __name((e) => setSelectedUser(e.target.value), "onChange"),
            style: styles.input
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            placeholder: "Moderatör notu",
            value: moderatorNote,
            onChange: /* @__PURE__ */ __name((e) => setModeratorNote(e.target.value), "onChange"),
            style: { ...styles.input, minHeight: "80px", resize: "vertical" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleAddNote,
            disabled: loading,
            style: styles.noteButton,
            children: loading ? "Ekleniyor..." : "✍️ Not Ekle"
          }
        )
      ] })
    ] })
  ] }) });
}, "ModeratorTools");
const styles = {
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
    zIndex: 1e4
  },
  modal: {
    backgroundColor: "#2b2d31",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "500px",
    maxHeight: "80vh",
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #40444b"
  },
  title: {
    color: "white",
    margin: 0,
    fontSize: "1.3em",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    fontSize: "1.3em"
  },
  content: {
    padding: "20px",
    overflowY: "auto",
    flex: 1
  },
  section: {
    marginBottom: "25px",
    backgroundColor: "#40444b",
    padding: "15px",
    borderRadius: "8px"
  },
  sectionTitle: {
    color: "#b9bbbe",
    fontSize: "1em",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#2b2d31",
    border: "1px solid #5865f2",
    borderRadius: "4px",
    color: "white"
  },
  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#2b2d31",
    border: "1px solid #5865f2",
    borderRadius: "4px",
    color: "white"
  },
  banButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#f04747",
    border: "none",
    borderRadius: "4px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },
  noteButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "4px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }
};
const ModeratorTools$1 = React.memo(ModeratorTools);
export {
  ModeratorTools$1 as default
};
