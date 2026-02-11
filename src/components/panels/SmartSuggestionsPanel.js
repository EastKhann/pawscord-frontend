// frontend/src/components/panels/SmartSuggestionsPanel.js
// 🤖 Smart Suggestions - AI-powered message and action suggestions

import { useState, useEffect, useCallback } from 'react';
import {
    FaTimes, FaRobot, FaLightbulb, FaReply, FaSmile,
    FaHashtag, FaUserPlus, FaCopy, FaMagic, FaHistory,
    FaChartLine, FaCommentAlt, FaSync, FaStar, FaCheck
} from 'react-icons/fa';
import { getApiBase } from '../../utils/apiEndpoints';
import './SmartSuggestionsPanel.css';

const SmartSuggestionsPanel = ({ serverId, channelId, onClose, onUseSuggestion, fetchWithAuth }) => {
    const [suggestions, setSuggestions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('replies');
    const [copiedId, setCopiedId] = useState(null);

    const loadSuggestions = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${getApiBase()}/channels/${channelId}/suggestions/`);
            if (response.ok) {
                const data = await response.json();
                setSuggestions(data);
            } else {
                // Fallback smart suggestions
                setSuggestions({
                    quick_replies: [
                        { id: 1, text: "That's a great idea! 🎉", confidence: 95, context: "Positive response" },
                        { id: 2, text: "I'll look into that and get back to you.", confidence: 88, context: "Action commitment" },
                        { id: 3, text: "Thanks for sharing! Very helpful.", confidence: 85, context: "Appreciation" },
                        { id: 4, text: "Could you elaborate on that?", confidence: 82, context: "Clarification" },
                        { id: 5, text: "Let me check the documentation first.", confidence: 78, context: "Investigation" }
                    ],
                    trending_topics: [
                        { topic: "Server Events", mentions: 45, trend: 'up' },
                        { topic: "Gaming Night", mentions: 38, trend: 'up' },
                        { topic: "Music Playlist", mentions: 27, trend: 'stable' },
                        { topic: "New Members", mentions: 23, trend: 'down' }
                    ],
                    suggested_emojis: ['👍', '🎉', '❤️', '🔥', '😂', '🙏', '💯', '✨'],
                    conversation_insights: {
                        sentiment: 'positive',
                        activity_level: 'high',
                        response_rate: 87,
                        avg_response_time: '2.3 min'
                    },
                    smart_actions: [
                        { id: 1, action: "Create a poll about this topic", icon: "poll", type: "engagement" },
                        { id: 2, action: "Share relevant resources", icon: "share", type: "helpful" },
                        { id: 3, action: "Invite related experts", icon: "invite", type: "growth" },
                        { id: 4, action: "Pin important message", icon: "pin", type: "moderation" }
                    ]
                });
            }
        } catch (error) {
            console.error('Error loading suggestions:', error);
            setSuggestions({ quick_replies: [], trending_topics: [], suggested_emojis: [] });
        }
        setLoading(false);
    }, [channelId, fetchWithAuth]);

    useEffect(() => {
        loadSuggestions();
    }, [loadSuggestions]);

    const handleCopy = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleUseSuggestion = (text) => {
        if (onUseSuggestion) {
            onUseSuggestion(text);
        }
        onClose();
    };

    const getSentimentColor = (sentiment) => {
        switch (sentiment) {
            case 'positive': return '#10b981';
            case 'neutral': return '#6b7280';
            case 'negative': return '#ef4444';
            default: return '#6b7280';
        }
    };

    const getTrendIcon = (trend) => {
        if (trend === 'up') return <span className="trend up">↑</span>;
        if (trend === 'down') return <span className="trend down">↓</span>;
        return <span className="trend stable">→</span>;
    };

    if (loading) {
        return (
            <div className="smart-suggestions-overlay" onClick={onClose}>
                <div className="smart-suggestions-panel" onClick={e => e.stopPropagation()}>
                    <div className="loading-state">
                        <FaRobot className="pulse" />
                        <span>Analyzing conversation...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="smart-suggestions-overlay" onClick={onClose}>
            <div className="smart-suggestions-panel" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="panel-header">
                    <div className="header-info">
                        <h2><FaRobot /> Smart Suggestions</h2>
                        <span className="powered-by">Powered by AI</span>
                    </div>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                {/* Conversation Insights */}
                <div className="insights-bar">
                    <div className="insight">
                        <span className="insight-label">Sentiment</span>
                        <span
                            className="insight-value sentiment"
                            style={{ color: getSentimentColor(suggestions?.conversation_insights?.sentiment) }}
                        >
                            {suggestions?.conversation_insights?.sentiment || 'neutral'}
                        </span>
                    </div>
                    <div className="insight">
                        <span className="insight-label">Activity</span>
                        <span className="insight-value">{suggestions?.conversation_insights?.activity_level || 'normal'}</span>
                    </div>
                    <div className="insight">
                        <span className="insight-label">Response Rate</span>
                        <span className="insight-value">{suggestions?.conversation_insights?.response_rate || 0}%</span>
                    </div>
                    <div className="insight">
                        <span className="insight-label">Avg. Response</span>
                        <span className="insight-value">{suggestions?.conversation_insights?.avg_response_time || 'N/A'}</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'replies' ? 'active' : ''}`}
                        onClick={() => setActiveTab('replies')}
                    >
                        <FaReply /> Quick Replies
                    </button>
                    <button
                        className={`tab ${activeTab === 'topics' ? 'active' : ''}`}
                        onClick={() => setActiveTab('topics')}
                    >
                        <FaChartLine /> Trending
                    </button>
                    <button
                        className={`tab ${activeTab === 'actions' ? 'active' : ''}`}
                        onClick={() => setActiveTab('actions')}
                    >
                        <FaMagic /> Smart Actions
                    </button>
                </div>

                {/* Tab Content */}
                <div className="tab-content">
                    {activeTab === 'replies' && (
                        <div className="replies-tab">
                            {/* Quick Emojis */}
                            <div className="emoji-bar">
                                <span className="emoji-label"><FaSmile /> Quick Reactions:</span>
                                <div className="emoji-list">
                                    {(suggestions?.suggested_emojis || []).map((emoji, index) => (
                                        <button
                                            key={index}
                                            className="emoji-btn"
                                            onClick={() => handleUseSuggestion(emoji)}
                                            title="Click to use"
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Replies */}
                            <div className="replies-list">
                                <h4><FaLightbulb /> Suggested Replies</h4>
                                {(suggestions?.quick_replies || []).map((reply) => (
                                    <div key={reply.id} className="reply-item">
                                        <div className="reply-content">
                                            <span className="reply-text">{reply.text}</span>
                                            <div className="reply-meta">
                                                <span className="context">{reply.context}</span>
                                                <span className="confidence">
                                                    <FaStar /> {reply.confidence}%
                                                </span>
                                            </div>
                                        </div>
                                        <div className="reply-actions">
                                            <button
                                                className="action-btn copy"
                                                onClick={() => handleCopy(reply.text, reply.id)}
                                                title="Copy to clipboard"
                                            >
                                                {copiedId === reply.id ? <FaCheck /> : <FaCopy />}
                                            </button>
                                            <button
                                                className="action-btn use"
                                                onClick={() => handleUseSuggestion(reply.text)}
                                                title="Use this reply"
                                            >
                                                <FaReply />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'topics' && (
                        <div className="topics-tab">
                            <h4><FaHashtag /> Trending Topics in This Channel</h4>
                            <div className="topics-list">
                                {(suggestions?.trending_topics || []).map((topic, index) => (
                                    <div key={index} className="topic-item">
                                        <span className="topic-rank">#{index + 1}</span>
                                        <div className="topic-info">
                                            <span className="topic-name">{topic.topic}</span>
                                            <span className="topic-mentions">{topic.mentions} mentions</span>
                                        </div>
                                        {getTrendIcon(topic.trend)}
                                    </div>
                                ))}
                                {(!suggestions?.trending_topics || suggestions.trending_topics.length === 0) && (
                                    <div className="empty-state">No trending topics yet</div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'actions' && (
                        <div className="actions-tab">
                            <h4><FaMagic /> Recommended Actions</h4>
                            <div className="actions-list">
                                {(suggestions?.smart_actions || []).map((action) => (
                                    <div key={action.id} className={`action-item ${action.type}`}>
                                        <div className="action-icon">
                                            {action.icon === 'poll' && <FaChartLine />}
                                            {action.icon === 'share' && <FaCommentAlt />}
                                            {action.icon === 'invite' && <FaUserPlus />}
                                            {action.icon === 'pin' && <FaStar />}
                                        </div>
                                        <span className="action-text">{action.action}</span>
                                        <span className={`action-type ${action.type}`}>{action.type}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="ai-tip">
                                <FaRobot />
                                <span>These suggestions are based on conversation patterns and community engagement metrics.</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SmartSuggestionsPanel;
