// frontend/src/components/ContextAwareAutocomplete.js

/**
 * 🤖 Context-Aware Autocomplete
 * AI-powered smart suggestions while typing
 */

import React, { useState, useEffect, useRef } from 'react';
import FaRobot from 'react-icons/fa/FaRobot';
import FaArrowUp from 'react-icons/fa/FaArrowUp';
import FaArrowDown from 'react-icons/fa/FaArrowDown';

const ContextAwareAutocomplete = ({
    inputValue,
    cursorPosition,
    conversationHistory = [],
    apiBaseUrl,
    fetchWithAuth,
    onSelect,
    enabled = true
}) => {
    const [suggestions, setSuggestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const debounceTimer = useRef(null);

    useEffect(() => {
        if (!enabled || !inputValue || inputValue.length < 3) {
            setVisible(false);
            return;
        }

        // Debounce API calls
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            fetchSuggestions();
        }, 300);

        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, [inputValue, cursorPosition, enabled]);

    const fetchSuggestions = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/ai/autocomplete/`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        input: inputValue,
                        cursor_position: cursorPosition,
                        context: conversationHistory.slice(-5) // Last 5 messages
                    })
                }
            );

            if (response.ok) {
                const data = await response.json();

                if (data.suggestions && data.suggestions.length > 0) {
                    setSuggestions(data.suggestions);
                    setSelectedIndex(0);
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            }
        } catch (error) {
            console.error('Autocomplete error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (!visible) return false;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev < suggestions.length - 1 ? prev + 1 : 0
                );
                return true;

            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev > 0 ? prev - 1 : suggestions.length - 1
                );
                return true;

            case 'Tab':
            case 'Enter':
                if (suggestions[selectedIndex]) {
                    e.preventDefault();
                    selectSuggestion(suggestions[selectedIndex]);
                    return true;
                }
                break;

            case 'Escape':
                e.preventDefault();
                setVisible(false);
                return true;
        }

        return false;
    };

    const selectSuggestion = (suggestion) => {
        onSelect(suggestion.text);
        setVisible(false);
    };

    if (!visible || suggestions.length === 0) return null;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <FaRobot style={styles.icon} />
                <span style={styles.headerText}>AI Önerileri</span>
                <span style={styles.hint}>Tab veya Enter ile seç</span>
            </div>

            <div style={styles.suggestionsList}>
                {suggestions.map((suggestion, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.suggestionItem,
                            backgroundColor: index === selectedIndex ? '#5865f2' : 'transparent'
                        }}
                        onClick={() => selectSuggestion(suggestion)}
                        onMouseEnter={() => setSelectedIndex(index)}
                    >
                        <div style={styles.suggestionContent}>
                            <span style={styles.suggestionText}>{suggestion.text}</span>
                            {suggestion.confidence && (
                                <span style={styles.confidence}>
                                    {Math.round(suggestion.confidence * 100)}%
                                </span>
                            )}
                        </div>

                        {suggestion.context && (
                            <span style={styles.context}>{suggestion.context}</span>
                        )}
                    </div>
                ))}
            </div>

            <div style={styles.footer}>
                <span style={styles.footerText}>
                    <FaArrowUp /> <FaArrowDown /> ile gezin • Tab/Enter ile seç
                </span>
            </div>
        </div>
    );
};

const styles = {
    container: {
        position: 'absolute',
        bottom: '100%',
        left: 0,
        right: 0,
        marginBottom: '8px',
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
        border: '1px solid #5865f2',
        overflow: 'hidden',
        zIndex: 1000,
        animation: 'slideUp 0.2s ease-out'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 12px',
        borderBottom: '1px solid #40444b',
        backgroundColor: '#36393f'
    },
    icon: {
        color: '#5865f2',
        fontSize: '14px'
    },
    headerText: {
        fontSize: '12px',
        fontWeight: '600',
        color: '#dcddde',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    hint: {
        marginLeft: 'auto',
        fontSize: '11px',
        color: '#72767d'
    },
    suggestionsList: {
        maxHeight: '200px',
        overflowY: 'auto'
    },
    suggestionItem: {
        padding: '10px 12px',
        cursor: 'pointer',
        transition: 'background-color 0.1s',
        borderBottom: '1px solid #40444b'
    },
    suggestionContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '4px'
    },
    suggestionText: {
        color: '#dcddde',
        fontSize: '14px',
        flex: 1
    },
    confidence: {
        fontSize: '11px',
        color: '#72767d',
        backgroundColor: '#40444b',
        padding: '2px 6px',
        borderRadius: '10px',
        marginLeft: '8px'
    },
    context: {
        fontSize: '11px',
        color: '#72767d',
        fontStyle: 'italic'
    },
    footer: {
        padding: '8px 12px',
        borderTop: '1px solid #40444b',
        backgroundColor: '#36393f',
        textAlign: 'center'
    },
    footerText: {
        fontSize: '10px',
        color: '#72767d',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px'
    }
};

// CSS Animation
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
    document.head.appendChild(styleSheet);
}

export { ContextAwareAutocomplete };
export default ContextAwareAutocomplete;


