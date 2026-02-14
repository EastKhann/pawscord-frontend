var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a as FaTimes, g as FaTrash, an as FaPlus } from "./icons-vendor-2VDeY8fW.js";
const PollCreateModal = /* @__PURE__ */ __name(({ onClose, fetchWithAuth, apiBaseUrl, activeRoomSlug }) => {
  const [question, setQuestion] = reactExports.useState("");
  const [options, setOptions] = reactExports.useState(["", ""]);
  const [allowMultiple, setAllowMultiple] = reactExports.useState(false);
  const [expiresIn, setExpiresIn] = reactExports.useState("3600");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const handleOptionChange = /* @__PURE__ */ __name((index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  }, "handleOptionChange");
  const addOption = /* @__PURE__ */ __name(() => {
    if (options.length < 10) {
      setOptions([...options, ""]);
    }
  }, "addOption");
  const removeOption = /* @__PURE__ */ __name((index) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  }, "removeOption");
  const handleSubmit = /* @__PURE__ */ __name(async (e) => {
    e.preventDefault();
    setError(null);
    if (!question.trim()) {
      setError("Soru boş olamaz.");
      return;
    }
    const validOptions = options.filter((o) => o.trim() !== "");
    if (validOptions.length < 2) {
      setError("En az 2 seçenek girmelisiniz.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/polls/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room_slug: activeRoomSlug,
          question,
          options: validOptions,
          allow_multiple: allowMultiple,
          expires_in: expiresIn ? parseInt(expiresIn) : null
        })
      });
      if (response.ok) {
        onClose();
      } else {
        const data = await response.json();
        setError(data.error || "Anket oluşturulamadı.");
      }
    } catch (err) {
      setError("Bir hata oluştu: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }, "handleSubmit");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2e3
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    backgroundColor: "#36393f",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    maxWidth: "90%",
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { margin: 0 }, children: "Anket Oluştur" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: { background: "none", border: "none", color: "#b9bbbe", cursor: "pointer" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#ed4245", fontSize: "14px" }, children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "text",
        placeholder: "Soru ne?",
        value: question,
        onChange: /* @__PURE__ */ __name((e) => setQuestion(e.target.value), "onChange"),
        style: {
          padding: "10px",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#202225",
          color: "white"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { maxHeight: "200px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px" }, children: options.map((opt, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "5px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: `Seçenek ${idx + 1}`,
          value: opt,
          onChange: /* @__PURE__ */ __name((e) => handleOptionChange(idx, e.target.value), "onChange"),
          style: {
            flex: 1,
            padding: "8px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#202225",
            color: "white"
          }
        }
      ),
      options.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => removeOption(idx), "onClick"), style: { background: "none", border: "none", color: "#ed4245", cursor: "pointer" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}) })
    ] }, idx)) }),
    options.length < 10 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: addOption, style: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
      background: "none",
      border: "none",
      color: "#3ba55d",
      cursor: "pointer",
      alignSelf: "flex-start"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
      " Seçenek Ekle"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "10px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: { display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            checked: allowMultiple,
            onChange: /* @__PURE__ */ __name((e) => setAllowMultiple(e.target.checked), "onChange")
          }
        ),
        "Birden çok seçime izin ver"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: expiresIn,
          onChange: /* @__PURE__ */ __name((e) => setExpiresIn(e.target.value), "onChange"),
          style: { padding: "8px", borderRadius: "4px", backgroundColor: "#202225", color: "white", border: "none" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "3600", children: "1 Saat" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "86400", children: "24 Saat" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "604800", children: "1 Hafta" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Süresiz" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: {
        padding: "10px 20px",
        borderRadius: "4px",
        border: "none",
        backgroundColor: "transparent",
        color: "white",
        cursor: "pointer"
      }, children: "İptal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSubmit, disabled: isLoading, style: {
        padding: "10px 20px",
        borderRadius: "4px",
        border: "none",
        backgroundColor: "#5865f2",
        color: "white",
        cursor: "pointer",
        opacity: isLoading ? 0.7 : 1
      }, children: isLoading ? "Oluşturuluyor..." : "Oluştur" })
    ] })
  ] }) });
}, "PollCreateModal");
export {
  PollCreateModal as default
};
