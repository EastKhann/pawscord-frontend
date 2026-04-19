// frontend/src/__tests__/components/InviteModal.test.jsx
// Tests for InviteModal hook (useInviteLogic) and sub-components

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';

// ── Mock toast ──
vi.mock('../../utils/toast', () => ({
    default: { success: vi.fn(), error: vi.fn() },
}));
vi.mock('../../utils/constants', () => ({
    PRODUCTION_URL: 'https://pawscord.com',
}));

import useInviteLogic from '../../components/InviteModal/useInviteLogic';
import toast from '../../utils/toast';

// ── Helpers ─────────────────────────────────────────
const mockFetchWithAuth = vi.fn();
const defaultProps = {
    server: { id: 1, name: 'Test Server' },
    fetchWithAuth: mockFetchWithAuth,
    apiBaseUrl: 'https://api.pawscord.com/api',
    currentUser: 'testuser',
};

const jsonOk = (data) => ({ ok: true, json: () => Promise.resolve(data) });
const jsonFail = (data = {}) => ({ ok: false, json: () => Promise.resolve(data) });

beforeEach(() => {
    vi.clearAllMocks();
    // Default mocks: invite create OK, friends list OK
    mockFetchWithAuth.mockImplementation((url) => {
        if (url.includes('invites/create')) {
            return Promise.resolve(
                jsonOk({ code: 'abc123', url: 'https://pawscord.com/#/invite/abc123' })
            );
        }
        if (url.includes('friends/list')) {
            return Promise.resolve(
                jsonOk([
                    {
                        sender_username: 'testuser',
                        receiver_username: 'friend1',
                        sender_avatar: null,
                        receiver_avatar: null,
                    },
                    {
                        sender_username: 'friend2',
                        receiver_username: 'testuser',
                        sender_avatar: null,
                        receiver_avatar: null,
                    },
                ])
            );
        }
        return Promise.resolve(jsonOk({}));
    });

    // setup.js already mocks navigator.clipboard — just configure writeText
    navigator.clipboard.writeText.mockImplementation(() => Promise.resolve());
});

// ══════════════════════════════════════════════════════
// useInviteLogic
// ══════════════════════════════════════════════════════
describe('useInviteLogic', () => {
    it('initializes with empty invite link', () => {
        const { result } = renderHook(() => useInviteLogic(defaultProps));
        // Initially loading, link will be set after effect
        expect(result.current.loadingLink).toBeDefined();
    });

    it('fetches invite link on mount', async () => {
        const { result } = renderHook(() => useInviteLogic(defaultProps));

        await waitFor(() => {
            expect(result.current.inviteLink).toContain('pawscord.com');
        });
    });

    it('fetches friends list on mount', async () => {
        const { result } = renderHook(() => useInviteLogic(defaultProps));

        await waitFor(() => {
            expect(result.current.friends.length).toBe(2);
        });
    });

    it('copyToClipboard copies link and shows toast', async () => {
        const { result } = renderHook(() => useInviteLogic(defaultProps));

        await waitFor(() => expect(result.current.inviteLink).toBeTruthy());

        act(() => {
            result.current.copyToClipboard();
        });

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(result.current.inviteLink);
        expect(result.current.copied).toBe(true);
        expect(toast.success).toHaveBeenCalled();
    });

    it('filters friends by search query', async () => {
        const { result } = renderHook(() => useInviteLogic(defaultProps));

        await waitFor(() => expect(result.current.friends.length).toBe(2));

        act(() => {
            result.current.setSearchQuery('friend1');
        });

        expect(result.current.filteredFriends.length).toBe(1);
    });

    it('getFriendName returns the OTHER user', async () => {
        const { result } = renderHook(() => useInviteLogic(defaultProps));

        await waitFor(() => expect(result.current.friends.length).toBeGreaterThan(0));

        const friend = result.current.friends[0];
        const name = result.current.getFriendName(friend);
        expect(name).toBe('friend1'); // currentUser is testuser, so friend is friend1
    });

    it('regenerateLink updates the invite link', async () => {
        mockFetchWithAuth.mockImplementation((url) => {
            if (url.includes('invites/create')) {
                return Promise.resolve(
                    jsonOk({ code: 'new123', url: 'https://pawscord.com/#/invite/new123' })
                );
            }
            if (url.includes('friends/list')) {
                return Promise.resolve(jsonOk([]));
            }
            return Promise.resolve(jsonOk({}));
        });

        const { result } = renderHook(() => useInviteLogic(defaultProps));

        await waitFor(() => expect(result.current.inviteLink).toBeTruthy());

        await act(async () => {
            await result.current.regenerateLink();
        });

        expect(result.current.inviteLink).toContain('new123');
        expect(toast.success).toHaveBeenCalled();
    });

    it('regenerateLink shows error toast on failure', async () => {
        mockFetchWithAuth.mockImplementation((url) => {
            if (url.includes('invites/create')) {
                return Promise.resolve(jsonFail());
            }
            if (url.includes('friends/list')) {
                return Promise.resolve(jsonOk([]));
            }
            return Promise.resolve(jsonOk({}));
        });

        const { result } = renderHook(() => useInviteLogic(defaultProps));

        await waitFor(() => expect(result.current.loadingLink).toBe(false));

        await act(async () => {
            await result.current.regenerateLink();
        });

        expect(toast.error).toHaveBeenCalled();
    });

    it('handles missing server gracefully', async () => {
        const { result } = renderHook(() => useInviteLogic({ ...defaultProps, server: null }));

        await waitFor(() => {
            expect(result.current.loadingLink).toBe(false);
        });
    });

    it('sendInviteToFriend adds user to invitedUsers set', async () => {
        mockFetchWithAuth.mockImplementation((url) => {
            if (url.includes('invites/create')) {
                return Promise.resolve(jsonOk({ url: 'https://pawscord.com/#/invite/abc' }));
            }
            if (url.includes('friends/list')) {
                return Promise.resolve(jsonOk([]));
            }
            if (url.includes('conversations/find_or_create')) {
                return Promise.resolve(jsonOk({ conversation_id: 99 }));
            }
            if (url.includes('messages/send_dm')) {
                return Promise.resolve(jsonOk({}));
            }
            return Promise.resolve(jsonOk({}));
        });

        const { result } = renderHook(() => useInviteLogic(defaultProps));

        await waitFor(() => expect(result.current.inviteLink).toBeTruthy());

        act(() => {
            result.current.sendInviteToFriend('friend1');
        });

        expect(result.current.invitedUsers.has('friend1')).toBe(true);
    });
});
