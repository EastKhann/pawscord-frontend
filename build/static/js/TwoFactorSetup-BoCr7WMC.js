var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { t as toast } from "./index-DGqPEDt8.js";
import { Q as QRCode } from "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
import "./ui-vendor-iPoN0WGz.js";
const TwoFactorSetup = /* @__PURE__ */ __name(({ onClose, fetchWithAuth, apiBaseUrl }) => {
  const [step, setStep] = reactExports.useState(1);
  const [qrCode, setQrCode] = reactExports.useState("");
  const [secret, setSecret] = reactExports.useState("");
  const [backupCodes, setBackupCodes] = reactExports.useState([]);
  const [verifyCode, setVerifyCode] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (step === 1) {
      generateQRCode();
    }
  }, [step]);
  const generateQRCode = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/auth/2fa/setup/`, {
        method: "POST"
      });
      if (res.ok) {
        const data = await res.json();
        setSecret(data.secret);
        const qrDataUrl = await QRCode.toDataURL(data.otpauth_url);
        setQrCode(qrDataUrl);
      } else {
        const errorData = await res.json();
        setError(errorData.error || "QR kod oluşturulamadı");
      }
    } catch (err) {
      console.error("QR Code generation error:", err);
      setError("Bağlantı hatası");
    } finally {
      setLoading(false);
    }
  }, "generateQRCode");
  const handleVerify = /* @__PURE__ */ __name(async () => {
    if (verifyCode.length !== 6) {
      setError("6 haneli kod giriniz");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/auth/2fa/verify/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: verifyCode,
          secret
        })
      });
      if (res.ok) {
        const data = await res.json();
        setBackupCodes(data.backup_codes);
        setStep(3);
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Geçersiz kod");
      }
    } catch (err) {
      console.error("Verification error:", err);
      setError("Doğrulama hatası");
    } finally {
      setLoading(false);
    }
  }, "handleVerify");
  const downloadBackupCodes = /* @__PURE__ */ __name(() => {
    const text = backupCodes.join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pawscord-backup-codes.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, "downloadBackupCodes");
  const handleComplete = /* @__PURE__ */ __name(() => {
    toast.success("✅ 2FA başarıyla etkinleştirildi!");
    onClose();
    window.location.reload();
  }, "handleComplete");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "twofa-modal-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "twofa-modal-content", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "twofa-close-btn", onClick: onClose, children: "×" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "🔐 İki Faktörlü Kimlik Doğrulama" }),
    step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "twofa-step", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Adım 1: QR Kodu Tara" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Google Authenticator veya Authy uygulamasıyla bu QR kodu tarayın:" }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "twofa-loading", children: "QR kod oluşturuluyor..." }) : qrCode ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: qrCode, alt: "QR Code", className: "twofa-qr-code" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "twofa-secret", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Manuel Kod:" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: secret }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: /* @__PURE__ */ __name(() => {
                navigator.clipboard.writeText(secret);
                toast.success("✅ Kod kopyalandı!");
              }, "onClick"),
              className: "twofa-copy-btn",
              children: "📋 Kopyala"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => setStep(2), "onClick"),
            className: "twofa-next-btn",
            children: "İleri →"
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "twofa-error", children: error })
    ] }),
    step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "twofa-step", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Adım 2: Doğrulama Kodu" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Authenticator uygulamasındaki 6 haneli kodu girin:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          maxLength: "6",
          value: verifyCode,
          onChange: /* @__PURE__ */ __name((e) => setVerifyCode(e.target.value.replace(/\D/g, "")), "onChange"),
          placeholder: "000000",
          className: "twofa-code-input",
          autoFocus: true
        }
      ),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "twofa-error", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "twofa-buttons", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => setStep(1), "onClick"),
            className: "twofa-back-btn",
            children: "← Geri"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleVerify,
            disabled: loading || verifyCode.length !== 6,
            className: "twofa-verify-btn",
            children: loading ? "Doğrulanıyor..." : "Doğrula"
          }
        )
      ] })
    ] }),
    step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "twofa-step", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Adım 3: Yedek Kodlar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "twofa-warning", children: "⚠️ Bu kodları güvenli bir yerde saklayın! Telefonunuza erişemediğinizde bu kodları kullanabilirsiniz." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "twofa-backup-codes", children: backupCodes.map((code, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "twofa-backup-code", children: code }, index)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "twofa-buttons", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: downloadBackupCodes,
            className: "twofa-download-btn",
            children: "💾 İndir"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleComplete,
            className: "twofa-complete-btn",
            children: "✅ Tamamla"
          }
        )
      ] })
    ] })
  ] }) });
}, "TwoFactorSetup");
export {
  TwoFactorSetup as default
};
