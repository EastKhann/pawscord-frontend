var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { a as React, r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { bs as FaFolder, t as FaSearch, aw as FaImage, bb as FaVideo, bc as FaFile, bF as FaFileArchive, a5 as FaDownload } from "./icons-vendor-2VDeY8fW.js";
const FileManagerPanel = /* @__PURE__ */ __name(({ serverId, apiBaseUrl, fetchWithAuth }) => {
  const [files, setFiles] = reactExports.useState([]);
  const [filter, setFilter] = reactExports.useState("all");
  const [search, setSearch] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(true);
  const categories = [
    { id: "all", label: "Tümü", icon: FaFolder },
    { id: "images", label: "Resimler", icon: FaImage },
    { id: "videos", label: "Videolar", icon: FaVideo },
    { id: "documents", label: "Belgeler", icon: FaFile },
    { id: "archives", label: "Arşivler", icon: FaFileArchive }
  ];
  reactExports.useEffect(() => {
    loadFiles();
  }, [serverId]);
  const loadFiles = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/files/?server=${serverId}`);
      if (response.ok) {
        const data = await response.json();
        setFiles(data);
      }
    } catch (error) {
      console.error("Failed to load files:", error);
    } finally {
      setLoading(false);
    }
  }, "loadFiles");
  const getFileType = /* @__PURE__ */ __name((filename) => {
    const ext = filename.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "images";
    if (["mp4", "avi", "mov", "webm"].includes(ext)) return "videos";
    if (["pdf", "doc", "docx", "txt", "xlsx"].includes(ext)) return "documents";
    if (["zip", "rar", "7z", "tar"].includes(ext)) return "archives";
    return "other";
  }, "getFileType");
  const formatSize = /* @__PURE__ */ __name((bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    if (bytes < 1024 * 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + " MB";
    return (bytes / 1024 / 1024 / 1024).toFixed(1) + " GB";
  }, "formatSize");
  const filteredFiles = files.filter((file) => {
    const matchesFilter = filter === "all" || getFileType(file.filename) === filter;
    const matchesSearch = file.filename.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  const totalSize = filteredFiles.reduce((sum, file) => sum + (file.size || 0), 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: styles.title, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaFolder, {}),
        " Dosya Yöneticisi"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.stats, children: [
        filteredFiles.length,
        " dosya · ",
        formatSize(totalSize)
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.search, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaSearch, { style: styles.searchIcon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Dosya ara...",
          value: search,
          onChange: /* @__PURE__ */ __name((e) => setSearch(e.target.value), "onChange"),
          style: styles.searchInput
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.categories, children: categories.map((cat) => {
      const Icon = cat.icon;
      const count = files.filter(
        (f) => cat.id === "all" || getFileType(f.filename) === cat.id
      ).length;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => setFilter(cat.id), "onClick"),
          style: {
            ...styles.categoryButton,
            ...filter === cat.id ? styles.categoryButtonActive : {}
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { style: styles.categoryIcon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cat.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.categoryCount, children: count })
          ]
        },
        cat.id
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.fileList, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Yükleniyor..." }) : filteredFiles.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.empty, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaFolder, { style: styles.emptyIcon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Dosya bulunamadı" })
    ] }) : filteredFiles.map((file) => /* @__PURE__ */ jsxRuntimeExports.jsx(FileCard, { file, formatSize }, file.id)) })
  ] });
}, "FileManagerPanel");
const FileCard = /* @__PURE__ */ __name(({ file, formatSize }) => {
  const getFileIcon = /* @__PURE__ */ __name((filename) => {
    const ext = filename.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif"].includes(ext)) return "🖼️";
    if (["mp4", "avi", "mov"].includes(ext)) return "🎥";
    if (["pdf"].includes(ext)) return "📕";
    if (["doc", "docx"].includes(ext)) return "📘";
    if (["zip", "rar"].includes(ext)) return "📦";
    return "📄";
  }, "getFileIcon");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.fileCard, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.fileIcon, children: getFileIcon(file.filename) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.fileInfo, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.fileName, children: file.filename }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.fileMeta, children: [
        formatSize(file.size || 0),
        " · ",
        file.uploaded_by,
        " · ",
        new Date(file.created_at).toLocaleDateString("tr-TR")
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: file.url, download: true, style: styles.downloadButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, {}) })
  ] });
}, "FileCard");
const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#2b2d31",
    borderRadius: "8px"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    paddingBottom: "15px",
    borderBottom: "1px solid #1e1f22"
  },
  title: {
    color: "#fff",
    fontSize: "20px",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  stats: {
    color: "#72767d",
    fontSize: "13px"
  },
  search: {
    position: "relative",
    marginBottom: "16px"
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#72767d",
    fontSize: "14px"
  },
  searchInput: {
    width: "100%",
    padding: "10px 10px 10px 36px",
    backgroundColor: "#1e1f22",
    border: "1px solid #4e5058",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "14px"
  },
  categories: {
    display: "flex",
    gap: "8px",
    marginBottom: "20px",
    overflowX: "auto"
  },
  categoryButton: {
    padding: "8px 16px",
    backgroundColor: "#1e1f22",
    border: "1px solid #4e5058",
    borderRadius: "6px",
    color: "#b9bbbe",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    whiteSpace: "nowrap",
    transition: "all 0.2s"
  },
  categoryButtonActive: {
    backgroundColor: "#5865f2",
    borderColor: "#5865f2",
    color: "#fff"
  },
  categoryIcon: {
    fontSize: "16px"
  },
  categoryCount: {
    fontSize: "12px",
    opacity: 0.7
  },
  fileList: {
    display: "grid",
    gap: "8px"
  },
  loading: {
    textAlign: "center",
    padding: "40px",
    color: "#b9bbbe"
  },
  empty: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#b9bbbe"
  },
  emptyIcon: {
    fontSize: "64px",
    opacity: 0.3,
    marginBottom: "20px"
  },
  fileCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    backgroundColor: "#1e1f22",
    borderRadius: "6px",
    border: "1px solid transparent",
    transition: "border-color 0.2s"
  },
  fileIcon: {
    fontSize: "32px"
  },
  fileInfo: {
    flex: 1,
    minWidth: 0
  },
  fileName: {
    color: "#fff",
    fontSize: "14px",
    fontWeight: "500",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  fileMeta: {
    color: "#72767d",
    fontSize: "12px",
    marginTop: "4px"
  },
  downloadButton: {
    padding: "8px 12px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    textDecoration: "none",
    display: "flex",
    alignItems: "center"
  }
};
const FileManagerPanel_default = React.memo(FileManagerPanel);
export {
  FileManagerPanel_default as default
};
