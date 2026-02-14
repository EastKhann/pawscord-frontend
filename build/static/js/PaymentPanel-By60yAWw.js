var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { aq as FaCoins, w as FaCheckCircle, bH as FaCreditCard, T as FaWallet, a as FaTimes, aB as FaHistory } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
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
    maxWidth: "800px",
    maxHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    color: "#fff"
  },
  header: {
    padding: "20px",
    borderBottom: "1px solid #444",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerLeft: { display: "flex", alignItems: "center", gap: "12px" },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "24px",
    cursor: "pointer",
    padding: "8px"
  },
  tabs: { display: "flex", borderBottom: "1px solid #444", padding: "0 20px" },
  tab: {
    background: "none",
    border: "none",
    color: "#99aab5",
    padding: "12px 20px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    borderBottom: "2px solid transparent",
    transition: "all 0.2s"
  },
  activeTab: { color: "#5865f2", borderBottomColor: "#5865f2" },
  content: { padding: "20px", overflowY: "auto", flex: 1 },
  loading: { textAlign: "center", padding: "40px", color: "#99aab5" },
  balanceView: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "30px"
  },
  balanceCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "12px",
    padding: "40px",
    textAlign: "center",
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px"
  },
  balanceAmount: { fontSize: "48px", fontWeight: "bold", color: "#faa61a" },
  balanceLabel: { fontSize: "14px", color: "#99aab5" },
  quickActions: { display: "flex", gap: "12px", width: "100%", maxWidth: "400px" },
  actionBtn: {
    flex: 1,
    padding: "12px 20px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "background 0.2s"
  },
  buyView: { display: "flex", flexDirection: "column", gap: "20px" },
  sectionTitle: { fontSize: "16px", fontWeight: "600", margin: 0, marginBottom: "12px" },
  packages: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px" },
  package: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    border: "2px solid transparent",
    transition: "all 0.2s",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px"
  },
  selectedPackage: { borderColor: "#5865f2", backgroundColor: "#2c3136" },
  pkgAmount: { fontSize: "24px", fontWeight: "bold", color: "#faa61a" },
  bonus: {
    fontSize: "10px",
    color: "#43b581",
    fontWeight: "bold",
    padding: "2px 8px",
    backgroundColor: "rgba(67, 181, 129, 0.1)",
    borderRadius: "4px"
  },
  pkgPrice: { fontSize: "18px", fontWeight: "600", color: "#fff" },
  purchaseSection: { marginTop: "24px" },
  paymentMethods: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    marginBottom: "32px"
  },
  paymentMethodCard: {
    padding: "20px",
    background: "#2b2d31",
    border: "2px solid #40444b",
    borderRadius: "12px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease"
  },
  selectedPaymentMethod: {
    background: "#5865f2",
    borderColor: "#5865f2",
    transform: "scale(1.05)",
    boxShadow: "0 4px 16px rgba(88, 101, 242, 0.3)"
  },
  pmIcon: { fontSize: "48px", marginBottom: "12px" },
  pmTitle: { fontSize: "16px", fontWeight: "600", color: "white", marginBottom: "6px" },
  pmDesc: { fontSize: "13px", color: "#b9bbbe", marginBottom: "8px" },
  pmBadge: {
    display: "inline-block",
    padding: "4px 12px",
    background: "#40444b",
    borderRadius: "12px",
    fontSize: "11px",
    color: "#43b581",
    fontWeight: "600"
  },
  paymentInfo: {
    background: "#2b2d31",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "16px"
  },
  paymentInfoRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    fontSize: "14px",
    color: "#b9bbbe",
    borderBottom: "1px solid #40444b"
  },
  paymentNote: { textAlign: "center", fontSize: "12px", color: "#43b581", marginTop: "12px" },
  price: { fontSize: "18px", fontWeight: "600", color: "#fff" },
  paymentMethod: { marginTop: "12px" },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#dcddde"
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
  purchaseBtn: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#43b581",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "12px"
  },
  transferView: { maxWidth: "500px", margin: "0 auto" },
  form: { display: "flex", flexDirection: "column", gap: "16px" },
  formGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  input: {
    padding: "10px",
    backgroundColor: "#2c2f33",
    border: "1px solid #444",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px"
  },
  hint: { fontSize: "12px", color: "#99aab5" },
  transferBtn: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "12px"
  },
  historyView: { display: "flex", flexDirection: "column", gap: "16px" },
  transactions: { display: "flex", flexDirection: "column", gap: "8px" },
  transaction: {
    backgroundColor: "#2c2f33",
    borderRadius: "6px",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  txIcon: { fontSize: "24px", display: "flex", alignItems: "center", justifyContent: "center" },
  txDetails: { flex: 1 },
  txTitle: { fontSize: "14px", fontWeight: "600" },
  txDate: { fontSize: "12px", color: "#99aab5", marginTop: "4px" },
  txAmount: { fontSize: "18px", fontWeight: "bold" },
  empty: { textAlign: "center", padding: "40px", color: "#99aab5" }
};
const COIN_PACKAGES = [
  { amount: 100, price: 0.99, bonus: 0 },
  { amount: 500, price: 4.99, bonus: 50 },
  { amount: 1e3, price: 9.99, bonus: 150 },
  { amount: 2500, price: 19.99, bonus: 500 },
  { amount: 5e3, price: 39.99, bonus: 1e3 }
];
const usePayment = /* @__PURE__ */ __name((fetchWithAuth, apiBaseUrl) => {
  const [activeTab, setActiveTab] = reactExports.useState("balance");
  const [balance, setBalance] = reactExports.useState(0);
  const [transactions, setTransactions] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [amount, setAmount] = reactExports.useState(100);
  const [paymentMethod, setPaymentMethod] = reactExports.useState("stripe");
  const [transferRecipient, setTransferRecipient] = reactExports.useState("");
  const [transferAmount, setTransferAmount] = reactExports.useState("");
  const [transferNote, setTransferNote] = reactExports.useState("");
  const loadBalance = reactExports.useCallback(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/users/balance/`);
      const data = await response.json();
      setBalance(data.balance || 0);
    } catch (error) {
      console.error("Failed to load balance:", error);
      toast.error("Failed to load balance");
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth, apiBaseUrl]);
  const loadTransactions = reactExports.useCallback(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/payments/history/`);
      const data = await response.json();
      setTransactions(data.transactions || []);
    } catch (error) {
      console.error("Failed to load transactions:", error);
    }
  }, [fetchWithAuth, apiBaseUrl]);
  reactExports.useEffect(() => {
    loadBalance();
    loadTransactions();
  }, [loadBalance, loadTransactions]);
  const handlePurchase = /* @__PURE__ */ __name(async () => {
    if (amount < 100) {
      toast.error("Minimum purchase is 100 coins");
      return;
    }
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/payments/coins/purchase/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coin_amount: parseInt(amount), payment_method: paymentMethod })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Payment failed");
      }
      const data = await response.json();
      if (data.success) {
        if (data.redirect_url) {
          toast.info("Redirecting to payment page...");
          window.location.href = data.redirect_url;
        } else if (data.payment_page_url) {
          toast.info("Redirecting to payment page...");
          window.location.href = data.payment_page_url;
        } else {
          toast.success("Payment initiated!");
        }
      } else {
        toast.error(data.error || "Payment failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.message || "Payment processing failed");
    }
  }, "handlePurchase");
  const handleTransfer = /* @__PURE__ */ __name(async () => {
    if (!transferRecipient || !transferAmount) {
      toast.error("Please fill in all fields");
      return;
    }
    const amt = parseInt(transferAmount);
    if (amt <= 0 || amt > balance) {
      toast.error("Invalid transfer amount");
      return;
    }
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/coins/transfer/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipient: transferRecipient, amount: amt, note: transferNote })
      });
      const data = await response.json();
      if (data.success) {
        toast.success(`Transferred ${amt} coins to ${transferRecipient}`);
        loadBalance();
        loadTransactions();
        setTransferRecipient("");
        setTransferAmount("");
        setTransferNote("");
        setActiveTab("balance");
      } else {
        toast.error(data.error || "Transfer failed");
      }
    } catch (error) {
      console.error("Transfer error:", error);
      toast.error("Transfer failed");
    }
  }, "handleTransfer");
  return {
    activeTab,
    setActiveTab,
    balance,
    transactions,
    loading,
    amount,
    setAmount,
    paymentMethod,
    setPaymentMethod,
    transferRecipient,
    setTransferRecipient,
    transferAmount,
    setTransferAmount,
    transferNote,
    setTransferNote,
    handlePurchase,
    handleTransfer
  };
}, "usePayment");
const PAYMENT_METHODS = [
  { key: "crypto", icon: "🪙", title: "Cryptocurrency", desc: "Bitcoin, Ethereum, USDC", badge: "Global • Fast" },
  { key: "stripe", icon: "💳", title: "Credit/Debit Card", desc: "Stripe - Visa, Mastercard", badge: "Global • Secure" },
  { key: "iyzico", icon: "🇹🇷", title: "Turkish Payment", desc: "İyzico - TL payments", badge: "Turkey • TRY" }
];
const PAYMENT_LABELS = { crypto: "🪙 Crypto", stripe: "💳 Card (Stripe)", iyzico: "🇹🇷 İyzico (TRY)" };
const PAYMENT_NOTES = {
  crypto: "🔒 Secure cryptocurrency payment via Coinbase Commerce",
  stripe: "🔒 Secure card payment via Stripe",
  iyzico: "🔒 Güvenli ödeme - İyzico ile korunur"
};
const PURCHASE_LABELS = { crypto: " Pay with Crypto", stripe: " Pay with Card", iyzico: " İyzico ile Öde" };
const BuyCoinsView = /* @__PURE__ */ __name(({ styles: styles2, amount, setAmount, paymentMethod, setPaymentMethod, handlePurchase }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.buyView, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles2.sectionTitle, children: "Choose Payment Method" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles2.paymentMethods, children: PAYMENT_METHODS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      onClick: /* @__PURE__ */ __name(() => setPaymentMethod(m.key), "onClick"),
      style: { ...styles2.paymentMethodCard, ...paymentMethod === m.key && styles2.selectedPaymentMethod },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles2.pmIcon, children: m.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles2.pmTitle, children: m.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles2.pmDesc, children: m.desc }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles2.pmBadge, children: m.badge })
      ]
    },
    m.key
  )) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles2.sectionTitle, children: "Select Coin Package" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles2.packages, children: COIN_PACKAGES.map((pkg, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      onClick: /* @__PURE__ */ __name(() => setAmount(pkg.amount), "onClick"),
      style: { ...styles2.package, ...amount === pkg.amount && styles2.selectedPackage },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCoins, { style: { fontSize: "32px", color: "#faa61a" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles2.pkgAmount, children: pkg.amount.toLocaleString() }),
        pkg.bonus > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.bonus, children: [
          "+",
          pkg.bonus,
          " BONUS"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.price, children: [
          "$",
          pkg.price
        ] }),
        amount === pkg.amount && /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheckCircle, { style: { position: "absolute", top: "10px", right: "10px", color: "#43b581" } })
      ]
    },
    idx
  )) }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.purchaseSection, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.paymentInfo, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.paymentInfoRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Selected Package:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
          amount.toLocaleString(),
          " coins"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.paymentInfoRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Payment Method:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: PAYMENT_LABELS[paymentMethod] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.paymentInfoRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total Price:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "#faa61a", fontSize: "18px" }, children: COIN_PACKAGES.find((p) => p.amount === amount)?.price && (paymentMethod === "iyzico" ? `₺${(COIN_PACKAGES.find((p) => p.amount === amount).price * 35).toFixed(0)}` : `$${COIN_PACKAGES.find((p) => p.amount === amount).price}`) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handlePurchase, style: styles2.purchaseBtn, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaCreditCard, {}),
      PURCHASE_LABELS[paymentMethod]
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles2.paymentNote, children: PAYMENT_NOTES[paymentMethod] })
  ] })
] }), "BuyCoinsView");
const TransferView = /* @__PURE__ */ __name(({
  styles: styles2,
  balance,
  transferRecipient,
  setTransferRecipient,
  transferAmount,
  setTransferAmount,
  transferNote,
  setTransferNote,
  handleTransfer
}) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.transferView, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles2.sectionTitle, children: "Transfer Coins" }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.form, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.formGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles2.label, children: "Recipient Username" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: transferRecipient,
          onChange: /* @__PURE__ */ __name((e) => setTransferRecipient(e.target.value), "onChange"),
          placeholder: "@username",
          style: styles2.input
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.formGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles2.label, children: "Amount" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "number",
          value: transferAmount,
          onChange: /* @__PURE__ */ __name((e) => setTransferAmount(e.target.value), "onChange"),
          placeholder: "0",
          min: "1",
          max: balance,
          style: styles2.input
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.hint, children: [
        "Available: ",
        balance,
        " coins"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.formGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles2.label, children: "Note (Optional)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: transferNote,
          onChange: /* @__PURE__ */ __name((e) => setTransferNote(e.target.value), "onChange"),
          placeholder: "Add a message...",
          style: styles2.input
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleTransfer, style: styles2.transferBtn, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaCoins, {}),
      " Transfer Coins"
    ] })
  ] })
] }), "TransferView");
const PaymentPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, username }) => {
  const {
    activeTab,
    setActiveTab,
    balance,
    transactions,
    loading,
    amount,
    setAmount,
    paymentMethod,
    setPaymentMethod,
    transferRecipient,
    setTransferRecipient,
    transferAmount,
    setTransferAmount,
    transferNote,
    setTransferNote,
    handlePurchase,
    handleTransfer
  } = usePayment(fetchWithAuth, apiBaseUrl);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaWallet, { style: { fontSize: "24px", color: "#faa61a" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0, fontSize: "20px" }, children: "Payment Center" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.tabs, children: [
      { key: "balance", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCoins, {}), label: "Balance" },
      { key: "buy", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCreditCard, {}), label: "Buy Coins" },
      { key: "transfer", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCoins, {}), label: "Transfer" },
      { key: "history", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, {}), label: "History" }
    ].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: /* @__PURE__ */ __name(() => setActiveTab(t.key), "onClick"),
        style: { ...styles.tab, ...activeTab === t.key && styles.activeTab },
        children: [
          t.icon,
          " ",
          t.label
        ]
      },
      t.key
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading..." }) : activeTab === "balance" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.balanceView, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.balanceCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCoins, { style: { fontSize: "48px", color: "#faa61a" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.balanceAmount, children: balance.toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.balanceLabel, children: "Current Balance" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.quickActions, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setActiveTab("buy"), "onClick"), style: styles.actionBtn, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCreditCard, {}),
          " Buy Coins"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setActiveTab("transfer"), "onClick"), style: styles.actionBtn, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCoins, {}),
          " Transfer Coins"
        ] })
      ] })
    ] }) : activeTab === "buy" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      BuyCoinsView,
      {
        styles,
        amount,
        setAmount,
        paymentMethod,
        setPaymentMethod,
        handlePurchase
      }
    ) : activeTab === "transfer" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      TransferView,
      {
        styles,
        balance,
        transferRecipient,
        setTransferRecipient,
        transferAmount,
        setTransferAmount,
        transferNote,
        setTransferNote,
        handleTransfer
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.historyView, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "Transaction History" }),
      transactions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No transactions yet" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.transactions, children: transactions.map((tx, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.transaction, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.txIcon, children: tx.type === "purchase" ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaCreditCard, { style: { color: "#5865f2" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaCoins, { style: { color: tx.type === "transfer_sent" ? "#f04747" : "#43b581" } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.txDetails, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.txTitle, children: tx.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.txDate, children: new Date(tx.created_at).toLocaleString() })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.txAmount, color: tx.amount > 0 ? "#43b581" : "#f04747" }, children: [
          tx.amount > 0 ? "+" : "",
          tx.amount
        ] })
      ] }, idx)) })
    ] }) })
  ] }) });
}, "PaymentPanel");
export {
  PaymentPanel as default
};
