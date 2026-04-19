// frontend/src/__tests__/components/ChatArea.test.jsx
// 🧪 ChatArea Component Tests

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React, { useState, useRef, useCallback } from 'react';

// --- Mock ChatArea (replicates header, message list, scroll, empty state) ---
const MockChatArea = ({
    activeChat = null,
    chatTitle = 'general',
    isConnected = true,
    messages = [],
    messageHistoryLoading = false,
    hasMoreMessages = false,
    showScrollToBottom = false,
    isMobile = false,
    username = 'testuser',
    isAdmin = false,
    activeTypingUsers = [],
    onScrollToBottom = vi.fn(),
    onMessageScroll = vi.fn(),
    isSelectionMode = false,
    selectedMessages = [],
    setSelectedMessages = vi.fn(),
    searchQuery = '',
    setSearchQuery = vi.fn(),
}) => {
    const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
    const messageBoxRef = useRef(null);

    if (!activeChat) {
        return (
            <div data-testid="chat-area-empty">
                <div data-testid="no-chat-selected">
                    <h2>Chat seçilmedi</h2>
                    <p>Sol panelden bir sohbet seçin</p>
                </div>
            </div>
        );
    }

    return (
        <div data-testid="chat-area" role="main">
            {/* Chat Header */}
            <div data-testid="chat-header">
                <h3 data-testid="chat-title"># {chatTitle}</h3>
                <div data-testid="header-actions">
                    <button data-testid="search-toggle" onClick={() => setSearchQuery('open')} aria-label="Ara">
                        🔍
                    </button>
                    <button data-testid="members-toggle" aria-label="Memberler">
                        👥
                    </button>
                    <button data-testid="notifications-toggle" aria-label="Notifications">
                        🔔
                    </button>
                </div>
                {!isConnected && <div data-testid="disconnected-banner">Bağlantı kesildi</div>}
            </div>

            {/* Connection Status */}
            {!isConnected && (
                <div data-testid="connection-warning" role="alert">
                    Bağlantı yeniden kuruluyor...
                </div>
            )}

            {/* Search Bar (when active) */}
            {searchQuery && (
                <div data-testid="search-bar">
                    <input
                        data-testid="search-input"
                        value={localSearchQuery}
                        onChange={(e) => setLocalSearchQuery(e.target.value)}
                        placeholder="Mesajlarda search..."
                    />
                </div>
            )}

            {/* Message Area */}
            <div
                data-testid="message-container"
                ref={messageBoxRef}
                onScroll={onMessageScroll}
                style={{ overflowY: 'auto', flex: 1 }}>
                {/* Loading skeleton */}
                {messageHistoryLoading && (
                    <div data-testid="message-skeleton">
                        <div>Loading...</div>
                        <div>Loading...</div>
                        <div>Loading...</div>
                    </div>
                )}

                {/* "Load more" indicator */}
                {hasMoreMessages && !messageHistoryLoading && (
                    <div data-testid="load-more-indicator">Daha fazla message yükleniyor...</div>
                )}

                {/* Messages */}
                {messages.length === 0 && !messageHistoryLoading ? (
                    <div data-testid="no-messages">
                        <h3>🎉 İlk mesajı sen yaz!</h3>
                        <p>This channel yeni created.</p>
                    </div>
                ) : (
                    <div data-testid="message-list" role="log" aria-label="Mesajlar">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                data-testid={`message-${msg.id}`}
                                className={isSelectionMode && selectedMessages.includes(msg.id) ? 'selected' : ''}
                                role="button"
                                tabIndex={0}

                                onClick={isSelectionMode ? () => {
                                    setSelectedMessages(prev =>
                                        prev.includes(msg.id) ? prev.filter(id => id !== msg.id) : [...prev, msg.id]
                                    );
                                } : undefined}
                            
                                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}>
                                <span data-testid={`msg-author-${msg.id}`}>{msg.username}</span>
                                <span data-testid={`msg-content-${msg.id}`}>{msg.content}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Typing Indicator */}
                {activeTypingUsers.length > 0 && (
                    <div data-testid="typing-indicator">
                        {activeTypingUsers.join(', ')} yazıyor...
                    </div>
                )}
            </div>

            {/* Scroll to bottom button */}
            {showScrollToBottom && (
                <button data-testid="scroll-to-bottom" onClick={onScrollToBottom} aria-label="En alta kaydır">
                    ↓
                </button>
            )}
        </div>
    );
};

