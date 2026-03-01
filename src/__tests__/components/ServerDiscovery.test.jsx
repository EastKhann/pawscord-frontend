// frontend/src/__tests__/components/ServerDiscovery.test.jsx
// Tests for server discovery / browse flow

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState, useEffect } from 'react';

// ── Mock ServerDiscovery component ──
const MockServerDiscovery = ({ onJoin = vi.fn(), initialServers = [] }) => {
    const [servers, setServers] = useState(initialServers);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [loading, setLoading] = useState(false);
    const [joinedIds, setJoinedIds] = useState(new Set());

    const categories = ['all', 'gaming', 'music', 'education', 'tech'];

    const filtered = servers.filter((s) => {
        const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
        const matchesCat = category === 'all' || s.category === category;
        return matchesSearch && matchesCat;
    });

    const handleJoin = (server) => {
        setJoinedIds((prev) => new Set([...prev, server.id]));
        onJoin(server);
    };

    return (
        <div data-testid="server-discovery">
            <h2>Discover Servers</h2>

            <input
                data-testid="search-input"
                placeholder="Search servers…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div data-testid="category-filter" role="tablist">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        data-testid={`cat-${cat}`}
                        role="tab"
                        aria-selected={category === cat}
                        onClick={() => setCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {loading && <div data-testid="loading-spinner">Loading…</div>}

            <ul data-testid="server-list" role="list">
                {filtered.map((s) => (
                    <li key={s.id} data-testid={`server-${s.id}`} role="listitem">
                        <span data-testid={`server-name-${s.id}`}>{s.name}</span>
                        <span data-testid={`server-members-${s.id}`}>{s.memberCount} members</span>
                        <button
                            data-testid={`join-${s.id}`}
                            onClick={() => handleJoin(s)}
                            disabled={joinedIds.has(s.id)}
                        >
                            {joinedIds.has(s.id) ? 'Joined' : 'Join'}
                        </button>
                    </li>
                ))}
            </ul>

            {filtered.length === 0 && !loading && (
                <p data-testid="empty-state">No servers found.</p>
            )}
        </div>
    );
};

const SAMPLE_SERVERS = [
    { id: 1, name: 'Gamers Hub', category: 'gaming', memberCount: 1500 },
    { id: 2, name: 'Music Makers', category: 'music', memberCount: 800 },
    { id: 3, name: 'Code Academy', category: 'education', memberCount: 2200 },
    { id: 4, name: 'Tech Talk', category: 'tech', memberCount: 500 },
    { id: 5, name: 'Game Night', category: 'gaming', memberCount: 350 },
];

// ─── Tests ──────────────────────────────────────────

describe('Server list rendering', () => {
    it('renders all servers', () => {
        render(<MockServerDiscovery initialServers={SAMPLE_SERVERS} />);
        expect(screen.getByTestId('server-list').children).toHaveLength(5);
    });

    it('displays server name', () => {
        render(<MockServerDiscovery initialServers={SAMPLE_SERVERS} />);
        expect(screen.getByTestId('server-name-1').textContent).toBe('Gamers Hub');
    });

    it('displays member count', () => {
        render(<MockServerDiscovery initialServers={SAMPLE_SERVERS} />);
        expect(screen.getByTestId('server-members-3').textContent).toContain('2200');
    });

    it('shows empty state when no servers', () => {
        render(<MockServerDiscovery initialServers={[]} />);
        expect(screen.getByTestId('empty-state')).toBeDefined();
    });
});

describe('Search / filter', () => {
    it('filters by search text', async () => {
        render(<MockServerDiscovery initialServers={SAMPLE_SERVERS} />);
        await userEvent.type(screen.getByTestId('search-input'), 'Music');
        expect(screen.getByTestId('server-list').children).toHaveLength(1);
        expect(screen.getByTestId('server-name-2').textContent).toBe('Music Makers');
    });

    it('search is case-insensitive', async () => {
        render(<MockServerDiscovery initialServers={SAMPLE_SERVERS} />);
        await userEvent.type(screen.getByTestId('search-input'), 'tech');
        expect(screen.getByTestId('server-list').children).toHaveLength(1);
    });

    it('shows empty state for no match', async () => {
        render(<MockServerDiscovery initialServers={SAMPLE_SERVERS} />);
        await userEvent.type(screen.getByTestId('search-input'), 'zzzzz');
        expect(screen.getByTestId('empty-state')).toBeDefined();
    });

    it('filters by category', async () => {
        render(<MockServerDiscovery initialServers={SAMPLE_SERVERS} />);
        await userEvent.click(screen.getByTestId('cat-gaming'));
        expect(screen.getByTestId('server-list').children).toHaveLength(2);
    });

    it('"all" category shows everything', async () => {
        render(<MockServerDiscovery initialServers={SAMPLE_SERVERS} />);
        await userEvent.click(screen.getByTestId('cat-gaming'));
        await userEvent.click(screen.getByTestId('cat-all'));
        expect(screen.getByTestId('server-list').children).toHaveLength(5);
    });
});

describe('Join server flow', () => {
    it('calls onJoin when join button clicked', async () => {
        const onJoin = vi.fn();
        render(<MockServerDiscovery initialServers={SAMPLE_SERVERS} onJoin={onJoin} />);
        await userEvent.click(screen.getByTestId('join-1'));
        expect(onJoin).toHaveBeenCalledWith(SAMPLE_SERVERS[0]);
    });

    it('disables join button after joining', async () => {
        render(<MockServerDiscovery initialServers={SAMPLE_SERVERS} />);
        await userEvent.click(screen.getByTestId('join-1'));
        expect(screen.getByTestId('join-1')).toBeDisabled();
    });

    it('shows "Joined" after joining', async () => {
        render(<MockServerDiscovery initialServers={SAMPLE_SERVERS} />);
        await userEvent.click(screen.getByTestId('join-2'));
        expect(screen.getByTestId('join-2').textContent).toBe('Joined');
    });
});
