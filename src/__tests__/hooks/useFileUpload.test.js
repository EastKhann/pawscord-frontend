// frontend/src/__tests__/hooks/useFileUpload.test.js
// 🧪 File Upload Hook Tests
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

// Mock dependencies
vi.mock('../../utils/toast', () => ({
    default: {
        error: vi.fn(),
        warning: vi.fn(),
        success: vi.fn(),
    },
}));

vi.mock('../../config/api', () => ({
    getTemporaryId: vi.fn(() => 'temp-123'),
    calculateFileHash: vi.fn(() => Promise.resolve('hash-abc')),
}));

import useFileUpload from '../../App/useFileUpload';
import toast from '../../utils/toast';
import { calculateFileHash } from '../../config/api';

describe('useFileUpload', () => {
    const mockFetchWithAuth = vi.fn();
    const mockScrollToBottom = vi.fn();
    const mockSetMessages = vi.fn();

    const defaultProps = {
        activeChat: { type: 'room', id: 'general', targetUser: null },
        username: 'testuser',
        fetchWithAuth: mockFetchWithAuth,
        scrollToBottom: mockScrollToBottom,
        setMessages: mockSetMessages,
        API_BASE_URL: 'http://localhost:8888/api',
        handleDMClick: vi.fn(),
        conversations: [],
        categories: [],
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockFetchWithAuth.mockReset();
    });

    // ─── INITIAL STATE ───
    describe('Initial state', () => {
        it('should start with isDragging false', () => {
            const { result } = renderHook(() => useFileUpload(defaultProps));
            expect(result.current.isDragging).toBe(false);
        });

        it('should start with isUploading false', () => {
            const { result } = renderHook(() => useFileUpload(defaultProps));
            expect(result.current.isUploading).toBe(false);
        });

        it('should start with uploadProgress 0', () => {
            const { result } = renderHook(() => useFileUpload(defaultProps));
            expect(result.current.uploadProgress).toBe(0);
        });

        it('should start with empty pendingFilesFromDrop', () => {
            const { result } = renderHook(() => useFileUpload(defaultProps));
            expect(result.current.pendingFilesFromDrop).toEqual([]);
        });

        it('should start with isRecordingVoice false', () => {
            const { result } = renderHook(() => useFileUpload(defaultProps));
            expect(result.current.isRecordingVoice).toBe(false);
        });
    });

    // ─── UPLOAD FILE ───
    describe('uploadFile', () => {
        it('should handle file_exists (dedup) response', async () => {
            mockFetchWithAuth.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({ file_exists: true, id: 99, content: 'deduped' }),
            });

            const { result } = renderHook(() => useFileUpload(defaultProps));
            const file = new File(['data'], 'test.txt', { type: 'text/plain' });

            await act(async () => {
                await result.current.uploadFile(file);
            });

            expect(calculateFileHash).toHaveBeenCalledWith(file);
            expect(mockFetchWithAuth).toHaveBeenCalledTimes(1);
            // Should call init endpoint only (dedup shortcut)
            expect(mockFetchWithAuth.mock.calls[0][0]).toContain('/upload/multipart/init/');
        });

        it('should process full multipart upload cycle', async () => {
            // Init response - no dedup
            mockFetchWithAuth
                .mockResolvedValueOnce({
                    ok: true,
                    json: () => Promise.resolve({ upload_id: 'up-1', key: 'key-1' }),
                })
                // Part upload
                .mockResolvedValueOnce({
                    ok: true,
                    json: () => Promise.resolve({ etag: 'etag-1', part_number: 1 }),
                })
                // Complete
                .mockResolvedValueOnce({
                    ok: true,
                    json: () => Promise.resolve({ id: 50, content: 'uploaded', temp_id: 'temp-123' }),
                    text: () => Promise.resolve('ok'),
                });

            const { result } = renderHook(() => useFileUpload(defaultProps));
            const file = new File(['small content'], 'small.txt', { type: 'text/plain' });

            await act(async () => {
                await result.current.uploadFile(file);
            });

            // Should call: init → upload-part → complete
            expect(mockFetchWithAuth).toHaveBeenCalledTimes(3);
            expect(mockFetchWithAuth.mock.calls[0][0]).toContain('/upload/multipart/init/');
            expect(mockFetchWithAuth.mock.calls[1][0]).toContain('/upload/multipart/upload-part/');
            expect(mockFetchWithAuth.mock.calls[2][0]).toContain('/upload/multipart/complete/');
        });

        it('should show toast error on upload failure', async () => {
            mockFetchWithAuth.mockRejectedValueOnce(new Error('Network fail'));

            const { result } = renderHook(() => useFileUpload(defaultProps));
            const file = new File(['data'], 'fail.txt', { type: 'text/plain' });

            await act(async () => {
                await result.current.uploadFile(file);
            });

            expect(toast.error).toHaveBeenCalled();
        });

        it('should include room_slug for room type chat', async () => {
            mockFetchWithAuth.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({ file_exists: true, id: 1 }),
            });

            const { result } = renderHook(() => useFileUpload(defaultProps));
            const file = new File(['data'], 'test.txt', { type: 'text/plain' });

            await act(async () => {
                await result.current.uploadFile(file);
            });

            const bodyStr = mockFetchWithAuth.mock.calls[0][1].body;
            const body = JSON.parse(bodyStr);
            expect(body.room_slug).toBe('general');
            expect(body.conversation_id).toBeNull();
        });
    });

    // ─── DRAG & DROP ───
    describe('Drag & Drop', () => {
        it('handleChatDragEnter sets isDragging to true', () => {
            const { result } = renderHook(() => useFileUpload(defaultProps));
            act(() => {
                result.current.handleChatDragEnter({ preventDefault: vi.fn() });
            });
            expect(result.current.isDragging).toBe(true);
        });

        it('handleChatDragLeave decrements counter and clears isDragging when zero', () => {
            const { result } = renderHook(() => useFileUpload(defaultProps));
            // Enter once, leave once
            act(() => { result.current.handleChatDragEnter({ preventDefault: vi.fn() }); });
            act(() => { result.current.handleChatDragLeave({ preventDefault: vi.fn() }); });
            expect(result.current.isDragging).toBe(false);
        });

        it('handleChatDragLeave still dragging with nested elements', () => {
            const { result } = renderHook(() => useFileUpload(defaultProps));
            // Enter twice (parent + child), leave once (child)
            act(() => { result.current.handleChatDragEnter({ preventDefault: vi.fn() }); });
            act(() => { result.current.handleChatDragEnter({ preventDefault: vi.fn() }); });
            act(() => { result.current.handleChatDragLeave({ preventDefault: vi.fn() }); });
            expect(result.current.isDragging).toBe(true);
        });

        it('handleChatDrop sets pending files and resets drag', () => {
            const { result } = renderHook(() => useFileUpload(defaultProps));
            const mockFile = new File(['test'], 'photo.png', { type: 'image/png' });
            const mockEvent = {
                preventDefault: vi.fn(),
                stopPropagation: vi.fn(),
                dataTransfer: { files: [mockFile] },
            };

            act(() => { result.current.handleChatDragEnter({ preventDefault: vi.fn() }); });
            act(() => { result.current.handleChatDrop(mockEvent); });

            expect(result.current.isDragging).toBe(false);
            expect(result.current.pendingFilesFromDrop).toHaveLength(1);
            expect(result.current.pendingFilesFromDrop[0].name).toBe('photo.png');
        });
    });

    // ─── VOICE RECORDING ───
    describe('Voice recording', () => {
        let mockMediaRecorder;

        beforeEach(() => {
            // Set up MediaRecorder global BEFORE any hook renders
            mockMediaRecorder = {
                start: vi.fn(),
                stop: vi.fn(),
                ondataavailable: null,
                onstop: null,
            };
            globalThis.MediaRecorder = vi.fn().mockImplementation(function () {
                return mockMediaRecorder;
            });
            globalThis.MediaRecorder.isTypeSupported = vi.fn().mockReturnValue(true);
        });

        it('startVoiceRecording should set isRecordingVoice to true', async () => {
            navigator.mediaDevices.getUserMedia.mockResolvedValueOnce({
                getTracks: () => [{ stop: vi.fn() }],
                getAudioTracks: () => [],
                getVideoTracks: () => [],
            });

            const { result } = renderHook(() => useFileUpload(defaultProps));
            await act(async () => {
                await result.current.startVoiceRecording();
            });

            expect(result.current.isRecordingVoice).toBe(true);
            expect(mockMediaRecorder.start).toHaveBeenCalled();
        });

        it('stopVoiceRecording should set isRecordingVoice to false', async () => {
            navigator.mediaDevices.getUserMedia.mockResolvedValueOnce({
                getTracks: () => [{ stop: vi.fn() }],
                getAudioTracks: () => [],
                getVideoTracks: () => [],
            });

            const { result } = renderHook(() => useFileUpload(defaultProps));
            await act(async () => {
                await result.current.startVoiceRecording();
            });
            expect(result.current.isRecordingVoice).toBe(true);

            act(() => {
                result.current.stopVoiceRecording();
            });
            expect(result.current.isRecordingVoice).toBe(false);
        });

        it('should show warning toast on mic permission denied', async () => {
            const notAllowedError = new DOMException('Permission denied', 'NotAllowedError');
            navigator.mediaDevices.getUserMedia.mockRejectedValueOnce(notAllowedError);

            const { result } = renderHook(() => useFileUpload(defaultProps));
            await act(async () => {
                await result.current.startVoiceRecording();
            });

            expect(toast.warning).toHaveBeenCalledWith('Mikrofon erişimi reddedildi!');
        });

        it('should show warning toast when mic not found', async () => {
            const notFoundError = new DOMException('Not found', 'NotFoundError');
            navigator.mediaDevices.getUserMedia.mockRejectedValueOnce(notFoundError);

            const { result } = renderHook(() => useFileUpload(defaultProps));
            await act(async () => {
                await result.current.startVoiceRecording();
            });

            expect(toast.warning).toHaveBeenCalledWith('Mikrofon bulunamadı!');
        });
    });

    // ─── RETURN VALUES ───
    describe('Return values', () => {
        it('should expose all expected methods and state', () => {
            const { result } = renderHook(() => useFileUpload(defaultProps));
            const exposed = result.current;

            expect(exposed).toHaveProperty('isDragging');
            expect(exposed).toHaveProperty('isUploading');
            expect(exposed).toHaveProperty('uploadProgress');
            expect(exposed).toHaveProperty('pendingFilesFromDrop');
            expect(exposed).toHaveProperty('isRecordingVoice');
            expect(exposed).toHaveProperty('uploadFile');
            expect(exposed).toHaveProperty('startVoiceRecording');
            expect(exposed).toHaveProperty('stopVoiceRecording');
            expect(exposed).toHaveProperty('handleChatDrop');
            expect(exposed).toHaveProperty('handleChatDragEnter');
            expect(exposed).toHaveProperty('handleChatDragLeave');
        });
    });
});
