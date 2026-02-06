// frontend/src/components/TranslationSuggestionsPanel.js - Translation Suggestions Management
import React, { useState, useEffect } from 'react';
import {
    FaLanguage, FaTimes, FaPlus, FaCheck, FaTimes as FaReject,
    FaSearch, FaGlobe, FaUser, FaClock, FaEdit, FaTrash,
    FaThumbsUp, FaThumbsDown, FaFlag, FaFilter
} from 'react-icons/fa';
import toast from '../utils/toast';
import './TranslationSuggestionsPanel.css';

const TranslationSuggestionsPanel = ({ apiBaseUrl, onClose }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('pending'); // 'all', 'pending', 'approved', 'rejected'
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestModal, setShowSuggestModal] = useState(false);
    const [languages, setLanguages] = useState([]);

    const [newSuggestion, setNewSuggestion] = useState({
        key: '',
        language: 'tr',
        original_text: '',
        suggested_text: '',
        context: ''
    });

    const availableLanguages = [
        { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'pt', name: 'Português', flag: '🇵🇹' },
        { code: 'ru', name: 'Русский', flag: '🇷🇺' },
        { code: 'ja', name: '日本語', flag: '🇯🇵' },
        { code: 'ko', name: '한국어', flag: '🇰🇷' },
        { code: 'zh', name: '中文', flag: '🇨🇳' }
    ];

    useEffect(() => {
        fetchSuggestions();
    }, [activeFilter]);

    const fetchSuggestions = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/translations/suggestions/?status=${activeFilter}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setSuggestions(data.suggestions || []);
            }
        } catch (error) {
            console.error('Fetch suggestions error:', error);
        } finally {
            setLoading(false);
        }
    };

    const submitSuggestion = async () => {
        if (!newSuggestion.key.trim() || !newSuggestion.suggested_text.trim()) {
            toast.error('Anahtar ve öneri metni gerekli');
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/translations/suggest/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newSuggestion)
            });

            if (response.ok) {
                toast.success('🌐 Çeviri önerisi gönderildi');
                fetchSuggestions();
                setShowSuggestModal(false);
                setNewSuggestion({
                    key: '',
                    language: 'tr',
                    original_text: '',
                    suggested_text: '',
                    context: ''
                });
            }
        } catch (error) {
            console.error('Submit suggestion error:', error);
        }
    };

    const approveSuggestion = async (suggestionId) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/translations/${suggestionId}/approve/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('✅ Çeviri onaylandı');
                setSuggestions(prev => prev.map(s =>
                    s.id === suggestionId ? { ...s, status: 'approved' } : s
                ));
            }
        } catch (error) {
            console.error('Approve error:', error);
        }
    };

    const rejectSuggestion = async (suggestionId, reason) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/translations/${suggestionId}/reject/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ reason })
            });

            if (response.ok) {
                toast.success('❌ Çeviri reddedildi');
                setSuggestions(prev => prev.map(s =>
                    s.id === suggestionId ? { ...s, status: 'rejected' } : s
                ));
            }
        } catch (error) {
            console.error('Reject error:', error);
        }
    };

    const voteSuggestion = async (suggestionId, vote) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/translations/${suggestionId}/vote/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ vote }) // 'up' or 'down'
            });

            if (response.ok) {
                fetchSuggestions();
            }
        } catch (error) {
            console.error('Vote error:', error);
        }
    };

    const deleteSuggestion = async (suggestionId) => {
        if (!window.confirm('Bu öneriyi silmek istiyor musunuz?')) return;

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/translations/${suggestionId}/delete/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('🗑️ Öneri silindi');
                setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const getLanguageInfo = (code) => {
        return availableLanguages.find(l => l.code === code) || { code, name: code, flag: '🌐' };
    };

    const filteredSuggestions = suggestions.filter(s =>
        s.key?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.suggested_text?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.original_text?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const stats = {
        pending: suggestions.filter(s => s.status === 'pending').length,
        approved: suggestions.filter(s => s.status === 'approved').length,
        rejected: suggestions.filter(s => s.status === 'rejected').length
    };

    return (
        <div className="translation-suggestions-overlay" onClick={onClose}>
            <div className="translation-suggestions-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <h2><FaLanguage /> Çeviri Önerileri</h2>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="stats-bar">
                    <div className="stat pending">
                        <span className="stat-value">{stats.pending}</span>
                        <span className="stat-label">Bekleyen</span>
                    </div>
                    <div className="stat approved">
                        <span className="stat-value">{stats.approved}</span>
                        <span className="stat-label">Onaylanan</span>
                    </div>
                    <div className="stat rejected">
                        <span className="stat-value">{stats.rejected}</span>
                        <span className="stat-label">Reddedilen</span>
                    </div>
                </div>

                <div className="toolbar">
                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Çeviri ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="filter-tabs">
                        {['all', 'pending', 'approved', 'rejected'].map(filter => (
                            <button
                                key={filter}
                                className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
                                onClick={() => setActiveFilter(filter)}
                            >
                                {filter === 'all' && 'Tümü'}
                                {filter === 'pending' && 'Bekleyen'}
                                {filter === 'approved' && 'Onaylanan'}
                                {filter === 'rejected' && 'Reddedilen'}
                            </button>
                        ))}
                    </div>
                    <button className="suggest-btn" onClick={() => setShowSuggestModal(true)}>
                        <FaPlus /> Öneri Gönder
                    </button>
                </div>

                <div className="panel-content">
                    {loading ? (
                        <div className="loading">Yükleniyor...</div>
                    ) : filteredSuggestions.length === 0 ? (
                        <div className="empty-state">
                            <FaLanguage />
                            <p>Çeviri önerisi bulunmuyor</p>
                        </div>
                    ) : (
                        <div className="suggestions-list">
                            {filteredSuggestions.map(suggestion => (
                                <SuggestionCard
                                    key={suggestion.id}
                                    suggestion={suggestion}
                                    getLanguageInfo={getLanguageInfo}
                                    onApprove={() => approveSuggestion(suggestion.id)}
                                    onReject={(reason) => rejectSuggestion(suggestion.id, reason)}
                                    onVote={(vote) => voteSuggestion(suggestion.id, vote)}
                                    onDelete={() => deleteSuggestion(suggestion.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {showSuggestModal && (
                    <SuggestModal
                        suggestion={newSuggestion}
                        setSuggestion={setNewSuggestion}
                        languages={availableLanguages}
                        onSubmit={submitSuggestion}
                        onClose={() => setShowSuggestModal(false)}
                    />
                )}
            </div>
        </div>
    );
};

// Suggestion Card
const SuggestionCard = ({ suggestion, getLanguageInfo, onApprove, onReject, onVote, onDelete }) => {
    const [showRejectInput, setShowRejectInput] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const lang = getLanguageInfo(suggestion.language);

    const handleReject = () => {
        onReject(rejectReason);
        setShowRejectInput(false);
        setRejectReason('');
    };

    return (
        <div className={`suggestion-card ${suggestion.status}`}>
            <div className="suggestion-header">
                <div className="language-badge">
                    <span className="flag">{lang.flag}</span>
                    <span className="lang-name">{lang.name}</span>
                </div>
                <span className={`status-badge ${suggestion.status}`}>
                    {suggestion.status === 'pending' && 'Bekliyor'}
                    {suggestion.status === 'approved' && 'Onaylandı'}
                    {suggestion.status === 'rejected' && 'Reddedildi'}
                </span>
            </div>

            <div className="suggestion-key">
                <span className="key-label">Anahtar:</span>
                <code>{suggestion.key}</code>
            </div>

            <div className="translation-comparison">
                {suggestion.original_text && (
                    <div className="original">
                        <span className="label">Orijinal:</span>
                        <p>{suggestion.original_text}</p>
                    </div>
                )}
                <div className="suggested">
                    <span className="label">Öneri:</span>
                    <p>{suggestion.suggested_text}</p>
                </div>
            </div>

            {suggestion.context && (
                <div className="suggestion-context">
                    <span className="context-label">Bağlam:</span>
                    <span>{suggestion.context}</span>
                </div>
            )}

            <div className="suggestion-meta">
                <span className="author">
                    <FaUser /> {suggestion.author?.username || 'Anonim'}
                </span>
                <span className="time">
                    <FaClock /> {new Date(suggestion.created_at).toLocaleDateString('tr-TR')}
                </span>
            </div>

            <div className="suggestion-actions">
                <div className="vote-buttons">
                    <button
                        className={`vote-btn up ${suggestion.user_vote === 'up' ? 'voted' : ''}`}
                        onClick={() => onVote('up')}
                    >
                        <FaThumbsUp /> {suggestion.upvotes || 0}
                    </button>
                    <button
                        className={`vote-btn down ${suggestion.user_vote === 'down' ? 'voted' : ''}`}
                        onClick={() => onVote('down')}
                    >
                        <FaThumbsDown /> {suggestion.downvotes || 0}
                    </button>
                </div>

                {suggestion.status === 'pending' && (
                    <div className="admin-actions">
                        <button className="approve-btn" onClick={onApprove}>
                            <FaCheck /> Onayla
                        </button>
                        {!showRejectInput ? (
                            <button className="reject-btn" onClick={() => setShowRejectInput(true)}>
                                <FaReject /> Reddet
                            </button>
                        ) : (
                            <div className="reject-input">
                                <input
                                    type="text"
                                    placeholder="Red nedeni..."
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                />
                                <button onClick={handleReject}><FaCheck /></button>
                                <button onClick={() => setShowRejectInput(false)}><FaTimes /></button>
                            </div>
                        )}
                    </div>
                )}

                <button className="delete-btn" onClick={onDelete}>
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

// Suggest Modal
const SuggestModal = ({ suggestion, setSuggestion, languages, onSubmit, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="suggest-modal" onClick={e => e.stopPropagation()}>
                <h3><FaLanguage /> Çeviri Önerisi Gönder</h3>

                <div className="form-row">
                    <div className="form-group">
                        <label>Çeviri Anahtarı *</label>
                        <input
                            type="text"
                            value={suggestion.key}
                            onChange={(e) => setSuggestion(prev => ({ ...prev, key: e.target.value }))}
                            placeholder="örn: messages.welcome_text"
                        />
                    </div>
                    <div className="form-group">
                        <label>Dil</label>
                        <select
                            value={suggestion.language}
                            onChange={(e) => setSuggestion(prev => ({ ...prev, language: e.target.value }))}
                        >
                            {languages.map(lang => (
                                <option key={lang.code} value={lang.code}>
                                    {lang.flag} {lang.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label>Orijinal Metin</label>
                    <textarea
                        value={suggestion.original_text}
                        onChange={(e) => setSuggestion(prev => ({ ...prev, original_text: e.target.value }))}
                        placeholder="Değiştirilmek istenen orijinal metin..."
                        rows="2"
                    />
                </div>

                <div className="form-group">
                    <label>Önerilen Çeviri *</label>
                    <textarea
                        value={suggestion.suggested_text}
                        onChange={(e) => setSuggestion(prev => ({ ...prev, suggested_text: e.target.value }))}
                        placeholder="Önerdiğiniz çeviri..."
                        rows="3"
                    />
                </div>

                <div className="form-group">
                    <label>Bağlam (İsteğe Bağlı)</label>
                    <input
                        type="text"
                        value={suggestion.context}
                        onChange={(e) => setSuggestion(prev => ({ ...prev, context: e.target.value }))}
                        placeholder="Bu metin nerede kullanılıyor?"
                    />
                </div>

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>İptal</button>
                    <button className="submit-btn" onClick={onSubmit}>
                        <FaPlus /> Öneri Gönder
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TranslationSuggestionsPanel;
