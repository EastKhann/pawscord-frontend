import { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { QUESTIONS_DB } from '../data/grammarQuestions';
import { API_BASE_URL } from '../utils/constants';

const API_URL_BASE = API_BASE_URL;

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
    const [knownQuestions, setKnownQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    const activeQuestions = useMemo(() => {
        if (!selectedLevel) return [];
        return QUESTIONS_DB.filter(q => q.level === selectedLevel && !knownQuestions.includes(q.id));
    }, [selectedLevel, knownQuestions]);

    const currentQuestion = activeQuestions[currentQuestionIndex];
    const totalQuestions = activeQuestions.length;
    const progress = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;

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
        knownQuestions,
        startQuiz, handleCheck, handleNext, handleMarkKnown, resetQuiz,
    };
};

export default useGrammarQuiz;
