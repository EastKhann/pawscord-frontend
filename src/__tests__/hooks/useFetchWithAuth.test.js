// frontend/src/__tests__/hooks/useFetchWithAuth.test.js
// 🧪 Authenticated Fetch Hook Tests
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

// Mock AuthContext
const mockToken = 'mock-jwt-token';
const mockLogout = vi.fn();
const mockRefreshAccessToken = vi.fn();
vi.mock('../../AuthContext', () => ({
    useAuth: () => ({
        token: mockToken,
        logout: mockLogout,
        refreshAccessToken: mockRefreshAccessToken,
    }),
}));

import useFetchWithAuth from '../../App/useFetchWithAuth';

describe('useFetchWithAuth', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        global.fetch.mockReset();
        global.fetch.mockResolvedValue({
            ok: true, status: 200,
            json: () => Promise.resolve({ data: 'test' }),
            text: () => Promise.resolve('ok'),
        });
        mockRefreshAccessToken.mockResolvedValue(true);
    });

    // ─── BASIC FETCH ───
    describe('Basic fetch', () => {
        it('should return fetchWithAuth function', () => {
            const { result } = renderHook(() => useFetchWithAuth());
            expect(result.current.fetchWithAuth).toBeInstanceOf(Function);
        });

        it('should set Authorization Bearer header', async () => {
            const { result } = renderHook(() => useFetchWithAuth());
            await act(async () => {
                await result.current.fetchWithAuth('https://api.test.com/data');
            });
            const callArgs = global.fetch.mock.calls[0];
            expect(callArgs[1].headers['Authorization']).toBe(`Bearer ${mockToken}`);
        });

        it('should set Content-Type application/json for non-FormData', async () => {
            const { result } = renderHook(() => useFetchWithAuth());
            await act(async () => {
                await result.current.fetchWithAuth('https://api.test.com/data', {
                    method: 'POST',
                    body: JSON.stringify({ test: true }),
                });
            });
            const callArgs = global.fetch.mock.calls[0];
            expect(callArgs[1].headers['Content-Type']).toBe('application/json');
        });

        it('should NOT set Content-Type for FormData body', async () => {
            const { result } = renderHook(() => useFetchWithAuth());
            const formData = new FormData();
            formData.append('file', 'test');
            await act(async () => {
                await result.current.fetchWithAuth('https://api.test.com/upload', {
                    method: 'POST',
                    body: formData,
                });
            });
            const callArgs = global.fetch.mock.calls[0];
            expect(callArgs[1].headers['Content-Type']).toBeUndefined();
        });

        it('should return response on success', async () => {
            const { result } = renderHook(() => useFetchWithAuth());
            let response;
            await act(async () => {
                response = await result.current.fetchWithAuth('https://api.test.com/data');
            });
            expect(response.ok).toBe(true);
        });
    });

    // ─── 401 HANDLING ───
    describe('401 handling', () => {
        it('should logout on 401 for /auth/ URLs', async () => {
            global.fetch.mockResolvedValueOnce({ ok: false, status: 401 });
            const { result } = renderHook(() => useFetchWithAuth());
            await act(async () => {
                try {
                    await result.current.fetchWithAuth('https://api.test.com/auth/login');
                } catch (e) {
                    expect(e.message).toBe('Unauthorized');
                }
            });
            expect(mockLogout).toHaveBeenCalled();
            expect(mockRefreshAccessToken).not.toHaveBeenCalled();
        });

        it('should logout on 401 for /login URLs', async () => {
            global.fetch.mockResolvedValueOnce({ ok: false, status: 401 });
            const { result } = renderHook(() => useFetchWithAuth());
            await act(async () => {
                try {
                    await result.current.fetchWithAuth('https://api.test.com/login');
                } catch (e) {
                    expect(e.message).toBe('Unauthorized');
                }
            });
            expect(mockLogout).toHaveBeenCalled();
        });

        it('should refresh token and retry on 401 for normal URLs', async () => {
            global.fetch
                .mockResolvedValueOnce({ ok: false, status: 401 }) // first call fails
                .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({ retried: true }) }); // retry succeeds

            const { result } = renderHook(() => useFetchWithAuth());
            let response;
            await act(async () => {
                response = await result.current.fetchWithAuth('https://api.test.com/messages');
            });
            expect(mockRefreshAccessToken).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(response.ok).toBe(true);
        });

        it('should NOT retry if _isRetry is true (prevent infinite loop)', async () => {
            global.fetch.mockResolvedValue({ ok: false, status: 401 });
            const { result } = renderHook(() => useFetchWithAuth());
            await act(async () => {
                try {
                    // simulate internal retry call with _isRetry=true
                    await result.current.fetchWithAuth('https://api.test.com/messages', {}, true);
                } catch (e) {
                    // Should not trigger refresh
                }
            });
            expect(mockRefreshAccessToken).not.toHaveBeenCalled();
        });

        it('should throw if refresh fails', async () => {
            global.fetch.mockResolvedValueOnce({ ok: false, status: 401 });
            mockRefreshAccessToken.mockResolvedValueOnce(false);

            const { result } = renderHook(() => useFetchWithAuth());
            await act(async () => {
                await expect(
                    result.current.fetchWithAuth('https://api.test.com/messages')
                ).rejects.toThrow('Unauthorized');
            });
        });
    });

    // ─── ABORT & TIMEOUT ───
    describe('Timeout / AbortController', () => {
        it('should use AbortController signal in fetch call', async () => {
            const { result } = renderHook(() => useFetchWithAuth());
            await act(async () => {
                await result.current.fetchWithAuth('https://api.test.com/data');
            });
            const callArgs = global.fetch.mock.calls[0];
            expect(callArgs[1].signal).toBeDefined();
            expect(callArgs[1].signal).toBeInstanceOf(AbortSignal);
        });

        it('should throw timeout error on AbortError', async () => {
            const abortError = new DOMException('The operation was aborted', 'AbortError');
            global.fetch.mockRejectedValueOnce(abortError);

            const { result } = renderHook(() => useFetchWithAuth());
            await act(async () => {
                await expect(
                    result.current.fetchWithAuth('https://api.test.com/data')
                ).rejects.toThrow('İstek zaman aşımına uğradı');
            });
        });
    });

    // ─── ERROR HANDLING ───
    describe('Error handling', () => {
        it('should re-throw network errors', async () => {
            global.fetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));
            const { result } = renderHook(() => useFetchWithAuth());
            await act(async () => {
                await expect(
                    result.current.fetchWithAuth('https://api.test.com/data')
                ).rejects.toThrow('Failed to fetch');
            });
        });
    });
});
