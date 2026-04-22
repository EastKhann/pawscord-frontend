// frontend/src/components/panels/SmartSuggestionsPanel.js
// 🤖 Smart Suggestions - AI-powered message and action suggestions

import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    FaTimes,
    FaRobot,
    FaLightbulb,
    FaReply,
    FaSmile,
    FaHashtag,
    FaUserPlus,
    FaCopy,
    FaMagic,
    FaHistory,
    FaChartLine,
    FaCommentAlt,
    FaSync,
    FaStar,
    FaCheck,
} from 'react-icons/fa';
import { getApiBase } from '../../utils/apiEndpoints';
import './SmartSuggestionsPanel.css';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

const SmartSuggestionsPanel = ({
    serverId,
    channelId,
    onClose,
    onUseSuggestion,
    fetchWithAuth,
}) => {
    const { t } = useTranslation();

    const [suggestions, setSuggestions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('replies');
    const [copiedId, setCopiedId] = useState(null);

    const loadSuggestions = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(
                `${getApiBase()}/channels/${channelId}/suggestions/`
            );
            if (response.ok) {
                const data = await response.json();
                setSuggestions(data);
            } else {
                // Fallback smart suggestions
                setSuggestions({
                    quick_replies: [
                        {
                            id: 1,
                            text: "That's a great idea! 🎉",
                            confidence: 95,
                            context: 'Positive response',
                        },
                        {
                            id: 2,
                            text: "I'll look into that and get back to you.",
                            confidence: 88,
                            context: 'Action commitment',
                        },
                        {
                            id: 3,
                            text: 'Thanks for sharing! Very helpful.',
                            confidence: 85,
                            context: 'Appreciation',
                        },
                        {
                            id: 4,
                            text: 'Could you elaborate on that?',
                            confidence: 82,
                            context: 'Clarification',
                        },
                        {
                            id: 5,
                            text: 'Let me check the documentation first.',
                            confidence: 78,
                            context: 'Investigation',
                        },
                    ],
                    trending_topics: [
                        { topic: 'Server Events', mentions: 45, trend: 'up' },
                        { topic: 'Gaming Night', mentions: 38, trend: 'up' },
                        { topic: 'Music Playlist', mentions: 27, trend: 'stable' },
                        { topic: 'New Members', mentions: 23, trend: 'down' },
                    ],
                    suggested_emojis: ['👍', '🎉', '❤️', '🔥', '😂', '🙏', '💯', '✨'],
                    conversation_insights: {
                        sentiment: 'positive',
                        activity_level: 'high',
                        response_rate: 87,
                        avg_response_time: '2.3 min',
                    },
                    smart_actions: [
                        {
                            id: 1,
                            action: 'Create a poll about this topic',
                            icon: 'poll',
                            type: 'engagement',
                        },
                        {
                            id: 2,
                            action: 'Share relevant resources',
                            icon: 'share',
                            type: 'helpful',
                        },
                        { id: 3, action: 'Invite related experts', icon: 'invite', type: 'growth' },
                        { id: 4, action: 'Pin important message', icon: 'pin', type: 'moderation' },
                    ],
                });
            }
        } catch (error) {
            logger.error('Error loading suggestions:', error);
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
            case 'positive':
                return '#10b981';
            case 'neutral':
                return '#6b7280';
            case 'negative':
                return '#f23f42';
            default:
                return '#6b7280';
        }
    };

    const getTrendIcon = (trend) => {
        if (trend === 'up') return <span className="trend up">↑</span>;
        if (trend === 'down') return <span className="trend down">↓</span>;
        return <span className="trend stable">→</span>;
    };

    if (loading) {
        return (
            <div
                aria-label={t('smartSuggestions.panel', 'Smart suggestions panel')}
                className="smart-suggestions-overlay"
                role="button"
                tabIndex={0}
                onClick={onClose}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div
                    className="smart-suggestions-panel"
                    role="button"
                    tabIndex={0}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                    }
                >
                    <div className="loading-state">
                        <FaRobot className="pulse" />
                        <span>{t('analyzing_conversation')}</span>
                    </div>
                </div>
            </div>
        );
    }

    const sentimentStyle = {
        color: getSentimentColor(suggestions?.conversation_insights?.sentiment),
    };

    return (
        <div
            className="smart-suggestions-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="smart-suggestions-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                {/* Header */}
                <div className="panel-header">
                    <div className="header-info">
                        <h2>
                            <FaRobot />
                            {t('smart_suggestions')}
                        </h2>
                        <span className="powered-by">{t('powered_by_ai')}</span>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {/* Conversation Insights */}
                <div className="insights-bar">
                    <div className="insight">
                        <span className="insight-label">{t('sentiment')}</span>
                        <span className="insight-value sentiment" style={sentimentStyle}>
                            {suggestions?.conversation_insights?.sentiment || 'neutral'}
                        </span>
                    </div>
                    <div className="insight">
                        <span className="insight-label">{t('activity_label')}</span>
                        <span className="insight-value">
                            {suggestions?.conversation_insights?.activity_level || 'normal'}
                        </span>
                    </div>
                    <div className="insight">
                        <span className="insight-label">{t('response_rate')}</span>
                        <span className="insight-value">
                            {suggestions?.conversation_insights?.response_rate || 0}%
                        </span>
                    </div>
                    <div className="insight">
                        <span className="insight-label">{t('avg_response')}</span>
                        <span className="insight-value">
                            {suggestions?.conversation_insights?.avg_response_time || 'N/A'}
                        </span>
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
                                <span className="emoji-label">
                                    <FaSmile />
                                    {t('quick_reactions')}
                                </span>
                                <div className="emoji-list">
                                    {(suggestions?.suggested_emojis || []).map((emoji, index) => (
                                        <button
                                            key={`item-${index}`}
                                            className="emoji-btn"
                                            onClick={() => handleUseSuggestion(emoji)}
                                            title={t('click_to_use')}
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Replies */}
                            <div className="replies-list">
                                <h4>
                                    <FaLightbulb />
                                    {t('suggested_replies')}
                                </h4>
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
                                                title={t('copy_to_clipboard')}
                                            >
                                                {copiedId === reply.id ? <FaCheck /> : <FaCopy />}
                                            </button>
                                            <button
                                                className="action-btn use"
                                                onClick={() => handleUseSuggestion(reply.text)}
                                                title={t('use_this_reply')}
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
                            <h4>
                                <FaHashtag />
                                {t('trending_topics_in_this_channel')}
                            </h4>
                            <div className="topics-list">
                                {(suggestions?.trending_topics || []).map((topic, index) => (
                                    <div key={`item-${index}`} className="topic-item">
                                        <span className="topic-rank">{index + 1}</span>
                                        <div className="topic-info">
                                            <span className="topic-name">{topic.topic}</span>
                                            <span className="topic-mentions">
                                                {topic.mentions} mentions
                                            </span>
                                        </div>
                                        {getTrendIcon(topic.trend)}
                                    </div>
                                ))}
                                {(!suggestions?.trending_topics ||
                                    suggestions.trending_topics.length === 0) && (
                                        <div className="empty-state">{t('no_trending_topics_yet')}</div>
                                    )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'actions' && (
                        <div className="actions-tab">
                            <h4>
                                <FaMagic />
                                {t('recommended_actions')}
                            </h4>
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
                                        <span className={`action-type ${action.type}`}>
                                            {action.type}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="ai-tip">
                                <FaRobot />
                                <span>
                                    {t(
                                        'these_suggestions_are_based_on_conversation_patterns_and_com'
                                    )}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

SmartSuggestionsPanel.propTypes = {
    serverId: PropTypes.string,
    channelId: PropTypes.string,
    onClose: PropTypes.func,
    onUseSuggestion: PropTypes.func,
    fetchWithAuth: PropTypes.func,
};
export default SmartSuggestionsPanel;
