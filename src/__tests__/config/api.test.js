// frontend/src/__tests__/config/api.test.js
// 🧪 API Configuration & Utility Tests
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock apiEndpoints before api.js imports it
vi.mock('../../utils/apiEndpoints', () => ({
    getApiBase: () => 'http://localhost:8888',
    getMediaBase: () => 'http://localhost:8888/media',
    API_BASE_URL: 'http://localhost:8888/api',
}));

// Mock spark-md5 for calculateFileHash tests
const mockSparkAppend = vi.fn();
const mockSparkEnd = vi.fn().mockReturnValue('abc123hash');
vi.mock('spark-md5', () => ({
    default: {
        ArrayBuffer: class MockSparkArrayBuffer {
            constructor() {
                this.append = mockSparkAppend;
                this.end = mockSparkEnd;
            }
        },
    },
}));

// After mock, import the module under test
import {
    API_BASE_URL, API_URL_BASE_STRING, MEDIA_BASE_URL,
    WS_PROTOCOL, API_HOST, ABSOLUTE_HOST_URL,
    LOGIN_URL, REGISTER_URL, UPLOAD_FILE_URL,
    MESSAGE_HISTORY_ROOM_URL, MESSAGE_HISTORY_DM_URL,
    ROOM_LIST_URL, CONVERSATION_LIST_URL,
    DRAFT_STORAGE_KEY,
    getTemporaryId, calculateFileHash,
} from '../../config/api';

describe('API Configuration', () => {
    // ─── URL CONSTANTS ───
    describe('URL Constants', () => {
        it('API_URL_BASE_STRING should be base URL from apiEndpoints', () => {
            expect(API_URL_BASE_STRING).toBe('http://localhost:8888');
        });

        it('API_BASE_URL should append /api to base', () => {
            expect(API_BASE_URL).toBe('http://localhost:8888/api');
        });

        it('ABSOLUTE_HOST_URL should equal base string', () => {
            expect(ABSOLUTE_HOST_URL).toBe('http://localhost:8888');
        });

        it('LOGIN_URL ends with /auth/login/', () => {
            expect(LOGIN_URL).toContain('/api/auth/login/');
        });

        it('REGISTER_URL ends with /auth/register/', () => {
            expect(REGISTER_URL).toContain('/api/auth/register/');
        });

        it('UPLOAD_FILE_URL ends with /messages/upload_file/', () => {
            expect(UPLOAD_FILE_URL).toContain('/api/messages/upload_file/');
        });

        it('MESSAGE_HISTORY_ROOM_URL ends with /messages/history/room/', () => {
            expect(MESSAGE_HISTORY_ROOM_URL).toContain('/api/messages/history/room/');
        });

        it('MESSAGE_HISTORY_DM_URL ends with /messages/history/dm/', () => {
            expect(MESSAGE_HISTORY_DM_URL).toContain('/api/messages/history/dm/');
        });

        it('ROOM_LIST_URL ends with /rooms/list_with_categories/', () => {
            expect(ROOM_LIST_URL).toContain('/api/rooms/list_with_categories/');
        });

        it('CONVERSATION_LIST_URL ends with /conversations/', () => {
            expect(CONVERSATION_LIST_URL).toContain('/api/conversations/');
        });
    });

    // ─── PROTOCOL DETECTION ───
    describe('Protocol Detection', () => {
        it('WS_PROTOCOL should be ws for http base URL', () => {
            expect(WS_PROTOCOL).toBe('ws');
        });

        it('API_HOST should strip protocol from base URL', () => {
            expect(API_HOST).toBe('localhost:8888');
            expect(API_HOST).not.toContain('http');
        });
    });

    // ─── CONSTANTS ───
    describe('Constants', () => {
        it('DRAFT_STORAGE_KEY should be a non-empty string', () => {
            expect(DRAFT_STORAGE_KEY).toBe('chat_drafts_v1');
        });
    });

    // ─── getTemporaryId ───
    describe('getTemporaryId', () => {
        it('should return a string', () => {
            expect(typeof getTemporaryId()).toBe('string');
        });

        it('should return unique values on successive calls', () => {
            const ids = new Set();
            for (let i = 0; i < 100; i++) ids.add(getTemporaryId());
            // With random component, collisions should be extremely rare
            expect(ids.size).toBeGreaterThanOrEqual(95);
        });

        it('should be based on Date.now (starts with timestamp prefix)', () => {
            const before = Date.now();
            const id = getTemporaryId();
            const after = Date.now();
            const numId = parseInt(id, 10);
            // The id is Date.now() + random(0-999), so numId should be in range
            expect(numId).toBeGreaterThanOrEqual(before);
            expect(numId).toBeLessThanOrEqual(after + 1000);
        });
    });

    // ─── calculateFileHash ───
    describe('calculateFileHash', () => {
        beforeEach(() => {
            mockSparkAppend.mockClear();
            mockSparkEnd.mockClear();
            mockSparkEnd.mockReturnValue('abc123hash');
        });

        it('should return a hash string for a file', async () => {
            const testContent = 'Hello, this is test content for hashing';
            const file = new File([testContent], 'test.txt', { type: 'text/plain' });

            const hash = await calculateFileHash(file);
            expect(typeof hash).toBe('string');
            expect(hash).toBe('abc123hash');
            expect(mockSparkAppend).toHaveBeenCalled();
            expect(mockSparkEnd).toHaveBeenCalled();
        });

        it('should handle large files in chunks', async () => {
            // Create a file > 2MB (chunk size)
            const size = 5 * 1024 * 1024; // 5MB
            const buffer = new ArrayBuffer(size);
            const file = new File([buffer], 'large.bin', { type: 'application/octet-stream' });

            mockSparkEnd.mockReturnValue('largefilehash');

            const hash = await calculateFileHash(file);
            expect(hash).toBe('largefilehash');
            // 5MB file / 2MB chunk = 3 chunks
            expect(mockSparkAppend).toHaveBeenCalledTimes(3);
        });
    });
});
