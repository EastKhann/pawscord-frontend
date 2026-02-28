// frontend/src/__tests__/components/MessageDisplay.test.jsx
// 🧪 Message (Display) Component Tests — Testing message rendering, types, and interactions
// (Separate from existing Message.test.jsx which tests the Mock directly)

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React, { useState, useCallback } from 'react';

// --- Enhanced Mock Message that covers more message types ---
const MockMessageDisplay = ({
    msg,
    currentUser = 'me',
    isAdmin = false,
    onDelete = vi.fn(),
    onStartEdit = vi.fn(),
    onToggleReaction = vi.fn(),
    onTogglePin = vi.fn(),
    onSetReply = vi.fn(),
    onImageClick = vi.fn(),
    onViewProfile = vi.fn(),
    onStartForward = vi.fn(),
    isSelectionMode = false,
    isSelected = false,
    onToggleSelection = vi.fn(),
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [contextMenu, setContextMenu] = useState(null);
    const [showReactionPicker, setShowReactionPicker] = useState(false);

    if (!msg || typeof msg !== 'object' || !msg.id) return null;

    const isMyMessage = msg.username === currentUser;
    const isAIMessage = ['Pawscord AI', 'PawPaw AI', '⚡ Signal Bot'].includes(msg.username);
    const isPinned = msg.is_pinned || false;

    const handleContextMenu = (e) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
    };

    return (
        <div
            data-testid={`msg-${msg.id}`}
            className={`message ${isMyMessage ? 'own-message' : ''} ${isSelected ? 'selected' : ''} ${isAIMessage ? 'ai-message' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onContextMenu={handleContextMenu}
            onClick={isSelectionMode ? () => onToggleSelection(msg.id) : undefined}
        >
            {/* Selection checkbox */}
            {isSelectionMode && (
                <input
                    type="checkbox"
                    data-testid={`select-${msg.id}`}
                    checked={isSelected}
                    onChange={() => onToggleSelection(msg.id)}
                />
            )}

            {/* Avatar */}
            <div
                data-testid={`avatar-${msg.id}`}
                onClick={() => onViewProfile(msg.username)}
                style={{ cursor: 'pointer' }}
            >
                <img src={msg.avatar || '/default.png'} alt={msg.username} />
            </div>

            {/* Header */}
            <div data-testid={`header-${msg.id}`}>
                <span
                    data-testid={`author-${msg.id}`}
                    onClick={() => onViewProfile(msg.username)}
                    style={{ cursor: 'pointer' }}
                >
                    {msg.username}
                </span>
                <span data-testid={`time-${msg.id}`}>{msg.created_at || 'just now'}</span>
                {isPinned && <span data-testid={`pin-badge-${msg.id}`}>📌</span>}
                {msg.edited && <span data-testid={`edited-${msg.id}`}>(düzenlendi)</span>}
                {isAIMessage && <span data-testid={`ai-badge-${msg.id}`}>🤖</span>}
            </div>

            {/* Content - different types */}
            {msg.is_voice_message ? (
                <div data-testid={`voice-${msg.id}`}>
                    🎤 Sesli Mesaj ({msg.duration || '0:00'})
                    <button data-testid={`play-voice-${msg.id}`}>▶</button>
                </div>
            ) : msg.poll ? (
                <div data-testid={`poll-${msg.id}`}>
                    📊 Anket: {msg.poll.question}
                    {msg.poll.options?.map((opt, i) => (
                        <div key={i} data-testid={`poll-option-${msg.id}-${i}`}>{opt.text} ({opt.votes || 0})</div>
                    ))}
                </div>
            ) : msg.image_url || msg.image ? (
                <div data-testid={`image-msg-${msg.id}`}>
                    {msg.content && <p data-testid={`content-${msg.id}`}>{msg.content}</p>}
                    <img
                        data-testid={`image-${msg.id}`}
                        src={msg.image_url || msg.image}
                        alt="attachment"
                        onClick={() => onImageClick(msg.image_url || msg.image)}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            ) : msg.file_url ? (
                <div data-testid={`file-msg-${msg.id}`}>
                    {msg.content && <p data-testid={`content-${msg.id}`}>{msg.content}</p>}
                    <a data-testid={`file-link-${msg.id}`} href={msg.file_url}>{msg.file_name || 'Download'}</a>
                </div>
            ) : (
                <div data-testid={`content-${msg.id}`}>{msg.content}</div>
            )}

            {/* Reply reference */}
            {msg.reply_to && (
                <div data-testid={`reply-ref-${msg.id}`}>
                    ↩ Replying to {msg.reply_to.username}: {msg.reply_to.content?.substring(0, 50)}
                </div>
            )}

            {/* Reactions */}
            {msg.reactions && msg.reactions.length > 0 && (
                <div data-testid={`reactions-${msg.id}`}>
                    {msg.reactions.map(r => (
                        <button
                            key={r.emoji}
                            data-testid={`reaction-${msg.id}-${r.emoji}`}
                            onClick={() => onToggleReaction(msg.id, r.emoji)}
                        >
                            {r.emoji} {r.count}
                        </button>
                    ))}
                </div>
            )}

            {/* Hover Toolbar */}
            {isHovered && !isSelectionMode && (
                <div data-testid={`toolbar-${msg.id}`}>
                    <button data-testid={`react-btn-${msg.id}`} onClick={() => setShowReactionPicker(!showReactionPicker)}>😀</button>
                    <button data-testid={`reply-btn-${msg.id}`} onClick={() => onSetReply(msg)}>↩</button>
                    <button data-testid={`forward-btn-${msg.id}`} onClick={() => onStartForward(msg)}>↗</button>
                    <button data-testid={`pin-btn-${msg.id}`} onClick={() => onTogglePin(msg.id)}>📌</button>
                    {isMyMessage && (
                        <>
                            <button data-testid={`edit-btn-${msg.id}`} onClick={() => onStartEdit(msg)}>✏️</button>
                            <button data-testid={`delete-btn-${msg.id}`} onClick={() => onDelete(msg.id)}>🗑️</button>
                        </>
                    )}
                    {isAdmin && !isMyMessage && (
                        <button data-testid={`admin-delete-${msg.id}`} onClick={() => onDelete(msg.id)}>🛡️</button>
                    )}
                </div>
            )}

            {/* Context Menu */}
            {contextMenu && (
                <div data-testid={`ctx-menu-${msg.id}`}>
                    <button data-testid={`ctx-copy-${msg.id}`} onClick={() => { navigator.clipboard.writeText(msg.content); setContextMenu(null); }}>Kopyala</button>
                    <button data-testid={`ctx-reply-${msg.id}`} onClick={() => { onSetReply(msg); setContextMenu(null); }}>Yanıtla</button>
                    <button data-testid={`ctx-forward-${msg.id}`} onClick={() => { onStartForward(msg); setContextMenu(null); }}>İlet</button>
                </div>
            )}
        </div>
    );
};

describe('MessageDisplay Component', () => {
    const textMsg = {
        id: 1, username: 'alice', content: 'Hello everyone!', created_at: '10:30',
        avatar: 'https://example.com/alice.png', reactions: [], edited: false,
    };
    const editedMsg = { ...textMsg, id: 2, edited: true };
    const pinnedMsg = { ...textMsg, id: 3, is_pinned: true };
    const imageMsg = {
        id: 4, username: 'bob', content: 'Check this out', image_url: 'https://example.com/img.png',
        avatar: 'https://example.com/bob.png', reactions: [],
    };
    const voiceMsg = {
        id: 5, username: 'charlie', is_voice_message: true, duration: '0:15',
        avatar: 'https://example.com/charlie.png', reactions: [],
    };
    const pollMsg = {
        id: 6, username: 'alice', poll: { question: 'Best color?', options: [{ text: 'Red', votes: 3 }, { text: 'Blue', votes: 5 }] },
        avatar: 'https://example.com/alice.png', reactions: [],
    };
    const replyMsg = {
        id: 7, username: 'bob', content: 'I agree!',
        reply_to: { username: 'alice', content: 'Hello everyone!' },
        avatar: 'https://example.com/bob.png', reactions: [],
    };
    const aiMsg = {
        id: 8, username: 'Pawscord AI', content: 'Here is a cool fact...',
        avatar: 'https://example.com/ai.png', reactions: [],
    };
    const reactedMsg = {
        ...textMsg, id: 9,
        reactions: [{ emoji: '👍', count: 3 }, { emoji: '❤️', count: 1 }],
    };

    let handlers;

    beforeEach(() => {
        handlers = {
            onDelete: vi.fn(), onStartEdit: vi.fn(), onToggleReaction: vi.fn(),
            onTogglePin: vi.fn(), onSetReply: vi.fn(), onImageClick: vi.fn(),
            onViewProfile: vi.fn(), onStartForward: vi.fn(), onToggleSelection: vi.fn(),
        };
    });

    describe('Basic Rendering', () => {
        it('should return null for invalid msg', () => {
            const { container } = render(<MockMessageDisplay msg={null} {...handlers} />);
            expect(container.innerHTML).toBe('');
        });

        it('should render text message', () => {
            render(<MockMessageDisplay msg={textMsg} {...handlers} />);
            expect(screen.getByTestId('content-1')).toHaveTextContent('Hello everyone!');
            expect(screen.getByTestId('author-1')).toHaveTextContent('alice');
        });

        it('should show edited badge', () => {
            render(<MockMessageDisplay msg={editedMsg} {...handlers} />);
            expect(screen.getByTestId('edited-2')).toHaveTextContent('(düzenlendi)');
        });

        it('should show pinned badge', () => {
            render(<MockMessageDisplay msg={pinnedMsg} {...handlers} />);
            expect(screen.getByTestId('pin-badge-3')).toHaveTextContent('📌');
        });

        it('should show AI badge for AI messages', () => {
            render(<MockMessageDisplay msg={aiMsg} {...handlers} />);
            expect(screen.getByTestId('ai-badge-8')).toHaveTextContent('🤖');
        });
    });

    describe('Message Types', () => {
        it('should render image message with preview', () => {
            render(<MockMessageDisplay msg={imageMsg} {...handlers} />);
            expect(screen.getByTestId('image-msg-4')).toBeInTheDocument();
            expect(screen.getByTestId('image-4')).toHaveAttribute('src', 'https://example.com/img.png');
        });

        it('should call onImageClick when image is clicked', () => {
            render(<MockMessageDisplay msg={imageMsg} {...handlers} />);
            fireEvent.click(screen.getByTestId('image-4'));
            expect(handlers.onImageClick).toHaveBeenCalledWith('https://example.com/img.png');
        });

        it('should render voice message', () => {
            render(<MockMessageDisplay msg={voiceMsg} {...handlers} />);
            expect(screen.getByTestId('voice-5')).toBeInTheDocument();
            expect(screen.getByTestId('play-voice-5')).toBeInTheDocument();
        });

        it('should render poll message', () => {
            render(<MockMessageDisplay msg={pollMsg} {...handlers} />);
            expect(screen.getByTestId('poll-6')).toBeInTheDocument();
            expect(screen.getByTestId('poll-option-6-0')).toHaveTextContent('Red (3)');
            expect(screen.getByTestId('poll-option-6-1')).toHaveTextContent('Blue (5)');
        });

        it('should render reply reference', () => {
            render(<MockMessageDisplay msg={replyMsg} {...handlers} />);
            expect(screen.getByTestId('reply-ref-7')).toBeInTheDocument();
        });
    });

    describe('Reactions', () => {
        it('should render reactions', () => {
            render(<MockMessageDisplay msg={reactedMsg} {...handlers} />);
            expect(screen.getByTestId('reactions-9')).toBeInTheDocument();
            expect(screen.getByTestId('reaction-9-👍')).toHaveTextContent('👍 3');
            expect(screen.getByTestId('reaction-9-❤️')).toHaveTextContent('❤️ 1');
        });

        it('should call onToggleReaction when reaction clicked', () => {
            render(<MockMessageDisplay msg={reactedMsg} {...handlers} />);
            fireEvent.click(screen.getByTestId('reaction-9-👍'));
            expect(handlers.onToggleReaction).toHaveBeenCalledWith(9, '👍');
        });
    });

    describe('Hover Actions', () => {
        it('should show toolbar on hover', () => {
            render(<MockMessageDisplay msg={textMsg} currentUser="me" {...handlers} />);
            fireEvent.mouseEnter(screen.getByTestId('msg-1'));
            expect(screen.getByTestId('toolbar-1')).toBeInTheDocument();
        });

        it('should hide toolbar on mouse leave', () => {
            render(<MockMessageDisplay msg={textMsg} {...handlers} />);
            fireEvent.mouseEnter(screen.getByTestId('msg-1'));
            expect(screen.getByTestId('toolbar-1')).toBeInTheDocument();
            fireEvent.mouseLeave(screen.getByTestId('msg-1'));
            expect(screen.queryByTestId('toolbar-1')).not.toBeInTheDocument();
        });

        it('should show edit/delete for own messages', () => {
            render(<MockMessageDisplay msg={{ ...textMsg, username: 'me' }} currentUser="me" {...handlers} />);
            fireEvent.mouseEnter(screen.getByTestId('msg-1'));
            expect(screen.getByTestId('edit-btn-1')).toBeInTheDocument();
            expect(screen.getByTestId('delete-btn-1')).toBeInTheDocument();
        });

        it('should NOT show edit/delete for other users messages', () => {
            render(<MockMessageDisplay msg={textMsg} currentUser="me" {...handlers} />);
            fireEvent.mouseEnter(screen.getByTestId('msg-1'));
            expect(screen.queryByTestId('edit-btn-1')).not.toBeInTheDocument();
            expect(screen.queryByTestId('delete-btn-1')).not.toBeInTheDocument();
        });

        it('should show admin delete for admin', () => {
            render(<MockMessageDisplay msg={textMsg} currentUser="me" isAdmin={true} {...handlers} />);
            fireEvent.mouseEnter(screen.getByTestId('msg-1'));
            expect(screen.getByTestId('admin-delete-1')).toBeInTheDocument();
        });
    });

    describe('Context Menu', () => {
        it('should show context menu on right-click', () => {
            render(<MockMessageDisplay msg={textMsg} {...handlers} />);
            fireEvent.contextMenu(screen.getByTestId('msg-1'));
            expect(screen.getByTestId('ctx-menu-1')).toBeInTheDocument();
        });

        it('should call onSetReply from context menu', () => {
            render(<MockMessageDisplay msg={textMsg} {...handlers} />);
            fireEvent.contextMenu(screen.getByTestId('msg-1'));
            fireEvent.click(screen.getByTestId('ctx-reply-1'));
            expect(handlers.onSetReply).toHaveBeenCalledWith(textMsg);
        });
    });

    describe('Selection Mode', () => {
        it('should show checkbox in selection mode', () => {
            render(<MockMessageDisplay msg={textMsg} isSelectionMode={true} {...handlers} />);
            expect(screen.getByTestId('select-1')).toBeInTheDocument();
        });

        it('should call onToggleSelection on click in selection mode', () => {
            render(<MockMessageDisplay msg={textMsg} isSelectionMode={true} {...handlers} />);
            fireEvent.click(screen.getByTestId('msg-1'));
            expect(handlers.onToggleSelection).toHaveBeenCalledWith(1);
        });

        it('should NOT show toolbar in selection mode', () => {
            render(<MockMessageDisplay msg={textMsg} isSelectionMode={true} {...handlers} />);
            fireEvent.mouseEnter(screen.getByTestId('msg-1'));
            expect(screen.queryByTestId('toolbar-1')).not.toBeInTheDocument();
        });
    });

    describe('Profile Navigation', () => {
        it('should call onViewProfile when clicking author name', () => {
            render(<MockMessageDisplay msg={textMsg} {...handlers} />);
            fireEvent.click(screen.getByTestId('author-1'));
            expect(handlers.onViewProfile).toHaveBeenCalledWith('alice');
        });

        it('should call onViewProfile when clicking avatar', () => {
            render(<MockMessageDisplay msg={textMsg} {...handlers} />);
            fireEvent.click(screen.getByTestId('avatar-1'));
            expect(handlers.onViewProfile).toHaveBeenCalledWith('alice');
        });
    });
});
