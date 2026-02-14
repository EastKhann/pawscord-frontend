var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { ci as FaNewspaper, bv as FaCalendar, cj as FaWrench, U as FaBug, Q as FaStar } from "./icons-vendor-2VDeY8fW.js";
function ChangelogPanel({ apiBaseUrl, fetchWithAuth }) {
  const [changes, setChanges] = reactExports.useState([]);
  const [selectedModel, setSelectedModel] = reactExports.useState("all");
  const [selectedType, setSelectedType] = reactExports.useState("all");
  const [models, setModels] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const typeIcons = {
    new: /* @__PURE__ */ jsxRuntimeExports.jsx(FaStar, { className: "type-icon new" }),
    fix: /* @__PURE__ */ jsxRuntimeExports.jsx(FaBug, { className: "type-icon fix" }),
    improvement: /* @__PURE__ */ jsxRuntimeExports.jsx(FaWrench, { className: "type-icon improvement" })
  };
  reactExports.useEffect(() => {
    loadChanges();
    loadModels();
  }, [selectedModel]);
  const loadChanges = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const url = selectedModel === "all" ? `${apiBaseUrl}/changelog/` : `${apiBaseUrl}/changelog/${selectedModel}/`;
      const response = await fetchWithAuth(url);
      if (response.ok) {
        const data = await response.json();
        setChanges(data.changes || []);
      }
    } catch (err) {
      console.error("Error loading changelog:", err);
    } finally {
      setLoading(false);
    }
  }, "loadChanges");
  const loadModels = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/changelog/models/`);
      if (response.ok) {
        const data = await response.json();
        setModels(data.models || []);
      }
    } catch (err) {
      console.error("Error loading models:", err);
    }
  }, "loadModels");
  const filteredChanges = selectedType === "all" ? changes : changes.filter((c) => c.change_type === selectedType);
  const groupedByDate = filteredChanges.reduce((groups, change) => {
    const date = new Date(change.created_at).toLocaleDateString();
    if (!groups[date]) groups[date] = [];
    groups[date].push(change);
    return groups;
  }, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "changelog-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "changelog-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaNewspaper, {}),
      " Changelog"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "changelog-filters", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Model:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: selectedModel,
            onChange: /* @__PURE__ */ __name((e) => setSelectedModel(e.target.value), "onChange"),
            className: "filter-select",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Models" }),
              models.map((model) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: model, children: model }, model))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Type:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: selectedType,
            onChange: /* @__PURE__ */ __name((e) => setSelectedType(e.target.value), "onChange"),
            className: "filter-select",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Types" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "new", children: "New Features" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "fix", children: "Bug Fixes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "improvement", children: "Improvements" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "changelog-timeline", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading", children: "Loading changelog..." }) : Object.keys(groupedByDate).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-changelog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaNewspaper, { className: "empty-icon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No changelog entries found" })
    ] }) : Object.entries(groupedByDate).map(([date, dateChanges]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "date-group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "date-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCalendar, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: date })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "changes-list", children: dateChanges.map((change, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `change-item ${change.change_type}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "change-icon", children: typeIcons[change.change_type] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "change-content", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "change-header", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `change-badge ${change.change_type}`, children: change.change_type.toUpperCase() }),
            change.model_name && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "change-model", children: change.model_name }),
            change.version && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "change-version", children: [
              "v",
              change.version
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "change-description", children: change.description }),
          change.details && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "change-details", children: change.details })
        ] })
      ] }, idx)) })
    ] }, date)) })
  ] });
}
__name(ChangelogPanel, "ChangelogPanel");
export {
  ChangelogPanel as default
};
