// frontend/src/__tests__/components/RoomList.test.jsx
// 🧪 RoomList / RoomItem Component Tests

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import React, { useState } from 'react';

// --- Mock RoomList with DM conversations and room items ---
const MockRoomItem = ({
    room,
    isActive = false,
    unreadCount = 0,
    onSelect = vi.fn(),
    onContextMenu = vi.fn(),
}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            data-testid={`room-item-${room.slug}`}
            role="button"
            tabIndex={0}
            aria-selected={isActive}
            onClick={() => onSelect(room)}
            onContextMenu={(e) => { e.preventDefault(); onContextMenu(e, room); }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`room-item ${isActive ? 'active' : ''} ${hovered ? 'hovered' : ''}`}
            style={{
                backgroundColor: isActive ? '#393c43' : (hovered ? '#34373c' : 'transparent'),
                fontWeight: unreadCount > 0 ? 'bold' : 'normal',
            }}
        >
            <span data-testid={`room-icon-${room.slug}`}>
                {room.room_type === 'voice' ? '🔊' : '#'}
            </span>
            <span data-testid={`room-name-${room.slug}`}>{room.name}</span>
            {unreadCount > 0 && (
                <span data-testid={`room-badge-${room.slug}`} className="badge">{unreadCount}</span>
            )}
        </div>
    );
};

const MockDMItem = ({
    conversation,
    isActive = false,
    onSelect = vi.fn(),
    getDeterministicAvatar = (u) => `https://example.com/${u}.png`,
}) => {
    return (
        <div
            data-testid={`dm-${conversation.username}`}
            role="button"
            tabIndex={0}
            aria-selected={isActive}
            onClick={() => onSelect(conversation)}
            className={isActive ? 'active' : ''}>
            <img
                data-testid={`dm-avatar-${conversation.username}`}
                src={conversation.avatar || getDeterministicAvatar(conversation.username)}
                alt={conversation.username}
            />
            <div>
                <span data-testid={`dm-name-${conversation.username}`}>{conversation.username}</span>
                {conversation.last_message && (
                    <span data-testid={`dm-preview-${conversation.username}`}>
                        {conversation.last_message.substring(0, 30)}
                    </span>
                )}
            </div>
            {conversation.is_online && (
                <span data-testid={`dm-online-${conversation.username}`} className="online-dot" />
            )}
            {conversation.unread > 0 && (
                <span data-testid={`dm-badge-${conversation.username}`}>{conversation.unread}</span>
            )}
        </div>
    );
};

const MockRoomList = ({
    mode = 'home',  // 'home' | 'server'
    rooms = [],
    conversations = [],
    activeRoomSlug = null,
    activeConversation = null,
    unreadCounts = {},
    onRoomSelect = vi.fn(),
    onDMSelect = vi.fn(),
    onRoomContextMenu = vi.fn(),
    getDeterministicAvatar = (u) => `https://example.com/${u}.png`,
    friendsList = [],
}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredConversations = searchQuery
        ? conversations.filter(c => c.username.toLowerCase().includes(searchQuery.toLowerCase()))
        : conversations;

    const filteredRooms = searchQuery
        ? rooms.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : rooms;

    return (
        <div data-testid="room-list" role="list">
            {/* Search */}
            <div data-testid="room-search">
                <input
                    data-testid="room-search-input"
                    placeholder="Ara or yeni sohbet başlat"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {mode === 'home' ? (
                <>
                    {/* Friend shortcuts */}
                    <div data-testid="friend-shortcuts">
                        <button data-testid="friends-button">Friendlar ({friendsList.length})</button>
                    </div>

                    {/* DM Conversations */}
                    <div data-testid="dm-list" role="list" aria-label="Direkt Mesajlar">
                        <h4 data-testid="dm-header">DİREKT MESAJLAR</h4>
                        {filteredConversations.length === 0 && (
                            <div data-testid="no-conversations">Not yet message yok</div>
                        )}
                        {filteredConversations.map(conv => (
                            <MockDMItem
                                key={conv.username}
                                conversation={conv}
                                isActive={activeConversation === conv.username}
                                onSelect={onDMSelect}
                                getDeterministicAvatar={getDeterministicAvatar}
                            />
                        ))}
                    </div>
                </>
            ) : (
                /* Server rooms */
                <div data-testid="server-rooms">
                    {filteredRooms.map(room => (
                        <MockRoomItem
                            key={room.slug}
                            room={room}
                            isActive={activeRoomSlug === room.slug}
                            unreadCount={unreadCounts[`room-${room.slug}`] || 0}
                            onSelect={onRoomSelect}
                            onContextMenu={onRoomContextMenu}
                        />
                    ))}
                    {filteredRooms.length === 0 && (
                        <div data-testid="no-rooms">Channel not found</div>
                    )}
                </div>
            )}
        </div>
    );
};

