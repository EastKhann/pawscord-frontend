import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalWebSocket } from '../GlobalWebSocketContext';
import { API_BASE_URL } from '../utils/constants';

const TOKEN_REFRESH_URL = `${API_BASE_URL}/auth/token/refresh/`;
const GET_WORDS_URL = `${API_BASE_URL}/eng-learn/words/`;
const GET_KNOWN_WORDS_URL = `${API_BASE_URL}/eng-learn/known-words/`;
const MARK_WORD_AS_KNOWN_URL = `${API_BASE_URL}/eng-learn/mark-known/`;

const getToken = () => localStorage.getItem('access_token');

function useEnglishLearning() {
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

    const handleLogout = useCallback(() => {
        localStorage.removeItem('access_token');
        // refresh_token is httpOnly cookie — cleared by backend
        navigate('/');
    }, [navigate]);

    const fetchWithAuth = useCallback(async (url, options = {}) => {
        const originalFetch = async () => {
            const token = getToken();
            const headers = options.headers || {};
            if (token) headers['Authorization'] = `Bearer ${token}`;
            if (!(options.body instanceof FormData)) headers['Content-Type'] = 'application/json';
            return fetch(url, { ...options, headers, credentials: 'include' });
        };

        let response = await originalFetch();

        if (response.status === 401 && url !== TOKEN_REFRESH_URL) {
            console.warn("Token süresi doldu, yenileniyor...");
            try {
                const refreshResponse = await fetch(TOKEN_REFRESH_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({}),
                });
                const data = await refreshResponse.json();
                if (!refreshResponse.ok) { handleLogout(); throw new Error("Oturum yenilenemedi."); }
                localStorage.setItem('access_token', data.access);
                response = await originalFetch();
            } catch (err) { handleLogout(); throw err; }
        }
        return response;
    }, [handleLogout]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [wordsResponse, knownWordsResponse] = await Promise.all([
                    fetchWithAuth(GET_WORDS_URL),
                    fetchWithAuth(GET_KNOWN_WORDS_URL)
                ]);
                if (!wordsResponse.ok) {
                    if (wordsResponse.status === 401) throw new Error("Lütfen önce Pawscord'a giriş yapın.");
                    throw new Error('Kelimeler yüklenemedi. API hatası.');
                }
                if (!knownWordsResponse.ok) throw new Error('Bilinen kelimeler listesi alınamadı.');

                const wordsData = await wordsResponse.json();
                const knownWordsData = await knownWordsResponse.json();
                const levels = Object.keys(wordsData || {}).sort();
                setAllData(wordsData);
                setKnownWords(knownWordsData || {});
                setAvailableLevels(levels);
                if (levels.length > 0) setCurrentLevel(levels[0]);
            } catch (err) { setError(err.message); }
            finally { setIsLoading(false); }
        };
        fetchInitialData();
    }, [fetchWithAuth]);

    const availableWordsForLevel = useMemo(() => {
        if (!currentLevel || !allData[currentLevel]) return [];
        const knownWordsInLevel = new Set(knownWords[currentLevel] || []);
        return allData[currentLevel].filter(word => !knownWordsInLevel.has(word.term));
    }, [allData, currentLevel, knownWords]);

    const levelStats = useMemo(() => {
        const total = allData[currentLevel]?.length || 0;
        const known = knownWords[currentLevel]?.length || 0;
        return { totalWords: total, knownWords: known, progress: Math.round(total > 0 ? (known / total) * 100 : 0) };
    }, [currentLevel, allData, knownWords]);

    const totalStats = useMemo(() => {
        let totalWords = 0, totalKnownWords = 0;
        Object.values(allData).forEach(arr => { totalWords += arr.length; });
        Object.values(knownWords).forEach(arr => { totalKnownWords += arr.length; });
        return { totalWords, totalKnownWords, progress: Math.round(totalWords > 0 ? (totalKnownWords / totalWords) * 100 : 0) };
    }, [allData, knownWords]);

    const getNewWord = useCallback(() => {
        setShowAnswer(false);
        setLevelComplete(false);
        if (availableWordsForLevel.length === 0) {
            setCurrentWord(null);
            if (currentLevel) setLevelComplete(true);
            return;
        }
        setCurrentWord(availableWordsForLevel[Math.floor(Math.random() * availableWordsForLevel.length)]);
    }, [availableWordsForLevel, currentLevel]);

    useEffect(() => {
        if (!isLoading && availableLevels.length > 0) getNewWord();
    }, [currentLevel, isLoading, availableLevels, availableWordsForLevel, getNewWord]);

    const handleMarkAsKnown = useCallback(async () => {
        if (!currentWord) return;
        try {
            const response = await fetchWithAuth(MARK_WORD_AS_KNOWN_URL, {
                method: 'POST',
                body: JSON.stringify({ level: currentLevel, word: currentWord.term })
            });
            if (!response.ok) throw new Error("Kelime kaydedilemedi");
            setKnownWords(await response.json());
        } catch (err) { console.error("Kelime kaydetme API hatası:", err); }
    }, [currentWord, currentLevel, fetchWithAuth]);

    const { globalData } = useGlobalWebSocket();
    useEffect(() => {
        if (globalData?.type === 'user_profile_update' && globalData.user_data?.known_words) {
            setKnownWords(globalData.user_data.known_words);
        }
    }, [globalData]);

    return {
        allData, availableLevels, currentLevel, setCurrentLevel,
        currentWord, showAnswer, setShowAnswer, isLoading, error,
        levelComplete, levelStats, totalStats, availableWordsForLevel,
        getNewWord, handleMarkAsKnown
    };
}

export default useEnglishLearning;
