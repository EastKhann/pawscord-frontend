var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { bG as FaPoll, a as FaTimes, an as FaPlus, g as FaTrash, bv as FaCalendar } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const EnhancedPollsPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, roomSlug }) => {
  const [question, setQuestion] = reactExports.useState("");
  const [options, setOptions] = reactExports.useState(["", ""]);
  const [allowMultiple, setAllowMultiple] = reactExports.useState(false);
  const [anonymous, setAnonymous] = reactExports.useState(false);
  const [duration, setDuration] = reactExports.useState(24);
  const [scheduledFor, setScheduledFor] = reactExports.useState("");
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
  const createPoll = /* @__PURE__ */ __name(async () => {
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }
    const validOptions = options.filter((o) => o.trim());
    if (validOptions.length < 2) {
      toast.error("Please add at least 2 options");
      return;
    }
    try {
      const payload = {
        question: question.trim(),
        options: validOptions,
        allow_multiple: allowMultiple,
        anonymous,
        duration_hours: duration,
        room_slug: roomSlug
      };
      if (scheduledFor) {
        payload.scheduled_for = new Date(scheduledFor).toISOString();
      }
      await fetchWithAuth(`${apiBaseUrl}/polls/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      toast.success(scheduledFor ? "Poll scheduled successfully" : "Poll created successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to create poll");
    }
  }, "createPoll");
  const durationOptions = [
    { value: 1, label: "1 Hour" },
    { value: 6, label: "6 Hours" },
    { value: 12, label: "12 Hours" },
    { value: 24, label: "1 Day" },
    { value: 48, label: "2 Days" },
    { value: 72, label: "3 Days" },
    { value: 168, label: "1 Week" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPoll, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Create Poll" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.sectionHeader, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Options" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: addOption, style: styles.addButton, disabled: options.length >= 10, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, { style: { marginRight: "6px" } }),
            "Add Option"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.optionsList, children: options.map((option, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.optionRow, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: option,
              onChange: /* @__PURE__ */ __name((e) => updateOption(idx, e.target.value), "onChange"),
              placeholder: `Option ${idx + 1}`,
              style: styles.optionInput,
              maxLength: 100
            }
          ),
          options.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: /* @__PURE__ */ __name(() => removeOption(idx), "onClick"),
              style: styles.removeButton,
              title: "Remove",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {})
            }
          )
        ] }, idx)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Duration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.durationGrid, children: durationOptions.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => setDuration(opt.value), "onClick"),
            style: {
              ...styles.durationButton,
              ...duration === opt.value && styles.durationButtonActive
            },
            children: opt.label
          },
          opt.value
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.label, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCalendar, { style: { marginRight: "6px" } }),
          "Schedule (Optional)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "datetime-local",
            value: scheduledFor,
            onChange: /* @__PURE__ */ __name((e) => setScheduledFor(e.target.value), "onChange"),
            style: styles.input,
            min: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16)
          }
        ),
        scheduledFor && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.hint, children: [
          "Poll will be posted on ",
          new Date(scheduledFor).toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.checkboxes, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.checkbox, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: allowMultiple,
              onChange: /* @__PURE__ */ __name((e) => setAllowMultiple(e.target.checked), "onChange")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.checkboxLabel, children: "Allow multiple selections" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.checkbox, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: anonymous,
              onChange: /* @__PURE__ */ __name((e) => setAnonymous(e.target.checked), "onChange")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.checkboxLabel, children: "Anonymous voting" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: createPoll, style: styles.createButton, children: scheduledFor ? "Schedule Poll" : "Create Poll" })
    ] })
  ] }) });
}, "EnhancedPollsPanel");
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
    maxWidth: "600px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)"
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
    fontSize: "20px",
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
    padding: "20px",
    overflowY: "auto",
    flex: 1
  },
  section: {
    marginBottom: "24px"
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px"
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#dcddde",
    marginBottom: "8px"
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    backgroundColor: "#2c2f33",
    border: "1px solid #2c2f33",
    borderRadius: "4px",
    color: "#ffffff",
    fontSize: "14px"
  },
  optionsList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  optionRow: {
    display: "flex",
    gap: "10px"
  },
  optionInput: {
    flex: 1,
    padding: "10px 12px",
    backgroundColor: "#2c2f33",
    border: "1px solid #2c2f33",
    borderRadius: "4px",
    color: "#ffffff",
    fontSize: "14px"
  },
  addButton: {
    padding: "6px 12px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "12px",
    display: "flex",
    alignItems: "center"
  },
  removeButton: {
    background: "none",
    border: "none",
    color: "#f04747",
    cursor: "pointer",
    fontSize: "14px",
    padding: "8px 12px"
  },
  durationGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
    gap: "8px"
  },
  durationButton: {
    padding: "10px",
    backgroundColor: "#2c2f33",
    border: "1px solid #2c2f33",
    borderRadius: "4px",
    color: "#dcddde",
    cursor: "pointer",
    fontSize: "13px"
  },
  durationButtonActive: {
    backgroundColor: "#5865f2",
    borderColor: "#5865f2",
    color: "#ffffff"
  },
  hint: {
    fontSize: "12px",
    color: "#99aab5",
    marginTop: "8px"
  },
  checkboxes: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "24px"
  },
  checkbox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  },
  checkboxLabel: {
    fontSize: "14px",
    color: "#dcddde"
  },
  createButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#43b581",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600"
  }
};
export {
  EnhancedPollsPanel as default
};
