// frontend/src/__tests__/components/ServerPanel.test.jsx
// 🧪 ServerPanel Component Tests

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import React, { useState, useCallback } from 'react';

// --- Mock ServerPanel with Category collapsing & Room list ---
const MockServerPanel = ({
    servers = [],
    selectedServerId = null,
    isAdmin = false,
    currentUsername = 'testuser',
    currentVoiceRoom = null,
    collapsedCategories: initialCollapsed = {},
    safeUnreadCounts = {},
    onRoomSelect = vi.fn(),
    onOpenServerSettings = vi.fn(),
    handleCreateInvite = vi.fn(),
    handleCreateCategory = vi.fn(),
    handleCreateRoom = vi.fn(),
    joinVoiceChat = vi.fn(),
    toggleCategory: externalToggle = null,
}) => {
    const [collapsedCategories, setCollapsedCategories] = useState(initialCollapsed);

    const toggleCategory = useCallback((catId) => {
        if (externalToggle) { externalToggle(catId); return; }
        setCollapsedCategories(prev => ({ ...prev, [catId]: !prev[catId] }));
    }, [externalToggle]);

    if (!servers) return null;

    const server = servers.find(s => s.id === selectedServerId);
    if (!server) return <div data-testid="no-server">Server not found</div>;

    const isOwner = server.owner_username === currentUsername || isAdmin;

    return (
        <div data-testid="server-panel">
            {/* Server Header */}
            <div data-testid="server-header">
                <h3 data-testid="server-name">{server.name}</h3>
                <div data-testid="header-buttons">
                    <button data-testid="invite-button" onClick={(e) => handleCreateInvite(e, server)}>Davet</button>
                    {isOwner && (
                        <button data-testid="add-category-button" onClick={() => handleCreateCategory(null, server.id)}>
                            Category Ekle
                        </button>
                    )}
                    {isOwner && (
                        <button data-testid="settings-button" onClick={() => onOpenServerSettings(server)}>
                            Ayarlar
                        </button>
                    )}
                </div>
            </div>

            {/* Categories */}
            {server.categories && server.categories.map(cat => {
                const isCollapsed = collapsedCategories[cat.id];

                return (
                    <div key={cat.id} data-testid={`category-${cat.id}`}>
                        {/* Category Header */}
                        <div
                            data-testid={`category-header-${cat.id}`}
                            role="button"
                            tabIndex={0}
                            aria-expanded={!isCollapsed}
                            onClick={() => toggleCategory(cat.id)}
                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleCategory(cat.id)}>
                            <span data-testid={`chevron-${cat.id}`} style={{
                                transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s'
                            }}>▼</span>
                            <span data-testid={`category-name-${cat.id}`}>{cat.name}</span>
                            {isOwner && (
                                <button
                                    data-testid={`add-room-${cat.id}`}
                                    onClick={(e) => { e.stopPropagation(); handleCreateRoom(e, cat.id); }}>
                                    +
                                </button>
                            )}
                        </div>

                        {/* Rooms (collapsed or visible) */}
                        {!isCollapsed && cat.rooms && (
                            <div data-testid={`rooms-${cat.id}`}>
                                {cat.rooms.map(room => {
                                    const unreadKey = `room-${room.slug}`;
                                    const unreadCount = safeUnreadCounts[unreadKey] || 0;

                                    return (
                                        <div
                                            key={room.id}
                                            data-testid={`room-${room.id}`}
                                            role="button"
                                            tabIndex={0}
                                            onClick={() => onRoomSelect(room)}
                                            onKeyDown={(e) => (e.key === 'Enter') && onRoomSelect(room)}>
                                            <span data-testid={`room-icon-${room.id}`}>
                                                {room.room_type === 'voice' ? '🔊' : '#'}
                                            </span>
                                            <span data-testid={`room-name-${room.id}`}>{room.name}</span>
                                            {unreadCount > 0 && (
                                                <span data-testid={`room-badge-${room.id}`}>{unreadCount}</span>
                                            )}
                                            {room.room_type === 'voice' && (
                                                <button
                                                    data-testid={`join-voice-${room.id}`}
                                                    onClick={(e) => { e.stopPropagation(); joinVoiceChat(room); }}>
                                                    Join
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

describe('ServerPanel Component', () => {
    const mockServer = {
        id: 1,
        name: 'Test Server',
        owner_username: 'admin',
        categories: [
            {
                id: 101,
                name: 'General',
                rooms: [
                    { id: 201, name: 'sohbet', slug: 'sohbet', room_type: 'text' },
                    { id: 202, name: 'duyurular', slug: 'duyurular', room_type: 'text' },
                ],
            },
            {
                id: 102,
                name: 'Ses Kanalları',
                rooms: [
                    { id: 203, name: 'General Ses', slug: 'genel-audio', room_type: 'voice' },
                ],
            },
            {
                id: 103,
                name: 'Boş Category',
                rooms: [],
            },
        ],
    };

    let handlers;

    beforeEach(() => {
        handlers = {
            onRoomSelect: vi.fn(),
            onOpenServerSettings: vi.fn(),
            handleCreateInvite: vi.fn(),
            handleCreateCategory: vi.fn(),
            handleCreateRoom: vi.fn(),
            joinVoiceChat: vi.fn(),
        };
    });

    describe('Rendering', () => {
        it('should render the server panel', () => {
            render(<MockServerPanel servers={[mockServer]} selectedServerId={1} {...handlers} />);
            expect(screen.getByTestId('server-panel')).toBeInTheDocument();
        });

        it('should show server name in header', () => {
            render(<MockServerPanel servers={[mockServer]} selectedServerId={1} {...handlers} />);
            expect(screen.getByTestId('server-name')).toHaveTextContent('Test Server');
        });

        it('should render all categories', () => {
            render(<MockServerPanel servers={[mockServer]} selectedServerId={1} {...handlers} />);
            expect(screen.getByTestId('category-101')).toBeInTheDocument();
            expect(screen.getByTestId('category-102')).toBeInTheDocument();
            expect(screen.getByTestId('category-103')).toBeInTheDocument();
        });

        it('should render rooms within categories', () => {
            render(<MockServerPanel servers={[mockServer]} selectedServerId={1} {...handlers} />);
            expect(screen.getByTestId('room-201')).toBeInTheDocument();
            expect(screen.getByTestId('room-202')).toBeInTheDocument();
            expect(screen.getByTestId('room-203')).toBeInTheDocument();
        });

        it('should show text channel icon (#)', () => {
            render(<MockServerPanel servers={[mockServer]} selectedServerId={1} {...handlers} />);
            expect(screen.getByTestId('room-icon-201')).toHaveTextContent('#');
        });

        it('should show voice channel icon', () => {
            render(<MockServerPanel servers={[mockServer]} selectedServerId={1} {...handlers} />);
            expect(screen.getByTestId('room-icon-203')).toHaveTextContent('🔊');
        });

        it('should show "no server" when server not found', () => {
            render(<MockServerPanel servers={[mockServer]} selectedServerId={999} {...handlers} />);
            expect(screen.getByTestId('no-server')).toBeInTheDocument();
        });
    });

    describe('Owner Controls', () => {
        it('should show settings button for server owner', () => {
            render(<MockServerPanel servers={[mockServer]} selectedServerId={1} currentUsername="admin" {...handlers} />);
            expect(screen.getByTestId('settings-button')).toBeInTheDocument();
        });

        it('should show add category button for server owner', () => {
            render(<MockServerPanel servers={[mockServer]} selectedServerId={1} currentUsername="admin" {...handlers} />);
            expect(screen.getByTestId('add-category-button')).toBeInTheDocument();
        });

        it('should NOT show settings button for non-owner', () => {
            render(<MockServerPanel servers={[mockServer]} selectedServerId={1} currentUsername="member" {...handlers} />);
            expect(screen.queryByTestId('settings-button')).not.toBeInTheDocument();
        });

        it('should show settings button for admin even if not owner', () => {
            render(<MockServerPanel servers={[mockServer]} selectedServerId={1} currentUsername="mod" isAdmin={true} {...handlers} />);
            expect(screen.getByTestId('settings-button')).toBeInTheDocument();
        });
    });

    describe('Category Collapsing', () => {
        it('should start with categories expanded', () => {
            render(<MockServerPanel servers={[mockServer]} selectedServerId={1} {...handlers} />);
            expect(screen.getByTestId('rooms-101')).toBeInTheDocument();
            expect(screen.getByTestId('category-header-101')).toHaveAttribute('aria-expanded', 'true');
        });

        it('should collapse category on click', () => {
            render(<MockServerPanel servers={[mockServer]} selectedServerId={1} {...handlers} />);
            fireEvent.click(screen.getByTestId('category-header-101'));
            expect(screen.queryByTestId('rooms-101')).not.toBeInTheDocument();
        });

        it('should expand category on second click', () => {
            render(<MockServerPanel servers={[mockServer]} selectedServerId={1} {...handlers} />);
            fireEvent.click(screen.getByTestId('category-header-101'));
            expect(screen.queryByTestId('rooms-101')).not.toBeInTheDocument();

            fireEvent.click(screen.getByTestId('category-header-101'));
            expect(screen.getByTestId('rooms-101')).toBeInTheDocument();
        });

        it('should start collapsed when initialCollapsed is provided', () => {
            render(
                <MockServerPanel
                    servers={[mockServer]}
                    selectedServerId={1}
                    collapsedCategories={{ 101: true }}>
                    {...handlers}
                />
            );
            expect(screen.queryByTestId('rooms-101')).not.toBeInTheDocument();
            expect(screen.getByTestId('rooms-102')).toBeInTheDocument();
        });

        it('should toggle via keyboard (Enter)', () => {
            render(<MockServerPanel servers={[mockServer]} selectedServerId={1} {...handlers} />);
            fireEvent.keyDown(screen.getByTestId('category-header-101'), { key: 'Enter' });
            expect(screen.queryByTestId('rooms-101')).not.toBeInTheDocument();
        });
    });

    describe('Room Selection', () => {
        it('should call onRoomSelect when text room is clicked', () => {
            render(<MockServerPanel servers={[mockServer]} selectedServerId={1} {...handlers} />);
            fireEvent.click(screen.getByTestId('room-201'));
            expect(handlers.onRoomSelect).toHaveBeenCalledWith(mockServer.categories[0].rooms[0]);
        });

        it('should call joinVoiceChat when voice join button is clicked', () => {
            render(<MockServerPanel servers={[mockServer]} selectedServerId={1} {...handlers} />);
            fireEvent.click(screen.getByTestId('join-voice-203'));
            expect(handlers.joinVoiceChat).toHaveBeenCalledWith(mockServer.categories[1].rooms[0]);
        });
    });

    describe('Unread Badges', () => {
        it('should show unread badge on room', () => {
            render(
                <MockServerPanel
                    servers={[mockServer]}
                    selectedServerId={1}
                    safeUnreadCounts={{ 'room-sohbet': 5 }}>
                    {...handlers}
                />
            );
            expect(screen.getByTestId('room-badge-201')).toHaveTextContent('5');
        });

        it('should NOT show badge when no unread', () => {
            render(<MockServerPanel servers={[mockServer]} selectedServerId={1} safeUnreadCounts={{}} {...handlers} />);
            expect(screen.queryByTestId('room-badge-201')).not.toBeInTheDocument();
        });
    });

    describe('Header Actions', () => {
        it('should call handleCreateInvite', () => {
            render(<MockServerPanel servers={[mockServer]} selectedServerId={1} {...handlers} />);
            fireEvent.click(screen.getByTestId('invite-button'));
            expect(handlers.handleCreateInvite).toHaveBeenCalledWith(expect.any(Object), mockServer);
        });

        it('should call onOpenServerSettings', () => {
            render(<MockServerPanel servers={[mockServer]} selectedServerId={1} currentUsername="admin" {...handlers} />);
            fireEvent.click(screen.getByTestId('settings-button'));
            expect(handlers.onOpenServerSettings).toHaveBeenCalledWith(mockServer);
        });
    });
});
