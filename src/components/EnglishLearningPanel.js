// frontend/src/components/EnglishLearningPanel.js
import React, { useState, useEffect } from 'react';
import toast from '../utils/toast';
import './EnglishLearningPanel.css';

const EnglishLearningPanel = ({ apiBaseUrl, onClose }) => {
    const [view, setView] = useState('vocabulary'); // 'vocabulary', 'grammar', 'stats'
    const [words, setWords] = useState([]);
    const [knownWords, setKnownWords] = useState([]);
    const [grammarTopics, setGrammarTopics] = useState([]);
    const [knownGrammar, setKnownGrammar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterLevel, setFilterLevel] = useState('all'); // 'all', 'beginner', 'intermediate', 'advanced'
    const [showKnownOnly, setShowKnownOnly] = useState(false);

    useEffect(() => {
        if (view === 'vocabulary') {
            fetchWords();
            fetchKnownWords();
        } else if (view === 'grammar') {
            fetchGrammarTopics();
            fetchKnownGrammar();
        }
    }, [view]);

    const fetchWords = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/eng-learn/words/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setWords(data.words || []);
            } else {
                toast.error('❌ Kelimeler yüklenemedi');
            }
        } catch (error) {
            console.error('Fetch words error:', error);
            toast.error('❌ Bağlantı hatası');
        } finally {
            setLoading(false);
        }
    };

    const fetchKnownWords = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/eng-learn/known-words/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setKnownWords(data.known_words || []);
            }
        } catch (error) {
            console.error('Fetch known words error:', error);
        }
    };

    const fetchGrammarTopics = async () => {
        try {
            setLoading(true);
            // Simulated grammar topics - replace with actual endpoint when available
            const mockGrammar = [
                { id: 1, topic: 'Present Simple', level: 'beginner', description: 'Basic present tense usage', examples: ['I go to school', 'She likes cats'] },
                { id: 2, topic: 'Past Simple', level: 'beginner', description: 'Basic past tense usage', examples: ['I went to school', 'She liked cats'] },
                { id: 3, topic: 'Present Perfect', level: 'intermediate', description: 'Has/Have + past participle', examples: ['I have seen this movie', 'She has finished'] },
                { id: 4, topic: 'Conditionals', level: 'advanced', description: 'If clauses and results', examples: ['If I had money, I would buy...'] },
                { id: 5, topic: 'Passive Voice', level: 'intermediate', description: 'Be + past participle', examples: ['The book was written by...'] }
            ];
            setGrammarTopics(mockGrammar);
        } catch (error) {
            console.error('Fetch grammar error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchKnownGrammar = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/eng-learn/grammar/known/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setKnownGrammar(data.known_grammar || []);
            }
        } catch (error) {
            console.error('Fetch known grammar error:', error);
        }
    };

    const markWordAsKnown = async (wordId) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/eng-learn/mark-known/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ word_id: wordId })
            });

            if (response.ok) {
                setKnownWords([...knownWords, wordId]);
                toast.success('✅ Kelime biliniyor olarak işaretlendi');
            } else {
                toast.error('❌ İşlem başarısız');
            }
        } catch (error) {
            console.error('Mark word error:', error);
            toast.error('❌ Bağlantı hatası');
        }
    };

    const markGrammarKnown = async (grammarId) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/eng-learn/grammar/mark-known/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ grammar_id: grammarId })
            });

            if (response.ok) {
                setKnownGrammar([...knownGrammar, grammarId]);
                toast.success('✅ Gramer konusu öğrenildi');
            } else {
                toast.error('❌ İşlem başarısız');
            }
        } catch (error) {
            console.error('Mark grammar error:', error);
            toast.error('❌ Bağlantı hatası');
        }
    };

    const filteredWords = words.filter(word => {
        const matchesSearch = word.word?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            word.translation?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLevel = filterLevel === 'all' || word.level === filterLevel;
        const matchesKnown = !showKnownOnly || knownWords.includes(word.id);
        return matchesSearch && matchesLevel && matchesKnown;
    });

    const filteredGrammar = grammarTopics.filter(topic => {
        const matchesSearch = topic.topic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            topic.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLevel = filterLevel === 'all' || topic.level === filterLevel;
        const matchesKnown = !showKnownOnly || knownGrammar.includes(topic.id);
        return matchesSearch && matchesLevel && matchesKnown;
    });

    const getLevelBadgeClass = (level) => {
        const classes = {
            'beginner': 'level-beginner',
            'intermediate': 'level-intermediate',
            'advanced': 'level-advanced'
        };
        return classes[level] || '';
    };

    const getStats = () => {
        const totalWords = words.length;
        const knownCount = knownWords.length;
        const totalGrammar = grammarTopics.length;
        const knownGrammarCount = knownGrammar.length;

        return {
            vocabulary: {
                total: totalWords,
                known: knownCount,
                percentage: totalWords > 0 ? Math.round((knownCount / totalWords) * 100) : 0
            },
            grammar: {
                total: totalGrammar,
                known: knownGrammarCount,
                percentage: totalGrammar > 0 ? Math.round((knownGrammarCount / totalGrammar) * 100) : 0
            }
        };
    };

    const stats = getStats();

    return (
        <div className="english-learning-overlay" onClick={onClose}>
            <div className="english-learning-panel" onClick={e => e.stopPropagation()}>
                <div className="english-learning-header">
                    <h2>📚 English Learning</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                <div className="view-tabs">
                    <button 
                        className={view === 'vocabulary' ? 'active' : ''}
                        onClick={() => setView('vocabulary')}
                    >
                        📖 Vocabulary
                    </button>
                    <button 
                        className={view === 'grammar' ? 'active' : ''}
                        onClick={() => setView('grammar')}
                    >
                        ✍️ Grammar
                    </button>
                    <button 
                        className={view === 'stats' ? 'active' : ''}
                        onClick={() => setView('stats')}
                    >
                        📊 İstatistikler
                    </button>
                </div>

                {view !== 'stats' && (
                    <div className="filters-section">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="🔍 Ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        
                        <select 
                            className="level-filter"
                            value={filterLevel}
                            onChange={(e) => setFilterLevel(e.target.value)}
                        >
                            <option value="all">Tüm Seviyeler</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>

                        <label className="known-toggle">
                            <input
                                type="checkbox"
                                checked={showKnownOnly}
                                onChange={(e) => setShowKnownOnly(e.target.checked)}
                            />
                            Sadece bilinenler
                        </label>
                    </div>
                )}

                <div className="english-learning-content">
                    {loading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Yükleniyor...</p>
                        </div>
                    ) : view === 'vocabulary' ? (
                        <div className="vocabulary-grid">
                            {filteredWords.length === 0 ? (
                                <div className="empty-state">
                                    <p>📭 Kelime bulunamadı</p>
                                </div>
                            ) : (
                                filteredWords.map(word => (
                                    <div key={word.id} className={`word-card ${knownWords.includes(word.id) ? 'known' : ''}`}>
                                        <div className="word-header">
                                            <span className="word-english">{word.word}</span>
                                            <span className={`level-badge ${getLevelBadgeClass(word.level)}`}>
                                                {word.level}
                                            </span>
                                        </div>
                                        <div className="word-translation">{word.translation}</div>
                                        {word.phonetic && (
                                            <div className="word-phonetic">/{word.phonetic}/</div>
                                        )}
                                        {word.example && (
                                            <div className="word-example">
                                                <strong>Örnek:</strong> {word.example}
                                            </div>
                                        )}
                                        <div className="word-actions">
                                            {!knownWords.includes(word.id) ? (
                                                <button 
                                                    className="mark-known-btn"
                                                    onClick={() => markWordAsKnown(word.id)}
                                                >
                                                    ✓ Biliyorum
                                                </button>
                                            ) : (
                                                <div className="known-badge">✅ Bilinen</div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    ) : view === 'grammar' ? (
                        <div className="grammar-list">
                            {filteredGrammar.length === 0 ? (
                                <div className="empty-state">
                                    <p>📭 Gramer konusu bulunamadı</p>
                                </div>
                            ) : (
                                filteredGrammar.map(topic => (
                                    <div key={topic.id} className={`grammar-card ${knownGrammar.includes(topic.id) ? 'known' : ''}`}>
                                        <div className="grammar-header">
                                            <h3>{topic.topic}</h3>
                                            <span className={`level-badge ${getLevelBadgeClass(topic.level)}`}>
                                                {topic.level}
                                            </span>
                                        </div>
                                        <div className="grammar-description">{topic.description}</div>
                                        {topic.examples && topic.examples.length > 0 && (
                                            <div className="grammar-examples">
                                                <strong>Örnekler:</strong>
                                                <ul>
                                                    {topic.examples.map((ex, idx) => (
                                                        <li key={idx}>{ex}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        <div className="grammar-actions">
                                            {!knownGrammar.includes(topic.id) ? (
                                                <button 
                                                    className="mark-learned-btn"
                                                    onClick={() => markGrammarKnown(topic.id)}
                                                >
                                                    ✓ Öğrendim
                                                </button>
                                            ) : (
                                                <div className="learned-badge">✅ Öğrenildi</div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    ) : (
                        <div className="stats-view">
                            <div className="stats-grid">
                                <div className="stat-card vocabulary-stat">
                                    <div className="stat-icon">📖</div>
                                    <h3>Vocabulary</h3>
                                    <div className="stat-progress">
                                        <div className="progress-bar">
                                            <div 
                                                className="progress-fill"
                                                style={{ width: `${stats.vocabulary.percentage}%` }}
                                            ></div>
                                        </div>
                                        <div className="progress-text">
                                            {stats.vocabulary.known} / {stats.vocabulary.total} kelime
                                        </div>
                                    </div>
                                    <div className="stat-percentage">{stats.vocabulary.percentage}%</div>
                                </div>

                                <div className="stat-card grammar-stat">
                                    <div className="stat-icon">✍️</div>
                                    <h3>Grammar</h3>
                                    <div className="stat-progress">
                                        <div className="progress-bar">
                                            <div 
                                                className="progress-fill grammar"
                                                style={{ width: `${stats.grammar.percentage}%` }}
                                            ></div>
                                        </div>
                                        <div className="progress-text">
                                            {stats.grammar.known} / {stats.grammar.total} konu
                                        </div>
                                    </div>
                                    <div className="stat-percentage">{stats.grammar.percentage}%</div>
                                </div>
                            </div>

                            <div className="achievements-section">
                                <h3>🏆 Achievements</h3>
                                <div className="achievements-grid">
                                    <div className={`achievement ${stats.vocabulary.known >= 10 ? 'unlocked' : 'locked'}`}>
                                        <span className="achievement-icon">🌟</span>
                                        <span className="achievement-name">First 10 Words</span>
                                    </div>
                                    <div className={`achievement ${stats.vocabulary.known >= 50 ? 'unlocked' : 'locked'}`}>
                                        <span className="achievement-icon">💫</span>
                                        <span className="achievement-name">Vocabulary Builder</span>
                                    </div>
                                    <div className={`achievement ${stats.vocabulary.known >= 100 ? 'unlocked' : 'locked'}`}>
                                        <span className="achievement-icon">⭐</span>
                                        <span className="achievement-name">Word Master</span>
                                    </div>
                                    <div className={`achievement ${stats.grammar.known >= 5 ? 'unlocked' : 'locked'}`}>
                                        <span className="achievement-icon">📝</span>
                                        <span className="achievement-name">Grammar Novice</span>
                                    </div>
                                    <div className={`achievement ${stats.grammar.known >= 10 ? 'unlocked' : 'locked'}`}>
                                        <span className="achievement-icon">🎓</span>
                                        <span className="achievement-name">Grammar Expert</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EnglishLearningPanel;
