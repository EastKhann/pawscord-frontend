// frontend/src/EnglishLearningPage.js (GENEL TOPLAM İLERLEME EKLENDİ)

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaTimesCircle, FaTrophy, FaRedo, FaCheckDouble } from 'react-icons/fa';
import { QUESTIONS_DB, LEVELS } from './data/grammarQuestions';
import { useGlobalWebSocket } from './GlobalWebSocketContext'; // 👈 YENİ EKLENEN
import { API_BASE_URL } from './utils/constants';

// --- AKILLI URL AYARLARI (Centralized from constants.js) ---
const TOKEN_REFRESH_URL = `${API_BASE_URL}/auth/token/refresh/`;

const GET_WORDS_URL = `${API_BASE_URL}/eng-learn/words/`;
const GET_KNOWN_WORDS_URL = `${API_BASE_URL}/eng-learn/known-words/`;
const MARK_WORD_AS_KNOWN_URL = `${API_BASE_URL}/eng-learn/mark-known/`;

const WS_PROTOCOL = IS_PRODUCTION ? 'wss' : 'ws';
const API_HOST_ONLY = IS_PRODUCTION
    ? "pawscord.com"
    : `${MY_LOCAL_IP}:${DJANGO_PORT}`;

const getToken = () => localStorage.getItem('access_token');
// ---------------------------

// ... (Kodun geri kalanı AYNEN kalsın) ...
// Geliştirme sunucusu (React 3000 portu) kontrolü


// ========================================================


