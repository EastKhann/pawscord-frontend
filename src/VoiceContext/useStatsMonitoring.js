import { useState, useCallback, useRef } from 'react';

/**
 * WebRTC Stats Monitoring hook — 10/10 kalite.
 * 
 * İyileştirmeler:
 * - Bitrate hesaplama (inbound + outbound)
 * - Kalite skoru (0-100): RTT, paket kaybı, jitter'a göre
 * - Kalite seviyesi: excellent / good / fair / poor
 * - Jitter buffer delay tracking
 * - Outbound stats (gönderilen ses kalitesi)
 * - Önceki stats ile karşılaştırma (delta hesaplama)
 */

// 🔥 Kalite skoru hesapla (0-100)
function calculateQualityScore(rtt, packetLossRate, jitter) {
    // RTT: <50ms = mükemmel, >300ms = kötü
    const rttScore = Math.max(0, 100 - (rtt / 3));
    // Paket kaybı: <%1 = mükemmel, >%5 = kötü
    const lossScore = Math.max(0, 100 - (packetLossRate * 20));
    // Jitter: <10ms = mükemmel, >50ms = kötü 
    const jitterScore = Math.max(0, 100 - ((jitter || 0) * 2000));

    // Ağırlıklı ortalama: paket kaybı en önemli
    return Math.round(rttScore * 0.3 + lossScore * 0.5 + jitterScore * 0.2);
}

function qualityLevel(score) {
    if (score >= 85) return 'excellent';
    if (score >= 65) return 'good';
    if (score >= 40) return 'fair';
    return 'poor';
}

