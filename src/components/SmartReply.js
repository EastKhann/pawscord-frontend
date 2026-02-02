// frontend/src/components/SmartReply.js

/**
 * 🤖 Smart Reply - AI Powered Quick Responses
 * Gmail-style smart reply suggestions
 */

import React, { useState, useEffect } from 'react';
import FaRobot from 'react-icons/fa/FaRobot';
import FaSpinner from 'react-icons/fa/FaSpinner';

const SmartReply = ({
    messageId,
    messageContent,
    onSelectReply,
    apiBaseUrl,
    fetchWithAuth,
    disabled = false
}) => {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (messageId && messageContent) {
            loadSuggestions();
        }
    }, [messageId, messageContent]);

    const loadSuggestions = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/ai/smart-reply/`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message_id: messageId,
                        content: messageContent
                    })
                }
            );

            if (response.ok) {
                const data = await response.json();
                setSuggestions(data.suggestions || []);
                setVisible(data.suggestions?.length > 0);
            }
        } catch (error) {
            console.error('Smart reply error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReplyClick = (reply) => {
        onSelectReply(reply);
        setVisible(false);
    };

    if (!visible || disabled) return null;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <FaRobot style={styles.icon} />
                <span style={styles.title}>Önerilen Yanıtlar</span>
            </div>

            {loading ? (
                <div style={styles.loading}>
                    <FaSpinner className="fa-spin" />
                    <span style={{ marginLeft: '8px' }}>Öneriler yükleniyor...</span>
                </div>
            ) : (
                <div style={styles.suggestionsGrid}>
                    {suggestions.map((suggestion, index) => (
                        <button
                            key={index}
                            onClick={() => handleReplyClick(suggestion)}
                            style={styles.suggestionButton}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#5865f2';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#4752c4';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        padding: '12px',
        marginTop: '8px',
        border: '1px solid #40444b',
        animation: 'slideIn 0.3s ease-out'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        color: '#dcddde'
    },
    icon: {
        color: '#5865f2',
        marginRight: '8px',
        fontSize: '14px'
    },
    title: {
        fontSize: '12px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    loading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px',
        color: '#b9bbbe',
        fontSize: '13px'
    },
    suggestionsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '8px'
    },
    suggestionButton: {
        backgroundColor: '#4752c4',
        color: '#ffffff',
        border: 'none',
        borderRadius: '6px',
        padding: '10px 14px',
        fontSize: '13px',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.2s ease',
        fontWeight: '500',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
};

export default SmartReply;


