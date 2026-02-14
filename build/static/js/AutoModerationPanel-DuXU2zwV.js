var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { B as FaRobot, an as FaPlus, a1 as FaShieldAlt, bo as FaToggleOn, bp as FaToggleOff, at as FaEdit, g as FaTrash, d as FaExclamationTriangle, ay as FaBan } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const AutoModerationPanel = /* @__PURE__ */ __name(({ serverId, onClose }) => {
  const [rules, setRules] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [showCreateRule, setShowCreateRule] = reactExports.useState(false);
  const [editingRule, setEditingRule] = reactExports.useState(null);
  const [newRule, setNewRule] = reactExports.useState({
    name: "",
    type: "spam",
    action: "warn",
    enabled: true,
    keywords: [],
    threshold: 5,
    duration: 60
  });
  reactExports.useEffect(() => {
    fetchRules();
  }, [serverId]);
  const fetchRules = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/moderation/auto-mod/rules/${serverId}/`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setRules(data.rules || []);
      }
    } catch (error) {
      toast.error("❌ Kurallar yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, "fetchRules");
  const createRule = /* @__PURE__ */ __name(async () => {
    if (!newRule.name.trim()) {
      toast.error("❌ Kural adı girin");
      return;
    }
    try {
      const response = await fetch(`/api/moderation/auto-mod/rules/${serverId}/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newRule)
      });
      if (response.ok) {
        const data = await response.json();
        setRules([...rules, data.rule]);
        setShowCreateRule(false);
        resetNewRule();
        toast.success("✅ Kural oluşturuldu");
      } else {
        toast.error("❌ Kural oluşturulamadı");
      }
    } catch (error) {
      toast.error("❌ Bağlantı hatası");
    }
  }, "createRule");
  const updateRule = /* @__PURE__ */ __name(async (ruleId, updates) => {
    try {
      const response = await fetch(`/api/moderation/auto-mod/rules/${serverId}/${ruleId}/`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updates)
      });
      if (response.ok) {
        const data = await response.json();
        setRules(rules.map((r) => r.id === ruleId ? data.rule : r));
        setEditingRule(null);
        toast.success("✅ Kural güncellendi");
      }
    } catch (error) {
      toast.error("❌ Güncelleme başarısız");
    }
  }, "updateRule");
  const deleteRule = /* @__PURE__ */ __name(async (ruleId) => {
    if (!confirm("Bu kuralı silmek istediğinizden emin misiniz?")) return;
    try {
      const response = await fetch(`/api/moderation/auto-mod/rules/${serverId}/${ruleId}/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      if (response.ok) {
        setRules(rules.filter((r) => r.id !== ruleId));
        toast.success("✅ Kural silindi");
      }
    } catch (error) {
      toast.error("❌ Silme başarısız");
    }
  }, "deleteRule");
  const toggleRule = /* @__PURE__ */ __name(async (ruleId, enabled) => {
    await updateRule(ruleId, { enabled });
  }, "toggleRule");
  const resetNewRule = /* @__PURE__ */ __name(() => {
    setNewRule({
      name: "",
      type: "spam",
      action: "warn",
      enabled: true,
      keywords: [],
      threshold: 5,
      duration: 60
    });
  }, "resetNewRule");
  const addKeyword = /* @__PURE__ */ __name((keyword) => {
    if (keyword.trim() && !newRule.keywords.includes(keyword.trim())) {
      setNewRule({
        ...newRule,
        keywords: [...newRule.keywords, keyword.trim()]
      });
    }
  }, "addKeyword");
  const removeKeyword = /* @__PURE__ */ __name((keyword) => {
    setNewRule({
      ...newRule,
      keywords: newRule.keywords.filter((k) => k !== keyword)
    });
  }, "removeKeyword");
  const getRuleIcon = /* @__PURE__ */ __name((type) => {
    switch (type) {
      case "spam":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FaBan, {});
      case "profanity":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, {});
      case "caps":
        return "🔤";
      case "links":
        return "🔗";
      case "mentions":
        return "@";
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, {});
    }
  }, "getRuleIcon");
  const getActionColor = /* @__PURE__ */ __name((action) => {
    switch (action) {
      case "warn":
        return "#faa61a";
      case "mute":
        return "#ff9500";
      case "kick":
        return "#ff3b30";
      case "ban":
        return "#ff0000";
      default:
        return "#8b5cf6";
    }
  }, "getActionColor");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "auto-mod-panel-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auto-mod-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, { className: "header-icon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Otomatik Moderasyon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-actions", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn-create", onClick: /* @__PURE__ */ __name(() => setShowCreateRule(true), "onClick"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
      " Yeni Kural"
    ] }) }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Yükleniyor..." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rules-list", children: rules.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, { size: 48 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Kural Yok" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Otomatik moderasyon kuralları oluşturun" })
    ] }) : rules.map((rule) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rule-card ${!rule.enabled ? "disabled" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rule-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rule-icon", children: getRuleIcon(rule.type) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rule-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: rule.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rule-type", children: rule.type })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rule-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "action-btn toggle",
              onClick: /* @__PURE__ */ __name(() => toggleRule(rule.id, !rule.enabled), "onClick"),
              title: rule.enabled ? "Devre Dışı Bırak" : "Etkinleştir",
              children: rule.enabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaToggleOn, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaToggleOff, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "action-btn edit",
              onClick: /* @__PURE__ */ __name(() => setEditingRule(rule), "onClick"),
              title: "Düzenle",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaEdit, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "action-btn delete",
              onClick: /* @__PURE__ */ __name(() => deleteRule(rule.id), "onClick"),
              title: "Sil",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {})
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rule-details", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Aksiyon:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "value action-badge",
              style: { backgroundColor: getActionColor(rule.action) },
              children: rule.action
            }
          )
        ] }),
        rule.keywords && rule.keywords.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Anahtar Kelimeler:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "keywords", children: rule.keywords.map((kw, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "keyword", children: kw }, i)) })
        ] }),
        rule.threshold && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Eşik:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "value", children: rule.threshold })
        ] })
      ] })
    ] }, rule.id)) }),
    showCreateRule && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rule-editor-modal", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rule-editor", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Yeni Kural Oluştur" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Kural Adı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: newRule.name,
            onChange: /* @__PURE__ */ __name((e) => setNewRule({ ...newRule, name: e.target.value }), "onChange"),
            placeholder: "Örn: Spam Engelleme"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Kural Tipi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: newRule.type,
              onChange: /* @__PURE__ */ __name((e) => setNewRule({ ...newRule, type: e.target.value }), "onChange"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "spam", children: "Spam" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "profanity", children: "Küfür" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "caps", children: "Büyük Harf" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "links", children: "Link" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "mentions", children: "Mention" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Aksiyon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: newRule.action,
              onChange: /* @__PURE__ */ __name((e) => setNewRule({ ...newRule, action: e.target.value }), "onChange"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "warn", children: "Uyar" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "mute", children: "Sustur" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "kick", children: "At" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ban", children: "Yasakla" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Anahtar Kelimeler (Enter ile ekle)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Kelime girin ve Enter'a basın",
            onKeyPress: /* @__PURE__ */ __name((e) => {
              if (e.key === "Enter") {
                addKeyword(e.target.value);
                e.target.value = "";
              }
            }, "onKeyPress")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "keywords-list", children: newRule.keywords.map((kw, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "keyword-chip", children: [
          kw,
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => removeKeyword(kw), "onClick"), children: "×" })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Eşik" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              value: newRule.threshold,
              onChange: /* @__PURE__ */ __name((e) => setNewRule({ ...newRule, threshold: parseInt(e.target.value) }), "onChange"),
              min: "1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Süre (saniye)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              value: newRule.duration,
              onChange: /* @__PURE__ */ __name((e) => setNewRule({ ...newRule, duration: parseInt(e.target.value) }), "onChange"),
              min: "1"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-cancel", onClick: /* @__PURE__ */ __name(() => setShowCreateRule(false), "onClick"), children: "İptal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-save", onClick: createRule, children: "Oluştur" })
      ] })
    ] }) })
  ] }) });
}, "AutoModerationPanel");
export {
  AutoModerationPanel as default
};