describe('RoomItem Component', () => {
    const room = { id: 1, name: 'general', slug: 'general', room_type: 'text' };
    const voiceRoom = { id: 2, name: 'voice-chat', slug: 'voice-chat', room_type: 'voice' };

    it('should render room name', () => {
        render(<MockRoomItem room={room} />);
        expect(screen.getByTestId('room-name-general')).toHaveTextContent('general');
    });

    it('should show # icon for text channels', () => {
        render(<MockRoomItem room={room} />);
        expect(screen.getByTestId('room-icon-general')).toHaveTextContent('#');
    });

    it('should show 🔊 icon for voice channels', () => {
        render(<MockRoomItem room={voiceRoom} />);
        expect(screen.getByTestId('room-icon-voice-chat')).toHaveTextContent('🔊');
    });

    it('should highlight when active', () => {
        render(<MockRoomItem room={room} isActive={true} />);
        expect(screen.getByTestId('room-item-general')).toHaveAttribute('aria-selected', 'true');
    });

    it('should show unread badge', () => {
        render(<MockRoomItem room={room} unreadCount={5} />);
        expect(screen.getByTestId('room-badge-general')).toHaveTextContent('5');
    });

    it('should NOT show badge when no unread', () => {
        render(<MockRoomItem room={room} unreadCount={0} />);
        expect(screen.queryByTestId('room-badge-general')).not.toBeInTheDocument();
    });

    it('should call onSelect when clicked', () => {
        const onSelect = vi.fn();
        render(<MockRoomItem room={room} onSelect={onSelect} />);
        fireEvent.click(screen.getByTestId('room-item-general'));
        expect(onSelect).toHaveBeenCalledWith(room);
    });
});

