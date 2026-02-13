// VoiceContext useRecording Hook Tests
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRecording } from '../../VoiceContext/useRecording';

// Mock MediaRecorder
class MockMediaRecorder {
    constructor(stream, options) {
        this.stream = stream;
        this.state = 'inactive';
        this.ondataavailable = null;
        this.onstop = null;
    }
    start(timeslice) { this.state = 'recording'; }
    stop() {
        this.state = 'inactive';
        if (this.onstop) this.onstop();
    }
}
window.MediaRecorder = MockMediaRecorder;

describe('useRecording', () => {
    const defaultProps = {
        isInVoice: true,
        localAudioStream: null,
        remoteStreams: {},
        currentRoom: 'test-room'
    };

    beforeEach(() => {
        vi.useFakeTimers();
    });

    it('should start with recording off', () => {
        const { result } = renderHook(() => useRecording(defaultProps));
        expect(result.current.isRecording).toBe(false);
        expect(result.current.recordingDuration).toBe(0);
    });

    it('should not start recording when not in voice', () => {
        const { result } = renderHook(() => useRecording({ ...defaultProps, isInVoice: false }));
        act(() => result.current.startRecording());
        expect(result.current.isRecording).toBe(false);
    });

    it('should stop recording and reset state', () => {
        const { result } = renderHook(() => useRecording(defaultProps));

        // Start recording first
        act(() => result.current.startRecording());

        // Stop
        act(() => result.current.stopRecording());
        expect(result.current.isRecording).toBe(false);
        expect(result.current.recordingDuration).toBe(0);
    });

    it('should not crash when stopping without recording', () => {
        const { result } = renderHook(() => useRecording(defaultProps));
        expect(() => {
            act(() => result.current.stopRecording());
        }).not.toThrow();
    });

    it('should export downloadRecording function', () => {
        const { result } = renderHook(() => useRecording(defaultProps));
        expect(typeof result.current.downloadRecording).toBe('function');
    });
});
