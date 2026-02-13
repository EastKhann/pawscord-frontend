import { renderHook, act } from '@testing-library/react';
import useServerActions from '../../RoomList/useServerActions';

// Mock dependencies
vi.mock('../../utils/toast', () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
        warning: vi.fn(),
        info: vi.fn(),
    },
}));

vi.mock('../../utils/confirmDialog', () => ({
    default: vi.fn(() => Promise.resolve(true)),
}));

const createDefaultProps = (overrides = {}) => ({
    apiUrl: 'http://localhost:8000/api',
    fetchWithAuth: vi.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({}),
        })
    ),
    servers: [],
    currentUsername: 'testuser',
    selectedServerId: null,
    setSelectedServerId: vi.fn(),
    onWelcomeClick: vi.fn(),
    onMoveServer: vi.fn(),
    ...overrides,
});

describe('useServerActions', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return correct initial state values', () => {
        const { result } = renderHook(() => useServerActions(createDefaultProps()));

        expect(result.current.publicServers).toEqual([]);
        expect(result.current.newServerName).toBe('');
        expect(result.current.newCategoryName).toBe('');
        expect(result.current.newRoomName).toBe('');
        expect(result.current.newRoomType).toBe('text');
        expect(result.current.isNewServerPublic).toBe(false);
        expect(result.current.activeServerIdForCategory).toBeNull();
        expect(result.current.activeCategoryIdForRoom).toBeNull();
        expect(result.current.editingItemId).toBeNull();
        expect(result.current.editName).toBe('');
        expect(result.current.leaveServerModal).toBeNull();
        expect(result.current.deleteServerModal).toBeNull();
    });

    it('should return all expected functions', () => {
        const { result } = renderHook(() => useServerActions(createDefaultProps()));

        const expectedFunctions = [
            'handleLeaveServer',
            'executeLeaveServer',
            'handleChangeServerIcon',
            'handleChangeServerPrivacy',
            'handleCopyServerInvite',
            'handleCreateServer',
            'handleCreateCategory',
            'handleCreateRoom',
            'handleRenameCategory',
            'handleDeleteCategory',
            'handleRenameRoom',
            'handleDeleteRoom',
            'handleMoveServer',
            'handleMoveUserToChannel',
            'handleKickUserFromChannel',
            'handleOpenDiscovery',
            'handleJoinServer',
            'handleJoinViaCode',
        ];

        expectedFunctions.forEach((fn) => {
            expect(typeof result.current[fn]).toBe('function');
        });
    });

    it('should return all expected state setters', () => {
        const { result } = renderHook(() => useServerActions(createDefaultProps()));

        const expectedSetters = [
            'setPublicServers',
            'setNewServerName',
            'setNewCategoryName',
            'setNewRoomName',
            'setNewRoomType',
            'setIsNewServerPublic',
            'setActiveServerIdForCategory',
            'setActiveCategoryIdForRoom',
            'setEditingItemId',
            'setEditName',
            'setLeaveServerModal',
            'setDeleteServerModal',
        ];

        expectedSetters.forEach((setter) => {
            expect(typeof result.current[setter]).toBe('function');
        });
    });

    it('should update newServerName via setter', () => {
        const { result } = renderHook(() => useServerActions(createDefaultProps()));

        act(() => {
            result.current.setNewServerName('My New Server');
        });

        expect(result.current.newServerName).toBe('My New Server');
    });

    it('should call fetchWithAuth when handleCreateServer is invoked with a name', async () => {
        const fetchWithAuth = vi.fn(() =>
            Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
        );
        const { result } = renderHook(() =>
            useServerActions(createDefaultProps({ fetchWithAuth }))
        );

        // Set a server name first
        act(() => {
            result.current.setNewServerName('Test Server');
        });

        await act(async () => {
            await result.current.handleCreateServer({ preventDefault: vi.fn() });
        });

        expect(fetchWithAuth).toHaveBeenCalledWith(
            'http://localhost:8000/api/servers/create/',
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ name: 'Test Server', is_public: false }),
            })
        );

        // Name should be reset after creation
        expect(result.current.newServerName).toBe('');
    });

    it('should not call fetchWithAuth when handleCreateServer is invoked with empty name', async () => {
        const fetchWithAuth = vi.fn();
        const { result } = renderHook(() =>
            useServerActions(createDefaultProps({ fetchWithAuth }))
        );

        // Name is empty by default
        await act(async () => {
            await result.current.handleCreateServer({ preventDefault: vi.fn() });
        });

        expect(fetchWithAuth).not.toHaveBeenCalled();
    });

    it('should call fetchWithAuth when handleJoinServer is invoked', async () => {
        const fetchWithAuth = vi.fn(() =>
            Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
        );
        const { result } = renderHook(() =>
            useServerActions(createDefaultProps({ fetchWithAuth }))
        );

        await act(async () => {
            await result.current.handleJoinServer(42);
        });

        expect(fetchWithAuth).toHaveBeenCalledWith(
            'http://localhost:8000/api/servers/42/join/',
            expect.objectContaining({ method: 'POST' })
        );
    });

    it('should call fetchWithAuth when handleOpenDiscovery is invoked and update publicServers', async () => {
        const mockServers = [
            { id: 1, name: 'Public 1' },
            { id: 2, name: 'Public 2' },
        ];
        const fetchWithAuth = vi.fn(() =>
            Promise.resolve({ ok: true, json: () => Promise.resolve(mockServers) })
        );
        const { result } = renderHook(() =>
            useServerActions(createDefaultProps({ fetchWithAuth }))
        );

        await act(async () => {
            await result.current.handleOpenDiscovery();
        });

        expect(fetchWithAuth).toHaveBeenCalledWith('http://localhost:8000/api/servers/public/');
        expect(result.current.publicServers).toEqual(mockServers);
    });

    it('should call onMoveServer when handleMoveServer is invoked', () => {
        const onMoveServer = vi.fn();
        const { result } = renderHook(() =>
            useServerActions(createDefaultProps({ onMoveServer }))
        );

        act(() => {
            result.current.handleMoveServer(5, 'up');
        });

        expect(onMoveServer).toHaveBeenCalledWith(5, 'up');
    });

    it('should call executeLeaveServer and update state on success', async () => {
        const setSelectedServerId = vi.fn();
        const onWelcomeClick = vi.fn();
        const fetchWithAuth = vi.fn(() =>
            Promise.resolve({ ok: true, json: () => Promise.resolve({ success: true }) })
        );

        const { result } = renderHook(() =>
            useServerActions(
                createDefaultProps({ fetchWithAuth, setSelectedServerId, onWelcomeClick })
            )
        );

        await act(async () => {
            await result.current.executeLeaveServer(10);
        });

        expect(fetchWithAuth).toHaveBeenCalledWith(
            'http://localhost:8000/api/servers/10/leave/',
            expect.objectContaining({ method: 'POST' })
        );
        expect(setSelectedServerId).toHaveBeenCalledWith('home');
        expect(onWelcomeClick).toHaveBeenCalled();
    });
});
