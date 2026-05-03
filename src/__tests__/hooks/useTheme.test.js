// frontend/src/__tests__/hooks/useTheme.test.js
// Tests for useTheme hook – dark/light mode toggle + localStorage persistence
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTheme } from '../../hooks/useTheme';

// Override global vi.fn() localStorage mock with a real functional store
const _store = {};
const realLocalStorageMock = {
    getItem: (key) => _store[key] ?? null,
    setItem: (key, value) => { _store[key] = value; },
    removeItem: (key) => { delete _store[key]; },
    clear: () => { Object.keys(_store).forEach((k) => delete _store[k]); },
};
Object.defineProperty(window, 'localStorage', { value: realLocalStorageMock, writable: true, configurable: true });

describe('useTheme', () => {
    beforeEach(() => {
        realLocalStorageMock.clear();
        // Reset document attribute
        document.documentElement.removeAttribute('data-theme');
    });

    afterEach(() => {
        realLocalStorageMock.clear();
        document.documentElement.removeAttribute('data-theme');
    });

    // ── 1. Defaults to dark theme ──
    it('should default to dark theme when no saved theme exists', () => {
        const { result } = renderHook(() => useTheme());
        expect(result.current.theme).toBe('dark');
        expect(result.current.isDark).toBe(true);
    });

    // ── 2. Reads saved theme from localStorage ──
    it('should read theme from localStorage if previously saved', () => {
        localStorage.setItem('pawscord-theme', 'light');
        const { result } = renderHook(() => useTheme());
        expect(result.current.theme).toBe('light');
        expect(result.current.isDark).toBe(false);
    });

    // ── 3. toggleTheme switches from dark to light ──
    it('should toggle from dark to light', () => {
        const { result } = renderHook(() => useTheme());
        expect(result.current.theme).toBe('dark');

        act(() => {
            result.current.toggleTheme();
        });

        expect(result.current.theme).toBe('light');
        expect(result.current.isDark).toBe(false);
    });

    // ── 4. toggleTheme switches from light to dark ──
    it('should toggle from light to dark', () => {
        localStorage.setItem('pawscord-theme', 'light');
        const { result } = renderHook(() => useTheme());

        act(() => {
            result.current.toggleTheme();
        });

        expect(result.current.theme).toBe('dark');
        expect(result.current.isDark).toBe(true);
    });

    // ── 5. Persists theme to localStorage ──
    it('should save theme to localStorage when toggled', () => {
        const { result } = renderHook(() => useTheme());

        act(() => {
            result.current.toggleTheme();
        });

        expect(localStorage.getItem('pawscord-theme')).toBe('light');
    });

    // ── 6. Sets data-theme attribute on document ──
    it('should set data-theme attribute on document element', () => {
        const { result } = renderHook(() => useTheme());

        // After the effect runs, the document should have data-theme
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

        act(() => {
            result.current.toggleTheme();
        });

        expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });

    // ── 7. isDark reflects current theme ──
    it('should have isDark=true when theme is dark', () => {
        const { result } = renderHook(() => useTheme());
        expect(result.current.isDark).toBe(true);
    });

    // ── 8. Double toggle returns to original state ──
    it('should return to original theme after double toggle', () => {
        const { result } = renderHook(() => useTheme());
        expect(result.current.theme).toBe('dark');

        act(() => {
            result.current.toggleTheme();
        });
        expect(result.current.theme).toBe('light');

        act(() => {
            result.current.toggleTheme();
        });
        expect(result.current.theme).toBe('dark');
    });

    // ── 9. Returns stable toggleTheme function ──
    it('should return a toggleTheme function', () => {
        const { result } = renderHook(() => useTheme());
        expect(typeof result.current.toggleTheme).toBe('function');
    });

    // ── 10. Multiple rapid toggles work correctly ──
    it('should handle multiple rapid toggles', () => {
        const { result } = renderHook(() => useTheme());

        act(() => {
            result.current.toggleTheme(); // light
            result.current.toggleTheme(); // dark
            result.current.toggleTheme(); // light
        });

        expect(result.current.theme).toBe('light');
    });
});
