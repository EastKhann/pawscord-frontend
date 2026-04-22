// frontend/src/__tests__/hooks/useLocalStorage.test.js
// Tests for useLocalStorage from useCustomHooks
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../../hooks/useCustomHooks';

// Override the global vi.fn() localStorage mock with a real store for these tests
const _store: Record<string, string> = {};
const realLocalStorageMock = {
    getItem: (key: string) => _store[key] ?? null,
    setItem: (key: string, value: string) => { _store[key] = value; },
    removeItem: (key: string) => { delete _store[key]; },
    clear: () => { Object.keys(_store).forEach((k) => delete _store[k]); },
};
Object.defineProperty(window, 'localStorage', { value: realLocalStorageMock, writable: true, configurable: true });

describe('useLocalStorage', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        realLocalStorageMock.clear();
    });

    // ── 1. Returns initial value when localStorage is empty ──
    it('should return initialValue when key is not in localStorage', () => {
        const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
        const [value] = result.current;
        expect(value).toBe('default');
    });

    // ── 2. Reads existing value from localStorage ──
    it('should read existing value from localStorage', () => {
        localStorage.setItem('test-key', JSON.stringify('stored-value'));
        const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
        const [value] = result.current;
        expect(value).toBe('stored-value');
    });

    // ── 3. setValue updates state and localStorage ──
    it('should update state and localStorage when setValue is called', () => {
        const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

        act(() => {
            const [, setValue] = result.current;
            setValue('new-value');
        });

        const [value] = result.current;
        expect(value).toBe('new-value');
        expect(JSON.parse(localStorage.getItem('test-key'))).toBe('new-value');
    });

    // ── 4. setValue with function updater ──
    it('should support function updater for setValue', () => {
        const { result } = renderHook(() => useLocalStorage('counter', 0));

        act(() => {
            const [, setValue] = result.current;
            setValue((prev) => prev + 1);
        });

        const [value] = result.current;
        expect(value).toBe(1);
        expect(JSON.parse(localStorage.getItem('counter'))).toBe(1);
    });

    // ── 5. removeValue clears key and resets to initial ──
    it('should remove key from localStorage and reset to initialValue', () => {
        localStorage.setItem('test-key', JSON.stringify('existing'));
        const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

        act(() => {
            const [, , removeValue] = result.current;
            removeValue();
        });

        const [value] = result.current;
        expect(value).toBe('default');
        expect(localStorage.getItem('test-key')).toBeNull();
    });

    // ── 6. Works with object values ──
    it('should handle object values correctly', () => {
        const initial = { name: 'test', count: 0 };
        const { result } = renderHook(() => useLocalStorage('obj-key', initial));

        act(() => {
            const [, setValue] = result.current;
            setValue({ name: 'updated', count: 5 });
        });

        const [value] = result.current;
        expect(value).toEqual({ name: 'updated', count: 5 });
        expect(JSON.parse(localStorage.getItem('obj-key'))).toEqual({ name: 'updated', count: 5 });
    });

    // ── 7. Works with array values ──
    it('should handle array values correctly', () => {
        const { result } = renderHook(() => useLocalStorage('arr-key', []));

        act(() => {
            const [, setValue] = result.current;
            setValue(['a', 'b', 'c']);
        });

        const [value] = result.current;
        expect(value).toEqual(['a', 'b', 'c']);
    });

    // ── 8. Handles corrupt localStorage data gracefully ──
    it('should return initialValue when localStorage has invalid JSON', () => {
        localStorage.setItem('corrupt-key', 'not-valid-json{{{');
        // Suppress console.error from the hook
        vi.spyOn(console, 'error').mockImplementation(() => { });

        const { result } = renderHook(() => useLocalStorage('corrupt-key', 'fallback'));
        const [value] = result.current;
        expect(value).toBe('fallback');
    });

    // ── 9. Works with boolean values ──
    it('should handle boolean values', () => {
        const { result } = renderHook(() => useLocalStorage('bool-key', false));

        act(() => {
            const [, setValue] = result.current;
            setValue(true);
        });

        const [value] = result.current;
        expect(value).toBe(true);
    });

    // ── 10. Works with null value ──
    it('should handle null as a stored value', () => {
        const { result } = renderHook(() => useLocalStorage('null-key', 'default'));

        act(() => {
            const [, setValue] = result.current;
            setValue(null);
        });

        const [value] = result.current;
        expect(value).toBeNull();
    });
});
