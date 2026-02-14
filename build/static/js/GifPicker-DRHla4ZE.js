var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { a as React, r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
const GifPicker = /* @__PURE__ */ __name(({ onSelect, onClose, localGifListUrl, absoluteHostUrl, fetchWithAuth }) => {
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [allGifs, setAllGifs] = reactExports.useState([]);
  const [filteredGifs, setFilteredGifs] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const pickerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target) && event.target.textContent !== "GIF") {
        onClose();
      }
    }
    __name(handleClickOutside, "handleClickOutside");
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);
  reactExports.useEffect(() => {
    const fetchLocalGifs = /* @__PURE__ */ __name(async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchWithAuth(localGifListUrl);
        if (!response.ok) {
          throw new Error(`Yerel API Hatası: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setAllGifs(data);
          setFilteredGifs(data);
        } else {
          setAllGifs([]);
          setFilteredGifs([]);
        }
      } catch (err) {
        console.error("Yerel GIF yükleme hatası:", err);
        setError("GIF koleksiyonu yüklenemedi. Django sunucusunu ve 'gifs' klasörünü kontrol edin.");
      } finally {
        setIsLoading(false);
      }
    }, "fetchLocalGifs");
    if (localGifListUrl) {
      fetchLocalGifs();
    }
  }, [localGifListUrl, fetchWithAuth]);
  reactExports.useEffect(() => {
    if (!allGifs.length) return;
    if (!searchTerm) {
      setFilteredGifs(allGifs);
      return;
    }
    const lowerCaseSearch = searchTerm.toLowerCase();
    const results = allGifs.filter((url) => {
      const filenameWithExtension = url.substring(url.lastIndexOf("/") + 1);
      const filename = filenameWithExtension.substring(0, filenameWithExtension.lastIndexOf("."));
      return filename.toLowerCase().includes(lowerCaseSearch);
    });
    setFilteredGifs(results);
  }, [searchTerm, allGifs]);
  const handleGifClick = /* @__PURE__ */ __name((gifUrl) => {
    onSelect(gifUrl);
  }, "handleGifClick");
  const getAbsoluteGifUrl = /* @__PURE__ */ __name((relativeUrl) => {
    return relativeUrl.startsWith("http") ? relativeUrl : `${absoluteHostUrl}${relativeUrl}`;
  }, "getAbsoluteGifUrl");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.pickerOverlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.pickerContainer, ref: pickerRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "text",
        placeholder: "Koleksiyonda ara (dosya adına göre)...",
        value: searchTerm,
        onChange: /* @__PURE__ */ __name((e) => setSearchTerm(e.target.value), "onChange"),
        style: styles.searchInput,
        disabled: isLoading || error
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.gifGrid, children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.errorText, children: error }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.loadingText, children: "Yerel koleksiyon yükleniyor..." }) : filteredGifs.length > 0 ? filteredGifs.map((url) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: styles.gifWrapper,
          onClick: /* @__PURE__ */ __name(() => handleGifClick(url), "onClick"),
          title: url.substring(url.lastIndexOf("/") + 1),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: getAbsoluteGifUrl(url),
              alt: url.substring(url.lastIndexOf("/") + 1),
              style: styles.gifImage,
              onError: /* @__PURE__ */ __name((e) => {
                e.target.style.display = "none";
                e.target.parentNode.style.backgroundColor = "#444";
              }, "onError")
            }
          )
        },
        url
      )) : !error && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: styles.noResultsText, children: [
        "'",
        searchTerm,
        "' için sonuç bulunamadı."
      ] })
    ] })
  ] }) });
}, "GifPicker");
const styles = {
  pickerOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1500,
    pointerEvents: "none"
  },
  pickerContainer: {
    position: "absolute",
    bottom: "100px",
    width: "400px",
    height: "350px",
    backgroundColor: "#2f3136",
    borderRadius: "8px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    pointerEvents: "auto"
  },
  searchInput: {
    width: "calc(100% - 20px)",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #5865f2",
    backgroundColor: "#444",
    color: "white",
    outline: "none",
    fontSize: "1em"
  },
  gifGrid: {
    flexGrow: 1,
    overflowY: "auto",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
    paddingRight: "5px"
  },
  gifWrapper: {
    width: "100%",
    paddingTop: "75%",
    position: "relative",
    borderRadius: "4px",
    overflow: "hidden",
    cursor: "pointer",
    backgroundColor: "#3a3d43",
    transition: "transform 0.1s"
  },
  gifImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  loadingText: {
    color: "#b9bbbe",
    gridColumn: "1 / -1",
    textAlign: "center",
    marginTop: "50px"
  },
  errorText: {
    color: "#f04747",
    gridColumn: "1 / -1",
    textAlign: "center",
    marginTop: "50px",
    fontWeight: "bold"
  },
  noResultsText: {
    color: "#b9bbbe",
    gridColumn: "1 / -1",
    textAlign: "center",
    marginTop: "50px"
  }
};
const GifPicker_default = React.memo(GifPicker);
export {
  GifPicker_default as default
};
