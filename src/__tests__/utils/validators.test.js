// frontend/src/__tests__/utils/validators.test.js
// Tests for validation utilities from utils/security.js and utils/formValidator.js

import { describe, it, expect, vi, beforeEach } from 'vitest';

// ── Import real validators from security.js ──
import {
    isValidEmail,
    isValidUsername,
    isValidURL,
    checkPasswordStrength,
    isValidFileType,
    isValidFileSize,
    sanitizeInput,
} from '../../utils/security';

// ══════════════════════════════════════════════════════
// EMAIL VALIDATION
// ══════════════════════════════════════════════════════
describe('isValidEmail', () => {
    it('accepts standard email', () => {
        expect(isValidEmail('user@example.com')).toBe(true);
    });

    it('accepts email with subdomain', () => {
        expect(isValidEmail('user@mail.example.com')).toBe(true);
    });

    it('accepts email with plus tag', () => {
        expect(isValidEmail('user+tag@example.com')).toBe(true);
    });

    it('rejects email without @', () => {
        expect(isValidEmail('userexample.com')).toBe(false);
    });

    it('rejects email without domain', () => {
        expect(isValidEmail('user@')).toBe(false);
    });

    it('rejects email with spaces', () => {
        expect(isValidEmail('user @example.com')).toBe(false);
    });

    it('rejects empty string', () => {
        expect(isValidEmail('')).toBe(false);
    });
});

// ══════════════════════════════════════════════════════
// USERNAME VALIDATION
// ══════════════════════════════════════════════════════
describe('isValidUsername', () => {
    it('accepts alphanumeric usernames', () => {
        expect(isValidUsername('CoolUser123')).toBe(true);
    });

    it('accepts underscores', () => {
        expect(isValidUsername('cool_user')).toBe(true);
    });

    it('accepts exactly 3 chars', () => {
        expect(isValidUsername('abc')).toBe(true);
    });

    it('accepts exactly 20 chars', () => {
        expect(isValidUsername('a'.repeat(20))).toBe(true);
    });

    it('rejects 2-char username (too short)', () => {
        expect(isValidUsername('ab')).toBe(false);
    });

    it('rejects 21-char username (too long)', () => {
        expect(isValidUsername('a'.repeat(21))).toBe(false);
    });

    it('rejects spaces', () => {
        expect(isValidUsername('cool user')).toBe(false);
    });

    it('rejects special characters', () => {
        expect(isValidUsername('user!@#')).toBe(false);
    });

    it('rejects empty string', () => {
        expect(isValidUsername('')).toBe(false);
    });
});

// ══════════════════════════════════════════════════════
// URL VALIDATION
// ══════════════════════════════════════════════════════
describe('isValidURL', () => {
    it('accepts https URL', () => {
        expect(isValidURL('https://example.com')).toBe(true);
    });

    it('accepts http URL', () => {
        expect(isValidURL('http://example.com')).toBe(true);
    });

    it('rejects ftp URL', () => {
        expect(isValidURL('ftp://files.example.com')).toBe(false);
    });

    it('rejects javascript: URL', () => {
        expect(isValidURL('javascript:alert(1)')).toBe(false);
    });

    it('rejects plain text', () => {
        expect(isValidURL('not a url')).toBe(false);
    });

    it('rejects empty string', () => {
        expect(isValidURL('')).toBe(false);
    });
});

// ══════════════════════════════════════════════════════
// PASSWORD STRENGTH
// ══════════════════════════════════════════════════════
describe('checkPasswordStrength', () => {
    it('returns weak for empty password', () => {
        const result = checkPasswordStrength('');
        expect(result.strength).toBe('weak');
        expect(result.score).toBe(0);
    });

    it('returns weak for null', () => {
        const result = checkPasswordStrength(null);
        expect(result.strength).toBe('weak');
    });

    it('returns weak for short simple password', () => {
        const result = checkPasswordStrength('abc');
        expect(result.strength).toBe('weak');
    });

    it('returns medium for decent password', () => {
        const result = checkPasswordStrength('MyPass123');
        expect(result.strength).toBe('medium');
    });

    it('returns strong for complex password', () => {
        const result = checkPasswordStrength('MyStr0ng!P@ssw0rd');
        expect(result.strength).toBe('strong');
    });

    it('score increases with length', () => {
        const short = checkPasswordStrength('abcd1234');
        const long = checkPasswordStrength('abcd12345678');
        expect(long.score).toBeGreaterThan(short.score);
    });

    it('score increases with character variety', () => {
        const simple = checkPasswordStrength('aaaaaaaa');
        const varied = checkPasswordStrength('aA1!aaaa');
        expect(varied.score).toBeGreaterThan(simple.score);
    });
});

// ══════════════════════════════════════════════════════
// FILE VALIDATION
// ══════════════════════════════════════════════════════
describe('isValidFileType', () => {
    it('accepts jpeg by default', () => {
        expect(isValidFileType({ type: 'image/jpeg' })).toBe(true);
    });

    it('accepts png by default', () => {
        expect(isValidFileType({ type: 'image/png' })).toBe(true);
    });

    it('rejects exe files', () => {
        expect(isValidFileType({ type: 'application/x-msdownload' })).toBe(false);
    });

    it('accepts custom types', () => {
        expect(isValidFileType({ type: 'video/mp4' }, ['video/mp4'])).toBe(true);
    });
});

describe('isValidFileSize', () => {
    it('accepts file under limit', () => {
        expect(isValidFileSize({ size: 5 * 1024 * 1024 })).toBe(true); // 5MB < 10MB default
    });

    it('rejects file over limit', () => {
        expect(isValidFileSize({ size: 15 * 1024 * 1024 })).toBe(false); // 15MB > 10MB
    });

    it('accepts custom max size', () => {
        expect(isValidFileSize({ size: 500 }, 0.001)).toBe(true);
    });
});

// ══════════════════════════════════════════════════════
// MESSAGE / INPUT VALIDATION
// ══════════════════════════════════════════════════════
describe('sanitizeInput', () => {
    it('trims whitespace', () => {
        expect(sanitizeInput('  hello  ')).toBe('hello');
    });

    it('removes < and > characters', () => {
        expect(sanitizeInput('<script>alert(1)</script>')).not.toContain('<');
        expect(sanitizeInput('<script>alert(1)</script>')).not.toContain('>');
    });

    it('truncates to 1000 characters', () => {
        const long = 'a'.repeat(2000);
        expect(sanitizeInput(long).length).toBe(1000);
    });

    it('returns empty string for null', () => {
        expect(sanitizeInput(null)).toBe('');
    });

    it('returns empty string for undefined', () => {
        expect(sanitizeInput(undefined)).toBe('');
    });

    it('returns empty string for empty input', () => {
        expect(sanitizeInput('')).toBe('');
    });
});
