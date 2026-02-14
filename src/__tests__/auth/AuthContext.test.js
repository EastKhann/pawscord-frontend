// frontend/src/__tests__/auth/AuthContext.test.js
// 🧪 AuthContext Provider Tests
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';

// Mock jwt-decode
const mockJwtDecode = vi.fn();
vi.mock('jwt-decode', () => ({
    jwtDecode: (...args) => mockJwtDecode(...args),
}));

// Mock utils/constants — avoid Capacitor import
vi.mock('../../utils/constants', () => ({
    API_URL_BASE_STRING: 'http://localhost:8888',
    isElectron: false,
    isNative: false,
    MY_LOCAL_IP: '127.0.0.1',
    DJANGO_PORT: '8888',
}));

import { AuthProvider, useAuth } from '../../AuthContext';

// Helper: wrap hooks with AuthProvider
const wrapper = ({ children }) => React.createElement(AuthProvider, null, children);

describe('AuthContext', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.useRealTimers();
        // Reset localStorage mock for each test
        window.localStorage.getItem.mockReturnValue(null);
        window.localStorage.setItem.mockClear();
        window.localStorage.removeItem.mockClear();
        // Reset fetch
        global.fetch.mockReset();
        global.fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({}),
        });
    });

    // ─── INITIAL STATE ───
    describe('Initial state', () => {
        it('should be unauthenticated when no stored token', () => {
            const { result } = renderHook(() => useAuth(), { wrapper });
            expect(result.current.isAuthenticated).toBe(false);
            expect(result.current.user).toBeNull();
            expect(result.current.token).toBeNull();
        });

        it('should be authenticated if valid token in localStorage', () => {
            const futureExp = (Date.now() / 1000) + 3600; // 1h future
            window.localStorage.getItem.mockImplementation((key) => {
                if (key === 'access_token') return 'valid-token';
                if (key === 'chat_username') return 'testuser';
                return null;
            });
            mockJwtDecode.mockReturnValue({ exp: futureExp, username: 'testuser' });

            const { result } = renderHook(() => useAuth(), { wrapper });
            expect(result.current.isAuthenticated).toBe(true);
            expect(result.current.token).toBe('valid-token');
        });

        it('should be unauthenticated if stored token is expired', () => {
            const pastExp = (Date.now() / 1000) - 3600; // 1h ago
            window.localStorage.getItem.mockImplementation((key) => {
                if (key === 'access_token') return 'expired-token';
                return null;
            });
            mockJwtDecode.mockReturnValue({ exp: pastExp, username: 'testuser' });

            const { result } = renderHook(() => useAuth(), { wrapper });
            // Initial state is based on storedToken check — expired = false
            expect(result.current.isAuthenticated).toBe(false);
        });
    });

    // ─── LOGIN ───
    describe('login', () => {
        it('should store tokens and set user on login', () => {
            mockJwtDecode.mockReturnValue({ exp: (Date.now() / 1000) + 3600, username: 'alice' });

            const { result } = renderHook(() => useAuth(), { wrapper });
            act(() => {
                result.current.login('access-token-123', 'refresh-token-456');
            });

            expect(result.current.isAuthenticated).toBe(true);
            expect(result.current.user).toEqual({ username: 'alice' });
            expect(result.current.token).toBe('access-token-123');
            expect(window.localStorage.setItem).toHaveBeenCalledWith('access_token', 'access-token-123');
            expect(window.localStorage.setItem).toHaveBeenCalledWith('refresh_token', 'refresh-token-456');
            expect(window.localStorage.setItem).toHaveBeenCalledWith('chat_username', 'alice');
        });

        it('should decode JWT to extract username', () => {
            mockJwtDecode.mockReturnValue({ exp: (Date.now() / 1000) + 3600, username: 'bob' });

            const { result } = renderHook(() => useAuth(), { wrapper });
            act(() => {
                result.current.login('token', 'refresh');
            });

            expect(mockJwtDecode).toHaveBeenCalledWith('token');
            expect(result.current.user.username).toBe('bob');
        });

        it('should call logout if jwtDecode throws', () => {
            mockJwtDecode.mockImplementation(() => { throw new Error('Invalid token'); });

            const { result } = renderHook(() => useAuth(), { wrapper });
            act(() => {
                result.current.login('bad-token', 'refresh');
            });

            // Login error → logout → unauthenticated
            expect(result.current.isAuthenticated).toBe(false);
            expect(result.current.token).toBeNull();
        });
    });

    // ─── LOGOUT ───
    describe('logout', () => {
        it('should clear all auth state', () => {
            mockJwtDecode.mockReturnValue({ exp: (Date.now() / 1000) + 3600, username: 'testuser' });

            const { result } = renderHook(() => useAuth(), { wrapper });
            act(() => { result.current.login('token', 'refresh'); });
            act(() => { result.current.logout(); });

            expect(result.current.isAuthenticated).toBe(false);
            expect(result.current.user).toBeNull();
            expect(result.current.token).toBeNull();
            expect(window.localStorage.removeItem).toHaveBeenCalledWith('access_token');
            expect(window.localStorage.removeItem).toHaveBeenCalledWith('refresh_token');
            expect(window.localStorage.removeItem).toHaveBeenCalledWith('chat_username');
        });
    });

    // ─── REFRESH TOKEN ───
    describe('refreshAccessToken', () => {
        it('should refresh successfully with valid refresh token', async () => {
            window.localStorage.getItem.mockImplementation((key) => {
                if (key === 'refresh_token') return 'valid-refresh';
                return null;
            });
            mockJwtDecode.mockReturnValue({ exp: (Date.now() / 1000) + 3600, username: 'refreshed-user' });

            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({ access: 'new-access-token', refresh: 'new-refresh-token' }),
            });

            const { result } = renderHook(() => useAuth(), { wrapper });
            let refreshResult;
            await act(async () => {
                refreshResult = await result.current.refreshAccessToken();
            });

            expect(refreshResult).toBe(true);
            expect(window.localStorage.setItem).toHaveBeenCalledWith('access_token', 'new-access-token');
            expect(window.localStorage.setItem).toHaveBeenCalledWith('refresh_token', 'new-refresh-token');
        });

        it('should logout if no refresh_token stored', async () => {
            window.localStorage.getItem.mockReturnValue(null);

            const { result } = renderHook(() => useAuth(), { wrapper });
            let refreshResult;
            await act(async () => {
                refreshResult = await result.current.refreshAccessToken();
            });

            expect(refreshResult).toBe(false);
        });

        it('should logout on failed refresh response', async () => {
            window.localStorage.getItem.mockImplementation((key) => {
                if (key === 'refresh_token') return 'expired-refresh';
                return null;
            });

            global.fetch.mockResolvedValueOnce({ ok: false, status: 401 });

            const { result } = renderHook(() => useAuth(), { wrapper });
            let refreshResult;
            await act(async () => {
                refreshResult = await result.current.refreshAccessToken();
            });

            expect(refreshResult).toBe(false);
            expect(result.current.isAuthenticated).toBe(false);
        });

        it('should logout on network error during refresh', async () => {
            window.localStorage.getItem.mockImplementation((key) => {
                if (key === 'refresh_token') return 'valid-refresh';
                return null;
            });

            global.fetch.mockRejectedValueOnce(new Error('Network error'));

            const { result } = renderHook(() => useAuth(), { wrapper });
            let refreshResult;
            await act(async () => {
                refreshResult = await result.current.refreshAccessToken();
            });

            expect(refreshResult).toBe(false);
        });
    });

    // ─── CONTEXT VALUE ───
    describe('Context value', () => {
        it('should expose all required auth methods and state', () => {
            const { result } = renderHook(() => useAuth(), { wrapper });
            expect(result.current).toHaveProperty('user');
            expect(result.current).toHaveProperty('token');
            expect(result.current).toHaveProperty('isAuthenticated');
            expect(result.current).toHaveProperty('login');
            expect(result.current).toHaveProperty('logout');
            expect(result.current).toHaveProperty('isLoading');
            expect(result.current).toHaveProperty('refreshAccessToken');
        });
    });
});
