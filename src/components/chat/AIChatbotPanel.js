// frontend/src/components/AIChatbotPanel.js

import { useState, useEffect, useRef, useCallback, memo } from 'react';

import PropTypes from 'prop-types';

import toast from '../../utils/toast';

import {
    FaRobot,
    FaPaperPlane,
    FaLightbulb,
    FaFileCode,
    FaChartBar,
    FaMagic,
} from 'react-icons/fa';

import './AIChatbotPanel.css';

import { useTranslation } from 'react-i18next';

import logger from '../../utils/logger';

/**


 * AI Chatbot Integration Panel


 * Discord-beating AI features: chat, smart replies, summarization, code generation


 */

const AIChatbotPanel = ({ username, apiBaseUrl, fetchWithAuth, currentRoomSlug }) => {
    const { t } = useTranslation();

    const [activeTab, setActiveTab] = useState('chat'); // chat, smart-reply, summarize, explain, code

    const [messages, setMessages] = useState([]);

    const [input, setInput] = useState('');

    const [loading, setLoading] = useState(false);

    const [quota, setQuota] = useState({ used: 0, limit: 100 });

    const [smartReplies, setSmartReplies] = useState([]);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        fetchQuota();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const fetchQuota = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/ai/quota/`);

            const data = await response.json();

            setQuota(data);
        } catch (err) {
            logger.error('Failed to fetch AI quota:', err);
        }
    };

    const handleAIChat = async (e) => {
        e.preventDefault();

        if (!input.trim() || loading) return;

        const userMessage = input.trim();

        setInput('');

        // Add user message to chat

        setMessages((prev) => [
            ...prev,
            { role: 'user', content: userMessage, timestamp: new Date() },
        ]);

        setLoading(true);

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/ai/chat/`, {
                method: 'POST',

                body: JSON.stringify({
                    message: userMessage,

                    context: currentRoomSlug || 'general',
                }),
            });

            const data = await response.json();

            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',

                    content: data.response,

                    timestamp: new Date(),
                },
            ]);

            fetchQuota(); // Update quota

            toast.success(t('ai.responded'));
        } catch (err) {
            logger.error('AI chat error:', err);

            toast.error(t('ai.error'));

            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',

                    content: t('ai.errorOccurred'),

                    timestamp: new Date(),

                    error: true,
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleSmartReply = async (messageId) => {
        setLoading(true);

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/ai/smart-reply/`, {
                method: 'POST',

                body: JSON.stringify({
                    message_id: messageId,

                    count: 3,
                }),
            });

            const data = await response.json();

            setSmartReplies(data.suggestions || []);

            toast.success(t('ai.smartRepliesReady'));
        } catch (err) {
            logger.error('Smart reply error:', err);

            toast.error(t('ai.smartReplyError'));
        } finally {
            setLoading(false);
        }
    };

    const handleSummarize = async (messageIds) => {
        setLoading(true);

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/ai/summarize/`, {
                method: 'POST',

                body: JSON.stringify({
                    message_ids: messageIds,

                    max_length: 200,
                }),
            });

            const data = await response.json();

            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',

                    content: `?? **Summary:**\n\n${data.summary}`,

                    timestamp: new Date(),

                    type: 'summary',
                },
            ]);

            toast.success(t('ai.summarized'));
        } catch (err) {
            logger.error('Summarize error:', err);

            toast.error(t('ai.summarizeError'));
        } finally {
            setLoading(false);
        }
    };

    const handleExplain = async (text) => {
        setLoading(true);

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/ai/explain/`, {
                method: 'POST',

                body: JSON.stringify({
                    text: text,

                    language: 'tr',
                }),
            });

            const data = await response.json();

            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',

                    content: `?? **Description:**\n\n${data.explanation}`,

                    timestamp: new Date(),

                    type: 'explanation',
                },
            ]);

            toast.success(t('ai.explanationReady'));
        } catch (err) {
            logger.error('Explain error:', err);

            toast.error(t('ai.explainError'));
        } finally {
            setLoading(false);
        }
    };

    const handleCodeGeneration = async (prompt) => {
        setLoading(true);

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/ai/code/`, {
                method: 'POST',

                body: JSON.stringify({
                    prompt: prompt,

                    language: 'javascript',
                }),
            });

            const data = await response.json();

            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',

                    content: `\`\`\`${data.language}\n${data.code}\n\`\`\`\n\n${data.explanation || ''}`,

                    timestamp: new Date(),

                    type: 'code',
                },
            ]);

            toast.success(t('ai.codeGenerated'));
        } catch (err) {
            logger.error('Code generation error:', err);

            toast.error(t('ai.codeGenError'));
        } finally {
            setLoading(false);
        }
    };

    const handleModerate = async (content) => {
        setLoading(true);

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/ai/moderate/`, {
                method: 'POST',

                body: JSON.stringify({
                    content: content,
                }),
            });

            const data = await response.json();

            toast.info(
                `${data.is_safe ? t('ui.guvenli') : '?? Inappropriate'}\n${data.reason || ''}`
            );
        } catch (err) {
            logger.error('Moderation error:', err);

            toast.error(t('ui.moderasyon_hatasi'));
        } finally {
            setLoading(false);
        }
    };

    // useCallback handlers

    const handleSetTabChat = useCallback(() => setActiveTab('chat'), []);

    const handleSetTabSmartReply = useCallback(() => setActiveTab('smart-reply'), []);

    const handleSetTabSummarize = useCallback(() => setActiveTab('summarize'), []);

    const handleSetTabCode = useCallback(() => setActiveTab('code'), []);

    const handleInputChange = useCallback((e) => setInput(e.target.value), []);

    const handleSuggestionCode = useCallback(
        () => setInput('How to make a todo list with JavaScript?'),
        []
    );

    const handleSuggestionExplain = useCallback(() => setInput('React hooks nedir?'), []);

    const handleSuggestionChat = useCallback(() => setInput("What's the weather like today?"), []);

    const handleLastSmartReply = useCallback(() => handleSmartReply('last-message-id'), []);

    const handleSummarizeLast = useCallback(() => handleSummarize(['msg1', 'msg2', 'msg3']), []);

    const handleCodeFormSubmit = useCallback(
        (e) => {
            e.preventDefault();
            handleCodeGeneration(input);
        },
        [input]
    );

    const renderQuotaBar = () => {
        const percentage = (quota.used / quota.limit) * 100;

        const color = percentage > 90 ? '#f23f42' : percentage > 70 ? '#f0b232' : '#23a559';

        return (
            <div className="ai-quota-container">
                <div className="ai-quota-info">
                    <FaChartBar />

                    <span>
                        AI Usage: {quota.used} / {quota.limit}
                    </span>
                </div>

                <div className="ai-quota-bar">
                    <div
                        className="ai-quota-fill"
                        style={{ width: `${percentage}%`, backgroundColor: color }}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="ai-chatbot-panel">
            <div className="ai-header">
                <div className="ai-header-left">
                    <FaRobot size={28} />

                    <div>
                        <h3 className="ai-title">{t('ai.title')}</h3>

                        <p className="ai-subtitle">{t('ai.subtitle')}</p>
                    </div>
                </div>

                {renderQuotaBar()}
            </div>

            {/* Tabs */}

            <div className="ai-tabs">
                <button
                    aria-label={t('ai.tabChat', 'AI Chat')}
                    className={activeTab === 'chat' ? 'active' : ''}
                    onClick={handleSetTabChat}
                >
                    <FaRobot /> Chat
                </button>

                <button
                    aria-label={t('ai.tabSmartReply', 'Smart Reply')}
                    className={activeTab === 'smart-reply' ? 'active' : ''}
                    onClick={handleSetTabSmartReply}
                >
                    <FaLightbulb /> Smart Reply
                </button>

                <button
                    aria-label={t('ai.tabSummarize', 'Summarize')}
                    className={activeTab === 'summarize' ? 'active' : ''}
                    onClick={handleSetTabSummarize}
                >
                    <FaMagic /> Summarize
                </button>

                <button
                    aria-label={t('ai.tabCode', 'Code generation')}
                    className={activeTab === 'code' ? 'active' : ''}
                    onClick={handleSetTabCode}
                >
                    <FaFileCode /> {t('ai.codeGen')}
                </button>
            </div>

            {/* Chat Area */}

            {activeTab === 'chat' && (
                <div className="ai-chat-container">
                    <div className="ai-messages">
                        {messages.length === 0 ? (
                            <div className="ai-empty-state">
                                <FaRobot size={48} />

                                <h4>{t('ai.welcomeTitle')}</h4>

                                <p>{t('ai.welcomeDesc')}</p>

                                <div className="ai-suggestions">
                                    <button
                                        aria-label={t('ai.suggestionCode', 'Get a code example')}
                                        onClick={handleSuggestionCode}
                                    >
                                        ?? {t('ai.getCodeExample')}
                                    </button>

                                    <button
                                        aria-label={t('ai.suggestionExplain', 'Explain a concept')}
                                        onClick={handleSuggestionExplain}
                                    >
                                        ?? {t('ai.explainConcept')}
                                    </button>

                                    <button
                                        aria-label={t('ai.suggestionChat', 'Start chatting')}
                                        onClick={handleSuggestionChat}
                                    >
                                        ?? Chat
                                    </button>
                                </div>
                            </div>
                        ) : (
                            messages.map((msg, index) => (
                                <div
                                    key={`item-${index}`}
                                    className={`ai-message ${msg.role} ${msg.error ? 'error' : ''}`}
                                >
                                    <div className="ai-message-avatar">
                                        {msg.role === 'user' ? '??' : '??'}
                                    </div>

                                    <div className="ai-message-content">
                                        <div className="ai-message-header">
                                            <strong>
                                                {msg.role === 'user' ? username : 'AI Assistant'}
                                            </strong>

                                            <span className="ai-message-time">
                                                {msg.timestamp.toLocaleTimeString('tr-TR', {
                                                    hour: '2-digit',

                                                    minute: '2-digit',
                                                })}
                                            </span>
                                        </div>

                                        <div className="ai-message-text">
                                            {msg.content.split('```').map((part, i) =>
                                                i % 2 === 0 ? (
                                                    <span key={`item-${i}`}>{part}</span>
                                                ) : (
                                                    <pre
                                                        key={`item-${i}`}
                                                        className="ai-code-block"
                                                    >
                                                        <code>{part}</code>
                                                    </pre>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleAIChat} className="ai-input-form">
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            placeholder={t('ai.askPlaceholder')}
                            disabled={loading}
                            className="ai-input"
                            aria-label={t('ai.messageInput', 'AI message input')}
                        />

                        <button
                            aria-label={t('common.submit')}
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="ai-send-btn"
                        >
                            {loading ? '?' : <FaPaperPlane />}
                        </button>
                    </form>
                </div>
            )}

            {/* Smart Reply Tab */}

            {activeTab === 'smart-reply' && (
                <div className="ai-feature-container">
                    <div className="ai-feature-header">
                        <FaLightbulb size={32} />

                        <h4>{t('ai.smartReplyTitle')}</h4>

                        <p>{t('ai.smartReplyDesc')}</p>
                    </div>

                    <button
                        aria-label={t('ai.getSmartReply', 'Get smart reply suggestions')}
                        onClick={handleLastSmartReply}
                        disabled={loading}
                        className="ai-action-btn"
                    >
                        ?? {t('ai.smartReplyLast')}
                    </button>

                    {smartReplies.length > 0 && (
                        <div className="ai-smart-replies">
                            <h5>{t('ai.suggestedReplies')}:</h5>

                            {smartReplies.map((reply, index) => (
                                <div key={`item-${index}`} className="ai-smart-reply-item">
                                    <span>{reply}</span>

                                    <button aria-label={t('common.use', 'Use')} onClick={() => setInput(reply)}>
                                        {t('common.use')}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Summarize Tab */}

            {activeTab === 'summarize' && (
                <div className="ai-feature-container">
                    <div className="ai-feature-header">
                        <FaMagic size={32} />

                        <h4>{t('ai.summarizeTitle')}</h4>

                        <p>{t('ai.summarizeDesc')}</p>
                    </div>

                    <button
                        aria-label={t('ai.summarizeMessages', 'Summarize last messages')}
                        onClick={handleSummarizeLast}
                        disabled={loading}
                        className="ai-action-btn"
                    >
                        ?? {t('ai.summarizeLast50')}
                    </button>
                </div>
            )}

            {/* Code Generation Tab */}

            {activeTab === 'code' && (
                <div className="ai-feature-container">
                    <div className="ai-feature-header">
                        <FaFileCode size={32} />

                        <h4>{t('ai.codeGenTitle')}</h4>

                        <p>{t('ai.codeGenDesc')}</p>
                    </div>

                    <form onSubmit={handleCodeFormSubmit} className="ai-code-form">
                        <textarea
                            value={input}
                            onChange={handleInputChange}
                            placeholder={t('ai.codeGenPlaceholder')}
                            rows={4}
                            className="ai-code-textarea"
                            aria-label={t('ai.codeGenPlaceholder', 'What do you want to do?')}
                        />

                        <button
                            aria-label={t('common.submit')}
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="ai-action-btn"
                        >
                            ?? {t('ai.generateCode')}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

AIChatbotPanel.propTypes = {
    username: PropTypes.string,

    apiBaseUrl: PropTypes.string,

    fetchWithAuth: PropTypes.func,

    currentRoomSlug: PropTypes.string,
};

export default memo(AIChatbotPanel);
