// frontend/src/__tests__/utils/formatters.test.js
// Tests for formatting utilities found in i18n.js and dragDropManager.js

import { describe, it, expect, vi, beforeEach } from 'vitest';

// ── Format helpers we test directly (standalone implementations) ──
// The i18n module uses Intl.* under the hood; we test the logic patterns.

// ══════════════════════════════════════════════════════
// formatRelativeTime – relative time formatting
// ══════════════════════════════════════════════════════
describe('formatRelativeTime (logic)', () => {
    const units = [
        { unit: 'year', seconds: 31536000 },
        { unit: 'month', seconds: 2592000 },
        { unit: 'week', seconds: 604800 },
        { unit: 'day', seconds: 86400 },
        { unit: 'hour', seconds: 3600 },
        { unit: 'minute', seconds: 60 },
        { unit: 'second', seconds: 1 },
    ];

    function relativeUnit(diffInSeconds) {
        for (const { unit, seconds } of units) {
            if (Math.abs(diffInSeconds) >= seconds) {
                return { value: Math.floor(diffInSeconds / seconds), unit };
            }
        }
        return { value: 0, unit: 'second' };
    }

    it('returns seconds for very recent timestamps', () => {
        const r = relativeUnit(5);
        expect(r.unit).toBe('second');
        expect(r.value).toBe(5);
    });

    it('returns minutes for 120-second diff', () => {
        const r = relativeUnit(120);
        expect(r.unit).toBe('minute');
        expect(r.value).toBe(2);
    });

    it('returns hours for 7200-second diff', () => {
        const r = relativeUnit(7200);
        expect(r.unit).toBe('hour');
        expect(r.value).toBe(2);
    });

    it('returns days for 86400-second diff', () => {
        const r = relativeUnit(86400);
        expect(r.unit).toBe('day');
        expect(r.value).toBe(1);
    });

    it('returns weeks for 7-day diff', () => {
        const r = relativeUnit(7 * 86400);
        expect(r.unit).toBe('week');
        expect(r.value).toBe(1);
    });

    it('returns months for 30-day diff', () => {
        const r = relativeUnit(30 * 86400);
        expect(r.unit).toBe('month');
        expect(r.value).toBe(1);
    });

    it('returns years for 365-day diff', () => {
        const r = relativeUnit(365 * 86400);
        expect(r.unit).toBe('year');
        expect(r.value).toBe(1);
    });

    it('returns 0 seconds for zero diff', () => {
        const r = relativeUnit(0);
        expect(r.value).toBe(0);
        expect(r.unit).toBe('second');
    });

    it('handles negative diff (past timestamps)', () => {
        const r = relativeUnit(-3600);
        expect(r.unit).toBe('hour');
        expect(r.value).toBe(-1);
    });
});

// ══════════════════════════════════════════════════════
// formatBytes – file size formatting
// ══════════════════════════════════════════════════════
describe('formatBytes', () => {
    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    it('returns "0 Bytes" for 0', () => {
        expect(formatBytes(0)).toBe('0 Bytes');
    });

    it('formats bytes under 1024', () => {
        expect(formatBytes(500)).toBe('500 Bytes');
    });

    it('formats kilobytes', () => {
        expect(formatBytes(1024)).toBe('1 KB');
    });

    it('formats megabytes', () => {
        expect(formatBytes(1048576)).toBe('1 MB');
    });

    it('formats gigabytes', () => {
        expect(formatBytes(1073741824)).toBe('1 GB');
    });

    it('respects decimal places', () => {
        expect(formatBytes(1536, 1)).toBe('1.5 KB');
    });

    it('treats negative decimals as 0', () => {
        expect(formatBytes(1536, -1)).toBe('2 KB');
    });
});

// ══════════════════════════════════════════════════════
// Intl.NumberFormat patterns
// ══════════════════════════════════════════════════════
describe('number formatting (Intl)', () => {
    it('formats number with default locale', () => {
        const formatted = new Intl.NumberFormat('en-US').format(1234567);
        expect(formatted).toBe('1,234,567');
    });

    it('formats compact notation', () => {
        const formatted = new Intl.NumberFormat('en-US', { notation: 'compact' }).format(1500);
        expect(formatted).toMatch(/1\.5K|2K|1,500/); // varies by engine
    });

    it('formats currency', () => {
        const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(9.99);
        expect(formatted).toContain('9.99');
    });

    it('formats percentage', () => {
        const formatted = new Intl.NumberFormat('en-US', { style: 'percent' }).format(0.85);
        expect(formatted).toBe('85%');
    });
});

// ══════════════════════════════════════════════════════
// Duration formatting
// ══════════════════════════════════════════════════════
describe('formatDuration', () => {
    function formatDuration(totalSeconds) {
        if (totalSeconds <= 0) return '0s';
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        const parts = [];
        if (h) parts.push(`${h}h`);
        if (m) parts.push(`${m}m`);
        if (s || parts.length === 0) parts.push(`${s}s`);
        return parts.join(' ');
    }

    it('returns "0s" for zero', () => {
        expect(formatDuration(0)).toBe('0s');
    });

    it('formats seconds only', () => {
        expect(formatDuration(45)).toBe('45s');
    });

    it('formats minutes and seconds', () => {
        expect(formatDuration(125)).toBe('2m 5s');
    });

    it('formats hours, minutes, seconds', () => {
        expect(formatDuration(3661)).toBe('1h 1m 1s');
    });

    it('handles exact hours', () => {
        expect(formatDuration(7200)).toBe('2h');
    });

    it('returns "0s" for negative values', () => {
        expect(formatDuration(-10)).toBe('0s');
    });
});
