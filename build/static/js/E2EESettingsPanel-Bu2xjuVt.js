var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { a as QRCodeSVG, _ as __vitePreload } from "./media-vendor-BRMiuG2Y.js";
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { t as toast, d as confirmDialog } from "./index-DGqPEDt8.js";
import { a1 as FaShieldAlt, a as FaTimes, cp as FaQrcode, a9 as FaCheck, h as FaLock, d as FaExclamationTriangle, w as FaCheckCircle, z as FaClock, c as FaSync, g as FaTrash } from "./icons-vendor-2VDeY8fW.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const SafetyNumberModal = /* @__PURE__ */ __name(({
  username,
  targetUser,
  apiBaseUrl,
  fetchWithAuth,
  onClose
}) => {
  const [safetyNumber, setSafetyNumber] = reactExports.useState(null);
  const [verified, setVerified] = reactExports.useState(false);
  const [verifiedByMe, setVerifiedByMe] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(true);
  const [showQR, setShowQR] = reactExports.useState(false);
  reactExports.useEffect(() => {
    fetchSafetyNumber();
  }, [targetUser]);
  const fetchSafetyNumber = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(
        `${apiBaseUrl}/e2ee/safety-number/${targetUser}/`
      );
      const data = await response.json();
      setSafetyNumber(data.safetyNumber);
      setVerified(data.verified);
      setVerifiedByMe(data.verifiedByMe);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch safety number:", err);
      setLoading(false);
    }
  }, "fetchSafetyNumber");
  const handleVerify = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(
        `${apiBaseUrl}/e2ee/verify-safety-number/${targetUser}/`,
        { method: "POST" }
      );
      const data = await response.json();
      setVerifiedByMe(true);
      setVerified(data.bothVerified);
      toast.success(`✅ Safety number doğrulandı!${data.bothVerified ? "\n\nHer iki taraf da doğruladı! 🎉" : ""}`);
    } catch (err) {
      console.error("Failed to verify safety number:", err);
      toast.error("❌ Doğrulama başarısız!");
    }
  }, "handleVerify");
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles$1.loading, children: "Yükleniyor..." }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, { size: 32, color: verified ? "#43b581" : "#faa61a" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles$1.title, children: "Safety Number" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles$1.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.user, children: targetUser }),
    !showQR ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.numberContainer, children: safetyNumber?.split(" ").map((group, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.numberGroup, children: group }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => setShowQR(true), "onClick"),
          style: styles$1.qrButton,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaQrcode, {}),
            " QR Kodu Göster"
          ]
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.qrContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsx(QRCodeSVG, { value: safetyNumber || "", size: 200 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => setShowQR(false), "onClick"),
          style: styles$1.qrButton,
          children: "Numarayı Göster"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.statusContainer, children: verified ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.statusVerified, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { size: 20 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Her iki taraf da doğruladı! ✅" })
    ] }) : verifiedByMe ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.statusPartial, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { size: 20 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "Siz doğruladınız. ",
        targetUser,
        " henüz doğrulamadı."
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.statusUnverified, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { size: 20 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Henüz doğrulanmadı" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.info, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Safety Number Nedir?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Safety number, sizin ve ",
        targetUser,
        "'in şifreleme anahtarlarının parmak izidir (fingerprint). Bu numarayı karşılaştırarak identity key'lerini doğrulayabilirsiniz."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Nasıl Doğrulanır?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          targetUser,
          " ile yüz yüze görüşün veya güvenilir bir kanal kullanın"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Her ikiniz de safety number'ı açın" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Numaraları karşılaştırın (aynı olmalı!)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: 'Eşleşiyorsa "Doğrula" butonuna basın' })
      ] })
    ] }),
    !verifiedByMe && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleVerify, style: styles$1.verifyButton, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, {}),
      " Bu Numarayı Doğrula"
    ] })
  ] }) });
}, "SafetyNumberModal");
const styles$1 = {
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
    zIndex: 1e5
  },
  modal: {
    backgroundColor: "#2b2d31",
    borderRadius: "8px",
    padding: "24px",
    maxWidth: "500px",
    width: "90%",
    maxHeight: "90vh",
    overflowY: "auto"
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "24px",
    position: "relative"
  },
  title: {
    color: "#fff",
    fontSize: "20px",
    fontWeight: "600",
    flex: 1
  },
  closeButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    padding: "4px",
    fontSize: "20px"
  },
  user: {
    color: "#5865f2",
    fontSize: "18px",
    fontWeight: "500",
    marginBottom: "24px",
    textAlign: "center"
  },
  numberContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    marginBottom: "24px"
  },
  numberGroup: {
    backgroundColor: "#1e1f22",
    color: "#fff",
    padding: "12px",
    borderRadius: "4px",
    textAlign: "center",
    fontSize: "18px",
    fontFamily: "monospace",
    letterSpacing: "2px"
  },
  qrContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "24px",
    padding: "16px",
    backgroundColor: "#fff",
    borderRadius: "8px"
  },
  qrButton: {
    backgroundColor: "#4e5058",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "10px 16px",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    margin: "0 auto 24px"
  },
  statusContainer: {
    marginBottom: "24px"
  },
  statusVerified: {
    backgroundColor: "#43b581",
    color: "#fff",
    padding: "12px",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    justifyContent: "center"
  },
  statusPartial: {
    backgroundColor: "#faa61a",
    color: "#000",
    padding: "12px",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    justifyContent: "center"
  },
  statusUnverified: {
    backgroundColor: "#ed4245",
    color: "#fff",
    padding: "12px",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    justifyContent: "center"
  },
  info: {
    backgroundColor: "#1e1f22",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "24px",
    color: "#b9bbbe",
    fontSize: "14px"
  },
  verifyButton: {
    backgroundColor: "#43b581",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  },
  loading: {
    color: "#b9bbbe",
    textAlign: "center",
    padding: "32px"
  }
};
const E2EESettingsPanel = /* @__PURE__ */ __name(({ username, apiBaseUrl, fetchWithAuth }) => {
  const [e2eeEnabled, setE2eeEnabled] = reactExports.useState(false);
  const [setupDate, setSetupDate] = reactExports.useState(null);
  const [keyRotationDate, setKeyRotationDate] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [stats, setStats] = reactExports.useState({
    encryptedMessagesCount: 0,
    trustedContacts: 0,
    lastKeyRotation: null
  });
  const [showSafetyModal, setShowSafetyModal] = reactExports.useState(false);
  const [selectedUser, setSelectedUser] = reactExports.useState(null);
  reactExports.useEffect(() => {
    loadE2EEStatus();
  }, []);
  const loadE2EEStatus = /* @__PURE__ */ __name(() => {
    const enabled = localStorage.getItem("e2ee_enabled") === "true";
    const setup = localStorage.getItem("e2ee_setup_date");
    const rotation = localStorage.getItem("e2ee_last_rotation");
    setE2eeEnabled(enabled);
    setSetupDate(setup ? new Date(setup) : null);
    setKeyRotationDate(rotation ? new Date(rotation) : null);
  }, "loadE2EEStatus");
  const handleRotateKeys = /* @__PURE__ */ __name(async () => {
    if (!await confirmDialog("🔑 Anahtarları yenilemek istediğinizden emin misiniz?\n\nBu işlem:\n• Yeni kimlik anahtarları oluşturur\n• Eski şifreli mesajlar okunamaz hale gelir\n• Tüm kişilerle yeniden güvenlik doğrulaması gerekir")) {
      return;
    }
    setLoading(true);
    try {
      const { generateIdentityKeyPair, generateSignedPreKeyPair, generateOneTimePreKeys, storePrivateKeys } = await __vitePreload(async () => {
        const { generateIdentityKeyPair: generateIdentityKeyPair2, generateSignedPreKeyPair: generateSignedPreKeyPair2, generateOneTimePreKeys: generateOneTimePreKeys2, storePrivateKeys: storePrivateKeys2 } = await import("./e2ee-CjljHCq9.js");
        return { generateIdentityKeyPair: generateIdentityKeyPair2, generateSignedPreKeyPair: generateSignedPreKeyPair2, generateOneTimePreKeys: generateOneTimePreKeys2, storePrivateKeys: storePrivateKeys2 };
      }, true ? [] : void 0);
      toast.info("🔐 Yeni anahtarlar oluşturuluyor...");
      const identityKeyPair = await generateIdentityKeyPair();
      const signedPreKey = await generateSignedPreKeyPair(Date.now(), identityKeyPair.privateKey);
      const oneTimePreKeys = await generateOneTimePreKeys(100);
      await storePrivateKeys(
        username,
        identityKeyPair.privateKey,
        signedPreKey.privateKey
      );
      toast.info("☁️ Sunucuya yükleniyor...");
      const response = await fetchWithAuth(`${apiBaseUrl}/e2ee/rotate-keys/`, {
        method: "POST",
        body: JSON.stringify({
          identityPublicKey: identityKeyPair.publicKey,
          signedPreKeyId: signedPreKey.keyId,
          signedPreKeyPublic: signedPreKey.publicKey,
          signedPreKeySignature: signedPreKey.signature,
          oneTimePreKeys: oneTimePreKeys.map((k) => ({
            keyId: k.keyId,
            publicKey: k.publicKey
          }))
        })
      });
      if (response.ok) {
        const now = (/* @__PURE__ */ new Date()).toISOString();
        localStorage.setItem("e2ee_last_rotation", now);
        setKeyRotationDate(new Date(now));
        toast.success("✅ Anahtarlar başarıyla yenilendi!");
      } else {
        throw new Error("Key rotation failed");
      }
    } catch (err) {
      console.error("Key rotation error:", err);
      toast.error("❌ Anahtar yenileme başarısız!");
    } finally {
      setLoading(false);
    }
  }, "handleRotateKeys");
  const handleDisableE2EE = /* @__PURE__ */ __name(async () => {
    if (!await confirmDialog("⚠️ E2EE'yi devre dışı bırakmak istediğinizden emin misiniz?\n\nBu işlem:\n• Tüm şifreli mesajlarınızı siler\n• Anahtarlarınızı kaldırır\n• Geri alınamaz!")) {
      return;
    }
    setLoading(true);
    try {
      localStorage.removeItem("e2ee_enabled");
      localStorage.removeItem("e2ee_setup_date");
      localStorage.removeItem("e2ee_last_rotation");
      localStorage.removeItem(`e2ee_identity_private_${username}`);
      localStorage.removeItem(`e2ee_signed_pre_key_private_${username}`);
      setE2eeEnabled(false);
      toast.success("✅ E2EE devre dışı bırakıldı");
    } catch (err) {
      console.error("E2EE disable error:", err);
      toast.error("❌ İşlem başarısız!");
    } finally {
      setLoading(false);
    }
  }, "handleDisableE2EE");
  const formatDate = /* @__PURE__ */ __name((date) => {
    if (!date) return "Hiç";
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }, "formatDate");
  const getDaysSinceRotation = /* @__PURE__ */ __name(() => {
    if (!keyRotationDate) {
      if (!setupDate) return null;
      return Math.floor((/* @__PURE__ */ new Date() - setupDate) / (1e3 * 60 * 60 * 24));
    }
    return Math.floor((/* @__PURE__ */ new Date() - keyRotationDate) / (1e3 * 60 * 60 * 24));
  }, "getDaysSinceRotation");
  const daysSince = getDaysSinceRotation();
  const needsRotation = daysSince && daysSince > 90;
  if (!e2eeEnabled) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.container, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaLock, { size: 24 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.title, children: "End-to-End Encryption" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.disabledState, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, { size: 48, color: "#faa61a" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "E2EE Devre Dışı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Şu anda E2EE kullanmıyorsunuz. Mesajlarınızı şifrelemek için ayarlardan etkinleştirin." })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaLock, { size: 24 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.title, children: "E2EE Ayarları" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statusCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statusHeader, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheckCircle, { size: 32, color: "#43b581" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.statusText, children: "E2EE Aktif" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statusInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.infoRow, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Kurulum: ",
            formatDate(setupDate)
          ] })
        ] }),
        keyRotationDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.infoRow, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaSync, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Son Yenileme: ",
            formatDate(keyRotationDate)
          ] })
        ] })
      ] })
    ] }),
    needsRotation && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.warningCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Anahtar Yenileme Önerilir" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Son anahtar yenilemeden ",
          daysSince,
          " gün geçti. Güvenlik için anahtarlarınızı yenileyin."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.actions, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleRotateKeys,
          disabled: loading,
          style: styles.rotateButton,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaSync, {}),
            loading ? "Yenileniyor..." : "Anahtarları Yenile"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleDisableE2EE,
          disabled: loading,
          style: styles.disableButton,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}),
            "E2EE\\'yi Devre Dışı Bırak"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.infoSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { style: styles.infoTitle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, {}),
        "E2EE Hakkında"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { style: styles.infoList, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✅ Mesajlarınız uçtan uca şifrelenir" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✅ Sadece siz ve karşınızdaki kişi okuyabilir" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✅ Sunucu bile mesajları göremez" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "⚠️ Anahtarlarınızı kaybederseniz mesajlar okunamaz" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "🔑 90 günde bir anahtar yenileme önerilir" })
      ] })
    ] }),
    showSafetyModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      SafetyNumberModal,
      {
        username,
        targetUser: selectedUser,
        apiBaseUrl,
        fetchWithAuth,
        onClose: /* @__PURE__ */ __name(() => setShowSafetyModal(false), "onClose")
      }
    )
  ] });
}, "E2EESettingsPanel");
const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#2f3136",
    borderRadius: "8px",
    color: "#dcddde"
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "24px",
    paddingBottom: "16px",
    borderBottom: "2px solid #40444b"
  },
  title: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "bold"
  },
  statusCard: {
    backgroundColor: "#202225",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "16px",
    border: "2px solid #43b581"
  },
  statusHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px"
  },
  statusText: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#43b581"
  },
  statusInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  infoRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#b9bbbe"
  },
  warningCard: {
    backgroundColor: "#faa61a20",
    border: "2px solid #faa61a",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "16px",
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
    color: "#faa61a"
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "24px"
  },
  rotateButton: {
    padding: "12px 20px",
    backgroundColor: "#5865f2",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "background-color 0.2s"
  },
  disableButton: {
    padding: "12px 20px",
    backgroundColor: "#ed4245",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "background-color 0.2s"
  },
  disabledState: {
    textAlign: "center",
    padding: "40px 20px",
    color: "#b9bbbe"
  },
  infoSection: {
    backgroundColor: "#202225",
    borderRadius: "8px",
    padding: "20px"
  },
  infoTitle: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px",
    fontSize: "16px"
  },
  infoList: {
    margin: 0,
    paddingLeft: "20px",
    color: "#b9bbbe",
    fontSize: "14px",
    lineHeight: "1.8"
  }
};
export {
  E2EESettingsPanel as default
};
