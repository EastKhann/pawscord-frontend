var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a1 as FaShieldAlt, a as FaTimes, aV as FaCopy } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const TwoFactorSetupWizard = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose }) => {
  const [step, setStep] = reactExports.useState(1);
  const [qrCode, setQrCode] = reactExports.useState("");
  const [secret, setSecret] = reactExports.useState("");
  const [backupCodes, setBackupCodes] = reactExports.useState([]);
  const [verificationCode, setVerificationCode] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const startSetup = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/auth/2fa/enable/`, {
        method: "POST"
      });
      const data = await response.json();
      setQrCode(data.qr_code);
      setSecret(data.secret);
      setStep(2);
      toast.success("2FA setup initiated");
    } catch (error) {
      toast.error("Failed to start 2FA setup");
    } finally {
      setLoading(false);
    }
  }, "startSetup");
  const verifyAndComplete = /* @__PURE__ */ __name(async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error("Please enter a 6-digit code");
      return;
    }
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/auth/2fa/verify-setup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: verificationCode })
      });
      const data = await response.json();
      if (data.success) {
        setBackupCodes(data.backup_codes || []);
        setStep(4);
        toast.success("2FA enabled successfully!");
      } else {
        toast.error("Invalid verification code");
      }
    } catch (error) {
      toast.error("Failed to verify code");
    } finally {
      setLoading(false);
    }
  }, "verifyAndComplete");
  const copyBackupCodes = /* @__PURE__ */ __name(() => {
    navigator.clipboard.writeText(backupCodes.join("\n"));
    toast.success("Backup codes copied to clipboard");
  }, "copyBackupCodes");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, { style: { marginRight: "10px", color: "#43b581" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Two-Factor Authentication Setup" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.stepContainer, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.stepIcon, children: "🔒" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.stepTitle, children: "Enhance Your Account Security" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.stepDescription, children: "Two-factor authentication adds an extra layer of security to your account. You'll need your phone's authentication app to complete setup." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.requirements, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.requirementItem, children: "✓ Install an authenticator app (Google Authenticator, Authy, etc.)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.requirementItem, children: "✓ Have your phone ready to scan a QR code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.requirementItem, children: "✓ Save backup codes in a secure location" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: startSetup, style: styles.primaryButton, disabled: loading, children: loading ? "Starting..." : "Begin Setup" })
      ] }),
      step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.stepContainer, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.stepIcon, children: "📱" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.stepTitle, children: "Scan QR Code" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.stepDescription, children: "Open your authenticator app and scan this QR code." }),
        qrCode && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.qrContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: qrCode, alt: "QR Code", style: styles.qrCode }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.manualEntry, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.manualLabel, children: "Or enter this code manually:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.secretCode, children: secret })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setStep(3), "onClick"), style: styles.primaryButton, children: "Next Step" })
      ] }),
      step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.stepContainer, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.stepIcon, children: "🔑" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.stepTitle, children: "Verify Setup" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.stepDescription, children: "Enter the 6-digit code from your authenticator app to complete setup." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: verificationCode,
            onChange: /* @__PURE__ */ __name((e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6)), "onChange"),
            placeholder: "000000",
            style: styles.codeInput,
            maxLength: 6
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: verifyAndComplete, style: styles.primaryButton, disabled: loading, children: loading ? "Verifying..." : "Verify & Enable 2FA" })
      ] }),
      step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.stepContainer, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.stepIcon, children: "✅" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.stepTitle, children: "Setup Complete!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.stepDescription, children: "Save these backup codes in a secure location. You can use them if you lose access to your authenticator app." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.backupCodesContainer, children: backupCodes.map((code, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.backupCode, children: code }, idx)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: copyBackupCodes, style: styles.copyButton, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCopy, { style: { marginRight: "8px" } }),
          "Copy Backup Codes"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.primaryButton, children: "Done" })
      ] })
    ] })
  ] }) });
}, "TwoFactorSetupWizard");
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999999
  },
  modal: {
    backgroundColor: "#1e1e1e",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "550px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)"
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
    fontSize: "18px",
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
  content: {
    padding: "32px",
    overflowY: "auto",
    flex: 1
  },
  stepContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px"
  },
  stepIcon: {
    fontSize: "64px"
  },
  stepTitle: {
    margin: 0,
    fontSize: "22px",
    color: "#ffffff",
    textAlign: "center"
  },
  stepDescription: {
    margin: 0,
    fontSize: "14px",
    color: "#dcddde",
    textAlign: "center",
    lineHeight: "1.5"
  },
  requirements: {
    width: "100%",
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  requirementItem: {
    fontSize: "14px",
    color: "#dcddde"
  },
  qrContainer: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "16px"
  },
  qrCode: {
    width: "200px",
    height: "200px"
  },
  manualEntry: {
    width: "100%",
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "16px",
    textAlign: "center"
  },
  manualLabel: {
    fontSize: "12px",
    color: "#99aab5",
    marginBottom: "8px"
  },
  secretCode: {
    fontSize: "16px",
    fontFamily: "monospace",
    color: "#5865f2",
    fontWeight: "600",
    letterSpacing: "2px"
  },
  codeInput: {
    width: "200px",
    padding: "16px",
    fontSize: "24px",
    textAlign: "center",
    backgroundColor: "#2c2f33",
    border: "2px solid #5865f2",
    borderRadius: "8px",
    color: "#ffffff",
    fontFamily: "monospace",
    letterSpacing: "8px"
  },
  backupCodesContainer: {
    width: "100%",
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "16px",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px"
  },
  backupCode: {
    fontSize: "14px",
    fontFamily: "monospace",
    color: "#dcddde",
    backgroundColor: "#1e1e1e",
    padding: "8px",
    borderRadius: "4px",
    textAlign: "center"
  },
  primaryButton: {
    padding: "12px 32px",
    backgroundColor: "#43b581",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600"
  },
  copyButton: {
    padding: "10px 24px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center"
  }
};
export {
  TwoFactorSetupWizard as default
};
