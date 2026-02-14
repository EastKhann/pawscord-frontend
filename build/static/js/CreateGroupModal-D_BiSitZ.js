var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a as FaTimes, a9 as FaCheck, ad as FaUserPlus } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const CreateGroupModal = /* @__PURE__ */ __name(({ onClose, friendsList, fetchWithAuth, apiBaseUrl, onGroupCreated }) => {
  const [selectedFriends, setSelectedFriends] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const handleEsc = /* @__PURE__ */ __name((e) => {
      if (e.key === "Escape") onClose();
    }, "handleEsc");
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);
  const toggleFriend = /* @__PURE__ */ __name((username) => {
    if (selectedFriends.includes(username)) {
      setSelectedFriends((prev) => prev.filter((u) => u !== username));
    } else {
      setSelectedFriends((prev) => [...prev, username]);
    }
  }, "toggleFriend");
  const handleCreate = /* @__PURE__ */ __name(async () => {
    if (selectedFriends.length < 2) {
      toast.error("❌ En az 2 kişi seçmelisin");
      return;
    }
    setLoading(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/conversations/create_group/`, {
        method: "POST",
        body: JSON.stringify({ usernames: selectedFriends })
      });
      if (res.ok) {
        const data = await res.json();
        toast.success("✅ Grup oluşturuldu!");
        onGroupCreated(data);
        onClose();
      } else {
        toast.error("❌ Grup oluşturulamadı");
      }
    } catch (e) {
      console.error(e);
      toast.error("❌ Hata oluştu: " + e.message);
    } finally {
      setLoading(false);
    }
  }, "handleCreate");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Grup Oluştur" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.body, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "#b9bbbe", marginBottom: 15 }, children: [
        "Gruba eklemek istediğin arkadaşlarını seç (",
        selectedFriends.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.friendList, children: [
        friendsList.map((friendName) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            onClick: /* @__PURE__ */ __name(() => toggleFriend(friendName), "onClick"),
            style: {
              ...styles.friendItem,
              backgroundColor: selectedFriends.includes(friendName) ? "rgba(88, 101, 242, 0.3)" : "#2f3136",
              borderColor: selectedFriends.includes(friendName) ? "#5865f2" : "transparent"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "white" }, children: friendName }),
              selectedFriends.includes(friendName) ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { color: "#5865f2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserPlus, { color: "#b9bbbe" })
            ]
          },
          friendName
        )),
        friendsList.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#72767d" }, children: "Listenizde arkadaş yok." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleCreate,
          style: styles.createBtn,
          disabled: loading || selectedFriends.length < 2,
          children: loading ? "Oluşturuluyor..." : "Grup DM Oluştur"
        }
      )
    ] })
  ] }) });
}, "CreateGroupModal");
const styles = {
  overlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.8)", zIndex: 2e3, display: "flex", justifyContent: "center", alignItems: "center" },
  modal: { backgroundColor: "#313338", width: "400px", borderRadius: "8px", overflow: "hidden" },
  header: { padding: "15px 20px", borderBottom: "1px solid #1e1f22", display: "flex", justifyContent: "space-between", color: "white", alignItems: "center" },
  closeBtn: { background: "none", border: "none", color: "#b9bbbe", cursor: "pointer", fontSize: "1.2em" },
  body: { padding: "20px" },
  friendList: { maxHeight: "300px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" },
  friendItem: { padding: "10px", borderRadius: "4px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", border: "1px solid transparent" },
  createBtn: { width: "100%", padding: "10px", backgroundColor: "#5865f2", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", opacity: 0.9 }
};
export {
  CreateGroupModal as default
};
