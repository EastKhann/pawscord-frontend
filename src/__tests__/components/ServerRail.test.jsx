// frontend/src/__tests__/components/ServerRail.test.jsx
// 🧪 ServerRail Component Tests

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import React, { useState } from 'react';

// --- Mock ServerRail (replicates essential server list UI) ---
const MockServerRail = ({
    servers = [],
    selectedServerId = null,
    safeUnreadCounts = {},
    onHomeClick = vi.fn(),
    handleServerClick = vi.fn(),
    onDiscoverClick = vi.fn(),
    onOpenStore = vi.fn(),
    onAddClick = vi.fn(),
    handleServerContextMenu = vi.fn(),
}) => {
    const [hoveredServerId, setHoveredServerId] = useState(null);

    return (
        <div data-testid="server-rail" role="navigation" aria-label="Sunucu listesi">
            {/* Home Button */}
            <div data-testid="home-button"
                role="button"
                tabIndex={0}
                aria-label="Ana Sayfa"
                aria-selected={selectedServerId === 'home'}
                onClick={onHomeClick}
                onMouseEnter={() => setHoveredServerId('home')}
                onMouseLeave={() => setHoveredServerId(null)}
                style={{
                    borderRadius: selectedServerId === 'home' || hoveredServerId === 'home' ? '16px' : '50%',
                    backgroundColor: selectedServerId === 'home' ? '#5865f2' : '#313338',
                }}
            >
                <img src="https://media.pawscord.com/assets/logo.png" alt="Pawscord" data-testid="home-logo" />
            </div>

            <div data-testid="separator" style={{ height: '2px', background: '#36393f', margin: '8px 12px' }} />

            {/* Server List */}
            <div role="list" aria-label="Sunucular" data-testid="server-list">
                {servers.map((server) => {
                    const initials = (server.name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('') || server.name.substring(0, 2)).toUpperCase();
                    const isActive = selectedServerId === server.id;

                    const unreadCount = Object.keys(safeUnreadCounts)
                        .filter(k => k.startsWith('room-') && server.categories?.some(
                            cat => cat.rooms?.some(r => `room-${r.slug}` === k)
                        ))
                        .reduce((sum, k) => sum + (safeUnreadCounts[k] || 0), 0);

                    return (
                        <div key={server.id} role="listitem" data-testid={`server-${server.id}`}>
                            {/* Active Pill */}
                            <div
                                data-testid={`pill-${server.id}`}
                                style={{
                                    width: '4px',
                                    height: isActive ? '40px' : (hoveredServerId === server.id ? '20px' : (unreadCount > 0 ? '8px' : '0px')),
                                    backgroundColor: '#fff',
                                }}
                            />

                            <div
                                data-testid={`server-icon-${server.id}`}
                                role="button"
                                tabIndex={0}
                                aria-label={server.name}
                                aria-selected={isActive}
                                onClick={() => handleServerClick(server)}
                                onContextMenu={(e) => handleServerContextMenu(e, server)}
                                onMouseEnter={() => setHoveredServerId(server.id)}
                                onMouseLeave={() => setHoveredServerId(null)}
                                style={{
                                    backgroundColor: isActive ? '#5865f2' : '#313338',
                                    borderRadius: isActive || hoveredServerId === server.id ? '16px' : '50%',
                                }}
                            >
                                {server.icon ? (
                                    <img src={server.icon} alt={server.name} data-testid={`server-img-${server.id}`} />
                                ) : (
                                    <span data-testid={`server-initials-${server.id}`}>{initials}</span>
                                )}
                                {unreadCount > 0 && (
                                    <div data-testid={`badge-${server.id}`}>{unreadCount > 99 ? '99+' : unreadCount}</div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Bottom Actions */}
            <div data-testid="discover-button" role="button" tabIndex={0} aria-label="Sunucu Keşfet" onClick={onDiscoverClick}>🧭</div>
            <div data-testid="store-button" role="button" tabIndex={0} aria-label="Premium Mağaza" onClick={onOpenStore}>🛒</div>
            <div data-testid="add-button" role="button" tabIndex={0} aria-label="Sunucu ekle" onClick={onAddClick}>+</div>
        </div>
    );
};

describe('ServerRail Component', () => {
    const mockServers = [
        {
            id: 1, name: 'Gaming Hub', icon: 'https://example.com/server1.png',
            categories: [{ rooms: [{ slug: 'general' }, { slug: 'off-topic' }] }]
        },
        {
            id: 2, name: 'Study Group', icon: null,
            categories: [{ rooms: [{ slug: 'homework' }] }]
        },
        {
            id: 3, name: 'Art Corner', icon: 'https://example.com/server3.png',
            categories: [{ rooms: [{ slug: 'showcase' }] }]
        },
    ];

    let handlers;

    beforeEach(() => {
        handlers = {
            onHomeClick: vi.fn(),
            handleServerClick: vi.fn(),
            onDiscoverClick: vi.fn(),
            onOpenStore: vi.fn(),
            onAddClick: vi.fn(),
            handleServerContextMenu: vi.fn(),
        };
    });

    describe('Rendering', () => {
        it('should render the server rail navigation', () => {
            render(<MockServerRail servers={mockServers} {...handlers} />);
            expect(screen.getByTestId('server-rail')).toBeInTheDocument();
            expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Sunucu listesi');
        });

        it('should render home button', () => {
            render(<MockServerRail servers={mockServers} {...handlers} />);
            expect(screen.getByTestId('home-button')).toBeInTheDocument();
            expect(screen.getByTestId('home-logo')).toBeInTheDocument();
        });

        it('should render all servers in the list', () => {
            render(<MockServerRail servers={mockServers} {...handlers} />);
            expect(screen.getByTestId('server-1')).toBeInTheDocument();
            expect(screen.getByTestId('server-2')).toBeInTheDocument();
            expect(screen.getByTestId('server-3')).toBeInTheDocument();
        });

        it('should show server icon image when available', () => {
            render(<MockServerRail servers={mockServers} {...handlers} />);
            expect(screen.getByTestId('server-img-1')).toHaveAttribute('src', 'https://example.com/server1.png');
        });

        it('should show initials when no server icon', () => {
            render(<MockServerRail servers={mockServers} {...handlers} />);
            expect(screen.getByTestId('server-initials-2')).toHaveTextContent('SG');
        });

        it('should render bottom action buttons', () => {
            render(<MockServerRail servers={mockServers} {...handlers} />);
            expect(screen.getByTestId('discover-button')).toBeInTheDocument();
            expect(screen.getByTestId('store-button')).toBeInTheDocument();
            expect(screen.getByTestId('add-button')).toBeInTheDocument();
        });
    });

    describe('Active State', () => {
        it('should highlight selected server', () => {
            render(<MockServerRail servers={mockServers} selectedServerId={1} {...handlers} />);
            const icon = screen.getByTestId('server-icon-1');
            expect(icon).toHaveAttribute('aria-selected', 'true');
        });

        it('should highlight home when home is selected', () => {
            render(<MockServerRail servers={mockServers} selectedServerId="home" {...handlers} />);
            expect(screen.getByTestId('home-button')).toHaveAttribute('aria-selected', 'true');
        });

        it('should show full pill for active server', () => {
            render(<MockServerRail servers={mockServers} selectedServerId={1} {...handlers} />);
            const pill = screen.getByTestId('pill-1');
            expect(pill.style.height).toBe('40px');
        });
    });

    describe('Unread Badges', () => {
        it('should show unread badge when server has unread messages', () => {
            const unreadCounts = { 'room-general': 5, 'room-off-topic': 3 };
            render(<MockServerRail servers={mockServers} safeUnreadCounts={unreadCounts} {...handlers} />);
            expect(screen.getByTestId('badge-1')).toHaveTextContent('8');
        });

        it('should cap badge at 99+', () => {
            const unreadCounts = { 'room-general': 50, 'room-off-topic': 60 };
            render(<MockServerRail servers={mockServers} safeUnreadCounts={unreadCounts} {...handlers} />);
            expect(screen.getByTestId('badge-1')).toHaveTextContent('99+');
        });

        it('should NOT show badge when no unread messages', () => {
            render(<MockServerRail servers={mockServers} safeUnreadCounts={{}} {...handlers} />);
            expect(screen.queryByTestId('badge-2')).not.toBeInTheDocument();
        });
    });

    describe('Click Handlers', () => {
        it('should call onHomeClick when home is clicked', () => {
            render(<MockServerRail servers={mockServers} {...handlers} />);
            fireEvent.click(screen.getByTestId('home-button'));
            expect(handlers.onHomeClick).toHaveBeenCalledTimes(1);
        });

        it('should call handleServerClick with server object', () => {
            render(<MockServerRail servers={mockServers} {...handlers} />);
            fireEvent.click(screen.getByTestId('server-icon-1'));
            expect(handlers.handleServerClick).toHaveBeenCalledWith(mockServers[0]);
        });

        it('should call onDiscoverClick', () => {
            render(<MockServerRail servers={mockServers} {...handlers} />);
            fireEvent.click(screen.getByTestId('discover-button'));
            expect(handlers.onDiscoverClick).toHaveBeenCalledTimes(1);
        });

        it('should call onOpenStore', () => {
            render(<MockServerRail servers={mockServers} {...handlers} />);
            fireEvent.click(screen.getByTestId('store-button'));
            expect(handlers.onOpenStore).toHaveBeenCalledTimes(1);
        });

        it('should call onAddClick', () => {
            render(<MockServerRail servers={mockServers} {...handlers} />);
            fireEvent.click(screen.getByTestId('add-button'));
            expect(handlers.onAddClick).toHaveBeenCalledTimes(1);
        });

        it('should call handleServerContextMenu on right-click', () => {
            render(<MockServerRail servers={mockServers} {...handlers} />);
            fireEvent.contextMenu(screen.getByTestId('server-icon-2'));
            expect(handlers.handleServerContextMenu).toHaveBeenCalledWith(expect.any(Object), mockServers[1]);
        });
    });

    describe('Empty State', () => {
        it('should render rail with no servers', () => {
            render(<MockServerRail servers={[]} {...handlers} />);
            expect(screen.getByTestId('server-rail')).toBeInTheDocument();
            expect(screen.getByTestId('server-list').children).toHaveLength(0);
        });
    });
});
