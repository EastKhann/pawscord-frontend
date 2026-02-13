import { renderHook, act } from '@testing-library/react';
import useDMActions from '../../RoomList/useDMActions';

// Mock dependencies
vi.mock('../../utils/toast', () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
        warning: vi.fn(),
        info: vi.fn(),
    },
}));

// Mock window.confirm
const originalConfirm = globalThis.confirm;
beforeAll(() => {
    globalThis.confirm = vi.fn(() => true);
});
afterAll(() => {
    globalThis.confirm = originalConfirm;
});

const createDefaultProps = (overrides = {}) => ({
    apiUrl: 'http://localhost:8000/api',
    fetchWithAuth: vi.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({}),
        })
    ),
    servers: [
        { id: 1, name: 'Test Server' },
        { id: 2, name: 'Another Server' },
    ],
    onViewUserProfile: vi.fn(),
    ...overrides,
});

describe('useDMActions', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it('should return correct initial state values', () => {
        const { result } = renderHook(() => useDMActions(createDefaultProps()));

        expect(result.current.dmContextMenu).toBeNull();
        expect(result.current.inviteToServerModal).toBeNull();
    });

    it('should return all expected functions', () => {
        const { result } = renderHook(() => useDMActions(createDefaultProps()));

        const expectedFunctions = [
            'handleClearDM',
            'handleHideDM',
            'handleViewProfile',
            'handleInviteToServer',
            'handleSendServerInvite',
            'handleMuteUser',
            'handlePinConversation',
            'handleBlockUser',
            'handleAddFriend',
            'handleRemoveFriend',
        ];

        expectedFunctions.forEach((fn) => {
            expect(typeof result.current[fn]).toBe('function');
        });
    });

    it('should return state setters', () => {
        const { result } = renderHook(() => useDMActions(createDefaultProps()));

        expect(typeof result.current.setDmContextMenu).toBe('function');
        expect(typeof result.current.setInviteToServerModal).toBe('function');
    });

    it('should call onViewUserProfile and reset dmContextMenu when handleViewProfile is invoked', () => {
        const onViewUserProfile = vi.fn();
        const { result } = renderHook(() =>
            useDMActions(createDefaultProps({ onViewUserProfile }))
        );

        // Set a context menu first
        act(() => {
            result.current.setDmContextMenu({ x: 100, y: 200, conversation: {} });
        });
        expect(result.current.dmContextMenu).not.toBeNull();

        act(() => {
            result.current.handleViewProfile('someuser');
        });

        expect(onViewUserProfile).toHaveBeenCalledWith('someuser');
        expect(result.current.dmContextMenu).toBeNull();
    });

    it('should open inviteToServerModal when handleInviteToServer is called with servers available', () => {
        const { result } = renderHook(() => useDMActions(createDefaultProps()));

        act(() => {
            result.current.handleInviteToServer('targetuser');
        });

        expect(result.current.inviteToServerModal).toEqual({
            username: 'targetuser',
            isOpen: true,
        });
    });

    it('should call fetchWithAuth when handleClearDM is invoked', async () => {
        const fetchWithAuth = vi.fn(() =>
            Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
        );
        const { result } = renderHook(() =>
            useDMActions(createDefaultProps({ fetchWithAuth }))
        );

        await act(async () => {
            await result.current.handleClearDM(123);
        });

        expect(fetchWithAuth).toHaveBeenCalledWith(
            'http://localhost:8000/api/conversations/123/clear/',
            expect.objectContaining({ method: 'POST' })
        );
    });

    it('should call fetchWithAuth when handleAddFriend is invoked', async () => {
        const fetchWithAuth = vi.fn(() =>
            Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
        );
        const { result } = renderHook(() =>
            useDMActions(createDefaultProps({ fetchWithAuth }))
        );

        await act(async () => {
            await result.current.handleAddFriend('newFriend');
        });

        expect(fetchWithAuth).toHaveBeenCalledWith(
            'http://localhost:8000/api/friends/send/',
            expect.objectContaining({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: 'newFriend' }),
            })
        );
    });

    it('should call fetchWithAuth when handleBlockUser is invoked', async () => {
        const fetchWithAuth = vi.fn(() =>
            Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
        );
        const { result } = renderHook(() =>
            useDMActions(createDefaultProps({ fetchWithAuth }))
        );

        await act(async () => {
            await result.current.handleBlockUser('baduser');
        });

        expect(fetchWithAuth).toHaveBeenCalledWith(
            'http://localhost:8000/api/users/baduser/block/',
            expect.objectContaining({ method: 'POST' })
        );
    });
});
