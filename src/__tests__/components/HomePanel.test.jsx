import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../utils/logger', () => ({
    default: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));
vi.mock('../../hooks/useMediaQuery', () => ({ default: () => false }));

import HomePanel from '../../RoomList/HomePanel';

describe('HomePanel', () => {
    const mockConversation = {
        id: 1,
        participants: [
            { username: 'TestUser' },
            { username: 'FriendUser', id: 2, avatar: '/friend.png' },
        ],
    };

    const defaultProps = {
        conversations: [mockConversation],
        currentConversationId: null,
        currentUsername: 'TestUser',
        onRoomSelect: vi.fn(),
        onDMSelect: vi.fn(),
        onPrefetchChat: vi.fn(),
        onFriendsClick: vi.fn(),
        pendingFriendRequests: 0,
        safeUnreadCounts: {},
        onlineUsers: [],
        allUsers: [],
        getAvatarUrl: vi.fn((u) => `/avatar/${u}.png`),
        setDmContextMenu: vi.fn(),
        onDiscoverClick: vi.fn(),
        servers: [{ id: 1 }],
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders Home header', () => {
        render(<HomePanel {...defaultProps} />);
        expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('renders PawPaw AI channel', () => {
        render(<HomePanel {...defaultProps} />);
        expect(screen.getByText(/pawpaw ai/i)).toBeInTheDocument();
    });

    it('renders DIRECT MESSAGES section', () => {
        render(<HomePanel {...defaultProps} />);
        expect(screen.getByText(/direct messages/i)).toBeInTheDocument();
    });

    it('renders DM conversation with other user name', () => {
        render(<HomePanel {...defaultProps} />);
        expect(screen.getByText('FriendUser')).toBeInTheDocument();
    });

    it('calls onDMSelect when a DM item is clicked', () => {
        render(<HomePanel {...defaultProps} />);
        const dmItem = screen.getByText('FriendUser');
        fireEvent.click(dmItem.closest('[role="button"]') || dmItem);
        expect(defaultProps.onDMSelect).toHaveBeenCalled();
    });

    it('supports keyboard navigation on DM items', () => {
        render(<HomePanel {...defaultProps} />);
        const dmItem = screen.getByText('FriendUser');
        const clickable = dmItem.closest('[role="button"]') || dmItem;
        fireEvent.keyDown(clickable, { key: 'Enter' });
        expect(defaultProps.onDMSelect).toHaveBeenCalled();
    });

    it('shows pending friend request badge', () => {
        render(<HomePanel {...defaultProps} pendingFriendRequests={3} />);
        expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('shows unread badge for DM', () => {
        render(<HomePanel {...defaultProps} safeUnreadCounts={{ 'dm-1': 5 }} />);
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('shows Join Server button when no servers', () => {
        render(<HomePanel {...defaultProps} servers={[]} />);
        expect(screen.getByText(/join server/i)).toBeInTheDocument();
    });

    it('hides Join Server button when servers exist', () => {
        render(<HomePanel {...defaultProps} servers={[{ id: 1 }]} />);
        expect(screen.queryByText(/join server/i)).toBeNull();
    });
});
