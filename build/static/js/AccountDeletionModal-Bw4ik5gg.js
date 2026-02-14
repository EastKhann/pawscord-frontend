var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { d as FaExclamationTriangle, a as FaTimes, h as FaLock, v as FaSpinner, g as FaTrash } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const styles = {
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1e4, animation: "fadeIn 0.2s ease" },
  modal: { backgroundColor: "#36393f", borderRadius: "8px", width: "480px", maxWidth: "95vw", maxHeight: "90vh", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.5)", animation: "slideUp 0.3s ease" },
  header: { display: "flex", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #2f3136", gap: "12px" },
  headerIcon: { display: "flex", alignItems: "center", justifyContent: "center" },
  title: { flex: 1, margin: 0, fontSize: "18px", fontWeight: "600", color: "#fff" },
  closeButton: { background: "none", border: "none", color: "#b9bbbe", cursor: "pointer", padding: "4px", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" },
  content: { padding: "20px" },
  warningBox: { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "20px", backgroundColor: "rgba(240,71,71,0.1)", borderRadius: "8px", marginBottom: "16px" },
  warningTitle: { color: "#f04747", margin: "12px 0 8px", fontSize: "18px" },
  warningText: { color: "#b9bbbe", margin: 0, fontSize: "14px" },
  deleteList: { listStyle: "none", margin: "16px 0", backgroundColor: "#2f3136", borderRadius: "8px", padding: "16px 20px" },
  infoBox: { backgroundColor: "rgba(250,166,26,0.1)", border: "1px solid rgba(250,166,26,0.3)", borderRadius: "8px", padding: "12px 16px", marginBottom: "20px" },
  confirmBox: { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "16px", marginBottom: "16px" },
  confirmTitle: { color: "#fff", margin: "12px 0 8px", fontSize: "16px" },
  confirmText: { color: "#b9bbbe", margin: 0, fontSize: "14px" },
  errorBox: { backgroundColor: "rgba(240,71,71,0.2)", border: "1px solid #f04747", borderRadius: "4px", padding: "10px 14px", marginBottom: "16px", color: "#f04747", fontSize: "14px" },
  inputGroup: { marginBottom: "16px" },
  label: { display: "block", color: "#b9bbbe", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", marginBottom: "8px" },
  code: { backgroundColor: "#2f3136", padding: "2px 6px", borderRadius: "3px", color: "#f04747", fontFamily: "monospace" },
  input: { width: "100%", padding: "10px 12px", backgroundColor: "#202225", border: "1px solid #40444b", borderRadius: "4px", color: "#dcddde", fontSize: "14px", outline: "none", transition: "border-color 0.15s", boxSizing: "border-box" },
  buttonGroup: { display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "20px" },
  cancelButton: { padding: "10px 20px", backgroundColor: "transparent", border: "none", borderRadius: "4px", color: "#fff", fontSize: "14px", cursor: "pointer", transition: "all 0.15s" },
  dangerButton: { padding: "10px 20px", backgroundColor: "#f04747", border: "none", borderRadius: "4px", color: "#fff", fontSize: "14px", fontWeight: "500", cursor: "pointer", transition: "all 0.15s" },
  deleteButton: { padding: "10px 20px", backgroundColor: "#f04747", border: "none", borderRadius: "4px", color: "#fff", fontSize: "14px", fontWeight: "500", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }
};
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .spin { animation: spin 1s linear infinite; }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
`;
document.head.appendChild(styleSheet);
function useAccountDeletion({ onClose, onConfirmDelete, username, fetchWithAuth, apiBaseUrl }) {
  const [step, setStep] = reactExports.useState(1);
  const [password, setPassword] = reactExports.useState("");
  const [confirmText, setConfirmText] = reactExports.useState("");
  const [isDeleting, setIsDeleting] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const CONFIRM_PHRASE = `DELETE ${username}`;
  const handleClose = reactExports.useCallback(() => {
    setStep(1);
    setPassword("");
    setConfirmText("");
    setError("");
    setIsDeleting(false);
    onClose();
  }, [onClose]);
  const handleProceedToConfirm = /* @__PURE__ */ __name(() => {
    setStep(2);
    setError("");
  }, "handleProceedToConfirm");
  const handleDelete = /* @__PURE__ */ __name(async () => {
    if (confirmText !== CONFIRM_PHRASE) {
      setError(`Lütfen tam olarak "${CONFIRM_PHRASE}" yazın`);
      return;
    }
    if (!password) {
      setError("Şifrenizi girmeniz gerekiyor");
      return;
    }
    setIsDeleting(true);
    setError("");
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/user/delete-account/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, confirm_text: confirmText })
      });
      if (response.ok) {
        toast.success("Hesabınız başarıyla silindi. Hoşça kalın! 👋");
        if (onConfirmDelete) onConfirmDelete();
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/";
      } else {
        const data = await response.json();
        setError(data.error || "Hesap silinemedi. Şifrenizi kontrol edin.");
      }
    } catch (err) {
      console.error("Account deletion error:", err);
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsDeleting(false);
    }
  }, "handleDelete");
  const isDeleteDisabled = confirmText !== CONFIRM_PHRASE || !password || isDeleting;
  return { step, setStep, password, setPassword, confirmText, setConfirmText, isDeleting, error, CONFIRM_PHRASE, handleClose, handleProceedToConfirm, handleDelete, isDeleteDisabled };
}
__name(useAccountDeletion, "useAccountDeletion");
const DELETE_ITEMS = [
  "✗ Tüm mesajlarınız",
  "✗ Profil bilgileriniz ve avatarınız",
  "✗ Sunucu sahiplikleriniz (sunucular silinecek)",
  "✗ Arkadaş listeniz",
  "✗ Premium aboneliğiniz",
  "✗ XP, seviye ve rozetleriniz",
  "✗ Bağlı hesaplarınız (Spotify, Steam, vb.)"
];
const AccountDeletionModal = /* @__PURE__ */ __name(({ isOpen, onClose, onConfirmDelete, username, fetchWithAuth, apiBaseUrl }) => {
  const { step, setStep, password, setPassword, confirmText, setConfirmText, isDeleting, error, CONFIRM_PHRASE, handleClose, handleProceedToConfirm, handleDelete, isDeleteDisabled } = useAccountDeletion({ onClose, onConfirmDelete, username, fetchWithAuth, apiBaseUrl });
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: handleClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.headerIcon, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, { size: 24, color: "#f04747" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Hesabı Sil" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: styles.closeButton, onClick: handleClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { size: 18 }) })
    ] }),
    step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.warningBox, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, { size: 48, color: "#f04747" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.warningTitle, children: "Bu işlem geri alınamaz!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.warningText, children: "Hesabınızı sildiğinizde aşağıdakiler kalıcı olarak silinecektir:" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { style: styles.deleteList, children: DELETE_ITEMS.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: item }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.infoBox, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Not:" }),
        ' Üye olduğunuz sunuculardaki mesajlarınız görünür kalacak ancak kullanıcı adınız "Silinmiş Kullanıcı" olarak gösterilecektir.'
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.buttonGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: styles.cancelButton, onClick: handleClose, children: "Vazgeç" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: styles.dangerButton, onClick: handleProceedToConfirm, children: "Devam Et" })
      ] })
    ] }),
    step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.confirmBox, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaLock, { size: 32, color: "#faa61a" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.confirmTitle, children: "Kimliğinizi Doğrulayın" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.confirmText, children: "Hesabınızı silmek için şifrenizi girin ve onay metnini yazın." })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.errorBox, children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inputGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Şifreniz" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", value: password, onChange: /* @__PURE__ */ __name((e) => setPassword(e.target.value), "onChange"), placeholder: "Şifrenizi girin", style: styles.input, disabled: isDeleting })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inputGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.label, children: [
          "Onaylamak için ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { style: styles.code, children: CONFIRM_PHRASE }),
          " yazın"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: confirmText, onChange: /* @__PURE__ */ __name((e) => setConfirmText(e.target.value), "onChange"), placeholder: CONFIRM_PHRASE, style: { ...styles.input, borderColor: confirmText === CONFIRM_PHRASE ? "#43b581" : "#40444b" }, disabled: isDeleting })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.buttonGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: styles.cancelButton, onClick: /* @__PURE__ */ __name(() => setStep(1), "onClick"), disabled: isDeleting, children: "Geri" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: { ...styles.deleteButton, opacity: isDeleteDisabled ? 0.5 : 1, cursor: isDeleteDisabled ? "not-allowed" : "pointer" }, onClick: handleDelete, disabled: isDeleteDisabled, children: isDeleting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaSpinner, { className: "spin", style: { marginRight: 8 } }),
          "Siliniyor..."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, { style: { marginRight: 8 } }),
          "Hesabımı Kalıcı Olarak Sil"
        ] }) })
      ] })
    ] })
  ] }) });
}, "AccountDeletionModal");
export {
  AccountDeletionModal as default
};
