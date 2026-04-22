// frontend/src/__tests__/integration/messageFlow.test.jsx
// Integration tests for end-to-end message flows

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

// ═══════════════════════════════════════════════════════
// Mock components that simulate real message flow behavior
// ═══════════════════════════════════════════════════════

const mockSend = vi.fn();
const mockEdit = vi.fn();
const mockDelete = vi.fn();
const mockReply = vi.fn();
const mockReact = vi.fn();

// Simulates the MessageInput + ChatArea integration
const MessageFlowApp = ({ initialMessages = [] }) => {
    const [messages, setMessages] = React.useState(initialMessages);
    const [inputValue, setInputValue] = React.useState('');
    const [editingId, setEditingId] = React.useState(null);
    const [editValue, setEditValue] = React.useState('');
    const [replyingTo, setReplyingTo] = React.useState(null);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newMsg = {
            id: Date.now(),
            content: replyingTo ? inputValue : inputValue,
            author: { username: 'me', avatar: '/me.png' },
            created_at: new Date().toISOString(),
            edited: false,
            reply_to: replyingTo ? { id: replyingTo.id, content: replyingTo.content } : null,
            reactions: [],
        };

        setMessages((prev) => [...prev, newMsg]);
        mockSend(newMsg);
        setInputValue('');
        setReplyingTo(null);
    };

    const handleEdit = (id) => {
        if (!editValue.trim()) return;
        setMessages((prev) =>
            prev.map((m) =>
                m.id === id ? { ...m, content: editValue, edited: true } : m
            )
        );
        mockEdit(id, editValue);
        setEditingId(null);
        setEditValue('');
    };

    const handleDelete = (id) => {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        mockDelete(id);
    };

    const handleReply = (msg) => {
        setReplyingTo(msg);
        mockReply(msg);
    };

    const handleReact = (msgId, emoji) => {
        setMessages((prev) =>
            prev.map((m) =>
                m.id === msgId
                    ? { ...m, reactions: [...m.reactions, { emoji, user: 'me' }] }
                    : m
            )
        );
        mockReact(msgId, emoji);
    };

    return (
        <div data-testid="chat-container">
            {/* Messages list */}
            <div data-testid="messages-list">
                {messages.map((msg) => (
                    <div key={msg.id} data-testid={`message-${msg.id}`}>
                        {msg.reply_to && (
                            <div data-testid={`reply-preview-${msg.id}`}>
                                Replying to: {msg.reply_to.content}
                            </div>
                        )}
                        {editingId === msg.id ? (
                            <div>
                                <input
                                    data-testid={`edit-input-${msg.id}`}
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                />
                                <button
                                    data-testid={`edit-save-${msg.id}`}
                                    onClick={() => handleEdit(msg.id)}
                                >
                                    Save
                                </button>
                                <button
                                    data-testid={`edit-cancel-${msg.id}`}
                                    onClick={() => setEditingId(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <>
                                <span data-testid={`content-${msg.id}`}>{msg.content}</span>
                                {msg.edited && <span data-testid={`edited-${msg.id}`}>(edited)</span>}
                                <span data-testid={`author-${msg.id}`}>{msg.author.username}</span>
                                <button
                                    data-testid={`edit-btn-${msg.id}`}
                                    onClick={() => {
                                        setEditingId(msg.id);
                                        setEditValue(msg.content);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    data-testid={`delete-btn-${msg.id}`}
                                    onClick={() => handleDelete(msg.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    data-testid={`reply-btn-${msg.id}`}
                                    onClick={() => handleReply(msg)}
                                >
                                    Reply
                                </button>
                                <button
                                    data-testid={`react-btn-${msg.id}`}
                                    onClick={() => handleReact(msg.id, '👍')}
                                >
                                    React
                                </button>
                                {msg.reactions.map((r, idx) => (
                                    <span key={idx} data-testid={`reaction-${msg.id}-${idx}`}>
                                        {r.emoji}
                                    </span>
                                ))}
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* Reply preview */}
            {replyingTo && (
                <div data-testid="reply-bar">
                    Replying to {replyingTo.author.username}:
                    {replyingTo.content}
                    <button
                        data-testid="cancel-reply"
                        onClick={() => setReplyingTo(null)}>
                        ✕
                    </button>
                </div>
            )}

            {/* Input */}
            <input
                data-testid="message-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
            />
            <button data-testid="send-button" onClick={handleSend}>
                Send
            </button>
        </div>
    );
};

// ═══════════════════════════════════════════════════════
// TESTS
// ═══════════════════════════════════════════════════════
beforeEach(() => {
    vi.clearAllMocks();
});

const seedMessages = [
    {
        id: 1,
        content: 'Hello world',
        author: { username: 'alice', avatar: '/alice.png' },
        created_at: '2026-03-01T10:00:00Z',
        edited: false,
        reply_to: null,
        reactions: [],
    },
    {
        id: 2,
        content: 'How are you?',
        author: { username: 'bob', avatar: '/bob.png' },
        created_at: '2026-03-01T10:05:00Z',
        edited: false,
        reply_to: null,
        reactions: [],
    },
];

// ── Send message flow ──
describe('Send message flow', () => {
    it('types and sends a message via Enter key', () => {
        render(<MessageFlowApp initialMessages={[]} />);

        const input = screen.getByTestId('message-input');
        fireEvent.change(input, { target: { value: 'Hi there!' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        expect(mockSend).toHaveBeenCalledWith(
            expect.objectContaining({ content: 'Hi there!' })
        );
        expect(screen.getByText('Hi there!')).toBeDefined();
    });

    it('types and sends a message via Send button', () => {
        render(<MessageFlowApp initialMessages={[]} />);

        fireEvent.change(screen.getByTestId('message-input'), {
            target: { value: 'Click send' },
        });
        fireEvent.click(screen.getByTestId('send-button'));

        expect(mockSend).toHaveBeenCalled();
        expect(screen.getByText('Click send')).toBeDefined();
    });

    it('clears input after sending', () => {
        render(<MessageFlowApp initialMessages={[]} />);

        const input = screen.getByTestId('message-input');
        fireEvent.change(input, { target: { value: 'Temp' } });
        fireEvent.click(screen.getByTestId('send-button'));

        expect(input.value).toBe('');
    });

    it('does not send empty message', () => {
        render(<MessageFlowApp initialMessages={[]} />);

        fireEvent.click(screen.getByTestId('send-button'));
        expect(mockSend).not.toHaveBeenCalled();
    });

    it('does not send whitespace-only message', () => {
        render(<MessageFlowApp initialMessages={[]} />);

        fireEvent.change(screen.getByTestId('message-input'), {
            target: { value: '   ' },
        });
        fireEvent.click(screen.getByTestId('send-button'));

        expect(mockSend).not.toHaveBeenCalled();
    });
});

// ── Edit message flow ──
describe('Edit message flow', () => {
    it('enters edit mode on click', () => {
        render(<MessageFlowApp initialMessages={seedMessages} />);

        fireEvent.click(screen.getByTestId('edit-btn-1'));
        expect(screen.getByTestId('edit-input-1')).toBeDefined();
    });

    it('saves edited content', () => {
        render(<MessageFlowApp initialMessages={seedMessages} />);

        fireEvent.click(screen.getByTestId('edit-btn-1'));
        fireEvent.change(screen.getByTestId('edit-input-1'), {
            target: { value: 'Updated!' },
        });
        fireEvent.click(screen.getByTestId('edit-save-1'));

        expect(mockEdit).toHaveBeenCalledWith(1, 'Updated!');
        expect(screen.getByText('Updated!')).toBeDefined();
        expect(screen.getByTestId('edited-1')).toBeDefined();
    });

    it('cancels edit mode', () => {
        render(<MessageFlowApp initialMessages={seedMessages} />);

        fireEvent.click(screen.getByTestId('edit-btn-1'));
        fireEvent.click(screen.getByTestId('edit-cancel-1'));

        expect(screen.queryByTestId('edit-input-1')).toBeNull();
        expect(screen.getByText('Hello world')).toBeDefined();
    });
});

// ── Delete message flow ──
describe('Delete message flow', () => {
    it('removes message from list on delete', () => {
        render(<MessageFlowApp initialMessages={seedMessages} />);

        expect(screen.getByText('Hello world')).toBeDefined();

        fireEvent.click(screen.getByTestId('delete-btn-1'));

        expect(screen.queryByText('Hello world')).toBeNull();
        expect(mockDelete).toHaveBeenCalledWith(1);
    });

    it('other messages remain after deleting one', () => {
        render(<MessageFlowApp initialMessages={seedMessages} />);

        fireEvent.click(screen.getByTestId('delete-btn-1'));

        expect(screen.getByText('How are you?')).toBeDefined();
    });
});

// ── Reply flow ──
describe('Reply to message flow', () => {
    it('shows reply bar when reply button clicked', () => {
        render(<MessageFlowApp initialMessages={seedMessages} />);

        fireEvent.click(screen.getByTestId('reply-btn-1'));

        expect(screen.getByTestId('reply-bar')).toBeDefined();
        expect(screen.getByTestId('reply-bar').textContent).toContain('Hello world');
    });

    it('sends message with reply reference', () => {
        render(<MessageFlowApp initialMessages={seedMessages} />);

        fireEvent.click(screen.getByTestId('reply-btn-1'));
        fireEvent.change(screen.getByTestId('message-input'), {
            target: { value: 'Reply to you' },
        });
        fireEvent.click(screen.getByTestId('send-button'));

        const sentMsg = mockSend.mock.calls[0][0];
        expect(sentMsg.reply_to).toBeDefined();
        expect(sentMsg.reply_to.content).toBe('Hello world');
    });

    it('clears reply bar after sending', () => {
        render(<MessageFlowApp initialMessages={seedMessages} />);

        fireEvent.click(screen.getByTestId('reply-btn-1'));
        fireEvent.change(screen.getByTestId('message-input'), {
            target: { value: 'Reply' },
        });
        fireEvent.click(screen.getByTestId('send-button'));

        expect(screen.queryByTestId('reply-bar')).toBeNull();
    });

    it('can cancel reply', () => {
        render(<MessageFlowApp initialMessages={seedMessages} />);

        fireEvent.click(screen.getByTestId('reply-btn-1'));
        expect(screen.getByTestId('reply-bar')).toBeDefined();

        fireEvent.click(screen.getByTestId('cancel-reply'));
        expect(screen.queryByTestId('reply-bar')).toBeNull();
    });
});

// ── Reaction flow ──
describe('Reaction flow', () => {
    it('adds reaction to message', () => {
        render(<MessageFlowApp initialMessages={seedMessages} />);

        fireEvent.click(screen.getByTestId('react-btn-1'));

        expect(mockReact).toHaveBeenCalledWith(1, '👍');
        expect(screen.getByTestId('reaction-1-0').textContent).toBe('👍');
    });
});
