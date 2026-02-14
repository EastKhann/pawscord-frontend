var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { b as useNavigate, L as Link } from "./router-vendor-DrLUSS4j.js";
import { A as API_BASE_URL, u as useGlobalWebSocket } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
import "./ui-vendor-iPoN0WGz.js";
const TOKEN_REFRESH_URL = `${API_BASE_URL}/auth/token/refresh/`;
const GET_WORDS_URL = `${API_BASE_URL}/eng-learn/words/`;
const GET_KNOWN_WORDS_URL = `${API_BASE_URL}/eng-learn/known-words/`;
const MARK_WORD_AS_KNOWN_URL = `${API_BASE_URL}/eng-learn/mark-known/`;
const getToken = /* @__PURE__ */ __name(() => localStorage.getItem("access_token"), "getToken");
function useEnglishLearning() {
  const [allData, setAllData] = reactExports.useState({});
  const [knownWords, setKnownWords] = reactExports.useState({});
  const [availableLevels, setAvailableLevels] = reactExports.useState([]);
  const [currentLevel, setCurrentLevel] = reactExports.useState("");
  const [currentWord, setCurrentWord] = reactExports.useState(null);
  const [showAnswer, setShowAnswer] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [levelComplete, setLevelComplete] = reactExports.useState(false);
  const navigate = useNavigate();
  const handleLogout = reactExports.useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  }, [navigate]);
  const fetchWithAuth = reactExports.useCallback(async (url, options = {}) => {
    const originalFetch = /* @__PURE__ */ __name(async () => {
      const token = getToken();
      const headers = options.headers || {};
      if (token) headers["Authorization"] = `Bearer ${token}`;
      if (!(options.body instanceof FormData)) headers["Content-Type"] = "application/json";
      return fetch(url, { ...options, headers });
    }, "originalFetch");
    let response = await originalFetch();
    if (response.status === 401 && url !== TOKEN_REFRESH_URL) {
      console.warn("Token süresi doldu, yenileniyor...");
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        handleLogout();
        throw new Error("Oturum süresi doldu, giriş yapın.");
      }
      try {
        const refreshResponse = await fetch(TOKEN_REFRESH_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: refreshToken })
        });
        const data = await refreshResponse.json();
        if (!refreshResponse.ok) {
          handleLogout();
          throw new Error("Oturum yenilenemedi.");
        }
        localStorage.setItem("access_token", data.access);
        response = await originalFetch();
      } catch (err) {
        handleLogout();
        throw err;
      }
    }
    return response;
  }, [handleLogout]);
  reactExports.useEffect(() => {
    const fetchInitialData = /* @__PURE__ */ __name(async () => {
      try {
        const [wordsResponse, knownWordsResponse] = await Promise.all([
          fetchWithAuth(GET_WORDS_URL),
          fetchWithAuth(GET_KNOWN_WORDS_URL)
        ]);
        if (!wordsResponse.ok) {
          if (wordsResponse.status === 401) throw new Error("Lütfen önce Pawscord'a giriş yapın.");
          throw new Error("Kelimeler yüklenemedi. API hatası.");
        }
        if (!knownWordsResponse.ok) throw new Error("Bilinen kelimeler listesi alınamadı.");
        const wordsData = await wordsResponse.json();
        const knownWordsData = await knownWordsResponse.json();
        const levels = Object.keys(wordsData || {}).sort();
        setAllData(wordsData);
        setKnownWords(knownWordsData || {});
        setAvailableLevels(levels);
        if (levels.length > 0) setCurrentLevel(levels[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }, "fetchInitialData");
    fetchInitialData();
  }, [fetchWithAuth]);
  const availableWordsForLevel = reactExports.useMemo(() => {
    if (!currentLevel || !allData[currentLevel]) return [];
    const knownWordsInLevel = new Set(knownWords[currentLevel] || []);
    return allData[currentLevel].filter((word) => !knownWordsInLevel.has(word.term));
  }, [allData, currentLevel, knownWords]);
  const levelStats = reactExports.useMemo(() => {
    const total = allData[currentLevel]?.length || 0;
    const known = knownWords[currentLevel]?.length || 0;
    return { totalWords: total, knownWords: known, progress: Math.round(total > 0 ? known / total * 100 : 0) };
  }, [currentLevel, allData, knownWords]);
  const totalStats = reactExports.useMemo(() => {
    let totalWords = 0, totalKnownWords = 0;
    Object.values(allData).forEach((arr) => {
      totalWords += arr.length;
    });
    Object.values(knownWords).forEach((arr) => {
      totalKnownWords += arr.length;
    });
    return { totalWords, totalKnownWords, progress: Math.round(totalWords > 0 ? totalKnownWords / totalWords * 100 : 0) };
  }, [allData, knownWords]);
  const getNewWord = reactExports.useCallback(() => {
    setShowAnswer(false);
    setLevelComplete(false);
    if (availableWordsForLevel.length === 0) {
      setCurrentWord(null);
      if (currentLevel) setLevelComplete(true);
      return;
    }
    setCurrentWord(availableWordsForLevel[Math.floor(Math.random() * availableWordsForLevel.length)]);
  }, [availableWordsForLevel, currentLevel]);
  reactExports.useEffect(() => {
    if (!isLoading && availableLevels.length > 0) getNewWord();
  }, [currentLevel, isLoading, availableLevels, availableWordsForLevel, getNewWord]);
  const handleMarkAsKnown = reactExports.useCallback(async () => {
    if (!currentWord) return;
    try {
      const response = await fetchWithAuth(MARK_WORD_AS_KNOWN_URL, {
        method: "POST",
        body: JSON.stringify({ level: currentLevel, word: currentWord.term })
      });
      if (!response.ok) throw new Error("Kelime kaydedilemedi");
      setKnownWords(await response.json());
    } catch (err) {
      console.error("Kelime kaydetme API hatası:", err);
    }
  }, [currentWord, currentLevel, fetchWithAuth]);
  const { globalData } = useGlobalWebSocket();
  reactExports.useEffect(() => {
    if (globalData?.type === "user_profile_update" && globalData.user_data?.known_words) {
      setKnownWords(globalData.user_data.known_words);
    }
  }, [globalData]);
  return {
    allData,
    availableLevels,
    currentLevel,
    setCurrentLevel,
    currentWord,
    showAnswer,
    setShowAnswer,
    isLoading,
    error,
    levelComplete,
    levelStats,
    totalStats,
    availableWordsForLevel,
    getNewWord,
    handleMarkAsKnown
  };
}
__name(useEnglishLearning, "useEnglishLearning");
const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: "100%",
    backgroundColor: "var(--background-primary, #36393f)",
    color: "var(--text-primary, #dcddde)",
    fontFamily: "Poppins, sans-serif",
    padding: "30px 20px",
    boxSizing: "border-box"
  },
  quizContainer: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "var(--background-secondary, #2f3136)",
    borderRadius: "8px",
    padding: "25px 25px 35px 25px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.5)",
    textAlign: "center",
    position: "relative",
    boxSizing: "border-box",
    marginTop: "10px"
  },
  pageTitle: {
    marginTop: "10px",
    marginBottom: "15px",
    color: "var(--text-primary, #dcddde)"
  },
  backButton: {
    padding: "10px 15px",
    backgroundColor: "var(--button-secondary, #4f545c)",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    fontSize: "1em",
    marginBottom: "20px"
  },
  levelAndProgressContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    flexWrap: "wrap",
    gap: "10px"
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  progressStats: {
    display: "flex",
    gap: "15px",
    fontSize: "0.9em",
    color: "var(--text-secondary, #72767d)",
    justifyContent: "flex-start"
  },
  totalStatsHeader: {
    fontSize: "0.9em",
    color: "var(--text-secondary, #72767d)",
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "left",
    margin: "0 0 8px 0"
  },
  label: {
    fontSize: "1.1em",
    color: "var(--text-primary, #dcddde)"
  },
  select: {
    padding: "8px",
    fontSize: "1em",
    backgroundColor: "var(--background-tertiary, #202225)",
    color: "var(--text-primary, #dcddde)",
    border: "1px solid var(--border-primary, #202225)",
    borderRadius: "4px"
  },
  progressBarBackground: {
    width: "100%",
    backgroundColor: "var(--background-tertiary, #202225)",
    borderRadius: "5px",
    height: "24px",
    overflow: "hidden",
    position: "relative"
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "var(--text-positive, #43b581)",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: "0.9em",
    transition: "width 0.3s ease"
  },
  totalProgressBarFill: {
    backgroundColor: "var(--button-primary, #5865f2)"
  },
  progressTextOutside: {
    position: "absolute",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "var(--text-primary, #dcddde)",
    fontSize: "0.9em",
    fontWeight: "bold"
  },
  wordArea: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "var(--background-tertiary, #202225)",
    borderRadius: "5px",
    padding: "30px 20px",
    wordBreak: "break-word"
  },
  term: {
    fontSize: "clamp(1.8em, 5vw, 2.5em)",
    fontWeight: "bold",
    color: "var(--text-primary, #dcddde)",
    margin: 0
  },
  meanings: {
    fontSize: "clamp(1.1em, 3vw, 1.5em)",
    color: "var(--text-positive, #43b581)",
    margin: "10px 0 0 0"
  },
  buttonGroup: {
    marginTop: "30px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },
  actionButton: {
    flex: 1,
    minWidth: "150px",
    padding: "12px",
    fontSize: "1.1em",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "var(--button-secondary, #4f545c)",
    color: "white",
    transition: "opacity 0.2s"
  },
  knownButton: {
    backgroundColor: "var(--text-positive, #43b581)"
  },
  primaryButton: {
    backgroundColor: "var(--button-primary, #5865f2)"
  },
  errorText: {
    color: "var(--text-danger, #f04747)"
  }
};
function EnglishLearningPage() {
  const e = useEnglishLearning();
  if (e.isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.pageContainer, children: "Yükleniyor..." });
  if (e.error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.pageContainer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { style: styles.errorText, children: [
        "Hata: ",
        e.error
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", style: styles.backButton, children: "Sohbete Geri Dön" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.pageContainer, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/eng-learn", style: styles.backButton, children: [
      "←",
      " Merkeze Dön"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.quizContainer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { style: styles.pageTitle, children: [
        "İ",
        "ngilizce Kelime ",
        "Öğren"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.levelAndProgressContainer, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.controls, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "level-select", style: styles.label, children: "Seviye:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              id: "level-select",
              value: e.currentLevel,
              onChange: /* @__PURE__ */ __name((ev) => e.setCurrentLevel(ev.target.value), "onChange"),
              style: styles.select,
              children: e.availableLevels.map((level) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: level, children: [
                level.toUpperCase(),
                " (",
                e.allData[level]?.length || 0,
                " kelime)"
              ] }, level))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.progressStats, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Bildiğiniz: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: e.levelStats.knownWords })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Toplam: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: e.levelStats.totalWords })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.progressBarBackground, marginBottom: "20px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.progressBarFill, width: `${e.levelStats.progress}%` }, children: e.levelStats.progress > 15 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          e.levelStats.progress,
          "%"
        ] }) }),
        e.levelStats.progress <= 15 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.progressTextOutside, children: [
          e.levelStats.progress,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { style: styles.totalStatsHeader, children: [
          "Genel Toplam ",
          "İ",
          "lerleme"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.progressStats, marginBottom: "8px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Toplam Bildiğiniz: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: e.totalStats.totalKnownWords })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Toplam Kelime: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: e.totalStats.totalWords })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.progressBarBackground, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.progressBarFill, ...styles.totalProgressBarFill, width: `${e.totalStats.progress}%` }, children: e.totalStats.progress > 15 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            e.totalStats.progress,
            "%"
          ] }) }),
          e.totalStats.progress <= 15 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.progressTextOutside, children: [
            e.totalStats.progress,
            "%"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.wordArea, children: e.levelComplete ? /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: { ...styles.term, color: "var(--text-positive)" }, children: [
        "Tebrikler! ",
        "🎉",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Bu seviyedeki tüm kelimeleri tamamladınız."
      ] }) : e.currentWord ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.term, children: e.currentWord.term }),
        e.showAnswer && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.meanings, children: e.currentWord.meanings.join(" / ") })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Bu seviyede kelime bulunamadı." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.buttonGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            style: styles.actionButton,
            onClick: /* @__PURE__ */ __name(() => e.setShowAnswer(true), "onClick"),
            disabled: e.showAnswer || !e.currentWord || e.levelComplete,
            children: "Cevabı Göster"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            style: { ...styles.actionButton, ...styles.knownButton },
            onClick: e.handleMarkAsKnown,
            disabled: !e.currentWord || e.levelComplete,
            children: "Biliyorum (Geç)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            style: { ...styles.actionButton, ...styles.primaryButton },
            onClick: e.getNewWord,
            disabled: e.levelComplete || e.availableWordsForLevel.length <= 1,
            children: "Yeni Kelime"
          }
        )
      ] })
    ] })
  ] });
}
__name(EnglishLearningPage, "EnglishLearningPage");
export {
  EnglishLearningPage as default
};
