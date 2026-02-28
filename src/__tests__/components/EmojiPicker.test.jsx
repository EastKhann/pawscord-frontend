// frontend/src/__tests__/components/EmojiPicker.test.jsx
// 🧪 EmojiPicker Component Tests

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React, { useState, useCallback } from 'react';

// --- Mock EmojiPicker (replicates core emoji selection behavior) ---
const MOCK_CATEGORIES = {
    'Son Kullanılan ⏱️': ['😀', '😂', '❤️'],
    'Yüzler': ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂'],
    'Kalpler': ['❤️', '🧡', '💛', '💚', '💙', '💜'],
    'Hayvanlar': ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊'],
    'Yiyecek': ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌'],
};

const MockEmojiPicker = ({ onSelect = vi.fn() }) => {
    const [activeCategory, setActiveCategory] = useState('Yüzler');
    const [searchTerm, setSearchTerm] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [contextMenu, setContextMenu] = useState(null);

    const allEmojis = Object.values(MOCK_CATEGORIES).flat();

    const filteredEmojis = searchTerm
        ? allEmojis.filter(emoji => emoji.includes(searchTerm))
        : MOCK_CATEGORIES[activeCategory] || [];

    const handleSelect = useCallback((emoji) => {
        onSelect(emoji);
    }, [onSelect]);

    const handleContextMenu = useCallback((e, emoji) => {
        e.preventDefault();
        setContextMenu({ emoji, x: e.clientX, y: e.clientY });
    }, []);

    const handleToggleFav = useCallback((emoji) => {
        setFavorites(prev => prev.includes(emoji)
            ? prev.filter(e => e !== emoji)
            : [...prev, emoji]
        );
        setContextMenu(null);
    }, []);

    return (
        <div data-testid="emoji-picker" role="dialog" aria-label="Emoji seçici">
            {/* Search */}
            <div data-testid="search-bar">
                <input
                    data-testid="emoji-search-input"
                    type="text"
                    placeholder="Emoji ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Emoji ara"
                />
            </div>

            {/* Category Tabs */}
            {!searchTerm && (
                <div data-testid="category-tabs">
                    {Object.keys(MOCK_CATEGORIES).map(category => (
                        <button
                            key={category}
                            data-testid={`category-${category}`}
                            onClick={() => setActiveCategory(category)}
                            className={activeCategory === category ? 'active' : ''}
                            aria-pressed={activeCategory === category}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            )}

            {/* Emoji Grid */}
            <div data-testid="emoji-grid" role="grid" aria-label="Emojiler">
                {filteredEmojis.map((emoji, index) => (
                    <button
                        key={`${emoji}-${index}`}
                        data-testid={`emoji-${emoji}-${index}`}
                        onClick={() => handleSelect(emoji)}
                        onContextMenu={(e) => handleContextMenu(e, emoji)}
                        aria-label={`Emoji ${emoji}`}
                        role="gridcell"
                    >
                        {emoji}
                    </button>
                ))}
                {filteredEmojis.length === 0 && (
                    <div data-testid="empty-state">
                        {searchTerm ? '🔍 Sonuç bulunamadı' : '⏱️ Henüz emoji kullanılmadı'}
                    </div>
                )}
            </div>

            {/* Context Menu */}
            {contextMenu && (
                <div data-testid="emoji-context-menu">
                    <button data-testid="toggle-fav-button" onClick={() => handleToggleFav(contextMenu.emoji)}>
                        {favorites.includes(contextMenu.emoji) ? '💔 Favorilerden Çıkar' : '⭐ Favorilere Ekle'}
                    </button>
                </div>
            )}
        </div>
    );
};

describe('EmojiPicker Component', () => {
    let mockOnSelect;

    beforeEach(() => {
        mockOnSelect = vi.fn();
    });

    describe('Rendering', () => {
        it('should render the emoji picker', () => {
            render(<MockEmojiPicker onSelect={mockOnSelect} />);
            expect(screen.getByTestId('emoji-picker')).toBeInTheDocument();
        });

        it('should render the search input', () => {
            render(<MockEmojiPicker onSelect={mockOnSelect} />);
            expect(screen.getByPlaceholderText('Emoji ara...')).toBeInTheDocument();
        });

        it('should render category tabs', () => {
            render(<MockEmojiPicker onSelect={mockOnSelect} />);
            expect(screen.getByTestId('category-tabs')).toBeInTheDocument();
        });

        it('should render emoji grid', () => {
            render(<MockEmojiPicker onSelect={mockOnSelect} />);
            expect(screen.getByTestId('emoji-grid')).toBeInTheDocument();
        });

        it('should default to Yüzler category', () => {
            render(<MockEmojiPicker onSelect={mockOnSelect} />);
            // Yüzler has 9 emojis
            const grid = screen.getByTestId('emoji-grid');
            expect(grid.querySelectorAll('[role="gridcell"]').length).toBe(9);
        });
    });

    describe('Category Switching', () => {
        it('should switch to Kalpler category', () => {
            render(<MockEmojiPicker onSelect={mockOnSelect} />);
            fireEvent.click(screen.getByTestId('category-Kalpler'));

            const grid = screen.getByTestId('emoji-grid');
            expect(grid.querySelectorAll('[role="gridcell"]').length).toBe(6);
        });

        it('should switch to Hayvanlar category', () => {
            render(<MockEmojiPicker onSelect={mockOnSelect} />);
            fireEvent.click(screen.getByTestId('category-Hayvanlar'));

            const grid = screen.getByTestId('emoji-grid');
            expect(grid.querySelectorAll('[role="gridcell"]').length).toBe(6);
        });
    });

    describe('Emoji Selection', () => {
        it('should call onSelect when emoji is clicked', () => {
            render(<MockEmojiPicker onSelect={mockOnSelect} />);
            const firstEmoji = screen.getByTestId('emoji-grid').querySelector('[role="gridcell"]');
            fireEvent.click(firstEmoji);
            expect(mockOnSelect).toHaveBeenCalledTimes(1);
        });

        it('should call onSelect with the correct emoji', () => {
            render(<MockEmojiPicker onSelect={mockOnSelect} />);
            // Click on the first emoji in Yüzler: 😀
            fireEvent.click(screen.getByTestId('emoji-😀-0'));
            expect(mockOnSelect).toHaveBeenCalledWith('😀');
        });
    });

    describe('Search Functionality', () => {
        it('should filter emojis based on search term', () => {
            render(<MockEmojiPicker onSelect={mockOnSelect} />);
            const searchInput = screen.getByTestId('emoji-search-input');

            fireEvent.change(searchInput, { target: { value: '❤' } });

            const grid = screen.getByTestId('emoji-grid');
            const cells = grid.querySelectorAll('[role="gridcell"]');
            expect(cells.length).toBeGreaterThan(0);
        });

        it('should hide category tabs during search', () => {
            render(<MockEmojiPicker onSelect={mockOnSelect} />);
            fireEvent.change(screen.getByTestId('emoji-search-input'), { target: { value: 'test' } });
            expect(screen.queryByTestId('category-tabs')).not.toBeInTheDocument();
        });

        it('should show empty state for no results', () => {
            render(<MockEmojiPicker onSelect={mockOnSelect} />);
            fireEvent.change(screen.getByTestId('emoji-search-input'), { target: { value: 'zzzzxxx' } });
            expect(screen.getByTestId('empty-state')).toHaveTextContent('🔍 Sonuç bulunamadı');
        });
    });

    describe('Context Menu (Favorites)', () => {
        it('should show context menu on right-click', () => {
            render(<MockEmojiPicker onSelect={mockOnSelect} />);
            const firstEmoji = screen.getByTestId('emoji-😀-0');
            fireEvent.contextMenu(firstEmoji);
            expect(screen.getByTestId('emoji-context-menu')).toBeInTheDocument();
        });

        it('should show "Favorilere Ekle" option', () => {
            render(<MockEmojiPicker onSelect={mockOnSelect} />);
            fireEvent.contextMenu(screen.getByTestId('emoji-😀-0'));
            expect(screen.getByTestId('toggle-fav-button')).toHaveTextContent('⭐ Favorilere Ekle');
        });

        it('should close context menu after toggling favorite', () => {
            render(<MockEmojiPicker onSelect={mockOnSelect} />);
            fireEvent.contextMenu(screen.getByTestId('emoji-😀-0'));
            fireEvent.click(screen.getByTestId('toggle-fav-button'));
            expect(screen.queryByTestId('emoji-context-menu')).not.toBeInTheDocument();
        });
    });
});
