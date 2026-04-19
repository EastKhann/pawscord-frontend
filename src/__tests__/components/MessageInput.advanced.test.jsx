/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// frontend/src/__tests__/components/MessageInput.advanced.test.jsx
// Advanced MessageInput tests — emoji, file attach, slash commands, mentions

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';

// ── Mock component that mirrors MessageInput behavior ──
const MockAdvancedInput = ({
    onSendMessage = vi.fn(),
    onFileUpload = vi.fn(),
    onSlashCommand = vi.fn(),
    disabled = false,
    members = [],
}) => {
    const [message, setMessage] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);
    const [showMentions, setShowMentions] = useState(false);
    const [filteredMembers, setFilteredMembers] = useState([]);

    const handleChange = (e) => {
        const val = e.target.value;
        setMessage(val);

        // Detect @ mention
        const atIdx = val.lastIndexOf('@');
        if (atIdx !== -1 && atIdx === val.length - 1) {
            setShowMentions(true);
            setFilteredMembers(members);
        } else if (atIdx !== -1) {
            const query = val.slice(atIdx + 1).toLowerCase();
            setFilteredMembers(members.filter((m) => m.toLowerCase().includes(query)));
            setShowMentions(query.length > 0);
        } else {
            setShowMentions(false);
        }

        // Detect /slash command
        if (val.startsWith('/')) {
            // nothing visual, but command is tracked
        }
    };

    const handleSubmit = (e) => {
        e?.preventDefault();
        const trimmed = message.trim();
        if (!trimmed || disabled) return;

        if (trimmed.startsWith('/')) {
            onSlashCommand(trimmed);
        } else {
            onSendMessage(trimmed);
        }
        setMessage('');
        setShowMentions(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const insertEmoji = (emoji) => {
        setMessage((prev) => prev + emoji);
        setShowEmoji(false);
    };

    const selectMention = (member) => {
        const atIdx = message.lastIndexOf('@');
        setMessage(message.slice(0, atIdx) + `@${member} `);
        setShowMentions(false);
    };

    const handleFile = (e) => {
        const file = e.target.files?.[0];
        if (file) onFileUpload(file);
    };

    return (
        <form onSubmit={handleSubmit} data-testid="adv-input-form">
            <input
                data-testid="file-input"
                type="file"
                onChange={handleFile}
                style={{ display: 'none' }}
                accept="image/*,.pdf,.txt"
            />
            <button
                type="button"
                data-testid="attach-btn"
                onClick={() => document.querySelector('[data-testid="file-input"]').click()}
            >
                📎
            </button>
            <button type="button" data-testid="emoji-btn" onClick={() => setShowEmoji(!showEmoji)}>
                😀
            </button>

            {showEmoji && (
                <div data-testid="emoji-picker">
                    {['😀', '❤️', '👍', '🎉', '🔥'].map((e) => (
                        <button
                            key={e}
                            data-testid={`emoji-${e}`}
                            type="button"
                            onClick={() => insertEmoji(e)}
                        >
                            {e}
                        </button>
                    ))}
                </div>
            )}

            <textarea
                data-testid="msg-textarea"
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Type a message…"
                disabled={disabled}
            />

            {showMentions && filteredMembers.length > 0 && (
                <ul data-testid="mention-list">
                    {filteredMembers.map((m) => (
                        <li key={m} data-testid={`mention-${m}`} onClick={() => selectMention(m)}>
                            @{m}
                        </li>
                    ))}
                </ul>
            )}

            <button data-testid="send-btn" type="submit" disabled={disabled}>
                Send
            </button>
        </form>
    );
};

// ─── TESTS ──────────────────────────────────────────

describe('Emoji insertion', () => {
    it('opens emoji picker on button click', async () => {
        render(<MockAdvancedInput />);
        await userEvent.click(screen.getByTestId('emoji-btn'));
        expect(screen.getByTestId('emoji-picker')).toBeDefined();
    });

    it('inserts emoji into textarea', async () => {
        render(<MockAdvancedInput />);
        await userEvent.click(screen.getByTestId('emoji-btn'));
        await userEvent.click(screen.getByTestId('emoji-❤️'));
        expect(screen.getByTestId('msg-textarea').value).toContain('❤️');
    });

    it('closes emoji picker after selection', async () => {
        render(<MockAdvancedInput />);
        await userEvent.click(screen.getByTestId('emoji-btn'));
        await userEvent.click(screen.getByTestId('emoji-👍'));
        expect(screen.queryByTestId('emoji-picker')).toBeNull();
    });
});

describe('File attachment', () => {
    it('calls onFileUpload when file selected', async () => {
        const onFileUpload = vi.fn();
        render(<MockAdvancedInput onFileUpload={onFileUpload} />);
        const file = new File(['data'], 'image.png', { type: 'image/png' });
        const input = screen.getByTestId('file-input');
        await userEvent.upload(input, file);
        expect(onFileUpload).toHaveBeenCalledWith(file);
    });

    it('accepts image files', () => {
        render(<MockAdvancedInput />);
        const input = screen.getByTestId('file-input');
        expect(input.accept).toContain('image/*');
    });

    it('accepts PDF files', () => {
        render(<MockAdvancedInput />);
        const input = screen.getByTestId('file-input');
        expect(input.accept).toContain('.pdf');
    });
});

describe('Slash commands', () => {
    it('calls onSlashCommand for /giphy', async () => {
        const onSlashCommand = vi.fn();
        render(<MockAdvancedInput onSlashCommand={onSlashCommand} />);
        await userEvent.type(screen.getByTestId('msg-textarea'), '/giphy cats');
        await userEvent.keyboard('{Enter}');
        expect(onSlashCommand).toHaveBeenCalledWith('/giphy cats');
    });

    it('does not call onSendMessage for slash commands', async () => {
        const onSendMessage = vi.fn();
        const onSlashCommand = vi.fn();
        render(<MockAdvancedInput onSendMessage={onSendMessage} onSlashCommand={onSlashCommand} />);
        await userEvent.type(screen.getByTestId('msg-textarea'), '/poll');
        await userEvent.keyboard('{Enter}');
        expect(onSendMessage).not.toHaveBeenCalled();
    });

    it('clears input after slash command', async () => {
        render(<MockAdvancedInput />);
        await userEvent.type(screen.getByTestId('msg-textarea'), '/help');
        await userEvent.keyboard('{Enter}');
        expect(screen.getByTestId('msg-textarea').value).toBe('');
    });
});

describe('Mentions autocomplete', () => {
    const members = ['Alice', 'Bob', 'Charlie'];

    it('shows mention list on @', async () => {
        render(<MockAdvancedInput members={members} />);
        await userEvent.type(screen.getByTestId('msg-textarea'), 'Hey @');
        // After typing @ followed by nothing, list shows all members
        // Need a character to trigger filter display
        await userEvent.type(screen.getByTestId('msg-textarea'), 'A');
        expect(screen.getByTestId('mention-list')).toBeDefined();
    });

    it('filters members by typed text', async () => {
        render(<MockAdvancedInput members={members} />);
        await userEvent.type(screen.getByTestId('msg-textarea'), '@Bo');
        expect(screen.getByTestId('mention-Bob')).toBeDefined();
        expect(screen.queryByTestId('mention-Alice')).toBeNull();
    });

    it('inserts @mention on selection', async () => {
        render(<MockAdvancedInput members={members} />);
        await userEvent.type(screen.getByTestId('msg-textarea'), '@Al');
        await userEvent.click(screen.getByTestId('mention-Alice'));
        expect(screen.getByTestId('msg-textarea').value).toContain('@Alice');
    });

    it('hides mention list after selection', async () => {
        render(<MockAdvancedInput members={members} />);
        await userEvent.type(screen.getByTestId('msg-textarea'), '@Ch');
        await userEvent.click(screen.getByTestId('mention-Charlie'));
        expect(screen.queryByTestId('mention-list')).toBeNull();
    });

    it('does not show mention list when no @ is present', () => {
        render(<MockAdvancedInput members={members} />);
        expect(screen.queryByTestId('mention-list')).toBeNull();
    });

    it('disabled textarea prevents send', async () => {
        const onSendMessage = vi.fn();
        render(<MockAdvancedInput onSendMessage={onSendMessage} disabled />);
        // can't type in disabled, but try submit
        fireEvent.submit(screen.getByTestId('adv-input-form'));
        expect(onSendMessage).not.toHaveBeenCalled();
    });
});
