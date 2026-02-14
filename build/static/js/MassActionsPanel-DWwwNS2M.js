var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { u as FaUsers, a as FaTimes } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const MassActionsPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, serverId, onClose }) => {
  const [actionType, setActionType] = reactExports.useState("ban");
  const [userIds, setUserIds] = reactExports.useState("");
  const [reason, setReason] = reactExports.useState("");
  const [duration, setDuration] = reactExports.useState("");
  const [processing, setProcessing] = reactExports.useState(false);
  const executeAction = /* @__PURE__ */ __name(async () => {
    if (!userIds.trim()) {
      toast.error("Kullanıcı ID'leri girin");
      return;
    }
    const ids = userIds.split("\n").map((id) => id.trim()).filter((id) => id);
    if (ids.length === 0) {
      toast.error("Geçerli kullanıcı ID'si bulunamadı");
      return;
    }
    try {
      setProcessing(true);
      const response = await fetchWithAuth(`${apiBaseUrl}/moderation/mass_action/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          server_id: serverId,
          action_type: actionType,
          user_ids: ids,
          reason,
          duration: duration || null
        })
      });
      if (response.ok) {
        toast.success(`${ids.length} kullanıcıya ${actionType} işlemi uygulandı`);
        setUserIds("");
        setReason("");
        setDuration("");
      } else {
        toast.error("İşlem başarısız oldu");
      }
    } catch (error) {
      console.error("Mass action hatası:", error);
      toast.error("Bir hata oluştu");
    } finally {
      setProcessing(false);
    }
  }, "executeAction");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, { style: { color: "#f04747" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0 }, children: "Toplu Moderasyon" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { onClick: onClose, style: styles.closeBtn })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.field, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "İşlem Türü" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: actionType,
            onChange: /* @__PURE__ */ __name((e) => setActionType(e.target.value), "onChange"),
            style: styles.select,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ban", children: "🔨 Ban (Yasakla)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "kick", children: "👢 Kick (At)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "mute", children: "🔇 Mute (Sustur)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "timeout", children: "⏰ Timeout (Zaman Aşımı)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "warn", children: "⚠️ Warn (Uyar)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "delete_messages", children: "🗑️ Delete Messages (Mesajları Sil)" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.field, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Kullanıcı ID'leri (Her satırda bir tane)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: userIds,
            onChange: /* @__PURE__ */ __name((e) => setUserIds(e.target.value), "onChange"),
            placeholder: "123456789\n987654321\n555555555",
            style: styles.textarea,
            rows: 8
          }
        )
      ] }),
      (actionType === "mute" || actionType === "timeout") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.field, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Süre (dakika)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            value: duration,
            onChange: /* @__PURE__ */ __name((e) => setDuration(e.target.value), "onChange"),
            placeholder: "60",
            style: styles.input
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.field, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Sebep (opsiyonel)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: reason,
            onChange: /* @__PURE__ */ __name((e) => setReason(e.target.value), "onChange"),
            placeholder: "Spam, kural ihlali, vb.",
            style: styles.input
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.warning, children: [
        "⚠️ Bu işlem ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: userIds.split("\n").filter((id) => id.trim()).length }),
        " kullanıcıyı etkileyecek!"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.footer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.cancelBtn, children: "İptal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: executeAction,
          disabled: processing,
          style: styles.executeBtn,
          children: processing ? "İşleniyor..." : "Uygula"
        }
      )
    ] })
  ] }) });
}, "MassActionsPanel");
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
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "20px"
  },
  field: {
    marginBottom: "20px"
  },
  label: {
    display: "block",
    marginBottom: "8px",
    color: "#dcddde",
    fontSize: "14px",
    fontWeight: "600"
  },
  select: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#2c2f33",
    border: "1px solid #444",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px"
  },
  textarea: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#2c2f33",
    border: "1px solid #444",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px",
    fontFamily: "monospace",
    resize: "vertical"
  },
  input: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#2c2f33",
    border: "1px solid #444",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px"
  },
  warning: {
    backgroundColor: "#faa61a1a",
    border: "1px solid #faa61a",
    borderRadius: "4px",
    padding: "15px",
    color: "#faa61a",
    fontSize: "14px",
    textAlign: "center"
  },
  footer: {
    display: "flex",
    gap: "10px",
    padding: "20px",
    borderTop: "1px solid #333"
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#2c2f33",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600"
  },
  executeBtn: {
    flex: 1,
    backgroundColor: "#f04747",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600"
  }
};
export {
  MassActionsPanel as default
};
