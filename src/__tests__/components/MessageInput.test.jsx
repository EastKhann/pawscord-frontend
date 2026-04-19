/* eslint-disable jsx-a11y/label-has-associated-control */
// frontend/src/__tests__/components/MessageInput.test.jsx
// 🧪 MessageInput Component Tests

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';

// --- Mock MessageInput (replicates essential UI/behavior) ---
const MockMessageInput = ({
    onSendMessage = vi.fn(),
    onFileUpload = vi.fn(),
    placeholder = 'Mesaj yaz...',
    editingMessage = null,
    onCancelEdit = null,
    replyingTo = null,
    onCancelReply = null,
    disabled = false,
}) => {
    const [message, setMessage] = useState(editingMessage?.content || '');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleSubmit = (e) => {
        e?.preventDefault();
        const trimmed = message.trim();
        if (!trimmed || disabled) return;
        onSendMessage(trimmed);
        setMessage('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
        if (e.key === 'Escape') {
            if (editingMessage && onCancelEdit) onCancelEdit();
            if (replyingTo && onCancelReply) onCancelReply();
        }
    };

    return (
        <div data-testid="message-input-container" role="form" aria-label="Mesaj gönderme alanı">
            {replyingTo && (
                <div data-testid="reply-preview" role="status" aria-label="Replynan message">
                    <strong>@{replyingTo.author}</strong>
                    <span>{replyingTo.content?.substring(0, 50)}...</span>
                    <button data-testid="cancel-reply" onClick={onCancelReply}>
                        ✕
                    </button>
                </div>
            )}

            {editingMessage && (
                <div data-testid="edit-preview" role="status" aria-label="Mesaj editniyor">
                    <span>📝 Mesaj editniyor</span>
                    <button data-testid="cancel-edit" onClick={onCancelEdit}>
                        ✕
                    </button>
                </div>
            )}

            <div data-testid="input-wrapper">
                <button
                    data-testid="emoji-button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    aria-label="Emoji seç"
                >
                    😀
                </button>

                <textarea
                    data-testid="message-textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    aria-label={editingMessage ? 'Mesaj edit' : placeholder}
                    rows={1}
                />

                <button
                    data-testid="send-button"
                    onClick={handleSubmit}
                    disabled={disabled || !message.trim()}
                    aria-label="Gönder"
                >
                    Gönder
                </button>
                <label data-testid="file-upload-label">
                    <input
                        data-testid="file-input"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                            if (e.target.files[0]) onFileUpload(e.target.files[0]);
                        }}
                    />
                    📎
                </label>
            </div>

            {showEmojiPicker && (
                <div data-testid="emoji-picker-popover">
                    <button
                        data-testid="emoji-option-smile"
                        onClick={() => {
                            setMessage((m) => m + '😊');
                            setShowEmojiPicker(false);
                        }}
                    >
                        😊
                    </button>
                    <button
                        data-testid="emoji-option-heart"
                        onClick={() => {
                            setMessage((m) => m + '❤️');
                            setShowEmojiPicker(false);
                        }}
                    >
                        ❤️
                    </button>
                </div>
            )}
        </div>
    );
};

