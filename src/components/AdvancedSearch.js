// components/AdvancedSearch.js
// 🔍 Advanced Search Panel - Power User Feature

import { useState, useEffect, useMemo } from 'react';
import { FaSearch, FaTimes, FaFilter, FaCalendar, FaUser, FaFile, FaHeart } from 'react-icons/fa';
import './AdvancedSearch.css';

const AdvancedSearch = ({
  messages = [],
  onClose,
  onSelectMessage,
  allUsers = []
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    user: '',
    dateFrom: '',
    dateTo: '',
    fileType: '',
    hasReaction: false,
    hasMention: false,
    hasFile: false,
    hasImage: false
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('pawscord-search-history');
    return saved ? JSON.parse(saved) : [];
  });

  // Fuzzy search function
  const fuzzyMatch = (text, query) => {
    if (!text || !query) return false;
    text = text.toLowerCase();
    query = query.toLowerCase();

    // Exact match
    if (text.includes(query)) return true;

    // Fuzzy match (allows typos)
    let queryIndex = 0;
    for (let i = 0; i < text.length && queryIndex < query.length; i++) {
      if (text[i] === query[queryIndex]) {
        queryIndex++;
      }
    }
    return queryIndex === query.length;
  };

  // Filter and search messages
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() && !Object.values(filters).some(f => f)) {
      return [];
    }

    let results = messages;

    // Text search (fuzzy)
    if (searchQuery.trim()) {
      results = results.filter(msg =>
        fuzzyMatch(msg.content, searchQuery) ||
        fuzzyMatch(msg.username, searchQuery)
      );
    }

    // Filter by user
    if (filters.user) {
      results = results.filter(msg =>
        msg.username?.toLowerCase() === filters.user.toLowerCase()
      );
    }

    // Filter by date range
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      results = results.filter(msg => {
        const msgDate = new Date(msg.timestamp || msg.created_at);
        return msgDate >= fromDate;
      });
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999); // End of day
      results = results.filter(msg => {
        const msgDate = new Date(msg.timestamp || msg.created_at);
        return msgDate <= toDate;
      });
    }

    // Filter by file type
    if (filters.hasFile) {
      results = results.filter(msg => msg.file_url || msg.file);
    }

    if (filters.hasImage) {
      results = results.filter(msg => msg.image_url || msg.image);
    }

    // Filter by reactions
    if (filters.hasReaction) {
      results = results.filter(msg =>
        msg.reactions && msg.reactions.length > 0
      );
    }

    // Sort by relevance (newest first)
    return results.sort((a, b) => {
      const dateA = new Date(a.timestamp || a.created_at);
      const dateB = new Date(b.timestamp || b.created_at);
      return dateB - dateA;
    });
  }, [searchQuery, filters, messages]);

  // Save to history
  const saveToHistory = (query) => {
    if (!query.trim()) return;

    const newHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('pawscord-search-history', JSON.stringify(newHistory));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    saveToHistory(searchQuery);
  };

  const handleSelectMessage = (msg) => {
    onSelectMessage(msg);
    onClose();
  };

  const clearFilters = () => {
    setFilters({
      user: '',
      dateFrom: '',
      dateTo: '',
      fileType: '',
      hasReaction: false,
      hasMention: false,
      hasFile: false,
      hasImage: false
    });
  };

  return (
    <div className="advanced-search-overlay" onClick={onClose}>
      <div className="advanced-search-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="search-header">
          <h2>🔍 Gelişmiş Arama</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="search-form">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Mesajlarda ara... (Ctrl+F)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            autoFocus
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-btn"
              onClick={() => setSearchQuery('')}
            >
              <FaTimes />
            </button>
          )}
        </form>

        {/* Filter Toggle */}
        <div className="filter-toggle">
          <button
            className={`filter-btn ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filtreler
          </button>
          {Object.values(filters).some(f => f) && (
            <button className="clear-filters-btn" onClick={clearFilters}>
              Filtreleri Temizle
            </button>
          )}
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="filters-panel">
            <div className="filter-row">
              <label>
                <FaUser /> Kullanıcı:
                <select
                  value={filters.user}
                  onChange={(e) => setFilters({...filters, user: e.target.value})}
                >
                  <option value="">Tümü</option>
                  {[...new Set(messages.map(m => m.username))].map(user => (
                    <option key={user} value={user}>{user}</option>
                  ))}
                </select>
              </label>

              <label>
                <FaCalendar /> Başlangıç:
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                />
              </label>

              <label>
                <FaCalendar /> Bitiş:
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                />
              </label>
            </div>

            <div className="filter-row checkboxes">
              <label>
                <input
                  type="checkbox"
                  checked={filters.hasFile}
                  onChange={(e) => setFilters({...filters, hasFile: e.target.checked})}
                />
                <FaFile /> Dosya içerenler
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={filters.hasImage}
                  onChange={(e) => setFilters({...filters, hasImage: e.target.checked})}
                />
                🖼️ Resim içerenler
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={filters.hasReaction}
                  onChange={(e) => setFilters({...filters, hasReaction: e.target.checked})}
                />
                <FaHeart /> Reaction alanlar
              </label>
            </div>
          </div>
        )}

        {/* Search History */}
        {!searchQuery && searchHistory.length > 0 && (
          <div className="search-history">
            <h4>Son Aramalar:</h4>
            <div className="history-items">
              {searchHistory.map((query, index) => (
                <button
                  key={index}
                  className="history-item"
                  onClick={() => setSearchQuery(query)}
                >
                  <FaSearch /> {query}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        <div className="search-results">
          {searchQuery || Object.values(filters).some(f => f) ? (
            <>
              <div className="results-header">
                {searchResults.length} sonuç bulundu
              </div>
              {searchResults.length > 0 ? (
                <div className="results-list">
                  {searchResults.map((msg) => (
                    <div
                      key={msg.id}
                      className="result-item"
                      onClick={() => handleSelectMessage(msg)}
                    >
                      <div className="result-user">{msg.username}</div>
                      <div className="result-content">
                        {msg.content?.substring(0, 200)}
                        {msg.content?.length > 200 && '...'}
                      </div>
                      <div className="result-meta">
                        <span className="result-date">
                          {new Date(msg.timestamp || msg.created_at).toLocaleString('tr-TR')}
                        </span>
                        {msg.image_url && <span className="result-badge">🖼️</span>}
                        {msg.file_url && <span className="result-badge">📎</span>}
                        {msg.reactions?.length > 0 && (
                          <span className="result-badge">❤️ {msg.reactions.length}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <FaSearch size={48} />
                  <p>Sonuç bulunamadı</p>
                  <small>Farklı anahtar kelimeler veya filtreler deneyin</small>
                </div>
              )}
            </>
          ) : (
            <div className="search-placeholder">
              <FaSearch size={64} />
              <h3>Mesajlarda Ara</h3>
              <p>Kullanıcı adı, mesaj içeriği veya filtreler kullanarak arayın</p>
              <div className="shortcut-hint">
                <kbd>Ctrl</kbd> + <kbd>F</kbd>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;



