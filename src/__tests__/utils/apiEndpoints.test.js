// frontend/src/__tests__/utils/apiEndpoints.test.js
// Tests for apiEndpoints.js — URL construction, ENDPOINTS object, getEndpoint helper

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// We need to test with a known API_BASE, so we mock import.meta.env
// The module reads import.meta.env.VITE_API_URL at load time, so we
// re-import after setting the env var.
describe('apiEndpoints', () => {
    let ENDPOINTS, API_BASE, API_BASE_URL, getApiBase, getEndpoint;

    beforeEach(async () => {
        // Reset module cache so getApiBaseUrl() runs fresh
        vi.resetModules();
        // Set a deterministic base URL
        vi.stubEnv('VITE_API_URL', 'https://test.pawscord.com');
        const mod = await import('../../utils/apiEndpoints.js');
        ENDPOINTS = mod.ENDPOINTS;
        API_BASE = mod.API_BASE;
        API_BASE_URL = mod.API_BASE_URL;
        getApiBase = mod.getApiBase;
        getEndpoint = mod.getEndpoint;
    });

    afterEach(() => {
        vi.unstubAllEnvs();
    });

    // --- Base URL ---
    it('API_BASE equals the env var value', () => {
        expect(API_BASE).toBe('https://test.pawscord.com');
    });

    it('API_BASE_URL appends /api', () => {
        expect(API_BASE_URL).toBe('https://test.pawscord.com/api');
    });

    it('getApiBase returns same value as API_BASE', () => {
        expect(getApiBase()).toBe(API_BASE);
    });

    // --- AUTH endpoints ---
    it('AUTH.LOGIN ends with /auth/token/', () => {
        expect(ENDPOINTS.AUTH.LOGIN).toMatch(/\/auth\/token\/$/);
    });

    it('AUTH.REGISTER ends with /auth/register/', () => {
        expect(ENDPOINTS.AUTH.REGISTER).toMatch(/\/auth\/register\/$/);
    });

    it('AUTH.REFRESH ends with /auth/token/refresh/', () => {
        expect(ENDPOINTS.AUTH.REFRESH).toMatch(/\/auth\/token\/refresh\/$/);
    });

    // --- Dynamic endpoints (functions) ---
    it('USER.PROFILE returns URL with userId', () => {
        const url = ENDPOINTS.USER.PROFILE(42);
        expect(url).toContain('/profile/42/');
    });

    it('SERVERS.DETAIL returns URL with server id', () => {
        const url = ENDPOINTS.SERVERS.DETAIL(7);
        expect(url).toContain('/servers/7/');
    });

    it('SERVERS.JOIN returns URL with server id', () => {
        const url = ENDPOINTS.SERVERS.JOIN(10);
        expect(url).toContain('/servers/10/join/');
    });

    it('MESSAGES.SEND returns URL with room id', () => {
        const url = ENDPOINTS.MESSAGES.SEND(5);
        expect(url).toContain('/rooms/5/messages/send/');
    });

    it('MESSAGES.EDIT returns URL with message id', () => {
        const url = ENDPOINTS.MESSAGES.EDIT(99);
        expect(url).toContain('/messages/99/edit/');
    });

    // --- getEndpoint helper ---
    it('getEndpoint replaces :key placeholders', () => {
        const result = getEndpoint('/servers/:id/rooms/:roomId', { id: 1, roomId: 2 });
        expect(result).toBe('/servers/1/rooms/2');
    });

    it('getEndpoint with no params returns path unchanged', () => {
        const path = '/api/test/';
        expect(getEndpoint(path)).toBe(path);
    });

    // --- Structural checks ---
    it('ENDPOINTS has AUTH section', () => {
        expect(ENDPOINTS.AUTH).toBeDefined();
        expect(typeof ENDPOINTS.AUTH.LOGIN).toBe('string');
    });

    it('ENDPOINTS has SERVERS section with LIST', () => {
        expect(typeof ENDPOINTS.SERVERS.LIST).toBe('string');
    });

    it('ENDPOINTS has MESSAGES section with TRANSLATE', () => {
        expect(typeof ENDPOINTS.MESSAGES.TRANSLATE).toBe('string');
    });
});