describe('MessageInput Component', () => {
    let mockSendMessage;
    let mockFileUpload;
    let mockCancelEdit;
    let mockCancelReply;

    beforeEach(() => {
        mockSendMessage = vi.fn();
        mockFileUpload = vi.fn();
        mockCancelEdit = vi.fn();
        mockCancelReply = vi.fn();
    });

    describe('Rendering', () => {
        it('should render the input container', () => {
            render(<MockMessageInput onSendMessage={mockSendMessage} />);
            expect(screen.getByTestId('message-input-container')).toBeInTheDocument();
        });

        it('should render textarea with default placeholder', () => {
            render(<MockMessageInput onSendMessage={mockSendMessage} />);
            expect(screen.getByPlaceholderText('Mesaj yaz...')).toBeInTheDocument();
        });

        it('should render textarea with custom placeholder', () => {
            render(<MockMessageInput onSendMessage={mockSendMessage} placeholder="Type here..." />);
            expect(screen.getByPlaceholderText('Type here...')).toBeInTheDocument();
        });

        it('should render send and emoji buttons', () => {
            render(<MockMessageInput onSendMessage={mockSendMessage} />);
            expect(screen.getByTestId('send-button')).toBeInTheDocument();
            expect(screen.getByTestId('emoji-button')).toBeInTheDocument();
        });

        it('should show disabled textarea when disabled prop is true', () => {
            render(<MockMessageInput onSendMessage={mockSendMessage} disabled={true} />);
            expect(screen.getByTestId('message-textarea')).toBeDisabled();
        });
    });

    describe('Typing and Sending', () => {
        it('should update textarea value on typing', async () => {
            render(<MockMessageInput onSendMessage={mockSendMessage} />);
            const textarea = screen.getByTestId('message-textarea');

            fireEvent.change(textarea, { target: { value: 'Hello World' } });
            expect(textarea.value).toBe('Hello World');
        });

        it('should call onSendMessage on send button click', () => {
            render(<MockMessageInput onSendMessage={mockSendMessage} />);
            const textarea = screen.getByTestId('message-textarea');

            fireEvent.change(textarea, { target: { value: 'Test message' } });
            fireEvent.click(screen.getByTestId('send-button'));

            expect(mockSendMessage).toHaveBeenCalledWith('Test message');
        });

        it('should clear textarea after sending', () => {
            render(<MockMessageInput onSendMessage={mockSendMessage} />);
            const textarea = screen.getByTestId('message-textarea');

            fireEvent.change(textarea, { target: { value: 'Test message' } });
            fireEvent.click(screen.getByTestId('send-button'));

            expect(textarea.value).toBe('');
        });

        it('should send on Enter key press', () => {
            render(<MockMessageInput onSendMessage={mockSendMessage} />);
            const textarea = screen.getByTestId('message-textarea');

            fireEvent.change(textarea, { target: { value: 'Enter test' } });
            fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false });

            expect(mockSendMessage).toHaveBeenCalledWith('Enter test');
        });

        it('should NOT send on Shift+Enter (allows newline)', () => {
            render(<MockMessageInput onSendMessage={mockSendMessage} />);
            const textarea = screen.getByTestId('message-textarea');

            fireEvent.change(textarea, { target: { value: 'Multiline' } });
            fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true });

            expect(mockSendMessage).not.toHaveBeenCalled();
        });

        it('should NOT send empty messages', () => {
            render(<MockMessageInput onSendMessage={mockSendMessage} />);
            fireEvent.click(screen.getByTestId('send-button'));
            expect(mockSendMessage).not.toHaveBeenCalled();
        });

        it('should NOT send whitespace-only messages', () => {
            render(<MockMessageInput onSendMessage={mockSendMessage} />);
            const textarea = screen.getByTestId('message-textarea');

            fireEvent.change(textarea, { target: { value: '   ' } });
            fireEvent.click(screen.getByTestId('send-button'));

            expect(mockSendMessage).not.toHaveBeenCalled();
        });
    });

    describe('Emoji Picker', () => {
        it('should toggle emoji picker on button click', () => {
            render(<MockMessageInput onSendMessage={mockSendMessage} />);

            expect(screen.queryByTestId('emoji-picker-popover')).not.toBeInTheDocument();
            fireEvent.click(screen.getByTestId('emoji-button'));
            expect(screen.getByTestId('emoji-picker-popover')).toBeInTheDocument();
        });

        it('should insert emoji into message and close picker', () => {
            render(<MockMessageInput onSendMessage={mockSendMessage} />);
            fireEvent.click(screen.getByTestId('emoji-button'));
            fireEvent.click(screen.getByTestId('emoji-option-smile'));

            expect(screen.getByTestId('message-textarea').value).toBe('😊');
            expect(screen.queryByTestId('emoji-picker-popover')).not.toBeInTheDocument();
        });
    });

    describe('Edit Mode', () => {
        it('should show edit preview when editingMessage is provided', () => {
            render(
                <MockMessageInput
                    onSendMessage={mockSendMessage}
                    editingMessage={{ id: 1, content: 'Original text' }}
                    onCancelEdit={mockCancelEdit}
                />
            );
            expect(screen.getByTestId('edit-preview')).toBeInTheDocument();
        });

        it('should pre-fill textarea with editing message content', () => {
            render(
                <MockMessageInput
                    onSendMessage={mockSendMessage}
                    editingMessage={{ id: 1, content: 'Original text' }}
                    onCancelEdit={mockCancelEdit}
                />
            );
            expect(screen.getByTestId('message-textarea').value).toBe('Original text');
        });

        it('should call onCancelEdit on cancel button click', () => {
            render(
                <MockMessageInput
                    onSendMessage={mockSendMessage}
                    editingMessage={{ id: 1, content: 'Original text' }}
                    onCancelEdit={mockCancelEdit}
                />
            );
            fireEvent.click(screen.getByTestId('cancel-edit'));
            expect(mockCancelEdit).toHaveBeenCalled();
        });

        it('should call onCancelEdit on Escape key', () => {
            render(
                <MockMessageInput
                    onSendMessage={mockSendMessage}
                    editingMessage={{ id: 1, content: 'Original text' }}
                    onCancelEdit={mockCancelEdit}
                />
            );
            fireEvent.keyDown(screen.getByTestId('message-textarea'), { key: 'Escape' });
            expect(mockCancelEdit).toHaveBeenCalled();
        });
    });

    describe('Reply Mode', () => {
        it('should show reply preview when replyingTo is provided', () => {
            render(
                <MockMessageInput
                    onSendMessage={mockSendMessage}
                    replyingTo={{ id: 1, author: 'TestUser', content: 'Hello' }}
                    onCancelReply={mockCancelReply}
                />
            );
            expect(screen.getByTestId('reply-preview')).toBeInTheDocument();
            expect(screen.getByText('@TestUser')).toBeInTheDocument();
        });

        it('should call onCancelReply on cancel button click', () => {
            render(
                <MockMessageInput
                    onSendMessage={mockSendMessage}
                    replyingTo={{ id: 1, author: 'TestUser', content: 'Hello' }}
                    onCancelReply={mockCancelReply}
                />
            );
            fireEvent.click(screen.getByTestId('cancel-reply'));
            expect(mockCancelReply).toHaveBeenCalled();
        });
    });
});
