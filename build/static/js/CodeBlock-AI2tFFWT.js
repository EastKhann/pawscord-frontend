var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { v as FaSpinner, aN as FaPlay, a9 as FaCheck, aV as FaCopy, cB as FaChevronUp, e as FaChevronDown } from "./icons-vendor-2VDeY8fW.js";
import { A as API_BASE_URL } from "./index-DGqPEDt8.js";
import { S as SyntaxHighlighter, v as vscDarkPlus, j as javascript, t as typescript, p as python, e as java, g as csharp, i as cpp, k as c, l as go, r as rust, m as php, n as ruby, o as swift, q as bash, u as json, y as yaml, w as sql, x as css, z as markup } from "./syntax-core-DVGewJU9.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
import "./perf-vendor-C7SkqPhC.js";
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("js", javascript);
SyntaxHighlighter.registerLanguage("jsx", javascript);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("ts", typescript);
SyntaxHighlighter.registerLanguage("tsx", typescript);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("py", python);
SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("csharp", csharp);
SyntaxHighlighter.registerLanguage("cs", csharp);
SyntaxHighlighter.registerLanguage("cpp", cpp);
SyntaxHighlighter.registerLanguage("c", c);
SyntaxHighlighter.registerLanguage("go", go);
SyntaxHighlighter.registerLanguage("rust", rust);
SyntaxHighlighter.registerLanguage("rs", rust);
SyntaxHighlighter.registerLanguage("php", php);
SyntaxHighlighter.registerLanguage("ruby", ruby);
SyntaxHighlighter.registerLanguage("rb", ruby);
SyntaxHighlighter.registerLanguage("swift", swift);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("shell", bash);
SyntaxHighlighter.registerLanguage("sh", bash);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("yaml", yaml);
SyntaxHighlighter.registerLanguage("yml", yaml);
SyntaxHighlighter.registerLanguage("sql", sql);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("html", markup);
SyntaxHighlighter.registerLanguage("xml", markup);
SyntaxHighlighter.registerLanguage("markup", markup);
const CodeBlock = /* @__PURE__ */ __name(({ language, value, children }) => {
  const [copied, setCopied] = reactExports.useState(false);
  const [isExpanded, setIsExpanded] = reactExports.useState(false);
  const [isRunning, setIsRunning] = reactExports.useState(false);
  const [output, setOutput] = reactExports.useState(null);
  const rawContent = value || children || "";
  const content = String(rawContent).replace(/\n$/, "");
  const lineCount = content.split("\n").length;
  const shouldCollapse = lineCount > 15;
  const handleCopy = /* @__PURE__ */ __name(() => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  }, "handleCopy");
  const handleRun = /* @__PURE__ */ __name(async () => {
    setIsRunning(true);
    setOutput(null);
    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch(`${API_BASE_URL}/tools/run-code/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ language, code: content })
      });
      const data = await res.json();
      if (data.run) {
        setOutput(data.run.output || "Çıktı boş.");
      } else {
        setOutput("Hata: " + (data.message || "Bilinmeyen hata"));
      }
    } catch (e) {
      setOutput("Bağlantı hatası.");
    }
    setIsRunning(false);
  }, "handleRun");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.language, children: language || "text" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleRun, style: styles.runButton, disabled: isRunning, children: [
          isRunning ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaSpinner, { className: "spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlay, { size: 10 }),
          isRunning ? " Çalışıyor..." : " Run"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleCopy, style: styles.copyButton, children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaCopy, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      ...styles.codeWrapper,
      maxHeight: !isExpanded && shouldCollapse ? "300px" : "none"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SyntaxHighlighterWithStyle,
      {
        language: language ? language.toLowerCase() : "text",
        content
      }
    ) }),
    output && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.outputContainer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.outputHeader, children: "ÇIKTI (TERMINAL):" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { style: styles.outputBody, children: output })
    ] }),
    shouldCollapse && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setIsExpanded(!isExpanded), "onClick"), style: styles.expandButton, children: isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaChevronUp, {}),
      " Daralt"
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaChevronDown, {}),
      " Genişlet"
    ] }) })
  ] });
}, "CodeBlock");
const styles = {
  container: { marginTop: "8px", marginBottom: "8px", borderRadius: "8px", border: "1px solid #202225", overflow: "hidden", backgroundColor: "#1e1f22" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 10px", backgroundColor: "#202225", color: "#b9bbbe", fontSize: "0.8em", fontWeight: "bold", fontFamily: "monospace" },
  language: { textTransform: "uppercase" },
  copyButton: { background: "none", border: "none", color: "#b9bbbe", cursor: "pointer" },
  // Yeni Run Butonu Stili
  runButton: {
    backgroundColor: "#23a559",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "2px 10px",
    fontSize: "0.9em",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px"
  },
  codeWrapper: { overflow: "hidden", transition: "max-height 0.3s" },
  expandButton: { width: "100%", padding: "8px", backgroundColor: "#2f3136", border: "none", borderTop: "1px solid #202225", color: "#dbdee1", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" },
  // Output Stilleri
  outputContainer: { borderTop: "1px solid #40444b", backgroundColor: "#000" },
  outputHeader: { padding: "5px 10px", fontSize: "0.75em", color: "#99aab5", backgroundColor: "#111" },
  outputBody: { padding: "10px", color: "#0f0", fontFamily: "monospace", margin: 0, whiteSpace: "pre-wrap", fontSize: "0.9em" }
};
const SyntaxHighlighterWithStyle = reactExports.memo(({ language, content }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SyntaxHighlighter,
    {
      language: language || "text",
      style: vscDarkPlus,
      customStyle: { margin: 0, padding: "15px", fontSize: "0.9em" },
      wrapLongLines: true,
      children: content
    }
  );
});
SyntaxHighlighterWithStyle.displayName = "SyntaxHighlighterWithStyle";
const CodeBlock_default = reactExports.memo(CodeBlock);
export {
  CodeBlock_default as default
};