export function useStatsMonitoring() {
    const [connectionStats, setConnectionStats] = useState({});
    const statsIntervalRef = useRef(null);
    const prevStatsRef = useRef({});  // Önceki istatistikler (delta hesaplama)

    // 📊 WEBRTC STATS MONITORING — gelişmiş
    const startStatsMonitoring = useCallback((peerConnectionsRef) => {
        if (statsIntervalRef.current) return;

        statsIntervalRef.current = setInterval(async () => {
            const stats = {};
            const now = Date.now();

            for (const [username, pc] of Object.entries(peerConnectionsRef.current)) {
                try {
                    const report = await pc.getStats();
                    let audioIn = null;
                    let audioOut = null;
                    let videoIn = null;
                    let candidatePair = null;

                    report.forEach((stat) => {
                        // 🔥 Inbound audio (gelen ses)
                        if (stat.type === 'inbound-rtp' && stat.kind === 'audio') {
                            audioIn = {
                                packetsReceived: stat.packetsReceived || 0,
                                packetsLost: stat.packetsLost || 0,
                                jitter: stat.jitter || 0,
                                bytesReceived: stat.bytesReceived || 0,
                                jitterBufferDelay: stat.jitterBufferDelay || 0,
                                jitterBufferEmittedCount: stat.jitterBufferEmittedCount || 0,
                                concealedSamples: stat.concealedSamples || 0,
                                totalSamplesReceived: stat.totalSamplesReceived || 0,
                            };
                        }
                        // 🔥 Outbound audio (gönderilen ses)
                        if (stat.type === 'outbound-rtp' && stat.kind === 'audio') {
                            audioOut = {
                                packetsSent: stat.packetsSent || 0,
                                bytesSent: stat.bytesSent || 0,
                                retransmittedPacketsSent: stat.retransmittedPacketsSent || 0,
                            };
                        }
                        // Video inbound
                        if (stat.type === 'inbound-rtp' && stat.kind === 'video') {
                            videoIn = {
                                packetsReceived: stat.packetsReceived,
                                packetsLost: stat.packetsLost,
                                framesDecoded: stat.framesDecoded,
                                frameWidth: stat.frameWidth,
                                frameHeight: stat.frameHeight,
                                framesPerSecond: stat.framesPerSecond,
                            };
                        }
                        // Candidate pair (RTT, connection type)
                        if (stat.type === 'candidate-pair' && stat.state === 'succeeded') {
                            candidatePair = {
                                rtt: (stat.currentRoundTripTime || 0) * 1000,
                                availableOutgoingBitrate: stat.availableOutgoingBitrate,
                                connectionType: stat.localCandidateId?.includes('relay') ? 'TURN' : 'STUN/Direct',
                            };
                        }
                    });

                    // 🔥 Delta hesaplama: bitrate + paket kaybı oranı
                    const prev = prevStatsRef.current[username];
                    const timeDelta = prev ? (now - prev.timestamp) / 1000 : 2;
                    let inboundBitrate = 0;
                    let outboundBitrate = 0;
                    let packetLossRate = 0;

                    if (audioIn && prev?.audioIn) {
                        const bytesDiff = audioIn.bytesReceived - prev.audioIn.bytesReceived;
                        inboundBitrate = Math.round((bytesDiff * 8) / timeDelta); // bits/s

                        const totalPackets = audioIn.packetsReceived - prev.audioIn.packetsReceived;
                        const lostPackets = audioIn.packetsLost - prev.audioIn.packetsLost;
                        if (totalPackets + lostPackets > 0) {
                            packetLossRate = (lostPackets / (totalPackets + lostPackets)) * 100;
                        }
                    }
                    if (audioOut && prev?.audioOut) {
                        const bytesDiff = audioOut.bytesSent - prev.audioOut.bytesSent;
                        outboundBitrate = Math.round((bytesDiff * 8) / timeDelta);
                    }

                    // 🔥 Jitter buffer ortalama gecikme (ms)
                    let avgJitterBufferDelay = 0;
                    if (audioIn && audioIn.jitterBufferEmittedCount > 0) {
                        avgJitterBufferDelay = Math.round(
                            (audioIn.jitterBufferDelay / audioIn.jitterBufferEmittedCount) * 1000
                        );
                    }

                    // 🔥 Concealment ratio (kayıp ses tahmini oranı)
                    let concealmentRatio = 0;
                    if (audioIn && audioIn.totalSamplesReceived > 0) {
                        concealmentRatio = audioIn.concealedSamples / audioIn.totalSamplesReceived;
                    }

                    // 🔥 Kalite skoru
                    const rtt = candidatePair?.rtt || 0;
                    const qualityScore = calculateQualityScore(rtt, packetLossRate, audioIn?.jitter);
                    const quality = qualityLevel(qualityScore);

                    stats[username] = {
                        rtt: Math.round(rtt),
                        connectionType: candidatePair?.connectionType || 'unknown',
                        connectionState: pc.connectionState,
                        iceConnectionState: pc.iceConnectionState,
                        audio: audioIn,
                        audioOut,
                        video: videoIn,
                        // 🔥 Yeni metrikler
                        inboundBitrate,    // bps
                        outboundBitrate,   // bps
                        packetLossRate: Math.round(packetLossRate * 100) / 100,  // %
                        avgJitterBufferDelay,  // ms
                        concealmentRatio: Math.round(concealmentRatio * 10000) / 100, // %
                        qualityScore,      // 0-100
                        quality,           // excellent/good/fair/poor
                        availableBandwidth: candidatePair?.availableOutgoingBitrate,
                    };

                    // Önceki değerleri sakla
                    prevStatsRef.current[username] = {
                        timestamp: now,
                        audioIn,
                        audioOut,
                    };
                } catch (e) {
                    console.warn(`[Stats] Failed to get stats for ${username}:`, e);
                }
            }

            // 🔥 Bağlantısı kopan kullanıcıları temizle
            for (const key of Object.keys(prevStatsRef.current)) {
                if (!peerConnectionsRef.current[key]) {
                    delete prevStatsRef.current[key];
                }
            }

            setConnectionStats(stats);
        }, 2000); // 2 saniyede bir

    }, []);

    const stopStatsMonitoring = useCallback(() => {
        if (statsIntervalRef.current) {
            clearInterval(statsIntervalRef.current);
            statsIntervalRef.current = null;
            setConnectionStats({});
            prevStatsRef.current = {};
        }
    }, []);

    return {
        connectionStats,
        startStatsMonitoring,
        stopStatsMonitoring,
    };
}
