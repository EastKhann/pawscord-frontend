var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { aB as FaHistory, a as FaTimes, a5 as FaDownload } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const FieldChangeTrackingPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, entityType, entityId }) => {
  const [changes, setChanges] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [filter, setFilter] = reactExports.useState("all");
  reactExports.useEffect(() => {
    fetchChanges();
  }, []);
  const fetchChanges = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(
        `${apiBaseUrl}/audit/field-changes/?entity_type=${entityType}&entity_id=${entityId}`
      );
      const data = await response.json();
      setChanges(data.changes || []);
    } catch (error) {
      toast.error("Failed to load change history");
    } finally {
      setLoading(false);
    }
  }, "fetchChanges");
  const exportChanges = /* @__PURE__ */ __name(() => {
    const csv = [
      ["Date", "Field", "Old Value", "New Value", "Changed By"],
      ...filteredChanges.map((c) => [
        new Date(c.changed_at).toLocaleString(),
        c.field_name,
        c.old_value || "",
        c.new_value || "",
        c.changed_by_username
      ])
    ].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `field_changes_${entityType}_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    toast.success("Changes exported");
  }, "exportChanges");
  const fieldNames = [...new Set(changes.map((c) => c.field_name))];
  const filteredChanges = filter === "all" ? changes : changes.filter((c) => c.field_name === filter);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Field Change History" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.toolbar, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: filter, onChange: /* @__PURE__ */ __name((e) => setFilter(e.target.value), "onChange"), style: styles.filterSelect, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "all", children: [
          "All Fields (",
          changes.length,
          ")"
        ] }),
        fieldNames.map((field) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: field, children: [
          field,
          " (",
          changes.filter((c) => c.field_name === field).length,
          ")"
        ] }, field))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: exportChanges, style: styles.exportButton, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, { style: { marginRight: "6px" } }),
        "Export"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading changes..." }) : filteredChanges.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No changes recorded" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.changesList, children: filteredChanges.map((change, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.changeCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.changeField, children: change.field_name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.changeValues, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.oldValue, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.valueLabel, children: "Old:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.value, children: change.old_value || /* @__PURE__ */ jsxRuntimeExports.jsx("em", { style: { color: "#99aab5" }, children: "empty" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.arrow, children: "→" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.newValue, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.valueLabel, children: "New:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.value, children: change.new_value || /* @__PURE__ */ jsxRuntimeExports.jsx("em", { style: { color: "#99aab5" }, children: "empty" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.changeMeta, children: [
        "Changed by ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.username, children: change.changed_by_username }),
        " on ",
        new Date(change.changed_at).toLocaleString()
      ] })
    ] }, idx)) }) })
  ] }) });
}, "FieldChangeTrackingPanel");
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
  toolbar: {
    display: "flex",
    gap: "12px",
    padding: "15px 20px",
    borderBottom: "1px solid #2c2f33"
  },
  filterSelect: {
    flex: 1,
    padding: "8px 12px",
    backgroundColor: "#2c2f33",
    border: "1px solid #2c2f33",
    borderRadius: "4px",
    color: "#ffffff",
    fontSize: "14px"
  },
  exportButton: {
    padding: "8px 16px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "13px",
    display: "flex",
    alignItems: "center"
  },
  content: {
    padding: "20px",
    overflowY: "auto",
    flex: 1
  },
  loading: {
    textAlign: "center",
    color: "#99aab5",
    padding: "40px"
  },
  empty: {
    textAlign: "center",
    color: "#99aab5",
    padding: "40px"
  },
  changesList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  changeCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "16px"
  },
  changeField: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#5865f2",
    marginBottom: "12px"
  },
  changeValues: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    marginBottom: "12px",
    padding: "12px",
    backgroundColor: "#1e1e1e",
    borderRadius: "6px"
  },
  oldValue: {
    flex: 1
  },
  newValue: {
    flex: 1
  },
  arrow: {
    fontSize: "20px",
    color: "#5865f2"
  },
  valueLabel: {
    fontSize: "12px",
    color: "#99aab5",
    marginBottom: "4px"
  },
  value: {
    fontSize: "14px",
    color: "#ffffff",
    wordBreak: "break-word"
  },
  changeMeta: {
    fontSize: "12px",
    color: "#99aab5"
  },
  username: {
    color: "#5865f2",
    fontWeight: "500"
  }
};
export {
  FieldChangeTrackingPanel as default
};
