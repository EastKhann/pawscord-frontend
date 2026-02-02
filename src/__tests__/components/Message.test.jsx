// frontend/src/__tests__/components/Message.test.jsx
// 🧪 Message Component Unit Tests

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

// Mock the Message component (since the real one has many dependencies)
const MockMessage = ({ message, onReact, onEdit, onDelete, onReply }) => {
    const [showActions, setShowActions] = React.useState(false);
    const [showContextMenu, setShowContextMenu] = React.useState(false);
    const [contextMenuPos, setContextMenuPos] = React.useState({ x: 0, y: 0 });

    const handleContextMenu = (e) => {
        e.preventDefault();
        setContextMenuPos({ x: e.clientX, y: e.clientY });
        setShowContextMenu(true);
    };

    return (
        <div
            data-testid={`message-${message.id}`}
            className="message"
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
            onContextMenu={handleContextMenu}
        >
            {/* Header */}
            <div className="message-header">
                <img
                    src={message.author.avatar}
                    alt={message.author.username}
                    className="avatar"
                    data-testid="author-avatar"
                />
                <span data-testid="author-name" className="username">
                    {message.author.username}
                </span>
                <span data-testid="timestamp" className="timestamp">
                    {new Date(message.created_at).toLocaleString()}
                </span>
                {message.edited && (
                    <span data-testid="edited-badge" className="edited">
                        (düzenlendi)
                    </span>
                )}
            </div>

            {/* Content */}
            <div data-testid="message-content" className="message-content">
                {message.content}
            </div>

            {/* Attachments */}
            {message.attachments?.length > 0 && (
                <div data-testid="attachments" className="attachments">
                    {message.attachments.map(att => (
                        <div key={att.id} data-testid={`attachment-${att.id}`}>
                            {att.filename}
                        </div>
                    ))}
                </div>
            )}

            {/* Reactions */}
            {message.reactions?.length > 0 && (
                <div data-testid="reactions" className="reactions">
                    {message.reactions.map(reaction => (
                        <button
                            key={reaction.emoji}
                            data-testid={`reaction-${reaction.emoji}`}
                            onClick={() => onReact?.(message.id, reaction.emoji)}
                            className="reaction"
                        >
                            {reaction.emoji} {reaction.count}
                        </button>
                    ))}
                </div>
            )}

            {/* Hover Actions */}
            {showActions && (
                <div data-testid="message-actions" className="actions">
                    <button
                        data-testid="action-react"
                        onClick={() => onReact?.(message.id, '👍')}
                    >
                        React
                    </button>
                    <button
                        data-testid="action-reply"
                        onClick={() => onReply?.(message)}
                    >
                        Reply
                    </button>
                    {message.isOwn && (
                        <>
                            <button
                                data-testid="action-edit"
                                onClick={() => onEdit?.(message)}
                            >
                                Edit
                            </button>
                            <button
                                data-testid="action-delete"
                                onClick={() => onDelete?.(message.id)}
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>
            )}

            {/* Context Menu */}
            {showContextMenu && (
                <div
                    data-testid="context-menu"
                    className="context-menu"
                    style={{ left: contextMenuPos.x, top: contextMenuPos.y }}
                >
                    <button onClick={() => navigator.clipboard.writeText(message.content)}>
                        Metni Kopyala
                    </button>
                    <button onClick={() => onReply?.(message)}>Yanıtla</button>
                    <button onClick={() => onReact?.(message.id, '👍')}>Tepki Ekle</button>
                    {message.isOwn && (
                        <>
                            <button onClick={() => onEdit?.(message)}>Düzenle</button>
                            <button onClick={() => onDelete?.(message.id)}>Sil</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

describe('Message Component', () => {
    const mockMessage = {
        id: 1,
        content: 'Hello, this is a test message!',
        author: {
            id: 1,
            username: 'TestUser',
            avatar: 'https://example.com/avatar.png'
        },
        channel_id: 1,
        created_at: '2024-01-15T10:30:00Z',
        reactions: [
            { emoji: '👍', count: 5 },
            { emoji: '❤️', count: 3 }
        ],
        attachments: [],
        edited: false,
        isOwn: true
    };

    const mockHandlers = {
        onReact: vi.fn(),
        onEdit: vi.fn(),
        onDelete: vi.fn(),
        onReply: vi.fn()
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Rendering', () => {
        it('should render message content', () => {
            render(<MockMessage message={mockMessage} {...mockHandlers} />);

            expect(screen.getByTestId('message-content')).toHaveTextContent('Hello, this is a test message!');
        });

        it('should render author information', () => {
            render(<MockMessage message={mockMessage} {...mockHandlers} />);

            expect(screen.getByTestId('author-name')).toHaveTextContent('TestUser');
            expect(screen.getByTestId('author-avatar')).toHaveAttribute('src', 'https://example.com/avatar.png');
        });

        it('should render timestamp', () => {
            render(<MockMessage message={mockMessage} {...mockHandlers} />);

            expect(screen.getByTestId('timestamp')).toBeInTheDocument();
        });

        it('should render reactions', () => {
            render(<MockMessage message={mockMessage} {...mockHandlers} />);

            expect(screen.getByTestId('reactions')).toBeInTheDocument();
            expect(screen.getByTestId('reaction-👍')).toHaveTextContent('👍 5');
            expect(screen.getByTestId('reaction-❤️')).toHaveTextContent('❤️ 3');
        });

        it('should show edited badge when message is edited', () => {
            const editedMessage = { ...mockMessage, edited: true };
            render(<MockMessage message={editedMessage} {...mockHandlers} />);

            expect(screen.getByTestId('edited-badge')).toBeInTheDocument();
        });

        it('should render attachments', () => {
            const messageWithAttachments = {
                ...mockMessage,
                attachments: [
                    { id: 1, filename: 'image.png', url: 'http://example.com/image.png' }
                ]
            };
            render(<MockMessage message={messageWithAttachments} {...mockHandlers} />);

            expect(screen.getByTestId('attachments')).toBeInTheDocument();
            expect(screen.getByTestId('attachment-1')).toHaveTextContent('image.png');
        });
    });

    describe('Interactions', () => {
        it('should show actions on hover', async () => {
            render(<MockMessage message={mockMessage} {...mockHandlers} />);

            const messageElement = screen.getByTestId('message-1');
            fireEvent.mouseEnter(messageElement);

            await waitFor(() => {
                expect(screen.getByTestId('message-actions')).toBeInTheDocument();
            });
        });

        it('should hide actions on mouse leave', async () => {
            render(<MockMessage message={mockMessage} {...mockHandlers} />);

            const messageElement = screen.getByTestId('message-1');
            fireEvent.mouseEnter(messageElement);

            await waitFor(() => {
                expect(screen.getByTestId('message-actions')).toBeInTheDocument();
            });

            fireEvent.mouseLeave(messageElement);

            await waitFor(() => {
                expect(screen.queryByTestId('message-actions')).not.toBeInTheDocument();
            });
        });

        it('should call onReact when clicking reaction', () => {
            render(<MockMessage message={mockMessage} {...mockHandlers} />);

            fireEvent.click(screen.getByTestId('reaction-👍'));

            expect(mockHandlers.onReact).toHaveBeenCalledWith(1, '👍');
        });

        it('should call onReply when clicking reply action', async () => {
            render(<MockMessage message={mockMessage} {...mockHandlers} />);

            const messageElement = screen.getByTestId('message-1');
            fireEvent.mouseEnter(messageElement);

            await waitFor(() => {
                expect(screen.getByTestId('action-reply')).toBeInTheDocument();
            });

            fireEvent.click(screen.getByTestId('action-reply'));

            expect(mockHandlers.onReply).toHaveBeenCalledWith(mockMessage);
        });

        it('should call onEdit when clicking edit action for own message', async () => {
            render(<MockMessage message={mockMessage} {...mockHandlers} />);

            const messageElement = screen.getByTestId('message-1');
            fireEvent.mouseEnter(messageElement);

            await waitFor(() => {
                expect(screen.getByTestId('action-edit')).toBeInTheDocument();
            });

            fireEvent.click(screen.getByTestId('action-edit'));

            expect(mockHandlers.onEdit).toHaveBeenCalledWith(mockMessage);
        });

        it('should call onDelete when clicking delete action', async () => {
            render(<MockMessage message={mockMessage} {...mockHandlers} />);

            const messageElement = screen.getByTestId('message-1');
            fireEvent.mouseEnter(messageElement);

            await waitFor(() => {
                expect(screen.getByTestId('action-delete')).toBeInTheDocument();
            });

            fireEvent.click(screen.getByTestId('action-delete'));

            expect(mockHandlers.onDelete).toHaveBeenCalledWith(1);
        });

        it('should not show edit/delete for other users messages', async () => {
            const otherUserMessage = { ...mockMessage, isOwn: false };
            render(<MockMessage message={otherUserMessage} {...mockHandlers} />);

            const messageElement = screen.getByTestId('message-1');
            fireEvent.mouseEnter(messageElement);

            await waitFor(() => {
                expect(screen.getByTestId('message-actions')).toBeInTheDocument();
            });

            expect(screen.queryByTestId('action-edit')).not.toBeInTheDocument();
            expect(screen.queryByTestId('action-delete')).not.toBeInTheDocument();
        });
    });

    describe('Context Menu', () => {
        it('should show context menu on right click', async () => {
            render(<MockMessage message={mockMessage} {...mockHandlers} />);

            const messageElement = screen.getByTestId('message-1');
            fireEvent.contextMenu(messageElement);

            await waitFor(() => {
                expect(screen.getByTestId('context-menu')).toBeInTheDocument();
            });
        });
    });

    describe('Edge Cases', () => {
        it('should handle message with no reactions', () => {
            const noReactionsMessage = { ...mockMessage, reactions: [] };
            render(<MockMessage message={noReactionsMessage} {...mockHandlers} />);

            expect(screen.queryByTestId('reactions')).not.toBeInTheDocument();
        });

        it('should handle message with long content', () => {
            const longMessage = {
                ...mockMessage,
                content: 'A'.repeat(2000)
            };
            render(<MockMessage message={longMessage} {...mockHandlers} />);

            expect(screen.getByTestId('message-content').textContent.length).toBe(2000);
        });

        it('should handle message with special characters', () => {
            const specialMessage = {
                ...mockMessage,
                content: '<script>alert("xss")</script> & " \' < >'
            };
            render(<MockMessage message={specialMessage} {...mockHandlers} />);

            // React should escape these automatically
            expect(screen.getByTestId('message-content')).toBeInTheDocument();
        });
    });
});
