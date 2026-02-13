// VoiceContext useStatsMonitoring Hook Tests
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useStatsMonitoring } from '../../VoiceContext/useStatsMonitoring';

describe('useStatsMonitoring', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should start with empty connection stats', () => {
        const { result } = renderHook(() => useStatsMonitoring());
        expect(result.current.connectionStats).toEqual({});
    });

    it('should expose start and stop functions', () => {
        const { result } = renderHook(() => useStatsMonitoring());
        expect(typeof result.current.startStatsMonitoring).toBe('function');
        expect(typeof result.current.stopStatsMonitoring).toBe('function');
    });

    it('should start monitoring with peer connections', async () => {
        const mockStats = new Map([
            ['stat1', { type: 'candidate-pair', state: 'succeeded', currentRoundTripTime: 0.05 }],
            ['stat2', { type: 'inbound-rtp', kind: 'audio', packetsReceived: 100, packetsLost: 0, jitter: 0.01, bytesReceived: 5000 }]
        ]);

        const mockPC = {
            getStats: vi.fn().mockResolvedValue(mockStats),
            connectionState: 'connected',
            iceConnectionState: 'connected'
        };

        const peerConnectionsRef = { current: { testUser: mockPC } };

        const { result } = renderHook(() => useStatsMonitoring());

        act(() => {
            result.current.startStatsMonitoring(peerConnectionsRef);
        });

        // Advance timers for the stats interval (2000ms)
        await act(async () => {
            vi.advanceTimersByTime(2100);
        });

        expect(mockPC.getStats).toHaveBeenCalled();

        // Stop monitoring
        act(() => {
            result.current.stopStatsMonitoring();
        });
    });

    it('should clear stats when stopping', () => {
        const { result } = renderHook(() => useStatsMonitoring());

        act(() => {
            result.current.stopStatsMonitoring();
        });

        expect(result.current.connectionStats).toEqual({});
    });

    it('should not start monitoring twice', () => {
        const peerConnectionsRef = { current: {} };
        const { result } = renderHook(() => useStatsMonitoring());

        act(() => {
            result.current.startStatsMonitoring(peerConnectionsRef);
            result.current.startStatsMonitoring(peerConnectionsRef); // Should not duplicate
        });

        // Clean up
        act(() => {
            result.current.stopStatsMonitoring();
        });
    });
});
