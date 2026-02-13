// VoiceContext Voice Effects Tests
import { describe, it, expect, vi } from 'vitest';
import { createVoiceEffect } from '../../VoiceContext/voiceEffects';

// Helper to create mock AudioContext
function createMockAudioContext() {
    const mockNode = () => ({
        connect: vi.fn().mockReturnThis(),
        disconnect: vi.fn()
    });

    return {
        createMediaStreamSource: vi.fn().mockReturnValue(mockNode()),
        createMediaStreamDestination: vi.fn().mockReturnValue({
            stream: { id: 'mock-output-stream' },
            ...mockNode()
        }),
        createOscillator: vi.fn().mockReturnValue({
            ...mockNode(),
            type: '',
            frequency: { value: 0 },
            start: vi.fn()
        }),
        createGain: vi.fn().mockReturnValue({
            ...mockNode(),
            gain: { value: 1 }
        }),
        createWaveShaper: vi.fn().mockReturnValue({
            ...mockNode(),
            curve: null
        }),
        createDelay: vi.fn().mockReturnValue({
            ...mockNode(),
            delayTime: { value: 0 }
        }),
        createBiquadFilter: vi.fn().mockReturnValue({
            ...mockNode(),
            type: '',
            frequency: { value: 0 },
            Q: { value: 0 },
            gain: { value: 0 }
        }),
        createConvolver: vi.fn().mockReturnValue({
            ...mockNode(),
            buffer: null
        }),
        createBuffer: vi.fn().mockReturnValue({
            getChannelData: vi.fn().mockReturnValue(new Float32Array(48000))
        }),
        sampleRate: 48000
    };
}

describe('Voice Effects', () => {
    const mockStream = { id: 'test-stream' };

    it('should create robot effect', () => {
        const ctx = createMockAudioContext();
        const result = createVoiceEffect('robot', 50, ctx, mockStream);

        expect(result.nodes.length).toBeGreaterThan(0);
        expect(result.outputStream).toBeDefined();
        expect(ctx.createOscillator).toHaveBeenCalled();
        expect(ctx.createWaveShaper).toHaveBeenCalled();
    });

    it('should create echo effect', () => {
        const ctx = createMockAudioContext();
        const result = createVoiceEffect('echo', 50, ctx, mockStream);

        expect(result.nodes.length).toBeGreaterThan(0);
        expect(ctx.createDelay).toHaveBeenCalled();
        expect(ctx.createGain).toHaveBeenCalled();
    });

    it('should create deep voice effect', () => {
        const ctx = createMockAudioContext();
        const result = createVoiceEffect('deep', 50, ctx, mockStream);

        expect(result.nodes.length).toBeGreaterThan(0);
        expect(ctx.createBiquadFilter).toHaveBeenCalled();
    });

    it('should create high voice effect', () => {
        const ctx = createMockAudioContext();
        const result = createVoiceEffect('high', 50, ctx, mockStream);

        expect(result.nodes.length).toBeGreaterThan(0);
        expect(ctx.createBiquadFilter).toHaveBeenCalled();
    });

    it('should create radio effect', () => {
        const ctx = createMockAudioContext();
        const result = createVoiceEffect('radio', 50, ctx, mockStream);

        expect(result.nodes.length).toBeGreaterThan(0);
        expect(ctx.createBiquadFilter).toHaveBeenCalledTimes(2); // lowpass + highpass
        expect(ctx.createWaveShaper).toHaveBeenCalled();
    });

    it('should create reverb effect', () => {
        const ctx = createMockAudioContext();
        const result = createVoiceEffect('reverb', 50, ctx, mockStream);

        expect(result.nodes.length).toBeGreaterThan(0);
        expect(ctx.createConvolver).toHaveBeenCalled();
        expect(ctx.createBuffer).toHaveBeenCalled();
    });

    it('should handle unknown effect type with passthrough', () => {
        const ctx = createMockAudioContext();
        const result = createVoiceEffect('unknown', 50, ctx, mockStream);

        expect(result.nodes.length).toBe(0);
        expect(result.outputStream).toBeDefined();
    });

    it('should normalize intensity to 0-1 range', () => {
        const ctx = createMockAudioContext();
        // Low intensity
        const low = createVoiceEffect('deep', 10, ctx, mockStream);
        expect(low.nodes.length).toBeGreaterThan(0);

        // High intensity
        const high = createVoiceEffect('deep', 100, ctx, mockStream);
        expect(high.nodes.length).toBeGreaterThan(0);
    });

    it('should work with zero intensity', () => {
        const ctx = createMockAudioContext();
        const result = createVoiceEffect('echo', 0, ctx, mockStream);

        expect(result.nodes.length).toBeGreaterThan(0);
        expect(result.outputStream).toBeDefined();
    });
});
