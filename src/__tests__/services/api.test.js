// frontend/src/__tests__/services/api.test.js
// Tests for the simple api.js wrapper (api.post / api.get)

import { describe, it, expect, vi, beforeEach } from 'vitest';

// We test the thin api wrapper at ../../api.js
// It delegates to authFetch and falls back to native fetch.

// ── Mocks ──────────────────────────────────────────────
const mockAuthFetch = vi.fn();
vi.mock('../../utils/authFetch', () => ({ authFetch: (...a) => mockAuthFetch(...a) }));

let api;

beforeEach(async () => {
    vi.clearAllMocks();
    vi.resetModules();
    global.fetch = vi.fn();
    const mod = await import('../../api.js');
    api = mod.default;
});

// ── Helpers ────────────────────────────────────────────
const jsonOk = (data, status = 200) => ({
    ok: true,
    status,
    json: () => Promise.resolve(data),
});

const jsonFail = (data, status = 400) => ({
    ok: false,
    status,
    json: () => Promise.resolve(data),
});

// ======================================================
// GET REQUESTS
// ======================================================
describe('api.get', () => {
    it('sends GET with Content-Type header', async () => {
        mockAuthFetch.mockResolvedValueOnce(jsonOk({ users: [] }));

        await api.get('/api/users/');

        expect(mockAuthFetch).toHaveBeenCalledWith(
            '/api/users/',
            expect.objectContaining({
                method: 'GET',
                headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
                credentials: 'include',
            })
        );
    });

    it('returns { data, status } on success', async () => {
        mockAuthFetch.mockResolvedValueOnce(jsonOk({ ok: true }, 200));

        const result = await api.get('/api/health/');

        expect(result.data).toEqual({ ok: true });
        expect(result.status).toBe(200);
    });

    it('merges custom headers', async () => {
        mockAuthFetch.mockResolvedValueOnce(jsonOk({}));

        await api.get('/api/test/', { headers: { 'X-Custom': 'yes' } });

        const callHeaders = mockAuthFetch.mock.calls[0][1].headers;
        expect(callHeaders['X-Custom']).toBe('yes');
        expect(callHeaders['Content-Type']).toBe('application/json');
    });

    it('throws on non-ok response with response data', async () => {
        mockAuthFetch.mockResolvedValueOnce(jsonFail({ error: 'Forbidden' }, 403));

        await expect(api.get('/api/secret/')).rejects.toThrow('Forbidden');
    });

    it('attaches response.data and response.status to the error', async () => {
        mockAuthFetch.mockResolvedValueOnce(jsonFail({ error: 'Not found' }, 404));

        try {
            await api.get('/api/missing/');
            expect.unreachable('should have thrown');
        } catch (err) {
            expect(err.response.status).toBe(404);
            expect(err.response.data.error).toBe('Not found');
        }
    });

    it('falls back to native fetch when "No refresh token available"', async () => {
        mockAuthFetch.mockRejectedValueOnce(new Error('No refresh token available'));
        global.fetch.mockResolvedValueOnce(jsonOk({ guest: true }, 200));

        const result = await api.get('/api/public/');

        expect(global.fetch).toHaveBeenCalled();
        expect(result.data).toEqual({ guest: true });
    });

    it('fallback fetch also throws on non-ok', async () => {
        mockAuthFetch.mockRejectedValueOnce(new Error('No refresh token available'));
        global.fetch.mockResolvedValueOnce(jsonFail({ error: 'Bad' }, 400));

        await expect(api.get('/api/bad/')).rejects.toThrow('Bad');
    });

    it('propagates non-auth errors directly', async () => {
        mockAuthFetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));

        await expect(api.get('/api/down/')).rejects.toThrow('Failed to fetch');
    });

    it('uses default error message when error field is missing', async () => {
        mockAuthFetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
            json: () => Promise.resolve({}),
        });

        await expect(api.get('/api/broken/')).rejects.toThrow('Request failed');
    });
});

// ======================================================
// POST REQUESTS
// ======================================================
describe('api.post', () => {
    it('sends POST with JSON body', async () => {
        mockAuthFetch.mockResolvedValueOnce(jsonOk({ id: 1 }, 201));

        await api.post('/api/messages/', { content: 'hello' });

        const [url, opts] = mockAuthFetch.mock.calls[0];
        expect(url).toBe('/api/messages/');
        expect(opts.method).toBe('POST');
        expect(JSON.parse(opts.body)).toEqual({ content: 'hello' });
    });

    it('returns data and status on success', async () => {
        mockAuthFetch.mockResolvedValueOnce(jsonOk({ created: true }, 201));

        const result = await api.post('/api/rooms/', { name: 'general' });

        expect(result.data.created).toBe(true);
        expect(result.status).toBe(201);
    });

    it('sets credentials to include', async () => {
        mockAuthFetch.mockResolvedValueOnce(jsonOk({}));

        await api.post('/api/login/', { user: 'a', pass: 'b' });

        expect(mockAuthFetch.mock.calls[0][1].credentials).toBe('include');
    });

    it('throws with response data on non-ok', async () => {
        mockAuthFetch.mockResolvedValueOnce(jsonFail({ error: 'Dup' }, 409));

        try {
            await api.post('/api/register/', {});
            expect.unreachable('should throw');
        } catch (err) {
            expect(err.response.status).toBe(409);
        }
    });

    it('falls back to native fetch on "No refresh token available"', async () => {
        mockAuthFetch.mockRejectedValueOnce(new Error('No refresh token available'));
        global.fetch.mockResolvedValueOnce(jsonOk({ ok: true }));

        const result = await api.post('/api/auth/', { code: '123' });

        expect(global.fetch).toHaveBeenCalled();
        expect(result.data.ok).toBe(true);
    });

    it('fallback POST also sends json body', async () => {
        mockAuthFetch.mockRejectedValueOnce(new Error('No refresh token available'));
        global.fetch.mockResolvedValueOnce(jsonOk({}));

        await api.post('/api/x/', { foo: 'bar' });

        const body = JSON.parse(global.fetch.mock.calls[0][1].body);
        expect(body.foo).toBe('bar');
    });

    it('accepts custom headers overriding Content-Type', async () => {
        mockAuthFetch.mockResolvedValueOnce(jsonOk({}));

        await api.post('/api/upload/', {}, { headers: { 'Content-Type': 'multipart/form-data' } });

        const h = mockAuthFetch.mock.calls[0][1].headers;
        expect(h['Content-Type']).toBe('multipart/form-data');
    });

    it('handles network error on POST', async () => {
        mockAuthFetch.mockRejectedValueOnce(new Error('Network Error'));

        await expect(api.post('/api/chat/', {})).rejects.toThrow('Network Error');
    });

    it('handles 500 server error', async () => {
        mockAuthFetch.mockResolvedValueOnce(jsonFail({ error: 'Internal' }, 500));

        await expect(api.post('/api/crash/', {})).rejects.toThrow('Internal');
    });

    it('handles 401 unauthorized on POST', async () => {
        mockAuthFetch.mockResolvedValueOnce(jsonFail({ error: 'Unauthorized' }, 401));

        await expect(api.post('/api/private/', {})).rejects.toThrow('Unauthorized');
    });
});
