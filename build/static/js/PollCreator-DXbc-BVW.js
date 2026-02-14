var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { t as toast, g as getApiBase } from "./index-DGqPEDt8.js";
import { a as axios } from "./index-BnLT0o6q.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
import "./ui-vendor-iPoN0WGz.js";
const PollCreator = /* @__PURE__ */ __name(({ roomSlug, token, onClose, onPollCreated, isMobile }) => {
  const [question, setQuestion] = reactExports.useState("");
  const [options, setOptions] = reactExports.useState(["", ""]);
  const [duration, setDuration] = reactExports.useState(24);
  const [isCreating, setIsCreating] = reactExports.useState(false);
  const addOption = /* @__PURE__ */ __name(() => {
    if (options.length < 10) {
      setOptions([...options, ""]);
    }
  }, "addOption");
  const removeOption = /* @__PURE__ */ __name((index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  }, "removeOption");
  const updateOption = /* @__PURE__ */ __name((index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  }, "updateOption");
  const handleCreate = /* @__PURE__ */ __name(async () => {
    if (!question.trim()) {
      toast.error("❌ Please enter a question");
      return;
    }
    const validOptions = options.filter((o) => o.trim());
    if (validOptions.length < 2) {
      toast.error("❌ Please provide at least 2 options");
      return;
    }
    setIsCreating(true);
    try {
      const response = await axios.post(
        `${getApiBase()}/polls/create/`,
        {
          room_slug: roomSlug,
          question: question.trim(),
          options: validOptions.map((opt) => opt.trim()),
          duration_hours: duration
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (onPollCreated) {
        onPollCreated(response.data);
      }
      onClose();
    } catch (error) {
      console.error("Failed to create poll:", error);
      toast.error("❌ Failed to create poll. Please try again.");
    } finally {
      setIsCreating(false);
    }
  }, "handleCreate");
  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.8)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1e4,
      padding: isMobile ? "20px" : "40px"
    },
    modal: {
      background: "linear-gradient(135deg, rgba(30, 31, 34, 0.98), rgba(35, 36, 40, 0.98))",
      borderRadius: "16px",
      padding: isMobile ? "20px" : "30px",
      width: "100%",
      maxWidth: isMobile ? "100%" : "500px",
      maxHeight: "90vh",
      overflowY: "auto",
      boxShadow: "0 10px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(88, 101, 242, 0.3)",
      border: "1px solid rgba(88, 101, 242, 0.4)"
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "24px"
    },
    title: {
      fontSize: isMobile ? "20px" : "24px",
      fontWeight: "700",
      color: "rgba(255, 255, 255, 0.95)",
      margin: 0,
      display: "flex",
      alignItems: "center",
      gap: "10px"
    },
    closeButton: {
      background: "rgba(88, 101, 242, 0.2)",
      border: "1px solid rgba(88, 101, 242, 0.4)",
      borderRadius: "8px",
      width: "36px",
      height: "36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: "20px",
      color: "rgba(255, 255, 255, 0.9)",
      transition: "all 0.2s ease"
    },
    formGroup: {
      marginBottom: "20px"
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: "600",
      color: "rgba(255, 255, 255, 0.8)",
      marginBottom: "8px"
    },
    input: {
      width: "100%",
      padding: "12px 14px",
      background: "rgba(0, 0, 0, 0.3)",
      border: "1px solid rgba(88, 101, 242, 0.3)",
      borderRadius: "8px",
      color: "rgba(255, 255, 255, 0.95)",
      fontSize: "15px",
      outline: "none",
      transition: "all 0.2s ease",
      boxSizing: "border-box"
    },
    optionContainer: {
      display: "flex",
      gap: "8px",
      marginBottom: "10px"
    },
    optionInput: {
      flex: 1,
      padding: "12px 14px",
      background: "rgba(0, 0, 0, 0.3)",
      border: "1px solid rgba(88, 101, 242, 0.3)",
      borderRadius: "8px",
      color: "rgba(255, 255, 255, 0.95)",
      fontSize: "14px",
      outline: "none"
    },
    removeButton: {
      background: "rgba(218, 55, 60, 0.2)",
      border: "1px solid rgba(218, 55, 60, 0.4)",
      borderRadius: "8px",
      padding: "0 16px",
      cursor: "pointer",
      fontSize: "18px",
      color: "#da373c",
      transition: "all 0.2s ease",
      minWidth: "44px"
    },
    addButton: {
      background: "rgba(88, 101, 242, 0.2)",
      border: "1px solid rgba(88, 101, 242, 0.4)",
      borderRadius: "8px",
      padding: "10px 16px",
      cursor: "pointer",
      fontSize: "14px",
      color: "rgba(255, 255, 255, 0.9)",
      transition: "all 0.2s ease",
      width: "100%",
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      minHeight: "44px"
    },
    durationContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
      gap: "10px"
    },
    durationButton: /* @__PURE__ */ __name((isActive) => ({
      padding: "12px",
      background: isActive ? "linear-gradient(135deg, rgba(88, 101, 242, 0.3), rgba(114, 137, 218, 0.3))" : "rgba(0, 0, 0, 0.3)",
      border: `1px solid ${isActive ? "rgba(88, 101, 242, 0.6)" : "rgba(88, 101, 242, 0.3)"}`,
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "13px",
      color: "rgba(255, 255, 255, 0.9)",
      transition: "all 0.2s ease",
      fontWeight: isActive ? "600" : "400",
      minHeight: "44px"
    }), "durationButton"),
    buttonContainer: {
      display: "flex",
      gap: "12px",
      marginTop: "24px"
    },
    createButton: {
      flex: 1,
      padding: "14px",
      background: "linear-gradient(135deg, #5865f2, #7289da)",
      border: "none",
      borderRadius: "8px",
      cursor: isCreating ? "not-allowed" : "pointer",
      fontSize: "16px",
      fontWeight: "600",
      color: "white",
      transition: "all 0.2s ease",
      opacity: isCreating ? 0.6 : 1,
      minHeight: "44px"
    },
    cancelButton: {
      flex: 1,
      padding: "14px",
      background: "rgba(78, 80, 88, 0.5)",
      border: "1px solid rgba(88, 101, 242, 0.3)",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "600",
      color: "rgba(255, 255, 255, 0.9)",
      transition: "all 0.2s ease",
      minHeight: "44px"
    }
  };
  const durationOptions = [1, 4, 8, 24, 72, 168];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: styles.title, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📊" }),
        "Create Poll"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: "✕" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Question" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: question,
          onChange: /* @__PURE__ */ __name((e) => setQuestion(e.target.value), "onChange"),
          placeholder: "What's your question?",
          style: styles.input,
          maxLength: 200
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Options (2-10)" }),
      options.map((option, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.optionContainer, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: option,
            onChange: /* @__PURE__ */ __name((e) => updateOption(index, e.target.value), "onChange"),
            placeholder: `Option ${index + 1}`,
            style: styles.optionInput,
            maxLength: 100
          }
        ),
        options.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => removeOption(index), "onClick"),
            style: styles.removeButton,
            children: "✕"
          }
        )
      ] }, index)),
      options.length < 10 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: addOption, style: styles.addButton, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "➕" }),
        "Add Option"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Poll Duration" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.durationContainer, children: durationOptions.map((hours) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => setDuration(hours), "onClick"),
          style: styles.durationButton(duration === hours),
          children: hours < 24 ? `${hours}h` : `${hours / 24}d`
        },
        hours
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.buttonContainer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.cancelButton, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleCreate,
          disabled: isCreating,
          style: styles.createButton,
          children: isCreating ? "Creating..." : "Create Poll"
        }
      )
    ] })
  ] }) });
}, "PollCreator");
export {
  PollCreator as default
};
