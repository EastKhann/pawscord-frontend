var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { ac as FaComments, a as FaTimes, a_ as FaReply, i as FaThumbtack, l as FaBellSlash, k as FaBell } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const MessageThreadsPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, messageId, onClose }) => {
  const [thread, setThread] = reactExports.useState(null);
  const [threads, setThreads] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [newThreadName, setNewThreadName] = reactExports.useState("");
  const [showCreateThread, setShowCreateThread] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (messageId) {
      loadThreads();
    }
  }, [messageId]);
  const loadThreads = /* @__PURE__ */ __name(async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(`${apiBaseUrl}/threads/list/`);
      if (response.ok) {
        const data = await response.json();
        setThreads(data);
      }
    } catch (error) {
      console.error("Thread yükleme hatası:", error);
      toast.error("Thread'ler yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, "loadThreads");
  const createThread = /* @__PURE__ */ __name(async () => {
    if (!newThreadName.trim()) {
      toast.error("Thread adı gerekli");
      return;
    }
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/threads/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message_id: messageId,
          name: newThreadName
        })
      });
      if (response.ok) {
        toast.success("Thread oluşturuldu");
        setNewThreadName("");
        setShowCreateThread(false);
        loadThreads();
      } else {
        toast.error("Thread oluşturulamadı");
      }
    } catch (error) {
      console.error("Thread oluşturma hatası:", error);
      toast.error("Bir hata oluştu");
    }
  }, "createThread");
  const subscribeToThread = /* @__PURE__ */ __name(async (threadId) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/threads/subscribe/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thread_id: threadId })
      });
      if (response.ok) {
        toast.success("Thread'e abone oldunuz");
        loadThreads();
      }
    } catch (error) {
      console.error("Abone olma hatası:", error);
      toast.error("Bir hata oluştu");
    }
  }, "subscribeToThread");
  const pinThread = /* @__PURE__ */ __name(async (threadId) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/threads/${threadId}/pin/`, {
        method: "POST"
      });
      if (response.ok) {
        toast.success("Thread sabitlendi");
        loadThreads();
      }
    } catch (error) {
      console.error("Pinleme hatası:", error);
      toast.error("Bir hata oluştu");
    }
  }, "pinThread");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaComments, { style: { color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0 }, children: "Thread\\'ler" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { onClick: onClose, style: styles.closeBtn })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.toolbar, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setShowCreateThread(!showCreateThread), "onClick"), style: styles.createBtn, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaReply, {}),
      " Yeni Thread"
    ] }) }),
    showCreateThread && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.createForm, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Thread adı...",
          value: newThreadName,
          onChange: /* @__PURE__ */ __name((e) => setNewThreadName(e.target.value), "onChange"),
          style: styles.input,
          autoFocus: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: createThread, style: styles.saveBtn, children: "Oluştur" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setShowCreateThread(false), "onClick"), style: styles.cancelBtn, children: "İptal" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.threadsList, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Yükleniyor..." }) : threads.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.empty, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaComments, { style: { fontSize: "48px", color: "#555" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz thread yok" })
    ] }) : threads.map((thread2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.threadItem, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.threadIcon, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaComments, { style: { color: "#5865f2" } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.threadContent, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.threadName, children: thread2.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.threadMeta, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            thread2.message_count || 0,
            " mesaj"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            thread2.subscriber_count || 0,
            " abone"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.threadActions, children: [
        thread2.is_pinned && /* @__PURE__ */ jsxRuntimeExports.jsx(FaThumbtack, { style: { color: "#faa61a" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => subscribeToThread(thread2.id), "onClick"),
            style: styles.actionBtn,
            title: thread2.is_subscribed ? "Abonelikten Çık" : "Abone Ol",
            children: thread2.is_subscribed ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaBellSlash, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaBell, {})
          }
        ),
        !thread2.is_pinned && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => pinThread(thread2.id), "onClick"),
            style: styles.actionBtn,
            title: "Sabitle",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaThumbtack, {})
          }
        )
      ] })
    ] }, thread2.id)) })
  ] }) });
}, "MessageThreadsPanel");
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
  createBtn: {
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
  createForm: {
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
    marginBottom: "10px"
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
  threadsList: {
    flex: 1,
    overflowY: "auto",
    padding: "20px"
  },
  threadItem: {
    display: "flex",
    gap: "15px",
    padding: "15px",
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    marginBottom: "10px",
    alignItems: "center"
  },
  threadIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#5865f21a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px"
  },
  threadContent: {
    flex: 1
  },
  threadName: {
    fontWeight: "600",
    marginBottom: "4px"
  },
  threadMeta: {
    fontSize: "12px",
    color: "#888",
    display: "flex",
    gap: "8px"
  },
  threadActions: {
    display: "flex",
    gap: "10px",
    alignItems: "center"
  },
  actionBtn: {
    backgroundColor: "transparent",
    border: "none",
    color: "#dcddde",
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
  MessageThreadsPanel as default
};
