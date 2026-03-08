import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadQuestionsByLevel } from '../data/grammarQuestions';
import { API_BASE_URL } from '../utils/constants';

const API_URL_BASE = API_BASE_URL;
const TIMER_SECONDS = 20; // Per-question timer

const useGrammarQuiz = () => {
    const navigate = useNavigate();

    const [view, setView] = useState('level-select');
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [inputText, setInputText] = useState('');
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [xpEarned, setXpEarned] = useState(0);
    const [timerMode, setTimerMode] = useState(false);
    const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
    const [resultAnim, setResultAnim] = useState(null); // 'correct' | 'wrong'
    const [knownQuestions, setKnownQuestions] = useState([]);
    const [levelQuestions, setLevelQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const timerRef = useRef(null);

    const getToken = () => localStorage.getItem('access_token');

    const fetchWithAuth = useCallback(async (url, options = {}) => {
        const token = getToken();
        if (!token) return null;
        const headers = options.headers || {};
        headers['Authorization'] = `Bearer ${token}`;
        headers['Content-Type'] = 'application/json';
        try {
            const response = await fetch(url, { ...options, headers });
            if (response.status === 401) { navigate('/'); return null; }
            return response;
        } catch (e) {
            console.error("API Error:", e);
            return null;
        }
    }, [navigate]);

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

    // Load questions lazily when level is selected
    useEffect(() => {
        if (!selectedLevel) { setLevelQuestions([]); return; }
        let cancelled = false;
        loadQuestionsByLevel(selectedLevel).then(qs => {
            if (!cancelled) setLevelQuestions(qs || []);
        });
        return () => { cancelled = true; };
    }, [selectedLevel]);

    const activeQuestions = useMemo(() => {
        if (!selectedLevel || !levelQuestions.length) return [];
        return levelQuestions.filter(q => !knownQuestions.includes(q.id));
    }, [selectedLevel, levelQuestions, knownQuestions]);

    const currentQuestion = activeQuestions[currentQuestionIndex];
    const totalQuestions = activeQuestions.length;
    const progress = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;

    const startQuiz = (levelId, withTimer = false) => {
        setSelectedLevel(levelId);
        setCurrentQuestionIndex(0);
        setScore(0);
        setStreak(0);
        setXpEarned(0);
        setIsAnswered(false);
        setIsCorrect(null);
        setSelectedOption('');
        setInputText('');
        setTimerMode(withTimer);
        setTimeLeft(TIMER_SECONDS);
        setView('quiz');
    };

    // Timer logic
    useEffect(() => {
        if (!timerMode || view !== 'quiz' || isAnswered) return;
        setTimeLeft(TIMER_SECONDS);
        timerRef.current = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) {
                    clearInterval(timerRef.current);
                    // Time's up — treat as wrong
                    setIsCorrect(false);
                    setIsAnswered(true);
                    setResultAnim('wrong');
                    setStreak(0);
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(timerRef.current);
    }, [timerMode, view, currentQuestionIndex, isAnswered]);

    const handleCheck = () => {
        if (timerMode) clearInterval(timerRef.current);
        let userAns = '';
        if (currentQuestion.type === 'choice') userAns = selectedOption;
        else userAns = inputText.trim();
        const correct = userAns.toLowerCase() === currentQuestion.answer.toLowerCase();
        setIsCorrect(correct);
        setIsAnswered(true);
        setResultAnim(correct ? 'correct' : 'wrong');
        setTimeout(() => setResultAnim(null), 600);
        if (correct) {
            setScore(s => s + 1);
            setStreak(s => s + 1);
            const xp = 10 + (streak >= 2 ? 5 : 0); // streak bonus
            setXpEarned(prev => prev + xp);
            try {
                const cur = parseInt(localStorage.getItem('eng_xp') || '0');
                localStorage.setItem('eng_xp', cur + xp);
                const qc = parseInt(localStorage.getItem('eng_quiz_count') || '0');
                localStorage.setItem('eng_quiz_count', qc + 1);
                const cc = parseInt(localStorage.getItem('eng_correct_count') || '0');
                localStorage.setItem('eng_correct_count', cc + 1);
            } catch { }
        } else {
            setStreak(0);
            try {
                const qc = parseInt(localStorage.getItem('eng_quiz_count') || '0');
                localStorage.setItem('eng_quiz_count', qc + 1);
            } catch { }
        }
    };

    const handleNext = () => {
        setResultAnim(null);
        if (currentQuestionIndex + 1 < totalQuestions) {
            setCurrentQuestionIndex(prev => prev + 1);
            setIsAnswered(false);
            setIsCorrect(null);
            setSelectedOption('');
            setInputText('');
            if (timerMode) setTimeLeft(TIMER_SECONDS);
        } else {
            setView('result');
        }
    };

    const handleMarkKnown = async () => {
        if (!currentQuestion) return;
        try {
            await fetchWithAuth(`${API_URL_BASE}/eng-learn/grammar/mark-known/`, {
                method: 'POST',
                body: JSON.stringify({ question_id: currentQuestion.id })
            });
            setKnownQuestions(prev => [...prev, currentQuestion.id]);
            handleNext();
        } catch (e) {
            console.error("İşaretleme hatası:", e);
        }
    };

    const resetQuiz = () => {
        setView('level-select');
        setSelectedLevel(null);
    };

    return {
        view, isLoading, score, totalQuestions, progress,
        currentQuestion, currentQuestionIndex,
        selectedOption, setSelectedOption,
        inputText, setInputText,
        isAnswered, isCorrect,
        knownQuestions, streak, xpEarned,
        timerMode, timeLeft, TIMER_SECONDS,
        resultAnim,
        startQuiz, handleCheck, handleNext, handleMarkKnown, resetQuiz,
    };
};

export default useGrammarQuiz;
