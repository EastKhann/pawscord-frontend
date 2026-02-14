var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { d as confirmDialog } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
import "./ui-vendor-iPoN0WGz.js";
const StickersPanel = /* @__PURE__ */ __name(({ serverId, onClose }) => {
  const [stickers, setStickers] = reactExports.useState([]);
  const [stickerPacks, setStickerPacks] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [activeTab, setActiveTab] = reactExports.useState("my-stickers");
  const [showUploadModal, setShowUploadModal] = reactExports.useState(false);
  const [uploading, setUploading] = reactExports.useState(false);
  const [stickerName, setStickerName] = reactExports.useState("");
  const [stickerFile, setStickerFile] = reactExports.useState(null);
  const [previewUrl, setPreviewUrl] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (activeTab === "my-stickers") {
      fetchStickers();
    } else {
      fetchStickerPacks();
    }
  }, [activeTab, serverId]);
  const fetchStickers = /* @__PURE__ */ __name(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const response = await fetch(`/api/stickers/${serverId}/list/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setStickers(data.stickers || []);
      }
    } catch (error) {
      console.error("Error fetching stickers:", error);
    } finally {
      setLoading(false);
    }
  }, "fetchStickers");
  const fetchStickerPacks = /* @__PURE__ */ __name(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const response = await fetch(`/api/stickers/packs/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setStickerPacks(data.packs || []);
      }
    } catch (error) {
      console.error("Error fetching sticker packs:", error);
    } finally {
      setLoading(false);
    }
  }, "fetchStickerPacks");
  const uploadSticker = /* @__PURE__ */ __name(async () => {
    if (!stickerName.trim() || !stickerFile) {
      console.error("❌ Please provide sticker name and file");
      return;
    }
    const formData = new FormData();
    formData.append("name", stickerName);
    formData.append("sticker", stickerFile);
    try {
      setUploading(true);
      const token = localStorage.getItem("access_token");
      const response = await fetch(`/api/stickers/${serverId}/upload/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
      });
      if (response.ok) {
        setShowUploadModal(false);
        setStickerName("");
        setStickerFile(null);
        setPreviewUrl("");
        fetchStickers();
      } else {
        const data = await response.json();
        console.error("❌", data.error || "Failed to upload sticker");
      }
    } catch (error) {
      console.error("Error uploading sticker:", error);
    } finally {
      setUploading(false);
    }
  }, "uploadSticker");
  const deleteSticker = /* @__PURE__ */ __name(async (stickerId) => {
    if (!await confirmDialog("Delete this sticker?")) return;
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`/api/stickers/${serverId}/${stickerId}/delete/`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        setStickers(stickers.filter((s) => s.id !== stickerId));
      } else {
        console.error("❌ Failed to delete sticker");
      }
    } catch (error) {
      console.error("Error deleting sticker:", error);
    }
  }, "deleteSticker");
  const installPack = /* @__PURE__ */ __name(async (packId) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`/api/stickers/${serverId}/install-pack/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ pack_id: packId })
      });
      if (response.ok) {
        fetchStickerPacks();
      } else {
        console.error("❌ Failed to install pack");
      }
    } catch (error) {
      console.error("Error installing pack:", error);
    }
  }, "installPack");
  const handleFileSelect = /* @__PURE__ */ __name((e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      console.error("❌ Please select an image file");
      return;
    }
    if (file.size > 512 * 1024) {
      console.error("❌ File size must be less than 512KB");
      return;
    }
    setStickerFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }, "handleFileSelect");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stickers-panel-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stickers-panel-modal", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stickers-panel-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "🎨 Stickers" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "✕" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stickers-tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `tab-btn ${activeTab === "my-stickers" ? "active" : ""}`,
          onClick: /* @__PURE__ */ __name(() => setActiveTab("my-stickers"), "onClick"),
          children: "📁 My Stickers"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `tab-btn ${activeTab === "packs" ? "active" : ""}`,
          onClick: /* @__PURE__ */ __name(() => setActiveTab("packs"), "onClick"),
          children: "📦 Sticker Packs"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stickers-panel-content", children: [
      activeTab === "my-stickers" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticker-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "upload-sticker-btn", onClick: /* @__PURE__ */ __name(() => setShowUploadModal(true), "onClick"), children: "➕ Upload Sticker" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "sticker-count", children: [
            stickers.length,
            " stickers"
          ] })
        ] }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading-spinner", children: "Loading stickers..." }) : stickers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-icon", children: "🎨" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "No Stickers Yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Upload your first custom sticker" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stickers-grid", children: stickers.map((sticker) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticker-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: sticker.url, alt: sticker.name, className: "sticker-image" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticker-name", children: sticker.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "delete-sticker-btn",
              onClick: /* @__PURE__ */ __name(() => deleteSticker(sticker.id), "onClick"),
              title: "Delete",
              children: "🗑️"
            }
          )
        ] }, sticker.id)) })
      ] }),
      activeTab === "packs" && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading-spinner", children: "Loading packs..." }) : stickerPacks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-icon", children: "📦" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "No Packs Available" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Check back later for new sticker packs" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "packs-grid", children: stickerPacks.map((pack) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pack-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pack-preview", children: pack.preview_stickers?.slice(0, 4).map((sticker, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: sticker.url, alt: "", className: "pack-preview-img" }, idx)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pack-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: pack.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            pack.sticker_count,
            " stickers"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `install-pack-btn ${pack.installed ? "installed" : ""}`,
            onClick: /* @__PURE__ */ __name(() => !pack.installed && installPack(pack.id), "onClick"),
            disabled: pack.installed,
            children: pack.installed ? "✓ Installed" : "➕ Install"
          }
        )
      ] }, pack.id)) }) })
    ] }),
    showUploadModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "upload-modal-overlay", onClick: /* @__PURE__ */ __name(() => setShowUploadModal(false), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "upload-modal", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "➕ Upload Sticker" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Sticker Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: stickerName,
            onChange: /* @__PURE__ */ __name((e) => setStickerName(e.target.value), "onChange"),
            placeholder: "My Sticker",
            maxLength: 32,
            className: "sticker-name-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Sticker Image" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "file-upload-area", onClick: /* @__PURE__ */ __name(() => document.getElementById("sticker-file").click(), "onClick"), children: previewUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: previewUrl, alt: "Preview", className: "upload-preview" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "upload-icon", children: "📤" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Click to select image" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "upload-hint", children: "PNG, GIF • Max 512KB • 512x512px recommended" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "sticker-file",
            type: "file",
            accept: "image/*",
            onChange: handleFileSelect,
            style: { display: "none" }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "cancel-btn", onClick: /* @__PURE__ */ __name(() => setShowUploadModal(false), "onClick"), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "upload-btn",
            onClick: uploadSticker,
            disabled: uploading || !stickerName || !stickerFile,
            children: uploading ? "Uploading..." : "Upload"
          }
        )
      ] })
    ] }) })
  ] }) });
}, "StickersPanel");
export {
  StickersPanel as default
};
