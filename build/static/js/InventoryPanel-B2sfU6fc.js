var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { bI as FaCube, a as FaTimes, as as FaTshirt, ah as FaCrown, bC as FaGift } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const InventoryPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, username }) => {
  const [inventory, setInventory] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [filter, setFilter] = reactExports.useState("all");
  const itemTypes = [
    { value: "all", label: "All Items", icon: FaCube },
    { value: "cosmetic", label: "Cosmetics", icon: FaTshirt },
    { value: "badge", label: "Badges", icon: FaCrown },
    { value: "gift", label: "Gifts", icon: FaGift }
  ];
  reactExports.useEffect(() => {
    fetchInventory();
  }, [filter]);
  const fetchInventory = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        username: username || "",
        type: filter !== "all" ? filter : ""
      });
      const response = await fetchWithAuth(`${apiBaseUrl}/inventory/?${params}`);
      const data = await response.json();
      setInventory(data.items || []);
    } catch (error) {
      toast.error("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  }, "fetchInventory");
  const equipItem = /* @__PURE__ */ __name(async (itemId) => {
    try {
      await fetchWithAuth(`${apiBaseUrl}/inventory/${itemId}/equip/`, {
        method: "POST"
      });
      toast.success("Item equipped");
      fetchInventory();
    } catch (error) {
      toast.error("Failed to equip item");
    }
  }, "equipItem");
  const unequipItem = /* @__PURE__ */ __name(async (itemId) => {
    try {
      await fetchWithAuth(`${apiBaseUrl}/inventory/${itemId}/unequip/`, {
        method: "POST"
      });
      toast.success("Item unequipped");
      fetchInventory();
    } catch (error) {
      toast.error("Failed to unequip item");
    }
  }, "unequipItem");
  const useItem = /* @__PURE__ */ __name(async (itemId) => {
    try {
      await fetchWithAuth(`${apiBaseUrl}/inventory/${itemId}/use/`, {
        method: "POST"
      });
      toast.success("Item used");
      fetchInventory();
    } catch (error) {
      toast.error("Failed to use item");
    }
  }, "useItem");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCube, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Inventory" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.filterBar, children: itemTypes.map((type) => {
      const Icon = type.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => setFilter(type.value), "onClick"),
          style: filter === type.value ? styles.activeFilter : styles.filterButton,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { style: { marginRight: "6px" } }),
            type.label
          ]
        },
        type.value
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading inventory..." }) : inventory.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No items in inventory" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.itemsGrid, children: inventory.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.itemCard, children: [
      item.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.itemImage, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image_url, alt: item.name, style: { width: "100%", height: "100%", objectFit: "cover" } }) }),
      item.equipped && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.equippedBadge, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCrown, { style: { fontSize: "12px" } }),
        " Equipped"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.itemInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.itemName, children: item.name }),
        item.rarity && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.itemRarity, color: getRarityColor(item.rarity) }, children: item.rarity.toUpperCase() }),
        item.description && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.itemDescription, children: item.description }),
        item.quantity > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.itemQuantity, children: [
          "Quantity: ",
          item.quantity
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.itemActions, children: [
          item.type === "cosmetic" && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: item.equipped ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => unequipItem(item.id), "onClick"), style: styles.unequipButton, children: "Unequip" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => equipItem(item.id), "onClick"), style: styles.equipButton, children: "Equip" }) }),
          item.usable && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => useItem(item.id), "onClick"), style: styles.useButton, children: "Use" })
        ] })
      ] })
    ] }, idx)) }) })
  ] }) });
}, "InventoryPanel");
const getRarityColor = /* @__PURE__ */ __name((rarity) => {
  const colors = {
    common: "#99aab5",
    uncommon: "#43b581",
    rare: "#5865f2",
    epic: "#a020f0",
    legendary: "#faa61a"
  };
  return colors[rarity?.toLowerCase()] || "#99aab5";
}, "getRarityColor");
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
    maxWidth: "1100px",
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
  filterBar: {
    display: "flex",
    gap: "8px",
    padding: "16px 20px",
    borderBottom: "1px solid #2c2f33",
    overflowX: "auto"
  },
  filterButton: {
    padding: "8px 16px",
    backgroundColor: "#2c2f33",
    border: "none",
    borderRadius: "4px",
    color: "#dcddde",
    cursor: "pointer",
    fontSize: "13px",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center"
  },
  activeFilter: {
    padding: "8px 16px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "13px",
    whiteSpace: "nowrap",
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
  itemsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "16px"
  },
  itemCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    overflow: "hidden",
    position: "relative"
  },
  itemImage: {
    width: "100%",
    height: "150px",
    backgroundColor: "#1e1e1e"
  },
  equippedBadge: {
    position: "absolute",
    top: "8px",
    right: "8px",
    backgroundColor: "#faa61a",
    color: "#ffffff",
    padding: "4px 10px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "4px"
  },
  itemInfo: {
    padding: "12px"
  },
  itemName: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "6px"
  },
  itemRarity: {
    fontSize: "11px",
    fontWeight: "700",
    marginBottom: "6px",
    textTransform: "uppercase"
  },
  itemDescription: {
    fontSize: "12px",
    color: "#dcddde",
    marginBottom: "8px",
    lineHeight: "1.4"
  },
  itemQuantity: {
    fontSize: "12px",
    color: "#99aab5",
    marginBottom: "8px"
  },
  itemActions: {
    display: "flex",
    gap: "8px"
  },
  equipButton: {
    flex: 1,
    padding: "8px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600"
  },
  unequipButton: {
    flex: 1,
    padding: "8px",
    backgroundColor: "#99aab5",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600"
  },
  useButton: {
    flex: 1,
    padding: "8px",
    backgroundColor: "#43b581",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600"
  }
};
export {
  InventoryPanel as default
};