function EnglishLearningPage() {
    const [allData, setAllData] = useState({});
    const [knownWords, setKnownWords] = useState({});
    const [availableLevels, setAvailableLevels] = useState([]);
    const [currentLevel, setCurrentLevel] = useState('');
    const [currentWord, setCurrentWord] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [levelComplete, setLevelComplete] = useState(false);
    const navigate = useNavigate();
    const statusWsRef = useRef(null);

    // === Kendi Başına Auth yapabilen fetchWithAuth ===
    const handleLogout = useCallback(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/'); // Ana sayfaya (login) yönlendir
    }, [navigate]);

    const fetchWithAuth = useCallback(async (url, options = {}) => {
        const originalFetch = async () => {
            const token = getToken();
            const headers = options.headers || {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            if (!(options.body instanceof FormData)) {
                headers['Content-Type'] = 'application/json';
            }
            return fetch(url, { ...options, headers });
        };

        let response = await originalFetch();

        if (response.status === 401 && url !== TOKEN_REFRESH_URL) {
            console.warn("Token süresi doldu, yenileniyor...");
            const refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) {
                handleLogout();
                throw new Error("Oturum süresi doldu, giriş yapın.");
            }

            try {
                const refreshResponse = await fetch(TOKEN_REFRESH_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refresh: refreshToken }),
                });
                const data = await refreshResponse.json();
                if (!refreshResponse.ok) {
                    handleLogout();
                    throw new Error("Oturum yenilenemedi.");
                }
                localStorage.setItem('access_token', data.access);
                response = await originalFetch(); // İsteği tekrarla
            } catch (error) {
                handleLogout();
                throw error;
            }
        }
        return response;
    }, [handleLogout]);
    // =================================================

    // Bilinen kelimeleri ve tüm kelimeleri API'den çeken useEffect
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [wordsResponse, knownWordsResponse] = await Promise.all([
                    fetchWithAuth(GET_WORDS_URL),
                    fetchWithAuth(GET_KNOWN_WORDS_URL)
                ]);

                if (!wordsResponse.ok) {
                    if (wordsResponse.status === 401) {
                        throw new Error("Lütfen önce Pawscord'a giriş yapın.");
                    }
                    throw new Error('Kelimeler yüklenemedi. API hatası.');
                }
                if (!knownWordsResponse.ok) {
                    throw new Error('Bilinen kelimeler listesi alınamadı.');
                }

                const wordsData = await wordsResponse.json();
                const knownWordsData = await knownWordsResponse.json();

                const levels = Object.keys(wordsData || {}).sort();
                setAllData(wordsData);
                setKnownWords(knownWordsData || {});
                setAvailableLevels(levels);
                if (levels.length > 0) {
                    setCurrentLevel(levels[0]);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, [fetchWithAuth]);

    // Mevcut kelimeleri filtreleyen ve yeni kelime seçen useMemo
    const availableWordsForLevel = useMemo(() => {
        if (!currentLevel || !allData[currentLevel]) {
            return [];
        }
        const knownWordsInLevel = new Set(knownWords[currentLevel] || []);
        return allData[currentLevel].filter(word => !knownWordsInLevel.has(word.term));
    }, [allData, currentLevel, knownWords]);

    // === 👇 SEVİYE HESAPLAMASI 👇 ===
    const levelStats = useMemo(() => {
        const total = allData[currentLevel]?.length || 0;
        const known = knownWords[currentLevel]?.length || 0;
        const percentage = (total > 0) ? (known / total) * 100 : 0;

        return {
            totalWords: total,
            knownWords: known,
            progress: Math.round(percentage)
        };
    }, [currentLevel, allData, knownWords]);

    // === 👇 YENİ TOPLAM HESAPLAMA 👇 ===
    const totalStats = useMemo(() => {
        let totalWords = 0;
        let totalKnownWords = 0;

        // allData objesindeki tüm dizilerin uzunluklarını topla
        Object.values(allData).forEach(levelArray => {
            totalWords += levelArray.length;
        });

        // knownWords objesindeki tüm dizilerin uzunluklarını topla
        Object.values(knownWords).forEach(knownLevelArray => {
            totalKnownWords += knownLevelArray.length;
        });

        const percentage = (totalWords > 0) ? (totalKnownWords / totalWords) * 100 : 0;

        return {
            totalWords: totalWords,
            totalKnownWords: totalKnownWords,
            progress: Math.round(percentage)
        };
    }, [allData, knownWords]);
    // === 👆 YENİ TOPLAM HESAPLAMA SONU 👆 ===

    // Yeni kelime alma fonksiyonu
    const getNewWord = useCallback(() => {
        setShowAnswer(false);
        setLevelComplete(false);

        if (availableWordsForLevel.length === 0) {
            setCurrentWord(null);
            if (currentLevel) {
                setLevelComplete(true);
            }
            return;
        }

        const randomIndex = Math.floor(Math.random() * availableWordsForLevel.length);
        setCurrentWord(availableWordsForLevel[randomIndex]);
    }, [availableWordsForLevel, currentLevel]);

    // Seviye değiştiğinde veya bilinen kelimeler güncellendiğinde
    useEffect(() => {
        if (!isLoading && availableLevels.length > 0) {
            getNewWord();
        }
    }, [currentLevel, isLoading, availableLevels, availableWordsForLevel, getNewWord]); // availableWordsForLevel eklendi

    // 'Biliyorum' butonu (2 kelime atlama hatası düzeltildi)
    const handleMarkAsKnown = useCallback(async () => {
        if (!currentWord) return;

        const { term } = currentWord;
        const level = currentLevel;

        try {
            const response = await fetchWithAuth(MARK_WORD_AS_KNOWN_URL, {
                method: 'POST',
                body: JSON.stringify({ level: level, word: term })
            });

            if (!response.ok) {
                throw new Error("Kelime kaydedilemedi");
            }

            // Sadece sunucudan gelen cevaba göre state'i güncelle
            const actualKnownWords = await response.json();
            setKnownWords(actualKnownWords);

        } catch (error) {
            console.error("Kelime kaydetme API hatası:", error);
        }

    }, [currentWord, currentLevel, fetchWithAuth]);

    // ...
    // const statusWsRef = useRef(null); // Buna gerek kalmadı
    const { globalData } = useGlobalWebSocket(); // 👈 Global veriyi çekiyoruz

    // WebSocket'ten gelen veriyi dinle (Global Context üzerinden)
    useEffect(() => {
        if (globalData?.type === 'user_profile_update') {
            console.log("EnglishLearnPage: Global soketten güncelleme alındı.");
            if (globalData.user_data && globalData.user_data.known_words) {
                setKnownWords(globalData.user_data.known_words);
            }
        }
    }, [globalData]);
    // ...
    if (isLoading) {
        return <div style={styles.pageContainer}>Yükleniyor...</div>;
    }

    if (error) {
        return (
            <div style={styles.pageContainer}>
                <h1 style={styles.errorText}>Hata: {error}</h1>
                <Link to="/" style={styles.backButton}>Sohbete Geri Dön</Link>
            </div>
        );
    }

    // === GÜNCELLENMİŞ JSX (Arayüz) ===
    return (
        <div style={styles.pageContainer}>

            <Link to="/eng-learn" style={styles.backButton}>← Merkeze Dön</Link>

            <div style={styles.quizContainer}>

                <h1 style={styles.pageTitle}>İngilizce Kelime Öğren</h1>

                {/* Seviye seçimi ve istatistikler */}
                <div style={styles.levelAndProgressContainer}>
                    <div style={styles.controls}>
                        <label htmlFor="level-select" style={styles.label}>Seviye:</label>
                        <select
                            id="level-select"
                            value={currentLevel}
                            onChange={(e) => setCurrentLevel(e.target.value)}
                            style={styles.select}
                        >
                            {availableLevels.map(level => (
                                <option key={level} value={level}>{level.toUpperCase()} ({allData[level]?.length || 0} kelime)</option>
                            ))}
                        </select>
                    </div>

                    <div style={styles.progressStats}>
                        <span>Bildiğiniz: <strong>{levelStats.knownWords}</strong></span>
                        <span>Toplam: <strong>{levelStats.totalWords}</strong></span>
                    </div>
                </div>

                {/* Seviye İlerleme Çubuğu */}
                <div style={{ ...styles.progressBarBackground, marginBottom: '20px' }}>
                    <div style={{ ...styles.progressBarFill, width: `${levelStats.progress}%` }}>
                        {levelStats.progress > 15 && <span>{levelStats.progress}%</span>}
                    </div>
                    {levelStats.progress <= 15 && <span style={styles.progressTextOutside}>{levelStats.progress}%</span>}
                </div>

                {/* === 👇 YENİ EKLENEN TOPLAM İLERLEME BÖLÜMÜ 👇 === */}
                <div>
                    <h4 style={styles.totalStatsHeader}>Genel Toplam İlerleme</h4>
                    <div style={{ ...styles.progressStats, marginBottom: '8px' }}>
                        <span>Toplam Bildiğiniz: <strong>{totalStats.totalKnownWords}</strong></span>
                        <span>Toplam Kelime: <strong>{totalStats.totalWords}</strong></span>
                    </div>
                    <div style={styles.progressBarBackground}>
                        <div style={{ ...styles.progressBarFill, ...styles.totalProgressBarFill, width: `${totalStats.progress}%` }}>
                            {totalStats.progress > 15 && <span>{totalStats.progress}%</span>}
                        </div>
                        {totalStats.progress <= 15 && <span style={styles.progressTextOutside}>{totalStats.progress}%</span>}
                    </div>
                </div>
                {/* === 👆 YENİ EKLENEN BÖLÜM SONU 👆 === */}


                {/* Kelime Alanı */}
                <div style={styles.wordArea}>
                    {levelComplete ? (
                        <h2 style={{ ...styles.term, color: 'var(--text-positive)' }}>
                            Tebrikler! 🎉<br />Bu seviyedeki tüm kelimeleri tamamladınız.
                        </h2>
                    ) : currentWord ? (
                        <>
                            <h2 style={styles.term}>{currentWord.term}</h2>
                            {showAnswer && (
                                <p style={styles.meanings}>
                                    {currentWord.meanings.join(' / ')}
                                </p>
                            )}
                        </>
                    ) : (
                        <p>Bu seviyede kelime bulunamadı.</p>
                    )}
                </div>

                {/* Butonlar */}
                <div style={styles.buttonGroup}>
                    <button
                        style={styles.actionButton}
                        onClick={() => setShowAnswer(true)}
                        disabled={showAnswer || !currentWord || levelComplete}
                    >
                        Cevabı Göster
                    </button>

                    <button
                        style={{ ...styles.actionButton, ...styles.knownButton }}
                        onClick={handleMarkAsKnown}
                        disabled={!currentWord || levelComplete}
                    >
                        Biliyorum (Geç)
                    </button>

                    <button
                        style={{ ...styles.actionButton, ...styles.primaryButton }}
                        onClick={getNewWord}
                        disabled={levelComplete || availableWordsForLevel.length <= 1}
                    >
                        Yeni Kelime
                    </button>
                </div>

            </div>
        </div>
    );
}

