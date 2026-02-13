// VoiceContext Audio Processing Tests
import { describe, it, expect, vi } from 'vitest';
import { applyNoiseSuppression } from '../../VoiceContext/audioProcessing';

// Mock logger
vi.mock('../../utils/logger', () => ({
    default: {
        audio: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
        signal: vi.fn(),
        webrtc: vi.fn()
    }
}));

describe('Audio Processing', () => {
    describe('applyNoiseSuppression', () => {
        it('should return original stream if no audio tracks', async () => {
            const emptyStream = {
                getAudioTracks: () => []
            };
            const result = await applyNoiseSuppression(emptyStream);
            expect(result).toBe(emptyStream);
        });

        it('should apply constraints to audio track when supported', async () => {
            const mockTrack = {
                applyConstraints: vi.fn().mockResolvedValue(undefined)
            };
            const stream = {
                getAudioTracks: () => [mockTrack]
            };

            const result = await applyNoiseSuppression(stream);
            expect(result).toBe(stream);
            expect(mockTrack.applyConstraints).toHaveBeenCalled();
        });

        it('should fallback to basic constraints on error', async () => {
            const mockTrack = {
                applyConstraints: vi.fn()
                    .mockRejectedValueOnce(new Error('Not supported'))
                    .mockResolvedValueOnce(undefined)
            };
            const stream = {
                getAudioTracks: () => [mockTrack]
            };

            const result = await applyNoiseSuppression(stream);
            expect(result).toBe(stream);
            expect(mockTrack.applyConstraints).toHaveBeenCalledTimes(2);

            // Second call should be basic constraints
            const secondCall = mockTrack.applyConstraints.mock.calls[1][0];
            expect(secondCall.echoCancellation).toBe(true);
            expect(secondCall.noiseSuppression).toBe(true);
            expect(secondCall.autoGainControl).toBe(true);
        });

        it('should return original stream if track has no applyConstraints', async () => {
            const mockTrack = {}; // No applyConstraints method
            const stream = {
                getAudioTracks: () => [mockTrack]
            };

            const result = await applyNoiseSuppression(stream);
            expect(result).toBe(stream);
        });
    });
});
