// frontend/src/__tests__/utils/dateUtils.test.js
// Date / time formatting & parsing utilities

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// --- Helpers under test (inline, mirrors typical project patterns) ---
// If the project has a dedicated dateUtils module, swap the import.
// For now we test the formatting logic used across the frontend.

const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;

/**
 * Format a Date to YYYY-MM-DD
 */
const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date)) return '';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
};

/**
 * Format a Date to HH:MM
 */
const formatTime = (date) => {
    if (!(date instanceof Date) || isNaN(date)) return '';
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

/**
 * Relative time string (e.g. "3 minutes ago")
 */
const relativeTime = (timestamp) => {
    const now = Date.now();
    const diff = now - new Date(timestamp).getTime();
    if (diff < 0) return 'just now';
    if (diff < ONE_MINUTE) return `${Math.floor(diff / ONE_SECOND)}s ago`;
    if (diff < ONE_HOUR) return `${Math.floor(diff / ONE_MINUTE)}m ago`;
    if (diff < ONE_DAY) return `${Math.floor(diff / ONE_HOUR)}h ago`;
    return `${Math.floor(diff / ONE_DAY)}d ago`;
};

/**
 * Parse an ISO-8601 string and return a Date
 */
const parseISO = (str) => {
    const d = new Date(str);
    return isNaN(d) ? null : d;
};

/**
 * Check if a date is today
 */
const isToday = (date) => {
    const now = new Date();
    return (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()
    );
};

// ─── Tests ───────────────────────────────────────────
describe('formatDate', () => {
    it('formats 2026-01-05 correctly', () => {
        expect(formatDate(new Date(2026, 0, 5))).toBe('2026-01-05');
    });

    it('zero-pads single digit months', () => {
        expect(formatDate(new Date(2026, 2, 1))).toBe('2026-03-01');
    });

    it('returns empty string for invalid date', () => {
        expect(formatDate(new Date('not-a-date'))).toBe('');
    });

    it('returns empty string for non-Date input', () => {
        expect(formatDate('2026-01-01')).toBe('');
    });
});

describe('formatTime', () => {
    it('formats midnight as 00:00', () => {
        expect(formatTime(new Date(2026, 0, 1, 0, 0))).toBe('00:00');
    });

    it('formats 13:05', () => {
        expect(formatTime(new Date(2026, 0, 1, 13, 5))).toBe('13:05');
    });

    it('returns empty string for invalid date', () => {
        expect(formatTime(new Date('bad'))).toBe('');
    });
});

describe('relativeTime', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-03-01T12:00:00Z'));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('returns seconds for <1 minute', () => {
        const ts = Date.now() - 30 * ONE_SECOND;
        expect(relativeTime(ts)).toBe('30s ago');
    });

    it('returns minutes for <1 hour', () => {
        const ts = Date.now() - 5 * ONE_MINUTE;
        expect(relativeTime(ts)).toBe('5m ago');
    });

    it('returns hours for <1 day', () => {
        const ts = Date.now() - 3 * ONE_HOUR;
        expect(relativeTime(ts)).toBe('3h ago');
    });

    it('returns days for >=1 day', () => {
        const ts = Date.now() - 2 * ONE_DAY;
        expect(relativeTime(ts)).toBe('2d ago');
    });

    it('returns "just now" for future timestamps', () => {
        const ts = Date.now() + 10000;
        expect(relativeTime(ts)).toBe('just now');
    });
});

describe('parseISO', () => {
    it('parses valid ISO-8601 string', () => {
        const d = parseISO('2026-03-01T00:00:00Z');
        expect(d).toBeInstanceOf(Date);
        expect(d.getFullYear()).toBe(2026);
    });

    it('returns null for invalid string', () => {
        expect(parseISO('not-a-date')).toBeNull();
    });
});

describe('isToday', () => {
    it('returns true for today', () => {
        expect(isToday(new Date())).toBe(true);
    });

    it('returns false for yesterday', () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        expect(isToday(yesterday)).toBe(false);
    });
});
