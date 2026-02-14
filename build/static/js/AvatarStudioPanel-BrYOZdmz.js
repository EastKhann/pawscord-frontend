var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { C as FaUser, aq as FaCoins, a as FaTimes, ap as FaPalette, br as FaBookmark, ca as FaRandom, aY as FaSave } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const CATEGORIES = [
  { id: "face_shapes", name: "Face", icon: "👤" },
  { id: "skin_tones", name: "Skin", icon: "🎨" },
  { id: "eyes", name: "Eyes", icon: "👁️" },
  { id: "eye_colors", name: "Eye Color", icon: "🔵" },
  { id: "hairstyles", name: "Hair", icon: "💇" },
  { id: "hair_colors", name: "Hair Color", icon: "🌈" },
  { id: "mouths", name: "Mouth", icon: "👄" },
  { id: "accessories", name: "Accessories", icon: "👓" },
  { id: "backgrounds", name: "Background", icon: "🖼️" },
  { id: "expressions", name: "Expression", icon: "😊" }
];
const CATEGORY_KEY_MAP = {
  face_shapes: "face_shape",
  skin_tones: "skin_tone",
  hairstyles: "hairstyle",
  mouths: "mouth",
  accessories: "accessory",
  backgrounds: "background",
  expressions: "expression",
  eyes: "eyes",
  eye_colors: "eye_color",
  hair_colors: "hair_color"
};
const styles = {
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1e4 },
  modal: { backgroundColor: "#2f3136", borderRadius: "12px", width: "900px", maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column" },
  header: { display: "flex", alignItems: "center", padding: "20px", borderBottom: "1px solid #40444b" },
  headerLeft: { display: "flex", alignItems: "center", flex: 1 },
  title: { margin: 0, color: "#fff", fontSize: "20px" },
  coinsDisplay: { display: "flex", alignItems: "center", gap: "6px", color: "#fff", marginRight: "20px", background: "#40444b", padding: "6px 12px", borderRadius: "20px" },
  closeButton: { background: "none", border: "none", color: "#b9bbbe", cursor: "pointer", fontSize: "20px" },
  tabs: { display: "flex", padding: "10px 20px", gap: "10px", borderBottom: "1px solid #40444b" },
  tab: { background: "#40444b", border: "none", color: "#b9bbbe", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" },
  activeTab: { background: "#5865f2", border: "none", color: "#fff", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" },
  mainContent: { display: "flex", padding: "20px", gap: "20px", overflowY: "auto", flex: 1 },
  previewSection: { width: "250px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" },
  previewActions: { display: "flex", flexDirection: "column", gap: "10px", width: "100%" },
  actionBtn: { background: "#40444b", border: "none", color: "#fff", padding: "10px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" },
  saveBtn: { background: "#57f287", border: "none", color: "#000", padding: "12px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontWeight: "bold" },
  customizeSection: { flex: 1 },
  categoryTabs: { display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "15px" },
  catBtn: { background: "#40444b", border: "none", color: "#b9bbbe", padding: "8px 12px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontSize: "12px" },
  catActive: { background: "#5865f2", border: "none", color: "#fff", padding: "8px 12px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontSize: "12px" },
  catName: { display: "none" },
  itemsGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" },
  itemCard: { background: "#40444b", borderRadius: "8px", padding: "12px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", cursor: "pointer", position: "relative" },
  itemSelected: { border: "2px solid #5865f2", background: "#36393f" },
  itemLocked: { opacity: 0.7, cursor: "default" },
  colorSwatch: { width: "40px", height: "40px", borderRadius: "50%", border: "2px solid #fff" },
  itemPreview: { width: "40px", height: "40px", borderRadius: "50%", background: "#5865f2", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold" },
  itemName: { color: "#dcddde", fontSize: "11px", textAlign: "center" },
  buyBtn: { position: "absolute", bottom: "8px", right: "8px", background: "#faa61a", border: "none", color: "#000", padding: "4px 8px", borderRadius: "4px", cursor: "pointer", fontSize: "10px", display: "flex", alignItems: "center", gap: "4px" },
  presetsGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px", width: "100%" },
  presetCard: { background: "#40444b", borderRadius: "10px", padding: "15px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" },
  presetName: { color: "#fff", fontSize: "14px" },
  loadBtn: { background: "#5865f2", border: "none", color: "#fff", padding: "6px 16px", borderRadius: "4px", cursor: "pointer" },
  emptyText: { color: "#72767d", textAlign: "center", gridColumn: "1 / -1", padding: "40px" }
};
const DEFAULT_AVATAR = {
  face_shape: "round",
  skin_tone: "medium",
  eyes: "normal",
  eye_color: "brown",
  hairstyle: "short",
  hair_color: "black",
  mouth: "smile",
  accessory: "none",
  background: "solid_gray",
  expression: "default"
};
const useAvatarStudio = /* @__PURE__ */ __name((fetchWithAuth, apiBaseUrl) => {
  const [parts, setParts] = reactExports.useState({});
  const [avatar, setAvatar] = reactExports.useState({});
  const [ownedItems, setOwnedItems] = reactExports.useState([]);
  const [userCoins, setUserCoins] = reactExports.useState(0);
  const [presets, setPresets] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [activeCategory, setActiveCategory] = reactExports.useState("face_shapes");
  const [view, setView] = reactExports.useState("customize");
  reactExports.useEffect(() => {
    fetchParts();
    fetchMyAvatar();
    fetchPresets();
  }, []);
  const fetchParts = /* @__PURE__ */ __name(async () => {
    try {
      const r = await fetchWithAuth(`${apiBaseUrl}/avatar-studio/parts/`);
      const d = await r.json();
      setParts(d.parts || {});
      setUserCoins(d.user_coins || 0);
    } catch (e) {
      console.error("Failed to fetch parts:", e);
    }
  }, "fetchParts");
  const fetchMyAvatar = /* @__PURE__ */ __name(async () => {
    try {
      const r = await fetchWithAuth(`${apiBaseUrl}/avatar-studio/my-avatar/`);
      const d = await r.json();
      setAvatar(d.avatar || DEFAULT_AVATAR);
      setOwnedItems(d.owned_items || []);
    } catch (e) {
      console.error("Failed to fetch avatar:", e);
    }
  }, "fetchMyAvatar");
  const fetchPresets = /* @__PURE__ */ __name(async () => {
    try {
      const r = await fetchWithAuth(`${apiBaseUrl}/avatar-studio/presets/`);
      const d = await r.json();
      setPresets(d.presets || []);
    } catch (e) {
      console.error("Failed to fetch presets:", e);
    }
  }, "fetchPresets");
  const selectPart = /* @__PURE__ */ __name((category, itemId) => {
    const key = CATEGORY_KEY_MAP[category] || category;
    setAvatar((prev) => ({ ...prev, [key]: itemId }));
  }, "selectPart");
  const purchaseItem = /* @__PURE__ */ __name(async (category, itemId) => {
    setLoading(true);
    try {
      const r = await fetchWithAuth(`${apiBaseUrl}/avatar-studio/purchase/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, item_id: itemId })
      });
      const d = await r.json();
      if (d.message) {
        toast.success(d.message);
        setUserCoins(d.new_balance);
        setOwnedItems(d.owned_items);
      } else toast.error(d.error || "Purchase failed");
    } catch (e) {
      toast.error("Purchase failed");
    } finally {
      setLoading(false);
    }
  }, "purchaseItem");
  const saveAvatar = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const r = await fetchWithAuth(`${apiBaseUrl}/avatar-studio/save/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config: avatar })
      });
      const d = await r.json();
      if (d.message) toast.success("Avatar saved!");
      else toast.error(d.error || "Save failed");
    } catch (e) {
      toast.error("Save failed");
    } finally {
      setLoading(false);
    }
  }, "saveAvatar");
  const randomizeAvatar = /* @__PURE__ */ __name(async () => {
    try {
      const r = await fetchWithAuth(`${apiBaseUrl}/avatar-studio/randomize/`, { method: "POST" });
      const d = await r.json();
      if (d.avatar) {
        setAvatar(d.avatar);
        toast.success("Randomized!");
      }
    } catch (e) {
      toast.error("Failed to randomize");
    }
  }, "randomizeAvatar");
  const savePreset = /* @__PURE__ */ __name(async () => {
    const name = prompt("Enter preset name:");
    if (!name) return;
    try {
      const r = await fetchWithAuth(`${apiBaseUrl}/avatar-studio/presets/save/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, config: avatar })
      });
      const d = await r.json();
      if (d.preset_id) {
        toast.success("Preset saved!");
        fetchPresets();
      }
    } catch (e) {
      toast.error("Failed to save preset");
    }
  }, "savePreset");
  const loadPreset = /* @__PURE__ */ __name((preset) => {
    setAvatar(preset.config);
    setView("customize");
  }, "loadPreset");
  return {
    parts,
    avatar,
    ownedItems,
    userCoins,
    presets,
    loading,
    activeCategory,
    setActiveCategory,
    view,
    setView,
    selectPart,
    purchaseItem,
    saveAvatar,
    randomizeAvatar,
    savePreset,
    loadPreset
  };
}, "useAvatarStudio");
const AvatarPreview = /* @__PURE__ */ __name(({ avatar, parts, mini = false }) => {
  const size = mini ? 80 : 200;
  const bgColor = parts.backgrounds?.find((b) => b.id === avatar.background)?.color || "#36393f";
  const skinColor = parts.skin_tones?.find((s) => s.id === avatar.skin_tone)?.color || "#D2B48C";
  const hairColor = parts.hair_colors?.find((h) => h.id === avatar.hair_color)?.color || "#1C1C1C";
  const eyeColor = parts.eye_colors?.find((e) => e.id === avatar.eye_color)?.color || "#8B4513";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { width: size, height: size, borderRadius: "50%", background: bgColor, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", border: "4px solid #40444b" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      width: size * 0.7,
      height: size * 0.8,
      borderRadius: avatar.face_shape === "round" ? "50%" : avatar.face_shape === "oval" ? "50% 50% 45% 45%" : avatar.face_shape === "square" ? "10%" : "50%",
      background: skinColor,
      position: "relative"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", top: -size * 0.1, left: "50%", transform: "translateX(-50%)", width: size * 0.7, height: size * 0.3, background: hairColor, borderRadius: "50% 50% 0 0" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "absolute", top: "35%", left: "50%", transform: "translateX(-50%)", display: "flex", gap: size * 0.15 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: size * 0.1, height: size * 0.1, borderRadius: "50%", background: eyeColor } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: size * 0.1, height: size * 0.1, borderRadius: "50%", background: eyeColor } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", bottom: "20%", left: "50%", transform: "translateX(-50%)", width: size * 0.2, height: size * 0.05, background: avatar.mouth === "smile" ? "#e8a0a0" : "#d4a0a0", borderRadius: avatar.mouth === "smile" ? "0 0 50% 50%" : "4px" } })
    ] }),
    avatar.accessory === "glasses" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", top: "32%", left: "50%", transform: "translateX(-50%)", width: size * 0.5, height: size * 0.12, border: "2px solid #333", borderRadius: "4px", background: "transparent" } }),
    avatar.accessory === "crown" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", fontSize: size * 0.2 }, children: "👑" }),
    avatar.accessory === "cat_ears" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", top: size * 0.05, left: "50%", transform: "translateX(-50%)", fontSize: size * 0.15 }, children: "🐱" })
  ] });
}, "AvatarPreview");
const AvatarStudioPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose }) => {
  const s = useAvatarStudio(fetchWithAuth, apiBaseUrl);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaUser, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Avatar Studio" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.coinsDisplay, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCoins, { style: { color: "#faa61a" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: s.userCoins })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.tabs, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => s.setView("customize"), "onClick"), style: s.view === "customize" ? styles.activeTab : styles.tab, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPalette, {}),
        " Customize"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => s.setView("presets"), "onClick"), style: s.view === "presets" ? styles.activeTab : styles.tab, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaBookmark, {}),
        " Presets"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.mainContent, children: [
      s.view === "customize" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.previewSection, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarPreview, { avatar: s.avatar, parts: s.parts }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.previewActions, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: s.randomizeAvatar, style: styles.actionBtn, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaRandom, {}),
              " Random"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: s.savePreset, style: styles.actionBtn, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaBookmark, {}),
              " Save Preset"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: s.saveAvatar, style: styles.saveBtn, disabled: s.loading, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaSave, {}),
              " ",
              s.loading ? "Saving..." : "Save Avatar"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.customizeSection, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.categoryTabs, children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => s.setActiveCategory(cat.id), "onClick"), style: s.activeCategory === cat.id ? styles.catActive : styles.catBtn, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cat.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.catName, children: cat.name })
          ] }, cat.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.itemsGrid, children: (s.parts[s.activeCategory] || []).map((item) => {
            const isOwned = item.free || s.ownedItems.includes(item.id);
            const isSelected = Object.values(s.avatar).includes(item.id);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.itemCard, ...isSelected ? styles.itemSelected : {}, ...!isOwned ? styles.itemLocked : {} }, onClick: /* @__PURE__ */ __name(() => isOwned && s.selectPart(s.activeCategory, item.id), "onClick"), children: [
              item.color && !["gradient", "galaxy", "rainbow"].includes(item.color) ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.colorSwatch, background: item.color } }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.itemPreview, children: (item.name || item.id).charAt(0).toUpperCase() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.itemName, children: item.name || item.id }),
              !isOwned && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name((e) => {
                e.stopPropagation();
                s.purchaseItem(s.activeCategory, item.id);
              }, "onClick"), style: styles.buyBtn, disabled: s.loading || s.userCoins < (item.coins || 0), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FaCoins, {}),
                " ",
                item.coins
              ] })
            ] }, item.id);
          }) })
        ] })
      ] }),
      s.view === "presets" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.presetsGrid, children: [
        s.presets.map((preset) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.presetCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarPreview, { avatar: preset.config, parts: s.parts, mini: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.presetName, children: preset.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => s.loadPreset(preset), "onClick"), style: styles.loadBtn, children: "Load" })
        ] }, preset.id)),
        s.presets.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.emptyText, children: "No presets saved yet" })
      ] })
    ] })
  ] }) });
}, "AvatarStudioPanel");
export {
  AvatarStudioPanel as default
};