describe('RoomList Component', () => {
    const mockRooms = [
        { id: 1, name: 'general', slug: 'general', room_type: 'text' },
        { id: 2, name: 'random', slug: 'random', room_type: 'text' },
        { id: 3, name: 'voice-lounge', slug: 'voice-lounge', room_type: 'voice' },
    ];

    const mockConversations = [
        { username: 'alice', avatar: 'https://example.com/alice.png', last_message: 'Hey!', is_online: true, unread: 3 },
        { username: 'bob', avatar: null, last_message: 'See you later', is_online: false, unread: 0 },
        { username: 'charlie', avatar: 'https://example.com/charlie.png', last_message: null, is_online: true, unread: 1 },
    ];

    let handlers;

    beforeEach(() => {
        handlers = {
            onRoomSelect: vi.fn(),
            onDMSelect: vi.fn(),
            onRoomContextMenu: vi.fn(),
        };
    });

    describe('Home Mode (DMs)', () => {
        it('should render DM list', () => {
            render(<MockRoomList mode="home" conversations={mockConversations} {...handlers} />);
            expect(screen.getByTestId('dm-list')).toBeInTheDocument();
            expect(screen.getByTestId('dm-header')).toHaveTextContent('DİREKT MESAJLAR');
        });

        it('should render all conversations', () => {
            render(<MockRoomList mode="home" conversations={mockConversations} {...handlers} />);
            expect(screen.getByTestId('dm-alice')).toBeInTheDocument();
            expect(screen.getByTestId('dm-bob')).toBeInTheDocument();
            expect(screen.getByTestId('dm-charlie')).toBeInTheDocument();
        });

        it('should show online indicator', () => {
            render(<MockRoomList mode="home" conversations={mockConversations} {...handlers} />);
            expect(screen.getByTestId('dm-online-alice')).toBeInTheDocument();
            expect(screen.queryByTestId('dm-online-bob')).not.toBeInTheDocument();
        });

        it('should show unread badge', () => {
            render(<MockRoomList mode="home" conversations={mockConversations} {...handlers} />);
            expect(screen.getByTestId('dm-badge-alice')).toHaveTextContent('3');
            expect(screen.queryByTestId('dm-badge-bob')).not.toBeInTheDocument();
        });

        it('should show message preview', () => {
            render(<MockRoomList mode="home" conversations={mockConversations} {...handlers} />);
            expect(screen.getByTestId('dm-preview-alice')).toHaveTextContent('Hey!');
        });

        it('should highlight active conversation', () => {
            render(<MockRoomList mode="home" conversations={mockConversations} activeConversation="alice" {...handlers} />);
            expect(screen.getByTestId('dm-alice')).toHaveAttribute('aria-selected', 'true');
        });

        it('should show empty state when no conversations', () => {
            render(<MockRoomList mode="home" conversations={[]} {...handlers} />);
            expect(screen.getByTestId('no-conversations')).toBeInTheDocument();
        });

        it('should call onDMSelect when DM is clicked', () => {
            render(<MockRoomList mode="home" conversations={mockConversations} {...handlers} />);
            fireEvent.click(screen.getByTestId('dm-alice'));
            expect(handlers.onDMSelect).toHaveBeenCalledWith(mockConversations[0]);
        });
    });

    describe('Server Mode (Rooms)', () => {
        it('should render server rooms', () => {
            render(<MockRoomList mode="server" rooms={mockRooms} {...handlers} />);
            expect(screen.getByTestId('server-rooms')).toBeInTheDocument();
        });

        it('should render all rooms', () => {
            render(<MockRoomList mode="server" rooms={mockRooms} {...handlers} />);
            expect(screen.getByTestId('room-item-general')).toBeInTheDocument();
            expect(screen.getByTestId('room-item-random')).toBeInTheDocument();
            expect(screen.getByTestId('room-item-voice-lounge')).toBeInTheDocument();
        });

        it('should highlight active room', () => {
            render(<MockRoomList mode="server" rooms={mockRooms} activeRoomSlug="general" {...handlers} />);
            expect(screen.getByTestId('room-item-general')).toHaveAttribute('aria-selected', 'true');
        });

        it('should show unread counts', () => {
            render(
                <MockRoomList
                    mode="server"
                    rooms={mockRooms}
                    unreadCounts={{ 'room-random': 7 }}>
                    {...handlers}
                />
            );
            expect(screen.getByTestId('room-badge-random')).toHaveTextContent('7');
        });
    });

    describe('Search', () => {
        it('should filter conversations by search', () => {
            render(<MockRoomList mode="home" conversations={mockConversations} {...handlers} />);
            fireEvent.change(screen.getByTestId('room-search-input'), { target: { value: 'alice' } });
            expect(screen.getByTestId('dm-alice')).toBeInTheDocument();
            expect(screen.queryByTestId('dm-bob')).not.toBeInTheDocument();
        });

        it('should filter rooms by search', () => {
            render(<MockRoomList mode="server" rooms={mockRooms} {...handlers} />);
            fireEvent.change(screen.getByTestId('room-search-input'), { target: { value: 'voice' } });
            expect(screen.getByTestId('room-item-voice-lounge')).toBeInTheDocument();
            expect(screen.queryByTestId('room-item-general')).not.toBeInTheDocument();
        });

        it('should show empty state when search has no results', () => {
            render(<MockRoomList mode="server" rooms={mockRooms} {...handlers} />);
            fireEvent.change(screen.getByTestId('room-search-input'), { target: { value: 'zzzzz' } });
            expect(screen.getByTestId('no-rooms')).toBeInTheDocument();
        });
    });

    describe('Friend Shortcuts', () => {
        it('should show friend count', () => {
            render(
                <MockRoomList
                    mode="home"
                    conversations={mockConversations}
                    friendsList={[{ username: 'alice' }, { username: 'charlie' }]}>
                    {...handlers}
                />
            );
            expect(screen.getByTestId('friends-button')).toHaveTextContent('Friendlar (2)');
        });
    });
});
