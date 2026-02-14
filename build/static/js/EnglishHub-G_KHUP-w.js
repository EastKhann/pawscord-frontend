var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { L as Link } from "./router-vendor-DrLUSS4j.js";
import { A as FaArrowLeft, L as FaBookOpen, M as FaBrain, E as FaMicrophone, N as FaMicrophoneAlt, O as FaChartLine, P as FaTrophy, Q as FaStar, R as FaFire } from "./icons-vendor-2VDeY8fW.js";
const EnglishHub = /* @__PURE__ */ __name(() => {
  const [stats, setStats] = reactExports.useState({ quizzes: 0, correct: 0, streak: 0, vocabLearned: 0 });
  reactExports.useEffect(() => {
    try {
      const quizzes = parseInt(localStorage.getItem("eng_quiz_count") || "0");
      const correct = parseInt(localStorage.getItem("eng_correct_count") || "0");
      const streak = parseInt(localStorage.getItem("eng_streak") || "0");
      const vocabLearned = parseInt(localStorage.getItem("eng_vocab_learned") || "0");
      setStats({ quizzes, correct, streak, vocabLearned });
    } catch {
    }
  }, []);
  const accuracy = stats.quizzes > 0 ? Math.round(stats.correct / Math.max(stats.quizzes, 1) * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.scrollableViewport, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.contentWrapper, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", style: styles.backButton, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaArrowLeft, {}),
        " Sohbet'e Dön"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: styles.title, children: "🎓 İngilizce Eğitim Merkezi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.subtitle, children: "Kendini geliştirmek için bir modül seç ve öğrenmeye başla." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.cardGrid, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/eng-learn/vocab", style: styles.cardLink, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.card, borderBottom: "4px solid #23a559" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.iconCircleGreen, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaBookOpen, { size: 40, color: "#23a559" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.cardTitle, children: "Kelime Hazinesi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.cardDesc, children: "A1'den B2'ye seviyelere ayrılmış kelime kartlarıyla pratik yap." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.actionLink, children: "Çalışmaya Başla →" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/eng-learn/grammar", style: styles.cardLink, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.card, borderBottom: "4px solid #5865f2" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.iconCircleBlue, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaBrain, { size: 40, color: "#5865f2" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.cardTitle, children: "Grammar & Quiz" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.cardDesc, children: "Dilbilgisi kurallarını testlerle pekiştir ve skorunu yükselt." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { ...styles.actionLink, color: "#5865f2" }, children: "Test Çöz →" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/eng-learn/voice", style: styles.cardLink, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.card, borderBottom: "4px solid #eb459e" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.iconCirclePink, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaMicrophone, { size: 40, color: "#eb459e" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.cardTitle, children: "Sesli Pratik (AI)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.cardDesc, children: "Mikrofonu kullan, yapay zeka ile karşılıklı İngilizce konuş." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { ...styles.actionLink, color: "#eb459e" }, children: "Konuşmaya Başla →" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/eng-learn/pronunciation", style: styles.cardLink, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.card, borderBottom: "4px solid #f0b232" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.iconCircleYellow, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaMicrophoneAlt, { size: 40, color: "#f0b232" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.cardTitle, children: "Telaffuz Testi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.cardDesc, children: "Zor kelimeleri doğru söyleyebiliyor musun? Kendini test et." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { ...styles.actionLink, color: "#f0b232" }, children: "Test Yap →" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.card, borderBottom: "4px solid #f0b232" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.iconCircleYellow, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, { size: 40, color: "#f0b232" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.cardTitle, children: "İlerleme Durumu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statBox, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrophy, { style: { color: "#f0b232", marginBottom: 4 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.statNumber, children: stats.quizzes }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.statLabel, children: "Quiz Çözüldü" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statBox, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaStar, { style: { color: "#23a559", marginBottom: 4 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { ...styles.statNumber, color: "#23a559" }, children: [
              accuracy,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.statLabel, children: "Doğruluk" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statBox, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaFire, { style: { color: "#ed4245", marginBottom: 4 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { ...styles.statNumber, color: "#ed4245" }, children: stats.streak }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.statLabel, children: "Seri" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statBox, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaBookOpen, { style: { color: "#5865f2", marginBottom: 4 } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { ...styles.statNumber, color: "#5865f2" }, children: stats.vocabLearned }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.statLabel, children: "Kelime" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: "100%", backgroundColor: "#1e1f22", borderRadius: "8px", height: "8px", overflow: "hidden" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: `${Math.min(accuracy, 100)}%`, height: "100%", backgroundColor: "#f0b232", borderRadius: "8px", transition: "width 0.5s ease" } }) })
      ] })
    ] })
  ] }) });
}, "EnglishHub");
const styles = {
  // ... (Diğer stiller aynı kalacak) ...
  scrollableViewport: {
    left: 0,
    width: "100%",
    backgroundColor: "#313338",
    WebkitOverflowScrolling: "touch",
    zIndex: 9999,
    display: "block"
  },
  contentWrapper: {
    width: "100%",
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "max(20px, env(safe-area-inset-top)) 20px 60px 20px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: "100%"
  },
  headerSection: { textAlign: "center", marginBottom: "30px", position: "relative", width: "100%", maxWidth: "600px" },
  backButton: { display: "inline-flex", alignItems: "center", gap: "8px", color: "#949ba4", textDecoration: "none", fontWeight: "bold", fontSize: "0.9em", padding: "12px 16px", backgroundColor: "rgba(0,0,0,0.3)", borderRadius: "8px", marginBottom: "20px", alignSelf: "flex-start", zIndex: 20 },
  title: { fontSize: "1.8em", color: "#f2f3f5", marginBottom: "10px", marginTop: "0", fontWeight: "700" },
  subtitle: { color: "#b5bac1", fontSize: "1em", lineHeight: "1.4" },
  cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "25px", width: "100%" },
  cardLink: { textDecoration: "none", display: "block" },
  card: { backgroundColor: "#232428", borderRadius: "20px", padding: "30px 20px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", height: "100%", minHeight: "240px", boxShadow: "0 8px 20px rgba(0,0,0,0.2)", border: "1px solid #1e1f22", boxSizing: "border-box", position: "relative", overflow: "hidden" },
  iconCircleGreen: { width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "rgba(35, 165, 89, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "15px" },
  iconCircleBlue: { width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "rgba(88, 101, 242, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "15px" },
  iconCircleYellow: { width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "rgba(240, 178, 50, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "15px" },
  // 👇 3. YENİ STİL: PEMBE İKON DAİRESİ
  iconCirclePink: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "rgba(235, 69, 158, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "15px"
  },
  cardTitle: { color: "#dbdee1", margin: "0 0 10px 0", fontSize: "1.3em", fontWeight: "600" },
  cardDesc: { color: "#949ba4", fontSize: "0.9em", lineHeight: "1.5", marginBottom: "20px", flexGrow: 1 },
  actionLink: { color: "#23a559", fontWeight: "bold", fontSize: "0.95em", marginTop: "auto", display: "inline-block", padding: "5px 10px", borderRadius: "5px", backgroundColor: "rgba(35, 165, 89, 0.1)" },
  statBox: { display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#1e1f22", borderRadius: "10px", padding: "10px 6px", gap: "2px" },
  statNumber: { color: "#f0b232", fontWeight: "700", fontSize: "1.3em" },
  statLabel: { color: "#949ba4", fontSize: "0.7em", textTransform: "uppercase", letterSpacing: "0.5px" }
};
export {
  EnglishHub as default
};
