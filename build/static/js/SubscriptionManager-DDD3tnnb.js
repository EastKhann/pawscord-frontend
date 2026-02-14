var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a as FaTimes, a9 as FaCheck, ay as FaBan, K as FaArrowRight, bH as FaCreditCard, ah as FaCrown, bC as FaGift, aB as FaHistory } from "./icons-vendor-2VDeY8fW.js";
import { d as confirmDialog } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const SubscriptionManager = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, username, onClose }) => {
  const [activeTab, setActiveTab] = reactExports.useState("current");
  const [subscriptions, setSubscriptions] = reactExports.useState([]);
  const [history, setHistory] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    loadSubscriptions();
  }, []);
  const loadSubscriptions = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      setSubscriptions([
        {
          id: 1,
          name: "Pawscord Nitro",
          tier: "premium",
          price: "$9.99/ay",
          status: "active",
          nextBilling: "2026-03-15",
          features: ["HD Video", "Özel Emojiler", "100MB Upload", "Profil Banner"],
          icon: "💎"
        },
        {
          id: 2,
          name: "Server Boost",
          tier: "boost",
          price: "$4.99/ay",
          status: "active",
          nextBilling: "2026-03-20",
          features: ["Seviye 1 Boost", "50 Ekstra Emoji Slotu", "HD Ses"],
          icon: "🚀"
        }
      ]);
      setHistory([
        { id: 1, date: "2026-02-15", description: "Pawscord Nitro - Aylık", amount: "$9.99", status: "paid" },
        { id: 2, date: "2026-01-15", description: "Pawscord Nitro - Aylık", amount: "$9.99", status: "paid" },
        { id: 3, date: "2026-01-20", description: "Server Boost", amount: "$4.99", status: "paid" },
        { id: 4, date: "2025-12-15", description: "Pawscord Nitro - Aylık", amount: "$9.99", status: "paid" }
      ]);
    } catch (err) {
      console.error("Subscription load error:", err);
    } finally {
      setLoading(false);
    }
  }, "loadSubscriptions");
  const handleCancel = /* @__PURE__ */ __name(async (subId) => {
    if (await confirmDialog("Bu aboneliği iptal etmek istediğinize emin misiniz?")) {
      setSubscriptions((prev) => prev.map(
        (s) => s.id === subId ? { ...s, status: "cancelled" } : s
      ));
    }
  }, "handleCancel");
  const handleResume = /* @__PURE__ */ __name((subId) => {
    setSubscriptions((prev) => prev.map(
      (s) => s.id === subId ? { ...s, status: "active" } : s
    ));
  }, "handleResume");
  const plans = [
    {
      name: "Ücretsiz",
      price: "$0",
      features: ["Temel Sohbet", "8MB Upload", "Standart Ses"],
      color: "#747f8d",
      current: false
    },
    {
      name: "Nitro Basic",
      price: "$2.99/ay",
      features: ["50MB Upload", "Özel Emoji Kullanımı", "Profil Banner", "HD Video"],
      color: "#5865f2",
      current: false
    },
    {
      name: "Nitro",
      price: "$9.99/ay",
      features: ["100MB Upload", "Tüm Emojiler", "Profil Banner", "2 Server Boost", "HD Video 4K", "Özel Etiket"],
      color: "#eb459e",
      current: true
    }
  ];
  const tabs = [
    { id: "current", label: "Mevcut Abonelikler", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCrown, {}) },
    { id: "plans", label: "Planlar", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaGift, {}) },
    { id: "history", label: "Ödeme Geçmişi", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, {}) },
    { id: "payment", label: "Ödeme Yöntemleri", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCreditCard, {}) }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: /* @__PURE__ */ __name((e) => e.target === e.currentTarget && onClose(), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "📋 Abonelik Yönetimi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.tabs, children: tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: /* @__PURE__ */ __name(() => setActiveTab(tab.id), "onClick"),
        style: {
          ...styles.tab,
          ...activeTab === tab.id ? styles.tabActive : {}
        },
        children: [
          tab.icon,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tab.label })
        ]
      },
      tab.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Yükleniyor..." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      activeTab === "current" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.subscriptionsList, children: subscriptions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "Aktif aboneliğiniz bulunmuyor" }) : subscriptions.map((sub) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.subCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.subHeader, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "24px" }, children: sub.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.subName, children: sub.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.subPrice, children: sub.price })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            ...styles.statusBadge,
            backgroundColor: sub.status === "active" ? "rgba(59,165,93,0.2)" : "rgba(237,66,69,0.2)",
            color: sub.status === "active" ? "#3ba55d" : "#ed4245"
          }, children: sub.status === "active" ? "Aktif" : "İptal Edildi" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.subFeatures, children: sub.features.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.feature, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { style: { color: "#3ba55d", fontSize: "10px" } }),
          " ",
          f
        ] }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.subFooter, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.nextBilling, children: [
            "Sonraki fatura: ",
            sub.nextBilling
          ] }),
          sub.status === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => handleCancel(sub.id), "onClick"), style: styles.cancelBtn, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaBan, {}),
            " İptal Et"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => handleResume(sub.id), "onClick"), style: styles.resumeBtn, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaArrowRight, {}),
            " Devam Ettir"
          ] })
        ] })
      ] }, sub.id)) }),
      activeTab === "plans" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.plansGrid, children: plans.map((plan, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        ...styles.planCard,
        border: plan.current ? `2px solid ${plan.color}` : "1px solid rgba(255,255,255,0.1)"
      }, children: [
        plan.current && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.currentBadge, backgroundColor: plan.color }, children: "Mevcut Plan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { ...styles.planName, color: plan.color }, children: plan.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.planPrice, children: plan.price }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.planFeatures, children: plan.features.map((f, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.planFeature, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { style: { color: plan.color, fontSize: "10px" } }),
          " ",
          f
        ] }, j)) }),
        !plan.current && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: { ...styles.upgradeBtn, backgroundColor: plan.color }, children: "Yükselt" })
      ] }, i)) }),
      activeTab === "history" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.historyList, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { style: styles.table, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: styles.th, children: "Tarih" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: styles.th, children: "Açıklama" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: styles.th, children: "Tutar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: styles.th, children: "Durum" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: history.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: styles.td, children: item.date }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: styles.td, children: item.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: styles.td, children: item.amount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: styles.td, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.paidBadge, children: "✅ Ödendi" }) })
        ] }, item.id)) })
      ] }) }),
      activeTab === "payment" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.paymentSection, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "Kayıtlı Ödeme Yöntemleri" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.paymentMethods, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.paymentCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCreditCard, { style: { fontSize: "24px", color: "#5865f2" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#fff", fontWeight: "bold" }, children: "•••• •••• •••• 4242" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#72767d", fontSize: "12px" }, children: "Son kullanma: 12/28" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.defaultBadge, children: "Varsayılan" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: styles.addPaymentBtn, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCreditCard, {}),
          " Yeni Ödeme Yöntemi Ekle"
        ] })
      ] })
    ] }) })
  ] }) });
}, "SubscriptionManager");
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: 9999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(4px)"
  },
  modal: {
    backgroundColor: "#36393f",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "800px",
    maxHeight: "85vh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    borderBottom: "1px solid rgba(255,255,255,0.1)"
  },
  title: { margin: 0, color: "#fff", fontSize: "1.3em" },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    fontSize: "20px",
    cursor: "pointer"
  },
  tabs: {
    display: "flex",
    padding: "0 24px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    gap: "4px",
    overflowX: "auto"
  },
  tab: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "12px 16px",
    background: "none",
    border: "none",
    borderBottom: "2px solid transparent",
    color: "#8e9297",
    cursor: "pointer",
    fontSize: "13px",
    whiteSpace: "nowrap"
  },
  tabActive: {
    color: "#fff",
    borderBottomColor: "#5865f2"
  },
  content: { flex: 1, overflow: "auto", padding: "20px 24px" },
  loading: { textAlign: "center", color: "#72767d", padding: "40px" },
  empty: { textAlign: "center", color: "#72767d", padding: "40px" },
  subscriptionsList: { display: "flex", flexDirection: "column", gap: "16px" },
  subCard: {
    backgroundColor: "#2f3136",
    borderRadius: "8px",
    padding: "20px",
    border: "1px solid rgba(255,255,255,0.06)"
  },
  subHeader: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" },
  subName: { margin: 0, color: "#fff", fontSize: "16px" },
  subPrice: { color: "#72767d", fontSize: "13px" },
  statusBadge: { padding: "4px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: "bold", marginLeft: "auto" },
  subFeatures: { display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" },
  feature: { display: "flex", alignItems: "center", gap: "4px", color: "#b9bbbe", fontSize: "12px" },
  subFooter: { display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.06)" },
  nextBilling: { color: "#72767d", fontSize: "12px" },
  cancelBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 16px",
    backgroundColor: "rgba(237,66,69,0.2)",
    color: "#ed4245",
    border: "1px solid rgba(237,66,69,0.4)",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px"
  },
  resumeBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 16px",
    backgroundColor: "rgba(59,165,93,0.2)",
    color: "#3ba55d",
    border: "1px solid rgba(59,165,93,0.4)",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px"
  },
  plansGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" },
  planCard: {
    backgroundColor: "#2f3136",
    borderRadius: "12px",
    padding: "24px",
    position: "relative",
    textAlign: "center"
  },
  currentBadge: { position: "absolute", top: "-1px", left: "50%", transform: "translateX(-50%)", padding: "2px 12px", borderRadius: "0 0 8px 8px", color: "#fff", fontSize: "10px", fontWeight: "bold" },
  planName: { margin: "12px 0 8px", fontSize: "18px" },
  planPrice: { color: "#fff", fontSize: "24px", fontWeight: "bold", marginBottom: "16px" },
  planFeatures: { textAlign: "left" },
  planFeature: { display: "flex", alignItems: "center", gap: "8px", color: "#b9bbbe", fontSize: "13px", marginBottom: "8px" },
  upgradeBtn: { width: "100%", padding: "10px", border: "none", borderRadius: "4px", color: "#fff", cursor: "pointer", fontWeight: "bold", marginTop: "16px", fontSize: "14px" },
  historyList: { overflow: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "10px", color: "#72767d", fontSize: "12px", textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.06)" },
  td: { padding: "12px 10px", color: "#dcddde", fontSize: "13px", borderBottom: "1px solid rgba(255,255,255,0.04)" },
  paidBadge: { fontSize: "12px" },
  paymentSection: {},
  sectionTitle: { color: "#fff", fontSize: "16px", marginBottom: "16px" },
  paymentMethods: { display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" },
  paymentCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px",
    backgroundColor: "#2f3136",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.06)"
  },
  defaultBadge: { marginLeft: "auto", padding: "2px 8px", backgroundColor: "rgba(88,101,242,0.2)", color: "#5865f2", borderRadius: "4px", fontSize: "11px" },
  addPaymentBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 20px",
    backgroundColor: "#5865f2",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px"
  }
};
export {
  SubscriptionManager as default
};
