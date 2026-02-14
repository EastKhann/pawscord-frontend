var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { aJ as FaStickyNote, a as FaTimes, an as FaPlus, g as FaTrash } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const ModeratorNotesPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, username, onClose }) => {
  const [notes, setNotes] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [newNote, setNewNote] = reactExports.useState("");
  reactExports.useEffect(() => {
    loadNotes();
  }, [username]);
  const loadNotes = /* @__PURE__ */ __name(async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(`${apiBaseUrl}/moderation/notes/list/?username=${username}`);
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      }
    } catch (error) {
      console.error("Not yükleme hatası:", error);
      toast.error("Notlar yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, "loadNotes");
  const addNote = /* @__PURE__ */ __name(async () => {
    if (!newNote.trim()) {
      toast.error("Not içeriği boş olamaz");
      return;
    }
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/moderation/notes/add/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          note: newNote
        })
      });
      if (response.ok) {
        toast.success("Not eklendi");
        setNewNote("");
        loadNotes();
      } else {
        toast.error("Not eklenemedi");
      }
    } catch (error) {
      console.error("Not ekleme hatası:", error);
      toast.error("Bir hata oluştu");
    }
  }, "addNote");
  const deleteNote = /* @__PURE__ */ __name(async (noteId) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/moderation/notes/${noteId}/delete/`, {
        method: "DELETE"
      });
      if (response.ok) {
        toast.success("Not silindi");
        loadNotes();
      }
    } catch (error) {
      console.error("Not silme hatası:", error);
      toast.error("Bir hata oluştu");
    }
  }, "deleteNote");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaStickyNote, { style: { color: "#faa61a" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: { margin: 0 }, children: [
          "Moderatör Notları - ",
          username
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { onClick: onClose, style: styles.closeBtn })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.addNote, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          placeholder: "Yeni not ekle...",
          value: newNote,
          onChange: /* @__PURE__ */ __name((e) => setNewNote(e.target.value), "onChange"),
          style: styles.textarea,
          rows: 3
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: addNote, style: styles.addBtn, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
        " Not Ekle"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.notesList, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Yükleniyor..." }) : notes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.empty, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaStickyNote, { style: { fontSize: "48px", color: "#555" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz not yok" })
    ] }) : notes.map((note) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.noteItem, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.noteContent, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.noteMeta, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: note.moderator_username }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#888", fontSize: "12px" }, children: new Date(note.created_at).toLocaleString("tr-TR") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.noteText, children: note.note })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => deleteNote(note.id), "onClick"),
          style: styles.deleteBtn,
          title: "Sil",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {})
        }
      )
    ] }, note.id)) })
  ] }) });
}, "ModeratorNotesPanel");
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
    maxWidth: "700px",
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
  addNote: {
    padding: "20px",
    borderBottom: "1px solid #333"
  },
  textarea: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#2c2f33",
    border: "1px solid #444",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px",
    marginBottom: "10px",
    resize: "vertical",
    fontFamily: "inherit"
  },
  addBtn: {
    backgroundColor: "#43b581",
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
  notesList: {
    flex: 1,
    overflowY: "auto",
    padding: "20px"
  },
  noteItem: {
    display: "flex",
    gap: "15px",
    padding: "15px",
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    marginBottom: "10px"
  },
  noteContent: {
    flex: 1
  },
  noteMeta: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px"
  },
  noteText: {
    color: "#dcddde",
    lineHeight: "1.5",
    whiteSpace: "pre-wrap"
  },
  deleteBtn: {
    backgroundColor: "transparent",
    border: "none",
    color: "#ed4245",
    cursor: "pointer",
    fontSize: "18px",
    padding: "10px"
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
  ModeratorNotesPanel as default
};
