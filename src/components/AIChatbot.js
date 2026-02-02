import React, { useState, useRef, useEffect } from 'react';
import './AIChatbot.css';

/**
 * GPT-4 AI Chatbot Component
 */
const AIChatbot = ({ channelId, channelName, onClose }) => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: 'assistant',
            content: '👋 Hello! I\'m PawsCord AI Assistant. How can I help you today?',
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!inputText.trim() || isLoading) return;

        const userMessage = {
            id: messages.length + 1,
            role: 'user',
            content: inputText,
            timestamp: new Date()
        };

        setMessages([...messages, userMessage]);
        setInputText('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/ai/chat/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: inputText,
                    channel_id: channelId,
                    history: messages.map(m => ({
                        is_user: m.role === 'user',
                        content: m.content
                    }))
                })
            });

            const data = await response.json();

            if (data.success) {
                const aiMessage = {
                    id: messages.length + 2,
                    role: 'assistant',
                    content: data.response,
                    timestamp: new Date(),
                    tokens_used: data.tokens_used
                };

                setMessages(prev => [...prev, aiMessage]);
            } else {
                throw new Error(data.error || 'Failed to get AI response');
            }
        } catch (error) {
            console.error('AI chat error:', error);
            const errorMessage = {
                id: messages.length + 2,
                role: 'assistant',
                content: '❌ Sorry, I encountered an error. Please try again.',
                timestamp: new Date(),
                isError: true
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const getSummarization = async () => {
        setIsLoading(true);

        try {
            const response = await fetch('/api/ai/summarize/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    channel_id: channelId,
                    message_count: 50
                })
            });

            const data = await response.json();

            if (data.success) {
                const summaryMessage = {
                    id: messages.length + 1,
                    role: 'assistant',
                    content: `📋 **Channel Summary** (${data.message_count} messages):\n\n${data.summary}`,
                    timestamp: new Date()
                };

                setMessages([...messages, summaryMessage]);
            }
        } catch (error) {
            console.error('Summarization error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="ai-chatbot-container">
            <div className="chatbot-header">
                <div className="header-left">
                    <span className="bot-badge">🤖 AI</span>
                    <h3>PawsCord Assistant</h3>
                    {channelName && <span className="channel-tag">#{channelName}</span>}
                </div>
                <div className="header-actions">
                    <button onClick={getSummarization} disabled={isLoading} className="summary-btn">
                        📋 Summarize
                    </button>
                    <button onClick={onClose} className="close-btn">×</button>
                </div>
            </div>

            <div className="chatbot-messages">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`message ${message.role} ${message.isError ? 'error' : ''}`}
                    >
                        <div className="message-avatar">
                            {message.role === 'assistant' ? '🤖' : '👤'}
                        </div>
                        <div className="message-content">
                            <div className="message-header">
                                <span className="message-author">
                                    {message.role === 'assistant' ? 'PawsCord AI' : 'You'}
                                </span>
                                <span className="message-time">
                                    {message.timestamp.toLocaleTimeString()}
                                </span>
                            </div>
                            <div className="message-text">
                                {message.content.split('\n').map((line, i) => (
                                    <p key={i}>{line}</p>
                                ))}
                            </div>
                            {message.tokens_used && (
                                <div className="token-count">
                                    🪙 {message.tokens_used} tokens
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="message assistant typing">
                        <div className="message-avatar">🤖</div>
                        <div className="message-content">
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className="chatbot-input">
                <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    rows={1}
                    disabled={isLoading}
                />
                <button
                    onClick={sendMessage}
                    disabled={!inputText.trim() || isLoading}
                    className="send-btn"
                >
                    ➤
                </button>
            </div>

            <div className="chatbot-footer">
                <small>Powered by GPT-4 • Responses may not always be accurate</small>
            </div>
        </div>
    );
};

export default AIChatbot;


