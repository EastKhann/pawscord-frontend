// frontend/src/GrammarQuizPage.js (TAM HALİ)

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaTimesCircle, FaTrophy, FaRedo, FaCheckDouble } from 'react-icons/fa';
import { QUESTIONS_DB, LEVELS } from './data/grammarQuestions';
import { API_BASE_URL } from './utils/constants';
import toast from './utils/toast';

// --- API AYARLARI (Centralized from constants.js) ---
const API_URL_BASE = API_BASE_URL;

const GrammarQuizPage = () => {
    const navigate = useNavigate();

    // State
    const [view, setView] = useState('level-select');
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [inputText, setInputText] = useState('');
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(0);

    // 👇 Bilinen Sorular State'i
    const [knownQuestions, setKnownQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Auth Helper
    const getToken = () => localStorage.getItem('access_token');

    // API Fetch Helper
    const fetchWithAuth = useCallback(async (url, options = {}) => {
        const token = getToken();
        if (!token) return null;

        const headers = options.headers || {};
        headers['Authorization'] = `Bearer ${token}`;
        headers['Content-Type'] = 'application/json';

        try {
            const response = await fetch(url, { ...options, headers });
            if (response.status === 401) {
                navigate('/'); // Token geçersizse login'e at
                return null;
            }
            return response;
        } catch (e) {
            console.error("API Error:", e);
            return null;
        }
    }, [navigate]);

    // 1. Başlangıçta Bilinen Soruları Çek
    useEffect(() => {
        const loadKnownQuestions = async () => {
            const response = await fetchWithAuth(`${API_URL_BASE}/eng-learn/grammar/known/`);
            if (response && response.ok) {
                const data = await response.json();
                setKnownQuestions(data || []);
            }
            setIsLoading(false);
        };
        loadKnownQuestions();
    }, [fetchWithAuth]);

    // 2. Soruları Filtrele (Sadece bilinmeyenleri göster)
    const activeQuestions = useMemo(() => {
        if (!selectedLevel) return [];
        // Seviyeye uygun VE bilinenler listesinde OLMAYAN sorular
        return QUESTIONS_DB.filter(q => q.level === selectedLevel && !knownQuestions.includes(q.id));
    }, [selectedLevel, knownQuestions]);

    const currentQuestion = activeQuestions[currentQuestionIndex];
    const totalQuestions = activeQuestions.length;
    const progress = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;

    // Fonksiyonlar
    const startQuiz = (levelId) => {
        setSelectedLevel(levelId);
        setCurrentQuestionIndex(0);
        setScore(0);
        setIsAnswered(false);
        setIsCorrect(null);
        setSelectedOption('');
        setInputText('');
        setView('quiz');
    };

    const handleCheck = () => {
        let userAns = '';
        if (currentQuestion.type === 'choice') userAns = selectedOption;
        else userAns = inputText.trim();

        const correct = userAns.toLowerCase() === currentQuestion.answer.toLowerCase();
        setIsCorrect(correct);
        setIsAnswered(true);
        if (correct) setScore(s => s + 1);
    };

    // 👇 "Biliyorum (Geç)" Fonksiyonu
    const handleMarkKnown = async () => {
        if (!currentQuestion) return;

        // 1. API'ye bildir
        try {
            await fetchWithAuth(`${API_URL_BASE}/eng-learn/grammar/mark-known/`, {
                method: 'POST',
                body: JSON.stringify({ question_id: currentQuestion.id })
            });

            // 2. Local state'i güncelle (Böylece bir daha çıkmaz)
            setKnownQuestions(prev => [...prev, currentQuestion.id]);

            // 3. Sonraki soruya geç
            handleNext();

        } catch (e) {
            console.error("İşaretleme hatası:", e);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex + 1 < totalQuestions) {
            setCurrentQuestionIndex(prev => prev + 1);
            setIsAnswered(false);
            setIsCorrect(null);
            setSelectedOption('');
            setInputText('');
        } else {
            setView('result');
        }
    };

    const resetQuiz = () => {
        setView('level-select');
        setSelectedLevel(null);
    };

    if (isLoading) return <div style={styles.container}>Yükleniyor...</div>;

    // --- 1. EKRAN: SEVİYE SEÇİMİ ---
    if (view === 'level-select') {
        const colA = LEVELS.filter(l => l.id.startsWith('A'));
        const colB = LEVELS.filter(l => l.id.startsWith('B'));
        const colC = LEVELS.filter(l => l.id.startsWith('C'));

        const renderLevelCard = (lvl) => {
            const totalInDb = QUESTIONS_DB.filter(q => q.level === lvl.id).length;
            const knownInLevel = QUESTIONS_DB.filter(q => q.level === lvl.id && knownQuestions.includes(q.id)).length;
            const remaining = totalInDb - knownInLevel;

            return (
                <button
                    key={lvl.id}
                    onClick={() => remaining > 0 ? startQuiz(lvl.id) : toast.success("Tebrikler! Bu seviyedeki tüm soruları tamamladın.")}
                    style={{
                        ...styles.levelCard,
                        borderTop: `5px solid ${lvl.color}`,
                        opacity: remaining === 0 ? 0.6 : 1
                    }}
                >
                    <div style={styles.levelIcon}>{lvl.icon}</div>
                    <div style={styles.levelName}>{lvl.name}</div>
                    <div style={styles.levelCount}>
                        {remaining === 0 ? "Tamamlandı! 🎉" : `${knownInLevel} / ${totalInDb} Tamamlandı`}
                    </div>
                </button>
            );
        };

        return (
            <div style={styles.scrollWrapper}>
                <div style={styles.container}>
                    <div style={styles.headerArea}>
                        <Link to="/eng-learn" style={styles.backLink}><FaArrowLeft /> Merkez</Link>
                        <h1 style={styles.mainTitle}>Seviyeni Seç</h1>
                        <p style={styles.subTitle}>Kendini test etmek için bir zorluk seviyesi seç.</p>
                    </div>

                    <div style={styles.columnsWrapper}>
                        <div style={styles.column}>{colA.map(lvl => renderLevelCard(lvl))}</div>
                        <div style={styles.column}>{colB.map(lvl => renderLevelCard(lvl))}</div>
                        <div style={styles.column}>{colC.map(lvl => renderLevelCard(lvl))}</div>
                    </div>
                </div>
            </div>
        );
    }

    // --- 2. EKRAN: SONUÇ ---
    if (view === 'result') {
        const successRate = totalQuestions > 0 ? (score / totalQuestions) * 100 : 100;
        let message = "Gayet iyi!";
        if (successRate === 100) message = "Mükemmel! 🏆";
        else if (successRate < 50) message = "Biraz daha çalışmalısın. 💪";

        return (
            <div style={styles.scrollWrapper}>
                <div style={styles.container}>
                    <div style={styles.resultCard}>
                        <FaTrophy size={60} color="#faa61a" style={{ marginBottom: '20px' }} />
                        <h2 style={styles.resultTitle}>Oturum Tamamlandı!</h2>
                        <p style={styles.resultScore}>Skorun: {score} / {totalQuestions}</p>
                        <p style={styles.resultMessage}>{message}</p>

                        <div style={styles.resultBtnGroup}>
                            <button onClick={resetQuiz} style={styles.primaryBtn}>
                                <FaRedo style={{ marginRight: '8px' }} /> Menüye Dön
                            </button>
                            <Link to="/eng-learn" style={styles.secondaryBtn}>Merkeze Dön</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- 3. EKRAN: QUIZ ---
    if (!currentQuestion) {
        return (
            <div style={styles.container}>
                <div style={styles.resultCard}>
                    <h2>Harika! 🎉</h2>
                    <p>Bu seviyedeki tüm soruları bitirdin.</p>
                    <button onClick={resetQuiz} style={styles.primaryBtn}>Geri Dön</button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.scrollWrapper}>
            <div style={styles.container}>
                <div style={styles.topBar}>
                    <button onClick={resetQuiz} style={styles.smallBackBtn}>✕ Çık</button>
                    <div style={styles.progressBarBg}>
                        <div style={{ ...styles.progressBarFill, width: `${progress}%` }}></div>
                    </div>
                </div>

                <div style={styles.quizBox}>
                    <div style={styles.questionSection}>
                        <h2 style={styles.questionText}>
                            {currentQuestion.question.split('_____').map((part, i, arr) => (
                                <React.Fragment key={i}>
                                    {part}
                                    {i < arr.length - 1 && (
                                        <span style={{
                                            ...styles.blankSpace,
                                            borderColor: isAnswered
                                                ? (isCorrect ? '#43b581' : '#f04747')
                                                : '#7289da'
                                        }}>
                                            {isAnswered
                                                ? (currentQuestion.type === 'choice' ? selectedOption : inputText) || '___'
                                                : '_____'}
                                        </span>
                                    )}
                                </React.Fragment>
                            ))}
                        </h2>
                    </div>

                    <div style={styles.interactionArea}>
                        {currentQuestion.type === 'choice' && (
                            <div style={styles.optionsGrid}>
                                {currentQuestion.options.map((opt, idx) => {
                                    let btnStyle = styles.optionBtn;
                                    if (isAnswered) {
                                        if (opt === currentQuestion.answer) btnStyle = { ...btnStyle, ...styles.correctBtn };
                                        else if (opt === selectedOption) btnStyle = { ...btnStyle, ...styles.wrongBtn };
                                        else btnStyle = { ...btnStyle, opacity: 0.5 };
                                    } else if (selectedOption === opt) {
                                        btnStyle = { ...btnStyle, ...styles.selectedBtn };
                                    }

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => !isAnswered && setSelectedOption(opt)}
                                            style={btnStyle}
                                            disabled={isAnswered}
                                        >
                                            {opt}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {currentQuestion.type === 'input' && (
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Cevabı buraya yazın..."
                                style={{
                                    ...styles.textInput,
                                    borderColor: isAnswered ? (isCorrect ? '#43b581' : '#f04747') : '#7289da'
                                }}
                                disabled={isAnswered}
                            />
                        )}
                    </div>

                    {/* FOOTER & BUTONLAR */}
                    <div style={styles.footer}>
                        {!isAnswered ? (
                            <div style={styles.actionButtonGroup}>
                                <button
                                    onClick={handleMarkKnown}
                                    style={styles.knownBtn}
                                    title="Bunu biliyorum, bir daha sorma"
                                >
                                    <FaCheckDouble /> Biliyorum (Geç)
                                </button>

                                <button
                                    onClick={handleCheck}
                                    style={styles.checkBtn}
                                    disabled={currentQuestion.type === 'choice' ? !selectedOption : !inputText}
                                >
                                    KONTROL ET
                                </button>
                            </div>
                        ) : (
                            // ✨✨✨ DETAYLI AÇIKLAMA KARTI ✨✨✨
                            <div style={{
                                ...styles.feedbackBox,
                                borderLeft: isCorrect ? '5px solid #43b581' : '5px solid #f04747',
                                backgroundColor: isCorrect ? 'rgba(67, 181, 129, 0.1)' : 'rgba(240, 71, 71, 0.1)'
                            }}>
                                {/* 1. Durum Başlığı */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                                    {isCorrect ? <FaCheckCircle size={28} color="#43b581" /> : <FaTimesCircle size={28} color="#f04747" />}
                                    <div>
                                        <strong style={{ fontSize: '1.2em', color: isCorrect ? '#43b581' : '#f04747', display: 'block' }}>
                                            {isCorrect ? "Doğru Cevap!" : "Yanlış Cevap"}
                                        </strong>
                                        {!isCorrect && (
                                            <span style={{ color: '#dbdee1', fontSize: '0.9em' }}>
                                                Doğrusu: <strong style={{ color: '#43b581' }}>{currentQuestion.answer}</strong>
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* 2. Detaylı Açıklama İçeriği */}
                                {currentQuestion.explanation && (
                                    <div style={styles.explanationContainer}>
                                        {currentQuestion.explanation.title && (
                                            <div style={styles.expTitle}>📖 {currentQuestion.explanation.title}</div>
                                        )}
                                        {currentQuestion.explanation.translation && (
                                            <div style={styles.expTranslation}>
                                                <em>"{currentQuestion.explanation.translation}"</em>
                                            </div>
                                        )}
                                        <div style={styles.separator}></div>
                                        {currentQuestion.explanation.rule && (
                                            <div style={styles.expSection}>
                                                <strong style={{ color: '#f0b232' }}>Kural:</strong> {currentQuestion.explanation.rule}
                                            </div>
                                        )}
                                        {currentQuestion.explanation.tips && (
                                            <div style={styles.expSection}>
                                                <strong style={{ color: '#00a8fc' }}>İpucu:</strong> {currentQuestion.explanation.tips}
                                            </div>
                                        )}
                                        {currentQuestion.explanation.examples && (
                                            <div style={{ ...styles.expSection, marginTop: '10px' }}>
                                                <strong style={{ color: '#dbdee1', display: 'block', marginBottom: 3 }}>Örnekler:</strong>
                                                {currentQuestion.explanation.examples.map((ex, i) => (
                                                    <div key={i} style={styles.exampleItem}>• {ex}</div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Buton Grubu */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <button onClick={handleNext} style={isCorrect ? styles.nextBtnCorrect : styles.nextBtnWrong}>
                                        {currentQuestionIndex + 1 === totalQuestions ? 'BİTİR VE SONUÇLARI GÖR' : 'DEVAM ET'}
                                    </button>

                                    {/* 👇 YENİ EKLENEN BUTON: Açıklamayı gördükten sonra biliyorum deme */}
                                    <button
                                        onClick={handleMarkKnown}
                                        style={styles.feedbackKnownBtn}
                                    >
                                        <FaCheckDouble /> Bunu aslında biliyordum (Öğrenildi Say)
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    scrollWrapper: {
        width: '100%',
        height: '100dvh',
        overflowY: 'auto',
        backgroundColor: 'var(--background-primary)',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100%',
        color: 'var(--text-primary)',
        padding: '20px',
        paddingBottom: '50px',
        boxSizing: 'border-box',
        fontFamily: "'Poppins', sans-serif"
    },
    headerArea: {
        width: '100%',
        maxWidth: '800px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
    },
    backLink: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        textDecoration: 'none',
        color: 'var(--text-secondary)',
        fontWeight: '600',
        fontSize: '0.9em',
        marginBottom: '15px',
        alignSelf: 'flex-start'
    },
    mainTitle: { fontSize: 'clamp(1.8em, 5vw, 2.5em)', marginBottom: '10px', color: '#fff' },
    subTitle: { fontSize: '1em', color: 'var(--text-muted)', textAlign: 'center' },

    columnsWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        width: '100%',
        maxWidth: '1000px',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    column: {
        flex: '1 1 280px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    levelCard: {
        backgroundColor: '#2b2d31', padding: '25px', borderRadius: '16px',
        border: '2px solid transparent', cursor: 'pointer', display: 'flex', alignItems: 'center',
        boxShadow: '0 4px 0 rgba(0,0,0,0.2)', transition: 'transform 0.1s, border-color 0.2s',
        color: '#dbdee1', textAlign: 'left', gap: '15px'
    },
    levelIcon: { fontSize: '2.5em' },
    levelName: { fontSize: '1.2em', fontWeight: '700', color: 'white' },
    levelCount: { fontSize: '0.9em', color: '#949ba4' },

    quizBox: {
        width: '100%', maxWidth: '700px', backgroundColor: '#2b2d31',
        padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        marginTop: '20px'
    },
    questionText: { fontSize: '1.5em', textAlign: 'center', lineHeight: '1.6', color: 'white', fontWeight: '600' },

    optionsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '30px' },
    optionBtn: {
        padding: '20px', fontSize: '1.1em', fontWeight: '600', borderRadius: '12px',
        border: '2px solid #404249', backgroundColor: '#313338', color: '#dbdee1',
        cursor: 'pointer', transition: 'all 0.1s', boxShadow: '0 4px 0 #1e1f22'
    },
    selectedBtn: { borderColor: '#5865f2', backgroundColor: 'rgba(88, 101, 242, 0.1)', color: '#5865f2' },
    correctBtn: { borderColor: '#23a559', backgroundColor: '#23a559', color: 'white', boxShadow: '0 4px 0 #187d41' },
    wrongBtn: { borderColor: '#da373c', backgroundColor: '#da373c', color: 'white', boxShadow: '0 4px 0 #a1282c' },

    footer: { marginTop: '30px', display: 'flex', justifyContent: 'space-between', gap: '10px' },
    checkBtn: {
        padding: '15px 30px', borderRadius: '12px', border: 'none',
        backgroundColor: '#5865f2', color: 'white', fontSize: '1em', fontWeight: 'bold',
        cursor: 'pointer', boxShadow: '0 4px 0 #4752c4', width: '100%'
    },
    knownBtn: {
        padding: '15px', borderRadius: '12px', border: '2px solid #404249',
        backgroundColor: 'transparent', color: '#949ba4', fontWeight: 'bold',
        cursor: 'pointer'
    },

    topBar: {
        width: '100%', maxWidth: '600px', display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px'
    },
    smallBackBtn: {
        background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1em', cursor: 'pointer', fontWeight: 'bold'
    },
    progressBarBg: {
        flex: 1, height: '10px', backgroundColor: 'var(--background-tertiary)', borderRadius: '5px', overflow: 'hidden'
    },
    progressBarFill: {
        height: '100%', backgroundColor: '#5865f2', borderRadius: '5px', transition: 'width 0.5s ease'
    },

    questionSection: {
        marginBottom: '20px', minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center'
    },

    blankSpace: {
        display: 'inline-block', borderBottom: '2px solid', padding: '0 5px', minWidth: '40px', textAlign: 'center', margin: '0 4px', color: 'var(--text-link)', fontWeight: 'bold'
    },
    interactionArea: { marginBottom: '20px' },

    textInput: {
        width: '100%', padding: '15px', fontSize: '1.1em', borderRadius: '10px',
        border: '2px solid', backgroundColor: 'var(--background-primary)', color: 'var(--text-primary)', outline: 'none',
        boxSizing: 'border-box'
    },

    actionButtonGroup: {
        display: 'flex', gap: '10px', flexWrap: 'wrap'
    },

    feedbackBox: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '20px',
        borderRadius: '12px',
        animation: 'slideUp 0.3s ease',
        textAlign: 'left',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
    },
    explanationContainer: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: '15px',
        borderRadius: '8px',
        marginTop: '5px',
        marginBottom: '15px',
        border: '1px solid rgba(255,255,255,0.05)'
    },
    expTitle: { color: '#fff', fontWeight: 'bold', fontSize: '1.1em', marginBottom: '5px' },
    expTranslation: { color: '#949ba4', fontSize: '0.95em', marginBottom: '10px' },
    separator: { height: '1px', backgroundColor: 'rgba(255,255,255,0.1)', margin: '10px 0' },
    expSection: { fontSize: '0.95em', color: '#dbdee1', lineHeight: '1.5', marginBottom: '8px' },
    exampleItem: {
        fontSize: '0.9em', color: '#b9bbbe', paddingLeft: '10px',
        borderLeft: '2px solid #5865f2', marginBottom: '4px', fontStyle: 'italic'
    },

    nextBtnCorrect: {
        padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#43b581',
        color: 'white', fontWeight: 'bold', cursor: 'pointer', width: '100%', fontSize: '1em'
    },
    nextBtnWrong: {
        padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#f04747',
        color: 'white', fontWeight: 'bold', cursor: 'pointer', width: '100%', fontSize: '1em'
    },
    // 👇 YENİ BUTON STİLİ
    feedbackKnownBtn: {
        background: 'transparent',
        border: 'none',
        color: '#949ba4',
        fontSize: '0.9em',
        cursor: 'pointer',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'color 0.2s',
        opacity: 0.8
    },

    resultCard: {
        backgroundColor: 'var(--background-secondary)', padding: '40px 20px', borderRadius: '20px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
        maxWidth: '400px', width: '100%', margin: 'auto'
    },
    resultTitle: { fontSize: '1.8em', color: '#fff', margin: '10px 0' },
    resultScore: { fontSize: '1.4em', color: '#7289da', fontWeight: 'bold', marginBottom: '20px' },
    resultMessage: { fontSize: '1.1em', color: 'var(--text-muted)', marginBottom: '30px' },
    resultBtnGroup: { width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' },
    primaryBtn: {
        width: '100%', padding: '15px', borderRadius: '10px', border: 'none',
        backgroundColor: '#5865f2', color: 'white', fontWeight: 'bold', fontSize: '1em',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
    },
    secondaryBtn: {
        width: '100%', padding: '15px', borderRadius: '10px', border: '2px solid var(--background-tertiary)',
        backgroundColor: 'transparent', color: 'var(--text-secondary)', fontWeight: 'bold',
        textAlign: 'center', textDecoration: 'none', boxSizing: 'border-box', display: 'block'
    },
};

export default GrammarQuizPage;

