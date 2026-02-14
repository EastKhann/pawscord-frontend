var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { z as FaClock, a as FaTimes, bv as FaCalendar, aZ as FaPaperPlane } from "./icons-vendor-2VDeY8fW.js";
const pad = /* @__PURE__ */ __name((n) => String(n).padStart(2, "0"), "pad");
const QUICK_OPTIONS = [
  { label: "15 dakika", minutes: 15 },
  { label: "1 saat", minutes: 60 },
  { label: "3 saat", minutes: 180 },
  { label: "Yarın sabah", getDate: /* @__PURE__ */ __name(() => {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(9, 0, 0, 0);
    return d;
  }, "getDate") },
  { label: "Yarın akşam", getDate: /* @__PURE__ */ __name(() => {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(18, 0, 0, 0);
    return d;
  }, "getDate") }
];
const MessageSchedulePicker = /* @__PURE__ */ __name(({ onSchedule, onClose }) => {
  const now = /* @__PURE__ */ new Date();
  const [date, setDate] = reactExports.useState(
    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
  );
  const [time, setTime] = reactExports.useState(`${pad(now.getHours())}:${pad(now.getMinutes() + 5)}`);
  const [error, setError] = reactExports.useState("");
  const handleQuickOption = reactExports.useCallback((opt) => {
    let targetDate;
    if (opt.getDate) {
      targetDate = opt.getDate();
    } else {
      targetDate = new Date(Date.now() + opt.minutes * 6e4);
    }
    setDate(`${targetDate.getFullYear()}-${pad(targetDate.getMonth() + 1)}-${pad(targetDate.getDate())}`);
    setTime(`${pad(targetDate.getHours())}:${pad(targetDate.getMinutes())}`);
    setError("");
  }, []);
  const handleSchedule = reactExports.useCallback(() => {
    const scheduled = /* @__PURE__ */ new Date(`${date}T${time}`);
    if (scheduled <= /* @__PURE__ */ new Date()) {
      setError("Geçmiş bir zaman seçemezsiniz");
      return;
    }
    onSchedule?.(scheduled.toISOString());
  }, [date, time, onSchedule]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.headerTitle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, { style: { color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mesaj Zamanlayıcı" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: S.closeBtn, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.quickOptions, children: QUICK_OPTIONS.map((opt, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: S.quickBtn, onClick: /* @__PURE__ */ __name(() => handleQuickOption(opt), "onClick"), children: opt.label }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.divider }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.customSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.sectionLabel, children: "ÖZEL TARİH & SAAT" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.inputs, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.inputGroup, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCalendar, { style: S.inputIcon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "date",
              value: date,
              onChange: /* @__PURE__ */ __name((e) => {
                setDate(e.target.value);
                setError("");
              }, "onChange"),
              style: S.input
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.inputGroup, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, { style: S.inputIcon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "time",
              value: time,
              onChange: /* @__PURE__ */ __name((e) => {
                setTime(e.target.value);
                setError("");
              }, "onChange"),
              style: S.input
            }
          )
        ] })
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.error, children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.preview, children: [
      "Gönderilecek: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: (/* @__PURE__ */ new Date(`${date}T${time}`)).toLocaleString("tr-TR") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: S.scheduleBtn, onClick: handleSchedule, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaPaperPlane, {}),
      " Zamanla"
    ] })
  ] }) });
}, "MessageSchedulePicker");
const S = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5e3
  },
  modal: {
    backgroundColor: "#2b2d31",
    borderRadius: 12,
    padding: 20,
    width: 380,
    maxWidth: "90vw",
    boxShadow: "0 8px 32px rgba(0,0,0,0.5)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16
  },
  headerTitle: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "#fff",
    fontWeight: 700,
    fontSize: 16
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#949ba4",
    cursor: "pointer",
    fontSize: 16,
    padding: 4
  },
  quickOptions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8
  },
  quickBtn: {
    padding: "6px 14px",
    backgroundColor: "rgba(88,101,242,0.1)",
    border: "1px solid rgba(88,101,242,0.3)",
    borderRadius: 8,
    color: "#dcddde",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
    transition: "all 0.15s"
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    margin: "16px 0"
  },
  customSection: {},
  sectionLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: "#949ba4",
    letterSpacing: "0.04em",
    display: "block",
    marginBottom: 10
  },
  inputs: { display: "flex", gap: 10 },
  inputGroup: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#1e1f22",
    borderRadius: 8,
    padding: "8px 12px"
  },
  inputIcon: { color: "#949ba4", fontSize: 14, flexShrink: 0 },
  input: {
    flex: 1,
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: 14,
    outline: "none"
  },
  error: {
    color: "#da373c",
    fontSize: 12,
    marginTop: 8,
    padding: "4px 8px",
    backgroundColor: "rgba(218,55,60,0.1)",
    borderRadius: 4
  },
  preview: {
    color: "#949ba4",
    fontSize: 13,
    marginTop: 16,
    padding: "8px 12px",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 8
  },
  scheduleBtn: {
    width: "100%",
    marginTop: 16,
    padding: "10px 0",
    backgroundColor: "#5865f2",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    transition: "background 0.15s"
  }
};
const MessageSchedulePicker_default = reactExports.memo(MessageSchedulePicker);
export {
  MessageSchedulePicker_default as default
};
