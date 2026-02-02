// components/QuickSwitcher.js
// ⚡ Quick Switcher - Ctrl+K Feature

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { FaSearch, FaTimes, FaHashtag, FaAt } from 'react-icons/fa';
import './QuickSwitcher.css';

const QuickSwitcher = ({
  onClose,
  onNavigate,
  channels = [],
  users = [],
  conversations = []
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Fuzzy search
  const fuzzyMatch = (text, query) => {
    if (!text || !query) return false;
    text = text.toLowerCase();
    query = query.toLowerCase();

    if (text.includes(query)) return true;

    let queryIndex = 0;
    for (let i = 0; i < text.length && queryIndex < query.length; i++) {
      if (text[i] === query[queryIndex]) {
        queryIndex++;
      }
    }
    return queryIndex === query.length;
  };

  const results = useMemo(() => {
    if (!query.trim()) {
      // Recent items
      return [
        ...channels.slice(0, 5).map(c => ({ type: 'channel', ...c })),
        ...users.slice(0, 5).map(u => ({ type: 'user', ...u })),
        ...conversations.slice(0, 5).map(c => ({ type: 'dm', ...c }))
      ].slice(0, 10);
    }

    const allItems = [
      ...channels.map(c => ({ type: 'channel', ...c, searchText: c.name })),
      ...users.map(u => ({ type: 'user', ...u, searchText: u.username })),
      ...conversations.map(c => ({ type: 'dm', ...c, searchText: c.target_user }))
    ];

    return allItems
      .filter(item => fuzzyMatch(item.searchText, query))
      .slice(0, 10);
  }, [query, channels, users, conversations]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleSelect = (item) => {
    onNavigate(item);
    onClose();
  };

  return (
    <div className="quick-switcher-overlay" onClick={onClose}>
      <div className="quick-switcher-panel" onClick={(e) => e.stopPropagation()}>
        <div className="quick-switcher-search">
          <FaSearch className="search-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Kanal veya kullanıcı ara... (Ctrl+K)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="search-input"
          />
          {query && (
            <button className="clear-btn" onClick={() => setQuery('')}>
              <FaTimes />
            </button>
          )}
        </div>

        <div className="quick-switcher-results">
          {results.length > 0 ? (
            results.map((item, index) => (
              <div
                key={`${item.type}-${item.id || item.username}`}
                className={`quick-result-item ${index === selectedIndex ? 'selected' : ''}`}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="result-icon">
                  {item.type === 'channel' && <FaHashtag />}
                  {item.type === 'user' && <FaAt />}
                  {item.type === 'dm' && <FaAt />}
                </div>
                <div className="result-content">
                  <div className="result-name">
                    {item.type === 'channel' && item.name}
                    {item.type === 'user' && item.username}
                    {item.type === 'dm' && item.target_user}
                  </div>
                  <div className="result-type">
                    {item.type === 'channel' && 'Kanal'}
                    {item.type === 'user' && 'Kullanıcı'}
                    {item.type === 'dm' && 'Direkt Mesaj'}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <FaSearch size={32} />
              <p>Sonuç bulunamadı</p>
            </div>
          )}
        </div>

        <div className="quick-switcher-footer">
          <div className="shortcut-hints">
            <span><kbd>↑↓</kbd> Gezin</span>
            <span><kbd>Enter</kbd> Seç</span>
            <span><kbd>Esc</kbd> Kapat</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(QuickSwitcher);



