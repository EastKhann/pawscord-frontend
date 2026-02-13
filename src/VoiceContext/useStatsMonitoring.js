import { useState, useCallback, useRef } from 'react';

export function useStatsMonitoring() {
    const [connectionStats, setConnectionStats] = useState({});
    const statsIntervalRef = useRef(null);

    // 📊 WEBRTC STATS MONITORING
    const startStatsMonitoring = useCallback((peerConnectionsRef) => {
        if (statsIntervalRef.current) return;

        statsIntervalRef.current = setInterval(async () => {
            const stats = {};

            for (const [username, pc] of Object.entries(peerConnectionsRef.current)) {
                try {
                    const report = await pc.getStats();
                    let audioStats = null;
                    let videoStats = null;

                    report.forEach((stat) => {
                        if (stat.type === 'inbound-rtp' && stat.kind === 'audio') {
                            audioStats = {
                                packetsReceived: stat.packetsReceived,
                                packetsLost: stat.packetsLost,
                                jitter: stat.jitter,
                                bytesReceived: stat.bytesReceived
                            };
                        }
                        if (stat.type === 'inbound-rtp' && stat.kind === 'video') {
                            videoStats = {
                                packetsReceived: stat.packetsReceived,
                                packetsLost: stat.packetsLost,
                                framesDecoded: stat.framesDecoded,
                                frameWidth: stat.frameWidth,
                                frameHeight: stat.frameHeight
                            };
                        }
                        if (stat.type === 'candidate-pair' && stat.state === 'succeeded') {
                            stats[username] = {
                                ...stats[username],
                                rtt: stat.currentRoundTripTime * 1000,
                                connectionType: stat.localCandidateId?.includes('relay') ? 'TURN' : 'STUN/Direct'
                            };
                        }
                    });

                    stats[username] = {
                        ...stats[username],
                        audio: audioStats,
                        video: videoStats,
                        connectionState: pc.connectionState,
                        iceConnectionState: pc.iceConnectionState
                    };
                } catch (e) {
                    console.warn(`[Stats] Failed to get stats for ${username}:`, e);
                }
            }

            setConnectionStats(stats);
        }, 2000); // Every 2 seconds

    }, []);

    const stopStatsMonitoring = useCallback(() => {
        if (statsIntervalRef.current) {
            clearInterval(statsIntervalRef.current);
            statsIntervalRef.current = null;
            setConnectionStats({});
        }
    }, []);

    return {
        connectionStats,
        startStatsMonitoring,
        stopStatsMonitoring,
    };
}