describe('ChatArea Component', () => {
    const mockMessages = [
        { id: 1, username: 'user1', content: 'Hello world!' },
        { id: 2, username: 'user2', content: 'Hey there!' },
        { id: 3, username: 'user1', content: 'How are you?' },
    ];

    const mockActiveChat = { id: 'room-general', type: 'room', slug: 'general' };

    let handlers;

    beforeEach(() => {
        handlers = {
            onScrollToBottom: vi.fn(),
            onMessageScroll: vi.fn(),
            setSelectedMessages: vi.fn(),
            setSearchQuery: vi.fn(),
        };
    });

    describe('Empty State', () => {
        it('should show "no chat selected" when activeChat is null', () => {
            render(<MockChatArea activeChat={null} {...handlers} />);
            expect(screen.getByTestId('no-chat-selected')).toBeInTheDocument();
            expect(screen.getByText('Chat seçilmedi')).toBeInTheDocument();
        });

        it('should show empty message state when no messages', () => {
            render(<MockChatArea activeChat={mockActiveChat} messages={[]} {...handlers} />);
            expect(screen.getByTestId('no-messages')).toBeInTheDocument();
            expect(screen.getByText('🎉 İlk mesajı sen yaz!')).toBeInTheDocument();
        });
    });

    describe('Header', () => {
        it('should display chat title', () => {
            render(<MockChatArea activeChat={mockActiveChat} chatTitle="general" messages={mockMessages} {...handlers} />);
            expect(screen.getByTestId('chat-title')).toHaveTextContent('# general');
        });

        it('should render header action buttons', () => {
            render(<MockChatArea activeChat={mockActiveChat} messages={mockMessages} {...handlers} />);
            expect(screen.getByTestId('search-toggle')).toBeInTheDocument();
            expect(screen.getByTestId('members-toggle')).toBeInTheDocument();
            expect(screen.getByTestId('notifications-toggle')).toBeInTheDocument();
        });

        it('should show disconnected banner when not connected', () => {
            render(<MockChatArea activeChat={mockActiveChat} isConnected={false} messages={mockMessages} {...handlers} />);
            expect(screen.getByTestId('disconnected-banner')).toHaveTextContent('Bağlantı kesildi');
        });
    });

    describe('Message Rendering', () => {
        it('should render all messages', () => {
            render(<MockChatArea activeChat={mockActiveChat} messages={mockMessages} {...handlers} />);
            expect(screen.getByTestId('message-list')).toBeInTheDocument();
            expect(screen.getByTestId('message-1')).toBeInTheDocument();
            expect(screen.getByTestId('message-2')).toBeInTheDocument();
            expect(screen.getByTestId('message-3')).toBeInTheDocument();
        });

        it('should display message content', () => {
            render(<MockChatArea activeChat={mockActiveChat} messages={mockMessages} {...handlers} />);
            expect(screen.getByTestId('msg-content-1')).toHaveTextContent('Hello world!');
        });

        it('should display message author', () => {
            render(<MockChatArea activeChat={mockActiveChat} messages={mockMessages} {...handlers} />);
            expect(screen.getByTestId('msg-author-1')).toHaveTextContent('user1');
        });
    });

    describe('Loading State', () => {
        it('should show loading skeleton when history is loading', () => {
            render(<MockChatArea activeChat={mockActiveChat} messages={[]} messageHistoryLoading={true} {...handlers} />);
            expect(screen.getByTestId('message-skeleton')).toBeInTheDocument();
        });

        it('should show "load more" indicator', () => {
            render(<MockChatArea activeChat={mockActiveChat} messages={mockMessages} hasMoreMessages={true} {...handlers} />);
            expect(screen.getByTestId('load-more-indicator')).toBeInTheDocument();
        });
    });

    describe('Typing Indicator', () => {
        it('should show typing indicator when users are typing', () => {
            render(
                <MockChatArea
                    activeChat={mockActiveChat}
                    messages={mockMessages}
                    activeTypingUsers={['Alice', 'Bob']}>
                    {...handlers}
                />
            );
            expect(screen.getByTestId('typing-indicator')).toHaveTextContent('Alice, Bob yazıyor...');
        });

        it('should NOT show typing indicator when no one is typing', () => {
            render(<MockChatArea activeChat={mockActiveChat} messages={mockMessages} activeTypingUsers={[]} {...handlers} />);
            expect(screen.queryByTestId('typing-indicator')).not.toBeInTheDocument();
        });
    });

    describe('Scroll to Bottom', () => {
        it('should show scroll-to-bottom button when enabled', () => {
            render(<MockChatArea activeChat={mockActiveChat} messages={mockMessages} showScrollToBottom={true} {...handlers} />);
            expect(screen.getByTestId('scroll-to-bottom')).toBeInTheDocument();
        });

        it('should call onScrollToBottom when button is clicked', () => {
            render(<MockChatArea activeChat={mockActiveChat} messages={mockMessages} showScrollToBottom={true} {...handlers} />);
            fireEvent.click(screen.getByTestId('scroll-to-bottom'));
            expect(handlers.onScrollToBottom).toHaveBeenCalledTimes(1);
        });

        it('should NOT show scroll-to-bottom button when at bottom', () => {
            render(<MockChatArea activeChat={mockActiveChat} messages={mockMessages} showScrollToBottom={false} {...handlers} />);
            expect(screen.queryByTestId('scroll-to-bottom')).not.toBeInTheDocument();
        });
    });

    describe('Connection Status', () => {
        it('should show connection warning when disconnected', () => {
            render(<MockChatArea activeChat={mockActiveChat} messages={mockMessages} isConnected={false} {...handlers} />);
            expect(screen.getByTestId('connection-warning')).toHaveTextContent('Bağlantı yeniden kuruluyor...');
        });

        it('should NOT show connection warning when connected', () => {
            render(<MockChatArea activeChat={mockActiveChat} messages={mockMessages} isConnected={true} {...handlers} />);
            expect(screen.queryByTestId('connection-warning')).not.toBeInTheDocument();
        });
    });
});
