var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { at as FaEdit, a as FaTimes, z as FaClock, g as FaTrash } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const DraftsPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, roomSlug }) => {
  const [drafts, setDrafts] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    fetchDrafts();
  }, []);
  const fetchDrafts = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/drafts/?room_slug=${roomSlug}`);
      const data = await response.json();
      setDrafts(data.drafts || []);
    } catch (error) {
      toast.error("Failed to load drafts");
    } finally {
      setLoading(false);
    }
  }, "fetchDrafts");
  const loadDraft = /* @__PURE__ */ __name((draft) => {
    window.dispatchEvent(new CustomEvent("loadDraft", { detail: draft }));
    toast.success("Draft loaded into message box");
    onClose();
  }, "loadDraft");
  const deleteDraft = /* @__PURE__ */ __name(async (draftId) => {
    if (!confirm("Delete this draft?")) return;
    try {
      await fetchWithAuth(`${apiBaseUrl}/api/drafts/${draftId}/delete/`, {
        method: "DELETE"
      });
      toast.success("Draft deleted");
      fetchDrafts();
    } catch (error) {
      toast.error("Failed to delete draft");
    }
  }, "deleteDraft");
  const deleteAllDrafts = /* @__PURE__ */ __name(async () => {
    if (!confirm(`Delete all ${drafts.length} drafts?`)) return;
    try {
      await fetchWithAuth(`${apiBaseUrl}/api/drafts/delete-all/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ room_slug: roomSlug })
      });
      toast.success("All drafts deleted");
      fetchDrafts();
    } catch (error) {
      toast.error("Failed to delete drafts");
    }
  }, "deleteAllDrafts");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaEdit, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Message Drafts" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    drafts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.toolbar, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.draftCount, children: [
        drafts.length,
        " ",
        drafts.length === 1 ? "draft" : "drafts"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: deleteAllDrafts, style: styles.deleteAllButton, children: "Delete All" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading drafts..." }) : drafts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.empty, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaEdit, { style: { fontSize: "48px", color: "#2c2f33", marginBottom: "16px" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "No drafts saved" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.emptySubtext, children: "Start typing a message and it will be automatically saved as a draft" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.draftsList, children: drafts.map((draft, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.draftCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.draftContent, onClick: /* @__PURE__ */ __name(() => loadDraft(draft), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.draftText, children: [
          draft.content.substring(0, 200),
          draft.content.length > 200 && "..."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.draftMeta, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, { style: { marginRight: "6px", fontSize: "11px" } }),
          new Date(draft.updated_at).toLocaleString()
        ] }),
        draft.room_name && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.draftRoom, children: [
          "#",
          draft.room_name
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => deleteDraft(draft.id), "onClick"),
          style: styles.deleteButton,
          title: "Delete Draft",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {})
        }
      )
    ] }, idx)) }) })
  ] }) });
}, "DraftsPanel");
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
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #2c2f33"
  },
  headerLeft: {
    display: "flex",
    alignItems: "center"
  },
  title: {
    margin: 0,
    fontSize: "20px",
    color: "#ffffff"
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#99aab5",
    cursor: "pointer",
    fontSize: "20px",
    padding: "5px"
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    borderBottom: "1px solid #2c2f33",
    backgroundColor: "#2c2f33"
  },
  draftCount: {
    fontSize: "13px",
    color: "#dcddde"
  },
  deleteAllButton: {
    padding: "6px 12px",
    backgroundColor: "#f04747",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "500"
  },
  content: {
    padding: "20px",
    overflowY: "auto",
    flex: 1
  },
  loading: {
    textAlign: "center",
    color: "#99aab5",
    padding: "40px"
  },
  empty: {
    textAlign: "center",
    color: "#99aab5",
    padding: "60px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  emptySubtext: {
    fontSize: "13px",
    marginTop: "8px",
    maxWidth: "300px"
  },
  draftsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  draftCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    gap: "12px",
    alignItems: "flex-start"
  },
  draftContent: {
    flex: 1,
    cursor: "pointer"
  },
  draftText: {
    fontSize: "14px",
    color: "#dcddde",
    lineHeight: "1.5",
    marginBottom: "8px",
    whiteSpace: "pre-wrap"
  },
  draftMeta: {
    fontSize: "12px",
    color: "#99aab5",
    display: "flex",
    alignItems: "center",
    marginBottom: "4px"
  },
  draftRoom: {
    fontSize: "12px",
    color: "#5865f2",
    fontWeight: "500"
  },
  deleteButton: {
    background: "none",
    border: "none",
    color: "#f04747",
    cursor: "pointer",
    fontSize: "16px",
    padding: "8px"
  }
};
export {
  DraftsPanel as default
};
