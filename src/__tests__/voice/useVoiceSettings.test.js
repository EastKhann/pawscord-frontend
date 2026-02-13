// VoiceContext useVoiceSettings Hook Tests
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useVoiceSettings } from '../../VoiceContext/useVoiceSettings';

describe('useVoiceSettings', () => {
    beforeEach(() => {
        localStorage.getItem.mockReturnValue(null);
        localStorage.setItem.mockClear();
    });

    it('should return default noise gate threshold of -50', () => {
        const { result } = renderHook(() => useVoiceSettings());
        expect(result.current.noiseGateThreshold).toBe(-50);
    });

    it('should return default VAD sensitivity of 45', () => {
        const { result } = renderHook(() => useVoiceSettings());
        expect(result.current.vadSensitivity).toBe(45);
    });

    it('should return default noise suppression enabled', () => {
        const { result } = renderHook(() => useVoiceSettings());
        expect(result.current.isNoiseSuppressionEnabled).toBe(true);
    });

    it('should return default screen share quality 1080p', () => {
        const { result } = renderHook(() => useVoiceSettings());
        expect(result.current.screenShareQuality).toBe('1080p');
    });

    it('should return default screen FPS of 30', () => {
        const { result } = renderHook(() => useVoiceSettings());
        expect(result.current.screenShareFPS).toBe(30);
    });

    it('should return default PTT mode off', () => {
        const { result } = renderHook(() => useVoiceSettings());
        expect(result.current.isPTTMode).toBe(false);
    });

    it('should return default PTT key as Space', () => {
        const { result } = renderHook(() => useVoiceSettings());
        expect(result.current.pttKey).toBe('Space');
    });

    it('should return default noise suppression level as medium', () => {
        const { result } = renderHook(() => useVoiceSettings());
        expect(result.current.noiseSuppressionLevel).toBe('medium');
    });

    describe('updateVadSensitivity', () => {
        it('should clamp to minimum 20', () => {
            const { result } = renderHook(() => useVoiceSettings());
            act(() => result.current.updateVadSensitivity(5));
            expect(result.current.vadSensitivity).toBe(20);
        });

        it('should clamp to maximum 80', () => {
            const { result } = renderHook(() => useVoiceSettings());
            act(() => result.current.updateVadSensitivity(100));
            expect(result.current.vadSensitivity).toBe(80);
        });

        it('should save to localStorage', () => {
            const { result } = renderHook(() => useVoiceSettings());
            act(() => result.current.updateVadSensitivity(60));
            expect(localStorage.setItem).toHaveBeenCalledWith('pawscord_vad_sensitivity', '60');
        });
    });

    describe('updateNoiseGateThreshold', () => {
        it('should clamp to minimum -80', () => {
            const { result } = renderHook(() => useVoiceSettings());
            act(() => result.current.updateNoiseGateThreshold(-100));
            expect(result.current.noiseGateThreshold).toBe(-80);
        });

        it('should clamp to maximum -20', () => {
            const { result } = renderHook(() => useVoiceSettings());
            act(() => result.current.updateNoiseGateThreshold(0));
            expect(result.current.noiseGateThreshold).toBe(-20);
        });
    });

    describe('updateScreenQuality', () => {
        it('should update screen quality', () => {
            const { result } = renderHook(() => useVoiceSettings());
            act(() => result.current.updateScreenQuality('4K'));
            expect(result.current.screenShareQuality).toBe('4K');
            expect(localStorage.setItem).toHaveBeenCalledWith('pawscord_screen_quality', '4K');
        });
    });

    describe('updateScreenFPS', () => {
        it('should update screen FPS', () => {
            const { result } = renderHook(() => useVoiceSettings());
            act(() => result.current.updateScreenFPS(60));
            expect(result.current.screenShareFPS).toBe(60);
            expect(localStorage.setItem).toHaveBeenCalledWith('pawscord_screen_fps', '60');
        });
    });

    describe('toggleNoiseGate', () => {
        it('should toggle noise gate on/off', () => {
            const { result } = renderHook(() => useVoiceSettings());
            const initial = result.current.isNoiseGateEnabled;
            act(() => result.current.toggleNoiseGate(!initial));
            expect(result.current.isNoiseGateEnabled).toBe(!initial);
        });
    });

    describe('toggleVisualizer', () => {
        it('should toggle visualizer', () => {
            const { result } = renderHook(() => useVoiceSettings());
            expect(result.current.isVisualizerEnabled).toBe(false);
            act(() => result.current.toggleVisualizer(true));
            expect(result.current.isVisualizerEnabled).toBe(true);
            expect(localStorage.setItem).toHaveBeenCalledWith('pawscord_visualizer', 'true');
        });
    });

    describe('setRemoteVolume', () => {
        it('should set volume for a user', () => {
            const { result } = renderHook(() => useVoiceSettings());
            act(() => result.current.setRemoteVolume('testuser', 150));
            expect(result.current.remoteVolumes).toEqual({ testuser: 150 });
        });

        it('should clamp volume to 0-200 range', () => {
            const { result } = renderHook(() => useVoiceSettings());
            act(() => result.current.setRemoteVolume('testuser', 300));
            expect(result.current.remoteVolumes.testuser).toBe(200);

            act(() => result.current.setRemoteVolume('testuser', -50));
            expect(result.current.remoteVolumes.testuser).toBe(0);
        });
    });

    describe('updateNoiseSuppressionLevel', () => {
        it('should accept valid levels', () => {
            const { result } = renderHook(() => useVoiceSettings());

            ['low', 'medium', 'high', 'aggressive'].forEach(level => {
                act(() => result.current.updateNoiseSuppressionLevel(level));
                expect(result.current.noiseSuppressionLevel).toBe(level);
            });
        });

        it('should default to high for invalid levels', () => {
            const { result } = renderHook(() => useVoiceSettings());
            act(() => result.current.updateNoiseSuppressionLevel('invalid'));
            expect(result.current.noiseSuppressionLevel).toBe('high');
        });
    });

    describe('updatePTTKey', () => {
        it('should update PTT key', () => {
            const { result } = renderHook(() => useVoiceSettings());
            act(() => result.current.updatePTTKey('KeyV'));
            expect(result.current.pttKey).toBe('KeyV');
            expect(localStorage.setItem).toHaveBeenCalledWith('pawscord_ptt_key', 'KeyV');
        });
    });

    describe('toggleSystemAudio', () => {
        it('should toggle system audio', () => {
            const { result } = renderHook(() => useVoiceSettings());
            act(() => result.current.toggleSystemAudio(true));
            expect(result.current.includeSystemAudio).toBe(true);
            expect(localStorage.setItem).toHaveBeenCalledWith('pawscord_system_audio', 'true');
        });
    });
});
