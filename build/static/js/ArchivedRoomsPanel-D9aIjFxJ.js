var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { bw as FaArchive, a as FaTimes, z as FaClock, aD as FaUndo, g as FaTrash } from "./icons-vendor-2VDeY8fW.js";
import { t as toast, d as confirmDialog } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const ArchivedRoomsPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, serverId, onClose }) => {
  const [archivedRooms, setArchivedRooms] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    loadArchivedRooms();
  }, []);
  const loadArchivedRooms = /* @__PURE__ */ __name(async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(`${apiBaseUrl}/rooms/archived/list/?server_id=${serverId}`);
      if (response.ok) {
        const data = await response.json();
        setArchivedRooms(data);
      }
    } catch (error) {
      console.error("Arşiv yükleme hatası:", error);
    } finally {
      setLoading(false);
    }
  }, "loadArchivedRooms");
  const unarchiveRoom = /* @__PURE__ */ __name(async (roomSlug) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/rooms/${roomSlug}/unarchive/`, {
        method: "POST"
      });
      if (response.ok) {
        toast.success("Kanal geri yüklendi");
        loadArchivedRooms();
      } else {
        toast.error("Kanal geri yüklenemedi");
      }
    } catch (error) {
      console.error("Unarchive hatası:", error);
      toast.error("Bir hata oluştu");
    }
  }, "unarchiveRoom");
  const permanentlyDelete = /* @__PURE__ */ __name(async (roomSlug) => {
    if (!await confirmDialog("Bu kanalı kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!")) {
      return;
    }
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/rooms/${roomSlug}/delete/`, {
        method: "DELETE"
      });
      if (response.ok) {
        toast.success("Kanal kalıcı olarak silindi");
        loadArchivedRooms();
      } else {
        toast.error("Kanal silinemedi");
      }
    } catch (error) {
      console.error("Delete hatası:", error);
      toast.error("Bir hata oluştu");
    }
  }, "permanentlyDelete");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaArchive, { style: { color: "#888" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0 }, children: "Arşivlenmiş Kanallar" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { onClick: onClose, style: styles.closeBtn })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Yükleniyor..." }) : archivedRooms.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.empty, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaArchive, { style: { fontSize: "48px", color: "#555", marginBottom: "10px" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Arşivlenmiş kanal yok" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "12px", color: "#888" }, children: "Arşivlenen kanallar burada görünür" })
    ] }) : archivedRooms.map((room) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.roomCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.roomIcon, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaArchive, { style: { color: "#888" } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.roomContent, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.roomName, children: [
          "#",
          room.name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.roomMeta, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, { style: { fontSize: "12px" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Arşivlendi: ",
            new Date(room.archived_at).toLocaleDateString("tr-TR")
          ] })
        ] }),
        room.archived_reason && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.roomReason, children: [
          "Sebep: ",
          room.archived_reason
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.roomActions, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => unarchiveRoom(room.slug), "onClick"),
            style: styles.unarchiveBtn,
            title: "Geri yükle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaUndo, {}),
              " Geri Yükle"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => permanentlyDelete(room.slug), "onClick"),
            style: styles.deleteBtn,
            title: "Kalıcı olarak sil",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {})
          }
        )
      ] })
    ] }, room.id)) })
  ] }) });
}, "ArchivedRoomsPanel");
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
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "20px"
  },
  roomCard: {
    display: "flex",
    gap: "15px",
    padding: "15px",
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    marginBottom: "10px"
  },
  roomIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#1e1e1e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    flexShrink: 0
  },
  roomContent: {
    flex: 1
  },
  roomName: {
    fontWeight: "600",
    fontSize: "16px",
    marginBottom: "6px",
    color: "#dcddde"
  },
  roomMeta: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    color: "#888",
    marginBottom: "4px"
  },
  roomReason: {
    fontSize: "13px",
    color: "#888",
    fontStyle: "italic"
  },
  roomActions: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  unarchiveBtn: {
    backgroundColor: "#43b581",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    whiteSpace: "nowrap"
  },
  deleteBtn: {
    backgroundColor: "#f04747",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px"
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
  ArchivedRoomsPanel as default
};
