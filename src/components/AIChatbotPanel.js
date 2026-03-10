// frontend/src/components/AIChatbotPanel.js
import { useState, useEffect, useRef, useCallback, memo } from 'react';
import toast from '../utils/toast';
import { FaRobot, FaPaperPlane, FaLightbulb, FaFileCode, FaChartBar, FaMagic } from 'react-icons/fa';
import './AIChatbotPanel.css';

/**
 * AI Chatbot Integration Panel
 * Discord-beating AI features: chat, smart replies, summarization, code generation
 */
const AIChatbotPanel = ({ username, apiBaseUrl, fetchWithAuth, currentRoomSlug }) => {
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
            console.error('Failed to fetch AI quota:', err);
        }
    };

    const handleAIChat = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput('');

        // Add user message to chat
        setMessages(prev => [...prev, { role: 'user', content: userMessage, timestamp: new Date() }]);
        setLoading(true);

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/ai/chat/`, {
                method: 'POST',
                body: JSON.stringify({
                    message: userMessage,
                    context: currentRoomSlug || 'general'
                })
            });

            const data = await response.json();

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.response,
                timestamp: new Date()
            }]);

            fetchQuota(); // Update quota
            toast.success('🤖 AI yanıtladı!');
        } catch (err) {
            console.error('AI chat error:', err);
            toast.error('❌ AI hatası!');
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Üzgünüm, bir hata oluştu.',
                timestamp: new Date(),
                error: true
            }]);
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
                    count: 3
                })
            });

            const data = await response.json();
            setSmartReplies(data.suggestions || []);
            toast.success('💡 Akıllı cevaplar hazır!');
        } catch (err) {
            console.error('Smart reply error:', err);
            toast.error('❌ Akıllı cevap hatası!');
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
                    max_length: 200
                })
            });

            const data = await response.json();

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `📝 **Özet:**\n\n${data.summary}`,
                timestamp: new Date(),
                type: 'summary'
            }]);

            toast.success('📝 Mesajlar özetlendi!');
        } catch (err) {
            console.error('Summarize error:', err);
            toast.error('❌ Özetleme hatası!');
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
                    language: 'tr'
                })
            });

            const data = await response.json();

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `🎓 **Açıklama:**\n\n${data.explanation}`,
                timestamp: new Date(),
                type: 'explanation'
            }]);

            toast.success('🎓 Açıklama hazır!');
        } catch (err) {
            console.error('Explain error:', err);
            toast.error('❌ Açıklama hatası!');
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
                    language: 'javascript'
                })
            });

            const data = await response.json();

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `\`\`\`${data.language}\n${data.code}\n\`\`\`\n\n${data.explanation || ''}`,
                timestamp: new Date(),
                type: 'code'
            }]);

            toast.success('💻 Kod oluşturuldu!');
        } catch (err) {
            console.error('Code generation error:', err);
            toast.error('❌ Kod üretme hatası!');
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
                    content: content
                })
            });

            const data = await response.json();

            toast.info(`🛡️ Moderasyon: ${data.is_safe ? '✅ Güvenli' : '⚠️ Uygunsuz'}\n${data.reason || ''}`);
        } catch (err) {
            console.error('Moderation error:', err);
            toast.error('❌ Moderasyon hatası!');
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
    const handleSuggestionCode = useCallback(() => setInput('JavaScript ile bir todo list nasıl yapılır?'), []);
    const handleSuggestionExplain = useCallback(() => setInput('React hooks nedir?'), []);
    const handleSuggestionChat = useCallback(() => setInput('Bugün hava nasıl?'), []);
    const handleLastSmartReply = useCallback(() => handleSmartReply('last-message-id'), []);
    const handleSummarizeLast = useCallback(() => handleSummarize(['msg1', 'msg2', 'msg3']), []);
    const handleCodeFormSubmit = useCallback((e) => { e.preventDefault(); handleCodeGeneration(input); }, [input]);

    const renderQuotaBar = () => {
        const percentage = (quota.used / quota.limit) * 100;
        const color = percentage > 90 ? '#f23f42' : percentage > 70 ? '#f0b232' : '#23a559';

        return (
            <div className="ai-quota-container">
                <div className="ai-quota-info">
                    <FaChartBar />
                    <span>AI Kullanım: {quota.used} / {quota.limit}</span>
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
                        <h3 className="ai-title">AI Assistant</h3>
                        <p className="ai-subtitle">Discord'u geçen AI özellikleri</p>
                    </div>
                </div>
                {renderQuotaBar()}
            </div>

            {/* Tabs */}
            <div className="ai-tabs">
                <button
                    className={activeTab === 'chat' ? 'active' : ''}
                    onClick={handleSetTabChat}
                >
                    <FaRobot /> Chat
                </button>
                <button
                    className={activeTab === 'smart-reply' ? 'active' : ''}
                    onClick={handleSetTabSmartReply}
                >
                    <FaLightbulb /> Smart Reply
                </button>
                <button
                    className={activeTab === 'summarize' ? 'active' : ''}
                    onClick={handleSetTabSummarize}
                >
                    <FaMagic /> Özetle
                </button>
                <button
                    className={activeTab === 'code' ? 'active' : ''}
                    onClick={handleSetTabCode}
                >
                    <FaFileCode /> Kod Oluştur
                </button>
            </div>

            {/* Chat Area */}
            {activeTab === 'chat' && (
                <div className="ai-chat-container">
                    <div className="ai-messages">
                        {messages.length === 0 ? (
                            <div className="ai-empty-state">
                                <FaRobot size={48} />
                                <h4>AI Assistant'a Hoş Geldin!</h4>
                                <p>Soru sor, kod yazdır, mesajları özetle veya açıklama iste.</p>
                                <div className="ai-suggestions">
                                    <button onClick={handleSuggestionCode}>
                                        💻 Kod örneği iste
                                    </button>
                                    <button onClick={handleSuggestionExplain}>
                                        🎓 Kavram açıkla
                                    </button>
                                    <button onClick={handleSuggestionChat}>
                                        💬 Sohbet et
                                    </button>
                                </div>
                            </div>
                        ) : (
                            messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`ai-message ${msg.role} ${msg.error ? 'error' : ''}`}
                                >
                                    <div className="ai-message-avatar">
                                        {msg.role === 'user' ? '👤' : '🤖'}
                                    </div>
                                    <div className="ai-message-content">
                                        <div className="ai-message-header">
                                            <strong>{msg.role === 'user' ? username : 'AI Assistant'}</strong>
                                            <span className="ai-message-time">
                                                {msg.timestamp.toLocaleTimeString('tr-TR', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </span>
                                        </div>
                                        <div className="ai-message-text">
                                            {msg.content.split('```').map((part, i) =>
                                                i % 2 === 0 ? (
                                                    <span key={i}>{part}</span>
                                                ) : (
                                                    <pre key={i} className="ai-code-block">
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
                            placeholder="AI'ya bir şey sor..."
                            disabled={loading}
                            className="ai-input"
                        />
                        <button type="submit" disabled={loading || !input.trim()} className="ai-send-btn">
                            {loading ? '⏳' : <FaPaperPlane />}
                        </button>
                    </form>
                </div>
            )}

            {/* Smart Reply Tab */}
            {activeTab === 'smart-reply' && (
                <div className="ai-feature-container">
                    <div className="ai-feature-header">
                        <FaLightbulb size={32} />
                        <h4>Akıllı Cevap Önerileri</h4>
                        <p>Mesajlara otomatik yanıt önerileri</p>
                    </div>
                    <button
                        onClick={handleLastSmartReply}
                        disabled={loading}
                        className="ai-action-btn"
                    >
                        💡 Son Mesaja Akıllı Cevap Öner
                    </button>
                    {smartReplies.length > 0 && (
                        <div className="ai-smart-replies">
                            <h5>Önerilen Cevaplar:</h5>
                            {smartReplies.map((reply, index) => (
                                <div key={index} className="ai-smart-reply-item">
                                    <span>{reply}</span>
                                    <button onClick={() => setInput(reply)}>Kullan</button>
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
                        <h4>Mesaj Özetleme</h4>
                        <p>Uzun konuşmaları tek paragrafta özetle</p>
                    </div>
                    <button
                        onClick={handleSummarizeLast}
                        disabled={loading}
                        className="ai-action-btn"
                    >
                        📝 Son 50 Mesajı Özetle
                    </button>
                </div>
            )}

            {/* Code Generation Tab */}
            {activeTab === 'code' && (
                <div className="ai-feature-container">
                    <div className="ai-feature-header">
                        <FaFileCode size={32} />
                        <h4>Kod Üretimi</h4>
                        <p>AI ile kod yaz, GitHub Copilot gibi</p>
                    </div>
                    <form onSubmit={handleCodeFormSubmit} className="ai-code-form">
                        <textarea
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Ne yapmak istiyorsun? Örn: 'React'te bir sayaç komponenti yap'"
                            rows={4}
                            className="ai-code-textarea"
                        />
                        <button type="submit" disabled={loading || !input.trim()} className="ai-action-btn">
                            💻 Kod Üret
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default memo(AIChatbotPanel);