// === GÜNCELLENMİŞ STİLLER ===
const styles = {
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // height: '100dvh', // <-- Bunu silebilir veya minHeight yapabiliriz
        minHeight: '100%',
        backgroundColor: 'var(--background-primary, #36393f)',
        color: 'var(--text-primary, #dcddde)',
        fontFamily: 'Poppins, sans-serif',

        // 🔥 ESTETİK BOŞLUK: Wrapper çentiği halletti, biz sadece kenar boşluğu veriyoruz
        padding: '30px 20px',

        boxSizing: 'border-box',
        // overflowY: 'auto' // <-- BUNU SİLİN, Wrapper hallediyor
    },
    quizContainer: {
        width: '100%',
        maxWidth: '600px',
        backgroundColor: 'var(--background-secondary, #2f3136)',
        borderRadius: '8px',
        padding: '25px 25px 35px 25px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
        textAlign: 'center',
        position: 'relative',
        boxSizing: 'border-box',
        // 👇 DÜZELTME 3: Mobilde üst kısımla birleşmesin diye biraz margin
        marginTop: '10px'
    },
    pageTitle: {
        marginTop: '10px',
        marginBottom: '15px',
        color: 'var(--text-primary, #dcddde)',
    },
    backButton: {
        padding: '10px 15px',
        backgroundColor: 'var(--button-secondary, #4f545c)',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        fontWeight: 'bold',
        fontSize: '1em',
        marginBottom: '20px',
    },
    levelAndProgressContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px',
        flexWrap: 'wrap',
        gap: '10px'
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    progressStats: {
        display: 'flex',
        gap: '15px',
        fontSize: '0.9em',
        color: 'var(--text-secondary, #72767d)',
        justifyContent: 'flex-start', // Sola yasla
    },
    // YENİ: Toplam istatistik başlığı
    totalStatsHeader: {
        fontSize: '0.9em',
        color: 'var(--text-secondary, #72767d)',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'left',
        margin: '0 0 8px 0',
    },
    label: {
        fontSize: '1.1em',
        color: 'var(--text-primary, #dcddde)',
    },
    select: {
        padding: '8px',
        fontSize: '1em',
        backgroundColor: 'var(--background-tertiary, #202225)',
        color: 'var(--text-primary, #dcddde)',
        border: '1px solid var(--border-primary, #202225)',
        borderRadius: '4px',
    },
    progressBarBackground: {
        width: '100%',
        backgroundColor: 'var(--background-tertiary, #202225)',
        borderRadius: '5px',
        height: '24px',
        overflow: 'hidden',
        position: 'relative',
        // marginBottom: '20px', // Artık inline olarak veriliyor
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: 'var(--text-positive, #43b581)', // Seviye rengi (Yeşil)
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '0.9em',
        transition: 'width 0.3s ease',
    },
    // YENİ: Toplam ilerleme çubuğu için farklı renk (Mavi)
    totalProgressBarFill: {
        backgroundColor: 'var(--button-primary, #5865f2)',
    },
    progressTextOutside: {
        position: 'absolute',
        left: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'var(--text-primary, #dcddde)',
        fontSize: '0.9em',
        fontWeight: 'bold'
    },
    wordArea: {
        marginTop: '20px', // DEĞİŞİKLİK: Üst boşluk eklendi
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--background-tertiary, #202225)',
        borderRadius: '5px',
        padding: '30px 20px',
        wordBreak: 'break-word',
    },
    term: {
        fontSize: 'clamp(1.8em, 5vw, 2.5em)',
        fontWeight: 'bold',
        color: 'var(--text-primary, #dcddde)',
        margin: 0,
    },
    meanings: {
        fontSize: 'clamp(1.1em, 3vw, 1.5em)',
        color: 'var(--text-positive, #43b581)',
        margin: '10px 0 0 0',
    },
    buttonGroup: {
        marginTop: '30px',
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
    },
    actionButton: {
        flex: 1,
        minWidth: '150px',
        padding: '12px',
        fontSize: '1.1em',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: 'var(--button-secondary, #4f545c)',
        color: 'white',
        transition: 'opacity 0.2s',
    },
    knownButton: {
        backgroundColor: 'var(--text-positive, #43b581)',
    },
    primaryButton: {
        backgroundColor: 'var(--button-primary, #5865f2)',
    },
    errorText: {
        color: 'var(--text-danger, #f04747)',
    }
};

export default EnglishLearningPage;


